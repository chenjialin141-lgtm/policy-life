import { useState } from 'react'
import {
  Building2, Home, ScrollText, BookOpen, BrainCircuit, Gauge, AlertTriangle,
  ChevronRight, Users, Globe, Rocket, MapPin, Package
} from 'lucide-react'
import { useGame } from '../store/gameStore'
import { companyReactions } from '../engine/narrative'
import { canExpandRegion, nextRegion, regionInfo, canIPO } from '../engine/company'
import { difficultyParams } from '../data/shared'
import { fmtWan, signed } from '../engine/helpers'
import type { CState, RiskLevel } from '../types'
import PolicyComposer from './PolicyComposer'
import CausalTimeline from './CausalTimeline'
import CodexAchievements from './CodexAchievements'
import Advisor from './Advisor'
import { Stat, Card, SectionTitle, Tag } from './ui'

const gauge = (v: number) => (v >= 60 ? '#2fa971' : v >= 35 ? '#d4a84b' : '#d45d3f')
const expandCost: Record<string, number> = { national: 800, regional: 2200, global: 5000 }
const riskMeta: Record<RiskLevel, { label: string; cls: string }> = {
  opportunity: { label: '機會', cls: 'text-jade-400' },
  low: { label: '低風險', cls: 'text-sky-400' },
  medium: { label: '風險', cls: 'text-gold-400' },
  high: { label: '高風險', cls: 'text-rust-400' }
}
type Tab = 'run' | 'timeline' | 'codex' | 'advisor'

