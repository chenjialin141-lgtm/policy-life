import type { CState, PState } from '../types'

export interface PAchCtx {
  s: PState
  balance: number
  term: number
  growthStreak: number
  year: number
  recallSurvived: boolean
  hadSwan: boolean
  startDebt: number
}
export interface CAchCtx {
  s: CState
  profitStreak: number
  hadSwan: boolean
  shareCap: number
}

const pPred: Record<string, (c: PAchCtx) => boolean> = {
  pa_first_year: (c) => c.year >= 2,
  pa_balanced: (c) => c.balance >= 0,
  pa_miracle: (c) => c.growthStreak >= 3,
  pa_trust: (c) => c.s.socialTrust >= 85,
  pa_recall_win: (c) => c.recallSurvived,
  pa_survivor: (c) => c.hadSwan && !c.s.gameOver,
  pa_debt_cut: (c) => c.s.debt <= c.startDebt * 0.8,
  pa_reelected: (c) => c.term >= 2
}

const cPred: Record<string, (c: CAchCtx) => boolean> = {
  ca_first_revenue: (c) => c.s.revenue >= 1200,
  ca_first_profit: (c) => c.profitStreak >= 1,
  ca_cert: (c) => c.s.brand >= 60,
  ca_overseas: (c) => c.s.region === 'regional' || c.s.region === 'global',
  ca_survivor: (c) => c.hadSwan && !c.s.gameOver,
  ca_unicorn: (c) => c.s.cash >= 10000 || (!!c.s.ipo && (c.s.stockPrice ?? 0) >= 80),
  ca_leader: (c) => c.s.marketShare >= c.shareCap * 0.8,
  ca_ipo: (c) => !!c.s.ipo
}

function run<T>(pred: Record<string, (c: T) => boolean>, c: T, unlocked: string[]): string[] {
  const out: string[] = []
  for (const [id, fn] of Object.entries(pred)) {
    if (!unlocked.includes(id)) {
      try { if (fn(c)) out.push(id) } catch { /* ignore */ }
    }
  }
  return out
}

export const evalPresident = (c: PAchCtx, unlocked: string[]) => run(pPred, c, unlocked)
export const evalCompany = (c: CAchCtx, unlocked: string[]) => run(cPred, c, unlocked)
