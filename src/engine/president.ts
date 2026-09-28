import type { ActiveAction, ChangeReason, Difficulty, GameEvent, PState } from '../types'
import { addContribution, applyEffects, clampPresident, type Contributions } from './policy'
import { buildChangeReasons } from './causal'
import { presidentEvents } from './events'
import { blackSwans } from '../data/shared'
import { clamp } from './helpers'

export interface PresidentTurnResult {
  state: PState
  changes: ChangeReason[]
  events: GameEvent[]
  usedSwan: string[]
  deficit: number
  balance: number
  totalRevenue: number
  totalSpending: number
  debtRatio: number
  recallPending: boolean
  electionDue: boolean
  growthStreak: number
}

const rivals = ['江明倫', '陳若嵐', '李國棟', '蘇婉清', '趙天行']

export function computePresidentTurn(
  raw: PState,
  active: ActiveAction[],
  difficulty: Difficulty,
  usedSwan: string[],
  prevStreak: number,
  lastRecallYear: number,
  rng: () => number = Math.random
): PresidentTurnResult {
  const s: PState = structuredClone(raw)
  const contrib: Contributions = {}
  const year = s.year
  const newActions = active.filter((a) => a.yearEnacted === year)
  const permanent = active.filter((a) => a.duration === 'permanent')
  const newInstant = newActions.filter((a) => a.duration === 'instant')
  const activeNames = active.filter((a) => a.scale > 0).map((a) => a.name)

  // 1) 政策效果（經濟／服務／政治指標）；revenue 走下方財務線，不在此直接改 baseline，避免重複計入
  const noRev = (e: Record<string, number>) => { const c = { ...e }; delete c.revenue; return c }
  for (const a of permanent) applyEffects(s as unknown as Record<string, number>, noRev(a.effects), a.scale, contrib, a.name)
  for (const a of newInstant) applyEffects(s as unknown as Record<string, number>, noRev(a.effects), a.scale, contrib, a.name)

  // 2) 財政
  const policyRevenue =
    permanent.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0) +
    newInstant.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0)
  const recurringNet = permanent.reduce((n, a) => n + a.recurring * a.scale, 0)
  const instantCost = newActions.reduce((n, a) => n + a.cost * a.scale, 0)
  const debtNow = newActions.reduce((n, a) => n + (a.effects.debtNow || 0) * a.scale, 0)
  const interestOpen = s.debt * (s.interestRate / 100)
  const totalRevenue = s.revenue + policyRevenue
  const totalSpending = s.fixedSpending + interestOpen + recurringNet + instantCost
  const balance = totalRevenue + Math.max(0, debtNow) - totalSpending
  let deficit = 0
  s.debt += Math.max(0, debtNow)
  if (debtNow > 0) addContribution(contrib, 'debt', '舉債政策', debtNow)
  if (balance < 0) {
    deficit = -balance
    s.debt += deficit
    addContribution(contrib, 'debt', '財政赤字', deficit)
  } else if (balance > 0) {
    const pay = balance * 0.7
    s.debt = Math.max(0, s.debt - pay)
    addContribution(contrib, 'debt', '盈餘償債', -pay)
  }

  // 3) 總體經濟回歸
  const g0 = s.growth
  s.growth += (2.5 - s.growth) * 0.25
  addContribution(contrib, 'growth', '經濟循環', s.growth - g0)

  const u0 = s.unemployment
  s.unemployment -= (s.growth - 2.5) * 0.35
  s.unemployment += (4.2 - s.unemployment) * 0.2
  addContribution(contrib, 'unemployment', '總體經濟調節', s.unemployment - u0)

  const i0 = s.inflation
  s.inflation += (s.growth - 3) * 0.35 - (s.unemployment - 4.5) * 0.15 + (2.2 - s.inflation) * 0.2
  addContribution(contrib, 'inflation', '總體經濟調節', s.inflation - i0)

  const h0 = s.housingPrice
  s.housingPrice += s.growth * 1.2 - (s.interestRate - 3) * 2 + (100 - s.housingPrice) * 0.03
  addContribution(contrib, 'housingPrice', '總體經濟調節', s.housingPrice - h0)

  const gdp0 = s.gdp
  s.gdp = s.gdp * (1 + s.growth / 100)
  addContribution(contrib, 'gdp', '經濟成長', s.gdp - gdp0)

  // 服務量能自然折舊（無持續投入會回落到普通水準）
  for (const k of ['defense', 'education', 'healthcare', 'welfare', 'housing', 'energy'] as const) {
    const before = s[k]
    s[k] += (55 - s[k]) * 0.05
    addContribution(contrib, k, '服務量能折舊', s[k] - before)
  }

  // 4) 政治民心
  const eco = s.growth * 2 - Math.max(0, s.unemployment - 4.5) * 3 - Math.max(0, s.inflation - 3) * 3
  const a0 = s.approval
  s.approval += eco * 0.4 + (50 - s.approval) * 0.18
  addContribution(contrib, 'approval', '施政滿意度', s.approval - a0)
  const t0 = s.socialTrust
  s.socialTrust += (s.approval - 50) * 0.08 + (60 - s.socialTrust) * 0.04 - Math.max(0, s.inequality - 45) * 0.05
  addContribution(contrib, 'socialTrust', '社會氛圍', s.socialTrust - t0)
  const ps0 = s.politicalStability
  s.politicalStability += (s.approval - 50) * 0.12 + (s.socialTrust - 60) * 0.06 + (70 - s.politicalStability) * 0.04
  addContribution(contrib, 'politicalStability', '政治情勢', s.politicalStability - ps0)
  s.govSupport += (s.approval - s.govSupport) * 0.3
  s.opposition = clamp(100 - s.govSupport, 1, 99)
  const pc0 = s.politicalCapital
  s.politicalCapital += (s.approval - 50) * 0.1 + (60 - s.politicalCapital) * 0.05
  addContribution(contrib, 'politicalCapital', '政治資本變化', s.politicalCapital - pc0)

  // 5) 年末利率與明年基線預算
  const debtRatio = s.debt / s.gdp
  const targetRate = 2.2 + Math.max(0, debtRatio - 0.55) * 3.5 + Math.max(0, s.inflation - 2.3) * 0.3
  const r0 = s.interestRate
  s.interestRate += (targetRate - s.interestRate) * 0.4
  addContribution(contrib, 'interestRate', '債信與貨幣情勢', s.interestRate - r0)

  s.revenue = totalRevenue * (1 + s.growth * 0.005)
  s.fixedSpending *= 1 + (s.inflation * 0.01)
  s.interest = interestOpen
  s.spending = totalSpending
  s.discretionary = Math.max(0, s.revenue - s.fixedSpending - s.debt * (s.interestRate / 100))
  s.allocated = 0

  // 6) 事件（規則驅動 + 黑天鵝），事件效果進入同一歸因
  const swanP = { easy: 0.03, normal: 0.07, hard: 0.11, extreme: 0.16 }[difficulty]
  const events = presidentEvents(s, {
    year, deficit, debtRatio, activeNames, usedSwan, swanP, rng
  })
  const newUsed = [...usedSwan]
  for (const e of events) {
    if (e.effects) applyEffects(s as unknown as Record<string, number>, e.effects, 1, contrib, e.title)
    if (e.blackSwan) {
      const bs = blackSwans.find((b) => '黑天鵝：' + b.title === e.title)
      if (bs && !newUsed.includes(bs.id)) newUsed.push(bs.id)
    }
  }

  clampPresident(s)

  // 7) 危機／罷免／選舉旗標
  let gameOver = false
  let endReason: string | undefined
  if (debtRatio > 1.5 && deficit > 150 && s.interestRate > 8) {
    gameOver = true
    endReason = '財政危機：政府失去融資能力，無力支付必要支出與債務利息。'
  } else if (s.politicalStability < 12 || s.socialTrust < 12) {
    gameOver = true
    endReason = '政治制度失穩：社會與政治信任全面崩潰，政府已無法正常運作。'
  }
  const recallPending =
    !gameOver && year - lastRecallYear >= 2 &&
    s.approval < 30 && s.socialTrust < 35 && s.opposition > 62
  const electionDue = year % 4 === 0

  s.gameOver = gameOver
  if (endReason) s.endReason = endReason

  const growthStreak = s.growth >= 4 ? prevStreak + 1 : 0
  const changes = buildChangeReasons(contrib)

  return {
    state: s, changes, events, usedSwan: newUsed,
    deficit, balance, totalRevenue, totalSpending, debtRatio,
    recallPending, electionDue, growthStreak
  }
}

