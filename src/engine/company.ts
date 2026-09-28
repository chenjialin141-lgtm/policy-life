import type { ActiveAction, CState, ChangeReason, Difficulty, GameEvent } from '../types'
import { addContribution, applyEffects, clampCompany, type Contributions } from './policy'
import { buildChangeReasons } from './causal'
import { companyEvents } from './events'
import { regions } from '../data/company'
import { blackSwans } from '../data/shared'
import { clamp } from './helpers'

export interface CompanyTurnResult {
  state: CState
  changes: ChangeReason[]
  events: GameEvent[]
  usedSwan: string[]
  monthsCash: number
  profit: number
  revenue: number
  bankrupt: boolean
}

const regionOrder = ['local', 'national', 'regional', 'global']
const expandCost: Record<string, number> = { national: 800, regional: 2200, global: 5000 }
const expandBrandNeed: Record<string, number> = { national: 35, regional: 58, global: 74 }

export function regionInfo(id: string) {
  return regions.find((r) => r.id === id) || regions[0]
}

export function nextRegion(id: string): string | null {
  const i = regionOrder.indexOf(id)
  return i >= 0 && i < regionOrder.length - 1 ? regionOrder[i + 1] : null
}
export function canExpandRegion(s: CState): boolean {
  const nr = nextRegion(s.region)
  if (!nr) return false
  return s.cash >= (expandCost[nr] || 0) && s.brand >= (expandBrandNeed[nr] || 0)
}
export function expandRegion(s: CState): CState {
  const nr = nextRegion(s.region)
  if (!nr) return s
  const cost = expandCost[nr] || 0
  s.cash -= cost
  s.region = nr
  s.investorConfidence += 4
  s.milestone = '業務區域拓展至「' + regionInfo(nr).name + '」'
  return s
}

export function canIPO(s: CState): boolean {
  return !s.ipo && s.revenue >= 3000 && s.profit > 0 && s.cash >= 2000 &&
    s.investorConfidence >= 60 && s.marketShare >= 8
}
export function doIPO(s: CState): CState {
  s.ipo = true
  s.cash += 8000
  s.stockPrice = Math.round(40 + s.marketShare * 2.2 + s.brand * 0.4 + Math.max(0, s.profit) / 200)
  s.investorConfidence = clamp(s.investorConfidence + 15, 0, 100)
  s.milestone = '公司於證券交易所掛牌上市（IPO），募得大筆資金'
  return s
}

