//@@ q19
const SCENE = (() => {
  const MS = 0.02, MG = 100, VS = 80, VG = MS * VS / MG, S1 = 3, S2 = S1 + 3, S3 = S2 + 4, GY = 330;
  const qStages = [
    { title: 'A gun and its shell', dur: S1, text: 'A gun of mass 100 kg fires a shell of mass 0.020 kg.' },
    { title: 'Fired', dur: S2 - S1, text: 'The muzzle speed of the shell is 80 m/s.' },
    { title: 'What is asked', dur: S3 - S2, text: 'What is the recoil speed of the gun?' },
  ];
  const stages = [
    { title: 'Before firing', dur: S1, text: 'Gun and shell are at rest: total momentum zero.', ans: 'Total momentum before = 0.' },
    { title: 'Fired', dur: S2 - S1, text: 'The explosion pushes the shell forward and the gun backward with equal and opposite forces, so their momenta are equal and opposite.', ans: 'Shell: 0.020 × 80 = 1.6 kg m/s forward; gun: 1.6 kg m/s backward.' },
    { title: 'Recoil speed', dur: S3 - S2, text: 'The gun is 5000 times heavier, so it moves 5000 times slower.', ans: 'v = 1.6/100 = 0.016 m/s (1.6 cm/s), backward.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 30, 600, GY);
    const u = Math.max(0, t - S1), gx = 180 - (ans ? Math.min(u, 3) * 6 : 0);          // recoil exaggerated
    ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2;
    ctx.fillRect(gx - 90, GY - 60, 150, 26); ctx.strokeRect(gx - 90, GY - 60, 150, 26); ctx.fillRect(gx - 70, GY - 34, 70, 30); ctx.strokeRect(gx - 70, GY - 34, 70, 30);
    for (const wx of [gx - 60, gx - 10]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, GY - 6, 6, 0, Math.PI * 2); ctx.fill(); }
    label(ctx, 'gun 100 kg', gx - 20, GY - 76, { align: 'center', weight: 700, size: 13 });
    const sx = t < S1 ? gx + 50 : 240 + u * 160;
    if (sx < 600) { ball(ctx, sx, GY - 47, 6, P.force); label(ctx, '0.020 kg', sx, GY - 66, { align: 'center', size: 12 }); }
    if (t >= S1 && t < S1 + 0.25) { ctx.fillStyle = P.ke; ctx.beginPath(); ctx.arc(gx + 70, GY - 47, 14, 0, Math.PI * 2); ctx.fill(); }
    if (t >= S1) vec(ctx, Math.min(sx, 520), GY - 100, 60, 0, '80 m/s', P.vel, { side: -1, at: 0.6 });
    if (ans && t >= S1) {
      vec(ctx, gx - 30, GY + 30, -50, 0, '0.016 m/s', P.vel, { side: 1, at: 0.6, ay: 4 });
      const bx = 120, by = 430;
      label(ctx, 'momentum', bx, by - 26, { weight: 700, size: 13 });
      ctx.fillStyle = P.vel; ctx.fillRect(bx + 200, by - 10, 160, 18); ctx.fillRect(bx + 200 - 160, by + 16, 160, 18);
      label(ctx, 'shell +1.6', bx + 200 + 166, by, { size: 12, weight: 700 }); label(ctx, 'gun −1.6 kg m/s', bx + 200 - 166, by + 25, { align: 'right', size: 12, weight: 700 });
      vline(ctx, bx + 200, by - 20, by + 44, P.ink, 1.5);
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Momentum is conserved', ['Before: 0', 'After: 0.020 × 80 + 100 × v = 0', 'v = −0.016 m/s: the gun recoils at 0.016 m/s'], t < S1 ? 0 : t < S2 ? 1 : 2, false);
    else askedPanel(ctx, 630, 34, 300, ['The recoil speed of the gun.']);
    note(ctx, ans ? 'the gun’s recoil is far too slow to see; it is exaggerated here' : '');
  }
  return { qStages, stages, draw };
})();

//@@ q20
const SCENE = (() => {
  const M = 0.15, V = 15, HALF = 22.5 * Math.PI / 180, BX = 420, BY = 270, S1 = 3, SH = S1 + 2, S2 = SH + 2.5, S3 = S2 + 5;
  const din = [Math.cos(HALF), Math.sin(HALF)], dout = [-Math.cos(HALF), Math.sin(HALF)];  // in: towards the bat; out: back, 45° from the incoming path
  const qStages = [
    { title: 'The ball comes in', dur: SH, text: 'A cricket ball of mass 0.15 kg comes at 54 km/h.' },
    { title: 'Deflected', dur: S2 - SH, text: 'The batsman deflects the ball by 45° without changing its speed.' },
    { title: 'What is asked', dur: S3 - S2, text: 'What is the impulse imparted to the ball?' },
  ];
  const stages = [
    { title: 'Incoming', dur: SH, text: '54 km/h = 15 m/s. The ball’s path and the bounced path make an angle of 45°, as in the NCERT solution: each makes 22.5° with the line perpendicular to the bat.', ans: 'Initial momentum = 0.15 × 15 = 2.25 kg m/s.' },
    { title: 'Deflected', dur: S2 - SH, text: 'The speed is unchanged. Along the bat, the momentum does not change; perpendicular to the bat, it reverses.', ans: 'Change in momentum is perpendicular to the bat.' },
    { title: 'Impulse', dur: S3 - S2, text: 'Impulse = change in momentum.', ans: 'Impulse = 2 × 0.15 × 15 × cos 22.5° ≈ 4.16 kg m/s, along the bat’s normal, away from the bat.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.wood; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.fillRect(BX + 8, BY - 110, 18, 220); ctx.strokeRect(BX + 8, BY - 110, 18, 220);
    label(ctx, 'bat', BX + 34, BY - 100, { size: 13, color: P.ink2 });
    const L = 300, inStart = [BX - din[0] * L, BY - din[1] * L];
    trail(ctx, [inStart, [BX, BY]], P.ink2, 0.5); trail(ctx, [[BX, BY], [BX + dout[0] * L, BY + dout[1] * L]], P.ink2, 0.5);
    let x, y;
    if (t < SH) { const f = Math.min(1, Math.max(0, (t - 1) / (SH - 1))); x = inStart[0] + din[0] * L * f; y = inStart[1] + din[1] * L * f; }
    else { const f = Math.min(1, (t - SH) / 2); x = BX + dout[0] * L * f; y = BY + dout[1] * L * f; }
    ball(ctx, x, y, 9, P.force);
    label(ctx, '45°', BX - 70, BY + 10, { weight: 700, size: 14 });
    vec(ctx, x, y, (t < SH ? din : dout)[0] * 60, (t < SH ? din : dout)[1] * 60, '15 m/s', P.vel, { side: -1, at: 0.6, size: 12 });
    if (ans && t >= S2) {
      const ox = 300, oy = 392, k = 40, p = 2.25 * k;                   // 40 px per kg m/s
      vec(ctx, ox, oy, din[0] * p, din[1] * p, 'p₁', P.vel, { side: -1, at: 0.6 });
      vec(ctx, ox, oy, dout[0] * p, dout[1] * p, 'p₂', P.vel, { side: 1, at: 0.6 });
      vec(ctx, ox + din[0] * p, oy + din[1] * p, -2 * din[0] * p, 0, 'Δp', P.force, { side: -1, at: 0.5 });
      label(ctx, 'Δp = p₂ − p₁ ≈ 4.16 kg m/s', 300, 482, { align: 'center', weight: 800, size: 16, color: P.accent });
      vec(ctx, BX - 10, BY - 62, -80, 0, 'impulse', P.force, { side: 1, at: 0.5 });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['54 km/h = 15 m/s, p = 2.25 kg m/s', 'Along the bat: no change. Perpendicular: +2.25 cos 22.5° → −2.25 cos 22.5°', 'Impulse = 2 × 2.25 × cos 22.5° ≈ 4.16 kg m/s'], t < SH ? 0 : t < S2 ? 1 : 2, false);
    else askedPanel(ctx, 630, 34, 300, ['The impulse imparted to the ball. (Mass 0.15 kg, speed 54 km/h.)']);
    note(ctx, 'NCERT reading: the incoming and outgoing paths make 45°. If instead the direction changed by only 45°, the impulse would be 1.72 kg m/s.');
  }
  return { qStages, stages, draw };
})();

//@@ q21
const SCENE = (() => {
  const M = 0.25, R = 1.5, N = 40 / 60, OM = 2 * Math.PI * N, V = OM * R, T = M * V * V / R, TMAX = 200, VMAX = Math.sqrt(TMAX * R / M);
  const CX = 290, CY = 270, RP = 150, S1 = 7, S2 = S1 + 6;
  const qStages = [
    { title: 'Whirled in a circle', dur: 6, text: 'A stone of mass 0.25 kg tied to a string is whirled round in a horizontal circle of radius 1.5 m at 40 rev/min.' },
    { title: 'What is asked', dur: 4, text: 'What is the tension in the string? What is the maximum speed if the string can withstand a tension of 200 N?' },
  ];
  const stages = [
    { title: 'At 40 rev/min', dur: S1, text: 'The tension provides the centripetal force. First find the speed: 40 rev/min is 2/3 rev every second.', ans: 'v = 2πrn = 2π × 1.5 × 40/60 ≈ 6.28 m/s; T = mv²/r = 0.25 × 6.28²/1.5 ≈ 6.6 N.' },
    { title: 'At the breaking point', dur: S2 - S1, text: 'The faster the stone, the more tension is needed. The largest tension allowed is 200 N.', ans: 'v_max = √(T_max r/m) = √(200 × 1.5/0.25) = √1200 ≈ 35 m/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    label(ctx, 'seen from above', CX, 40, { align: 'center', size: 13, color: P.ink2 });
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, RP, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    const fast = ans && t >= S1, a = fast ? OM * S1 + (t - S1) * OM * 4 : t * OM;      // the fast case is drawn slowed down
    const x = CX + RP * Math.cos(a), y = CY + RP * Math.sin(a);
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, CX, CY, x, y); ctx.restore();
    ball(ctx, CX, CY, 5, P.obj); ball(ctx, x, y, 10, P.objFill2);
    label(ctx, 'radius 1.5 m', CX, CY + RP + 24, { align: 'center', weight: 700, size: 13 });
    vec(ctx, x, y, -Math.sin(a) * 50, Math.cos(a) * 50, ans ? (fast ? '35 m/s' : '6.3 m/s') : '40 rev/min', P.vel, { size: 12 });
    if (ans) vec(ctx, x, y, (CX - x) / RP * (fast ? 100 : 40), (CY - y) / RP * (fast ? 100 : 40), fast ? 'T = 200 N' : 'T = 6.6 N', P.force, { at: 0.5, size: 12 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['v = 2π × 1.5 × (40/60) ≈ 6.28 m/s', 'T = mv²/r = 0.25 × 6.28² / 1.5 ≈ 6.6 N', 'v_max = √(200 × 1.5 / 0.25) ≈ 35 m/s'], t < S1 ? 1 : 2, false);
    else askedPanel(ctx, 630, 34, 300, ['The tension in the string.', 'The maximum speed at which the stone can be whirled if the string can withstand a maximum tension of 200 N.']);
    note(ctx, ans && t >= S1 ? 'at 35 m/s the stone would go round 3.7 times a second; shown slowed' : 'gravity is ignored, as for a horizontal circle');
  }
  return { qStages, stages, draw };
})();

//@@ q22
const SCENE = (() => {
  const CX = 260, CY = 270, RP = 140, OM = 2.2, TB = 4.2, S2 = TB + 4;
  const OPTS = ['(a) the stone moves radially outwards', '(b) the stone flies off tangentially from the instant the string breaks', '(c) the stone flies off at an angle with the tangent that depends on its speed'];
  const qStages = [
    { title: 'Whirled too fast', dur: TB + 0.3, text: 'In Exercise 4.21 the stone is whirled faster than the maximum allowed speed.' },
    { title: 'The string breaks', dur: S2 - TB - 0.3, text: 'The string breaks suddenly. Which statement correctly describes the trajectory of the stone?' },
  ];
  const stages = [
    { title: 'Just before', dur: TB, text: 'The string’s pull towards the centre keeps bending the stone’s path into a circle. Its velocity is always along the tangent.', ans: 'Velocity: tangential. Force: towards the centre.' },
    { title: 'The string breaks', dur: S2 - TB, text: 'With the string gone, no horizontal force acts. The stone keeps the velocity it had at that instant, along the tangent, in a straight line.', ans: '(b) It flies off tangentially from the instant the string breaks.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 560, 16, 524, P.rule, 1);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, RP, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    ball(ctx, CX, CY, 5, P.obj);
    const showBreak = ans || t > TB;
    let x, y;
    if (t < TB || !showBreak) { const a = t * OM; x = CX + RP * Math.cos(a); y = CY + RP * Math.sin(a); ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, CX, CY, x, y); ctx.restore();
      if (ans) { vec(ctx, x, y, -Math.sin(a) * 50, Math.cos(a) * 50, 'v', P.vel, { italic: true }); vec(ctx, x, y, (CX - x) / RP * 40, (CY - y) / RP * 40, 'T', P.force, { italic: true, at: 0.6 }); } }
    else if (ans) {
      const a = TB * OM, x0 = CX + RP * Math.cos(a), y0 = CY + RP * Math.sin(a), tx = -Math.sin(a), ty = Math.cos(a), s = (t - TB) * OM * RP;
      x = x0 + tx * s; y = y0 + ty * s;
      trail(ctx, [[x0, y0], [x, y]], P.accent, 0.9);
      ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, CX, CY, CX + (x0 - CX) * 0.4, CY + (y0 - CY) * 0.4); ctx.restore();
      vec(ctx, x, y, tx * 50, ty * 50, 'v', P.vel, { italic: true });
    } else { const a = TB * OM; x = CX + RP * Math.cos(a); y = CY + RP * Math.sin(a); label(ctx, 'string breaks here: which path?', x, y - 30, { align: 'center', weight: 700, size: 14 }); }
    if (x !== undefined) ball(ctx, x, y, 10, P.objFill2);
    label(ctx, 'Which describes the path after the string breaks?', 580, 40, { weight: 700, size: 15 });
    OPTS.forEach((o, i) => {
      const yy = 90 + i * 70, lines = wrapLines(ctx, o, 310, 14);
      ctx.save(); ctx.strokeStyle = P.ink2; ctx.lineWidth = 1.5; ctx.strokeRect(582, yy - 11, 22, 22); ctx.restore();
      lines.forEach((ln, j) => label(ctx, ln, 614, yy + j * 18, { size: 14 }));
      if (ans && t >= TB) { ctx.save(); ctx.strokeStyle = i === 1 ? P.accent : P.force; ctx.lineWidth = 3; if (i === 1) poly(ctx, [[587, yy], [592, yy + 6], [601, yy - 7]]); else { seg(ctx, 587, yy - 6, 599, yy + 6); seg(ctx, 599, yy - 6, 587, yy + 6); } ctx.restore(); }
    });
  }
  return { qStages, stages, draw };
})();

//@@ q23
const SCENE = (() => {
  const D = 7;
  const PARTS = ['(a) a horse cannot pull a cart and run in empty space', '(b) passengers are thrown forward when a speeding bus stops suddenly', '(c) it is easier to pull a lawn mower than to push it', '(d) a cricketer moves his hands backwards while holding a catch'];
  const ANS = ['On the ground the horse pushes the ground back and the ground pushes it forward (friction). In space there is nothing to push against; the horse–cart forces are internal and cancel.',
    'The bus stops but the passengers’ bodies, by inertia, keep moving forward until a force stops them.',
    'Pulling at an angle lifts the mower slightly: the normal force, and so the friction, is reduced. Pushing presses it down and increases friction.',
    'Moving the hands back makes the catch last longer. For the same change in momentum, a longer time means a smaller force on the hands.'];
  const qStages = partStages(['(a) Horse and cart', '(b) Bus stops suddenly', '(c) Lawn mower', '(d) Taking a catch'], PARTS.map(p => 'Explain why ' + p.slice(4) + '.'), D);
  const stages = partStages(qStages.map(s => s.title), ['Newton’s third law: the ground’s push makes the horse move.', 'Newton’s first law: inertia of motion.', 'The vertical part of the applied force changes the normal force, and friction depends on the normal force.', 'Newton’s second law: force = change of momentum ÷ time.'], D, ANS);
  function horse(ctx, u, ans) {
    const space = u > 3.5, x = space ? 250 : 165 + u * 30;
    if (!space) ground(ctx, 30, 580, 360); else { ctx.fillStyle = P.ink2; for (let i = 0; i < 30; i++) { ctx.globalAlpha = 0.4; ctx.fillRect((i * 137) % 540 + 30, (i * 71) % 380 + 60, 2, 2); } ctx.globalAlpha = 1; label(ctx, 'in empty space: no ground', 300, 60, { align: 'center', weight: 700, size: 14 }); }
    block(ctx, x - 150, 300, 90, 50, 'cart'); ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 3; seg(ctx, x - 60, 320, x - 20, 320); ctx.restore();
    ctx.fillStyle = P.bark; ctx.fillRect(x - 20, 290, 90, 36); ctx.fillRect(x + 60, 260, 20, 40);
    for (const lx of [x - 10, x + 10, x + 40, x + 60]) { ctx.fillRect(lx, 326, 7, 34 + 3 * Math.sin(u * 10 + lx)); }
    label(ctx, 'horse', x + 25, 280, { align: 'center', size: 13, color: P.sheet, halo: false });
    if (ans && !space) { vec(ctx, x + 10, 378, -50, 0, 'horse pushes ground back', P.ink2, { side: -1, at: 0.5, ay: 6, size: 12 }); vec(ctx, x + 72, 352, 50, 0, 'ground pushes horse forward', P.force, { side: 0, at: 1, align: 'left', ax: 6, size: 12 }); }
    if (ans && space) label(ctx, 'horse ↔ cart forces cancel: no motion', 300, 450, { align: 'center', weight: 700, size: 14, color: P.force });
  }
  function bus(ctx, u, ans) {
    ground(ctx, 30, 580, 380);
    const stopT = 2, x = u < stopT ? 120 + u * 90 : 120 + stopT * 90, lean = u < stopT ? 0 : Math.min(1, (u - stopT) / 0.4) * 0.5;
    ctx.fillStyle = P.objFill; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.fillRect(x - 100, 250, 260, 120); ctx.strokeRect(x - 100, 250, 260, 120);
    for (const wx of [x - 60, x + 120]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, 372, 14, 0, Math.PI * 2); ctx.fill(); }
    ctx.save(); ctx.translate(x + 30, 360); ctx.rotate(lean); person(ctx, 0, 0, 0.9); ctx.restore();
    label(ctx, u < stopT ? 'moving fast' : 'stops suddenly', x + 30, 230, { align: 'center', weight: 700, size: 14 });
    if (ans && u >= stopT) vec(ctx, x + 50, 290, 50, 0, 'body keeps moving (inertia)', P.vel, { side: -1, at: 0.5, size: 12 });
  }
  function mower(ctx, u, ans) {
    const th = 0.6;
    [[150, 'pull', -1], [430, 'push', 1]].forEach(([x, name, s]) => {
      ground(ctx, x - 120, x + 120, 380);
      block(ctx, x - 40, 340, 80, 30, '', P.leaf); for (const wx of [x - 26, x + 26]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, 372, 8, 0, Math.PI * 2); ctx.fill(); }
      ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 4; seg(ctx, x, 345, x + s * 110 * Math.cos(th), 345 - 110 * Math.sin(th)); ctx.restore();
      label(ctx, name, x, 300 - 60, { align: 'center', weight: 700, size: 15 });
      if (ans) {
        if (s < 0) vec(ctx, x, 345, -70 * Math.cos(th), -70 * Math.sin(th), 'F', P.force, { at: 1, side: 0, ax: -10 });            // pull: along the handle, away from the mower
        else vec(ctx, x + 110 * Math.cos(th), 345 - 110 * Math.sin(th), -70 * Math.cos(th), 70 * Math.sin(th), 'F', P.force, { at: 0, side: 0, ax: 12, ay: -6 });   // push: along the handle, into the mower
        const N = s > 0 ? 'N = mg + F sin θ (larger)' : 'N = mg − F sin θ (smaller)';
        label(ctx, N, x, 420, { align: 'center', weight: 700, size: 13, color: s > 0 ? P.force : P.accent });
        label(ctx, s > 0 ? 'more friction' : 'less friction', x, 442, { align: 'center', size: 13 });
      }
    });
  }
  function catch_(ctx, u, ans) {
    const g = axes(ctx, { x: 60, y: 260, w: 460, h: 180, x0: 0, x1: 1, y0: 0, y1: 1, xl: 'time', yl: 'force on hands' });
    if (ans) {
      ctx.save(); ctx.fillStyle = P.force; ctx.globalAlpha = 0.5; ctx.fillRect(g.X(0.05), g.Y(0.9), (g.X(0.15) - g.X(0.05)), g.Y(0) - g.Y(0.9)); ctx.restore();
      ctx.save(); ctx.fillStyle = P.accent; ctx.globalAlpha = 0.5; ctx.fillRect(g.X(0.3), g.Y(0.3), (g.X(0.6) - g.X(0.3)), g.Y(0) - g.Y(0.3)); ctx.restore();
      label(ctx, 'hands held still: short, big force', g.X(0.1), g.Y(0.95), { align: 'left', size: 12, weight: 700 });
      label(ctx, 'hands moved back: same area, smaller force', g.X(0.3), g.Y(0.35), { size: 12, weight: 700 });
    }
    const bx = 120 + Math.min(u, 2) * 120;
    ball(ctx, bx, 150, 9, P.force); person(ctx, 400, 220, 0.9);
    vec(ctx, bx - 40, 125, 40, 0, 'ball', P.vel, { side: -1, at: 0.5, size: 12 });
    if (u > 2) vec(ctx, 390, 120, 30 * Math.min(1, (u - 2) / 1), 0, 'hands move back', P.acc, { side: -1, at: 0.6, size: 12 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 600, 16, 524, P.rule, 1);
    const k = Math.min(3, Math.floor(t / D)), u = t - k * D;
    [horse, bus, mower, catch_][k](ctx, u, ans);
    partsPanel(ctx, 620, 34, 320, ans ? 'Explanations' : 'Explain why…', PARTS, k, ans, ANS);
  }
  return { qStages, stages, draw };
})();
