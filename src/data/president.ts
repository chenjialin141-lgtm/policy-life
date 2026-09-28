import type { ActionDef, Difficulty, PState, Stakeholder } from '../types'

// 共和國 Nova 基準初始狀態（NORMAL），金額單位：億
export function initialPState(diff: Difficulty): PState {
  const base: PState = {
    year: 1,
    term: 1,
    population: 2300,
    gdp: 5000,
    growth: 2.5,
    inflation: 2.3,
    unemployment: 4.5,
    revenue: 1000,
    fixedSpending: 610, // 不含債務利息；利息每年動態加計
    discretionary: 300,
    allocated: 0,
    spending: 950,
    debt: 3000,
    interest: 90,
    interestRate: 3,
    defense: 60,
    education: 62,
    healthcare: 60,
    welfare: 58,
    housing: 50,
    energy: 65,
    trade: 0,
    inequality: 38,
    housingPrice: 100,
    approval: 55,
    socialTrust: 65,
    politicalStability: 70,
    adminCapacity: 75,
    politicalCapital: 60,
    govSupport: 58,
    opposition: 42,
    gameOver: false,
    reelected: false
  }
  if (diff === 'easy') {
    base.discretionary = 380; base.debt = 2200; base.interestRate = 2.6; base.interest = 57
    base.approval = 60; base.socialTrust = 70; base.politicalStability = 76
  } else if (diff === 'hard') {
    base.discretionary = 240; base.debt = 3800; base.interestRate = 3.6; base.interest = 137
    base.inflation = 3.4; base.unemployment = 5.6; base.approval = 48; base.opposition = 52
  } else if (diff === 'extreme') {
    base.discretionary = 170; base.debt = 4600; base.interestRate = 4.4; base.interest = 202
    base.inflation = 4.6; base.unemployment = 6.8; base.socialTrust = 55; base.politicalStability = 58
    base.approval = 42; base.opposition = 58; base.adminCapacity = 66
  }
  return base
}

// 預算分配桶（對應滑桿，皆為每年常態支出）
export const budgetBuckets: ActionDef[] = [
  { id: 'b_education', name: '教育預算', desc: '擴編教師、教學與高教資源，長期提升人力素質與生產力', category: '預算分配', cost: 0, recurring: 60, duration: 'permanent', tags: ['長期'], effects: { education: 5, growth: 0.15, adminCapacity: 1, approval: 1 }, stakeholders: { students: 2, youth: 1, middle: 1 } },
  { id: 'b_healthcare', name: '醫療預算', desc: '擴充醫療院所、長照與公共衛生量能', category: '預算分配', cost: 0, recurring: 55, duration: 'permanent', tags: ['長期'], effects: { healthcare: 5, socialTrust: 1.5, approval: 1 }, stakeholders: { elderly: 2, lowIncome: 2, middle: 1 } },
  { id: 'b_welfare', name: '社會福利', desc: '現金補助、弱勢扶助與生活津貼，縮小貧富差距', category: '預算分配', cost: 0, recurring: 50, duration: 'permanent', effects: { welfare: 5, inequality: -2.5, growth: 0.1, approval: 2 }, stakeholders: { lowIncome: 3, elderly: 2, labor: 1 } },
  { id: 'b_defense', name: '國防預算', desc: '提升國防裝備、人員與自主防衛能力', category: '預算分配', cost: 0, recurring: 70, duration: 'permanent', effects: { defense: 6, politicalStability: 1, trade: -0.1 }, stakeholders: { centralGov: 2, highIncome: 1 } },
  { id: 'b_housing', name: '社會住宅', desc: '興建社會住宅與租屋協助，壓抑房價、照顧租屋族', category: '預算分配', cost: 120, recurring: 30, duration: 'permanent', tags: ['土地', '多年'], required: { budget: 150, admin: 8, land: 3 }, effects: { housing: 6, housingPrice: -7, approval: 2.5, politicalCapital: -2 }, stakeholders: { renters: 3, youth: 2, landlords: -2, lowIncome: 2 } },
  { id: 'b_energy', name: '能源建設', desc: '能源基礎設施與補貼，穩定供電、抑制能源物價', category: '預算分配', cost: 60, recurring: 45, duration: 'permanent', tags: ['能源'], required: { budget: 105, energy: 2 }, effects: { energy: 6, inflation: -0.35, growth: 0.1 }, stakeholders: { business: 1, middle: 1 } },
  { id: 'b_infra', name: '公共建設', desc: '交通、水利與公共工程，創造就業並帶動投資', category: '預算分配', cost: 100, recurring: 10, duration: 'permanent', tags: ['多年'], required: { budget: 110, admin: 6 }, effects: { growth: 0.5, unemployment: -0.5, adminCapacity: 1 }, stakeholders: { labor: 2, business: 1, localGov: 2 } }
]

