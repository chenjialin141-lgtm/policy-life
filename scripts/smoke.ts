/*  Policy Life 冒煙測試：不透過 UI，直接驅動遊戲引擎驗證核心迴圈。
    以 esbuild 打包後用 node 執行：npx esbuild scripts/smoke.ts --bundle --platform=node --format=esm --outfile=scripts/smoke.mjs && node scripts/smoke.mjs */
import { initialPState, allPresidentActions, presidentPolicies } from '../src/data/president'
import { initialCState, industries, companyActions } from '../src/data/company'
import { computePresidentTurn, resolveElection, resolveRecall } from '../src/engine/president'
import { computeCompanyTurn, canIPO, doIPO, canExpandRegion, expandRegion } from '../src/engine/company'
import { presidentFeasibility, companyFeasibility, findConflicts } from '../src/engine/policy'
import { evalPresident, evalCompany } from '../src/engine/achievements'
import type { ActiveAction, ActionDef } from '../src/types'

let failures = 0
function check(name: string, cond: boolean, extra = '') {
  if (cond) console.log('  PASS  ' + name + (extra ? '  (' + extra + ')' : ''))
  else { console.error('  FAIL  ' + name + (extra ? '  (' + extra + ')' : '')); failures++ }
}
function toActive(def: ActionDef, scale: number, year: number): ActiveAction {
  return {
    id: def.id, name: def.name, desc: def.desc, category: def.category,
    cost: def.cost, recurring: def.recurring, duration: def.duration,
    effects: def.effects, stakeholders: def.stakeholders || {},
    scale, yearEnacted: year, tags: def.tags
  }
}
const rng = () => 0.9 // 避開黑天鵝、讓選舉偏向玩家
const findP = (id: string) => presidentPolicies.find((p) => p.id === id)!
const findC = (id: string) => companyActions.find((p) => p.id === id)!

// ---------- H. 政策效果鍵完整性（抓拼錯、永遠不會生效的鍵） ----------
console.log('\n[H] 政策效果鍵是否都對得到引擎數值欄位')
{
  const special = new Set(['revenue', 'debtNow', 'cashNow'])
  const p0: Record<string, unknown> = initialPState('normal') as unknown as Record<string, unknown>
  const c0: Record<string, unknown> = initialCState(industries[0], 'normal') as unknown as Record<string, unknown>
  const pBad: string[] = []
  for (const d of allPresidentActions) for (const k of Object.keys(d.effects)) {
    if (special.has(k)) continue
    if (typeof p0[k] !== 'number') pBad.push(d.id + '.' + k)
  }
  const cBad: string[] = []
  for (const d of companyActions) for (const k of Object.keys(d.effects)) {
    if (special.has(k)) continue
    if (typeof c0[k] !== 'number') cBad.push(d.id + '.' + k)
  }
  check('總統政策無無效鍵', pBad.length === 0, pBad.join(', ') || '全部對得到欄位')
  check('企業決策無無效鍵', cBad.length === 0, cBad.join(', ') || '全部對得到欄位')
}

// ---------- C. 可行性與政策衝突 ----------
console.log('\n[C] 可行性檢查與政策衝突')
{
  const s = initialPState('normal')
  const cut = findP('p_corptax_cut')
  const f = presidentFeasibility(cut, 1, s, [], 0)
  check('總統可行性回傳完整結構', ['green', 'yellow', 'red', 'conflict'].includes(f.level) && Array.isArray(f.issues) && typeof f.firstYearCost === 'number', 'level=' + f.level)
  const up = findP('p_corptax_up')
  const conf = findConflicts(up, [toActive(cut, 1, 1)])
  check('降低與提高企業稅互相判定為衝突', conf.length > 0, conf.join('/'))
  const c = initialCState(industries[0], 'normal'); c.productName = 'x'; c.headquarters = '台北'
  const cf = companyFeasibility(findC('c_acquire'), 1, c, [])
  check('企業可行性回傳完整結構', ['green', 'yellow', 'red', 'conflict'].includes(cf.level), 'level=' + cf.level + ' gap=' + cf.gap)
}

