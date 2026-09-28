# -*- coding: utf-8 -*-
import re, sys, urllib.request, urllib.parse
from datetime import datetime
sys.stdout.reconfigure(encoding='utf-8')

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
      'Accept-Language': 'zh-TW,zh;q=0.9'}

def fetch(q):
    url = 'https://news.google.com/rss/search?q=' + urllib.parse.quote(q) + '&hl=zh-TW&gl=TW&ceid=TW:zh-Hant'
    req = urllib.request.Request(url, headers=UA)
    xml = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'ignore')
    items = re.findall(r'<item>[\s\S]*?</item>', xml)
    rows = []
    for it in items:
        t = re.search(r'<title>([\s\S]*?)</title>', it)
        d = re.search(r'<pubDate>([\s\S]*?)</pubDate>', it)
        date = ''
        if d:
            try: date = datetime.strptime(d[1].strip(), '%a, %d %b %Y %H:%M:%S %Z').date().isoformat()
            except Exception: pass
        title = re.sub(r'<!\[CDATA\[|\]\]>', '', t.group(1)) if t else ''
        rows.append((date, title[:40]))
    rows.sort(reverse=True)
    return rows

queries = [
    '給東南亞移工的跨境匯款 App when:2y',
    '給東南亞移工的跨境匯款 App 台北 when:2y',
    '移工 跨境匯款 when:2y',
    '跨境匯款 台灣 when:2y',
    '移工匯款 when:2y',
    '跨境支付 台灣 when:2y',
]
for q in queries:
    try:
        rows = fetch(q)
        print(f"[{q}] -> {len(rows)} 筆")
        for d, t in rows[:4]:
            print("    ", d, t)
    except Exception as e:
        print(f"[{q}] 錯誤 {e}")
    print()
