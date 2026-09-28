import { useState } from 'react'
import { useGame } from './store/gameStore'
import type { Difficulty, Mode } from './types'
import StartScreen from './components/StartScreen'
import CompanySetup from './components/CompanySetup'
import PresidentGame from './components/PresidentGame'
import CompanyGame from './components/CompanyGame'
import YearReview from './components/YearReview'
import EndReport from './components/EndReport'

export default function App() {
  const st = useGame()
  const [setupD, setSetupD] = useState<Difficulty | null>(null)

  // 企業開局設定（在正式建立公司前）
  if (setupD) {
    return (
      <CompanySetup
        difficulty={setupD}
        onBack={() => setSetupD(null)}
        onStart={(setup) => { st.startCompany(setupD, setup); setSetupD(null) }}
      />
    )
  }

  if (!st.started) {
    const hasSave = !!st.mode && (!!st.p || !!st.c)
    return (
      <StartScreen
        hasSave={hasSave}
        onContinue={() => st.continueGame()}
        onStart={(mode: Mode, d: Difficulty) => {
          if (mode === 'president') st.startPresident(d)
          else setSetupD(d)
        }}
      />
    )
  }

  // 年度結算（含罷免 / 大選流程）
  if (st.review) return <YearReview />

  // 遊戲結束報告
  const state = st.p || st.c
  if (state?.gameOver) return <EndReport />

  if (st.mode === 'president' && st.p) return <PresidentGame />
  if (st.mode === 'company' && st.c) return <CompanyGame />

  return null
}
