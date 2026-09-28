# -*- coding: utf-8 -*-
import sys, urllib.request, urllib.parse, urllib.error, re
sys.stdout.reconfigure(encoding='utf-8')

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
q = '東南亞移工 跨境匯款 台灣 市場 趨勢'

def get(url, headers=None, timeout=25):
    h = {'User-Agent': UA, 'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8'}
    if headers: h.update(headers)
    req = urllib.request.Request(url, headers=h)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode('utf-8', 'ignore')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'ignore')[:500]
    except Exception as e:
        return -1, str(e)

# 1) Google News RSS
gn = 'https://news.google.com/rss/search?' + urllib.parse.urlencode({'q': q, 'hl': 'zh-TW', 'gl': 'TW', 'ceid': 'TW:zh-Hant'})
s, html = get(gn)
items = re.findall(r'<item>([\s\S]*?)</item>', html)
print('[GoogleNews] status', s, 'items', len(items))
for it in items[:3]:
    t = re.search(r'<title>([\s\S]*?)</title>', it)
    l = re.search(r'<link>([\s\S]*?)</link>', it)
    d = re.search(r'<pubDate>([\s\S]*?)</pubDate>', it)
    print('  -', (t.group(1)[:70] if t else ''), '|', (d.group(1)[:22] if d else ''))
    print('    ', (l.group(1)[:90] if l else ''))

# 2) DDG html
s, html = get('https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(q))
links = re.findall(r'class="result__a"[^>]*href="([^"]+)"', html)
print('\n[DDG html] status', s, 'links', len(links), 'len', len(html))
for u in links[:3]: print('   ', u[:100])

# 3) DDG lite
s, html = get('https://lite.duckduckgo.com/lite/?q=' + urllib.parse.quote(q))
ll = re.findall(r'class="result-link"[^>]*href="([^"]+)"', html)
print('\n[DDG lite] status', s, 'links', len(ll), 'len', len(html))
for u in ll[:3]: print('   ', u[:100])

# 4) Bing
s, html = get('https://www.bing.com/search?q=' + urllib.parse.quote(q) + '&setlang=zh-TW&cc=TW')
algo = re.findall(r'<li class="b_algo"[\s\S]*?<h2>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)</a>', html)
print('\n[Bing] status', s, 'algo', len(algo), 'len', len(html))
for u, t in algo[:3]: print('   ', re.sub(r'<[^>]+>','',t)[:60], '|', u[:90])
