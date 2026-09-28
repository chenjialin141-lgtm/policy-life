import { useState, type ReactNode } from 'react'
import { useGame } from './store/gameStore'
import type { Difficulty, Mode } from './types'
import StartScreen from './components/StartScreen'
import CompanySetup from './components/CompanySetup'
import PresidentGame from './components/PresidentGame'
import CompanyGame from './components/CompanyGame'
import YearReview from './components/YearReview'
import EndReport from './components/EndReport'

function Footer() {
  return (
    <footer className="border-t border-ink-800/70 bg-ink-950/70">
      <div className="mx-auto max-w-6xl px-4 py-5 text-center">
        <p className="text-[13px] font-medium tracking-[0.4em] text-slate-400">林　宸　嘉　製</p>
        <p className="mt-1.5 text-[10px] tracking-wider text-slate-600">
          POLICY LIFE 政策人生模擬器　·　AI 僅生成敘事，所有數值由遊戲引擎獨立計算
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const st = useGame()
  const [setupD, setSetupD] = useState<Difficulty | null>(null)

  let view: ReactNode = null

  // 企業開局設定（在正式建立公司前）
  if (setupD) {
    view = (
      <CompanySetup
        difficulty={setupD}
        onBack={() => setSetupD(null)}
        onStart={(setup) => { st.startCompany(setupD, setup); setSetupD(null) }}
      />
    )
  } else if (!st.started) {
    const hasSave = !!st.mode && (!!st.p || !!st.c)
    view = (
      <StartScreen
        hasSave={hasSave}
        onContinue={() => st.continueGame()}
        onStart={(mode: Mode, d: Difficulty) => {
          if (mode === 'president') st.startPresident(d)
          else setSetupD(d)
        }}
      />
    )
  } else if (st.review) {
    // 年度結算（含罷免 / 大選流程）
    view = <YearReview />
  } else {
    const state = st.p || st.c
    if (state?.gameOver) view = <EndReport />
    else if (st.mode === 'president' && st.p) view = <PresidentGame />
    else if (st.mode === 'company' && st.c) view = <CompanyGame />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{view}</div>
      <Footer />
    </div>
  )
}
