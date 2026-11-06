//@@ q02
const SCENE = (() => {
  const T = 10, TB = 4, PA = 2, QB = 3, D = 10, TC = (QB * TB / (T - TB)) / (QB / (T - TB) - PA / T);   // graphs cross once at TC
  const xa = t => PA * clamp(t / T), xb = t => t < TB ? 0 : QB * clamp((t - TB) / (T - TB));
  const PARTS = ['(a) (A/B) lives closer to the school than (B/A)', '(b) (A/B) starts from the school earlier than (B/A)', '(c) (A/B) walks faster than (B/A)', '(d) A and B reach home at the (same/different) time', '(e) (A/B) overtakes (B/A) on the road (once/twice)'];
  const ANS = ['A lives closer than B', 'A starts earlier than B', 'B walks faster than A', 'the same time', 'B overtakes A, once'];
  const qStages = [
    { title: 'Fig. 2.9', dur: D + 1, text: 'The x–t graphs of two children, A and B, walking from their school O to their homes P and Q.' },
    { title: 'Choose the entries', dur: 5, text: 'Choose the correct entries in the brackets, (a) to (e).' },
  ];
  const stages = [
    { title: 'Following the graphs', dur: D + 1, text: 'A graph shows where a child is at every instant. Watch the two children on the road below.', ans: 'A sets off at t = 0; B sets off later but covers ground faster.' },
    { title: '(a) and (b)', dur: 4, text: 'Compare where the graphs end and where they begin.', ans: '(a) A lives closer (P is below Q). (b) A starts earlier.' },
    { title: '(c) and (d)', dur: 4, text: 'Speed is the slope of an x–t graph.', ans: '(c) B walks faster (steeper line). (d) They reach home at the same time.' },
    { title: '(e) Overtaking', dur: 4, text: 'Where the graphs cross, both children are at the same place at the same time.', ans: '(e) B overtakes A, once.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 80, y: 60, w: 440, h: 230, x0: 0, x1: 11, y0: 0, y1: 3.4, xl: 't', yl: 'x' });
    label(ctx, 'O', g.X(0) - 10, g.Y(0) + 12, { align: 'right', weight: 700, size: 14 });
    for (const [v, n] of [[PA, 'P'], [QB, 'Q']]) { hline(ctx, g.X(0) - 6, g.X(0), g.Y(v), P.ink2, 1.5); label(ctx, n, g.X(0) - 12, g.Y(v), { align: 'right', weight: 700, size: 14 }); }
    const tm = clamp(t / D) * T;
    ctx.save(); ctx.globalAlpha = 0.25; plot(ctx, g, xa, 0, T, P.vel); plot(ctx, g, xb, TB, T, P.force); ctx.restore();
    plot(ctx, g, xa, 0, tm, P.vel); if (tm > TB) plot(ctx, g, xb, TB, tm, P.force);
    label(ctx, 'A', g.X(T) + 8, g.Y(PA), { weight: 700, size: 15, color: P.vel }); label(ctx, 'B', g.X(T) + 8, g.Y(QB), { weight: 700, size: 15, color: P.force });
    // the road
    const RY = 420, rx = x => 80 + x / 3.4 * 440;
    hline(ctx, rx(0), rx(3.4), RY, P.ink, 2);
    for (const [v, n] of [[0, 'O (school)'], [PA, 'P'], [QB, 'Q']]) { vline(ctx, rx(v), RY - 6, RY + 6, P.ink, 2); label(ctx, n, rx(v), RY + 22, { align: 'center', weight: 700, size: 13 }); }
    ball(ctx, rx(xa(tm)), RY - 16, 9, P.vel); label(ctx, 'A', rx(xa(tm)), RY - 36, { align: 'center', weight: 700, size: 13, color: P.vel });
    ball(ctx, rx(xb(tm)), RY - 46, 9, P.force); label(ctx, 'B', rx(xb(tm)), RY - 66, { align: 'center', weight: 700, size: 13, color: P.force });
    const k = ans ? [-1, 1, 3, 4][stageAt(stages, t)] : -1;
    if (ans && k >= 4) { ball(ctx, g.X(TC), g.Y(xa(TC)), 6, P.accent); label(ctx, 'B overtakes A', g.X(TC) + 10, g.Y(xa(TC)) + 16, { weight: 700, size: 13, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Choose the correct entries', PARTS, k, ans, ANS);
    note(ctx, 'no values given: drawn to match Fig. 2.9 (both reach home together, as in the NCERT answer)');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const xh = h => h < 0 ? 0 : h < 0.5 ? 5 * h : h < 8 ? 2.5 : h < 8.1 ? 2.5 - 25 * (h - 8) : 0;   // h = hours after 9.00 am
  const hOf = t => t < 5 ? 0.5 * t / 5 : t < 8 ? 0.5 + 7.5 * (t - 5) / 3 : t < 11 ? 8 + 0.1 * (t - 8) / 3 : 8.1;
  const qStages = [
    { title: 'Walking to the office', dur: 5, text: 'She leaves home at 9.00 am and walks 2.5 km to her office at 5 km/h.' },
    { title: 'At the office', dur: 3, text: 'She stays at the office until 5.00 pm.' },
    { title: 'Home by auto', dur: 5, text: 'She returns home by auto at 25 km/h. Choose scales and plot her x–t graph.' },
  ];
  const stages = [
    { title: 'The walk', dur: 5, text: 'Time to walk = distance / speed = 2.5 km / 5 km/h = 0.5 h.', ans: 'At the office at 9.30 am: a straight line from (9.00 am, 0) to (9.30 am, 2.5 km).' },
    { title: 'At the office', dur: 3, text: 'Her position does not change while she is at the office.', ans: 'A horizontal line at x = 2.5 km from 9.30 am to 5.00 pm.' },
    { title: 'The ride home', dur: 5, text: 'Time by auto = 2.5 km / 25 km/h = 0.1 h = 6 min.', ans: 'A steep line down to x = 0 at 5.06 pm.' },
  ];
  const fmt = h => { let m = Math.round((9 + h) * 60), hh = Math.floor(m / 60), mm = m % 60; const pm = hh >= 12; if (hh > 12) hh -= 12; return `${hh}.${String(mm).padStart(2, '0')} ${pm ? 'pm' : 'am'}`; };
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const h = hOf(t), x = xh(h), RY = 440, rx = v => 90 + v / 2.5 * 420;
    hline(ctx, rx(0) - 30, rx(2.5) + 40, RY, P.ink, 2);
    block(ctx, rx(0) - 26, RY - 40, 40, 40, 'home', P.objFill); block(ctx, rx(2.5) - 10, RY - 60, 56, 60, 'office', P.objFill);
    dim(ctx, rx(0), rx(2.5), RY + 26, P.ink2); label(ctx, '2.5 km', (rx(0) + rx(2.5)) / 2, RY + 42, { align: 'center', weight: 700, size: 13 });
    if (h < 0.5) { person(ctx, rx(x), RY, 0.6); vec(ctx, rx(x) + 12, RY - 64, 40, 0, '5 km/h', P.vel, { side: -1, at: 0.5, size: 12 }); }
    else if (h < 8) label(ctx, t < 5.3 ? 'at the office' : 'at the office until 5.00 pm', rx(2.5) + 18, RY - 80, { align: 'center', weight: 700, size: 13 });
    else if (h < 8.1) { block(ctx, rx(x) - 24, RY - 26, 48, 22, 'auto', P.ke); vec(ctx, rx(x) - 20, RY - 44, -40, 0, '25 km/h', P.vel, { side: 1, at: 0.5, size: 12 }); }
    else person(ctx, rx(0) + 30, RY, 0.6);
    if (!ans) { if (t < 1.2) label(ctx, '9.00 am: leaves home', rx(0), RY - 84, { weight: 700, size: 14 }); askedPanel(ctx, 630, 34, 300, ['Choose suitable scales and plot the x–t graph of her motion.']); return; }
    const g = axes(ctx, { x: 80, y: 60, w: 460, h: 200, x0: 0, x1: 8.6, y0: 0, y1: 3, yt: [2.5], xl: 't', yl: 'x (km)' });
    for (const [v, s] of [[0, '9 am'], [0.5, '9.30'], [4, '1 pm'], [8, '5 pm']]) { vline(ctx, g.X(v), g.Y(0), g.Y(0) + 5, P.ink2, 1.2); label(ctx, s, g.X(v), g.Y(0) + 16, { align: 'center', size: 12, color: P.ink2 }); }
    plot(ctx, g, xh, 0, h, P.vel, 3, 600);
    if (h >= 8.1) { ball(ctx, g.X(8.1), g.Y(0), 5, P.accent); label(ctx, '5.06 pm', g.X(8.1) + 4, g.Y(0) - 14, { align: 'right', weight: 700, size: 13, color: P.accent }); }
    if (h >= 0.5) { ball(ctx, g.X(0.5), g.Y(2.5), 5, P.accent); label(ctx, '9.30 am', g.X(0.5) + 8, g.Y(2.5) - 14, { weight: 700, size: 13, color: P.accent }); }
    clock(ctx, 60, 300, h * 60, fmt(h));
    partsPanel(ctx, 630, 34, 300, 'Working', ['Walk: 2.5 / 5 = 0.5 h: office at 9.30 am', 'Flat at 2.5 km until 5.00 pm', 'Auto: 2.5 / 25 = 0.1 h = 6 min: home at 5.06 pm'], stageAt(stages, t), false);
    note(ctx, 'scale: 1 hour = 53 px, 1 km = 67 px; the stay at the office is shown speeded up');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const SP = 2, TT = 37;                                  // 2 steps per second; he reaches the pit at 37 s
  const xs = s => { s = Math.min(s, TT); const c = Math.floor(s / 8), r = s - 8 * c; return 2 * c + (r <= 5 ? r : 10 - r); };
  const qStages = [
    { title: 'Five forward, three back', dur: TT / SP + 1, text: 'A drunkard takes 5 steps forward and 3 back, again and again. Each step is 1 m long and takes 1 s. A pit lies 13 m from the start.' },
    { title: 'What is asked', dur: 4, text: 'Plot his x–t graph. How long does he take to fall in the pit?' },
  ];
  const stages = [
    { title: 'The x–t graph', dur: TT / SP + 1, text: 'Each 8 s cycle gains 5 − 3 = 2 m. The graph is a zig-zag that climbs 2 m every 8 s.', ans: 'After 4 cycles (32 s) he is at 8 m; 5 more forward steps take him to 13 m.' },
    { title: 'Reading the graph', dur: 5, text: 'Find where the graph first reaches x = 13 m.', ans: 'He falls in the pit at t = 32 + 5 = 37 s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const s = clamp(t * SP, 0, TT), x = xs(s), LY = 480, rx = m => 50 + m * 36;
    hline(ctx, rx(0), rx(13), LY, P.ink, 2);
    ctx.fillStyle = P.ink; ctx.fillRect(rx(13), LY, rx(14.2) - rx(13), 26); label(ctx, 'pit', rx(13.6), LY - 14, { align: 'center', weight: 700, size: 13 });
    for (let m = 0; m <= 13; m++) { vline(ctx, rx(m), LY, LY + 6, P.ink2, 1); if (m % 2 === 1 || m === 0) label(ctx, `${m}`, rx(m), LY + 16, { align: 'center', size: 11, color: P.ink2 }); }
    person(ctx, rx(x), s >= TT ? LY + 40 : LY, 0.55);
    const r = s % 8, fwd = r < 5 && s < TT;
    if (s < TT) vec(ctx, rx(x) + (fwd ? 10 : -10), LY - 56, fwd ? 26 : -26, 0, fwd ? 'forward' : 'back', fwd ? P.vel : P.force, { side: -1, at: 0.5, size: 12 });
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['Plot the x–t graph of his motion.', 'Find (graphically and otherwise) how long he takes to fall in the pit 13 m away.']); note(ctx, 'shown at 2 steps per second (twice real speed)'); return; }
    const g = axes(ctx, { x: 60, y: 60, w: 500, h: 300, x0: 0, x1: 40, y0: 0, y1: 14, xt: [8, 16, 24, 32, 37], yt: [2, 5, 8, 13], xl: 't (s)', yl: 'x (m)' });
    hline(ctx, g.X(0), g.X(40), g.Y(13), P.force, 1, [5, 4]); label(ctx, 'pit', g.X(1), g.Y(13) - 12, { size: 12, color: P.force });
    const pts = []; for (let k = 0; k <= Math.floor(s); k++) pts.push([g.X(k), g.Y(xs(k))]); pts.push([g.X(s), g.Y(x)]);
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 3; ctx.lineJoin = 'round'; poly(ctx, pts); ctx.restore();
    clock(ctx, 420, 400, s, `t = ${s.toFixed(0)} s, x = ${x.toFixed(0)} m`);
    if (s >= TT) { ball(ctx, g.X(TT), g.Y(13), 6, P.accent); label(ctx, '37 s', g.X(TT) - 8, g.Y(13) - 16, { align: 'right', weight: 800, size: 15, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Working', ['Each 8 s cycle: net 5 − 3 = 2 m forward', 'After 4 cycles (32 s): x = 8 m', 'Then 5 steps forward: 13 m at t = 37 s'], s < 32 ? 0 : s < TT ? 1 : 2, false);
    note(ctx, 'shown at 2 steps per second (twice real speed)');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const U = 35, S = 200, A = U * U / (2 * S), TS = U / A, K = 2.1, X0 = 140, RY = 230;   // a ≈ 3.06 m/s², TS ≈ 11.4 s
  const qStages = [
    { title: 'At 126 km/h', dur: 1, text: 'A car moves along a straight highway at 126 km/h.' },
    { title: 'Braking', dur: TS + 1, text: 'It is brought to a stop within 200 m, with uniform retardation.' },
    { title: 'What is asked', dur: 4, text: 'Find the retardation and the time it takes to stop.' },
  ];
  const stages = [
    { title: 'Units', dur: 1, text: 'Work in metres and seconds.', ans: '126 km/h = 126 × 1000 / 3600 = 35 m/s.' },
    { title: 'Braking', dur: TS + 1, text: 'Uniform retardation over 200 m: use v² = u² − 2as with v = 0.', ans: 'a = 35² / (2 × 200) = 1225 / 400 ≈ 3.06 m/s².' },
    { title: 'Stopping time', dur: 4, text: 'Use v = u − at with v = 0.', ans: 't = 35 / 3.06 ≈ 11.4 s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(20, RY, 580, 28); hline(ctx, 20, 600, RY, P.obj, 2);
    const tb = clamp(t - 1, -1, TS), s = tb < 0 ? U * tb : U * tb - 0.5 * A * tb * tb, v = tb < 0 ? U : U - A * tb, fx = X0 + s * K;
    ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.fillRect(fx - 56, RY - 24, 56, 16); ctx.strokeRect(fx - 56, RY - 24, 56, 16);
    ctx.beginPath(); ctx.moveTo(fx - 46, RY - 24); ctx.lineTo(fx - 38, RY - 36); ctx.lineTo(fx - 16, RY - 36); ctx.lineTo(fx - 8, RY - 24); ctx.fill(); ctx.stroke();
    for (const wx of [fx - 44, fx - 12]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, RY - 7, 7, 0, Math.PI * 2); ctx.fill(); }
    vline(ctx, X0, RY - 50, RY + 34, P.ink2, 1, [4, 4]); vline(ctx, X0 + S * K, RY - 50, RY + 34, P.force, 2);
    label(ctx, 'brakes', X0, RY - 60, { align: 'center', size: 12, color: P.ink2 }); label(ctx, 'stops within 200 m', X0 + S * K, RY - 128, { align: 'right', size: 12, weight: 700, color: P.force }); vline(ctx, X0 + S * K, RY - 118, RY - 50, P.force, 1, [3, 3]);
    dim(ctx, X0, X0 + S * K, RY + 46, P.ink2); label(ctx, '200 m', X0 + S * K / 2, RY + 62, { align: 'center', weight: 700, size: 13 });
    if (v > 0.2) vec(ctx, fx - 28, RY - 90, v * 1.8, 0, ans ? `${v.toFixed(1)} m/s` : (t < 1 ? '126 km/h' : 'v'), P.vel, { side: -1, at: 0.5, size: 13, italic: !ans && t >= 1 });
    else label(ctx, 'stopped', fx - 28, RY - 90, { align: 'center', weight: 700, size: 14, color: P.vel });
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['The retardation of the car (assumed uniform).', 'The time it takes to stop.']); note(ctx, 'real time; 2.1 px per metre'); return; }
    if (tb > 0 && v > 0.2) vec(ctx, fx - 60, RY - 60, -40, 0, 'a = 3.06 m/s²', P.acc, { side: -1, at: 0.5, size: 12 });
    clock(ctx, 60, 60, Math.max(0, tb), `t = ${Math.max(0, tb).toFixed(1)} s`);
    const g = axes(ctx, { x: 90, y: 340, w: 440, h: 140, x0: 0, x1: 12.5, y0: 0, y1: 40, xt: [5, 10], yt: [35], xl: 't (s)', yl: 'v (m/s)' });
    if (tb > 0) plot(ctx, g, x => U - A * x, 0, tb, P.vel);
    if (tb >= TS) { ball(ctx, g.X(TS), g.Y(0), 5, P.accent); label(ctx, '11.4 s', g.X(TS), g.Y(0) - 16, { align: 'center', weight: 800, size: 14, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Working', ['u = 126 km/h = 35 m/s', 'a = u² / 2s = 1225 / 400 ≈ 3.06 m/s²', 't = u / a = 35 / 3.06 ≈ 11.4 s'], stageAt(stages, t), false);
    note(ctx, 'real time; 2.1 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const U = 29.4, G = 9.8, H = U * U / (2 * G), TU = U / G, K = 8, BX = 200, Y0 = 452, YT = Y0 - H * K;   // H = 44.1 m, TU = 3 s
  const ftOf = t => t < 2.85 ? t : t < 4.35 ? 2.85 + 0.3 * (t - 2.85) / 1.5 : Math.min(6, 3.15 + (t - 4.35));
  const qStages = [
    { title: 'Thrown up', dur: 7, text: 'A player throws a ball upwards at 29.4 m/s. Take g = 9.8 m/s²; neglect air resistance.' },
    { title: 'What is asked', dur: 5, text: '(a) direction of the acceleration going up; (b) velocity and acceleration at the top; (c) signs of x, v, a with x = 0 at the top, downward positive; (d) the height and the time to return.' },
  ];
  const stages = [
    { title: 'Going up', dur: 2.85, text: 'Gravity pulls down, against the motion: the ball slows down.', ans: '(a) The acceleration is 9.8 m/s², vertically downward.' },
    { title: 'At the top (slow motion)', dur: 1.5, text: 'For an instant the ball is at rest, but gravity still acts.', ans: '(b) v = 0, a = 9.8 m/s² downward.' },
    { title: 'Coming down', dur: 2.85, text: 'Take x = 0 at the top and downward as positive.', ans: '(c) Up: x < 0, v < 0, a > 0. Down: x > 0, v > 0, a > 0.' },
    { title: 'Height and time', dur: 5, text: 'Height h = u²/2g; time up = u/g, and the fall takes as long.', ans: '(d) h = 29.4² / 19.6 = 44.1 m; back in the hands after 3 + 3 = 6 s.' },
  ];
  const sg = v => (Math.abs(v) < 1e-6 ? '0' : v > 0 ? '+' : '−');
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 40, 590, Y0 + 40);
    person(ctx, BX - 22, Y0 + 40, 0.9);
    const ft = ans ? ftOf(t) : Math.min(t, 6), h = U * ft - 0.5 * G * ft * ft, v = U - G * ft, y = Y0 - h * K;   // v: upward positive
    ball(ctx, BX, y, 9, P.force);
    if (ft < 6) {
      if (Math.abs(v) > 0.3) vec(ctx, BX + 26, y, 0, -v * 2.4, ans ? `${Math.abs(v).toFixed(1)} m/s` : (ft < 0.15 ? '29.4 m/s' : ''), P.vel, { side: 1, at: 0.6, align: 'left', ax: 4, size: 12 });
      else label(ctx, 'v = 0', BX + 22, y, { weight: 700, size: 14, color: P.vel });
      if (ans) vec(ctx, BX - 26, y, 0, 40, 'g', P.acc, { side: 1, at: 0.7, align: 'right', ax: -4, italic: true });
    }
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['(a) The direction of the acceleration during the upward motion.', '(b) The velocity and acceleration at the highest point.', '(c) The signs of x, v and a going up and coming down (x = 0 at the top, downward positive).', '(d) The height reached and the time to return to the hands.']); note(ctx, 'real time'); return; }
    const AX = 380;
    arrow(ctx, AX, YT, AX, Y0 + 20, P.ink2, { lw: 1.5, head: 8 }); label(ctx, 'x (downward +)', AX + 8, Y0 + 14, { size: 12, color: P.ink2 });
    hline(ctx, AX - 6, AX + 6, YT, P.ink, 2); label(ctx, 'x = 0 (top)', AX + 10, YT, { size: 12, weight: 700 });
    hline(ctx, BX + 12, AX, YT, P.ink2, 1, [3, 4]);
    vdim(ctx, 520, YT, Y0, P.accent); label(ctx, '44.1 m', 528, (YT + Y0) / 2, { weight: 800, size: 15, color: P.accent });
    const xd = H - h, vd = -v;                                     // downward-positive position and velocity
    label(ctx, `signs now:  x ${sg(Math.abs(xd) < 0.05 ? 0 : xd)}   v ${sg(Math.abs(vd) < 0.3 ? 0 : vd)}   a +`, 40, 110, { weight: 800, size: 16, color: P.accent });
    clock(ctx, 60, 60, ft, `t = ${ft.toFixed(2)} s`);
    partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) a: 9.8 m/s², downward', '(b) top: v = 0, a = 9.8 m/s² down', '(c) up: x −, v −, a +; down: x +, v +, a +', '(d) h = 44.1 m; returns after 6 s'], stageAt(stages, t), false);
    note(ctx, 'real time except slow motion near the top; 8 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const G = 9.8, H = 90, T1 = Math.sqrt(2 * H / G), V1 = G * T1, V2 = 0.9 * V1, TU = V2 / G, T2 = T1 + 2 * TU, K = 4.4, GY = 480, BX = 110;
  const hOf = t => t < T1 ? H - 0.5 * G * t * t : (s => V2 * s - 0.5 * G * s * s)(Math.min(t, T2) - T1);
  const vOf = t => t < T1 ? G * t : Math.abs(V2 - G * (Math.min(t, T2) - T1));
  const qStages = [
    { title: 'Dropped from 90 m', dur: 12.5, text: 'A ball is dropped from a height of 90 m. At each collision with the floor it loses one tenth of its speed.' },
    { title: 'What is asked', dur: 4, text: 'Plot the speed–time graph of its motion from t = 0 to 12 s.' },
  ];
  const stages = [
    { title: 'The fall', dur: T1, text: 'Falling freely, the speed grows steadily: v = gt.', ans: 'It hits the floor at t = √(2 × 90 / 9.8) ≈ 4.29 s with 42 m/s.' },
    { title: 'The bounce', dur: TU, text: 'It leaves the floor with 9/10 of its speed and slows as it rises.', ans: 'Up at 37.8 m/s; speed 0 at the top, t ≈ 8.14 s.' },
    { title: 'Falling again', dur: TU, text: 'It falls back, speeding up at the same rate.', ans: 'Hits the floor again at t ≈ 12 s with 37.8 m/s.' },
    { title: 'The graph', dur: 4, text: 'The graph is made of straight lines of slope ±g, with a sudden drop at the bounce.', ans: 'Peaks: 42 m/s at 4.29 s and 37.8 m/s at 12 s; zero at 8.14 s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 40, 180, GY);
    const ts = Math.min(t, T2), y = GY - hOf(ts) * K - 8;
    vline(ctx, 50, GY - H * K, GY, P.ink2, 1.5);
    for (const m of [0, 30, 60, 90]) { hline(ctx, 46, 54, GY - m * K, P.ink2, 1.2); label(ctx, `${m} m`, 58, GY - m * K, { size: 12, color: P.ink2 }); }
    ball(ctx, BX, y, 8, P.force);
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['The speed–time graph of the ball’s motion from t = 0 to 12 s.']); note(ctx, 'real time; heights at 4.4 px per metre'); return; }
    const g = axes(ctx, { x: 220, y: 70, w: 350, h: 300, x0: 0, x1: 12.6, y0: 0, y1: 46, xt: [4, 8, 12], yt: [20, 40], xl: 't (s)', yl: 'speed (m/s)' });
    plot(ctx, g, vOf, 0, Math.min(ts, T1 - 1e-6), P.vel); if (ts > T1) plot(ctx, g, vOf, T1, ts, P.vel);
    if (ts > T1) { ctx.save(); ctx.strokeStyle = P.vel; ctx.setLineDash([3, 3]); seg(ctx, g.X(T1), g.Y(V1), g.X(T1), g.Y(V2)); ctx.restore(); }
    const mk = (x, v, s, al = 'left') => { ball(ctx, g.X(x), g.Y(v), 5, P.accent); label(ctx, s, g.X(x) + (al === 'left' ? 8 : -8), g.Y(v) - 14, { align: al, weight: 700, size: 13, color: P.accent }); };
    if (ts >= T1) mk(T1, V1, '42 m/s, 4.29 s');
    if (ts >= T1 + TU) mk(T1 + TU, 0, '0 at 8.14 s');
    if (t >= T2) mk(T2, V2, '37.8 m/s, 12 s', 'right');
    clock(ctx, 260, 420, ts, `t = ${ts.toFixed(2)} s, speed = ${vOf(ts).toFixed(1)} m/s`);
    partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['Fall: t = √(2h/g) ≈ 4.29 s, v = 42 m/s', 'Bounce: 0.9 × 42 = 37.8 m/s; up for 3.86 s', 'Down again: floor at ≈ 12 s, 37.8 m/s', 'Graph: lines of slope ±g, drop at each bounce'], stageAt(stages, t), false);
    note(ctx, 'real time; heights at 4.4 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const mOf = t => t < 9 ? 30 * t / 9 : t < 15 ? 30 + 20 * (t - 9) / 6 : 50;
  const pos = m => m <= 30 ? 2.5 * m / 30 : m <= 50 ? 2.5 - 2.5 * (m - 30) / 20 : 0, path = m => m <= 30 ? 2.5 * m / 30 : 2.5 + 2.5 * (Math.min(m, 50) - 30) / 20;
  const PARTS = ['(i) 0 to 30 min', '(iii) 0 to 40 min', '(ii) 0 to 50 min'];
  const ANS = ['displacement 2.5 km, path 2.5 km, in 0.5 h: |v̄| = 5 km/h, speed 5 km/h', 'displacement 1.25 km, path 3.75 km, in 2/3 h: |v̄| = 1.875 km/h, speed 5.625 km/h', 'displacement 0, path 5 km, in 5/6 h: |v̄| = 0, speed 6 km/h'];
  const qStages = [
    { title: 'To the market', dur: 9, text: 'A man walks 2.5 km from home to the market at 5 km/h.' },
    { title: 'Back home', dur: 6, text: 'Finding it closed, he turns at once and walks home at 7.5 km/h.' },
    { title: 'What is asked', dur: 4, text: 'Find the magnitude of average velocity and the average speed over 0–30 min, 0–50 min and 0–40 min.' },
  ];
  const stages = [
    { title: '0 to 30 min', dur: 9, text: 'Outward: 2.5 km at 5 km/h takes 0.5 h = 30 min. So far displacement and path length are equal.', ans: '(i) |average velocity| = average speed = 2.5 / 0.5 = 5 km/h.' },
    { title: '0 to 40 min', dur: 3, text: 'In 10 min back he covers 7.5 × 10/60 = 1.25 km towards home.', ans: '(iii) |v̄| = 1.25 / (2/3) = 1.875 km/h; speed = 3.75 / (2/3) = 5.625 km/h.' },
    { title: '0 to 50 min', dur: 3, text: 'The return takes 2.5 / 7.5 h = 20 min: he is home at 50 min.', ans: '(ii) |v̄| = 0 (back where he started); speed = 5 / (5/6) = 6 km/h.' },
    { title: 'Why the two differ', dur: 4, text: 'Average velocity uses only the net displacement; average speed uses the whole path.', ans: 'After walking 5 km he would not like to hear that his average speed was zero.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const m = mOf(t), x = pos(m), RY = 300, rx = v => 90 + v / 2.5 * 420;
    hline(ctx, rx(0) - 30, rx(2.5) + 40, RY, P.ink, 2);
    block(ctx, rx(0) - 30, RY - 40, 40, 40, 'home', P.objFill); block(ctx, rx(2.5) - 8, RY - 50, 56, 50, 'market', P.objFill);
    dim(ctx, rx(0), rx(2.5), RY + 26, P.ink2); label(ctx, '2.5 km', (rx(0) + rx(2.5)) / 2, RY + 42, { align: 'center', weight: 700, size: 13 });
    if (m < 50) { person(ctx, rx(x), RY, 0.6); vec(ctx, rx(x) + (m < 30 ? 12 : -12), RY - 66, m < 30 ? 40 : -40, 0, m < 30 ? '5 km/h' : '7.5 km/h', P.vel, { side: -1, at: 0.5, size: 12 }); }
    else person(ctx, rx(0) + 26, RY, 0.6);
    if (m >= 30 && m < 33) label(ctx, 'closed!', rx(2.5) + 20, RY - 64, { align: 'center', weight: 700, size: 14, color: P.force });
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['(a) The magnitude of average velocity and (b) the average speed over (i) 0 to 30 min, (ii) 0 to 50 min, (iii) 0 to 40 min.']); note(ctx, '50 minutes shown in 15 s'); return; }
    clock(ctx, 60, 60, m, `t = ${m.toFixed(0)} min`);
    if (x > 0.01) vec(ctx, rx(0), RY + 80, rx(x) - rx(0), 0, `displacement ${x.toFixed(2)} km`, P.disp, { side: 1, at: 0.5, size: 13 });
    else label(ctx, 'displacement 0', rx(0), RY + 80, { weight: 700, size: 13, color: P.disp });
    label(ctx, `path length ${path(m).toFixed(2)} km`, rx(0), RY + 130, { weight: 700, size: 14, color: P.vel });
    const k = m < 30 ? -1 : m < 40 ? 0 : m < 50 ? 1 : 2;
    partsPanel(ctx, 630, 34, 300, 'Over the interval…', PARTS, k, true, ANS);
    note(ctx, '50 minutes shown in 15 s');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const xf = t => t > 0 ? t * t : 0, D = 7;
  const qStages = [
    { title: 'Fig. 2.11', dur: D, text: 'The x–t plot of a particle in one-dimensional motion: flat for t < 0, curving upward for t > 0.' },
    { title: 'What is asked', dur: 4, text: 'Does the particle move in a straight line for t < 0 and on a parabolic path for t > 0? If not, suggest a physical context.' },
  ];
  const stages = [
    { title: 'Reading the graph', dur: D, text: 'An x–t graph plots position against time. It is not a picture of the path. Watch the car on the road below.', ans: 'For t < 0 the car is at rest at x = 0; for t > 0, x ∝ t²: it accelerates uniformly from rest.' },
    { title: 'The answer', dur: 5, text: 'In one-dimensional motion the particle always moves along one straight line.', ans: 'No. Context: a car at rest that starts with constant acceleration at t = 0 (or a stone dropped at t = 0).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 80, y: 60, w: 460, h: 240, x0: -2, x1: 3, y0: 0, y1: 9, xl: 't', yl: 'x' });
    label(ctx, '0', g.X(0) + 4, g.Y(0) + 14, { size: 12 });
    const tt = -2 + 5 * clamp(t / (D - 1));
    plot(ctx, g, xf, -2, tt, P.vel);
    ball(ctx, g.X(tt), g.Y(xf(tt)), 5, P.accent);
    if (ans) {
      const RY = 430, rx = v => 80 + v / 9 * 460;
      ctx.fillStyle = P.road; ctx.fillRect(40, RY, 540, 20); hline(ctx, 40, 580, RY, P.obj, 2);
      vline(ctx, rx(0), RY - 6, RY + 26, P.ink, 1.5); label(ctx, 'x = 0', rx(0), RY + 38, { align: 'center', size: 12 });
      block(ctx, rx(xf(tt)) - 20, RY - 20, 40, 20, '', P.objFill2);
      label(ctx, 'the path: a straight road', 320, RY + 60, { align: 'center', weight: 700, size: 14, color: P.accent });
      label(ctx, tt < 0 ? 'at rest' : 'speeding up', rx(xf(tt)), RY - 32, { align: 'center', weight: 700, size: 13, color: P.vel });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['The x–t graph is not the path', 'Here: at rest, then uniformly accelerated from rest (x ∝ t²) along a straight line', 'e.g. a car starting from a signal at t = 0'], t < 3 ? 0 : t < D ? 1 : 2, false);
    } else askedPanel(ctx, 630, 34, 300, ['Is it correct to say the particle moves in a straight line for t < 0 and on a parabolic path for t > 0?', 'If not, suggest a suitable physical context for this graph.']);
    note(ctx, ans ? 'the acceleration is illustrative; none is given' : 'Fig. 2.11 as given: no scale');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const VV = 30 / 3.6, VC = 192 / 3.6, VB = 150 + VV, REL = VB - VC, D0 = 250, TH = D0 / REL, K = 1.1, SLOW = 5, RY = 260, X0 = 40;
  const qStages = [
    { title: 'The chase', dur: 2, text: 'A police van at 30 km/h chases a thief’s car speeding away at 192 km/h along the same highway.' },
    { title: 'A shot is fired', dur: TH * SLOW + 1, text: 'A bullet is fired from the van at the car. Its muzzle speed is 150 m/s.' },
    { title: 'What is asked', dur: 4, text: 'With what speed does the bullet hit the car? (The speed that matters for the damage.)' },
  ];
  const stages = [
    { title: 'Speeds in m/s', dur: 2, text: 'Convert both speeds to m/s.', ans: 'Van: 30 km/h = 8.33 m/s. Car: 192 km/h = 53.3 m/s.' },
    { title: 'The bullet', dur: TH * SLOW + 1, text: 'The muzzle speed is measured relative to the van, so over the ground the bullet also has the van’s speed.', ans: 'Bullet over the ground: 150 + 8.33 = 158.3 m/s.' },
    { title: 'Relative to the car', dur: 4, text: 'The damage depends on how fast the bullet closes in on the car.', ans: 'Speed relative to the car = 158.3 − 53.3 = 105 m/s.' },
  ];
  function veh(ctx, x, w, col, txt, y = RY) { block(ctx, x - w, y - 30, w, 26, txt, col); for (const wx of [x - w + 10, x - 10]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, y - 4, 6, 0, Math.PI * 2); ctx.fill(); } }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(20, RY, 580, 24); hline(ctx, 20, 600, RY, P.obj, 2);
    const rt = Math.min((t - 2) / SLOW, TH), vx = X0 + 60 + VV * rt * K, cx = X0 + 60 + D0 * K + VC * rt * K;
    veh(ctx, vx, 60, P.objFill, 'police'); veh(ctx, cx + 60, 60, P.ke, 'thief');
    vec(ctx, vx - 50, RY - 50, 24, 0, ans ? '8.33 m/s' : '30 km/h', P.vel, { side: -1, at: 0.5, size: 12 });
    vec(ctx, cx + 10, RY - 50, 50, 0, ans ? '53.3 m/s' : '192 km/h', P.vel, { side: -1, at: 0.5, size: 12 });
    if (rt >= 0) {
      const bx = Math.min(X0 + 60 + VB * rt * K, cx);
      ctx.fillStyle = P.ink; ctx.fillRect(bx - 8, RY - 20, 8, 4);
      if (rt < TH) vec(ctx, bx - 4, RY - 90, 60, 0, ans ? '158.3 m/s (ground)' : '150 m/s from the van', P.force, { side: -1, at: 0.5, size: 12 });
      else label(ctx, 'hit!', cx, RY - 46, { align: 'center', weight: 800, size: 15, color: P.force });
    }
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['The speed with which the bullet hits the thief’s car (the speed relevant for damaging it).']); note(ctx, 'motion slowed 5 times; starting gap illustrative'); return; }
    // as seen from the thief's car
    const IY = 420; label(ctx, 'as seen from the thief’s car', 300, IY - 80, { align: 'center', weight: 700, size: 14 });
    hline(ctx, 60, 560, IY, P.ink2, 1, [4, 4]); veh(ctx, 560, 60, P.ke, 'thief', IY);
    if (rt >= 0) { const bx = 80 + (500 - 80) * rt / TH; ctx.fillStyle = P.ink; ctx.fillRect(bx - 8, IY - 20, 8, 4); if (rt < TH) vec(ctx, bx - 4, IY - 30, 50, 0, '105 m/s', P.accent, { side: -1, at: 0.5, size: 13 }); }
    partsPanel(ctx, 630, 34, 300, 'Working', ['Van 8.33 m/s; car 53.3 m/s', 'Bullet over the ground: 150 + 8.33 = 158.3 m/s', 'Relative to the car: 158.3 − 53.3 = 105 m/s'], stageAt(stages, t), false);
    note(ctx, 'motion slowed 5 times; starting gap illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const D = 9;
  const PARTS = ['(a) x–t: up to A, back past B, then constant', '(b) v–t: falling lines with jumps, each shorter', '(c) a–t: zero except one short spike'];
  const ANS = ['A ball on a smooth floor is kicked, rebounds from a wall (A) with reduced speed, passes its start (B) and is stopped by the opposite wall.', 'A ball thrown up falls back and rebounds from the floor with reduced speed after each hit.', 'A uniformly moving cricket ball turned back by a bat in a very short time.'];
  const qStages = partStages(['Graph (a)', 'Graph (b)', 'Graph (c)'], ['Fig. 2.12 (a): an x–t graph.', 'Fig. 2.12 (b): a v–t graph.', 'Fig. 2.12 (c): an a–t graph. Suggest a physical situation for each graph.'], D);
  const stages = partStages(qStages.map(s => s.title), ['x rises steadily to A (moving at constant speed), then falls more slowly through B to a fixed negative value: a rebound with less speed, then rest.',
    'v falls steadily (gravity), jumps from negative to a smaller positive value (a bounce), and repeats with less speed each time.', 'The acceleration is zero (uniform motion) except for one brief, large, positive spike (a sharp hit).'], D, ANS);
  const xa = t => t < 0 ? 0 : t < 1 ? 3 * t : t < 1 + 5 / 1.5 ? 3 - 1.5 * (t - 1) : -2;
  const bounces = (() => { const L = []; let v = 10, t0 = 0; for (let i = 0; i < 6; i++) { L.push([t0, v]); t0 += 2 * v / 10; v *= 0.7; } return L; })();
  const vb = t => { for (let i = bounces.length - 1; i >= 0; i--) if (t >= bounces[i][0]) return bounces[i][1] - 10 * (t - bounces[i][0]); return 10; };
  const hb = t => { for (let i = bounces.length - 1; i >= 0; i--) if (t >= bounces[i][0]) { const s = t - bounces[i][0]; return Math.max(0, bounces[i][1] * s - 5 * s * s); } return 0; };
  const ac = t => 8 * Math.exp(-(((t - 3) / 0.08) ** 2));
  const xc = t => t < 3 ? -1.5 * (t - 3) : 1.5 * (t - 3);       // moving towards the bat (on the left), then sent back
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const k = Math.min(2, Math.floor(t / D)), u = Math.min(t - k * D, D - 1), tt = -1 + 7 * u / (D - 1);
    if (k === 0) {
      const g = axes(ctx, { x: 80, y: 50, w: 460, h: 220, x0: -1.5, x1: 6, y0: -2.6, y1: 3.6, xl: 't', yl: 'x' });
      plot(ctx, g, xa, -1.5, tt, P.vel); label(ctx, 'A', g.X(1) - 4, g.Y(3) - 14, { weight: 700, size: 14 }); label(ctx, 'B', g.X(3) + 6, g.Y(0) + 16, { weight: 700, size: 14 });
      if (ans) { const FY = 430, rx = x => 300 + x * 50; ground(ctx, rx(-2) - 10, rx(3) + 10, FY); vline(ctx, rx(-2) - 10, FY - 70, FY, P.obj, 6); vline(ctx, rx(3) + 10, FY - 70, FY, P.obj, 6); ball(ctx, rx(xa(tt)), FY - 10, 10, P.force); label(ctx, 'wall', rx(3) + 10, FY - 82, { align: 'center', size: 12 }); label(ctx, 'wall', rx(-2) - 10, FY - 82, { align: 'center', size: 12 }); vline(ctx, rx(0), FY, FY + 8, P.ink, 1.5); label(ctx, 'start', rx(0), FY + 20, { align: 'center', size: 12 }); }
    } else if (k === 1) {
      const g = axes(ctx, { x: 80, y: 50, w: 460, h: 220, x0: 0, x1: 7, y0: -11, y1: 11, xl: 't', yl: 'v' }), t2 = (tt + 1) * 7 / 7;
      let a = 0; for (let i = 0; i < bounces.length; i++) { const b = i + 1 < bounces.length ? bounces[i + 1][0] : 7; plot(ctx, g, vb, bounces[i][0] + 1e-6, Math.min(b - 1e-6, t2), P.vel); if (t2 < b) break; a = b; }
      if (ans) { const FY = 470, KH = 6; ground(ctx, 200, 420, FY); ball(ctx, 310, FY - 10 - hb(t2) * KH, 10, P.force); label(ctx, 'up = positive', 430, FY - 40, { size: 12, color: P.ink2 }); }
    } else {
      const g = axes(ctx, { x: 80, y: 50, w: 460, h: 220, x0: 0, x1: 6, y0: -1, y1: 9, xl: 't', yl: 'a' }), t3 = (tt + 1) * 6 / 7;
      plot(ctx, g, ac, 0, t3, P.vel, 3, 600);
      if (ans) { const FY = 440, rx = x => 160 + x * 70; ground(ctx, 60, 580, FY); ctx.save(); ctx.translate(rx(0) - 20, FY - 30); ctx.rotate(Math.abs(t3 - 3) < 0.3 ? -0.3 : 0); ctx.fillStyle = P.wood; ctx.fillRect(-6, -40, 12, 70); ctx.restore(); label(ctx, 'bat', rx(0) - 20, FY - 86, { align: 'center', size: 12 }); ball(ctx, rx(xc(t3)), FY - 30, 9, P.force); vec(ctx, rx(xc(t3)), FY - 56, t3 < 3 ? -30 : 30, 0, '', P.vel); }
    }
    partsPanel(ctx, 630, 34, 300, ans ? 'A suitable situation' : 'Suggest a situation for…', PARTS, k, ans, ANS);
    note(ctx, 'shapes follow Fig. 2.12; speeds and sizes illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q16
const SCENE = (() => {
  const xf = t => -Math.sin(Math.PI * t), vf = t => -Math.PI * Math.cos(Math.PI * t), af = t => -Math.PI * Math.PI * xf(t), D = 8;
  const PTS = [0.3, 1.2, -1.2];
  const qStages = [
    { title: 'Fig. 2.13', dur: D, text: 'The x–t plot of a particle in one-dimensional simple harmonic motion.' },
    { title: 'What is asked', dur: 4, text: 'Give the signs of position, velocity and acceleration at t = 0.3 s, 1.2 s and −1.2 s.' },
  ];
  const stages = [
    { title: 'Reading x, v and a', dur: D, text: 'x is read off the graph; v is the slope of the graph; in SHM a = −ω²x, so a always points back towards x = 0.', ans: 'a always has the opposite sign to x.' },
    { title: 't = 0.3 s', dur: 4, text: 'Below the axis and still going down.', ans: 'x < 0, v < 0, a > 0.' },
    { title: 't = 1.2 s', dur: 4, text: 'Above the axis and still rising.', ans: 'x > 0, v > 0, a < 0.' },
    { title: 't = −1.2 s', dur: 4, text: 'Below the axis but rising.', ans: 'x < 0, v > 0, a > 0.' },
  ];
  const sg = v => v > 0 ? '+' : '−';
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 50, y: 60, w: 520, h: 220, x0: -2.4, x1: 3.4, y0: -1.3, y1: 1.3, xt: [-2, -1, 1, 2, 3], xl: 't (s)', yl: 'x' });
    const st = ans ? stageAt(stages, t) : 0, tt = st === 0 ? -2.3 + 5.6 * clamp(t / (D - 1)) : PTS[st - 1];
    plot(ctx, g, xf, -2.3, st === 0 ? tt : 3.3, P.vel);
    const LY = 430, px = x => 310 + x * 160;
    hline(ctx, px(-1.15), px(1.15), LY, P.ink2, 1.5); vline(ctx, px(0), LY - 8, LY + 8, P.ink, 2); label(ctx, 'x = 0', px(0), LY + 22, { align: 'center', size: 12 });
    ball(ctx, px(xf(tt)), LY, 10, P.objFill2);
    ball(ctx, g.X(tt), g.Y(xf(tt)), 5, P.accent);
    if (ans && st > 0) {
      vline(ctx, g.X(tt), g.Y(1.3), g.Y(-1.3), P.ink2, 1, [3, 4]);
      label(ctx, `t = ${tt} s`, g.X(tt), g.Y(1.3) - 8, { align: 'center', weight: 700, size: 13 });
      vec(ctx, px(xf(tt)), LY - 30, Math.sign(vf(tt)) * 50, 0, 'v', P.vel, { side: -1, at: 0.6, italic: true });
      vec(ctx, px(xf(tt)), LY + 30, Math.sign(af(tt)) * 50, 0, 'a', P.acc, { side: 1, at: 0.6, italic: true });
      label(ctx, `x ${sg(xf(tt))}   v ${sg(vf(tt))}   a ${sg(af(tt))}`, 310, 500, { align: 'center', weight: 800, size: 18, color: P.accent });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Signs of x, v, a', ['t = 0.3 s', 't = 1.2 s', 't = −1.2 s'], st - 1, true, ['x < 0, v < 0, a > 0', 'x > 0, v > 0, a < 0', 'x < 0, v > 0, a > 0']);
    else askedPanel(ctx, 630, 34, 300, ['The signs of position, velocity and acceleration at t = 0.3 s, 1.2 s and −1.2 s.']);
    note(ctx, 'amplitude not given: drawn as x = −A sin(πt) to match Fig. 2.13');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const xf = hermite([[-0.3, 0.6, 0.6], [1.0, 1.4, 0.6], [1.8, 1.95, 0.3], [2.2, 2.05, 0], [2.6, 0.9, -6], [3.0, -1.6, -4], [3.25, -2.0, 0], [3.7, -1.1, 3]]);
  const IV = [[0.9, 1.1], [2.0, 2.2], [2.7, 2.9]], D = 10;
  const qStages = [
    { title: 'Fig. 2.14', dur: D, text: 'The x–t plot of a particle moving along a line, with three equal intervals of time, 1, 2 and 3.' },
    { title: 'What is asked', dur: 4, text: 'In which interval is the average speed greatest, and in which least? Give the sign of the average velocity in each.' },
  ];
  const stages = [
    { title: 'Following the particle', dur: D, text: 'Over a short interval, the average speed is |change in x| divided by the interval: how steep the graph is there.', ans: 'Interval 1: moderate slope; 2: nearly flat (the top); 3: steep, going down.' },
    { title: 'Comparing', dur: 5, text: 'The intervals are equally long, so compare how far x changes in each (bars on the right).', ans: 'Average speed greatest in 3, least in 2.' },
    { title: 'Signs', dur: 4, text: 'x increases in 1 and 2 and decreases in 3.', ans: 'Average velocity: positive in 1 and 2, negative in 3.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 60, y: 60, w: 400, h: 380, x0: -0.3, x1: 3.8, y0: -2.3, y1: 2.5, xl: 't', yl: 'x' });
    IV.forEach(([a, b], i) => { ctx.fillStyle = P.grid; ctx.fillRect(g.X(a), Math.min(g.Y(xf(a)), g.Y(0)), g.X(b) - g.X(a), Math.abs(g.Y(xf((a + b) / 2)) - g.Y(0))); label(ctx, String(i + 1), (g.X(a) + g.X(b)) / 2, g.Y(0) + (xf(a) > 0 ? 14 : -14), { align: 'center', weight: 700, size: 14 }); });
    const tt = -0.3 + 4.0 * clamp(t / (D - 1));
    plot(ctx, g, xf, -0.3, ans ? tt : tt, P.vel);
    const LX = 520, py = x => g.Y(x);
    vline(ctx, LX, g.Y(2.4), g.Y(-2.2), P.ink2, 1.5); label(ctx, 'x', LX + 8, g.Y(2.4), { size: 12, color: P.ink2 }); hline(ctx, LX - 6, LX + 6, g.Y(0), P.ink, 1.5);
    ball(ctx, LX, py(xf(tt)), 8, P.objFill2); ball(ctx, g.X(tt), g.Y(xf(tt)), 5, P.accent);
    if (ans && t >= D) {
      IV.forEach(([a, b], i) => { const dx = xf(b) - xf(a), bx = 560 + i * 14; ctx.fillStyle = dx > 0 ? P.vel : P.force; ctx.fillRect(bx, Math.min(py(xf(a)), py(xf(b))), 10, Math.abs(py(xf(b)) - py(xf(a)))); label(ctx, String(i + 1), bx + 5, Math.max(py(xf(a)), py(xf(b))) + 12, { align: 'center', size: 12, weight: 700 }); });
      label(ctx, 'Δx in each interval', 590, 52, { align: 'right', size: 12, color: P.ink2 });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Average speed ≈ |slope| over the interval', 'Greatest in 3, least in 2', 'Average velocity: + in 1, + in 2, − in 3'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The interval with the greatest average speed and the one with the least.', 'The sign of the average velocity in each interval.']);
    note(ctx, 'no values given: the curve matches the shape of Fig. 2.14');
  }
  return { qStages, stages, draw };
})();

//@@ q18
const SCENE = (() => {
  const vf = hermite([[0, 0.5, 0], [0.3, 0.5, 0], [1.0, 0.75, 0.6], [1.75, 2.0, 0], [2.05, 1.2, -3.2], [2.4, 0.6, 0], [2.75, 1.4, 2.0], [3.1, 2.4, 0], [3.4, 1.8, -2]]);
  const IV = [[0.95, 1.05], [2.0, 2.1], [2.95, 3.05]], PTS = [['A', 0.15], ['B', 1.75], ['C', 2.4], ['D', 3.1]], D = 10;
  const qStages = [
    { title: 'Fig. 2.15', dur: D, text: 'The speed–time graph of a particle moving in a constant direction, with three equal intervals 1, 2 and 3.' },
    { title: 'What is asked', dur: 5, text: 'Where is |average acceleration| greatest? Where is the average speed greatest? Signs of v and a in each interval; accelerations at A, B, C and D.' },
  ];
  const stages = [
    { title: 'Following the particle', dur: D, text: 'Average acceleration over a short interval ≈ the slope of the speed–time graph; average speed ≈ its height.', ans: 'Slopes: 1 gentle up, 2 steep down, 3 gentle up. Heights: 3 is highest.' },
    { title: 'Greatest values', dur: 4, text: 'Compare slopes and heights across the three equal intervals.', ans: '|Average acceleration| greatest in 2; average speed greatest in 3.' },
    { title: 'Signs', dur: 4, text: 'The motion is always in the positive direction, so v > 0; a has the sign of the slope.', ans: 'v > 0 in all three; a > 0 in 1 and 3, a < 0 in 2.' },
    { title: 'A, B, C, D', dur: 4, text: 'At these points the graph is flat.', ans: 'The acceleration is zero at A, B, C and D.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 70, y: 60, w: 470, h: 300, x0: 0, x1: 3.5, y0: 0, y1: 2.7, xt: [1, 2, 3], xl: 't', yl: 'speed' });
    IV.forEach(([a, b]) => { ctx.fillStyle = P.grid; ctx.fillRect(g.X(a), g.Y(vf((a + b) / 2)), g.X(b) - g.X(a), g.Y(0) - g.Y(vf((a + b) / 2))); });
    const tt = 3.45 * clamp(t / (D - 1));
    plot(ctx, g, vf, 0, tt, P.vel);
    PTS.forEach(([n, x]) => { if (tt >= x) label(ctx, n, g.X(x), g.Y(vf(x)) - 14, { align: 'center', weight: 700, size: 14 }); });
    ball(ctx, g.X(tt), g.Y(vf(tt)), 5, P.accent);
    let s = 0; for (let x = 0; x < tt; x += 0.01) s += vf(x) * 0.01;
    const LY = 450; hline(ctx, 60, 590, LY, P.ink2, 1.5); ball(ctx, 70 + s * 105, LY - 10, 9, P.objFill2); label(ctx, 'direction of motion →', 70, LY + 20, { size: 12, color: P.ink2 });
    if (ans && t >= D) IV.forEach(([a, b], i) => { const sl = (vf(b) - vf(a)) / (b - a); label(ctx, `${i + 1}: a ${sl > 0 ? '> 0' : '< 0'}`, (g.X(a) + g.X(b)) / 2, g.Y(vf(a)) + (sl > 0 ? 26 : -40), { align: 'center', weight: 700, size: 13, color: sl > 0 ? P.vel : P.force }); });
    if (ans && stageAt(stages, t) === 3) PTS.forEach(([n, x]) => { ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 2; seg(ctx, g.X(x) - 28, g.Y(vf(x)), g.X(x) + 28, g.Y(vf(x))); ctx.restore(); });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Slope = acceleration; height = speed', '|a| greatest in 2; speed greatest in 3', 'v > 0 in all; a > 0 in 1, 3; a < 0 in 2', 'a = 0 at A, B, C and D'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The interval with the greatest |average acceleration|, and the one with the greatest average speed.', 'The signs of v and a in the three intervals.', 'The accelerations at A, B, C and D.']);
    note(ctx, 'no values given: the curve matches the shape of Fig. 2.15');
  }
  return { qStages, stages, draw };
})();
