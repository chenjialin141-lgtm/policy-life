import { useState, useRef } from 'react'
import {
  Wand2, Loader2, CheckCircle2, AlertTriangle, XCircle, ShieldAlert,
  X, Sparkles, Check, Ban
} from 'lucide-react'
import { useGame, computeAllocated, yearCost } from '../store/gameStore'
import { parsePolicyAI } from '../services/aiService'
import { presidentPolicies } from '../data/president'
import { companyActions } from '../data/company'
import { fmtYi, fmtWan } from '../engine/helpers'
import type { Feasibility } from '../engine/helpers'
import { presidentFeasibility, companyFeasibility } from '../engine/policy'
import type { ActionDef, Mode } from '../types'

const pCats = ['財政稅制', '勞動經濟', '居住社會', '能源產業', '政府治理']
const cCats = ['行銷', '研發', '人力', '營運', '財務', '策略']

const levelMeta: Record<Feasibility['level'], { label: string; box: string; icon: typeof CheckCircle2 }> = {
  green: { label: '可行性高', box: 'border-jade-500/40 bg-jade-500/10 text-jade-400', icon: CheckCircle2 },
  yellow: { label: '有風險，仍可嘗試', box: 'border-gold-600/40 bg-gold-500/10 text-gold-400', icon: AlertTriangle },
  red: { label: '資源嚴重不足', box: 'border-rust-500/50 bg-rust-500/10 text-rust-400', icon: XCircle },
  conflict: { label: '與現行政策衝突', box: 'border-rust-500/50 bg-rust-500/10 text-rust-400', icon: ShieldAlert }
}

