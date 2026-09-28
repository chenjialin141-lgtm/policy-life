import type { ActionDef, Mode, NewsItem } from '../types'
import { parsePolicyLocal, sanitizeCustom } from './fallback'

export interface MarketAssessment {
  summary: string
  demand: 'high' | 'mid' | 'low'
  competition: number
  trend: string
  opportunities: string[]
  risks: string[]
  adjust: { revenue?: number; marketShare?: number; brand?: number; rnd?: number; investorConfidence?: number }
  sources: { title: string; url: string; date?: string }[]
  asOf: string
  live: boolean
  dateRange?: { from: string; to: string } | null
  dataNote?: string
}
export interface NarrativeAI {
  headline: string
  subheadline: string
  news?: NewsItem[]
  eventFlavors: Record<string, string>
  risks: string[]
}
export interface LocationCheck {
  valid: boolean
  canonical: string
  country: string
  kind: string
  note: string
  suggestion?: string
  offline?: boolean
}
export interface ReportAI {
  title: string
  summary: string
  chains: { chain: string[]; lesson: string }[]
  verdict: string
}

async function post(path: string, body: Record<string, unknown>): Promise<any> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data) throw new Error(data?.error || ('HTTP ' + res.status))
  return data
}

// 自由輸入政策：AI 解析為準，失敗退回關鍵詞規則
export async function parsePolicyAI(
  mode: Mode, text: string, stateSummary: string, existing: string
): Promise<{ def: ActionDef; scale: number; source: 'ai' | 'rule' } | null> {
  try {
    const data = await post('/api/ai', { task: 'parsePolicy', mode, text, stateSummary, existing })
    if (data.ok && data.result) {
      const def = sanitizeCustom(data.result, mode)
      if (def && Object.keys(def.effects).length > 0) return { def, scale: 1, source: 'ai' }
    }
  } catch (e) {
    console.warn('[AI parsePolicy] 退回規則解析：', (e as Error).message)
  }
  const local = parsePolicyLocal(mode, text)
  if (local) return { ...local, source: 'rule' }
  return null
}

export async function marketAssessment(product: string, location: string, region: string): Promise<MarketAssessment | null> {
  try {
    const data = await post('/api/market', { product, location, region })
    if (data.ok && data.result) return data.result as MarketAssessment
  } catch (e) {
    console.warn('[AI market] 聯網評估失敗：', (e as Error).message)
  }
  return null
}

export async function validateLocation(query: string): Promise<LocationCheck | null> {
  try {
    const data = await post('/api/ai', { task: 'validateLocation', query })
    if (data.ok && data.result && typeof data.result.valid === 'boolean') {
      return data.result as LocationCheck
    }
  } catch (e) {
    console.warn('[AI validateLocation] 地點查驗失敗：', (e as Error).message)
  }
  return null
}

export async function narrateTurn(payload: Record<string, unknown>): Promise<NarrativeAI | null> {
  try {
    const data = await post('/api/ai', { task: 'narrative', ...payload })
    if (data.ok && data.result) return data.result as NarrativeAI
  } catch (e) {
    console.warn('[AI narrative] 使用規則新聞：', (e as Error).message)
  }
  return null
}

export async function askAdvisor(mode: Mode, question: string, stateSummary: string, historySummary: string): Promise<string | null> {
  try {
    const data = await post('/api/ai', { task: 'advisor', mode, question, stateSummary, historySummary })
    if (data.ok && data.text) return data.text as string
  } catch (e) {
    console.warn('[AI advisor] 無法回應：', (e as Error).message)
  }
  return null
}

export async function buildReport(payload: Record<string, unknown>): Promise<ReportAI | null> {
  try {
    const data = await post('/api/ai', { task: 'report', ...payload })
    if (data.ok && data.result) return data.result as ReportAI
  } catch (e) {
    console.warn('[AI report] 使用規則報告：', (e as Error).message)
  }
  return null
}
