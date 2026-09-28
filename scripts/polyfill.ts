/* Node 測試環境的瀏覽器 API polyfill；必須在 import gameStore 之前最先載入。 */
const mem = new Map<string, string>()
const ls = {
  getItem: (k: string) => (mem.has(k) ? mem.get(k)! : null),
  setItem: (k: string, v: string) => { mem.set(k, String(v)) },
  removeItem: (k: string) => { mem.delete(k) },
  clear: () => mem.clear(),
  key: () => null,
  get length() { return mem.size }
}
;(globalThis as unknown as { localStorage: typeof ls }).localStorage = ls
if (typeof structuredClone !== 'function') {
  ;(globalThis as unknown as { structuredClone: (x: unknown) => unknown }).structuredClone = (x: unknown) =>
    JSON.parse(JSON.stringify(x))
}
