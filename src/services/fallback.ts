import type { ActionDef, Effects, Mode } from '../types'
import { allPresidentActions } from '../data/president'
import { companyActions } from '../data/company'
import { uid, clamp } from '../engine/helpers'
import { normalizeStakeholderKey } from '../data/shared'

// 自由輸入政策的關鍵詞離線解析（AI 無法使用時的兜底）。ID 必須對齊 data 層模板。
const presidentKW: { id: string; words: string[] }[] = [
  { id: 'p_corptax_zero', words: ['取消企業稅', '取消營所稅', '廢除企業所得稅'] },
  { id: 'p_corptax_cut', words: ['降企業稅', '減稅', '降低企業稅', '營所稅調降', '企業所得稅調降'] },
  { id: 'p_corptax_up', words: ['提高企業稅', '營所稅調高', '提高公司稅'] },
  { id: 'p_incometax_up', words: ['富人稅', '高所得稅', '提高高所得', '財富重分配稅'] },
  { id: 'p_bonds_huge', words: ['大量舉債', '巨額舉債', '大舉發債', '大量發行國債', '大量發債', '600億'] },
  { id: 'p_bonds', words: ['國債', '公債', '舉債', '發債', '發行政府公債'] },
  { id: 'p_minwage_up', words: ['基本工資', '最低工資', '調薪', '時薪', '月薪調高'] },
  { id: 'p_labor_dereg', words: ['鬆綁勞動', '勞動法鬆綁', '放寬工時', '彈性工時'] },
  { id: 'p_public_jobs', words: ['公共僱傭', '擴大就業', '政府雇用', '公部門進用', '政府擴大進用'] },
  { id: 'p_cash_handout', words: ['發現金', '普發', '現金補貼', '消費券', '全民補貼', '全民發現金'] },
  { id: 'p_austerity', words: ['撙節', '刪預算', '緊縮', '精簡政府', '刪減支出', '凍結預算'] },
  { id: 'p_rent_control', words: ['租金管制', '房租管制', '限制租金', '租金凍漲'] },
  { id: 'b_housing', words: ['社會住宅', '社會宅', '合宜住宅', '國民住宅', '興建住宅', '租屋補貼', '包租代管'] },
  { id: 'p_green', words: ['再生能源', '離岸風電', '太陽能', '風電', '光電', '綠能', '減碳', '淨零'] },
  { id: 'b_energy', words: ['核能', '核電', '能源建設', '電網', '供電', '電力建設', '能源預算'] },
  { id: 'p_subsidy_industry', words: ['產業補貼', '招商', '產業進駐', '補貼產業', '產業招商'] },
  { id: 'p_diplomacy', words: ['自由貿易', '出口', '經貿', '關稅', '貿易協定', '海外市場', '經貿外交'] },
  { id: 'b_education', words: ['教育預算', '教育經費', '教育支出', '雙語', '教學', '教育'] },
  { id: 'b_defense', words: ['國防預算', '國防支出', '軍費', '潛艦', '戰機', '國防'] },
  { id: 'b_healthcare', words: ['醫療預算', '健保', '醫療支出', '長照', '醫療'] },
  { id: 'b_welfare', words: ['社福', '社會福利', '福利支出', '弱勢補助', '老年年金', '福利'] },
  { id: 'b_infra', words: ['基礎建設', '交通建設', '軌道', '公共建設', '都更', '都市更新', '水利', '港口'] }
]

const companyKW: { id: string; words: string[] }[] = [
  { id: 'c_new_product', words: ['新產品', '新產品線', '上市新產品', '開發新品'] },
  { id: 'c_marketing', words: ['行銷', '廣告', '投放', '推廣', '聲量', 'KOL', '業務推廣'] },
  { id: 'c_rnd', words: ['研發', '創新', '技術投資', '研究發展'] },
  { id: 'c_price_cut', words: ['降價', '促銷', '折扣', '補貼價格', '便宜一點'] },
  { id: 'c_price_up', words: ['漲價', '調高售價', '調漲', '提高單價'] },
  { id: 'c_hire', words: ['徵才', '招人', '擴編', '招募', '找人才', '大量招人'] },
  { id: 'c_layoff', words: ['裁員', '資遣', '縮編', '解雇'] },
  { id: 'c_raise_salary', words: ['員工加薪', '提高薪資', '調高薪資', '攬才加薪'] },
  { id: 'c_factory', words: ['擴廠', '開店', '門市', '新廠', '產線', '展店', '擴點'] },
  { id: 'c_fundraise', words: ['募資', '增資', '找投資人', '天使投資', 'A輪', '募一輪'] },
  { id: 'c_loan', words: ['貸款', '借款', '融資', '銀行借錢'] },
  { id: 'c_acquire', words: ['併購', '收購', '買下公司', '併購對手'] },
  { id: 'c_overseas', words: ['海外', '出海', '外銷', '國外市場', '跨境'] },
  { id: 'c_ai_transform', words: ['AI', '人工智慧', '自動化', '數位轉型', '機器人'] },
  { id: 'c_cert_brand', words: ['公關', '形象', '品牌經營', '議題操作', '認證', '品牌信任', '危機處理'] },
  { id: 'c_supplychain', words: ['供應鏈', '備援', '第二供應商', '庫存', '物流', '分散供應'] }
]

