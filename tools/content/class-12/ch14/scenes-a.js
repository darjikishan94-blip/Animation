//@@ q05
const SCENE = (() => {
  const XJ = 300, D = 7;
  const qStages = [
    { title: 'A p-n junction', dur: 5, text: 'At the junction a depletion layer and a potential barrier V₀ form. Now a forward bias is applied (p side to +).' },
    { title: 'What is asked', dur: 4, text: 'Does forward bias (a) raise the barrier, (b) stop the majority current, (c) lower the barrier, (d) none?' },
  ];
  const stages = [
    { title: 'No bias', dur: 5, text: 'The built-in potential V₀ holds back most majority carriers.', ans: '' },
    { title: 'Forward bias', dur: D, text: 'The applied V opposes V₀: the barrier drops to V₀ − V and the depletion layer narrows.', ans: '(c) It lowers the potential barrier; the majority current rises sharply.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1, f = st === 1 ? smooth(clamp((t - stages[1].t0) / 3)) : 0, W = 70 * (1 - 0.5 * f), Hb = 120 * (1 - 0.6 * f);
    ctx.save(); ctx.fillStyle = P.accentSoft; ctx.fillRect(60, 80, XJ - 60, 140); ctx.fillStyle = P.water; ctx.globalAlpha = 0.6; ctx.fillRect(XJ, 80, 540 - XJ, 140); ctx.restore();
    ctx.save(); ctx.fillStyle = P.objFill2; ctx.globalAlpha = 0.7; ctx.fillRect(XJ - W / 2, 80, W, 140); ctx.restore();
    label(ctx, 'p', 100, 100, { weight: 800, size: 18 }); label(ctx, 'n', 510, 100, { weight: 800, size: 18 }); label(ctx, 'depletion layer', XJ, 70, { align: 'center', weight: 700, size: 12 });
    for (let k = 0; k < 12; k++) { const x = 80 + (k * 37) % 200, y = 100 + (k * 53) % 110; if (x < XJ - W / 2 - 6) label(ctx, '+', x, y, { align: 'center', weight: 800, size: 13, color: P.force }); const x2 = XJ + 20 + (k * 41) % 210; if (x2 > XJ + W / 2 + 6) label(ctx, '−', x2, 100 + (k * 47) % 110, { align: 'center', weight: 800, size: 14, color: P.vel }); }
    if (ans) {
      const BY = 440; label(ctx, 'energy of an electron across the junction (the barrier it must climb from n to p)', 300, 290, { align: 'center', size: 12, color: P.ink2 });
      ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60, BY - Hb); ctx.lineTo(XJ - W / 2, BY - Hb); ctx.bezierCurveTo(XJ, BY - Hb, XJ, BY, XJ + W / 2, BY); ctx.lineTo(540, BY); ctx.stroke(); ctx.restore();
      vdim(ctx, 570, BY - Hb, BY, P.ink2); label(ctx, st === 0 ? 'V₀' : 'V₀ − V', 562, BY - Hb / 2, { align: 'right', weight: 800, size: 14, color: P.accent });
      if (st === 1) { wire(ctx, [[60, 150], [30, 150], [30, 240], [270, 240]]); wire(ctx, [[330, 240], [570, 240], [570, 150], [540, 150]]); cell(ctx, 290, 240, 310, 240); label(ctx, '+', 284, 220, { weight: 800, size: 13, color: P.force }); label(ctx, 'V (forward)', 300, 252 + 12, { align: 'center', weight: 700, size: 12 }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Unbiased: barrier V₀', '(c) Forward bias lowers the barrier'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['What forward bias does: (a) raises the barrier, (b) reduces the majority current to zero, (c) lowers the barrier, (d) none of these.']);
    note(ctx, 'sizes illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const D = 8, W = 2 * Math.PI * 50;
  const gs = y => ({ x: 60, y, w: 470, h: 110, x0: 0, x1: 60, y0: -1.2, y1: 1.2, xt: [20, 40, 60], yt: [], xl: 't (ms)' });
  const qStages = [
    { title: 'Rectifying 50 Hz ac', dur: 5, text: 'A 50 Hz alternating voltage is rectified, (a) half-wave, (b) full-wave.' },
    { title: 'What is asked', dur: 4, text: 'The output frequency in each case.' },
  ];
  const stages = [
    { title: 'Half-wave', dur: D, text: 'Only the positive half of each cycle gets through.', ans: 'One pulse per cycle: 50 Hz.' },
    { title: 'Full-wave', dur: D, text: 'Both halves are turned the same way.', ans: 'Two pulses per cycle: 100 Hz.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const te = 60 * clamp(t / (D - 2)), f = s => Math.sin(W * s / 1000);
    label(ctx, 'input 50 Hz', 70, 34, { weight: 800, size: 13 }); let g = axes(ctx, gs(40)); plot(ctx, g, f, 0, ans ? 60 : te, P.vel);
    if (ans) {
      const st = stageAt(stages, t), k1 = st === 0 ? te : 60, k2 = st === 1 ? 60 * clamp((t - stages[1].t0) / (D - 2)) : 0;
      label(ctx, 'half-wave output: 50 Hz', 70, 184, { weight: 800, size: 13, color: P.force }); g = axes(ctx, gs(190)); plot(ctx, g, s => Math.max(0, f(s)), 0, k1, P.force);
      if (st >= 1) { label(ctx, 'full-wave output: 100 Hz', 70, 334, { weight: 800, size: 13, color: P.leaf }); g = axes(ctx, gs(340)); plot(ctx, g, s => Math.abs(f(s)), 0, k2, P.leaf); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['Half-wave: 50 Hz', 'Full-wave: 100 Hz'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The output frequency of a half-wave rectifier, and of a full-wave rectifier, for a 50 Hz input.']);
    note(ctx, 'three cycles (60 ms); amplitudes scaled to 1');
  }
  return { qStages, stages, draw };
})();
