//@@ q01
const SCENE = (() => {
  const K = 60, TOP = 50, LS = 4.7, LC = 3.5, EXT = 18;                   // 60 px per metre; extension exaggerated to 18 px
  const qStages = [
    { title: 'Two wires', dur: 4, text: 'A steel wire (4.7 m, 3.0 × 10⁻⁵ m²) and a copper wire (3.5 m, 4.0 × 10⁻⁵ m²) carry the same load.' },
    { title: 'Same stretch', dur: 4, text: 'They stretch by the same amount.' },
    { title: 'What is asked', dur: 4, text: 'What is the ratio of the Young’s modulus of steel to that of copper?' },
  ];
  const stages = [
    { title: 'Young’s modulus', dur: 4, text: 'Y = stress/strain = (F/A)/(ΔL/L) = FL/(AΔL).', ans: 'Same F and same ΔL, so Y ∝ L/A.' },
    { title: 'Compare', dur: 4, text: 'Steel is longer and thinner: it must be stiffer to stretch only as much as copper.', ans: 'Y_s/Y_c = (L_s/A_s)/(L_c/A_c) = (4.7 × 4.0)/(3.0 × 3.5).' },
    { title: 'The ratio', dur: 4, text: 'Work it out.', ans: 'Y_s/Y_c ≈ 1.79.' },
  ];
  function wire(ctx, x, L, w, name, col, e) {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; seg(ctx, x, TOP, x, TOP + L * K + e); ctx.restore();
    block(ctx, x - 22, TOP + L * K + e, 44, 30, 'load', P.objFill2); label(ctx, name, x + 14, TOP + L * K / 2, { weight: 700, size: 14 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 80, TOP - 16, 420, 16, P.obj, P.objFill); hline(ctx, 80, 500, TOP, P.obj, 2);
    const e = EXT * smooth(clamp((t - 3) / 1.5));
    wire(ctx, 200, LS, 3, 'steel 4.7 m', P.ink, e); wire(ctx, 380, LC, 4, 'copper 3.5 m', P.ke, e);
    label(ctx, 'A = 3.0 × 10⁻⁵ m²', 214, TOP + LS * K / 2 + 20, { size: 12, color: P.ink2 }); label(ctx, 'A = 4.0 × 10⁻⁵ m²', 394, TOP + LC * K / 2 + 20, { size: 12, color: P.ink2 });
    if (e > 1) { for (const [x, L] of [[200, LS], [380, LC]]) { hline(ctx, x - 40, x - 26, TOP + L * K, P.ink2, 1, [2, 2]); vdim(ctx, x - 32, TOP + L * K, TOP + L * K + e, P.vel); } label(ctx, 'same ΔL', 290, TOP + LC * K + 40, { align: 'center', weight: 700, size: 13, color: P.vel }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['Y = FL/(AΔL): Y ∝ L/A here', 'Y_s/Y_c = (4.7/3.0)/(3.5/4.0)', '≈ 1.79'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The ratio of the Young’s modulus of steel to that of copper.']);
    note(ctx, 'lengths to scale (60 px per metre); the stretch is exaggerated');
  }
  return { qStages, stages, draw };
})();

//@@ q02
const SCENE = (() => {
  const f = s => s <= 0.004 ? 75000 * s : 300 + 2e4 * (s - 0.004) - 1.5e8 * (s - 0.004) ** 2, D = 7;
  const qStages = [
    { title: 'Fig. 8.9', dur: D, text: 'The stress–strain curve of a material: stress in 10⁶ N/m², strain up to about 0.004.' },
    { title: 'What is asked', dur: 4, text: 'Find (a) Young’s modulus and (b) the approximate yield strength.' },
  ];
  const stages = [
    { title: 'The straight part', dur: D, text: 'Young’s modulus is the slope of the straight (elastic) part.', ans: 'At strain 0.002 the stress is 150 × 10⁶ N/m².' },
    { title: 'Young’s modulus', dur: 4, text: 'Y = stress / strain.', ans: '(a) Y = 150 × 10⁶ / 0.002 = 7.5 × 10¹⁰ N/m².' },
    { title: 'Yield strength', dur: 4, text: 'Where the curve stops being straight, the material yields.', ans: '(b) ≈ 300 × 10⁶ = 3 × 10⁸ N/m².' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 90, y: 60, w: 450, h: 360, x0: 0, x1: 0.0045, y0: 0, y1: 330, xt: [0.001, 0.002, 0.003, 0.004], yt: [50, 100, 150, 200, 250, 300], xl: 'strain', yl: 'stress (10⁶ N/m²)' });
    for (const v of [50, 100, 150, 200, 250, 300]) hline(ctx, g.X(0), g.X(0.0045), g.Y(v), P.grid, 1);
    for (const v of [0.001, 0.002, 0.003, 0.004]) vline(ctx, g.X(v), g.Y(0), g.Y(330), P.grid, 1);
    plot(ctx, g, f, 0, Math.min(0.0043, 0.0043 * clamp(t / (D - 1))), P.vel);
    if (ans && t >= stages[1].t0) { ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); seg(ctx, g.X(0.002), g.Y(0), g.X(0.002), g.Y(150)); seg(ctx, g.X(0), g.Y(150), g.X(0.002), g.Y(150)); ctx.restore(); ball(ctx, g.X(0.002), g.Y(150), 6, P.accent); label(ctx, 'Y = 150 × 10⁶ / 0.002 = 7.5 × 10¹⁰ N/m²', g.X(0.0021), g.Y(150) + 22, { weight: 800, size: 14, color: P.accent }); }
    if (ans && t >= stages[2].t0) { ball(ctx, g.X(0.004), g.Y(300), 6, P.force); label(ctx, 'yield ≈ 3 × 10⁸ N/m²', g.X(0.004) - 8, g.Y(300) - 18, { align: 'right', weight: 800, size: 14, color: P.force }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Read a point on the straight part', '(a) Y = 7.5 × 10¹⁰ N/m²', '(b) yield strength ≈ 3 × 10⁸ N/m²'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['(a) The Young’s modulus of the material.', '(b) Its approximate yield strength.']);
    note(ctx, 'curve follows Fig. 8.9');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const A = hermite([[0, 0, 6], [0.9, 5.2, 2.5], [1.6, 6.2, 0.6], [3.4, 7.3, 0.4], [4.0, 7.5, -0.6]]), B = hermite([[0, 0, 2.6], [2.2, 5.7, 2.4], [2.5, 6.2, 0], [2.9, 6.0, 0], [3.3, 6.2, 0]]), D = 8;
  const qStages = [
    { title: 'Fig. 8.10', dur: D, text: 'The stress–strain graphs of materials A and B, drawn to the same scale (here on one set of axes).' },
    { title: 'What is asked', dur: 4, text: '(a) Which has the greater Young’s modulus? (b) Which is stronger?' },
  ];
  const stages = [
    { title: 'Slopes', dur: D, text: 'Young’s modulus is the slope of the initial straight part of the curve.', ans: '(a) A rises more steeply: A has the greater Young’s modulus.' },
    { title: 'Breaking stress', dur: 4, text: 'Strength is the greatest stress a material can take before it breaks.', ans: '(b) A reaches a higher stress before breaking: A is stronger.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, { x: 90, y: 60, w: 450, h: 360, x0: 0, x1: 4.3, y0: 0, y1: 8.5, xl: 'strain', yl: 'stress' });
    const u = clamp(t / (D - 1));
    plot(ctx, g, A, 0, 4.0 * u, P.vel); plot(ctx, g, B, 0, 3.3 * u, P.force);
    if (u > 0.95) { label(ctx, 'A', g.X(4.0) + 6, g.Y(7.5), { weight: 800, size: 16, color: P.vel }); label(ctx, 'B', g.X(3.3) + 6, g.Y(6.2), { weight: 800, size: 16, color: P.force }); }
    if (ans && t >= D - 1) {
      ctx.save(); ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.strokeStyle = P.vel; seg(ctx, g.X(0), g.Y(0), g.X(1.2), g.Y(7.2)); ctx.strokeStyle = P.force; seg(ctx, g.X(0), g.Y(0), g.X(2.9), g.Y(7.54)); ctx.restore();
      if (t >= stages[1].t0) { hline(ctx, g.X(0), g.X(4.0), g.Y(7.5), P.vel, 1, [3, 3]); hline(ctx, g.X(0), g.X(3.3), g.Y(6.2), P.force, 1, [3, 3]); label(ctx, 'breaking stress', g.X(0) + 6, g.Y(7.5) - 12, { size: 12, color: P.vel }); }
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) Steeper initial slope: A', '(b) Higher breaking stress: A'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['(a) The material with the greater Young’s modulus.', '(b) The stronger material.']);
    note(ctx, 'curve shapes follow Fig. 8.10; no values given');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const K = 120, TOP = 50, X = 260, X1 = 1500, ES = 1.5e-4 * X1 * K / 1.5 * 1.5, EB = 1.3e-4 * X1 * K;   // extensions ×1500
  const qStages = [
    { title: 'Fig. 8.11', dur: 4, text: 'A steel wire (1.5 m) holds a 4.0 kg mass; a brass wire (1.0 m) hangs below it holding 6.0 kg. Both wires have diameter 0.25 cm.' },
    { title: 'Loaded', dur: 3, text: 'The wires stretch.' },
    { title: 'What is asked', dur: 4, text: 'Compute the elongations of the steel and the brass wires.' },
  ];
  const stages = [
    { title: 'Tension in each wire', dur: 4, text: 'The steel wire holds up everything below it: both masses. The brass wire holds only the 6.0 kg.', ans: 'Steel: (4.0 + 6.0) × 9.8 = 98 N. Brass: 6.0 × 9.8 = 58.8 N.' },
    { title: 'Elongations', dur: 3, text: 'ΔL = FL/(AY), with A = π(0.125 × 10⁻²)² ≈ 4.91 × 10⁻⁶ m².', ans: 'Steel: 98 × 1.5 / (4.91 × 10⁻⁶ × 2.0 × 10¹¹) ≈ 1.5 × 10⁻⁴ m.' },
    { title: 'Brass', dur: 4, text: 'Y (brass) = 0.91 × 10¹¹ N/m².', ans: 'Brass: 58.8 × 1.0 / (4.91 × 10⁻⁶ × 0.91 × 10¹¹) ≈ 1.3 × 10⁻⁴ m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, X - 120, TOP - 16, 240, 16, P.obj, P.objFill); hline(ctx, X - 120, X + 120, TOP, P.obj, 2);
    const f = smooth(clamp((t - 4) / 2)), es = ES * f, eb = EB * f;
    const y1 = TOP + 1.5 * K + es, y2 = y1 + 22 + 1.0 * K + eb;
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; seg(ctx, X, TOP, X, y1); seg(ctx, X, y1 + 22, X, y2); ctx.restore();
    block(ctx, X - 24, y1, 48, 22, '4.0 kg', P.water); block(ctx, X - 32, y2, 64, 28, '6.0 kg', P.water);
    label(ctx, 'steel, 1.5 m', X + 14, TOP + 0.75 * K, { weight: 700, size: 14 }); label(ctx, 'brass, 1.0 m', X + 14, y1 + 22 + 0.5 * K, { weight: 700, size: 14 });
    if (f > 0.05) { vdim(ctx, X - 60, TOP + 1.5 * K, y1, P.vel); vdim(ctx, X - 60, y1 + 22 + 1.0 * K, y2, P.vel); hline(ctx, X - 70, X - 4, TOP + 1.5 * K, P.ink2, 1, [2, 2]); hline(ctx, X - 70, X - 4, y1 + 22 + K, P.ink2, 1, [2, 2]); }
    if (ans) {
      vec(ctx, X + 110, TOP + 0.75 * K + 30, 0, -40, 'T = 98 N', P.force, { side: 1, at: 1, align: 'left', ax: 4, size: 13 });
      vec(ctx, X + 110, y1 + 22 + 0.5 * K + 30, 0, -40, 'T = 58.8 N', P.force, { side: 1, at: 1, align: 'left', ax: 4, size: 13 });
      if (t >= stages[1].t0) label(ctx, 'ΔL ≈ 1.5 × 10⁻⁴ m', X - 70, TOP + 1.5 * K - 16, { align: 'right', weight: 800, size: 13, color: P.vel });
      if (t >= stages[2].t0) label(ctx, 'ΔL ≈ 1.3 × 10⁻⁴ m', X - 70, y1 + 22 + K - 16, { align: 'right', weight: 800, size: 13, color: P.vel });
      partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['Steel carries 98 N; brass 58.8 N', 'Steel: ΔL ≈ 1.5 × 10⁻⁴ m', 'Brass: ΔL ≈ 1.3 × 10⁻⁴ m'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The elongations of the steel and the brass wires.']);
    note(ctx, 'lengths 120 px per metre; elongations exaggerated 1500 times');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const S = 200, X0 = 120, Y0 = 140, DEF = 30;                             // deflection drawn as 30 px (exaggerated ~38 000×)
  const qStages = [
    { title: 'Cube on a wall', dur: 4, text: 'An aluminium cube of edge 10 cm has one face fixed to a vertical wall.' },
    { title: 'Loaded', dur: 4, text: 'A 100 kg mass is attached to the opposite face. The shear modulus of aluminium is 25 GPa.' },
    { title: 'What is asked', dur: 4, text: 'What is the vertical deflection of the loaded face?' },
  ];
  const stages = [
    { title: 'Shear stress', dur: 4, text: 'The weight acts along the free face: a shearing force over the face area.', ans: 'Stress = 100 × 9.8 / (0.10)² = 9.8 × 10⁴ N/m².' },
    { title: 'Shear strain', dur: 4, text: 'Strain = stress / G.', ans: 'Strain = 9.8 × 10⁴ / 25 × 10⁹ = 3.92 × 10⁻⁶.' },
    { title: 'Deflection', dur: 4, text: 'Deflection = strain × edge length.', ans: '3.92 × 10⁻⁶ × 0.10 m = 3.92 × 10⁻⁷ m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, X0 - 30, 60, 30, 400, P.obj, P.objFill); vline(ctx, X0, 60, 460, P.obj, 2);
    const d = DEF * smooth(clamp((t - 4) / 2));
    ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X0 + S, Y0 + d); ctx.lineTo(X0 + S, Y0 + S + d); ctx.lineTo(X0, Y0 + S); ctx.closePath(); ctx.fill(); ctx.stroke();
    label(ctx, 'aluminium', X0 + S / 2, Y0 + S / 2, { align: 'center', weight: 700, size: 14 });
    dim(ctx, X0, X0 + S, Y0 - 24, P.ink2); label(ctx, '10 cm', X0 + S / 2, Y0 - 38, { align: 'center', weight: 700, size: 13 });
    if (t >= 4) { ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; seg(ctx, X0 + S + 2, Y0 + S / 2 + d, X0 + S + 60, Y0 + S / 2 + d); seg(ctx, X0 + S + 60, Y0 + S / 2 + d, X0 + S + 60, Y0 + S + 80 + d); ctx.restore(); block(ctx, X0 + S + 30, Y0 + S + 80 + d, 60, 40, '100 kg', P.water); }
    if (d > 1) { hline(ctx, X0 + S, X0 + S + 40, Y0, P.ink2, 1, [2, 3]); vdim(ctx, X0 + S + 24, Y0, Y0 + d, P.force); label(ctx, ans && t >= stages[2].t0 ? '3.92 × 10⁻⁷ m' : 'deflection', X0 + S + 34, Y0 + d / 2 - 4, { weight: 800, size: 13, color: P.force }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['Stress = F/A = 9.8 × 10⁴ N/m²', 'Strain = stress/G = 3.92 × 10⁻⁶', 'Deflection = 3.92 × 10⁻⁷ m'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The vertical deflection of the face to which the mass is attached.']);
    note(ctx, 'cube 200 px for 10 cm; deflection exaggerated about 40 000 times');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const TOP = 60, L = 220, XL = 140, XM = 300, XR = 460, R = Math.sqrt(190 / 110);
  const qStages = [
    { title: 'Three wires', dur: 5, text: 'A rigid 15 kg bar hangs symmetrically from three 2.0 m wires: copper at the ends, iron in the middle.' },
    { title: 'What is asked', dur: 4, text: 'What must be the ratio of their diameters if each wire has the same tension?' },
  ];
  const stages = [
    { title: 'Equal tensions, equal stretch', dur: 5, text: 'Equal tensions: each holds 15 × 9.8 / 3 = 49 N. The bar is rigid and stays level, so all three wires stretch by the same ΔL; they have equal lengths.', ans: 'T = YAΔL/L the same for all ⇒ Y × A the same.' },
    { title: 'Diameters', dur: 5, text: 'Iron is stiffer (Y = 190 GPa) than copper (110 GPa), so the copper wires must be thicker.', ans: 'd_Cu / d_Fe = √(Y_Fe / Y_Cu) = √(190/110) ≈ 1.31.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 80, TOP - 16, 440, 16, P.obj, P.objFill); hline(ctx, 80, 520, TOP, P.obj, 2);
    const w = 4;
    ctx.save(); ctx.lineWidth = w * R; ctx.strokeStyle = P.ke; seg(ctx, XL, TOP, XL, TOP + L); seg(ctx, XR, TOP, XR, TOP + L); ctx.lineWidth = w; ctx.strokeStyle = P.ink; seg(ctx, XM, TOP, XM, TOP + L); ctx.restore();
    ctx.fillStyle = P.wood; ctx.fillRect(XL - 30, TOP + L, XR - XL + 60, 18); ctx.strokeStyle = P.obj; ctx.strokeRect(XL - 30, TOP + L, XR - XL + 60, 18);
    label(ctx, 'copper', XL - 10, TOP + L / 2, { align: 'right', weight: 700, size: 13 }); label(ctx, 'iron', XM + 10, TOP + L / 2, { weight: 700, size: 13 }); label(ctx, 'copper', XR + 10, TOP + L / 2, { weight: 700, size: 13 });
    label(ctx, 'rigid bar, 15 kg', 300, TOP + L + 40, { align: 'center', weight: 700, size: 14 }); label(ctx, '2.0 m each', 380, TOP + 20, { align: 'center', size: 12, color: P.ink2 });
    if (ans) {
      for (const x of [XL, XM, XR]) vec(ctx, x + (x === XM ? 0 : 0), TOP + L, 0, -60, '49 N', P.force, { side: 1, at: 1, align: 'left', ax: 8, size: 13 });
      if (t >= stages[1].t0) label(ctx, 'd(copper) : d(iron) = 1.31 : 1', 300, 420, { align: 'center', weight: 800, size: 18, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['Equal T and equal ΔL ⇒ Y_Cu A_Cu = Y_Fe A_Fe', 'd_Cu/d_Fe = √(190/110) ≈ 1.31'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The ratio of the diameters of the copper and iron wires if each has the same tension.']);
    note(ctx, 'wire thicknesses drawn in the ratio 1.31 : 1');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const M = 14.5, L = 1.0, W = 4 * Math.PI, G = 9.8, T = M * G + M * W * W * L, CX = 300, CY = 220, RP = 170, SLOW = 4, D = 8;
  const qStages = [
    { title: 'Whirled in a vertical circle', dur: D, text: 'A 14.5 kg mass on a 1.0 m steel wire (area 0.065 cm²) is whirled in a vertical circle at 2 rev/s at the bottom.' },
    { title: 'What is asked', dur: 4, text: 'Calculate the elongation of the wire when the mass is at the lowest point.' },
  ];
  const stages = [
    { title: 'At the bottom', dur: D, text: 'At the lowest point the wire must hold up the weight and also provide the centripetal force.', ans: 'T − mg = mω²r, ω = 4π rad/s, r = 1.0 m.' },
    { title: 'Tension', dur: 4, text: 'T = mg + mω²r.', ans: 'T = 142 + 2290 ≈ 2432 N.' },
    { title: 'Elongation', dur: 4, text: 'ΔL = TL/(AY), with A = 6.5 × 10⁻⁶ m² and Y = 2.0 × 10¹¹ N/m².', ans: 'ΔL ≈ 1.87 × 10⁻³ m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, RP, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    const tt = ans && t >= stages[0].t1 ? D : Math.min(t, D), a = Math.PI / 2 + (W / SLOW) * (tt - D);      // ends at the bottom
    const x = CX + RP * Math.cos(a), y = CY + RP * Math.sin(a);
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; seg(ctx, CX, CY, x, y); ctx.restore(); ball(ctx, CX, CY, 5, P.ink); ball(ctx, x, y, 14, P.objFill2);
    label(ctx, '14.5 kg', x + 20, y + 4, { weight: 700, size: 13 }); label(ctx, '1.0 m', CX + 8, CY + 60, { weight: 700, size: 13 });
    label(ctx, '2 rev/s at the bottom', 40, 480, { weight: 700, size: 13, color: P.vel });
    if (ans && t >= stages[0].t1 - 0.01) {
      vec(ctx, x - 40, y - 14, 0, -80, 'T ≈ 2432 N', P.force, { side: 1, at: 1, align: 'right', ax: -4, size: 13 });
      vec(ctx, x - 40, y + 14, 0, 30, 'mg = 142 N', P.drag, { side: 1, at: 1, align: 'right', ax: -4, ay: 6, size: 13 });
      label(ctx, 'net upward force = mω²r ≈ 2290 N (centripetal)', CX, 40, { align: 'center', weight: 700, size: 14, color: P.acc });
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['T − mg = mω²r at the bottom', 'T ≈ 142 + 2290 = 2432 N', 'ΔL = TL/(AY) ≈ 1.87 × 10⁻³ m'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The elongation of the wire when the mass is at the lowest point of its path.']);
    note(ctx, 'shown 4 times slower; uniform speed assumed for the drawing; force arrows not to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const H = 300, BY = 450, D = 6;
  const qStages = [
    { title: 'Squeezing water', dur: D, text: '100.0 L of water is put under 100.0 atm more pressure; its volume changes by 0.5 L (to 100.5 L in the data as given).' },
    { title: 'What is asked', dur: 5, text: 'Compute the bulk modulus of water. Compare it with that of air at constant temperature, and explain why the ratio is so large.' },
  ];
  const stages = [
    { title: 'Bulk modulus of water', dur: D, text: 'B = Δp / (ΔV/V), with Δp = 100 × 1.013 × 10⁵ Pa and ΔV/V = 0.5/100.', ans: 'B_water ≈ 1.013 × 10⁷ / 0.005 ≈ 2.0 × 10⁹ Pa.' },
    { title: 'Air', dur: 5, text: 'For air at constant temperature (Boyle’s law, pV constant) B = p ≈ 1.0 × 10⁵ Pa. The same extra pressure squeezes air to about 1/101 of its volume.', ans: 'B_water / B_air ≈ 2 × 10⁴.' },
    { title: 'Why', dur: 4, text: 'Compare the spacing of the molecules.', ans: 'Liquid molecules are packed close and repel strongly when pushed closer; gas molecules are far apart, with lots of empty space.' },
  ];
  function cyl(ctx, x, h, col, name) {
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(x, BY - H - 20, 120, H + 20);
    ctx.fillStyle = col; ctx.globalAlpha = 0.6; ctx.fillRect(x + 2, BY - h, 116, h); ctx.globalAlpha = 1;
    ctx.fillStyle = P.objFill2; ctx.fillRect(x + 2, BY - h - 16, 116, 16); ctx.strokeRect(x + 2, BY - h - 16, 116, 16);
    vec(ctx, x + 60, BY - h - 60, 0, 40, '', P.force); label(ctx, name, x + 60, BY + 20, { align: 'center', weight: 700, size: 14 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const f = smooth(clamp((t - 1) / 3));
    cyl(ctx, 80, H * (1 - 0.05 * f), P.water, 'water, 100 L');
    label(ctx, f > 0.5 ? '+100 atm' : '', 140, BY - H - 80, { align: 'center', weight: 700, size: 14, color: P.force });
    if (ans && t >= stages[1].t0) { const g = smooth(clamp((t - stages[1].t0) / 2.5)); cyl(ctx, 360, H * (1 - g * (1 - 1 / 101)), P.ink2, 'air, 100 L'); label(ctx, '+100 atm', 420, BY - H * (1 - g * (1 - 1 / 101)) - 80, { align: 'center', weight: 700, size: 14, color: P.force }); if (g > 0.9) label(ctx, '≈ 1 L left', 420, BY - 30, { align: 'center', weight: 800, size: 14, color: P.accent }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['B_water = Δp/(ΔV/V) ≈ 2.0 × 10⁹ Pa', 'B_air (isothermal) = p ≈ 10⁵ Pa: ratio ≈ 2 × 10⁴', 'Liquid molecules are tightly packed; gas molecules far apart'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The bulk modulus of water.', 'Its ratio to the bulk modulus of air at constant temperature, and why it is so large.']);
    note(ctx, 'water’s 0.5% change exaggerated 10 times; air drawn to scale (Boyle’s law)');
  }
  return { qStages, stages, draw };
})();
