import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  ActiveAction, ActionDef, Achievement, ChangeReason, CState, Difficulty,
  Effects, GameEvent, Mode, NewsItem, PState, RiskItem, StakeholderReaction, YearRecord
} from '../types'
import { initialPState, budgetBuckets } from '../data/president'
import { initialCState, industries, regions, type IndustryTemplate } from '../data/company'
import { initialAchievements } from '../data/shared'
import {
  computePresidentTurn, resolveElection, resolveRecall, type PresidentTurnResult
} from '../engine/president'
import {
  computeCompanyTurn, canIPO, doIPO, canExpandRegion, expandRegion, nextRegion, regionInfo, type CompanyTurnResult
} from '../engine/company'
import {
  presidentNews, companyNews, presidentRisks, companyRisks, presidentReactions, companyReactions
} from '../engine/narrative'
import { evalPresident, evalCompany } from '../engine/achievements'
import { applyEffects, type Contributions } from '../engine/policy'
import { narrateTurn, type MarketAssessment, type NarrativeAI } from '../services/aiService'
import { uid } from '../engine/helpers'

export interface ReviewData {
  mode: Mode
  year: number
  changes: ChangeReason[]
  events: GameEvent[]
  news: NewsItem[]
  risks: RiskItem[]
  reactions: StakeholderReaction[]
  narrative: NarrativeAI | null
  deficit?: number
  balance?: number
  totalRevenue?: number
  totalSpending?: number
  debtRatio?: number
  monthsCash?: number
  profit?: number
  recallPending: boolean
  recallResolved: boolean
  recallRemoved?: boolean
  electionDue: boolean
  electionResolved?: boolean
  electionRan?: boolean
  electionWon?: boolean
  rivalName?: string
  playerVotes?: number
  rivalVotes?: number
  nextState: PState | CState
  pt?: PresidentTurnResult
  ct?: CompanyTurnResult
}

export function yearCost(a: ActiveAction, year: number): number {
  const isNew = a.yearEnacted === year
  let c = Math.max(0, a.recurring) * a.scale
  if (isNew) c += a.cost * a.scale
  return c
}
export function computeAllocated(active: ActiveAction[], year: number): number {
  return active.reduce((n, a) => n + yearCost(a, year), 0)
}

function toActive(def: ActionDef, scale: number, year: number): ActiveAction {
  return {
    id: def.id, name: def.name, desc: def.desc, category: def.category,
    cost: def.cost, recurring: def.recurring, duration: def.duration,
    effects: def.effects, stakeholders: def.stakeholders || {},
    scale, yearEnacted: year, tags: def.tags
  }
}

interface CompanySetup {
  industryId: string
  location: string
  region: string
  productName: string
  assessment: MarketAssessment | null
}

interface GameStore {
  mode: Mode | null
  difficulty: Difficulty
  started: boolean
  p: PState | null
  c: CState | null
  active: ActiveAction[]
  extraDecisions: ActiveAction[]
  history: YearRecord[]
  achievements: Achievement[]
  usedSwan: string[]
  growthStreak: number
  profitStreak: number
  lastRecallYear: number
  recallSurvived: boolean
  codex: string[]
  review: ReviewData | null
  aiBusy: boolean
  companySetup: CompanySetup | null

  startPresident: (d: Difficulty) => void
  startCompany: (d: Difficulty, setup: CompanySetup) => void
  backHome: () => void
  toMenu: () => void
  continueGame: () => void
  setBucketScale: (id: string, scale: number) => void
  enact: (def: ActionDef, scale: number) => { ok: boolean; error?: string }
  removeAction: (id: string) => void
  companyExpandRegion: () => void
  companyIPO: () => void
  endYear: () => void
  resolveRecallChoice: (choiceId: string) => void
  resolveElectionChoice: (runAgain: boolean) => void
  confirmYear: () => void
  dismissReview: () => void
}

const currentYear = (s: GameStoreLike) => (s.mode === 'company' ? s.c?.year : s.p?.year) ?? 1
type GameStoreLike = GameStore

