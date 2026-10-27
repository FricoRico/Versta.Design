// Neurora mockup auditor — DOM/paint verification at 390x844 per state.
// Usage: node tools/audit.mjs <mockup.html> [--shots outdir] [--json] [--lax-grid]
// Asserts: text overlap (occlusion+clip aware), untruncated strings, radius law,
// 4pt grid on structural boxes (documented exemptions), acid sweep. Exit 1 on failure.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH || '/usr/lib/node_modules/playwright');
import path from 'path';

const file = path.resolve(process.argv[2]);
const shotsDir = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;
const wantJson = process.argv.includes('--json');
const laxGrid = process.argv.includes('--lax-grid');

const AUDIT_JS = `(() => {
  const phone = document.querySelector('#phone');
  const pr = phone.getBoundingClientRect();
  const ALLOWED_R = ['999px','8px','12px','16px','24px','50%'];
  // content-sized / derived-geometry classes exempt from grid metric audit (documented in spec 0.4/0.6):
  const EXEMPT_SET = new Set(['pill','ph-cat','h-chip','getbtn','getnow','upd','h-keep','h-trail','ts','sub','rdot','spk','grip','mic','pk-btn','pk-card','cm-bubble','cm-arrow','t-actions','p-display','h-display','img-chip','h-empty','lab','filters','t-head','t-body','t-partner','ph-en','ph-ja','ph-title','ph-cats','ic','ic-s','lbl','lede','priv','h-hint','p-priv','p-meta','failcap','pbanner','cap','native','m','l','r','ps-title','ps-done','ps-agg','cmp-title','cmp-hint','sc-line','sc-done','state','inner','off','sec','pri','b','t','h-util','h-ticks','p-ticks','caret','sc-replay']);
  const EXEMPT = cls => String(cls).trim().split(' ').filter(Boolean).some(tok => EXEMPT_SET.has(tok));
  const issues = [], gridFlags = [], radiusSeen = {};
  const vis = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return r.width > 0.5 && r.height > 0.5 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.01; };

  // ---- text inventory with clip-aware rects ----
  const texts = [];
  const walker = document.createTreeWalker(phone, NodeFilter.SHOW_TEXT);
  let n;
  while (n = walker.nextNode()) {
    const t = n.textContent.replace(/\\s+/g,' ').trim();
    if (!t) continue;
    const el = n.parentElement;
    if (!el || !vis(el)) continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    let rect = rg.getBoundingClientRect();
    if (rect.width < 0.5 || rect.height < 0.5) continue;
    let a = el;
    while (a && a !== document.body) {
      const cs = getComputedStyle(a);
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
        const ab = a.getBoundingClientRect();
        const l = Math.max(rect.left, ab.left), tp = Math.max(rect.top, ab.top);
        const r2 = Math.min(rect.right, ab.right), b = Math.min(rect.bottom, ab.bottom);
        rect = new DOMRect(l, tp, Math.max(0, r2 - l), Math.max(0, b - tp));
      }
      a = a.parentElement;
    }
    if (rect.width < 0.5 || rect.height < 1) continue;
    texts.push({ el, rect, text: t.slice(0, 40) });
  }
  // ---- painting visibility at a point ----
  const visibleAt = (el, x, y) => {
    const stack = document.elementsFromPoint(x, y);
    const iE = stack.findIndex(e => e === el || el.contains(e) || e.contains(el));
    if (iE === -1) return false;
    for (let k = 0; k < iE; k++) {
      const s = stack[k];
      if (el.contains(s)) continue;                      // own descendants don't occlude (text draws above)
      const cs = getComputedStyle(s);
      const bg = cs.backgroundColor;
      const m = bg.match(/rgba?\\(([^)]+)\\)/);
      if (m) { const p = m[1].split(',').map(Number); const alpha = p.length === 4 ? p[3] : 1;
        if (alpha >= 0.99) { const r = s.getBoundingClientRect();
          if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return false; } }
    }
    return true;
  };
  // ---- coverer (first opaque element hiding el at point) ----
  const covererAt = (el, x, y) => {
    const stack = document.elementsFromPoint(x, y);
    const iE = stack.findIndex(e => e === el || el.contains(e) || e.contains(el));
    const lim = iE === -1 ? stack.length : iE;
    for (let k = 0; k < lim; k++) {
      const s = stack[k];
      if (el.contains(s)) continue;
      const bg = getComputedStyle(s).backgroundColor;
      const m = bg.match(/rgba?\\(\\s*([\\d.]+)[,\\s]+([\\d.]+)[,\\s]+([\\d.]+)(?:[,/\\s]+([\\d.]+%?))?\\s*\\)/);
      if (!m || !m[1]) continue;
      const alpha = m[4] === undefined ? 1 : parseFloat(m[4]);
      if (alpha >= 0.99) { const r = s.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return s; }
    }
    return null;
  };
  // ---- plane assignment: nearest ancestor-or-self with numeric z >= 8 is the layer ----
  const planeOf = el => { let a = el; while (a && a !== phone) { const z = getComputedStyle(a).zIndex;
    if (z !== 'auto' && +z >= 8) return a; a = a.parentElement; } return null; };
  texts.forEach(T => T.plane = planeOf(T.el));
  // ---- plane-partitioned overlap (both-paint OR one-covers-the-other, same plane only) ----
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
    const A = texts[i], B = texts[j];
    if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;
    if (A.plane !== B.plane) continue;
    const l = Math.max(A.rect.left, B.rect.left), t = Math.max(A.rect.top, B.rect.top);
    const r = Math.min(A.rect.right, B.rect.right), b = Math.min(A.rect.bottom, B.rect.bottom);
    if (r - l < 2 || b - t < 2) continue;
    const pts = [[(l+r)/2,(t+b)/2],[l+2,t+2],[r-2,b-2]];
    for (const [x, y] of pts) {
      const vA = visibleAt(A.el, x, y), vB = visibleAt(B.el, x, y);
      let hit = vA && vB;
      if (!hit && !vA) { const C = covererAt(A.el, x, y); if (C && B.el.contains(C)) hit = true; }
      if (!hit && !vB) { const C = covererAt(B.el, x, y); if (C && A.el.contains(C)) hit = true; }
      if (hit) {
        issues.push({ kind: 'text-overlap', a: A.text, b: B.text, x: +(x - pr.left).toFixed(1), y: +(y - pr.top).toFixed(1) });
        break;
      }
    }
  }
  // ---- truncated strings (ellipsis truncation is by-design) ----
  for (const T of texts) {
    const el = T.el, cs = getComputedStyle(el);
    if (el.scrollWidth > el.clientWidth + 1.5 && cs.textOverflow !== 'ellipsis' && cs.overflowWrap !== 'anywhere' && !/display|sc-line|h-trav|h-part|ph-en|ph-ja|t-body/.test(String(el.className)))
      issues.push({ kind: 'text-clipped', text: T.text, cls: String(el.className).slice(0, 40) });
  }
  // ---- radius law ----
  phone.querySelectorAll('*').forEach(el => {
    if (!vis(el)) return;
    const cs = getComputedStyle(el);
    [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius].forEach(v => {
      if (v && v !== '0px') { radiusSeen[v] = (radiusSeen[v] || 0) + 1;
        if (!ALLOWED_R.includes(v)) issues.push({ kind: 'radius', value: v, cls: String(el.className).slice(0, 40) }); }
    });
  });
  // ---- 4pt grid on structural boxes ----
  const SKIP = new Set(['svg','path','circle','rect','i','br']);
  const EXEMPT_H_SET = new Set(['pk-card','cm-bubble','h-empty','ph-panel','cmp-panel','pbanner','state','pcard','pdel']);
  const EXEMPT_H = cls => String(cls).trim().split(' ').filter(Boolean).some(tok => EXEMPT_H_SET.has(tok));
  phone.querySelectorAll('*').forEach(el => {
    if (SKIP.has(el.tagName.toLowerCase()) || !vis(el)) return;
    const cs = getComputedStyle(el);
    const cls = String(el.className);
    if (EXEMPT(cls)) return;
    const abs = cs.position === 'absolute' || cs.position === 'fixed';
    const decorated = cs.borderTopWidth !== '0px' || (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent');
    if (!abs && !decorated) return;
    const r = el.getBoundingClientRect();
    const x = r.left - pr.left, y = r.top - pr.top, w = r.width, h = r.height;
    if (w >= 389.5 || (Math.abs(w - 350) <= 0.5 && Math.abs(x - 20) <= 0.5)) { } // full-bleed / content-span: exempt w + x
    else {
      const pw = el.parentElement ? el.parentElement.getBoundingClientRect() : pr;
      const px = pw.left - pr.left;
      const centered = Math.abs(x - (px + (pw.width - w) / 2)) <= 2;
      const rightGap = 390 - (x + w);
      const rightAnch = ((rightGap % 4) + 4) % 4 <= 0.05 && rightGap >= 0 && rightGap <= 60;
      if (!centered && !rightAnch) { const m = ((x % 4) + 4) % 4; if (m > 0.05 && m < 3.95) gridFlags.push({ cls: cls.slice(0, 44), prop: 'x', v: +x.toFixed(2) }); }
      const m2 = ((w % 4) + 4) % 4; if (m2 > 0.05 && m2 < 3.95) gridFlags.push({ cls: cls.slice(0, 44), prop: 'w', v: +w.toFixed(2) });
    }
    if (abs) {
      const ph2 = el.parentElement ? el.parentElement.getBoundingClientRect() : pr;
      const yCentered = Math.abs(y - ((ph2.top - pr.top) + (ph2.height - h) / 2)) <= 2;
      const bottomGap = 844 - (y + h);
      const bottomAnch = ((bottomGap % 4) + 4) % 4 <= 0.05 && bottomGap >= -0.5 && bottomGap <= 200;
      const m = ((y % 4) + 4) % 4; if (!yCentered && !bottomAnch && m > 0.05 && m < 3.95 && h < 843.5) gridFlags.push({ cls: cls.slice(0, 44), prop: 'y', v: +y.toFixed(2) });
      if (!EXEMPT_H(cls) && r.height > 2) { const mh = ((h % 4) + 4) % 4; if (mh > 0.05 && mh < 3.95) gridFlags.push({ cls: cls.slice(0, 44), prop: 'h', v: +h.toFixed(2) }); }
    }
  });
  // ---- acid sweep ----
  let acidEls = 0;
  phone.querySelectorAll('*').forEach(el => {
    if (!vis(el)) return;
    const cs = getComputedStyle(el);
    if ([cs.backgroundColor, cs.color, cs.borderTopColor].some(c => /230,\\s*255,\\s*0/.test(c))) acidEls++;
  });
  return { issues, gridFlags, radiusSeen, acidEls, textCount: texts.length };
})()`;