// ---------- A. 總統八年、跨第 4 年大選連任 ----------
console.log('\n[A] 總統正常局：年份逐年推進、第 4 年大選、連任進第二任')
{
  let s = initialPState('normal')
  let usedSwan: string[] = [], streak = 0, lastRecall = -9
  const active: ActiveAction[] = [toActive(findP('p_public_jobs'), 1, 1), toActive(findP('p_green'), 1, 2)]
  const rows: { y: number; deficit: number; debt: number; elect: boolean; recall: boolean; ev: number }[] = []
  let broke = false
  for (let y = 1; y <= 8; y++) {
    const pt = computePresidentTurn(s, active, 'normal', usedSwan, streak, lastRecall, rng)
    rows.push({ y, deficit: Math.round(pt.deficit), debt: Math.round(pt.state.debt), elect: pt.electionDue, recall: pt.recallPending, ev: pt.events.length })
    usedSwan = pt.usedSwan; streak = pt.growthStreak
    s = pt.state
    if (pt.electionDue) {
      if (s.term >= 2) {
        s.gameOver = true // 模擬 store：兩任任期屆滿，強制卸任
      } else {
        s.approval = Math.max(s.approval, 72) // 模擬執政有成、高民意，確保走連任成功分支
        const er = resolveElection(s, s.term, true, rng)
        check(`第 ${y} 年大選產生票數`, typeof er.playerVotes === 'number' && er.playerVotes > 0, `${er.playerVotes}% vs ${er.rivalVotes}%`)
        if (er.won) s.term = s.term + 1
        else { s.gameOver = true }
      }
    }
    if (pt.recallPending) { const rr = resolveRecall(s, 'concession', rng); check('罷免應對回存活機率', rr.surviveChance >= 0 && rr.surviveChance <= 100, rr.surviveChance.toFixed(0) + '%') }
    s.year = y + 1 // 模擬 store.confirmYear 的年份推進
    if (s.gameOver) { broke = true; break }
  }
  console.log('    年度:', rows.map((r) => `Y${r.y}(赤字${r.deficit}/債${r.debt}${r.elect ? '/大選' : ''}${r.recall ? '/罷免' : ''})`).join(' '))
  check('每年都完成結算（共 8 年）', rows.length === 8, '實際 ' + rows.length + ' 年')
  check('年份有逐年 +1（無跳號）', s.year === 9, '結束時 year=' + s.year)
  check('第 4 年觸發總統大選', rows.some((r) => r.y === 4 && r.elect))
  check('第 4 年連任成功進入第二任', s.term === 2, 'term=' + s.term)
  check('第 8 年兩任屆滿、遊戲正常結束', broke === true, 'term=' + s.term + ' 結束年=' + (s.year - 1))
}

// ---------- B. 亂花錢 → 赤字 → 債務惡化的因果 ----------
console.log('\n[B] 財政紀律因果：高福利 + 現金發放使債務逐年攀升')
{
  let s = initialPState('normal')
  let usedSwan: string[] = [], streak = 0, lastRecall = -9
  const startDebt = s.debt
  const active: ActiveAction[] = [
    toActive({ ...findP('p_cash_handout') }, 2.5, 1),
    toActive(allPresidentActions.find((b) => b.id === 'b_welfare')!, 3, 1),
    toActive(allPresidentActions.find((b) => b.id === 'b_healthcare')!, 2.5, 1)
  ]
  let hitCrisis = false
  for (let y = 1; y <= 10; y++) {
    const pt = computePresidentTurn(s, active, 'normal', usedSwan, streak, lastRecall, rng)
    usedSwan = pt.usedSwan; streak = pt.growthStreak
    s = pt.state
    if (s.gameOver) hitCrisis = true
    s.year = y + 1
    if (s.gameOver) break
  }
  check('長期超支使政府債務明顯上升', s.debt > startDebt + 200, `債務 ${Math.round(startDebt)} → ${Math.round(s.debt)}`)
  console.log('    十年後債務佔 GDP:', (s.debt / s.gdp).toFixed(2), hitCrisis ? '（已觸發財政/政治危機）' : '')
}

