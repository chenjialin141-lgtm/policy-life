// Policy Life — AI 統一端點（Vercel Edge Function）
// 依 body.task 分流：parsePolicy（自由輸入政策解析）／narrative（年度敘事潤飾）
// ／advisor（AI 顧問）／report（結束報告）。企業市場聯網評估見 api/market.js。
// 環境變數：LLM_API_KEY（Groq 免費）。模型固定 qwen/qwen3.8-27b。
// 鐵律：AI 只產生敘事與「建議數值」，核心數值由前端 Game Engine 確定性計算。

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...CORS } });
}
const MODEL = 'qwen/qwen3.8-27b';

async function groq(sys, user, maxTokens, temperature) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.LLM_API_KEY },
    body: JSON.stringify({
      model: MODEL, temperature: temperature ?? 0.6, max_tokens: maxTokens,
      messages: [{ role: 'system', content: sys }, { role: 'user', content: user }]
    })
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error('LLM ' + res.status + ' ' + text.slice(0, 200));
    err.status = res.status;
    err.retryAfter = res.headers.get('retry-after');
    throw err;
  }
  const data = await res.json();
  return (data?.choices?.[0]?.message?.content || '').trim();
}

function extractJSON(text) {
  if (!text) return null;
  try { return JSON.parse(text.trim()); } catch (_) {}
  const m1 = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (m1) { try { return JSON.parse(m1[1].trim()); } catch (_) {} }
  let depth = 0, start = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') { if (depth === 0) start = i; depth++; }
    else if (text[i] === '}') { depth--; if (depth === 0 && start >= 0) { try { return JSON.parse(text.slice(start, i + 1)); } catch (_) {} } }
  }
  return null;
}

const P_KEYS = ['growth','inflation','unemployment','inequality','housingPrice','approval','socialTrust','politicalStability','adminCapacity','politicalCapital','govSupport','opposition','defense','education','healthcare','welfare','housing','energy','trade','revenue','debtNow'];
const C_KEYS = ['revenue','marketShare','brand','rnd','production','customers','investorConfidence','competitor','employees','cashNow','debtNow'];

