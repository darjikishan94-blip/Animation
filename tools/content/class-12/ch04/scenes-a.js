//@@ q03
const SCENE = (() => {
  const D = 6;
  const qStages = [
    { title: 'A north–south wire', dur: 5, text: 'A long straight wire in a horizontal plane carries 50 A from north to south.' },
    { title: 'What is asked', dur: 4, text: 'The magnitude and direction of B at a point 2.5 m east of the wire.' },
  ];
  const stages = [
    { title: 'Magnitude', dur: 5, text: 'B = μ₀I/2πr.', ans: 'B = 2 × 10⁻⁷ × 50/2.5 = 4 × 10⁻⁶ T.' },
    { title: 'Direction', dur: D, text: 'Look along the wire from the south: the current comes towards you (⊙), so the field circles anticlockwise.', ans: 'At the point on the east side, the field points vertically upward.' },
  ];
  function compass(ctx, x, y, labels) { arrow(ctx, x, y + 16, x, y - 16, P.ink2, { lw: 1.5, head: 8 }); label(ctx, labels[0], x, y - 26, { align: 'center', weight: 800, size: 12, color: P.ink2 }); arrow(ctx, x - 16, y, x + 16, y, P.ink2, { lw: 1.5, head: 8 }); label(ctx, labels[1], x + 26, y, { align: 'center', weight: 800, size: 12, color: P.ink2 }); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); vline(ctx, 300, 40, 500, P.rule, 1);
    // left: from above
    label(ctx, 'from above', 150, 50, { align: 'center', weight: 800, size: 14 }); compass(ctx, 50, 110, ['N', 'E']);
    vline(ctx, 110, 80, 480, P.obj, 4); [180, 300, 420].forEach(y => vec(ctx, 110, y - 30, 0, 50, '', P.force, { lw: 3, head: 10 })); label(ctx, '50 A', 96, 250, { align: 'right', weight: 800, size: 14, color: P.force });
    ball(ctx, 240, 280, 6, P.ink); label(ctx, 'P', 252, 268, { weight: 800, size: 14 }); dim(ctx, 110, 240, 320, P.ink2); label(ctx, '2.5 m', 175, 336, { align: 'center', weight: 700, size: 13 });
    // right: end-on looking north
    label(ctx, 'end-on, looking north', 455, 50, { align: 'center', weight: 800, size: 14 }); compass(ctx, 340, 110, ['up', 'E']);
    const WX = 420, WY = 300; fieldSym(ctx, WX, WY, true, 12, P.force); label(ctx, 'current towards you', WX, WY + 34, { align: 'center', size: 12, color: P.force });
    ball(ctx, WX + 130, WY, 6, P.ink); label(ctx, 'P', WX + 142, WY + 16, { weight: 800, size: 14 });
    if (ans) {
      const st = stageAt(stages, t), u = clamp((t - stages[1].t0) / (D - 2));
      if (st >= 1) { [60, 100, 130].forEach(r => { ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.arc(WX, WY, r, 0, -2 * Math.PI * u, true); ctx.stroke(); ctx.restore(); });
        if (u > 0.3) { arrow(ctx, WX - 100, WY + 6, WX - 100, WY + 16, P.accent, { lw: 1.5, head: 9 }); arrow(ctx, WX + 6, WY - 100, WX - 8, WY - 100, P.accent, { lw: 1.5, head: 9 }); } }
      if (st >= 1 && u >= 1) { vec(ctx, WX + 130, WY, 0, -70, 'B up', P.accent, { side: 1, at: 1, lw: 4 }); fieldSym(ctx, 240, 280, true, 13, P.accent); label(ctx, 'B up (⊙)', 260, 300, { weight: 800, size: 13, color: P.accent }); }
      label(ctx, 'B = 4 × 10⁻⁶ T', 455, 470, { align: 'center', weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['B = μ₀I/2πr = 4 × 10⁻⁶ T', 'Direction: vertically upward'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The magnitude and direction of B at a point 2.5 m east of the wire.']);
    note(ctx, 'not to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const D = 6;
  const qStages = [
    { title: 'An east–west power line', dur: 5, text: 'A horizontal overhead line carries 90 A from east to west.' },
    { title: 'What is asked', dur: 4, text: 'The magnitude and direction of the field 1.5 m below the line.' },
  ];
  const stages = [
    { title: 'Magnitude', dur: 5, text: 'B = μ₀I/2πr.', ans: 'B = 2 × 10⁻⁷ × 90/1.5 = 1.2 × 10⁻⁵ T.' },
    { title: 'Direction', dur: D, text: 'Look along the line from the west: the current comes towards you (⊙), so the field circles anticlockwise.', ans: 'Below the line the field points south.' },
  ];
  function compass(ctx, x, y, up, right) { arrow(ctx, x, y + 16, x, y - 16, P.ink2, { lw: 1.5, head: 8 }); label(ctx, up, x, y - 26, { align: 'center', weight: 800, size: 12, color: P.ink2 }); arrow(ctx, x - 16, y, x + 16, y, P.ink2, { lw: 1.5, head: 8 }); label(ctx, right, x + 22, y, { weight: 800, size: 12, color: P.ink2 }); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); vline(ctx, 300, 40, 500, P.rule, 1);
    label(ctx, 'side view, looking north', 150, 50, { align: 'center', weight: 800, size: 14 }); compass(ctx, 40, 110, 'up', 'E');
    hline(ctx, 20, 285, 180, P.obj, 4); [250, 150].forEach(x => vec(ctx, x, 180, -50, 0, '', P.force, { lw: 3, head: 10 })); label(ctx, '90 A', 200, 160, { align: 'center', weight: 800, size: 14, color: P.force });
    ball(ctx, 150, 340, 6, P.ink); label(ctx, 'P', 164, 340, { weight: 800, size: 14 }); vdim(ctx, 110, 180, 340, P.ink2); label(ctx, '1.5 m', 102, 260, { align: 'right', weight: 700, size: 13 });
    label(ctx, 'end-on, looking east', 455, 50, { align: 'center', weight: 800, size: 14 }); compass(ctx, 330, 110, 'up', 'S');
    const WX = 450, WY = 220; fieldSym(ctx, WX, WY, true, 12, P.force); label(ctx, 'current towards you', WX + 24, WY - 22, { size: 12, color: P.force });
    ball(ctx, WX, WY + 130, 6, P.ink); label(ctx, 'P', WX - 16, WY + 146, { weight: 800, size: 14 });
    if (ans) {
      const st = stageAt(stages, t), u = clamp((t - stages[1].t0) / (D - 2));
      if (st >= 1) { [70, 130].forEach(r => { ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.arc(WX, WY, r, 0, -2 * Math.PI * u, true); ctx.stroke(); ctx.restore(); }); }
      if (st >= 1 && u >= 1) { vec(ctx, WX, WY + 130, 70, 0, 'B (south)', P.accent, { side: 1, at: 0.6, lw: 4 }); fieldSym(ctx, 150, 340, true, 13, P.accent); label(ctx, 'B south (⊙, towards you)', 150, 372, { align: 'center', weight: 800, size: 13, color: P.accent }); }
      label(ctx, 'B = 1.2 × 10⁻⁵ T', 455, 470, { align: 'center', weight: 800, size: 16, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['B = μ₀I/2πr = 1.2 × 10⁻⁵ T', 'Direction: towards the south'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The magnitude and direction of the magnetic field 1.5 m below the line.']);
    note(ctx, 'not to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const XA = 200, XB = 400, Y0 = 60, Y1 = 480, S0 = 180, S1 = 360;
  const qStages = [
    { title: 'Two parallel wires', dur: 5, text: 'Long parallel wires A (8.0 A) and B (5.0 A) carry currents in the same direction, 4.0 cm apart.' },
    { title: 'What is asked', dur: 4, text: 'Estimate the force on a 10 cm section of wire A.' },
  ];
  const stages = [
    { title: 'Field of B at A', dur: 5, text: 'B’s field at A: μ₀I_B/2πd, out of the page here (right-hand rule).', ans: 'B = 2 × 10⁻⁷ × 5.0/0.040 = 2.5 × 10⁻⁵ T.' },
    { title: 'Force on A', dur: 5, text: 'F = BI_A L, at right angles to both the wire and the field.', ans: 'F = 2.5 × 10⁻⁵ × 8.0 × 0.10 = 2 × 10⁻⁵ N, towards B: the wires attract.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    vline(ctx, XA, Y0, Y1, P.obj, 5); vline(ctx, XB, Y0, Y1, P.obj, 4);
    [XA, XB].forEach(x => [110, 430].forEach(y => vec(ctx, x, y + 25, 0, -50, '', P.force, { lw: 3, head: 10 })));
    label(ctx, 'A: 8.0 A', XA, Y1 + 22, { align: 'center', weight: 800, size: 14 }); label(ctx, 'B: 5.0 A', XB, Y1 + 22, { align: 'center', weight: 800, size: 14 });
    ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 10; ctx.globalAlpha = 0.35; seg(ctx, XA, S0, XA, S1); ctx.restore();
    label(ctx, '10 cm', XA - 18, (S0 + S1) / 2, { align: 'right', weight: 700, size: 13, color: P.accent });
    dim(ctx, XA, XB, 70, P.ink2); label(ctx, '4.0 cm', (XA + XB) / 2, 54, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      const st = stageAt(stages, t);
      [200, 245, 350].forEach(y => fieldSym(ctx, XA + 26, y, true, 8, P.vel));
      label(ctx, 'field of B at A: ⊙', XA + 12, 170, { weight: 700, size: 12, color: P.vel });
      if (st >= 1) { vec(ctx, XA + 6, 300, 80, 0, 'F on A', P.accent, { side: -1, at: 0.5, lw: 4 }); vec(ctx, XB - 6, 300, -80, 0, 'F on B', P.accent, { side: 1, at: 0.5, lw: 4 }); label(ctx, 'F = 2 × 10⁻⁵ N', (XA + XB) / 2, 390, { align: 'center', weight: 800, size: 15, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['Field of B at A = 2.5 × 10⁻⁵ T', 'F = BI_A L = 2 × 10⁻⁵ N, attractive'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The force on a 10 cm section of wire A.']);
    note(ctx, 'separation and section length not to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const CX = 300, CY = 270, L = 90, TH = 30 * Math.PI / 180;
  const n = [Math.cos(TH), Math.sin(TH)], u = [-Math.sin(TH), Math.cos(TH)];   // math axes (y up): normal and the coil’s horizontal edge direction
  const cv = (x, y) => [CX + x, CY - y];
  const qStages = [
    { title: 'A hanging coil', dur: 5, text: 'A square coil, side 10 cm, 20 turns, 12 A, hangs vertically. Its normal makes 30° with a horizontal field of 0.80 T. View from above.' },
    { title: 'What is asked', dur: 4, text: 'What is the magnitude of the torque on the coil?' },
  ];
  const stages = [
    { title: 'A couple', dur: 5, text: 'The two vertical sides carry current up (⊙) and down (⊗); the forces on them are equal and opposite but not in line.', ans: 'The couple turns the normal towards B.' },
    { title: 'Torque', dur: 5, text: 'τ = NIAB sin θ.', ans: 'τ = 20 × 12 × 0.010 × 0.80 × sin 30° = 0.96 N m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let y = 70; y <= 470; y += 50) arrow(ctx, 30, y, 590, y, P.grid, { lw: 1.5, head: 9 });
    label(ctx, 'B = 0.80 T', 580, 50, { align: 'right', weight: 700, size: 14, color: P.ink2 }); label(ctx, 'view from above', 30, 50, { weight: 700, size: 13, color: P.ink2 });
    const p1 = cv(L * u[0], L * u[1]), p2 = cv(-L * u[0], -L * u[1]);
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 6; seg(ctx, ...p1, ...p2); ctx.restore();
    fieldSym(ctx, ...p1, true, 10, P.force); fieldSym(ctx, ...p2, false, 10, P.force);
    label(ctx, 'current up', p1[0] - 16, p1[1] - 14, { align: 'right', size: 12, color: P.force }); label(ctx, 'current down', p2[0] + 16, p2[1] + 16, { size: 12, color: P.force });
    vec(ctx, CX, CY, 110 * n[0], -110 * n[1], 'normal', P.accent, { side: -1, at: 1, lw: 3 });
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(CX, CY, 60, -TH, 0); ctx.stroke(); ctx.restore(); hline(ctx, CX, CX + 120, CY, P.ink2, 1, [4, 4]); label(ctx, '30°', CX + 70, CY - 14, { weight: 700, size: 13 });
    label(ctx, 'coil (edge-on), 10 cm', CX - 70, CY + 30, { align: 'right', size: 12 });
    if (ans) {
      const st = stageAt(stages, t);
      vec(ctx, ...p1, 0, -70, 'F', P.vel, { side: 1, at: 1, ax: 10 }); vec(ctx, ...p2, 0, 70, 'F', P.vel, { side: 1, at: 1, ax: -10 });
      rotArrow(ctx, CX, CY, 150, true, P.acc);
      if (st >= 1) label(ctx, 'τ = 0.96 N m', CX, 490, { align: 'center', weight: 800, size: 18, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working', ['Equal, opposite forces on the vertical sides: a couple', 'τ = NIAB sin θ = 0.96 N m'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The magnitude of the torque on the coil.']);
    note(ctx, 'top view; the coil is held at 30°');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const X0 = 80, Y0 = 120, R = 150, D = 8;
  const qStages = [
    { title: 'An electron enters a field', dur: 6, text: 'A uniform field of 6.5 G (6.5 × 10⁻⁴ T). An electron is shot in at 4.8 × 10⁶ m/s at right angles to the field.' },
    { title: 'What is asked', dur: 4, text: 'Why is the path a circle? What is its radius?' },
  ];
  const stages = [
    { title: 'Force ⟂ velocity', dur: D, text: 'F = evB is always at right angles to v: it changes the direction, not the speed.', ans: 'Constant speed + constant-size sideways force → uniform circular motion.' },
    { title: 'Radius', dur: 5, text: 'evB = mv²/r, so r = mv/eB.', ans: 'r = 9.1 × 10⁻³¹ × 4.8 × 10⁶/(1.6 × 10⁻¹⁹ × 6.5 × 10⁻⁴) ≈ 4.2 cm (4.5 cm with the printed e = 1.5 × 10⁻¹⁹ C).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let x = 40; x <= 580; x += 50) for (let y = 60; y <= 480; y += 50) fieldSym(ctx, x, y, false, 6, P.grid);
    label(ctx, 'B into page, 6.5 G', 580, 30, { align: 'right', weight: 700, size: 13, color: P.ink2 });
    const XE = 300, cx = XE, cy = Y0 + R;
    block(ctx, XE - 125, Y0 - 8, 50, 16, '', P.objFill2); label(ctx, 'electron gun', XE - 100, Y0 - 22, { align: 'center', size: 12 });
    let x, y, a = 0;
    const s = ans ? t * 0.9 : Math.max(0, t - 1) * 0.9;   // angle turned (rad)
    if (!ans && t < 1) { x = XE; y = Y0; }
    else { a = s; x = cx + R * Math.sin(a); y = cy - R * Math.cos(a); }
    if (ans || t >= 1) { ctx.save(); ctx.strokeStyle = P.vel; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.min(a, 2 * Math.PI)); ctx.stroke(); ctx.restore(); }
    ball(ctx, x, y, 8, P.vel); label(ctx, '−', x, y, { align: 'center', weight: 800, size: 12, color: P.sheet, halo: false });
    const vx = Math.cos(a), vy = Math.sin(a);
    vec(ctx, x, y, 60 * vx, 60 * vy, 'v', P.vel, { side: -1, at: 1, italic: true, lw: 3 });
    if (ans) {
      const st = stageAt(stages, t);
      vec(ctx, x, y, 50 * (cx - x) / R, 50 * (cy - y) / R, 'F', P.force, { side: 1, at: 1, italic: true, lw: 3 });
      if (st >= 1) { ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; seg(ctx, cx, cy, cx + R * Math.cos(-0.6), cy + R * Math.sin(-0.6)); ctx.restore(); label(ctx, 'r ≈ 4.2 cm', cx + 70, cy - 20, { weight: 800, size: 15, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['F ⟂ v: uniform circular motion', 'r = mv/eB ≈ 4.2 cm'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Why the path of the electron is a circle.', 'The radius of the circular orbit.']);
    note(ctx, 'circle 3.6 px per mm; field direction chosen for the picture');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const XE = 200, Y0 = 250, R = 80, D = 9;
  const qStages = [
    { title: 'The electron of Ex. 4.11', dur: 6, text: 'The electron goes round its circle in the 6.5 G field.' },
    { title: 'What is asked', dur: 4, text: 'Find the frequency of revolution. Does it depend on the speed?' },
  ];
  const stages = [
    { title: 'Period', dur: D, text: 'T = 2πr/v and r = mv/eB, so T = 2πm/eB: v cancels. A twice-as-fast electron goes round a twice-as-big circle in the same time.', ans: 'Both electrons finish their turn together.' },
    { title: 'Frequency', dur: 5, text: 'ν = eB/2πm.', ans: 'ν = 1.6 × 10⁻¹⁹ × 6.5 × 10⁻⁴/(2π × 9.1 × 10⁻³¹) ≈ 1.8 × 10⁷ Hz: independent of speed.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let x = 60; x <= 580; x += 50) for (let y = 40; y <= 500; y += 50) fieldSym(ctx, x, y, false, 6, P.grid);
    const a = Math.min(2 * Math.PI, t * 2 * Math.PI / (D - 2));
    const es = ans ? [[R, P.vel, 'v'], [2 * R, P.force, '2v']] : [[R, P.vel, 'v']];
    es.forEach(([r, col, nm]) => {
      const cx = XE, cy = Y0 - 80 + r;   // all start at the same point, moving right
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + a); ctx.stroke(); ctx.restore();
      const x = cx + r * Math.sin(a), y = cy - r * Math.cos(a); ball(ctx, x, y, 7, col); label(ctx, nm, x + 12, y + (nm === 'v' ? 14 : -12), { weight: 800, size: 13, color: col });
    });
    if (ans) {
      const st = stageAt(stages, t);
      if (a >= 2 * Math.PI) label(ctx, 'same time for one turn', 300, 500, { align: 'center', weight: 800, size: 15, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['T = 2πm/eB: speed cancels', 'ν ≈ 1.8 × 10⁷ Hz; no dependence on v'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The frequency of revolution of the electron.', 'Whether it depends on the electron’s speed, and why.']);
    note(ctx, 'B into the page; circles not to scale');
  }
  return { qStages, stages, draw };
})();
