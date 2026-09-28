# -*- coding: utf-8 -*-
"""對正式 Vercel 端點做上線後驗證：地名查驗（有效/無效）＋年度 4 則新聞。不含金鑰。"""
import json, sys, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')

BASE = 'https://policy-life.vercel.app/api/ai'


def post(payload):
    req = urllib.request.Request(
        BASE, data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json; charset=utf-8',
                 'User-Agent': 'Mozilla/5.0 PolicyLife-LiveCheck'},
        method='POST')
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return r.status, json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode('utf-8'))


# 1 & 2 地名查驗
for q in ['印尼泗水', '啊嗚星球通體城', '德國柏林']:
    st, r = post({'task': 'validateLocation', 'query': q})
    print('=' * 64)
    print('地名查驗「%s」 HTTP %s' % (q, st))
    res = r.get('result', r)
    print(json.dumps(res, ensure_ascii=False))

# 3 年度新聞（總統）
payload = {
    'task': 'narrative', 'mode': 'president', 'year': 2,
    'stateSummary': '第2年第1任；GDP5200億、成長3.4%、通膨3.8%、失業3.9%、債務3360億、利率4.2%、收入1030億、支出1120億、可支配210億、民意52、社會信任58、政治穩定64、反對黨57、房價指數138',
    'actions': '調高基本工資至每月32000元(強度1)、擴大公共建設(強度1)',
    'events': '營建業缺工，公共建設進度落後：營造業反映基層勞力短缺，部分工程進度落後。',
    'ruleNews': [
        {'category': '財政', 'headline': '財政赤字擴大', 'detail': '今年支出高於收入，政府赤字擴大，債務持續攀升。'},
        {'category': '民生', 'headline': '基本工資調漲', 'detail': '基本工資調高，勞工收入增加，但部分企業反映人事成本上升。'},
    ],
    'ruleRisks': ['利息支出可能隨債務與利率上升', '營建缺工可能使建設進度持續落後'],
}
st, r = post(payload)
print('=' * 64)
print('年度新聞 HTTP %s' % st)
res = r.get('result', r)
if isinstance(res, dict) and res.get('news'):
    print('頭條：', res.get('headline'))
    print('子標：', res.get('subheadline'))
    news = res['news']
    print('新聞則數：', len(news))
    ok = True
    for i, n in enumerate(news, 1):
        d = n.get('detail', '')
        good = 25 <= len(d) <= 100
        ok = ok and good
        print('  [%d]【%s】%s 內文%d字 %s' % (i, n.get('category'), n.get('headline'), len(d), 'OK' if good else 'XX'))
        print('      ', d)
    print('風險數：', len(res.get('risks', [])))
    print('新聞字數全部符合 25-100：', ok and len(news) >= 3)
else:
    print(json.dumps(res, ensure_ascii=False)[:500])
