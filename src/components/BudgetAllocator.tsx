import { useGame, computeAllocated } from '../store/gameStore'
import { budgetBuckets } from '../data/president'
import { fmtYi } from '../engine/helpers'
import { Bar } from './ui'
import { AlertTriangle, Wallet } from 'lucide-react'

export default function BudgetAllocator() {
  const st = useGame()
  const p = st.p!
  const allocated = computeAllocated(st.active, p.year)
  const remaining = p.discretionary - allocated
  const over = remaining < 0
  const pct = p.discretionary > 0 ? (allocated / p.discretionary) * 100 : 0

  return (
    <div className="card-pad">
      <div className="mb-3 flex items-center gap-2">
        <Wallet size={16} className="text-gold-400" />
        <h3 className="section-title">總預算分配</h3>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-ink-900/60 py-2">
          <div className="stat-label">可支配</div>
          <div className="font-mono text-base font-semibold text-slate-100">{fmtYi(p.discretionary)} 億</div>
        </div>
        <div className="rounded-lg bg-ink-900/60 py-2">
          <div className="stat-label">已配置</div>
          <div className="font-mono text-base font-semibold text-gold-400">{fmtYi(allocated)} 億</div>
        </div>
        <div className="rounded-lg bg-ink-900/60 py-2">
          <div className="stat-label">剩餘</div>
          <div className={`font-mono text-base font-semibold ${over ? 'text-rust-400' : 'text-jade-400'}`}>{fmtYi(remaining)} 億</div>
        </div>
      </div>

      <div className="mt-3">
        <Bar value={Math.min(100, pct)} color={over ? '#d45d3f' : pct > 90 ? '#e8c479' : '#2fa971'} height={10} />
        <div className="mt-1.5 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">含預算桶與各項政策的今年支出</span>
          {over ? (
            <span className="flex items-center gap-1 text-rust-400"><AlertTriangle size={12} /> 超支 {fmtYi(-remaining)} 億，將形成赤字並增債</span>
          ) : (
            <span className="text-jade-400">尚在預算內</span>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3.5">
        {budgetBuckets.map((b) => {
          const cur = st.active.find((a) => a.id === b.id)
          const scale = cur?.scale ?? 0
          return (
            <div key={b.id}>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-slate-200">{b.name}</span>
                  <span className="ml-2 text-[11px] text-slate-500">{b.desc}</span>
                </div>
                <span className="font-mono text-xs text-gold-400">{scale > 0 ? fmtYi(b.recurring * scale) + ' 億/年' : '—'}</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="range" min={0} max={3} step={0.5}
                  value={scale}
                  onChange={(e) => st.setBucketScale(b.id, parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="w-10 flex-none text-right font-mono text-xs text-slate-400">×{scale}</span>
              </div>
              {b.id === 'b_housing' && scale > 0 && (
                <div className="text-[11px] text-slate-500">社會住宅今年另需一次性興建經費 {fmtYi(b.cost * scale)} 億，分多年投入。</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