export default function PolicyComposer({ mode }: { mode: Mode }) {
  const st = useGame()
  const year = st.p?.year ?? st.c?.year ?? 1
  const templates = mode === 'company' ? companyActions : presidentPolicies
  const cats = mode === 'company' ? cCats : pCats
  const [cat, setCat] = useState(cats[0])

  const [selected, setSelected] = useState<ActionDef | null>(null)
  const [selSource, setSelSource] = useState<'template' | 'ai' | 'rule'>('template')
  const [scale, setScale] = useState(1)
  const [freeText, setFreeText] = useState('')
  const [parsing, setParsing] = useState(false)
  const [parseNote, setParseNote] = useState('')
  const previewRef = useRef<HTMLDivElement>(null)

  // 窄螢幕為單欄排版，預覽卡會排在模板清單下方；選取後自動捲到預覽卡，避免玩家以為點了沒反應
  const scrollToPreview = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      requestAnimationFrame(() => requestAnimationFrame(() =>
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })))
    }
  }

  const money = (n: number) => (mode === 'company' ? fmtWan(n) : fmtYi(n) + ' 億')
  const unit = mode === 'company' ? '萬' : '億'
  const allocated = computeAllocated(st.active, year)
  const feas: Feasibility | null = selected
    ? mode === 'president'
      ? presidentFeasibility(selected, scale, st.p!, st.active, allocated)
      : companyFeasibility(selected, scale, st.c!, st.active)
    : null

  function pick(def: ActionDef) {
    setSelected(def)
    setSelSource('template')
    setScale(1)
    setParseNote('')
    scrollToPreview()
  }

  async function parseFree() {
    const text = freeText.trim()
    if (!text || parsing) return
    setParsing(true)
    setParseNote('')
    try {
      const stateSummary = mode === 'company'
        ? st.c ? summarize(st.c) : ''
        : st.p ? summarize(st.p) : ''
      const existingNames = st.active.filter((a) => a.scale > 0).map((a) => a.name).join('、')
      const r = await parsePolicyAI(mode, text, stateSummary, existingNames)
      if (r) {
        setSelected(r.def)
        setScale(r.scale)
        setSelSource(r.source === 'ai' ? 'ai' : 'rule')
        setParseNote(r.source === 'ai' ? '已由 AI 解析為政策物件，並通過引擎可行性檢查。' : 'AI 額度用滿，已改用離線規則解析，仍可正常遊玩。')
        scrollToPreview()
      } else {
        setParseNote('我無法把這段話對應成可執行的政策，請換個更具體的說法，例如「把基本工資提高到 32,000 元」。')
      }
    } finally {
      setParsing(false)
    }
  }

  function enact() {
    if (!selected) return
    const res = st.enact(selected, scale)
    if (res.ok) {
      setSelected(null)
      setFreeText('')
      setParseNote('')
    } else {
      setParseNote(res.error || '無法執行這項政策。')
    }
  }

  const implemented = [...st.active, ...st.extraDecisions]

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {/* 左：快速模板 */}
      <div className="card-pad">
        <h3 className="section-title mb-2">快速政策模板</h3>
        <div className="mb-2 flex flex-wrap gap-1">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-2.5 py-1 text-[11px] ${cat === c ? 'bg-gold-500 text-ink-950' : 'bg-ink-800 text-slate-400 hover:text-slate-200'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="max-h-[340px] space-y-1.5 overflow-y-auto pr-1">
          {templates.filter((t) => t.category === cat).map((t) => {
            const on = st.active.some((a) => a.id === t.id && a.scale > 0)
            return (
              <button key={t.id} onClick={() => pick(t)}
                className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${selected?.id === t.id ? 'border-gold-500 bg-gold-500/10' : 'border-ink-700 bg-ink-900/40 hover:border-ink-500'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-slate-200">{t.name}</span>
                  {on && <Check size={14} className="flex-none text-jade-400" />}
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-slate-500">{t.desc}</div>
                <div className="mt-1 font-mono text-[10px] text-slate-600">
                  {t.cost > 0 ? `首年 ${money(t.cost)}` : '無直接預算'}
                  {t.recurring !== 0 ? ` · 每年 ${t.recurring > 0 ? money(t.recurring) : '節省 ' + money(-t.recurring)}` : ''}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 右：自由輸入 + 可行性 + 已實施 */}
      <div className="space-y-3">
        <div className="card-pad">
          <h3 className="section-title mb-2 flex items-center gap-1.5"><Sparkles size={14} className="text-gold-400" /> 自由輸入政策</h3>
          <textarea
            className="input min-h-[68px] resize-y"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            placeholder={mode === 'company' ? '例：我要砸 500 萬做 AI 轉型、把產品賣到東南亞、全體調薪 10%…' : '例：把基本工資提高到 35,000、興建 100 萬戶社會住宅、取消企業所得稅…'}
          />
          <button className="btn-primary mt-2 w-full" onClick={parseFree} disabled={parsing}>
            {parsing ? <Loader2 size={15} className="animate-spin" /> : <Wand2 size={15} />}
            讓 AI 解析這項政策
          </button>
          {parseNote && <p className="mt-2 text-[11px] leading-relaxed text-slate-400">{parseNote}</p>}
        </div>

        {selected && feas && (
          <div ref={previewRef} className="card-pad fade-in">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-slate-100">{selected.name}</div>
                <div className="text-[11px] text-slate-500">
                  {selSource === 'ai' ? 'AI 解析' : selSource === 'rule' ? '離線規則解析' : '模板'} · {selected.category}
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-300"><X size={16} /></button>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-400">{selected.desc}</p>

            {/* 力度 */}
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[11px] text-slate-400">
                <span>執行力度</span><span className="font-mono text-gold-400">×{scale.toFixed(1)}</span>
              </div>
              <input type="range" min={0.5} max={2} step={0.1} value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))} className="slider w-full" />
            </div>

            {/* 可行性 */}
            <div className={`mt-3 rounded-lg border px-3 py-2 ${levelMeta[feas.level].box}`}>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                {(() => { const I = levelMeta[feas.level].icon; return <I size={15} /> })()}
                {levelMeta[feas.level].label}
              </div>
              <div className="mt-1 font-mono text-[11px] opacity-90">
                首年約需 {money(feas.firstYearCost)}
                {feas.gap > 0 && <span className="ml-2">缺口 {money(feas.gap)}{unit}</span>}
              </div>
            </div>

            {feas.conflicts.length > 0 && (
              <ul className="mt-2 space-y-1">
                {feas.conflicts.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-rust-300">
                    <ShieldAlert size={12} className="mt-0.5 flex-none" /> 與現行政策衝突：{c}
                  </li>
                ))}
              </ul>
            )}
            {feas.issues.length > 0 && (
              <ul className="mt-2 space-y-1">
                {feas.issues.map((x, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-300">
                    <AlertTriangle size={12} className="mt-0.5 flex-none text-gold-400" /> {x}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={enact}
              className={`mt-3 w-full ${feas.level === 'green' || feas.level === 'yellow' ? 'btn-primary' : 'btn-danger'}`}
            >
              {feas.level === 'green' || feas.level === 'yellow'
                ? '實施這項政策'
                : '我了解後果，仍要強行執行'}
            </button>
            {(feas.level === 'red' || feas.level === 'conflict') && (
              <p className="mt-1 text-center text-[10px] text-slate-500">強行執行不會被阻止，但赤字、舉債、信任流失等後果將真實反映在往後年度。</p>
            )}
          </div>
        )}

        {/* 已實施 */}
        <div className="card-pad">
          <h3 className="section-title mb-2">今年已推動的決策（{implemented.length}）</h3>
          {implemented.length === 0 ? (
            <p className="text-[11px] text-slate-500">尚未推動任何政策。維持現狀也是一種選擇，但世界仍會演變。</p>
          ) : (
            <div className="space-y-1.5">
              {implemented.map((a) => {
                const annual = yearCost(a, year)
                return (
                  <div key={a.id} className="flex items-center justify-between gap-2 rounded-lg bg-ink-900/50 px-3 py-1.5">
                    <div className="min-w-0">
                      <div className="truncate text-xs text-slate-200">
                        {a.name} {a.scale !== 1 && <span className="font-mono text-gold-400">×{a.scale}</span>}
                      </div>
                      <div className="font-mono text-[10px] text-slate-600">
                        {a.duration === 'instant' ? '一次性' : `本年度 ${annual > 0 ? money(annual) : annual < 0 ? '節省 ' + money(-annual) : '無淨成本'}`}
                      </div>
                    </div>
                    <button onClick={() => st.removeAction(a.id)} title="取消這項政策"
                      className="flex-none rounded p-1 text-slate-500 hover:bg-rust-500/10 hover:text-rust-400">
                      <Ban size={14} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function summarize(s: unknown): string {
  try { return JSON.stringify(s).slice(0, 1400) } catch { return '' }
}
