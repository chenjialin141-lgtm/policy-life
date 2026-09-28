# -*- coding: utf-8 -*-
"""直接打 Groq 驗證 Policy Life 兩個新 prompt：地名查驗、年度 4 則新聞。
金鑰從環境變數 GROQ_KEY 讀，不寫死於檔案。"""
import json, os, sys, urllib.request, urllib.error

sys.stdout.reconfigure(encoding='utf-8')
KEY = os.environ.get('GROQ_KEY', '')
URL = 'https://api.groq.com/openai/v1/chat/completions'
MODEL = 'qwen/qwen3.8-27b'

HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + KEY,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                  '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Accept': 'application/json',
}


def call(sys_lines, user, max_tokens, temp=0.7):
    body = {
        'model': MODEL, 'temperature': temp, 'max_tokens': max_tokens,
        'messages': [
            {'role': 'system', 'content': '\n'.join(sys_lines)},
            {'role': 'user', 'content': user},
        ],
    }
    req = urllib.request.Request(URL, data=json.dumps(body).encode('utf-8'), headers=HEADERS, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            data = json.loads(r.read().decode('utf-8'))
        return data['choices'][0]['message']['content'].strip()
    except urllib.error.HTTPError as e:
        return 'HTTP_ERROR %s: %s' % (e.code, e.read().decode('utf-8', 'ignore')[:300])


def extract_json(text):
    try:
        return json.loads(text.strip())
    except Exception:
        pass
    import re
    m = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', text)
    if m:
        try:
            return json.loads(m.group(1))
        except Exception:
            pass
    depth, start = 0, -1
    for i, ch in enumerate(text):
        if ch == '{':
            if depth == 0:
                start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and start >= 0:
                try:
                    return json.loads(text[start:i + 1])
                except Exception:
                    pass
    return None


# ---------- 1. 地名查驗（有效 / 無效） ----------
loc_sys = [
    '你是回合制策略模擬遊戲 Policy Life 的 AI，所有內容使用繁體中文（台灣用語）。',
    '你是地理資料查驗員。判斷玩家輸入的地點，是否為真實存在、可設立公司總部的城市、縣市、省州、國家，或真實的經貿/科技園區。',
    '真實的直轄市、縣市、鄉鎮市區、國家、省州、一線/二線城市、知名經貿區都算有效；憑空捏造、錯字到無法辨識、或輸入的其實是產品/人名而非地名，則無效。',
    '請用你的世界地理知識判斷，不必聯網。繁體中文回覆純 JSON，不要 markdown。',
]
loc_fmt = '\n回覆格式：{"valid":true或false,"canonical":"標準繁體地名","country":"所屬國家或地區","kind":"城市/縣市/省州/國家/區域","note":"一句話","suggestion":"無效給最接近地名,有效留空"}'

for q in ['印尼泗水', '啊嗚星球通體城']:
    out = call(loc_sys, '玩家想把公司總部設在：「' + q + '」' + loc_fmt, 320, 0.2)
    print('=' * 60)
    print('地名查驗：', q)
    j = extract_json(out)
    print(json.dumps(j, ensure_ascii=False, indent=2) if j else out[:300])

# ---------- 2. 年度新聞（總統，4 則、每則 25-100 字） ----------
nar_sys = [
    '你是回合制策略模擬遊戲 Policy Life 的 AI，所有內容使用繁體中文（台灣用語）。',
    '你是模擬世界中的資深財經記者與主筆。根據「確定的遊戲狀態、玩家今年的決策、已發生事件」，撰寫一份寫實、有因果、有臨場感的年度報紙。',
    '鐵律：不得改寫任何已給定的數字，只能引用與解讀；新聞必須反映玩家決策與當前狀態，不可給通用空話。',
    '語氣像高品質財經媒體，繁體中文（台灣用語），具體、克制、避免誇張與標題黨。只回覆純 JSON。',
    '你必須產出 4 則不同面向的新聞（news），每則 detail 介於 25～100 個字，要有具體數字、對象、機制或因果，不可只有一句空話。',
    '新聞面向請涵蓋：財政與經濟數據、社會民生（就業/房價/物價/福利）、政治政局（朝野/民意/罷免或大選）、國際或能源/兩岸經貿，並把今年已發生的事件與黑天鵝融入相關新聞。',
]
nar_user = (
    '模式：總統，年度：第 2 年\n'
    '年終狀態：第2年第1任；GDP5200億、成長3.4%、通膨3.8%、失業3.9%、債務3360億、利率4.2%、'
    '收入1030億、支出1120億、可支配210億、民意52、社會信任58、政治穩定64、反對黨57、房價指數138\n'
    '今年決策：調高基本工資至每月32000元(強度1)、擴大公共建設(強度1)\n'
    '已發生事件（須在新聞中體現）：營建業缺工，公共建設進度落後：營造業反映基層勞力短缺，部分工程進度落後。\n'
    '回覆格式（務必回 4 則新聞）：{"headline":"頭條20字內","subheadline":"子標25-50字",'
    '"news":[{"category":"兩到四字","headline":"18字內","detail":"25到100字"}],'
    '"eventFlavors":{},"risks":["風險1","風險2","風險3","風險4"]}'
)
out = call(nar_sys, nar_user, 2600, 0.75)
print('=' * 60)
print('年度新聞（總統第 2 年）')
j = extract_json(out)
if j:
    print('頭條：', j.get('headline'))
    print('子標：', j.get('subheadline'))
    news = j.get('news', [])
    print('新聞則數：', len(news))
    for i, n in enumerate(news, 1):
        d = n.get('detail', '')
        print('  [%d]【%s】%s （內文 %d 字）' % (i, n.get('category'), n.get('headline'), len(d)))
        print('       ', d)
    print('風險數：', len(j.get('risks', [])))
else:
    print(out[:600])
