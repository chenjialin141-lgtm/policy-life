import { useEffect, useState } from 'react'
import { BookOpen, RotateCcw, Trophy, GitBranch, Loader2, Quote } from 'lucide-react'
import { useGame, summarizeState } from '../store/gameStore'
import { buildReport, type ReportAI } from '../services/aiService'
import { fmtYi, fmtWan, signed } from '../engine/helpers'
import type { CState, Mode, PState, YearRecord } from '../types'

interface LocalChain { chain: string[]; lesson: string }

export default function EndReport() {
  const st = useGame()
  const mode: Mode = st.mode || 'president'
  const final = (mode === 'company' ? st.c : st.p) as PState | CState
  const history = st.history
  const [ai, setAi] = useState<ReportAI | null>(null)
  const [loading, setLoading] = useState(true)

  const first = history[0]?.snapshot as (PState | CState) | undefined
  const endReason = (final as PState).endReason
  const unlocked = st.achievements.filter((a) => a.unlocked)

  useEffect(() => {
    let alive = true
    ;(async () => {
      const timeline = history
        .map((r) => {
          const acts = r.actionsEnacted.map((a) => a.name).join('、') || '無'
          const evs = r.events.map((e) => e.title).join('、') || '平穩'
          return `第${r.year}年｜決策:${acts}｜事件:${evs}`
        })
        .join('\n')
      const r = await buildReport({ mode, stateSummary: summarizeState(mode, final), timeline, endReason })
      if (alive) { setAi(r); setLoading(false) }
    })()
    return () => { alive = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const localChains = buildLocalChains(history, mode)
  const chains = ai?.chains?.length ? ai.chains : localChains

  const pMetrics: { label: string; f: (s: PState) => string; d: (a: PState, b: PState) => number }[] = [
    { label: 'GDP（億）', f: (s) => fmtYi(s.gdp), d: (a, b) => b.gdp - a.gdp },
    { label: '經濟成長', f: (s) => s.growth.toFixed(1) + '%', d: (a, b) => b.growth - a.growth },
    { label: '失業率', f: (s) => s.unemployment.toFixed(1) + '%', d: (a, b) => b.unemployment - a.unemployment },
    { label: '政府債務（億）', f: (s) => fmtYi(s.debt), d: (a, b) => b.debt - a.debt },
    { label: '民意', f: (s) => s.approval.toFixed(0), d: (a, b) => b.approval - a.approval },
    { label: '社會信任', f: (s) => s.socialTrust.toFixed(0), d: (a, b) => b.socialTrust - a.socialTrust }
  ]
  const cMetrics: { label: string; f: (s: CState) => string; d: (a: CState, b: CState) => number }[] = [
    { label: '年度營收（萬）', f: (s) => fmtWan(s.revenue), d: (a, b) => b.revenue - a.revenue },
    { label: '現金（萬）', f: (s) => fmtWan(s.cash), d: (a, b) => b.cash - a.cash },
    { label: '員工（人）', f: (s) => String(s.employees), d: (a, b) => b.employees - a.employees },
    { label: '市占率', f: (s) => s.marketShare.toFixed(1) + '%', d: (a, b) => b.marketShare - a.marketShare },
    { label: '品牌力', f: (s) => s.brand.toFixed(0), d: (a, b) => b.brand - a.brand },
    { label: '投資人信心', f: (s) => s.investorConfidence.toFixed(0), d: (a, b) => b.investorConfidence - a.investorConfidence }
  ]
  const metrics = (mode === 'company' ? cMetrics : pMetrics) as { label: string; f: (s: never) => string; d: (a: never, b: never) => number }[]

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <header className="text-center fade-in">
        <BookOpen size={30} className="mx-auto text-gold-400" />
        <h1 className="mt-3 font-serif text-3xl font-bold text-slate-100">
          {ai?.title || (mode === 'company' ? '我的經營人生' : '我的執政人生')}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          從第 1 年到第 {history.length} 年 · {mode === 'company' ? (final as CState).productName : 'Republic of Nova'}
        </p>
        {endReason && (
          <div className="mx-auto mt-4 max-w-xl rounded-lg border border-rust-500/40 bg-rust-500/10 px-4 py-2.5 text-sm text-rust-300">
            {endReason}
          </div>
        )}
      </header>

      {loading && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gold-400">
          <Loader2 size={15} className="animate-spin" /> AI 正在為這段人生梳理因果鏈…
        </div>
      )}

      {ai?.summary && (
        <div className="mt-6 flex gap-3 rounded-xl border border-ink-700 bg-ink-850 p-4">
          <Quote size={18} className="flex-none text-gold-500" />
          <p className="text-sm leading-relaxed text-slate-300">{ai.summary}</p>
        </div>
      )}

      {/* 因果鏈 */}
      <section className="mt-6">
        <h2 className="section-title mb-3 flex items-center gap-2"><GitBranch size={16} className="text-sky-400" /> 跨年因果鏈</h2>
        <div className="space-y-3">
          {chains.map((c, i) => (
            <div key={i} className="card-pad">
              <ol className="space-y-2">
                {c.chain.map((step, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-gold-500" />
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-2 border-t border-ink-700 pt-2 text-xs text-slate-400">教訓：{c.lesson}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 數據對比 */}
      {first && (
        <section className="mt-6">
          <h2 className="section-title mb-3">關鍵變化（就職 → 結束）</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {metrics.map((m) => {
              const delta = m.d(first as never, final as never)
              return (
                <div key={m.label} className="rounded-lg border border-ink-700 bg-ink-850 px-3 py-2.5">
                  <div className="stat-label">{m.label}</div>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-mono text-sm text-slate-500 line-through">{m.f(first as never)}</span>
                    <span className="font-mono text-base font-semibold text-slate-100">{m.f(final as never)}</span>
                  </div>
                  <div className={`font-mono text-[11px] ${delta > 0 ? 'text-jade-400' : delta < 0 ? 'text-rust-400' : 'text-slate-500'}`}>
                    {signed(delta)}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 成就 */}
      <section className="mt-6">
        <h2 className="section-title mb-3 flex items-center gap-2"><Trophy size={16} className="text-gold-400" /> 達成成就（{unlocked.length}/{st.achievements.length}）</h2>
        <div className="flex flex-wrap gap-1.5">
          {st.achievements.map((a) => (
            <span key={a.id} className={`rounded-full border px-3 py-1 text-xs ${a.unlocked ? 'border-gold-600/50 bg-gold-500/10 text-gold-400' : 'border-ink-700 text-slate-600'}`}>
              {a.unlocked ? a.name : '？？？'}
            </span>
          ))}
        </div>
      </section>

      {ai?.verdict && (
        <div className="mt-6 rounded-xl border border-gold-600/30 bg-gold-500/5 p-4 text-center">
          <div className="stat-label mb-1">歷史的記載</div>
          <p className="font-serif text-base italic text-slate-200">{ai.verdict}</p>
        </div>
      )}

      <button onClick={() => st.backHome()} className="btn-primary mt-8 w-full py-3 text-base">
        <RotateCcw size={17} /> 開啟新人生
      </button>
    </div>
  )
}

function buildLocalChains(history: YearRecord[], mode: Mode): LocalChain[] {
  const out: LocalChain[] = []
  const crises = history.flatMap((r) => r.events.filter((e) => e.severity === 'crisis' || e.severity === 'blackswan').map((e) => ({ r, e })))
  for (const { r, e } of crises.slice(0, 2)) {
    const prior = r.actionsEnacted.map((a) => `第${r.year}年：${a.name}`)
    out.push({
      chain: [...prior.slice(-2), `第${r.year}年：${e.title}`, e.detail],
      lesson: mode === 'company' ? '現金流與市場紀律是企業的生命線，擴張必須與資產負債表匹配。' : '短期受歡迎的政策可能埋下長期財政或信任危機，決策要看多年後的餘波。'
    })
  }
  if (mode === 'president') {
    const first = history[0]?.snapshot as PState | undefined
    const last = history[history.length - 1]?.snapshot as PState | undefined
    if (first && last && last.debt - first.debt > 300) {
      out.push({
        chain: [`第1年：政府債務 ${fmtYi(first.debt)}`, `連年財政缺口靠舉債填補，利息逐年墊高`, `第${history.length}年：債務來到 ${fmtYi(last.debt)}，可支配預算被利息排擠`],
        lesson: '債務不是免費的：今天的赤字，會變成明天每年都要付的利息。'
      })
    }
  } else {
    const last = history[history.length - 1]?.snapshot as CState | undefined
    if (last && last.cash < 500) {
      out.push({
        chain: ['現金水位持續偏低', '融資空間隨信心下降而收斂', '一次突發事件就可能擊斷資金鏈'],
        lesson: '獲利是帳面的，現金才是真的；永遠保留足以撐過寒冬的現金緩衝。'
      })
    }
  }
  if (out.length === 0) {
    out.push({
      chain: ['你在任內維持了大致穩定的局面', '沒有爆發不可逆的重大危機', '穩定本身就是一種成就'],
      lesson: '治理與經營不只要追求高成長，也要避免讓系統變得脆弱。'
    })
  }
  return out.slice(0, 3)
}
