import type { ActionDef, CState, Difficulty } from '../types'

export interface IndustryTemplate {
  id: string
  name: string
  examples: string[]
  cash: number
  employees: number
  salary: number
  revenue: number
  customers: number
  rnd: number
  brand: number
  production: number
  competitor: number
  blurb: string
}

export const industries: IndustryTemplate[] = [
  { id: 'ai_saas', name: 'AI 軟體 / SaaS', examples: ['AI 家教 App', '企業自動化平台', 'AI 法律助手'], cash: 3200, employees: 9, salary: 85, revenue: 250, customers: 40, rnd: 45, brand: 22, production: 25, competitor: 58, blurb: '高毛利、輕資產、研發與人才密集，現金消耗快、競爭激烈' },
  { id: 'fnb', name: '餐飲連鎖', examples: ['手搖飲料店', '便當連鎖', '咖啡品牌'], cash: 1800, employees: 14, salary: 55, revenue: 900, customers: 12000, rnd: 12, brand: 30, production: 45, competitor: 62, blurb: '現金流快、毛利低、靠展店與品牌，地點與食安是關鍵' },
  { id: 'ev', name: '電動車 / 硬體', examples: ['電動機車', '充電設備', '智慧硬體'], cash: 6000, employees: 40, salary: 78, revenue: 1500, customers: 800, rnd: 40, brand: 18, production: 40, competitor: 55, blurb: '重資本、長週期、產能與供應鏈決定生死，募資需求大' },
  { id: 'green', name: '綠能設備', examples: ['太陽能系統', '儲能櫃', '風電零組件'], cash: 5200, employees: 32, salary: 75, revenue: 1200, customers: 60, rnd: 38, brand: 20, production: 42, competitor: 48, blurb: '政策與補貼驅動、重資本，國際能源價格影響大' },
  { id: 'beauty', name: '美妝保養', examples: ['護膚品牌', '機能保養品', '彩妝'], cash: 2400, employees: 12, salary: 62, revenue: 700, customers: 6000, rnd: 25, brand: 28, production: 35, competitor: 64, blurb: '品牌與行銷主導、產品生命週期短，KOL 與通路影響力強' },
  { id: 'pettech', name: '寵物科技', examples: ['智慧餵食器', '寵物健康 App', '寵物保險平台'], cash: 2200, employees: 10, salary: 72, revenue: 350, customers: 900, rnd: 35, brand: 24, production: 30, competitor: 44, blurb: '市場成長快、飼主忠誠度高，產品體驗與口碑決定成長' },
  { id: 'ecom', name: '電商零售', examples: ['生鮮電商', '選物平台', 'D2C 品牌'], cash: 2600, employees: 16, salary: 64, revenue: 1100, customers: 18000, rnd: 18, brand: 26, production: 38, competitor: 66, blurb: '規模經濟、物流與價格戰，補貼換取長、獲利紀律是挑戰' },
  { id: 'biotech', name: '生技醫療', examples: ['新藥研發', '醫材', '數位健康'], cash: 7000, employees: 26, salary: 92, revenue: 200, customers: 25, rnd: 60, brand: 16, production: 20, competitor: 40, blurb: '長週期、高研發、法規門檻高，單一產品成功報酬極大' }
]

export const locations: string[] = [
  '台北', '新北', '台中', '高雄', '上海', '香港', '新加坡', '東京', '首爾',
  '曼谷', '雅加達', '胡志明市', '馬尼拉', '吉隆坡'
]

export const regions = [
  { id: 'local', name: '單一城市／本地', shareCap: 8, revMul: 1 },
  { id: 'national', name: '全國市場', shareCap: 25, revMul: 2.6 },
  { id: 'regional', name: '跨國區域市場', shareCap: 40, revMul: 5 },
  { id: 'global', name: '全球市場', shareCap: 60, revMul: 9 }
]

export function initialCState(t: IndustryTemplate, diff: Difficulty): CState {
  const diffCash = diff === 'easy' ? 1.3 : diff === 'hard' ? 0.8 : diff === 'extreme' ? 0.6 : 1
  const diffComp = diff === 'easy' ? -8 : diff === 'hard' ? 8 : diff === 'extreme' ? 14 : 0
  return {
    year: 1,
    productName: '',
    industry: t.name,
    headquarters: '',
    region: 'local',
    revenue: t.revenue,
    profit: 0,
    cash: Math.round(t.cash * diffCash),
    debt: 0,
    employees: t.employees,
    salary: t.salary,
    marketShare: 2,
    brand: t.brand,
    rnd: t.rnd,
    production: t.production,
    customers: t.customers,
    investorConfidence: 55,
    stockPrice: null,
    competitor: Math.min(95, t.competitor + diffComp),
    ipo: false,
    gameOver: false
  }
}

