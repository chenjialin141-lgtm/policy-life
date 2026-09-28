# -*- coding: utf-8 -*-
import json, sys, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')
BASE = 'https://policy-life.vercel.app'

def post(path, payload, timeout=90):
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        BASE + path, data=data,
        headers={'Content-Type': 'application/json; charset=utf-8'}, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        raw = e.read().decode('utf-8', 'ignore')
        try: return e.code, json.loads(raw)
        except Exception: return e.code, {'_raw': raw[:300]}
    except Exception as e:
        return -1, {'_err': str(e)}

# 1) 首頁
try:
    with urllib.request.urlopen(BASE, timeout=30) as r:
        html = r.read().decode('utf-8', 'ignore')
    print('HOME', r.status, 'len=', len(html), 'root=', ('id="root"' in html), 'js=', ('/assets/index-' in html))
except Exception as e:
    print('HOME ERR', e)

# 2) AI 政策解析（總統自由輸入）
s, b = post('/api/ai', {
    'task': 'parsePolicy', 'mode': 'president',
    'text': '我要把基本工資提高到每月35000元',
    'stateSummary': '第1年，GDP 5000億，失業率4.5%，通膨2.3%，政府年度收入1000億、可支配預算300億',
    'existing': '無'
})
print('\n[AI parsePolicy] status', s)
print(json.dumps(b, ensure_ascii=False)[:700])

# 3) AI 顧問
s, b = post('/api/ai', {
    'task': 'advisor', 'mode': 'president',
    'question': '我今年大幅提高福利支出，明年要注意什麼？',
    'stateSummary': '第2年，債務3400億，赤字180億，民意62，通膨2.8%',
    'historySummary': '第1年把福利預算拉到3倍、發放現金'
})
print('\n[AI advisor] status', s)
print(json.dumps(b, ensure_ascii=False)[:500])

# 4) 企業聯網市場評估
s, b = post('/api/market', {
    'product': '東南亞移工跨境匯款手機 App',
    'location': '台北', 'region': 'national'
})
print('\n[MARKET] status', s)
res = b.get('result', {}) if isinstance(b, dict) else {}
print('live=', res.get('live'), 'asOf=', res.get('asOf'), 'demand=', res.get('demand'),
      'competition=', res.get('competition'), 'sources=', len(res.get('sources', [])))
print('summary=', (res.get('summary') or b.get('error') or '')[:300])
for x in res.get('sources', [])[:3]:
    print('  src:', x.get('title', '')[:60], '|', x.get('url', '')[:80])
