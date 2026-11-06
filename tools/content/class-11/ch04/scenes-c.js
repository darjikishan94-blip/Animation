//@@ q13
const SCENE = (() => {
  const M = 70, G = 10, D = 6.5;
  const CASES = [
    { name: '(a) moving up at a uniform 10 m/s', a: 0, v0: 1, read: 700 },
    { name: '(b) going down with acceleration 5 m/s²', a: -5, v0: 0, read: 350 },
    { name: '(c) going up with acceleration 5 m/s²', a: 5, v0: 0, read: 1050 },
    { name: '(d) falling freely (mechanism failed)', a: -10, v0: 0, read: 0 },
  ];
  const ANS = ['N = mg = 700 N (scale shows 70 kg)', 'N = m(g − a) = 70 × 5 = 350 N (35 kg)', 'N = m(g + a) = 70 × 15 = 1050 N (105 kg)', 'N = m(g − g) = 0: the scale reads zero'];
  const qStages = partStages(CASES.map(c => c.name.slice(0, 3) + ' ' + ['Uniform speed up', 'Accelerating down', 'Accelerating up', 'Free fall'][CASES.indexOf(c)]),
    CASES.map(c => `A man of mass 70 kg stands on a weighing scale in a lift that is ${c.name.slice(4)}. What does the scale read?`), D);
  const stages = partStages(qStages.map(s => s.title), [
    'Uniform velocity means zero acceleration: the scale pushes up exactly as hard as gravity pulls down.',
    'Accelerating downward, the man needs a net downward force, so the scale pushes up less than his weight.',
    'Accelerating upward, he needs a net upward force, so the scale pushes up more than his weight.',
    'In free fall the man and the scale fall together with acceleration g: the scale does not push on him at all.'], D, ANS);
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const k = Math.min(3, Math.floor(t / D)), u = Math.max(0, t - k * D - 1), c = CASES[k];
    const sh = 30 * (c.v0 * u) + 6 * 0.5 * c.a * u * u;                 // illustrative cabin travel (px)
    const cy = clamp(300 - sh, 90, 420);
    ctx.fillStyle = P.grid; ctx.fillRect(160, 40, 200, 470); ctx.strokeStyle = P.ink2; ctx.lineWidth = 1.5; ctx.strokeRect(160, 40, 200, 470);
    vline(ctx, 260, 40, cy - 120, P.obj, 2);
    ctx.fillStyle = P.sheet; ctx.fillRect(180, cy - 120, 160, 180); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(180, cy - 120, 160, 180);
    ctx.fillStyle = P.objFill2; ctx.fillRect(225, cy + 48, 70, 12); ctx.strokeRect(225, cy + 48, 70, 12);
    person(ctx, 260, cy + 48, 0.95);
    label(ctx, ans ? `${c.read} N` : '? N', 260, cy + 72, { align: 'center', weight: 800, size: 15, color: P.accent });
    if (c.v0) vec(ctx, 380, cy - 20, 0, -50, '10 m/s', P.vel, { side: 1, at: 0.6, align: 'left', ax: 6 });
    if (c.a) vec(ctx, 380, cy + 30, 0, -c.a * 8, `a = ${Math.abs(c.a)} m/s²`, P.acc, { side: 1, at: 0.6, align: 'left', ax: 6 });
    if (ans) {
      vec(ctx, 200, cy - 20, 0, 70, 'mg = 700 N', P.force, { side: 1, at: 0.8, align: 'right', ax: -6 });
      if (c.read) vec(ctx, 200, cy + 46, 0, -c.read / 10, `N = ${c.read} N`, P.vel, { side: -1, at: 0.8, align: 'right', ax: -6 });
    }
    label(ctx, '70 kg', 300, cy - 100, { weight: 700, size: 13 });
    partsPanel(ctx, 630, 34, 300, ans ? 'Scale reading (N = normal force)' : 'Scale reading when the lift is…', CASES.map(c => c.name), k, ans, ANS);
    note(ctx, 'take g = 10 m/s²; lift motion illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const M = 4, V = 0.75, x = t => t < 0 ? 0 : t < 4 ? V * t : 3;
  const S = 6, T0 = -2, T1 = 7, SP = (T1 - T0) / S;
  const qStages = [
    { title: 'The graph', dur: 6, text: 'Fig. 4.16: the position–time graph of a particle of mass 4 kg moving along a line.' },
    { title: 'What is asked', dur: 4, text: '(a) The force on the particle for t < 0, t > 4 s and 0 < t < 4 s. (b) The impulse at t = 0 and t = 4 s.' },
  ];
  const stages = [
    { title: 'Following the graph', dur: S, text: 'Each straight part of the x–t graph means a constant velocity, so no force acts during it. The velocity jumps only at t = 0 and t = 4 s.', ans: 'For t < 0: v = 0; for 0 < t < 4 s: v = 3/4 = 0.75 m/s; for t > 4 s: v = 0. So F = 0 in all three intervals.' },
    { title: 'The impulses', dur: 5, text: 'At each corner of the graph the momentum changes suddenly: that change is the impulse.', ans: 'At t = 0: 4 × (0.75 − 0) = +3 kg m/s; at t = 4 s: 4 × (0 − 0.75) = −3 kg m/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 90, y: 70, w: 440, h: 230, x0: -2, x1: 7, y0: 0, y1: 4, xt: [0, 4], yt: [3], xl: 't (s)', yl: 'x (m)' });
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 3; poly(ctx, [[g.X(-2), g.Y(0)], [g.X(0), g.Y(0)], [g.X(4), g.Y(3)], [g.X(7), g.Y(3)]]); ctx.restore();
    label(ctx, 'A', g.X(4) + 4, g.Y(3) - 14, { weight: 700, size: 14 });
    // the particle on its line
    const LY = 400, LX = 120, KX = 110;
    hline(ctx, LX - 20, LX + 3.4 * KX, LY, P.ink2, 1.5); for (let i = 0; i <= 3; i++) { vline(ctx, LX + i * KX, LY - 6, LY + 6, P.ink2, 1.2); label(ctx, `${i} m`, LX + i * KX, LY + 18, { align: 'center', size: 12 }); }
    const tt = ans ? Math.min(T1, T0 + Math.min(t, S) * SP) : T0;
    ball(ctx, LX + x(tt) * KX, LY - 14, 10, P.objFill2); label(ctx, '4 kg', LX + x(tt) * KX, LY - 34, { align: 'center', size: 12, weight: 700 });
    if (ans) {
      vline(ctx, g.X(tt), g.Y(4), g.Y(0), P.ink2, 1, [3, 4]);
      ball(ctx, g.X(tt), g.Y(x(tt)), 5, P.accent);
      const v = tt > 0 && tt < 4 ? V : 0;
      label(ctx, `v = ${v} m/s, F = 0`, 120, 470, { weight: 700, size: 15, color: P.vel });
      if (t >= S) { vec(ctx, g.X(0), g.Y(0) + 30, 50, 0, '+3 kg m/s', P.force, { side: 1, at: 0.6, ay: 4 }); vec(ctx, g.X(4) + 60, g.Y(3) + 30, -50, 0, '−3 kg m/s', P.force, { side: -1, at: 0.5, ay: 4 }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) t < 0, 0 < t < 4 s, t > 4 s: force = 0 (constant velocity in each)', '(b) impulse at t = 0: +3 kg m/s; at t = 4 s: −3 kg m/s'], t < S ? 0 : 1, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The force on the particle for t < 0, t > 4 s, 0 < t < 4 s.', '(b) The impulse at t = 0 and t = 4 s. (One-dimensional motion only.)']);
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const MA = 10, MB = 20, F = 600, A = F / (MA + MB), D = 7;
  const qStages = [
    { title: '(i) Force on A', dur: D, text: 'Bodies A (10 kg) and B (20 kg) on a smooth horizontal surface are tied by a light string. A horizontal force F = 600 N is applied to A, along the string.' },
    { title: '(ii) Force on B', dur: D, text: 'Now the 600 N force is applied to B instead. What is the tension in the string in each case?' },
  ];
  const stages = [
    { title: '(i) Force on A', dur: D, text: 'Both bodies move together: a = F/(m_A + m_B) = 600/30 = 20 m/s². The string has to pull B along.', ans: '(i) T = m_B × a = 20 × 20 = 400 N.' },
    { title: '(ii) Force on B', dur: D, text: 'The acceleration is the same 20 m/s², but now the string only has to pull the lighter body A.', ans: '(ii) T = m_A × a = 10 × 20 = 200 N.' },
  ];
  function pair(ctx, y, pulled, u, ans, active) {
    const s = active ? 0.5 * 6 * u * u : 0;                      // illustrative travel, shown very slowly
    const lead = pulled === 'A' ? { m: MA, n: 'A' } : { m: MB, n: 'B' }, trail_ = pulled === 'A' ? { m: MB, n: 'B' } : { m: MA, n: 'A' };
    const wt = 60 + trail_.m * 2, wl = 60 + lead.m * 2, x1 = 80 + s, x2 = x1 + wt + 90;
    hline(ctx, 40, 600, y + 40, P.obj, 2);
    block(ctx, x1, y + 40 - (30 + trail_.m), wt, 30 + trail_.m, `${trail_.n}: ${trail_.m} kg`);
    block(ctx, x2, y + 40 - (30 + lead.m), wl, 30 + lead.m, `${lead.n}: ${lead.m} kg`);
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; seg(ctx, x1 + wt, y + 22, x2, y + 22); ctx.restore();
    vec(ctx, x2 + wl, y + 22, 70, 0, 'F = 600 N', P.force, { side: -1, at: 0.6 });
    if (ans && active) { const T = trail_.m * A; vec(ctx, x1 + wt, y + 22, T / 10, 0, '', P.vel); vec(ctx, x2, y + 22, -T / 10, 0, '', P.vel); label(ctx, `T = ${T} N`, x1 + wt + 45, y + 4, { align: 'center', weight: 700, size: 14, color: P.vel }); }
    label(ctx, pulled === 'A' ? '(i) force applied to A' : '(ii) force applied to B', 60, y - 40, { weight: 700, size: 15, color: active ? P.ink : P.ink2 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const k = t < D ? 0 : 1, u = Math.max(0, t - k * D - 1);
    pair(ctx, 150, 'A', k === 0 ? u : 0, ans, k === 0);
    pair(ctx, 380, 'B', k === 1 ? u : 0, ans, k === 1);
    if (ans) partsPanel(ctx, 630, 34, 300, 'Tension in the string', ['a = 600/(10 + 20) = 20 m/s² in both cases', '(i) force on A: T = 20 kg × 20 = 400 N', '(ii) force on B: T = 10 kg × 20 = 200 N'], k + 1, false);
    else askedPanel(ctx, 630, 34, 300, ['The tension in the string when the 600 N force is applied to (i) A, (ii) B.']);
    note(ctx, 'smooth surface; motion shown much slower than real (a = 20 m/s²)');
  }
  return { qStages, stages, draw };
})();

//@@ q16
const SCENE = (() => {
  const M1 = 8, M2 = 12, G = 10, A = (M2 - M1) * G / (M1 + M2), T = 2 * M1 * M2 * G / (M1 + M2), K = 40, PX = 280, PY = 80, R = 40;
  const S1 = 3, S2 = S1 + 2, S3 = S2 + 4;
  const qStages = [
    { title: 'Two masses over a pulley', dur: S1, text: 'Masses of 8 kg and 12 kg hang at the two ends of a light inextensible string over a frictionless pulley.' },
    { title: 'Released', dur: S2 - S1, text: 'The masses are released.' },
    { title: 'What is asked', dur: S3 - S2, text: 'Find the acceleration of the masses and the tension in the string.' },
  ];
  const stages = [
    { title: 'Forces', dur: S1, text: 'The same tension T pulls up on both masses. Gravity pulls down 80 N and 120 N.', ans: 'For 12 kg: 120 − T = 12a. For 8 kg: T − 80 = 8a.' },
    { title: 'Released', dur: S2 - S1, text: 'The heavier mass goes down and the lighter one up, with the same acceleration.', ans: 'Adding: 40 = 20a, so a = 2 m/s².' },
    { title: 'Tension', dur: S3 - S2, text: 'Put a back into either equation.', ans: 'T = 8 × (10 + 2) = 96 N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, PX - 80, PX + 80, PY - 50, P.obj, 3); vline(ctx, PX, PY - 50, PY, P.obj, 2);
    ctx.fillStyle = P.objFill; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(PX, PY, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    const tm = clamp(t - S1, 0, 1.6), s = 0.5 * A * tm * tm * K, yl = 300 - s, yr = 300 + s;   // stopped after 1.6 s, before the 8 kg mass reaches the pulley
    vline(ctx, PX - R, PY, yl - 40, P.ink, 2); vline(ctx, PX + R, PY, yr - 50, P.ink, 2);
    block(ctx, PX - R - 25, yl - 40, 50, 40, '8 kg'); block(ctx, PX + R - 28, yr - 50, 56, 50, '12 kg');
    if (ans) {
      const FS = 0.8;                                                     // force arrows: 0.8 px per newton
      vec(ctx, PX - R - 14, yl - 40, 0, -T * FS, 'T = 96 N', P.vel, { side: -1, at: 0.6, align: 'right' }); vec(ctx, PX - R, yl, 0, 80 * FS, '80 N', P.force, { side: 1, at: 0.8, align: 'right' });
      vec(ctx, PX + R + 14, yr - 50, 0, -T * FS, 'T = 96 N', P.vel, { side: 1, at: 0.6, align: 'left' }); vec(ctx, PX + R, yr, 0, 120 * FS, '120 N', P.force, { side: -1, at: 0.8, align: 'left' });
      const al = t < S2 ? 'a' : 'a = 2 m/s²';
      vec(ctx, PX - R - 150, yl - 10, 0, -40, al, P.acc, { at: 1, ay: -10, side: 0 }); vec(ctx, PX + R + 130, yr - 50, 0, 40, al, P.acc, { at: 1, ay: 12, side: 0 });
      partsPanel(ctx, 630, 34, 300, 'Working', ['12 kg: 120 − T = 12a;  8 kg: T − 80 = 8a', 'a = (12 − 8) × 10 / 20 = 2 m/s²', 'T = 8 × (10 + 2) = 96 N'], t < S1 ? 0 : t < S2 ? 1 : 2, false);
    } else askedPanel(ctx, 630, 34, 300, ['The acceleration of the masses and the tension in the string when they are released. (g = 10 m/s²)']);
    note(ctx, 'frictionless pulley; 40 px per metre, real time');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const M1 = 1, M2 = 2, CX = 300, CY = 260, S1 = 3, S2 = S1 + 4, S3 = S2 + 4;   // fragment masses illustrative (not given)
  const qStages = [
    { title: 'A nucleus at rest', dur: S1, text: 'A nucleus is at rest in the laboratory frame of reference.' },
    { title: 'It disintegrates', dur: S2 - S1, text: 'It disintegrates into two smaller nuclei.' },
    { title: 'What is asked', dur: S3 - S2, text: 'Show that the products must move in opposite directions.' },
  ];
  const stages = [
    { title: 'Momentum before', dur: S1, text: 'At rest, the nucleus has zero momentum. No external force acts during the break-up, so the total momentum stays zero.', ans: 'Total momentum before = 0.' },
    { title: 'Momentum after', dur: S2 - S1, text: 'The two products fly apart. Their momenta must add up to zero.', ans: 'm₁v₁ + m₂v₂ = 0, so v₁ = −(m₂/m₁) v₂.' },
    { title: 'Opposite directions', dur: S3 - S2, text: 'Two vectors add to zero only if they are equal in size and opposite in direction.', ans: 'v₁ and v₂ are along the same line in opposite directions; the lighter product moves faster.' },
  ];
  function nuc(ctx, x, y, n, r) { for (let i = 0; i < n; i++) { const a = i * 2.4, rr = r * Math.sqrt(i / n); ball(ctx, x + rr * Math.cos(a), y + rr * Math.sin(a), 6, i % 2 ? P.force : P.objFill2); } }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    if (t < S1) { nuc(ctx, CX, CY, 18, 24); label(ctx, 'at rest', CX, CY + 50, { align: 'center', weight: 700, size: 14 }); }
    else {
      const u = Math.min(t - S1, 3.5), v2 = 30, v1 = v2 * M2 / M1;
      nuc(ctx, CX - v1 * u, CY, 6, 12); nuc(ctx, CX + v2 * u, CY, 12, 18);
      if (ans) { vec(ctx, CX - v1 * u, CY - 40, -60, 0, 'p₁', P.vel, { side: -1, at: 0.6 }); vec(ctx, CX + v2 * u, CY - 40, 60, 0, 'p₂', P.vel, { side: -1, at: 0.6 }); label(ctx, 'p₁ + p₂ = 0', CX, CY + 80, { align: 'center', weight: 700, size: 16, color: P.accent }); }
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Momentum is conserved', ['Before: momentum = 0', 'After: m₁v₁ + m₂v₂ = 0', 'So v₁ = −(m₂/m₁)v₂: opposite directions'], t < S1 ? 0 : t < S2 ? 1 : 2, false);
    else askedPanel(ctx, 630, 34, 300, ['Show that the products must move in opposite directions.']);
    note(ctx, 'fragment sizes illustrative (not given)');
  }
  return { qStages, stages, draw };
})();

//@@ q18
const SCENE = (() => {
  const M = 0.05, V = 6, CX = 300, CY = 260, S1 = 3, SC = S1 + 2, S2 = SC + 2.5, S3 = S2 + 4;
  const qStages = [
    { title: 'Two billiard balls', dur: SC, text: 'Two billiard balls, each of mass 0.05 kg, move in opposite directions at 6 m/s.' },
    { title: 'Collision', dur: S2 - SC, text: 'They collide and rebound with the same speed.' },
    { title: 'What is asked', dur: S3 - S2, text: 'What is the impulse imparted to each ball by the other?' },
  ];
  const stages = [
    { title: 'Before', dur: SC, text: 'Take the direction of ball A’s initial motion (to the right) as positive.', ans: 'Ball A: p = 0.05 × 6 = 0.3 kg m/s; ball B: −0.3 kg m/s.' },
    { title: 'After the collision', dur: S2 - SC, text: 'Each ball reverses its velocity, keeping the same speed.', ans: 'Ball A: −0.3 kg m/s; ball B: +0.3 kg m/s.' },
    { title: 'Impulse', dur: S3 - S2, text: 'Impulse = change in momentum.', ans: 'On A: −0.3 − 0.3 = −0.6 kg m/s; on B: +0.6 kg m/s. Each receives 0.6 kg m/s, in opposite directions.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.leaf; ctx.globalAlpha = 0.25; ctx.fillRect(40, 150, 540, 220); ctx.globalAlpha = 1;
    const gap = t < SC - 2 ? 180 : t < SC ? 180 * (SC - t) / 2 : 180 * Math.min(1, (t - SC) / 2), before = t < SC;
    ball(ctx, CX - 16 - gap, CY, 16, P.force); ball(ctx, CX + 16 + gap, CY, 16, P.ke);
    label(ctx, 'A', CX - 16 - gap, CY - 30, { align: 'center', weight: 700 }); label(ctx, 'B', CX + 16 + gap, CY - 30, { align: 'center', weight: 700 });
    const dir = before ? 1 : -1;
    vec(ctx, CX - 16 - gap, CY + 30, dir * 50, 0, '6 m/s', P.vel, { side: 1, at: 0.6, size: 12 });
    vec(ctx, CX + 16 + gap, CY + 30, -dir * 50, 0, '6 m/s', P.vel, { side: 1, at: 0.6, size: 12 });
    if (ans && t >= S2) { vec(ctx, CX - 16 - gap, CY + 80, -70, 0, 'impulse 0.6 kg m/s', P.force, { side: -1, at: 1, align: 'left', ay: 4 }); vec(ctx, CX + 16 + gap, CY + 80, 70, 0, 'impulse 0.6 kg m/s', P.force, { side: 1, at: 1, align: 'right', ay: 4 }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working (right = +)', ['A before: +0.3 kg m/s; B before: −0.3 kg m/s', 'A after: −0.3 kg m/s; B after: +0.3 kg m/s', 'Impulse on each = 0.6 kg m/s, in opposite directions'], t < SC ? 0 : t < S2 ? 1 : 2, false);
    else askedPanel(ctx, 630, 34, 300, ['The impulse imparted to each ball due to the other.']);
  }
  return { qStages, stages, draw };
})();