// ---------- 罷免應對 ----------
export const recallChoices = [
  { id: 'explain', label: '公開說明', mod: 5, effects: { approval: 2, socialTrust: 1 } },
  { id: 'concession', label: '政策讓步', mod: 18, effects: { approval: 6, socialTrust: 4, politicalCapital: -3 } },
  { id: 'reform', label: '宣布改革', mod: 15, effects: { socialTrust: 5, politicalStability: 3, politicalCapital: -5 } },
  { id: 'negotiate', label: '政治談判', mod: 12, effects: { opposition: -6, approval: 2, politicalCapital: -4 } },
  { id: 'hold', label: '維持原政策', mod: -10, effects: { approval: -4, politicalStability: -4 } },
  { id: 'ignore', label: '完全不處理', mod: -25, effects: { approval: -8, socialTrust: -8, politicalStability: -8 } }
]

export function resolveRecall(s: PState, choiceId: string, rng: () => number = Math.random) {
  const c = recallChoices.find((x) => x.id === choiceId) || recallChoices[0]
  const survive =
    50 + (s.approval - 30) * 1.2 + (s.socialTrust - 35) * 0.8 +
    (s.politicalStability - 50) * 0.4 + c.mod
  const surviveChance = clamp(survive, 3, 97)
  const removed = rng() * 100 >= surviveChance // 罷免通過
  return { removed, surviveChance, choiceLabel: c.label, effects: c.effects }
}

// ---------- 總統大選 ----------
export function resolveElection(s: PState, term: number, runAgain: boolean, rng: () => number = Math.random) {
  const rivalName = rivals[Math.floor(rng() * rivals.length)]
  if (!runAgain) {
    return { ran: false, won: false, playerVotes: 0, rivalVotes: 0, rivalName }
  }
  const score =
    s.approval * 0.55 + s.govSupport * 0.2 + clamp(s.growth, 0, 8) * 6 -
    Math.max(0, s.unemployment - 5) * 4 - Math.max(0, s.inflation - 4) * 3 +
    (s.socialTrust - 50) * 0.3 - (term >= 2 ? 3 : 0)
  let playerVotes = 50 + (score - 50) * 0.8 + (rng() * 8 - 4)
  playerVotes = Math.round(clamp(playerVotes, 5, 95))
  return { ran: true, won: playerVotes > 50, playerVotes, rivalVotes: 100 - playerVotes, rivalName }
}