function num(text: string): number | null {
  const m = text.match(/[\d,]+(?:\.\d+)?/)
  if (!m) return null
  const n = parseFloat(m[0].replace(/,/g, ''))
  return Number.isNaN(n) ? null : n
}

function scaleFor(id: string, text: string): number {
  const n = num(text)
  if (/一倍|翻倍|加倍|兩倍|二倍/.test(text)) return 2
  if (/三倍/.test(text)) return 3
  if (/減半|一半|砍半/.test(text)) return 0.5
  if (id === 'p_minwage_up' && n && n > 20000) return clamp((n - 27470) / 2600, 0.5, 3)
  const wanHu = text.match(/([\d.]+)\s*萬戶/)
  if (wanHu) return clamp(parseFloat(wanHu[1]) / 20, 0.5, 4)
  const yi = text.match(/([\d,]+)\s*億/)
  if (yi) {
    const amount = parseFloat(yi[1].replace(/,/g, ''))
    const base =
      id === 'p_bonds_huge' ? 600 : id === 'p_bonds' ? 200 :
      id === 'b_housing' ? 150 : id === 'p_green' ? 190 :
      id === 'b_infra' ? 110 : id === 'b_energy' ? 105 : 90
    return clamp(amount / base, 0.3, 4)
  }
  const pct = text.match(/([\d.]+)\s*%/)
  if (pct && id.startsWith('b_')) return clamp(parseFloat(pct[1]) / 8, 0.3, 3)
  return 1
}

export function parsePolicyLocal(mode: Mode, text: string): { def: ActionDef; scale: number } | null {
  const table = mode === 'company' ? companyKW : presidentKW
  const pool = mode === 'company' ? companyActions : allPresidentActions
  let hitId: string | null = null
  for (const row of table) {
    if (row.words.some((w) => text.includes(w))) { hitId = row.id; break }
  }
  if (!hitId) return null
  const base = pool.find((a) => a.id === hitId)
  if (!base) return null
  const scale = scaleFor(hitId, text)
  const def: ActionDef = structuredClone(base)
  def.id = 'custom_' + uid()
  def.name = text.length > 14 ? text.slice(0, 14) + '…' : text
  def.tags = [...(def.tags || []), '自由輸入']
  return { def, scale }
}

const P_KEYS: (keyof Effects)[] = ['growth','inflation','unemployment','inequality','housingPrice','approval','socialTrust','politicalStability','adminCapacity','politicalCapital','govSupport','opposition','defense','education','healthcare','welfare','housing','energy','trade','revenue','debtNow']
const C_KEYS: (keyof Effects)[] = ['revenue','marketShare','brand','rnd','production','customers','investorConfidence','competitor','employees','cashNow','debtNow']

// 把 AI 回傳的 JSON 校正為合法 ActionDef，防止極端數值
export function sanitizeCustom(raw: any, mode: Mode): ActionDef | null {
  if (!raw || typeof raw.name !== 'string') return null
  const keys = mode === 'company' ? C_KEYS : P_KEYS
  const effects: Effects = {}
  if (raw.effects && typeof raw.effects === 'object') {
    for (const k of keys) {
      const v = Number(raw.effects[k])
      if (Number.isFinite(v) && v !== 0) {
        const cap = mode === 'company'
          ? (k === 'revenue' ? 3000 : (k === 'employees' ? 200 : (k === 'cashNow' || k === 'debtNow' ? 6000 : 15)))
          : (k === 'debtNow' ? 2000 : (k === 'revenue' ? 400 : 12))
        effects[k] = clamp(v, -cap, cap)
      }
    }
  }
  const costCap = mode === 'company' ? 8000 : 2000
  const recCap = mode === 'company' ? 2000 : 1200
  const stakeholders: Record<string, number> = {}
  if (raw.stakeholders && typeof raw.stakeholders === 'object') {
    for (const [k0, v] of Object.entries(raw.stakeholders)) {
      const n = Number(v)
      if (!Number.isFinite(n)) continue
      const k = normalizeStakeholderKey(k0, mode)
      const val = clamp(n, -3, 3)
      // 同義群體被正規化到同一 id 時，保留強度較大的態度，避免互相抵消
      if (!(k in stakeholders) || Math.abs(val) > Math.abs(stakeholders[k])) stakeholders[k] = val
    }
  }
  return {
    id: 'custom_' + uid(),
    name: String(raw.name).slice(0, 16),
    desc: String(raw.reasoning || raw.risks || '玩家自訂決策').slice(0, 80),
    category: String(raw.category || '自訂'),
    cost: clamp(Number(raw.cost) || 0, 0, costCap),
    recurring: clamp(Number(raw.recurring) || 0, -recCap, recCap),
    duration: raw.duration === 'instant' ? 'instant' : 'permanent',
    tags: ['自由輸入', 'AI 解析'],
    effects,
    required: raw.required && typeof raw.required === 'object' ? raw.required : {},
    stakeholders
  }
}
