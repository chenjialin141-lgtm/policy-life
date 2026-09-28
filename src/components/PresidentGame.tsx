import { useState } from 'react'
import {
  Landmark, Home, ScrollText, BookOpen, BrainCircuit, Gauge, AlertTriangle,
  TrendingUp, Flag, ChevronRight, Users
} from 'lucide-react'
import { useGame } from '../store/gameStore'
import { presidentReactions } from '../engine/narrative'
import { difficultyParams } from '../data/shared'
import { fmtYi, signed } from '../engine/helpers'
import type { PState, RiskLevel } from '../types'
import BudgetAllocator from './BudgetAllocator'
import PolicyComposer from './PolicyComposer'
import CausalTimeline from './CausalTimeline'
import CodexAchievements from './CodexAchievements'
import Advisor from './Advisor'
import { Stat, Card, SectionTitle, Tag } from './ui'

const gauge = (v: number) => (v >= 60 ? '#2fa971' : v >= 35 ? '#d4a84b' : '#d45d3f')
const riskMeta: Record<RiskLevel, { label: string; cls: string }> = {
  opportunity: { label: '機會', cls: 'text-jade-400' },
  low: { label: '低風險', cls: 'text-sky-400' },
  medium: { label: '風險', cls: 'text-gold-400' },
  high: { label: '高風險', cls: 'text-rust-400' }
}

type Tab = 'govern' | 'timeline' | 'codex' | 'advisor'

