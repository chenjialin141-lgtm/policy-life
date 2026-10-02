import { useState } from 'react'
import { Landmark, Building2, ChevronDown, Globe, BrainCircuit, GitBranch } from 'lucide-react'
import type { Difficulty, Mode } from '../types'
import { difficultyParams } from '../data/shared'

const diffs: Difficulty[] = ['easy', 'normal', 'hard', 'extreme']

export default function StartScreen({
  onStart, onContinue, hasSave
}: {
  onStart: (mode: Mode, d: Difficulty) => void
  onContinue?: () => void
  hasSave?: boolean
}) {
  const [d, setD] = useState<Difficulty>('normal')
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:py-16">
      <header className="text-center fade-in">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-850 px-3 py-1 text-xs text-slate-400">
          <BrainCircuit size={14} className="text-gold-400" />
          AI × 公共政策 × 經濟 × 回合制策略
        </div>
        <h1 className="font-serif text-5xl font-bold tracking-tight text-slate-50 sm:text-6xl">
          POLICY <span className="text-gold-500">LIFE</span>
        </h1>
        <p className="mt-2 font-serif text-lg text-slate-300">政策人生模擬器</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold-600/40 bg-gold-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.25em] text-gold-300">
          全球首款 · 自由輸入政策的治理模擬沙盒
        </div>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
          「每一個決定，都可能成為下一場危機的起點。」
          <br />
          自由制定政策、分配預算、承擔債務——你第一年的決定，可能在第五年才引爆後果。
        </p>
      </header>

      {hasSave && onContinue && (
        <div className="mx-auto mt-8 max-w-md">
          <button onClick={onContinue} className="btn-primary w-full py-3 text-base">
            繼續上次的人生
          </button>
        </div>
      )}

      <div className="mt-10">
        <div className="mb-3 text-center text-xs uppercase tracking-widest text-slate-500">選擇難度</div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {diffs.map((x) => (
            <button
              key={x}
              onClick={() => setD(x)}
              className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                d === x ? 'border-gold-500 bg-gold-500/10' : 'border-ink-700 bg-ink-850 hover:border-ink-500'
              }`}
            >
              <div className={`font-mono text-sm font-semibold ${d === x ? 'text-gold-400' : 'text-slate-200'}`}>
                {difficultyParams[x].label}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-slate-400">{difficultyParams[x].desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ModeCard
          icon={<Landmark size={28} />}
          title="總統人生"
          tagline="治理虛構國家 Republic of Nova"
          points={['國家財政、稅收與國債', '教育、醫療、住宅、能源', '民意、罷免與四年大選']}
          onClick={() => onStart('president', d)}
        />
        <ModeCard
          icon={<Building2 size={28} />}
          title="企業 CEO"
          tagline="自由選擇產品、地點與市場"
          points={['自由輸入要賣什麼、在哪賣', 'AI 聯網即時評估市場背景', '募資、併購、出海到 IPO']}
          onClick={() => onStart('company', d)}
          next="設定你的公司"
        />
      </div>

      <div className="mt-8 rounded-xl border border-ink-700 bg-ink-850/60 p-4">
        <button onClick={() => setShowHelp(!showHelp)} className="flex w-full items-center justify-between text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <GitBranch size={16} className="text-sky-400" /> 這個遊戲怎麼運作？
          </span>
          <ChevronDown size={16} className={`transition-transform ${showHelp ? 'rotate-180' : ''}`} />
        </button>
        {showHelp && (
          <div className="mt-3 grid gap-3 text-sm leading-relaxed text-slate-400 sm:grid-cols-2">
            <div>
              <div className="mb-1 font-medium text-slate-200">真正的因果鏈</div>
              數值由遊戲引擎確定性計算：連續舉債會墊高利息、排擠預算，最可能引發財政危機；事件依你的狀態與歷史決策生成，不是隨機亂數。
            </div>
            <div>
              <div className="mb-1 font-medium text-slate-200">你可以故意做傻事</div>
              預算不足仍可強行執行，但會產生赤字、債務與信用風險等真實後果。系統不會阻止你，只會告訴你代價。
            </div>
            <div>
              <div className="mb-1 font-medium text-slate-200 flex items-center gap-1"><BrainCircuit size={14} className="text-gold-400" /> AI 負責什麼</div>
              AI（Groq · Qwen3 27B）解析你自由輸入的政策、撰寫年度新聞、推演風險、回答顧問提問；AI 不能直接改數值，所有結果由引擎把關。
            </div>
            <div>
              <div className="mb-1 font-medium text-slate-200 flex items-center gap-1"><Globe size={14} className="text-jade-400" /> 聯網市場評估</div>
              企業開局的產業背景會即時搜尋網路資訊並標示來源日期；真實資料與模擬數值分開呈現，AI 失敗時遊戲仍可完整遊玩。
            </div>
          </div>
        )}
      </div>

      <p className="mt-8 text-center text-[11px] text-slate-600">
        遊戲會自動存於此瀏覽器。共和國 Nova 與所有數值皆為虛構模擬，不構成任何真實投資或政治建議。
      </p>
    </div>
  )
}

function ModeCard({
  icon, title, tagline, points, onClick, next = '開始'
}: {
  icon: React.ReactNode
  title: string
  tagline: string
  points: string[]
  onClick: () => void
  next?: string
}) {
  return (
    <button
      onClick={onClick}
      className="group card flex flex-col p-6 text-left transition-colors hover:border-gold-600/60 hover:bg-ink-800"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink-800 text-gold-400 group-hover:text-gold-300">
          {icon}
        </div>
        <div>
          <div className="font-serif text-xl font-semibold text-slate-100">{title}</div>
          <div className="text-xs text-slate-400">{tagline}</div>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-gold-500" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-5 text-sm font-medium text-gold-400">{next} →</div>
    </button>
  )
}
