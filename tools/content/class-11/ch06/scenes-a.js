//@@ q02
const SCENE = (() => {
  const SEP = 1.27, RAT = 35.5, K = 350, HX = 100, Y = 260, XCM = SEP * RAT / (1 + RAT);   // 350 px per Å
  const qStages = [
    { title: 'HCl', dur: 5, text: 'In HCl the nuclei are about 1.27 Å apart. A chlorine atom is about 35.5 times as massive as a hydrogen atom; nearly all the mass is in the nuclei.' },
    { title: 'What is asked', dur: 4, text: 'Find the approximate location of the centre of mass of the molecule.' },
  ];
  const stages = [
    { title: 'Weighted average', dur: 5, text: 'Put H at x = 0 and Cl at x = 1.27 Å. The CM is the mass-weighted average position.', ans: 'x_CM = (m × 0 + 35.5m × 1.27) / 36.5m.' },
    { title: 'The CM', dur: 4, text: 'The heavy chlorine pulls the CM almost onto itself.', ans: 'x_CM ≈ 1.24 Å from H (about 0.035 Å from Cl).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const CX = HX + SEP * K;
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.lineWidth = 2; ctx.setLineDash([3, 5]); seg(ctx, HX, Y, CX, Y); ctx.restore();
    ball(ctx, HX, Y, 8, P.vel); label(ctx, 'H', HX, Y - 24, { align: 'center', weight: 800, size: 16 }); label(ctx, 'm', HX, Y + 26, { align: 'center', italic: true, size: 14 });
    ball(ctx, CX, Y, 22, P.leaf); label(ctx, 'Cl', CX, Y - 38, { align: 'center', weight: 800, size: 16 }); label(ctx, '35.5 m', CX, Y + 40, { align: 'center', size: 14 });
    dim(ctx, HX, CX, Y + 80, P.ink2); label(ctx, '1.27 Å', (HX + CX) / 2, Y + 96, { align: 'center', weight: 700, size: 14 });
    if (ans) {
      const x = HX + (SEP / 2 + (XCM - SEP / 2) * smooth(clamp(t / 4))) * K;
      ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 3; seg(ctx, x, Y - 70, x, Y + 50); ctx.restore(); label(ctx, 'CM', x, Y - 82, { align: 'center', weight: 800, size: 15, color: P.accent });
      if (t >= stages[1].t0) { dim(ctx, HX, HX + XCM * K, Y - 120, P.accent); label(ctx, '≈ 1.24 Å', HX + XCM * K / 2, Y - 136, { align: 'center', weight: 800, size: 15, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['x_CM = (35.5m × 1.27) / (36.5m)', '≈ 1.24 Å from the H nucleus'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The approximate location of the centre of mass of the HCl molecule.']);
    note(ctx, 'nuclei drawn as dots, sizes not to scale; 350 px per Å');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const MT = 4, MC = 1, V = 24, X0 = 150, RY = 360, D = 12;               // masses and speeds illustrative
  const r = t => t < 2 ? -85 : -85 * Math.cos(1.4 * (t - 2));            // child’s position on the trolley (px from its centre)
  const qStages = [
    { title: 'Moving uniformly', dur: 2, text: 'A child sits at one end of a long trolley that moves uniformly at speed V on a smooth floor.' },
    { title: 'The child runs', dur: D - 2, text: 'The child gets up and runs about on the trolley in any manner.' },
    { title: 'What is asked', dur: 4, text: 'What is the speed of the centre of mass of the trolley + child?' },
  ];
  const stages = [
    { title: 'Before', dur: 2, text: 'The trolley and the child move together at V.', ans: 'The CM moves at V.' },
    { title: 'Running about', dur: D - 2, text: 'The child pushes the trolley and the trolley pushes the child: internal forces. The smooth floor gives no horizontal force.', ans: 'The trolley jerks back and forth, but the CM (marker) moves steadily.' },
    { title: 'The answer', dur: 4, text: 'No external horizontal force, so the CM velocity cannot change.', ans: 'Speed of the CM = V.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 20, 600, RY + 20);
    const tm = Math.min(t, D), xcm = X0 + V * tm, xt = xcm - MC * r(tm) / (MT + MC), xc = xt + r(tm);
    block(ctx, xt - 110, RY - 26, 220, 26, '', P.objFill2); for (const wx of [xt - 80, xt + 80]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, RY + 8, 12, 0, Math.PI * 2); ctx.fill(); }
    person(ctx, xc, RY - 26, 0.75);
    vec(ctx, xt + 116, RY - 13, 36, 0, 'V', P.vel, { side: -1, at: 0.6, italic: true });
    if (ans) {
      ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 3; seg(ctx, xcm, RY - 130, xcm, RY + 30); ctx.restore(); label(ctx, 'CM', xcm, RY - 142, { align: 'center', weight: 800, size: 14, color: P.accent });
      vec(ctx, xcm, RY - 160, 36, 0, 'V', P.accent, { side: -1, at: 0.6, italic: true });
      const pts = []; for (let s = 0; s <= tm; s += 0.1) pts.push([X0 + V * s, 120]); if (pts.length > 1) { ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 2; poly(ctx, pts); ctx.restore(); }
      label(ctx, 'path of the CM: steady', X0, 104, { size: 12, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['CM moves at V', 'Child–trolley forces are internal', 'No external horizontal force: CM speed stays V'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The speed of the centre of mass of the (trolley + child) system.']);
    note(ctx, 'masses, speed and the child’s running illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const Y1 = 330, Y2 = 210, D = 12, V = 26;                               // particle 1 moves right on Y1, particle 2 left on Y2; d = 120 px
  const qStages = [
    { title: 'Opposite directions', dur: D, text: 'Two particles, each of mass m and speed v, move in opposite directions along parallel lines a distance d apart.' },
    { title: 'What is asked', dur: 4, text: 'Show that the angular momentum of the pair is the same about every point.' },
  ];
  const stages = [
    { title: 'Any reference point O', dur: D, text: 'About O: L = r₁ × p + r₂ × (−p) = (r₁ − r₂) × p. Move O around and watch the two contributions.', ans: 'Each particle’s own L changes with O, but their sum does not.' },
    { title: 'Why', dur: 5, text: 'r₁ − r₂ goes from one particle to the other, whatever O is; its part perpendicular to p is d.', ans: 'L = mvd, the same about every point.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 30, 590, Y1, P.ink2, 1, [5, 5]); hline(ctx, 30, 590, Y2, P.ink2, 1, [5, 5]);
    const x1 = 90 + V * t, x2 = 520 - V * t;
    ball(ctx, x1 % 560, Y1, 10, P.vel); vec(ctx, x1 % 560 + 14, Y1, 40, 0, 'mv', P.vel, { side: -1, at: 0.6, italic: true, size: 13 });
    ball(ctx, 30 + ((x2 - 30) % 560 + 560) % 560, Y2, 10, P.force); vec(ctx, 30 + ((x2 - 30) % 560 + 560) % 560 - 14, Y2, -40, 0, 'mv', P.force, { side: 1, at: 0.6, italic: true, size: 13 });
    vdim(ctx, 50, Y2, Y1, P.ink2); label(ctx, 'd', 40, (Y1 + Y2) / 2, { align: 'right', italic: true, weight: 700, size: 15 });
    if (ans) {
      const ox = 300 + 200 * Math.sin(t * 0.7), oy = 270 + 170 * Math.sin(t * 1.1);
      ball(ctx, ox, oy, 5, P.ink); label(ctx, 'O', ox + 10, oy - 10, { weight: 700, size: 14 });
      ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([2, 4]); seg(ctx, ox, oy, x1 % 560, Y1); seg(ctx, ox, oy, 30 + ((x2 - 30) % 560 + 560) % 560, Y2); ctx.restore();
      const L1 = (Y1 - oy) / (Y1 - Y2), L2 = (oy - Y2) / (Y1 - Y2);          // in units of mvd (counter-clockwise positive)
      const BX = 400, BY = 80, KB = 50;
      [['L₁', L1, P.vel], ['L₂', L2, P.force], ['total', L1 + L2, P.accent]].forEach(([n, v, c], i) => { const y = BY + i * 30; label(ctx, n, BX - 8, y, { align: 'right', size: 13, weight: 700 }); ctx.fillStyle = c; ctx.fillRect(v >= 0 ? BX : BX + v * KB, y - 8, Math.abs(v) * KB, 16); label(ctx, `${v.toFixed(2)} mvd`, BX + Math.max(v, 0) * KB + 6, y, { size: 12, weight: 700, color: c }); });
      vline(ctx, BX, BY - 16, BY + 76, P.ink2, 1);
      partsPanel(ctx, 630, 34, 300, 'Proof', ['L about O = (r₁ − r₂) × p', 'r₁ − r₂ does not depend on O: L = mvd always'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['Show that the angular momentum of the two-particle system is the same about whatever point it is taken.']);
    note(ctx, 'positions and the moving reference point O illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const K = 150, BY = 420, XL = 150, XR = XL + 2 * K, A1 = 36.9 * Math.PI / 180, A2 = 53.1 * Math.PI / 180, W = 150, D = 0.72;
  const L1 = [XL - 110, BY - 110 / Math.tan(A1)], L2 = [XR + 120, BY - 120 / Math.tan(A2)];
  const qStages = [
    { title: 'Fig. 6.33', dur: 5, text: 'A non-uniform bar of weight W, 2 m long, hangs at rest from two strings making 36.9° and 53.1° with the vertical.' },
    { title: 'What is asked', dur: 4, text: 'Find the distance d of the centre of gravity from the left end.' },
  ];
  const stages = [
    { title: 'Three forces', dur: 5, text: 'T₁ along the left string, T₂ along the right string, W at the centre of gravity. At rest: no net force and no net torque.', ans: 'Horizontal: T₁ sin 36.9° = T₂ sin 53.1° → 0.6 T₁ = 0.8 T₂.' },
    { title: 'Vertical balance', dur: 5, text: 'The upward parts of T₁ and T₂ hold up W.', ans: '0.8 T₁ + 0.6 T₂ = W → T₂ = 0.6 W, T₁ = 0.8 W.' },
    { title: 'Torques about the left end', dur: 5, text: 'T₁ acts at the left end: no torque about it.', ans: 'W d = (T₂ cos 53.1°) × 2 = 0.6 W × 0.6 × 2 → d = 0.72 m.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (const x of [L1[0], L2[0]]) { hatchRect(ctx, x - (x < 300 ? 14 : 0), 60, 14, 440, P.obj, P.objFill); }
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; seg(ctx, ...L1, XL, BY); seg(ctx, ...L2, XR, BY); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([3, 4]); seg(ctx, L1[0], L1[1], L1[0], L1[1] + 70); seg(ctx, L2[0], L2[1], L2[0], L2[1] + 70); ctx.restore();
    label(ctx, '36.9°', L1[0] + 8, L1[1] + 60, { size: 13, weight: 700 }); label(ctx, '53.1°', L2[0] - 8, L2[1] + 60, { align: 'right', size: 13, weight: 700 });
    ctx.fillStyle = P.wood; ctx.fillRect(XL, BY - 5, 2 * K, 10); ctx.strokeStyle = P.obj; ctx.strokeRect(XL, BY - 5, 2 * K, 10);
    dim(ctx, XL, XR, BY - 30, P.ink2); label(ctx, '2 m', (XL + XR) / 2, BY - 44, { align: 'center', weight: 700, size: 13 });
    const xg = XL + D * K;
    vec(ctx, xg, BY + 5, 0, ans ? W * 0.5 : 40, 'W', P.force, { side: -1, at: 0.7, align: 'left', ax: 4, italic: true });
    dim(ctx, XL, xg, BY + 40, P.ink2); label(ctx, ans && t >= stages[2].t0 ? 'd = 0.72 m' : 'd', (XL + xg) / 2, BY + 56, { align: 'center', weight: 800, size: 14, color: ans && t >= stages[2].t0 ? P.accent : P.ink, italic: !(ans && t >= stages[2].t0) });
    if (ans) {
      const T1 = 0.8 * W * 0.5, T2 = 0.6 * W * 0.5;
      vec(ctx, XL, BY, -T1 * Math.sin(A1), -T1 * Math.cos(A1), 'T₁ = 0.8 W', P.vel, { side: 1, at: 0.6, size: 13 });
      vec(ctx, XR, BY, T2 * Math.sin(A2), -T2 * Math.cos(A2), 'T₂ = 0.6 W', P.vel, { side: -1, at: 0.6, size: 13 });
      partsPanel(ctx, 630, 34, 300, 'Working', ['0.6 T₁ = 0.8 T₂ (horizontal)', '0.8 T₁ + 0.6 T₂ = W → T₁ = 0.8 W, T₂ = 0.6 W', 'W d = 0.6 W × 0.6 × 2 → d = 0.72 m'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The distance d of the centre of gravity of the bar from its left end.']);
    note(ctx, 'bar 150 px per metre; force arrows to scale with W');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const M = 1800, G = 9.8, WT = M * G, LA = 1.8, CG = 1.05, K = 170, FX = 450, BXa = FX - LA * K, GX = FX - CG * K, GY = 420, KF = 1 / 160;   // 1 px = 160 N
  const RF = WT * (LA - CG) / LA, RB = WT - RF;
  const qStages = [
    { title: 'A parked car', dur: 5, text: 'A car of mass 1800 kg has its axles 1.8 m apart. Its centre of gravity is 1.05 m behind the front axle.' },
    { title: 'What is asked', dur: 4, text: 'Find the force exerted by the level ground on each front wheel and each back wheel.' },
  ];
  const stages = [
    { title: 'Forces', dur: 5, text: 'Weight W = 1800 × 9.8 = 17 640 N acts at the centre of gravity; the ground pushes up at the front and back wheels.', ans: 'R_f + R_b = 17 640 N.' },
    { title: 'Torques', dur: 5, text: 'Take torques about the back axle (the CG is 0.75 m in front of it).', ans: 'R_f × 1.8 = 17 640 × 0.75 → R_f = 7350 N; R_b = 10 290 N.' },
    { title: 'Per wheel', dur: 4, text: 'Two wheels share each axle’s load.', ans: 'Each front wheel 3675 N; each back wheel 5145 N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); ground(ctx, 30, 590, GY);
    ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(BXa - 70, GY - 30); ctx.lineTo(BXa - 70, GY - 80); ctx.lineTo(BXa + 30, GY - 85); ctx.lineTo(BXa + 80, GY - 130); ctx.lineTo(FX - 40, GY - 130); ctx.lineTo(FX + 10, GY - 85); ctx.lineTo(FX + 80, GY - 75); ctx.lineTo(FX + 80, GY - 30); ctx.closePath(); ctx.fill(); ctx.stroke();
    for (const wx of [BXa, FX]) { ctx.fillStyle = P.obj; ctx.beginPath(); ctx.arc(wx, GY - 22, 22, 0, Math.PI * 2); ctx.fill(); }
    label(ctx, 'back', BXa, GY + 18, { align: 'center', size: 12 }); label(ctx, 'front', FX, GY + 18, { align: 'center', size: 12 });
    ball(ctx, GX, GY - 112, 6, P.accent); label(ctx, 'CG', GX + 10, GY - 122, { weight: 700, size: 13 });
    dim(ctx, BXa, FX, GY + 40, P.ink2); label(ctx, '1.8 m', (BXa + FX) / 2, GY + 56, { align: 'center', weight: 700, size: 13 });
    dim(ctx, GX, FX, GY - 150, P.ink2); label(ctx, '1.05 m', (GX + FX) / 2, GY - 164, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      vec(ctx, GX, GY - 112, 0, WT * KF, 'W = 17 640 N', P.force, { side: -1, at: 0.5, align: 'left', ax: 6, size: 13 });
      if (t >= stages[1].t0) { vec(ctx, FX, GY + 2, 0, -RF * KF, 'R_f = 7350 N', P.vel, { side: -1, at: 1, align: 'left', ax: 8, size: 13 }); vec(ctx, BXa, GY + 2, 0, -RB * KF, 'R_b = 10 290 N', P.vel, { side: 1, at: 1, align: 'right', ax: -8, size: 13 }); }
      if (t >= stages[2].t0) label(ctx, 'each front wheel 3675 N; each back wheel 5145 N', 300, 500, { align: 'center', weight: 800, size: 15, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Working (g = 9.8 m/s²)', ['W = 17 640 N = R_f + R_b', 'About the back axle: R_f × 1.8 = W × 0.75', 'Front wheel 3675 N; back wheel 5145 N'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The force exerted by the level ground on each front wheel and each back wheel.']);
    note(ctx, 'side view; 170 px per metre; forces 1 px = 160 N');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const AC = 0.12, AS = AC * 2.5, D = 10;                                   // angular accelerations (illustrative), ratio 2.5
  const qStages = [
    { title: 'Equal torques', dur: D, text: 'Equal torques act on a hollow cylinder (about its axis) and a solid sphere (about a diameter) of the same mass and radius.' },
    { title: 'What is asked', dur: 4, text: 'Which acquires the greater angular speed after a given time?' },
  ];
  const stages = [
    { title: 'Moments of inertia', dur: D, text: 'α = τ/I. Hollow cylinder: I = MR². Solid sphere: I = (2/5)MR², smaller, because its mass is nearer the axis.', ans: 'α(sphere) = 2.5 α(cylinder).' },
    { title: 'The answer', dur: 4, text: 'Starting from rest, ω = αt.', ans: 'The solid sphere spins faster: 2.5 times the cylinder’s angular speed at any time.' },
  ];
  function wheel(ctx, x, y, R, th, hollow) {
    ctx.save(); ctx.fillStyle = hollow ? P.sheet : P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = hollow ? 10 : 2; ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 3; seg(ctx, x, y, x + R * Math.cos(th), y + R * Math.sin(th)); ctx.restore(); ball(ctx, x, y, 4, P.ink);
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const tm = Math.min(t, D);
    wheel(ctx, 160, 170, 80, 0.5 * AC * tm * tm * 6, true); wheel(ctx, 430, 170, 80, 0.5 * AS * tm * tm * 6, false);
    label(ctx, 'hollow cylinder (end view)', 160, 280, { align: 'center', weight: 700, size: 14 }); label(ctx, 'solid sphere', 430, 280, { align: 'center', weight: 700, size: 14 });
    rotArrow(ctx, 160, 170, 100, true, P.vel); rotArrow(ctx, 430, 170, 100, true, P.vel); label(ctx, 'τ', 160, 56, { align: 'center', italic: true, weight: 700, size: 16, color: P.vel }); label(ctx, 'τ', 430, 56, { align: 'center', italic: true, weight: 700, size: 16, color: P.vel });
    if (ans) {
      label(ctx, 'I = MR²', 160, 304, { align: 'center', size: 14 }); label(ctx, 'I = (2/5)MR²', 430, 304, { align: 'center', size: 14 });
      const g = axes(ctx, { x: 90, y: 340, w: 440, h: 150, x0: 0, x1: D, y0: 0, y1: AS * D * 1.1, xl: 't', yl: 'ω' });
      plot(ctx, g, s => AC * s, 0, tm, P.ink2); plot(ctx, g, s => AS * s, 0, tm, P.force);
      label(ctx, 'sphere', g.X(tm) + 6, g.Y(AS * tm), { size: 12, weight: 700, color: P.force }); label(ctx, 'cylinder', g.X(tm) + 6, g.Y(AC * tm), { size: 12, weight: 700, color: P.ink2 });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['α = τ/I; I(sphere) = (2/5) I(cylinder)', 'The sphere: 2.5 times the angular speed'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['Which acquires the greater angular speed after a given time: the hollow cylinder or the solid sphere?']);
    note(ctx, 'torque and time illustrative; spins slowed');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const M = 20, R = 0.25, W = 100, I = 0.5 * M * R * R, KE = 0.5 * I * W * W, L = I * W, CX = 280, CY = 250, RP = 140;
  const qStages = [
    { title: 'Spinning cylinder', dur: 6, text: 'A solid cylinder of mass 20 kg and radius 0.25 m rotates about its axis at 100 rad/s.' },
    { title: 'What is asked', dur: 4, text: 'Find its rotational kinetic energy and its angular momentum about the axis.' },
  ];
  const stages = [
    { title: 'Moment of inertia', dur: 4, text: 'Solid cylinder about its axis: I = ½MR².', ans: 'I = ½ × 20 × 0.25² = 0.625 kg m².' },
    { title: 'Kinetic energy', dur: 4, text: 'K = ½Iω².', ans: 'K = ½ × 0.625 × 100² = 3125 J.' },
    { title: 'Angular momentum', dur: 4, text: 'L = Iω, along the axis.', ans: 'L = 0.625 × 100 = 62.5 J s.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, RP, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 6; i++) { const a = t * 1.5 + i * Math.PI / 3; ctx.save(); ctx.strokeStyle = i ? P.ink2 : P.force; ctx.lineWidth = i ? 1.5 : 3; seg(ctx, CX, CY, CX + RP * Math.cos(a), CY + RP * Math.sin(a)); ctx.restore(); }
    ball(ctx, CX, CY, 5, P.ink); rotArrow(ctx, CX, CY, RP + 24, true, P.vel); label(ctx, 'ω = 100 rad/s', CX + RP + 10, CY - RP, { weight: 700, size: 14, color: P.vel });
    dim(ctx, CX, CX + RP, CY + RP + 30, P.ink2); label(ctx, 'R = 0.25 m', CX + RP / 2, CY + RP + 46, { align: 'center', weight: 700, size: 13 });
    label(ctx, '20 kg', CX, CY - 20, { align: 'center', weight: 700, size: 15, halo: true });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Working', ['I = ½MR² = 0.625 kg m²', 'K = ½Iω² = 3125 J', 'L = Iω = 62.5 J s'], stageAt(stages, t), false);
    else askedPanel(ctx, 630, 34, 300, ['The kinetic energy of rotation.', 'The magnitude of the angular momentum about the axis.']);
    note(ctx, 'end view; spin drawn far slower than 100 rad/s');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const W1 = 40, W2 = 100, CX = 280, CY = 260, SL = 0.5, T1 = 5, T2 = 6.5, D = 12;   // rev/min; spins drawn at half speed
  const qStages = [
    { title: 'Arms outstretched', dur: T1, text: 'A child stands at the centre of a frictionless turntable, arms outstretched, rotating at 40 rev/min.' },
    { title: 'Arms folded', dur: D - T1, text: 'He folds his arms, reducing his moment of inertia to 2/5 of its initial value.' },
    { title: 'What is asked', dur: 4, text: '(a) His new angular speed. (b) Show his rotational kinetic energy increases, and account for it.' },
  ];
  const stages = [
    { title: 'Before', dur: T1, text: 'No friction means no external torque: angular momentum Iω stays the same.', ans: 'L = I₁ × 40 rev/min.' },
    { title: 'After folding', dur: D - T1, text: 'I falls to (2/5) I₁, so ω rises by 5/2.', ans: '(a) ω₂ = 40 × 5/2 = 100 rev/min.' },
    { title: 'Kinetic energy', dur: 5, text: 'K = ½Iω² = ½Lω: with L fixed, K grows with ω.', ans: '(b) K₂/K₁ = (2/5)(5/2)² = 2.5. The extra energy comes from the child’s muscles doing work to pull his arms in.' },
  ];
  let ang = 0, lastT = null;
  function angleAt(t) { const w = W1 / 60 * 2 * Math.PI * SL; if (t < T1) return w * t; const f = clamp((t - T1) / (T2 - T1)), arm = 1 - 0.6 * f; const w2 = w * (1 / (arm * arm * 0.6 + 0.4)) * 1; let a = w * T1; const n = 60, s = Math.min(t, D) - T1; for (let i = 0; i < n; i++) { const tt = s * (i + 0.5) / n, ff = clamp(tt / (T2 - T1)), ar = 1 - 0.6 * ff, ww = W1 / 60 * 2 * Math.PI * SL * (1 / (0.6 * ar * ar + 0.4)) / (1 / (0.6 + 0.4)); a += ww * s / n; } return a; }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    label(ctx, 'seen from above', CX, 40, { align: 'center', size: 13, color: P.ink2 });
    ctx.save(); ctx.fillStyle = P.objFill; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, 180, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    const a = angleAt(Math.min(t, D)), f = clamp((t - T1) / (T2 - T1)), arm = 150 * (1 - 0.6 * f);
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([3, 6]); seg(ctx, CX + 170 * Math.cos(a + 1.2), CY + 170 * Math.sin(a + 1.2), CX + 120 * Math.cos(a + 1.2), CY + 120 * Math.sin(a + 1.2)); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 8; ctx.lineCap = 'round'; seg(ctx, CX - arm * Math.cos(a), CY - arm * Math.sin(a), CX + arm * Math.cos(a), CY + arm * Math.sin(a)); ctx.restore();
    ctx.fillStyle = P.ink; ctx.beginPath(); ctx.ellipse(CX, CY, 34, 22, a, 0, Math.PI * 2); ctx.fill(); ball(ctx, CX, CY, 14, P.objFill2);
    rotArrow(ctx, CX, CY, 200, true, P.vel);
    const wNow = t < T1 ? W1 : W1 / (0.6 * (1 - 0.6 * f) ** 2 + 0.4);
    if (ans) {
      label(ctx, `ω ≈ ${wNow.toFixed(0)} rev/min`, 40, 70, { weight: 800, size: 16, color: P.vel });
      label(ctx, `I = ${(0.6 * (1 - 0.6 * f) ** 2 + 0.4).toFixed(2)} I₁`, 40, 96, { weight: 700, size: 14 });
      if (t >= stages[2].t0) { label(ctx, 'K₂ = 2.5 K₁', 40, 470, { weight: 800, size: 16, color: P.accent }); label(ctx, 'from the child’s muscular work', 40, 494, { size: 13 }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['No external torque: I₁ω₁ = I₂ω₂', '(a) ω₂ = 40 × 5/2 = 100 rev/min', '(b) K₂/K₁ = 2.5: work done by the child'], stageAt(stages, t), false);
    } else { label(ctx, t < T1 ? '40 rev/min' : 'arms folded: I → (2/5) I', 40, 70, { weight: 700, size: 15 }); askedPanel(ctx, 630, 34, 300, ['(a) The child’s new angular speed.', '(b) Show that the new kinetic energy of rotation is more than the initial one, and account for the increase.']); }
    note(ctx, 'arm-folding modelled smoothly (I from I₁ to 0.4 I₁); spins drawn at half speed');
  }
  return { qStages, stages, draw };
})();

//@@ q13
const SCENE = (() => {
  const M = 3, R = 0.4, F = 30, I = M * R * R, AL = F * R / I, A = AL * R, KP = 250, CX = 200, CY = 250, SLOW = 10, D = 10;   // α = 25 rad/s², a = 10 m/s²
  const qStages = [
    { title: 'Pulling the rope', dur: D, text: 'A light rope is wound round a hollow cylinder of mass 3 kg and radius 40 cm and pulled with a force of 30 N. No slipping.' },
    { title: 'What is asked', dur: 4, text: 'Find the angular acceleration of the cylinder and the linear acceleration of the rope.' },
  ];
  const stages = [
    { title: 'Torque', dur: D, text: 'The pull acts tangentially at radius R: τ = FR. For a hollow cylinder I = MR².', ans: 'τ = 30 × 0.40 = 12 N m; I = 3 × 0.40² = 0.48 kg m².' },
    { title: 'Accelerations', dur: 5, text: 'α = τ/I; the rope unwinds without slipping, so a = Rα.', ans: 'α = 12 / 0.48 = 25 rad/s²; a = 0.40 × 25 = 10 m/s².' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const tr = Math.min(t, D) / SLOW, th = 0.5 * AL * tr * tr, s = 0.5 * A * tr * tr, RP = R * KP;
    ctx.save(); ctx.fillStyle = P.sheet; ctx.strokeStyle = P.obj; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(CX, CY, RP, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 3; seg(ctx, CX, CY, CX + RP * Math.cos(th), CY + RP * Math.sin(th)); ctx.restore(); ball(ctx, CX, CY, 5, P.ink);
    hline(ctx, CX, 580, CY - RP, P.ink, 2.5);
    for (let k = 0; k < 6; k++) { const x = CX + ((s * KP + k * 80) % 380); ctx.fillStyle = P.ink; ctx.fillRect(x, CY - RP - 4, 3, 8); }
    vec(ctx, 500, CY - RP, 60, 0, 'F = 30 N', P.force, { side: -1, at: 0.5, size: 13 });
    dim(ctx, CX - RP - 30, CX - RP - 30, CY, P.ink2); vdim(ctx, CX - RP - 24, CY - RP, CY, P.ink2); label(ctx, '40 cm', CX - RP - 30, CY - RP / 2, { align: 'right', weight: 700, size: 13 });
    label(ctx, 'hollow, 3 kg', CX, CY + RP + 24, { align: 'center', weight: 700, size: 14 });
    if (ans) {
      rotArrow(ctx, CX, CY, RP + 26, true, P.acc); label(ctx, 'α = 25 rad/s²', CX - 40, CY - RP - 46, { weight: 700, size: 14, color: P.acc });
      vec(ctx, 400, CY - RP + 30, 50, 0, 'a = 10 m/s²', P.acc, { side: 1, at: 0.5, size: 13 });
      label(ctx, `t = ${tr.toFixed(2)} s   ω = ${(AL * tr).toFixed(1)} rad/s`, 300, 470, { align: 'center', weight: 700, size: 14 });
      partsPanel(ctx, 630, 34, 300, 'Working', ['τ = FR = 12 N m; I = MR² = 0.48 kg m²', 'α = τ/I = 25 rad/s²; a = Rα = 10 m/s²'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The angular acceleration of the cylinder.', 'The linear acceleration of the rope.']);
    note(ctx, 'end view; shown 10 times slower than real; 250 px per metre');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const R = 160, CX = 300, CY = 260, HX = CX + R / 2;
  const qStages = [
    { title: 'Cutting the hole', dur: 5, text: 'From a uniform disc of radius R, a circular hole of radius R/2 is cut out; its centre is R/2 from the centre of the disc.' },
    { title: 'What is asked', dur: 4, text: 'Locate the centre of gravity of the remaining flat body.' },
  ];
  const stages = [
    { title: 'Masses by area', dur: 5, text: 'Mass ∝ area. The hole has (R/2)²/R² = 1/4 of the disc’s area.', ans: 'Full disc M at O; hole M/4 at x = R/2; remainder 3M/4.' },
    { title: 'Balance the moments', dur: 5, text: 'The full disc = remainder + hole: M × 0 = (3M/4) x + (M/4)(R/2).', ans: 'x = −R/6: R/6 from O, on the side away from the hole.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const f = ans ? 1 : clamp((t - 1) / 2);
    ctx.save(); ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = P.sheet; ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(HX, CY, R / 2 * f, 0, Math.PI * 2); ctx.fill(); if (f > 0) ctx.stroke(); ctx.restore();
    ball(ctx, CX, CY, 4, P.ink); label(ctx, 'O', CX - 8, CY - 14, { align: 'right', weight: 700, size: 14 });
    dim(ctx, CX - R, CX, CY + R + 26, P.ink2); label(ctx, 'R', CX - R / 2, CY + R + 42, { align: 'center', italic: true, weight: 700, size: 14 });
    dim(ctx, CX, HX, CY + R / 2 + 26, P.ink2); label(ctx, 'R/2', (CX + HX) / 2, CY + R / 2 + 42, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      label(ctx, 'hole: M/4', HX, CY, { align: 'center', weight: 700, size: 13, color: P.force });
      if (t >= stages[1].t0) {
        const gx = CX - R / 6; ball(ctx, gx, CY, 7, P.accent); label(ctx, 'G', gx - 10, CY + 18, { align: 'right', weight: 800, size: 15, color: P.accent });
        dim(ctx, gx, CX, CY - R - 20, P.accent); label(ctx, 'R/6', (gx + CX) / 2, CY - R - 36, { align: 'center', weight: 800, size: 15, color: P.accent });
        ctx.fillStyle = P.ink; ctx.beginPath(); ctx.moveTo(gx, CY + R + 60); ctx.lineTo(gx - 10, CY + R + 80); ctx.lineTo(gx + 10, CY + R + 80); ctx.fill();
      }
      partsPanel(ctx, 630, 34, 300, 'Working', ['Hole mass M/4 at R/2; remainder 3M/4', '0 = (3M/4)x + (M/4)(R/2) → x = −R/6'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The centre of gravity of the disc with the hole cut out.']);
    note(ctx, 'R drawn as 160 px');
  }
  return { qStages, stages, draw };
})();

//@@ q16
const SCENE = (() => {
  const K = 5, X0 = 50, Y = 300, MS = 66, MC = 10;                         // 5 px per cm
  const qStages = [
    { title: 'Balanced at the centre', dur: 3, text: 'A metre stick balances on a knife edge at its centre, the 50 cm mark.' },
    { title: 'Coins added', dur: 3, text: 'Two 5 g coins, one on top of the other, are put at the 12.0 cm mark.' },
    { title: 'New balance point', dur: 4, text: 'The stick now balances with the knife edge at 45.0 cm. What is the mass of the stick?' },
  ];
  const stages = [
    { title: 'Weight at 50 cm', dur: 3, text: 'A uniform stick balances at its centre: its weight acts at the 50 cm mark.', ans: 'The stick’s weight mg acts at 50.0 cm.' },
    { title: 'Coins tip it', dur: 3, text: 'The coins (10 g) at 12 cm give a torque that tips the stick.', ans: '' },
    { title: 'Torques about 45 cm', dur: 4, text: 'At balance the two torques about the knife edge are equal.', ans: '10 g × (45 − 12) cm = m × (50 − 45) cm → 330 = 5m → m = 66 g.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const kx = t < 6 ? 50 : 50 - 5 * smooth(clamp((t - 6) / 2.5)), coins = t >= 3;
    const torque = (coins ? MC * (kx - 12) : 0) - MS * (50 - kx), tilt = clamp(torque / 300, -0.12, 0.12) * (t < 6 ? clamp((t - 3) / 1) : 1);
    const px = cm => X0 + cm * K, kpx = px(kx);
    ctx.save(); ctx.translate(kpx, Y); ctx.rotate(-tilt);
    ctx.fillStyle = P.wood; ctx.fillRect(px(0) - kpx, -8, 100 * K, 10); ctx.strokeStyle = P.obj; ctx.strokeRect(px(0) - kpx, -8, 100 * K, 10);
    for (let c = 0; c <= 100; c += 10) { vline(ctx, px(c) - kpx, -8, -2, P.ink, 1); label(ctx, String(c), px(c) - kpx, -18, { align: 'center', size: 10, color: P.ink2 }); }
    if (coins) { ctx.fillStyle = P.ke; ctx.fillRect(px(12) - kpx - 10, -16, 20, 4); ctx.fillRect(px(12) - kpx - 10, -21, 20, 4); }
    ctx.restore();
    ctx.fillStyle = P.ink; ctx.beginPath(); ctx.moveTo(kpx, Y + 2); ctx.lineTo(kpx - 14, Y + 30); ctx.lineTo(kpx + 14, Y + 30); ctx.closePath(); ctx.fill();
    label(ctx, `knife edge at ${kx.toFixed(1)} cm`, kpx, Y + 48, { align: 'center', weight: 700, size: 13 });
    if (coins) label(ctx, '2 × 5 g at 12.0 cm', px(12), Y - 60, { align: 'center', weight: 700, size: 13, color: P.ke });
    if (ans) {
      vec(ctx, px(50), Y + 4, 0, 50, 'mg (at 50 cm)', P.force, { side: -1, at: 1, align: 'left', ax: 4, ay: 6, size: 12 });
      if (coins) vec(ctx, px(12), Y + 4, 0, 30, '10 g', P.ke, { side: 1, at: 1, align: 'right', ax: -4, ay: 6, size: 12 });
      if (t >= stages[2].t0 + 2.5) { dim(ctx, px(12), px(45), Y + 110, P.ink2); label(ctx, '33 cm', px(28.5), Y + 126, { align: 'center', weight: 700, size: 13 }); dim(ctx, px(45), px(50), Y + 110, P.ink2); label(ctx, '5 cm', px(47.5), Y + 140, { align: 'center', weight: 700, size: 13 }); label(ctx, 'm = 10 × 33 / 5 = 66 g', 300, 140, { align: 'center', weight: 800, size: 18, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['Stick’s weight acts at 50.0 cm', '10 g at 12.0 cm tips it', '10 × 33 = m × 5 → m = 66 g'], stageAt(stages, t), false);
    } else askedPanel(ctx, 630, 34, 300, ['The mass of the metre stick.']);
    note(ctx, '5 px per cm; tilt exaggerated');
  }
  return { qStages, stages, draw };
})();
