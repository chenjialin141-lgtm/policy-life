import type { ActiveAction, CState, NewsItem, PState, RiskItem, StakeholderReaction } from '../types'
import { stakeholderNames, groupName } from '../data/shared'
import type { CompanyTurnResult } from './company'
import type { PresidentTurnResult } from './president'

// ---------- 利害關係人反應 ----------
const pComments: Record<string, { pos: string; neg: string }> = {
  youth: { pos: '年輕人認為政策帶來機會，社群聲量轉為正面。', neg: '青年團體批評政策忽視低薪與高房價，揚言串連抗議。' },
  labor: { pos: '勞工團體肯定政策對就業與薪資的保障。', neg: '工會抨擊政策壓縮勞動權益，不排除發動罷工。' },
  business: { pos: '工商界歡迎政策改善投資環境，表態加碼投資。', neg: '企業協會警告成本上升，考慮縮減投資或外移。' },
  students: { pos: '學生族群感受到教育資源增加，反應正面。', neg: '學生團體認為教育承諾跳票，發起連署。' },
  elderly: { pos: '長者與退休族群肯定福利與照顧政策。', neg: '高齡族群擔心退休金與醫療縮水，出現焦慮聲浪。' },
  landlords: { pos: '房東團體歡迎管制鬆綁，認為租賃市場更有彈性。', neg: '房東團體強烈反對租金管制，醞釀法律行動。' },
  renters: { pos: '租屋族對居住政策寄予厚望，給予肯定。', neg: '租屋族認為政策緩不濟急，持續串連居住正義遊行。' },
  middle: { pos: '中產階級感受到物價與就業穩定，支持度回升。', neg: '中產階級抱怨稅負與房價壓力，悶經濟感加深。' },
  lowIncome: { pos: '弱勢族群受惠於福利與補貼，處境獲得改善。', neg: '弱勢團體指出補助不足、門檻過高，照顧出現缺口。' },
  highIncome: { pos: '高所得與投資人對減稅與開放政策反應正面。', neg: '高所得族群對加稅與財富重分配表達不滿。' },
  localGov: { pos: '地方政府認為配套到位、樂意配合執行。', neg: '地方政府反映經費與人力不足，抵制中央政策。' },
  centralGov: { pos: '行政團隊士氣提升，國會黨團動員順暢。', neg: '國會在野黨團嚴加批評，法案審查面臨卡關。' }
}
const cNames: Record<string, string> = {
  employees: '員工', customers: '客戶', investors: '投資人', competitors: '競爭者',
  suppliers: '供應商', banks: '銀行', partners: '合作夥伴', regulators: '主管機關', public: '社會大眾'
}
const cComments: Record<string, { pos: string; neg: string }> = {
  employees: { pos: '員工對公司前景有信心，團隊士氣高昂。', neg: '員工人心浮動，求職與離職討論增加。' },
  customers: { pos: '客戶滿意度提升，回購與推薦增加。', neg: '客戶抱怨增多，負評與退訂聲量上升。' },
  investors: { pos: '投資人看好營運，願意加碼注資。', neg: '投資人對財務與成長性轉趨保守，觀望氣氛濃。' },
  competitors: { pos: '競爭者轉為守勢，產業話語權轉向貴公司。', neg: '競爭者趁機搶單並發動攻勢，壓力升高。' },
  suppliers: { pos: '供應商看好合作、給予更優惠條件。', neg: '供應商擔心付款能力，要求縮短帳期。' },
  banks: { pos: '銀行給予優惠利率與額度，願意擴大往來。', neg: '銀行緊縮授信、要求提早還款，資金調度壓力升高。' },
  partners: { pos: '合作夥伴主動尋求更深的結盟。', neg: '合作夥伴態度觀望，部分暫緩共同計畫。' },
  regulators: { pos: '主管機關對合規與治理給予正面評價。', neg: '主管機關關注相關爭議，啟動查核或約談。' },
  public: { pos: '社會大眾對品牌形象給予肯定。', neg: '輿論出現負面觀感，品牌形象受損。' }
}

