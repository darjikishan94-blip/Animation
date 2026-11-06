//@@ q05
const SCENE = (() => {
  const SX = 80, EX = 560, Y = 230, TT = 500, D = 8;                     // 500 s of light travel shown in 8 s
  const qStages = [
    { title: 'Light leaves the Sun', dur: D + 1, text: 'Light from the Sun takes 8 min 20 s to reach the Earth. A new unit of length is chosen so that the speed of light in vacuum is 1.' },
    { title: 'What is asked', dur: 4, text: 'What is the Sun–Earth distance in the new unit?' },
  ];
  const stages = [
    { title: 'The new unit', dur: 3, text: 'If light covers exactly 1 new unit of length every second, one new unit is the distance light travels in 1 s.', ans: '1 new unit = 3 × 10⁸ m (one light-second).' },
    { title: 'Light crosses', dur: D + 1, text: 'Count the seconds: each second the light advances one new unit.', ans: '8 min 20 s = 8 × 60 + 20 = 500 s.' },
    { title: 'The distance', dur: 4, text: 'Distance = speed × time = 1 unit per second × 500 s.', ans: 'Sun–Earth distance = 500 new units (= 1.5 × 10¹¹ m).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const t0 = ans ? 3 : 0, sec = clamp((t - t0 - 0.5) / D, 0, 1) * TT, x = SX + 50 + (EX - 14 - SX - 50) * sec / TT;
    ctx.fillStyle = P.ke; ctx.beginPath(); ctx.arc(SX, Y, 50, 0, Math.PI * 2); ctx.fill();
    label(ctx, 'Sun', SX, Y + 72, { align: 'center', weight: 700, size: 15 });
    ball(ctx, EX, Y, 14, P.water); label(ctx, 'Earth', EX, Y + 34, { align: 'center', weight: 700, size: 15 });
    if (sec > 0) {
      ctx.save(); ctx.strokeStyle = P.ke; ctx.lineWidth = 3; ctx.globalAlpha = 0.5; seg(ctx, SX + 50, Y, x, Y); ctx.restore();
      if (sec < TT) { ctx.fillStyle = P.ke; ctx.beginPath(); ctx.arc(x, Y, 6, 0, Math.PI * 2); ctx.fill(); }
    }
    vec(ctx, SX + 60, Y - 60, 70, 0, ans ? 'c = 1 unit per second' : 'speed of light = 1 (new unit)', P.vel, { side: -1, at: 0, align: 'left', size: 13 });
    const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    clock(ctx, 60, 60, sec, `t = ${m} min ${String(s).padStart(2, '0')} s`);
    if (ans) {
      const RY = 330, X = u => SX + 50 + (EX - 14 - SX - 50) * u / TT;
      hline(ctx, X(0), X(TT), RY, P.ink, 2);
      for (let u = 0; u <= TT; u += 10) vline(ctx, X(u), RY, RY + (u % 100 ? (u % 50 ? 5 : 9) : 14), P.ink2, 1);
      for (let u = 0; u <= TT; u += 100) label(ctx, String(u), X(u), RY + 28, { align: 'center', size: 13 });
      label(ctx, 'new units of length', X(TT / 2), RY + 52, { align: 'center', size: 13, color: P.ink2 });
      if (sec > 0) { ctx.fillStyle = P.accent; ctx.fillRect(X(0), RY - 8, X(sec) - X(0), 6); label(ctx, `${Math.round(sec)} units`, X(sec), RY - 20, { align: sec > 420 ? 'right' : 'center', weight: 700, size: 14, color: P.accent }); }
      if (sec >= TT) label(ctx, 'distance = 1 × 500 = 500 new units', 320, 450, { align: 'center', weight: 800, size: 18, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['1 new unit = distance light travels in 1 s', '8 min 20 s = 500 s', 'distance = 1 × 500 = 500 new units'], stages.findIndex(s => t < s.t1) < 0 ? 2 : stages.findIndex(s => t < s.t1), false);
    } else askedPanel(ctx, 630, 34, 300, ['The distance between the Sun and the Earth in the new unit of length.']);
    note(ctx, 'Sun and Earth not to scale; 500 s of travel shown in 8 s');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const MAG = 100, W = 3.5, K = 30, CX = 400, CY = 260, R = 150;        // image drawn at 30 px per mm
  const qStages = [
    { title: 'Under the microscope', dur: 6, text: 'A human hair is viewed through a microscope of magnification 100.' },
    { title: '20 observations', dur: 5, text: 'Over 20 observations, the average width of the hair in the field of view is 3.5 mm.' },
    { title: 'What is asked', dur: 4, text: 'Estimate the thickness of the hair.' },
  ];
  const stages = [
    { title: 'Magnified 100 times', dur: 6, text: 'Every length in the field of view is 100 times the real length.', ans: 'Magnification = image width / real width = 100.' },
    { title: 'The average image width', dur: 5, text: 'The average of 20 readings of the image width is 3.5 mm.', ans: 'Image width = 3.5 mm.' },
    { title: 'Real thickness', dur: 5, text: 'Divide the image width by the magnification.', ans: 'Thickness = 3.5 mm / 100 = 0.035 mm.' },
  ];
  function hair(ctx, x, w, y1, y2) {
    ctx.fillStyle = P.bark; ctx.beginPath();
    for (let y = y1; y <= y2; y += 4) ctx.lineTo(x - w / 2 + 2 * Math.sin(y / 30), y);
    for (let y = y2; y >= y1; y -= 4) ctx.lineTo(x + w / 2 + 2 * Math.sin(y / 30), y);
    ctx.closePath(); ctx.fill();
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    // the real hair on a slide (left)
    ctx.fillStyle = P.objFill; ctx.fillRect(40, 220, 130, 80); ctx.strokeStyle = P.obj; ctx.lineWidth = 1.5; ctx.strokeRect(40, 220, 130, 80);
    hair(ctx, 105, Math.max(1, W / MAG * K), 225, 295);
    label(ctx, 'the hair on a slide', 105, 320, { align: 'center', size: 13, color: P.ink2 });
    label(ctx, ans && t >= stages[1].t1 ? 'real width: 0.035 mm' : 'real width: ?', 105, 200, { align: 'center', weight: 700, size: 14, color: ans && t >= stages[1].t1 ? P.accent : P.ink });
    // zoom into the field of view
    const z = smooth(clamp(t / 4));
    arrow(ctx, 185, 260, 235, 260, P.ink2, { lw: 2, head: 10 }); label(ctx, '× 100', 210, 244, { align: 'center', weight: 700, size: 15 });
    ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fillStyle = P.sheet; ctx.fill(); ctx.clip();
    hair(ctx, CX, (W / MAG + (W - W / MAG) * z) * K, CY - R, CY + R); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    label(ctx, 'field of view', CX, CY - R - 14, { align: 'center', size: 13, color: P.ink2 });
    if (t > 5) {
      const y = CY + 40; dim(ctx, CX - W * K / 2, CX + W * K / 2, y, P.vel); label(ctx, '3.5 mm (average)', CX, y + 18, { align: 'center', weight: 700, size: 14, color: P.vel, halo: true });
    }
    const n = Math.min(20, Math.max(0, Math.floor((t - 6) * 4)));
    if (t > 6) { for (let i = 0; i < 20; i++) { ctx.fillStyle = i < n ? P.vel : P.grid; ctx.fillRect(250 + i * 15, 470, 10, 10); } label(ctx, `observations: ${n} of 20`, 250, 498, { size: 13, color: P.ink2 }); }
    if (ans) {
      if (t >= stages[1].t1) label(ctx, '3.5 mm ÷ 100 = 0.035 mm', CX, 60, { align: 'center', weight: 800, size: 18, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['Magnification = image width / real width', 'Image width = 3.5 mm (average of 20)', 'Real thickness = 3.5 / 100 = 0.035 mm'], t < stages[0].t1 ? 0 : t < stages[1].t1 ? 1 : 2, false);
    } else askedPanel(ctx, 630, 34, 300, ['The estimate of the thickness of the hair.']);
    note(ctx, 'image drawn at 30 px per mm: the real hair is then about one pixel wide');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const D = 8;
  const PARTS = ['(a) the diameter of a thread with a metre scale', '(b) more divisions on a screw gauge’s circular scale', '(c) 100 readings rather than 5'];
  const ANS = ['Wind n close turns, measure the length L they cover: d = L/n.', 'Not arbitrarily: the divisions get too fine to read, and backlash and thread errors remain.', 'Random errors average out: the mean of many readings is more reliable.'];
  const qStages = partStages(['(a) Thread and scale', '(b) Screw gauge', '(c) Repeated readings'], ['You are given a thread and a metre scale. How will you estimate the diameter of the thread?',
    'A screw gauge has a pitch of 1.0 mm and 200 divisions on the circular scale. Can its accuracy be raised arbitrarily by adding divisions?', 'Why should 100 measurements of a rod’s diameter give a more reliable estimate than 5?'], D);
  const stages = partStages(qStages.map(s => s.title), ['A thread is far too thin to measure directly with a millimetre scale. Many close turns side by side make a length large enough to measure.',
    'Least count = pitch / number of divisions = 1.0 mm / 200 = 0.005 mm. More divisions give a smaller least count on paper, but the divisions soon crowd too closely to read.',
    'Each reading has a random error, sometimes high, sometimes low. The mean of more readings wanders less and settles near the true value.'], D, ANS);
  const rnd = i => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
  function thread(ctx, u, ans) {
    const X0 = 60, X1 = 560, Y = 230, n = Math.min(20, Math.floor(u * 3.2)), d = 9, x0 = 200;
    ctx.fillStyle = P.wood; ctx.fillRect(X0, Y - 20, X1 - X0, 40); ctx.strokeStyle = P.obj; ctx.lineWidth = 1.5; ctx.strokeRect(X0, Y - 20, X1 - X0, 40);
    for (let x = X0 + 10, i = 0; x < X1; x += 10, i++) vline(ctx, x, Y - 20, Y - 20 + (i % 10 === 9 ? 14 : i % 5 === 4 ? 10 : 6), P.ink, 1);
    label(ctx, 'metre scale', X0, Y - 34, { size: 13, color: P.ink2 });
    ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = d - 2;
    for (let i = 0; i < n; i++) { const x = x0 + i * d + d / 2; seg(ctx, x - 2, Y - 24, x + 2, Y + 24); }
    ctx.restore();
    label(ctx, `${n} turns`, x0 + n * d / 2, Y + 44, { align: 'center', weight: 700, size: 14, color: P.force });
    if (ans && n >= 20) { dim(ctx, x0, x0 + 20 * d, Y - 50, P.vel); label(ctx, 'L', x0 + 10 * d, Y - 66, { align: 'center', italic: true, weight: 700, size: 16, color: P.vel }); label(ctx, 'diameter d = L / n', 300, 380, { align: 'center', weight: 800, size: 18, color: P.accent }); }
    note(ctx, 'number of turns illustrative');
  }
  function gauge(ctx, u, ans) {
    const CX = 300, CY = 260, R = 150, Ns = [50, 100, 200, 400, 800], N = Ns[Math.min(4, Math.floor(u / 1.6))];
    ctx.save(); ctx.fillStyle = P.objFill; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1;
    for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2, L = i % 10 === 0 ? 18 : i % 5 === 0 ? 12 : 8; seg(ctx, CX + R * Math.cos(a), CY + R * Math.sin(a), CX + (R - L) * Math.cos(a), CY + (R - L) * Math.sin(a)); }
    ctx.restore();
    label(ctx, `${N} divisions`, CX, CY - 10, { align: 'center', weight: 700, size: 18 });
    label(ctx, 'pitch 1.0 mm', CX, CY + 18, { align: 'center', size: 14, color: P.ink2 });
    if (ans) { label(ctx, `least count = 1.0 / ${N} = ${(1 / N).toFixed(5).replace(/0+$/, '')} mm`, CX, 460, { align: 'center', weight: 700, size: 16, color: N >= 400 ? P.force : P.accent }); if (N >= 400) label(ctx, 'divisions too close to read', CX, 486, { align: 'center', weight: 700, size: 14, color: P.force }); }
    note(ctx, 'the question’s gauge has 200 divisions; 50 to 800 are shown for comparison');
  }
  function readings(ctx, u, ans) {
    const g = axes(ctx, { x: 70, y: 70, w: 480, h: 330, x0: 0, x1: 100, y0: 0, y1: 4, xt: [5, 25, 50, 100], xl: 'n', yl: 'reading' });
    hline(ctx, g.X(0), g.X(100), g.Y(2), P.accent, 1.5, [6, 4]); label(ctx, 'true value', g.X(0) + 8, g.Y(2) + 16, { size: 12, color: P.accent });
    const n = Math.min(100, Math.floor(u * 15) + 1); let sum = 0; const mean = [];
    for (let i = 0; i < n; i++) { const r = 2 + (rnd(i) + rnd(i + 500) + rnd(i + 900) - 1.5) * 1.1; sum += r; mean.push(sum / (i + 1)); ctx.fillStyle = P.ink2; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(g.X(i + 1), g.Y(r), 3, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; }
    if (ans) { ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 3; poly(ctx, mean.map((m, i) => [g.X(i + 1), g.Y(m)])); ctx.restore(); label(ctx, 'running mean', g.X(n) + (n > 60 ? -6 : 6), g.Y(mean[n - 1]) - 16, { size: 13, weight: 700, color: P.vel, align: n > 60 ? 'right' : 'left' }); }
    label(ctx, `${n} readings`, 300, 470, { align: 'center', weight: 700, size: 15 });
    note(ctx, 'illustrative random readings, not data');
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const k = Math.min(2, Math.floor(t / D)), u = t - k * D;
    [thread, gauge, readings][k](ctx, u, ans);
    partsPanel(ctx, 630, 34, 300, ans ? 'Answers' : 'Answer the following', PARTS, k, ans, ANS);
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const LX = 130, SX = 560, Y = 250;
  const qStages = [
    { title: 'The slide', dur: 4, text: 'The photograph of a house occupies 1.75 cm² on a 35 mm slide.' },
    { title: 'Projected', dur: 5, text: 'The slide is projected onto a screen, where the house covers 1.55 m².' },
    { title: 'What is asked', dur: 4, text: 'What is the linear magnification of the projector–screen arrangement?' },
  ];
  const stages = [
    { title: 'Compare the areas', dur: 5, text: 'Put both areas in the same unit: 1.55 m² = 1.55 × 10⁴ cm².', ans: 'Areal magnification = 1.55 × 10⁴ / 1.75 ≈ 8.86 × 10³.' },
    { title: 'Areas grow as length squared', dur: 5, text: 'If every length is multiplied by m, every area is multiplied by m².', ans: 'm² = 8.86 × 10³.' },
    { title: 'Linear magnification', dur: 4, text: 'Take the square root.', ans: 'm = √(8.86 × 10³) ≈ 94.1.' },
  ];
  function house(ctx, x, y, s, col) {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(1, 2 * s); ctx.fillStyle = P.objFill;
    ctx.beginPath(); ctx.rect(x - 20 * s, y - 20 * s, 40 * s, 30 * s); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 26 * s, y - 20 * s); ctx.lineTo(x, y - 40 * s); ctx.lineTo(x + 26 * s, y - 20 * s); ctx.closePath(); ctx.fillStyle = P.force; ctx.fill(); ctx.stroke();
    ctx.fillStyle = P.wood; ctx.fillRect(x - 5 * s, y - 2 * s, 10 * s, 12 * s); ctx.restore();
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.fillRect(40, Y - 30, 70, 60); ctx.strokeRect(40, Y - 30, 70, 60);
    label(ctx, 'projector', 75, Y + 46, { align: 'center', size: 13, color: P.ink2 });
    ctx.fillStyle = P.sheet; ctx.fillRect(LX, Y - 18, 6, 36); ctx.strokeRect(LX, Y - 18, 6, 36);
    house(ctx, LX + 3, Y + 4, 0.35, P.obj); label(ctx, 'slide: 1.75 cm²', LX, Y - 34, { align: 'center', weight: 700, size: 13 });
    const p = smooth(clamp((t - 2) / 3));
    if (p > 0) {
      ctx.save(); ctx.fillStyle = P.ke; ctx.globalAlpha = 0.15 * p; ctx.beginPath(); ctx.moveTo(LX + 6, Y - 18); ctx.lineTo(LX + 6 + (SX - LX - 6) * p, Y - 18 - 152 * p); ctx.lineTo(LX + 6 + (SX - LX - 6) * p, Y + 18 + 152 * p); ctx.lineTo(LX + 6, Y + 18); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    ctx.fillStyle = P.sheet; ctx.fillRect(SX, Y - 175, 14, 350); ctx.strokeStyle = P.obj; ctx.strokeRect(SX, Y - 175, 14, 350);
    label(ctx, 'screen', SX + 7, Y + 194, { align: 'center', size: 13, color: P.ink2 });
    if (p >= 1) { house(ctx, SX - 70, Y + 40, 3.2, P.obj); label(ctx, 'on the screen: 1.55 m²', SX - 70, Y - 150, { align: 'center', weight: 700, size: 14 }); }
    if (ans) {
      const k = stages.findIndex(s => t < s.t1) < 0 ? 2 : stages.findIndex(s => t < s.t1);
      label(ctx, ['area ratio = 1.55 × 10⁴ cm² / 1.75 cm² ≈ 8.86 × 10³', 'area ratio = (linear magnification)²', 'linear magnification = √(8.86 × 10³) ≈ 94.1'][k], 300, 470, { align: 'center', weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['Areal magnification = 1.55 × 10⁴ / 1.75 ≈ 8.86 × 10³', 'Areal = (linear)²', 'Linear magnification ≈ 94.1'], k, false);
    } else askedPanel(ctx, 630, 34, 300, ['The linear magnification of the projector–screen arrangement.']);
    note(ctx, 'not to scale: a magnification of about 94 cannot be drawn on one screen');
  }
  return { qStages, stages, draw };
})();

//@@ q16
const SCENE = (() => {
  const TY = 470, TX0 = 200, TX1 = 400, NT = [300, 408], FH = [300, 46], D = 10;   // seen from above: near tree, far hill
  const qStages = [
    { title: 'Looking out of a train', dur: D, text: 'You look out of the window of a fast-moving train. Nearby trees seem to rush backwards; a distant hill seems almost still.' },
    { title: 'What is asked', dur: 4, text: 'Explain why nearby objects seem to move rapidly backwards while distant ones seem stationary.' },
  ];
  const stages = [
    { title: 'Lines of sight', dur: D, text: 'We judge motion by how fast the direction to an object changes. Follow the line of sight from the passenger to the tree and to the hill as the train moves.', ans: 'The line of sight to the near tree swings through a large angle; the one to the hill hardly turns.' },
    { title: 'Why', dur: 6, text: 'For the same distance travelled, the change of direction is about (distance moved) / (distance of the object). Far objects change direction very little.', ans: 'Nearby objects seem to rush back; distant ones seem fixed (or to move with us).' },
  ];
  const ang = (ox, oy, p) => Math.atan2(p[0] - ox, oy - p[1]) * 180 / Math.PI;
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    label(ctx, 'seen from above', 24, 30, { size: 13, color: P.ink2 });
    const u = clamp(t / D), ox = TX0 + (TX1 - TX0) * u, oy = TY - 18;
    hline(ctx, 20, 600, TY + 8, P.ink2, 2); hline(ctx, 20, 600, TY + 16, P.ink2, 2);
    ctx.fillStyle = P.objFill; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.fillRect(ox - 60, TY - 22, 120, 26); ctx.strokeRect(ox - 60, TY - 22, 120, 26);
    ball(ctx, ox, oy + 8, 5, P.force); vec(ctx, ox + 66, TY - 9, 40, 0, 'train', P.vel, { side: -1, at: 0.5, size: 12 });
    // a near tree and a distant hill
    ctx.fillStyle = P.leaf; ctx.beginPath(); ctx.arc(NT[0], NT[1], 16, 0, Math.PI * 2); ctx.fill(); label(ctx, 'nearby tree', NT[0] + 22, NT[1], { size: 13, weight: 700 });
    ctx.fillStyle = P.bark; ctx.beginPath(); ctx.moveTo(FH[0] - 60, FH[1] + 20); ctx.lineTo(FH[0], FH[1] - 25); ctx.lineTo(FH[0] + 60, FH[1] + 20); ctx.closePath(); ctx.fill(); label(ctx, 'distant hill', FH[0] + 66, FH[1] + 2, { size: 13, weight: 700 });
    ctx.save(); ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]);
    ctx.strokeStyle = P.leaf; seg(ctx, ox, oy, NT[0], NT[1]); ctx.strokeStyle = P.bark; seg(ctx, ox, oy, FH[0], FH[1]); ctx.restore();
    if (ans) {
      const a0n = ang(TX0, oy, NT), an = ang(ox, oy, NT), a0f = ang(TX0, oy, FH), af = ang(ox, oy, FH);
      ctx.save(); ctx.globalAlpha = 0.35; ctx.lineWidth = 1; ctx.strokeStyle = P.leaf; seg(ctx, TX0, oy, NT[0], NT[1]); ctx.strokeStyle = P.bark; seg(ctx, TX0, oy, FH[0], FH[1]); ctx.restore();
      label(ctx, `direction to the tree turned by ${Math.abs(an - a0n).toFixed(0)}°`, 24, 150, { weight: 700, size: 15, color: P.leaf });
      label(ctx, `direction to the hill turned by ${Math.abs(af - a0f).toFixed(0)}°`, 24, 176, { weight: 700, size: 15, color: P.bark });
      partsPanel(ctx, 630, 34, 300, 'Explanation', ['Motion is judged by how fast the line of sight turns', 'Near tree: large turn in a short time, so it seems to rush backwards', 'Distant hill: tiny turn, so it seems still (or to keep pace with us)'], t < D ? (t < D / 2 ? 0 : 1) : 2, false);
    } else askedPanel(ctx, 630, 34, 300, ['Why nearby trees and houses seem to move rapidly opposite to the train, while hill tops, the Moon and the stars seem stationary.']);
    note(ctx, 'distances and speed illustrative; the hill is really much farther than can be drawn');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const M = 2.0e30, R = 7.0e8, V = 4 / 3 * Math.PI * R ** 3, RHO = M / V;   // ≈ 1.39 × 10³ kg m⁻³
  const LX = 60, LW = 500, LY = 400, L0 = -2, L1 = 5, X = r => LX + (Math.log10(r) - L0) / (L1 - L0) * LW;
  const qStages = [
    { title: 'A ball of hot plasma', dur: 5, text: 'The Sun’s core is above 10⁷ K and its surface about 6000 K: nothing there is solid or liquid. Mass 2.0 × 10³⁰ kg, radius 7.0 × 10⁸ m.' },
    { title: 'What is asked', dur: 5, text: 'Is the Sun’s mass density in the range of solids and liquids, or of gases?' },
  ];
  const stages = [
    { title: 'The Sun’s volume', dur: 4, text: 'Treat the Sun as a sphere.', ans: 'V = (4/3)πR³ = (4/3) × 3.14 × (7.0 × 10⁸)³ ≈ 1.44 × 10²⁷ m³.' },
    { title: 'Its mean density', dur: 5, text: 'Density = mass / volume.', ans: 'ρ = 2.0 × 10³⁰ / 1.44 × 10²⁷ ≈ 1.4 × 10³ kg m⁻³.' },
    { title: 'Where it falls', dur: 5, text: 'Compare with the densities of gases, liquids and solids.', ans: 'Like liquids and solids, not gases: gravity squeezes the hot gas to a high density.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const pulse = 1 + 0.02 * Math.sin(t * 3);
    ctx.fillStyle = P.ke; ctx.beginPath(); ctx.arc(300, 170, 110 * pulse, 0, Math.PI * 2); ctx.fill();
    label(ctx, 'mass 2.0 × 10³⁰ kg', 300, 160, { align: 'center', weight: 700, size: 15, color: P.ink, halo: true });
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; seg(ctx, 300, 185, 410, 185); ctx.restore(); label(ctx, 'R = 7.0 × 10⁸ m', 355, 200, { align: 'center', weight: 700, size: 13, halo: true });
    // density scale
    ctx.fillStyle = P.drag; ctx.globalAlpha = 0.18; ctx.fillRect(X(0.05), LY - 18, X(20) - X(0.05), 36); ctx.globalAlpha = 1;
    ctx.fillStyle = P.vel; ctx.globalAlpha = 0.18; ctx.fillRect(X(500), LY - 18, X(25000) - X(500), 36); ctx.globalAlpha = 1;
    label(ctx, 'gases', (X(0.05) + X(20)) / 2, LY - 32, { align: 'center', weight: 700, size: 14, color: P.drag });
    label(ctx, 'liquids and solids', (X(500) + X(25000)) / 2, LY - 32, { align: 'center', weight: 700, size: 14, color: P.vel });
    hline(ctx, LX, LX + LW, LY + 18, P.ink, 1.5);
    for (let e = L0; e <= L1; e++) { vline(ctx, X(10 ** e), LY + 18, LY + 26, P.ink2, 1.2); label(ctx, `10${['⁻²', '⁻¹', '⁰', '¹', '²', '³', '⁴', '⁵'][e + 2]}`, X(10 ** e), LY + 40, { align: 'center', size: 13 }); }
    label(ctx, 'density (kg m⁻³), logarithmic scale', LX + LW / 2, LY + 62, { align: 'center', size: 12, color: P.ink2 });
    for (const [r, n] of [[1.2, 'air'], [1000, 'water'], [11300, 'lead']]) { vline(ctx, X(r), LY - 10, LY + 18, P.ink2, 1.5); label(ctx, n, X(r), LY + 2, { align: 'center', size: 12, color: P.ink2, halo: true }); }
    if (ans && t >= stages[1].t0 + 2) {
      const x = X(RHO);
      arrow(ctx, x, LY - 90, x, LY - 22, P.accent, { lw: 3, head: 10 });
      label(ctx, 'Sun: 1.4 × 10³ kg m⁻³', x, LY - 102, { align: 'center', weight: 800, size: 15, color: P.accent });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['V = (4/3)πR³ ≈ 1.44 × 10²⁷ m³', 'ρ = M/V ≈ 1.4 × 10³ kg m⁻³', 'In the range of liquids and solids'], stages.findIndex(s => t < s.t1) < 0 ? 2 : stages.findIndex(s => t < s.t1), false);
    else askedPanel(ctx, 630, 34, 300, ['Whether the Sun’s mass density lies in the range of solids and liquids, or of gases. Check using its mass and radius.']);
    note(ctx, 'air, water and lead are reference densities, not part of the question');
  }
  return { qStages, stages, draw };
})();