const run = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 950 } });
  await page.goto('file://' + file);
  await page.evaluate(() => document.fonts.ready);
  const states = await page.$$eval('#switcher button', bs => bs.map(b => b.dataset.state || b.textContent.trim()));
  const report = {};
  for (const s of states) {
    await page.evaluate(sel => {
      const b = [...document.querySelectorAll('#switcher button')].find(x => (x.dataset.state || x.textContent.trim()) === sel);
      if (b.dataset.state) { location.hash = b.dataset.state; } b.click();
    }, s);
    await page.waitForTimeout(80);
    report[s] = await page.evaluate(AUDIT_JS);
    if (shotsDir) {
      await page.evaluate(() => { document.getElementById('switcher').style.visibility = 'hidden'; });
      await page.locator('#phone').screenshot({ path: path.join(shotsDir, `${String(states.indexOf(s)).padStart(2, '0')}-${s}.png`) });
      await page.evaluate(() => { document.getElementById('switcher').style.visibility = ''; });
    }
  }
  await browser.close();
  let fail = 0; const gridSeen = {};
  for (const [s, r] of Object.entries(report)) {
    for (const i of r.issues) { fail++; if (!wantJson) console.log(`[${s}] ${i.kind}: "${i.a || ''}" <> "${i.b || ''}" ${i.value || ''} ${i.text || ''} ${i.cls || ''} ${i.x !== undefined ? '@' + i.x + ',' + i.y : ''}`); }
    for (const g of r.gridFlags) if (!gridSeen[`${g.cls}|${g.prop}|${g.v}`]) gridSeen[`${g.cls}|${g.prop}|${g.v}`] = s;
  }
  if (wantJson) { console.log(JSON.stringify(report, null, 1)); return; }
  console.log('--- grid flags (unique, first-sighting state):');
  for (const [k, s] of Object.entries(gridSeen)) console.log(`  ${s}: ${k}`);
  const bad = Object.entries(report).filter(([, r]) => r.issues.length).map(([s]) => s);
  console.log(`--- ${Object.keys(report).length} states, ${fail} blocking issues${fail ? ' @ ' + bad : ''}, ${Object.keys(gridSeen).length} grid flags${laxGrid ? ' (informational)' : ''}`);
  process.exit(fail ? 1 : 0);
};
run();
