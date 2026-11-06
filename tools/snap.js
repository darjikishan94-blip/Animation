// Snapshot chosen moments of question pages into contact sheets (3 x 3 tiles per sheet).
//   node tools/snap.js <chapterdir> <outdir> q01:0.7 q03:0.8a ...   (suffix q = question run; default = answer run)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [dir, out, ...specs] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1366, height: 657 } });
  const shots = [];
  for (const sp of specs) {
    const [q, fr] = sp.split(':'), qrun = fr.endsWith('q'), v = Math.round(parseFloat(fr) * 1000);
    await p.goto('about:blank'); await p.goto('file://' + path.resolve(dir, q + '.html')); await p.waitForTimeout(120);
    if (!qrun) await p.click('#q [data-act="answers"]');
    await p.evaluate(v => { const r = document.querySelector('#q .scrub'); r.value = v; r.dispatchEvent(new Event('input')); }, v);
    await p.waitForTimeout(40);
    const f = path.join(out, `${q}-${fr}.png`); await p.locator('#q .stage').screenshot({ path: f }); shots.push([sp, f]);
  }
  const s = await b.newPage({ viewport: { width: 1940, height: 1100 } });
  for (let i = 0; i < shots.length; i += 9) {
    const tiles = shots.slice(i, i + 9).map(([sp, f]) => `<div style="position:relative"><img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:640px;display:block"><b style="position:absolute;right:4px;top:2px;background:#ff0;font:12px sans-serif">${sp}</b></div>`);
    await s.setContent(`<body style="margin:0;background:#888;display:grid;grid-template-columns:repeat(3,640px);gap:4px;padding:4px">${tiles.join('')}</body>`);
    await s.screenshot({ path: path.join(out, `snap-${String(i / 9).padStart(2, '0')}.png`), fullPage: true });
  }
  await b.close();
})();
