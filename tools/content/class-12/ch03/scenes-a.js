//@@ q02
const SCENE = (() => {
  const XL = 120, XR = 480, YT = 140, YB = 380;
  const qStages = [
    { title: 'A battery and a resistor', dur: 5, text: 'A battery of emf 10 V and internal resistance 3 Ω drives a current of 0.5 A through a resistor R.' },
    { title: 'What is asked', dur: 4, text: 'What is R? What is the terminal voltage of the battery?' },
  ];
  const stages = [
    { title: 'Total resistance', dur: 5, text: 'I = ε/(R + r), so R + r = ε/I = 10/0.5 = 20 Ω.', ans: 'R = 20 − 3 = 17 Ω.' },
    { title: 'Lost inside the battery', dur: 5, text: 'The internal resistance uses up Ir = 0.5 × 3 = 1.5 V.', ans: 'Terminal voltage V = ε − Ir = 10 − 1.5 = 8.5 V (= IR = 0.5 × 17).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const path = [[XL, YB], [XL, YT], [XR, YT], [XR, YB], [XL, YB]];
    wire(ctx, [[XL, YT], [240, YT]]); resistor(ctx, 240, YT, 360, YT); wire(ctx, [[360, YT], [XR, YT], [XR, YB], [360, YB]]);
    cell(ctx, 200, YB, 240, YB); resistor(ctx, 260, YB, 340, YB); wire(ctx, [[340, YB], [360, YB]]); wire(ctx, [[240, YB], [260, YB]]); wire(ctx, [[200, YB], [XL, YB], [XL, YT]]);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.2; ctx.strokeRect(180, YB - 40, 180, 80); ctx.restore();
    label(ctx, 'battery', 270, YB + 56, { align: 'center', weight: 700, size: 13 }); label(ctx, 'ε = 10 V', 205, YB - 54, { align: 'center', weight: 700, size: 13 }); label(ctx, 'r = 3 Ω', 300, YB - 54, { align: 'center', weight: 700, size: 13 });
    label(ctx, '+', 196, YB - 24, { align: 'center', weight: 800, size: 14, color: P.force });
    label(ctx, ans && t >= stages[0].t1 - 2 ? 'R = 17 Ω' : 'R = ?', 300, YT - 34, { align: 'center', weight: 800, size: 15, color: ans ? P.accent : P.ink });
    flow(ctx, path, t * 30, P.force, 30, 3);   // out of the + plate (left), round the outside, back in at −
    label(ctx, 'I = 0.5 A', XR + 12, (YT + YB) / 2, { weight: 700, size: 14, color: P.force });
    if (ans) {
      const st = stageAt(stages, t);
      if (st >= 1) { ball(ctx, 180, YB, 5, P.accent); ball(ctx, 360, YB, 5, P.accent); label(ctx, 'terminals: V = 8.5 V', 270, YB + 80, { align: 'center', weight: 800, size: 15, color: P.accent }); label(ctx, 'Ir = 1.5 V', 300, YB + 24, { align: 'center', weight: 700, size: 12, color: P.loss }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['R + r = ε/I = 20 Ω → R = 17 Ω', 'V = ε − Ir = 8.5 V'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The resistance R of the resistor.', 'The terminal voltage of the battery with the circuit closed.']);
    note(ctx, 'dashed box: the battery; dots show the current direction (conventional)');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const G = { x: 300, y: 80, w: 250, h: 220, x0: 0, x1: 10, y0: 2.4, y1: 3.4, xt: [], yt: [2.8, 3.2], xl: 't', yl: 'I (A)' }, D = 9;
  const I = s => 2.8 + 0.4 * Math.exp(-s / 1.6);   // illustrative shape: 3.2 A falling to 2.8 A
  const qStages = [
    { title: 'Switch on', dur: D, text: 'A nichrome heater on 230 V draws 3.2 A at first (27.0 °C); the current settles to 2.8 A as it heats.' },
    { title: 'What is asked', dur: 4, text: 'What is the steady temperature? α = 1.70 × 10⁻⁴ °C⁻¹.' },
  ];
  const stages = [
    { title: 'Resistance cold and hot', dur: D, text: 'R = V/I.', ans: 'R₁ = 230/3.2 = 71.9 Ω (27 °C); R₂ = 230/2.8 = 82.1 Ω (steady).' },
    { title: 'Temperature', dur: 5, text: 'R₂ = R₁[1 + α(T₂ − T₁)].', ans: 'T₂ − T₁ = 10.27/(71.9 × 1.70 × 10⁻⁴) ≈ 840 °C, so T₂ ≈ 867 °C.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const s = clamp(t / (D - 1)) * 10, glow = 1 - Math.exp(-s / 1.6);
    // heater coil
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const x = 60 + i * 1.6, y = 200 + 26 * Math.sin(i / 120 * 10 * Math.PI); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    ctx.globalAlpha = 0.9 * glow; ctx.strokeStyle = P.force; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    wire(ctx, [[60, 200], [40, 200], [40, 360], [120, 360]]); wire(ctx, [[252, 200], [272, 200], [272, 360], [190, 360]]);
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(155, 360, 34, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); label(ctx, '230 V', 155, 360, { align: 'center', weight: 800, size: 14 });
    hline(ctx, 121, 120, 360, P.ink, 2); wire(ctx, [[120, 360], [121, 360]]);
    label(ctx, 'nichrome', 156, 150, { align: 'center', weight: 700, size: 13 });
    const g = axes(ctx, G); plot(ctx, g, I, 0, s, P.force);
    hline(ctx, g.X(0), g.X(10), g.Y(2.8), P.ink2, 1, [3, 3]);
    label(ctx, `I = ${I(s).toFixed(2)} A`, 420, 330, { align: 'center', weight: 800, size: 15, color: P.force });
    if (ans) {
      const st = stageAt(stages, t);
      label(ctx, `R = ${(230 / I(s)).toFixed(1)} Ω`, 420, 360, { align: 'center', weight: 800, size: 15, color: P.accent });
      if (st >= 1) label(ctx, 'T ≈ 867 °C', 156, 260, { align: 'center', weight: 800, size: 18, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Working', ['R₁ = 71.9 Ω, R₂ = 82.1 Ω', 'ΔT ≈ 840 °C → T ≈ 867 °C'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The steady temperature of the heating element (room temperature 27.0 °C).']);
    note(ctx, 'current curve shape illustrative: only 3.2 A and 2.8 A are given');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const A = [120, 250], B = [300, 90], C = [480, 250], Dn = [300, 390], YB = 470;
  const BR = [   // [from, to, R, current in 1/17 A, label position]
    ['A', 'B', 10, 4, [178, 150]], ['B', 'C', 5, 6, [422, 150]], ['A', 'D', 5, 6, [178, 350]], ['D', 'C', 10, 4, [422, 350]], ['D', 'B', 5, 2, [334, 240]]];
  const N = { A, B, C, D: Dn };
  const qStages = [
    { title: 'Fig. 3.20', dur: 6, text: 'A network ABCD: AB 10 Ω, BC 5 Ω, AD 5 Ω, DC 10 Ω and BD 5 Ω, fed by a 10 V cell in series with 10 Ω between C and A.' },
    { title: 'What is asked', dur: 4, text: 'Determine the current in each branch.' },
  ];
  const stages = [
    { title: 'Kirchhoff’s rules', dur: 7, text: 'Take C as 0 V (the cell’s + side is then at 10 V). Apply the junction rule at A, B and D with I = ΔV/R.', ans: 'V_A = 70/17 V, V_B = 30/17 V, V_D = 40/17 V.' },
    { title: 'Branch currents', dur: 10, text: 'Each current = (potential difference)/R. Dots move in proportion to the current.', ans: 'AB 4/17 A, BC 6/17 A, AD 6/17 A, DC 4/17 A, D→B 2/17 A; cell 10/17 A.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    BR.forEach(([f, to, R, , lp]) => { resistor(ctx, ...N[f], ...N[to]); label(ctx, `${R} Ω`, lp[0], lp[1], { align: 'center', weight: 700, size: 13 }); });
    wire(ctx, [A, [A[0], YB], [200, YB]]); resistor(ctx, 200, YB, 300, YB); wire(ctx, [[300, YB], [340, YB]]); cell(ctx, 340, YB, 370, YB); wire(ctx, [[370, YB], [C[0], YB], C]);
    label(ctx, '10 Ω', 250, YB + 24, { align: 'center', weight: 700, size: 13 }); label(ctx, '10 V', 356, YB + 28, { align: 'center', weight: 700, size: 13 }); label(ctx, '+', 334, YB - 24, { align: 'center', weight: 800, size: 14, color: P.force });
    Object.entries(N).forEach(([n, p]) => { ball(ctx, ...p, 5, P.ink); label(ctx, n, p[0] + (n === 'A' ? -16 : n === 'C' ? 16 : 0), p[1] + (n === 'B' ? -18 : n === 'D' ? 22 : 0), { align: 'center', weight: 800, size: 15 }); });
    if (ans) {
      const st = stageAt(stages, t);
      if (st >= 0) { [['A', '70/17 V'], ['B', '30/17 V'], ['C', '0 V'], ['D', '40/17 V']].forEach(([n, v]) => { const p = N[n]; label(ctx, v, p[0] + (n === 'A' ? -18 : n === 'C' ? 18 : 40), p[1] + (n === 'B' ? -2 : n === 'D' ? 4 : 22), { align: n === 'A' ? 'right' : 'left', weight: 700, size: 12, color: P.accent }); }); }
      if (st >= 1) {
        const s = (t - stages[1].t0) * 12;
        BR.forEach(([f, to, , i, lp]) => { flow(ctx, [N[f], N[to]], s * i, P.force, 22, 3); label(ctx, `${i}/17 A`, lp[0], lp[1] + 16, { align: 'center', weight: 800, size: 12, color: P.force }); });
        flow(ctx, [C, [C[0], YB], [A[0], YB], A], s * 10, P.force, 22, 3); label(ctx, '10/17 A', 120 - 14, 380, { align: 'right', weight: 800, size: 12, color: P.force });
      }
      partsPanel(ctx, 630, 34, 300, 'Working', ['Junction rule at A, B, D (C = 0 V): V_A = 70/17, V_B = 30/17, V_D = 40/17 V', 'AB 4/17, BC 6/17, AD 6/17, DC 4/17, D→B 2/17 A; total 10/17 A'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The current in each branch of the network.']);
    note(ctx, ans ? 'dots move at speeds in proportion to the currents (conventional direction)' : 'cell internal resistance taken as negligible');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const XL = 110, XR = 490, YT = 150, YB = 370;
  const qStages = [
    { title: 'Charging a battery', dur: 5, text: 'A storage battery (emf 8.0 V, internal resistance 0.5 Ω) is charged from a 120 V dc supply through a 15.5 Ω series resistor.' },
    { title: 'What is asked', dur: 4, text: 'What is the terminal voltage of the battery during charging? Why the series resistor?' },
  ];
  const stages = [
    { title: 'Charging current', dur: 5, text: 'The two emfs oppose: net emf = 120 − 8 = 112 V; total resistance 15.5 + 0.5 = 16 Ω.', ans: 'I = 112/16 = 7 A.' },
    { title: 'Terminal voltage', dur: 5, text: 'The current is pushed into the battery’s + terminal, so V = ε + Ir.', ans: 'V = 8 + 7 × 0.5 = 11.5 V.' },
    { title: 'Why the resistor', dur: 5, text: 'Without it, only r = 0.5 Ω would limit the current.', ans: 'It limits the current: otherwise (120 − 8)/0.5 = 224 A.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    // supply on the left (vertical), + at top; battery on the right (vertical), + at top
    wire(ctx, [[XL, 230], [XL, YT], [240, YT]]); resistor(ctx, 240, YT, 360, YT); wire(ctx, [[360, YT], [XR, YT], [XR, 220]]);
    cell(ctx, XL, 230, XL, 290); wire(ctx, [[XL, 290], [XL, YB], [XR, YB], [XR, 330]]);
    cell(ctx, XR, 220, XR, 250); resistor(ctx, XR, 260, XR, 330); wire(ctx, [[XR, 250], [XR, 260]]);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.2; ctx.strokeRect(XR - 40, 200, 80, 140); ctx.restore();
    label(ctx, '120 V', XL - 26, 260, { align: 'right', weight: 700, size: 14 }); label(ctx, '+', XL + 26, 226, { weight: 800, size: 14, color: P.force });
    label(ctx, '15.5 Ω', 300, YT - 30, { align: 'center', weight: 700, size: 14 });
    label(ctx, '+', XR + 26, 216, { weight: 800, size: 14, color: P.force }); label(ctx, '8.0 V', XR - 50, 236, { align: 'right', weight: 700, size: 13 }); label(ctx, '0.5 Ω', XR - 50, 296, { align: 'right', weight: 700, size: 13 }); label(ctx, 'battery', XR, 356, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const st = stageAt(stages, t);
      flow(ctx, [[XL, 230], [XL, YT], [XR, YT], [XR, YB], [XL, YB], [XL, 290]], t * 40, P.force, 26, 3);
      label(ctx, 'I = 7 A', 300, YT + 28, { align: 'center', weight: 800, size: 15, color: P.force });
      if (st >= 1) label(ctx, 'terminal V = 11.5 V', XR - 40, 420, { align: 'center', weight: 800, size: 15, color: P.accent });
      if (st >= 2) label(ctx, 'without 15.5 Ω: 224 A', 300, 460, { align: 'center', weight: 700, size: 14, color: P.loss });
      partsPanel(ctx, 630, 34, 300, 'Working', ['I = (120 − 8)/(15.5 + 0.5) = 7 A', 'V = ε + Ir = 11.5 V', 'The resistor limits the current'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The terminal voltage of the battery during charging.', 'The purpose of the series resistor.']);
    note(ctx, 'dashed box: the battery being charged; dots show the conventional current');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const X0 = 50, X1 = 560, Y0 = 150, Y1 = 290, D = 12, NE = 46;
  const E = Array.from({ length: NE }, (_, i) => [X0 + ((i * 97) % 500), Y0 + 12 + ((i * 53) % 116), i * 1.7]);
  const qStages = [
    { title: 'A copper wire', dur: 5, text: 'A copper wire 3.0 m long, cross-section 2.0 × 10⁻⁶ m², carries 3.0 A. Free electrons: n = 8.5 × 10²⁸ m⁻³.' },
    { title: 'What is asked', dur: 4, text: 'How long does an electron take to drift from one end to the other?' },
  ];
  const stages = [
    { title: 'Drift speed', dur: 5, text: 'I = neAv_d.', ans: 'v_d = 3.0/(8.5 × 10²⁸ × 1.6 × 10⁻¹⁹ × 2.0 × 10⁻⁶) ≈ 1.1 × 10⁻⁴ m/s.' },
    { title: 'Time to cross', dur: D, text: 'Random thermal motion is fast, but the net drift is very slow.', ans: 't = 3.0/1.1 × 10⁻⁴ ≈ 2.7 × 10⁴ s ≈ 7.5 h.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.wood; ctx.globalAlpha = 0.45; ctx.fillRect(X0 - 10, Y0, X1 - X0 + 20, Y1 - Y0); ctx.restore();
    hline(ctx, X0 - 10, X1 + 10, Y0, P.obj, 2); hline(ctx, X0 - 10, X1 + 10, Y1, P.obj, 2);
    vec(ctx, 220, Y0 - 34, 160, 0, 'I = 3.0 A', P.force, { side: -1, at: 0.5, size: 13 });
    const drift = ans ? clamp((t - stages[0].t0) / (stages[1].t1 - 1)) : 0;
    E.forEach(([x, y, p], i) => { const jx = 9 * Math.sin(3.1 * t + p) + 6 * Math.sin(5.3 * t + 2 * p), jy = 8 * Math.cos(2.7 * t + 1.3 * p); let xx = x + jx - 60 * drift; if (xx < X0 - 5) xx += X1 - X0; ball(ctx, xx, clamp(y + jy, Y0 + 6, Y1 - 6), 4, P.vel); });
    if (ans) {
      const xm = X1 - 10 - (X1 - X0 - 20) * drift, ym = (Y0 + Y1) / 2 + 10 * Math.sin(4 * t);
      ball(ctx, xm, ym, 8, P.accent); label(ctx, 'tracked electron', xm, Y1 + 24, { align: 'center', weight: 700, size: 12, color: P.accent });
      vec(ctx, 380, Y1 + 60, -120, 0, 'electron drift  v_d ≈ 1.1 × 10⁻⁴ m/s', P.vel, { side: 1, at: 0.5, size: 13 });
      clock(ctx, 120, 440, drift * 7.5 * 60, '');   // the hand turns once per hour
      label(ctx, `${(drift * 7.5).toFixed(1)} h`, 145, 440, { weight: 800, size: 16 });
      partsPanel(ctx, 630, 34, 300, 'Working', ['v_d = I/neA ≈ 1.1 × 10⁻⁴ m/s', 't = l/v_d ≈ 2.7 × 10⁴ s ≈ 7.5 h'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The time an electron takes to drift from one end of the 3.0 m wire to the other.']);
    dim(ctx, X0, X1, Y1 + 120, P.ink2); label(ctx, '3.0 m (shortened)', (X0 + X1) / 2, Y1 + 136, { align: 'center', weight: 700, size: 12 });
    note(ctx, 'random motion and time are not to scale');
  }
  return { qStages, stages, draw };
})();