function buildReactions(
  active: ActiveAction[], names: Record<string, string>,
  comments: Record<string, { pos: string; neg: string }>
): StakeholderReaction[] {
  const score: Record<string, number> = {}
  for (const a of active) {
    if (a.scale <= 0) continue
    for (const [id, v] of Object.entries(a.stakeholders || {})) {
      score[id] = (score[id] || 0) + v * a.scale
    }
  }
  return Object.entries(score).map(([id, sc]) => {
    const tone: 'positive' | 'negative' | 'neutral' = sc >= 1.5 ? 'positive' : sc <= -1.5 ? 'negative' : 'neutral'
    const tpl = comments[id]
    const comment = tone === 'positive' ? (tpl?.pos || '態度轉為支持。')
      : tone === 'negative' ? (tpl?.neg || '表達疑慮與反彈。')
        : '態度觀望，視後續執行成效決定立場。'
    return { id, name: names[id] || groupName(id), tone, comment, score: Math.round(sc * 10) / 10 }
  }).sort((a, b) => b.score - a.score)
}

export const presidentReactions = (active: ActiveAction[]) =>
  buildReactions(active, stakeholderNames, pComments)
export const companyReactions = (active: ActiveAction[]) =>
  buildReactions(active, cNames, cComments)

// ---------- 總統新聞 ----------
export function presidentNews(s: PState, t: PresidentTurnResult, active: ActiveAction[]): NewsItem[] {
  const main = active.filter((a) => a.scale > 0).slice().sort((a, b) => b.cost - a.cost)[0]
  const news: NewsItem[] = []
  news.push({
    category: '頭條',
    headline: main ? `政府推動「${main.name}」` : '政府維持現行政策、按步調施政',
    detail: main
      ? `行政團隊今年正式啟動「${main.name}」，${main.desc}官方預估將牽動財政與相關產業，政策紅利與代價預期在未來數年逐步兌現，各方關注執行落地的狀況。`
      : '本年度沒有推出重大新政策，行政團隊將資源集中在落實既有措施與維持日常運作，在野黨批評政府缺乏突破性作為，執政團隊則強調穩健優先。'
  })
  news.push({
    category: '經濟',
    headline: `經濟成長 ${s.growth.toFixed(1)}%、通膨 ${s.inflation.toFixed(1)}%、失業 ${s.unemployment.toFixed(1)}%`,
    detail: t.deficit > 80
      ? `主計單位指出，今年財政赤字約 ${Math.round(t.deficit)} 億、政府債務佔 GDP 約 ${(t.debtRatio * 100).toFixed(0)}%，雖然就業維持在 ${s.unemployment.toFixed(1)}%，但舉債空間與利息負擔已成為財經圈關注焦點。`
      : `總體數據落在可控區間，GDP 成長 ${s.growth.toFixed(1)}%、消費者物價年增 ${s.inflation.toFixed(1)}%、失業率 ${s.unemployment.toFixed(1)}%，財政收支尚屬平衡，分析師認為當前要務是把動能轉化為實質薪資與投資。`
  })
  news.push({
    category: '社會',
    headline: s.housingPrice >= 130 ? '高房價持續發酵，居住議題升溫' : s.inequality >= 55 ? '貧富差距成為社會焦點' : '社會氣氛大致平穩',
    detail: s.housingPrice >= 130
      ? `都會區房價指數來到 ${s.housingPrice.toFixed(0)}，租金同步走高，青年與租屋族「買不起、租得苦」的聲量在網路與街頭同步升高；目前民意支持 ${s.approval.toFixed(0)}、社會信任 ${s.socialTrust.toFixed(0)}，居住政策被視為觀察重點。`
      : `目前民意支持 ${s.approval.toFixed(0)}、社會信任 ${s.socialTrust.toFixed(0)}，民眾對生活現況的滿意度大致穩定，不過弱勢照顧與長期低薪仍是潛在壓力，社福團體持續呼籲政府預先布局。`
  })
  news.push({
    category: '政治',
    headline: t.electionDue ? '總統大選登場，朝野進入決戰時刻' : s.opposition > 60 ? '在野陣營聲勢上揚、監督力道增強' : '政局大致穩定',
    detail: t.electionDue
      ? `四年任期屆滿，總統大選正式登場。執政黨目前支持 ${s.govSupport.toFixed(0)}、在野陣營 ${s.opposition.toFixed(0)}，選戰主軸圍繞經濟表現、房價與政策兌現度，選情被視為對執政成績的公民投票。`
      : `立法院這個會期圍繞預算與政策攻防，執政黨支持 ${s.govSupport.toFixed(0)}、反對黨陣營 ${s.opposition.toFixed(0)}，${s.opposition > 60 ? '在野黨強化質詢與議事杯葛，法案推進速度放緩' : '多數法案尚能在協商後過關，政局維持穩定'}。`
  })
  const swan = t.events.find((e) => e.blackSwan)
  news.push({
    category: '國際',
    headline: swan ? swan.title.replace(/^黑天鵝：?/, '') : '國際情勢大致平靜、供應鏈穩定',
    detail: swan
      ? (swan.detail || '這起突發事件透過貿易、能源與金融管道傳導到國內，政府已召開跨部會會議評估衝擊，並承諾啟動穩定措施，市場關注後續是否進一步升溫。')
      : `今年國際經貿與地緣情勢大致平靜，能源進口與出口訂單維持穩定，外交部持續推動雙邊經貿合作；分析師提醒，全球利率與區域緊張仍可能在未來數年形成外部變數。`
  })
  return news
}

