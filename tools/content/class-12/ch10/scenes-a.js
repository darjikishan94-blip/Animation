//@@ q01
const SCENE = (() => {
  const O = [300, 270], I = 40 * Math.PI / 180, N = 1.33, R = Math.asin(Math.sin(I) / N), L1 = 44, L2 = L1 / N, F = 0.6, W = 70;   // F: frequency shown (Hz)
  const di = [Math.sin(I), Math.cos(I)], dr = [Math.sin(I), -Math.cos(I)], dt = [Math.sin(R), Math.cos(R)];
  const qStages = [
    { title: 'Light meets water', dur: 6, text: 'Light of wavelength 589 nm in air falls on a water surface (n = 1.33). Part is reflected, part refracted.' },
    { title: 'What is asked', dur: 4, text: 'The wavelength, frequency and speed of (a) the reflected and (b) the refracted light.' },
  ];
  const stages = [
    { title: 'Reflected', dur: 6, text: 'The reflected light is still in air.', ans: '(a) λ = 589 nm, v = 3 × 10⁸ m/s, ν = c/λ ≈ 5.09 × 10¹⁴ Hz.' },
    { title: 'Refracted', dur: 7, text: 'Crossing into water the frequency stays the same; the speed drops to c/n, so the wavelength shrinks by n.', ans: '(b) ν = 5.09 × 10¹⁴ Hz, v ≈ 2.26 × 10⁸ m/s, λ = 589/1.33 ≈ 443 nm.' },
  ];
  function beam(ctx, d, lam, t, s0, s1, col) {
    const n = [-d[1], d[0]];
    for (let m = -20; m <= 20; m++) { const s = m * lam + (lam * F * t) % lam; if (s < s0 || s > s1) continue; const c = [O[0] + d[0] * s, O[1] + d[1] * s]; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.5; seg(ctx, c[0] - n[0] * W, c[1] - n[1] * W, c[0] + n[0] * W, c[1] + n[1] * W); ctx.restore(); }
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.5; ctx.fillRect(20, O[1], 580, 250); ctx.restore(); hline(ctx, 20, 600, O[1], P.ink, 2);
    label(ctx, 'air', 40, 60, { weight: 700, size: 14 }); label(ctx, 'water, n = 1.33', 40, O[1] + 24, { weight: 700, size: 14 });
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 610, O[1]); ctx.clip(); beam(ctx, di, L1, t, -260, 90, P.force); if (ans) beam(ctx, dr, L1, t, 0, 240, P.acc); ctx.restore();
    if (ans) { ctx.save(); ctx.beginPath(); ctx.rect(0, O[1], 610, 260); ctx.clip(); beam(ctx, dt, L2, t, -90, 230, P.vel); ctx.restore(); }
    ray(ctx, [[O[0] - di[0] * 250, O[1] - di[1] * 250], O], P.ink2, { dash: [4, 4], lw: 1 });
    label(ctx, '589 nm', O[0] - di[0] * 200 - 70, O[1] - di[1] * 200, { weight: 800, size: 14, color: P.force });
    if (ans) {
      const st = stageAt(stages, t);
      label(ctx, 'reflected: 589 nm, 3 × 10⁸ m/s', O[0] + 50, 60, { weight: 800, size: 13, color: P.acc });
      if (st >= 1) label(ctx, 'refracted: 443 nm, 2.26 × 10⁸ m/s', O[0] - 40, 500, { weight: 800, size: 13, color: P.vel });
      label(ctx, 'ν = 5.09 × 10¹⁴ Hz for all three', 40, 330, { weight: 800, size: 13, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) 589 nm, 5.09 × 10¹⁴ Hz, 3 × 10⁸ m/s', '(b) 443 nm, 5.09 × 10¹⁴ Hz, 2.26 × 10⁸ m/s'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The wavelength, frequency and speed of (a) the reflected light, (b) the refracted light.']);
    note(ctx, 'wavefront spacing to scale between the two media; motion slowed enormously');
  }
  return { qStages, stages, draw };
})();

