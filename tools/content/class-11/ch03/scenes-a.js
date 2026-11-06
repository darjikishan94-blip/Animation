//@@ q06
const SCENE = (() => {
  const OX = 70, OY = 190, A = 5, B = 3, K = 36, D = 10;                     // |a| = 5, |b| = 3 units (illustrative), 36 px per unit
  const qStages = [
    { title: 'Two vectors', dur: D, text: 'Vector b is turned all the way round while a stays fixed.' },
    { title: 'What is asked', dur: 5, text: 'Establish |a + b| ≤ |a| + |b|, |a + b| ≥ ||a| − |b||, |a − b| ≤ |a| + |b| and |a − b| ≥ ||a| − |b||. When does equality hold?' },
  ];
  const stages = [
    { title: '(a), (b): a + b', dur: D, text: 'a, b and a + b form a triangle. A side of a triangle is shorter than the other two together and longer than their difference.', ans: '||a| − |b|| ≤ |a + b| ≤ |a| + |b|.' },
    { title: '(c), (d): a − b', dur: D, text: 'a − b = a + (−b): the same triangle argument with −b in place of b.', ans: '||a| − |b|| ≤ |a − b| ≤ |a| + |b|.' },
    { title: 'Equality', dur: 5, text: 'The triangle flattens into a line only when a and b are parallel or opposite.', ans: '|a + b| = |a| + |b| and |a − b| = ||a| − |b|| when a, b point the same way; the other two when they point opposite ways.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : 0, sub = ans && st === 1, u = st === 2 ? 0.5 + 0.5 * Math.floor((t - stages[2].t0) / 2.5) : clamp((t - (ans ? stages[st].t0 : 0)) / (D - 0.5));
    const ph = (st === 2 ? (u >= 1 ? Math.PI : 0) : u * Math.PI * 2), bx = (sub ? -1 : 1) * B * K * Math.cos(ph), by = -(sub ? -1 : 1) * B * K * Math.sin(ph);
    const ax = OX + A * K;
    ctx.save(); ctx.strokeStyle = P.grid; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(ax, OY, B * K, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    vec(ctx, OX, OY, A * K, 0, 'a', P.vel, { side: 1, at: 0.5, italic: true });
    vec(ctx, ax, OY, bx, by, sub ? '−b' : 'b', P.force, { side: -1, at: 0.6, italic: true });
    if (ans) {
      const L = Math.hypot(A * K + bx, by) / K;
      vec(ctx, OX, OY, A * K + bx, by, sub ? 'a − b' : 'a + b', P.accent, { side: 1, at: 0.45, italic: true, lw: 4 });
      const g = axes(ctx, { x: 70, y: 330, w: 470, h: 150, x0: 0, x1: 360, y0: 0, y1: 9, xt: [90, 180, 270, 360], yt: [2, 8], xl: 'angle between a and b (°)', yl: sub ? '|a − b|' : '|a + b|' });
      hline(ctx, g.X(0), g.X(360), g.Y(8), P.ink2, 1, [4, 4]); label(ctx, '|a| + |b|', g.X(360) - 4, g.Y(8) - 10, { align: 'right', size: 12, color: P.ink2 });
      hline(ctx, g.X(0), g.X(360), g.Y(2), P.ink2, 1, [4, 4]); label(ctx, '||a| − |b||', g.X(360) - 4, g.Y(2) + 12, { align: 'right', size: 12, color: P.ink2 });
      const f = d => Math.sqrt(A * A + B * B + (sub ? -2 : 2) * A * B * Math.cos(d * Math.PI / 180));
      if (st < 2) plot(ctx, g, f, 0, u * 360, P.accent);
      else { plot(ctx, g, f, 0, 360, P.accent); ball(ctx, g.X(ph * 180 / Math.PI), g.Y(f(ph * 180 / Math.PI)), 6, P.accent); label(ctx, ph === 0 ? (sub ? 'same direction: |a − b| = ||a| − |b||' : 'same direction: |a + b| = |a| + |b|') : (sub ? 'opposite: |a − b| = |a| + |b|' : 'opposite: |a + b| = ||a| − |b||'), 300, 300, { align: 'center', weight: 800, size: 15, color: P.accent }); }
      label(ctx, `|${sub ? 'a − b' : 'a + b'}| = ${L.toFixed(2)}`, 420, 60, { weight: 700, size: 15, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Proof', ['a, b, a + b form a triangle: ||a| − |b|| ≤ |a + b| ≤ |a| + |b|', 'With −b: ||a| − |b|| ≤ |a − b| ≤ |a| + |b|', 'Equality only when a and b are parallel or opposite'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) |a + b| ≤ |a| + |b|', '(b) |a + b| ≥ ||a| − |b||', '(c) |a − b| ≤ |a| + |b|', '(d) |a − b| ≥ ||a| − |b||', 'When does the equality sign apply?']);
    note(ctx, 'lengths of a and b illustrative: |a| = 5, |b| = 3 units');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const CX = 300, CY = 270, R = 200, D = 8;                                // 1 px = 1 m
  const path = [s => [CX - 120 * Math.sin(Math.PI * s), CY + R - 2 * R * s], s => [CX, CY + R - 2 * R * s], s => [CX + 80 * Math.sin(Math.PI * s) + 40 * Math.sin(5 * Math.PI * s) * Math.sin(Math.PI * s), CY + R - 2 * R * s + 25 * Math.sin(3 * Math.PI * s)]];
  const COL = ['vel', 'accent', 'force'], NAME = ['A', 'B', 'C'];
  const qStages = [
    { title: 'Three skaters', dur: D + 1, text: 'Three girls skate from P to Q, diametrically opposite, on a circular ice ground of radius 200 m, by different paths (Fig. 3.19).' },
    { title: 'What is asked', dur: 4, text: 'What is the magnitude of each girl’s displacement? For whom does it equal the path length?' },
  ];
  const stages = [
    { title: 'Different paths', dur: D + 1, text: 'Each girl’s path is different, but all start at P and end at Q.', ans: 'Displacement depends only on the start and end points.' },
    { title: 'Displacement', dur: 4, text: 'The displacement is the straight arrow from P to Q: a diameter.', ans: '|PQ| = 2 × 200 = 400 m for each girl.' },
    { title: 'Path length', dur: 4, text: 'Only one girl skates along the straight line PQ.', ans: 'Only for B is the path length equal to 400 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.15; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    label(ctx, 'P', CX, CY + R + 16, { align: 'center', weight: 700, size: 15 }); label(ctx, 'Q', CX, CY - R - 14, { align: 'center', weight: 700, size: 15 });
    const s = clamp(t / D);
    path.forEach((f, i) => {
      const pts = []; for (let k = 0; k <= 100 * s; k++) pts.push(f(k / 100));
      ctx.save(); ctx.strokeStyle = P[COL[i]]; ctx.lineWidth = 2.5; if (pts.length > 1) poly(ctx, pts); ctx.restore();
      const [x, y] = f(s); ball(ctx, x, y, 7, P[COL[i]]); label(ctx, NAME[i], x + (i === 2 ? 12 : -12), y, { align: i === 2 ? 'left' : 'right', weight: 700, size: 14, color: P[COL[i]] });
    });
    if (ans && t >= stages[1].t0) { vec(ctx, CX + 6, CY + R, 0, -2 * R + 4, '', P.ink, { lw: 3 }); label(ctx, 'displacement 400 m', CX + 14, CY + 40, { weight: 800, size: 15, color: P.ink, halo: true }); }
    if (ans && t >= stages[2].t0) label(ctx, 'B: path = 400 m', CX - 150, CY + R + 40, { weight: 800, size: 15, color: P.accent });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['All start at P and end at Q', '|displacement| = diameter = 400 m for each', 'Equal to the path length only for B'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The magnitude of the displacement for each girl.', 'For which girl is it equal to the actual length of the path skated?']);
    note(ctx, 'paths A and C drawn to match Fig. 3.19; 1 px = 1 m');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const OX = 300, OY = 300, R = 180, D = 12, L = 2 + Math.PI / 2;            // 1 km = 180 px; path 3.57 km
  const at = d => d <= 1 ? [OX + R * d, OY] : d <= 1 + Math.PI / 2 ? ((a) => [OX + R * Math.cos(a), OY - R * Math.sin(a)])(d - 1) : [OX, OY - R * (L - d)];
  const qStages = [
    { title: 'Round the park', dur: D + 1, text: 'A cyclist starts at the centre O of a circular park of radius 1 km, rides to P on the edge, along the circumference to Q, and back to O (Fig. 3.20). The round trip takes 10 min.' },
    { title: 'What is asked', dur: 4, text: 'Find (a) the net displacement, (b) the average velocity, (c) the average speed.' },
  ];
  const stages = [
    { title: 'The round trip', dur: D + 1, text: 'Follow the displacement arrow from O to the cyclist, and the distance ridden.', ans: 'O → P: 1 km; arc P → Q: a quarter circle, π/2 km; Q → O: 1 km.' },
    { title: 'Displacement and velocity', dur: 4, text: 'He ends where he started.', ans: '(a) Net displacement = 0. (b) Average velocity = 0 / 10 min = 0.' },
    { title: 'Average speed', dur: 4, text: 'Average speed = total path length / time.', ans: '(c) (2 + π/2) km / (1/6 h) ≈ 3.57 × 6 ≈ 21.4 km/h.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.leaf; ctx.globalAlpha = 0.15; ctx.beginPath(); ctx.arc(OX, OY, R, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(OX, OY, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    ball(ctx, OX, OY, 4, P.ink); label(ctx, 'O', OX - 14, OY + 14, { weight: 700, size: 15 }); label(ctx, 'P', OX + R + 10, OY, { weight: 700, size: 15 }); label(ctx, 'Q', OX, OY - R - 14, { align: 'center', weight: 700, size: 15 });
    label(ctx, '1 km', OX + R / 2, OY + 16, { align: 'center', size: 13 });
    const d = clamp(t / D) * L, [x, y] = at(d);
    const pts = []; for (let k = 0; k <= 200; k++) { const dd = k / 200 * d; pts.push(at(dd)); }
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 3; poly(ctx, pts); ctx.restore();
    ball(ctx, x, y, 8, P.force);
    if (ans) {
      if (Math.hypot(x - OX, y - OY) > 4) vec(ctx, OX, OY, x - OX, y - OY, '', P.disp, { lw: 3 });
      label(ctx, `path ridden: ${d.toFixed(2)} km`, 40, 70, { weight: 700, size: 15, color: P.vel });
      label(ctx, `displacement: ${(Math.hypot(x - OX, y - OY) / R).toFixed(2)} km`, 40, 96, { weight: 700, size: 15, color: P.disp });
      clock(ctx, 60, 480, d / L * 10 * 60, `t = ${(d / L * 10).toFixed(1)} min`);
      partsPanel(ctx, 630, 34, 300, 'Answers', ['Path: 1 + π/2 + 1 ≈ 3.57 km', '(a) displacement 0; (b) average velocity 0', '(c) average speed ≈ 21.4 km/h'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The net displacement, (b) the average velocity, (c) the average speed of the cyclist.']);
    note(ctx, 'uniform speed assumed for the animation; 10 min shown in 12 s');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const S = 200, X0 = 170, Y0 = 440, TS = 1.2;                               // side 500 m = 200 px; 1.2 s per side
  const V = [[X0, Y0]]; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 3, [x, y] = V[i]; V.push([x + S * Math.cos(a), y - S * Math.sin(a)]); }
  const posAt = n => { n = clamp(n, 0, 8); const i = Math.min(7, Math.floor(n)), f = n - i; return [V[i][0] + (V[i + 1][0] - V[i][0]) * f, V[i][1] + (V[i + 1][1] - V[i][1]) * f]; };
  const qStages = [
    { title: 'Turning left every 500 m', dur: 8 * TS + 1, text: 'On open ground a motorist turns left by 60° after every 500 m, starting from a turn.' },
    { title: 'What is asked', dur: 4, text: 'Give the displacement at the third, sixth and eighth turns, and compare it with the path length.' },
  ];
  const stages = [
    { title: 'To the 3rd turn', dur: 3 * TS, text: 'The track is a regular hexagon of side 500 m.', ans: '' },
    { title: 'At the 3rd turn', dur: 4, text: 'He is at the opposite corner of the hexagon.', ans: 'Displacement 1000 m at 60° to the start direction; path 1500 m; ratio ≈ 0.67.' },
    { title: 'To the 6th turn', dur: 3 * TS, text: 'Three more sides bring him back round.', ans: '' },
    { title: 'At the 6th turn', dur: 4, text: 'He is back at the start.', ans: 'Displacement 0; path 3000 m; ratio 0.' },
    { title: 'To the 8th turn', dur: 2 * TS, text: 'Two more sides.', ans: '' },
    { title: 'At the 8th turn', dur: 4, text: 'He is two sides past the start.', ans: 'Displacement 2 × 500 cos 30° ≈ 866 m at 30° to the start direction; path 4000 m; ratio ≈ 0.22.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    let n;
    if (!ans) n = clamp(t / TS, 0, 8);
    else { const st = stageAt(stages, t), u = t - stages[st].t0; n = [u / TS, 3, 3 + u / TS, 6, 6 + u / TS, 8][st]; n = clamp(n, 0, 8); }
    ctx.save(); ctx.strokeStyle = P.grid; ctx.lineWidth = 1; ctx.setLineDash([4, 4]); poly(ctx, V.slice(0, 7)); ctx.restore();
    const pts = []; for (let k = 0; k <= Math.floor(n); k++) pts.push(V[k]); pts.push(posAt(n));
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 3; poly(ctx, pts); ctx.restore();
    ball(ctx, X0, Y0, 5, P.ink); label(ctx, 'start', X0 - 10, Y0 + 14, { align: 'right', size: 13, weight: 700 });
    const [x, y] = posAt(n); ball(ctx, x, y, 8, P.force);
    for (let k = 1; k <= Math.floor(n); k++) if (k < 7 || k === 8) label(ctx, String(k), V[k][0] + (V[k][0] > 300 ? 12 : -12), V[k][1], { align: V[k][0] > 300 ? 'left' : 'right', size: 12, color: P.ink2 });
    label(ctx, '500 m', (V[0][0] + V[1][0]) / 2, Y0 + 16, { align: 'center', size: 12 });
    if (ans) {
      const dx = x - X0, dy = y - Y0, dm = Math.hypot(dx, dy) * 2.5;
      if (dm > 5) vec(ctx, X0, Y0, dx, dy, `${dm.toFixed(0)} m`, P.accent, { side: -1, at: 0.5, lw: 3 });
      label(ctx, `path ${(n * 500).toFixed(0)} m`, 40, 60, { weight: 700, size: 15, color: P.vel });
      label(ctx, `|displacement| ${dm.toFixed(0)} m`, 40, 86, { weight: 700, size: 15, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Displacement vs path', ['3rd turn', '6th turn', '8th turn'], [-1, 0, 0, 1, 1, 2][stageAt(stages, t)], true, ['1000 m at 60° to the start direction; path 1500 m (ratio 0.67)', '0; path 3000 m (ratio 0)', '866 m at 30°; path 4000 m (ratio 0.22)']);
    } else askedPanel(ctx, 630, 34, 300, ['The displacement at the third, sixth and eighth turns.', 'Its magnitude compared with the total path length in each case.']);
    note(ctx, 'seen from above; 1 px = 2.5 m');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const RT = [[80, 300], [120, 180], [220, 120], [300, 200], [260, 320], [340, 430], [450, 400], [430, 250], [520, 300]], D = 10;
  const seg_ = RT.slice(1).map((p, i) => Math.hypot(p[0] - RT[i][0], p[1] - RT[i][1])), LT = seg_.reduce((a, b) => a + b, 0);
  const posAt = s => { let d = s * LT; for (let i = 0; i < seg_.length; i++) { if (d <= seg_[i]) { const f = d / seg_[i]; return [RT[i][0] + (RT[i + 1][0] - RT[i][0]) * f, RT[i][1] + (RT[i + 1][1] - RT[i][1]) * f]; } d -= seg_[i]; } return RT[RT.length - 1]; };
  const qStages = [
    { title: 'The long way round', dur: D + 1, text: 'The hotel is 10 km from the station along a straight road. A dishonest cabman drives a circuitous 23 km route and arrives in 28 min.' },
    { title: 'What is asked', dur: 4, text: 'Find (a) the average speed of the taxi and (b) the magnitude of its average velocity. Are they equal?' },
  ];
  const stages = [
    { title: 'The ride', dur: D + 1, text: 'The odometer counts the path; the displacement arrow joins the station to the taxi.', ans: 'Path 23 km; displacement 10 km; time 28 min = 28/60 h.' },
    { title: 'Average speed', dur: 4, text: 'Average speed = path length / time.', ans: '(a) 23 / (28/60) ≈ 49.3 km/h.' },
    { title: 'Average velocity', dur: 4, text: '|Average velocity| = |displacement| / time.', ans: '(b) 10 / (28/60) ≈ 21.4 km/h. Not equal: the route is longer than the straight road.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, RT[0][0], RT[8][0], 300, P.ink2, 1.5, [6, 5]); label(ctx, 'straight road: 10 km', 300, 288, { align: 'center', size: 12, color: P.ink2 });
    ctx.save(); ctx.strokeStyle = P.grid; ctx.lineWidth = 6; ctx.lineJoin = 'round'; poly(ctx, RT); ctx.restore();
    const s = clamp(t / D), [x, y] = posAt(s), pts = []; for (let k = 0; k <= 200 * s; k++) pts.push(posAt(k / 200)); pts.push([x, y]);
    ctx.save(); ctx.strokeStyle = P.ke; ctx.lineWidth = 3; ctx.lineJoin = 'round'; poly(ctx, pts); ctx.restore();
    block(ctx, RT[0][0] - 40, 300, 40, 30, 'station', P.objFill); block(ctx, RT[8][0], 300, 40, 30, 'hotel', P.objFill);
    block(ctx, x - 12, y - 8, 24, 16, '', P.ke);
    if (ans) {
      if (Math.hypot(x - RT[0][0], y - 300) > 6) vec(ctx, RT[0][0], 300, x - RT[0][0], y - 300, '', P.disp, { lw: 3 });
      label(ctx, `odometer: ${(23 * s).toFixed(1)} km`, 40, 470, { weight: 700, size: 15, color: P.ke });
      label(ctx, `|displacement|: ${(Math.hypot(x - RT[0][0], y - 300) / 44).toFixed(1)} km`, 40, 496, { weight: 700, size: 15, color: P.disp });
      clock(ctx, 60, 50, s * 28 * 2, `t = ${(s * 28).toFixed(0)} min`);
      partsPanel(ctx, 630, 34, 300, 'Answers', ['Path 23 km, displacement 10 km, in 28 min', '(a) average speed = 23 / (28/60) ≈ 49.3 km/h', '(b) |average velocity| = 10 / (28/60) ≈ 21.4 km/h: not equal'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The average speed of the taxi.', '(b) The magnitude of its average velocity. Are the two equal?']);
    note(ctx, 'route illustrative, drawn about 2.3 times the straight-line distance');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const U = 40, G = 9.8, HC = 25, K = 3.4, X0 = 45, FY = 440, TH = Math.asin(Math.sqrt(2 * G * HC) / U), SP = 2;   // θ ≈ 33.6°
  const traj = (th, s) => [X0 + U * Math.cos(th) * s * K, FY - (U * Math.sin(th) * s - 0.5 * G * s * s) * K];
  const qStages = [
    { title: 'A long hall', dur: 6, text: 'The ceiling of a long hall is 25 m high. A ball is thrown with a speed of 40 m/s.' },
    { title: 'What is asked', dur: 4, text: 'What is the greatest horizontal distance the ball can go without hitting the ceiling?' },
  ];
  const T45 = (() => { let s = 0; while (traj(Math.PI / 4, s)[1] > FY - HC * K) s += 0.005; return s; })(), TF = 2 * U * Math.sin(TH) / G;
  const stages = [
    { title: 'Try 45°', dur: T45 / SP + 1.5, text: '45° gives the greatest range on open ground, but it rises to u²/4g ≈ 40.8 m.', ans: 'At 45° the ball hits the 25 m ceiling.' },
    { title: 'Just touch the ceiling', dur: TF / SP + 1.5, text: 'The best throw is the one whose top just reaches 25 m: H = u² sin²θ / 2g = 25.', ans: 'sin²θ = 25 × 2 × 9.8 / 1600 ≈ 0.306, θ ≈ 33.6°.' },
    { title: 'The range', dur: 4, text: 'Range R = u² sin 2θ / g.', ans: 'R = 1600 × sin 67.2° / 9.8 ≈ 150.5 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const CY = FY - HC * K;
    ctx.fillStyle = P.objFill; ctx.fillRect(20, CY - 14, 580, 14); hline(ctx, 20, 600, CY, P.obj, 2); ground(ctx, 20, 600, FY);
    vdim(ctx, 590, CY, FY, P.ink2); label(ctx, '25 m', 584, (CY + FY) / 2, { align: 'right', weight: 700, size: 13 });
    person(ctx, X0 - 20, FY, 0.7);
    if (!ans) {
      const th = (35 + 15 * Math.sin(t * 1.2)) * Math.PI / 180;
      vec(ctx, X0, FY - 4, 70 * Math.cos(th), -70 * Math.sin(th), '40 m/s at θ = ?', P.vel, { side: -1, at: 1, align: 'left', ax: 6, size: 13 });
      askedPanel(ctx, 630, 34, 300, ['The maximum horizontal distance the ball (thrown at 40 m/s) can go without hitting the 25 m ceiling.']);
      note(ctx, 'thrown from floor level; 3.4 px per metre'); return;
    }
    const st = stageAt(stages, t);
    { const s = Math.min((st === 0 ? t : stages[0].dur) * SP, T45), pts = []; for (let k = 0; k <= s; k += 0.02) pts.push(traj(Math.PI / 4, k)); const p = traj(Math.PI / 4, s); pts.push(p);
      trail(ctx, pts, P.force, st === 0 ? 0.9 : 0.4); ball(ctx, p[0], p[1], 6, P.force); if (s >= T45) label(ctx, '45°: hits the ceiling', p[0] + 10, CY + 18, { weight: 700, size: 13, color: P.force }); }
    if (st >= 1) {
      const s = Math.min((t - stages[1].t0) * SP, TF), pts = []; for (let k = 0; k <= s; k += 0.02) pts.push(traj(TH, k)); const p = traj(TH, s); pts.push(p);
      trail(ctx, pts, P.accent, 0.95); ball(ctx, p[0], p[1], 6, P.accent);
      vec(ctx, X0, FY - 4, 70 * Math.cos(TH), -70 * Math.sin(TH), '33.6°', P.vel, { side: -1, at: 1, align: 'left', ax: 6, size: 13 });
      if (s >= TF) { dim(ctx, X0, X0 + 150.5 * K, FY + 24, P.accent); label(ctx, 'R ≈ 150.5 m', X0 + 75 * K, FY + 40, { align: 'center', weight: 800, size: 15, color: P.accent }); }
    }
    partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['45° would rise to 40.8 m: too high', 'Top just at 25 m: sin²θ = 2gH/u² ≈ 0.306, θ ≈ 33.6°', 'R = u² sin 2θ / g ≈ 150.5 m'], st, false);
    note(ctx, 'thrown from floor level; 3.4 px per metre; flights shown at 2 × speed');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const G = 9.8, R = 100, U = Math.sqrt(R * G), K = 4, X0 = 80, FY = 440, SP = 2, TF = 2 * U * Math.SQRT1_2 / G, TV = 2 * U / G;
  const qStages = [
    { title: 'The longest throw', dur: TF / SP + 2, text: 'A cricketer can throw a ball to a maximum horizontal distance of 100 m.' },
    { title: 'What is asked', dur: 4, text: 'How high above the ground can the cricketer throw the same ball?' },
  ];
  const stages = [
    { title: 'Maximum range', dur: TF / SP + 2, text: 'The range is greatest for a 45° throw: R_max = u²/g.', ans: 'u² = 100 g, so u ≈ 31.3 m/s.' },
    { title: 'Straight up', dur: TV / SP + 2, text: 'The greatest height is reached throwing straight up with the same speed: H = u²/2g.', ans: 'H = R_max / 2 = 50 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 30, 590, FY); person(ctx, X0 - 22, FY, 0.8);
    const s1 = Math.min(t * SP, TF), pts = []; for (let k = 0; k <= s1; k += 0.02) pts.push([X0 + U * Math.SQRT1_2 * k * K, FY - (U * Math.SQRT1_2 * k - 0.5 * G * k * k) * K]);
    trail(ctx, pts, P.vel, 0.9); const p = pts[pts.length - 1] || [X0, FY]; ball(ctx, p[0], p[1], 6, P.vel);
    if (s1 >= TF) { dim(ctx, X0, X0 + R * K, FY + 24, P.vel); label(ctx, '100 m (maximum)', X0 + R * K / 2, FY + 40, { align: 'center', weight: 700, size: 14, color: P.vel }); }
    if (ans && t >= stages[1].t0) {
      const s = Math.min((t - stages[1].t0) * SP, TV), h = U * s - 0.5 * G * s * s; ball(ctx, X0 + 30, FY - h * K - 6, 6, P.accent);
      vline(ctx, X0 + 30, FY - 50 * K, FY, P.accent, 1, [4, 4]); vdim(ctx, X0 + 60, FY - 50 * K, FY, P.accent); label(ctx, 'H = 50 m', X0 + 68, FY - 25 * K, { weight: 800, size: 15, color: P.accent });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['R_max = u²/g = 100 m (at 45°)', 'Straight up: H = u²/2g = R_max/2 = 50 m'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['How high above the ground the cricketer can throw the same ball.']);
    note(ctx, '4 px per metre; flights shown at 2 × speed');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const N = 14, TT = 25, W = 2 * Math.PI * N / TT, R = 0.8, KR = 200, CX = 300, CY = 270, SP = 2.5, A = W * W * R;   // a ≈ 9.9 m/s²
  const qStages = [
    { title: 'Whirled in a circle', dur: TT / SP + 1, text: 'A stone on a string 80 cm long is whirled in a horizontal circle at constant speed: 14 revolutions in 25 s.' },
    { title: 'What is asked', dur: 4, text: 'What are the magnitude and direction of the stone’s acceleration?' },
  ];
  const stages = [
    { title: '14 revolutions in 25 s', dur: TT / SP + 1, text: 'Uniform circular motion: the speed is constant but the direction of the velocity keeps turning.', ans: 'ω = 2π × 14 / 25 ≈ 3.52 rad/s; v = ωr ≈ 2.81 m/s.' },
    { title: 'The acceleration', dur: 5, text: 'Centripetal acceleration a = ω²r, directed towards the centre.', ans: 'a = 3.52² × 0.80 ≈ 9.9 m/s², along the string towards the centre.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    label(ctx, 'seen from above', CX, 40, { align: 'center', size: 13, color: P.ink2 });
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, R * KR, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    const tr = Math.min(t * SP, TT + (ans ? 100 : 0) * 0), tt = ans && t > stages[0].t1 ? TT + (t - stages[0].t1) : tr, a = -W * tt, x = CX + R * KR * Math.cos(a), y = CY + R * KR * Math.sin(a);
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, CX, CY, x, y); ctx.restore(); ball(ctx, CX, CY, 5, P.obj); ball(ctx, x, y, 10, P.objFill2);
    label(ctx, '80 cm', CX - 70, CY + 20, { size: 13, weight: 700 });
    label(ctx, `revolutions: ${Math.min(N, Math.floor(W * tr / (2 * Math.PI)))}`, 40, 470, { weight: 700, size: 15 });
    clock(ctx, 60, 60, tr, `t = ${tr.toFixed(1)} s`);
    if (ans) {
      vec(ctx, x, y, Math.sin(a) * 60, -Math.cos(a) * 60, 'v', P.vel, { italic: true });
      vec(ctx, x, y, (CX - x) / (R * KR) * 70, (CY - y) / (R * KR) * 70, 'a ≈ 9.9 m/s²', P.acc, { at: 0.55, size: 13 });
      partsPanel(ctx, 630, 34, 300, 'Working', ['ω = 2π × 14/25 ≈ 3.52 rad/s', 'a = ω²r = 3.52² × 0.80 ≈ 9.9 m/s², towards the centre'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The magnitude and direction of the acceleration of the stone.']);
    note(ctx, 'shown 2.5 times faster than real');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const V = 250, R = 1000, G = 9.8, A = V * V / R, CX = 280, CY = 260, KR = 0.18, TP = 2 * Math.PI * R / V, SHOW = 10;   // a = 62.5 m/s²
  const qStages = [
    { title: 'A horizontal loop', dur: SHOW, text: 'An aircraft flies a horizontal loop of radius 1.00 km at a steady 900 km/h.' },
    { title: 'What is asked', dur: 4, text: 'Compare its centripetal acceleration with the acceleration due to gravity.' },
  ];
  const stages = [
    { title: 'Speed in m/s', dur: SHOW, text: 'Steady speed round a circle: the acceleration points to the centre.', ans: 'v = 900 km/h = 250 m/s.' },
    { title: 'Compare with g', dur: 6, text: 'a = v² / r.', ans: 'a = 250² / 1000 = 62.5 m/s²; a/g = 62.5/9.8 ≈ 6.4.' },
  ];
  function plane(ctx, x, y, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = P.obj; ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(-12, -10); ctx.lineTo(-6, 0); ctx.lineTo(-12, 10); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    label(ctx, 'seen from above', CX, 40, { align: 'center', size: 13, color: P.ink2 });
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, R * KR, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    ball(ctx, CX, CY, 4, P.ink); label(ctx, 'r = 1.00 km', CX + 8, CY + 16, { size: 13, weight: 700 });
    const a = -(t / SHOW) * Math.PI * 2, x = CX + R * KR * Math.cos(a), y = CY + R * KR * Math.sin(a);
    plane(ctx, x, y, a - Math.PI / 2);
    vec(ctx, x + Math.sin(a) * 18, y - Math.cos(a) * 18, Math.sin(a) * 50, -Math.cos(a) * 50, ans ? '250 m/s' : '900 km/h', P.vel, { size: 12 });
    if (ans) {
      vec(ctx, x, y, (CX - x) / (R * KR) * 70, (CY - y) / (R * KR) * 70, 'a', P.acc, { at: 0.6, italic: true });
      if (t >= stages[1].t0) {
        const BX = 500, BY = 470, KB = 5;
        ctx.fillStyle = P.acc; ctx.fillRect(BX, BY - A * KB, 30, A * KB); ctx.fillStyle = P.ink2; ctx.fillRect(BX + 44, BY - G * KB, 30, G * KB);
        label(ctx, '62.5', BX + 15, BY - A * KB - 12, { align: 'center', weight: 700, size: 13, color: P.acc }); label(ctx, 'g = 9.8', BX + 59, BY - G * KB - 12, { align: 'center', weight: 700, size: 13 });
        label(ctx, 'a ≈ 6.4 g', BX + 36, BY + 18, { align: 'center', weight: 800, size: 16, color: P.accent });
      }
      partsPanel(ctx, 630, 34, 300, 'Working', ['v = 900 km/h = 250 m/s', 'a = v²/r = 62.5 m/s² ≈ 6.4 g'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The centripetal acceleration of the aircraft compared with g.']);
    note(ctx, `one loop takes ${TP.toFixed(0)} s; shown in 10 s`);
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const OX = 110, OY = 80, K = 25, KV = 8, rx = t => 3 * t, ry = t => -2 * t * t, TE = 2.5, SLOW = 2;
  const qStages = [
    { title: 'r = 3.0t î − 2.0t² ĵ + 4.0 k̂', dur: TE * SLOW + 1, text: 'The particle’s position is r = 3.0t î − 2.0t² ĵ + 4.0 k̂ m. It stays in the plane z = 4.0 m; the picture shows its x–y projection.' },
    { title: 'What is asked', dur: 4, text: '(a) Find v and a. (b) Give the magnitude and direction of v at t = 2.0 s.' },
  ];
  const stages = [
    { title: 'Differentiate', dur: 2.0 * SLOW, text: 'v = dr/dt and a = dv/dt, term by term.', ans: '(a) v = 3.0 î − 4.0t ĵ m/s; a = −4.0 ĵ m/s², constant.' },
    { title: 'At t = 2.0 s', dur: 5, text: 'v = 3.0 î − 8.0 ĵ m/s.', ans: '(b) |v| = √(3.0² + 8.0²) ≈ 8.54 m/s, at tan⁻¹(8/3) ≈ 70° below the x-axis.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    arrow(ctx, OX - 20, OY, 570, OY, P.ink2, { lw: 1.5, head: 8 }); label(ctx, 'x (m)', 566, OY - 14, { size: 12, color: P.ink2, align: 'right' });
    arrow(ctx, OX, 500, OX, OY - 40, P.ink2, { lw: 1.5, head: 8 }); label(ctx, 'y (m)', OX + 8, OY - 40, { size: 12, color: P.ink2 });
    for (let m = 2; m <= 16; m += 2) { vline(ctx, OX + m * K, OY - 4, OY + 4, P.ink2, 1); if (m % 4 === 0) label(ctx, String(m), OX + m * K, OY - 14, { align: 'center', size: 11, color: P.ink2 }); }
    for (let m = -2; m >= -16; m -= 2) { hline(ctx, OX - 4, OX + 4, OY - m * K, P.ink2, 1); if (m % 4 === 0) label(ctx, String(m), OX - 8, OY - m * K, { align: 'right', size: 11, color: P.ink2 }); }
    const tt = ans ? (t < stages[0].t1 ? t / SLOW : 2.0) : Math.min(t / SLOW, TE);
    const pts = []; for (let s = 0; s <= tt + 1e-9; s += 0.02) pts.push([OX + rx(s) * K, OY - ry(s) * K]);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.globalAlpha = 0.25; ctx.setLineDash([4, 4]); const all = []; for (let s = 0; s <= TE; s += 0.05) all.push([OX + rx(s) * K, OY - ry(s) * K]); poly(ctx, all); ctx.restore();
    trail(ctx, pts, P.vel, 0.9);
    const x = OX + rx(tt) * K, y = OY - ry(tt) * K; ball(ctx, x, y, 7, P.force);
    label(ctx, `t = ${tt.toFixed(2)} s`, 330, 470, { weight: 700, size: 15 });
    if (ans) {
      vec(ctx, x, y, 3 * KV, 4 * tt * KV, `v = 3.0 î − ${(4 * tt).toFixed(1)} ĵ`, P.vel, { side: -1, at: 1, align: 'left', ax: 6, size: 13 });
      vec(ctx, x - 30, y, 0, 4 * KV, 'a = −4.0 ĵ', P.acc, { side: 1, at: 0.6, align: 'right', ax: -4, size: 13 });
      if (tt >= 2) { label(ctx, '|v| ≈ 8.54 m/s, ≈ 70° below +x', 330, 496, { weight: 800, size: 15, color: P.accent }); ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.atan2(8, 3)); ctx.stroke(); ctx.restore(); hline(ctx, x, x + 40, y, P.ink2, 1, [3, 3]); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['v = dr/dt = 3.0 î − 4.0t ĵ;  a = −4.0 ĵ', 'At 2.0 s: v = 3.0 î − 8.0 ĵ: 8.54 m/s at ≈ 70° below +x'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The velocity v and acceleration a of the particle.', '(b) The magnitude and direction of v at t = 2.0 s.']);
    note(ctx, 'x–y projection (z = 4.0 m throughout); 25 px per metre; half speed');
  }
  return { qStages, stages, draw };
})();

//@@ q18
const SCENE = (() => {
  const OX = 110, OY = 470, K = 12, KV = 5, KA = 8, xf = t => 4 * t * t, yf = t => 10 * t + t * t, SLOW = 2;
  const qStages = [
    { title: 'Start', dur: 3, text: 'A particle starts at the origin with velocity 10.0 ĵ m/s and a constant acceleration (8.0 î + 2.0 ĵ) m/s².' },
    { title: 'Moving', dur: 2.4 * SLOW, text: 'It moves in the x–y plane.' },
    { title: 'What is asked', dur: 4, text: '(a) When is x = 16 m, and what is y then? (b) What is the speed then?' },
  ];
  const stages = [
    { title: 'Components', dur: 3, text: 'Treat x and y separately: x = ½ aₓt², y = u_y t + ½ a_y t².', ans: 'x = 4.0t², y = 10.0t + 1.0t².' },
    { title: 'x = 16 m', dur: 2.0 * SLOW + 1, text: '4.0t² = 16 gives t = 2.0 s.', ans: '(a) t = 2.0 s; y = 20 + 4 = 24 m.' },
    { title: 'Speed', dur: 4, text: 'v = 8.0t î + (10.0 + 2.0t) ĵ = 16 î + 14 ĵ at 2.0 s.', ans: '(b) speed = √(16² + 14²) ≈ 21.3 m/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    arrow(ctx, OX, OY, 560, OY, P.ink2, { lw: 1.5, head: 8 }); label(ctx, 'x (m)', 556, OY + 16, { size: 12, color: P.ink2, align: 'right' });
    arrow(ctx, OX, OY, OX, 60, P.ink2, { lw: 1.5, head: 8 }); label(ctx, 'y (m)', OX + 8, 62, { size: 12, color: P.ink2 });
    for (let m = 4; m <= 32; m += 4) { vline(ctx, OX + m * K, OY - 4, OY + 4, P.ink2, 1); label(ctx, String(m), OX + m * K, OY + 16, { align: 'center', size: 11, color: P.ink2 }); hline(ctx, OX - 4, OX + 4, OY - m * K, P.ink2, 1); label(ctx, String(m), OX - 8, OY - m * K, { align: 'right', size: 11, color: P.ink2 }); }
    vline(ctx, OX + 16 * K, 60, OY, P.ink2, 1, [5, 4]); label(ctx, 'x = 16 m', OX + 16 * K + 6, 70, { size: 12, color: P.ink2 });
    let tt; if (!ans) tt = t < 3 ? 0 : Math.min((t - 3) / SLOW, 2.4); else { const st = stageAt(stages, t); tt = st === 0 ? 0 : st === 1 ? Math.min((t - 3) / SLOW, 2) : 2; }
    const pts = []; for (let s = 0; s <= tt + 1e-9; s += 0.02) pts.push([OX + xf(s) * K, OY - yf(s) * K]);
    if (pts.length > 1) trail(ctx, pts, P.vel, 0.9);
    const x = OX + xf(tt) * K, y = OY - yf(tt) * K; ball(ctx, x, y, 7, P.force);
    if (tt === 0) vec(ctx, OX, OY, 0, -10 * KV, '10.0 ĵ m/s', P.vel, { side: 1, at: 0.7, align: 'left', ax: 4, size: 12 });
    vec(ctx, 420, 140, 8 * KA, -2 * KA, 'a = 8.0 î + 2.0 ĵ', P.acc, { side: -1, at: 0.5, size: 12 });
    if (ans && tt > 0) {
      vec(ctx, x, y, 8 * tt * KV, -(10 + 2 * tt) * KV, tt >= 2 ? '16 î + 14 ĵ m/s' : '', P.vel, { side: -1, at: 1, align: 'left', ax: 6, size: 12 });
      label(ctx, `t = ${tt.toFixed(2)} s   x = ${xf(tt).toFixed(1)} m   y = ${yf(tt).toFixed(1)} m`, 330, 500, { align: 'center', weight: 700, size: 14 });
      if (tt >= 2) label(ctx, 'speed ≈ 21.3 m/s', x + 10, y + 30, { weight: 800, size: 15, color: P.accent });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['x = 4.0t², y = 10.0t + 1.0t²', '(a) 4.0t² = 16: t = 2.0 s, y = 24 m', '(b) v = 16 î + 14 ĵ: speed ≈ 21.3 m/s'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['(a) The time at which x = 16 m, and the y-coordinate then.', '(b) The speed of the particle at that time.']);
    note(ctx, '12 px per metre; motion shown at half speed');
  }
  return { qStages, stages, draw };
})();

//@@ q19
const SCENE = (() => {
  const OX = 190, OY = 330, K = 70, X = x => OX + x * K, Y = y => OY - y * K;
  const qStages = [
    { title: 'Unit vectors and A', dur: 5, text: 'î and ĵ are unit vectors along x and y. A = 2î + 3ĵ.' },
    { title: 'What is asked', dur: 4, text: 'Give the magnitude and direction of î + ĵ and î − ĵ, and the components of A along them.' },
  ];
  const stages = [
    { title: 'î + ĵ and î − ĵ', dur: 5, text: 'Each is the diagonal of a unit square.', ans: '|î + ĵ| = |î − ĵ| = √2; î + ĵ at 45° above +x, î − ĵ at 45° below +x.' },
    { title: 'Along î + ĵ', dur: 5, text: 'Component = A · (unit vector along î + ĵ) = A · (î + ĵ)/√2.', ans: '(2 + 3)/√2 = 5/√2 ≈ 3.54.' },
    { title: 'Along î − ĵ', dur: 5, text: 'Component = A · (î − ĵ)/√2.', ans: '(2 − 3)/√2 = −1/√2 ≈ −0.71 (it points opposite to î − ĵ).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let i = -2; i <= 4; i++) { vline(ctx, X(i), Y(4.4), Y(-2.4), P.grid, 1); hline(ctx, X(-2.4), X(4.4), Y(i), P.grid, 1); }
    arrow(ctx, X(-2.4), OY, X(4.5), OY, P.ink2, { lw: 1.5, head: 8 }); arrow(ctx, OX, Y(-2.4), OX, Y(4.5), P.ink2, { lw: 1.5, head: 8 });
    vec(ctx, OX, OY, K, 0, 'î', P.ink, { side: 1, at: 0.5, size: 15 }); vec(ctx, OX, OY, 0, -K, 'ĵ', P.ink, { side: 1, at: 0.5, size: 15 });
    vec(ctx, OX, OY, 2 * K, -3 * K, 'A = 2î + 3ĵ', P.force, { side: -1, at: 1, align: 'left', ax: 6, size: 14 });
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['The magnitude and direction of î + ĵ and of î − ĵ.', 'The components of A = 2î + 3ĵ along î + ĵ and along î − ĵ.']); note(ctx, 'grid of unit squares; 70 px per unit'); return; }
    const st = stageAt(stages, t);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([2, 5]); seg(ctx, X(-2.3), Y(-2.3), X(4.3), Y(4.3)); seg(ctx, X(-2.3), Y(2.3), X(2.3), Y(-2.3)); ctx.restore();
    vec(ctx, OX, OY, K, -K, 'î + ĵ', P.vel, { side: 1, at: 0.6, size: 14 }); vec(ctx, OX, OY, K, K, 'î − ĵ', P.acc, { side: -1, at: 0.6, size: 14 });
    if (st === 0) { label(ctx, '√2 at +45°', X(1) + 8, Y(1) - 18, { weight: 700, size: 13, color: P.vel }); label(ctx, '√2 at −45°', X(1) + 8, Y(-1) + 18, { weight: 700, size: 13, color: P.acc }); }
    if (st >= 1) { ctx.save(); ctx.strokeStyle = P.force; ctx.setLineDash([4, 4]); seg(ctx, X(2), Y(3), X(2.5), Y(2.5)); ctx.restore(); vec(ctx, OX, OY, 2.5 * K, -2.5 * K, '', P.accent, { lw: 5 }); label(ctx, '5/√2 ≈ 3.54', X(2.5) + 12, Y(2.5) + 10, { weight: 800, size: 14, color: P.accent }); }
    if (st >= 2) { ctx.save(); ctx.strokeStyle = P.force; ctx.setLineDash([4, 4]); seg(ctx, X(2), Y(3), X(-0.5), Y(0.5)); ctx.restore(); vec(ctx, OX, OY, -0.5 * K, -0.5 * K, '', P.accent, { lw: 5, head: 10 }); label(ctx, '−1/√2 ≈ −0.71', X(-0.5) - 8, Y(0.5) - 14, { align: 'right', weight: 800, size: 14, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Answers', ['|î ± ĵ| = √2, at ±45° to the x-axis', 'Along î + ĵ: 5/√2 ≈ 3.54', 'Along î − ĵ: −1/√2 ≈ −0.71'], st, false);
    note(ctx, 'grid of unit squares; 70 px per unit');
  }
  return { qStages, stages, draw };
})();

//@@ q22
const SCENE = (() => {
  const H = 3400, K = 0.09, OX = 300, GY = 470, PY = GY - H * K, HALF = H * Math.tan(15 * Math.PI / 180), V = 2 * HALF / 10, X1 = OX - HALF * K, X2 = OX + HALF * K;
  const T0 = 2, xAt = s => X1 + V * K * (s - T0);                 // s: seconds; passes X1 at T0 and X2 at T0 + 10
  const qStages = [
    { title: 'Flying level', dur: 15, text: 'An aircraft flies level at 3400 m. Two of its positions, 10.0 s apart, subtend 30° at an observation point on the ground.' },
    { title: 'What is asked', dur: 4, text: 'What is the speed of the aircraft?' },
  ];
  const stages = [
    { title: '30° in 10 s', dur: 15, text: 'As in the NCERT solution, take the two positions symmetric about the observer’s vertical: 15° on each side.', ans: 'Half the distance = 3400 × tan 15° ≈ 911 m.' },
    { title: 'Speed', dur: 5, text: 'Distance flown in 10.0 s = 2 × 911 m.', ans: 'Speed = 1822 m / 10.0 s ≈ 182 m/s.' },
  ];
  function plane(ctx, x, y, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = P.obj; ctx.beginPath(); ctx.moveTo(x + 18, y); ctx.lineTo(x - 14, y - 10); ctx.lineTo(x - 8, y); ctx.lineTo(x - 14, y + 10); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 30, 590, GY);
    person(ctx, OX, GY, 0.5); label(ctx, 'observer', OX + 14, GY + 16, { size: 12 });
    hline(ctx, 30, 590, PY, P.ink2, 1, [5, 5]);
    vdim(ctx, 80, PY, GY, P.ink2); label(ctx, '3400 m', 88, (PY + GY) / 2, { weight: 700, size: 13 });
    const s = Math.min(t, 14), x = xAt(s);
    if (s >= T0) { plane(ctx, X1, PY, 0.35); ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 1.5; seg(ctx, OX, GY - 30, X1, PY); ctx.restore(); }
    if (s >= T0 + 10) { plane(ctx, X2, PY, 0.35); ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 1.5; seg(ctx, OX, GY - 30, X2, PY); ctx.restore();
      ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(OX, GY - 30, 60, -Math.PI / 2 - Math.PI / 12, -Math.PI / 2 + Math.PI / 12); ctx.stroke(); ctx.restore(); label(ctx, '30°', OX, GY - 104, { align: 'center', weight: 700, size: 14 }); }
    plane(ctx, x, PY);
    if (s >= T0 && s <= T0 + 10) label(ctx, `${(s - T0).toFixed(1)} s`, x, PY - 22, { align: 'center', weight: 700, size: 13 });
    if (ans && t >= 12) {
      vline(ctx, OX, PY, GY - 30, P.ink2, 1, [3, 4]); label(ctx, '15°', OX + 10, GY - 120, { size: 13 });
      dim(ctx, X1, OX, PY - 40, P.accent); dim(ctx, OX, X2, PY - 40, P.accent); label(ctx, '911 m', (X1 + OX) / 2, PY - 56, { align: 'center', weight: 700, size: 13, color: P.accent }); label(ctx, '911 m', (OX + X2) / 2, PY - 56, { align: 'center', weight: 700, size: 13, color: P.accent });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['Half-distance = 3400 tan 15° ≈ 911 m', 'Speed = 2 × 911 / 10.0 ≈ 182 m/s'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The speed of the aircraft.']);
    note(ctx, 'positions taken symmetric about the observer (as in NCERT); 0.09 px per metre; real time');
  }
  return { qStages, stages, draw };
})();
