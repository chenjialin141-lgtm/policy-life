// ============ 全域型別定義 Policy Life ============

export type Mode = 'president' | 'company'
export type Difficulty = 'easy' | 'normal' | 'hard' | 'extreme'

// 指標變化集合：key 為狀態欄位，value 為變化量（單位見各引擎）
export type Effects = Record<string, number>

export type Stakeholder =
  | 'youth' | 'labor' | 'business' | 'students' | 'elderly'
  | 'landlords' | 'renters' | 'middle' | 'lowIncome' | 'highIncome'
  | 'localGov' | 'centralGov'
  // 企業模式群體
  | 'employees' | 'customers' | 'investors' | 'competitors' | 'suppliers' | 'banks'

export interface RequiredRes {
  budget?: number      // 一次性預算 / 現金
  recurring?: number   // 每年常態支出
  admin?: number       // 行政能力 / 人才
  political?: number   // 政治資本
  land?: number
  energy?: number
}

export interface ActionDef {
  id: string
  name: string
  desc: string
  category: string
  cost: number             // 一次性成本
  recurring: number        // 每年常態成本（正值＝支出）
  effects: Effects         // 施行後每年套用的指標變化
  required?: RequiredRes
  duration: 'instant' | 'permanent'
  tags?: string[]
  stakeholders?: Record<string, number>
}

export interface ActiveAction {
  id: string
  name: string
  desc: string
  category: string
  cost: number
  recurring: number
  duration: 'instant' | 'permanent'
  effects: Effects
  required?: RequiredRes
  tags?: string[]
  stakeholders?: Record<string, number>
  scale: number            // 強度倍數（滑桿 / AI 解析）
  yearEnacted: number
}

export type Severity = 'good' | 'neutral' | 'risk' | 'crisis' | 'blackswan'

export interface EventChoice {
  label: string
  note: string
  effects: Effects
  stakeholders?: Record<string, number>
}

export interface GameEvent {
  id: string
  year: number
  title: string
  detail: string
  severity: Severity
  causedBy?: string[]      // 因果來源（action uid / 事件 id / 規則名）
  effects?: Effects
  choices?: EventChoice[]
  blackSwan?: boolean
  resolved?: boolean
}

export interface NewsItem {
  category: string
  headline: string
  detail?: string
}

export type RiskLevel = 'opportunity' | 'low' | 'medium' | 'high'
export interface RiskItem {
  level: RiskLevel
  text: string
  related?: string
}

export interface ChangeSource {
  source: string
  amount: number
}
export interface ChangeReason {
  key: string
  label: string
  delta: number
  sources: ChangeSource[]
}

export interface StakeholderReaction {
  id: string
  name: string
  tone: 'positive' | 'neutral' | 'negative'
  comment: string
  score: number
}

export interface ElectionResult {
  year: number
  term: number
  playerVotes: number
  rivalVotes: number
  rivalName: string
  won: boolean
  narrative: string
}

export interface RecallResult {
  year: number
  triggered: boolean
  success: boolean
  narrative: string
}

export interface YearRecord {
  year: number
  actionsEnacted: ActiveAction[]
  events: GameEvent[]
  news: NewsItem[]
  risks: RiskItem[]
  reactions: StakeholderReaction[]
  changes: ChangeReason[]
  election?: ElectionResult
  recall?: RecallResult
  snapshot: PState | CState
}

// ---------- 總統模式狀態 ----------
export interface PState {
  year: number
  term: number
  population: number       // 萬人
  gdp: number              // 億
  growth: number           // %
  inflation: number        // %
  unemployment: number     // %
  revenue: number
  fixedSpending: number
  discretionary: number    // 可自由分配預算
  allocated: number        // 本年度已配置（常態政策）
  spending: number
  debt: number
  interest: number
  interestRate: number     // %
  defense: number
  education: number
  healthcare: number
  welfare: number
  housing: number
  energy: number
  trade: number
  inequality: number       // 0-100
  housingPrice: number     // 指數 100 基準
  approval: number
  socialTrust: number
  politicalStability: number
  adminCapacity: number
  politicalCapital: number
  govSupport: number
  opposition: number
  gameOver: boolean
  endReason?: string
  reelected: boolean
}

// ---------- 企業模式狀態 ----------
export interface CState {
  year: number
  productName: string
  industry: string
  headquarters: string
  region: string
  marketNote?: string
  revenue: number
  profit: number
  cash: number
  debt: number
  employees: number
  salary: number
  marketShare: number
  brand: number
  rnd: number
  production: number
  customers: number
  investorConfidence: number
  stockPrice: number | null
  competitor: number
  ipo: boolean
  gameOver: boolean
  endReason?: string
  milestone?: string
}

export interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
  unlocked: boolean
  year?: number
}

export interface GameSave {
  mode: Mode
  difficulty: Difficulty
  state: PState | CState
  activeActions: ActiveAction[]
  history: YearRecord[]
  achievements: Achievement[]
  codex: string[]          // 已使用過的 action id
  log: string[]
  updatedAt: number
}
