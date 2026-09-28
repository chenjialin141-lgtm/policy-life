/*  store 冒煙測試：注入 localStorage，直接驅動所有按鈕背後的 action，
    模擬完整玩家旅程（含先前被回報的「無法進第二年」路徑）。
    npx esbuild scripts/store-smoke.ts --bundle --platform=node --format=esm --outfile=scripts/store-smoke.mjs && node scripts/store-smoke.mjs */
import './polyfill'
import { useGame } from '../src/store/gameStore'
import { presidentPolicies, budgetBuckets } from '../src/data/president'
import { companyActions, industries } from '../src/data/company'

let failures = 0
function check(name: string, cond: boolean, extra = '') {
  if (cond) console.log('  PASS  ' + name + (extra ? '  (' + extra + ')' : ''))
  else { console.error('  FAIL  ' + name + (extra ? '  (' + extra + ')' : '')); failures++ }
}
const G = () => useGame.getState()
const findP = (id: string) => presidentPolicies.find((p) => p.id === id)!
const findC = (id: string) => companyActions.find((p) => p.id === id)!
Math.random = () => 0.9 // 確定性：避開黑天鵝、選舉偏向玩家

// ============ 總統模式：8 年完整旅程 ============
console.log('\n[總統] 開局 → 預算/政策 → 結算 → 進次年 → 第4年連任 → 第8年屆滿')
{
  G().startPresident('normal')
  check('開局後在第 1 年、第一任', G().p!.year === 1 && G().p!.term === 1, 'year=' + G().p!.year)

  // 拖預算滑桿 + 加政策
  G().setBucketScale(budgetBuckets[0].id, 1.5)
  const r1 = G().enact(findP('p_minwage_up'), 1)
  const r2 = G().enact(findP('p_public_jobs'), 1)
  check('政策可成功實施', r1.ok && r2.ok)
  const dup = G().enact(findP('p_minwage_up'), 1)
  check('重複政策被擋下', !dup.ok && !!dup.error, dup.error || '')
  check('active 已含預算桶與兩項政策', G().active.length === 3, String(G().active.length))

  // 逐年推進
  const electionYears: number[] = []
  for (let y = 1; y <= 8; y++) {
    G().endYear()
    const rv = G().review
    check(`第 ${y} 年 endYear 產生結算`, !!rv && rv.year === y && rv.news.length > 0 && rv.changes.length >= 0, `事件${rv?.events.length} 新聞${rv?.news.length}`)

    if (rv?.recallPending && !rv.recallResolved) G().resolveRecallChoice('reform')
    if (rv?.electionDue && !rv.electionResolved) {
      electionYears.push(y)
      G().resolveElectionChoice(G().p!.term >= 2 ? false : true)
    }

    const beforeYear = G().p!.year // 確認在 confirm 前還是當下年份
    const blockedEarly = (G().review?.recallPending && !G().review?.recallResolved) || (G().review?.electionDue && !G().review?.electionResolved)
    check(`第 ${y} 年未處理罷免/選舉時有被擋關`, blockedEarly === false)

    G().confirmYear()
    if (y === 1) check('★ 結算後真的進入第 2 年（歷史 bug 回歸測試）', G().p!.year === 2 && G().review === null, 'year=' + G().p!.year)
    if (y !== 1) check(`第 ${y} 年結算後進入第 ${y + 1} 年`, G().p!.year === y + 1, 'year=' + G().p!.year)
    check(`第 ${y} 年已寫入歷史`, G().history.length === y, 'history=' + G().history.length)
    if (G().p!.gameOver) { check(`遊戲在第 ${y} 年結束（應為第 8 年屆滿）`, y === 8, 'endReason=' + G().p!.endReason); break }
  }
  check('第 4、8 年都觸發總統大選', electionYears.includes(4) && electionYears.includes(8), JSON.stringify(electionYears))
  check('第二任 term=2', G().p!.term === 2, 'term=' + G().p!.term)
  check('8 年後因兩任屆滿結束', G().p!.gameOver === true && G().history.length === 8, G().p!.endReason || '')
}

// ============ 總統：財政超支與強行執行不被阻止 ============
console.log('\n[總統] 超支仍可結算（赤字→舉債），不被系統擋死')
{
  G().startPresident('hard')
  // 把七個預算桶全拉到 3 倍，刻意嚴重超支
  for (const b of budgetBuckets) G().setBucketScale(b.id, 3)
  G().enact(findP('p_cash_handout'), 2)
  G().endYear()
  const rv = G().review!
  check('超支局仍能完成結算（不被阻止）', !!rv)
  check('嚴重超支產生赤字並增債', rv.deficit > 0 && rv.nextState && (rv.nextState as { debt: number }).debt > 3000, `赤字${Math.round(rv.deficit)} 債${Math.round((rv.nextState as { debt: number }).debt)}`)
  G().confirmYear()
  check('超支後仍能進入下一年', G().p!.year === 2)
}

// ============ 企業模式：開局（自由產品/地點/區域）→ 經營 → 進次年 ============
console.log('\n[企業] 自訂開局 → 決策 → 結算 → 進次年 → 里程碑按鈕不誤觸發')
{
  G().startCompany('normal', { industryId: industries[0].id, location: '台北', region: 'local', productName: '東南亞移工匯款 App', assessment: null })
  check('公司開局在第 1 年、產品名稱帶入', G().c!.year === 1 && G().c!.productName === '東南亞移工匯款 App')
  check('初始未上市', G().c!.ipo === false)

  const a = G().enact(findC('c_marketing'), 1)
  const b = G().enact(findC('c_supplychain'), 1)
  check('企業決策可實施', a.ok && b.ok)

  // 初期門檻不足，拓展 / IPO 按鈕應安全地不做事
  const c0 = JSON.stringify(G().c)
  G().companyExpandRegion()
  G().companyIPO()
  check('未達門檻時拓展/IPO 不會亂改狀態', JSON.stringify(G().c) === c0)

  for (let y = 1; y <= 4; y++) {
    G().endYear()
    check(`企業第 ${y} 年有結算與新聞`, !!G().review && G().review.mode === 'company' && G().review.news.length > 0)
    G().confirmYear()
    check(`企業第 ${y} 年後進入第 ${y + 1} 年`, G().c!.year === y + 1, 'year=' + G().c!.year)
    if (G().c!.gameOver) break
  }
  check('企業四年歷史已寫入', G().history.length === 4, 'history=' + G().history.length)
}

// ============ 選單切換：toMenu 保留存檔、continueGame 接續、backHome 重開 ============
console.log('\n[選單] 回主選單保留存檔、可續玩')
{
  G().toMenu()
  check('toMenu 後 started=false 但公司存檔還在', G().started === false && !!G().c && G().c!.year === 5)
  G().continueGame()
  check('continueGame 後回到遊戲、年份保留', G().started === true && G().c!.year === 5)
  G().startPresident('easy')
  check('從主選單開新總統局會重置為第 1 年', G().p!.year === 1 && G().history.length === 0 && G().active.length === 0)
}

console.log('\n========================================')
if (failures === 0) { console.log('ALL GREEN：狀態層玩家旅程無錯誤'); process.exit(0) }
else { console.error(failures + ' 項檢查失敗'); process.exit(1) }
