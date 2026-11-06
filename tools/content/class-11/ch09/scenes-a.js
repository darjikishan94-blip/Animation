//@@ q06
const SCENE = (() => {
  const K = 30, BY = 470, PA = 1.013e5, G = 9.8, HW = PA / (984 * G), HM = 0.76;
  const qStages = [
    { title: 'Two barometers', dur: 5, text: 'Torricelli’s barometer used mercury (column 76 cm). Pascal repeated it with French wine of density 984 kg/m³.' },
    { title: 'What is asked', dur: 4, text: 'How tall is the wine column at normal atmospheric pressure?' },
  ];
  const stages = [
    { title: 'The atmosphere holds up the column', dur: 5, text: 'Above the column is a near vacuum; the atmosphere pushing on the dish balances the column’s pressure ρgh.', ans: 'ρgh = P_atm = 1.013 × 10⁵ Pa.' },
    { title: 'Wine', dur: 5, text: 'Wine is about 14 times less dense than mercury, so its column is about 14 times taller.', ans: 'h = 1.013 × 10⁵ / (984 × 9.8) ≈ 10.5 m.' },
  ];
  function baro(ctx, x, h, full, col, name) {
    ctx.fillStyle = col; ctx.globalAlpha = 0.25; ctx.fillRect(x - 50, BY - 10, 100, 24); ctx.globalAlpha = 1; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(x - 50, BY - 20, 100, 34);
    ctx.strokeRect(x - 8, BY - full * K - 20, 16, full * K + 26);
    ctx.fillStyle = col; ctx.fillRect(x - 7, BY - h * K, 14, h * K + 6);
    label(ctx, name, x, BY + 30, { align: 'center', weight: 700, size: 13 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    baro(ctx, 140, HM, 1.2, P.ink2, 'mercury'); vdim(ctx, 110, BY - HM * K, BY, P.ink2); label(ctx, '76 cm', 104, BY - HM * K / 2, { align: 'right', weight: 700, size: 12 });
    const h = ans ? HW * smooth(clamp((t - 1) / 4)) : 0;
    baro(ctx, 400, h, 11.5, P.force, 'wine');
    if (ans && h > 0.2) { vdim(ctx, 440, BY - h * K, BY, P.accent); label(ctx, `${h.toFixed(1)} m`, 448, BY - h * K / 2, { weight: 800, size: 15, color: P.accent }); }
    else if (!ans) label(ctx, 'h = ?', 430, BY - 150, { weight: 800, size: 16 });
    label(ctx, 'vacuum', 400, BY - 11.5 * K + 4, { align: 'center', size: 11, color: P.ink2 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['ρgh = P_atm', 'h = 1.013 × 10⁵ / (984 × 9.8) ≈ 10.5 m'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The height of the wine column for normal atmospheric pressure.']);
    note(ctx, 'both columns to the same scale: 30 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const P0 = 3000 * 9.8 / 425e-4, BY = 440, D = 8;
  const qStages = [
    { title: 'A hydraulic lift', dur: D, text: 'A hydraulic lift raises cars of up to 3000 kg. The piston carrying the load has a cross-section of 425 cm².' },
    { title: 'What is asked', dur: 4, text: 'What maximum pressure must the smaller piston bear?' },
  ];
  const stages = [
    { title: 'Pressure under the load', dur: D, text: 'The large piston holds the car’s weight spread over 425 cm².', ans: 'P = 3000 × 9.8 / 0.0425 ≈ 6.92 × 10⁵ Pa.' },
    { title: 'Pascal’s law', dur: 4, text: 'Pressure applied to an enclosed liquid is passed on undiminished to every part of it.', ans: 'The small piston bears the same 6.9 × 10⁵ Pa.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const u = smooth(clamp(t / (D - 1))), dSmall = 120 * u, dBig = 12 * u;
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.5; ctx.fillRect(80, BY - 40, 460, 40); ctx.fillRect(80, 200 + dSmall, 40, BY - 200 - dSmall); ctx.fillRect(320, 260 - dBig, 220, BY - 260 + dBig); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(80, BY - 40, 460, 40); ctx.strokeRect(80, 150, 40, BY - 190); ctx.strokeRect(320, 200, 220, BY - 240);
    ctx.fillStyle = P.objFill2; ctx.fillRect(80, 190 + dSmall, 40, 12); ctx.fillRect(320, 248 - dBig, 220, 12);
    vec(ctx, 100, 120 + dSmall, 0, 60, 'small force', P.force, { side: 1, at: 0.2, align: 'right', ax: -6, size: 12 });
    ctx.fillStyle = P.ke; ctx.fillRect(360, 210 - dBig, 140, 30); ctx.beginPath(); ctx.moveTo(380, 210 - dBig); ctx.lineTo(400, 186 - dBig); ctx.lineTo(460, 186 - dBig); ctx.lineTo(480, 210 - dBig); ctx.fill();
    for (const wx of [385, 475]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, 242 - dBig, 8, 0, Math.PI * 2); ctx.fill(); }
    label(ctx, 'car up to 3000 kg', 430, 170 - dBig, { align: 'center', weight: 700, size: 13 }); label(ctx, 'piston 425 cm²', 430, 290, { align: 'center', size: 13 });
    if (ans) { label(ctx, `P ≈ 6.9 × 10⁵ Pa everywhere`, 300, BY + 30, { align: 'center', weight: 800, size: 16, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['P = mg/A = 3000 × 9.8 / 0.0425 ≈ 6.92 × 10⁵ Pa', 'Same pressure on the small piston (Pascal’s law)'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['The maximum pressure the smaller piston has to bear.']);
    note(ctx, 'piston sizes illustrative; motion slowed');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const K = 16, LX = 170, RX = 400, HY = 400;                              // 1.6 px per mm (16 px per cm)
  const qStages = [
    { title: 'Water, mercury, spirit', dur: 5, text: 'A U-tube holds mercury, with 10.0 cm of water in one arm and 12.5 cm of methylated spirit in the other. The mercury levels are equal.' },
    { title: 'What is asked', dur: 4, text: 'What is the specific gravity of the spirit?' },
  ];
  const stages = [
    { title: 'Equal levels, equal pressures', dur: 5, text: 'The mercury surfaces are at the same level, so the pressures on them are equal.', ans: 'ρ_w g (10.0 cm) = ρ_s g (12.5 cm).' },
    { title: 'Specific gravity', dur: 4, text: 'Specific gravity = ρ_s / ρ_w.', ans: '10.0 / 12.5 = 0.8.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.ink2; ctx.globalAlpha = 0.5; ctx.fillRect(LX - 20, HY, RX - LX + 40, 60); ctx.fillRect(LX - 20, HY - 20, 40, 20); ctx.fillRect(RX - 20, HY - 20, 40, 20); ctx.globalAlpha = 1;
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.6; ctx.fillRect(LX - 20, HY - 20 - 10 * K, 40, 10 * K); ctx.fillStyle = P.ke; ctx.fillRect(RX - 20, HY - 20 - 12.5 * K, 40, 12.5 * K); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(LX - 20, 80); ctx.lineTo(LX - 20, HY + 60); ctx.lineTo(RX + 20, HY + 60); ctx.lineTo(RX + 20, 80); ctx.moveTo(LX + 20, 80); ctx.lineTo(LX + 20, HY); ctx.lineTo(RX - 20, HY); ctx.lineTo(RX - 20, 80); ctx.stroke();
    hline(ctx, LX - 40, RX + 40, HY - 20, P.accent, 1, [5, 4]); label(ctx, 'mercury levels equal', RX + 30, HY - 34, { align: 'right', size: 12, color: P.accent });
    vdim(ctx, LX - 40, HY - 20 - 10 * K, HY - 20, P.ink2); label(ctx, 'water 10.0 cm', LX - 48, HY - 20 - 5 * K, { align: 'right', weight: 700, size: 13 });
    vdim(ctx, RX + 40, HY - 20 - 12.5 * K, HY - 20, P.ink2); label(ctx, 'spirit 12.5 cm', RX + 48, HY - 20 - 6.25 * K, { weight: 700, size: 13 });
    label(ctx, 'mercury', (LX + RX) / 2, HY + 34, { align: 'center', weight: 700, size: 13 });
    if (ans) { label(ctx, ans && t >= stages[1].t0 ? 'specific gravity = 10.0 / 12.5 = 0.8' : '10.0 ρ_w = 12.5 ρ_s', 300, 50, { align: 'center', weight: 800, size: 16, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Working', ['Equal pressures on the mercury surfaces: ρ_w × 10.0 = ρ_s × 12.5', 'Specific gravity of spirit = 0.8'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['The specific gravity of the spirit.']);
    note(ctx, '16 px per cm');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const K = 10, LX = 170, RX = 400, HY = 420, DH = 0.22 * K * 10;          // 10 px per cm; mercury difference exaggerated 10×
  const qStages = [
    { title: 'Before', dur: 3, text: 'As in 9.9: 10.0 cm water and 12.5 cm spirit (specific gravity 0.8), mercury levels equal.' },
    { title: 'More poured in', dur: 4, text: '15.0 cm more water and 15.0 cm more spirit are poured into the respective arms. Specific gravity of mercury = 13.6.' },
    { title: 'What is asked', dur: 4, text: 'What is the difference in the levels of mercury in the two arms?' },
  ];
  const stages = [
    { title: 'Before', dur: 3, text: 'The arms balance.', ans: '' },
    { title: 'Compare the columns', dur: 4, text: 'Express each column as an equivalent height of water.', ans: 'Water: 25.0 cm. Spirit: 27.5 × 0.8 = 22.0 cm of water.' },
    { title: 'Mercury difference', dur: 4, text: 'The water side presses harder by 3.0 cm of water; the mercury on that side is pushed down until the extra mercury on the other side balances it.', ans: '13.6 h = 3.0 cm → h ≈ 0.22 cm, mercury higher in the spirit arm.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const f = smooth(clamp((t - 3) / 3)), hw = 10 + 15 * f, hs = 12.5 + 15 * f, d = DH * smooth(clamp((t - 5) / 2));
    const yl = HY - 20 + d / 2, yr = HY - 20 - d / 2;
    ctx.fillStyle = P.ink2; ctx.globalAlpha = 0.5; ctx.fillRect(LX - 20, HY, RX - LX + 40, 60); ctx.fillRect(LX - 20, yl, 40, HY - yl); ctx.fillRect(RX - 20, yr, 40, HY - yr); ctx.globalAlpha = 1;
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.6; ctx.fillRect(LX - 20, yl - hw * K, 40, hw * K); ctx.fillStyle = P.ke; ctx.fillRect(RX - 20, yr - hs * K, 40, hs * K); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(LX - 20, 60); ctx.lineTo(LX - 20, HY + 60); ctx.lineTo(RX + 20, HY + 60); ctx.lineTo(RX + 20, 60); ctx.moveTo(LX + 20, 60); ctx.lineTo(LX + 20, HY); ctx.lineTo(RX - 20, HY); ctx.lineTo(RX - 20, 60); ctx.stroke();
    label(ctx, `water ${hw.toFixed(1)} cm`, LX - 28, yl - hw * K / 2, { align: 'right', weight: 700, size: 13 }); label(ctx, `spirit ${hs.toFixed(1)} cm`, RX + 28, yr - hs * K / 2, { weight: 700, size: 13 });
    if (d > 1) { hline(ctx, LX - 30, RX + 30, yl, P.ink2, 1, [3, 3]); hline(ctx, RX - 30, RX + 60, yr, P.ink2, 1, [3, 3]); vdim(ctx, RX + 50, yr, yl, P.accent); label(ctx, ans ? 'h ≈ 0.22 cm' : 'h = ?', RX + 58, (yl + yr) / 2 + 14, { weight: 800, size: 14, color: P.accent }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['Water 25.0 cm vs spirit 27.5 cm (= 22.0 cm of water)', 'Excess on the water side: 3.0 cm of water', '13.6 h = 3.0 cm → h ≈ 0.22 cm'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The difference in the mercury levels after 15.0 cm of water and of spirit are added.']);
    note(ctx, '10 px per cm; the mercury difference is exaggerated 10 times');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const VU = 70, VL = 63, RHO = 1.3, A = 2.5, DP = 0.5 * RHO * (VU * VU - VL * VL), LIFT = DP * A, CX = 300, CY = 260;
  const qStages = [
    { title: 'In the wind tunnel', dur: 6, text: 'Air flows over a model wing at 70 m/s on the upper surface and 63 m/s on the lower surface. Wing area 2.5 m²; air density 1.3 kg/m³.' },
    { title: 'What is asked', dur: 4, text: 'What is the lift on the wing?' },
  ];
  const stages = [
    { title: 'Faster above', dur: 6, text: 'Bernoulli: at the same height, faster air has lower pressure. The pressure below the wing is higher.', ans: 'ΔP = ½ρ(v_u² − v_l²) = ½ × 1.3 × (4900 − 3969) ≈ 605 Pa.' },
    { title: 'Lift', dur: 4, text: 'Lift = pressure difference × wing area.', ans: 'Lift ≈ 605 × 2.5 ≈ 1.5 × 10³ N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let r = 0; r < 4; r++) for (const s of [-1, 1]) {
      const y0 = CY + s * (40 + r * 30), sp = s < 0 ? VU : VL;
      for (let k = 0; k < 8; k++) { const x = ((k * 70 + t * sp * 2.2) % 560) + 20; const bump = s < 0 ? -26 * Math.exp(-(((x - CX) / 110) ** 2)) * (1 - r * 0.2) : 8 * Math.exp(-(((x - CX) / 110) ** 2)); ctx.fillStyle = s < 0 ? P.vel : P.ke; ctx.globalAlpha = 0.7; ctx.fillRect(x, y0 + bump, s < 0 ? 22 : 14, 2); ctx.globalAlpha = 1; }
    }
    ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(CX - 130, CY); ctx.bezierCurveTo(CX - 100, CY - 50, CX + 60, CY - 40, CX + 140, CY + 4); ctx.bezierCurveTo(CX + 60, CY + 14, CX - 100, CY + 18, CX - 130, CY); ctx.fill(); ctx.stroke();
    label(ctx, '70 m/s', 40, CY - 120, { weight: 700, size: 14, color: P.vel }); label(ctx, '63 m/s', 40, CY + 140, { weight: 700, size: 14, color: P.ke });
    if (ans) {
      label(ctx, 'lower pressure', CX + 160, CY - 70, { weight: 700, size: 13 }); label(ctx, 'higher pressure', CX + 160, CY + 70, { weight: 700, size: 13 });
      if (t >= stages[1].t0) vec(ctx, CX, CY - 20, 0, -110, 'lift ≈ 1.5 × 10³ N', P.force, { side: 1, at: 1, align: 'left', ax: 8, lw: 5, size: 14 });
      partsPanel(ctx, 630, 34, 300, 'Working', ['ΔP = ½ρ(v_u² − v_l²) ≈ 605 Pa', 'Lift = ΔP × A ≈ 1.5 × 10³ N'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The lift on the wing.']);
    note(ctx, 'streamline speeds in proportion; wing section illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const qStages = [
    { title: 'Fig. 9.20', dur: 6, text: 'A non-viscous liquid flows steadily through a pipe with a narrow section. Vertical tubes over the wide and narrow parts show the pressure.' },
    { title: 'What is asked', dur: 4, text: 'Which of the two figures, (a) or (b), is incorrect? Why?' },
  ];
  const stages = [
    { title: 'Faster in the narrow part', dur: 5, text: 'Continuity: the same volume per second passes every section, so the liquid moves faster where the pipe is narrow.', ans: 'v(narrow) > v(wide).' },
    { title: 'Lower pressure there', dur: 5, text: 'Bernoulli, horizontal pipe: P + ½ρv² is constant, so where v is larger P is smaller, and the liquid in the tube stands lower.', ans: 'The column over the narrow part must be lower: (a) is incorrect, (b) is correct.' },
  ];
  function pipe(ctx, x, y, hl, hr, t, tag) {
    const W = 230;
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.moveTo(x, y - 25); ctx.lineTo(x + 90, y - 25); ctx.lineTo(x + 115, y - 8); ctx.lineTo(x + 140, y - 25); ctx.lineTo(x + W, y - 25); ctx.lineTo(x + W, y + 25); ctx.lineTo(x + 140, y + 25); ctx.lineTo(x + 115, y + 8); ctx.lineTo(x + 90, y + 25); ctx.lineTo(x, y + 25); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.stroke();
    for (const [tx, h] of [[x + 55, hl], [x + 115, hr]]) { ctx.strokeRect(tx - 6, y - 160, 12, 160 - (tx === x + 115 ? 8 : 25)); ctx.fillStyle = P.water; ctx.fillRect(tx - 5, y - (tx === x + 115 ? 8 : 25) - h, 10, h); }
    for (let k = 0; k < 5; k++) { const xx = x + ((k * 46 + t * 30) % W); const fast = xx > x + 95 && xx < x + 135; ctx.fillStyle = P.ink; ctx.fillRect(xx, y - 1, fast ? 16 : 8, 2); }
    label(ctx, tag, x + W / 2, y + 50, { align: 'center', weight: 800, size: 16 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    pipe(ctx, 50, 300, 70, 110, t, '(a)'); pipe(ctx, 330, 300, 110, 50, t, '(b)');
    if (ans && t >= stages[1].t0) { label(ctx, '✗ incorrect', 165, 400, { align: 'center', weight: 800, size: 16, color: P.force }); label(ctx, '✓ correct', 445, 400, { align: 'center', weight: 800, size: 16, color: P.accent }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['Narrow part: faster flow (continuity)', 'Faster ⇒ lower pressure ⇒ lower column: (a) is wrong'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['Which of the two figures is incorrect, and why?']);
    note(ctx, 'columns follow Fig. 9.20; flow speeds illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q16
const SCENE = (() => {
  const A1 = 8e-4, V1 = 1.5 / 60, AH = 40 * Math.PI * 0.5e-3 ** 2, V2 = A1 * V1 / AH, TY = 260;
  const qStages = [
    { title: 'Spray pump', dur: 6, text: 'A spray pump tube of cross-section 8.0 cm² ends in 40 fine holes, each 1.0 mm across. The liquid moves along the tube at 1.5 m/min.' },
    { title: 'What is asked', dur: 4, text: 'At what speed does the liquid come out of the holes?' },
  ];
  const stages = [
    { title: 'Continuity', dur: 6, text: 'Every second, the volume leaving through the holes equals the volume moving along the tube: A₁v₁ = A₂v₂.', ans: 'A₂ = 40 × π(0.5 mm)² ≈ 3.14 × 10⁻⁵ m²; v₁ = 0.025 m/s.' },
    { title: 'Speed of the jets', dur: 4, text: 'v₂ = A₁v₁ / A₂.', ans: 'v₂ = 8.0 × 10⁻⁴ × 0.025 / 3.14 × 10⁻⁵ ≈ 0.64 m/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.4; ctx.fillRect(60, TY - 50, 340, 100); ctx.globalAlpha = 1; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.strokeRect(60, TY - 50, 340, 100);
    ctx.fillStyle = P.objFill2; ctx.fillRect(400, TY - 56, 10, 112);
    for (let k = 0; k < 6; k++) { const x = 70 + ((k * 60 + t * 12) % 320); ctx.fillStyle = P.ink; ctx.fillRect(x, TY - 1, 10, 2); }
    for (let i = 0; i < 8; i++) { const y = TY - 42 + i * 12; for (let k = 0; k < 3; k++) { const x = 412 + ((k * 60 + t * 120) % 170); ctx.fillStyle = P.vel; ctx.globalAlpha = 0.8; ctx.fillRect(x, y, 14, 2); ctx.globalAlpha = 1; } }
    label(ctx, 'tube: 8.0 cm², 1.5 m/min', 230, TY + 80, { align: 'center', weight: 700, size: 13 }); label(ctx, '40 holes, 1.0 mm', 470, TY + 80, { align: 'center', weight: 700, size: 13 });
    if (ans && t >= stages[1].t0) label(ctx, 'jets ≈ 0.64 m/s', 490, TY - 80, { align: 'center', weight: 800, size: 16, color: P.accent });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['A₁v₁ = A₂v₂; A₂ ≈ 3.14 × 10⁻⁵ m², v₁ = 0.025 m/s', 'v₂ ≈ 0.64 m/s'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The speed of ejection of the liquid through the holes.']);
    note(ctx, 'holes enlarged; flow speeds illustrative (25 times faster through the holes)');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const X0 = 150, X1 = 450, TOP = 90, SY = 330;
  const qStages = [
    { title: 'A soap film', dur: 5, text: 'A U-shaped wire dipped in soap solution holds a film between the wire and a light slider 30 cm long. The film supports a weight of 1.5 × 10⁻² N (slider included).' },
    { title: 'What is asked', dur: 4, text: 'What is the surface tension of the film?' },
  ];
  const stages = [
    { title: 'Two surfaces', dur: 5, text: 'A film has a front and a back surface. Each pulls along the slider’s length with force S × L.', ans: 'Upward pull = 2SL.' },
    { title: 'Balance', dur: 4, text: '2SL = W.', ans: 'S = 1.5 × 10⁻² / (2 × 0.30) = 2.5 × 10⁻² N/m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.water; ctx.globalAlpha = 0.25 + 0.05 * Math.sin(t * 3); ctx.fillRect(X0, TOP, X1 - X0, SY - TOP); ctx.globalAlpha = 1;
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 4; poly(ctx, [[X0, SY + 30], [X0, TOP], [X1, TOP], [X1, SY + 30]]); ctx.restore();
    ctx.fillStyle = P.objFill2; ctx.fillRect(X0 - 6, SY, X1 - X0 + 12, 8); ctx.strokeStyle = P.obj; ctx.lineWidth = 1.5; ctx.strokeRect(X0 - 6, SY, X1 - X0 + 12, 8);
    vline(ctx, (X0 + X1) / 2, SY + 8, SY + 70, P.ink, 1.5); block(ctx, (X0 + X1) / 2 - 20, SY + 70, 40, 30, 'W', P.objFill2);
    dim(ctx, X0, X1, SY + 30, P.ink2); label(ctx, '30 cm', (X0 + X1) / 2 + 40, SY + 46, { weight: 700, size: 13 });
    label(ctx, 'soap film', (X0 + X1) / 2, (TOP + SY) / 2, { align: 'center', weight: 700, size: 14, color: P.ink2 });
    label(ctx, 'W = 1.5 × 10⁻² N', (X0 + X1) / 2 + 30, SY + 85, { weight: 700, size: 13 });
    if (ans) {
      for (const dx of [-60, 60]) vec(ctx, (X0 + X1) / 2 + dx, SY - 6, 0, -60, dx < 0 ? 'SL (front)' : 'SL (back)', P.vel, { side: dx < 0 ? -1 : 1, at: 0.6, align: dx < 0 ? 'right' : 'left', ax: dx < 0 ? -4 : 4, size: 13 });
      if (t >= stages[1].t0) label(ctx, 'S = 2.5 × 10⁻² N/m', 300, 50, { align: 'center', weight: 800, size: 17, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['Two surfaces: pull = 2SL', 'S = W/2L = 2.5 × 10⁻² N/m'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The surface tension of the film.']);
    note(ctx, 'frame 10 px per cm');
  }
  return { qStages, stages, draw };
})();

//@@ q18
const SCENE = (() => {
  const W = 120, BY = 380;
  const shapes = [[[0, -110], [W, -110], [W, 0], [0, 0]], [[0, -160], [W, -160], [W, 0], [0, 0]], [[0, -70], [W / 2, -120], [W, -70], [W, 0], [0, 0]]];
  const qStages = [
    { title: 'Fig. 9.21', dur: 5, text: 'Three films of the same liquid, at the same temperature, with different shapes. Each ends on a 40 cm slider. Film (a) supports 4.5 × 10⁻² N.' },
    { title: 'What is asked', dur: 4, text: 'What weight is supported in (b) and (c)? Explain physically.' },
  ];
  const stages = [
    { title: 'Force on the slider', dur: 5, text: 'Surface tension acts along the line where the film meets the slider: force = 2 × S × (slider length).', ans: 'The area or shape of the film does not matter.' },
    { title: 'The answer', dur: 4, text: 'All three sliders are 40 cm long.', ans: '(b) and (c) also support 4.5 × 10⁻² N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    shapes.forEach((s, i) => {
      const x0 = 50 + i * 185;
      ctx.fillStyle = P.water; ctx.globalAlpha = 0.5; ctx.beginPath(); s.forEach(([x, y], k) => k ? ctx.lineTo(x0 + x, BY + y) : ctx.moveTo(x0 + x, BY + y)); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.stroke();
      const top = Math.min(...s.map(p => p[1])); vline(ctx, x0 + W / 2, BY + top - 50, BY + top, P.ink, 1.5);
      ctx.fillStyle = P.objFill2; ctx.fillRect(x0 - 4, BY, W + 8, 6);
      vline(ctx, x0 + W / 2, BY + 6, BY + 26, P.ink, 1.5); block(ctx, x0 + W / 2 - 12, BY + 26, 24, 16, '', P.objFill2);
      label(ctx, '40 cm', x0 + W / 2, BY + 62, { align: 'center', size: 12 }); label(ctx, ['(a)', '(b)', '(c)'][i], x0 + W / 2, BY + 84, { align: 'center', weight: 800, size: 15 });
      const w = i === 0 || ans && t >= stages[1].t0 ? '4.5 × 10⁻² N' : '?';
      label(ctx, w, x0 + W / 2, BY + 106, { align: 'center', weight: 800, size: 14, color: i === 0 ? P.ink : P.accent });
    });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['Pull on the slider = 2SL: depends only on L', 'Same L = 40 cm: (b) and (c) also hold 4.5 × 10⁻² N'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The weight supported by the films in (b) and (c), with a physical explanation.']);
    note(ctx, 'shapes follow Fig. 9.21');
  }
  return { qStages, stages, draw };
})();
