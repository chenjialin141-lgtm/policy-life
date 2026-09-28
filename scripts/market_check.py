# -*- coding: utf-8 -*-
import json, sys, urllib.request
sys.stdout.reconfigure(encoding='utf-8')

body = json.dumps({
    "product": "給東南亞移工的跨境匯款 App",
    "location": "台北",
    "region": "local",
}).encode('utf-8')

req = urllib.request.Request(
    "https://policy-life.vercel.app/api/market",
    data=body,
    headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "Mozilla/5.0"},
    method="POST",
)
with urllib.request.urlopen(req, timeout=90) as r:
    data = json.loads(r.read().decode('utf-8'))

res = data.get("result", {})
print("live =", res.get("live"), "| asOf =", res.get("asOf"), "| dateRange =", res.get("dateRange"))
print("demand =", res.get("demand"), "| competition =", res.get("competition"))
print("trend =", res.get("trend"))
print("sources:")
for s in res.get("sources", []):
    print("  -", s.get("date"), "|", s.get("title", "")[:42])
print("dataNote =", res.get("dataNote"))
print("summary =", (res.get("summary") or "")[:160])
