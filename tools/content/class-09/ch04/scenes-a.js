//@@ q01
const SCENE = (() => {
  const H = 100, SH = 500, Y = 260, D = 16;   // home at x = 100, shop at 500 (250 m: 1.6 px per m)
  const pos = s => { const leg = Math.min(3, Math.floor(s)), f = s - leg; return leg % 2 === 0 ? f : 1 - f; };   // 0 = home, 1 = shop; s in legs (0..4)
  const qStages = [
    { title: 'To the shop and back', dur: D, text: 'Home → shop (250 m) → home (forgot the bag) → shop → home.' },
    { title: 'What is asked', dur: 4, text: 'The total distance travelled, and the displacement from home.' },
  ];
  const stages = [
    { title: 'Four trips of 250 m', dur: D, text: 'Distance adds up every metre walked, whatever the direction.', ans: 'Distance = 4 × 250 = 1000 m.' },
    { title: 'Displacement', dur: 4, text: 'Displacement is the change of position: he ends where he started.', ans: 'Displacement = 0.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(60, Y + 10, 480, 16);
    block(ctx, H - 40, Y - 70, 60, 70, 'home', P.objFill2); block(ctx, SH, Y - 70, 70, 70, 'shop', P.objFill2);
    dim(ctx, H, SH, Y + 50, P.ink2); label(ctx, '250 m', (H + SH) / 2, Y + 66, { align: 'center', weight: 700, size: 13 });
    const s = Math.min(4, 4 * clamp(t / (D - 1))), x = H + (SH - H) * pos(s);
    person(ctx, x, Y + 10, 0.8, P.vel);
    if (ans) {
      const st = stageAt(stages, t);
      label(ctx, `distance: ${Math.round(250 * s)} m`, 60, 400, { weight: 800, size: 18, color: P.force });
      label(ctx, `displacement: ${Math.round(250 * pos(s))} m`, 60, 436, { weight: 800, size: 18, color: P.accent });
      if (pos(s) > 0.01) vec(ctx, H, Y - 100, (SH - H) * pos(s), 0, '', P.accent, { lw: 3 });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['Distance = 1000 m', 'Displacement = 0'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The total distance travelled.', 'His displacement from home.']);
    note(ctx, 'road to scale (1.6 px per m); time sped up');
  }
  return { qStages, stages, draw };
})();

//@@ q02
const SCENE = (() => {
  const X = 200, Y0 = 470, FH = 80, D = 12;   // 3 m floor = 80 px
  const qStages = [
    { title: 'Up and down the stairs', dur: D, text: 'Ground floor → fourth floor (to collect a book) → second floor. Each floor is 3 m high.' },
    { title: 'What is asked', dur: 4, text: '(i) The total vertical distance. (ii) The displacement.' },
  ];
  const stages = [
    { title: 'Up 4 floors, down 2', dur: D, text: 'Up 4 × 3 = 12 m, then down 2 × 3 = 6 m.', ans: '(i) Distance = 12 + 6 = 18 m.' },
    { title: 'Displacement', dur: 4, text: 'From the ground floor to the second floor.', ans: '(ii) 2 × 3 = 6 m, vertically upward.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let f = 0; f <= 4; f++) { hline(ctx, 120, 420, Y0 - f * FH, P.ink, 2); label(ctx, f === 0 ? 'ground' : `floor ${f}`, 430, Y0 - f * FH - 8, { weight: 700, size: 12 }); }
    vdim(ctx, 100, Y0 - FH, Y0, P.ink2); label(ctx, '3 m', 92, Y0 - FH / 2, { align: 'right', weight: 700, size: 12 });
    const u = clamp(t / (D - 1)), fl = u < 2 / 3 ? 4 * (u * 1.5) : 4 - 2 * ((u - 2 / 3) * 3);   // floor level (continuous)
    person(ctx, X + 60 * (fl % 1), Y0 - fl * FH, 0.7, P.vel);
    if (ans) {
      const st = stageAt(stages, t), dist = u < 2 / 3 ? 3 * fl : 12 + 3 * (4 - fl);
      label(ctx, `distance: ${dist.toFixed(1)} m`, 470, 120, { weight: 800, size: 15, color: P.force });
      label(ctx, `displacement: ${(3 * fl).toFixed(1)} m up`, 470, 150, { weight: 800, size: 15, color: P.accent });
      if (fl > 0.05) vec(ctx, 160, Y0, 0, -fl * FH, '', P.accent, { lw: 3 });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(i) 18 m', '(ii) 6 m upward'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(i) The total vertical distance travelled.', '(ii) The displacement from the starting point.']);
    note(ctx, 'floors to scale; time sped up');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const X0 = 40, Y = 140, S = 5, A = 4, T = 6;   // 5 px per m
  const G = { x: 70, y: 260, w: 460, h: 200, x0: 0, x1: 7, y0: 0, y1: 28, xt: [2, 4, 6], yt: [12, 24], xl: 't (s)', yl: 'v (m/s)' };
  function car(ctx, x, y) { block(ctx, x - 40, y - 26, 40, 22, '', P.force); ball(ctx, x - 32, y - 2, 5, P.ink); ball(ctx, x - 8, y - 2, 5, P.ink); }
  const qStages = [
    { title: 'A car from rest', dur: T + 1, text: 'A car starts from rest and reaches 24 m/s in 6 s.' },
    { title: 'What is asked', dur: 4, text: 'The average acceleration, and the distance travelled in the 6 s.' },
  ];
  const stages = [
    { title: 'Acceleration', dur: T + 1, text: 'a = (v − u)/t: the slope of the v–t graph.', ans: 'a = 24/6 = 4 m/s².' },
    { title: 'Distance', dur: 5, text: 'Area under the v–t graph (uniform acceleration).', ans: 's = ½ × 6 × 24 = 72 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(20, Y, 580, 10);
    const tt = Math.min(T, t), s = 0.5 * A * tt * tt; car(ctx, X0 + 40 + S * s, Y);
    label(ctx, `t = ${tt.toFixed(1)} s   v = ${(A * tt).toFixed(1)} m/s`, 40, 80, { weight: 800, size: 14 });
    if (ans) {
      const st = stageAt(stages, t), g = axes(ctx, G); plot(ctx, g, x => A * x, 0, tt, P.vel);
      label(ctx, `s = ${s.toFixed(0)} m`, 400, 80, { weight: 800, size: 14, color: P.accent });
      if (st >= 1) { ctx.save(); ctx.fillStyle = P.accentSoft; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.moveTo(g.X(0), g.Y(0)); ctx.lineTo(g.X(6), g.Y(24)); ctx.lineTo(g.X(6), g.Y(0)); ctx.closePath(); ctx.fill(); ctx.restore(); label(ctx, 'area = 72 m', g.X(4.5), g.Y(6), { align: 'center', weight: 800, size: 14, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['a = 4 m/s²', 's = 72 m'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The average acceleration.', 'The distance travelled in the 6 s.']);
    note(ctx, 'road 5 px per m; real time; uniform acceleration assumed');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const X0 = 80, Y = 200, S = 4.5, U = 28, A = 4, T = 7;   // 4.5 px per m
  function bike(ctx, x, y) { ball(ctx, x - 30, y - 8, 8, P.ink); ball(ctx, x, y - 8, 8, P.ink); ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 5; seg(ctx, x - 30, y - 10, x - 12, y - 26); seg(ctx, x - 12, y - 26, x, y - 10); ctx.restore(); }
  const qStages = [
    { title: 'A motorbike brakes', dur: T + 1, text: 'A motorbike at 28 m/s slows with constant acceleration and stops after 98 m.' },
    { title: 'What is asked', dur: 4, text: 'Its acceleration, and the time it takes to stop.' },
  ];
  const stages = [
    { title: 'Acceleration', dur: T + 1, text: 'v² = u² + 2as with v = 0.', ans: '0 = 28² + 2a × 98: a = −4 m/s².' },
    { title: 'Time', dur: 4, text: 'v = u + at.', ans: 't = 28/4 = 7 s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(20, Y, 580, 10);
    const tt = Math.min(T, t), s = U * tt - 0.5 * A * tt * tt; bike(ctx, X0 + S * s, Y);
    dim(ctx, X0, X0 + S * 98, Y + 40, P.ink2); label(ctx, '98 m', X0 + S * 49, Y + 56, { align: 'center', weight: 700, size: 13 });
    label(ctx, `v = ${(U - A * tt).toFixed(1)} m/s`, 40, 90, { weight: 800, size: 15 });
    if (ans) {
      const st = stageAt(stages, t);
      label(ctx, 'a = −4 m/s²', 40, 330, { weight: 800, size: 18, color: P.accent });
      if (st >= 1 || tt >= T) clock(ctx, 60, 380, tt);
      if (st >= 1) label(ctx, 't = 7 s', 40, 430, { weight: 800, size: 18, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['a = −4 m/s²', 't = 7 s'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The acceleration of the motorbike.', 'The time taken to stop.']);
    note(ctx, 'road 4.5 px per m; real time');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const G = { x: 70, y: 240, w: 300, h: 230, x0: 0, x1: 6.5, y0: 0, y1: 10, xt: [5], yt: [], xl: 't (s)', yl: 'position' }, D = 8;
  const xA = t => 1.2 * t, xB = t => 3 + 0.6 * t;   // shapes following Fig. 4.27 (they cross at 5 s)
  const qStages = [
    { title: 'Fig. 4.27', dur: D, text: 'Position–time graphs of A and B, moving along parallel tracks in the same direction. B starts ahead.' },
    { title: 'What is asked', dur: 4, text: 'Do A and B ever have equal velocity? Justify.' },
  ];
  const stages = [
    { title: 'Velocity = slope', dur: D, text: 'Both lines are straight: each velocity is constant. A’s line is steeper.', ans: 'A is always faster than B.' },
    { title: 'At 5 s', dur: 5, text: 'The lines cross at 5 s: A and B are at the same place, A overtaking.', ans: 'No — they never have equal velocity; at 5 s only their positions are equal.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const tt = 6.5 * clamp(t / (D - 1)), g = axes(ctx, G);
    plot(ctx, g, xA, 0, tt, P.vel); plot(ctx, g, xB, 0, tt, P.force);
    label(ctx, 'A', g.X(tt) + 8, g.Y(xA(tt)), { weight: 800, size: 14, color: P.vel }); label(ctx, 'B', g.X(tt) + 8, g.Y(xB(tt)) + 10, { weight: 800, size: 14, color: P.force });
    const TX = 70, s = 40;
    hline(ctx, TX, 590, 90, P.ink2, 1); hline(ctx, TX, 590, 140, P.ink2, 1);
    ball(ctx, TX + s * xA(tt), 90, 9, P.vel); ball(ctx, TX + s * xB(tt), 140, 9, P.force); label(ctx, 'A', TX - 16, 90, { weight: 800, size: 13, color: P.vel }); label(ctx, 'B', TX - 16, 140, { weight: 800, size: 13, color: P.force });
    if (ans) {
      const st = stageAt(stages, t);
      if (st >= 1) { vline(ctx, g.X(5), g.Y(0), g.Y(xA(5)), P.ink2, 1.5, [4, 3]); ball(ctx, g.X(5), g.Y(xA(5)), 5, P.ink); label(ctx, 'same position, not same velocity', g.X(5) + 8, g.Y(xA(5)) - 30, { weight: 700, size: 12 }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Slopes constant; A’s steeper: A always faster', 'No; they only meet at 5 s'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Whether A and B ever have equal velocity, with a reason.']);
    note(ctx, 'lines follow Fig. 4.27 (its position values are not given)');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const G = { x: 70, y: 250, w: 460, h: 220, x0: 0, x1: 22, y0: 0, y1: 24, xt: [5, 15, 21], yt: [20], xl: 't (s)', yl: 'v (m/s)' }, T = 21, X0 = 40, S = 1.5;
  const v = t => t < 5 ? 4 * t : t < 15 ? 20 : Math.max(0, 20 - (20 / 6) * (t - 15));
  const x = t => t < 5 ? 2 * t * t : t < 15 ? 50 + 20 * (t - 5) : 250 + 20 * (t - 15) - (10 / 6) * (t - 15) ** 2;
  function car(ctx, px, y) { block(ctx, px - 40, y - 26, 40, 22, '', P.force); ball(ctx, px - 32, y - 2, 5, P.ink); ball(ctx, px - 8, y - 2, 5, P.ink); }
  const qStages = [
    { title: 'Speed up, cruise, brake', dur: 6, text: 'From rest to 20 m/s in 5 s; then 20 m/s for 10 s; then braking uniformly to rest in 6 s.' },
    { title: 'What is asked', dur: 4, text: 'The total distance travelled.' },
  ];
  const stages = [
    { title: 'The journey', dur: T + 1, text: 'The v–t graph is a trapezium; distance = area under it.', ans: '' },
    { title: 'Add the areas', dur: 6, text: '½ × 5 × 20 + 10 × 20 + ½ × 6 × 20.', ans: '50 + 200 + 60 = 310 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(20, 150, 580, 10);
    if (!ans) { car(ctx, X0 + 40, 150); askedPanel(ctx, 630, 34, 300, ['The total distance travelled.']); note(ctx, 'graph to scale'); return; }
    const st = stageAt(stages, t), tt = Math.min(T, t), g = axes(ctx, G);
    car(ctx, X0 + 40 + S * x(tt), 150); label(ctx, `t = ${tt.toFixed(1)} s   distance = ${x(tt).toFixed(0)} m`, 40, 90, { weight: 800, size: 14 });
    plot(ctx, g, v, 0, tt, P.vel);
    if (st >= 1) { [[[0, 0], [5, 20], [5, 0]], [[5, 0], [5, 20], [15, 20], [15, 0]], [[15, 0], [15, 20], [21, 0]]].forEach((poly_, i) => { ctx.save(); ctx.fillStyle = [P.accentSoft, P.ke, P.pe][i]; ctx.globalAlpha = 0.45; ctx.beginPath(); poly_.forEach(([a, b], j) => j ? ctx.lineTo(g.X(a), g.Y(b)) : ctx.moveTo(g.X(a), g.Y(b))); ctx.closePath(); ctx.fill(); ctx.restore(); });
      label(ctx, '50 m', g.X(3.3), g.Y(5), { align: 'center', weight: 800, size: 13 }); label(ctx, '200 m', g.X(10), g.Y(10), { align: 'center', weight: 800, size: 14 }); label(ctx, '60 m', g.X(17), g.Y(5), { align: 'center', weight: 800, size: 13 });
      label(ctx, 'total 310 m', 470, 90, { weight: 800, size: 16, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Working', ['Distance = area under the v–t graph', '50 + 200 + 60 = 310 m'], st, false);
    note(ctx, 'graph to scale; car 1.5 px per m, real time');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const X0 = 90, Y = 250, S = 14, V = 10, TR = 0.5, A = 2.5, T = 4.5;   // 14 px per m
  const x = t => t < TR ? V * t : V * TR + V * (t - TR) - 0.5 * A * (t - TR) ** 2;
  function bus(ctx, px, y) { block(ctx, px - 70, y - 40, 70, 36, 'bus', P.ke); ball(ctx, px - 56, y - 4, 7, P.ink); ball(ctx, px - 14, y - 4, 7, P.ink); }
  const qStages = [
    { title: 'An obstacle ahead', dur: 5, text: 'A bus at 36 km/h (10 m/s) sees an obstacle 30 m ahead. Reaction time 0.5 s; then it brakes at 2.5 m/s².' },
    { title: 'What is asked', dur: 4, text: 'Will it stop before reaching the obstacle?' },
  ];
  const stages = [
    { title: 'Reaction', dur: 3, text: 'For 0.5 s the bus keeps going at 10 m/s.', ans: '5 m.' },
    { title: 'Braking', dur: 6, text: 'Braking distance v²/2a = 100/5.', ans: '20 m (in 4 s). Total 25 m < 30 m: yes, it stops 5 m short.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(20, Y, 580, 12);
    const OX = X0 + S * 30; block(ctx, OX, Y - 50, 22, 50, '', P.loss); label(ctx, 'obstacle', OX + 11, Y - 62, { align: 'center', weight: 700, size: 12 });
    dim(ctx, X0, OX, Y + 50, P.ink2); label(ctx, '30 m', (X0 + OX) / 2, Y + 66, { align: 'center', weight: 700, size: 13 });
    const tt = ans ? Math.min(T, t * 0.8) : 0, s = x(tt); bus(ctx, X0 + S * s, Y);
    if (ans) {
      const st = stageAt(stages, t), v = tt < TR ? V : Math.max(0, V - A * (tt - TR));
      label(ctx, `t = ${tt.toFixed(1)} s   v = ${v.toFixed(1)} m/s   s = ${s.toFixed(1)} m`, 40, 100, { weight: 800, size: 14 });
      ctx.save(); ctx.fillStyle = P.ke; ctx.globalAlpha = 0.4; ctx.fillRect(X0, Y + 14, S * Math.min(s, 5), 8); ctx.fillStyle = P.force; ctx.fillRect(X0 + S * 5, Y + 14, S * Math.max(0, s - 5), 8); ctx.restore();
      label(ctx, 'reaction 5 m', X0 + S * 2.5, Y + 100, { align: 'center', size: 12 }); if (s > 5) label(ctx, 'braking 20 m', X0 + S * 15, Y + 100, { align: 'center', size: 12 });
      if (tt >= T) label(ctx, 'stops 5 m short', OX - 30, Y - 100, { align: 'center', weight: 800, size: 15, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['Reaction: 10 × 0.5 = 5 m', 'Braking: 100/(2 × 2.5) = 20 m; 25 m < 30 m: stops'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Whether the bus can stop before the obstacle.']);
    note(ctx, 'road 14 px per m; time slowed slightly (×0.8)');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const G = { x: 70, y: 90, w: 470, h: 360, x0: 0, x1: 130, y0: 0, y1: 4, xt: [20, 60, 100, 120], yt: [2, 3], xl: 't (s)', yl: 'v (m/s)' };
  const v = t => t < 20 ? 3 * t / 20 : t < 100 ? 3 : 3 - (t - 100) / 20;
  const qStages = [
    { title: 'Fig. 4.30', dur: 6, text: 'A cyclist: 0 to 3 m/s in 20 s, 3 m/s until 100 s, then down to 2 m/s at 120 s.' },
    { title: 'What is asked', dur: 5, text: 'Shade the displacement (i) at constant velocity, (ii) while slowing. Find the displacement and average acceleration over 120 s.' },
  ];
  const stages = [
    { title: '(i) Constant velocity', dur: 5, text: '20 s to 100 s at 3 m/s.', ans: 'Area = 80 × 3 = 240 m.' },
    { title: '(ii) Slowing down', dur: 5, text: '100 s to 120 s, from 3 to 2 m/s.', ans: 'Area = ½(3 + 2) × 20 = 50 m.' },
    { title: 'Totals', dur: 6, text: 'Add the first 20 s (½ × 20 × 3 = 30 m). Average acceleration = change in velocity/time.', ans: 'Displacement = 320 m; a = 2/120 ≈ 0.017 m/s².' },
  ];
  function fill(ctx, g, pts, col) { ctx.save(); ctx.fillStyle = col; ctx.globalAlpha = 0.5; ctx.beginPath(); pts.forEach(([a, b], i) => i ? ctx.lineTo(g.X(a), g.Y(b)) : ctx.moveTo(g.X(a), g.Y(b))); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, G);
    if (ans) { const st = stageAt(stages, t);
      if (st >= 0) { fill(ctx, g, [[20, 0], [20, 3], [100, 3], [100, 0]], P.accentSoft); label(ctx, '(i) 240 m', g.X(60), g.Y(1.5), { align: 'center', weight: 800, size: 15, color: P.accent }); }
      if (st >= 1) { fill(ctx, g, [[100, 0], [100, 3], [120, 2], [120, 0]], P.ke); label(ctx, '(ii) 50 m', g.X(110), g.Y(1), { align: 'center', weight: 800, size: 13 }); }
      if (st >= 2) { fill(ctx, g, [[0, 0], [20, 3], [20, 0]], P.grid); label(ctx, '30 m', g.X(13), g.Y(0.6), { align: 'center', weight: 700, size: 12 }); label(ctx, 'displacement 320 m;  a(avg) = 2/120 ≈ 0.017 m/s²', 300, 490, { align: 'center', weight: 800, size: 15, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(i) 240 m', '(ii) 50 m', '320 m; ≈ 0.017 m/s²'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Shade the displacement (i) at constant velocity, (ii) while the velocity decreases.', 'The displacement and average acceleration over 120 s.']);
    plot(ctx, g, v, 0, 120, P.vel);
    note(ctx, 'graph drawn from the points of Fig. 4.30');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const PTS = [[0, 7.0], [0.6, 7.0], [1.6, 7.5], [3.0, 7.5], [4.6, 7.0], [5.6, 6.5], [6.6, 6.5]];
  const G = { x: 70, y: 90, w: 470, h: 360, x0: 0, x1: 7, y0: 0, y1: 8.5, xt: [2, 4, 6], yt: [2.5, 5, 7.5], xl: 't (h)', yl: 'v (km/h)' }, D = 10;
  const qStages = [
    { title: 'Fig. 4.31', dur: 6, text: 'A runner’s velocity (km/h) against time (h), from her smartwatch.' },
    { title: 'What is asked', dur: 4, text: 'Estimate the distance she ran.' },
  ];
  const stages = [
    { title: 'Area under the graph', dur: D, text: 'km/h × h = km. Split the area into strips and add.', ans: '4.2 + 7.25 + 10.5 + 11.6 + 6.75 + 6.5 ≈ 46.8 km.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, G);
    if (ans) { const n = Math.min(6, Math.floor(clamp(t / (D - 2)) * 6.999)); let tot = 0;
      for (let i = 0; i <= n && i < 6; i++) { const [a, va] = PTS[i], [b, vb] = PTS[i + 1], ar = (va + vb) / 2 * (b - a); tot += ar; ctx.save(); ctx.fillStyle = i % 2 ? P.accentSoft : P.ke; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.moveTo(g.X(a), g.Y(0)); ctx.lineTo(g.X(a), g.Y(va)); ctx.lineTo(g.X(b), g.Y(vb)); ctx.lineTo(g.X(b), g.Y(0)); ctx.closePath(); ctx.fill(); ctx.restore(); label(ctx, ar.toFixed(2), g.X((a + b) / 2), g.Y(2 + (i % 2) * 1.2), { align: 'center', weight: 700, size: 11 }); }
      label(ctx, `distance ≈ ${tot.toFixed(1)} km`, 300, 490, { align: 'center', weight: 800, size: 17, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Area under v–t: about 47 km'], 0, false);
    } else askedPanel(ctx, 630, 34, 300, ['An estimate of the distance she ran.']);
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 3; ctx.beginPath(); PTS.forEach(([a, b], i) => i ? ctx.lineTo(g.X(a), g.Y(b)) : ctx.moveTo(g.X(a), g.Y(b))); ctx.stroke(); ctx.restore(); PTS.forEach(([a, b]) => ball(ctx, g.X(a), g.Y(b), 4, P.ink));
    note(ctx, 'points read from Fig. 4.31 (to about ±0.1 h); strip areas in km');
  }
  return { qStages, stages, draw };
})();

//@@ q16
const SCENE = (() => {
  const CX = 220, CY = 270, R = 98, D = 9;   // 7 cm = 98 px (14 px per cm)
  const qStages = [
    { title: 'A wall clock', dur: 5, text: 'Rohan studies from 6:00 PM to 7:30 PM. The minute hand is 7 cm long.' },
    { title: 'What is asked', dur: 5, text: 'For the tip of the minute hand: (i) distance, (ii) displacement, (iii) speed, (iv) velocity.' },
  ];
  const stages = [
    { title: '1½ turns', dur: D, text: 'In 90 minutes the minute hand turns 1½ times: its tip goes from the 12, all the way round, and on to the 6.', ans: '(i) Distance = 1.5 × 2π × 7 ≈ 66 cm.' },
    { title: 'Displacement', dur: 4, text: 'From the 12 to the 6: a diameter.', ans: '(ii) 14 cm, vertically downward.' },
    { title: 'Speed and velocity', dur: 6, text: 'Divide by 90 min = 5400 s.', ans: '(iii) 66/5400 ≈ 0.012 cm/s; (iv) 14/5400 ≈ 0.0026 cm/s, downward.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(CX, CY, R + 24, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    for (let h = 1; h <= 12; h++) { const a = h / 12 * 2 * Math.PI - Math.PI / 2; label(ctx, String(h), CX + (R + 6) * Math.cos(a), CY + (R + 6) * Math.sin(a), { align: 'center', weight: 700, size: 13 }); }
    const f = ans ? clamp(t / (D - 1)) : 0, turns = 1.5 * f, a = turns * 2 * Math.PI - Math.PI / 2, hr = (6 + 1.5 * f) / 12 * 2 * Math.PI - Math.PI / 2;
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 6; seg(ctx, CX, CY, CX + 0.55 * R * Math.cos(hr), CY + 0.55 * R * Math.sin(hr)); ctx.lineWidth = 3; seg(ctx, CX, CY, CX + R * 0.92 * Math.cos(a), CY + R * 0.92 * Math.sin(a)); ctx.restore(); ball(ctx, CX, CY, 5, P.ink);
    label(ctx, `${Math.floor(6 + 1.5 * f)}:${String(Math.round((90 * f) % 60)).padStart(2, '0')} PM`, CX, CY + R + 52, { align: 'center', weight: 800, size: 15 });
    if (ans) {
      const st = stageAt(stages, t), tip = [CX + R * 0.92 * Math.cos(a), CY + R * 0.92 * Math.sin(a)];
      ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(CX, CY, R * 0.92, -Math.PI / 2, a); ctx.stroke(); ctx.restore(); ball(ctx, ...tip, 5, P.accent);
      label(ctx, `distance ${(turns * 2 * Math.PI * 7).toFixed(0)} cm`, 400, 120, { weight: 800, size: 15, color: P.accent });
      if (st >= 1) { vec(ctx, CX, CY - R * 0.92, 0, 2 * R * 0.92, '14 cm', P.force, { side: -1, at: 0.25, lw: 3, align: 'left', off: 10 }); label(ctx, 'displacement 14 cm, down', 400, 150, { weight: 800, size: 15, color: P.force }); }
      if (st >= 2) { label(ctx, 'speed ≈ 0.012 cm/s', 400, 190, { weight: 700, size: 14 }); label(ctx, 'velocity ≈ 0.0026 cm/s, down', 400, 214, { weight: 700, size: 14 }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(i) ≈ 66 cm', '(ii) 14 cm downward', '(iii) ≈ 0.012 cm/s; (iv) ≈ 0.0026 cm/s down'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['For the tip of the minute hand: (i) distance, (ii) displacement, (iii) speed, (iv) velocity, from 6:00 to 7:30 PM.']);
    note(ctx, 'clock to scale (14 px per cm); time sped up');
  }
  return { qStages, stages, draw };
})();
