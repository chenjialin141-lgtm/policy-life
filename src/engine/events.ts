import type { ActiveAction, GameEvent, PState, CState, Severity } from '../types'
import { blackSwans, type BlackSwan } from '../data/shared'
import { uid } from './helpers'

interface PCtx {
  year: number
  deficit: number
  debtRatio: number
  activeNames: string[]
  usedSwan: string[]
  swanP: number
  rng: () => number
}

function ev(year: number, title: string, detail: string, severity: Severity, causedBy?: string[], effects?: Record<string, number>, blackSwan = false): GameEvent {
  return { id: uid('ev'), year, title, detail, severity, causedBy, effects, blackSwan }
}

// ---------- 總統條件事件（危機升級鏈由 state 閾值驅動，非隨機） ----------
export function presidentEvents(s: PState, c: PCtx): GameEvent[] {
  const out: GameEvent[] = []
  const spenders = c.activeNames.slice(0, 3).join('、')

  // 黑天鵝
  if (c.rng() < c.swanP) {
    const pool = blackSwans.filter((b) => !c.usedSwan.includes(b.id))
    const pick: BlackSwan | undefined = pool[Math.floor(c.rng() * pool.length)] ?? blackSwans[0]
    out.push(ev(c.year, '黑天鵝：' + pick.title, pick.detailP, 'blackswan', ['國際環境'], pick.effectsP, true))
  }

  // 財政因果鏈
  if (c.deficit > 80) {
    out.push(ev(c.year, '財政赤字擴大', `今年支出明顯超過收入，赤字約 ${Math.round(c.deficit)} 億${spenders ? '，主要來自：' + spenders : ''}，政府準備擴大舉債。`, 'risk', spenders ? c.activeNames.slice(0, 2) : ['財政收支'], { approval: -1.5, politicalCapital: -2 }))
  }
  if (c.debtRatio > 0.85) {
    out.push(ev(c.year, '政府債務負擔沉重', `政府債務已達 GDP 的 ${(c.debtRatio * 100).toFixed(0)}%，市場開始質疑財政永續性，公債殖利率面臨上行壓力。`, 'risk', ['財政赤字擴大'], { interestRate: 0.6, investorConfidence: 0, politicalStability: -1 }))
  }
  if (c.debtRatio > 1.15 && c.deficit > 60) {
    out.push(ev(c.year, '債信危機逼近', `債台高築加上持續赤字，信用評等機構點名降評，借新還舊成本急升，利息開始排擠其他預算。`, 'crisis', ['政府債務負擔沉重'], { interestRate: 1.2, approval: -3, socialTrust: -3, politicalStability: -3 }))
  }
  if (c.debtRatio > 1.4) {
    out.push(ev(c.year, '財政危機', '政府已難以支付必要支出與債務利息，主權債務危機爆發，國會要求總統負責。', 'crisis', ['債信危機逼近'], { approval: -8, politicalStability: -10, socialTrust: -8 }))
  }

  // 民生與經濟
  if (s.inflation >= 5) {
    out.push(ev(c.year, '物價飆漲民怨升高', `通膨率達 ${s.inflation.toFixed(1)}%，民眾實質所得縮水，受薪階級與弱勢族群感受最強烈。`, 'risk', ['總體經濟'], { approval: -3, socialTrust: -2 }))
  }
  if (s.unemployment >= 7) {
    out.push(ev(c.year, '失業潮引發抗議', `失業率升至 ${s.unemployment.toFixed(1)}%，多地出現勞工抗議，青年就業問題尤其尖銳。`, 'risk', ['總體經濟'], { approval: -3, socialTrust: -2, politicalStability: -2 }))
  }
  if (s.housingPrice >= 130) {
    out.push(ev(c.year, '青年居住危機', `房價指數來到 ${s.housingPrice.toFixed(0)}，青年與租屋族無力負擔，無殼蝸牛集結上街。`, 'risk', ['住宅政策'], { approval: -2.5, socialTrust: -2, politicalCapital: -2 }))
  }
  if (s.inequality >= 55) {
    out.push(ev(c.year, '貧富差距激化對立', `貧富差距指數升至 ${s.inequality.toFixed(0)}，社會相對剝奪感升高，階級對立成為政治議題。`, 'risk', ['分配政策'], { socialTrust: -3, politicalStability: -1 }))
  }
  if (s.growth >= 4 && s.unemployment < 5) {
    out.push(ev(c.year, '經濟榮景', `經濟成長率達 ${s.growth.toFixed(1)}%、就業穩定，企業增資、民眾有感，政府聲望上揚。`, 'good', ['總體經濟'], { approval: 3, socialTrust: 1.5, politicalCapital: 2 }))
  }
  if (s.energy < 45) {
    out.push(ev(c.year, '供電與能源壓力', `能源供給餘裕縮減，分區限電傳聞衝擊產業與民生用電信心。`, 'risk', ['能源政策'], { growth: -0.3, approval: -2 }))
  }
  return out
}

