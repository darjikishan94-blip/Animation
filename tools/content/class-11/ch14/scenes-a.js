//@@ q01
const SCENE = (() => {
  const L = 20, V = 40, K = 25, X0 = 50, Y = 250, SLOW = 10, D = (L / V) * SLOW + 1;
  const qStages = [
    { title: 'A jerk at one end', dur: D, text: 'A string of mass 2.50 kg and length 20.0 m is under a tension of 200 N. A transverse jerk is given at one end.' },
    { title: 'What is asked', dur: 4, text: 'How long does the disturbance take to reach the other end?' },
  ];
  const stages = [
    { title: 'Wave speed', dur: D, text: 'v = √(T/μ), with μ = 2.50/20.0 = 0.125 kg/m.', ans: 'v = √(200/0.125) = 40 m/s.' },
    { title: 'Time', dur: 4, text: 't = length / speed.', ans: 't = 20.0/40 = 0.50 s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, X0 + L * K, Y - 60, 16, 120, P.obj, P.objFill);
    const tr = Math.min(t / SLOW, L / V), xp = V * tr;
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2.5; ctx.beginPath();
    for (let i = 0; i <= 400; i++) { const x = L * i / 400, y = 50 * Math.exp(-(((x - xp) / 0.9) ** 2)); if (i) ctx.lineTo(X0 + x * K, Y - y); else ctx.moveTo(X0 + x * K, Y - y); } ctx.stroke(); ctx.restore();
    dim(ctx, X0, X0 + L * K, Y + 50, P.ink2); label(ctx, '20.0 m', X0 + L * K / 2, Y + 66, { align: 'center', weight: 700, size: 13 });
    label(ctx, 'T = 200 N, m = 2.50 kg', X0, Y - 110, { weight: 700, size: 14 });
    if (ans) { clock(ctx, 60, 60, tr, `t = ${tr.toFixed(2)} s`); vec(ctx, X0 + xp * K, Y - 70, 40, 0, '40 m/s', P.vel, { side: -1, at: 0.5, size: 12 }); partsPanel(ctx, 630, 34, 300, 'Working', ['μ = 0.125 kg/m; v = √(T/μ) = 40 m/s', 't = 20.0/40 = 0.50 s'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['The time the disturbance takes to reach the other end.']);
    note(ctx, 'shown 10 times slower; 25 px per metre; pulse height exaggerated');
  }
  return { qStages, stages, draw };
})();

//@@ q02
const SCENE = (() => {
  const H = 300, G = 9.8, VS = 340, K = 1.2, TOP = 80, BX = 300, TF = Math.sqrt(2 * H / G), TS = H / VS, D = TF + TS + 1;
  const qStages = [
    { title: 'Dropped from 300 m', dur: D, text: 'A stone is dropped from the top of a 300 m tower and splashes into a pond at its base. Speed of sound 340 m/s; g = 9.8 m/s².' },
    { title: 'What is asked', dur: 4, text: 'When is the splash heard at the top?' },
  ];
  const stages = [
    { title: 'The fall', dur: TF, text: 'h = ½gt₁².', ans: 't₁ = √(2 × 300/9.8) ≈ 7.82 s.' },
    { title: 'The sound', dur: TS + 1, text: 'The sound of the splash travels back up 300 m at 340 m/s.', ans: 't₂ = 300/340 ≈ 0.88 s.' },
    { title: 'Total', dur: 4, text: 'Add the two times.', ans: 't = 7.82 + 0.88 ≈ 8.7 s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const BY = TOP + H * K; ctx.fillStyle = P.objFill; ctx.fillRect(BX - 120, TOP, 60, H * K); ctx.strokeStyle = P.obj; ctx.strokeRect(BX - 120, TOP, 60, H * K);
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.5; ctx.fillRect(BX - 40, BY - 6, 160, 16); ctx.globalAlpha = 1; ground(ctx, 60, 560, BY + 10);
    vdim(ctx, BX - 140, TOP, BY, P.ink2); label(ctx, '300 m', BX - 148, (TOP + BY) / 2, { align: 'right', weight: 700, size: 13 });
    person(ctx, BX - 90, TOP, 0.6);
    const tt = Math.min(t, TF + TS + 0.6);
    if (tt < TF) { const y = TOP + 0.5 * G * tt * tt * K; ball(ctx, BX, y, 6, P.ink); }
    else { const s = tt - TF, r = VS * s * K; ctx.save(); ctx.beginPath(); ctx.rect(4, 0, 600, 540); ctx.clip(); ctx.strokeStyle = P.force; ctx.lineWidth = 2; ctx.globalAlpha = Math.max(0.2, 1 - s / (TS + 0.6)); ctx.beginPath(); ctx.arc(BX, BY, Math.min(r, H * K + 20), Math.PI, 2 * Math.PI); ctx.stroke(); ctx.restore(); label(ctx, 'splash!', BX + 20, BY - 16, { weight: 800, size: 14, color: P.force }); if (s >= TS) label(ctx, 'heard!', BX - 90, TOP - 70, { align: 'center', weight: 800, size: 15, color: P.accent }); }
    if (ans) { clock(ctx, 420, 80, tt, `t = ${tt.toFixed(2)} s`); partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['Fall: t₁ ≈ 7.82 s', 'Sound up: t₂ ≈ 0.88 s', 'Heard after ≈ 8.7 s'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['When the splash is heard at the top of the tower.']);
    note(ctx, 'real time; 1.2 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const A = 3.0, W = 36, KW = 0.018, PH = Math.PI / 4, X0 = 50, KX = 0.6, Y = 260, KY = 15, SLOW = 20, LAM = 2 * Math.PI / KW;
  const yf = (x, t) => A * Math.sin(W * t + KW * x + PH);
  const qStages = [
    { title: 'The wave', dur: 8, text: 'y(x, t) = 3.0 sin(36t + 0.018x + π/4), with x and y in cm and t in s; +x is to the right.' },
    { title: 'What is asked', dur: 5, text: '(a) Travelling or stationary? Speed and direction? (b) Amplitude and frequency? (c) Initial phase at the origin? (d) Distance between successive crests?' },
  ];
  const stages = [
    { title: 'Travelling, right to left', dur: 6, text: 'It has the form f(x + vt): a travelling wave moving towards −x. Follow a crest.', ans: '(a) v = ω/k = 36/0.018 = 2000 cm/s = 20 m/s, right to left.' },
    { title: 'Amplitude and frequency', dur: 4, text: 'Amplitude = coefficient; ν = ω/2π.', ans: '(b) 3.0 cm; ν = 36/2π ≈ 5.7 Hz.' },
    { title: 'Phase and wavelength', dur: 5, text: 'At x = 0, t = 0 the phase is π/4. Crests repeat every wavelength λ = 2π/k.', ans: '(c) π/4. (d) λ ≈ 349 cm ≈ 3.5 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const tr = t / SLOW;
    hline(ctx, X0, X0 + 800 * KX, Y, P.ink2, 1);
    for (let c = 0; c <= 800; c += 100) { vline(ctx, X0 + c * KX, Y - 4, Y + 4, P.ink2, 1); label(ctx, `${c / 100} m`, X0 + c * KX, Y + 64, { align: 'center', size: 11, color: P.ink2 }); }
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 400; i++) { const x = 800 * i / 400, y = yf(x, tr); if (i) ctx.lineTo(X0 + x * KX, Y - y * KY); else ctx.moveTo(X0 + x * KX, Y - y * KY); } ctx.stroke(); ctx.restore();
    // a crest near the middle: 36t + 0.018x + π/4 = π/2 + 2πn
    let xc = (Math.PI / 2 - PH - W * tr) / KW; while (xc < 150) xc += LAM; while (xc > 550) xc -= LAM;
    ball(ctx, X0 + xc * KX, Y - A * KY, 6, P.force);
    if (ans) {
      const st = stageAt(stages, t);
      vec(ctx, X0 + xc * KX, Y - A * KY - 20, -50, 0, '20 m/s', P.force, { side: -1, at: 0.5, size: 12 });
      if (st >= 1) { vdim(ctx, X0 + 800 * KX + 20, Y - A * KY, Y, P.accent); label(ctx, '3.0 cm', X0 + 800 * KX + 26, Y - A * KY / 2, { weight: 700, size: 12, color: P.accent }); }
      if (st >= 2) { const x2 = xc + LAM <= 800 ? xc + LAM : xc - LAM; dim(ctx, X0 + Math.min(xc, x2) * KX, X0 + Math.max(xc, x2) * KX, Y - A * KY - 50, P.accent); label(ctx, 'λ ≈ 3.5 m', X0 + (xc + x2) / 2 * KX, Y - A * KY - 66, { align: 'center', weight: 800, size: 14, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) travelling, −x, 20 m/s', '(b) 3.0 cm, ≈ 5.7 Hz', '(c) π/4; (d) ≈ 3.5 m'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) Travelling or stationary? If travelling, its speed and direction.', '(b) Amplitude and frequency.', '(c) Initial phase at the origin.', '(d) The least distance between two successive crests.']);
    note(ctx, 'time slowed 20 times; displacement exaggerated (15 px per cm); x from 0 to 8 m');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const W = 36, KW = 0.018, PH = Math.PI / 4, TP = 2 * Math.PI / W, D = 8;
  const XS = [[0, P => P.vel], [2, P => P.force], [4, P => P.leaf]];
  const qStages = [
    { title: 'Three points', dur: 5, text: 'For the wave of 14.8, y = 3.0 sin(36t + 0.018x + π/4), look at the points x = 0, 2 and 4 cm.' },
    { title: 'What is asked', dur: 4, text: 'Plot y against t at each point. What shape? How do the motions differ: amplitude, frequency or phase?' },
  ];
  const stages = [
    { title: 'y–t at each point', dur: D, text: 'At a fixed x the point does SHM: y = 3.0 sin(36t + φ), φ = π/4 + 0.018x.', ans: 'Sine curves of amplitude 3 cm and period 2π/36 ≈ 0.17 s.' },
    { title: 'Phases', dur: 5, text: 'φ = π/4 at x = 0, π/4 + 0.036 at 2 cm, π/4 + 0.072 at 4 cm: the curves are shifted very slightly.', ans: 'Same amplitude and frequency; only the phase differs.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    XS.forEach(([x, col], i) => {
      const g = axes(ctx, { x: 80, y: 60 + i * 150, w: 470, h: 100, x0: 0, x1: 0.36, y0: -3.6, y1: 3.6, xt: i === 2 ? [0.1, 0.2, 0.3] : [], yt: [3], xl: 't (s)', yl: '' });
      label(ctx, `x = ${x} cm`, 20, 110 + i * 150, { weight: 800, size: 14, color: col(P) });
      if (ans) plot(ctx, g, s => 3 * Math.sin(W * s + KW * x + PH), 0, Math.min(0.36, 0.36 * clamp(t / (D - 1))), col(P), 2.5);
      if (ans && t >= stages[1].t0) label(ctx, `φ = π/4 + ${(KW * x).toFixed(3)}`, 420, 70 + i * 150, { weight: 700, size: 13, color: col(P) });
    });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Sinusoids: amplitude 3 cm, period ≈ 0.17 s', 'They differ only in phase'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The y–t graphs for x = 0, 2 and 4 cm, and their shape.', 'Whether the motions differ in amplitude, frequency or phase.']);
    note(ctx, 'graphs to scale; the phase shifts are small, so the curves look almost alike');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const L = 1.5, K = 300, X0 = 75, Y = 240, KY = 1300, SLOW = 100, D = 8;
  const qStages = [
    { title: 'A clamped string', dur: D, text: 'y(x, t) = 0.06 sin(2πx/3) cos(120πt) (x, y in m, t in s) on a 1.5 m string of mass 3.0 × 10⁻² kg, clamped at both ends.' },
    { title: 'What is asked', dur: 5, text: '(a) Travelling or stationary? (b) As two opposite travelling waves: wavelength, frequency, speed of each? (c) The tension?' },
  ];
  const stages = [
    { title: 'Stationary wave', dur: D, text: 'A function of x times a function of t: every point oscillates in place. Two travelling waves (faint) add up to it.', ans: '(a) Stationary. y = 0.03 sin(2πx/3 − 120πt) + 0.03 sin(2πx/3 + 120πt).' },
    { title: 'Each travelling wave', dur: 5, text: 'k = 2π/3 m⁻¹, ω = 120π rad/s.', ans: '(b) λ = 3 m, ν = 60 Hz, v = νλ = 180 m/s.' },
    { title: 'Tension', dur: 4, text: 'v = √(T/μ), μ = 0.03/1.5 = 0.020 kg/m.', ans: '(c) T = μv² = 0.020 × 180² = 648 N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (const x of [X0 - 16, X0 + L * K]) hatchRect(ctx, x, Y - 80, 16, 160, P.obj, P.objFill);
    const tr = t / SLOW, w = 120 * Math.PI, k = 2 * Math.PI / 3;
    const line = (f, col, lw, a = 1) => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= 300; i++) { const x = L * i / 300, y = f(x); if (i) ctx.lineTo(X0 + x * K, Y - y * KY); else ctx.moveTo(X0 + x * K, Y - y * KY); } ctx.stroke(); ctx.restore(); };
    if (ans) { line(x => 0.03 * Math.sin(k * x - w * tr), P.force, 1.5, 0.45); line(x => 0.03 * Math.sin(k * x + w * tr), P.leaf, 1.5, 0.45); }
    line(x => 0.06 * Math.sin(k * x) * Math.cos(w * tr), P.vel, 3);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([3, 4]); line(x => 0.06 * Math.sin(k * x), P.ink2, 1, 0.5); line(x => -0.06 * Math.sin(k * x), P.ink2, 1, 0.5); ctx.restore();
    dim(ctx, X0, X0 + L * K, Y + 110, P.ink2); label(ctx, '1.5 m (= λ/2)', X0 + L * K / 2, Y + 126, { align: 'center', weight: 700, size: 13 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) stationary', '(b) λ = 3 m, ν = 60 Hz, v = 180 m/s', '(c) T = 648 N'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['(a) Travelling or stationary?', '(b) The two travelling waves: wavelength, frequency, speed.', '(c) The tension in the string.']);
    note(ctx, 'time slowed 100 times; displacement exaggerated');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const F = 340, L1 = 25.5, L2 = 79.3, LAM = 2 * (L2 - L1), K = 4.4, X0 = 110, Y = 260, D = 12;
  const lenAt = t => 10 + 85 * clamp(t / (D - 1));
  const qStages = [
    { title: 'Moving the piston', dur: D, text: 'A 1 m tube, open at one end, has a movable piston at the other. A 340 Hz tuning fork sounds at the open end; resonance is heard at air-column lengths 25.5 cm and 79.3 cm.' },
    { title: 'What is asked', dur: 4, text: 'Estimate the speed of sound in air. (Neglect edge effects.)' },
  ];
  const stages = [
    { title: 'Resonances', dur: D, text: 'A column closed by the piston resonates when its length is λ/4, 3λ/4, …: a node at the piston, an antinode at the open end.', ans: 'Successive resonance lengths differ by λ/2.' },
    { title: 'Speed of sound', dur: 5, text: 'λ/2 = 79.3 − 25.5 = 53.8 cm.', ans: 'λ = 107.6 cm; v = 340 × 1.076 ≈ 366 m/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const l = ans && t >= stages[1].t0 ? L2 : lenAt(t);
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, X0, Y - 40, X0 + 100 * K, Y - 40); seg(ctx, X0, Y + 40, X0 + 100 * K, Y + 40);
    ctx.fillStyle = P.objFill2; ctx.fillRect(X0 + l * K, Y - 40, 14, 80); ctx.fillRect(X0 + l * K + 14, Y - 6, 100 * K - l * K, 12);
    ctx.fillStyle = P.ink2; ctx.fillRect(X0 - 40, Y - 34, 6, 30); ctx.fillRect(X0 - 28, Y - 34, 6, 30); ctx.fillRect(X0 - 40, Y - 6, 18, 6); ctx.fillRect(X0 - 33, Y, 4, 22); label(ctx, '340 Hz', X0 - 31, Y + 40, { align: 'center', size: 12, weight: 700 });
    const near = Math.min(Math.abs(l - L1), Math.abs(l - L2)), res = near < 1.2;
    if (ans || res) { const amp = res ? 30 : 30 * Math.max(0, 1 - near / 6); ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 2; for (const s of [1, -1]) { ctx.beginPath(); for (let i = 0; i <= 120; i++) { const x = l * i / 120, y = s * amp * Math.cos(2 * Math.PI * x / LAM); if (i) ctx.lineTo(X0 + x * K, Y - y); else ctx.moveTo(X0 + x * K, Y - y); } ctx.stroke(); } ctx.restore(); }
    if (res) label(ctx, 'resonance!', X0 + l * K / 2, Y - 60, { align: 'center', weight: 800, size: 15, color: P.accent });
    label(ctx, `air column ${l.toFixed(1)} cm`, X0, Y + 70, { weight: 700, size: 14 });
    for (const r of [L1, L2]) { vline(ctx, X0 + r * K, Y + 44, Y + 54, P.ink2, 1.5); label(ctx, `${r} cm`, X0 + r * K, Y + 90, { align: 'center', size: 12, color: P.ink2 }); }
    if (ans && t >= stages[1].t0) { dim(ctx, X0 + L1 * K, X0 + L2 * K, Y - 90, P.accent); label(ctx, 'λ/2 = 53.8 cm', X0 + (L1 + L2) / 2 * K, Y - 106, { align: 'center', weight: 800, size: 14, color: P.accent }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['Resonances at λ/4, 3λ/4: they differ by λ/2', 'λ = 107.6 cm; v = fλ ≈ 366 m/s'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The speed of sound in air at the temperature of the experiment.']);
    note(ctx, 'tube 4.4 px per cm; blue lines: displacement-amplitude envelope of the standing wave');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const L = 20, V = 340, K = 12, X0 = 80;
  const qStages = [
    { title: 'A 20 cm pipe', dur: 5, text: 'A pipe 20 cm long is closed at one end. A 430 Hz source sounds near it. Speed of sound 340 m/s.' },
    { title: 'What is asked', dur: 4, text: 'Which harmonic does it excite? Would it resonate if both ends were open?' },
  ];
  const stages = [
    { title: 'Closed at one end', dur: 5, text: 'Node at the closed end, antinode at the open end: L = λ/4 for the fundamental; only odd harmonics.', ans: 'ν₁ = v/4L = 340/0.80 = 425 Hz ≈ 430 Hz: the fundamental is excited.' },
    { title: 'Both ends open', dur: 5, text: 'Antinodes at both ends: L = λ/2 for the fundamental.', ans: 'ν₁ = v/2L = 850 Hz, then 1700 Hz…: nothing near 430 Hz, so no resonance.' },
  ];
  function pipe(ctx, y, closed, lamQ, t, label_) {
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; seg(ctx, X0, y - 30, X0 + L * K, y - 30); seg(ctx, X0, y + 30, X0 + L * K, y + 30); if (closed) { ctx.lineWidth = 6; seg(ctx, X0, y - 30, X0, y + 30); }
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 2; const a = 26 * Math.cos(t * 4);
    for (const s of [1, -1]) { ctx.beginPath(); for (let i = 0; i <= 100; i++) { const x = L * i / 100, env = closed ? Math.sin(Math.PI / 2 * x / L) : Math.cos(Math.PI * x / L); const yy = s * a * env; if (i) ctx.lineTo(X0 + x * K, y - yy); else ctx.moveTo(X0 + x * K, y - yy); } ctx.stroke(); } ctx.restore();
    label(ctx, label_, X0, y - 50, { weight: 700, size: 14 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    pipe(ctx, 140, true, 1, ans ? t : 0, 'closed at one end: fundamental (L = λ/4)');
    if (ans && t >= stages[1].t0) pipe(ctx, 300, false, 2, t, 'open at both ends: fundamental (L = λ/2)');
    dim(ctx, X0, X0 + L * K, 190, P.ink2); label(ctx, '20 cm', X0 + L * K / 2, 206, { align: 'center', weight: 700, size: 13 });
    const FX = f => 60 + f / 2000 * 500, FY = 450;
    hline(ctx, FX(0), FX(2000), FY, P.ink2, 1.5); for (const f of [0, 500, 1000, 1500, 2000]) { vline(ctx, FX(f), FY - 4, FY + 4, P.ink2, 1); label(ctx, `${f}`, FX(f), FY + 16, { align: 'center', size: 11, color: P.ink2 }); } label(ctx, 'frequency (Hz)', FX(1000), FY + 34, { align: 'center', size: 12, color: P.ink2 });
    vline(ctx, FX(430), FY - 40, FY, P.force, 3); label(ctx, '430 Hz source', FX(430), FY - 48, { align: 'center', weight: 700, size: 12, color: P.force });
    if (ans) { for (const f of [425, 1275]) { vline(ctx, FX(f), FY - 22, FY, P.vel, 2); } label(ctx, 'closed: 425, 1275…', FX(1275) + 6, FY - 26, { size: 12, color: P.vel }); if (t >= stages[1].t0) { for (const f of [850, 1700]) vline(ctx, FX(f), FY - 14, FY, P.leaf, 2); label(ctx, 'open: 850, 1700…', FX(1700) - 10, FY - 74, { align: 'right', size: 12, color: P.leaf }); } }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Closed: ν₁ = v/4L = 425 Hz: the fundamental', 'Open: ν₁ = v/2L = 850 Hz: no resonance at 430 Hz'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['Which harmonic of the pipe is excited by the 430 Hz source?', 'Would it resonate with both ends open?']);
    note(ctx, 'blue lines: displacement-amplitude envelope; pipe 12 px per cm');
  }
  return { qStages, stages, draw };
})();

//@@ q18
const SCENE = (() => {
  const SLOW = 4, D = 8;
  const qStages = [
    { title: 'Beats', dur: D, text: 'Two sitar strings A and B, slightly out of tune, give 6 beats per second. f_A = 324 Hz.' },
    { title: 'A slackened', dur: 4, text: 'The tension in A is reduced slightly; the beats drop to 3 per second. What is the frequency of B?' },
  ];
  const stages = [
    { title: '6 beats per second', dur: D, text: 'The beat frequency is the difference of the two frequencies: f_B = 324 ± 6 = 318 or 330 Hz.', ans: 'Two possibilities: 318 Hz or 330 Hz.' },
    { title: 'Lowering A', dur: 4, text: 'Less tension lowers A’s frequency. If B were 330 Hz the beats would rise; they fall to 3, so B is below A.', ans: 'f_B = 318 Hz (A drops to 321 Hz).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : (t < D ? 0 : 1), fb = st === 0 ? 6 : 3;
    const g = axes(ctx, { x: 50, y: 70, w: 520, h: 200, x0: 0, x1: 1, y0: -2.2, y1: 2.2, xt: [0.5, 1], xl: 't (s)', yl: 'loudness pattern' });
    const tr = t / SLOW;
    plot(ctx, g, s => 2 * Math.cos(Math.PI * fb * (s + tr)) * Math.sin(2 * Math.PI * 40 * s), 0, 1, P.vel, 1.5, 900);
    ctx.save(); ctx.setLineDash([4, 3]); plot(ctx, g, s => 2 * Math.abs(Math.cos(Math.PI * fb * (s + tr))), 0, 1, P.force, 1.5, 300); ctx.restore();
    label(ctx, `${fb} beats per second`, 300, 300, { align: 'center', weight: 800, size: 16, color: P.force });
    const FX = f => 70 + (f - 312) / 24 * 460, FY = 420;
    hline(ctx, FX(312), FX(336), FY, P.ink2, 1.5); for (let f = 312; f <= 336; f += 3) { vline(ctx, FX(f), FY - 4, FY + 4, P.ink2, 1); label(ctx, String(f), FX(f), FY + 16, { align: 'center', size: 11, color: P.ink2 }); }
    const fa = st === 0 ? 324 : 321; ball(ctx, FX(fa), FY, 7, P.vel); label(ctx, `A ${fa} Hz`, FX(fa), FY - 18, { align: 'center', weight: 700, size: 13, color: P.vel });
    if (ans) { for (const f of [318, 330]) { ctx.save(); ctx.globalAlpha = st === 1 && f === 330 ? 0.25 : 1; ball(ctx, FX(f), FY, 6, P.force); label(ctx, `B? ${f}`, FX(f), FY + 38, { align: 'center', weight: 700, size: 13, color: P.force }); ctx.restore(); } }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['f_B = 324 ± 6 = 318 or 330 Hz', 'Lowering A reduces the beats ⇒ f_B = 318 Hz'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['The frequency of string B.']);
    note(ctx, 'beat pattern slowed 4 times; the fast oscillation inside is not to scale');
  }
  return { qStages, stages, draw };
})();
