//@@ q05
const SCENE = (() => {
  const Y0 = 70, K = 25, LX = 180, LW = 260, D = 6;   // y = Y0 − K × E (E in eV, negative)
  const Y = E => Y0 - K * E, En = n => -13.6 / (n * n);
  const qStages = [
    { title: 'Hydrogen energy levels', dur: 5, text: 'A hydrogen atom in its ground level (n = 1) absorbs a photon and is excited to n = 4.' },
    { title: 'What is asked', dur: 4, text: 'The wavelength and frequency of the photon.' },
  ];
  const stages = [
    { title: 'Energy needed', dur: D, text: 'E_n = −13.6/n² eV: from −13.6 eV to −0.85 eV.', ans: 'ΔE = 13.6(1 − 1/16) = 12.75 eV.' },
    { title: 'The photon', dur: 5, text: 'λ = hc/ΔE, ν = ΔE/h.', ans: 'λ ≈ 1240/12.75 ≈ 97 nm; ν ≈ 3.1 × 10¹⁵ Hz.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    [1, 2, 3, 4, 5].forEach(n => { hline(ctx, LX, LX + LW, Y(En(n)), P.ink, 2); label(ctx, `n = ${n}`, LX - 12, Y(En(n)) + (n === 5 ? -8 : n === 4 ? 2 : 0), { align: 'right', weight: 700, size: 12 }); if (n <= 3 || n === 4) label(ctx, `${En(n).toFixed(2)} eV`, LX + LW + 10, Y(En(n)) + (n === 4 ? 4 : 0), { weight: 700, size: 12, color: P.ink2 }); });
    hline(ctx, LX, LX + LW, Y(0), P.ink2, 1, [4, 4]); label(ctx, '0 (n = ∞)', LX + LW + 10, Y(0) - 10, { size: 12, color: P.ink2 });
    const u = ans ? smooth(clamp((t - 1.5) / 2.5)) : 0, ex = LX + 140, ey = Y(En(1)) + (Y(En(4)) - Y(En(1))) * u;
    ball(ctx, ex, ey - 7, 7, P.vel);
    if (ans) {
      const st = stageAt(stages, t), pk = clamp(t / 1.5);
      if (u < 1) { ctx.save(); ctx.strokeStyle = P.acc; ctx.lineWidth = 2.5; ctx.beginPath(); for (let j = 0; j <= 40; j++) { const s = j / 40, x = 40 + (ex - 50) * pk * s, y = Y(En(1)) - 30 + 8 * Math.sin(s * 16 * Math.PI); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); label(ctx, 'photon', 60, Y(En(1)) - 54, { weight: 700, size: 12, color: P.acc }); }
      arrow(ctx, LX + 90, Y(En(1)), LX + 90, Y(En(4)) + 2, P.acc, { lw: 3, head: 12, alpha: u });
      if (u >= 1) label(ctx, 'ΔE = 12.75 eV', LX + 100, (Y(En(1)) + Y(En(4))) / 2, { weight: 800, size: 15, color: P.acc });
      if (st >= 1) label(ctx, 'λ ≈ 97 nm,  ν ≈ 3.1 × 10¹⁵ Hz', 300, 490, { align: 'center', weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['ΔE = 13.6(1 − 1/16) = 12.75 eV', 'λ ≈ 97 nm; ν ≈ 3.1 × 10¹⁵ Hz'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The wavelength and frequency of the photon that excites the atom from n = 1 to n = 4.']);
    note(ctx, 'energy levels to scale (25 px per eV)');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const CX = 260, CY = 270, R1 = 20, T1 = 0.6, V1 = 66;   // radius 20 px × n²; period 0.6 s × n³ (slowed); speed arrow 66 px / n
  const qStages = [
    { title: 'Bohr orbits', dur: 5, text: 'The electron of a hydrogen atom in the n = 1, 2 and 3 orbits of Bohr’s model.' },
    { title: 'What is asked', dur: 4, text: '(a) Its speed in each. (b) Its orbital period in each.' },
  ];
  const stages = [
    { title: 'Speeds', dur: 7, text: 'v_n = e²/(2ε₀nh) = v₁/n with v₁ ≈ 2.18 × 10⁶ m/s. Arrows to scale.', ans: '(a) 2.18 × 10⁶, 1.09 × 10⁶, 7.27 × 10⁵ m/s.' },
    { title: 'Periods', dur: 8, text: 'T = 2πr/v; r ∝ n² and v ∝ 1/n, so T ∝ n³.', ans: '(b) 1.53 × 10⁻¹⁶ s, 1.22 × 10⁻¹⁵ s, 4.12 × 10⁻¹⁵ s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ball(ctx, CX, CY, 7, P.force); label(ctx, '+', CX, CY, { align: 'center', weight: 800, size: 11, color: P.sheet, halo: false });
    const st = ans ? stageAt(stages, t) : -1;
    [1, 2, 3].forEach(n => {
      const r = R1 * n * n, col = [P.vel, P.leaf, P.acc][n - 1];
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, r, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
      const a = ans ? -2 * Math.PI * t / (T1 * n ** 3) : -Math.PI / 4 * n, x = CX + r * Math.cos(a), y = CY + r * Math.sin(a);
      ball(ctx, x, y, 6, col);
      if (ans) vec(ctx, x, y, (V1 / n) * Math.sin(a), -(V1 / n) * Math.cos(a), '', col, { lw: 2.5, head: 9 });
      label(ctx, `n = ${n}`, CX + r * 0.71 + 6, CY + r * 0.71 + 12, { weight: 800, size: 12, color: col });
      if (ans) { const y0 = 320 + n * 62; label(ctx, `n = ${n}:`, 480, y0 - 120, { weight: 800, size: 13, color: col }); label(ctx, ['2.18 × 10⁶', '1.09 × 10⁶', '7.27 × 10⁵'][n - 1] + ' m/s', 480, y0 - 102, { size: 12 }); if (st >= 1) label(ctx, 'T = ' + ['1.53 × 10⁻¹⁶', '1.22 × 10⁻¹⁵', '4.12 × 10⁻¹⁵'][n - 1] + ' s', 480, y0 - 86, { size: 12, color: P.accent }); }
    });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) v = v₁/n: 2.18, 1.09, 0.727 × 10⁶ m/s', '(b) T ∝ n³: 1.53 × 10⁻¹⁶, 1.22 × 10⁻¹⁵, 4.12 × 10⁻¹⁵ s'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['(a) The speed of the electron in n = 1, 2, 3.', '(b) The orbital period in each.']);
    note(ctx, 'radii to scale with each other (r ∝ n²); motion slowed by ~10¹⁶; speed arrows to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const Y0 = 70, K = 25, LX = 140, LW = 300, D = 6;
  const Y = E => Y0 - K * E, En = n => -13.6 / (n * n);
  const qStages = [
    { title: 'Electron bombardment', dur: 5, text: 'A 12.5 eV electron beam bombards hydrogen gas at room temperature (atoms in n = 1).' },
    { title: 'What is asked', dur: 4, text: 'What series of wavelengths will be emitted?' },
  ];
  const stages = [
    { title: 'How high can it go?', dur: D, text: 'Excitation energies: n = 2: 10.2 eV; n = 3: 12.09 eV; n = 4: 12.75 eV.', ans: '12.5 eV can reach n = 3, not n = 4.' },
    { title: 'Falling back', dur: 8, text: 'From n = 3 the atom returns directly (3 → 1) or in two steps (3 → 2 → 1).', ans: '102.6 nm (3 → 1) and 121.6 nm (2 → 1): Lyman; 656 nm (3 → 2): Balmer.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    [1, 2, 3, 4].forEach(n => { hline(ctx, LX, LX + LW, Y(En(n)), P.ink, 2); label(ctx, `n = ${n}`, LX - 12, Y(En(n)) + (n === 4 ? -6 : 0), { align: 'right', weight: 700, size: 12 }); label(ctx, `${En(n).toFixed(2)} eV`, LX + LW + 10, Y(En(n)) + (n === 4 ? -6 : n === 3 ? 6 : 0), { weight: 700, size: 12, color: P.ink2 }); });
    hline(ctx, LX, LX + LW, Y(0), P.ink2, 1, [4, 4]);
    if (ans) {
      const st = stageAt(stages, t), top = Y(-13.6 + 12.5);
      ctx.save(); ctx.fillStyle = P.accentSoft; ctx.globalAlpha = 0.7; ctx.fillRect(LX + 10, top, 40, Y(En(1)) - top); ctx.restore(); label(ctx, '12.5 eV', LX + 30, (top + Y(En(1))) / 2, { align: 'center', weight: 800, size: 11, color: P.accent });
      hline(ctx, LX + 4, LX + 56, top, P.accent, 2, [3, 2]);
      if (st >= 1) {
        const k = clamp((t - stages[1].t0) / 5);
        const lines = [[3, 1, LX + 100, '102.6 nm', P.acc], [3, 2, LX + 170, '656 nm', P.force], [2, 1, LX + 240, '121.6 nm', P.acc]];
        lines.forEach(([a, b, x, txt, col], i) => { const ki = clamp(k * 3 - i); if (ki <= 0) return; arrow(ctx, x, Y(En(a)), x, Y(En(a)) + (Y(En(b)) - Y(En(a))) * ki, col, { lw: 3, head: 11 }); if (ki >= 1) label(ctx, txt, x + 6, (Y(En(a)) + Y(En(b))) / 2 + (b === 2 ? -30 : 0), { weight: 800, size: 13, color: col }); });
        label(ctx, 'Lyman (UV): 102.6 nm, 121.6 nm   Balmer (red): 656 nm', 300, 490, { align: 'center', weight: 800, size: 13, color: P.accent });
      }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['12.5 eV reaches n = 3 only', '102.6, 121.6 nm (Lyman); 656 nm (Balmer)'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The series of wavelengths emitted.']);
    note(ctx, 'energy levels to scale (25 px per eV)');
  }
  return { qStages, stages, draw };
})();
