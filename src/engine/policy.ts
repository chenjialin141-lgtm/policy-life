import type { ActionDef, ActiveAction, CState, ChangeSource, Effects, PState } from '../types'
import type { Feasibility } from './helpers'
import { clamp } from './helpers'

export type Contributions = Record<string, ChangeSource[]>

export function addContribution(c: Contributions, key: string, source: string, amount: number) {
  if (Math.abs(amount) < 1e-9) return
  if (!c[key]) c[key] = []
  c[key].push({ source, amount })
}

// 政策互相矛盾的軸（id 集合）
const conflictMap: Record<string, string[]> = {
  p_corptax_up: ['p_corptax_cut', 'p_corptax_zero'],
  p_corptax_cut: ['p_corptax_up'],
  p_corptax_zero: ['p_corptax_up'],
  p_minwage_up: ['p_labor_dereg'],
  p_labor_dereg: ['p_minwage_up'],
  p_austerity: ['b_education', 'b_healthcare', 'b_welfare', 'b_defense', 'b_housing', 'b_energy', 'b_infra', 'p_cash_handout', 'p_green', 'p_public_jobs']
}

export function findConflicts(def: ActionDef, active: ActiveAction[]): string[] {
  const bad = conflictMap[def.id] || []
  return active.filter((a) => bad.includes(a.id) && a.scale > 0).map((a) => a.name)
}

function firstYearCost(def: ActionDef, scale: number): number {
  return def.cost * scale + Math.max(0, def.recurring) * scale
}

export function presidentFeasibility(
  def: ActionDef, scale: number, s: PState, active: ActiveAction[], allocated: number
): Feasibility {
  const issues: string[] = []
  const conflicts = findConflicts(def, active)
  const cost = firstYearCost(def, scale)
  const available = s.discretionary - allocated
  const gap = Math.max(0, cost - available)

  if (cost > available) {
    if (gap > available * 1.2) issues.push(`預算嚴重不足：首年約需 ${Math.round(cost)} 億，尚可配置僅 ${Math.round(available)} 億，缺口 ${Math.round(gap)} 億，強行執行將大幅舉債。`)
    else issues.push(`預算吃緊：首年約需 ${Math.round(cost)} 億，尚可配置 ${Math.round(available)} 億，缺口 ${Math.round(gap)} 億，可能出現赤字。`)
  }
  if (def.required?.admin && s.adminCapacity < def.required.admin * 9) {
    issues.push(`行政能力不足：政策需要較高執行量能，目前行政能力 ${s.adminCapacity}，可能延宕或打折。`)
  }
  if (def.required?.political && s.politicalCapital < def.required.political) {
    issues.push(`政治資本不足：推動需要國會與民意支持，目前政治資本 ${s.politicalCapital}。`)
  }
  if (def.required?.land) issues.push('需要大面積土地與用地審查，地方政府與徵收進度可能成為瓶頸。')
  if (def.required?.energy) issues.push('涉及能源配置，須配合電網與供電穩定度評估。')

  let level: Feasibility['level'] = 'green'
  if (conflicts.length > 0) level = 'conflict'
  else if (gap > available * 1.2) level = 'red'
  else if (gap > 0 || issues.length > 0) level = 'yellow'
  return { level, firstYearCost: cost, gap, issues, conflicts }
}

export function companyFeasibility(
  def: ActionDef, scale: number, s: CState, active: ActiveAction[]
): Feasibility {
  const issues: string[] = []
  const conflicts = findConflicts(def, active)
  const cost = firstYearCost(def, scale)
  const gap = Math.max(0, cost - s.cash)
  const capacity = s.employees / 4 // 可承接的擴張量能

  if (cost > s.cash) {
    if (gap > s.cash) issues.push(`現金嚴重不足：首年約需 ${Math.round(cost)} 萬，現金僅 ${Math.round(s.cash)} 萬，須募資或借款，否則會有破產風險。`)
    else issues.push(`現金偏緊：首年約需 ${Math.round(cost)} 萬，現金 ${Math.round(s.cash)} 萬，缺口 ${Math.round(gap)} 萬。`)
  }
  if (def.required?.admin && capacity < def.required.admin) {
    issues.push(`人才量能不足：擴張需要更多團隊，目前 ${s.employees} 人，建議先徵才。`)
  }
  if ((def.id === 'c_overseas' || def.id === 'c_acquire') && s.region === 'local' && s.brand < 45) {
    issues.push('品牌與本地根基尚淺，貿然大步擴張風險較高，建議先站穩全國市場。')
  }

  let level: Feasibility['level'] = 'green'
  if (conflicts.length > 0) level = 'conflict'
  else if (gap > s.cash) level = 'red'
  else if (gap > 0 || issues.length > 0) level = 'yellow'
  return { level, firstYearCost: cost, gap, issues, conflicts }
}

// 把效果套到數值 state，並記錄歸因（debtNow/cashNow 等特殊鍵由財務函式處理）
const specialKeys = new Set(['debtNow', 'cashNow'])
export function applyEffects(
  state: Record<string, number>,
  effects: Effects,
  scale: number,
  contrib: Contributions,
  source: string
) {
  for (const [key, raw] of Object.entries(effects)) {
    if (specialKeys.has(key)) continue
    const amount = raw * scale
    if (typeof state[key] === 'number') {
      state[key] += amount
      addContribution(contrib, key, source, amount)
    }
  }
}

export function clampPresident(s: PState): PState {
  s.unemployment = clamp(s.unemployment, 0.5, 35)
  s.inflation = clamp(s.inflation, -3, 25)
  s.growth = clamp(s.growth, -12, 14)
  s.approval = clamp(s.approval, 1, 99)
  s.socialTrust = clamp(s.socialTrust, 1, 99)
  s.politicalStability = clamp(s.politicalStability, 1, 99)
  s.adminCapacity = clamp(s.adminCapacity, 20, 99)
  s.politicalCapital = clamp(s.politicalCapital, 0, 100)
  s.govSupport = clamp(s.govSupport, 1, 99)
  s.opposition = clamp(s.opposition, 1, 99)
  s.inequality = clamp(s.inequality, 5, 90)
  s.housingPrice = clamp(s.housingPrice, 40, 400)
  s.interestRate = clamp(s.interestRate, 0.5, 18)
  for (const k of ['defense', 'education', 'healthcare', 'welfare', 'housing', 'energy'] as const) {
    s[k] = clamp(s[k], 5, 99)
  }
  return s
}

export function clampCompany(s: CState): CState {
  s.marketShare = clamp(s.marketShare, 0, 95)
  s.brand = clamp(s.brand, 0, 100)
  s.rnd = clamp(s.rnd, 0, 100)
  s.production = clamp(s.production, 0, 100)
  s.investorConfidence = clamp(s.investorConfidence, 0, 100)
  s.competitor = clamp(s.competitor, 5, 100)
  s.employees = Math.max(0, s.employees)
  s.customers = Math.max(0, s.customers)
  return s
}
