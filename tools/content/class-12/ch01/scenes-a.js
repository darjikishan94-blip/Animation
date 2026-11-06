//@@ q06
const SCENE = (() => {
  const S = 260, CX = 300, CY = 260, H = S / 2, CH = [['A', 2, -1, -1], ['B', -5, 1, -1], ['C', 2, 1, 1], ['D', -5, -1, 1]];
  const qStages = [
    { title: 'Four charges on a square', dur: 5, text: 'q_A = 2 μC, q_B = −5 μC, q_C = 2 μC, q_D = −5 μC sit at the corners of a 10 cm square ABCD. A 1 μC charge is at the centre.' },
    { title: 'What is asked', dur: 4, text: 'What is the force on the centre charge?' },
  ];
  const stages = [
    { title: 'Four forces', dur: 5, text: 'All corners are the same distance from the centre. The positive corners push the centre charge away; the negative corners pull it towards themselves.', ans: 'A and C (opposite, equal charges) give equal and opposite forces; so do B and D.' },
    { title: 'Net force', dur: 4, text: 'The forces cancel in pairs.', ans: 'Net force = 0.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.lineWidth = 1.5; ctx.strokeRect(CX - H, CY - H, S, S); ctx.restore();
    CH.forEach(([n, q, sx, sy]) => { const x = CX + sx * H, y = CY + sy * H; ball(ctx, x, y, 14, q > 0 ? P.force : P.vel); label(ctx, q > 0 ? '+' : '−', x, y, { align: 'center', weight: 800, size: 16, color: P.sheet, halo: false }); label(ctx, `${n}: ${q} μC`, x + sx * 26, y + sy * 26, { align: sx > 0 ? 'left' : 'right', weight: 700, size: 13 }); });
    ball(ctx, CX, CY, 9, P.accent); label(ctx, '1 μC', CX, CY + 26, { align: 'center', weight: 700, size: 12 });
    dim(ctx, CX - H, CX + H, CY + H + 40, P.ink2); label(ctx, '10 cm', CX, CY + H + 56, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      const show = clamp(t / 3);
      CH.forEach(([n, q, sx, sy]) => { const ux = sx / Math.SQRT2, uy = sy / Math.SQRT2, L = 20 * Math.abs(q) * show, d = q > 0 ? -1 : 1; vec(ctx, CX, CY, d * ux * L, d * uy * L, `F_${n}`, q > 0 ? P.force : P.vel, { side: 1, at: 1, size: 12, lw: 3 }); });
      if (t >= stages[1].t0) label(ctx, 'net force = 0', CX, 60, { align: 'center', weight: 800, size: 18, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Opposite corners have equal charges: forces cancel in pairs', 'Net force on 1 μC = 0'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The force on the 1 μC charge at the centre of the square.']);
    note(ctx, 'force arrows to scale with each other');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const AX = 100, BX = 500, Y = 240, OX = 300, E1 = 2.7e6;
  const qStages = [
    { title: 'Two opposite charges', dur: 5, text: 'q_A = 3 μC and q_B = −3 μC are 20 cm apart in vacuum. O is the midpoint.' },
    { title: 'What is asked', dur: 4, text: '(a) The electric field at O. (b) The force on a −1.5 × 10⁻⁹ C test charge placed at O.' },
  ];
  const stages = [
    { title: 'Field of each charge', dur: 5, text: 'Each is 10 cm from O: E = kq/r² = 9 × 10⁹ × 3 × 10⁻⁶ / 0.01.', ans: '2.7 × 10⁶ N/C from each, both pointing from A to B.' },
    { title: 'Total field', dur: 4, text: 'Away from the + charge and towards the − charge: the same way.', ans: '(a) E = 5.4 × 10⁶ N/C along AB.' },
    { title: 'Force on the test charge', dur: 5, text: 'F = qE; a negative charge feels a force opposite to E.', ans: '(b) F = 1.5 × 10⁻⁹ × 5.4 × 10⁶ = 8.1 × 10⁻³ N, from B towards A.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, AX, BX, Y, P.ink2, 1, [4, 4]);
    ball(ctx, AX, Y, 18, P.force); label(ctx, '+', AX, Y, { align: 'center', weight: 800, size: 18, color: P.sheet, halo: false }); label(ctx, 'A: +3 μC', AX, Y + 34, { align: 'center', weight: 700, size: 13 });
    ball(ctx, BX, Y, 18, P.vel); label(ctx, '−', BX, Y, { align: 'center', weight: 800, size: 18, color: P.sheet, halo: false }); label(ctx, 'B: −3 μC', BX, Y + 34, { align: 'center', weight: 700, size: 13 });
    vline(ctx, OX, Y - 8, Y + 8, P.ink, 2); label(ctx, 'O', OX, Y + 34, { align: 'center', weight: 800, size: 14 });
    dim(ctx, AX, BX, Y + 70, P.ink2); label(ctx, '20 cm', OX, Y + 86, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      const st = stageAt(stages, t);
      vec(ctx, OX, Y - 40, 60, 0, 'from A', P.force, { side: -1, at: 0.5, size: 12 }); vec(ctx, OX + 60, Y - 40, 60, 0, 'from B', P.vel, { side: -1, at: 0.5, size: 12 });
      if (st >= 1) vec(ctx, OX, Y - 90, 120, 0, 'E = 5.4 × 10⁶ N/C', P.accent, { side: -1, at: 0.5, lw: 5, size: 13 });
      if (st >= 2) { ball(ctx, OX, Y, 7, P.vel); vec(ctx, OX - 10, Y + 120, -80, 0, 'F = 8.1 × 10⁻³ N', P.vel, { side: -1, at: 0.5, size: 13 }); label(ctx, 'test charge −1.5 nC at O', OX, Y + 160, { align: 'center', size: 12 }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['Each: 2.7 × 10⁶ N/C, along AB', '(a) E = 5.4 × 10⁶ N/C along AB', '(b) F = 8.1 × 10⁻³ N, along BA'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The electric field at the midpoint O.', '(b) The force on a negative test charge of 1.5 × 10⁻⁹ C at O.']);
    note(ctx, '2 px per mm; field arrows to scale with each other');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const CX = 300, CY = 270, L = 150, TH = 30 * Math.PI / 180, D = 8;
  const qStages = [
    { title: 'Dipole in a field', dur: 5, text: 'A dipole of moment 4 × 10⁻⁹ C m makes 30° with a uniform field of 5 × 10⁴ N/C.' },
    { title: 'What is asked', dur: 4, text: 'What is the magnitude of the torque on the dipole?' },
  ];
  const stages = [
    { title: 'A couple', dur: 5, text: 'The field pushes +q along E and −q against E with equal forces: no net force, but a turning couple.', ans: 'τ = pE sin θ.' },
    { title: 'Torque', dur: 4, text: 'Substitute.', ans: 'τ = 4 × 10⁻⁹ × 5 × 10⁴ × sin 30° = 10⁻⁴ N m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let y = 80; y <= 460; y += 50) arrow(ctx, 40, y, 580, y, P.grid, { lw: 1.5, head: 9 });
    label(ctx, 'E = 5 × 10⁴ N/C', 560, 60, { align: 'right', weight: 700, size: 14, color: P.ink2 });
    const th = ans && t >= stages[1].t1 - 0.01 ? TH : TH;
    const dx = L * Math.cos(th), dy = -L * Math.sin(th);
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 4; seg(ctx, CX - dx, CY - dy, CX + dx, CY + dy); ctx.restore();
    ball(ctx, CX + dx, CY + dy, 14, P.force); label(ctx, '+q', CX + dx + 18, CY + dy - 14, { weight: 800, size: 14 });
    ball(ctx, CX - dx, CY - dy, 14, P.vel); label(ctx, '−q', CX - dx - 18, CY - dy + 18, { align: 'right', weight: 800, size: 14 });
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(CX, CY, 60, -th, 0); ctx.stroke(); ctx.restore(); label(ctx, '30°', CX + 66, CY - 16, { weight: 700, size: 14 });
    vec(ctx, CX - 30, CY + 30, 0.6 * dx, 0.6 * dy, 'p', P.accent, { side: -1, at: 1, italic: true, lw: 3 });
    if (ans) { vec(ctx, CX + dx, CY + dy, 70, 0, 'qE', P.force, { side: 1, at: 0.6 }); vec(ctx, CX - dx, CY - dy, -70, 0, 'qE', P.vel, { side: 1, at: 0.6 }); rotArrow(ctx, CX, CY, 110, true, P.acc); if (t >= stages[1].t0) label(ctx, 'τ = 10⁻⁴ N m', CX, 470, { align: 'center', weight: 800, size: 18, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Working', ['Couple: τ = pE sin θ', 'τ = 4 × 10⁻⁹ × 5 × 10⁴ × ½ = 10⁻⁴ N m'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['The magnitude of the torque on the dipole.']);
    note(ctx, 'dipole size and charge illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const X0 = 60, X1 = 470, YT = 150, YB = 360, D = 8;
  const TR = [[1, 215, -55, P => P.force], [2, 245, -35, P => P.vel], [3, 280, 70, P => P.leaf]];   // [n, entry y, total deflection at X1]
  const qStages = [
    { title: 'Fig. 1.30', dur: D, text: 'Three charged particles enter a uniform field between a positive plate (top) and a negative plate (bottom).' },
    { title: 'What is asked', dur: 4, text: 'Give the signs of the three charges. Which has the highest charge-to-mass ratio?' },
  ];
  const stages = [
    { title: 'Direction of force', dur: D, text: 'The field points from + to −: downward. Positive charges are pushed down, negative charges up.', ans: 'Particles 1 and 2 bend up: negative. Particle 3 bends down: positive.' },
    { title: 'Charge to mass ratio', dur: 4, text: 'For the same entry speed, the sideways acceleration qE/m decides the bending.', ans: 'Particle 3 bends most: highest q/m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, X0 + 40, X1, YT, P.ink, 3); hline(ctx, X0 + 40, X1, YB, P.ink, 3);
    for (let x = X0 + 60; x < X1; x += 40) { label(ctx, '+', x, YT - 14, { align: 'center', weight: 800, size: 16, color: P.force }); label(ctx, '−', x, YB + 14, { align: 'center', weight: 800, size: 16, color: P.vel }); }
    if (ans) for (let x = X0 + 80; x < X1; x += 80) vec(ctx, x, YT + 20, 0, 40, '', P.grid, { lw: 2, head: 8 });
    const u = clamp(t / (D - 1));
    TR.forEach(([n, y0, dmax, col]) => {
      const pts = []; for (let s = 0; s <= u; s += 0.01) { const x = X0 + (X1 + 80 - X0) * s, f = clamp((x - (X0 + 40)) / (X1 - X0 - 40)); pts.push([x, y0 + dmax * f * f]); }
      ctx.save(); ctx.strokeStyle = col(P); ctx.lineWidth = 2.5; if (pts.length > 1) poly(ctx, pts); ctx.restore();
      if (u >= 1) { const p = pts[pts.length - 1]; label(ctx, String(n), p[0] + 10, p[1], { weight: 800, size: 15, color: col(P) }); }
    });
    if (ans && t >= stages[0].t1 - 1) { label(ctx, '1, 2: negative', 70, 450, { weight: 800, size: 15, color: P.vel }); label(ctx, '3: positive, highest q/m', 70, 476, { weight: 800, size: 15, color: P.leaf }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['1 and 2 negative; 3 positive', '3 has the highest q/m'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The signs of the three charges.', 'The particle with the highest charge-to-mass ratio.']);
    note(ctx, 'tracks follow Fig. 1.30; equal entry speeds assumed');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const CX = 300, CY = 260, A = 110, D = 8;
  const pr = (x, y, z) => [CX + x * A + z * A * 0.45, CY - y * A + z * A * 0.3];   // oblique projection, unit = half edge (5 cm)
  const qStages = [
    { title: 'Fig. 1.31', dur: 5, text: 'A point charge +10 μC is 5 cm directly above the centre of a square of side 10 cm.' },
    { title: 'What is asked', dur: 4, text: 'What is the electric flux through the square?' },
  ];
  const stages = [
    { title: 'Build a cube', dur: D, text: 'The square is one face of a 10 cm cube whose centre is exactly where the charge is.', ans: 'By symmetry each of the 6 faces gets the same flux.' },
    { title: 'Gauss’s law', dur: 5, text: 'Total flux out of the cube = q/ε₀.', ans: 'Φ(square) = q/6ε₀ = 10⁻⁵/(6 × 8.854 × 10⁻¹²) ≈ 1.9 × 10⁵ N m²/C.' },
  ];
  function quad(ctx, pts, fill, a, stroke, dash) { ctx.save(); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...pr(...p)) : ctx.moveTo(...pr(...p))); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.globalAlpha = a; ctx.fill(); ctx.globalAlpha = 1; } ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; if (dash) ctx.setLineDash(dash); ctx.stroke(); ctx.restore(); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    quad(ctx, [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], P.water, 0.6, P.obj);
    if (ans) { const c = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]; ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([5, 4]); ctx.globalAlpha = clamp(t / 3); E.forEach(([a, b]) => seg(ctx, ...pr(...c[a]), ...pr(...c[b]))); ctx.restore();
      const n = 14; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, L = 30 + 60 * clamp((t - 2) / 4); const [x, y] = pr(0, 0, 0); arrow(ctx, x, y, x + L * Math.cos(a), y + L * Math.sin(a), P.force, { lw: 1.5, head: 7, alpha: 0.6 }); } }
    const [qx, qy] = pr(0, 0, 0); ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; seg(ctx, qx, qy, ...pr(0, -1, 0)); ctx.restore(); ball(ctx, qx, qy, 9, P.force); label(ctx, '+10 μC', qx + 14, qy - 12, { weight: 700, size: 13 });
    label(ctx, '5 cm', qx + 8, (qy + pr(0, -1, 0)[1]) / 2 + 10, { weight: 700, size: 12 }); label(ctx, '10 cm', ...pr(0, -1.25, -1), { align: 'center', weight: 700, size: 12 });
    if (ans && t >= stages[1].t0) label(ctx, 'Φ = q/6ε₀ ≈ 1.9 × 10⁵ N m²/C', 300, 480, { align: 'center', weight: 800, size: 17, color: P.accent });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['The square is one face of a cube centred on the charge', 'Φ = q/6ε₀ ≈ 1.9 × 10⁵ N m²/C'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The magnitude of the electric flux through the square.']);
    note(ctx, 'the cube is imagined (dashed); field lines illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q23
const SCENE = (() => {
  const X1 = 230, X2 = 370, D = 8;
  const qStages = [
    { title: 'Two charged plates', dur: 5, text: 'Two large thin metal plates, close and parallel, carry +σ and −σ on their inner faces, σ = 17.0 × 10⁻²² C/m².' },
    { title: 'What is asked', dur: 4, text: 'Find E (a) outside the first plate, (b) outside the second, (c) between them.' },
  ];
  const stages = [
    { title: 'Each sheet alone', dur: D, text: 'A large sheet gives σ/2ε₀ on both sides, away from + and towards −.', ans: 'Outside: the two fields point opposite ways. Between: the same way.' },
    { title: 'Add them', dur: 5, text: 'Outside they cancel; between they add.', ans: '(a), (b) E = 0. (c) E = σ/ε₀ ≈ 1.9 × 10⁻¹⁰ N/C, from + to −.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.objFill2; ctx.fillRect(X1 - 8, 70, 8, 400); ctx.fillRect(X2, 70, 8, 400);
    for (let y = 90; y < 470; y += 30) { label(ctx, '+', X1 + 8, y, { weight: 800, size: 14, color: P.force }); label(ctx, '−', X2 - 10, y, { weight: 800, size: 14, color: P.vel }); }
    label(ctx, 'plate 1', X1 - 4, 56, { align: 'center', weight: 700, size: 13 }); label(ctx, 'plate 2', X2 + 4, 56, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      const st = stageAt(stages, t), Y1 = 150, Y2 = 200;
      if (st === 0) {
        vec(ctx, 120, Y1, -50, 0, '+σ', P.force, { side: -1, at: 0.5, size: 12 }); vec(ctx, 270, Y1, 50, 0, '+σ', P.force, { side: -1, at: 0.5, size: 12 }); vec(ctx, 440, Y1, 50, 0, '+σ', P.force, { side: -1, at: 0.5, size: 12 });
        vec(ctx, 70, Y2, 50, 0, '−σ', P.vel, { side: 1, at: 0.5, size: 12 }); vec(ctx, 270, Y2, 50, 0, '−σ', P.vel, { side: 1, at: 0.5, size: 12 }); vec(ctx, 540, Y2, -50, 0, '−σ', P.vel, { side: 1, at: 0.5, size: 12 });
      } else {
        for (let y = 120; y <= 420; y += 60) vec(ctx, X1 + 20, y, X2 - X1 - 40, 0, '', P.accent, { lw: 3 });
        label(ctx, 'E = σ/ε₀', 300, 450, { align: 'center', weight: 800, size: 16, color: P.accent }); label(ctx, 'E = 0', 110, 300, { align: 'center', weight: 800, size: 18, color: P.accent }); label(ctx, 'E = 0', 490, 300, { align: 'center', weight: 800, size: 18, color: P.accent });
      }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['Each sheet: σ/2ε₀ either side', '(a), (b) 0; (c) σ/ε₀ ≈ 1.9 × 10⁻¹⁰ N/C'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['E in the outer region of the first plate, in the outer region of the second plate, and between the plates.']);
    note(ctx, 'arrows show directions only; the field here is tiny');
  }
  return { qStages, stages, draw };
})();
