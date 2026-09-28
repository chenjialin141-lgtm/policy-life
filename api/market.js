// Policy Life — 企業市場聯網評估（Vercel Edge Function）
// 玩家自由輸入「賣什麼、在哪賣、業務區域」，後端即時搜尋市場新聞與資料，AI 彙整背景。
// 來源策略：Google 新聞 RSS（雲端可存取、自帶日期、最穩定）為主，DuckDuckGo 網頁結果為輔。
// 真實資料一律附來源與日期；回傳的 adjust 僅為「小幅初始值建議」，核心數值仍由引擎決定。

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...CORS } });
}
function decodeHtml(s) {
  return (s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

// Google 新聞 RSS：回傳標題、跳轉連結、日期與（剝標籤後的）摘要
function parseGoogleNews(xml) {
  const out = [];
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  for (const it of items) {
    const rawTitle = (it.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    const link = ((it.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '').trim();
    const pub = (it.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
    let desc =
      (it.match(/<description>[\s\S]*?<!\[CDATA\[([\s\S]*?)\]\]>[\s\S]*?<\/description>/) || [])[1] ||
      (it.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';
    desc = decodeHtml(desc.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    const title = decodeHtml(rawTitle.replace(/<!\[CDATA\[|\]\]>/g, '')).trim();
    let date = '';
    if (pub) { const d = new Date(pub); if (!isNaN(d)) date = d.toISOString().slice(0, 10); }
    if (title && link) out.push({ title, url: link, snippet: desc.slice(0, 240), date });
  }
  return out;
}

// DuckDuckGo HTML 結果（雲端 IP 有時被擋，作為備援）
function parseDdg(html) {
  const results = [];
  const linkRe = /<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  const snippetRe = /<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
  const links = [];
  let m;
  while ((m = linkRe.exec(html)) !== null && links.length < 8) {
    let url = m[1].replace(/&amp;/g, '&');
    const u = url.match(/[?&]uddg=([^&]+)/);
    if (u) { try { url = decodeURIComponent(u[1]); } catch (_) {} }
    const title = decodeHtml(m[2].replace(/<[^>]+>/g, '')).trim();
    if (title && url && url.startsWith('http')) links.push({ title, url });
  }
  const snips = [];
  while ((m = snippetRe.exec(html)) !== null && snips.length < 8) snips.push(decodeHtml(m[1].replace(/<[^>]+>/g, '')).trim());
  for (let i = 0; i < links.length; i++) results.push({ ...links[i], snippet: snips[i] || '', date: '' });
  return results.slice(0, 6);
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

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (req.method !== 'POST') return json({ error: '僅接受 POST' }, 405);
  if (!process.env.LLM_API_KEY) return json({ error: '後端尚未設定 LLM_API_KEY' }, 500);

  let body;
  try { body = await req.json(); } catch (_) { return json({ error: '請求格式錯誤' }, 400); }
  const product = (body.product || '').trim();
  const location = (body.location || '').trim();
  const region = (body.region || 'local').trim();
  if (product.length < 2) return json({ error: '請描述你要銷售的產品或服務' }, 400);

  // 聯網搜尋：直接用產品原句（Google 新聞對自然語言做寬鬆比對；額外 AND「市場/產業/趨勢」會大幅壓縮結果）
  // 近兩年為主、加地點強化在地關聯，全時結果僅在近期資料不足時補充；DuckDuckGo 為最後備援。
  const gNews = (q) => 'https://news.google.com/rss/search?' +
    'q=' + encodeURIComponent(q) + '&hl=zh-TW&gl=TW&ceid=TW:zh-Hant';
  const newsUrlRecent = gNews(`${product} when:2y`);
  const newsUrlLoc = gNews(`${product} ${location} when:2y`);
  const newsUrlAll = gNews(`${product}`);
  const ddgUrl = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(`${product} ${location} 市場 競爭`);

  const [recentRes, locRes, allRes, ddgRes] = await Promise.allSettled([
    fetch(newsUrlRecent, { headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml,text/xml', 'Accept-Language': 'zh-TW,zh;q=0.9' } }),
    fetch(newsUrlLoc, { headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml,text/xml', 'Accept-Language': 'zh-TW,zh;q=0.9' } }),
    fetch(newsUrlAll, { headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml,text/xml', 'Accept-Language': 'zh-TW,zh;q=0.9' } }),
    fetch(ddgUrl, { headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml', 'Accept-Language': 'zh-TW,zh;q=0.9' } })
  ]);

  const tryParse = async (r) => {
    if (r && r.status === 'fulfilled' && r.value.ok) {
      try { return parseGoogleNews(await r.value.text()); } catch (_) {}
    }
    return [];
  };
  const mergeNews = (acc, items) => {
    for (const n of items) {
      if (!acc.some((x) => x.url === n.url || x.title === n.title)) acc.push(n);
    }
    return acc;
  };

  // 近期（產品原句 → 加地點）為主力
  let news = mergeNews([], await tryParse(recentRes));
  news = mergeNews(news, await tryParse(locRes));
  // 近期資料不足 6 筆才放寬到全時，避免舊聞主導
  if (news.length < 6) news = mergeNews(news, await tryParse(allRes));
  // 有日期的依日期降冪，無日期墊底；取最新 8 則
  news.sort((a, b) => (b.date || '0000').localeCompare(a.date || '0000'));
  let sources = news.slice(0, 8);

  // Google 新聞不足時以 DuckDuckGo 補充（DDG 無日期，排在後面）
  if (sources.length < 8 && ddgRes.status === 'fulfilled' && ddgRes.value.ok) {
    try {
      const ddg = parseDdg(await ddgRes.value.text());
      const seen = new Set(sources.map((s) => s.url));
      for (const d of ddg) { if (sources.length < 8 && !seen.has(d.url)) sources.push(d); }
    } catch (_) {}
  }

  const context = sources.length
    ? sources.map((s, i) => `[${i + 1}] ${s.title}${s.date ? '（' + s.date + '）' : ''}\n${s.snippet}\n${s.url}`).join('\n\n')
    : '（未取得即時網路資料，請依你的知識審慎評估，並明確提醒玩家這是通用推估、非即時數據）';

  const sys =
    '你是創業市場分析師。優先根據附上的「即時新聞資料」（注意新聞日期，越新越具參考性），針對玩家想銷售的產品、地點與業務區域做客觀、簡潔的市場評估，繁體中文（台灣用語）。' +
    '只引用資料中確實出現的事，不編造具體數字；資料不足要明說。業務區域越大（local→national→regional→global）競爭與門檻越高。只回覆純 JSON。';
  const user =
    `產品/服務：${product}\n銷售地點：${location}\n業務區域：${region}\n查詢日期：${new Date().toISOString().slice(0, 10)}\n\n` +
    '即時參考資料（含來源與日期）：\n' + context +
    '\n\n回覆格式：{"summary":"三到四句市場總覽(可引用最新趨勢)","demand":"high/mid/low","competition":0到100數字,"trend":"一句產業趨勢(優先參考新聞)","opportunities":["機會1","機會2"],"risks":["風險1","風險2"],"adjust":{"revenue":-300到300,"marketShare":-3到3,"brand":-5到5,"rnd":-5到5,"investorConfidence":-8到8},"dataNote":"說明本次評估是依即時新聞(日期範圍)或通用推估"}';

  try {
    const lr = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.LLM_API_KEY },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b', temperature: 0.4, max_tokens: 900,
        messages: [{ role: 'system', content: sys }, { role: 'user', content: user }]
      })
    });
    if (!lr.ok) {
      if (lr.status === 429) return json({ error: '免費 AI 額度這分鐘用滿，請稍候再試', rateLimited: true, sources }, 429);
      return json({ error: 'AI 評估服務回應錯誤', sources }, 502);
    }
    const data = await lr.json();
    const parsed = extractJSON(data?.choices?.[0]?.message?.content || '');
    if (!parsed) return json({ error: 'AI 回覆格式無法解析', sources }, 502);
    const dates = sources.map((s) => s.date).filter(Boolean).sort();
    return json({
      ok: true, result: {
        ...parsed,
        sources,
        asOf: new Date().toISOString().slice(0, 10),
        dateRange: dates.length ? { from: dates[0], to: dates[dates.length - 1] } : null,
        live: sources.length > 0
      }
    });
  } catch (e) {
    return json({ error: '市場評估暫時無法回應：' + e.message, sources }, 502);
  }
}
