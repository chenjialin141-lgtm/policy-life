import type { Achievement, Difficulty, Effects, Mode, Stakeholder } from '../types'

export const stakeholderNames: Record<string, string> = {
  youth: '青年', labor: '勞工', business: '企業', students: '學生', elderly: '長者',
  landlords: '房東', renters: '租屋族', middle: '中產階級', lowIncome: '低收入戶', highIncome: '高所得族群',
  localGov: '地方政府', centralGov: '中央政府',
  employees: '員工', customers: '客戶', investors: '投資人', competitors: '競爭者', suppliers: '供應商', banks: '銀行',
  partners: '合作夥伴', regulators: '主管機關', public: '社會大眾'
}

// 標準 id（小寫索引 → 正確寫法）
const PRESIDENT_STD = ['youth', 'labor', 'business', 'students', 'elderly', 'landlords', 'renters', 'middle', 'lowIncome', 'highIncome', 'localGov', 'centralGov', 'public']
const COMPANY_STD = ['employees', 'customers', 'investors', 'competitors', 'suppliers', 'banks', 'partners', 'regulators', 'public']
function stdMap(ids: string[]): Record<string, string> {
  const m: Record<string, string> = {}
  for (const id of ids) m[id.toLowerCase().replace(/\s+/g, '')] = id
  return m
}
// AI 自由發揮的中英文群體名稱 → 標準 id
const PRESIDENT_ALIAS: Record<string, string> = {
  laborunion: 'labor', laborunions: 'labor', union: 'labor', unions: 'labor', worker: 'labor', workers: 'labor', labors: 'labor', workforce: 'labor', workingclass: 'labor', wagelabor: 'labor',
  勞工: 'labor', 勞工團體: 'labor', 工會: 'labor', 勞動者: 'labor', 勞動階級: 'labor', 受薪階級: 'labor', 藍領: 'labor',
  company: 'business', companies: 'business', corp: 'business', corps: 'business', corporate: 'business', corporates: 'business', corporation: 'business', employer: 'business', employers: 'business', enterprise: 'business', enterprises: 'business', factory: 'business', factories: 'business',
  企業: 'business', 企業家: 'business', 企業主: 'business', 雇主: 'business', 財團: 'business', 廠商: 'business', 中小企業: 'business', 公司: 'business', 老闆: 'business', 資方: 'business', 工商界: 'business', 商會: 'business',
  young: 'youth', youngpeople: 'youth', youngsters: 'youth', youthgroup: 'youth', 青年: 'youth', 年輕人: 'youth', 年輕族群: 'youth', 青年世代: 'youth',
  student: 'students', pupil: 'students', pupils: 'students', 學生: 'students', 學子: 'students',
  elders: 'elderly', elder: 'elderly', senior: 'elderly', seniors: 'elderly', retiree: 'elderly', retirees: 'elderly', pensioner: 'elderly',
  長者: 'elderly', 老人: 'elderly', 老年: 'elderly', 老年人: 'elderly', 銀髮族: 'elderly', 退休族: 'elderly', 長輩: 'elderly',
  landlord: 'landlords', landowner: 'landlords', landowners: 'landlords', 房東: 'landlords', 地主: 'landlords',
  renter: 'renters', tenant: 'renters', tenants: 'renters', 租屋族: 'renters', 租客: 'renters', 承租人: 'renters',
  middleclass: 'middle', middleincome: 'middle', bourgeoisie: 'middle', 中產: 'middle', 中產階級: 'middle', 中產階層: 'middle', 小康家庭: 'middle',
  poor: 'lowIncome', thepoor: 'lowIncome', disadvantaged: 'lowIncome', underclass: 'lowIncome', lowwage: 'lowIncome',
  低收入: 'lowIncome', 低收入戶: 'lowIncome', 弱勢: 'lowIncome', 弱勢族群: 'lowIncome', 低薪: 'lowIncome', 低薪族: 'lowIncome', 貧窮: 'lowIncome', 基層: 'lowIncome',
  rich: 'highIncome', wealthy: 'highIncome', millionaire: 'highIncome', billionaire: 'highIncome', capitalist: 'highIncome',
  高所得: 'highIncome', 富人: 'highIncome', 有錢人: 'highIncome', 資本家: 'highIncome',
  localgovernment: 'localGov', municipality: 'localGov', citygovernment: 'localGov', county: 'localGov',
  地方政府: 'localGov', 縣市政府: 'localGov', 地方首長: 'localGov', 市長: 'localGov',
  centralgovernment: 'centralGov', government: 'centralGov', gov: 'centralGov', state: 'centralGov', administration: 'centralGov', cabinet: 'centralGov', parliament: 'centralGov', congress: 'centralGov', legislature: 'centralGov',
  中央政府: 'centralGov', 政府: 'centralGov', 行政院: 'centralGov', 內閣: 'centralGov', 國會: 'centralGov', 議會: 'centralGov', 官方: 'centralGov', 當局: 'centralGov',
  官僚: 'centralGov', 官員: 'centralGov', 公務員: 'centralGov', 文官: 'centralGov', 行政部門: 'centralGov', 行政團隊: 'centralGov', 執政團隊: 'centralGov', 執政黨: 'centralGov', 黨團: 'centralGov',
  people: 'public', citizens: 'public', citizen: 'public', voters: 'public', voter: 'public', society: 'public', community: 'public', civilians: 'public',
  社會大眾: 'public', 民眾: 'public', 人民: 'public', 選民: 'public', 公民: 'public', 大眾: 'public', 輿論: 'public', 社會: 'public'
}
const COMPANY_ALIAS: Record<string, string> = {
  employee: 'employees', staff: 'employees', worker: 'employees', workers: 'employees', workforce: 'employees', labor: 'employees', crew: 'employees', team: 'employees',
  員工: 'employees', 職員: 'employees', 勞工: 'employees', 工作者: 'employees', 團隊: 'employees',
  customer: 'customers', client: 'customers', clients: 'customers', consumer: 'customers', consumers: 'customers', user: 'customers', users: 'customers', buyer: 'customers', buyers: 'customers', shopper: 'customers', shoppers: 'customers',
  客戶: 'customers', 顧客: 'customers', 消費者: 'customers', 用戶: 'customers', 買家: 'customers', 客人: 'customers',
  investor: 'investors', shareholder: 'investors', shareholders: 'investors', stockholder: 'investors', stockholders: 'investors', vc: 'investors', venturecapital: 'investors',
  投資人: 'investors', 股東: 'investors', 投資者: 'investors', 創投: 'investors', 金主: 'investors',
  competitor: 'competitors', rival: 'competitors', rivals: 'competitors', opponent: 'competitors', opponents: 'competitors',
  競爭者: 'competitors', 競爭對手: 'competitors', 對手: 'competitors', 同業: 'competitors',
  supplier: 'suppliers', vendor: 'suppliers', vendors: 'suppliers', supplychain: 'suppliers', upstream: 'suppliers',
  供應商: 'suppliers', 上游: 'suppliers', 協力廠: 'suppliers', 協力廠商: 'suppliers',
  bank: 'banks', creditor: 'banks', creditors: 'banks', lender: 'banks', lenders: 'banks', financialinstitution: 'banks',
  銀行: 'banks', 債權人: 'banks', 融資機構: 'banks', 金控: 'banks',
  partner: 'partners', allies: 'partners', ally: 'partners', collaborator: 'partners', collaborators: 'partners',
  合作夥伴: 'partners', 盟友: 'partners', 通路夥伴: 'partners',
  regulator: 'regulators', regulators: 'regulators', government: 'regulators', gov: 'regulators', authority: 'regulators', authorities: 'regulators', official: 'regulators', officials: 'regulators',
  主管機關: 'regulators', 監管機關: 'regulators', 政府: 'regulators', 官方: 'regulators', 查核機關: 'regulators',
  官僚: 'regulators', 官員: 'regulators', 公務員: 'regulators', 文官: 'regulators', 行政部門: 'regulators',
  people: 'public', society: 'public', media: 'public', citizens: 'public', netizen: 'public', netizens: 'public',
  社會大眾: 'public', 民眾: 'public', 輿論: 'public', 媒體: 'public', 網友: 'public'
}

