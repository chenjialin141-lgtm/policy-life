import { useState } from 'react'
import {
  Building2, Package, MapPin, Globe, Sparkles, Loader2, ExternalLink, ArrowLeft,
  Check, AlertTriangle, TrendingUp, Users
} from 'lucide-react'
import { industries, locations, regions } from '../data/company'
import { marketAssessment, validateLocation, type MarketAssessment, type LocationCheck } from '../services/aiService'
import type { Difficulty } from '../types'
import { Tag } from './ui'

export default function CompanySetup({ difficulty, onStart, onBack }: {
  difficulty: Difficulty
  onStart: (setup: { industryId: string; location: string; region: string; productName: string; assessment: MarketAssessment | null }) => void
  onBack: () => void
}) {
  const [industryId, setIndustryId] = useState(industries[0].id)
  const [productName, setProductName] = useState('')
  const [locInput, setLocInput] = useState(locations[0])
  const [locCheck, setLocCheck] = useState<LocationCheck | null>(null)
  const [locVerifiedQuery, setLocVerifiedQuery] = useState('')
  const [locChecking, setLocChecking] = useState(false)
  const [starting, setStarting] = useState(false)
  const [region, setRegion] = useState('local')
  const [assessment, setAssessment] = useState<MarketAssessment | null>(null)
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState('')

  // 由 AI 查驗地名是否真實存在；免費額度用滿時降級為直接採用玩家輸入，不阻斷遊戲
  async function verifyLocation(q?: string): Promise<LocationCheck | null> {
    const query = (q ?? locInput).trim()
    if (!query) { setNote('請先輸入總部地點。'); return null }
    setLocChecking(true)
    setNote('')
    let check: LocationCheck | null = null
    try {
      check = await validateLocation(query)
    } finally {
      if (!check) {
        check = {
          valid: true, canonical: query, country: '', kind: '', offline: true,
          note: `AI 查驗額度目前用滿，無法線上確認「${query}」是否為真實地點；將直接採用你輸入的地名，建議稍後再試。`
        }
      }
      setLocCheck(check)
      setLocVerifiedQuery(query)
      setLocChecking(false)
    }
    return check
  }

  function editLocation(v: string) {
    setLocInput(v)
    setLocCheck(null)
    setLocVerifiedQuery('')
    setAssessment(null)
  }

  async function assess() {
    if (!productName.trim()) { setNote('請先輸入你要賣的產品或服務。'); return }
    let loc = locCheck?.valid ? locCheck.canonical : locInput.trim()
    if (locVerifiedQuery !== locInput.trim()) {
      const check = await verifyLocation()
      if (!check?.valid) { setNote('地點尚未通過查驗，請確認總部地名。'); return }
      loc = check.canonical
    }
    setLoading(true)
    setNote('')
    try {
      const r = await marketAssessment(productName.trim(), loc, regionInfo(region).name)
      if (r) setAssessment(r)
      else setNote('聯網評估暫時無法使用（免費 AI 額度可能用滿），你仍可直接開始，遊戲會以產業基準模擬。')
    } finally {
      setLoading(false)
    }
  }

  async function handleStart() {
    if (!productName.trim() || starting) return
    let check = locCheck
    if (locVerifiedQuery !== locInput.trim() || !check) {
      setStarting(true)
      check = await verifyLocation()
      setStarting(false)
    }
    if (!check || !check.valid) {
      setNote(check?.suggestion ? `查無此地點，你是不是要找「${check.suggestion}」？` : '查無這個地點，請確認總部地名後再試一次。')
      return
    }
    onStart({ industryId, location: check.canonical, region, productName: productName.trim(), assessment })
  }

  const demandColor = assessment?.demand === 'high' ? 'text-jade-400' : assessment?.demand === 'low' ? 'text-rust-400' : 'text-gold-400'

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-8">
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200">
        <ArrowLeft size={15} /> 返回選模式
      </button>

      <header className="mb-6">
        <h1 className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-100">
          <Building2 size={22} className="text-gold-400" /> 創立你的公司
        </h1>
        <p className="mt-1 text-sm text-slate-400">自由決定要賣什麼、在哪賣、市場做到多大。AI 會聯網查詢即時資訊作為開局背景。</p>
      </header>

      {/* 1. 產品與產業 */}
      <section className="card-pad mb-4">
        <h2 className="section-title mb-3 flex items-center gap-2"><Package size={16} className="text-gold-400" /> 1. 你要賣什麼？</h2>
        <input
          className="input mb-3"
          value={productName}
          onChange={(e) => { setProductName(e.target.value); setAssessment(null) }}
          placeholder="例：給東南亞移工的跨境匯款 App、平價精品咖啡、AI 法律顧問…"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setIndustryId(ind.id)}
              className={`rounded-lg border p-3 text-left transition-colors ${industryId === ind.id ? 'border-gold-500 bg-gold-500/10' : 'border-ink-700 bg-ink-900/40 hover:border-ink-500'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">{ind.name}</span>
                {industryId === ind.id && <Check size={15} className="text-gold-400" />}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">{ind.blurb}</div>
              <div className="mt-1 text-[11px] text-slate-600">例：{ind.examples}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 2. 地點與區域 */}
      <section className="card-pad mb-4">
        <h2 className="section-title mb-3 flex items-center gap-2"><MapPin size={16} className="text-gold-400" /> 2. 總部設在哪？（自由輸入真實地名，AI 查驗是否存在）</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            list="pl-locations"
            className="input sm:flex-1"
            value={locInput}
            onChange={(e) => editLocation(e.target.value)}
            placeholder="例：台北、胡志明市、印尼泗水、德國柏林、美國舊金山…"
          />
          <datalist id="pl-locations">
            {locations.map((l) => <option key={l} value={l} />)}
          </datalist>
          <button type="button" className="btn-ghost flex-none whitespace-nowrap" onClick={() => verifyLocation()} disabled={locChecking || !locInput.trim()}>
            {locChecking ? <Loader2 size={15} className="animate-spin" /> : <MapPin size={15} />} AI 查驗地點
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {locations.map((l) => (
            <button key={l} type="button" onClick={() => { editLocation(l); void verifyLocation(l) }}
              className="rounded-full border border-ink-700 px-2.5 py-0.5 text-[11px] text-slate-400 transition-colors hover:border-gold-500/60 hover:text-gold-300">
              {l}
            </button>
          ))}
        </div>

        {locCheck && (
          locCheck.valid ? (
            <div className={`mt-2.5 flex items-start gap-2 rounded-lg border p-2.5 text-xs ${locCheck.offline ? 'border-gold-600/40 bg-gold-500/10 text-gold-300' : 'border-jade-500/40 bg-jade-500/10 text-jade-300'}`}>
              <Check size={14} className="mt-0.5 flex-none" />
              <div>
                <div className="font-medium">
                  {locCheck.offline ? '未線上查驗，暫時採用' : '查驗通過'}：{locCheck.canonical}
                  {locCheck.country ? ` · ${locCheck.country}` : ''}{locCheck.kind ? `（${locCheck.kind}）` : ''}
                </div>
                {locCheck.note && <div className={`mt-0.5 leading-relaxed ${locCheck.offline ? 'text-gold-300/80' : 'text-jade-200/70'}`}>{locCheck.note}</div>}
              </div>
            </div>
          ) : (
            <div className="mt-2.5 rounded-lg border border-rust-500/40 bg-rust-500/10 p-2.5 text-xs text-rust-300">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 flex-none" />
                <div>
                  <div className="font-medium">查無這個地點，無法設立總部</div>
                  <div className="mt-0.5 leading-relaxed text-rust-200/80">{locCheck.note}</div>
                  {locCheck.suggestion && (
                    <button type="button"
                      onClick={() => { const s = locCheck!.suggestion!; editLocation(s); void verifyLocation(s) }}
                      className="mt-1.5 rounded-md border border-rust-400/50 px-2 py-1 text-[11px] hover:bg-rust-500/15">
                      改用建議地名「{locCheck.suggestion}」
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )}

        <h2 className="section-title mb-3 mt-5 flex items-center gap-2"><Globe size={16} className="text-gold-400" /> 3. 業務區域（決定市占天花板與營收規模）</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => { setRegion(r.id); setAssessment(null) }}
              className={`rounded-lg border p-3 text-left transition-colors ${region === r.id ? 'border-gold-500 bg-gold-500/10' : 'border-ink-700 bg-ink-900/40 hover:border-ink-500'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">{r.name}</span>
                {region === r.id && <Check size={15} className="text-gold-400" />}
              </div>
              <div className="mt-1 font-mono text-[11px] text-slate-400">市占上限 {r.shareCap}% · 營收規模 ×{r.revMul}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. 聯網評估 */}
      <section className="card-pad mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="section-title flex items-center gap-2"><Sparkles size={16} className="text-gold-400" /> 4. AI 聯網市場評估（選填但建議）</h2>
          <button className="btn-ghost" onClick={assess} disabled={loading}>
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Globe size={15} />}
            即時查詢市場
          </button>
        </div>

        {note && <div className="mt-2 text-xs text-rust-400">{note}</div>}

        {assessment && (
          <div className="mt-3 space-y-3 fade-in">
            <div className="flex flex-wrap items-center gap-2">
              <Tag color={assessment.live ? 'jade' : 'slate'}>{assessment.live ? '即時聯網資料' : 'AI 推估（未取得即時資料）'}</Tag>
              <span className="text-[11px] text-slate-500">
                {assessment.live && assessment.dateRange
                  ? `新聞日期 ${assessment.dateRange.from} ~ ${assessment.dateRange.to}（查詢於 ${assessment.asOf}）`
                  : `查詢日期：${assessment.asOf}`}
              </span>
            </div>
            <p className="rounded-lg bg-ink-900/60 p-3 text-sm leading-relaxed text-slate-300">{assessment.summary}</p>
            {assessment.dataNote && <p className="text-[11px] leading-relaxed text-slate-500">{assessment.dataNote}</p>}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-lg bg-ink-900/60 p-2.5">
                <div className="stat-label flex items-center gap-1"><Users size={11} /> 需求強度</div>
                <div className={`font-mono text-sm font-semibold ${demandColor}`}>{assessment.demand === 'high' ? '高' : assessment.demand === 'low' ? '低' : '中'}</div>
              </div>
              <div className="rounded-lg bg-ink-900/60 p-2.5">
                <div className="stat-label flex items-center gap-1"><TrendingUp size={11} /> 競爭強度</div>
                <div className="font-mono text-sm font-semibold text-slate-200">{assessment.competition.toFixed(0)}/100</div>
              </div>
              <div className="rounded-lg bg-ink-900/60 p-2.5">
                <div className="stat-label">市場趨勢</div>
                <div className="mt-0.5 text-[11px] text-slate-300">{assessment.trend}</div>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-jade-500/25 bg-jade-500/5 p-2.5">
                <div className="mb-1 text-xs font-medium text-jade-400">機會</div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {assessment.opportunities.map((o, i) => <li key={i}>· {o}</li>)}
                </ul>
              </div>
              <div className="rounded-lg border border-rust-500/25 bg-rust-500/5 p-2.5">
                <div className="mb-1 flex items-center gap-1 text-xs font-medium text-rust-400"><AlertTriangle size={12} /> 風險</div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {assessment.risks.map((o, i) => <li key={i}>· {o}</li>)}
                </ul>
              </div>
            </div>
            {assessment.sources.length > 0 && (
              <div>
                <div className="mb-1 text-[11px] text-slate-500">真實資料來源（與模擬數值分開呈現）：</div>
                <div className="flex flex-wrap gap-2">
                  {assessment.sources.slice(0, 5).map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:underline">
                      <ExternalLink size={11} /> {s.title.slice(0, 28)}{s.date && <span className="text-slate-500"> · {s.date.slice(5)}</span>}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {!assessment && !note && !loading && (
          <p className="mt-2 text-xs text-slate-500">系統會搜尋網路上的產業、地點與市場資訊，彙整成需求、競爭、機會與風險，作為你開局的背景；這些真實資料不會直接決定成敗，營運仍由引擎模擬。</p>
        )}
      </section>

      <button
        className="btn-primary flex w-full items-center justify-center gap-2 py-3 text-base"
        disabled={!productName.trim() || locChecking || starting}
        onClick={handleStart}
      >
        {(starting || locChecking) && <Loader2 size={16} className="animate-spin" />}
        {starting ? '正在 AI 查驗地點…' : `開始經營「${productName.trim() || '你的公司'}」`}
      </button>
      <p className="mt-2 text-center text-[11px] text-slate-500">按下開始會先由 AI 查驗總部地點是否為真實地名；查驗通過才會進入遊戲。</p>
    </div>
  )
}

function regionInfo(id: string) {
  return regions.find((x) => x.id === id) || regions[0]
}
