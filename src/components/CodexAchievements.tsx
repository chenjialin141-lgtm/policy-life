import { useGame } from '../store/gameStore'
import { allPresidentActions } from '../data/president'
import { companyActions } from '../data/company'
import { blackSwans } from '../data/shared'
import type { Mode } from '../types'
import {
  CalendarCheck, Scale, TrendingUp, HeartHandshake, Flag, Shield, PiggyBank, Vote,
  Coins, Award, Globe, Gem, Crown, Rocket, Medal, Lock, CloudLightning
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck, Scale, TrendingUp, HeartHandshake, Flag, Shield, PiggyBank, Vote,
  Coins, Award, Globe, Gem, Crown, Rocket
}

export default function CodexAchievements({ mode }: { mode: Mode }) {
  const st = useGame()
  const pool = mode === 'company' ? companyActions : allPresidentActions
  const usedNames = new Set<string>([
    ...st.codex,
    ...st.history.flatMap((r) => r.actionsEnacted.map((a) => a.name))
  ])

  return (
    <div className="space-y-4">
      {/* 成就 */}
      <div className="card-pad">
        <h3 className="section-title mb-3">成就（{st.achievements.filter((a) => a.unlocked).length}/{st.achievements.length}）</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {st.achievements.map((a) => {
            const Icon = iconMap[a.icon] || Medal
            return (
              <div key={a.id} className={`flex items-start gap-3 rounded-lg border p-3 ${a.unlocked ? 'border-gold-600/50 bg-gold-500/10' : 'border-ink-700 bg-ink-900/40 opacity-60'}`}>
                <div className={`mt-0.5 ${a.unlocked ? 'text-gold-400' : 'text-slate-600'}`}>
                  {a.unlocked ? <Icon size={20} /> : <Lock size={20} />}
                </div>
                <div>
                  <div className={`text-sm font-medium ${a.unlocked ? 'text-slate-100' : 'text-slate-400'}`}>{a.name}</div>
                  <div className="text-[11px] text-slate-500">{a.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 決策圖鑑 */}
      <div className="card-pad">
        <h3 className="section-title mb-3">決策圖鑑（已嘗試 {usedNames.size} 種）</h3>
        <div className="flex flex-wrap gap-1.5">
          {pool.map((a) => {
            const used = usedNames.has(a.name)
            return (
              <span key={a.id} className={`rounded-full border px-2.5 py-1 text-[11px] ${used ? 'border-jade-500/40 bg-jade-500/10 text-jade-400' : 'border-ink-700 text-slate-500'}`}>
                {used ? a.name : '？ ' + a.name}
              </span>
            )
          })}
        </div>
      </div>

      {/* 黑天鵝事件庫 */}
      <div className="card-pad">
        <h3 className="section-title mb-3 flex items-center gap-2"><CloudLightning size={15} className="text-rust-400" /> 黑天鵝事件庫</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {blackSwans.map((b) => {
            const hit = st.usedSwan.includes(b.id)
            return (
              <div key={b.id} className={`rounded-lg border p-3 ${hit ? 'border-rust-500/40 bg-rust-500/10' : 'border-ink-700 bg-ink-900/40'}`}>
                <div className={`text-sm font-medium ${hit ? 'text-rust-400' : 'text-slate-400'}`}>
                  {hit ? b.title : '？？？'}
                </div>
                <div className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                  {hit ? (mode === 'company' ? b.detailC : b.detailP) : '尚未在你的世界發生，保持韌性。'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