// 把 AI 給的任意中英文群體鍵正規化到標準 id；中文罕見鍵原樣保留以利顯示
export function normalizeStakeholderKey(raw: string, mode: 'president' | 'company'): string {
  const orig = String(raw == null ? '' : raw).trim()
  if (!orig) return orig
  const k = orig.toLowerCase().replace(/[\s\-]+/g, '')
  const std = stdMap(mode === 'company' ? COMPANY_STD : PRESIDENT_STD)
  if (std[k]) return std[k]
  const alias = mode === 'company' ? COMPANY_ALIAS : PRESIDENT_ALIAS
  if (alias[k]) return alias[k]
  if (/[一-鿿]/.test(orig)) return orig
  return orig
}

// 群體 id → 顯示名稱；找不到標準名稱時，中文原樣、英文轉可讀格式
export function groupName(id: string): string {
  if (stakeholderNames[id]) return stakeholderNames[id]
  if (/[一-鿿]/.test(id)) return id
  return id.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).trim()
}

export const difficultyParams: Record<Difficulty, { blackSwanP: number; crisisMul: number; label: string; desc: string }> = {
  easy: { blackSwanP: 0.03, crisisMul: 0.7, label: 'EASY', desc: '資源較充足、危機較少' },
  normal: { blackSwanP: 0.07, crisisMul: 1, label: 'NORMAL', desc: '正常模擬' },
  hard: { blackSwanP: 0.11, crisisMul: 1.35, label: 'HARD', desc: '政策衝突更明顯、資源偏緊' },
  extreme: { blackSwanP: 0.16, crisisMul: 1.7, label: 'EXTREME', desc: '資源緊繃、黑天鵝頻發' }
}

