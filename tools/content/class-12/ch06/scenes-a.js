//@@ q02
const SCENE = (() => {
  const C1 = [150, 270], C2 = [455, 270], R = 90, D = 8;
  const gA = ph => 0.32 * (0.5 + 0.5 * Math.sin(3 * ph + 1)) * (0.6 + 0.4 * Math.cos(5 * ph));   // inward dents of the irregular loop
  function shapeA(s) { const p = []; for (let i = 0; i <= 120; i++) { const ph = i / 120 * 2 * Math.PI, r = R * (1 - (1 - s) * gA(ph)); p.push([C1[0] + r * Math.cos(ph), C1[1] - r * Math.sin(ph)]); } return p; }
  function shapeB(s) { const p = [], rx = R * (1 + 0.35 * s), ry = R * (1 - 0.88 * s); for (let i = 0; i <= 120; i++) { const ph = i / 120 * 2 * Math.PI; p.push([C2[0] + rx * Math.cos(ph), C2[1] - ry * Math.sin(ph)]); } return p; }
  const qStages = [
    { title: 'Fig. 6.16', dur: D, text: '(a) In a field into the page, an irregular wire loop turns into a circle. (b) In a field out of the page, a circular loop is squashed into a narrow straight wire.' },
    { title: 'What is asked', dur: 4, text: 'Use Lenz’s law to find the direction of the induced current in each.' },
  ];
  const stages = [
    { title: 'Flux changes', dur: D, text: '(a) The area grows, so the flux into the page grows. (b) The area shrinks, so the flux out of the page falls.', ans: 'Dots show the induced current while the shape is changing.' },
    { title: 'Directions', dur: 5, text: 'The induced current opposes the change: (a) its field points out of the page; (b) its field points out of the page too.', ans: '(a) along adcb (b) along a′d′c′b′ — both anticlockwise as seen.' },
  ];
  function sym(ctx, cx, out) { for (let x = cx - 126; x <= cx + 130; x += 42) for (let y = 110; y <= 440; y += 42) fieldSym(ctx, x, y, out, 5, P.ink2); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); vline(ctx, 303, 40, 500, P.rule, 1);
    sym(ctx, C1[0], false); sym(ctx, C2[0], true);
    label(ctx, '(a) B into page', C1[0], 60, { align: 'center', weight: 800, size: 14 }); label(ctx, '(b) B out of page', C2[0], 60, { align: 'center', weight: 800, size: 14 });
    const s = clamp(t / (D - 1));
    const A = shapeA(s), B = shapeB(s);
    wire(ctx, A, P.obj, 3); wire(ctx, B, P.obj, 3);
    const at = (pts, deg) => pts[Math.round(deg / 3)];
    [['a', 270], ['b', 180], ['c', 90], ['d', 0]].forEach(([n, deg]) => { const pa = at(A, deg), pb = at(B, deg), ux = Math.cos(deg * Math.PI / 180), uy = -Math.sin(deg * Math.PI / 180);
      label(ctx, n, pa[0] + 16 * ux, pa[1] + 16 * uy, { align: 'center', weight: 800, size: 14 }); label(ctx, n + '′', pb[0] + 16 * ux, pb[1] + 16 * uy, { align: 'center', weight: 800, size: 14 }); });
    if (ans && s < 1) { flow(ctx, A, t * 40, P.force, 24, 3.5); flow(ctx, B, t * 40, P.force, 24, 3.5); }
    if (ans && t >= stages[1].t0) { label(ctx, 'adcb', C1[0], 470, { align: 'center', weight: 800, size: 16, color: P.force }); label(ctx, 'a′d′c′b′', C2[0], 470, { align: 'center', weight: 800, size: 16, color: P.force }); rotArrow(ctx, C1[0], C1[1], 30, false, P.force); rotArrow(ctx, C2[0], C2[1], 24, false, P.force); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) flux in ↑ → current anticlockwise', '(a) along adcb; (b) along a′d′c′b′'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The direction of the induced current (a) as the irregular loop becomes a circle, (b) as the circle is squashed flat.']);
    note(ctx, ans ? 'shapes illustrative; dots show the induced current while the shape changes' : 'shapes illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const XB = 200, S = 20, D = 10, GX = 405, GW = 175;   // field edge at XB; 20 px per cm
  const qStages = [
    { title: 'Loops leaving a field', dur: D, text: 'An 8 cm × 2 cm loop with a small cut moves out of a 0.3 T field at 1 cm/s: (a) across its long side, (b) along it.' },
    { title: 'What is asked', dur: 4, text: 'The emf across the cut in each case, and how long it lasts.' },
  ];
  const stages = [
    { title: 'Flux changes at the edge', dur: D, text: 'While the loop crosses the edge, the flux changes at B l v, with l the side along the edge.', ans: '(a) l = 8 cm: 2.4 × 10⁻⁴ V for 2 s. (b) l = 2 cm: 6 × 10⁻⁵ V for 8 s.' },
  ];
  function loop(ctx, x, y, w, h) { ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + h / 2 - 4); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h / 2 + 4); ctx.stroke(); ctx.restore(); }
  function graph(ctx, y, lvl, dur, tt, name) {
    const g = axes(ctx, { x: GX, y, w: GW, h: 100, x0: 0, x1: 10, y0: 0, y1: 3, xt: [2, 8], yt: [lvl], xl: 't (s)', yl: name });
    plot(ctx, g, s => (s < dur ? lvl : 0), 0, tt, P.force);
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.accentSoft; ctx.globalAlpha = 0.5; ctx.fillRect(20, 40, XB - 20, 450); ctx.restore();
    for (let x = 40; x < XB; x += 40) for (let y = 60; y < 480; y += 40) fieldSym(ctx, x, y, false, 5, P.ink2);
    vline(ctx, XB, 40, 490, P.ink2, 1.5, [5, 4]); label(ctx, 'B = 0.3 T', 30, 30, { weight: 700, size: 13, color: P.ink2 });
    const tt = clamp(t, 0, D), da = Math.min(S * tt, 2 * S + 30), db = Math.min(S * tt, 8 * S + 2);   // each loop shown until just clear of the field
    loop(ctx, XB - 2 * S + da, 70, 2 * S, 8 * S); label(ctx, '(a)', XB - 2 * S + da - 20, 60, { weight: 800, size: 14 });
    loop(ctx, XB - 8 * S + db, 320, 8 * S, 2 * S); label(ctx, '(b)', XB - 8 * S + db, 300, { weight: 800, size: 14 });
    vec(ctx, XB + da + 8, 150, 26, 0, 'v', P.vel, { side: -1, at: 1, italic: true, lw: 3, head: 9 }); vec(ctx, XB + db + 8, 340, 26, 0, 'v', P.vel, { side: -1, at: 1, italic: true, lw: 3, head: 9 });
    if (ans) {
      graph(ctx, 70, 2.4, 2, tt, 'ε (10⁻⁴ V)'); graph(ctx, 320, 0.6, 8, tt, 'ε (10⁻⁴ V)');
      label(ctx, '(a) 2.4 × 10⁻⁴ V for 2 s', GX, 210, { weight: 800, size: 13, color: P.force }); label(ctx, '(b) 6 × 10⁻⁵ V for 8 s', GX, 460, { weight: 800, size: 13, color: P.force });
      clock(ctx, 60, 510 - 6, tt);
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) Blv = 0.3 × 0.08 × 0.01 = 2.4 × 10⁻⁴ V, 2 s; (b) 0.3 × 0.02 × 0.01 = 6 × 10⁻⁵ V, 8 s'], 0, false);
    } else askedPanel(ctx, 630, 34, 300, ['The emf across the cut for motion normal to (a) the longer side, (b) the shorter side.', 'How long the voltage lasts in each case.']);
    if (!ans) note(ctx, '20 px per cm; real time');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const CX = 220, CY = 270, R = 190, W = 1.2;   // shown at 1.2 rad/s (really 400 rad/s)
  const qStages = [
    { title: 'A rotating rod', dur: 6, text: 'A 1.0 m metal rod turns at 400 rad/s about one end; its other end slides on a metal ring. A 0.5 T field is parallel to the axis.' },
    { title: 'What is asked', dur: 4, text: 'The emf between the centre and the ring.' },
  ];
  const stages = [
    { title: 'Speed along the rod', dur: 6, text: 'A piece at distance r moves at ωr: its emf is Bωr dr. Speeds grow from 0 at the centre to ωR at the ring.', ans: 'Average speed = ωR/2.' },
    { title: 'Total emf', dur: 5, text: 'ε = BR × (ωR/2) = ½BωR².', ans: 'ε = ½ × 0.5 × 400 × 1.0² = 100 V.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let x = 40; x <= 580; x += 40) for (let y = 60; y <= 490; y += 40) fieldSym(ctx, x, y, true, 4, P.grid);
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(CX, CY, R, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    const a = -W * t, ex = CX + R * Math.cos(a), ey = CY + R * Math.sin(a);
    ctx.save(); ctx.strokeStyle = P.wood; ctx.lineWidth = 7; seg(ctx, CX, CY, ex, ey); ctx.restore(); ball(ctx, CX, CY, 7, P.ink);
    rotArrow(ctx, CX, CY, 60, false, P.acc); label(ctx, 'ω = 400 rad/s', CX, CY + 84, { align: 'center', weight: 700, size: 13, color: P.acc });
    label(ctx, 'B = 0.5 T (out of page)', 590, 30, { align: 'right', weight: 700, size: 13, color: P.ink2 }); label(ctx, 'R = 1.0 m', CX + R + 10, CY + 4, { weight: 700, size: 13 });
    if (ans) {
      const st = stageAt(stages, t);
      [0.25, 0.5, 0.75, 1].forEach(f => { const x = CX + f * R * Math.cos(a), y = CY + f * R * Math.sin(a); vec(ctx, x, y, 50 * f * Math.sin(a), -50 * f * Math.cos(a), '', P.vel, { lw: 2.5, head: 8 }); });
      wire(ctx, [[CX, CY], [CX, 500], [470, 500], [470, CY + R * 0.4]]); wire(ctx, [[470, CY + R * 0.4 - 40], [470, CY - R + 40], [CX + R * 0.7, CY - R * 0.72]]);
      ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(470, CY + R * 0.4 - 20, 20, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); label(ctx, 'V', 470, CY + R * 0.4 - 20, { align: 'center', weight: 800, size: 15 });
      if (st >= 1) label(ctx, 'ε = 100 V', 470, CY + R * 0.4 + 20, { align: 'left', weight: 800, size: 16, color: P.accent, });
      partsPanel(ctx, 630, 34, 300, 'Working', ['Speeds 0 to ωR: average ωR/2', 'ε = ½BωR² = 100 V'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The emf developed between the centre and the ring.']);
    note(ctx, 'rotation slowed down; blue arrows: speeds of points on the rod (to scale with each other)');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const X0 = 100, X1 = 500, Y0 = 130, D = 6;
  const qStages = [
    { title: 'A falling wire', dur: D, text: 'A horizontal wire 10 m long, lying east–west, falls at 5.0 m/s across the horizontal component of the earth’s field, 0.30 × 10⁻⁴ T.' },
    { title: 'What is asked', dur: 4, text: '(a) The emf. (b) Its direction. (c) Which end is at higher potential?' },
  ];
  const stages = [
    { title: 'Emf', dur: 5, text: 'ε = Blv.', ans: '(a) 0.30 × 10⁻⁴ × 10 × 5.0 = 1.5 × 10⁻³ V.' },
    { title: 'Direction', dur: D, text: 'Looking north, B points into the page. On a positive charge, q(v × B) with v down points east.', ans: '(b) The emf acts from west to east.' },
    { title: 'Higher potential', dur: 5, text: 'Positive charge piles up at the east end.', ans: '(c) The eastern end is at the higher potential.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let x = 60; x <= 580; x += 44) for (let y = 70; y <= 470; y += 44) fieldSym(ctx, x, y, false, 5, P.grid);
    label(ctx, 'looking north: B_H into the page', 590, 30, { align: 'right', weight: 700, size: 13, color: P.ink2 });
    label(ctx, 'W', 40, 300, { align: 'center', weight: 800, size: 16 }); label(ctx, 'E', 570, 300, { align: 'center', weight: 800, size: 16 });
    const per = ans ? ((t % 5) / 5) : clamp(t / (D - 1)), y = Y0 + 260 * per;
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 6; seg(ctx, X0, y, X1, y); ctx.restore();
    vec(ctx, 300, y + 10, 0, 50, 'v = 5.0 m/s', P.vel, { side: -1, at: 0.6, lw: 3, align: 'left', off: 10 });
    label(ctx, '10 m', 300, y - 16, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      const st = stageAt(stages, t);
      if (st >= 1) { vec(ctx, 380, y - 40, 60, 0, 'force on + charge', P.force, { side: -1, at: 0.5, lw: 3, head: 9 }); }
      if (st >= 2) { label(ctx, '+', X1 - 8, y - 18, { align: 'center', weight: 800, size: 20, color: P.force }); label(ctx, '−', X0 + 8, y - 18, { align: 'center', weight: 800, size: 20, color: P.vel }); label(ctx, 'east end higher', X1, y + 30, { align: 'right', weight: 800, size: 14, color: P.force }); }
      label(ctx, 'ε = 1.5 × 10⁻³ V', 300, 500, { align: 'center', weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) ε = Blv = 1.5 × 10⁻³ V', '(b) From west to east', '(c) The eastern end'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The instantaneous emf.', '(b) The direction of the emf.', '(c) The end at higher potential.']);
    note(ctx, 'not to scale');
  }
  return { qStages, stages, draw };
})();
