//@@ q03
const SCENE = (() => {
  const LAM = 100, F = 5, X0 = 30, X1 = 590, PX = 400, Y0 = 120, Y1 = 260, D = 6;   // λ drawn 100 px; real time at 5 Hz
  const qStages = [
    { title: 'Compressions pass a point', dur: D, text: 'A sound wave moves to the right. Count the compressions passing the marked point.' },
    { title: 'What is asked', dur: 4, text: 'If 20 compressions pass in 4 s, what is the frequency?' },
  ];
  const stages = [
    { title: 'Count for 4 s', dur: 4.2, text: 'Frequency = compressions per second.', ans: '' },
    { title: 'Frequency', dur: 4, text: '20 in 4 s.', ans: 'ν = 20/4 = 5 Hz.' },
  ];
  function particles(ctx, t) {
    for (let x = X0; x < X1; x += 5) for (let j = 0; j < 7; j++) { const y = Y0 + 10 + j * 20 + ((x * 13) % 7), xx = x + 12 * Math.sin(2 * Math.PI * (x / LAM - F * t)); ctx.fillStyle = P.vel; ctx.fillRect(xx, y, 2.5, 2.5); }
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    particles(ctx, t);
    vline(ctx, PX, Y0 - 10, Y1 + 10, P.force, 2.5); label(ctx, 'point', PX, Y0 - 22, { align: 'center', weight: 700, size: 12, color: P.force });
    vec(ctx, 60, 320, 80, 0, 'wave travels', P.ink2, { side: -1, at: 0.5, lw: 2, head: 9 });
    if (ans) {
      const st = stageAt(stages, t), tt = Math.min(4, t), n = Math.floor(F * tt + 1e-9);
      label(ctx, `time ${tt.toFixed(1)} s   compressions passed: ${n}`, 60, 400, { weight: 800, size: 17 });
      if (st >= 1) label(ctx, 'ν = 20/4 = 5 Hz', 60, 440, { weight: 800, size: 18, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Count compressions per second', '(ii) 5 Hz'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The frequency, if 20 compressions pass in 4 s.']);
    note(ctx, 'real time at 5 Hz; particle displacement exaggerated');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const X0 = 80, S = 2000, Y = 260, D = 7;   // 2000 px per s
  const qStages = [
    { title: 'Sound in a room', dur: 5, text: 'The reflected sound reaches the ear 0.05 s after the sound is produced.' },
    { title: 'What is asked', dur: 4, text: 'Echo or reverberation? Justify.' },
  ];
  const stages = [
    { title: 'Persistence of hearing', dur: D, text: 'A sound’s sensation lasts about 0.1 s in the ear. A separate echo needs the reflection to arrive at least 0.1 s later.', ans: '' },
    { title: 'Compare', dur: 5, text: '0.05 s is less than 0.1 s: the reflection merges with the original.', ans: 'Reverberation, not an echo.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, X0, X0 + S * 0.25, Y, P.ink2, 1.5); [0, 0.05, 0.1, 0.15, 0.2].forEach(v => { vline(ctx, X0 + S * v, Y - 5, Y + 5, P.ink2, 1.2); label(ctx, `${v} s`, X0 + S * v, Y + 20, { align: 'center', size: 12 }); });
    const pulse = (x, col, txt, yy) => { ctx.save(); ctx.fillStyle = col; ctx.globalAlpha = 0.75; ctx.fillRect(x, yy, 30, 40); ctx.restore(); label(ctx, txt, x + 15, yy - 12, { align: 'center', weight: 700, size: 12, color: col }); };
    pulse(X0, P.vel, 'original', Y - 100); pulse(X0 + S * 0.05, P.force, 'reflection', Y - 160);
    if (ans) {
      const st = stageAt(stages, t);
      ctx.save(); ctx.fillStyle = P.accentSoft; ctx.globalAlpha = 0.6; ctx.fillRect(X0, Y - 50, S * 0.1, 30); ctx.restore(); label(ctx, 'sensation of the original lasts ~0.1 s', X0 + 4, Y - 66, { size: 12, weight: 700 });
      if (st >= 1) label(ctx, 'reflection arrives inside 0.1 s → reverberation', 300, 400, { align: 'center', weight: 800, size: 16, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Ear needs ≥ 0.1 s between sounds', '0.05 s < 0.1 s: reverberation'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Whether this is an echo or reverberation, with a reason.']);
    note(ctx, 'timeline 2000 px per s');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const W = { a: { lam: 120, amp: 26 }, b: { lam: 60, amp: 40 } };   // follows Fig. 10.30 (same scales)
  const qStages = [
    { title: 'Fig. 10.30', dur: 5, text: 'Density–distance graphs of two sound waves (a) and (b), drawn on the same scales.' },
    { title: 'What is asked', dur: 4, text: 'Which has (i) the greater wavelength, (ii) the smaller amplitude?' },
  ];
  const stages = [
    { title: 'Wavelength', dur: 5, text: 'Distance between neighbouring peaks.', ans: '(i) (a): its peaks are farther apart.' },
    { title: 'Amplitude', dur: 5, text: 'Height of a peak above the mean line.', ans: '(ii) (a): its peaks are lower.' },
  ];
  function graph(ctx, y, w, nm, st) {
    label(ctx, `(${nm})`, 30, y - 50, { weight: 800, size: 15 }); hline(ctx, 60, 580, y, P.ink2, 1, [4, 4]); arrow(ctx, 60, y + 70, 590, y + 70, P.ink2, { lw: 1.5, head: 8 }); arrow(ctx, 60, y + 70, 60, y - 70, P.ink2, { lw: 1.5, head: 8 });
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 2.5; ctx.beginPath(); for (let x = 60; x <= 570; x += 2) { const yy = y - w.amp * Math.sin(2 * Math.PI * (x - 60) / w.lam); x === 60 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore();
    if (st >= 0) { const xp = 60 + w.lam / 4; dim(ctx, xp, xp + w.lam, y - w.amp - 16, P.force); label(ctx, 'λ', xp + w.lam / 2, y - w.amp - 30, { align: 'center', weight: 800, size: 14, color: P.force, italic: true }); }
    if (st >= 1) { vdim(ctx, 60 + w.lam / 4 + w.lam * 2, y - w.amp, y, P.accent); label(ctx, 'amplitude', 60 + w.lam * 2.25 + 10, y - w.amp / 2, { weight: 700, size: 12, color: P.accent }); }
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1;
    graph(ctx, 150, W.a, 'a', st); graph(ctx, 390, W.b, 'b', st);
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(i) (a) has the greater wavelength', '(ii) (a) has the smaller amplitude'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['(i) Which wave has the greater wavelength.', '(ii) Which has the smaller amplitude.']);
    note(ctx, 'curves follow Fig. 10.30 (same scales for both)');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const C = [['green', 'leaf', 75, 34, 'A'], ['red', 'force', 100, 26, 'B'], ['blue', 'vel', 200, 14, 'C']], Y = 270;   // palette keys: P is filled in only when drawing   // λ in px, following Fig. 10.31
  const qStages = [
    { title: 'Fig. 10.31', dur: 5, text: 'Sound waves from three sources A, B and C, in the same medium. A has the highest frequency, C the lowest.' },
    { title: 'What is asked', dur: 4, text: 'Identify which curve is A, B and C.' },
  ];
  const stages = [
    { title: 'Same speed', dur: 6, text: 'In one medium v = νλ is the same for all: higher frequency → shorter wavelength.', ans: 'Shortest wavelength = A; longest = C.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 60, 580, Y, P.ink2, 1, [4, 4]); arrow(ctx, 60, Y + 90, 590, Y + 90, P.ink2, { lw: 1.5, head: 8 }); arrow(ctx, 60, Y + 90, 60, Y - 90, P.ink2, { lw: 1.5, head: 8 }); label(ctx, 'density', 66, Y - 100, { size: 12 }); label(ctx, 'distance', 580, Y + 106, { align: 'right', size: 12 });
    C.forEach(([n, key, lam, amp, tag], i) => { const col = P[key];
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); for (let x = 60; x <= 560; x += 2) { const yy = Y - amp * Math.sin(2 * Math.PI * (x - 60) / lam); x === 60 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore();
      if (ans) { const xp = 60 + lam * 1.25; label(ctx, tag, xp, Y - amp - 16, { align: 'center', weight: 800, size: 18, color: col }); label(ctx, `${tag}: ${['highest ν (shortest λ)', 'middle', 'lowest ν (longest λ)'][i]}`, 80, 420 + i * 26, { weight: 700, size: 14, color: col }); }
    });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['A = shortest λ (green), B = middle (red), C = longest λ (blue)'], 0, false);
    else askedPanel(ctx, 630, 34, 300, ['Which curve belongs to A, B and C.']);
    note(ctx, 'curves follow Fig. 10.31');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const G = { x: 60, y: 120, w: 480, h: 280, x0: 0, x1: 12, y0: -4, y1: 4, xt: [4, 8, 12], yt: [-3, 3], xl: 'distance (cm)', yl: 'density − mean' }, D = 8;
  const qStages = [
    { title: 'Draw a sound wave', dur: 5, text: 'Density amplitude 3 units; wavelength 4 cm.' },
    { title: 'What is asked', dur: 4, text: 'Draw the density–distance graph.' },
  ];
  const stages = [
    { title: 'The graph', dur: D, text: 'A smooth wave between +3 and −3 units about the mean density, repeating every 4 cm.', ans: 'Peaks (compressions) every 4 cm; troughs (rarefactions) midway.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, G);
    if (ans) { const u = 12 * clamp(t / (D - 2)); plot(ctx, g, x => 3 * Math.sin(2 * Math.PI * x / 4), 0, u, P.vel);
      if (u >= 12) { dim(ctx, g.X(1), g.X(5), g.Y(3) - 18, P.force); label(ctx, 'λ = 4 cm', g.X(3), g.Y(3) - 34, { align: 'center', weight: 800, size: 14, color: P.force }); vdim(ctx, g.X(9) + 20, g.Y(3), g.Y(0), P.accent); label(ctx, '3 units', g.X(9) + 28, g.Y(1.5), { weight: 800, size: 13, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Sine curve, amplitude 3 units, repeating every 4 cm'], 0, false); }
    else askedPanel(ctx, 630, 34, 300, ['A graph of the sound wave with density amplitude 3 units and wavelength 4 cm.']);
    note(ctx, '40 px per cm along the distance axis');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const SX = 300, SY = 70, BY = 470, T = 5;   // depth not to scale
  const qStages = [
    { title: 'Sonar', dur: 6, text: 'A ship sends a sonar pulse down; the echo from the wreck returns after 5 s. Speed in seawater 1525 m/s.' },
    { title: 'What is asked', dur: 4, text: 'How deep is the wreck?' },
  ];
  const stages = [
    { title: 'Down and back', dur: T + 1, text: 'In 5 s the pulse goes to the wreck and back: 1525 × 5 = 7625 m in all.', ans: '' },
    { title: 'Depth', dur: 4, text: 'Half the total path.', ans: 'd = 7625/2 ≈ 3812 m ≈ 3.8 km.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.water; ctx.fillRect(20, SY + 10, 570, BY - SY); hatchRect(ctx, 20, BY + 10, 570, 30, P.ink2, P.sand);
    ctx.save(); ctx.fillStyle = P.obj; ctx.beginPath(); ctx.moveTo(SX - 70, SY - 10); ctx.lineTo(SX + 70, SY - 10); ctx.lineTo(SX + 50, SY + 14); ctx.lineTo(SX - 50, SY + 14); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.fillStyle = P.ink2; ctx.translate(SX + 20, BY - 6); ctx.rotate(0.25); ctx.fillRect(-60, -16, 120, 26); ctx.restore(); label(ctx, 'wreck', SX + 110, BY - 20, { weight: 700, size: 12 });
    const tt = ans ? Math.min(T, t) : (t % 6) * (T / 5), f = tt / T, y = f <= 0.5 ? SY + 14 + (BY - 30 - SY - 14) * (f / 0.5) : BY - 30 - (BY - 30 - SY - 14) * ((f - 0.5) / 0.5);
    ctx.save(); ctx.strokeStyle = f <= 0.5 ? P.force : P.accent; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(SX, y, 18, f <= 0.5 ? 0.2 * Math.PI : 1.2 * Math.PI, f <= 0.5 ? 0.8 * Math.PI : 1.8 * Math.PI); ctx.stroke(); ctx.restore();
    clock(ctx, 60, 140, tt);
    if (ans) { const st = stageAt(stages, t); vdim(ctx, 520, SY + 14, BY - 20, P.ink2); if (st >= 1) label(ctx, 'd ≈ 3.8 km', 510, (SY + BY) / 2, { align: 'right', weight: 800, size: 16, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Working', ['Path = 1525 × 5 = 7625 m (down and up)', 'd ≈ 3812 m ≈ 3.8 km'], st, false); }
    else askedPanel(ctx, 630, 34, 300, ['The depth of the wreck.']);
    note(ctx, 'depth not to scale; real time');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const CX = 470, WX = 230, Y = 300, D = 8;   // 1.2 m = 240 px (200 px per m)
  const qStages = [
    { title: 'Parking sensor', dur: 5, text: 'A reversing car’s ultrasonic sensor (about 40 kHz) starts beeping when the obstacle is 1.2 m away. Speed in air 345 m/s.' },
    { title: 'What is asked', dur: 4, text: 'How long does the pulse take to reach the obstacle and return?' },
  ];
  const stages = [
    { title: 'Round trip', dur: D, text: 'The pulse travels 1.2 m to the wall and 1.2 m back: 2.4 m.', ans: 't = 2.4/345 ≈ 7.0 × 10⁻³ s ≈ 7 ms.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 20, Y + 30, 570, 20, P.ink2, P.sand); ctx.fillStyle = P.objFill2; ctx.fillRect(WX - 40, Y - 150, 40, 180); label(ctx, 'obstacle', WX - 20, Y - 162, { align: 'center', weight: 700, size: 12 });
    block(ctx, CX, Y - 40, 120, 50, 'car', P.force); ball(ctx, CX + 20, Y + 18, 12, P.ink); ball(ctx, CX + 100, Y + 18, 12, P.ink); ball(ctx, CX - 2, Y - 18, 4, P.ink);
    dim(ctx, WX, CX, Y + 80, P.ink2); label(ctx, '1.2 m', (WX + CX) / 2, Y + 96, { align: 'center', weight: 700, size: 13 });
    const f = ((t * 0.5) % 1), x = f < 0.5 ? CX - (CX - WX) * f * 2 : WX + (CX - WX) * (f - 0.5) * 2;
    ctx.save(); ctx.strokeStyle = f < 0.5 ? P.acc : P.accent; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + (f < 0.5 ? 0 : 0), Y - 18, 16, f < 0.5 ? 0.7 * Math.PI : -0.3 * Math.PI, f < 0.5 ? 1.3 * Math.PI : 0.3 * Math.PI); ctx.stroke(); ctx.restore();
    if (ans) { label(ctx, 'round trip 2.4 m → 7.0 ms', 330, 90, { align: 'center', weight: 800, size: 16, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Answer', ['t = 2 × 1.2/345 ≈ 7 ms'], 0, false); }
    else askedPanel(ctx, 630, 34, 300, ['The time for the ultrasonic pulse to reach the obstacle and return.']);
    note(ctx, '200 px per m; pulse slowed about 1000 times');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const X0 = 70, S = 40, LAM = 4, Y0 = 120, Y1 = 230;   // 40 px per cm
  const qStages = [
    { title: 'Fig. 10.32', dur: 5, text: 'The density of the medium for a sound wave: 8 cm is marked from the middle of one compression to the middle of the third. Speed 340 m/s.' },
    { title: 'What is asked', dur: 4, text: 'The wavelength and the frequency.' },
  ];
  const stages = [
    { title: 'Wavelength', dur: 6, text: 'Compression to next compression is one wavelength; the 8 cm spans two.', ans: 'λ = 8/2 = 4 cm.' },
    { title: 'Frequency', dur: 5, text: 'ν = v/λ.', ans: 'ν = 340/0.04 = 8500 Hz.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let x = X0 - 40; x < X0 + 12 * S; x += 4.5) for (let j = 0; j < 9; j++) { const xx = x + 14 * Math.sin(2 * Math.PI * (x - X0) / (LAM * S)), y = Y0 + j * 12 + ((x * 7) % 9); if (xx > 20 && xx < 590) { ctx.fillStyle = P.vel; ctx.fillRect(xx, y, 2.4, 2.4); } }
    const c1 = X0 + S * 2, c3 = c1 + S * 8; dim(ctx, c1, c3, Y0 - 24, P.ink); label(ctx, '8 cm', (c1 + c3) / 2, Y0 - 40, { align: 'center', weight: 800, size: 14 });
    if (ans) {
      const st = stageAt(stages, t);
      [0, 1, 2].forEach(k => { const x = c1 + k * S * LAM; vline(ctx, x, Y0 - 6, Y1 + 10, P.force, 2); label(ctx, 'C', x, Y1 + 26, { align: 'center', weight: 800, size: 13, color: P.force }); });
      dim(ctx, c1, c1 + S * LAM, Y1 + 50, P.accent); label(ctx, 'λ = 4 cm', c1 + S * LAM / 2, Y1 + 66, { align: 'center', weight: 800, size: 14, color: P.accent });
      if (st >= 1) label(ctx, 'ν = 340/0.04 = 8500 Hz', 300, 420, { align: 'center', weight: 800, size: 18, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['λ = 4 cm', 'ν = 8500 Hz'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The wavelength and frequency of the wave.']);
    note(ctx, '40 px per cm; C = middle of a compression; particle pattern illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const G = { x: 60, y: 110, w: 525, h: 280, x0: 0, x1: 7.5, y0: -1.3, y1: 1.3, xt: [2.5, 5], yt: [], xl: 'distance (cm)', yl: 'density' };
  const qStages = [
    { title: 'Fig. 10.33', dur: 5, text: 'Density–distance graphs of two sound waves A and B, both travelling at 345 m/s.' },
    { title: 'What is asked', dur: 4, text: 'The wavelength and frequency of each.' },
  ];
  const stages = [
    { title: 'Wavelengths', dur: 6, text: 'Read where each curve starts repeating.', ans: 'λ_A = 2.5 cm; λ_B = 5.0 cm.' },
    { title: 'Frequencies', dur: 5, text: 'ν = v/λ.', ans: 'ν_A = 345/0.025 = 13 800 Hz; ν_B = 345/0.050 = 6900 Hz.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, G);
    plot(ctx, g, x => Math.sin(2 * Math.PI * x / 2.5), 0, 7.5, P.force); plot(ctx, g, x => 0.5 * Math.sin(2 * Math.PI * x / 5), 0, 7.5, P.vel);
    label(ctx, 'A', g.X(0.6), g.Y(1) - 14, { align: 'center', weight: 800, size: 15, color: P.force }); label(ctx, 'B', g.X(6.8), g.Y(0.5) - 14, { align: 'center', weight: 800, size: 15, color: P.vel });
    if (ans) {
      const st = stageAt(stages, t);
      dim(ctx, g.X(0), g.X(2.5), g.Y(-1) + 22, P.force); label(ctx, 'λ_A = 2.5 cm', g.X(1.25), g.Y(-1) + 38, { align: 'center', weight: 800, size: 13, color: P.force });
      dim(ctx, g.X(0), g.X(5), g.Y(-1) + 60, P.vel); label(ctx, 'λ_B = 5.0 cm', g.X(2.5), g.Y(-1) + 76, { align: 'center', weight: 800, size: 13, color: P.vel });
      if (st >= 1) { label(ctx, 'ν_A = 13 800 Hz', 380, 470, { weight: 800, size: 15, color: P.force }); label(ctx, 'ν_B = 6900 Hz', 380, 496, { weight: 800, size: 15, color: P.vel }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['λ_A = 2.5 cm, λ_B = 5.0 cm', 'ν_A = 13 800 Hz, ν_B = 6900 Hz'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The wavelength of each wave.', 'Their frequencies.']);
    note(ctx, 'curves drawn from Fig. 10.33; 70 px per cm');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const SX = 90, CX = 520, YA = 190, YB = 330, D = 10;
  const qStages = [
    { title: 'Fig. 10.34', dur: 5, text: 'Identical sources: A in air, B under water, the same distance from a cliff. Both sound at the same time.' },
    { title: 'What is asked', dur: 4, text: 'The echo returns to A 4.5 times later than to B. Find v_air : v_water.' },
  ];
  const stages = [
    { title: 'Race to the cliff', dur: D, text: 'Both travel 2d. The water pulse is back while the air pulse has gone only a fraction of the way.', ans: '' },
    { title: 'Ratio', dur: 5, text: 'v = 2d/t, so v_air/v_water = t_B/t_A.', ans: 'v_air : v_water = 1 : 4.5 (= 2 : 9).' },
  ];
  function pulse(ctx, f, y, col) { const L = CX - SX, x = f <= 0.5 ? SX + L * f * 2 : CX - L * (f - 0.5) * 2; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 14, f <= 0.5 ? -0.3 * Math.PI : 0.7 * Math.PI, f <= 0.5 ? 0.3 * Math.PI : 1.3 * Math.PI); ctx.stroke(); ctx.restore(); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.water; ctx.fillRect(20, 260, 570, 200); ctx.fillStyle = P.leaf; ctx.fillRect(CX, 60, 70, 400); ctx.fillStyle = P.objFill2; ctx.fillRect(20, 210, SX - 10, 250);
    ball(ctx, SX, YA, 8, P.ink); label(ctx, 'A (air)', SX + 14, YA - 20, { weight: 800, size: 13 }); ball(ctx, SX, YB, 8, P.ink); label(ctx, 'B (water)', SX + 14, YB + 24, { weight: 800, size: 13 }); label(ctx, 'cliff', CX + 35, 50, { align: 'center', weight: 700, size: 12 });
    const TB = 2, tt = ans ? Math.min(4.5 * TB, t) : t % 9;   // B returns at 2 s (shown), A at 9 s
    pulse(ctx, Math.min(1, tt / (4.5 * TB)), YA, P.force); if (tt <= TB) pulse(ctx, tt / TB, YB, P.vel);
    if (tt >= TB) label(ctx, 'B back!', SX + 60, YB - 24, { weight: 800, size: 13, color: P.vel });
    clock(ctx, 60, 90, tt * 1.0, `t = ${(tt / TB).toFixed(1)} t_B`);
    if (ans) { const st = stageAt(stages, t); if (st >= 1) label(ctx, 'v_air : v_water = 1 : 4.5', 300, 490, { align: 'center', weight: 800, size: 17, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Answer', ['Same path 2d; t_A = 4.5 t_B', 'v_air : v_water = 1 : 4.5'], st, false); }
    else askedPanel(ctx, 630, 34, 300, ['The ratio of the speed of sound in air to that in water.']);
    note(ctx, 'return times in the ratio 4.5 : 1; speeds slowed down');
  }
  return { qStages, stages, draw };
})();
