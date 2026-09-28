import { useState } from 'react'
import { Send, BrainCircuit, Loader2 } from 'lucide-react'
import { useGame, summarizeState } from '../store/gameStore'
import { askAdvisor } from '../services/aiService'

interface Msg { role: 'user' | 'ai'; content: string }

const quickP = ['為什麼通膨與失業會這樣變化？', '我前幾年的決策造成了什麼後果？', '現在最該優先處理什麼？', '如果我大舉舉債會怎樣？']
const quickC = ['為什麼現金流／獲利是這個狀況？', '該優先衝市占還是追求獲利？', '什麼時機適合出海或 IPO？', '競爭者變強該怎麼回應？']

export default function Advisor() {
  const st = useGame()
  const mode = st.mode || 'president'
  const state = mode === 'company' ? st.c! : st.p!
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)

  async function ask(question: string) {
    if (!question.trim() || loading) return
    const historySummary = st.history
      .map((r) => {
        const acts = r.actionsEnacted.map((a) => a.name).join('、') || '無'
        const evs = r.events.map((e) => e.title).join('、') || '無重大事件'
        return `第${r.year}年｜政策:${acts}｜事件:${evs}`
      })
      .join('\n')
    setMsgs((m) => [...m, { role: 'user', content: question }])
    setQ('')
    setLoading(true)
    try {
      const ans = await askAdvisor(mode, question, summarizeState(mode, state), historySummary || '（第一年，尚無歷史）')
      setMsgs((m) => [...m, { role: 'ai', content: ans || 'AI 顧問暫時無法連線（免費額度可能用滿）。遊戲的因果仍由引擎完整計算，請稍後再試。' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card flex flex-col">
      <div className="flex items-center gap-2 border-b border-ink-700 px-4 py-3">
        <BrainCircuit size={18} className="text-gold-400" />
        <div>
          <div className="text-sm font-semibold text-slate-100">AI 政策顧問</div>
          <div className="text-[11px] text-slate-500">根據你的真實狀態與歷史決策回答，不給通則</div>
        </div>
      </div>

      <div className="flex max-h-[46vh] min-h-[220px] flex-col gap-3 overflow-y-auto px-4 py-3">
        {msgs.length === 0 && (
          <div className="rounded-lg border border-ink-700 bg-ink-900/50 p-3 text-sm text-slate-400">
            你可以問我：「為什麼通膨上升？」「我第 2 年的政策是不是造成現在的問題？」「提高稅率會怎樣？」我會比對這局的狀態與每一年的決策來回答。
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-sm leading-relaxed ${m.role === 'user' ? 'bg-gold-500/15 text-slate-100' : 'border border-ink-700 bg-ink-900/60 text-slate-300'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Loader2 size={15} className="animate-spin text-gold-400" /> AI 顧問正在比對歷史…
          </div>
        )}
      </div>

      <div className="border-t border-ink-700 px-4 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {(mode === 'company' ? quickC : quickP).map((x) => (
            <button key={x} onClick={() => ask(x)} className="rounded-full border border-ink-600 px-2.5 py-1 text-[11px] text-slate-400 hover:border-gold-600/50 hover:text-gold-400">
              {x}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="input flex-1" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && ask(q)} placeholder="向顧問提問…" />
          <button className="btn-primary flex-none" onClick={() => ask(q)} disabled={loading}><Send size={15} /></button>
        </div>
      </div>
    </div>
  )
}