// ---------- 成就 ----------
export function initialAchievements(mode: Mode): Achievement[] {
  const president: Achievement[] = [
    { id: 'pa_first_year', name: '踏上執政之路', desc: '完成第一個年度', icon: 'CalendarCheck', unlocked: false },
    { id: 'pa_balanced', name: '財政紀律', desc: '在不舉債的情況下通過一年（無赤字）', icon: 'Scale', unlocked: false },
    { id: 'pa_miracle', name: '經濟奇蹟', desc: '連續三年經濟成長率 ≥ 4%', icon: 'TrendingUp', unlocked: false },
    { id: 'pa_trust', name: '民心所向', desc: '社會信任達到 85', icon: 'HeartHandshake', unlocked: false },
    { id: 'pa_recall_win', name: '挺過罷免', desc: '在罷免投票中過關續任', icon: 'Flag', unlocked: false },
    { id: 'pa_survivor', name: '危機領導者', desc: '帶領國家撐過一次重大危機或黑天鵝', icon: 'Shield', unlocked: false },
    { id: 'pa_debt_cut', name: '減債有成', desc: '政府債務較就職時減少 20% 以上', icon: 'PiggyBank', unlocked: false },
    { id: 'pa_reelected', name: '連任成功', desc: '贏得總統大選進入第二任期', icon: 'Vote', unlocked: false }
  ]
  const company: Achievement[] = [
    { id: 'ca_first_revenue', name: '生意上門', desc: '年度營收突破 1,000 萬', icon: 'Coins', unlocked: false },
    { id: 'ca_first_profit', name: '轉虧為盈', desc: '首度繳出年度獲利', icon: 'TrendingUp', unlocked: false },
    { id: 'ca_cert', name: '品牌起步', desc: '品牌力達到 60', icon: 'Award', unlocked: false },
    { id: 'ca_overseas', name: '航向海外', desc: '業務區域拓展至跨國市場', icon: 'Globe', unlocked: false },
    { id: 'ca_survivor', name: '浴火重生', desc: '在重大危機或黑天鵝後仍持續經營', icon: 'Shield', unlocked: false },
    { id: 'ca_unicorn', name: '獨角獸潛力', desc: '現金與市值達到 1 億以上', icon: 'Gem', unlocked: false },
    { id: 'ca_leader', name: '市場領導者', desc: '市占率達到所屬市場上限的 80%', icon: 'Crown', unlocked: false },
    { id: 'ca_ipo', name: 'IPO 敲鑼', desc: '成功讓公司股票上市', icon: 'Rocket', unlocked: false }
  ]
  return mode === 'president' ? president : company
}

