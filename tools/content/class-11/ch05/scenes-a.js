//@@ q02
const SCENE = (() => {
  const M = 2, F = 7, MU = 0.1, G = 9.8, FR = MU * M * G, A = (F - FR) / M, TT = 10, K = 3.2, X0 = 110, RY = 200;
  const qStages = [
    { title: 'Pushed from rest', dur: TT + 1, text: 'A 2 kg body starts from rest on a table and is pushed by a horizontal force of 7 N for 10 s. The coefficient of kinetic friction is 0.1.' },
    { title: 'What is asked', dur: 4, text: 'Find the work done in 10 s by the applied force, by friction and by the net force, and the change in kinetic energy. Interpret.' },
  ];
  const stages = [
    { title: 'Forces and motion', dur: TT + 1, text: 'Friction = μmg = 0.1 × 2 × 9.8 = 1.96 N. Net force 5.04 N gives a = 2.52 m/s²; in 10 s the body covers ½ × 2.52 × 10² = 126 m.', ans: 'Distance in 10 s = 126 m; speed at 10 s = 25.2 m/s.' },
    { title: 'Work done', dur: 5, text: 'Work = force × displacement (with sign).', ans: 'Applied: 7 × 126 = 882 J. Friction: −1.96 × 126 ≈ −247 J. Net: 5.04 × 126 ≈ 635 J.' },
    { title: 'Kinetic energy', dur: 5, text: 'Compare the work of the net force with the kinetic energy gained.', ans: 'ΔK = ½ × 2 × 25.2² ≈ 635 J = work of the net force (work–energy theorem).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.wood; ctx.fillRect(20, RY, 580, 16); hline(ctx, 20, 600, RY, P.obj, 2);
    const tm = clamp(t, 0, TT), s = 0.5 * A * tm * tm, v = A * tm, bx = X0 + s * K;
    block(ctx, bx - 24, RY - 44, 48, 44, '2 kg');
    vec(ctx, bx + 24, RY - 22, 45, 0, 'F = 7 N', P.force, { side: -1, at: 0.6, size: 13 });
    if (ans) vec(ctx, bx - 24, RY - 6, -26, 0, 'f = 1.96 N', P.drag, { side: -1, at: 0.5, ay: 22, size: 12 });
    label(ctx, 'μk = 0.1', 40, RY + 34, { size: 13, color: P.ink2 });
    clock(ctx, 60, 60, tm, `t = ${tm.toFixed(1)} s`);
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['Work done in 10 s by (a) the applied force, (b) friction, (c) the net force; (d) the change in kinetic energy. Interpret the results.']); note(ctx, 'real time; 3.2 px per metre; g = 9.8 m/s²'); return; }
    label(ctx, `distance ${s.toFixed(1)} m   speed ${v.toFixed(2)} m/s`, 320, 70, { weight: 700, size: 15 });
    const rows = [['applied force', F * s, P.force], ['friction', -FR * s, P.drag], ['net force', (F - FR) * s, P.accent], ['kinetic energy', 0.5 * M * v * v, P.ke]], KB = 0.32, BX = 200;
    rows.forEach(([n, w, c], i) => { const y = 280 + i * 50; label(ctx, n, BX - 12, y + 10, { align: 'right', size: 14, weight: 700 }); ctx.fillStyle = c; ctx.fillRect(w >= 0 ? BX : BX + w * KB, y, Math.abs(w) * KB, 20); label(ctx, `${w.toFixed(0)} J`, w >= 0 ? BX + w * KB + 8 : BX - 8 + w * KB, y + 10, { align: w >= 0 ? 'left' : 'right', size: 13, weight: 700, color: c }); });
    vline(ctx, BX, 270, 480, P.ink2, 1);
    partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['f = 1.96 N, a = 2.52 m/s², s = 126 m', 'W: applied 882 J, friction −247 J, net 635 J', 'ΔK = 635 J = W(net)'], stageAt(stages, t), false);
    note(ctx, 'real time; 3.2 px per metre; g = 9.8 m/s²');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const D = 8;
  const CASES = [
    { V: x => x < 0.5 ? 0 : 1.6, E: 1.0, bad: [[0.5, 3]], ok: [-3, 0.5], one: true, min: '0', y0: -0.6, y1: 2.2, lab: [['V₀', 1.6]], xl: [['a', 0.5]] },
    { V: x => x < -0.5 ? 0.9 : x < 0.6 ? 1.3 : x < 1.3 ? 1.55 : x < 2.0 ? 1.8 : x < 2.4 ? 2.0 : 1.2, E: 0.7, bad: [[-3, 3]], ok: null, min: 'V₁', y0: -0.4, y1: 2.3, lab: [['V₀', 1.3], ['V₃', 2.0]], xl: [['a', 0.6], ['c', 1.3], ['b', 2.0], ['d', 2.4]] },
    { V: x => x < -0.8 ? 1.5 : x < 1.2 ? -0.8 : 1.5, E: 0.8, bad: [[-3, -0.8], [1.2, 3]], ok: [-0.8, 1.2], min: '−V₁', y0: -1.2, y1: 2.0, lab: [['V₀', 1.5], ['−V₁', -0.8]], xl: [['a', -0.8], ['b', 1.2]] },
    { V: x => Math.abs(x) < 0.6 ? -1.0 : 2.0 * Math.exp(-(Math.abs(x) - 0.6) * 1.2), E: 0.8, bad: [[-1.36, -0.6], [0.6, 1.36]], ok: [-0.6, 0.6], min: '−V₁', y0: -1.4, y1: 2.4, lab: [['V₀', 2.0], ['−V₁', -1.0]], xl: [['−b/2', -1.36], ['−a/2', -0.6], ['a/2', 0.6], ['b/2', 1.36]] },
  ];
  const PARTS = ['(a) a step at x = a', '(b) steps, all above E', '(c) a well between a and b', '(d) a well with sloping walls'];
  const ANS = ['cannot be in x > a; minimum energy 0', 'cannot be anywhere; minimum energy V₁', 'cannot be in x < a or x > b; minimum −V₁', 'cannot be in −b/2 < x < −a/2 or a/2 < x < b/2; minimum −V₁'];
  const qStages = partStages(['Graph (a)', 'Graph (b)', 'Graph (c)', 'Graph (d)'], ['Fig. 5.11 (a): the total energy E is marked by the cross on the V axis.', 'Fig. 5.11 (b).', 'Fig. 5.11 (c).', 'Fig. 5.11 (d). In each case: where can the particle not be found, and what is the minimum total energy?'], D);
  const stages = partStages(qStages.map(s => s.title), ['K = E − V(x) cannot be negative: wherever V(x) is above the E line the particle cannot be. Here V jumps above E at x = a.', 'The whole graph lies above E: there is nowhere the particle can be with this energy.', 'Only the well between a and b lies below E: the particle bounces between the walls.', 'Below E: the flat bottom, and the outer slopes beyond b/2. Between a/2 and b/2 the walls are above E.'], D, ANS);
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const k = Math.min(3, Math.floor(t / D)), u = t - k * D, c = CASES[k];
    const g = axes(ctx, { x: 60, y: 70, w: 480, h: 360, x0: -3, x1: 3, y0: c.y0, y1: c.y1, xl: 'x', yl: 'V(x)' });
    if (ans) c.bad.forEach(([a, b]) => { ctx.save(); ctx.fillStyle = P.force; ctx.globalAlpha = 0.12; ctx.fillRect(g.X(a), g.Y(c.y1), g.X(b) - g.X(a), g.Y(c.y0) - g.Y(c.y1)); ctx.restore(); });
    plot(ctx, g, c.V, -3, 3, P.vel, 3, 1200);
    c.lab.forEach(([n, v]) => { hline(ctx, g.X(0) - 5, g.X(0) + 5, g.Y(v), P.ink2, 1.2); label(ctx, n, g.X(0) - 8, g.Y(v), { align: 'right', size: 13, weight: 700 }); });
    c.xl.forEach(([n, x]) => label(ctx, n, g.X(x), g.Y(0) + 16, { align: 'center', size: 13 }));
    label(ctx, '×', g.X(0), g.Y(c.E), { align: 'center', weight: 800, size: 18 }); label(ctx, 'E', g.X(0) + 10, g.Y(c.E) - 12, { weight: 700, size: 14 });
    if (ans) {
      hline(ctx, g.X(-3), g.X(3), g.Y(c.E), P.accent, 1.5, [6, 4]);
      if (c.ok) { const [a, b] = c.ok, w = b - a, ph = (u * 0.35) % 2, f = ph < 1 ? ph : 2 - ph; const x = c.one ? Math.max(-2.9, b - Math.abs(1.2 - u * 0.5) * 1.6) : a + 0.05 + (w - 0.1) * f; ball(ctx, g.X(x), g.Y(c.E), 8, P.force); }
      else label(ctx, 'V(x) > E everywhere: nowhere to be', 300, 470, { align: 'center', weight: 800, size: 16, color: P.force });
      label(ctx, `minimum total energy: ${c.min}`, 300, 496, { align: 'center', weight: 700, size: 15, color: P.accent });
    }
    partsPanel(ctx, 630, 34, 300, ans ? 'Forbidden regions (V > E)' : 'Where can it not be?', PARTS, k, ans, ANS);
    note(ctx, 'shapes follow Fig. 5.11; no values given');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const KS = 0.5, E = 1, W = 1.6, D = 12;
  const qStages = [
    { title: 'V(x) = kx²/2', dur: D, text: 'A particle in linear SHM has V(x) = kx²/2 with k = 0.5 N/m (Fig. 5.12). Its total energy is 1 J.' },
    { title: 'What is asked', dur: 4, text: 'Show that it must turn back when it reaches x = ±2 m.' },
  ];
  const stages = [
    { title: 'Energy at each point', dur: D, text: 'Total energy E = K + V stays 1 J. The kinetic energy is the gap between the E line and the curve.', ans: 'K = E − V(x) ≥ 0, so the particle stays where V(x) ≤ 1 J.' },
    { title: 'Turning points', dur: 5, text: 'Set V(x) = E: ½ × 0.5 × x² = 1.', ans: 'x² = 4, x = ±2 m: there K = 0 and the force −kx pushes it back.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 60, y: 70, w: 480, h: 280, x0: -3, x1: 3, y0: 0, y1: 2.3, xt: [-2, -1, 1, 2], yt: [1], xl: 'x (m)', yl: 'V(x) (J)' });
    plot(ctx, g, x => 0.5 * KS * x * x, -3, 3, P.vel);
    hline(ctx, g.X(-3), g.X(3), g.Y(E), P.accent, 1.5, [6, 4]); label(ctx, 'E = 1 J', g.X(3) - 4, g.Y(E) - 12, { align: 'right', weight: 700, size: 13, color: P.accent });
    const x = 2 * Math.cos(W * t), V = 0.5 * KS * x * x;
    ball(ctx, g.X(x), g.Y(V), 8, P.force);
    if (ans) {
      ctx.fillStyle = P.ke; ctx.globalAlpha = 0.6; ctx.fillRect(g.X(x) - 5, g.Y(E), 10, g.Y(V) - g.Y(E)); ctx.globalAlpha = 1; label(ctx, 'K', g.X(x) + 10, (g.Y(E) + g.Y(V)) / 2, { weight: 700, size: 13, color: P.ke });
      if (t >= stages[1].t0) for (const s of [-2, 2]) { ball(ctx, g.X(s), g.Y(E), 6, P.accent); label(ctx, `x = ${s} m`, g.X(s), g.Y(E) - 18, { align: 'center', weight: 800, size: 14, color: P.accent }); }
    }
    const LY = 440, px = v => 300 + v * 80;
    hline(ctx, px(-2.5), px(2.5), LY, P.ink2, 1.5); for (const s of [-2, 0, 2]) { vline(ctx, px(s), LY - 6, LY + 6, P.ink, 1.5); label(ctx, `${s}`, px(s), LY + 18, { align: 'center', size: 12 }); }
    ball(ctx, px(x), LY - 12, 10, P.objFill2);
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['K = E − V(x) must not be negative', '½ × 0.5 × x² = 1 → x = ±2 m: K = 0, turns back'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['Show that a particle of total energy 1 J in this potential must turn back at x = ±2 m.']);
    note(ctx, 'mass not given: the oscillation timing is illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const R = 2e-3, RHO = 1000, M = 4 / 3 * Math.PI * R ** 3 * RHO, G = 9.8, H = 500, VT = 10, K = 0.8, TOPY = 60, D = 10;
  const sOf = u => u < 0.5 ? 250 * Math.pow(u / 0.5, 1.6) : 250 + 250 * (u - 0.5) / 0.5;   // distance fallen (illustrative timing)
  const vOf = s => s < 250 ? VT * Math.sqrt(1 - (1 - s / 250) ** 2) : VT;                // speed rises with decreasing acceleration, then steady
  const qStages = [
    { title: 'Falling from 500 m', dur: D + 1, text: 'A raindrop of radius 2 mm falls from 500 m. Air resistance makes its acceleration decrease until, at half the height, it reaches its terminal speed; then it falls uniformly.' },
    { title: 'What is asked', dur: 4, text: 'Work done by gravity in each half; work done by the resistive force over the whole fall, if it reaches the ground at 10 m/s.' },
  ];
  const stages = [
    { title: 'The fall', dur: D + 1, text: 'Gravity does work mgh in each half; air resistance takes energy away all the way down.', ans: 'm = (4/3)π(2 × 10⁻³)³ × 10³ ≈ 3.35 × 10⁻⁵ kg; mg × 250 m ≈ 0.082 J in each half.' },
    { title: 'Resistive work', dur: 5, text: 'Work–energy theorem: W(gravity) + W(resistance) = K at the ground.', ans: 'K = ½ × 3.35 × 10⁻⁵ × 10² ≈ 0.0017 J; W(resistance) ≈ 0.0017 − 0.164 ≈ −0.162 J.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const GY = TOPY + H * K; ground(ctx, 40, 300, GY);
    vline(ctx, 60, TOPY, GY, P.ink2, 1.5); for (const m of [0, 250, 500]) { hline(ctx, 56, 64, TOPY + (H - m) * K, P.ink2, 1.2); label(ctx, `${m} m`, 70, TOPY + (H - m) * K, { size: 12, color: P.ink2 }); }
    hline(ctx, 60, 300, TOPY + 250 * K, P.ink2, 1, [4, 4]); label(ctx, 'half way: terminal speed', 300, TOPY + 250 * K - 12, { align: 'right', size: 12, color: P.ink2 });
    const s = sOf(clamp(t / D)), v = vOf(s), y = TOPY + s * K;
    ctx.fillStyle = P.water; ctx.beginPath(); ctx.moveTo(180, y - 12); ctx.quadraticCurveTo(190, y + 2, 180, y + 8); ctx.quadraticCurveTo(170, y + 2, 180, y - 12); ctx.fill();
    if (v > 0.3) vec(ctx, 200, y - 4, 0, v * 4, ans ? `${v.toFixed(1)} m/s` : '', P.vel, { side: -1, at: 0.6, align: 'left', ax: 4, size: 12 });
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['The work done by gravity in the first half and in the second half of the fall.', 'The work done by the resistive force over the whole journey (speed at the ground 10 m/s).']); note(ctx, 'timing illustrative; much faster than real'); return; }
    const wg = M * G * s, kin = 0.5 * M * v * v, wr = kin - wg, KB = 1500, BX = 420, BY = 470;
    const bar = (x, val, c, n) => { ctx.fillStyle = c; ctx.fillRect(x, val >= 0 ? BY - val * KB : BY, 34, Math.abs(val) * KB); label(ctx, n, x + 17, BY + 14 + (val < 0 ? Math.abs(val) * KB : 0), { align: 'center', size: 12, weight: 700 }); label(ctx, `${val.toFixed(3)} J`, x + 17, val >= 0 ? BY - val * KB - 12 : BY + Math.abs(val) * KB + 28, { align: 'center', size: 12, weight: 700, color: c }); };
    hline(ctx, BX - 10, BX + 150, BY, P.ink2, 1);
    bar(BX, Math.min(wg, M * G * 250), P.force, 'W₁'); bar(BX + 50, Math.max(0, wg - M * G * 250), P.force, 'W₂'); bar(BX + 100, kin, P.ke, 'K');
    label(ctx, 'gravity: first half, second half', BX + 75, 60, { align: 'center', size: 12, color: P.ink2 });
    label(ctx, `resistive work so far: ${wr.toFixed(3)} J`, 340, 100, { weight: 700, size: 14, color: P.drag });
    partsPanel(ctx, 630, 34, 300, 'Working', ['m ≈ 3.35 × 10⁻⁵ kg; W(gravity) = mgh ≈ 0.082 J in each half', 'K at ground ≈ 0.0017 J; W(resistance) = K − W(gravity) ≈ −0.162 J'], stageAt(stages, t), false);
    note(ctx, 'speed-up in the first half illustrative; fall much faster than real; 0.8 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const WY = 400, CX = 300, TH = 30 * Math.PI / 180, L = 300, D = 8;
  const qStages = [
    { title: 'The molecule strikes', dur: D, text: 'A gas molecule hits a horizontal wall at 200 m/s, at 30° to the normal, and rebounds with the same speed.' },
    { title: 'What is asked', dur: 4, text: 'Is momentum conserved in the collision? Is it elastic or inelastic?' },
  ];
  const stages = [
    { title: 'Components', dur: D, text: 'Split the velocity along the wall and along the normal. Along the wall it is unchanged; along the normal it reverses.', ans: 'The molecule’s momentum changes by 2mv cos 30° upward: the wall pushes it.' },
    { title: 'Momentum', dur: 4, text: 'The wall exerts a force on the molecule, and the molecule an equal and opposite force on the wall.', ans: 'The molecule’s momentum alone is not conserved; that of molecule + wall (+ container) is.' },
    { title: 'Energy', dur: 4, text: 'Same speed before and after.', ans: 'Kinetic energy unchanged: the collision is elastic.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 40, WY, 540, 26, P.obj, P.objFill); hline(ctx, 40, 580, WY, P.obj, 2); label(ctx, 'wall', 50, WY + 44, { size: 13, color: P.ink2 });
    vline(ctx, CX, WY - 260, WY, P.ink2, 1, [4, 4]); label(ctx, 'normal', CX + 6, WY - 262, { size: 12, color: P.ink2 });
    const u = clamp(t / (D - 1)), before = u < 0.5, f = before ? 1 - u / 0.5 : (u - 0.5) / 0.5;
    const x = CX + (before ? -1 : 1) * L * f * Math.sin(TH), y = WY - 10 - L * f * Math.cos(TH);
    trail(ctx, [[CX - L * Math.sin(TH), WY - 10 - L * Math.cos(TH)], [CX, WY - 10], [CX + L * Math.sin(TH), WY - 10 - L * Math.cos(TH)]], P.ink2, 0.3);
    ball(ctx, x, y, 9, P.force);
    const vx = 70 * Math.sin(TH), vy = 70 * Math.cos(TH) * (before ? 1 : -1);
    vec(ctx, x, y, vx, vy, '200 m/s', P.vel, { side: before ? 1 : -1, at: 0.7, size: 12 });
    label(ctx, '30°', CX - 30, WY - 70, { weight: 700, size: 13 }); label(ctx, '30°', CX + 14, WY - 70, { weight: 700, size: 13 });
    if (ans) {
      vec(ctx, x + 20, y + 30, vx, 0, 'along wall: unchanged', P.disp, { side: 1, at: 0.5, size: 12 });
      vec(ctx, x - 20, y, 0, vy, before ? 'normal: in' : 'normal: out', P.acc, { side: -1, at: 0.5, align: 'right', ax: -4, size: 12 });
      if (!before) vec(ctx, CX, WY - 10, 0, -110, 'Δp = 2mv cos 30°', P.force, { side: 1, at: 0.8, align: 'left', ax: 6, size: 13 });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['Along the wall: unchanged; normal: reversed', 'Momentum of molecule + wall is conserved (not of the molecule alone)', 'Same speed: elastic'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['Is momentum conserved in the collision?', 'Is the collision elastic or inelastic?']);
    note(ctx, 'enormously slowed down');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const V = 30, H = 40, TT = 900, ETA = 0.3, G = 9.8, PU = V * 1000 * G * H / TT, PE = PU / ETA, D = 10, BX = 220, GY = 470, TY = 90;
  const qStages = [
    { title: 'Filling the tank', dur: D + 1, text: 'A pump on the ground floor fills a 30 m³ tank, 40 m above the ground, in 15 min. The pump’s efficiency is 30%.' },
    { title: 'What is asked', dur: 4, text: 'How much electric power does the pump consume?' },
  ];
  const stages = [
    { title: 'Work on the water', dur: D + 1, text: 'The pump must lift 30 m³ of water (3 × 10⁴ kg) through 40 m.', ans: 'mgh = 3 × 10⁴ × 9.8 × 40 = 1.176 × 10⁷ J in 900 s: useful power ≈ 1.31 × 10⁴ W.' },
    { title: 'Electric power', dur: 5, text: 'Only 30% of the electric power ends up lifting water.', ans: 'P = 1.31 × 10⁴ / 0.30 ≈ 4.36 × 10⁴ W ≈ 43.6 kW.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 30, 590, GY);
    ctx.fillStyle = P.objFill; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.fillRect(BX, TY + 60, 160, GY - TY - 60); ctx.strokeRect(BX, TY + 60, 160, GY - TY - 60);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) { ctx.fillStyle = P.sheet; ctx.fillRect(BX + 18 + c * 48, TY + 80 + r * 52, 28, 28); }
    const f = clamp(t / D);
    ctx.strokeRect(BX + 20, TY, 120, 60); ctx.fillStyle = P.water; ctx.fillRect(BX + 21, TY + 59 - 58 * f, 118, 58 * f); label(ctx, 'tank 30 m³', BX + 80, TY - 14, { align: 'center', weight: 700, size: 13 });
    block(ctx, BX - 90, GY - 40, 60, 40, 'pump', P.objFill2);
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 6; poly(ctx, [[BX - 60, GY - 40], [BX - 60, TY + 10], [BX + 30, TY + 10]]); ctx.strokeStyle = P.water; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.lineDashOffset = -t * 40; if (f < 1) poly(ctx, [[BX - 60, GY - 40], [BX - 60, TY + 10], [BX + 30, TY + 10]]); ctx.restore();
    vdim(ctx, BX + 190, TY + 30, GY, P.ink2); label(ctx, '40 m', BX + 198, (TY + GY) / 2, { weight: 700, size: 13 });
    clock(ctx, 460, 60, f * 15 * 4, `${(f * 15).toFixed(1)} min`);
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['The electric power consumed by the pump (efficiency 30%).']); note(ctx, '15 minutes shown in 10 s; building not to scale'); return; }
    label(ctx, `water lifted: ${(f * 3e4).toFixed(0)} kg`, 40, 60, { weight: 700, size: 14 });
    if (t >= stages[1].t0) { const KB = 0.006; ctx.fillStyle = P.ink2; ctx.fillRect(470, 300 - PE * KB * 0.5, 40, PE * KB * 0.5); ctx.fillStyle = P.accent; ctx.fillRect(530, 300 - PU * KB * 0.5, 40, PU * KB * 0.5); label(ctx, '43.6 kW in', 490, 300 - PE * KB * 0.5 - 12, { align: 'center', size: 12, weight: 700 }); label(ctx, '13.1 kW', 550, 300 - PU * KB * 0.5 - 26, { align: 'center', size: 12, weight: 700, color: P.accent }); label(ctx, 'useful', 550, 300 - PU * KB * 0.5 - 12, { align: 'center', size: 12, weight: 700, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['mgh = 1.176 × 10⁷ J in 900 s: 1.31 × 10⁴ W useful', 'Electric power = useful / 0.30 ≈ 43.6 kW'], stageAt(stages, t), false);
    note(ctx, '15 minutes shown in 10 s; building not to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q16
const SCENE = (() => {
  const R = 14, Y0 = 110, KV = 90;
  const OUT = [{ n: '(i)', v: [0, 0.5, 0.5], p: 'mV', k: '¼ mV²', ok: false }, { n: '(ii)', v: [0, 0, 1], p: 'mV', k: '½ mV²', ok: true }, { n: '(iii)', v: [1 / 3, 1 / 3, 1 / 3], p: 'mV', k: '⅙ mV²', ok: false }];
  const qStages = [
    { title: 'Head-on', dur: 4, text: 'Ball 1 moves at V towards balls 2 and 3, at rest and touching, on a frictionless table. The collision is elastic.' },
    { title: 'Possible results', dur: 6, text: 'Fig. 5.14 offers three results. Which one is possible?' },
  ];
  const stages = [
    { title: 'Before', dur: 4, text: 'Before: momentum mV, kinetic energy ½ mV².', ans: 'Both must be the same afterwards (elastic collision).' },
    { title: 'Check each result', dur: 7, text: 'Every result keeps momentum mV. Check the kinetic energy.', ans: '(i) ¼ mV² ✗   (ii) ½ mV² ✓   (iii) ⅙ mV² ✗' },
    { title: 'What happens', dur: 5, text: 'The impulse passes through ball 2 to ball 3.', ans: 'Case (ii): balls 1 and 2 stop, ball 3 moves off at V.' },
  ];
  function row(ctx, y, xs, vs, lab) {
    xs.forEach((x, i) => { ball(ctx, x, y, R, [P.vel, P.ink, P.ke][i]); label(ctx, String(i + 1), x, y - 24, { align: 'center', size: 12, weight: 700 }); if (vs[i] > 0) vec(ctx, x + R + 2, y + 24, vs[i] * KV, 0, vs[i] === 1 ? 'V' : vs[i] === 0.5 ? 'V/2' : 'V/3', P.vel, { side: 1, at: 0.6, size: 12 }); });
    if (lab) label(ctx, lab, 40, y, { weight: 700, size: 14 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); hline(ctx, 30, 590, Y0 + R, P.ink2, 1);
    const st = ans ? stageAt(stages, t) : (t < 4 ? 0 : 1);
    if (st === 0) { const x1 = 120 + 160 * clamp(t / 3.5); row(ctx, Y0, [x1, 300 + 2 * R, 300 + 4 * R], [1, 0, 0], 'before'); }
    else if (st < 2) row(ctx, Y0, [300, 300 + 2 * R, 300 + 4 * R], [0, 0, 0], 'contact');
    else { const s = t - stages[2].t0; row(ctx, Y0, [300, 300 + 2 * R, Math.min(500, 300 + 4 * R + s * 40)], [0, 0, 1], 'after'); }
    if (st >= 1 || !ans) if (t >= 4) OUT.forEach((o, i) => {
      const y = 230 + i * 100; hline(ctx, 30, 590, y + R, P.grid, 1);
      row(ctx, y, i === 2 ? [300, 300 + 2 * R, 300 + 4 * R] : i === 1 ? [240, 240 + 2 * R, 380] : [240, 360, 360 + 2 * R], o.v, o.n);
      if (ans) { label(ctx, `p = ${o.p} ✓   K = ${o.k} ${o.ok ? '✓' : '✗'}`, 420, y + 40, { size: 13, weight: 700, color: o.ok ? P.accent : P.force }); }
    });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Check p and K', ['Before: p = mV, K = ½ mV²', '(i) K = ¼ mV² ✗; (ii) K = ½ mV² ✓; (iii) K = ⅙ mV² ✗', 'Only (ii) is possible'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['Which result of Fig. 5.14, (i), (ii) or (iii), is possible after the elastic collision?']);
    note(ctx, 'equal masses; speeds to scale with V');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const PX = 300, PY = 50, L = 330, TH0 = 30 * Math.PI / 180, W = 1.4, TQ = Math.PI / 2 / W;   // illustrative swing rate
  const qStages = [
    { title: 'Released from 30°', dur: TQ + 1.5, text: 'Bob A of a pendulum is released from 30° to the vertical. At the bottom it hits bob B, of the same mass, at rest on a table.' },
    { title: 'What is asked', dur: 4, text: 'How high does bob A rise after the collision? (Elastic collision; neglect the size of the bobs.)' },
  ];
  const stages = [
    { title: 'Swinging down', dur: TQ, text: 'A reaches the bottom moving horizontally.', ans: 'Just before impact A has some speed u; B is at rest.' },
    { title: 'Elastic, equal masses', dur: 3, text: 'Momentum and kinetic energy are both conserved. For equal masses this means the velocities are exchanged.', ans: 'After: A has speed 0; B moves off with u.' },
    { title: 'The answer', dur: 4, text: 'With no speed left, A cannot rise.', ans: 'A does not rise at all: it stays at the lowest point.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, PX - 70, PY - 16, 140, 16, P.obj, P.objFill); hline(ctx, PX - 70, PX + 70, PY, P.obj, 2);
    vline(ctx, PX, PY, PY + 80, P.ink2, 1, [3, 4]);
    const TY = PY + L + 12; ground(ctx, 60, 580, TY);
    const ts = Math.min(t, TQ), th = TH0 * Math.cos(W * ts), ax = PX + L * Math.sin(th), ay = PY + L * Math.cos(th);
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, PX, PY, ax, ay); ctx.restore();
    ball(ctx, ax, ay, 12, P.vel); label(ctx, 'A', ax + 16, ay - 10, { weight: 700, size: 14 });
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(PX, PY, 60, Math.PI / 2 - TH0, Math.PI / 2); ctx.stroke(); ctx.restore(); label(ctx, '30°', PX + 10, PY + 74, { size: 13, weight: 700 });
    const u = L * TH0 * W;                                          // px/s at the bottom (illustrative)
    let bx = PX - 2;
    if (ans && t > TQ) bx = PX - 2 - u * 0.12 * (t - TQ);
    ball(ctx, Math.max(-20, bx - 24), TY - 12, 12, P.force); label(ctx, 'B', Math.max(-20, bx - 24), TY - 34, { align: 'center', weight: 700, size: 14 });
    if (ans && t > TQ) { vec(ctx, Math.max(-20, bx - 24) - 16, TY - 12, -40, 0, 'u', P.vel, { side: 1, at: 0.6, italic: true }); label(ctx, 'A: at rest', ax + 18, ay - 30, { weight: 800, size: 15, color: P.accent }); }
    if (!ans && t >= TQ) label(ctx, 'impact', PX - 30, TY - 50, { align: 'right', weight: 700, size: 14, color: P.force });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['A arrives at the bottom with speed u', 'Elastic, equal masses: velocities exchanged', 'A stops: it rises to height 0'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['How high does bob A rise after the collision?']);
    note(ctx, 'string length not given: timing illustrative; B slides on the table (frictionless)');
  }
  return { qStages, stages, draw };
})();

//@@ q18
const SCENE = (() => {
  const L = 1.5, G = 9.8, K = 160, PX = 270, PY = 110, V = Math.sqrt(2 * 0.95 * G * L), TS = 2.4;   // v ≈ 5.3 m/s; swing shown slowed
  const qStages = [
    { title: 'Released from horizontal', dur: TS + 1, text: 'A pendulum 1.5 m long is released with its string horizontal. On the way down it loses 5% of its initial energy to air resistance.' },
    { title: 'What is asked', dur: 4, text: 'With what speed does the bob reach the lowest point?' },
  ];
  const stages = [
    { title: 'Energy on the way down', dur: TS + 1, text: 'Measured from the lowest point, the initial energy is mgL. 5% is lost; 95% becomes kinetic energy.', ans: '½ mv² = 0.95 mgL.' },
    { title: 'The speed', dur: 4, text: 'The mass cancels.', ans: 'v = √(2 × 0.95 × 9.8 × 1.5) ≈ 5.3 m/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, PX - 60, PY - 14, 120, 14, P.obj, P.objFill); hline(ctx, PX - 60, PX + 60, PY, P.obj, 2);
    ctx.save(); ctx.strokeStyle = P.grid; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(PX, PY, L * K, 0, Math.PI / 2); ctx.stroke(); ctx.restore();
    const f = clamp(t / TS), th = Math.PI / 2 * (1 - Math.sin(f * Math.PI / 2)), x = PX + L * K * Math.sin(th), y = PY + L * K * Math.cos(th);
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, PX, PY, x, y); ctx.restore(); ball(ctx, x, y, 12, P.force);
    vdim(ctx, PX - 40, PY, PY + L * K, P.ink2); label(ctx, '1.5 m', PX - 48, PY + L * K / 2, { align: 'right', weight: 700, size: 13 });
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['The speed of the bob at the lowest point, given it loses 5% of its initial energy.']); note(ctx, 'swing shown slowed; 160 px per metre'); return; }
    const h = (y - PY) / K, pe = 1 - h / L, lost = 0.05 * (1 - pe), ke = 1 - pe - lost, BX = 450, BY = 420, KB = 200;
    [['PE', pe, P.pe], ['KE', ke, P.ke], ['lost', lost, P.loss]].forEach(([n, v, c], i) => { ctx.fillStyle = c; ctx.fillRect(BX + i * 46, BY - v * KB, 34, v * KB); label(ctx, n, BX + 17 + i * 46, BY + 14, { align: 'center', size: 12, weight: 700 }); label(ctx, `${Math.round(v * 100)}%`, BX + 17 + i * 46, BY - v * KB - 12, { align: 'center', size: 12, weight: 700, color: c }); });
    hline(ctx, BX - 6, BX + 134, BY, P.ink2, 1);
    if (f >= 1) { vec(ctx, x, y + 26, V * 14, 0, 'v ≈ 5.3 m/s', P.vel, { side: 1, at: 0.6, size: 13 }); }
    partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['½ mv² = 0.95 mgL', 'v = √(2 × 0.95 × 9.8 × 1.5) ≈ 5.3 m/s'], stageAt(stages, t), false);
    note(ctx, 'swing shown slowed; 160 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q19
const SCENE = (() => {
  const RY = 330, X0 = 60, VPX = 28, D = 12, RATE = 0.05, MS = 25;           // drawn at 38 px/s (slowed)
  const qStages = [
    { title: 'Leaking sand', dur: D + 1, text: 'A 300 kg trolley carrying a 25 kg sandbag moves uniformly at 27 km/h on a frictionless track. Sand leaks out of a hole in the floor at 0.05 kg/s.' },
    { title: 'What is asked', dur: 4, text: 'What is the trolley’s speed once the sandbag is empty?' },
  ];
  const stages = [
    { title: 'Sand leaving', dur: D + 1, text: 'Each grain of sand leaves the trolley with the trolley’s own horizontal velocity: it simply drops through the hole.', ans: 'The leaking sand exerts no horizontal force on the trolley.' },
    { title: 'The speed', dur: 4, text: 'No horizontal external force acts on the trolley (frictionless track).', ans: 'Its speed stays 27 km/h after the bag is empty.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 600, RY + 8, P.ink2, 2); hline(ctx, 20, 600, RY + 16, P.ink2, 2);
    const f = clamp(t / D), x = X0 + VPX * f * D, sand = MS * (1 - f);
    for (let i = 0; i < 160 * f; i++) { const tf = i / 160 * D, lx = X0 + 60 + VPX * tf; ctx.fillStyle = P.sand; ctx.fillRect(lx - 1, RY + 2, 3, 3); }
    for (let i = 0; i < 6 && f < 1; i++) { const age = ((t * 3 + i / 6) % 1) * 0.3, gx = x + 60 + VPX * age * 0, gy = RY - 16 + age * 60; if (gy < RY + 2) { ctx.fillStyle = P.sand; ctx.fillRect(gx - 1, gy, 3, 3); } }
    block(ctx, x, RY - 40, 120, 36, '300 kg', P.objFill2); for (const wx of [x + 20, x + 100]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, RY - 2, 8, 0, Math.PI * 2); ctx.fill(); }
    const hb = 40 * sand / MS; if (hb > 1) { ctx.fillStyle = P.sand; ctx.fillRect(x + 36, RY - 40 - hb, 48, hb); }
    label(ctx, `sand: ${sand.toFixed(1)} kg`, x + 60, RY - 96, { align: 'center', size: 13, weight: 700 });
    vec(ctx, x + 126, RY - 22, 40, 0, '27 km/h', P.vel, { side: -1, at: 0.5, size: 13 });
    clock(ctx, 60, 60, f * 500 / 10, `t = ${(f * 500).toFixed(0)} s`);
    if (ans) { label(ctx, 'speedometer: 27 km/h, all the way', 300, 430, { align: 'center', weight: 800, size: 16, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Answer', ['Sand drops with the trolley’s velocity: no horizontal push', 'Speed unchanged: 27 km/h'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['The speed of the trolley after the entire sandbag is empty.']);
    note(ctx, '25 kg at 0.05 kg/s takes 500 s, shown in 12 s; trolley drawn much slower than 27 km/h');
  }
  return { qStages, stages, draw };
})();

//@@ q21
const SCENE = (() => {
  const DX = 430, DY = 250, RD = 110, D = 10, VPX = 40;                     // the air column moves 40 px per (illustrative) second
  const qStages = [
    { title: 'Wind through the blades', dur: D, text: 'A windmill’s blades sweep a circle of area A. Wind blows at speed v perpendicular to it.' },
    { title: 'What is asked', dur: 5, text: '(a) Mass of air through it in time t; (b) its kinetic energy; (c) the electrical power for 25% conversion, A = 30 m², v = 36 km/h, ρ = 1.2 kg/m³.' },
  ];
  const stages = [
    { title: 'The air column', dur: D, text: 'In time t, all the air in a cylinder of cross-section A and length vt passes through the circle.', ans: '(a) Volume = Avt, mass m = ρAvt.' },
    { title: 'Its kinetic energy', dur: 4, text: 'K = ½ mv².', ans: '(b) K = ½ ρAv³t.' },
    { title: 'Electrical power', dur: 5, text: 'Power = energy per unit time; 25% is converted. v = 36 km/h = 10 m/s.', ans: '(c) ½ × 1.2 × 30 × 10³ = 1.8 × 10⁴ W of wind; 25% gives 4.5 kW.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 30, 590, 480);
    ctx.fillStyle = P.objFill2; ctx.fillRect(DX + 8, DY, 14, 480 - DY);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.ellipse(DX, DY, 18, RD, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 3; i++) { const a = t * 2 + i * 2 * Math.PI / 3; ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 6; seg(ctx, DX, DY, DX + 10 * Math.cos(a), DY + RD * Math.sin(a)); ctx.restore(); }
    ball(ctx, DX, DY, 6, P.obj);
    for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) { const x = ((c * 70 + t * VPX * 1.4) % 540) + 30, y = DY - RD + 12 + r * 33; if (x < DX - 20 || x > DX + 20) { ctx.fillStyle = P.vel; ctx.globalAlpha = 0.35; ctx.fillRect(x, y, 14, 2); ctx.globalAlpha = 1; } }
    vec(ctx, 40, DY - RD - 30, 60, 0, 'wind, v', P.vel, { side: -1, at: 0.5, size: 13 });
    label(ctx, 'area A', DX + 26, DY - RD + 6, { weight: 700, size: 13 });
    if (ans) {
      const L = 4 * VPX, p = clamp(t / (D - 1)), x1 = DX - L + p * L;
      ctx.save(); ctx.fillStyle = P.accent; ctx.globalAlpha = 0.25; ctx.fillRect(Math.min(x1, DX) - L + (x1 > DX ? 0 : 0), DY - RD, Math.max(0, DX - (x1 - L)), 2 * RD); ctx.restore();
      ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 2; ctx.strokeRect(x1 - L, DY - RD, L, 2 * RD); ctx.restore();
      dim(ctx, x1 - L, x1, DY + RD + 20, P.accent); label(ctx, 'vt', x1 - L / 2, DY + RD + 36, { align: 'center', weight: 800, size: 15, color: P.accent, italic: true });
      partsPanel(ctx, 630, 34, 300, 'Working', ['(a) m = ρAvt', '(b) K = ½ ρAv³t', '(c) P = 0.25 × ½ × 1.2 × 30 × 10³ = 4.5 kW'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The mass of air passing through the circle in time t.', '(b) Its kinetic energy.', '(c) The electrical power produced (25% conversion; A = 30 m², v = 36 km/h, ρ = 1.2 kg/m³).']);
    note(ctx, 'side view; wind speed and blade turning illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q22
const SCENE = (() => {
  const M = 10, H = 0.5, G = 9.8, N = 1000, KH = 160, BY = 330, D1 = 4, D2 = 8;
  const qStages = [
    { title: 'Lifting', dur: D1, text: 'A dieter lifts a 10 kg mass to a height of 0.5 m, again and again: one thousand times.' },
    { title: 'A thousand times', dur: D2, text: 'The energy lost each time she lowers the mass is dissipated.' },
    { title: 'What is asked', dur: 4, text: '(a) Work done against gravity. (b) Fat supplies 3.8 × 10⁷ J/kg at 20% efficiency: how much fat is used?' },
  ];
  const stages = [
    { title: 'One lift', dur: D1, text: 'Each lift raises 10 kg by 0.5 m.', ans: 'mgh = 10 × 9.8 × 0.5 = 49 J per lift.' },
    { title: '1000 lifts', dur: D2, text: 'Lowering returns nothing useful: the energy is dissipated, so every lift needs fresh work.', ans: '(a) 1000 × 49 J = 4.9 × 10⁴ J.' },
    { title: 'Fat used', dur: 5, text: 'Only 20% of the fat’s energy becomes mechanical work.', ans: '(b) 4.9 × 10⁴ / (0.2 × 3.8 × 10⁷) ≈ 6.45 × 10⁻³ kg (about 6.5 g).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 60, 400, 440);
    const n = t < D1 ? t / 1.3 : Math.min(N, 3 + (N - 3) * ((t - D1) / D2) ** 2), ph = n % 1, h = H * Math.sin(ph * Math.PI);
    person(ctx, 180, 440, 1.2);
    block(ctx, 210, BY - h * KH - 30, 50, 30, '10 kg', P.objFill2);
    vdim(ctx, 290, BY - H * KH, BY, P.ink2); label(ctx, '0.5 m', 298, BY - H * KH / 2, { weight: 700, size: 13 });
    hline(ctx, 205, 270, BY, P.ink2, 1, [3, 3]); hline(ctx, 205, 270, BY - H * KH, P.ink2, 1, [3, 3]);
    label(ctx, `lifts: ${Math.min(N, Math.floor(n))}`, 360, 120, { weight: 800, size: 20 });
    if (ans) {
      label(ctx, `work against gravity: ${(Math.min(N, Math.floor(n)) * M * G * H).toFixed(0)} J`, 360, 160, { weight: 700, size: 15, color: P.force });
      if (t >= stages[2].t0) label(ctx, 'fat used ≈ 6.45 × 10⁻³ kg', 360, 200, { weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['Each lift: mgh = 49 J', '(a) 1000 lifts: 4.9 × 10⁴ J', '(b) fat = 4.9 × 10⁴ / (0.2 × 3.8 × 10⁷) ≈ 6.45 g'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The work done against gravity.', '(b) The mass of fat used up (3.8 × 10⁷ J/kg, 20% efficiency).']);
    note(ctx, 'the lifts speed up: 1000 lifts are not shown at real pace');
  }
  return { qStages, stages, draw };
})();