export default function PresidentGame() {
  const st = useGame()
  const p = st.p!
  const [tab, setTab] = useState<Tab>('govern')
  const reactions = presidentReactions(st.active)
  const last = st.history[st.history.length - 1]
  const prev = st.history[st.history.length - 2]?.snapshot as PState | undefined
  const topChanges = last
    ? [...last.changes].filter((c) => Math.abs(c.delta) >= 0.15).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 5)
    : []
  const electYear = Math.ceil(p.year / 4) * 4
  const electAway = electYear - p.year
  const d = (k: keyof PState): number | undefined => (prev ? (p[k] as number) - (prev[k] as number) : undefined)

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'govern', label: '施政', icon: <Gauge size={15} /> },
    { id: 'timeline', label: '時間線', icon: <ScrollText size={15} /> },
    { id: 'codex', label: '圖鑑／成就', icon: <BookOpen size={15} /> },
    { id: 'advisor', label: 'AI 顧問', icon: <BrainCircuit size={15} /> }
  ]

  return (
    <div className="min-h-screen">
      {/* 頂栏 */}
      <header className="sticky top-0 z-30 border-b border-ink-700 bg-ink-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Landmark size={18} className="text-gold-400" />
            <span className="font-serif text-base font-semibold text-slate-100">Republic of Nova</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Tag color="gold">第 {p.year} 年 · 第 {p.term} 任</Tag>
            <Tag>{difficultyParams[st.difficulty].label}</Tag>
            <Tag color={electAway === 0 ? 'rust' : 'slate'}>
              <Flag size={11} /> {electAway === 0 ? '今年總統大選' : `大選 ${electAway} 年後`}
            </Tag>
          </div>
          <nav className="ml-auto flex items-center gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${tab === t.id ? 'bg-gold-500/15 text-gold-400' : 'text-slate-400 hover:bg-ink-800'}`}
              >
                {t.icon}{t.label}
              </button>
            ))}
            <button onClick={() => { if (confirm('回首頁將放棄這一局且不會保留，確定嗎？')) st.backHome() }} className="ml-1 rounded-lg p-1.5 text-slate-500 hover:bg-ink-800" title="回首頁">
              <Home size={16} />
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-4">
        {tab === 'govern' && (
          <>
            {/* 核心指標 */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              <Stat label="GDP" value={fmtYi(p.gdp)} sub="億元" delta={d('gdp')} goodWhenUp />
              <Stat label="經濟成長" value={p.growth.toFixed(1) + '%'} delta={d('growth')} goodWhenUp />
              <Stat label="通膨" value={p.inflation.toFixed(1) + '%'} delta={d('inflation')} goodWhenUp={false} />
              <Stat label="失業率" value={p.unemployment.toFixed(1) + '%'} delta={d('unemployment')} goodWhenUp={false} />
              <Stat label="政府債務" value={fmtYi(p.debt) + ' 億'} sub={`佔 GDP ${((p.debt / p.gdp) * 100).toFixed(0)}%`} delta={d('debt')} goodWhenUp={false} />
              <Stat label="債券利率" value={p.interestRate.toFixed(1) + '%'} delta={d('interestRate')} goodWhenUp={false} />
              <Stat label="民意支持" value={p.approval.toFixed(0)} bar={p.approval} barColor={gauge(p.approval)} delta={d('approval')} goodWhenUp />
              <Stat label="社會信任" value={p.socialTrust.toFixed(0)} bar={p.socialTrust} barColor={gauge(p.socialTrust)} delta={d('socialTrust')} goodWhenUp />
              <Stat label="政治穩定" value={p.politicalStability.toFixed(0)} bar={p.politicalStability} barColor={gauge(p.politicalStability)} delta={d('politicalStability')} goodWhenUp />
              <Stat label="行政能力" value={p.adminCapacity.toFixed(0)} bar={p.adminCapacity} barColor={gauge(p.adminCapacity)} delta={d('adminCapacity')} goodWhenUp />
              <Stat label="房價指數" value={p.housingPrice.toFixed(0)} delta={d('housingPrice')} goodWhenUp={false} />
              <Stat label="貧富差距" value={p.inequality.toFixed(0)} bar={p.inequality} barColor={gauge(100 - p.inequality)} delta={d('inequality')} goodWhenUp={false} />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <BudgetAllocator />
                <PolicyComposer mode="president" />
              </div>

              <div className="space-y-4">
                {/* 結束今年 */}
                <Card className="border-gold-600/40 bg-gradient-to-b from-gold-500/10 to-transparent">
                  <button onClick={() => st.endYear()} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 font-semibold text-ink-950 transition-colors hover:bg-gold-400">
                    結束第 {p.year} 年，AI 推演下一年 <ChevronRight size={18} />
                  </button>
                  <p className="mt-2 text-center text-[11px] text-slate-500">引擎結算財政與經濟，AI 生成事件、新聞與風險</p>
                </Card>

                {/* 上一年變化：跨年因果回饋 */}
                {last && (
                  <Card>
                    <SectionTitle>第 {last.year} 年造成的變化</SectionTitle>
                    <div className="space-y-1.5">
                      {topChanges.map((c) => (
                        <div key={c.key} className="flex items-center justify-between rounded-md bg-ink-900/50 px-2.5 py-1.5 text-xs">
                          <span className="text-slate-300">{c.label}</span>
                          <span className={`font-mono ${c.delta > 0 ? 'text-jade-400' : 'text-rust-400'}`}>{signed(c.delta)}</span>
                        </div>
                      ))}
                      {last.events.slice(0, 2).map((e) => (
                        <div key={e.id} className="flex items-start gap-1.5 rounded-md bg-ink-900/50 px-2.5 py-1.5 text-[11px] text-slate-400">
                          <AlertTriangle size={12} className={`mt-0.5 flex-none ${e.severity === 'crisis' ? 'text-rust-400' : 'text-gold-400'}`} />
                          <span>{e.title}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* 風險預測 */}
                <Card>
                  <SectionTitle>下一年度風險預測</SectionTitle>
                  {last && last.risks.length > 0 ? (
                    <ul className="space-y-2">
                      {last.risks.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <span className={`mt-0.5 flex-none font-medium ${riskMeta[r.level].cls}`}>● {riskMeta[r.level].label}</span>
                          <span className="text-slate-300">{r.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">完成第一年後，這裡會顯示 AI 對下一年的機會與風險預測（使用「可能、風險、預期」語氣，不會劇透隱藏事件）。</p>
                  )}
                </Card>

                {/* 利害關係人 */}
                <Card>
                  <SectionTitle right={<Users size={15} className="text-slate-500" />}>利害關係人態度</SectionTitle>
                  {reactions.length === 0 ? (
                    <p className="text-xs text-slate-500">加入政策後，這裡會即時反映各群體的立場。</p>
                  ) : (
                    <ul className="space-y-2">
                      {reactions.slice(0, 6).map((r) => (
                        <li key={r.id} className="text-xs">
                          <div className={`font-medium ${r.tone === 'positive' ? 'text-jade-400' : r.tone === 'negative' ? 'text-rust-400' : 'text-slate-300'}`}>
                            {r.name}
                          </div>
                          <div className="text-[11px] leading-relaxed text-slate-400">{r.comment}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            </div>
          </>
        )}

        {tab === 'timeline' && <CausalTimeline />}
        {tab === 'codex' && <CodexAchievements mode="president" />}
        {tab === 'advisor' && <Advisor />}
      </main>
    </div>
  )
}
