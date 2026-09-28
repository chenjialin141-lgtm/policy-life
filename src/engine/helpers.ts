// 通用工具
export function clamp(v: number, min: number, max: number): number {
  if (Number.isNaN(v)) return min
  return Math.max(min, Math.min(max, v))
}

export function uid(prefix = 'a'): string {
  return prefix + '_' + Math.random().toString(36).slice(2, 9)
}

// 金額格式化（總統：億；企業：萬）
export function fmtYi(v: number): string {
  const n = Math.round(v)
  return n.toLocaleString('zh-TW')
}
export function fmtWan(v: number): string {
  if (Math.abs(v) >= 10000) return (v / 10000).toFixed(2) + ' 億'
  return Math.round(v).toLocaleString('zh-TW') + ' 萬'
}
export function signed(v: number, digits = 1): string {
  const n = v >= 0 ? '+' : ''
  return n + v.toFixed(digits)
}

// 0-100 量表顏色（越高越好時）
export function tone(v: number): string {
  if (v >= 70) return 'text-jade-400'
  if (v >= 45) return 'text-gold-400'
  if (v >= 25) return 'text-rust-400'
  return 'text-rust-500'
}

export function changeTone(delta: number, goodWhenUp: boolean): string {
  if (Math.abs(delta) < 0.05) return 'text-slate-400'
  const up = delta > 0
  const good = goodWhenUp ? up : !up
  return good ? 'text-jade-400' : 'text-rust-400'
}

export interface Feasibility {
  level: 'green' | 'yellow' | 'red' | 'conflict'
  firstYearCost: number
  gap: number
  issues: string[]
  conflicts: string[]
}
