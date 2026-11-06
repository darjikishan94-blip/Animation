//@@ q03
const SCENE = (() => {
  const CX = 290, CY = 270, RE = 200, RP = RE * Math.pow(0.5, 2 / 3), TY = 8, D = 17;     // one Earth year in 8 s
  const qStages = [
    { title: 'The Earth’s orbit', dur: D, text: 'The Earth goes round the Sun once a year. Imagine a planet that goes round twice as fast: its year is half the Earth’s.' },
    { title: 'What is asked', dur: 4, text: 'How big is its orbit compared with the Earth’s?' },
  ];
  const stages = [
    { title: 'Kepler’s third law', dur: D, text: 'For orbits round the same Sun, T² ∝ r³. Half the period needs a smaller orbit.', ans: '(r_p / r_e)³ = (T_p / T_e)² = (1/2)².' },
    { title: 'The ratio', dur: 4, text: 'Take the cube root.', ans: 'r_p / r_e = (1/4)^(1/3) = (1/2)^(2/3) ≈ 0.63.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.ke; ctx.beginPath(); ctx.arc(CX, CY, 26, 0, Math.PI * 2); ctx.fill(); label(ctx, 'Sun', CX, CY + 40, { align: 'center', weight: 700, size: 13 });
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, RE, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    const ae = -2 * Math.PI * t / TY; ball(ctx, CX + RE * Math.cos(ae), CY + RE * Math.sin(ae), 9, P.water); label(ctx, 'Earth', CX + RE * Math.cos(ae) + 14, CY + RE * Math.sin(ae), { weight: 700, size: 13 });
    label(ctx, `Earth: ${(t / TY).toFixed(2)} orbits`, 30, 470, { weight: 700, size: 14, color: P.water });
    if (ans) {
      ctx.save(); ctx.strokeStyle = P.force; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, RP, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      const ap = -2 * Math.PI * t / (TY / 2); ball(ctx, CX + RP * Math.cos(ap), CY + RP * Math.sin(ap), 7, P.force); label(ctx, 'planet', CX + RP * Math.cos(ap) + 12, CY + RP * Math.sin(ap), { weight: 700, size: 13, color: P.force });
      label(ctx, `planet: ${(2 * t / TY).toFixed(2)} orbits`, 30, 494, { weight: 700, size: 14, color: P.force });
      if (t >= stages[1].t0) { dim(ctx, CX, CX + RP, CY - 60, P.force); label(ctx, '0.63 r', CX + RP / 2, CY - 76, { align: 'center', weight: 800, size: 14, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['T² ∝ r³ (Kepler’s third law)', 'r_p / r_e = (1/2)^(2/3) ≈ 0.63'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The orbital size of a planet going round the Sun twice as fast as the Earth, compared with the Earth’s orbit.']);
    note(ctx, 'circular orbits; one Earth year shown in 8 s');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const CX = 300, CY = 170, R = 220, PAIRS = [0.25, 0.6, 0.95, 1.3];          // angles from the downward vertical (rad)
  const qStages = [
    { title: 'Fig. 7.11', dur: 5, text: 'A uniform hemispherical shell (a bowl). C is the centre of its flat face. Arrows a, b and c point right, up and down from C.' },
    { title: 'What is asked', dur: 4, text: 'Which arrow shows the direction of the gravitational intensity at C: a, b, c, or is it 0?' },
  ];
  const stages = [
    { title: 'Patches in pairs', dur: 8, text: 'Each small patch of the shell pulls C towards itself. Take patches in pairs placed symmetrically about the vertical axis.', ans: 'Their sideways pulls cancel; their downward pulls add.' },
    { title: 'The resultant', dur: 4, text: 'All of the shell lies below the flat face, so every pull has a downward part.', ans: 'The field at C points straight down: arrow c.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI); ctx.stroke(); ctx.restore();
    hline(ctx, CX - R, CX + R, CY, P.ink2, 1, [5, 4]);
    ball(ctx, CX, CY, 5, P.ink); label(ctx, 'C', CX - 12, CY - 14, { weight: 800, size: 15 });
    if (!ans || t < stages[0].t1) { vec(ctx, CX + 6, CY, 50, 0, 'a', P.ink2, { side: -1, at: 1, ax: 8, lw: 2, head: 9 }); vec(ctx, CX, CY - 6, 0, -50, 'b', P.ink2, { side: 1, at: 1, ay: -8, lw: 2, head: 9 }); vec(ctx, CX, CY + 6, 0, 50, 'c', P.ink2, { side: 1, at: 1, ay: 10, lw: 2, head: 9 }); }
    if (ans) {
      const n = Math.min(PAIRS.length, Math.floor(t / 2) + 1);
      for (let i = 0; i < n; i++) for (const s of [-1, 1]) {
        const a = PAIRS[i], px = CX + s * R * Math.sin(a), py = CY + R * Math.cos(a), L = 80;
        ball(ctx, px, py, 7, P.force);
        vec(ctx, CX, CY, s * L * Math.sin(a), L * Math.cos(a), '', P.force, { lw: 2, head: 8, alpha: 0.7 });
      }
      if (t >= stages[1].t0) { vec(ctx, CX, CY, 0, 150, 'field: c', P.accent, { side: -1, at: 1, align: 'left', ax: 8, lw: 5 }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Symmetric patches: sideways pulls cancel', 'Downward pulls add: the field is along c'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The direction of the gravitational intensity at the centre C of the hemispherical shell: (i) a, (ii) b, (iii) c, (iv) 0.']);
    note(ctx, 'side section of the bowl; pull arrows show directions only');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const CX = 300, CY = 260, R = 200, PX = CX - 90, PY = CY;
  const qStages = [
    { title: 'A point P on the flat face', dur: 5, text: 'P is any point on the flat face of the same hemispherical shell. Arrows d, e, f, g are drawn at P.' },
    { title: 'What is asked', dur: 4, text: 'Which arrow shows the direction of the gravitational intensity at P: d, e, f or g?' },
  ];
  const stages = [
    { title: 'Complete the sphere', dur: 5, text: 'Add the missing upper half. Inside a complete uniform spherical shell the field is zero, so the two halves’ fields at P are equal and opposite.', ans: 'E(lower) + E(upper) = 0.' },
    { title: 'Mirror symmetry', dur: 5, text: 'The upper half is the mirror image of the lower half in the flat face: its field has the same horizontal part and the opposite vertical part.', ans: 'Equal and opposite is only possible if the horizontal part is zero.' },
    { title: 'The answer', dur: 4, text: 'So the lower (actual) half pulls P straight down, into the bowl.', ans: 'Arrow e.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI); ctx.stroke(); ctx.restore();
    hline(ctx, CX - R, CX + R, CY, P.ink2, 1, [5, 4]);
    ball(ctx, PX, PY, 5, P.ink); label(ctx, 'P', PX - 10, PY - 16, { weight: 800, size: 15 });
    const show = !ans || t < stages[2].t0;
    if (show) { const L = 46; [['d', -0.7, 0.7], ['e', 0, 1], ['f', 1, 0], ['g', 0.7, -0.7]].forEach(([n, dx, dy]) => vec(ctx, PX, PY, dx * L, dy * L, n, P.ink2, { side: 1, at: 1, ax: dx * 10, ay: dy * 10, lw: 2, head: 9 })); }
    if (ans) {
      ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.arc(CX, CY, R, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.restore();
      label(ctx, 'imagined upper half', CX, CY - R - 14, { align: 'center', size: 13, color: P.ink2 });
      if (t >= stages[1].t0) { vec(ctx, PX, PY, 40, 70, 'if the lower half pulled this way…', P.force, { side: -1, at: 1, align: 'left', ax: 6, size: 12, alpha: t < stages[2].t0 ? 1 : 0.3 }); vec(ctx, PX, PY, 40, -70, '…the upper half would pull this way', P.vel, { side: 1, at: 1, align: 'left', ax: 6, size: 12, alpha: t < stages[2].t0 ? 1 : 0.3 }); }
      if (t >= stages[2].t0) vec(ctx, PX, PY, 0, 100, 'field: e', P.accent, { side: -1, at: 1, align: 'left', ax: 8, lw: 5 });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Full shell: field inside = 0', 'Mirror halves: horizontal parts would add, so they must be zero', 'The field at P is straight down: e'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The direction of the gravitational intensity at an arbitrary point P on the flat face: (i) d, (ii) e, (iii) f, (iv) g.']);
    note(ctx, 'side section; arrows show directions only');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const MS = 2e30, ME = 6e24, R = 1.5e11, L0 = 6.8, L1 = Math.log10(R) - 0.02, X0 = 80, X1 = 520, Y = 260, XN = R / (1 + Math.sqrt(MS / ME)), D = 12;
  const X = x => X0 + (Math.log10(x) - L0) / (L1 - L0) * (X1 - X0);
  const qStages = [
    { title: 'Towards the Sun', dur: D, text: 'A rocket is fired from the Earth towards the Sun. M_Sun = 2 × 10³⁰ kg, M_Earth = 6 × 10²⁴ kg, Earth–Sun distance 1.5 × 10¹¹ m.' },
    { title: 'What is asked', dur: 4, text: 'At what distance from the Earth’s centre is the gravitational force on the rocket zero?' },
  ];
  const stages = [
    { title: 'Two opposite pulls', dur: D, text: 'The Earth pulls the rocket back, the Sun pulls it forward. The Earth’s pull weakens fast as the rocket leaves; the Sun’s barely changes.', ans: 'They balance where GM_E/x² = GM_S/(r − x)².' },
    { title: 'Solve', dur: 5, text: '(r − x)/x = √(M_S/M_E) = √(3.33 × 10⁵) ≈ 577.', ans: 'x = r/578 ≈ 2.6 × 10⁸ m from the Earth’s centre.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ball(ctx, X0, Y, 16, P.water); label(ctx, 'Earth', X0, Y + 30, { align: 'center', weight: 700, size: 13 });
    ctx.fillStyle = P.ke; ctx.beginPath(); ctx.arc(X1 + 50, Y, 30, 0, Math.PI * 2); ctx.fill(); label(ctx, 'Sun', X1 + 50, Y + 46, { align: 'center', weight: 700, size: 13 });
    hline(ctx, X0, X1, Y + 80, P.ink2, 1.5);
    for (let e = 7; e <= 11; e++) { vline(ctx, X(10 ** e), Y + 74, Y + 86, P.ink2, 1.2); label(ctx, `10${['⁷', '⁸', '⁹', '¹⁰', '¹¹'][e - 7]} m`, X(10 ** e), Y + 100, { align: 'center', size: 12 }); }
    label(ctx, 'distance from the Earth’s centre (logarithmic)', (X0 + X1) / 2, Y + 124, { align: 'center', size: 12, color: P.ink2 });
    const lx = L0 + 0.15 + (L1 - L0 - 0.4) * clamp(t / (D - 1)), x = 10 ** lx, px = X(x);
    ctx.save(); ctx.translate(px, Y); ctx.fillStyle = P.obj; ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-8, -7); ctx.lineTo(-8, 7); ctx.closePath(); ctx.fill(); ctx.restore();
    if (ans) {
      const fe = ME / x ** 2, fs = MS / (R - x) ** 2, s = fe + fs;
      vec(ctx, px - 12, Y - 30, -Math.min(90 * fe / s, px - 40), 0, 'Earth’s pull', P.water, { side: 1, at: 0.5, size: 12 });
      vec(ctx, px + 12, Y - 60, 90 * fs / s, 0, 'Sun’s pull', P.ke, { side: -1, at: 0.5, size: 12 });
      vline(ctx, X(XN), Y - 120, Y + 86, P.accent, 2, [5, 4]); label(ctx, 'net force 0', X(XN), Y - 132, { align: 'center', weight: 800, size: 14, color: P.accent });
      if (t >= stages[1].t0) label(ctx, 'x ≈ 2.6 × 10⁸ m', X(XN) + 8, Y + 60, { weight: 800, size: 14, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['GM_E/x² = GM_S/(r − x)²', '(r − x)/x = √(M_S/M_E) ≈ 577 → x ≈ 2.6 × 10⁸ m'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The distance from the Earth’s centre at which the gravitational force on the rocket is zero.']);
    note(ctx, 'pull arrows show only the share of each pull, not its size; distances logarithmic');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const CX = 290, CY = 270, RS = 240, F = Math.pow(29.5, 2 / 3), RE = RS / F, TE = 1.5, D = 14;    // r_S / r_E = 9.55
  const qStages = [
    { title: 'Two planets', dur: D, text: 'A Saturn year is 29.5 Earth years. The Earth is 1.50 × 10⁸ km from the Sun.' },
    { title: 'What is asked', dur: 4, text: 'How far is Saturn from the Sun?' },
  ];
  const stages = [
    { title: 'Kepler’s third law', dur: D, text: 'T² ∝ r³ for all planets of the Sun.', ans: '(r_S / r_E)³ = (29.5)².' },
    { title: 'Saturn’s distance', dur: 4, text: 'r_S = r_E × 29.5^(2/3).', ans: '29.5^(2/3) ≈ 9.55, so r_S ≈ 1.43 × 10⁹ km.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.ke; ctx.beginPath(); ctx.arc(CX, CY, 8, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(CX, CY, RE, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    const ae = -2 * Math.PI * t / TE; ball(ctx, CX + RE * Math.cos(ae), CY + RE * Math.sin(ae), 4, P.water);
    label(ctx, 'Earth', CX + RE + 6, CY - 12, { size: 12, weight: 700, color: P.water });
    const as = -2 * Math.PI * t / (TE * 29.5);
    if (ans) { ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(CX, CY, RS, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
    ball(ctx, CX + (ans ? RS : RS) * Math.cos(as), CY + RS * Math.sin(as), 9, P.sand); if (ans) label(ctx, 'Saturn', CX + RS * Math.cos(as) + 14, CY + RS * Math.sin(as), { size: 13, weight: 700 });
    label(ctx, `Earth years: ${(t / TE).toFixed(1)}`, 30, 40, { weight: 700, size: 14 });
    if (ans) {
      label(ctx, `Saturn: ${(t / TE / 29.5).toFixed(2)} of an orbit`, 30, 64, { weight: 700, size: 14 });
      if (t >= stages[1].t0) { dim(ctx, CX, CX + RS, CY + 30, P.accent); label(ctx, '9.55 × 1.50 × 10⁸ km ≈ 1.43 × 10⁹ km', CX + RS / 2, CY + 46, { align: 'center', weight: 800, size: 13, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['T² ∝ r³: (r_S/r_E)³ = 29.5²', 'r_S = 1.50 × 10⁸ × 9.55 ≈ 1.43 × 10⁹ km'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The distance of Saturn from the Sun.']);
    note(ctx, ans ? 'orbits to scale with each other; one Earth year in 1.5 s' : 'one Earth year in 1.5 s; Saturn’s orbit is what is asked');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const CX = 220, CY = 380, R = 130, KF = 1.3;                              // 1.3 px per newton
  const qStages = [
    { title: 'On the surface', dur: 4, text: 'A body weighs 63 N on the surface of the Earth.' },
    { title: 'Raised to R/2', dur: 4, text: 'It is taken to a height equal to half the Earth’s radius.' },
    { title: 'What is asked', dur: 4, text: 'What is the gravitational force on it there?' },
  ];
  const stages = [
    { title: 'Inverse square', dur: 4, text: 'The force varies as 1/r², with r measured from the Earth’s centre.', ans: 'At the surface r = R: F = 63 N.' },
    { title: 'At height R/2', dur: 4, text: 'Now r = R + R/2 = 1.5 R.', ans: 'F = 63 × (1/1.5)² = 63 × 4/9.' },
    { title: 'The force', dur: 4, text: '4/9 of the surface weight.', ans: 'F = 28 N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill(); ctx.restore(); ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    ball(ctx, CX, CY, 4, P.ink);
    const h = t < 4 ? 0 : smooth(clamp((t - 4) / 2.5)) * R / 2, y = CY - R - h - 10, r = R + h, F = 63 * (R / r) ** 2;
    block(ctx, CX - 12, y - 12, 24, 22, '', P.objFill2);
    vec(ctx, CX + 24, y, 0, F * KF, ans || t < 4 ? `${F.toFixed(0)} N` : (h >= R / 2 - 0.5 ? 'F = ?' : ''), P.force, { side: -1, at: 0.6, align: 'left', ax: 4, size: 14 });
    vdim(ctx, CX - 40, CY - R, CY, P.ink2); label(ctx, 'R', CX - 48, CY - R / 2, { align: 'right', italic: true, weight: 700, size: 15 });
    if (h > 1) { vdim(ctx, CX - 40, CY - R - h, CY - R, P.ink2); label(ctx, 'R/2', CX - 48, CY - R - h / 2, { align: 'right', weight: 700, size: 13 }); }
    if (ans) { if (t >= stages[1].t0) { vdim(ctx, CX + 100, CY - R - R / 2, CY, P.accent); label(ctx, 'r = 1.5 R', CX + 108, CY - R, { weight: 800, size: 14, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['F ∝ 1/r²; at r = R, F = 63 N', 'r = 1.5 R: F = 63 × (1/1.5)²', 'F = 63 × 4/9 = 28 N'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['The gravitational force on the body at a height equal to half the radius of the Earth.']);
    note(ctx, 'force arrows to scale: 1.3 px per newton');
  }
  return { qStages, stages, draw };
})();

//@@ q16
const SCENE = (() => {
  const CX = 260, CY = 290, R = 170, KF = 0.4;                              // 0.4 px per newton
  const qStages = [
    { title: 'On the surface', dur: 4, text: 'A body weighs 250 N on the surface of a uniform Earth.' },
    { title: 'Half way down', dur: 4, text: 'It is taken half way down to the centre.' },
    { title: 'What is asked', dur: 4, text: 'How much does it weigh there?' },
  ];
  const stages = [
    { title: 'Only the inner sphere pulls', dur: 4, text: 'Inside a uniform Earth, the shell outside the body pulls equally in all directions (net zero); only the sphere inside its radius attracts it.', ans: 'g at depth d: g₀(1 − d/R).' },
    { title: 'At d = R/2', dur: 4, text: 'The inner sphere has radius R/2.', ans: 'Weight = 250 × (1 − 1/2).' },
    { title: 'The weight', dur: 4, text: 'Half its surface weight.', ans: '125 N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill(); ctx.restore(); ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    ctx.fillStyle = P.sheet; ctx.fillRect(CX - 10, CY - R - 4, 20, R + 4); ctx.strokeStyle = P.ink2; ctx.lineWidth = 1; ctx.strokeRect(CX - 10, CY - R - 4, 20, R + 4);
    ball(ctx, CX, CY, 4, P.ink); label(ctx, 'centre', CX + 10, CY + 14, { size: 12 });
    const d = t < 4 ? 0 : smooth(clamp((t - 4) / 2.5)) * R / 2, y = CY - R + d, W = 250 * (1 - d / R);
    if (ans && d > 1) { ctx.save(); ctx.fillStyle = P.vel; ctx.globalAlpha = 0.2; ctx.beginPath(); ctx.arc(CX, CY, R - d, 0, Math.PI * 2); ctx.fill(); ctx.restore(); label(ctx, 'only this sphere attracts', CX + 30, CY + R / 3, { size: 13, weight: 700, color: P.vel }); }
    block(ctx, CX - 9, y - 18, 18, 18, '', P.objFill2);
    vec(ctx, CX + 30, y - 10, 0, W * KF, ans || t < 4 ? `${W.toFixed(0)} N` : (d >= R / 2 - 0.5 ? 'W = ?' : ''), P.force, { side: -1, at: 0.6, align: 'left', ax: 4, size: 14 });
    if (d > 1) { vdim(ctx, CX - 40, CY - R, CY - R + d, P.ink2); label(ctx, 'R/2', CX - 48, CY - R + d / 2, { align: 'right', weight: 700, size: 13 }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['g = g₀(1 − d/R) inside a uniform Earth', 'd = R/2: W = 250 × 1/2', 'W = 125 N'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The weight of the body half way down to the centre of the Earth.']);
    note(ctx, 'force arrows to scale: 0.4 px per newton; shaft drawn for illustration');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const G = 6.67e-11, M = 6e24, RE = 6.4e6, V0 = 5000, GMR = G * M / RE, H = G * M / (GMR - V0 * V0 / 2) - RE, K = 1e-4, SY = 450, CX = 300, D = 8;   // 1 px = 10 km
  const hOf = t => H * Math.sin(Math.PI * clamp(t / D));                   // illustrative timing; heights and speeds from energy
  const vOf = h => Math.sqrt(Math.max(0, V0 * V0 - 2 * (GMR - G * M / (RE + h))));
  const qStages = [
    { title: 'Fired vertically', dur: D + 1, text: 'A rocket is fired vertically from the Earth’s surface at 5 km/s. M = 6.0 × 10²⁴ kg, R = 6.4 × 10⁶ m, G = 6.67 × 10⁻¹¹ N m² kg⁻².' },
    { title: 'What is asked', dur: 4, text: 'How far from the Earth does it go before returning?' },
  ];
  const stages = [
    { title: 'Energy is conserved', dur: D / 2, text: 'Kinetic energy turns into gravitational potential energy as it climbs. Use −GMm/r, not mgh: g changes with height.', ans: '½v² − GM/R = −GM/(R + h).' },
    { title: 'At the top', dur: D / 2 + 1, text: 'GM/R = 6.25 × 10⁷ J/kg; ½v² = 1.25 × 10⁷ J/kg.', ans: 'GM/(R + h) = 5.0 × 10⁷ → R + h = 8.0 × 10⁶ m → h ≈ 1.6 × 10⁶ m.' },
    { title: 'Back down', dur: 4, text: 'It falls back, reaching the ground again at 5 km/s (no air resistance).', ans: 'Maximum height ≈ 1.6 × 10⁶ m (1600 km).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const ER = RE * K; ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.3; ctx.beginPath(); ctx.arc(CX, SY + ER, ER, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, SY + ER, ER, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke(); ctx.restore();
    const h = hOf(Math.min(t, D)), y = SY - h * K, v = vOf(h), up = t < D / 2;
    ctx.save(); ctx.translate(CX, y); ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(6, -6); ctx.lineTo(6, 10); ctx.lineTo(-6, 10); ctx.lineTo(-6, -6); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    if (v > 50) vec(ctx, CX + 20, y, 0, (up ? -1 : 1) * v / 100, ans ? `${(v / 1000).toFixed(2)} km/s` : (t < 0.4 ? '5 km/s' : ''), P.vel, { side: -1, at: 0.6, align: 'left', ax: 4, size: 13 });
    if (!ans) { askedPanel(ctx, 630, 34, 300, ['How far from the Earth the rocket goes before returning.']); note(ctx, 'Earth and height to scale: 1 px = 10 km; flight much faster than real'); return; }
    vdim(ctx, CX - 60, SY - H * K, SY, P.accent); label(ctx, 'h ≈ 1.6 × 10⁶ m', CX - 68, SY - H * K / 2, { align: 'right', weight: 800, size: 14, color: P.accent });
    hline(ctx, CX - 80, CX + 80, SY - H * K, P.accent, 1, [4, 4]);
    const ke = v * v / 2, dpe = GMR - G * M / (RE + h), KB = 1 / 1.25e5, BX = 470, BY = 400;
    [['½v²', ke, P.ke], ['ΔPE', dpe, P.pe]].forEach(([n, val, c], i) => { ctx.fillStyle = c; ctx.fillRect(BX + i * 50, BY - val * KB, 34, val * KB); label(ctx, n, BX + 17 + i * 50, BY + 14, { align: 'center', size: 12, weight: 700 }); });
    hline(ctx, BX - 6, BX + 90, BY, P.ink2, 1); label(ctx, 'per kg', BX + 42, BY - 1.3e7 * KB - 14, { align: 'center', size: 12, color: P.ink2 });
    partsPanel(ctx, 630, 34, 300, 'Working', ['½v² − GM/R = −GM/(R + h)', 'R + h = 8.0 × 10⁶ m: h ≈ 1.6 × 10⁶ m', 'Returns at 5 km/s'], stageAt(stages, t), false);
    note(ctx, 'Earth and height to scale: 1 px = 10 km; flight timing illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q18
const SCENE = (() => {
  const VE = 11.2, V0 = 3 * VE, VI = Math.sqrt(V0 * V0 - VE * VE), D = 10, RMAX = 40;
  const vOf = x => Math.sqrt(V0 * V0 - VE * VE * (1 - 1 / x));                   // x = r/R
  const qStages = [
    { title: 'Launched at 3 × escape speed', dur: D, text: 'The escape speed from the Earth’s surface is 11.2 km/s. A body is projected at three times this speed, 33.6 km/s.' },
    { title: 'What is asked', dur: 4, text: 'What is its speed far away from the Earth? (Ignore the Sun and planets.)' },
  ];
  const stages = [
    { title: 'Slowing as it leaves', dur: D, text: 'Energy: ½v² − GM/r stays constant. Far away GM/r → 0. And GM/R = ½v_e².', ans: '½(3v_e)² − ½v_e² = ½v∞².' },
    { title: 'Far away', dur: 4, text: 'v∞² = 9v_e² − v_e² = 8v_e².', ans: 'v∞ = √8 × 11.2 ≈ 31.7 km/s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const x = 1 + (RMAX - 1) * (clamp(t / (D - 1)) ** 2), LY = 110, px = r => 50 + (r - 1) / (RMAX - 1) * 520;
    ball(ctx, 40, LY, 14, P.water); hline(ctx, 54, 580, LY, P.ink2, 1, [3, 4]);
    ball(ctx, px(x), LY, 6, P.force); label(ctx, 'Earth', 40, LY + 26, { align: 'center', size: 12, weight: 700 });
    label(ctx, `r = ${x.toFixed(1)} R`, px(x), LY - 20, { align: 'center', size: 12, weight: 700 });
    if (!ans) { label(ctx, '33.6 km/s at launch', 60, LY + 60, { weight: 700, size: 14, color: P.vel }); askedPanel(ctx, 630, 34, 300, ['The speed of the body far away from the Earth.']); note(ctx, 'distances in Earth radii'); return; }
    const g = axes(ctx, { x: 70, y: 200, w: 470, h: 260, x0: 1, x1: RMAX, y0: 25, y1: 35, xt: [10, 20, 30, 40], yt: [30], xl: 'r / R', yl: 'v (km/s)' });
    hline(ctx, g.X(1), g.X(RMAX), g.Y(VI), P.accent, 1.5, [6, 4]); label(ctx, 'v∞ ≈ 31.7 km/s', g.X(RMAX) - 4, g.Y(VI) - 12, { align: 'right', weight: 800, size: 14, color: P.accent });
    plot(ctx, g, vOf, 1, x, P.vel); ball(ctx, g.X(x), g.Y(vOf(x)), 5, P.force);
    label(ctx, `v = ${vOf(x).toFixed(1)} km/s`, 330, 175, { weight: 700, size: 14, color: P.vel });
    partsPanel(ctx, 630, 34, 300, 'Working', ['½(3v_e)² − ½v_e² = ½v∞²', 'v∞ = √8 v_e ≈ 31.7 km/s'], stageAt(stages, t), false);
    note(ctx, 'distances in Earth radii; speed axis starts at 25 km/s');
  }
  return { qStages, stages, draw };
})();

//@@ q19
const SCENE = (() => {
  const G = 6.67e-11, M = 6e24, m = 200, RE = 6.4e6, R = RE + 4e5, KE = G * M * m / (2 * R), PE = -2 * KE, E = -KE, CX = 200, CY = 280, ER = 110, OR = 150;
  const qStages = [
    { title: 'In orbit', dur: 6, text: 'A 200 kg satellite orbits 400 km above the Earth. M = 6.0 × 10²⁴ kg, R = 6.4 × 10⁶ m, G = 6.67 × 10⁻¹¹ N m² kg⁻².' },
    { title: 'What is asked', dur: 4, text: 'How much energy must be spent to send it out of the Earth’s gravitational influence?' },
  ];
  const stages = [
    { title: 'Energy in orbit', dur: 6, text: 'In a circular orbit, KE = GMm/2r and PE = −GMm/r, with r = 6.8 × 10⁶ m.', ans: 'E = KE + PE = −GMm/2r ≈ −5.9 × 10⁹ J.' },
    { title: 'Escape', dur: 5, text: 'To escape, the total energy must be raised to zero.', ans: 'Energy needed = +5.9 × 10⁹ J.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.4; ctx.beginPath(); ctx.arc(CX, CY, ER, 0, Math.PI * 2); ctx.fill(); ctx.restore(); label(ctx, 'Earth', CX, CY, { align: 'center', weight: 700, size: 14 });
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(CX, CY, OR, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    const a = -t * 0.8; ball(ctx, CX + OR * Math.cos(a), CY + OR * Math.sin(a), 7, P.force); label(ctx, '200 kg', CX + OR * Math.cos(a) + 12, CY + OR * Math.sin(a), { size: 12, weight: 700 });
    label(ctx, 'h = 400 km', CX, CY - OR - 14, { align: 'center', size: 13, weight: 700 });
    if (ans) {
      const BX = 420, ZY = 120, KB = 1.6e-8;                                    // 1 px = 6.25 × 10⁷ J
      hline(ctx, BX - 20, BX + 170, ZY, P.ink, 1.5); label(ctx, '0', BX - 26, ZY, { align: 'right', size: 12 });
      [['KE', KE, P.ke], ['PE', PE, P.pe], ['E', E, P.accent]].forEach(([n, v, c], i) => { ctx.fillStyle = c; ctx.fillRect(BX + i * 50, v > 0 ? ZY - v * KB : ZY, 34, Math.abs(v) * KB); label(ctx, n, BX + 17 + i * 50, v > 0 ? ZY - v * KB - 12 : ZY + Math.abs(v) * KB + 14, { align: 'center', size: 12, weight: 700 }); });
      label(ctx, '+5.9 × 10⁹ J', BX + 17, ZY - KE * KB - 30, { align: 'center', size: 12, weight: 700, color: P.ke }); label(ctx, '−11.8 × 10⁹ J', BX + 67, ZY - PE * KB + 30, { align: 'center', size: 12, weight: 700, color: P.pe }); label(ctx, '−5.9 × 10⁹ J', BX + 117, ZY - E * KB + 30, { align: 'center', size: 12, weight: 700, color: P.accent });
      if (t >= stages[1].t0) { vec(ctx, BX + 160, ZY - E * KB, 0, E * KB, '', P.force); label(ctx, 'needed: +5.9 × 10⁹ J', BX + 100, ZY - E * KB + 56, { align: 'center', weight: 800, size: 13, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['E = −GMm/2r ≈ −5.9 × 10⁹ J', 'Energy needed to reach E = 0: 5.9 × 10⁹ J'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The energy that must be expended to send the satellite out of the Earth’s gravitational influence.']);
    note(ctx, 'orbit height exaggerated for visibility');
  }
  return { qStages, stages, draw };
})();

//@@ q20
const SCENE = (() => {
  const G = 6.67e-11, M = 2e30, D0 = 1e12, DC = 2e7, CX = 300, Y = 230, D = 12;
  const vOf = d => Math.sqrt(G * M * (1 / d - 1 / D0));
  const dOf = u => D0 * Math.pow(DC / D0, u);                                // separation shrinks on a log scale (time compressed)
  const half = d => 30 + 230 * (Math.log10(d) - Math.log10(DC)) / (Math.log10(D0) - Math.log10(DC));
  const qStages = [
    { title: 'Falling together', dur: D + 1, text: 'Two stars of one solar mass each (2 × 10³⁰ kg) start 10⁹ km apart with negligible speeds and fall towards each other. Each has radius 10⁴ km.' },
    { title: 'What is asked', dur: 4, text: 'With what speed do they collide? (Use the known value of G.)' },
  ];
  const stages = [
    { title: 'Energy', dur: D + 1, text: 'Total energy is conserved: −GM²/d₀ = 2 × ½Mv² − GM²/d. They touch when the centres are 2 × 10⁴ km = 2 × 10⁷ m apart.', ans: 'v² = GM(1/d − 1/d₀).' },
    { title: 'At contact', dur: 5, text: 'Put d = 2 × 10⁷ m and d₀ = 10¹² m.', ans: 'v² ≈ 6.67 × 10¹² m²/s²: v ≈ 2.6 × 10⁶ m/s each.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const d = dOf(clamp(t / D)), h = half(d), v = vOf(d);
    for (const s of [-1, 1]) { ctx.fillStyle = P.ke; ctx.beginPath(); ctx.arc(CX + s * h, Y, 28, 0, Math.PI * 2); ctx.fill(); }
    label(ctx, `separation ${d.toExponential(1).replace(/e\+(\d+)/, (m, e) => ' × 10' + [...e].map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''))} m`, CX, Y + 70, { align: 'center', weight: 700, size: 14 });
    label(ctx, 'positions on a logarithmic scale', CX, Y + 94, { align: 'center', size: 12, color: P.ink2 });
    if (ans) {
      const g = axes(ctx, { x: 80, y: 360, w: 440, h: 120, x0: 7.3, x1: 12, y0: 0, y1: 2.8, xt: [8, 9, 10, 11, 12], yt: [1, 2], xl: 'log₁₀(d / m)', yl: 'v (10⁶ m/s)' });
      plot(ctx, g, L => vOf(10 ** L) / 1e6, Math.log10(d), 12, P.vel);
      label(ctx, `v = ${v < 1e4 ? v.toFixed(0) + ' m/s' : (v / 1e6).toFixed(2) + ' × 10⁶ m/s'}`, CX, 60, { align: 'center', weight: 800, size: 16, color: P.vel });
      partsPanel(ctx, 630, 34, 300, 'Working', ['v² = GM(1/d − 1/d₀)', 'd = 2 × 10⁷ m: v ≈ 2.6 × 10⁶ m/s'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The speed with which the two stars collide.']);
    note(ctx, 'not to scale: stars drawn huge; separation on a log scale; time compressed');
  }
  return { qStages, stages, draw };
})();

//@@ q21
const SCENE = (() => {
  const K = 360, X1 = 120, X2 = X1 + K, Y = 200, RS = 0.1 * K, MX = (X1 + X2) / 2;
  const qStages = [
    { title: 'Two heavy spheres', dur: 5, text: 'Two spheres, 100 kg each and radius 0.10 m, lie 1.0 m apart on a table.' },
    { title: 'What is asked', dur: 4, text: 'Find the gravitational force and potential at the midpoint. Is an object there in equilibrium? Stable or unstable?' },
  ];
  const stages = [
    { title: 'At the midpoint', dur: 4, text: 'Equal masses at equal distances pull equally in opposite directions.', ans: 'Net force = 0.' },
    { title: 'Potential', dur: 4, text: 'Potentials (scalars) add: each sphere gives −GM/0.5.', ans: 'V = −4GM = −4 × 6.67 × 10⁻¹¹ × 100 ≈ −2.7 × 10⁻⁸ J/kg.' },
    { title: 'Nudged sideways', dur: 6, text: 'Move the object slightly towards one sphere: that sphere now pulls harder.', ans: 'It moves further away from the midpoint: unstable equilibrium (the potential has a maximum there).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (const x of [X1, X2]) { ball(ctx, x, Y, RS, P.objFill2); label(ctx, '100 kg', x, Y + RS + 16, { align: 'center', size: 13, weight: 700 }); }
    dim(ctx, X1, X2, Y - 60, P.ink2); label(ctx, '1.0 m', MX, Y - 76, { align: 'center', weight: 700, size: 13 });
    let x = MX;
    if (ans && t >= stages[2].t0) { const s = t - stages[2].t0; x = Math.min(MX + 4 + 0.5 * 10 * s * s, MX + 110); }
    ball(ctx, x, Y, 6, P.force);
    if (ans) {
      const f1 = 1 / ((x - X1) / K) ** 2, f2 = 1 / ((X2 - x) / K) ** 2, S = 12;
      vec(ctx, x - 8, Y, -Math.min(S * f1, 110), 0, '', P.vel, { lw: 3 }); vec(ctx, x + 8, Y, Math.min(S * f2, 110), 0, '', P.vel, { lw: 3 });
      const g = axes(ctx, { x: 80, y: 300, w: 480, h: 180, x0: 0, x1: 1, y0: -12, y1: -3, xl: 'position (m)', yl: 'V (in units of GM per metre)' });
      plot(ctx, g, p => -1 / Math.max(0.1, p) - 1 / Math.max(0.1, 1 - p), 0.1, 0.9, P.accent);
      const p = (x - X1) / K; ball(ctx, g.X(p), g.Y(-1 / p - 1 / (1 - p)), 6, P.force);
      label(ctx, 'maximum at the midpoint: unstable', g.X(0.5), g.Y(-4) + 18, { align: 'center', size: 13, weight: 700, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['Force at the midpoint: 0', 'V = −4GM ≈ −2.7 × 10⁻⁸ J/kg', 'Equilibrium, but unstable'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The gravitational force and potential at the midpoint.', 'Is an object there in equilibrium? If so, stable or unstable?']);
    note(ctx, 'force arrows greatly exaggerated; motion after the nudge illustrative');
  }
  return { qStages, stages, draw };
})();
