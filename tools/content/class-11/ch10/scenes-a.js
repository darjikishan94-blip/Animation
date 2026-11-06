//@@ q06
const SCENE = (() => {
  const A = 1.2e-5, E = 200, K = 7, X0 = 60, Y = 260, D = 7;              // expansion exaggerated 200×
  const qStages = [
    { title: 'Calibrated at 27 °C', dur: 3, text: 'A 1 m steel tape is correct at 27.0 °C.' },
    { title: 'A hot day: 45 °C', dur: D - 3, text: 'On a 45.0 °C day a steel rod measures 63.0 cm on this tape. α_steel = 1.20 × 10⁻⁵ K⁻¹.' },
    { title: 'What is asked', dur: 4, text: 'What is the actual length of the rod that day? What is its length at 27.0 °C?' },
  ];
  const stages = [
    { title: 'The tape expands', dur: 3, text: 'At 27.0 °C the tape’s marks are exactly 1 cm apart.', ans: '' },
    { title: 'Marks spread apart', dur: D - 3, text: 'At 45.0 °C each “centimetre” of the tape is (1 + αΔT) cm long, ΔT = 18.0 K. The rod expands by the same factor (also steel), so the reading stays 63.0.', ans: 'True length = 63.0 × (1 + 1.20 × 10⁻⁵ × 18.0) ≈ 63.0136 cm.' },
    { title: 'Back at 27 °C', dur: 4, text: 'At 27.0 °C the tape is correct again and the rod has shrunk by the same factor.', ans: 'At 27.0 °C the rod is 63.0 cm long.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const T = 27 + 18 * smooth(clamp((t - 3) / 3)), s = 1 + E * A * (T - 27);
    ctx.fillStyle = P.sand; ctx.fillRect(X0, Y, 70 * K * s, 40); ctx.strokeStyle = P.obj; ctx.lineWidth = 1.5; ctx.strokeRect(X0, Y, 70 * K * s, 40);
    for (let c = 0; c <= 70; c++) { const x = X0 + c * K * s; vline(ctx, x, Y, Y + (c % 10 ? (c % 5 ? 8 : 13) : 20), P.ink, 1); if (c % 10 === 0) label(ctx, String(c), x, Y + 30, { align: 'center', size: 11 }); }
    ctx.fillStyle = P.objFill2; ctx.fillRect(X0, Y - 30, 63 * K * s, 26); ctx.strokeRect(X0, Y - 30, 63 * K * s, 26); label(ctx, 'steel rod', X0 + 20, Y - 17, { size: 13, weight: 700 });
    vline(ctx, X0 + 63 * K * s, Y - 40, Y + 20, P.force, 2); label(ctx, 'reads 63.0', X0 + 63 * K * s, Y - 52, { align: 'center', weight: 800, size: 14, color: P.force });
    label(ctx, `${T.toFixed(1)} °C`, 60, 80, { weight: 800, size: 20, color: T > 30 ? P.force : P.ink });
    if (ans) {
      if (t >= stages[1].t0 + 2) label(ctx, 'true length at 45 °C ≈ 63.0136 cm', 60, 400, { weight: 800, size: 16, color: P.accent });
      if (t >= stages[2].t0) label(ctx, 'at 27 °C: 63.0 cm', 60, 430, { weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['At 27 °C the tape is correct', 'At 45 °C: 63.0 × (1 + αΔT) ≈ 63.0136 cm', 'At 27 °C the rod is 63.0 cm'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The actual length of the rod on the hot day (45.0 °C).', 'The length of the same rod at 27.0 °C.']);
    note(ctx, 'expansion exaggerated 200 times; 7 px per cm');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const A = 1.2e-5, DS = 8.70, DH = 8.69, CX = 280, CY = 270, TF = 27 - 0.01 / (DS * A), D = 8;
  const px = d => 100 + (d - 8.69) * 2000;                                 // exaggerated radius in px
  const qStages = [
    { title: 'Too tight at 27 °C', dur: 3, text: 'At 27 °C the steel shaft is 8.70 cm across; the hole in the steel wheel is 8.69 cm.' },
    { title: 'Cooled with dry ice', dur: D - 3, text: 'The shaft is cooled with dry ice. α_steel = 1.20 × 10⁻⁵ K⁻¹.' },
    { title: 'What is asked', dur: 4, text: 'At what temperature of the shaft does the wheel slip on?' },
  ];
  const stages = [
    { title: 'Needed shrinkage', dur: 3, text: 'The shaft must shrink by 8.70 − 8.69 = 0.01 cm.', ans: 'Δd = −0.01 cm.' },
    { title: 'Cooling', dur: D - 3, text: 'Δd = d α ΔT.', ans: 'ΔT = −0.01 / (8.70 × 1.20 × 10⁻⁵) ≈ −96 K.' },
    { title: 'Temperature', dur: 4, text: 'Subtract from 27 °C.', ans: 'T ≈ 27 − 96 ≈ −69 °C.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const T = 27 + (TF - 27) * smooth(clamp((t - 3) / (D - 3.5))), d = DS * (1 + A * (T - 27));
    ctx.save(); ctx.fillStyle = P.objFill2; ctx.beginPath(); ctx.arc(CX, CY, 200, 0, Math.PI * 2); ctx.arc(CX, CY, px(DH), 0, Math.PI * 2, true); ctx.fill('evenodd'); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = P.vel; ctx.globalAlpha = 0.45; ctx.beginPath(); ctx.arc(CX, CY, px(d), 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, px(d), 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    label(ctx, 'wheel', CX, CY - 160, { align: 'center', weight: 700, size: 14 }); label(ctx, `shaft ${d.toFixed(4)} cm`, CX, CY, { align: 'center', weight: 800, size: 14, halo: true });
    label(ctx, 'hole 8.69 cm', CX, CY + px(DH) + 20, { align: 'center', size: 13 });
    label(ctx, `${T.toFixed(0)} °C`, 40, 60, { weight: 800, size: 20, color: T < 0 ? P.vel : P.ink });
    if (d <= DH + 1e-6) label(ctx, 'it fits!', CX, CY + 30, { align: 'center', weight: 800, size: 15, color: P.accent, halo: true });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['Shrink by 0.01 cm', 'ΔT = −0.01/(8.70 × 1.20 × 10⁻⁵) ≈ −96 K', 'T ≈ −69 °C'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The temperature of the shaft at which the wheel slips on.']);
    note(ctx, 'end view; the 0.01 cm difference is enormously exaggerated');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const A = 1.7e-5, E = 30, CX = 280, CY = 270, D0 = 4.24, K = 30, D = 7;   // 30 px per cm; expansion ×30
  const qStages = [
    { title: 'A hole in copper', dur: 3, text: 'A hole 4.24 cm across is drilled in a copper sheet at 27.0 °C.' },
    { title: 'Heated to 227 °C', dur: D - 3, text: 'The sheet is heated to 227 °C. α_copper = 1.70 × 10⁻⁵ K⁻¹.' },
    { title: 'What is asked', dur: 4, text: 'What is the change in the diameter of the hole?' },
  ];
  const stages = [
    { title: 'Like an enlargement', dur: 3, text: 'Heating scales every length in the sheet by (1 + αΔT): the hole grows just as a copper disc filling it would.', ans: 'The hole gets bigger, not smaller.' },
    { title: 'Heating', dur: D - 3, text: 'ΔT = 200 K.', ans: 'Δd = 4.24 × 1.70 × 10⁻⁵ × 200 ≈ 0.0144 cm.' },
    { title: 'Result', dur: 4, text: 'The new diameter is about 4.2544 cm.', ans: 'Increase ≈ 1.44 × 10⁻² cm.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const T = 27 + 200 * smooth(clamp((t - 3) / 3)), s = 1 + E * A * (T - 27);
    ctx.save(); ctx.translate(CX, CY); ctx.scale(s, s); ctx.fillStyle = P.ke; ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.rect(-200, -170, 400, 340); ctx.arc(0, 0, D0 / 2 * K, 0, Math.PI * 2); ctx.fill('evenodd'); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, D0 / 2 * K, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    dim(ctx, CX - D0 / 2 * K * s, CX + D0 / 2 * K * s, CY, P.ink); label(ctx, `${(D0 * (1 + A * (T - 27))).toFixed(4)} cm`, CX, CY - 16, { align: 'center', weight: 800, size: 14, halo: true });
    label(ctx, `${T.toFixed(0)} °C`, 40, 60, { weight: 800, size: 20, color: T > 50 ? P.force : P.ink });
    label(ctx, 'dashed: the hole at 27 °C', 40, 500, { size: 12, color: P.ink2 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['The hole scales like the copper', 'Δd = dαΔT = 4.24 × 1.70 × 10⁻⁵ × 200', '≈ 1.44 × 10⁻² cm increase'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The change in the diameter of the hole when the sheet is heated to 227 °C.']);
    note(ctx, '30 px per cm; expansion exaggerated 30 times');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const Y = 2.0e-5, YM = 0.91e11, AR = Math.PI * 1e-6, DT = 66, TMAX = YM * AR * Y * DT, X0 = 80, X1 = 520, WY = 250, D = 7;
  const qStages = [
    { title: 'Held taut at 27 °C', dur: 3, text: 'A brass wire 1.8 m long, diameter 2.0 mm, is held with little tension between two rigid supports at 27 °C.' },
    { title: 'Cooled to −39 °C', dur: D - 3, text: 'The wire is cooled to −39 °C. α = 2.0 × 10⁻⁵ K⁻¹, Y = 0.91 × 10¹¹ Pa.' },
    { title: 'What is asked', dur: 4, text: 'What tension develops in the wire?' },
  ];
  const stages = [
    { title: 'It wants to shrink', dur: 3, text: 'Free, the wire would shorten by LαΔT. The supports stop it.', ans: '' },
    { title: 'Tension builds up', dur: D - 3, text: 'The supports must stretch it back by LαΔT: a strain αΔT.', ans: 'Stress = YαΔT; tension = YAαΔT.' },
    { title: 'Tension', dur: 4, text: 'ΔT = 66 K; A = π(1.0 × 10⁻³)² m².', ans: 'T = 0.91 × 10¹¹ × 3.14 × 10⁻⁶ × 2.0 × 10⁻⁵ × 66 ≈ 3.8 × 10² N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (const x of [X0, X1]) hatchRect(ctx, x + (x < 300 ? -30 : 0), WY - 80, 30, 160, P.obj, P.objFill);
    const f = smooth(clamp((t - 3) / 3)), T = 27 - 66 * f;
    ctx.save(); ctx.strokeStyle = T < 0 ? P.vel : P.ke; ctx.lineWidth = 4; seg(ctx, X0, WY, X1, WY); ctx.restore();
    if (f > 0.05) { const g = 40 * f; ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); seg(ctx, X0, WY + 40, X1 - g, WY + 40); ctx.restore(); label(ctx, 'length it would shrink to (exaggerated)', X0, WY + 58, { size: 12, color: P.ink2 }); }
    label(ctx, `${T.toFixed(0)} °C`, 40, 60, { weight: 800, size: 20, color: T < 0 ? P.vel : P.ink });
    if (ans && f > 0.05) { const L = 80 * f; vec(ctx, X0 + 10, WY - 20, -0, 0, '', P.force); vec(ctx, X0 + 40 + L, WY - 20, -L, 0, '', P.force); vec(ctx, X1 - 40 - L, WY - 20, L, 0, '', P.force); label(ctx, `tension ≈ ${(TMAX * f).toFixed(0)} N`, 300, WY - 40, { align: 'center', weight: 800, size: 15, color: P.force }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['Prevented shrinkage: strain = αΔT', 'Tension = YAαΔT', '≈ 3.8 × 10² N'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The tension developed in the wire when it is cooled to −39 °C.']);
    note(ctx, 'the shrinkage the wire would have is exaggerated');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const K = 4.5, E = 50, X0 = 40, Y = 260, LB = 50, LS = 50, AB = 2.0e-5, AS = 1.2e-5, D = 7;
  const qStages = [
    { title: 'Joined rods at 40 °C', dur: 3, text: 'A brass rod and a steel rod, each 50 cm long and 3.0 mm across, are joined end to end at 40.0 °C. The ends are free.' },
    { title: 'Heated to 250 °C', dur: D - 3, text: 'The combined rod is heated to 250 °C. α_brass = 2.0 × 10⁻⁵ K⁻¹, α_steel = 1.2 × 10⁻⁵ K⁻¹.' },
    { title: 'What is asked', dur: 4, text: 'What is the change in length of the combined rod? Is there a thermal stress at the junction?' },
  ];
  const stages = [
    { title: 'Each rod expands', dur: 3, text: 'ΔL = LαΔT for each, with ΔT = 210 K.', ans: '' },
    { title: 'Heating', dur: D - 3, text: 'Brass expands more than steel.', ans: 'Brass: 50 × 2.0 × 10⁻⁵ × 210 = 0.21 cm. Steel: 50 × 1.2 × 10⁻⁵ × 210 = 0.126 cm.' },
    { title: 'Total; stress?', dur: 4, text: 'The ends are free, so nothing resists the expansion.', ans: 'Total ≈ 0.34 cm. No thermal stress along the rod.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const f = smooth(clamp((t - 3) / 3)), T = 40 + 210 * f, eb = LB * AB * 210 * f * E, es = LS * AS * 210 * f * E;
    const xb = X0 + (LB + eb) * K, xs = xb + (LS + es) * K;
    ctx.fillStyle = P.ke; ctx.fillRect(X0, Y, xb - X0, 26); ctx.fillStyle = P.objFill2; ctx.fillRect(xb, Y, xs - xb, 26); ctx.strokeStyle = P.obj; ctx.lineWidth = 1.5; ctx.strokeRect(X0, Y, xs - X0, 26); vline(ctx, xb, Y, Y + 26, P.obj, 2);
    label(ctx, 'brass', (X0 + xb) / 2, Y + 13, { align: 'center', weight: 700, size: 13 }); label(ctx, 'steel', (xb + xs) / 2, Y + 13, { align: 'center', weight: 700, size: 13 });
    for (const x of [X0 + LB * K, X0 + (LB + LS) * K]) vline(ctx, x, Y - 30, Y + 60, P.ink2, 1, [3, 3]);
    label(ctx, `${T.toFixed(0)} °C`, 40, 60, { weight: 800, size: 20, color: T > 60 ? P.force : P.ink });
    if (ans && f > 0.05) { label(ctx, `brass +${(LB * AB * 210 * f).toFixed(3)} cm`, (X0 + xb) / 2, Y + 50, { align: 'center', size: 13, weight: 700 }); label(ctx, `steel +${(LS * AS * 210 * f).toFixed(3)} cm`, (xb + xs) / 2, Y + 50, { align: 'center', size: 13, weight: 700 }); }
    if (ans && t >= stages[2].t0) label(ctx, 'total ≈ 0.34 cm; ends free: no thermal stress', 300, 400, { align: 'center', weight: 800, size: 16, color: P.accent });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['ΔL = LαΔT, ΔT = 210 K', 'Brass 0.21 cm, steel 0.126 cm', 'Total ≈ 0.34 cm; no thermal stress'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The change in length of the combined rod at 250 °C.', 'Is a thermal stress developed at the junction?']);
    note(ctx, '4.5 px per cm; expansions exaggerated 50 times; dashed lines: original ends');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const M = 2500, C = 0.39, LF = 335, QT = M * C * 500, MI = QT / LF, D = 9, IY = 300;
  const qStages = [
    { title: 'From the furnace', dur: 3, text: 'A 2.5 kg copper block is heated to 500 °C.' },
    { title: 'Onto the ice', dur: D - 3, text: 'It is placed on a large block of ice. c(copper) = 0.39 J/g K; heat of fusion of water = 335 J/g.' },
    { title: 'What is asked', dur: 4, text: 'What is the maximum amount of ice that can melt?' },
  ];
  const stages = [
    { title: 'Heat given out', dur: 3, text: 'The block can cool at most to 0 °C, the temperature of melting ice.', ans: 'Q = mcΔT = 2500 × 0.39 × 500 ≈ 4.875 × 10⁵ J.' },
    { title: 'Melting', dur: D - 3, text: 'All this heat goes into melting ice at 0 °C.', ans: 'm = Q / L = 4.875 × 10⁵ / 335 ≈ 1455 g.' },
    { title: 'Answer', dur: 4, text: 'Round off.', ans: 'About 1.5 kg of ice.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const f = clamp((t - 3) / (D - 3.5)), Tc = 500 * (1 - smooth(f)), melted = MI * smooth(f), sink = 50 * smooth(f);
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.35; ctx.fillRect(60, IY, 480, 180); ctx.globalAlpha = 1; ctx.strokeStyle = P.ink2; ctx.strokeRect(60, IY, 480, 180); label(ctx, 'large block of ice (0 °C)', 300, IY + 160, { align: 'center', size: 13 });
    ctx.fillStyle = P.sheet; ctx.fillRect(230, IY, 140, sink); if (sink > 2) { ctx.fillStyle = P.water; ctx.globalAlpha = 0.7; ctx.fillRect(230, IY + sink - 8, 140, 8); ctx.globalAlpha = 1; }
    const hot = Tc / 500; ctx.fillStyle = P.ke; ctx.fillRect(240, IY - 70 + sink, 120, 70); ctx.fillStyle = P.force; ctx.globalAlpha = 0.7 * hot; ctx.fillRect(240, IY - 70 + sink, 120, 70); ctx.globalAlpha = 1; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(240, IY - 70 + sink, 120, 70);
    label(ctx, '2.5 kg copper', 300, IY - 84 + sink, { align: 'center', weight: 700, size: 13 });
    label(ctx, `${Tc.toFixed(0)} °C`, 40, 60, { weight: 800, size: 20, color: Tc > 50 ? P.force : P.ink });
    if (ans) { label(ctx, `ice melted: ${(melted / 1000).toFixed(2)} kg`, 40, 92, { weight: 800, size: 16, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Working', ['Q = mcΔT ≈ 4.875 × 10⁵ J', 'Ice melted = Q/L ≈ 1455 g', '≈ 1.5 kg'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['The maximum amount of ice that can melt.']);
    note(ctx, 'ice block not to scale; colour of the copper suggests its temperature');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const K = 0.01, A = 6 * 0.3 * 0.3, DT = 45, DX = 0.05, H = K * A * DT / DX, TT = 6 * 3600, LF = 335e3, MELT = H * TT / LF, D = 10, CX = 290, CY = 270;
  const qStages = [
    { title: 'Ice in a thermacole box', dur: D, text: 'A cubical thermacole icebox, side 30 cm, walls 5.0 cm thick, holds 4.0 kg of ice. Outside it is 45 °C. k = 0.01 W m⁻¹ K⁻¹.' },
    { title: 'What is asked', dur: 4, text: 'Estimate the ice remaining after 6 h.' },
  ];
  const stages = [
    { title: 'Heat leaking in', dur: D, text: 'Heat flows in through all six faces: H = kAΔT/d, with A = 6 × 0.30² m², ΔT = 45 K (ice at 0 °C), d = 0.050 m.', ans: 'H ≈ 4.86 W, all of it melting ice.' },
    { title: 'After 6 hours', dur: 5, text: 'Heat in 6 h = H × 21 600 s; ice melted = heat / L.', ans: '≈ 1.05 × 10⁵ J melts ≈ 0.31 kg; about 3.7 kg remains.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const f = clamp(t / (D - 0.5)), m = 4.0 - (ans ? MELT * f : 0), S = 300, W = 50;
    ctx.fillStyle = P.sheet; ctx.fillRect(CX - S / 2, CY - S / 2, S, S); ctx.fillStyle = P.objFill; ctx.fillRect(CX - S / 2, CY - S / 2, S, W); ctx.fillRect(CX - S / 2, CY + S / 2 - W, S, W); ctx.fillRect(CX - S / 2, CY - S / 2, W, S); ctx.fillRect(CX + S / 2 - W, CY - S / 2, W, S);
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(CX - S / 2, CY - S / 2, S, S); ctx.strokeRect(CX - S / 2 + W, CY - S / 2 + W, S - 2 * W, S - 2 * W);
    const side = 150 * Math.cbrt(m / 4.0); ctx.fillStyle = P.water; ctx.globalAlpha = 0.6; ctx.fillRect(CX - side / 2, CY + S / 2 - W - side, side, side); ctx.globalAlpha = 1;
    label(ctx, `ice ${m.toFixed(2)} kg`, CX, CY + S / 2 - W - side - 12, { align: 'center', weight: 800, size: 15 });
    label(ctx, 'thermacole 5.0 cm', CX, CY - S / 2 + 26, { align: 'center', size: 12 }); label(ctx, 'outside 45 °C', 40, 40, { weight: 700, size: 15, color: P.force });
    if (ans) { for (const [x, y, dx, dy] of [[CX - S / 2 - 50, CY, 40, 0], [CX + S / 2 + 50, CY, -40, 0], [CX, CY - S / 2 - 40, 0, 32]]) vec(ctx, x, y, dx, dy, '', P.force, { lw: 3 }); label(ctx, 'H ≈ 4.86 W', CX + S / 2 + 10, CY - 40, { weight: 700, size: 13, color: P.force }); clock(ctx, 60, 490, f * 360, `${(6 * f).toFixed(1)} h`); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['H = kAΔT/d ≈ 4.86 W', 'In 6 h: ≈ 1.05 × 10⁵ J → 0.31 kg melts; ≈ 3.7 kg left'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The amount of ice remaining after 6 h.']);
    note(ctx, 'cross-section of the box; 6 hours shown in 10 s');
  }
  return { qStages, stages, draw };
})();

//@@ q20
const SCENE = (() => {
  const TS = 20, K1 = Math.log(2) / 5, D = 9;
  const T1 = t => TS + 60 * Math.exp(-K1 * t), T2 = t => TS + 40 * Math.exp(-K1 * t);
  const qStages = [
    { title: 'Cooling', dur: D, text: 'A body cools from 80 °C to 50 °C in 5 minutes. The surroundings are at 20 °C.' },
    { title: 'What is asked', dur: 4, text: 'How long does it take to cool from 60 °C to 30 °C?' },
  ];
  const stages = [
    { title: 'Newton’s law of cooling', dur: D, text: 'The rate of cooling is proportional to the excess temperature over the surroundings. NCERT uses the average excess over each interval.', ans: 'First run: 30/5 = K × (65 − 20) → K = 2/15 per minute.' },
    { title: 'Second run', dur: 5, text: 'Now the average excess is 45 − 20 = 25 °C: the body cools more slowly.', ans: '30/t = (2/15) × 25 → t = 9 min (the exact exponential law gives 10 min).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 70, y: 60, w: 470, h: 360, x0: 0, x1: 14, y0: 0, y1: 90, xt: [5, 9, 10], yt: [20, 30, 50, 60, 80], xl: 't (min)', yl: 'T (°C)' });
    hline(ctx, g.X(0), g.X(14), g.Y(20), P.ink2, 1, [5, 4]); label(ctx, 'surroundings 20 °C', g.X(14) - 4, g.Y(20) + 12, { align: 'right', size: 12, color: P.ink2 });
    const u = Math.min(t, D) / (D - 1) * 5;
    plot(ctx, g, T1, 0, Math.min(u, 5), P.force);
    if (t >= D - 1 || !ans) { ball(ctx, g.X(5), g.Y(50), 5, P.force); label(ctx, '80 → 50 °C in 5 min', g.X(5) + 8, g.Y(50) - 14, { weight: 700, size: 13, color: P.force }); }
    if (ans && t >= stages[1].t0) { const v = Math.min((t - stages[1].t0) / 4, 1) * 10; plot(ctx, g, T2, 0, v, P.vel); if (v >= 10) { ball(ctx, g.X(10), g.Y(30), 5, P.vel); label(ctx, '60 → 30 °C', g.X(10) + 8, g.Y(30) - 14, { weight: 700, size: 13, color: P.vel }); vline(ctx, g.X(9), g.Y(30) - 30, g.Y(0), P.accent, 1.5, [4, 3]); label(ctx, 'NCERT: 9 min', g.X(9) - 6, g.Y(30) - 40, { align: 'right', weight: 800, size: 13, color: P.accent }); } }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['30/5 = K(65 − 20) → K = 2/15 min⁻¹', '30/t = K(45 − 20) → t = 9 min (exact law: 10 min)'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The time taken to cool from 60 °C to 30 °C.']);
    note(ctx, 'curves follow the exact exponential law');
  }
  return { qStages, stages, draw };
})();
