import type { ChangeReason, YearRecord } from '../types'
import type { Contributions } from './policy'

export const indicatorLabels: Record<string, string> = {
  // 總統
  growth: '經濟成長率', inflation: '通膨率', unemployment: '失業率', debt: '政府債務',
  interestRate: '債券利率', housingPrice: '房價指數', inequality: '貧富差距', approval: '民意支持',
  socialTrust: '社會信任', politicalStability: '政治穩定', adminCapacity: '行政能力',
  politicalCapital: '政治資本', govSupport: '執政黨支持', opposition: '反對黨力量',
  defense: '國防量能', education: '教育量能', healthcare: '醫療量能', welfare: '福利量能',
  housing: '住宅量能', energy: '能源量能', trade: '出口動能', revenue: '政府收入', gdp: 'GDP',
  // 企業
  profit: '利潤', cash: '現金', employees: '員工人數', marketShare: '市占率', brand: '品牌力',
  rnd: '研發量能', production: '產能', customers: '客戶數', investorConfidence: '投資人信心',
  stockPrice: '股價', competitor: '競爭強度'
}

// 上升為壞的指標
export const badWhenUp = new Set([
  'unemployment', 'inflation', 'debt', 'inequality', 'housingPrice', 'opposition',
  'competitor', 'interestRate'
])

export function labelOf(key: string): string {
  return indicatorLabels[key] || key
}

export function buildChangeReasons(contrib: Contributions): ChangeReason[] {
  const out: ChangeReason[] = []
  for (const [key, sources] of Object.entries(contrib)) {
    if (!sources.length) continue
    const delta = sources.reduce((a, b) => a + b.amount, 0)
    if (Math.abs(delta) < 0.05) continue
    // 彙整相同來源
    const merged: Record<string, number> = {}
    for (const s of sources) merged[s.source] = (merged[s.source] || 0) + s.amount
    const srcArr = Object.entries(merged)
      .map(([source, amount]) => ({ source, amount: Math.round(amount * 100) / 100 }))
      .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
    out.push({ key, label: labelOf(key), delta: Math.round(delta * 100) / 100, sources: srcArr })
  }
  // 影響大者排前面
  return out.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
}

// 從歷史建構跨年因果鏈（回傳扁平的鏈條項目，供時間線渲染）
export interface ChainItem {
  year: number
  kind: 'policy' | 'event' | 'indicator'
  text: string
  tone: string
  causedBy?: string[]
}
export function buildChain(history: YearRecord[]): ChainItem[] {
  const items: ChainItem[] = []
  for (const rec of history) {
    rec.actionsEnacted.forEach((a) => {
      items.push({ year: rec.year, kind: 'policy', text: a.name + (a.scale !== 1 ? `（強度 ${a.scale}）` : ''), tone: 'policy' })
    })
    rec.events.forEach((e) => {
      items.push({ year: rec.year, kind: 'event', text: e.title, tone: e.severity, causedBy: e.causedBy })
    })
  }
  return items
}
