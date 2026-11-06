//@@ q07
const SCENE = (() => {
  const M = 5, F1 = 8, F2 = 6, FR = 10, A = FR / M, OX = 200, OY = 330, KF = 18, KS = 28, ANG = Math.atan2(F2, F1);
  const qStages = [
    { title: 'Two perpendicular forces', dur: 6, text: 'A body of mass 5 kg is acted upon by two perpendicular forces, 8 N and 6 N (seen from above).' },
    { title: 'What is asked', dur: 4, text: 'Give the magnitude and direction of the acceleration of the body.' },
  ];
  const stages = [
    { title: 'Adding the forces', dur: 5, text: 'The two forces add like vectors: they form the sides of a rectangle, and the diagonal is the resultant force.', ans: 'Resultant F = √(8² + 6²) = 10 N, at θ = tan⁻¹(6/8) ≈ 37° to the 8 N force.' },
    { title: 'The acceleration', dur: 6, text: 'The body accelerates along the resultant, starting from rest in this picture.', ans: 'a = F/m = 10/5 = 2 m/s², at about 37° to the 8 N force (towards the 6 N force).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    label(ctx, 'seen from above', 300, 40, { align: 'center', size: 13, color: P.ink2 });
    let ox = OX, oy = OY;
    if (ans && t > 5) { const s = 0.5 * A * Math.min(t - 5, 2.5) ** 2 * KS; ox += s * Math.cos(ANG); oy -= s * Math.sin(ANG); }
    vec(ctx, ox, oy, F1 * KF, 0, '8 N', P.force, { at: 1, ax: 20, side: 0 });
    vec(ctx, ox, oy, 0, -F2 * KF, '6 N', P.force, { at: 1, ay: -12, side: 0 });
    if (ans) {
      ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([5, 4]); seg(ctx, ox + F1 * KF, oy, ox + F1 * KF, oy - F2 * KF); seg(ctx, ox, oy - F2 * KF, ox + F1 * KF, oy - F2 * KF); ctx.restore();
      vec(ctx, ox, oy, F1 * KF, -F2 * KF, '10 N', P.accent, { side: -1, at: 0.55, lw: 5 });
      ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ox, oy, 46, -ANG, 0); ctx.stroke(); ctx.restore();
      label(ctx, '37°', ox + 54, oy - 14, { weight: 700, size: 14 });
      if (t > 5) vec(ctx, ox + 20, oy + 60, 2 * 30 * Math.cos(ANG), -2 * 30 * Math.sin(ANG), 'a = 2 m/s²', P.acc, { side: 0, at: 1, align: 'left', ax: 8, ay: 4 });
    }
    ball(ctx, ox, oy, 14, P.objFill2); label(ctx, '5 kg', ox, oy + 28, { align: 'center', weight: 700, size: 13 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['Resultant: √(8² + 6²) = 10 N', 'Direction: tan θ = 6/8, θ ≈ 37° from the 8 N force', 'a = F/m = 10/5 = 2 m/s², along the resultant'], t < 5 ? 1 : 2, false);
    else askedPanel(ctx, 630, 34, 300, ['The magnitude and direction of the acceleration of the body.']);
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const M = 465, U = 10, TS = 4, A = U / TS, K = 20, X0 = 150, RY = 260;   // 36 km/h = 10 m/s; 20 px per metre
  const S1 = 3, S2 = S1 + TS, S3 = S2 + 4;
  const qStages = [
    { title: 'A child on the road', dur: S1, text: 'A three-wheeler (400 kg, driver 65 kg) moves at 36 km/h. The driver sees a child standing in the middle of the road.' },
    { title: 'Braking', dur: S2 - S1, text: 'He brings the vehicle to rest in 4.0 s, just in time to save the child.' },
    { title: 'What is asked', dur: S3 - S2, text: 'What is the average retarding force on the vehicle?' },
  ];
  const stages = [
    { title: 'At 36 km/h', dur: S1, text: 'Convert the speed to m/s. The vehicle and the driver slow down together, so both masses count.', ans: '36 km/h = 10 m/s; total mass = 400 + 65 = 465 kg.' },
    { title: 'Braking for 4.0 s', dur: S2 - S1, text: 'The average retardation is the change of speed divided by the time.', ans: 'a = (0 − 10)/4.0 = −2.5 m/s².' },
    { title: 'The retarding force', dur: S3 - S2, text: 'Newton’s second law, with the total mass.', ans: 'F = ma = 465 × 2.5 ≈ 1.16 × 10³ N, opposite to the motion (it stops after 20 m).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(30, RY, 570, 30); hline(ctx, 30, 600, RY, P.obj, 2);
    const tm = clamp(t - S1, 0, TS), x = U * tm - 0.5 * A * tm * tm, v = U - A * tm, fx = X0 + x * K;
    // three-wheeler (front at fx)
    ctx.fillStyle = P.ke; ctx.strokeStyle = P.obj; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(fx, RY - 12); ctx.lineTo(fx - 6, RY - 50); ctx.lineTo(fx - 54, RY - 54); ctx.lineTo(fx - 60, RY - 12); ctx.closePath(); ctx.fill(); ctx.stroke();
    for (const wx of [fx - 12, fx - 50]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, RY - 7, 7, 0, Math.PI * 2); ctx.fill(); }
    person(ctx, X0 + 20 * K + 22, RY, 0.7);
    label(ctx, 'child', X0 + 20 * K + 22, RY - 82, { align: 'center', size: 13, weight: 700 });
    if (v > 0.05) vec(ctx, fx - 30, RY - 80, v * 6, 0, t < S1 ? '36 km/h' : (ans ? `${v.toFixed(1)} m/s` : 'v'), P.vel, { side: -1, at: 0.6 });
    if (ans && t >= S1 && v > 0.05) vec(ctx, fx - 60, RY + 14, -60, 0, 'retarding force', P.force, { side: -1, at: 0.5, ay: 14 });
    clock(ctx, 60, 60, tm, `t = ${tm.toFixed(1)} s`);
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['u = 36 km/h = 10 m/s, m = 400 + 65 = 465 kg', 'a = (0 − 10)/4.0 = −2.5 m/s²', 'F = 465 × 2.5 ≈ 1.16 × 10³ N, opposite to the motion'], Math.min(2, t < S1 ? 0 : t < S2 ? 1 : 2), false);
    else askedPanel(ctx, 630, 34, 300, ['The average retarding force on the vehicle.']);
    note(ctx, 'scale: 20 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const M = 20000, A = 5, G = 10, K = 9, PY = 470, X = 260;   // 9 px per metre
  const S1 = 3, S2 = S1 + 3.2, S3 = S2 + 4;
  const qStages = [
    { title: 'Lift-off', dur: S1, text: 'A rocket with a lift-off mass of 20,000 kg stands on its launch pad.' },
    { title: 'Blasted upwards', dur: S2 - S1, text: 'It is blasted upwards with an initial acceleration of 5.0 m/s².' },
    { title: 'What is asked', dur: S3 - S2, text: 'Calculate the initial thrust (force) of the blast.' },
  ];
  const stages = [
    { title: 'Forces at lift-off', dur: S1, text: 'Two forces act: the thrust of the blast upward and the rocket’s weight downward.', ans: 'Weight = mg = 20,000 × 10 = 2.0 × 10⁵ N, downward.' },
    { title: 'Accelerating upward', dur: S2 - S1, text: 'The thrust must hold up the weight and also give the upward acceleration.', ans: 'Thrust − mg = ma.' },
    { title: 'The thrust', dur: S3 - S2, text: 'Thrust = m(g + a).', ans: 'Thrust = 20,000 × (10 + 5) = 3.0 × 10⁵ N, upward.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 40, 600, PY);
    ctx.fillStyle = P.objFill2; ctx.fillRect(X - 60, PY - 14, 120, 14);
    const tm = clamp(t - S1, 0, 3.2), h = 0.5 * A * tm * tm * K, y = PY - 14 - h;
    if (tm > 0) { const fl = 30 + 8 * Math.sin(t * 30); ctx.fillStyle = P.ke; ctx.beginPath(); ctx.moveTo(X - 14, y); ctx.lineTo(X, y + fl); ctx.lineTo(X + 14, y); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = P.objFill; ctx.strokeStyle = P.obj; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X - 18, y); ctx.lineTo(X - 18, y - 120); ctx.quadraticCurveTo(X, y - 170, X + 18, y - 120); ctx.lineTo(X + 18, y); ctx.closePath(); ctx.fill(); ctx.stroke();
    label(ctx, '20,000 kg', X + 26, y - 20, { weight: 700, size: 13 });
    if (tm > 0 || ans) vec(ctx, X + 95, y - 50, 0, -50, 'a = 5 m/s²', P.acc, { at: 1, ay: -12, side: 0 });
    if (ans) { vec(ctx, X - 70, y - 60, 0, -90, 'thrust 3.0 × 10⁵ N', P.force, { side: 1, at: 0.6, align: 'right', ax: -8 }); vec(ctx, X - 70, y - 60, 0, 60, 'weight 2.0 × 10⁵ N', P.force, { side: 1, at: 0.8, align: 'right', ax: -8 }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['Weight = mg = 2.0 × 10⁵ N', 'Thrust − mg = ma', 'Thrust = m(g + a) = 20,000 × 15 = 3.0 × 10⁵ N'], t < S1 ? 0 : t < S2 ? 1 : 2, false);
    else askedPanel(ctx, 630, 34, 300, ['The initial thrust (force) of the blast. (Take g = 10 m/s².)']);
    note(ctx, 'force arrows to scale with each other');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const M = 0.4, U = 10, F = 8, A = F / M, TF = 30;                     // a = 20 m/s² southward for 0 ≤ t ≤ 30 s
  const x = t => t < 0 ? U * t : t <= TF ? U * t - 0.5 * A * t * t : (U * TF - 0.5 * A * TF * TF) + (U - A * TF) * (t - TF);
  const v = t => t < 0 ? U : t <= TF ? U - A * t : U - A * TF;
  const SP = 8, S1 = 3;                                                   // 8 s of motion per second of animation
  const qStages = [
    { title: 'Moving north at 10 m/s', dur: 5, text: 'A body of mass 0.40 kg moves north with a constant speed of 10 m/s. At t = 0, at x = 0, a constant force of 8.0 N towards the south starts to act on it, for 30 s.' },
    { title: 'What is asked', dur: 4, text: 'Predict its position at t = −5 s, 25 s and 100 s.' },
  ];
  const stages = [
    { title: 'Before the force: t < 0', dur: S1 + 5 / SP, text: 'Before t = 0 the body moves north uniformly, so 5 s earlier it was 50 m to the south.', ans: 'x(−5 s) = 10 × (−5) = −50 m.' },
    { title: 'The force acts: 0 to 30 s', dur: 30 / SP, text: 'The southward force gives an acceleration of 20 m/s² southward: the body stops after 0.5 s and then speeds up southward.', ans: 'a = −8.0/0.40 = −20 m/s²; x(25 s) = 10 × 25 − ½ × 20 × 25² = −6000 m.' },
    { title: 'After the force: t > 30 s', dur: 70 / SP + 3, text: 'After 30 s no force acts, so the body moves uniformly with the velocity it had at 30 s.', ans: 'At 30 s: x = −8700 m, v = −590 m/s; x(100 s) = −8700 − 590 × 70 = −50,000 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const tt = ans ? Math.min(100, -5 + Math.max(0, t - S1) * SP) : 0;
    // north–south line with the body
    const NY = 70, SY = 480, LX = 90, xmin = -50000, xmax = 1000, Y = xv => NY + (xmax - xv) / (xmax - xmin) * (SY - NY);
    vline(ctx, LX, NY - 20, SY, P.ink2, 1.5); label(ctx, 'N', LX, NY - 32, { align: 'center', weight: 700, size: 14 }); label(ctx, 'S', LX, SY + 14, { align: 'center', weight: 700, size: 14 });
    hline(ctx, LX - 8, LX + 8, Y(0), P.ink, 1.5); label(ctx, 'x = 0', LX + 12, Y(0), { size: 12, color: P.ink2 });
    ball(ctx, LX, Y(x(tt)), 8, P.objFill2);
    if (!ans) {
      vec(ctx, LX + 30, Y(0), 0, -40, '10 m/s', P.vel, { side: 1, at: 0.6, align: 'left', ax: 6 });
      vec(ctx, LX + 70, Y(0) - 20, 0, 40, '8.0 N, for 30 s', P.force, { side: 1, at: 0.6, align: 'left', ax: 6 });
      askedPanel(ctx, 630, 34, 300, ['The position of the body at t = −5 s, 25 s and 100 s.']);
      return;
    }
    const g = axes(ctx, { x: 190, y: 70, w: 380, h: 400, x0: -5, x1: 100, y0: -52000, y1: 2000, xt: [25, 50, 100], yt: [-50000, -25000], xl: 't (s)', yl: 'x (m)' });
    const pts = []; for (let s = -5; s <= tt; s += 0.5) pts.push([g.X(s), g.Y(x(s))]);
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 3; if (pts.length > 1) poly(ctx, pts); ctx.restore();
    for (const [ts, txt] of [[-5, '−50 m'], [25, '−6000 m'], [100, '−50,000 m']]) if (tt >= ts) { ball(ctx, g.X(ts), g.Y(x(ts)), 5, P.accent); label(ctx, `t = ${ts} s: ${txt}`, ts < 0 ? g.X(0) + 8 : ts === 100 ? g.X(ts) - 8 : g.X(ts) + 8, g.Y(x(ts)) - 14, { weight: 700, size: 13, align: ts === 100 ? 'right' : 'left' }); }
    clock(ctx, 230, 490, tt, `t = ${tt.toFixed(0)} s, v = ${v(tt).toFixed(0)} m/s`);
    partsPanel(ctx, 630, 34, 300, 'Positions', ['t = −5 s: x = −50 m', 't = 25 s: x = −6000 m', 't = 100 s: x = −50,000 m (50 km south)'],
      tt < 0 ? 0 : tt <= 30 ? 1 : 2, false);
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const A = 2, G = 10, H = 6, K = 7, VX0 = 60, GY = 440;                 // 7 px per metre; the view starts 60 m from the start
  const TD = 10, tFall = Math.sqrt(2 * H / G), SLOW = 2, TA = 8, S1 = 2, S2 = S1 + (TD - TA) * SLOW, S3 = S2 + 1 * SLOW, S4 = S3 + 5;
  const px = xm => 40 + (xm - VX0) * K, py = hm => GY - hm * K;
  const qStages = [
    { title: 'A truck speeding up', dur: S2, text: 'A truck starts from rest and accelerates uniformly at 2.0 m/s². A person stands on top of it, 6 m above the ground.' },
    { title: 'The stone is dropped', dur: S3 - S2, text: 'At t = 10 s the person drops a stone. Neglect air resistance.' },
    { title: 'What is asked', dur: S4 - S3, text: 'What are the velocity and acceleration of the stone at t = 11 s?' },
  ];
  const stages = [
    { title: 'Up to t = 10 s', dur: S2, text: 'Until it is dropped, the stone moves with the truck.', ans: 'At t = 10 s the truck’s velocity is 2 × 10 = 20 m/s.' },
    { title: 'Falling', dur: S3 - S2, text: 'Once dropped, the stone keeps its horizontal velocity of 20 m/s, but gravity alone acts on it: it falls as a projectile.', ans: 'It takes √(2 × 6/10) ≈ 1.1 s to land, so at t = 11 s it is still in the air.' },
    { title: 'At t = 11 s', dur: S4 - S3, text: 'After 1 s of falling it has gained 10 m/s downward; the horizontal 20 m/s is unchanged.', ans: 'v = √(20² + 10²) ≈ 22.4 m/s at tan⁻¹(10/20) ≈ 27° below the horizontal; a = 10 m/s², vertically down.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 30, 600, GY);
    const tt = t < S2 ? TA + t / S2 * (TD - TA) : t < S3 ? TD + (t - S2) / SLOW : TD + 1;
    const xt = 0.5 * A * tt * tt, vt = A * tt;
    const tx = px(xt);
    ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.fillRect(tx - 60, py(4), 60, 4 * K - 8); ctx.strokeRect(tx - 60, py(4), 60, 4 * K - 8);
    ctx.fillRect(tx, py(2.6), 16, 2.6 * K - 8); ctx.strokeRect(tx, py(2.6), 16, 2.6 * K - 8);
    for (const wx of [tx - 48, tx - 8]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, GY - 5, 5, 0, Math.PI * 2); ctx.fill(); }
    person(ctx, tx - 30, py(4), 0.45);
    let sx, sy, svx = vt, svy = 0;
    if (tt <= TD) { sx = tx - 24; sy = py(H); }
    else {
      const f = Math.min(tt - TD, tFall), x0 = px(0.5 * A * TD * TD) - 24;
      sx = x0 + 20 * f * K; sy = py(H - 5 * f * f); svx = 20; svy = -G * f;
      const pts = []; for (let s = 0; s <= f; s += 0.02) pts.push([x0 + 20 * s * K, py(H - 5 * s * s)]); trail(ctx, pts, P.ink2, 0.6);
    }
    ball(ctx, sx, sy, 5, P.ink);
    vec(ctx, tx - 30, py(7.5), vt * 2, 0, ans ? `truck ${vt.toFixed(1)} m/s` : 'truck', P.vel, { side: -1, at: 0.5, size: 12 });
    if (ans && tt > TD) {                                                  // the stone's velocity, drawn large in an inset (5 px per m/s)
      const IX = 300, IY = 130, KV = 5, vy = -svy;
      label(ctx, `stone’s velocity at t = ${tt.toFixed(1)} s`, IX, IY - 40, { weight: 700, size: 13 });
      vec(ctx, IX, IY, 20 * KV, 0, '20 m/s', P.vel, { side: -1, at: 0.5, size: 12 });
      if (vy > 0.6) vec(ctx, IX + 20 * KV, IY, 0, vy * KV, `${vy.toFixed(1)} m/s`, P.vel, { side: -1, at: 0.6, align: 'left', ax: 2, size: 12 });
      if (t >= S3) {
        vec(ctx, IX, IY, 20 * KV, 10 * KV, '22.4 m/s', P.accent, { side: 1, at: 0.5, size: 13 });
        ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(IX, IY, 30, 0, Math.atan2(1, 2)); ctx.stroke(); ctx.restore();
        label(ctx, '27°', IX + 34, IY + 9, { size: 12, weight: 700 });
        vec(ctx, IX + 150, IY - 20, 0, 50, 'a = g = 10 m/s²', P.acc, { side: -1, at: 0.5, align: 'left', ax: 2, size: 12 });
      }
    }
    clock(ctx, 60, 60, tt, `t = ${tt.toFixed(2)} s`);
    if (ans) partsPanel(ctx, 630, 34, 300, 'At t = 11 s', ['(a) velocity: 20 m/s horizontal + 10 m/s down → 22.4 m/s at ≈ 27° below the horizontal', '(b) acceleration: 10 m/s², vertically downward (no horizontal force on the stone)'], t < S3 ? 0 : 1, false);
    else askedPanel(ctx, 630, 34, 300, ['(a) The velocity and (b) the acceleration of the stone at t = 11 s.']);
    note(ctx, 'view starts 60 m from the truck’s start; 7 px per metre; fall shown at half speed');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const L = 2, V = 1, G = 10, K = 140, PX = 300, PY = 60, W = Math.sqrt(G / L), T0 = Math.acos(1 - V * V / (2 * G * L));   // amplitude ≈ 12.8°
  const D = 7, SLOW = 2;
  const qStages = [
    { title: 'A swinging bob', dur: 5, text: 'A bob of mass 0.1 kg hangs from the ceiling by a 2 m string and oscillates. Its speed at the mean position is 1 m/s.' },
    { title: 'What is asked', dur: 4, text: 'What is the trajectory of the bob if the string is cut (a) at an extreme position, (b) at the mean position?' },
  ];
  const stages = [
    { title: '(a) Cut at an extreme position', dur: D, text: 'At an extreme position the bob is momentarily at rest. When the string is cut, only gravity acts on it.', ans: '(a) It falls vertically downward along a straight line.' },
    { title: '(b) Cut at the mean position', dur: D, text: 'At the mean position the bob moves horizontally at 1 m/s. After the cut, gravity acts but the horizontal velocity stays.', ans: '(b) It follows a parabola, like a horizontally thrown ball.' },
  ];
  function bob(ctx, th) { const x = PX + L * K * Math.sin(th), y = PY + L * K * Math.cos(th); return [x, y]; }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, PX - 80, PX + 80, PY, P.obj, 3);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.globalAlpha = 0.4; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(PX, PY, L * K, Math.PI / 2 - T0, Math.PI / 2 + T0); ctx.stroke(); ctx.restore();
    if (!ans) {
      const th = T0 * Math.sin(W * t), [x, y] = bob(ctx, th);
      ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, PX, PY, x, y); ctx.restore(); ball(ctx, x, y, 10, P.obj);
      label(ctx, '2 m', PX + 8, PY + L * K / 2, { weight: 700, size: 13 });
      label(ctx, '1 m/s at the mean position', PX, PY + L * K + 30, { align: 'center', size: 13, color: P.vel, weight: 700 });
      askedPanel(ctx, 630, 34, 300, ['The trajectory of the bob if the string is cut (a) at one of its extreme positions, (b) at its mean position.']);
      return;
    }
    const k = t < D ? 0 : 1, u = t - k * D, cutAt = 2.2;
    const thCut = k === 0 ? T0 : 0;
    const [x0, y0] = bob(ctx, thCut);
    if (u < cutAt) {
      const th = k === 0 ? T0 * Math.cos(W * (u - cutAt)) : T0 * Math.sin(W * (u - cutAt));
      const [x, y] = bob(ctx, th);
      ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, PX, PY, x, y); ctx.restore(); ball(ctx, x, y, 10, P.obj);
    } else {
      const f = Math.min((u - cutAt) / SLOW, 0.75), vx = k === 0 ? 0 : V;
      const pts = []; for (let s = 0; s <= f; s += 0.01) pts.push([x0 + vx * s * K, y0 + 5 * s * s * K]);
      trail(ctx, pts, P.accent, 0.8);
      const [x, y] = pts[pts.length - 1] || [x0, y0]; ball(ctx, x, y, 10, P.obj);
      ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, PX, PY, PX + (x0 - PX) * 0.5, PY + (y0 - PY) * 0.5); ctx.restore();
      label(ctx, 'string cut', PX + (x0 - PX) * 0.5 + 8, PY + (y0 - PY) * 0.5, { size: 13, color: P.force, weight: 700 });
      vec(ctx, x - 20, y, 0, 40, 'mg', P.force, { side: -1, at: 0.6, align: 'right', ax: -4 });
      if (vx) vec(ctx, x, y - 18, vx * 50, 0, '1 m/s', P.vel, { side: -1, at: 0.6, size: 12 });
      label(ctx, k === 0 ? 'straight down' : 'parabola', x + 20, y + 30, { weight: 700, size: 15, color: P.accent });
    }
    partsPanel(ctx, 630, 34, 300, 'Trajectory after the cut', ['(a) cut at an extreme position', '(b) cut at the mean position'], k, true, ['vertically downward, in a straight line (v = 0 there)', 'a parabola (v = 1 m/s horizontal there)']);
    note(ctx, 'the floor is not given; the fall is shown for 0.75 s, at half speed');
  }
  return { qStages, stages, draw };
})();