export default function CompanyGame() {
  const st = useGame()
  const c = st.c!
  const [tab, setTab] = useState<Tab>('run')
  const reactions = companyReactions(st.active)
  const last = st.history[st.history.length - 1]
  const prev = st.history[st.history.length - 2]?.snapshot as CState | undefined
  const topChanges = last
    ? [...last.changes].filter((x) => Math.abs(x.delta) >= 0.15).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 5)
    : []
  const cap = regionInfo(c.region).shareCap
  const nr = nextRegion(c.region)
  const canExpand = canExpandRegion(c)
  const ipoOk = canIPO(c)
  const d = (k: keyof CState): number | undefined => (prev && typeof c[k] === 'number' ? (c[k] as number) - (prev[k] as number) : undefined)

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'run', label: '經營', icon: <Gauge size={15} /> },
    { id: 'timeline', label: '時間線', icon: <ScrollText size={15} /> },
    { id: 'codex', label: '圖鑑／成就', icon: <BookOpen size={15} /> },
    { id: 'advisor', label: 'AI 顧問', icon: <BrainCircuit size={15} /> }
  ]

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-ink-700 bg-ink-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-gold-400" />
            <span className="max-w-[200px] truncate font-serif text-base font-semibold text-slate-100">{c.productName}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <Tag color="gold">成立第 {c.year} 年</Tag>
            <Tag>{difficultyParams[st.difficulty].label}</Tag>
            <Tag color="sky"><MapPin size={11} /> {c.headquarters}</Tag>
            <Tag><Globe size={11} /> {regionInfo(c.region).name}</Tag>
            {c.ipo && <Tag color="gold"><Rocket size={11} /> 已上市</Tag>}
          </div>
          <nav className="ml-auto flex items-center gap-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${tab === t.id ? 'bg-gold-500/15 text-gold-400' : 'text-slate-400 hover:bg-ink-800'}`}>
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
        {tab === 'run' && (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              <Stat label="年度營收" value={fmtWan(c.revenue)} sub={c.industry} delta={d('revenue')} goodWhenUp />
              <Stat label="年度損益" value={fmtWan(c.profit)} sub={c.profit >= 0 ? '獲利' : '虧損'} delta={d('profit')} goodWhenUp />
              <Stat label="現金" value={fmtWan(c.cash)} sub={`負債 ${fmtWan(c.debt)}`} delta={d('cash')} goodWhenUp />
              <Stat label="員工" value={String(c.employees)} sub={`平均月薪 ${(c.salary / 12).toFixed(1)} 萬`} delta={d('employees')} goodWhenUp />
              <Stat label="市場占有率" value={c.marketShare.toFixed(1) + '%'} sub={`上限 ${cap}%`} bar={(c.marketShare / cap) * 100} barColor="#3d8bc4" delta={d('marketShare')} goodWhenUp />
              <Stat label="品牌力" value={c.brand.toFixed(0)} bar={c.brand} barColor={gauge(c.brand)} delta={d('brand')} goodWhenUp />
              <Stat label="研發能量" value={c.rnd.toFixed(0)} bar={c.rnd} barColor={gauge(c.rnd)} delta={d('rnd')} goodWhenUp />
              <Stat label="產能／營運" value={c.production.toFixed(0)} bar={c.production} barColor={gauge(c.production)} delta={d('production')} goodWhenUp />
              <Stat label="投資人信心" value={c.investorConfidence.toFixed(0)} bar={c.investorConfidence} barColor={gauge(c.investorConfidence)} delta={d('investorConfidence')} goodWhenUp />
              <Stat label="競爭強度" value={c.competitor.toFixed(0)} bar={c.competitor} barColor={gauge(100 - c.competitor)} delta={d('competitor')} goodWhenUp={false} />
              <Stat label="客戶規模" value={c.customers >= 10000 ? fmtWan(c.customers) : Math.round(c.customers).toLocaleString('zh-TW')} sub={c.customers >= 10000 ? '客戶數' : '客戶／帳號數'} delta={d('customers')} goodWhenUp />
              {c.ipo
                ? <Stat label="股價" value={'$' + (c.stockPrice ?? 0).toFixed(0)} sub="已掛牌交易" bar={Math.min(100, (c.stockPrice ?? 0))} barColor="#2fa971" />
                : <Stat label="公司狀態" value="未上市" sub="達標可申請 IPO" />}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {/* 即時策略 */}
                <Card>
                  <SectionTitle>企業行動</SectionTitle>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-ink-700 bg-ink-900/40 p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-200"><Globe size={15} className="text-sky-400" /> 拓展業務區域</div>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {nr ? `下一站：${regionInfo(nr).name}（市占上限 ${regionInfo(nr).shareCap}%），需費用 ${fmtWan(expandCost[nr])}、品牌 ≥ ${nr === 'national' ? 35 : nr === 'regional' ? 58 : 74}` : '已佈局至全球市場'}
                      </p>
                      <button disabled={!canExpand} onClick={() => st.companyExpandRegion()}
                        className={canExpand ? 'btn-primary mt-2 w-full py-1.5 text-xs' : 'btn-ghost mt-2 w-full py-1.5 text-xs'}>
                        {canExpand ? `投入 ${fmtWan(expandCost[nr || ''])} 拓展` : (nr ? '品牌力或現金不足' : '已達全球')}
                      </button>
                    </div>
                    <div className="rounded-lg border border-ink-700 bg-ink-900/40 p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-200"><Rocket size={15} className="text-gold-400" /> 股票上市 IPO</div>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {c.ipo ? `已上市，目前股價 $${(c.stockPrice ?? 0).toFixed(0)}` : '門檻：年營收 ≥ 3,000 萬、已獲利、現金 ≥ 2,000 萬、信心 ≥ 60、市占 ≥ 8%'}
                      </p>
                      <button disabled={!ipoOk || c.ipo} onClick={() => st.companyIPO()}
                        className={ipoOk && !c.ipo ? 'btn-primary mt-2 w-full py-1.5 text-xs' : 'btn-ghost mt-2 w-full py-1.5 text-xs'}>
                        {c.ipo ? '已掛牌' : ipoOk ? '啟動 IPO 募資' : '尚未達標'}
                      </button>
                    </div>
                  </div>
                </Card>

                <PolicyComposer mode="company" />
              </div>

              <div className="space-y-4">
                <Card className="border-gold-600/40 bg-gradient-to-b from-gold-500/10 to-transparent">
                  <button onClick={() => st.endYear()} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 font-semibold text-ink-950 transition-colors hover:bg-gold-400">
                    結束第 {c.year} 年，AI 推演下一年 <ChevronRight size={18} />
                  </button>
                  <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] text-slate-500">
                    <Package size={11} /> 引擎結算財務與市場，AI 生成產業事件
                  </p>
                </Card>

                {last && (
                  <Card>
                    <SectionTitle>第 {last.year} 年造成的變化</SectionTitle>
                    <div className="space-y-1.5">
                      {topChanges.map((x) => (
                        <div key={x.key} className="flex items-center justify-between rounded-md bg-ink-900/50 px-2.5 py-1.5 text-xs">
                          <span className="text-slate-300">{x.label}</span>
                          <span className={`font-mono ${x.delta > 0 ? 'text-jade-400' : 'text-rust-400'}`}>{signed(x.delta)}</span>
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
                    <p className="text-xs text-slate-500">完成第一年後，這裡會顯示 AI 對下一年的機會與風險預測。</p>
                  )}
                </Card>

                <Card>
                  <SectionTitle right={<Users size={15} className="text-slate-500" />}>利害關係人態度</SectionTitle>
                  {reactions.length === 0 ? (
                    <p className="text-xs text-slate-500">做出決策後，這裡會即時反映員工、客戶、投資人等的立場。</p>
                  ) : (
                    <ul className="space-y-2">
                      {reactions.slice(0, 6).map((r) => (
                        <li key={r.id} className="text-xs">
                          <div className={`font-medium ${r.tone === 'positive' ? 'text-jade-400' : r.tone === 'negative' ? 'text-rust-400' : 'text-slate-300'}`}>{r.name}</div>
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
        {tab === 'codex' && <CodexAchievements mode="company" />}
        {tab === 'advisor' && <Advisor />}
      </main>
    </div>
  )
}