// ---------- 黑天鵝事件庫 ----------
export interface BlackSwan {
  id: string
  title: string
  detailP: string
  detailC: string
  effectsP: Effects
  effectsC: Effects
}

export const blackSwans: BlackSwan[] = [
  {
    id: 'bs_financial_crisis', title: '全球金融海嘯',
    detailP: '國際金融市場崩盤、信用緊縮，出口與投資急凍，失業潮浮現，稅收大幅下滑。',
    detailC: '市場需求驟降、資金撤離，客戶縮手、應收帳款拉長，公司面臨嚴冬。',
    effectsP: { growth: -3, unemployment: 2, revenue: -130, inflation: -0.6, approval: -5, socialTrust: -4 },
    effectsC: { revenue: -650, marketShare: -2, investorConfidence: -16, brand: -3 }
  },
  {
    id: 'bs_pandemic', title: '重大傳染病疫情',
    detailP: '疫情衝擊供應鏈與內需，醫療量能緊繃，政府被迫紓困並增加支出。',
    detailC: '人流與物流受阻，實體營運斷鏈，但數位與防疫相關需求上升。',
    effectsP: { growth: -1.6, unemployment: 1.1, inflation: 1, healthcare: -6, debtNow: 150, approval: -2 },
    effectsC: { revenue: -320, production: -8, investorConfidence: -8, rnd: 3 }
  },
  {
    id: 'bs_war', title: '區域戰爭與能源危機',
    detailP: '地緣衝突導致能源與進口物價飆漲、供應鏈中斷，國防壓力升高。',
    detailC: '原物料與運費暴漲、能源成本攀升，毛利受到嚴重壓縮。',
    effectsP: { inflation: 2.4, energy: -10, trade: -1, growth: -1.4, defense: 4, politicalStability: -3 },
    effectsC: { production: -6, revenue: -220, investorConfidence: -11, rnd: 0 }
  },
  {
    id: 'bs_tech_revolution', title: '顛覆性技術革命',
    detailP: 'AI 等通用技術引爆生產力革命，舊工作被取代、新產業興起，監管面臨挑戰。',
    detailC: '市場版圖重新洗牌：技術領先者彎道超車，跟不上的業者被邊緣化。',
    effectsP: { growth: 1.4, unemployment: 0.7, inequality: 2, education: -2 },
    effectsC: { rnd: 6, competitor: 8, investorConfidence: 4 }
  },
  {
    id: 'bs_quake', title: '重大天然災害',
    detailP: '強震／極端氣候重創基礎設施，政府須投入龐大重建經費。',
    detailC: '廠房、門市或供應鏈受損，營運中斷並產生重建支出。',
    effectsP: { growth: -0.9, inflation: 0.5, debtNow: 180, politicalStability: -2, approval: -2 },
    effectsC: { production: -9, revenue: -180, investorConfidence: -6 }
  },
  {
    id: 'bs_trade_war', title: '全球貿易戰',
    detailP: '主要經濟體互課關稅、出口受阻，依賴外銷的產業壓力沉重。',
    detailC: '關稅與出口管制墊高成本、海外訂單流失，供應鏈被迫重組。',
    effectsP: { trade: -1.6, growth: -1, inflation: 1, unemployment: 0.6 },
    effectsC: { revenue: -420, marketShare: -2, production: -4, investorConfidence: -9 }
  }
]
