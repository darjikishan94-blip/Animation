// Quick load check: reports script errors for every qNN.html in a chapter folder.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => {
  const dir = path.resolve(process.argv[2]); const b = await chromium.launch(); const p = await b.newPage();
  let errs = []; p.on('pageerror', e => errs.push(e.message));
  for (const f of fs.readdirSync(dir).filter(f => /^q\d+\.html$/.test(f)).sort()) {
    errs = []; await p.goto('file://' + path.join(dir, f)); await p.waitForTimeout(100);
    const ok = await p.$('#q .scrub') || !(await p.$('#q canvas'));
    if (errs.length || !ok) console.log(f, errs.join(' | ') || 'player did not mount');
  }
  await b.close();
})();
