//@@ q05
const SCENE = (() => {
  const K = 50, OX = 300, LY = 260, W = 1.2;
  const CASES = [[-5, 0], [5, 0], [0, -1], [3, -1], [-2, 1], [1, -1]];          // [x in cm, direction of motion]
  const PARTS = ['(a) at A', '(b) at B', '(c) mid-point, going to A', '(d) 2 cm from B, going to A', '(e) 3 cm from A, going to B', '(f) 4 cm from B, going to A'];
  const ANS = ['v 0, a +, F +', 'v 0, a −, F −', 'v −, a 0, F 0', 'v −, a −, F −', 'v +, a +, F +', 'v −, a −, F −'];
  const qStages = [
    { title: 'SHM between A and B', dur: 7, text: 'A particle moves in SHM between A and B, 10 cm apart. The direction from A to B is positive.' },
    { title: 'What is asked', dur: 4, text: 'Give the signs of velocity, acceleration and force in six situations.' },
  ];
  const stages = [{ title: 'The rule', dur: 6, text: 'The acceleration (and force) always points towards the midpoint O: a = −ω²x. The velocity points along the motion.', ans: 'At the ends v = 0; at O, a = 0.' },
    ...PARTS.map((p, i) => ({ title: p, dur: 3, text: `x = ${CASES[i][0] > 0 ? '+' : ''}${CASES[i][0]} cm${CASES[i][1] ? (CASES[i][1] > 0 ? ', moving towards B' : ', moving towards A') : ''}.`, ans: ANS[i] }))];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, OX - 5 * K - 20, OX + 5 * K + 20, LY, P.ink2, 1.5);
    for (const [x, n] of [[-5, 'A'], [0, 'O'], [5, 'B']]) { vline(ctx, OX + x * K, LY - 10, LY + 10, P.ink, 2); label(ctx, n, OX + x * K, LY + 26, { align: 'center', weight: 800, size: 15 }); }
    for (let x = -4; x <= 4; x++) if (x) { vline(ctx, OX + x * K, LY - 5, LY + 5, P.ink2, 1); label(ctx, String(x), OX + x * K, LY + 44, { align: 'center', size: 11, color: P.ink2 }); }
    label(ctx, 'x (cm), positive from A to B →', OX, LY + 66, { align: 'center', size: 12, color: P.ink2 });
    const st = ans ? stageAt(stages, t) : 0;
    let x, dir;
    if (st === 0) { x = -5 * Math.cos(W * t); dir = Math.sign(Math.sin(W * t)); } else { [x, dir] = CASES[st - 1]; }
    ball(ctx, OX + x * K, LY - 16, 11, P.objFill2);
    if (ans) {
      if (st > 0 || true) {
        const v = st === 0 ? 5 * W * Math.sin(W * t) : dir * 40 / 30, a = -x;
        if (Math.abs(v) > 0.05 && (st === 0 || dir)) vec(ctx, OX + x * K, LY - 52, Math.sign(v) * 50, 0, 'v', P.vel, { side: -1, at: 0.6, italic: true });
        if (Math.abs(a) > 0.05) vec(ctx, OX + x * K, LY - 82, Math.sign(a) * (20 + 8 * Math.abs(a)), 0, 'a, F', P.acc, { side: -1, at: 0.6 });
      }
      if (st > 0) label(ctx, ANS[st - 1], OX, 120, { align: 'center', weight: 800, size: 20, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Signs of v, a, F', PARTS, st - 1, true, ANS);
    } else partsPanel(ctx, 630, 34, 300, 'Give the signs of v, a and F…', PARTS, -1, false);
    note(ctx, '50 px per cm; period illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const KS = 1200, M = 3, A = 0.02, W = Math.sqrt(KS / M), SLOW = 5, X0 = 340, Y = 240, PXM = 5000;   // 5 px per mm
  const qStages = [
    { title: 'Fig. 13.19', dur: 8, text: 'A 3 kg mass on a spring of constant 1200 N/m on a horizontal table is pulled 2.0 cm and released.' },
    { title: 'What is asked', dur: 4, text: 'Find (i) the frequency, (ii) the maximum acceleration, (iii) the maximum speed.' },
  ];
  const stages = [
    { title: 'Frequency', dur: 5, text: 'ω = √(k/m).', ans: 'ω = √(1200/3) = 20 rad/s; ν = ω/2π ≈ 3.2 Hz.' },
    { title: 'Greatest acceleration', dur: 5, text: 'a = −ω²x is greatest at the ends, x = ±A.', ans: 'a_max = ω²A = 400 × 0.020 = 8.0 m/s².' },
    { title: 'Greatest speed', dur: 5, text: 'The speed is greatest passing through the middle.', ans: 'v_max = ωA = 20 × 0.020 = 0.40 m/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 40, Y - 120, 20, 160, P.obj, P.objFill); ctx.fillStyle = P.objFill; ctx.fillRect(40, Y + 40, 540, 14);
    const tr = t / SLOW, x = A * Math.cos(W * tr), v = -A * W * Math.sin(W * tr), a = -W * W * x, bx = X0 + x * PXM;
    spring(ctx, 60, Y, bx - 40, Y, 12, 12, P.ink);
    block(ctx, bx - 40, Y - 40, 80, 80, '3 kg', P.vel);
    vline(ctx, X0, Y + 54, Y + 70, P.ink, 2); label(ctx, 'x = 0', X0, Y + 84, { align: 'center', size: 12 });
    for (const s of [-1, 1]) { vline(ctx, X0 + s * A * PXM, Y + 54, Y + 66, P.ink2, 1.5); label(ctx, s < 0 ? '−2 cm' : '+2 cm', X0 + s * A * PXM, Y + 84, { align: 'center', size: 12, color: P.ink2 }); }
    if (ans) {
      if (Math.abs(v) > 0.02) vec(ctx, bx, Y - 70, Math.sign(v) * 30 * Math.abs(v) / 0.4 + Math.sign(v) * 10, 0, `${Math.abs(v).toFixed(2)} m/s`, P.vel, { side: -1, at: 0.6, size: 12 });
      if (Math.abs(a) > 0.3) vec(ctx, bx, Y - 110, Math.sign(a) * (10 + 40 * Math.abs(a) / 8), 0, `${Math.abs(a).toFixed(1)} m/s²`, P.acc, { side: -1, at: 0.6, size: 12 });
      label(ctx, `ω = 20 rad/s, ν ≈ 3.2 Hz`, 40, 60, { weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['(i) ω = 20 rad/s, ν ≈ 3.2 Hz', '(ii) a_max = ω²A = 8.0 m/s²', '(iii) v_max = ωA = 0.40 m/s'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['(i) The frequency of oscillation.', '(ii) The maximum acceleration of the mass.', '(iii) The maximum speed of the mass.']);
    note(ctx, 'shown 5 times slower; displacement 5 px per mm');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const W = 20, SLOW = 10, A = 2, CASES = [[t => A * Math.sin(W * t), '(a) mean position', 'x = 2 sin 20t'], [t => A * Math.cos(W * t), '(b) maximum stretch', 'x = 2 cos 20t'], [t => -A * Math.cos(W * t), '(c) maximum compression', 'x = −2 cos 20t']];
  const qStages = [
    { title: 'Three starts', dur: 8, text: 'The mass of 13.9 (A = 2 cm, ω = 20 rad/s) is timed from three different starting positions: the mean position, maximum stretch, maximum compression. x = 0 at the unstretched position, right positive.' },
    { title: 'What is asked', dur: 4, text: 'Give x(t) in each case. How do they differ: frequency, amplitude or initial phase?' },
  ];
  const stages = [
    { title: 'x(t) in each case', dur: 8, text: 'Read the starting value and direction: (a) x = 0 moving right; (b) x = +2 cm at rest; (c) x = −2 cm at rest.', ans: '(a) 2 sin 20t, (b) 2 cos 20t, (c) −2 cos 20t (cm).' },
    { title: 'The difference', dur: 4, text: 'Compare the three graphs.', ans: 'Same amplitude (2 cm) and frequency (20 rad/s); only the initial phase differs.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const tr = t / SLOW;
    CASES.forEach(([f, n, eq], i) => {
      const y = 100 + i * 150, bx = 170 + f(tr) * 18;
      hatchRect(ctx, 30, y - 30, 12, 60, P.obj, P.objFill); spring(ctx, 42, y, bx - 22, y, 8, 8, P.ink); block(ctx, bx - 22, y - 22, 44, 44, '', P.vel);
      vline(ctx, 170, y + 26, y + 36, P.ink, 1.5); label(ctx, n, 30, y - 46, { weight: 700, size: 13 });
      if (ans) {
        const g = axes(ctx, { x: 290, y: y - 45, w: 280, h: 90, x0: 0, x1: 0.8, y0: -2.5, y1: 2.5, xl: 't', yl: '' });
        plot(ctx, g, f, 0, Math.min(tr, 0.8), P.vel, 2.5); label(ctx, eq, 300, y - 52, { weight: 800, size: 13, color: P.accent });
      }
    });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) 2 sin 20t; (b) 2 cos 20t; (c) −2 cos 20t (cm)', 'Only the initial phase differs'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['x as a function of t when timing starts at (a) the mean position, (b) maximum stretch, (c) maximum compression.', 'How do the three functions differ?']);
    note(ctx, 'shown 10 times slower; in (a) the mass is taken to be moving to the right at t = 0');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const C = [{ cx: 160, cy: 220, R: 90, T: 2, a0: Math.PI / 2, cw: true, lab: '(a) 3 cm, T = 2 s', eq: 'x = −3 sin πt cm' }, { cx: 440, cy: 220, R: 110, T: 4, a0: Math.PI, cw: false, lab: '(b) 2 m, T = 4 s', eq: 'x = −2 cos (πt/2) m' }];
  const qStages = [
    { title: 'Fig. 13.20', dur: 8, text: 'Two particles P go round circles: (a) radius 3 cm, period 2 s, starting at the bottom, clockwise; (b) radius 2 m, period 4 s, starting on the −x axis.' },
    { title: 'What is asked', dur: 4, text: 'Find the SHM of the x-projection of P in each case.' },
  ];
  const stages = [
    { title: 'Projections', dur: 8, text: 'The foot of the perpendicular from P to the x-axis moves in SHM with the circle’s radius as amplitude and its angular speed ω = 2π/T.', ans: '(a) ω = π rad/s; (b) ω = π/2 rad/s.' },
    { title: 'Starting values', dur: 4, text: '(a) starts at x = 0 and moves to −x; (b) starts at x = −2 m.', ans: '(a) x = −3 sin πt cm; (b) x = −2 cos(πt/2) m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    C.forEach(c => {
      ctx.save(); ctx.strokeStyle = P.ink2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(c.cx, c.cy, c.R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      arrow(ctx, c.cx - c.R - 20, c.cy, c.cx + c.R + 24, c.cy, P.ink2, { lw: 1.2, head: 7 }); label(ctx, 'x', c.cx + c.R + 28, c.cy, { size: 12 });
      arrow(ctx, c.cx, c.cy + c.R + 20, c.cx, c.cy - c.R - 20, P.ink2, { lw: 1.2, head: 7 });
      const w = 2 * Math.PI / c.T, ang = c.a0 + (c.cw ? -1 : 1) * w * t;          // math angle (y up)
      const px = c.cx + c.R * Math.cos(ang), py = c.cy - c.R * Math.sin(ang);
      ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([3, 4]); seg(ctx, px, py, px, c.cy); ctx.restore();
      ball(ctx, px, py, 7, P.force); ball(ctx, px, c.cy, 6, P.vel); label(ctx, 'P', px + 10, py - 10, { weight: 800, size: 13 });
      rotArrow(ctx, c.cx, c.cy, c.R + 12, c.cw, P.ink2);
      label(ctx, c.lab, c.cx, c.cy + c.R + 44, { align: 'center', weight: 700, size: 14 });
      if (ans && t >= stages[1].t0) label(ctx, c.eq, c.cx, c.cy + c.R + 70, { align: 'center', weight: 800, size: 15, color: P.accent });
    });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['ω = 2π/T: (a) π rad/s, (b) π/2 rad/s', '(a) x = −3 sin πt cm; (b) x = −2 cos(πt/2) m'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The simple harmonic motion of the x-projection of P in each case.']);
    note(ctx, 'real time; the two circles are drawn to different scales');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const C = [['(a) x = −2 sin(3t + π/3)', 2, 3, 5 * Math.PI / 6, 'r 2 cm, ω 3 rad/s, start 150°'], ['(b) x = cos(π/6 − t)', 1, 1, -Math.PI / 6, 'r 1 cm, ω 1 rad/s, start −30°'], ['(c) x = 3 sin(2πt + π/4)', 3, 2 * Math.PI, -Math.PI / 4, 'r 3 cm, ω 2π rad/s, start −45°'], ['(d) x = 2 cos πt', 2, Math.PI, 0, 'r 2 cm, ω π rad/s, start 0°']];
  const SLOW = 4;
  const qStages = [{ title: 'Four SHMs', dur: 6, text: 'x in cm, t in s. Rotation anticlockwise in every case.' }, { title: 'What is asked', dur: 4, text: 'Draw the reference circle for each: radius, starting position, angular speed.' }];
  const stages = [
    { title: 'Write each as A cos(ωt + φ)', dur: 6, text: 'A is the radius, ω the angular speed, φ the starting angle from +x.', ans: '(a) 2 cos(3t + 5π/6); (b) cos(t − π/6); (c) 3 cos(2πt − π/4); (d) 2 cos πt.' },
    { title: 'The circles', dur: 6, text: 'The particle starts at angle φ and goes anticlockwise; its x-projection reproduces the SHM.', ans: '(a) 2 cm, 3 rad/s, 150°; (b) 1 cm, 1 rad/s, −30°; (c) 3 cm, 2π rad/s, −45°; (d) 2 cm, π rad/s, 0°.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    C.forEach(([eq, A, w, ph, info], i) => {
      const cx = 160 + (i % 2) * 290, cy = 140 + Math.floor(i / 2) * 230, R = 25 * A;
      label(ctx, eq, cx, cy - 96, { align: 'center', weight: 700, size: 14 });
      arrow(ctx, cx - 95, cy, cx + 95, cy, P.ink2, { lw: 1.2, head: 7 }); arrow(ctx, cx, cy + 85, cx, cy - 85, P.ink2, { lw: 1.2, head: 7 });
      if (!ans) return;
      ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      const ang = ph + w * t / SLOW, px = cx + R * Math.cos(ang), py = cy - R * Math.sin(ang);
      ctx.save(); ctx.strokeStyle = P.ink2; ctx.globalAlpha = 0.5; seg(ctx, cx, cy, cx + R * Math.cos(ph), cy - R * Math.sin(ph)); ctx.restore();
      ball(ctx, cx + R * Math.cos(ph), cy - R * Math.sin(ph), 5, P.accent); ball(ctx, px, py, 6, P.force); ball(ctx, px, cy, 4, P.vel);
      ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([2, 3]); seg(ctx, px, py, px, cy); ctx.restore();
      label(ctx, info, cx, cy + 96, { align: 'center', weight: 700, size: 12, color: P.accent });
    });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Reference circles', ['Write as A cos(ωt + φ)', 'Radius A, angular speed ω, start at φ (green dot)'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['For each SHM: the reference circle, its radius, the starting position and the angular speed (anticlockwise).']);
    note(ctx, '25 px per cm; rotation shown 4 times slower');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const W = 1.6, D = 10;
  const qStages = [
    { title: 'Fig. 13.21', dur: 5, text: '(a) A spring of constant k, fixed at one end, with a mass m pulled by a force F. (b) The same spring with a mass m at each end, each pulled outwards by F.' },
    { title: 'Released', dur: 5, text: 'The masses are released.' },
    { title: 'What is asked', dur: 4, text: '(a) The maximum extension in each case. (b) The period of oscillation in each case.' },
  ];
  const stages = [
    { title: 'Extension', dur: 5, text: 'In both arrangements the tension all along the spring is F.', ans: '(a) Extension = F/k in both cases.' },
    { title: 'Oscillation', dur: 5, text: 'In (b) the middle of the spring stays still (equal masses): each mass is on half the spring, of constant 2k.', ans: '(b) T_a = 2π√(m/k); T_b = 2π√(m/2k), faster.' },
    { title: 'Summary', dur: 4, text: 'Same stretch, different periods.', ans: 'T_b = T_a / √2.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const pulled = t < 5, e = pulled ? 40 * smooth(clamp(t / 2)) : 40 * Math.cos(W * (t - 5)), eb = pulled ? 40 * smooth(clamp(t / 2)) : 40 * Math.cos(W * Math.SQRT2 * (t - 5));
    const Y1 = 160, Y2 = 380;
    hatchRect(ctx, 40, Y1 - 50, 16, 80, P.obj, P.objFill); ground(ctx, 40, 560, Y1 + 30);
    spring(ctx, 56, Y1, 260 + e, Y1, 10, 10, P.ink); block(ctx, 260 + e, Y1 - 28, 56, 56, 'm', P.vel);
    if (pulled) vec(ctx, 320 + e, Y1, 60, 0, 'F', P.force, { side: -1, at: 0.6, italic: true });
    label(ctx, '(a)', 40, Y1 - 70, { weight: 800, size: 15 });
    ground(ctx, 40, 560, Y2 + 30);
    const L0 = 150, c = 300; block(ctx, c - L0 / 2 - eb / 2 - 56, Y2 - 28, 56, 56, 'm', P.vel); block(ctx, c + L0 / 2 + eb / 2, Y2 - 28, 56, 56, 'm', P.vel);
    spring(ctx, c - L0 / 2 - eb / 2, Y2, c + L0 / 2 + eb / 2, Y2, 10, 10, P.ink);
    if (pulled) { vec(ctx, c - L0 / 2 - eb / 2 - 60, Y2, -50, 0, 'F', P.force, { side: 1, at: 0.6, italic: true }); vec(ctx, c + L0 / 2 + eb / 2 + 60, Y2, 50, 0, 'F', P.force, { side: -1, at: 0.6, italic: true }); }
    label(ctx, '(b)', 40, Y2 - 70, { weight: 800, size: 15 }); vline(ctx, c, Y2 - 40, Y2 + 40, P.ink2, 1, [3, 3]); label(ctx, 'centre stays still', c, Y2 - 50, { align: 'center', size: 12, color: P.ink2 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) Extension F/k in both', '(b) 2π√(m/k) and 2π√(m/2k)', 'T_b = T_a/√2'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['(a) The maximum extension of the spring in the two cases.', '(b) The period of oscillation in each case after release.']);
    note(ctx, 'extension and timing illustrative; periods in the right ratio');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const TE = 3.5, TM = TE * Math.sqrt(9.8 / 1.7), L = 300, A0 = 0.25, D = 18;
  const qStages = [
    { title: 'Earth and Moon', dur: D, text: 'A simple pendulum has a period of 3.5 s on the Earth (g = 9.8 m/s²). The same pendulum is taken to the Moon (g = 1.7 m/s²).' },
    { title: 'What is asked', dur: 4, text: 'What is its period on the Moon?' },
  ];
  const stages = [
    { title: 'Same length', dur: D, text: 'T = 2π√(l/g): same length, so T ∝ 1/√g. Weaker gravity, slower swing.', ans: 'T_moon = T_earth × √(g_earth / g_moon).' },
    { title: 'Period on the Moon', dur: 4, text: '√(9.8/1.7) ≈ 2.40.', ans: 'T_moon ≈ 3.5 × 2.40 ≈ 8.4 s.' },
  ];
  function pend(ctx, x, T, t, name) {
    hatchRect(ctx, x - 50, 50, 100, 12, P.obj, P.objFill); hline(ctx, x - 50, x + 50, 62, P.obj, 2);
    const a = A0 * Math.cos(2 * Math.PI * t / T), bx = x + L * Math.sin(a), by = 62 + L * Math.cos(a);
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; seg(ctx, x, 62, bx, by); ctx.restore(); ball(ctx, bx, by, 14, P.objFill2);
    label(ctx, name, x, 420, { align: 'center', weight: 800, size: 15 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    pend(ctx, 160, TE, t, 'Earth'); pend(ctx, 440, TM, t, 'Moon');
    label(ctx, 'T = 3.5 s', 160, 446, { align: 'center', size: 14 }); label(ctx, ans ? 'T ≈ 8.4 s' : 'T = ?', 440, 446, { align: 'center', weight: ans ? 800 : 400, size: 14, color: ans ? P.accent : P.ink });
    clock(ctx, 260, 490, t, `t = ${t.toFixed(1)} s`);
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['T ∝ 1/√g (same length)', 'T_moon = 3.5 × √(9.8/1.7) ≈ 8.4 s'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The period of the same pendulum on the Moon.']);
    note(ctx, 'real time; amplitude illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const LY = 260, CW = 120, CH = 140, SUB = 0.6, W = 2.2, D = 10;           // cork floats with 60% submerged (illustrative ρ/ρl)
  const qStages = [
    { title: 'A floating cork', dur: 3, text: 'A cylindrical cork (base area A, height h, density ρ) floats in a liquid of density ρ_l.' },
    { title: 'Pushed and released', dur: D - 3, text: 'It is pushed down slightly and released.' },
    { title: 'What is asked', dur: 4, text: 'Show it oscillates in SHM with period T = 2π√(hρ/ρ_l g).' },
  ];
  const stages = [
    { title: 'Floating', dur: 3, text: 'At rest, the buoyant force balances the weight ρAhg.', ans: '' },
    { title: 'Restoring force', dur: D - 3, text: 'Pushed a further x down, an extra volume Ax is under the liquid: an extra upward force ρ_l A g x.', ans: 'F = −(ρ_l A g) x: proportional to x and opposite to it ⇒ SHM.' },
    { title: 'Period', dur: 4, text: 'k = ρ_l A g, m = ρAh.', ans: 'T = 2π√(m/k) = 2π√(hρ/(ρ_l g)).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.4; ctx.fillRect(60, LY, 480, 220); ctx.globalAlpha = 1; hline(ctx, 60, 540, LY, P.vel, 2);
    const x = t < 1 ? 0 : t < 3 ? 26 * smooth(clamp((t - 1) / 1.5)) : 26 * Math.cos(W * (t - 3)), top = LY - CH * (1 - SUB) + x;
    ctx.fillStyle = P.wood; ctx.fillRect(300 - CW / 2, top, CW, CH); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(300 - CW / 2, top, CW, CH);
    label(ctx, 'cork', 300, top + 24, { align: 'center', weight: 700, size: 13 });
    hline(ctx, 300 + CW / 2 + 10, 300 + CW / 2 + 60, LY - CH * (1 - SUB), P.ink2, 1, [3, 3]); label(ctx, 'floating level', 300 + CW / 2 + 64, LY - CH * (1 - SUB), { size: 12, color: P.ink2 });
    if (ans && Math.abs(x) > 2) { vdim(ctx, 300 + CW / 2 + 30, Math.min(LY - CH * (1 - SUB), top), Math.max(LY - CH * (1 - SUB), top), P.accent); label(ctx, 'x', 300 + CW / 2 + 40, (top + LY - CH * (1 - SUB)) / 2, { italic: true, weight: 800, size: 15, color: P.accent }); vec(ctx, 300 - CW / 2 - 30, top + CH / 2, 0, -x * 2, 'extra force ρ_l A g x', P.force, { side: 1, at: 1, align: 'right', ax: -6, size: 12 }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Proof', ['Floating: weight = buoyant force', 'Extra push x: F = −ρ_l A g x ⇒ SHM', 'T = 2π√(ρAh/ρ_l A g) = 2π√(hρ/ρ_l g)'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['Show that the cork oscillates in SHM with period T = 2π√(hρ/ρ_l g).']);
    note(ctx, 'sizes and densities illustrative; no damping');
  }
  return { qStages, stages, draw };
})();

//@@ q18
const SCENE = (() => {
  const LX = 200, RX = 400, BY = 420, H0 = 200, W = 2.0, D = 10;
  const qStages = [
    { title: 'Held by suction', dur: 4, text: 'One end of a mercury U-tube is connected to a suction pump, the other is open; a small pressure difference keeps the levels unequal.' },
    { title: 'Pump removed', dur: D - 4, text: 'The suction pump is removed.' },
    { title: 'What is asked', dur: 4, text: 'Show that the mercury column executes simple harmonic motion.' },
  ];
  const stages = [
    { title: 'Unequal levels', dur: 4, text: 'One surface is y above the equilibrium level, the other y below: an unbalanced column of height 2y.', ans: '' },
    { title: 'Restoring force', dur: D - 4, text: 'The extra column pushes back with pressure 2ρgy over the area A: F = −2ρgA y. The whole column (length L, mass ρAL) moves together.', ans: 'ρAL a = −2ρgA y ⇒ a = −(2g/L) y: SHM.' },
    { title: 'Period', dur: 4, text: 'ω² = 2g/L.', ans: 'T = 2π√(L/2g).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const y = t < 4 ? 40 : 40 * Math.cos(W * (t - 4)), hl = H0 + y, hr = H0 - y;
    ctx.fillStyle = P.ink2; ctx.globalAlpha = 0.55; ctx.fillRect(LX - 20, BY - hl, 40, hl); ctx.fillRect(RX - 20, BY - hr, 40, hr); ctx.fillRect(LX - 20, BY, RX - LX + 40, 40); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(LX - 20, 70); ctx.lineTo(LX - 20, BY + 40); ctx.lineTo(RX + 20, BY + 40); ctx.lineTo(RX + 20, 70); ctx.moveTo(LX + 20, 70); ctx.lineTo(LX + 20, BY); ctx.lineTo(RX - 20, BY); ctx.lineTo(RX - 20, 70); ctx.stroke();
    hline(ctx, LX - 40, RX + 40, BY - H0, P.ink2, 1, [4, 4]); label(ctx, 'equilibrium level', RX + 44, BY - H0, { size: 12, color: P.ink2 });
    if (t < 4) { block(ctx, RX - 30, 30, 60, 30, 'pump', P.objFill2); vline(ctx, RX, 60, 70, P.obj, 3); }
    if (ans && Math.abs(y) > 3) { vdim(ctx, LX - 50, BY - hl, BY - hr, P.accent); label(ctx, '2y', LX - 58, BY - H0, { align: 'right', weight: 800, size: 15, color: P.accent }); }
    label(ctx, 'mercury', (LX + RX) / 2, BY + 22, { align: 'center', weight: 700, size: 13 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Proof', ['Level difference 2y', 'F = −2ρgA y on mass ρAL ⇒ a = −(2g/L)y', 'SHM with T = 2π√(L/2g)'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['Show that the mercury column executes simple harmonic motion after the pump is removed.']);
    note(ctx, 'column length and amplitude illustrative; no damping');
  }
  return { qStages, stages, draw };
})();
