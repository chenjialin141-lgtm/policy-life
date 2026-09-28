import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export function Card({ children, className = '', pad = true }: { children: ReactNode; className?: string; pad?: boolean }) {
  return <div className={`card ${pad ? 'p-4' : ''} ${className}`}>{children}</div>
}

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="section-title">{children}</h3>
      {right}
    </div>
  )
}

export function Stat({
  label, value, sub, bar, barColor = '#d4a84b', delta, goodWhenUp
}: {
  label: string
  value: string
  sub?: string
  bar?: number
  barColor?: string
  delta?: number
  goodWhenUp?: boolean
}) {
  const showDelta = typeof delta === 'number' && Math.abs(delta) >= 0.05
  const up = (delta ?? 0) > 0
  const good = goodWhenUp ? up : !up
  const deltaColor = showDelta ? (good ? 'text-jade-400' : 'text-rust-400') : ''
  return (
    <div className="rounded-lg border border-ink-700 bg-ink-850/60 px-3 py-2.5">
      <div className="stat-label">{label}</div>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <span className="font-mono text-lg font-semibold text-slate-100">{value}</span>
        {showDelta && (
          <span className={`font-mono text-xs ${deltaColor}`}>{up ? '▲' : '▼'} {Math.abs(delta!).toFixed(1)}</span>
        )}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-slate-400">{sub}</div>}
      {typeof bar === 'number' && (
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
          <div className="h-full rounded-full transition-all" style={{ width: Math.max(0, Math.min(100, bar)) + '%', background: barColor }} />
        </div>
      )}
    </div>
  )
}

export function Bar({ value, color = '#d4a84b', height = 8 }: { value: number; color?: string; height?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-full bg-ink-700" style={{ height }}>
      <div className="h-full rounded-full transition-all" style={{ width: Math.max(0, Math.min(100, value)) + '%', background: color }} />
    </div>
  )
}

export function Tag({ children, color = 'slate' }: { children: ReactNode; color?: 'slate' | 'gold' | 'jade' | 'rust' | 'sky' }) {
  const map: Record<string, string> = {
    slate: 'border-ink-600 text-slate-300',
    gold: 'border-gold-600/50 text-gold-400',
    jade: 'border-jade-500/40 text-jade-400',
    rust: 'border-rust-500/40 text-rust-400',
    sky: 'border-sky-500/40 text-sky-400'
  }
  return <span className={`inline-flex items-center rounded-full border bg-ink-900/60 px-2 py-0.5 text-[11px] ${map[color]}`}>{children}</span>
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`card my-8 w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} fade-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink-700 px-5 py-3.5">
          <h3 className="font-semibold text-slate-100">{title}</h3>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-ink-700 hover:text-slate-200" aria-label="關閉">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  )
}
