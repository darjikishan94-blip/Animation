//@@ q02
const SCENE = (() => {
  const MX = 140, MY = 260, G = { x: 300, y: 110, w: 250, h: 300, x0: 0, x1: 360, y0: -0.06, y1: 0.06, xt: [90, 180, 270, 360], yt: [-0.048, 0.048], xl: 'θ (°)', yl: 'U (J)' }, D = 10;
  const U = th => -0.32 * 0.15 * Math.cos(th * Math.PI / 180);
  const qStages = [
    { title: 'A magnet free to turn', dur: 5, text: 'A short bar magnet, m = 0.32 J T⁻¹, in a uniform field of 0.15 T, free to rotate in the plane of the field.' },
    { title: 'What is asked', dur: 4, text: 'Which orientations are (a) stable and (b) unstable equilibrium? What is U in each?' },
  ];
  const stages = [
    { title: 'Energy against angle', dur: D, text: 'Turn the magnet slowly through a full circle: U = −mB cos θ.', ans: 'Equilibrium (no torque) only at θ = 0° and 180°.' },
    { title: 'Stable', dur: 5, text: 'At θ = 0° U is a minimum: a small twist is pulled back.', ans: '(a) m along B: U = −0.048 J.' },
    { title: 'Unstable', dur: 5, text: 'At θ = 180° U is a maximum: a small twist runs away.', ans: '(b) m against B: U = +0.048 J.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let y = 120; y <= 400; y += 56) arrow(ctx, 30, y, 260, y, P.grid, { lw: 1.5, head: 9 });
    label(ctx, 'B = 0.15 T', 250, 96, { align: 'right', weight: 700, size: 13, color: P.ink2 });
    let th = 30;
    if (ans) { const st = stageAt(stages, t); th = st === 0 ? 360 * clamp(t / (D - 1)) : st === 1 ? 0 : 180; }
    barMagnet(ctx, MX, MY, 130, 26, -th * Math.PI / 180);
    if (ans) {
      const st = stageAt(stages, t), g = axes(ctx, G);
      plot(ctx, g, U, 0, st === 0 ? th : 360, P.pe);
      ball(ctx, g.X(th), g.Y(U(th)), 6, P.pe);
      if (st >= 1) { label(ctx, 'stable', g.X(0) + 10, g.Y(U(0)) + 18, { weight: 800, size: 13, color: P.accent }); label(ctx, '−0.048 J', MX, 440, { align: 'center', weight: 800, size: 15, color: P.accent }); }
      if (st >= 2) { label(ctx, 'unstable', g.X(180), g.Y(U(180)) - 18, { align: 'center', weight: 800, size: 13, color: P.force }); label(ctx, '+0.048 J', MX, 470, { align: 'center', weight: 800, size: 15, color: P.force }); }
      label(ctx, `θ = ${Math.round(th)}°`, MX, 180, { align: 'center', weight: 800, size: 14 });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['U = −mB cos θ', '(a) θ = 0°: U = −4.8 × 10⁻² J', '(b) θ = 180°: U = +4.8 × 10⁻² J'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The orientation of stable equilibrium and its potential energy.', '(b) The orientation of unstable equilibrium and its potential energy.']);
    note(ctx, ans ? 'U(θ) computed; magnet size illustrative' : 'magnet size illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const CX = 300, CY = 270, HL = 90, HW = 28;   // solenoid half-length, half-width (px)
  let lines = null;
  function Bf(x, y) { const ax = x - (CX + HL), ay = y - CY, bx = x - (CX - HL), by = y - CY, ra = Math.hypot(ax, ay) ** 3, rb = Math.hypot(bx, by) ** 3; return [ax / ra - bx / rb, ay / ra - by / rb]; }
  function build() {
    lines = [];
    for (const deg of [-50, -70, -90, -110, -130, -145]) {
      const a = deg * Math.PI / 180; let x = CX + HL + 46 * Math.cos(a), y = CY + 46 * Math.sin(a); const pts = [[CX + HL, CY - 8], [x, y]];
      for (let i = 0; i < 1400; i++) { const [ex, ey] = Bf(x, y), L = Math.hypot(ex, ey); x += 3 * ex / L; y += 3 * ey / L; pts.push([x, y]); if ((Math.abs(x - CX) < HL + 2 && Math.abs(y - CY) < HW + 2) || x < 8 || x > 600 || y < 26 || y > 510) break; }
      lines.push(pts);
    }
  }
  const qStages = [
    { title: 'A current-carrying solenoid', dur: 5, text: '800 turns, cross-section 2.5 × 10⁻⁴ m², current 3.0 A.' },
    { title: 'What is asked', dur: 4, text: 'In what sense does it act like a bar magnet? What is its magnetic moment?' },
  ];
  const stages = [
    { title: 'Its field', dur: 6, text: 'Each turn is a small current loop. Together their field leaves one end, loops round outside and re-enters the other end; inside it runs along the axis.', ans: 'Exactly the pattern of a bar magnet: one end acts as N, the other as S.' },
    { title: 'Magnetic moment', dur: 5, text: 'm = NIA.', ans: 'm = 800 × 3.0 × 2.5 × 10⁻⁴ = 0.6 J T⁻¹, along the axis.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    if (!lines) build();
    if (ans) { const f = clamp(t / 3); ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.75 * f; lines.forEach(p => { poly(ctx, p); poly(ctx, p.map(([x, y]) => [x, 2 * CY - y])); }); ctx.restore(); [-14, 0, 14].forEach(dy => arrow(ctx, CX - HL + 10, CY + dy, CX + HL - 10, CY + dy, P.accent, { lw: 1.5, head: 9, alpha: f })); }
    ctx.save(); ctx.fillStyle = P.objFill; ctx.globalAlpha = 0.5; ctx.fillRect(CX - HL, CY - HW, 2 * HL, 2 * HW); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.wood; ctx.lineWidth = 3; for (let i = 0; i <= 16; i++) { const x = CX - HL + i * 2 * HL / 16; seg(ctx, x - 5, CY - HW, x + 5, CY + HW); } ctx.restore();
    fieldSym(ctx, CX - 60, CY - HW, true, 6, P.force); fieldSym(ctx, CX - 60, CY + HW, false, 6, P.force); label(ctx, 'I = 3.0 A', 40, 60, { weight: 700, size: 14, color: P.force });
    label(ctx, '800 turns, A = 2.5 × 10⁻⁴ m²', 40, 84, { weight: 700, size: 14 });
    if (ans) { label(ctx, 'N', CX + HL + 22, CY + 4, { weight: 800, size: 18, color: P.force }); label(ctx, 'S', CX - HL - 34, CY + 4, { weight: 800, size: 18, color: P.vel });
      if (t >= stages[1].t0) { vec(ctx, CX - 60, 470, 120, 0, 'm = 0.6 J T⁻¹', P.acc, { side: 1, at: 0.5, lw: 4 }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Field like a bar magnet’s: N and S ends', 'm = NIA = 0.6 J T⁻¹'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['In what sense the solenoid acts like a bar magnet.', 'Its magnetic moment.']);
    note(ctx, ans ? 'outside lines computed for a thin solenoid; current ⊙ on top, ⊗ below' : 'current comes out of the page on top (⊙), goes in below (⊗)');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const MX = 160, MY = 250, mB = 0.33, D = 6;
  const qStages = [
    { title: 'A magnet along a field', dur: 5, text: 'A bar magnet, m = 1.5 J T⁻¹, lies along a uniform field of 0.22 T.' },
    { title: 'What is asked', dur: 5, text: 'Work by an external torque to turn it (i) normal to the field, (ii) opposite to it; the torque on it in each case.' },
  ];
  const stages = [
    { title: 'Turn to 90°', dur: D, text: 'Work = rise in U = mB(cos θ₁ − cos θ₂).', ans: '(i) W = mB(1 − 0) = 0.33 J; τ = mB sin 90° = 0.33 N m.' },
    { title: 'Turn on to 180°', dur: D, text: 'Keep turning until the moment points against the field.', ans: '(ii) W = mB(1 + 1) = 0.66 J; τ = mB sin 180° = 0.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let y = 110; y <= 390; y += 56) arrow(ctx, 30, y, 300, y, P.grid, { lw: 1.5, head: 9 });
    label(ctx, 'B = 0.22 T', 290, 86, { align: 'right', weight: 700, size: 13, color: P.ink2 });
    let th = 0;
    if (ans) th = t < stages[0].t1 ? 90 * smooth(clamp(t / (D - 1))) : 90 + 90 * smooth(clamp((t - stages[1].t0) / (D - 1)));
    barMagnet(ctx, MX, MY, 140, 28, -th * Math.PI / 180);
    label(ctx, `θ = ${Math.round(th)}°`, MX, 430, { align: 'center', weight: 800, size: 15 });
    if (ans) {
      const st = stageAt(stages, t), r = th * Math.PI / 180, W = mB * (1 - Math.cos(r)), tau = mB * Math.sin(r);
      rotArrow(ctx, MX, MY, 90, false, P.acc); label(ctx, 'external torque', MX, MY - 110, { align: 'center', size: 12, color: P.acc });
      const BX = 370;
      label(ctx, 'work done', BX, 140, { weight: 700, size: 13 }); ctx.fillStyle = P.pe; ctx.fillRect(BX, 152, 300 * W, 22); label(ctx, `${W.toFixed(2)} J`, BX + 4, 190, { weight: 800, size: 14, color: P.pe });
      label(ctx, 'field’s torque', BX, 240, { weight: 700, size: 13 }); ctx.fillStyle = P.force; ctx.fillRect(BX, 252, 300 * tau, 22); label(ctx, `${Math.abs(tau).toFixed(2)} N m`, BX + 4, 290, { weight: 800, size: 14, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(i) 90°: W = 0.33 J, τ = 0.33 N m', '(ii) 180°: W = 0.66 J, τ = 0'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The work needed to turn the moment (i) normal to the field, (ii) opposite to it.', '(b) The torque on the magnet in cases (i) and (ii).']);
    note(ctx, ans ? 'turned slowly; bars to scale (300 px per J or N m)' : 'magnet size illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const CX = 230, CY = 290, A = 22, R = 200;   // 10 cm = 200 px; pole separation 2A (short magnet)
  let lines = null;
  function Bf(x, y) { const ax = x - (CX + A), ay = y - CY, bx = x - (CX - A), by = y - CY, ra = Math.hypot(ax, ay) ** 3, rb = Math.hypot(bx, by) ** 3; return [ax / ra - bx / rb, ay / ra - by / rb]; }
  function build() {
    lines = [];
    for (let k = 1; k < 9; k++) {
      const a = -k * Math.PI / 9; let x = CX + A + 6 * Math.cos(a), y = CY + 6 * Math.sin(a); const pts = [[x, y]];
      for (let i = 0; i < 1600; i++) { const [ex, ey] = Bf(x, y), L = Math.hypot(ex, ey); x += 2.5 * ex / L; y += 2.5 * ey / L; pts.push([x, y]); if (Math.hypot(x - CX + A, y - CY) < 6 || x < 8 || x > 600 || y < 26 || y > 510) break; }
      lines.push(pts);
    }
  }
  const qStages = [
    { title: 'A short bar magnet', dur: 5, text: 'Magnetic moment 0.48 J T⁻¹. Two points 10 cm from its centre: one on the axis, one on the equator.' },
    { title: 'What is asked', dur: 4, text: 'The direction and magnitude of its field at each point.' },
  ];
  const stages = [
    { title: 'Field pattern', dur: 5, text: 'Field lines leave N and return to S.', ans: '' },
    { title: 'On the axis', dur: 5, text: 'B = (μ₀/4π) 2m/r³.', ans: '(a) 10⁻⁷ × 2 × 0.48/0.1³ = 9.6 × 10⁻⁵ T, along m (away from N).' },
    { title: 'On the equator', dur: 5, text: 'B = (μ₀/4π) m/r³: half as big.', ans: '(b) 4.8 × 10⁻⁵ T, opposite to m (parallel to the magnet, N → S).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    if (!lines) build();
    const st = ans ? stageAt(stages, t) : -1;
    if (ans) { ctx.save(); ctx.strokeStyle = P.grid; ctx.lineWidth = 1.4; ctx.globalAlpha = clamp(t / 3); lines.forEach(p => { poly(ctx, p); poly(ctx, p.map(([x, y]) => [x, 2 * CY - y])); }); ctx.restore(); }
    barMagnet(ctx, CX, CY, 2 * A + 30, 18, 0);
    vec(ctx, CX - 20, CY + 30, 40, 0, 'm', P.acc, { side: 1, at: 0.5, italic: true, lw: 3, head: 9 });
    ball(ctx, CX + R, CY, 6, P.ink); label(ctx, 'axial point', CX + R, CY + 24, { align: 'center', weight: 700, size: 12 });
    ball(ctx, CX, CY - R, 6, P.ink); label(ctx, 'equatorial point', CX + 12, CY - R - 16, { weight: 700, size: 12 });
    hline(ctx, CX + 40, CX + R - 8, CY, P.ink2, 1, [4, 4]); vline(ctx, CX, CY - 20, CY - R + 8, P.ink2, 1, [4, 4]);
    label(ctx, '10 cm', CX + R / 2 + 20, CY - 12, { align: 'center', weight: 700, size: 12 }); label(ctx, '10 cm', CX - 10, CY - R / 2, { align: 'right', weight: 700, size: 12 });
    if (st >= 1) vec(ctx, CX + R, CY, 96, 0, '9.6 × 10⁻⁵ T', P.accent, { side: -1, at: 0.5, lw: 4 });
    if (st >= 2) vec(ctx, CX, CY - R, -48, 0, '4.8 × 10⁻⁵ T', P.accent, { side: -1, at: 0.5, lw: 4, ax: -20 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Field lines from N round to S', '(a) Axis: 9.6 × 10⁻⁵ T along m', '(b) Equator: 4.8 × 10⁻⁵ T opposite to m'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['The magnitude and direction of the field 10 cm from the centre (a) on the axis, (b) on the equatorial line.']);
    note(ctx, ans ? 'distances 2 px per mm; field lines computed for a short magnet; arrows 10 px per 10⁻⁵ T' : 'distances 2 px per mm');
  }
  return { qStages, stages, draw };
})();