export const useGame = create<GameStore>()(
  persist(
    (set, get) => ({
      mode: null,
      difficulty: 'normal',
      started: false,
      p: null,
      c: null,
      active: [],
      extraDecisions: [],
      history: [],
      achievements: [],
      usedSwan: [],
      growthStreak: 0,
      profitStreak: 0,
      lastRecallYear: -9,
      recallSurvived: false,
      codex: [],
      review: null,
      aiBusy: false,
      companySetup: null,

      startPresident: (d) => {
        set({
          mode: 'president', difficulty: d, started: true,
          p: initialPState(d), c: null, active: [], extraDecisions: [], history: [],
          achievements: initialAchievements('president'), usedSwan: [],
          growthStreak: 0, profitStreak: 0, lastRecallYear: -9, recallSurvived: false,
          codex: [], review: null, companySetup: null
        })
      },

      startCompany: (d, setup) => {
        const ind = industries.find((x) => x.id === setup.industryId) ?? industries[0]
        const s = initialCState(ind, d)
        s.productName = setup.productName
        s.headquarters = setup.location
        s.region = setup.region
        const ri = regions.find((x) => x.id === setup.region) || regions[0]
        s.revenue = Math.round(s.revenue * ri.revMul)
        s.marketShare = Math.min(s.marketShare, ri.shareCap)
        if (setup.assessment?.adjust) {
          const a = setup.assessment.adjust
          s.revenue += a.revenue || 0
          s.marketShare += a.marketShare || 0
          s.brand += a.brand || 0
          s.rnd += a.rnd || 0
          s.investorConfidence += a.investorConfidence || 0
        }
        s.marketShare = Math.max(0.3, s.marketShare)
        s.brand = Math.max(1, Math.min(100, s.brand))
        s.rnd = Math.max(1, Math.min(100, s.rnd))
        s.investorConfidence = Math.max(1, Math.min(100, s.investorConfidence))
        set({
          mode: 'company', difficulty: d, started: true,
          p: null, c: s, active: [], extraDecisions: [], history: [],
          achievements: initialAchievements('company'), usedSwan: [],
          growthStreak: 0, profitStreak: 0, lastRecallYear: -9, recallSurvived: false,
          codex: [], review: null, companySetup: setup
        })
      },

      backHome: () => set({ started: false, mode: null, review: null, p: null, c: null, active: [], history: [] }),

      toMenu: () => set({ started: false, review: null, aiBusy: false }),
      continueGame: () => set({ started: true, review: null }),

      setBucketScale: (id, scale) => {
        const { active, p } = get()
        if (!p) return
        const year = p.year
        const existing = active.find((a) => a.id === id)
        if (existing) {
          if (scale <= 0) set({ active: active.filter((a) => a.id !== id) })
          else set({ active: active.map((a) => (a.id === id ? { ...a, scale } : a)) })
        } else if (scale > 0) {
          const def = budgetBuckets.find((b) => b.id === id)
          if (def) set({ active: [...active, toActive(def, scale, year)] })
        }
      },

      enact: (def, scale) => {
        const st = get()
        const year = currentYear(st)
        if (st.active.some((a) => a.id === def.id)) return { ok: false, error: '這項政策已經在實施中' }
        const act = toActive(def, scale, year)
        set({
          active: [...st.active, act],
          codex: st.codex.includes(def.name) ? st.codex : [...st.codex, def.name]
        })
        return { ok: true }
      },

      removeAction: (id) => {
        const { active } = get()
        set({ active: active.filter((a) => a.id !== id) })
      },

      companyExpandRegion: () => {
        const { c, extraDecisions } = get()
        if (!c || !canExpandRegion(c)) return
        const nr = nextRegion(c.region)
        if (!nr) return
        const cost = { national: 800, regional: 2200, global: 5000 }[nr] || 0
        const ns = structuredClone(c)
        expandRegion(ns)
        const dec: ActiveAction = {
          id: 'decision_region_' + uid(), name: '拓展業務區域至' + regionInfo(nr).name,
          desc: '投入資源將營運版圖拓展到更大的市場，提高市占天花板', category: '策略',
          cost, recurring: 0, duration: 'instant', effects: {}, stakeholders: { investors: 1, customers: 1 },
          scale: 1, yearEnacted: c.year, tags: ['區域拓展']
        }
        set({ c: ns, extraDecisions: [...extraDecisions, dec] })
      },

      companyIPO: () => {
        const { c, extraDecisions } = get()
        if (!c || !canIPO(c)) return
        const ns = structuredClone(c)
        doIPO(ns)
        const dec: ActiveAction = {
          id: 'decision_ipo_' + uid(), name: '公司掛牌上市（IPO）',
          desc: '通過股票市場公開募資，取得大筆資金與市場關注', category: '策略',
          cost: 0, recurring: 0, duration: 'instant', effects: {}, stakeholders: { investors: 3 },
          scale: 1, yearEnacted: c.year, tags: ['里程碑']
        }
        set({ c: ns, extraDecisions: [...extraDecisions, dec] })
      },

      endYear: () => {
        const st = get()
        if (st.mode === 'president' && st.p) {
          const pt = computePresidentTurn(
            st.p, st.active, st.difficulty, st.usedSwan, st.growthStreak, st.lastRecallYear
          )
          const news = presidentNews(pt.state, pt, st.active)
          const risks = presidentRisks(pt.state, pt)
          const reactions = presidentReactions(st.active)
          const review: ReviewData = {
            mode: 'president', year: st.p.year, changes: pt.changes, events: pt.events,
            news, risks, reactions, narrative: null,
            deficit: pt.deficit, balance: pt.balance, totalRevenue: pt.totalRevenue,
            totalSpending: pt.totalSpending, debtRatio: pt.debtRatio,
            recallPending: pt.recallPending, recallResolved: !pt.recallPending,
            electionDue: pt.electionDue, electionResolved: !pt.electionDue,
            nextState: pt.state, pt
          }
          set({ review, aiBusy: true })
          void enrichNarrative(set, get, review, pt.state)
        } else if (st.mode === 'company' && st.c) {
          const ct = computeCompanyTurn(st.c, st.active, st.difficulty, st.usedSwan)
          const news = companyNews(ct.state, ct, st.active)
          const risks = companyRisks(ct.state, ct)
          const reactions = companyReactions(st.active)
          const review: ReviewData = {
            mode: 'company', year: st.c.year, changes: ct.changes, events: ct.events,
            news, risks, reactions, narrative: null,
            monthsCash: ct.monthsCash, profit: ct.profit,
            recallPending: false, recallResolved: true, electionDue: false, electionResolved: true,
            nextState: ct.state, ct
          }
          set({ review, aiBusy: true })
          void enrichNarrative(set, get, review, ct.state)
        }
      },

      resolveRecallChoice: (choiceId) => {
        const st = get()
        if (!st.review || st.review.mode !== 'president') return
        const ns = structuredClone(st.review.nextState as PState)
        const result = resolveRecall(ns, choiceId)
        const recallEffects = result.effects as unknown as Effects
        const contrib: Contributions = {}
        applyEffects(ns as unknown as Record<string, number>, recallEffects, 1, contrib, '罷免應對：' + result.choiceLabel)
        const review = {
          ...st.review,
          nextState: ns,
          recallResolved: true,
          recallRemoved: result.removed,
          events: [...st.review.events, {
            id: uid('ev'), year: st.review.year, title: result.removed ? '罷免案通過' : '罷免案未過關',
            detail: result.removed
              ? `你選擇「${result.choiceLabel}」，但社會壓力未能平息，罷免投票通過，總統被迫下台。`
              : `你選擇「${result.choiceLabel}」，撐過罷免危機（存活機率約 ${result.surviveChance.toFixed(0)}%），但施政元氣大傷。`,
            severity: (result.removed ? 'crisis' : 'risk') as GameEvent['severity'],
            causedBy: ['民意低迷'], effects: recallEffects
          }]
        }
        if (result.removed) {
          ns.gameOver = true
          ns.endReason = '罷免成功：社會信任與民意崩盤，總統遭罷免下台。'
        } else {
          review.nextState = ns
        }
        set({ review, recallSurvived: !result.removed, lastRecallYear: st.review.year })
      },

      resolveElectionChoice: (runAgain) => {
        const st = get()
        if (!st.review || st.review.mode !== 'president' || !st.p) return
        const ns = structuredClone(st.review.nextState as PState)
        const term = st.p.term
        const review = { ...st.review, rivalName: '', electionRan: false }

        // 憲政慣例：總統連選得連任一次，做完兩任強制和平卸任
        if (term >= 2) {
          ns.gameOver = true
          ns.endReason = `你完成了憲法所定的兩任總統任期（共 ${term * 4} 年），在和平交接中卸下總統職務。`
          review.electionResolved = true
          review.electionWon = false
          review.electionRan = false
          review.events = [...review.events, {
            id: uid('ev'), year: review.year, title: '兩任任期屆滿、和平卸任',
            detail: ns.endReason, severity: 'good' as const, causedBy: ['總統大選']
          }]
          review.nextState = ns
          set({ review })
          return
        }

        const r = resolveElection(ns, term, runAgain)
        review.rivalName = r.rivalName
        review.electionRan = r.ran
        if (!runAgain) {
          ns.gameOver = true
          ns.endReason = `你選擇不再競選、和平卸任，在第 ${term} 任結束後交棒。`
          review.electionResolved = true; review.electionWon = false
        } else if (r.won) {
          ns.term = term + 1
          ns.approval = Math.min(95, ns.approval + 3)
          review.electionResolved = true; review.electionWon = true
          review.playerVotes = r.playerVotes; review.rivalVotes = r.rivalVotes
          review.events = [...review.events, {
            id: uid('ev'), year: review.year, title: '連任成功',
            detail: `總統大選由你以 ${r.playerVotes}% 對 ${r.rivalVotes}% 擊敗對手 ${r.rivalName}，贏得下一任期。`,
            severity: 'good' as const, causedBy: ['總統大選']
          }]
        } else {
          ns.gameOver = true
          ns.endReason = `總統大選落敗：對手 ${r.rivalName} 以 ${r.rivalVotes}% 對 ${r.playerVotes}% 勝出，你的政府結束。`
          review.electionResolved = true; review.electionWon = false
          review.playerVotes = r.playerVotes; review.rivalVotes = r.rivalVotes
          review.events = [...review.events, {
            id: uid('ev'), year: review.year, title: '競選連任失利',
            detail: `對手 ${r.rivalName} 以 ${r.rivalVotes}% 對 ${r.playerVotes}% 勝出，政黨輪替。`,
            severity: 'crisis' as const, causedBy: ['總統大選']
          }]
        }
        review.nextState = ns
        set({ review })
      },

      confirmYear: () => {
        const st = get()
        const rv = st.review
        if (!rv) return
        // 罷免/選舉尚未處理完，不可進下一年
        if (rv.recallPending && !rv.recallResolved) return
        if (rv.electionDue && !rv.electionResolved) return

        const year = rv.year
        const enacted = [
          ...st.active.filter((a) => a.yearEnacted === year),
          ...st.extraDecisions.filter((a) => a.yearEnacted === year)
        ]
        const record: YearRecord = {
          year,
          snapshot: structuredClone(rv.nextState),
          actionsEnacted: enacted,
          events: rv.events,
          changes: rv.changes,
          news: rv.news,
          risks: rv.risks,
          reactions: rv.reactions
        }

        const history = [...st.history, record]
        const gameOver = (rv.nextState as PState).gameOver || (rv.nextState as CState).gameOver

        // 成就
        let achievements = st.achievements
        if (rv.mode === 'president') {
          const ns = rv.nextState as PState
          ns.year = year + 1
          const unlocked = evalPresident(
            { s: ns, balance: rv.balance || 0, term: ns.term, growthStreak: rv.pt?.growthStreak ?? st.growthStreak, year: ns.year, recallSurvived: st.recallSurvived, hadSwan: (rv.pt?.usedSwan || st.usedSwan).length > 0, startDebt: initialPState(st.difficulty).debt },
            achievements.filter((a) => a.unlocked).map((a) => a.id)
          )
          achievements = achievements.map((a) => unlocked.includes(a.id) ? { ...a, unlocked: true } : a)
          set({
            p: ns, history, active: st.active.filter((a) => a.duration !== 'instant'),
            extraDecisions: [], usedSwan: rv.pt?.usedSwan || st.usedSwan,
            growthStreak: rv.pt?.growthStreak ?? 0, achievements, review: null, aiBusy: false
          })
        } else {
          const ns = rv.nextState as CState
          ns.year = year + 1
          const profitStreak = (rv.profit ?? 0) > 0 ? st.profitStreak + 1 : 0
          const unlocked = evalCompany(
            { s: ns, profitStreak, hadSwan: (rv.ct?.usedSwan || st.usedSwan).length > 0, shareCap: regionInfo(ns.region).shareCap },
            achievements.filter((a) => a.unlocked).map((a) => a.id)
          )
          achievements = achievements.map((a) => unlocked.includes(a.id) ? { ...a, unlocked: true } : a)
          set({
            c: ns, history, active: st.active.filter((a) => a.duration !== 'instant'),
            extraDecisions: [], usedSwan: rv.ct?.usedSwan || st.usedSwan,
            profitStreak, achievements, review: null, aiBusy: false
          })
        }
      },

      dismissReview: () => set({ review: null, aiBusy: false })
    }),
    {
      name: 'policy-life-save-v1',
      partialize: (s) => ({
        mode: s.mode, difficulty: s.difficulty, started: s.started, p: s.p, c: s.c,
        active: s.active, extraDecisions: s.extraDecisions, history: s.history,
        achievements: s.achievements, usedSwan: s.usedSwan, growthStreak: s.growthStreak,
        profitStreak: s.profitStreak, lastRecallYear: s.lastRecallYear,
        recallSurvived: s.recallSurvived, codex: s.codex, companySetup: s.companySetup
      })
    }
  )
)