export function computeCompanyTurn(
  raw: CState,
  active: ActiveAction[],
  difficulty: Difficulty,
  usedSwan: string[],
  rng: () => number = Math.random
): CompanyTurnResult {
  const s: CState = structuredClone(raw)
  const contrib: Contributions = {}
  const year = s.year
  const newActions = active.filter((a) => a.yearEnacted === year)
  const permanent = active.filter((a) => a.duration === 'permanent')
  const newInstant = newActions.filter((a) => a.duration === 'instant')

  // 1) 決策效果（revenue 抽出來與市場成長一起算）
  const actionRev =
    permanent.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0) +
    newInstant.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0)
  const noRev = (e: Record<string, number>) => {
    const c = { ...e }; delete c.revenue; return c
  }
  for (const a of permanent) applyEffects(s as unknown as Record<string, number>, noRev(a.effects), a.scale, contrib, a.name)
  for (const a of newInstant) applyEffects(s as unknown as Record<string, number>, noRev(a.effects), a.scale, contrib, a.name)

  // 2) 市場有機成長
  const organicRate = clamp(
    0.03 + (s.brand - 50) * 0.0012 + (s.rnd - 50) * 0.001 + (s.production - 50) * 0.0006 - (s.competitor - 50) * 0.0022,
    -0.3, 0.35
  )
  const rev0 = s.revenue
  const newRevenue = Math.max(0, s.revenue * (1 + organicRate) + actionRev)
  s.revenue = newRevenue
  addContribution(contrib, 'revenue', '市場有機成長', s.revenue * organicRate)
  addContribution(contrib, 'revenue', '經營決策', actionRev)

  // 3) 競爭與量能折舊
  const comp0 = s.competitor
  s.competitor += (50 - s.competitor) * 0.08 + (s.rnd < 40 ? 1.2 : 0) - (s.brand > 70 ? 1 : 0)
  addContribution(contrib, 'competitor', '競爭環境', s.competitor - comp0)
  for (const k of ['brand', 'rnd', 'production'] as const) {
    const target = k === 'brand' ? 42 : 40
    const before = s[k]
    s[k] += (target - s[k]) * 0.05
    addContribution(contrib, k, '量能自然衰退', s[k] - before)
  }
  const cap = regionInfo(s.region).shareCap
  if (s.marketShare > cap) {
    const over = s.marketShare - cap
    s.marketShare = cap
    addContribution(contrib, 'marketShare', '市場區域規模上限', -over)
  }
  if (s.competitor > 70 && s.brand < 50) {
    s.marketShare -= 0.6
    addContribution(contrib, 'marketShare', '競爭壓力', -0.6)
  }

  // 4) 財務
  const payroll = s.employees * s.salary
  const recurringNet = permanent.reduce((n, a) => n + a.recurring * a.scale, 0)
  const instantCost = newActions.reduce((n, a) => n + a.cost * a.scale, 0)
  const debtNow = newActions.reduce((n, a) => n + (a.effects.debtNow || 0) * a.scale, 0)
  const cashNow = newActions.reduce((n, a) => n + (a.effects.cashNow || 0) * a.scale, 0)
  s.debt += Math.max(0, debtNow)
  const rate = clamp(7 + (100 - s.investorConfidence) * 0.1 + Math.max(0, s.debt / Math.max(s.revenue, 1) - 1) * 3, 7, 20)
  const interest = s.debt * rate / 100
  const profit = s.revenue - payroll - recurringNet - instantCost - interest
  s.profit = Math.round(profit)
  addContribution(contrib, 'profit', '年度損益', profit)

  const cashBefore = s.cash
  s.cash += profit + cashNow
  if (s.customers > 0) s.customers = Math.round(s.customers * (1 + clamp((s.revenue / Math.max(rev0, 1) - 1) * 0.5, -0.4, 0.6)))

  // 投資人信心隨體質變化
  const ic0 = s.investorConfidence
  s.investorConfidence += (profit > 0 ? 2.5 : -3) + clamp(s.revenue / 2000, -2, 3) + (s.cash < 0 ? -10 : 0)
  addContribution(contrib, 'investorConfidence', '財務體質', s.investorConfidence - ic0)

  // 5) 事件（含黑天鵝）
  const monthsCost = Math.max(1, (payroll + Math.max(0, recurringNet)) / 12)
  const monthsCash = s.cash / monthsCost
  const swanP = { easy: 0.03, normal: 0.07, hard: 0.11, extreme: 0.16 }[difficulty]
  const events = companyEvents(s, {
    year, monthsCash, debtRatio: s.debt / Math.max(s.revenue, 1), usedSwan, swanP, rng, active
  })
  const newUsed = [...usedSwan]
  for (const e of events) {
    if (e.effects) applyEffects(s as unknown as Record<string, number>, noRev(e.effects), 1, contrib, e.title)
    if (e.blackSwan) {
      const bs = blackSwans.find((b) => '黑天鵝：' + b.title === e.title)
      if (bs && !newUsed.includes(bs.id)) newUsed.push(bs.id)
    }
  }

  clampCompany(s)

  // 6) 現金斷裂與破產
  let bankrupt = false
  let endReason: string | undefined
  if (s.cash < 0 && s.investorConfidence < 20) {
    bankrupt = true
    endReason = '流動性危機：現金用盡且無法再融資，公司發不出薪水、無力償還債務。'
  } else if (s.debt > 2.5 * Math.max(s.revenue, 1) && s.cash < 0) {
    bankrupt = true
    endReason = '債務危機：負債遠超營收、資金鏈斷裂，公司宣布破產。'
  } else if (s.marketShare < 0.5 && year > 3) {
    bankrupt = true
    endReason = '市場退出：市占率崩落至幾乎為零，產品失去通路與客戶，公司停止營運。'
  } else if (s.cash < 0) {
    // 尚有信心，自動爭取橋接資金（舉新債）
    const gap = -s.cash
    s.debt += gap
    addContribution(contrib, 'debt', '緊急橋接貸款', gap)
    s.cash = 0
    s.investorConfidence -= 6
  }
  if (bankrupt) { s.gameOver = true; s.endReason = endReason }
  addContribution(contrib, 'cash', '年度現金流', s.cash - cashBefore)

  const changes = buildChangeReasons(contrib)
  return { state: s, changes, events, usedSwan: newUsed, monthsCash, profit: s.profit, revenue: s.revenue, bankrupt }
}