// 企業經營決策模板（金額單位：萬元；cashNow/debtNow 為一次性）
export const companyActions: ActionDef[] = [
  { id: 'c_marketing', name: '大舉投放行銷', desc: '砸預算買廣告與 KOL，快速拉抬品牌與客源', category: '行銷', cost: 300, recurring: 200, duration: 'permanent', effects: { brand: 8, marketShare: 1.2, revenue: 350 }, stakeholders: { customers: 2, competitors: -1 } },
  { id: 'c_rnd', name: '擴增研發團隊', desc: '投入新產品與技術，建立長期護城河', category: '研發', cost: 100, recurring: 250, duration: 'permanent', required: { admin: 6 }, effects: { rnd: 10, production: 2, revenue: 120 }, stakeholders: { customers: 1, competitors: -1 } },
  { id: 'c_raise_salary', name: '調高薪資攬才', desc: '提高薪資與福利，降低優秀人才流失', category: '人力', cost: 0, recurring: 150, duration: 'permanent', effects: { rnd: 3, brand: 2, production: 2, investorConfidence: -1 }, stakeholders: { employees: 3 } },
  { id: 'c_hire', name: '大舉徵才擴編', desc: '各部隊大量招人，衝高產能與研發量能', category: '人力', cost: 80, recurring: 320, duration: 'permanent', required: { budget: 400, admin: 8 }, effects: { employees: 22, production: 6, rnd: 4, revenue: 150 }, stakeholders: { employees: 2 } },
  { id: 'c_factory', name: '擴廠／擴點', desc: '新增廠房或門市，提高產能與服務覆蓋', category: '營運', cost: 800, recurring: 120, duration: 'permanent', tags: ['重資本'], required: { budget: 920 }, effects: { employees: 14, production: 12, marketShare: 1, revenue: 250 }, stakeholders: { customers: 1, suppliers: 1 } },
  { id: 'c_layoff', name: '精簡組織裁員', desc: '刪減人事降低燒錢速度，但打擊士氣與品牌', category: '人力', cost: 120, recurring: -220, duration: 'instant', effects: { employees: -16, production: -5, brand: -6, investorConfidence: 2 }, stakeholders: { employees: -3, investors: 1 } },
  { id: 'c_price_cut', name: '降價搶市', desc: '以價格換取市占率，短期壓縮毛利', category: '行銷', cost: 0, recurring: 0, duration: 'permanent', effects: { revenue: -120, marketShare: 2, brand: 1 }, stakeholders: { customers: 2, competitors: -2 } },
  { id: 'c_price_up', name: '調高售價', desc: '提高單價改善毛利，但可能流失客戶', category: '行銷', cost: 0, recurring: 0, duration: 'permanent', effects: { revenue: 300, marketShare: -1.5, brand: -2 }, stakeholders: { customers: -2, investors: 1 } },
  { id: 'c_fundraise', name: '向投資人募資', desc: '釋放股權換取資金（增資），不生利息但稀釋', category: '財務', cost: 0, recurring: 0, duration: 'instant', tags: ['股權'], effects: { cashNow: 2200, investorConfidence: -2 }, stakeholders: { investors: 1 } },
  { id: 'c_loan', name: '向銀行借款', desc: '取得債務資金，明年起償還利息', category: '財務', cost: 0, recurring: 0, duration: 'instant', tags: ['借款'], effects: { debtNow: 1600, cashNow: 1600, investorConfidence: -1 }, stakeholders: { banks: 1 } },
  { id: 'c_overseas', name: '佈局海外市場', desc: '投入資源開拓國外客戶與通路', category: '策略', cost: 1200, recurring: 160, duration: 'permanent', tags: ['海外'], required: { budget: 1360, admin: 6 }, effects: { employees: 8, marketShare: 2.5, revenue: 500, brand: 4 }, stakeholders: { customers: 2, competitors: -1 } },
  { id: 'c_acquire', name: '收購競爭對手', desc: '併購以快速取得市占與技術（高價）', category: '策略', cost: 2200, recurring: 0, duration: 'instant', tags: ['併購'], required: { budget: 2200 }, effects: { marketShare: 5, competitor: -10, revenue: 450, brand: 3 }, stakeholders: { competitors: -3, investors: -1 } },
  { id: 'c_supplychain', name: '優化供應鏈', desc: '改造採購與物流，降本並提高交付穩定度', category: '營運', cost: 220, recurring: -60, duration: 'permanent', effects: { production: 5, revenue: 80 }, stakeholders: { suppliers: 1, customers: 1 } },
  { id: 'c_ai_transform', name: '數位／AI 轉型', desc: '導入自動化與 AI，提升效率、長期降低人力成本', category: '研發', cost: 500, recurring: -80, duration: 'permanent', tags: ['AI'], required: { budget: 500 }, effects: { employees: -5, rnd: 8, production: 6, brand: 2 }, stakeholders: { employees: -1, investors: 2 } },
  { id: 'c_cert_brand', name: '品牌與認證投資', desc: '取得國際認證、打造品牌信任度', category: '行銷', cost: 260, recurring: 0, duration: 'instant', effects: { brand: 10, investorConfidence: 3, marketShare: 0.6 }, stakeholders: { customers: 2, investors: 2, banks: 1 } },
  { id: 'c_new_product', name: '推出新產品', desc: '開發並上市新產品線，創造新營收', category: '研發', cost: 420, recurring: 0, duration: 'instant', required: { budget: 420, admin: 4 }, effects: { rnd: 4, revenue: 380, marketShare: 1, brand: 2 }, stakeholders: { customers: 2, competitors: -1 } }
]