// 背景以 AI 潤飾年度敘事，失敗則保留規則版（不阻斷）
async function enrichNarrative(
  set: (p: Partial<GameStore>) => void,
  get: () => GameStore,
  review: ReviewData,
  state: PState | CState
) {
  try {
    const st = get()
    const stateSummary = summarizeState(st.mode || 'president', state)
    const actions = [...st.active, ...st.extraDecisions]
      .filter((a) => a.yearEnacted === review.year)
      .map((a) => a.name + (a.scale !== 1 ? '(強度' + a.scale + ')' : '')).join('、') || '無重大新決策'
    const events = review.events.map((e) => e.title + '：' + e.detail).join('\n')
    const narrative = await narrateTurn({
      mode: st.mode, year: review.year, stateSummary, actions, events,
      ruleNews: review.news, ruleRisks: review.risks
    })
    if (narrative && get().review?.year === review.year) {
      const rv0 = get().review!
      let mergedNews: NewsItem[] = rv0.news
      const aiStories: NewsItem[] = Array.isArray(narrative.news)
        ? narrative.news
          .filter((n) => n && typeof n.headline === 'string' && n.headline.trim())
          .map((n) => ({
            category: (n.category || '綜合').toString().trim(),
            headline: n.headline.toString().trim(),
            detail: typeof n.detail === 'string' && n.detail.trim() ? n.detail.trim() : undefined
          }))
        : []
      if (aiStories.length >= 3) {
        // AI 產出足夠多則：以 AI 頭條為頭版，其餘為各面報導
        const lead: NewsItem = {
          category: '頭條',
          headline: (narrative.headline || rv0.news[0]?.headline || '年度總結').trim(),
          detail: (narrative.subheadline || '').trim() || rv0.news[0]?.detail
        }
        mergedNews = [lead, ...aiStories].slice(0, 6)
      } else if (aiStories.length > 0) {
        // AI 只給少數幾則：保留規則頭條，AI 報導插入，再以規則報導補滿到 5 則
        const merged: NewsItem[] = [rv0.news[0], ...aiStories]
        for (const rn of rv0.news.slice(1)) {
          if (merged.length >= 6) break
          if (!aiStories.some((a) => a.headline === rn.headline)) merged.push(rn)
        }
        mergedNews = merged
      }
      set({ review: { ...rv0, news: mergedNews, narrative }, aiBusy: false })
    } else {
      set({ aiBusy: false })
    }
  } catch {
    set({ aiBusy: false })
  }
}