//@@ q02
const SCENE = (() => {
  const D = 8;
  const qStages = [
    { title: 'Three sources of light', dur: 5, text: '(a) A point source. (b) A point source at the focus of a convex lens. (c) A distant star seen from the Earth.' },
    { title: 'What is asked', dur: 4, text: 'The shape of the wavefront in each case.' },
  ];
  const stages = [
    { title: 'Point source', dur: D, text: 'Light spreads equally in all directions: the wavefronts are spheres centred on the source.', ans: '(a) Spherical.' },
    { title: 'Source at the focus', dur: D, text: 'The lens makes the rays parallel; wavefronts are perpendicular to the rays.', ans: '(b) Plane.' },
    { title: 'Distant star', dur: D, text: 'The Earth intercepts a tiny piece of an enormous sphere.', ans: '(c) Plane, for all practical purposes.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1, ph = (t * 30) % 40;
    if (!ans) { label(ctx, '(a)', 40, 100, { weight: 800, size: 16 }); ball(ctx, 120, 130, 7, P.ke); label(ctx, '(b)', 40, 260, { weight: 800, size: 16 }); ball(ctx, 120, 290, 7, P.ke); lens(ctx, 240, 290, 60, true); label(ctx, 'F', 120, 312, { align: 'center', weight: 800, size: 13 }); label(ctx, '(c)', 40, 420, { weight: 800, size: 16 }); label(ctx, '★ far away', 80, 440, { weight: 700, size: 14 }); ball(ctx, 520, 440, 22, P.leaf); label(ctx, 'Earth', 520, 474, { align: 'center', size: 12 }); askedPanel(ctx, 630, 34, 300, ['The shape of the wavefront for (a), (b) and (c).']); return; }
    if (st === 0) { const c = [300, 270]; ball(ctx, ...c, 8, P.ke); for (let r = ph + 10; r < 200; r += 40) { ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(...c, r, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); } }
    if (st === 1) { const LX = 300, FX = 160, A = 270; ball(ctx, FX, A, 8, P.ke); label(ctx, 'F', FX, A + 24, { align: 'center', weight: 800, size: 13 }); lens(ctx, LX, A, 130, true);
      for (let r = ph + 10; r < LX - FX; r += 40) { const a = Math.asin(Math.min(1, 125 / r)); ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(FX, A, r, -Math.min(a, 1.2), Math.min(a, 1.2)); ctx.stroke(); ctx.restore(); }
      for (let x = LX + 20 + ph; x < 590; x += 40) vline(ctx, x, A - 125, A + 125, P.accent, 2);
      [-100, -50, 0, 50, 100].forEach(h => ray(ctx, [[FX, A], [LX, A + h], [590, A + h]], P.ke, { lw: 1, alpha: 0.6 })); }
    if (st === 2) { const R = 2000, cx = -R + 300; for (let r = R - 120 + ph; r < R + 300; r += 40) { ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, 270, r, -0.12, 0.12); ctx.stroke(); ctx.restore(); }
      ball(ctx, 520, 270, 26, P.leaf); label(ctx, 'Earth', 520, 314, { align: 'center', size: 12 }); label(ctx, 'from a star very far to the left', 40, 60, { weight: 700, size: 13 }); }
    label(ctx, ['(a) spherical', '(b) plane', '(c) plane'][st], 300, 500, { align: 'center', weight: 800, size: 17, color: P.accent });
    partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) Spherical', '(b) Plane', '(c) Plane'], st, false);
    note(ctx, 'sizes illustrative; orange: rays');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const SX = 110, SY = 270, DS = 40, X1 = 470, B = 40;   // slits at SX (40 px apart, not to scale); screen at X1; fringe spacing β = 0.3 cm drawn 40 px
  const qStages = [
    { title: 'Young’s double slit', dur: 6, text: 'Slits 0.28 mm apart; screen 1.4 m away. The 4th bright fringe is 1.2 cm from the central bright fringe.' },
    { title: 'What is asked', dur: 4, text: 'The wavelength of the light.' },
  ];
  const stages = [
    { title: 'Fringes', dur: 7, text: 'Bright fringes where the path difference is nλ: y_n = nλD/d.', ans: 'Fringe spacing β = 1.2/4 = 0.3 cm.' },
    { title: 'Wavelength', dur: 5, text: 'λ = βd/D.', ans: 'λ = 0.3 × 10⁻² × 0.28 × 10⁻³/1.4 = 6.0 × 10⁻⁷ m = 600 nm.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.ink; ctx.fillRect(SX - 3, 60, 6, SY - DS / 2 - 6 - 60); ctx.fillRect(SX - 3, SY - DS / 2 + 6, 6, DS - 12); ctx.fillRect(SX - 3, SY + DS / 2 + 6, 6, 480 - SY - DS / 2 - 6);
    for (let x = 30 + (t * 30) % 20; x < SX; x += 20) vline(ctx, x, 120, 420, P.accent, 1.5);
    [SY - DS / 2, SY + DS / 2].forEach(y => { ctx.save(); ctx.beginPath(); ctx.rect(SX, 40, X1 - SX, 460); ctx.clip(); ctx.strokeStyle = P.accent; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.2; for (let r = (t * 30) % 20; r < 380; r += 20) { ctx.beginPath(); ctx.arc(SX, y, r, -1.3, 1.3); ctx.stroke(); } ctx.restore(); });
    vline(ctx, X1, 50, 490, P.ink, 4); label(ctx, 'screen', X1, 36, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      for (let y = 60; y <= 480; y++) { const I = Math.cos(Math.PI * (y - SY) / B) ** 2; ctx.fillStyle = P.force; ctx.globalAlpha = I; ctx.fillRect(X1 + 6, y, 24, 1); ctx.globalAlpha = 1; }
      ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 2; ctx.beginPath(); for (let y = 60; y <= 480; y++) { const I = Math.cos(Math.PI * (y - SY) / B) ** 2, x = X1 + 36 + 50 * I; y === 60 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.restore();
      [0, 1, 2, 3, 4].forEach(n => label(ctx, String(n), X1 - 12, SY - n * B, { align: 'right', weight: 700, size: 12 }));
      vdim(ctx, X1 - 30, SY - 4 * B, SY, P.ink2); label(ctx, '1.2 cm', X1 - 38, SY - 2 * B, { align: 'right', weight: 800, size: 13, color: P.accent });
      if (t >= stages[1].t0) label(ctx, 'λ = 600 nm', 290, 50, { align: 'center', weight: 800, size: 17, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['β = 1.2 cm/4 = 0.3 cm', 'λ = βd/D = 600 nm'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The wavelength of the light used.']);
    label(ctx, 'd = 0.28 mm', SX - 10, SY + 4, { align: 'right', weight: 700, size: 12 });
    dim(ctx, SX, X1, 505, P.ink2); label(ctx, 'D = 1.4 m', (SX + X1) / 2, 492, { align: 'center', weight: 700, size: 12 });
    note(ctx, 'd and D not to scale; fringe pattern computed (to scale with itself)');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const G = { x: 50, y: 110, w: 300, h: 260, x0: 0, x1: 1.2, y0: 0, y1: 1.15, xt: [0.333, 1], yt: [0.25, 1], xl: 'Δ/λ', yl: 'I/K' }, D = 10;
  const qStages = [
    { title: 'Two-slit intensity', dur: 5, text: 'Where the path difference is λ, the intensity is K.' },
    { title: 'What is asked', dur: 4, text: 'The intensity where the path difference is λ/3.' },
  ];
  const stages = [
    { title: 'Adding two waves', dur: D, text: 'Path difference Δ gives phase difference φ = 2πΔ/λ. Two equal waves add like arrows at angle φ: I = 4I₀ cos²(φ/2).', ans: 'At Δ = λ, φ = 2π: the arrows line up, I = 4I₀ = K.' },
    { title: 'At λ/3', dur: 6, text: 'φ = 2π/3 = 120°: the resultant is half as long as at full strength.', ans: 'I = K cos²(60°) = K/4.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    if (!ans) { label(ctx, 'path difference λ → intensity K', 300, 200, { align: 'center', weight: 800, size: 16 }); label(ctx, 'path difference λ/3 → intensity ?', 300, 250, { align: 'center', weight: 800, size: 16 }); askedPanel(ctx, 630, 34, 300, ['The intensity where the path difference is λ/3.']); return; }
    const st = stageAt(stages, t), dl = st === 0 ? 1.0 * clamp(t / (D - 1)) : 1 / 3, g = axes(ctx, G);
    plot(ctx, g, x => Math.cos(Math.PI * x) ** 2, 0, st === 0 ? dl : 1.2, P.force);
    ball(ctx, g.X(dl), g.Y(Math.cos(Math.PI * dl) ** 2), 6, P.force);
    if (st >= 1) { ball(ctx, g.X(1), g.Y(1), 5, P.ink); label(ctx, 'K', g.X(1) + 10, g.Y(1) - 10, { weight: 800, size: 13 }); label(ctx, 'K/4', g.X(1 / 3) + 10, g.Y(0.25) - 12, { weight: 800, size: 14, color: P.accent }); hline(ctx, g.X(0), g.X(1 / 3), g.Y(0.25), P.accent, 1, [3, 3]); }
    const PX = 420, PY = 400, L = 70, ph = 2 * Math.PI * dl;
    vec(ctx, PX, PY, L, 0, '', P.vel, { lw: 3 }); vec(ctx, PX + L, PY, L * Math.cos(ph), -L * Math.sin(ph), '', P.acc, { lw: 3 });
    vec(ctx, PX, PY, L + L * Math.cos(ph), -L * Math.sin(ph), '', P.force, { lw: 2.5, head: 10 });
    label(ctx, `φ = ${(360 * dl).toFixed(0)}°`, PX + 40, PY + 30, { align: 'center', weight: 800, size: 14 }); label(ctx, 'phasors: two waves and their sum', 480, 320, { align: 'center', size: 12 });
    partsPanel(ctx, 630, 34, 300, 'Working', ['I = 4I₀ cos²(φ/2); Δ = λ gives K = 4I₀', 'Δ = λ/3: I = K cos²60° = K/4'], st, false);
    note(ctx, 'graph and phasors computed');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const X0 = 60, K = 0.17, Y1 = 170, Y2 = 300;   // x = X0 + K × (position in nm × D/d)
  const qStages = [
    { title: 'Two colours at once', dur: 5, text: 'Light of 650 nm and 520 nm passes through the same double slit.' },
    { title: 'What is asked', dur: 5, text: '(a) Where is the 3rd bright fringe of the 650 nm light? (b) Where do bright fringes of both first coincide?' },
  ];
  const stages = [
    { title: '650 nm fringes', dur: 5, text: 'Bright fringes at y_n = nλD/d.', ans: '(a) y₃ = 3 × 650 nm × D/d = 1950 nm × D/d (1.17 mm for d = 2 mm, D = 1.2 m).' },
    { title: 'Coincidence', dur: 6, text: 'Both bright where n₁ × 650 = n₂ × 520, i.e. n₁ : n₂ = 4 : 5.', ans: '(b) y = 4 × 650 = 5 × 520 = 2600 nm × D/d (1.56 mm).' },
  ];
  function row(ctx, y, lam, col, name, upto) {
    for (let x = X0; x <= 590; x++) { const s = (x - X0) / K, I = Math.cos(Math.PI * s / lam) ** 2; ctx.fillStyle = col; ctx.globalAlpha = I * (s <= upto ? 1 : 0.15); ctx.fillRect(x, y - 30, 1, 60); } ctx.globalAlpha = 1;
    label(ctx, name, X0 - 6, y, { align: 'right', weight: 800, size: 13, color: col });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1, up = ans ? 3200 * clamp(t / 4) : 3200;
    row(ctx, Y1, 650, P.force, '650', up); row(ctx, Y2, 520, P.leaf, '520', up);
    hline(ctx, X0, 590, 400, P.ink2, 1.5); [0, 1000, 2000, 3000].forEach(v => { vline(ctx, X0 + K * v, 395, 405, P.ink2, 1.2); label(ctx, String(v), X0 + K * v, 418, { align: 'center', size: 12, color: P.ink2 }); }); label(ctx, 'y in nm × D/d', 590, 440, { align: 'right', size: 12, color: P.ink2 });
    label(ctx, 'central', X0, 110, { align: 'center', size: 12 });
    if (ans) {
      if (st >= 0) { const x = X0 + K * 1950; vline(ctx, x, Y1 - 40, Y1 + 40, P.ink, 2, [4, 3]); label(ctx, '3rd: 1950', x, Y1 - 50, { align: 'center', weight: 800, size: 13, color: P.force }); }
      if (st >= 1) { const x = X0 + K * 2600; vline(ctx, x, Y1 - 40, Y2 + 40, P.accent, 3); label(ctx, '2600: both bright', x, Y2 + 56, { align: 'center', weight: 800, size: 14, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) 1950 nm × D/d (1.17 mm)', '(b) 2600 nm × D/d (1.56 mm)'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The distance of the third bright fringe of 650 nm from the central maximum.', '(b) The least distance where bright fringes of both wavelengths coincide.']);
    note(ctx, 'fringe patterns computed; the reprint gives no d or D (mm values use d = 2 mm, D = 1.2 m)');
  }
  return { qStages, stages, draw };
})();
