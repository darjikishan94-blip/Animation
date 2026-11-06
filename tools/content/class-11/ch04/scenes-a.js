//@@ q01
const SCENE = (() => {
  const D = 6;
  const PARTS = ['(a) a drop of rain falling down with a constant speed', '(b) a cork of mass 10 g floating on water', '(c) a kite skilfully held stationary in the sky',
    '(d) a car moving with a constant velocity of 30 km/h on a rough road', '(e) a high-speed electron in space, far from all objects and free of fields'];
  const ANS = ['Zero: its weight is balanced by the air resistance.', 'Zero: its weight (0.1 N) is balanced by the buoyant force of the water.',
    'Zero: weight, string tension and the force of the wind balance.', 'Zero: the driving force balances the road friction and air drag.', 'Zero: no force acts on it at all.'];
  const qStages = partStages(['(a) Raindrop', '(b) Floating cork', '(c) Kite', '(d) Car on a rough road', '(e) Electron in space'],
    ['A drop of rain falls with a constant speed.', 'A cork of mass 10 g floats on water.', 'A kite is held stationary in the sky.', 'A car moves with a constant velocity of 30 km/h on a rough road.',
     'A high-speed electron moves through space, far from all material objects and free of electric and magnetic fields.'], D);
  const stages = partStages(qStages.map(s => s.title), [
    'Constant speed in a straight line means zero acceleration, so the net force is zero: the air resistance upward equals the weight downward.',
    'The cork is at rest, so the net force is zero: the water pushes up (buoyant force) as hard as gravity pulls down.',
    'The kite does not move, so the three forces on it, weight, the string’s pull and the wind’s push, add up to zero.',
    'Constant velocity means zero acceleration: the forward force from the road on the driving wheels balances friction and air drag. The weight balances the normal force.',
    'Far from everything and free of fields, nothing pushes or pulls the electron: it keeps moving uniformly, with zero net force.'], D, ANS);
  function drop(ctx, u, ans) {
    const y = 70 + (u * 70) % 360, x = 300;
    ctx.fillStyle = P.water; ctx.beginPath(); ctx.moveTo(x, y - 16); ctx.quadraticCurveTo(x + 12, y + 2, x, y + 10); ctx.quadraticCurveTo(x - 12, y + 2, x, y - 16); ctx.fill();
    vec(ctx, x + 40, y - 20, 0, 50, 'constant speed', P.vel, { side: -1, off: 14, at: 0.5, align: 'left', ax: 8 });
    if (ans) { vec(ctx, x, y + 14, 0, 50, 'weight', P.force, { side: 1, off: 12, at: 0.7, align: 'right' }); vec(ctx, x, y - 20, 0, -50, 'air resistance', P.drag, { side: -1, off: 12, at: 0.7, align: 'right' }); }
  }
  function cork(ctx, u, ans) {
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.6; ctx.fillRect(60, 300, 500, 180); ctx.globalAlpha = 1; hline(ctx, 60, 560, 300, P.vel, 2);
    const y = 300 + 2 * Math.sin(u * 2);
    block(ctx, 270, y - 22, 60, 40, '10 g', P.wood);
    if (ans) { vec(ctx, 300, y + 18, 0, 50, 'weight 0.1 N', P.force, { side: 1, at: 0.8, align: 'left', ax: 4 }); vec(ctx, 300, y - 22, 0, -50, 'buoyant force 0.1 N', P.vel, { side: 1, at: 0.8, align: 'left', ax: 4 }); }
  }
  function kite(ctx, u, ans) {
    const kx = 420, ky = 160 + 2 * Math.sin(u * 3), hx = 120, hy = 460;
    ground(ctx, 40, 580, 470); person(ctx, hx - 20, 470, 1);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.lineWidth = 1.5; seg(ctx, hx - 8, hy - 50, kx, ky + 30); ctx.restore();
    ctx.fillStyle = P.force; ctx.beginPath(); ctx.moveTo(kx, ky - 40); ctx.lineTo(kx + 26, ky); ctx.lineTo(kx, ky + 30); ctx.lineTo(kx - 26, ky); ctx.closePath(); ctx.fill();
    if (ans) {
      const L = Math.hypot(hx - 8 - kx, hy - 50 - ky - 30), tx = (hx - 8 - kx) / L * 70, ty = (hy - 50 - ky - 30) / L * 70, W = 40;
      vec(ctx, kx, ky, tx, ty, 'tension', P.force, { side: -1, at: 0.6 });
      vec(ctx, kx, ky, 0, W, 'weight', P.force, { side: 1, at: 1, ay: 10 });
      vec(ctx, kx, ky, -(tx), -(ty + W), 'wind', P.drag, { side: 1, at: 0.8 });
    }
  }
  function car(ctx, u, ans) {
    ctx.fillStyle = P.road; ctx.fillRect(30, 330, 560, 26); hline(ctx, 30, 590, 330, P.obj, 2);
    const x = 60 + (u * 70) % 460, y = 330;
    ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.fillRect(x - 50, y - 26, 90, 18); ctx.strokeRect(x - 50, y - 26, 90, 18);
    ctx.beginPath(); ctx.moveTo(x - 36, y - 26); ctx.lineTo(x - 26, y - 42); ctx.lineTo(x + 8, y - 42); ctx.lineTo(x + 20, y - 26); ctx.fill(); ctx.stroke();
    for (const wx of [x - 30, x + 22]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, y - 6, 8, 0, Math.PI * 2); ctx.fill(); }
    vec(ctx, x - 5, y - 105, 60, 0, '30 km/h, constant', P.vel, { side: -1, at: 0.5 });
    if (ans) {
      vec(ctx, x + 24, y + 4, 56, 0, 'forward force', P.force, { side: 1, at: 0.6, ay: 18 });
      vec(ctx, x - 30, y + 4, -56, 0, 'friction + drag', P.drag, { side: -1, at: 0.6, ay: 18 });
      vec(ctx, x - 5, y - 26, 0, -40, 'normal', P.ink2, { side: 1, at: 1, align: 'left', ax: 6, ay: -6 });
    }
  }
  function electron(ctx, u, ans) {
    ctx.fillStyle = P.ink2; for (let i = 0; i < 40; i++) { const sx = (i * 137) % 560 + 30, sy = (i * 89) % 420 + 50; ctx.globalAlpha = 0.4; ctx.fillRect(sx, sy, 2, 2); } ctx.globalAlpha = 1;
    const x = 60 + (u * 90) % 500, y = 270;
    ball(ctx, x, y, 8, P.vel); label(ctx, 'e⁻', x, y - 18, { align: 'center', weight: 700, size: 14 });
    vec(ctx, x + 14, y, 60, 0, 'high speed', P.vel, { side: -1, at: 0.5 });
    if (ans) label(ctx, 'no forces act', x, y + 40, { align: 'center', weight: 700, size: 15, color: P.force });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const k = Math.min(4, Math.floor(t / D)), u = t - k * D;
    [drop, cork, kite, car, electron][k](ctx, u, ans);
    if (ans) { partsPanel(ctx, 630, 34, 300, 'Net force on…', PARTS, k, true, ANS); label(ctx, 'net force = 0', 300, 510, { align: 'center', weight: 800, size: 18, color: P.accent }); }
    else partsPanel(ctx, 630, 34, 300, 'Give the net force on…', PARTS, k, false);
  }
  return { qStages, stages, draw };
})();

