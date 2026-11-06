// Browser check for one chapter of question pages.
//   node tools/test_pages.js class-11/physics/ch04-laws-of-motion <out-dir>
// For every qNN.html: plays the question run and the solution run end to end (both themes), reports page errors,
// checks that the picture and its control bar fit a 1366x657 window, and saves contact sheets of solution frames.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const dir = path.resolve(process.argv[2]), out = path.resolve(process.argv[3] || 'shots');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const files = fs.readdirSync(dir).filter(f => /^q\d+\.html$/.test(f)).sort();
  const b = await chromium.launch();
  const report = [];
  const frames = [];
  for (const scheme of ['light', 'dark']) {
    const p = await b.newPage({ viewport: { width: 1366, height: 657 }, colorScheme: scheme });
    let errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts\.g/.test(m.text())) errs.push(m.text()); });
    for (const f of files) {
      errs = [];
      await p.goto('file://' + path.join(dir, f)); await p.waitForTimeout(150);
      const animated = await p.$('#q canvas') !== null;
      let fit = '';
      if (animated) {
        // sweep the whole run; every 20th step, look for drawing that bleeds past the picture's edges
        // (the left edge, and the strip between the divider at x = 610 and the text column at x = 630)
        const sweep = () => p.evaluate(() => {
          const r = document.querySelector('#q .scrub'), cv = document.querySelector('#q canvas'), c = cv.getContext('2d'), k = cv.width / 960, hits = [];
          const bgc = c.getImageData(2, 2, 1, 1).data;
          const dirty = (x0, x1) => { const d = c.getImageData(Math.round(x0 * k), Math.round(20 * k), Math.max(1, Math.round((x1 - x0) * k)), Math.round(490 * k)).data;
            for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - bgc[0]) + Math.abs(d[i + 1] - bgc[1]) + Math.abs(d[i + 2] - bgc[2]) > 60) return true; return false; };
          // the right-hand strip is only checked on pages with the standard divider at x = 610 (a solid rule from top to bottom)
          const rule = (() => { const d = c.getImageData(Math.round(610 * k), Math.round(100 * k), 1, Math.round(400 * k)).data;
            for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - bgc[0]) + Math.abs(d[i + 1] - bgc[1]) + Math.abs(d[i + 2] - bgc[2]) < 8) return false; return true; })();
          for (let v = 0; v <= 1000; v += 4) { r.value = v; r.dispatchEvent(new Event('input'));
            if (v % 80 === 0) { if (dirty(0, 2)) hits.push(`left@${v / 10}%`); if (rule && dirty(613, 620)) hits.push(`right@${v / 10}%`); } }
          return hits;
        });
        const h1 = await sweep();
        await p.click('#q [data-act="answers"]'); const h2 = await sweep();
        if (h1.length) errs.push('question run bleeds: ' + h1.join(' ')); if (h2.length) errs.push('answer run bleeds: ' + h2.join(' '));
        const m = await p.evaluate(() => ({ bar: document.querySelector('#q .transport').getBoundingClientRect().bottom, w: document.querySelector('#q .stage').getBoundingClientRect().width }));
        fit = m.bar <= 657 ? `fits (${Math.round(m.w)} px)` : `DOES NOT FIT (bar ends ${Math.round(m.bar)})`;
        if (scheme === 'light') {
          for (const fr of [0.3, 0.75]) {
            await p.evaluate(v => { const r = document.querySelector('#q .scrub'); r.value = v; r.dispatchEvent(new Event('input')); }, Math.round(fr * 1000));
            await p.waitForTimeout(40);
            const shot = path.join(out, `${f.replace('.html', '')}-${fr}.png`);
            await p.locator('#q .stage').screenshot({ path: shot }); frames.push(shot);
          }
        }
      } else {
        await p.click('#show');
      }
      report.push(`${scheme} ${f}: ${animated ? 'animated' : 'worked answer'} ${fit} ${errs.length ? 'ERRORS: ' + errs.join(' | ') : 'ok'}`);
    }
    await p.close();
  }
  const s = await b.newPage({ viewport: { width: 1940, height: 1100 } });
  for (let i = 0; i < frames.length; i += 4) {
    const imgs = frames.slice(i, i + 4).map(f => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64'));
    await s.setContent(`<body style="margin:0;background:#888;display:grid;grid-template-columns:960px 960px;gap:6px;padding:6px">${imgs.map(x => `<img src="${x}" style="width:960px">`).join('')}</body>`);
    await s.screenshot({ path: path.join(out, `sheet-${String(i / 4).padStart(2, '0')}.png`), fullPage: true });
  }
  await b.close();
  console.log(report.join('\n'));
})();
