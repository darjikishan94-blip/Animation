//@@ q04
const SCENE = (() => {
  const GAM = 1.4, D = 7, CX = 150, CB = 440, H0 = 280;
  const qStages = [
    { title: 'An insulated cylinder', dur: 3, text: 'A cylinder with insulating walls and an insulated piston (a pile of sand on it) holds 3 mol of hydrogen at STP.' },
    { title: 'Compressed to half', dur: D - 3, text: 'The gas is compressed to half its original volume.' },
    { title: 'What is asked', dur: 4, text: 'By what factor does the pressure increase?' },
  ];
  const stages = [
    { title: 'No heat exchange', dur: 3, text: 'With insulated walls and piston, no heat enters or leaves: the process is adiabatic, PV^γ = constant.', ans: 'Hydrogen is diatomic: γ = 7/5 = 1.4.' },
    { title: 'Compression', dur: D - 3, text: 'On the P–V graph the adiabatic curve rises more steeply than the isothermal one (dashed): the gas also heats up.', ans: 'P₂/P₁ = (V₁/V₂)^γ = 2^1.4.' },
    { title: 'The factor', dur: 4, text: 'Work it out.', ans: 'P₂/P₁ ≈ 2.64.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const v = 1 - 0.5 * smooth(clamp((t - 3) / (D - 3.5))), h = H0 * v, p = Math.pow(1 / v, GAM);
    ctx.fillStyle = P.objFill; ctx.fillRect(CX - 80, CB - H0 - 40, 12, H0 + 52); ctx.fillRect(CX + 68, CB - H0 - 40, 12, H0 + 52); ctx.fillRect(CX - 80, CB, 160, 12);
    ctx.fillStyle = P.vel; ctx.globalAlpha = 0.15 + 0.1 * (p - 1) / 1.64; ctx.fillRect(CX - 68, CB - h, 136, h); ctx.globalAlpha = 1;
    ctx.fillStyle = P.objFill2; ctx.fillRect(CX - 68, CB - h - 14, 136, 14); ctx.fillStyle = P.sand; ctx.beginPath(); ctx.moveTo(CX - 60, CB - h - 14); ctx.lineTo(CX, CB - h - 54); ctx.lineTo(CX + 60, CB - h - 14); ctx.fill();
    label(ctx, 'sand', CX, CB - h - 30, { align: 'center', size: 12 }); label(ctx, '3 mol H₂', CX, CB - h / 2, { align: 'center', weight: 700, size: 13 }); label(ctx, 'insulated', CX, CB + 30, { align: 'center', size: 12, color: P.ink2 });
    if (ans) {
      const g = axes(ctx, { x: 300, y: 70, w: 270, h: 330, x0: 0, x1: 1.2, y0: 0, y1: 3, xt: [0.5, 1], yt: [1, 2, 2.64], xl: 'V / V₁', yl: 'P / P₁' });
      ctx.save(); ctx.setLineDash([5, 4]); plot(ctx, g, x => 1 / x, 0.45, 1.15, P.ink2, 1.5); ctx.restore();
      plot(ctx, g, x => Math.pow(1 / x, GAM), v, 1, P.force);
      ball(ctx, g.X(v), g.Y(p), 6, P.force); label(ctx, `P = ${p.toFixed(2)} P₁`, g.X(v) + 10, g.Y(p) - 12, { weight: 800, size: 14, color: P.force });
      label(ctx, 'isothermal', g.X(0.5) + 8, g.Y(2) + 14, { size: 12, color: P.ink2 }); label(ctx, 'adiabatic', g.X(0.62) + 6, g.Y(Math.pow(1 / 0.62, GAM)) - 6, { size: 12, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Working', ['Adiabatic: PV^γ constant; γ = 1.4 for H₂', 'P₂/P₁ = 2^1.4', '≈ 2.64'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The factor by which the pressure increases when the gas is compressed to half its volume.']);
    note(ctx, 'P–V graph in units of the starting pressure and volume');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const N = 40, AX = 60, BX = 330, Y0 = 150, W = 220, H = 200, D = 8;
  const rnd = i => { const s = Math.sin(i * 91.17 + 3.3) * 43758.5; return s - Math.floor(s); };
  const qStages = [
    { title: 'Gas in A, vacuum in B', dur: 3, text: 'Two equal insulated cylinders are joined by a stopcock. A holds a gas at STP; B is evacuated.' },
    { title: 'Stopcock opened', dur: D - 3, text: 'The stopcock is opened suddenly; the gas rushes into B.' },
    { title: 'What is asked', dur: 5, text: '(a) Final pressure? (b) Change in internal energy? (c) Change in temperature? (d) Are the intermediate states on the P–V–T surface?' },
  ];
  const stages = [
    { title: 'Before', dur: 3, text: 'All of the gas is in A at 1 atm.', ans: '' },
    { title: 'Free expansion', dur: D - 3, text: 'The gas pushes against nothing (no work) and the walls are insulated (no heat): Q = 0, W = 0.', ans: '(b) ΔU = 0; (c) for an ideal gas U depends only on T, so ΔT = 0.' },
    { title: 'Final state', dur: 5, text: 'The same amount of gas at the same temperature fills twice the volume.', ans: '(a) P = 0.5 atm in both. (d) No: the sudden expansion is not quasi-static, so the in-between states are not equilibrium states.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (const x of [AX, BX]) { ctx.strokeStyle = P.obj; ctx.lineWidth = 4; ctx.strokeRect(x, Y0, W, H); }
    ctx.fillStyle = P.objFill2; ctx.fillRect(AX + W, Y0 + H / 2 - 10, BX - AX - W, 20);
    const open = t >= 3, u = clamp((t - 3) / 3);
    ctx.fillStyle = open ? P.accent : P.force; ctx.fillRect(AX + W + 12, Y0 + H / 2 - (open ? 2 : 14), BX - AX - W - 24, open ? 4 : 28);
    label(ctx, open ? 'open' : 'closed', (AX + W + BX) / 2, Y0 + H / 2 - 26, { align: 'center', size: 12, weight: 700 });
    for (let i = 0; i < N; i++) {
      const goesB = i % 2 === 1 && open, f = goesB ? smooth(u) : 0;
      const box = (goesB && f > 0.5) ? BX : AX, ph = t * (0.6 + rnd(i)) + i;
      let x = AX + 10 + (W - 20) * (0.5 + 0.5 * Math.sin(ph * 1.3 + rnd(i + 7) * 6)), y = Y0 + 10 + (H - 20) * (0.5 + 0.5 * Math.sin(ph * 1.7 + rnd(i + 3) * 6));
      if (goesB) { const xb = BX + 10 + (W - 20) * (0.5 + 0.5 * Math.sin(ph * 1.3 + rnd(i + 11) * 6)); x = x + (xb - x) * f; }
      ball(ctx, x, y, 4, P.vel);
    }
    label(ctx, 'A', AX + W / 2, Y0 - 16, { align: 'center', weight: 800, size: 16 }); label(ctx, 'B', BX + W / 2, Y0 - 16, { align: 'center', weight: 800, size: 16 });
    label(ctx, 'everything thermally insulated', 300, Y0 + H + 30, { align: 'center', size: 13, color: P.ink2 });
    if (ans) {
      const pa = open ? 1 - 0.5 * smooth(u) : 1;
      label(ctx, `A: ${pa.toFixed(2)} atm`, AX, 90, { weight: 700, size: 14 }); label(ctx, `B: ${open && u >= 1 ? '0.50' : open ? '…' : '0'} atm`, BX, 90, { weight: 700, size: 14 });
      label(ctx, 'T unchanged, ΔU = 0', 300, 460, { align: 'center', weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) 0.5 atm in each', '(b) ΔU = 0 (Q = 0, W = 0)', '(c) ΔT = 0', '(d) No: not quasi-static'], [-1, 1, 3][stageAt(stages, t)], false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The final pressure in A and B.', '(b) The change in internal energy.', '(c) The change in temperature.', '(d) Whether the intermediate states lie on the P–V–T surface.']);
    note(ctx, 'molecules illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const D = 9;
  const qStages = [
    { title: 'Fig. 11.11', dur: D, text: 'A system goes from D (2.0 m³, 600 N/m²) to E (5.0 m³, 300 N/m²) along a straight line, then at constant pressure from E back to F (2.0 m³).' },
    { title: 'What is asked', dur: 4, text: 'Calculate the total work done by the gas from D to E to F.' },
  ];
  const stages = [
    { title: 'D to E: expansion', dur: 4, text: 'Work done by the gas = area under the path; the volume grows, so it is positive.', ans: 'Area of the trapezium = ½(600 + 300) × 3.0 = 1350 J.' },
    { title: 'E to F: compression', dur: 4, text: 'At constant 300 N/m² the volume shrinks by 3.0 m³: the gas does negative work.', ans: 'W = −300 × 3.0 = −900 J.' },
    { title: 'Total', dur: 5, text: 'Add them: the net work is the area of triangle DEF.', ans: '1350 − 900 = 450 J.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 80, y: 60, w: 470, h: 380, x0: 0, x1: 6, y0: 0, y1: 700, xt: [2, 5], yt: [300, 600], xl: 'V (m³)', yl: 'P (N/m²)' });
    const Dp = [2, 600], Ep = [5, 300], Fp = [2, 300];
    const st = ans ? stageAt(stages, t) : -1;
    if (st === 0 || st === 2) { ctx.fillStyle = P.vel; ctx.globalAlpha = st === 2 ? 0.12 : 0.25; ctx.beginPath(); ctx.moveTo(g.X(2), g.Y(0)); ctx.lineTo(g.X(2), g.Y(600)); ctx.lineTo(g.X(5), g.Y(300)); ctx.lineTo(g.X(5), g.Y(0)); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
    if (st === 1) { ctx.fillStyle = P.force; ctx.globalAlpha = 0.25; ctx.fillRect(g.X(2), g.Y(300), g.X(5) - g.X(2), g.Y(0) - g.Y(300)); ctx.globalAlpha = 1; }
    if (st === 2) { ctx.fillStyle = P.accent; ctx.globalAlpha = 0.45; ctx.beginPath(); ctx.moveTo(g.X(2), g.Y(600)); ctx.lineTo(g.X(5), g.Y(300)); ctx.lineTo(g.X(2), g.Y(300)); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; label(ctx, '450 J', g.X(2.8), g.Y(390), { weight: 800, size: 18, color: P.accent }); }
    const u = ans ? (st === 0 ? clamp((t - stages[0].t0) / 3) : 1) : clamp(t / (D * 0.45)), u2 = ans ? (st >= 1 ? clamp((t - stages[1].t0) / 3) : 0) : clamp((t - D * 0.5) / (D * 0.45));
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 3; seg(ctx, g.X(2), g.Y(600), g.X(2 + 3 * u), g.Y(600 - 300 * u)); if (u2 > 0) seg(ctx, g.X(5), g.Y(300), g.X(5 - 3 * u2), g.Y(300)); ctx.restore();
    for (const [p, n] of [[Dp, 'D'], [Ep, 'E'], [Fp, 'F']]) { ball(ctx, g.X(p[0]), g.Y(p[1]), 5, P.ink); label(ctx, n, g.X(p[0]) + 8, g.Y(p[1]) - 14, { weight: 800, size: 15 }); }
    if (st === 0) label(ctx, '+1350 J', g.X(3.5), g.Y(150), { align: 'center', weight: 800, size: 17, color: P.vel });
    if (st === 1) label(ctx, '−900 J', g.X(3.5), g.Y(150), { align: 'center', weight: 800, size: 17, color: P.force });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['D → E: +1350 J (area under DE)', 'E → F: −900 J', 'Total = 450 J (area of DEF)'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['The total work done by the gas from D to E to F.']);
    note(ctx, 'graph to scale');
  }
  return { qStages, stages, draw };
})();