interface CCtx {
  year: number
  monthsCash: number      // 現金可支應月數
  debtRatio: number       // 負債 / 年營收
  usedSwan: string[]
  swanP: number
  rng: () => number
  active: ActiveAction[]
}

// ---------- 企業條件事件 ----------
export function companyEvents(s: CState, c: CCtx): GameEvent[] {
  const out: GameEvent[] = []
  if (c.rng() < c.swanP) {
    const pool = blackSwans.filter((b) => !c.usedSwan.includes(b.id))
    const pick: BlackSwan | undefined = pool[Math.floor(c.rng() * pool.length)] ?? blackSwans[0]
    // 技術革命對高研發公司是機會
    let detail = pick.detailC
    let eff = { ...pick.effectsC }
    if (pick.id === 'bs_tech_revolution' && s.rnd >= 55) {
      detail = 'AI 技術革命到來，貴公司長期投入的研發正好卡位，產品彎道超車，資本市場給予高度期待。'
      eff = { rnd: 4, marketShare: 3, revenue: 500, investorConfidence: 12, brand: 4 }
    }
    out.push(ev(c.year, '黑天鵝：' + pick.title, detail, 'blackswan', ['總體環境'], eff, true))
  }

  if (c.monthsCash < 4 && c.monthsCash >= 0) {
    out.push(ev(c.year, '現金流警報', `帳上現金只夠支應約 ${c.monthsCash.toFixed(1)} 個月營運，若營收未改善，將面臨發不出薪水的風險。`, 'risk', ['財務調度'], { investorConfidence: -6 }))
  }
  if (c.debtRatio > 2.5 && s.revenue < s.debt) {
    out.push(ev(c.year, '債務危機', '負債遠超年度營收，銀行緊縮額度、供應商要求預付，資金鏈隨時可能斷裂。', 'crisis', ['現金流警報'], { investorConfidence: -12, brand: -4 }))
  }
  if (s.marketShare < 1 && c.year > 2) {
    out.push(ev(c.year, '市場邊緣化', '市占率跌破 1%，產品逐漸被主流市場忽略，通路與媒體曝光都在流失。', 'crisis', ['市場競爭'], { brand: -5, revenue: -150 }))
  }
  if (s.competitor >= 75 && c.rng() < 0.5) {
    out.push(ev(c.year, '競爭者發動價格戰', '主要對手大舉降價補貼，搶走價格敏感客戶，公司面臨跟進或堅持的兩難。', 'risk', ['市場競爭'], { marketShare: -1.5, revenue: -200, investorConfidence: -3 }))
  }
  if (s.rnd >= 60 && c.rng() < 0.4) {
    out.push(ev(c.year, '研發傳出突破', '團隊在核心技術上取得關鍵突破，新產品獲得市場矚目，詢問度大增。', 'good', ['研發投入'], { marketShare: 1.5, revenue: 300, brand: 4, investorConfidence: 5 }))
  }
  if (s.brand >= 70 && c.rng() < 0.4) {
    out.push(ev(c.year, '產品爆紅', '品牌聲量发酵，單一產品在社群引爆話題，訂單與流量大幅湧入。', 'good', ['品牌行銷'], { customers: 0, marketShare: 2, revenue: 450, brand: 3 }))
  }
  if (s.investorConfidence < 30 && c.rng() < 0.5) {
    out.push(ev(c.year, '募資遇冷', '資本市場對公司前景轉趨保守，下一輪募資估值被壓、談判困難。', 'risk', ['投資人關係'], { investorConfidence: -4 }))
  }
  if (s.production < 25 && s.marketShare > 10) {
    out.push(ev(c.year, '產能追不上訂單', '市場需求超過供給能力，訂單積壓、客戶等待過久，競爭者有機可乘。', 'risk', ['營運產能'], { brand: -3, marketShare: -1 }))
  }
  return out
}
