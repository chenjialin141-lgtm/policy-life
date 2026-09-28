import { useGame } from '../store/gameStore'
import { signed } from '../engine/helpers'
import type { ChangeReason, GameEvent, YearRecord } from '../types'
import { Newspaper, GitCommitVertical } from 'lucide-react'

const sevColor: Record<GameEvent['severity'], string> = {
  good: 'text-jade-400 border-jade-500/40 bg-jade-500/10',
  neutral: 'text-sky-400 border-sky-500/40 bg-sky-500/10',
  risk: 'text-gold-400 border-gold-600/40 bg-gold-500/10',
  crisis: 'text-rust-400 border-rust-500/40 bg-rust-500/10',
  blackswan: 'text-rust-400 border-rust-500/50 bg-rust-500/15'
}

export default function CausalTimeline() {
  const history = useGame((s) => s.history)
  if (history.length === 0) {
    return (
      <div className="card-pad text-center text-sm text-slate-500">
        結束第一個年度後，這裡會出現逐年的因果時間線：你做了什麼、世界如何回應、指標怎麼改變。
      </div>
    )
  }
  return (
    <div className="card-pad">
      <h3 className="section-title mb-4">政策時間線與因果鏈</h3>
      <div className="space-y-0">
        {history.map((rec, i) => (
          <YearRow key={rec.year} rec={rec} last={i === history.length - 1} />
        ))}
      </div>
    </div>
  )
}

function YearRow({ rec, last }: { rec: YearRecord; last: boolean }) {
  const topChanges = [...rec.changes]
    .filter((c) => Math.abs(c.delta) >= 0.15)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 5)

  return (
    <div className="grid grid-cols-[58px_22px_1fr] gap-2">
      {/* 年份 */}
      <div className="pt-1 text-right">
        <div className="font-mono text-sm font-semibold text-gold-400">第{rec.year}年</div>
      </div>
      {/* 軸 */}
      <div className="relative flex justify-center">
        {!last && <div className="absolute left-1/2 top-3 h-full w-px -translate-x-1/2 bg-ink-600" />}
        <div className="z-10 mt-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold-500 bg-ink-900">
          <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
        </div>
      </div>
      {/* 內容 */}
      <div className={`${last ? '' : 'pb-6'}`}>
        {rec.news[0] && (
          <div className="mb-2 flex items-start gap-2 rounded-lg border border-ink-700 bg-ink-900/50 p-2.5">
            <Newspaper size={14} className="mt-0.5 flex-none text-sky-400" />
            <div>
              <div className="text-sm font-medium text-slate-200">{rec.news[0].headline}</div>
              {rec.news[0].detail && <div className="mt-0.5 text-[11px] text-slate-400">{rec.news[0].detail}</div>}
            </div>
          </div>
        )}

        {rec.actionsEnacted.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {rec.actionsEnacted.map((a) => (
              <span key={a.id} className="rounded-full border border-jade-500/30 bg-jade-500/10 px-2 py-0.5 text-[11px] text-jade-400">
                {a.name}{a.scale !== 1 ? ` ×${a.scale}` : ''}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-1.5">
          {rec.events.map((e) => (
            <div key={e.id} className={`rounded-lg border px-2.5 py-1.5 ${sevColor[e.severity]}`}>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <GitCommitVertical size={12} className="flex-none" />
                {e.title}
                {e.causedBy && e.causedBy.length > 0 && (
                  <span className="ml-auto hidden text-[10px] opacity-70 sm:inline">來自：{e.causedBy.slice(0, 2).join('、')}</span>
                )}
              </div>
              <div className="mt-0.5 text-[11px] opacity-80">{e.detail}</div>
            </div>
          ))}
        </div>

        {topChanges.length > 0 && (
          <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {topChanges.map((c) => <ChangeLine key={c.key} c={c} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function ChangeLine({ c }: { c: ChangeReason }) {
  const positive = c.delta > 0
  return (
    <div className="rounded-md bg-ink-900/50 px-2 py-1 text-[11px]">
      <div className="flex items-center justify-between">
        <span className="text-slate-400">{c.label}</span>
        <span className={`font-mono ${positive ? 'text-jade-400' : 'text-rust-400'}`}>{signed(c.delta)}</span>
      </div>
      {c.sources && c.sources.length > 0 && (
        <div className="mt-0.5 truncate text-[10px] text-slate-600">
          主因：{c.sources.slice(0, 2).map((s) => s.source).join('、')}
        </div>
      )}
    </div>
  )
}