// ---------- D. 企業正常經營六年 ----------
console.log('\n[D] 企業正常局：年份推進、營收運轉、無例外')
{
  let c = initialCState(industries[0], 'normal'); c.productName = 'AI 測試產品'; c.headquarters = '台北'
  const active: ActiveAction[] = [toActive(findC('c_marketing'), 1, 1), toActive(findC('c_supplychain'), 1, 1), toActive(findC('c_rnd'), 1, 2)]
  let used: string[] = []
  let years = 0
  for (let y = 1; y <= 6; y++) {
    const ct = computeCompanyTurn(c, active, 'normal', used, rng)
    used = ct.usedSwan; c = ct.state; years++; c.year = y + 1
    if (c.gameOver) break
  }
  check('企業完成 6 年結算', years === 6, '實際 ' + years + ' 年')
  check('年份推進正確', c.year === 7, 'year=' + c.year)
  check('營收為正數', c.revenue > 0, '營收 ' + Math.round(c.revenue) + ' 萬')
}

// ---------- E. 現金不足硬擴張 → 橋接貸款 / 破產 ----------
console.log('\n[E] 企業資源不足仍強行執行：必須有真實後果')
{
  let c = initialCState(industries[1], 'extreme'); c.productName = '測試餐飲'; c.headquarters = '台北'
  const cash0 = c.cash
  const active: ActiveAction[] = [toActive(findC('c_acquire'), 1, 1), toActive(findC('c_factory'), 2, 1)]
  let used: string[] = []
  const ct = computeCompanyTurn(c, active, 'extreme', used, rng)
  c = ct.state
  const handled = c.gameOver ? !!c.endReason : c.debt > 0
  check('現金斷裂有被處理（橋接貸款增債或破產收場）', handled, c.gameOver ? '破產：' + c.endReason : `自動舉債 ${Math.round(c.debt)} 萬、現金 ${Math.round(c.cash)}`)
  check('破產時一定有 endReason', !c.gameOver || typeof c.endReason === 'string')
  console.log('    初始現金', cash0, '→ 年後現金', Math.round(ct.state.cash), '負債', Math.round(ct.state.debt), '現金月數', ct.monthsCash.toFixed(1))
}

// ---------- F. IPO ----------
console.log('\n[F] 企業 IPO 門檻與掛牌效果')
{
  const c = initialCState(industries[0], 'normal'); c.productName = 'x'; c.headquarters = '台北'
  check('未達門檻時不能 IPO', canIPO(c) === false)
  Object.assign(c, { revenue: 4000, profit: 300, cash: 3000, investorConfidence: 70, marketShare: 12 })
  check('達標後開放 IPO', canIPO(c) === true)
  const cashBefore = c.cash
  doIPO(c)
  check('IPO 後狀態正確（ip o、募資、股價）', c.ipo === true && c.cash >= cashBefore + 7000 && typeof c.stockPrice === 'number', `現金 +${c.cash - cashBefore}、股價 ${c.stockPrice}`)
}

// ---------- G. 區域拓展 ----------
console.log('\n[G] 企業業務區域拓展')
{
  const c = initialCState(industries[0], 'normal'); c.productName = 'x'; c.headquarters = '台北'
  c.cash = 6000; c.brand = 80
  check('達標可拓展', canExpandRegion(c) === true && c.region === 'local')
  expandRegion(c)
  check('拓展後進入全國市場並扣除費用', c.region === 'national' && Math.round(c.cash) === 5200, 'region=' + c.region + ' cash=' + Math.round(c.cash))
}

// ---------- I. 成就評估不崩潰 ----------
console.log('\n[I] 成就引擎')
{
  const ps = initialPState('normal'); ps.year = 2
  const pa = evalPresident({ s: ps, balance: 0, term: 1, growthStreak: 0, year: 2, recallSurvived: false, hadSwan: false, startDebt: 3000 }, [])
  check('總統成就回傳 id 陣列', Array.isArray(pa))
  const cs = initialCState(industries[0], 'normal'); cs.productName = 'x'; cs.headquarters = '台北'; cs.year = 2
  const ca = evalCompany({ s: cs, profitStreak: 1, hadSwan: false, shareCap: 8 }, [])
  check('企業成就回傳 id 陣列', Array.isArray(ca))
}

console.log('\n========================================')
if (failures === 0) { console.log('ALL GREEN：核心迴圈無錯誤'); process.exit(0) }
else { console.error(failures + ' 項檢查失敗'); process.exit(1) }
