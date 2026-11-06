//@@ q01
const SCENE = (() => {
  const XL = 275, XR = 325, YT = 150, YB = 390, D = 10;   // plates 240 mm across, 50 mm apart: 1 px per mm
  const qStages = [
    { title: 'A capacitor charging', dur: 6, text: 'Circular plates of radius 12 cm, 5.0 cm apart, charged by a constant current of 0.15 A.' },
    { title: 'What is asked', dur: 5, text: '(a) C and the rate of change of V. (b) The displacement current. (c) Does the junction rule hold at each plate?' },
  ];
  const stages = [
    { title: 'Capacitance and dV/dt', dur: 6, text: 'C = ε₀πr²/d; dV/dt = I/C.', ans: '(a) C ≈ 8.0 pF; dV/dt = 0.15/8.0 × 10⁻¹² ≈ 1.9 × 10¹⁰ V/s.' },
    { title: 'Displacement current', dur: D, text: 'The field between the plates grows steadily; i_d = ε₀ dΦ_E/dt = C dV/dt.', ans: '(b) i_d = 0.15 A: the conduction current carries on across the gap.' },
    { title: 'Junction rule', dur: 5, text: 'Current into a plate (conduction) = current out across the gap (displacement).', ans: '(c) Yes, when the displacement current is counted.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.obj; ctx.fillRect(XL - 6, YT, 6, YB - YT); ctx.fillRect(XR, YT, 6, YB - YT);
    wire(ctx, [[40, 270], [XL - 6, 270]], P.ink, 3); wire(ctx, [[XR + 6, 270], [570, 270]], P.ink, 3);
    flow(ctx, [[40, 270], [XL - 6, 270]], t * 40, P.force, 24, 3.5); flow(ctx, [[XR + 6, 270], [570, 270]], t * 40, P.force, 24, 3.5);
    label(ctx, 'I = 0.15 A', 150, 250, { align: 'center', weight: 800, size: 14, color: P.force }); label(ctx, 'I = 0.15 A', 450, 250, { align: 'center', weight: 800, size: 14, color: P.force });
    vdim(ctx, XL - 30, YT, YB, P.ink2); label(ctx, '24 cm', XL - 38, 210, { align: 'right', weight: 700, size: 12 }); dim(ctx, XL, XR, YB + 22, P.ink2); label(ctx, '5.0 cm', 300, YB + 38, { align: 'center', weight: 700, size: 12 });
    const grow = ans ? clamp(t / (stages[1].t1)) : clamp(t / (qStages[0].dur + qStages[1].dur));
    const n = 2 + Math.round(9 * grow);
    for (let k = 0; k < n; k++) { const y = YT + 12 + k * (YB - YT - 24) / Math.max(1, n - 1); arrow(ctx, XL + 2, y, XR - 2, y, P.vel, { lw: 1.5, head: 7, alpha: 0.8 }); }
    if (ans) {
      const st = stageAt(stages, t);
      label(ctx, 'C ≈ 8.0 pF;  dV/dt ≈ 1.9 × 10¹⁰ V/s', 300, 120, { align: 'center', weight: 800, size: 14, color: P.vel });
      if (st >= 1) { ctx.save(); ctx.setLineDash([6, 4]); arrow(ctx, XL + 8, 450, XR - 8, 450, P.accent, { lw: 3, head: 10 }); ctx.restore(); label(ctx, 'i_d = 0.15 A', 300, 474, { align: 'center', weight: 800, size: 15, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) C ≈ 8.0 pF; dV/dt ≈ 1.9 × 10¹⁰ V/s', '(b) i_d = 0.15 A', '(c) Yes, counting i_d'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The capacitance and the rate of change of potential difference.', '(b) The displacement current across the plates.', '(c) Whether the junction rule is valid at each plate.']);
    note(ctx, ans ? 'side view, 1 px per mm; blue: E between the plates (more lines = stronger field)' : 'side view, 1 px per mm');
  }
  return { qStages, stages, draw };
})();

//@@ q02
const SCENE = (() => {
  const CX = 160, CY = 270, R = 150, r = 75, D = 10, WS = 1.6;   // 2.5 px per mm; ac shown slowed
  const G = { x: 340, y: 120, w: 220, h: 260, x0: 0, x1: 12, y0: 0, y1: 3.6, xt: [3, 6, 12], yt: [1.63, 3.25], xl: 'r (cm)', yl: 'B₀ (10⁻¹¹ T)' };
  const B0 = x => x <= 6 ? 3.254 * x / 6 : 3.254 * 6 / x;   // 10⁻¹¹ T; 3.25 at the rim
  const qStages = [
    { title: 'A capacitor on ac', dur: 5, text: 'Circular plates, R = 6.0 cm, C = 100 pF, on a 230 V supply at ω = 300 rad/s. Looking face-on at the plates.' },
    { title: 'What is asked', dur: 5, text: '(a) The rms conduction current. (b) Is it equal to the displacement current? (c) The amplitude of B 3.0 cm from the axis, between the plates.' },
  ];
  const stages = [
    { title: 'Conduction current', dur: 5, text: 'I_rms = V_rms/X_C = V_rms ωC.', ans: '(a) 230 × 300 × 100 × 10⁻¹² = 6.9 × 10⁻⁶ A. (b) Yes: i_d = i_c.' },
    { title: 'B between the plates', dur: D, text: 'Ampère–Maxwell: a circle of radius r encloses r²/R² of the displacement current, so B = μ₀ri/2πR².', ans: '(c) With I₀ = 9.76 μA: B₀ = μ₀ × 0.030 × I₀/(2π × 0.060²) ≈ 1.63 × 10⁻¹¹ T.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.objFill; ctx.beginPath(); ctx.arc(CX, CY, R, 0, 2 * Math.PI); ctx.fill(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    label(ctx, 'plate, R = 6.0 cm', CX, CY - R - 16, { align: 'center', weight: 700, size: 13 });
    const ph = Math.sin(WS * t), out = ph > 0;   // E ∝ sin ωt; B (below) ∝ dE/dt ∝ cos ωt, a quarter cycle ahead
    for (let x = CX - 120; x <= CX + 120; x += 40) for (let y = CY - 120; y <= CY + 120; y += 40) if (Math.hypot(x - CX, y - CY) < R - 12) fieldSym(ctx, x, y, out, 4 + 3 * Math.abs(ph), P.vel);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(CX, CY, r, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    ball(ctx, CX + r, CY, 5, P.ink); label(ctx, '3.0 cm', CX + r / 2, CY + 14, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const st = stageAt(stages, t);
      if (st >= 1) {
        const L = -40 * Math.cos(WS * t); [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2, x = CX + r * Math.cos(a), y = CY + r * Math.sin(a); vec(ctx, x, y, -L * Math.sin(a), L * Math.cos(a), '', P.accent, { lw: 3, head: 9 }); });
        const g = axes(ctx, G); plot(ctx, g, B0, 0, 12 * clamp((t - stages[1].t0) / 4), P.accent);
        if (t - stages[1].t0 > 4) { ball(ctx, g.X(3), g.Y(1.63), 5, P.accent); hline(ctx, g.X(0), g.X(3), g.Y(1.63), P.accent, 1, [3, 3]); }
        label(ctx, 'B₀ = 1.63 × 10⁻¹¹ T at 3 cm', 450, 430, { align: 'center', weight: 800, size: 14, color: P.accent });
      }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) I_rms = 6.9 μA; (b) yes, i_d = i_c', '(c) B₀ ≈ 1.63 × 10⁻¹¹ T'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The rms conduction current.', '(b) Whether it equals the displacement current.', '(c) The amplitude of B at 3.0 cm from the axis.']);
    note(ctx, ans ? 'face-on, 2.5 px per mm; blue: E between the plates (alternating, slowed); green: B; graph computed' : 'face-on, 2.5 px per mm; blue: E between the plates, alternating (slowed)');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const OX = 130, OY = 300, LZ = 420, LAM = 200, AE = 110, AB = 90;   // 200 px = one wavelength (10 m)
  const pr = (x, y, z) => [OX + z - 0.55 * y, OY - x + 0.35 * y];   // x: E axis (up), y: B axis (towards viewer, drawn down-left), z: travel
  const qStages = [
    { title: 'A plane wave along z', dur: 6, text: 'A plane electromagnetic wave travels in vacuum along the z-direction; its frequency is 30 MHz.' },
    { title: 'What is asked', dur: 4, text: 'The directions of E and B. The wavelength.' },
  ];
  const stages = [
    { title: 'E and B', dur: 8, text: 'Both fields are at right angles to the direction of travel and to each other; E × B points along +z. They rise and fall together.', ans: 'E along x, B along y (both in the xy-plane), E ⟂ B ⟂ z.' },
    { title: 'Wavelength', dur: 5, text: 'λ = c/ν.', ans: 'λ = 3 × 10⁸/30 × 10⁶ = 10 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    arrow(ctx, ...pr(0, 0, 0), ...pr(0, 0, LZ + 20), P.ink2, { lw: 1.5, head: 9 }); label(ctx, 'z', ...pr(0, 0, LZ + 34), { weight: 800, size: 15, italic: true });
    arrow(ctx, ...pr(0, 0, 0), ...pr(150, 0, 0), P.ink2, { lw: 1.5, head: 9 }); label(ctx, 'x', ...pr(160, 0, 4), { weight: 800, size: 15, italic: true });
    arrow(ctx, ...pr(0, 0, 0), ...pr(0, 170, 0), P.ink2, { lw: 1.5, head: 9 }); label(ctx, 'y', ...pr(-10, 186, 0), { weight: 800, size: 15, italic: true });
    if (!ans) { vec(ctx, ...pr(0, 0, 260), 80, 0, 'direction of travel', P.ink, { side: -1, at: 0.5, lw: 3 }); askedPanel(ctx, 630, 34, 300, ['The directions of the electric and magnetic field vectors.', 'The wavelength at 30 MHz.']); return; }
    const st = stageAt(stages, t), ph = 1.4 * t, f = z => Math.sin(2 * Math.PI * z / LAM - ph);
    for (let z = 0; z <= LZ; z += 10) { const e = AE * f(z), b = AB * f(z); ctx.save(); ctx.globalAlpha = 0.6; ctx.strokeStyle = P.force; ctx.lineWidth = 1.5; seg(ctx, ...pr(0, 0, z), ...pr(e, 0, z)); ctx.strokeStyle = P.vel; seg(ctx, ...pr(0, 0, z), ...pr(0, b, z)); ctx.restore(); }
    const ce = [], cb = []; for (let z = 0; z <= LZ; z += 4) { ce.push(pr(AE * f(z), 0, z)); cb.push(pr(0, AB * f(z), z)); }
    wire(ctx, ce, P.force, 2.5); wire(ctx, cb, P.vel, 2.5);
    label(ctx, 'E', ...pr(AE + 18, 0, 50), { weight: 800, size: 16, color: P.force }); label(ctx, 'B', ...pr(0, AB + 20, 100), { weight: 800, size: 16, color: P.vel });
    if (st >= 1) { const a = pr(-140, 0, 150), b = pr(-140, 0, 150 + LAM); dim(ctx, a[0], b[0], a[1], P.ink2); label(ctx, 'λ = 10 m', (a[0] + b[0]) / 2, a[1] + 16, { align: 'center', weight: 800, size: 15, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Answers', ['E ⟂ B, both ⟂ z (in the xy-plane)', 'λ = c/ν = 10 m'], st, false);
    note(ctx, 'E drawn along x (any direction in the xy-plane is possible); 20 px per m along z');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const OX = 130, OY = 290, LX = 420, LAM = 150, AE = 110, AB = 90;   // 150 px = one wavelength (6.0 m)
  const pr = (y, z, x) => [OX + x - 0.55 * z, OY - y + 0.35 * z];   // travel along x; E along y (up); B along z (drawn down-left)
  const qStages = [
    { title: 'A 50 MHz wave', dur: 5, text: 'An electromagnetic wave with E₀ = 120 N/C and ν = 50.0 MHz.' },
    { title: 'What is asked', dur: 5, text: '(a) B₀, ω, k and λ. (b) Expressions for E and B.' },
  ];
  const stages = [
    { title: 'B₀', dur: 5, text: 'In vacuum E₀ = cB₀.', ans: 'B₀ = 120/3 × 10⁸ = 4.0 × 10⁻⁷ T (400 nT).' },
    { title: 'ω, k, λ', dur: 6, text: 'ω = 2πν, k = ω/c, λ = c/ν.', ans: 'ω ≈ 3.14 × 10⁸ rad/s, k ≈ 1.05 rad/m, λ = 6.0 m.' },
    { title: 'Expressions', dur: 6, text: 'For travel along x with E along y:', ans: 'E = 120 sin(1.05x − 3.14 × 10⁸ t) ĵ N/C; B = 4.0 × 10⁻⁷ sin(1.05x − 3.14 × 10⁸ t) k̂ T.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    arrow(ctx, ...pr(0, 0, 0), ...pr(0, 0, LX + 20), P.ink2, { lw: 1.5, head: 9 }); label(ctx, 'x', ...pr(0, 0, LX + 34), { weight: 800, size: 15, italic: true });
    arrow(ctx, ...pr(0, 0, 0), ...pr(150, 0, 0), P.ink2, { lw: 1.5, head: 9 }); label(ctx, 'y', ...pr(160, 0, 4), { weight: 800, size: 15, italic: true });
    arrow(ctx, ...pr(0, 0, 0), ...pr(0, 170, 0), P.ink2, { lw: 1.5, head: 9 }); label(ctx, 'z', ...pr(-10, 186, 0), { weight: 800, size: 15, italic: true });
    const ph = 1.4 * t, f = x => Math.sin(2 * Math.PI * x / LAM - ph);
    const ce = [], cb = []; for (let x = 0; x <= LX; x += 4) { ce.push(pr(AE * f(x), 0, x)); cb.push(pr(0, AB * f(x), x)); }
    for (let x = 0; x <= LX; x += 10) { ctx.save(); ctx.globalAlpha = 0.6; ctx.strokeStyle = P.force; ctx.lineWidth = 1.5; seg(ctx, ...pr(0, 0, x), ...pr(AE * f(x), 0, x)); if (ans) { ctx.strokeStyle = P.vel; seg(ctx, ...pr(0, 0, x), ...pr(0, AB * f(x), x)); } ctx.restore(); }
    wire(ctx, ce, P.force, 2.5); label(ctx, 'E₀ = 120 N/C', ...pr(AE + 20, 0, 40), { weight: 800, size: 14, color: P.force });
    label(ctx, 'ν = 50.0 MHz', 590, 40, { align: 'right', weight: 700, size: 13 });
    if (ans) {
      const st = stageAt(stages, t);
      wire(ctx, cb, P.vel, 2.5); label(ctx, 'B₀ = 400 nT', ...pr(0, AB + 26, 110), { weight: 800, size: 14, color: P.vel });
      if (st >= 1) { const a = pr(-140, 0, 200), b = pr(-140, 0, 200 + LAM); dim(ctx, a[0], b[0], a[1], P.ink2); label(ctx, 'λ = 6.0 m', (a[0] + b[0]) / 2, a[1] + 16, { align: 'center', weight: 800, size: 15, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['B₀ = 4.0 × 10⁻⁷ T', 'ω = 3.14 × 10⁸ rad/s; k = 1.05 rad/m; λ = 6.0 m', 'E = 120 sin(1.05x − 3.14 × 10⁸t) ĵ; B = 4 × 10⁻⁷ sin(…) k̂'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) B₀, ω, k and λ.', '(b) Expressions for E and B.']);
    note(ctx, 'travel along x and E along y chosen for the picture; 25 px per m along x; amplitudes not to scale');
  }
  return { qStages, stages, draw };
})();