const TASKS = {
  parsePolicy(sys, b) {
    const keys = b.mode === 'company' ? C_KEYS : P_KEYS;
    sys.push('你是政策與經營決策模擬的數值設計師。把玩家的自然語言決策轉成結構化 JSON。');
    sys.push('數值須合理、克制、有因果：總統模式金額單位為「億」，企業模式為「萬元/年」。');
    sys.push('effects 只允許使用這些鍵：' + keys.join('、') + '；不適用的鍵就不要寫。');
    sys.push('總統：revenue 是年度收入增量、debtNow 是一次性舉債；企業：cashNow 是募資/增資現金、debtNow 是借款。');
    sys.push('cost 為一次性成本，recurring 為每年常態成本（撙節/裁員可為負）。stakeholders 數值介於 -3~3。');
    sys.push('只回覆純 JSON，不要 markdown。');
    const user =
      '模式：' + (b.mode === 'company' ? '企業 CEO' : '總統') +
      '\n玩家決策原文：「' + b.text + '」' +
      '\n目前狀態：' + b.stateSummary +
      '\n現行政策：' + (b.existing || '無') +
      '\n回覆格式：{"name":"簡潔政策名稱(12字內)","category":"分類","duration":"instant或permanent","cost":數字,"recurring":數字,"effects":{...},"required":{},"stakeholders":{},"reasoning":"一句話說明影響邏輯","risks":"一句話風險"}';
    return { user, max: 900, temp: 0.5 }
  },
  narrative(sys, b) {
    sys.push('你是模擬世界中的資深財經記者與主筆。根據「確定的遊戲狀態、玩家今年的決策、已發生事件」，撰寫一份寫實、有因果、有臨場感的年度報紙。');
    sys.push('鐵律：不得改寫任何已給定的數字，只能引用與解讀；新聞必須反映玩家決策與當前狀態，不可給通用空話。');
    sys.push('語氣像高品質財經媒體（如《經濟學人》《商業周刊》），繁體中文（台灣用語），具體、克制、避免誇張與標題黨。只回覆純 JSON。');
    sys.push('你必須產出 4 則不同面向的新聞（news），每則 detail 介於 25～100 個字，要有具體數字、對象、機制或因果，不可只有一句空話。');
    sys.push(b.mode === 'company'
      ? '新聞面向請涵蓋：財務營收/現金、市場與客戶、產業競爭或技術、人才營運或總體環境，並把今年已發生的事件與黑天鵝融入相關新聞。'
      : '新聞面向請涵蓋：財政與經濟數據、社會民生（就業/房價/物價/福利）、政治政局（朝野/民意/罷免或大選）、國際或能源/兩岸經貿，並把今年已發生的事件與黑天鵝融入相關新聞。');
    const user =
      '模式：' + (b.mode === 'company' ? '企業' : '總統') + '，年度：第 ' + b.year + ' 年' +
      '\n年終狀態：' + b.stateSummary +
      '\n今年決策：' + b.actions +
      '\n已發生事件（須在新聞中體現）：' + b.events +
      '\n規則版新聞骨架（可參考、改寫與擴寫，勿逐字照抄）：' + JSON.stringify(b.ruleNews) +
      '\n規則版風險（可改寫）：' + JSON.stringify(b.ruleRisks) +
      '\n回覆格式（務必回 4 則新聞）：{"headline":"今年最關鍵、可上頭版的一句頭條(20字內)","subheadline":"一行子標題說明來龍去脈(25-50字)","news":[{"category":"兩到四字分類","headline":"一則新聞標題(18字內)","detail":"25到100字、具體且有因果的新聞內文"}],"eventFlavors":{事件標題:"兩三句更寫實的描述"},"risks":["下一年度風險1(用可能/風險/預期語氣,20-50字)","風險2","風險3","風險4"]}';
    return { user, max: 2600, temp: 0.75 }
  },
  validateLocation(sys, b) {
    sys.push('你是地理資料查驗員。判斷玩家輸入的地點，是否為真實存在、可設立公司總部的城市、縣市、省州、國家，或真實的經貿/科技園區。');
    sys.push('真實的直轄市、縣市、鄉鎮市區、國家、省州、一線/二線城市、知名經貿區都算有效；憑空捏造、錯字到無法辨識、或輸入的其實是產品/人名而非地名，則無效。');
    sys.push('請用你的世界地理知識判斷，不必聯網。繁體中文回覆純 JSON，不要 markdown。');
    const user =
      '玩家想把公司總部設在：「' + b.query + '」' +
      '\n回覆格式：{"valid":true或false,"canonical":"標準繁體地名(優先到城市層級,如台北市、上海市、新加坡;若只給國家則回國家)","country":"所屬國家或地區","kind":"城市/縣市/省州/國家/區域","note":"有效就一句話描述其地理位置與經商環境;無效就說明原因","suggestion":"無效時給一個最接近的真實地名;有效則留空字串"}';
    return { user, max: 320, temp: 0.2 }
  },
  advisor(sys, b) {
    sys.push('你是這位玩家專屬的政策／經營顧問。必須根據提供的遊戲狀態、歷史決策與事件回答，不能只給通則。');
    sys.push('明確指出因果（哪一年的什麼決策導致現在的狀況）、給具體可行的下一步，繁體中文，250 字以內，條列呈現。');
    const user =
      '模式：' + (b.mode === 'company' ? '企業' : '總統') +
      '\n目前狀態：' + b.stateSummary +
      '\n歷史決策與事件：' + b.historySummary +
      '\n玩家提問：' + b.question;
    return { user, max: 700, temp: 0.5, raw: true }
  },
  report(sys, b) {
    sys.push('你是替玩家寫「執政／經營人生回顧」的傳記作者。根據確定發生過的決策與事件，梳理 2-3 條跨年因果鏈，不編造沒有發生的事。繁體中文，只回覆純 JSON。');
    const user =
      '模式：' + (b.mode === 'company' ? '企業' : '總統') +
      '\n最終狀態：' + b.stateSummary +
      '\n完整時間線（政策與事件）：' + b.timeline +
      '\n結束原因：' + (b.endReason || '任期/自願結束') +
      '\n回覆格式：{"title":"幫這段人生下的標題","summary":"三到四句整體評價","chains":[{"chain":["第X年：...","第Y年：..."],"lesson":"教訓"}],"verdict":"歷史會如何記住這位玩家(兩句)"}';
    return { user, max: 1100, temp: 0.7 }
  }
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (req.method !== 'POST') return json({ error: '僅接受 POST' }, 405);
  if (!process.env.LLM_API_KEY) return json({ error: '後端尚未設定 LLM_API_KEY' }, 500);

  let body;
  try { body = await req.json(); } catch (_) { return json({ error: '請求格式錯誤' }, 400); }
  const builder = TASKS[body.task];
  if (!builder) return json({ error: '未知任務' }, 400);

  const sys = ['你是回合制策略模擬遊戲 Policy Life 的 AI，所有內容使用繁體中文（台灣用語）。'];
  const cfg = builder(sys, body);

  try {
    const content = await groq(sys.join('\n'), cfg.user, cfg.max, cfg.temp);
    if (cfg.raw) return json({ ok: true, text: content });
    const parsed = extractJSON(content);
    if (!parsed) return json({ ok: false, error: 'AI 回覆格式無法解析' }, 502);
    return json({ ok: true, result: parsed });
  } catch (e) {
    if (e.status === 429) {
      const wait = Math.max(5, parseInt(e.retryAfter, 10) || 60);
      return json({ error: '免費 AI 額度這分鐘用滿，請等約 ' + wait + ' 秒（遊戲仍可正常進行，將使用內建規則敘事）', rateLimited: true, retryAfter: wait }, 429);
    }
    return json({ ok: false, error: 'AI 暫時無法回應：' + e.message }, 502);
  }
}