// ---------- 企業新聞 ----------
export function companyNews(s: CState, t: CompanyTurnResult, active: ActiveAction[]): NewsItem[] {
  const main = active.filter((a) => a.scale > 0).slice().sort((a, b) => b.cost - a.cost)[0]
  const news: NewsItem[] = []
  news.push({
    category: '頭條',
    headline: s.milestone ? s.milestone : main ? `公司推動「${main.name}」` : '公司穩健經營、維持既有步調',
    detail: s.milestone
      ? `今年公司寫下新里程碑：${s.milestone}。團隊將其視為營運邁向新階段的訊號，內部士氣受到鼓舞，投資人與合作夥伴也密切關注後續能否把氣勢轉化為持續的營收與市占。`
      : main
        ? `管理層今年重點推動「${main.name}」，${main.desc}這項布局的成效需要時間發酵，短期將反映在成本與品牌面，能否帶來長期回報，取決於後續的執行與市場接受度。`
        : '今年公司沒有激進的大動作，選擇把資源用在維持產品品質與服務既有客戶，營運步調審慎；在快速變化的產業中，這種「穩」是蓄積實力還是錯失機會，考驗經營團隊的判斷。'
  })
  news.push({
    category: '財務',
    headline: `年度營收 ${Math.round(s.revenue).toLocaleString('zh-TW')} 萬、${t.profit >= 0 ? '獲利' : '虧損'} ${Math.abs(Math.round(t.profit)).toLocaleString('zh-TW')} 萬`,
    detail: t.profit >= 0
      ? `財報顯示全年營收約 ${Math.round(s.revenue).toLocaleString('zh-TW')} 萬、稅後損益為正，目前現金水位約可支應 ${t.monthsCash.toFixed(1)} 個月營運，公司具備自我造血能力，管理層開始思考再投資與擴張的節奏。`
      : `全年營收約 ${Math.round(s.revenue).toLocaleString('zh-TW')} 萬，但在投入與固定成本下虧損約 ${Math.abs(Math.round(t.profit)).toLocaleString('zh-TW')} 萬；現金尚可支應 ${t.monthsCash.toFixed(1)} 個月，${t.monthsCash < 8 ? '投資人提醒應儘速拉高營收或控制燒錢速度' : '短期內仍有緩衝爭取成長時間'}。`
  })
  news.push({
    category: '市場',
    headline: `市占 ${s.marketShare.toFixed(1)}%、品牌力 ${s.brand.toFixed(0)}`,
    detail: s.competitor >= 70
      ? `在競爭者強勢進逼下，公司目前取得 ${s.marketShare.toFixed(1)}% 市占、品牌力指標 ${s.brand.toFixed(0)}，價格戰與通路搶奪讓取得新客的成本升高，市場團隊正面臨「顧成長或顧毛利」的兩難。`
      : `公司在目標市場站穩 ${s.marketShare.toFixed(1)}% 份額、品牌力來到 ${s.brand.toFixed(0)}，客戶口碑與回購逐步累積；經營層認為持續強化差異化，才有機會在版圖中搶下更大位置。`
  })
  news.push({
    category: '產業',
    headline: s.rnd >= 60 ? '研發能量領先同業，新產品值得期待' : s.competitor >= 70 ? '產業競爭白熱化、洗牌加劇' : '產業景氣大致穩定',
    detail: s.rnd >= 60
      ? `公司研發量能指標達 ${s.rnd.toFixed(0)}、產能／營運 ${s.production.toFixed(0)}，多項新產品與技術進入收尾階段，被視為未來一年的成長引擎；不過高研發也意味著持續的人才與資金投入。`
      : `產業今年景氣大致穩定，公司研發量能 ${s.rnd.toFixed(0)}、產能／營運 ${s.production.toFixed(0)}，分析師建議留意技術典範轉移與新進入者，避免在平靜期錯失布局下一代產品的時間窗。`
  })
  const swan = t.events.find((e) => e.blackSwan)
  news.push({
    category: '總體',
    headline: swan ? swan.title.replace(/^黑天鵝：?/, '') : `團隊維持 ${s.employees} 人、營運節奏穩定`,
    detail: swan
      ? (swan.detail || '這起產業或總體突發事件直接影響需求、供應鏈或資金面，公司已啟動應變小組檢視現金、訂單與合約，並評估是否調整今年的擴張與徵才計畫。')
      : `目前團隊約 ${s.employees} 人，員工平均月薪約 ${(s.salary / 12).toFixed(1)} 萬，人才結構與營運節奏維持穩定；人力部門持續關鍵職缺招募，產能與服務量能配合業務成長逐步調整。`
  })
  return news
}

