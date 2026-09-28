import {
  Newspaper, Loader2, ChevronRight, AlertTriangle, CloudLightning, Vote, Gavel,
  Users, Sparkles, Scale, TrendingUp, TrendingDown, Flag
} from 'lucide-react'
import { useGame } from '../store/gameStore'
import { recallChoices } from '../engine/president'
import { fmtYi, fmtWan, signed } from '../engine/helpers'
import type { GameEvent, PState, RiskLevel } from '../types'

const sevStyle: Record<GameEvent['severity'], string> = {
  good: 'border-jade-500/40 bg-jade-500/10 text-jade-400',
  neutral: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  risk: 'border-gold-600/40 bg-gold-500/10 text-gold-400',
  crisis: 'border-rust-500/40 bg-rust-500/10 text-rust-400',
  blackswan: 'border-rust-500/60 bg-rust-500/15 text-rust-400'
}
const riskDot: Record<RiskLevel, string> = {
  opportunity: 'text-jade-400', low: 'text-sky-400', medium: 'text-gold-400', high: 'text-rust-400'
}
const riskLabel: Record<RiskLevel, string> = { opportunity: '機會', low: '低風險', medium: '風險', high: '高風險' }

export default function YearReview() {
  const st = useGame()
  const rv = st.review!
  const mode = rv.mode
  const nar = rv.narrative
  const decisions = [...st.active, ...st.extraDecisions].filter((a) => a.yearEnacted === rv.year)
  const over = !!(rv.nextState as { gameOver?: boolean }).gameOver
  const termLimited = mode === 'president' && (rv.nextState as PState).term >= 2

  const recallBlocking = rv.recallPending && !rv.recallResolved
  const electionBlocking = rv.electionDue && !rv.electionResolved
  const blocked = recallBlocking || electionBlocking

  const headline = nar?.headline || rv.news[0]?.headline || '年度總結'
  const subhead = nar?.subheadline || rv.news[0]?.detail || ''
  const riskTexts: { level: RiskLevel; text: string }[] =
    nar?.risks && nar.risks.length > 0
      ? nar.risks.map((t, i) => ({ level: (i === 0 ? 'medium' : 'low') as RiskLevel, text: t }))
      : rv.risks.map((r) => ({ level: r.level, text: r.text }))

  const topChanges = [...rv.changes].filter((c) => Math.abs(c.delta) >= 0.15).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-6">
      {/* 報紙頭條 */}
      <div className="paper overflow-hidden rounded-xl shadow-lg fade-in">
        <div className="border-b-2 border-black/70 px-5 py-2 text-center">
          <div className="font-serif text-lg font-bold tracking-widest">{mode === 'company' ? '產業財經報' : 'NOVA 國家日報'}</div>
          <div className="text-[11px] opacity-70">第 {rv.year} 年度頭條 · 全部數據由遊戲引擎計算</div>
        </div>
        <div className="px-5 py-4">
          <h1 className="font-serif text-2xl font-bold leading-snug sm:text-3xl">{headline}</h1>
          {subhead && <p className="mt-2 text-sm leading-relaxed opacity-80">{subhead}</p>}
          <div className="mt-3 space-y-2.5">
            {rv.news.slice(1, 6).map((n, i) => (
              <article key={i} className="border-l-2 border-black/40 pl-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="flex-none text-[10px] font-bold tracking-wider opacity-60">【{n.category}】</span>
                  <span className="text-[13px] font-semibold leading-snug">{n.headline}</span>
                </div>
                {n.detail && <p className="mt-0.5 text-[12px] leading-relaxed opacity-80">{n.detail}</p>}
              </article>
            ))}
          </div>
        </div>
      </div>

      {st.aiBusy && (
        <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-gold-600/30 bg-gold-500/5 py-2 text-xs text-gold-400">
          <Loader2 size={14} className="animate-spin" /> AI 正在撰寫更寫實的年度報導與風險（若免費額度用滿，將保留以下規則版本）…
        </div>
      )}

      {/* 財務總覽 */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {mode === 'president' ? (
          <>
            <Kpi label="年度總收入" value={fmtYi(rv.totalRevenue || 0) + ' 億'} />
            <Kpi label="年度總支出" value={fmtYi(rv.totalSpending || 0) + ' 億'} />
            <Kpi label="年度餘絀" value={fmtYi(rv.balance || 0) + ' 億'} bad={(rv.balance || 0) < 0} />
            <Kpi label="債務佔 GDP" value={((rv.debtRatio || 0) * 100).toFixed(0) + '%'} bad={(rv.debtRatio || 0) > 1} />
          </>
        ) : (
          <>
            <Kpi label="年度營收" value={fmtWan(rv.ct?.revenue || 0)} />
            <Kpi label="年度損益" value={fmtWan(rv.profit || 0)} bad={(rv.profit || 0) < 0} />
            <Kpi label="現金水位" value={fmtWan((rv.nextState as { cash?: number }).cash || 0)} />
            <Kpi label="現金可支應" value={(rv.monthsCash || 0).toFixed(1) + ' 個月'} bad={(rv.monthsCash || 0) < 3} />
          </>
        )}
      </div>

      {/* 因果對照：決策 → 事件 → 數據 */}
      <section className="mt-4 card-pad">
        <h2 className="section-title mb-3">今年的因果鏡</h2>

        <div className="mb-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-jade-400"><Scale size={13} /> 你做了什麼</div>
          {decisions.length === 0 ? (
            <p className="text-xs text-slate-500">今年沒有新增重大決策（維持現狀也是一種選擇）。</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {decisions.map((a) => (
                <span key={a.id} className="rounded-full border border-jade-500/30 bg-jade-500/10 px-2.5 py-1 text-[11px] text-jade-300">
                  {a.name}{a.scale !== 1 ? ` ×${a.scale}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mb-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gold-400"><AlertTriangle size={13} /> 世界如何回應</div>
          {rv.events.length === 0 ? (
            <p className="text-xs text-slate-500">今年沒有突發事件，局勢大致平穩。</p>
          ) : (
            <div className="space-y-2">
              {rv.events.map((e) => {
                const flavor = nar?.eventFlavors?.[e.title]
                return (
                  <div key={e.id} className={`rounded-lg border px-3 py-2 ${sevStyle[e.severity]}`}>
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      {e.blackSwan || e.title.startsWith('黑天鵝') ? <CloudLightning size={14} className="flex-none" /> : <AlertTriangle size={13} className="flex-none" />}
                      {e.title}
                    </div>
                    <div className="mt-0.5 text-[12px] opacity-85">{flavor || e.detail}</div>
                    {e.causedBy && e.causedBy.length > 0 && (
                      <div className="mt-1 text-[10px] opacity-70">觸發關聯：{e.causedBy.join('、')}</div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-sky-400">
            <TrendingUp size={13} /> 指標因此改變
          </div>
          {topChanges.length === 0 ? (
            <p className="text-xs text-slate-500">今年各項指標變動不大。</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-ink-700">
              {topChanges.slice(0, 8).map((c) => (
                <div key={c.key} className="flex items-center justify-between gap-2 border-b border-ink-700/60 bg-ink-900/40 px-3 py-1.5 text-xs last:border-0">
                  <span className="text-slate-300">{c.label}</span>
                  <span className="flex items-center gap-2">
                    {c.sources.slice(0, 1).map((s) => (
                      <span key={s.source} className="hidden text-[10px] text-slate-600 sm:inline">{s.source}</span>
                    ))}
                    <span className={`flex w-16 items-center justify-end gap-0.5 font-mono ${c.delta > 0 ? 'text-jade-400' : 'text-rust-400'}`}>
                      {c.delta > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{signed(c.delta)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 罷免流程 */}
      {rv.recallPending && !rv.recallResolved && (
        <section className="mt-4 rounded-xl border-2 border-rust-500/50 bg-rust-500/10 p-4 fade-in">
          <h2 className="flex items-center gap-2 text-base font-semibold text-rust-400"><Gavel size={18} /> 反對陣營發起罷免行動</h2>
          <p className="mt-1 text-sm text-slate-300">民意與社會信任跌到危險區間，反對黨已啟動罷免程序。你要如何回應？最後結果由你的狀態與選擇計算，不是隨機。</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {recallChoices.map((c) => (
              <button key={c.id} onClick={() => st.resolveRecallChoice(c.id)}
                className="rounded-lg border border-ink-600 bg-ink-900/70 px-3 py-2 text-left text-sm text-slate-200 hover:border-rust-500/60 hover:bg-ink-800">
                {c.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 選舉流程 */}
      {rv.electionDue && !rv.electionResolved && (
        <section className="mt-4 rounded-xl border-2 border-gold-600/50 bg-gold-500/10 p-4 fade-in">
          {termLimited ? (
            <>
              <h2 className="flex items-center gap-2 text-base font-semibold text-gold-400"><Vote size={18} /> 第二任最後一年：任期屆滿</h2>
              <p className="mt-1 text-sm text-slate-300">憲法規定總統連選得連任一次，你已做完兩任，今年將在和平交接中卸下職務。來看看這八年留下了什麼。</p>
              <div className="mt-3">
                <button onClick={() => st.resolveElectionChoice(false)} className="btn-primary"><Flag size={15} /> 完成任期、檢視施政報告</button>
              </div>
            </>
          ) : (
            <>
              <h2 className="flex items-center gap-2 text-base font-semibold text-gold-400"><Vote size={18} /> 第 {rv.year} 年總統大選</h2>
              <p className="mt-1 text-sm text-slate-300">四年任期到了。選舉結果由你的經濟表現、民意、社會信任與在野強度共同決定，不是隨機判定。</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => st.resolveElectionChoice(true)} className="btn-primary"><Flag size={15} /> 競選連任</button>
                <button onClick={() => st.resolveElectionChoice(false)} className="btn-ghost">不參選、和平交棒</button>
              </div>
            </>
          )}
        </section>
      )}

      {/* 選舉結果 */}
      {rv.electionResolved && rv.electionRan && (
        <section className="mt-4 card-pad fade-in">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-100"><Vote size={18} className="text-gold-400" /> 大選結果</h2>
          <div className="mt-2 flex items-center justify-around rounded-lg bg-ink-900/60 py-4 text-center">
            <div>
              <div className="text-xs text-slate-400">你</div>
              <div className={`font-mono text-2xl font-bold ${rv.electionWon ? 'text-jade-400' : 'text-rust-400'}`}>{rv.playerVotes}%</div>
            </div>
            <div className="text-slate-500">對</div>
            <div>
              <div className="text-xs text-slate-400">{rv.rivalName}</div>
              <div className={`font-mono text-2xl font-bold ${rv.electionWon ? 'text-rust-400' : 'text-jade-400'}`}>{rv.rivalVotes}%</div>
            </div>
          </div>
        </section>
      )}

      {/* 風險預測 */}
      <section className="mt-4 card-pad">
        <h2 className="section-title mb-3 flex items-center gap-2"><Sparkles size={15} className="text-gold-400" /> AI 對第 {rv.year + 1} 年的預測</h2>
        <ul className="space-y-2">
          {riskTexts.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className={`mt-0.5 flex-none font-medium ${riskDot[r.level]}`}>● {riskLabel[r.level]}</span>
              <span className="text-slate-300">{r.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] text-slate-600">預測使用「可能、風險、預期」語氣，隱藏事件不會提前劇透；真實結果取決於你的下一步。</p>
      </section>

      {/* 利害關係人 */}
      <section className="mt-4 card-pad">
        <h2 className="section-title mb-3 flex items-center gap-2"><Users size={15} className="text-sky-400" /> 各方態度</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {rv.reactions.slice(0, 8).map((r) => (
            <div key={r.id} className="rounded-lg bg-ink-900/50 px-3 py-2">
              <div className={`text-xs font-medium ${r.tone === 'positive' ? 'text-jade-400' : r.tone === 'negative' ? 'text-rust-400' : 'text-slate-300'}`}>{r.name}</div>
              <div className="mt-0.5 text-[11px] leading-relaxed text-slate-400">{r.comment}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 底部行動 */}
      <div className="sticky bottom-3 mt-5">
        {blocked ? (
          <div className="rounded-lg border border-rust-500/50 bg-rust-500/15 py-3 text-center text-sm text-rust-400">
            {recallBlocking ? '請先決定如何回應罷免，才能進入下一年' : '請先決定是否競選連任，才能進入下一年'}
          </div>
        ) : (
          <button onClick={() => st.confirmYear()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 py-3.5 text-base font-semibold text-ink-950 shadow-lg transition-colors hover:bg-gold-400">
            {over ? '查看你的結算報告' : `進入第 ${rv.year + 1} 年`} <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  )
}

function Kpi({ label, value, bad }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className="rounded-lg border border-ink-700 bg-ink-850/70 px-3 py-2 text-center">
      <div className="stat-label">{label}</div>
      <div className={`mt-0.5 font-mono text-base font-semibold ${bad ? 'text-rust-400' : 'text-slate-100'}`}>{value}</div>
    </div>
  )
}