export function summarizeState(mode: Mode, s: PState | CState): string {
  if (mode === 'company') {
    const c = s as CState
    return `第${c.year}年，產業${c.industry}，產品「${c.productName}」，總部${c.headquarters}，區域${regionInfo(c.region).name}；營收${Math.round(c.revenue)}萬、損益${Math.round(c.profit)}、現金${Math.round(c.cash)}萬、負債${Math.round(c.debt)}萬、員工${c.employees}人、市占${c.marketShare.toFixed(1)}%、品牌${c.brand.toFixed(0)}、研發${c.rnd.toFixed(0)}、投資人信心${c.investorConfidence.toFixed(0)}、競爭強度${c.competitor.toFixed(0)}`
  }
  const p = s as PState
  return `第${p.year}年第${p.term}任；GDP${Math.round(p.gdp)}億、成長${p.growth.toFixed(1)}%、通膨${p.inflation.toFixed(1)}%、失業${p.unemployment.toFixed(1)}%、債務${Math.round(p.debt)}億、利率${p.interestRate.toFixed(1)}%、收入${Math.round(p.revenue)}億、支出${Math.round(p.spending)}億、可支配${Math.round(p.discretionary)}億、民意${p.approval.toFixed(0)}、社會信任${p.socialTrust.toFixed(0)}、政治穩定${p.politicalStability.toFixed(0)}、反對黨${p.opposition.toFixed(0)}、房價指數${p.housingPrice.toFixed(0)}`
}