// 快速政策模板（稅收、監管、一次性、極端政策）
export const presidentPolicies: ActionDef[] = [
  { id: 'p_minwage_up', name: '提高基本工資', desc: '調高基本工資，增加勞工所得但提高企業成本', category: '勞動', cost: 0, recurring: 0, duration: 'permanent', effects: { unemployment: 0.7, inflation: 0.45, inequality: -2, growth: 0.1, approval: 1.5 }, stakeholders: { labor: 2, youth: 1, business: -2, lowIncome: 2 } },
  { id: 'p_labor_dereg', name: '鬆綁勞動法規', desc: '放寬工時與聘僱限制，提升企業彈性與投資意願', category: '勞動', cost: 0, recurring: 0, duration: 'permanent', effects: { unemployment: -0.6, growth: 0.2, inequality: 1.5, socialTrust: -1 }, stakeholders: { business: 2, labor: -2, youth: -1 } },
  { id: 'p_corptax_cut', name: '降低企業稅', desc: '調降營利事業所得稅，吸引投資、創造就業', category: '財政稅收', cost: 0, recurring: 0, duration: 'permanent', effects: { revenue: -70, growth: 0.35, unemployment: -0.4, inequality: 1 }, stakeholders: { business: 3, investors: 2, highIncome: 1 } },
  { id: 'p_corptax_zero', name: '取消企業所得稅', desc: '完全取消營所稅（極端）：大幅刺激投資但嚴重削減收入', category: '財政稅收', cost: 0, recurring: 0, duration: 'permanent', tags: ['極端'], effects: { revenue: -180, growth: 0.6, unemployment: -0.8, inequality: 4, approval: -2, politicalCapital: -3 }, stakeholders: { business: 3, investors: 3, lowIncome: -2, labor: -1 } },
  { id: 'p_corptax_up', name: '提高企業稅', desc: '調高營所稅增加庫收，但可能壓抑投資', category: '財政稅收', cost: 0, recurring: 0, duration: 'permanent', effects: { revenue: 70, growth: -0.25, unemployment: 0.3, approval: -1 }, stakeholders: { business: -3, investors: -2, lowIncome: 1 } },
  { id: 'p_incometax_up', name: '提高高所得稅', desc: '對高所得族群加稅，改善分配、增加收入', category: '財政稅收', cost: 0, recurring: 0, duration: 'permanent', effects: { revenue: 50, inequality: -2, growth: -0.05 }, stakeholders: { highIncome: -3, lowIncome: 2, middle: 1 } },
  { id: 'p_bonds', name: '發行政府公債', desc: '舉債 200 億支應建設與支出，明年起利息上升', category: '財政稅收', cost: 0, recurring: 0, duration: 'instant', tags: ['借款'], effects: { debtNow: 200, interestRate: 0.2, politicalCapital: -1 }, stakeholders: { investors: 1, centralGov: 1 } },
  { id: 'p_bonds_huge', name: '大量發行國債', desc: '一口氣舉債 600 億（極端），短期寬鬆但債務與利息暴增', category: '財政稅收', cost: 0, recurring: 0, duration: 'instant', tags: ['極端', '借款'], effects: { debtNow: 600, interestRate: 0.7, politicalStability: -2, politicalCapital: -4 }, stakeholders: { investors: -1, business: -1, centralGov: 1 } },
  { id: 'p_austerity', name: '凍結並刪減預算', desc: '撙節 60 億常態支出，改善財政但壓縮服務與民心', category: '財政稅收', cost: 0, recurring: -60, duration: 'permanent', tags: ['撙節'], effects: { welfare: -4, healthcare: -2, education: -2, approval: -3, socialTrust: -2, unemployment: 0.4 }, stakeholders: { lowIncome: -2, elderly: -2, labor: -1, business: 1, centralGov: -1 } },
  { id: 'p_rent_control', name: '實施房租管制', desc: '限制租金漲幅，立即減輕租屋負擔，但可能減少租屋供給', category: '住宅', cost: 0, recurring: 0, duration: 'permanent', effects: { housingPrice: -5, housing: -2, approval: 1.5 }, stakeholders: { renters: 3, youth: 2, landlords: -3, business: -1 } },
  { id: 'p_green', name: '大規模綠能轉型', desc: '重金投入再生能源，短期昂貴、長期壓低碳排與能源進口', category: '能源環境', cost: 150, recurring: 40, duration: 'permanent', tags: ['長期', '能源'], required: { budget: 190, admin: 6, energy: 3 }, effects: { energy: 8, inflation: -0.2, growth: 0.15, politicalCapital: -2 }, stakeholders: { youth: 2, students: 1, business: -1, landlords: 0 } },
  { id: 'p_subsidy_industry', name: '產業招商補貼', desc: '補貼重點產業進駐，帶動投資與就業', category: '產業', cost: 80, recurring: 0, duration: 'instant', required: { budget: 80 }, effects: { growth: 0.4, unemployment: -0.5, trade: 0.2 }, stakeholders: { business: 2, labor: 1, localGov: 1 } },
  { id: 'p_public_jobs', name: '擴大公共僱傭', desc: '政府增聘人力，降低失業但增加長期人事負擔', category: '勞動', cost: 0, recurring: 45, duration: 'permanent', effects: { unemployment: -0.8, adminCapacity: 2, approval: 1 }, required: { budget: 45 }, stakeholders: { labor: 2, students: 1, lowIncome: 1 } },
  { id: 'p_cash_handout', name: '全民普發現金', desc: '一次性發放消費券刺激景氣，立即見效但舉債壓力', category: '財政稅收', cost: 130, recurring: 0, duration: 'instant', tags: ['一次性'], required: { budget: 130 }, effects: { growth: 0.45, inflation: 0.4, approval: 4, inequality: -1 }, stakeholders: { lowIncome: 2, middle: 2, youth: 2, business: 1 } },
  { id: 'p_diplomacy', name: '強化經貿外交', desc: '簽署貿易協定、拓展出口市場', category: '外交', cost: 30, recurring: 0, duration: 'instant', required: { budget: 30, political: 5 }, effects: { trade: 0.6, growth: 0.3, politicalStability: 1 }, stakeholders: { business: 2, investors: 1, centralGov: 1 } }
]

export const allPresidentActions: ActionDef[] = [...budgetBuckets, ...presidentPolicies]
