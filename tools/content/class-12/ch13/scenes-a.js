//@@ q06
const SCENE = (() => {
  const CX = 300, PY = 200, D = 6;
  const qStages = [
    { title: 'Splitting iron?', dur: 5, text: 'Imagine an Fe-56 nucleus (55.93494 u) splitting into two Al-28 nuclei (27.98191 u each).' },
    { title: 'What is asked', dur: 4, text: 'Work out Q. Is this fission energetically possible?' },
  ];
  const stages = [
    { title: 'Weigh both sides', dur: D, text: 'Two Al-28: 2 × 27.98191 = 55.96382 u, more than 55.93494 u.', ans: 'The products are heavier by 0.02888 u.' },
    { title: 'Q-value', dur: 5, text: 'Q = [m(Fe) − 2m(Al)] × 931.5 MeV/u.', ans: 'Q ≈ −26.9 MeV: energy would have to be put in. Not possible on its own.' },
  ];
  function nucleus(ctx, x, y, r, label_) { ctx.save(); for (let i = 0; i < 18; i++) { const a = i * 2.4, rr = r * Math.sqrt((i + 0.5) / 18); ball(ctx, x + rr * Math.cos(a), y + rr * Math.sin(a), r * 0.28, i % 2 ? P.force : P.objFill2); } ctx.restore(); label(ctx, label_, x, y + r + 18, { align: 'center', weight: 800, size: 13 }); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const tilt = ans ? -0.12 * smooth(clamp(t / 3)) : 0;   // heavier side (right) goes down: canvas angle positive = clockwise
    ctx.save(); ctx.translate(CX, PY); ctx.rotate(-tilt); ctx.strokeStyle = P.ink; ctx.lineWidth = 4; seg(ctx, -200, 0, 200, 0); ctx.restore();
    ctx.save(); ctx.fillStyle = P.ink2; ctx.beginPath(); ctx.moveTo(CX, PY); ctx.lineTo(CX - 20, PY + 60); ctx.lineTo(CX + 20, PY + 60); ctx.closePath(); ctx.fill(); ctx.restore();
    const ly = PY + 200 * Math.sin(tilt), ry = PY - 200 * Math.sin(tilt);
    vline(ctx, CX - 200, ly, ly + 60, P.ink2, 1.5); vline(ctx, CX + 200, ry, ry + 60, P.ink2, 1.5);
    nucleus(ctx, CX - 200, ly + 100, 40, 'Fe-56: 55.93494 u');
    nucleus(ctx, CX + 170, ry + 100, 28, ''); nucleus(ctx, CX + 232, ry + 100, 28, ''); label(ctx, '2 × Al-28: 55.96382 u', CX + 200, ry + 150, { align: 'center', weight: 800, size: 13 });
    if (ans) {
      const st = stageAt(stages, t);
      label(ctx, 'products heavier by 0.02888 u', CX, 420, { align: 'center', weight: 800, size: 15, color: P.force });
      if (st >= 1) label(ctx, 'Q ≈ −26.9 MeV: not possible', CX, 456, { align: 'center', weight: 800, size: 17, color: P.loss });
      partsPanel(ctx, 630, 34, 300, 'Working', ['2m(Al) − m(Fe) = 0.02888 u', 'Q ≈ −26.9 MeV < 0: not possible'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The Q-value of the fission; whether it is energetically possible.']);
    note(ctx, 'the tilt exaggerates the 0.05% mass difference; nucleons illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const G = { x: 330, y: 90, w: 240, h: 300, x0: 0, x1: 16, y0: 0, y1: 1500, xt: [4, 8, 12], yt: [360, 1000], xl: 'r (fm)', yl: 'U (keV)' }, R = 2, S = 14, D = 8;   // 14 px per fm
  const U = r => 1440 / r;   // keV, r in fm (ke² = 1.44 MeV fm)
  const qStages = [
    { title: 'Two deuterons head on', dur: 6, text: 'Two deuterons, each a hard sphere of radius 2.0 fm with charge +e, move towards each other.' },
    { title: 'What is asked', dur: 4, text: 'The height of the Coulomb barrier: their potential energy when they just touch.' },
  ];
  const stages = [
    { title: 'Approach', dur: D, text: 'The electric potential energy U = ke²/r grows as they come closer.', ans: '' },
    { title: 'Touching', dur: 5, text: 'They touch at r = 2 × 2.0 = 4.0 fm.', ans: 'U = 9 × 10⁹ × (1.6 × 10⁻¹⁹)²/4.0 × 10⁻¹⁵ ≈ 5.76 × 10⁻¹⁴ J ≈ 360 keV.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const r = ans ? (t < stages[0].t1 ? 16 - 12 * smooth(clamp(t / (D - 1))) : 4) : 16;   // separation in fm
    const cx = 165, y = 270, x1 = cx - S * r / 2, x2 = cx + S * r / 2;
    [x1, x2].forEach(x => { ball(ctx, x, y, S * R, P.force); label(ctx, 'd', x, y, { align: 'center', weight: 800, size: 14, color: P.sheet, halo: false }); });
    dim(ctx, x1, x2, y + 50, P.ink2); label(ctx, `r = ${r.toFixed(1)} fm`, cx, y + 66, { align: 'center', weight: 700, size: 13 });
    label(ctx, 'radius 2.0 fm each', cx, y - 50, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const g = axes(ctx, G); plot(ctx, g, U, 1, 16, P.pe);
      ball(ctx, g.X(r), g.Y(Math.min(U(r), 1500)), 6, P.pe);
      if (t >= stages[1].t0) { hline(ctx, g.X(0), g.X(4), g.Y(360), P.accent, 1.5, [4, 3]); label(ctx, 'barrier ≈ 360 keV', g.X(4) + 10, g.Y(360) - 14, { weight: 800, size: 14, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['U = ke²/r', 'At r = 4.0 fm: U ≈ 5.76 × 10⁻¹⁴ J ≈ 360 keV'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The height of the potential barrier for a head-on collision of two deuterons.']);
    note(ctx, ans ? '14 px per fm; U(r) computed (ke² = 1.44 MeV fm)' : '14 px per fm');
  }
  return { qStages, stages, draw };
})();