//@@ q02
const SCENE = (() => {
  const G = 10, U = 10, SLOW = 2, GY = 450, K = 26, XV = 150, X0 = 250;   // illustrative launch speed: none is given
  const T1 = 3, T2 = T1 + 1 * SLOW, T3 = T2 + 3, T4 = T3 + 1 * SLOW, T5 = T4 + 2, TF = 2 * U * Math.SQRT1_2 / G, T6 = T5 + TF * SLOW, T7 = T6 + 3;
  const qStages = [
    { title: 'Thrown vertically upwards', dur: T2, text: 'A pebble of mass 0.05 kg is thrown vertically upwards. Air resistance is ignored.' },
    { title: 'At the highest point', dur: T3 - T2, text: 'It is momentarily at rest at its highest point.' },
    { title: 'Coming down', dur: T4 - T3, text: 'It then falls back down.' },
    { title: 'Thrown at 45°', dur: T7 - T4, text: 'Now the pebble is thrown at 45° with the horizontal. Give the direction and magnitude of the net force in each case.' },
  ];
  const stages = [
    { title: 'Going up', dur: T2, text: 'Once released, the only force on the pebble is its weight. The net force points down even though the pebble moves up.', ans: '(a) Net force = mg = 0.05 × 10 = 0.5 N, vertically downward.' },
    { title: 'At the highest point', dur: T3 - T2, text: 'The pebble is at rest for an instant, but its weight still acts: the net force is not zero.', ans: '(c) Net force = 0.5 N, vertically downward.' },
    { title: 'Coming down', dur: T4 - T3, text: 'Falling, the same weight acts. Only the velocity has changed direction.', ans: '(b) Net force = 0.5 N, vertically downward.' },
    { title: 'Thrown at 45°', dur: T7 - T4, text: 'At any angle of throw, once the pebble leaves the hand only gravity acts on it.', ans: 'No change: the net force is 0.5 N, vertically downward, at every point of the path.' },
  ];
  const yOf = h => GY - h * K;
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 40, 590, GY);
    // vertical throw
    let h = 0, v = U, show = true;
    if (t < 1) { h = 0; v = U; } else if (t < T2) { const p = (t - 1) / SLOW; h = U * p - 5 * p * p; v = U - G * p; }
    else if (t < T3) { h = 5; v = 0; } else if (t < T4) { const p = (t - T3) / SLOW; h = 5 - 5 * p * p; v = -G * p; }
    else { h = 0; v = 0; show = t < T4 + 0.5; }
    ball(ctx, XV, yOf(h) - 7, 7, P.obj);
    if (t < T4 + 0.5) {
      if (Math.abs(v) > 0.2) vec(ctx, XV + 20, yOf(h) - 7, 0, -v * 6, 'v', P.vel, { italic: true, at: 0.6 });
      else label(ctx, 'momentarily at rest', XV + 18, yOf(h) - 10, { size: 13, weight: 700, color: P.vel });
      if (ans) vec(ctx, XV, yOf(h), 0, 40, '0.5 N', P.force, { side: -1, at: 0.7, align: 'right', ax: -6 });
    }
    label(ctx, '0.05 kg', XV - 20, GY + 22, { align: 'center', size: 13, color: P.ink2 });
    // 45° throw
    if (t >= T4) {
      const p = clamp((t - T5) / SLOW, 0, TF), ux = U * Math.SQRT1_2;
      const x = X0 + ux * p * K, hy = ux * p - 5 * p * p;
      const pts = []; for (let s = 0; s <= p; s += 0.05) pts.push([X0 + ux * s * K, yOf(ux * s - 5 * s * s) - 7]);
      trail(ctx, pts, P.ink2, 0.5);
      ball(ctx, x, yOf(hy) - 7, 7, P.obj);
      if (t < T5) { vec(ctx, X0, yOf(0) - 7, 40, -40, '45°', P.vel, { at: 1, ax: 14 }); }
      if (ans) vec(ctx, x, yOf(hy), 0, 40, '0.5 N', P.force, { side: -1, at: 0.7, align: 'right', ax: -6 });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Net force on the pebble', ['(a) going up', '(b) coming down', '(c) at the highest point', 'thrown at 45°'], [0, 2, 1, 3][Math.min(3, stages.findIndex(s => t < s.t1) < 0 ? 3 : stages.findIndex(s => t < s.t1))],
      true, ['0.5 N, vertically downward', '0.5 N, vertically downward', '0.5 N, vertically downward', 'unchanged: 0.5 N, vertically downward']);
    else askedPanel(ctx, 630, 34, 300, ['The direction and magnitude of the net force on the pebble (a) during its upward motion, (b) during its downward motion, (c) at the highest point.', 'Do the answers change if it is thrown at 45° with the horizontal? (Ignore air resistance.)']);
    note(ctx, 'launch speed not given: heights and timing are illustrative; motion at half speed');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const D = 6.5, GY = 440, K = 50, WIN = 2;              // 50 px per metre; window 2 m above the ground (illustrative)
  const PARTS = ['(a) just dropped from the window of a stationary train', '(b) just dropped from a train running at a constant 36 km/h', '(c) just dropped from a train accelerating at 1 m/s²', '(d) lying on the floor of a train accelerating at 1 m/s², at rest relative to the train'];
  const ANS = ['1 N, vertically downward', '1 N, vertically downward', '1 N, vertically downward', '0.1 N, horizontal, in the direction of the train’s acceleration'];
  const qStages = partStages(['(a) Stationary train', '(b) Constant velocity', '(c) Accelerating train', '(d) Stone on the floor'], [
    'A stone of mass 0.1 kg is dropped from the window of a stationary train.', 'It is dropped from the window of a train running at a constant velocity of 36 km/h.',
    'It is dropped from the window of a train accelerating at 1 m/s².', 'It lies on the floor of a train accelerating at 1 m/s², at rest relative to the train. Air resistance is neglected throughout.'], D);
  const stages = partStages(qStages.map(s => s.title), [
    'Once released, only the stone’s weight acts on it: mg = 0.1 × 10 = 1 N, straight down.',
    'The stone keeps the train’s horizontal velocity (10 m/s), but no horizontal force acts on it once it is released. Only its weight acts.',
    'Once it leaves the window it is no longer pushed by the train, so the train’s acceleration does not act on it. Only its weight acts.',
    'The stone accelerates with the train at 1 m/s², so the floor must push it forward (friction). Its weight is balanced by the floor’s normal force.'], D, ANS);
  function train(ctx, x, stone) {
    ctx.fillStyle = P.objFill; ctx.strokeStyle = P.obj; ctx.lineWidth = 2;
    ctx.fillRect(x - 120, GY - 150, 240, 128); ctx.strokeRect(x - 120, GY - 150, 240, 128);
    ctx.fillStyle = P.sheet; ctx.fillRect(x + 50, GY - 130, 50, 40); ctx.strokeRect(x + 50, GY - 130, 50, 40);
    for (const wx of [x - 80, x + 80]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, GY - 12, 12, 0, Math.PI * 2); ctx.fill(); }
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 20, 600, GY);
    const k = Math.min(3, Math.floor(t / D)), u = t - k * D, T = (u - 1.5) / 3, rel = Math.max(0, T);   // T: seconds since release (negative before), shown 3× slower
    const v0 = [0, 10, 10, 10][k], a = [0, 0, 1, 1][k];
    const xt = k === 3 ? 150 + 0.5 * (u / 1.5) ** 2 * 18 : 200 + (v0 * T + 0.5 * a * T * T) * 18;   // train position, 18 px per metre; in (d) its speed is not given, so it starts from rest
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 606, 540); ctx.clip(); train(ctx, xt); ctx.restore();
    if (k < 3) {
      const tf = Math.sqrt(2 * WIN / 10), tr = Math.min(rel, tf), sy = GY - WIN * K + 5 * tr * tr * K;
      const x0 = 275, stx = u < 1.5 ? xt + 75 : x0 + v0 * tr * 18;
      ball(ctx, stx, sy, 6, P.ink);
      if (u >= 1.5 && ans) vec(ctx, stx, sy + 6, 0, 40, '1 N', P.force, { side: -1, at: 0.7, align: 'right', ax: -4 });
      if (v0 && u >= 1.5 && rel < tf) vec(ctx, stx + 10, sy - 14, v0 * 3, 0, '10 m/s', P.vel, { side: -1, at: 0.5, size: 12 });
    } else {
      const sx = xt - 30; block(ctx, sx - 10, GY - 42, 20, 20, '', P.objFill2);
      label(ctx, 'stone', sx, GY - 52, { align: 'center', size: 12 });
      vec(ctx, xt - 120, GY - 175, 50, 0, 'a = 1 m/s²', P.acc, { side: -1, at: 0.5 });
      if (ans) vec(ctx, sx, GY - 22, 40, 0, '0.1 N', P.force, { side: 1, at: 0.8, ay: 6 });
    }
    label(ctx, ['train at rest', 'train: 36 km/h, constant', 'train accelerating: 1 m/s²', 'train accelerating: 1 m/s²'][k], 300, 40, { align: 'center', weight: 700, size: 15 });
    partsPanel(ctx, 630, 34, 300, ans ? 'Net force on the 0.1 kg stone' : 'Give the net force on the stone…', PARTS, k, ans, ANS);
    note(ctx, k === 3 ? 'train’s speed not given: shown starting from rest, 1.5 times slower' : 'window height and track distances illustrative; motion after release 3 times slower');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const CX = 290, CY = 270, R = 160, W = 1.6;
  const OPTS = ['(i) T', '(ii) T − mv²/l', '(iii) T + mv²/l', '(iv) 0'];
  const qStages = [
    { title: 'A particle on a string', dur: 8, text: 'A particle of mass m is tied by a string of length l to a peg on a smooth horizontal table. It moves in a circle with speed v. T is the tension in the string.' },
    { title: 'Choose', dur: 4, text: 'What is the net force on the particle, directed towards the centre?' },
  ];
  const stages = [
    { title: 'Forces on the particle', dur: 8, text: 'Seen from above, the only horizontal force on the particle is the string’s pull, the tension T, towards the peg. Its weight and the table’s normal force are vertical and cancel.', ans: 'Net force towards the centre = T.' },
    { title: 'The answer', dur: 4, text: 'This tension is what keeps the particle on its circle: T = mv²/l. Options (ii) and (iii) wrongly count the centripetal force as an extra force.', ans: 'Correct alternative: (i) T.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.objFill; ctx.globalAlpha = 0.5; ctx.fillRect(60, 60, 460, 420); ctx.globalAlpha = 1;
    label(ctx, 'smooth table, seen from above', 290, 46, { align: 'center', size: 13, color: P.ink2 });
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    const a = t * W, x = CX + R * Math.cos(a), y = CY + R * Math.sin(a);
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, CX, CY, x, y); ctx.restore();
    ball(ctx, CX, CY, 6, P.obj); label(ctx, 'peg', CX + 10, CY + 14, { size: 12, color: P.ink2 });
    ball(ctx, x, y, 11, P.obj); label(ctx, 'l', (CX + x) / 2 + 8, (CY + y) / 2, { italic: true, weight: 700, size: 15 });
    vec(ctx, x, y, -Math.sin(a) * 50, Math.cos(a) * 50, 'v', P.vel, { italic: true });
    if (ans) vec(ctx, x, y, (CX - x) / R * 70, (CY - y) / R * 70, 'T', P.force, { italic: true, at: 0.6 });
    label(ctx, 'Net force towards the centre =', 630, 50, { weight: 700, size: 16 });
    OPTS.forEach((o, i) => {
      const yy = 100 + i * 48;
      ctx.save(); ctx.strokeStyle = P.ink2; ctx.lineWidth = 1.5; ctx.strokeRect(632, yy - 11, 22, 22); ctx.restore();
      label(ctx, o, 666, yy, { size: 17 });
      if (ans && t >= stages[0].dur) { ctx.save(); ctx.strokeStyle = i === 0 ? P.accent : P.force; ctx.lineWidth = 3; if (i === 0) poly(ctx, [[637, yy], [642, yy + 6], [651, yy - 7]]); else { seg(ctx, 637, yy - 6, 649, yy + 6); seg(ctx, 649, yy - 6, 637, yy + 6); } ctx.restore(); }
    });
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const M = 20, U = 15, F = 50, A = F / M, TS = U / A, X0 = 120, K = 9.5;   // 9.5 px per metre
  const S1 = 3, S2 = S1 + TS, S3 = S2 + 4;
  const qStages = [
    { title: 'Moving at 15 m/s', dur: S1, text: 'A body of mass 20 kg moves at 15 m/s. A constant retarding force of 50 N acts on it.' },
    { title: 'Slowing down', dur: S2 - S1, text: 'The retarding force slows the body down until it stops.' },
    { title: 'What is asked', dur: S3 - S2, text: 'How long does the body take to stop?' },
  ];
  const stages = [
    { title: 'Moving at 15 m/s', dur: S1, text: 'The retarding force acts against the motion, so the acceleration points backward.', ans: 'a = F/m = 50/20 = 2.5 m/s², opposite to the motion.' },
    { title: 'Slowing down', dur: S2 - S1, text: 'The speed falls by 2.5 m/s every second. The v–t graph is a straight line sloping down.', ans: 'v = u − at = 15 − 2.5t.' },
    { title: 'Stopped', dur: S3 - S2, text: 'The body stops when v = 0.', ans: '0 = 15 − 2.5t, so t = 6 s (it travels 45 m meanwhile).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 40, 600, 230);
    const tm = clamp(t - S1, 0, TS), x = U * tm - 0.5 * A * tm * tm, v = U - A * tm, bx = X0 + x * K;
    block(ctx, bx - 28, 186, 56, 44, '20 kg');
    if (v > 0.05) vec(ctx, bx, 160, v * 6, 0, ans ? `${v.toFixed(1)} m/s` : (t < S1 ? '15 m/s' : 'v'), P.vel, { side: -1, at: 0.6, italic: !ans && t >= S1 });
    else label(ctx, 'stopped', bx, 160, { align: 'center', weight: 700, size: 14, color: P.vel });
    if (v > 0.05) vec(ctx, bx - 30, 208, -50, 0, '50 N', P.force, { side: 1, at: 0.6, ay: 4 });
    if (ans) {
      clock(ctx, 60, 60, tm);
      const g = axes(ctx, { x: 80, y: 300, w: 440, h: 170, x0: 0, x1: 7, y0: 0, y1: 16, xt: [2, 4, 6], yt: [15], xl: 't (s)', yl: 'v (m/s)' });
      ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 3; poly(ctx, [[g.X(0), g.Y(15)], [g.X(tm), g.Y(v)]]); ctx.restore();
      partsPanel(ctx, 630, 34, 300, 'Working', ['a = F/m = 50 / 20 = 2.5 m/s² (retarding)', 'v = u − at → 0 = 15 − 2.5t', 't = 6 s'], Math.min(2, stages.findIndex(s => t < s.t1) < 0 ? 2 : stages.findIndex(s => t < s.t1)), false);
    } else askedPanel(ctx, 630, 34, 300, ['How long does the body take to stop?']);
    note(ctx, 'scale: 9.5 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const M = 3, V1 = 2, V2 = 3.5, TT = 25, A = (V2 - V1) / TT, SP = 5, X0 = 130, K = 6;   // 25 s shown in 5 s; 6 px per metre
  const S1 = 3, S2 = S1 + TT / SP, S3 = S2 + 4;
  const qStages = [
    { title: 'A body of 3.0 kg', dur: S1, text: 'A body of mass 3.0 kg moves at 2.0 m/s. A constant force acts on it.' },
    { title: 'Speeding up for 25 s', dur: S2 - S1, text: 'In 25 s its speed changes from 2.0 m/s to 3.5 m/s. Its direction of motion stays the same.' },
    { title: 'What is asked', dur: S3 - S2, text: 'What is the magnitude and direction of the force?' },
  ];
  const stages = [
    { title: 'A constant force', dur: S1, text: 'A constant force gives a constant acceleration in its own direction.', ans: 'The speed increases and the direction is unchanged, so the force acts along the motion.' },
    { title: 'Speeding up for 25 s', dur: S2 - S1, text: 'The speed grows steadily from 2.0 m/s to 3.5 m/s.', ans: 'a = (3.5 − 2.0)/25 = 0.06 m/s².' },
    { title: 'The force', dur: S3 - S2, text: 'Newton’s second law gives the force from the acceleration.', ans: 'F = ma = 3.0 × 0.06 = 0.18 N, in the direction of motion.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 40, 600, 250);
    const tm = clamp((t - S1) * SP, 0, TT), x = V1 * tm + 0.5 * A * tm * tm, v = V1 + A * tm, bx = X0 + x * K;
    block(ctx, bx - 26, 208, 52, 42, '3 kg');
    vec(ctx, bx, 180, v * 16, 0, t < S1 ? '2.0 m/s' : t >= S2 ? '3.5 m/s' : (ans ? `${v.toFixed(2)} m/s` : 'v'), P.vel, { side: -1, at: 0.6 });
    if (ans) vec(ctx, bx - 28 - 45, 229, 45, 0, 'F = 0.18 N', P.force, { side: -1, at: 1, align: 'right', ax: -4 });
    clock(ctx, 60, 60, tm, `t = ${tm.toFixed(1)} s`);
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['a = Δv/Δt = (3.5 − 2.0)/25 = 0.06 m/s²', 'F = ma = 3.0 × 0.06 = 0.18 N', 'along the direction of motion'], Math.min(2, Math.floor(t / S2 * 2)), false);
    else askedPanel(ctx, 630, 34, 300, ['The magnitude and direction of the force.']);
    note(ctx, '25 s shown in 5 s; scale 6 px per metre');
  }
  return { qStages, stages, draw };
})();