// ---------- 風險預測（下一年） ----------
export function presidentRisks(s: PState, t: PresidentTurnResult): RiskItem[] {
  const r: RiskItem[] = []
  if (t.debtRatio > 1.1 || t.deficit > 100) r.push({ level: 'high', text: '若財政政策維持不變，赤字與利息支出可能進一步擴大，存在債信惡化風險。' })
  else if (t.debtRatio > 0.8 || t.deficit > 50) r.push({ level: 'medium', text: '財政空間縮減，明年新增支出的餘裕可能下降。' })
  if (s.inflation >= 4.5) r.push({ level: 'high', text: '物價壓力可能延續，民眾實質所得與民意支持存在下滑風險。' })
  else if (s.inflation >= 3.2) r.push({ level: 'medium', text: '通膨略高於目標，須留意是否進一步升溫。' })
  if (s.unemployment >= 6.5) r.push({ level: 'medium', text: '就業市場若未改善，勞工抗議與社會信任下降的機率升高。' })
  if (s.housingPrice >= 125) r.push({ level: 'medium', text: '高房價議題可能持續發酵，青年與租屋族反應值得關注。' })
  if (s.energy < 48) r.push({ level: 'medium', text: '能源供給餘裕偏緊，存在限電與產業衝擊風險。' })
  if (s.approval < 35 && s.opposition > 58) r.push({ level: 'high', text: '民意低迷加上在野聲勢升高，罷免或政治動員的風險提高。' })
  if (t.electionDue) r.push({ level: 'medium', text: '明年（或本年度）將舉行總統大選，經濟感受與政策成果將直接影響選情。' })
  if (s.growth >= 4) r.push({ level: 'opportunity', text: '經濟動能強勁，若延續當前政策，投資與就業有望進一步回升。' })
  if (!r.length) r.push({ level: 'low', text: '目前各項指標大致平穩，下一年度未見明顯系統性風險，但仍須留意突發事件。' })
  return r
}

export function companyRisks(s: CState, t: CompanyTurnResult): RiskItem[] {
  const r: RiskItem[] = []
  if (t.monthsCash < 4) r.push({ level: 'high', text: '現金水位偏低，若營收未改善，明年可能出現發不出薪水的流動性風險。' })
  else if (t.monthsCash < 8) r.push({ level: 'medium', text: '現金緩衝不算寬裕，重大支出宜分批、保留週轉空間。' })
  if (s.debt > 2 * Math.max(s.revenue, 1)) r.push({ level: 'high', text: '負債相對營收偏高，利息與償債壓力可能壓縮獲利。' })
  if (s.competitor >= 72) r.push({ level: 'medium', text: '競爭者來勢洶洶，明年可能面臨價格戰或客戶流失。' })
  if (s.marketShare < 2) r.push({ level: 'medium', text: '市占偏低，若無法打開知名度，存在被邊緣化的風險。' })
  if (s.production < 30 && s.marketShare > 8) r.push({ level: 'medium', text: '產能可能追不上需求，訂單積壓會傷害口碑。' })
  if (s.rnd < 35) r.push({ level: 'low', text: '研發投入偏低，遇到技術變革時可能被對手彎道超車。' })
  if (s.brand >= 65 && s.rnd >= 55) r.push({ level: 'opportunity', text: '品牌與研發體質良好，明年有機會推出爆款或進一步搶占市占。' })
  if (!r.length) r.push({ level: 'low', text: '營運體質大致穩定，下一年度未見明顯立即風險。' })
  return r
}
