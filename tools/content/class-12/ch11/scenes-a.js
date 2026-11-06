//@@ q02
const SCENE = (() => {
  const MY = 380, D = 6, EV = 120;   // 120 px per eV
  const qStages = [
    { title: 'Light on caesium', dur: D, text: 'Light of frequency 6 × 10¹⁴ Hz falls on caesium, whose work function is 2.14 eV. Electrons come out.' },
    { title: 'What is asked', dur: 4, text: '(a) The maximum kinetic energy. (b) The stopping potential. (c) The maximum speed.' },
  ];
  const stages = [
    { title: 'Photon energy', dur: 5, text: 'hν = 6.63 × 10⁻³⁴ × 6 × 10¹⁴ ≈ 3.98 × 10⁻¹⁹ J ≈ 2.49 eV.', ans: '' },
    { title: 'Kinetic energy', dur: D, text: '2.14 eV is used to free the electron; the rest is kinetic energy.', ans: '(a) K_max ≈ 2.49 − 2.14 ≈ 0.35 eV.' },
    { title: 'Stopping potential', dur: 5, text: 'A retarding potential V₀ stops the fastest electrons when eV₀ = K_max.', ans: '(b) V₀ ≈ 0.35 V.' },
    { title: 'Speed', dur: 5, text: '½mv² = K_max.', ans: '(c) v ≈ 3.5 × 10⁵ m/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.objFill2; ctx.fillRect(30, MY, 300, 60); label(ctx, 'caesium', 180, MY + 30, { align: 'center', weight: 800, size: 14 });
    const st = ans ? stageAt(stages, t) : -1, s = ans ? clamp(t / 3) : clamp((t % D) / 3);
    const px = 60 + 110 * s, py = 120 + (MY - 120) * s;
    if (s < 1) { ctx.save(); ctx.strokeStyle = P.ke; ctx.lineWidth = 2.5; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40, x = px - 60 * u * 0.6, y = py - 60 * u * 0.85 + 7 * Math.sin(u * 12 * Math.PI) * 0.6, xx = x + 7 * Math.sin(u * 12 * Math.PI) * 0.8; k ? ctx.lineTo(xx, y) : ctx.moveTo(xx, y); } ctx.stroke(); ctx.restore(); label(ctx, 'photon', px + 14, py - 40, { weight: 700, size: 12, color: P.ke }); }
    else { const e = Math.min(1, (ans ? t - 3 : (t % D) - 3) / 3), ex = 170 + 80 * e, ey = MY - 6 - 200 * e; ball(ctx, ex, ey, 7, P.vel); label(ctx, 'e⁻', ex + 12, ey, { weight: 800, size: 13, color: P.vel }); if (e > 0.2) vec(ctx, ex, ey, 20, -50, '', P.vel, { lw: 2.5, head: 9 }); }
    if (ans) {
      const BX = 400, BY = 470;   // energy bars (base at BY)
      const bar = (x, v, col, txt) => { ctx.fillStyle = col; ctx.fillRect(x, BY - v * EV, 40, v * EV); label(ctx, txt, x + 20, BY - v * EV - 12, { align: 'center', weight: 800, size: 12, color: col }); };
      bar(BX, 2.49, P.ke, 'hν 2.49 eV');
      if (st >= 1) { ctx.fillStyle = P.ink2; ctx.fillRect(BX + 60, BY - 2.14 * EV, 40, 2.14 * EV); label(ctx, 'φ₀ 2.14', BX + 108, BY - 2.14 * EV / 2, { weight: 800, size: 12 }); ctx.fillStyle = P.vel; ctx.fillRect(BX + 60, BY - 2.49 * EV, 40, 0.35 * EV); label(ctx, 'K 0.35', BX + 118, BY - 2.32 * EV, { weight: 800, size: 12, color: P.vel }); }
      hline(ctx, BX - 10, BX + 120, BY, P.ink2, 1);
      if (st >= 2) label(ctx, 'V₀ ≈ 0.35 V', 180, 80, { align: 'center', weight: 800, size: 15, color: P.accent });
      if (st >= 3) label(ctx, 'v ≈ 3.5 × 10⁵ m/s', 180, 104, { align: 'center', weight: 800, size: 15, color: P.vel });
      partsPanel(ctx, 630, 34, 300, 'Working', ['hν ≈ 2.49 eV', '(a) K_max ≈ 0.35 eV', '(b) V₀ ≈ 0.35 V', '(c) v ≈ 3.5 × 10⁵ m/s'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The maximum kinetic energy of the photoelectrons.', '(b) The stopping potential.', '(c) The maximum speed of the photoelectrons.']);
    note(ctx, ans ? 'energy bars 120 px per eV' : 'not to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const G = { x: 60, y: 90, w: 450, h: 340, x0: 0, x1: 12, y0: 0, y1: 2.5, xt: [4, 6, 10], yt: [0.82, 2.47], xl: 'ν (10¹⁴ Hz)', yl: 'V₀ (V)' }, NU0 = 4, SL = 0.412;   // 0.412 V per 10¹⁴ Hz
  const V = n => Math.max(0, SL * (n - NU0));
  const qStages = [
    { title: 'Cut-off voltage against frequency', dur: 5, text: 'The graph of cut-off voltage against frequency is a straight line of slope 4.12 × 10⁻¹⁵ V s.' },
    { title: 'What is asked', dur: 4, text: 'Calculate Planck’s constant.' },
  ];
  const stages = [
    { title: 'Why a straight line', dur: 6, text: 'eV₀ = hν − φ₀, so V₀ = (h/e)ν − φ₀/e: the slope is h/e.', ans: '' },
    { title: 'Read the slope', dur: 6, text: 'Every extra 10¹⁴ Hz raises V₀ by 0.412 V.', ans: 'h = e × slope = 1.6 × 10⁻¹⁹ × 4.12 × 10⁻¹⁵ ≈ 6.59 × 10⁻³⁴ J s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, G), u = ans ? 1 : clamp(t / 4);
    plot(ctx, g, V, 0, 10 * u, P.force);   // stop at the top of the axes
    label(ctx, 'slope 4.12 × 10⁻¹⁵ V s', g.X(7) - 20, g.Y(V(7)) - 30, { align: 'center', weight: 700, size: 13, color: P.force });
    if (ans) {
      const st = stageAt(stages, t);
      if (st >= 1) { const a = 6, b = 10; hline(ctx, g.X(a), g.X(b), g.Y(V(a)), P.accent, 2, [4, 3]); vline(ctx, g.X(b), g.Y(V(a)), g.Y(V(b)), P.accent, 2, [4, 3]); label(ctx, 'Δν = 4 × 10¹⁴ Hz', g.X(8), g.Y(V(a)) + 18, { align: 'center', weight: 800, size: 13, color: P.accent }); label(ctx, 'ΔV₀ = 1.65 V', g.X(b) + 10, g.Y((V(a) + V(b)) / 2), { weight: 800, size: 13, color: P.accent });
        label(ctx, 'h = e × slope ≈ 6.59 × 10⁻³⁴ J s', 300, 490, { align: 'center', weight: 800, size: 17, color: P.accent }); }
      label(ctx, 'ν₀ (not given)', g.X(NU0), g.Y(0) + 34, { align: 'center', size: 12, color: P.ink2 });
      partsPanel(ctx, 630, 34, 300, 'Working', ['V₀ = (h/e)ν − φ₀/e: slope h/e', 'h = 1.6 × 10⁻¹⁹ × 4.12 × 10⁻¹⁵ ≈ 6.59 × 10⁻³⁴ J s'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Planck’s constant from the slope.']);
    note(ctx, 'slope to scale; the threshold frequency (intercept) is illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const MY = 380, EV = 80, D = 6;   // 80 px per eV
  const qStages = [
    { title: '330 nm light on a metal', dur: D, text: 'Radiation of wavelength 330 nm falls on a metal of work function 4.2 eV.' },
    { title: 'What is asked', dur: 4, text: 'Will it give photoelectric emission?' },
  ];
  const stages = [
    { title: 'Photon energy', dur: 5, text: 'E = hc/λ ≈ 1240 eV nm/330 nm.', ans: 'E ≈ 3.76 eV.' },
    { title: 'Compare', dur: D, text: 'One photon gives its energy to one electron. 3.76 eV is less than the 4.2 eV needed.', ans: 'No emission, however bright the light. (Needs λ < 295 nm.)' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.objFill2; ctx.fillRect(30, MY, 280, 60); label(ctx, 'metal, φ₀ = 4.2 eV', 170, MY + 30, { align: 'center', weight: 800, size: 14 });
    for (let k = 0; k < 4; k++) { const s = ((t * 0.5 + k / 4) % 1), px = 60 + 110 * s, py = 120 + (MY - 120) * s; ctx.save(); ctx.strokeStyle = P.acc; ctx.lineWidth = 2; ctx.globalAlpha = 0.85; ctx.beginPath(); for (let j = 0; j <= 30; j++) { const u = j / 30, y = py - 50 * u * 0.85, x = px - 50 * u * 0.6 + 6 * Math.sin(u * 10 * Math.PI); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
    for (let k = 0; k < 5; k++) ball(ctx, 70 + k * 50, MY + 10, 5, P.vel);
    if (ans) {
      const st = stageAt(stages, t), BX = 400, BY = 470;
      ctx.fillStyle = P.acc; ctx.fillRect(BX, BY - 3.76 * EV, 50, 3.76 * EV); label(ctx, 'photon 3.76 eV', BX + 25, BY - 3.76 * EV - 12, { align: 'center', weight: 800, size: 12, color: P.acc });
      ctx.fillStyle = P.ink2; ctx.fillRect(BX + 80, BY - 4.2 * EV, 50, 4.2 * EV); label(ctx, 'needed 4.2 eV', BX + 105, BY - 4.2 * EV - 12, { align: 'center', weight: 800, size: 12 });
      hline(ctx, BX - 10, BX + 140, BY, P.ink2, 1);
      if (st >= 1) label(ctx, 'no photoelectrons', 170, 90, { align: 'center', weight: 800, size: 18, color: P.loss });
      partsPanel(ctx, 630, 34, 300, 'Working', ['E = 1240/330 ≈ 3.76 eV', '3.76 < 4.2 eV: no emission'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Whether the metal gives photoelectric emission for 330 nm radiation.']);
    note(ctx, ans ? 'energy bars 80 px per eV' : 'not to scale');
  }
  return { qStages, stages, draw };
})();
