//@@ q01
const SCENE = (() => {
  const D = 8, W = 2 * Math.PI * 50, V0 = 220 * Math.SQRT2, I0 = 2.2 * Math.SQRT2;
  const GV = { x: 60, y: 200, w: 480, h: 130, x0: 0, x1: 40, y0: -320, y1: 320, xt: [10, 20, 30, 40], yt: [-311, 311], xl: 't (ms)', yl: 'v (V), i × 50 (A)' };
  const GP = { x: 60, y: 370, w: 480, h: 120, x0: 0, x1: 40, y0: 0, y1: 1000, xt: [], yt: [484, 968], xl: 't', yl: 'p (W)' };
  const qStages = [
    { title: 'A resistor on ac', dur: 5, text: 'A 100 Ω resistor is connected to a 220 V, 50 Hz ac supply.' },
    { title: 'What is asked', dur: 4, text: '(a) The rms current. (b) The net power over a full cycle.' },
  ];
  const stages = [
    { title: 'In phase', dur: D, text: 'For a resistor i = v/R at every instant: they rise and fall together.', ans: '(a) I_rms = 220/100 = 2.2 A (peak 3.11 A).' },
    { title: 'Power', dur: 5, text: 'p = vi is never negative; its average is V_rms I_rms.', ans: '(b) P = 220 × 2.2 = 484 W.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    wire(ctx, [[120, 60], [120, 40], [280, 40]]); resistor(ctx, 280, 40, 380, 40); wire(ctx, [[380, 40], [480, 40], [480, 140], [120, 140], [120, 116]]); acSource(ctx, 120, 90, 22);
    label(ctx, '100 Ω', 330, 18, { align: 'center', weight: 700, size: 13 }); label(ctx, '220 V, 50 Hz', 150, 90, { weight: 700, size: 13 });
    if (ans) {
      const st = stageAt(stages, t), te = 40 * clamp(t / (D - 1));
      const g = axes(ctx, GV); plot(ctx, g, s => V0 * Math.sin(W * s / 1000), 0, te, P.vel); plot(ctx, g, s => 50 * I0 * Math.sin(W * s / 1000), 0, te, P.force);
      label(ctx, 'v', 550, 210, { weight: 800, size: 14, color: P.vel, italic: true }); label(ctx, 'i × 50', 550, 232, { weight: 800, size: 14, color: P.force });
      const h = axes(ctx, GP); plot(ctx, h, s => V0 * I0 * Math.sin(W * s / 1000) ** 2, 0, te, P.pe);
      if (st >= 1) hline(ctx, h.X(0), h.X(40), h.Y(484), P.accent, 2, [6, 4]), label(ctx, 'average 484 W', h.X(40), h.Y(484) - 12, { align: 'right', weight: 800, size: 13, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) I_rms = 2.2 A', '(b) P = 484 W'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The rms value of the current.', '(b) The net power consumed over a full cycle.']);
    if (ans) note(ctx, 'two cycles (40 ms); current shown × 50 to share the axis');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const D = 8;
  const qStages = [
    { title: 'Pure L and pure C', dur: 5, text: 'The 44 mH inductor of Ex. 7.3 and the 60 μF capacitor of Ex. 7.4, each on its own ac supply.' },
    { title: 'What is asked', dur: 4, text: 'The net power absorbed by each over a complete cycle. Explain.' },
  ];
  const stages = [
    { title: 'Phase', dur: D, text: 'Inductor: the current lags the voltage by 90°. Capacitor: the current leads by 90°.', ans: 'p = vi is positive for a quarter cycle and equally negative for the next.' },
    { title: 'Net power', dur: 5, text: 'P = V_rms I_rms cos φ with φ = 90°.', ans: 'Zero in both: energy stored in one quarter is returned in the next.' },
  ];
  function panel(ctx, y, name, sh, te, show) {
    label(ctx, name, 40, y - 8, { weight: 800, size: 14 });
    const g = axes(ctx, { x: 60, y, w: 470, h: 170, x0: 0, x1: 2, y0: -1.2, y1: 1.2, xt: [1, 2], yt: [], xl: 'cycles' });
    if (!show) return;
    const f = s => Math.sin(2 * Math.PI * s), fi = s => Math.sin(2 * Math.PI * s + sh), fp = s => f(s) * fi(s);
    ctx.save(); ctx.beginPath(); ctx.moveTo(g.X(0), g.Y(0)); for (let i = 0; i <= 200; i++) { const s = te * i / 200; ctx.lineTo(g.X(s), g.Y(fp(s))); } ctx.lineTo(g.X(te), g.Y(0)); ctx.closePath(); ctx.fillStyle = P.pe; ctx.globalAlpha = 0.25; ctx.fill(); ctx.restore();
    plot(ctx, g, f, 0, te, P.vel); plot(ctx, g, fi, 0, te, P.force); plot(ctx, g, fp, 0, te, P.pe, 2);
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const te = ans ? 2 * clamp(t / (D - 1)) : 0;
    panel(ctx, 50, 'Inductor (7.3): i lags v by 90°', -Math.PI / 2, te, ans); panel(ctx, 300, 'Capacitor (7.4): i leads v by 90°', Math.PI / 2, te, ans);
    if (ans) {
      const st = stageAt(stages, t);
      [['v', P.vel], ['i', P.force], ['p = vi', P.pe]].forEach(([n, c], k) => label(ctx, n, 560, 56 + k * 22, { weight: 800, size: 13, color: c }));
      if (st >= 1) { label(ctx, 'average p = 0', 300, 236, { align: 'center', weight: 800, size: 15, color: P.accent }); label(ctx, 'average p = 0', 300, 486, { align: 'center', weight: 800, size: 15, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['L: i lags 90°; C: i leads 90°', 'cos φ = 0: net power zero in both'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The net power absorbed by each circuit over a complete cycle, with a reason.']);
    if (ans) note(ctx, 'amplitudes scaled to 1 in each panel; shaded: p = vi');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const XC = 150, XL = 420, YT = 140, YB = 360, WS = 0.9;   // shown at 0.9 rad/s (really 1.1 × 10³ rad/s)
  const qStages = [
    { title: 'A charged capacitor and an inductor', dur: 5, text: 'A charged 30 μF capacitor is connected to a 27 mH inductor.' },
    { title: 'What is asked', dur: 4, text: 'The angular frequency of the free oscillations.' },
  ];
  const stages = [
    { title: 'Energy sloshes back and forth', dur: 10, text: 'The capacitor discharges through the inductor; the current builds a magnetic field, which then recharges the capacitor the other way.', ans: 'Electric and magnetic energy trade places twice each cycle.' },
    { title: 'Angular frequency', dur: 5, text: 'ω = 1/√(LC).', ans: 'ω = 1/√(27 × 10⁻³ × 30 × 10⁻⁶) = 1/(9 × 10⁻⁴) ≈ 1.1 × 10³ rad/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    wire(ctx, [[XC, 220], [XC, YT], [XL, YT], [XL, 210]]); wire(ctx, [[XL, 290], [XL, YB], [XC, YB], [XC, 280]]);
    capacitor(ctx, XC, 220, XC, 280, P.ink, 14, 34); inductor(ctx, XL, 210, XL, 290);
    label(ctx, '30 μF', XC - 46, 250, { align: 'right', weight: 700, size: 14 }); label(ctx, '27 mH', XL + 20, 250, { weight: 700, size: 14 });
    const ph = ans ? WS * t : 0, q = Math.cos(ph), i = -Math.sin(ph);
    const n = Math.round(4 * Math.abs(q));
    for (let k = 0; k < n; k++) { const x = XC - (n - 1) * 8 + k * 16; label(ctx, q > 0 ? '+' : '−', x, 222, { align: 'center', weight: 800, size: 14, color: q > 0 ? P.force : P.vel }); label(ctx, q > 0 ? '−' : '+', x, 280, { align: 'center', weight: 800, size: 14, color: q > 0 ? P.vel : P.force }); }
    if (ans) {
      const st = stageAt(stages, t);
      if (Math.abs(i) > 0.05) flow(ctx, i < 0 ? [[XC, 220], [XC, YT], [XL, YT], [XL, YB], [XC, YB], [XC, 280]] : [[XC, 280], [XC, YB], [XL, YB], [XL, YT], [XC, YT], [XC, 220]], 60 * Math.abs(i) * t, P.force, 26, 3);
      const BX = 120, BY = 420;
      label(ctx, 'electric (capacitor)', BX - 10, BY, { align: 'right', size: 12 }); ctx.fillStyle = P.vel; ctx.fillRect(BX, BY - 9, 300 * q * q, 18);
      label(ctx, 'magnetic (inductor)', BX - 10, BY + 30, { align: 'right', size: 12 }); ctx.fillStyle = P.force; ctx.fillRect(BX, BY + 21, 300 * i * i, 18);
      if (st >= 1) label(ctx, 'ω ≈ 1.1 × 10³ rad/s', 300, 490, { align: 'center', weight: 800, size: 17, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Energy swaps between C and L', 'ω = 1/√(LC) ≈ 1.1 × 10³ rad/s'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The angular frequency of free oscillations of the circuit.']);
    note(ctx, ans ? 'slowed down; no resistance; signs and bars in proportion' : 'the capacitor starts charged');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const L = 5, C = 80e-6, R = 40, V = 230, D = 9;
  const Irms = w => V / Math.hypot(R, w * L - 1 / (w * C));
  const G = { x: 50, y: 200, w: 260, h: 260, x0: 0, x1: 120, y0: 0, y1: 6.5, xt: [50, 100], yt: [5.75], xl: 'ω (rad/s)', yl: 'I_rms (A)' };
  const qStages = [
    { title: 'Fig. 7.17', dur: 5, text: 'A series LCR circuit (L = 5.0 H, C = 80 μF, R = 40 Ω) on a 230 V variable-frequency source.' },
    { title: 'What is asked', dur: 5, text: '(a) The resonant frequency. (b) Z and the current amplitude there. (c) The rms voltages across L, C and R; show V_LC = 0.' },
  ];
  const stages = [
    { title: 'Sweep the frequency', dur: D, text: 'I = V/√(R² + (ωL − 1/ωC)²) peaks where ωL = 1/ωC.', ans: '(a) ω₀ = 1/√(LC) = 50 rad/s; ν₀ = 50/2π ≈ 7.96 Hz.' },
    { title: 'At resonance', dur: 5, text: 'X_L = X_C = 250 Ω cancel: Z = R.', ans: '(b) Z = 40 Ω; I_rms = 5.75 A; amplitude 8.13 A.' },
    { title: 'Voltages', dur: 6, text: 'V = I_rms × (R, X_L, X_C). V_L and V_C point opposite ways.', ans: '(c) V_R = 230 V, V_L = V_C = 1437.5 V; V_LC = 0.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    wire(ctx, [[60, 80], [60, 40], [130, 40]]); inductor(ctx, 130, 40, 210, 40); wire(ctx, [[210, 40], [250, 40]]); capacitor(ctx, 250, 40, 300, 40); wire(ctx, [[300, 40], [340, 40]]); resistor(ctx, 340, 40, 420, 40); wire(ctx, [[420, 40], [470, 40], [470, 140], [60, 140], [60, 120]]); acSource(ctx, 60, 100, 20);
    label(ctx, '5.0 H', 170, 18, { align: 'center', weight: 700, size: 12 }); label(ctx, '80 μF', 275, 72, { align: 'center', weight: 700, size: 12 }); label(ctx, '40 Ω', 380, 18, { align: 'center', weight: 700, size: 12 }); label(ctx, '230 V', 88, 100, { weight: 700, size: 12 });
    if (ans) {
      const st = stageAt(stages, t), we = 2 + 118 * clamp(t / (D - 1));
      const g = axes(ctx, G); plot(ctx, g, Irms, 2, we, P.force);
      if (st >= 1) { vline(ctx, g.X(50), g.Y(0), g.Y(5.75), P.accent, 1.5, [4, 4]); ball(ctx, g.X(50), g.Y(5.75), 6, P.accent); label(ctx, '7.96 Hz', g.X(50) + 8, g.Y(5.75) - 14, { weight: 800, size: 13, color: P.accent }); }
      if (st >= 2) {
        const OX = 440, OY = 330, k = 0.1;   // 0.1 px per volt
        vec(ctx, OX, OY, 230 * k * 3, 0, 'V_R = 230 V', P.vel, { side: 1, at: 0.6, lw: 4 });
        vec(ctx, OX, OY, 0, -1437.5 * k, 'V_L = 1437.5 V', P.force, { side: 1, at: 0.85, lw: 4, align: 'left', off: 8 });
        vec(ctx, OX, OY, 0, 1437.5 * k, 'V_C = 1437.5 V', P.leaf, { side: -1, at: 0.85, lw: 4, align: 'left', off: 8 });
        label(ctx, 'V_L + V_C = 0', OX + 10, OY + 175, { align: 'center', weight: 800, size: 14, color: P.accent });
      }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) 50 rad/s = 7.96 Hz', '(b) Z = 40 Ω; I₀ = 8.13 A', '(c) 230 V; 1437.5 V each; V_LC = 0'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The resonant source frequency.', '(b) The impedance and current amplitude at resonance.', '(c) The rms voltage across each element; show V_LC = 0.']);
    if (ans) note(ctx, 'current curve computed; phasors: V_L, V_C 0.1 px per V, V_R × 3 for visibility');
  }
  return { qStages, stages, draw };
})();
