// Neurora state-sheet composer — audited before rasterizing.
// Usage: node tools/compose-sheet.mjs <shotsDir> <outPng> "<title>" "<cap1>|<cap2>|..." (aligned to switcher state order)
// Tiles 390x844 native; captions numbered two-liners; page DOM-audited (caption clamp/overlap) pre-capture.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH || '/usr/lib/node_modules/playwright');
import path from 'path';
import fs from 'fs';

const [shotsDir, outPng, title, capsArg] = process.argv.slice(2);
const caps = capsArg.split('|');
const tiles = fs.readdirSync(shotsDir).filter(f => f.endsWith('.png')).sort();
if (tiles.length !== caps.length) { console.error(`tile/caption count mismatch: ${tiles.length} tiles, ${caps.length} captions`); process.exit(2); }

const COLS = 4, GAP = 24, MARG = 32, TILEW = 390, TILEH = 844, CAPH = 44, HEADH = 64, TB = 2;
const rows = Math.ceil(tiles.length / COLS);
const TILEBOX = TILEW + TB;
const W = MARG * 2 + COLS * TILEBOX + (COLS - 1) * GAP;
const H = HEADH + MARG + rows * (TILEH + TB + CAPH + GAP);

const cells = tiles.map((f, i) => {
  const c = Math.floor(i / COLS), cx = i % COLS;
  const x = MARG + cx * (TILEBOX + GAP), y = HEADH + MARG + c * (TILEH + TB + CAPH + GAP);
  const [c1, c2] = caps[i].split('¤');
  return `<div class="tile" style="left:${x}px;top:${y}px">
    <img src="data:image/png;base64,${fs.readFileSync(path.join(shotsDir, f)).toString('base64')}">
    <div class="cap"><div class="l1">${String(i + 1).padStart(2, '0')} · ${c1 || f.replace('.png', '').toUpperCase()}</div><div class="l2">${c2 || ''}</div></div>
  </div>`;
}).join('');

const html = `<!doctype html><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FFFFFF;font-family:'Space Mono','Noto Sans',monospace}
#page{position:relative;width:${W}px;height:${H}px}
.head{position:absolute;left:${MARG}px;top:20px;height:24px;display:flex;align-items:baseline;gap:16px}
.head .t{font-size:14px;font-weight:700;letter-spacing:.085em;text-transform:uppercase;color:#0D0D0D}
.head .m{font-size:9.5px;letter-spacing:.085em;text-transform:uppercase;color:#5D5D5D}
.tile{position:absolute;width:${TILEW + 2}px;height:${TILEH + 2}px;border:1px solid #E3E3E3}
.tile img{display:block;width:${TILEW}px;height:${TILEH}px}
.cap{margin-top:8px;width:${TILEW}px}
.cap .l1{font-size:10.5px;letter-spacing:.085em;text-transform:uppercase;color:#0D0D0D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cap .l2{margin-top:2px;font-size:9.5px;letter-spacing:.085em;color:#5D5D5D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
</style><div id="page"><div class="head"><span class="t">${title}</span><span class="m">${tiles.length} states · 390×844 native · verified ${new Date().toISOString().slice(0, 10)}</span></div>${cells}</div>`;

const AUDIT = `(() => {
  const bad = [];
  document.querySelectorAll('.cap div').forEach(d => { if (d.scrollWidth > d.clientWidth + 1) bad.push('caption clamp: ' + d.textContent.slice(0, 30)); });
  document.querySelectorAll('.tile img').forEach(im => { if (!im.complete || !im.naturalWidth) bad.push('tile not loaded: ' + im.src.slice(-30)); });
  const caps = [...document.querySelectorAll('.cap')].map(c => c.getBoundingClientRect());
  for (let i = 0; i < caps.length; i++) for (let j = i + 1; j < caps.length; j++) {
    const a = caps[i], b = caps[j];
    const l = Math.max(a.left, b.left), t = Math.max(a.top, b.top), r = Math.min(a.right, b.right), bo = Math.min(a.bottom, b.bottom);
    if (r - l > 1 && bo - t > 1) bad.push('caption overlap ' + i + '/' + j);
  }
  return bad;
})()`;

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(150);
const bad = await page.evaluate(AUDIT);
if (bad.length) { console.error('SHEET AUDIT FAIL: ' + bad.join(' | ')); process.exit(1); }
await page.locator('#page').screenshot({ path: outPng });
await browser.close();
console.log(`sheet OK: ${outPng} ${W}x${H}, ${tiles.length} tiles`);
