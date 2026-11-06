//@@ q01
const SCENE = (() => {
  const D = 7;
  const qStages = [
    { title: 'Cut a wire into five', dur: D, text: 'A wire of resistance R is cut into five equal parts, which are then connected in parallel.' },
    { title: 'What is asked', dur: 4, text: 'If the combination has resistance R′, what is R/R′?' },
  ];
  const stages = [
    { title: 'Each piece', dur: 5, text: 'Resistance is proportional to length: each piece is R/5.', ans: '' },
    { title: 'In parallel', dur: 6, text: 'Five equal resistors in parallel: R′ = (R/5)/5.', ans: 'R′ = R/25, so R/R′ = 25.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const s = ans ? 1 : smooth(clamp((t - 1) / (D - 2)));
    const X0 = 60, W = 480, w = W / 5, YL = 330, X1 = 230, X2 = X1 + w;
    if (s < 0.05 && !ans) { ctx.fillStyle = P.wood; ctx.fillRect(X0, 120, W, 14); label(ctx, 'wire: R', X0 + W / 2, 100, { align: 'center', weight: 800, size: 15 }); }
    for (let i = 0; i < 5; i++) {
      const xa = X0 + i * w + 6, ya = 120, xb = X1, yb = 220 + i * 50, x = xa + (xb - xa) * s, y = ya + (yb - ya) * s;
      ctx.fillStyle = P.wood; ctx.fillRect(x, y, w - 12, 14); label(ctx, 'R/5', x + (w - 12) / 2, y - 10, { align: 'center', weight: 700, size: 12, alpha: s > 0.05 ? 1 : 0 });
    }
    if (s >= 1) { wire(ctx, [[X1 - 30, 227], [X1 - 30, 427]], P.ink, 3); wire(ctx, [[X2 + 18, 227], [X2 + 18, 427]], P.ink, 3); for (let i = 0; i < 5; i++) { wire(ctx, [[X1 - 30, 227 + i * 50], [X1, 227 + i * 50]]); wire(ctx, [[X1 + w - 12, 227 + i * 50], [X2 + 18, 227 + i * 50]]); } wire(ctx, [[X1 - 30, 327], [X1 - 80, 327]], P.ink, 3); wire(ctx, [[X2 + 18, 327], [X2 + 68, 327]], P.ink, 3); }
    if (ans) {
      const st = stageAt(stages, t);
      if (st >= 1) label(ctx, 'R′ = (R/5)/5 = R/25   →   R/R′ = 25', 300, 490, { align: 'center', weight: 800, size: 17, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Each piece: R/5', 'R′ = R/25: R/R′ = 25 (d)'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The ratio R/R′.']);
    note(ctx, 'schematic');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const I = [0.5, 1.0, 2.0, 3.0, 4.0], V = [1.6, 3.4, 6.7, 10.2, 13.2], G = { x: 70, y: 70, w: 450, h: 380, x0: 0, x1: 4.5, y0: 0, y1: 15, xt: [1, 2, 3, 4], yt: [5, 10, 15], xl: 'I (A)', yl: 'V (V)' };
  const R = V.reduce((s, v, i) => s + v * I[i], 0) / I.reduce((s, x) => s + x * x, 0);   // best line through the origin ≈ 3.34 Ω
  const qStages = [
    { title: 'Readings', dur: 6, text: 'I (A): 0.5, 1.0, 2.0, 3.0, 4.0.  V (V): 1.6, 3.4, 6.7, 10.2, 13.2.' },
    { title: 'What is asked', dur: 4, text: 'Plot V against I and find the resistance.' },
  ];
  const stages = [
    { title: 'Plot the points', dur: 6, text: 'Each reading is one point (I, V).', ans: 'They lie close to a straight line through the origin.' },
    { title: 'Slope', dur: 6, text: 'R = V/I is the slope of the line.', ans: `R ≈ ${R.toFixed(1)} Ω (NCERT quotes 3.4 Ω).` },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, G), n = ans ? Math.min(5, Math.floor(t / 1) + 1) : 5;
    if (!ans) { I.forEach((x, i) => label(ctx, `(${x}, ${V[i]})`, 120 + i * 80, 40, { align: 'center', weight: 700, size: 12 })); askedPanel(ctx, 630, 34, 300, ['The V–I graph.', 'The resistance of the resistor.']); note(ctx, 'points to scale'); return; }
    for (let i = 0; i < n; i++) ball(ctx, g.X(I[i]), g.Y(V[i]), 6, P.force);
    const st = stageAt(stages, t);
    if (st >= 1) { plot(ctx, g, x => R * x, 0, 4.4, P.accent, 2); const a = 1, b = 4; hline(ctx, g.X(a), g.X(b), g.Y(R * a), P.ink2, 1.5, [4, 3]); vline(ctx, g.X(b), g.Y(R * a), g.Y(R * b), P.ink2, 1.5, [4, 3]); label(ctx, 'ΔI = 3 A', g.X(2.5), g.Y(R * a) + 16, { align: 'center', weight: 700, size: 12 }); label(ctx, `ΔV = ${(3 * R).toFixed(1)} V`, g.X(b) + 8, g.Y(R * 2.5), { weight: 700, size: 12 }); label(ctx, `R = slope ≈ ${R.toFixed(1)} Ω`, g.X(1.2), g.Y(13), { weight: 800, size: 16, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Answer', ['Points lie on a straight line (Ohm’s law)', `R ≈ ${R.toFixed(1)} Ω`], st, false);
    note(ctx, 'points to scale; line: best fit through the origin');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const XL = 70, XR = 540, YT = 160, YB = 400;
  const RS = [['0.2 Ω', 130], ['0.3 Ω', 230], ['0.4 Ω', 330], ['0.5 Ω', 430]];
  const qStages = [
    { title: 'Five resistors in series', dur: 5, text: 'A 9 V battery in series with 0.2 Ω, 0.3 Ω, 0.4 Ω, 0.5 Ω and 12 Ω.' },
    { title: 'What is asked', dur: 4, text: 'The current through the 12 Ω resistor.' },
  ];
  const stages = [
    { title: 'Total resistance', dur: 5, text: 'In series the resistances add.', ans: 'R = 13.4 Ω.' },
    { title: 'Current', dur: 6, text: 'One current flows through every resistor in series.', ans: 'I = 9/13.4 ≈ 0.67 A, through the 12 Ω resistor too.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    let x = XL; RS.forEach(([n, c]) => { wire(ctx, [[x, YT], [c - 40, YT]]); resistor(ctx, c - 40, YT, c + 40, YT); label(ctx, n, c, YT - 28, { align: 'center', weight: 700, size: 13 }); x = c + 40; }); wire(ctx, [[x, YT], [XR, YT]]);
    wire(ctx, [[XR, YT], [XR, 230]]); resistor(ctx, XR, 230, XR, 330); wire(ctx, [[XR, 330], [XR, YB], [330, YB]]); label(ctx, '12 Ω', XR + 16, 280, { weight: 800, size: 14 });
    cell(ctx, 290, YB, 330, YB); wire(ctx, [[290, YB], [XL, YB], [XL, YT]]); label(ctx, '9 V', 310, YB + 30, { align: 'center', weight: 700, size: 14 }); label(ctx, '+', 286, YB - 26, { align: 'center', weight: 800, size: 14, color: P.force });
    if (ans) {
      const st = stageAt(stages, t);
      flow(ctx, [[290, YB], [XL, YB], [XL, YT], [XR, YT], [XR, YB], [330, YB]], t * 30, P.force, 28, 3);
      label(ctx, 'R = 13.4 Ω', 300, 280, { align: 'center', weight: 800, size: 16, color: P.accent });
      if (st >= 1) label(ctx, 'I ≈ 0.67 A everywhere', 300, 310, { align: 'center', weight: 800, size: 16, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Working', ['R = 0.2 + 0.3 + 0.4 + 0.5 + 12 = 13.4 Ω', 'I = 9/13.4 ≈ 0.67 A'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The current through the 12 Ω resistor.']);
    note(ctx, 'dots show the (conventional) current');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const qStages = [
    { title: 'Three 6 Ω resistors', dur: 5, text: 'You have three resistors of 6 Ω each.' },
    { title: 'What is asked', dur: 4, text: 'Show how to connect them to get (i) 9 Ω, (ii) 4 Ω.' },
  ];
  const stages = [
    { title: '(i) 9 Ω', dur: 6, text: 'Two in parallel give 6 × 6/12 = 3 Ω; add the third in series.', ans: '3 + 6 = 9 Ω.' },
    { title: '(ii) 4 Ω', dur: 6, text: 'Two in series give 12 Ω; put the third in parallel with them.', ans: '12 × 6/(12 + 6) = 4 Ω.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    if (!ans) { [150, 300, 450].forEach(x => { resistor(ctx, x - 50, 260, x + 50, 260); label(ctx, '6 Ω', x, 236, { align: 'center', weight: 700, size: 14 }); }); askedPanel(ctx, 630, 34, 300, ['Connections giving (i) 9 Ω, (ii) 4 Ω.']); return; }
    const st = stageAt(stages, t);
    { const y = 140; label(ctx, '(i)', 30, y - 50, { weight: 800, size: 15 });
      wire(ctx, [[50, y], [110, y]]); wire(ctx, [[110, y - 35], [110, y + 35]]); resistor(ctx, 110, y - 35, 250, y - 35); resistor(ctx, 110, y + 35, 250, y + 35); wire(ctx, [[250, y - 35], [250, y + 35]]); wire(ctx, [[250, y], [330, y]]); resistor(ctx, 330, y, 450, y); wire(ctx, [[450, y], [550, y]]);
      ['6 Ω', '6 Ω'].forEach((n, i) => label(ctx, n, 180, y - 57 + i * 114, { align: 'center', weight: 700, size: 12 })); label(ctx, '6 Ω', 390, y - 22, { align: 'center', weight: 700, size: 12 });
      label(ctx, '3 Ω', 180, y, { align: 'center', weight: 800, size: 13, color: P.accent }); label(ctx, '= 9 Ω', 560, y + 30, { align: 'right', weight: 800, size: 18, color: P.accent }); }
    if (st >= 1) { const y = 380; label(ctx, '(ii)', 30, y - 70, { weight: 800, size: 15 });
      wire(ctx, [[50, y], [110, y]]); wire(ctx, [[110, y - 45], [110, y + 45]]); resistor(ctx, 110, y - 45, 250, y - 45); resistor(ctx, 250, y - 45, 390, y - 45); resistor(ctx, 110, y + 45, 390, y + 45); wire(ctx, [[390, y - 45], [390, y + 45]]); wire(ctx, [[390, y], [550, y]]);
      label(ctx, '6 Ω', 180, y - 68, { align: 'center', weight: 700, size: 12 }); label(ctx, '6 Ω', 320, y - 68, { align: 'center', weight: 700, size: 12 }); label(ctx, '6 Ω', 250, y + 68, { align: 'center', weight: 700, size: 12 });
      label(ctx, '12 Ω', 250, y - 20, { align: 'center', weight: 800, size: 13, color: P.accent }); label(ctx, '= 4 Ω', 560, y + 30, { align: 'right', weight: 800, size: 18, color: P.accent }); }
    partsPanel(ctx, 630, 34, 300, 'Answers', ['(i) (6 ∥ 6) in series with 6: 9 Ω', '(ii) (6 + 6) in parallel with 6: 4 Ω'], st, false);
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const CASES = [['A alone', 220 / 24, 'single'], ['A and B in series', 220 / 48, 'series'], ['A and B in parallel', 220 / 12, 'parallel']];
  const qStages = [
    { title: 'A hot plate', dur: 5, text: 'Two coils A and B, 24 Ω each, on a 220 V line: used separately, in series, or in parallel.' },
    { title: 'What is asked', dur: 4, text: 'The current in each of the three cases.' },
  ];
  const stages = [
    { title: 'Separately', dur: 5, text: 'I = V/R = 220/24.', ans: '≈ 9.2 A.' },
    { title: 'In series', dur: 5, text: 'R = 48 Ω.', ans: '220/48 ≈ 4.6 A.' },
    { title: 'In parallel', dur: 5, text: 'R = 12 Ω.', ans: '220/12 ≈ 18.3 A.' },
  ];
  function row(ctx, y, kind, I, t, show) {
    const XL = 60, XR = 520;
    acSource(ctx, XL, y + 40, 16); label(ctx, '220 V', XL, y + 72, { align: 'center', weight: 700, size: 11 });
    let path;
    if (kind === 'single') { wire(ctx, [[XL, y + 24], [XL, y], [220, y]]); resistor(ctx, 220, y, 340, y); wire(ctx, [[340, y], [XR, y], [XR, y + 80], [XL, y + 80], [XL, y + 56]]); label(ctx, 'A', 280, y - 22, { align: 'center', weight: 700, size: 12 }); path = [[XL, y + 24], [XL, y], [XR, y], [XR, y + 80], [XL, y + 80], [XL, y + 56]]; }
    if (kind === 'series') { wire(ctx, [[XL, y + 24], [XL, y], [150, y]]); resistor(ctx, 150, y, 260, y); resistor(ctx, 300, y, 410, y); wire(ctx, [[260, y], [300, y]]); wire(ctx, [[410, y], [XR, y], [XR, y + 80], [XL, y + 80], [XL, y + 56]]); label(ctx, 'A', 205, y - 22, { align: 'center', weight: 700, size: 12 }); label(ctx, 'B', 355, y - 22, { align: 'center', weight: 700, size: 12 }); path = [[XL, y + 24], [XL, y], [XR, y], [XR, y + 80], [XL, y + 80], [XL, y + 56]]; }
    if (kind === 'parallel') { wire(ctx, [[XL, y + 24], [XL, y], [200, y]]); wire(ctx, [[200, y - 22], [200, y + 22]]); resistor(ctx, 200, y - 22, 360, y - 22); resistor(ctx, 200, y + 22, 360, y + 22); wire(ctx, [[360, y - 22], [360, y + 22]]); wire(ctx, [[360, y], [XR, y], [XR, y + 80], [XL, y + 80], [XL, y + 56]]); label(ctx, 'A', 280, y - 44, { align: 'center', weight: 700, size: 12 }); label(ctx, 'B', 280, y + 44, { align: 'center', weight: 700, size: 12 }); path = [[XL, y + 24], [XL, y], [200, y]]; }
    if (show) {
      if (kind === 'parallel') { flow(ctx, [[XL, y + 24], [XL, y], [200, y]], 6 * I * t, P.force, 24, 3); flow(ctx, [[200, y - 22], [360, y - 22]], 3 * I * t, P.force, 24, 3); flow(ctx, [[200, y + 22], [360, y + 22]], 3 * I * t, P.force, 24, 3); flow(ctx, [[360, y], [XR, y], [XR, y + 80], [XL, y + 80], [XL, y + 56]], 6 * I * t, P.force, 24, 3); }
      else flow(ctx, path, 6 * I * t, P.force, 24, 3);
      label(ctx, `${I.toFixed(1)} A`, XR + 12, y + 40, { weight: 800, size: 15, color: P.force });
    }
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1;
    CASES.forEach(([name, I, kind], i) => { const y = 70 + i * 160; label(ctx, name, 120, y - 40, { weight: 800, size: 13 }); row(ctx, y, kind, I, t, ans && st >= i); });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Separately: ≈ 9.2 A', 'Series: ≈ 4.6 A', 'Parallel: ≈ 18.3 A'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['The current when the coils are used separately, in series, and in parallel.']);
    note(ctx, ans ? 'dot speeds in proportion to the currents' : 'circuit schematics');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const qStages = [
    { title: 'Two circuits', dur: 5, text: '(i) 6 V with 1 Ω and 2 Ω in series. (ii) 4 V with 12 Ω and 2 Ω in parallel.' },
    { title: 'What is asked', dur: 4, text: 'Compare the power used in the 2 Ω resistor in each.' },
  ];
  const stages = [
    { title: '(i) Series', dur: 5, text: 'I = 6/(1 + 2) = 2 A; P = I²R.', ans: 'P = 2² × 2 = 8 W.' },
    { title: '(ii) Parallel', dur: 5, text: 'The 2 Ω resistor has the full 4 V across it: P = V²/R.', ans: 'P = 4²/2 = 8 W. Equal.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); hline(ctx, 30, 590, 270, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1;
    { const y = 80; label(ctx, '(i)', 30, y - 30, { weight: 800, size: 15 }); wire(ctx, [[100, y], [180, y]]); resistor(ctx, 180, y, 280, y); wire(ctx, [[280, y], [330, y]]); resistor(ctx, 330, y, 430, y); wire(ctx, [[430, y], [500, y], [500, y + 120], [320, y + 120]]); cell(ctx, 280, y + 120, 320, y + 120); wire(ctx, [[280, y + 120], [100, y + 120], [100, y]]);
      label(ctx, '1 Ω', 230, y - 24, { align: 'center', weight: 700, size: 12 }); label(ctx, '2 Ω', 380, y - 24, { align: 'center', weight: 800, size: 13, color: P.accent }); label(ctx, '6 V', 300, y + 148, { align: 'center', weight: 700, size: 12 });
      if (ans) { flow(ctx, [[280, y + 120], [100, y + 120], [100, y], [500, y], [500, y + 120], [320, y + 120]], t * 40, P.force, 26, 3); if (st >= 0) label(ctx, 'I = 2 A,  P = 8 W', 380, y + 40, { align: 'center', weight: 800, size: 14, color: P.accent }); } }
    { const y = 330; label(ctx, '(ii)', 30, y - 30, { weight: 800, size: 15 }); wire(ctx, [[100, y + 120], [100, y], [500, y], [500, y + 120], [320, y + 120]]); cell(ctx, 280, y + 120, 320, y + 120); wire(ctx, [[280, y + 120], [100, y + 120]]);
      wire(ctx, [[220, y], [220, y + 20]]); resistor(ctx, 220, y + 20, 220, y + 100); wire(ctx, [[220, y + 100], [220, y + 120]]); wire(ctx, [[400, y], [400, y + 20]]); resistor(ctx, 400, y + 20, 400, y + 100); wire(ctx, [[400, y + 100], [400, y + 120]]);
      label(ctx, '12 Ω', 236, y + 60, { weight: 700, size: 12 }); label(ctx, '2 Ω', 416, y + 60, { weight: 800, size: 13, color: P.accent }); label(ctx, '4 V', 300, y + 148, { align: 'center', weight: 700, size: 12 });
      if (ans && st >= 1) label(ctx, 'V = 4 V,  P = 8 W', 460, y + 160, { align: 'center', weight: 800, size: 14, color: P.accent }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(i) I = 2 A: P = 8 W', '(ii) V = 4 V: P = 8 W — equal'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['The power used in the 2 Ω resistor in each circuit.']);
    note(ctx, 'circuit schematics');
  }
  return { qStages, stages, draw };
})();
