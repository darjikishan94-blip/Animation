//@@ q03
const SCENE = (() => {
  const NR = 1e-3 / 32e-3 * 8.31, D = 8;
  const f1 = p => NR + 0.012 * p - 0.004 * p * p, f2 = p => NR - 0.05 * p + 0.012 * p * p;
  const qStages = [
    { title: 'Fig. 12.8', dur: D, text: 'PV/T against P for 1.00 × 10⁻³ kg of oxygen at two temperatures, T₁ and T₂, with a dotted horizontal line.' },
    { title: 'What is asked', dur: 5, text: '(a) What does the dotted line mean? (b) T₁ > T₂ or T₁ < T₂? (c) PV/T where the curves meet the axis? (d) For 1.00 g of hydrogen? What mass of hydrogen gives the same value?' },
  ];
  const stages = [
    { title: 'The dotted line', dur: 4, text: 'For an ideal gas PV/T = nR at every pressure: a horizontal line.', ans: '(a) Ideal-gas behaviour.' },
    { title: 'Which is hotter?', dur: 4, text: 'Real gases behave more nearly ideally at high temperature and low pressure.', ans: '(b) T₁ > T₂: the T₁ curve stays closer to the dotted line.' },
    { title: 'On the axis', dur: 4, text: 'As P → 0 every gas is ideal: PV/T → nR.', ans: '(c) nR = (1.00/32.0) × 8.31 ≈ 0.26 J/K.' },
    { title: 'Hydrogen', dur: 5, text: '1.00 g of hydrogen is 1/2.02 mol, many more moles than 1.00 g of oxygen.', ans: '(d) Not the same. Same nR needs 1/32 mol: m = 2.02/32.0 g ≈ 6.3 × 10⁻⁵ kg.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 90, y: 70, w: 450, h: 340, x0: 0, x1: 2.2, y0: 0.15, y1: 0.33, yt: [0.26], xl: 'P', yl: 'PV/T (J/K)' });
    hline(ctx, g.X(0), g.X(2.2), g.Y(NR), P.ink2, 1.5, [5, 4]);
    const u = clamp(t / (D - 1)) * 2.1;
    plot(ctx, g, f1, 0, u, P.force); plot(ctx, g, f2, 0, u, P.vel);
    if (u > 2) { label(ctx, 'T₁', g.X(2.1) + 6, g.Y(f1(2.1)), { weight: 800, size: 15, color: P.force }); label(ctx, 'T₂', g.X(2.1) + 6, g.Y(f2(2.1)), { weight: 800, size: 15, color: P.vel }); }
    if (ans) { const st = stageAt(stages, t); if (st >= 2) { ball(ctx, g.X(0), g.Y(NR), 6, P.accent); label(ctx, '≈ 0.26 J/K', g.X(0) + 10, g.Y(NR) - 16, { weight: 800, size: 14, color: P.accent }); } if (st === 0) label(ctx, 'ideal gas', g.X(1.6), g.Y(NR) - 12, { weight: 700, size: 13, color: P.ink2 }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) ideal-gas behaviour', '(b) T₁ > T₂', '(c) ≈ 0.26 J/K', '(d) no; 6.3 × 10⁻⁵ kg of H₂'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['(a) The meaning of the dotted plot. (b) T₁ > T₂ or T₁ < T₂? (c) PV/T where the curves meet on the y-axis. (d) The same for 1.00 g of hydrogen? If not, what mass of hydrogen gives that value?']);
    note(ctx, 'curve shapes follow Fig. 12.8; deviations from ideal exaggerated');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const P0 = 1.013e5, RHO = 1000, G = 9.8, H = 40, K = 8, SY = 110, BX = 300, D = 9, T1 = 285, T2 = 308;
  const vol = d => (P0 + RHO * G * H) / (P0 + RHO * G * d) * ((T2 - (T2 - T1) * d / H) / T1);
  const qStages = [
    { title: 'Bubble at the bottom', dur: 3, text: 'An air bubble of 1.0 cm³ is released at the bottom of a lake 40 m deep, where the water is at 12 °C.' },
    { title: 'Rising', dur: D - 3, text: 'It rises to the surface, where the water is at 35 °C.' },
    { title: 'What is asked', dur: 4, text: 'What is its volume at the surface?' },
  ];
  const stages = [
    { title: 'At the bottom', dur: 3, text: 'Pressure at 40 m = atmospheric + ρgh.', ans: 'P₁ = 1.013 × 10⁵ + 10³ × 9.8 × 40 ≈ 4.93 × 10⁵ Pa; T₁ = 285 K.' },
    { title: 'Rising and growing', dur: D - 3, text: 'As it rises, the pressure falls and the water warms: the bubble grows.', ans: 'At the top: P₂ = 1.013 × 10⁵ Pa, T₂ = 308 K.' },
    { title: 'Gas law', dur: 4, text: 'P₁V₁/T₁ = P₂V₂/T₂.', ans: 'V₂ = 1.0 × (4.93/1.013) × (308/285) ≈ 5.3 cm³.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.3; ctx.fillRect(60, SY, 480, H * K); ctx.globalAlpha = 1; hline(ctx, 40, 560, SY, P.vel, 2); ground(ctx, 60, 540, SY + H * K);
    vdim(ctx, 80, SY, SY + H * K, P.ink2); label(ctx, '40 m', 88, SY + H * K / 2, { weight: 700, size: 13 });
    label(ctx, 'surface, 35 °C', 540, SY - 14, { align: 'right', size: 13 }); label(ctx, 'bottom, 12 °C', 540, SY + H * K - 14, { align: 'right', size: 13 });
    const d = H * (1 - smooth(clamp((t - 3) / (D - 3.5)))), v = vol(d), r = 9 * Math.cbrt(v);
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 2; ctx.fillStyle = P.sheet; ctx.beginPath(); ctx.arc(BX, SY + d * K - r - 2, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    label(ctx, ans ? `${v.toFixed(2)} cm³` : (d > 39 ? '1.0 cm³' : ''), BX + r + 8, SY + d * K - r, { weight: 800, size: 14 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['P₁ ≈ 4.93 × 10⁵ Pa, T₁ = 285 K', 'P₂ = 1.013 × 10⁵ Pa, T₂ = 308 K', 'V₂ ≈ 5.3 cm³'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The volume of the bubble when it reaches the surface.']);
    note(ctx, '8 px per metre of depth; bubble radius ∝ ∛volume; temperature assumed to change steadily with depth while it rises');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const GASES = [['neon', 20.2, 4, P => P.vel], ['chlorine', 70.9, 6, P => P.leaf], ['UF₆', 352, 9, P => P.force]], N = 10, D = 10;
  const rnd = i => { const s = Math.sin(i * 57.31 + 1.7) * 24634.6; return s - Math.floor(s); };
  const qStages = [
    { title: 'Three vessels', dur: D, text: 'Three equal vessels at the same temperature and pressure contain neon (monatomic), chlorine (diatomic) and uranium hexafluoride (polyatomic).' },
    { title: 'What is asked', dur: 4, text: 'Do they contain equal numbers of molecules? Is v_rms the same? If not, where is it largest?' },
  ];
  const stages = [
    { title: 'Equal numbers', dur: 5, text: 'Equal V, P and T give equal numbers of molecules: N = PV/kT (Avogadro’s law).', ans: 'Yes, the same number of molecules in each.' },
    { title: 'Speeds', dur: 5, text: 'Same T means the same average kinetic energy ½mv²; heavier molecules move slower: v_rms = √(3kT/m).', ans: 'v_rms differs; neon, the lightest, is fastest.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    GASES.forEach(([n, m, r, col], j) => {
      const x0 = 30 + j * 190, y0 = 110, W = 170, H = 250, sp = 60 * Math.sqrt(20.2 / m);
      ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(x0, y0, W, H);
      for (let i = 0; i < N; i++) {
        const ax = rnd(i + j * 31), ay = rnd(i + j * 31 + 9), dx = rnd(i + j * 31 + 17) - 0.5, dy = rnd(i + j * 31 + 23) - 0.5, L = Math.hypot(dx, dy) || 1;
        const tri = s => { s = ((s % 2) + 2) % 2; return s < 1 ? s : 2 - s; };
        const x = x0 + r + (W - 2 * r) * tri(ax * 2 + dx / L * sp * t / (W - 2 * r)), y = y0 + r + (H - 2 * r) * tri(ay * 2 + dy / L * sp * t / (H - 2 * r));
        ball(ctx, x, y, r, col(P));
      }
      label(ctx, n, x0 + W / 2, y0 + H + 22, { align: 'center', weight: 800, size: 15 });
      label(ctx, `M ≈ ${m} u`, x0 + W / 2, y0 + H + 42, { align: 'center', size: 13 });
      if (ans && t >= stages[1].t0) label(ctx, `v_rms ∝ 1/√M: ${(Math.sqrt(20.2 / m)).toFixed(2)}`, x0 + W / 2, y0 + H + 62, { align: 'center', weight: 700, size: 13, color: P.accent });
      if (ans && t < stages[1].t0) label(ctx, `${N} molecules`, x0 + W / 2, y0 - 14, { align: 'center', weight: 700, size: 13, color: P.accent });
    });
    label(ctx, 'same V, same P, same T', 300, 60, { align: 'center', weight: 700, size: 15 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Equal numbers of molecules', 'v_rms not the same: largest for neon'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['Do the vessels contain equal numbers of molecules?', 'Is v_rms the same in the three cases? If not, where is it largest?']);
    note(ctx, 'a few molecules shown; speeds in the ratio of v_rms, enormously slowed; sizes illustrative');
  }
  return { qStages, stages, draw };
})();
