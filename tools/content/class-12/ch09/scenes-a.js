//@@ q01
const SCENE = (() => {
  const MX = 560, A = 260, S = 8, VS = 24, F = 18, D = 8;   // 8 px per cm across, 24 px per cm up (× 3)
  const img = u => { const v = 1 / (1 / F - 1 / u); return { v, m: -v / u }; };   // real-is-positive: f, u, v > 0 in front
  const qStages = [
    { title: 'A candle and a concave mirror', dur: 5, text: 'A candle 2.5 cm tall stands 27 cm in front of a concave mirror of radius of curvature 36 cm (f = 18 cm).' },
    { title: 'What is asked', dur: 5, text: 'Where must a screen go for a sharp image? Its nature and size? How must the screen move if the candle comes closer?' },
  ];
  const stages = [
    { title: 'Rays from the tip', dur: D, text: 'A ray parallel to the axis reflects through F; a ray through F reflects parallel; a ray to the pole reflects symmetrically.', ans: '1/v = 1/18 − 1/27 = 1/54: the image is 54 cm in front of the mirror.' },
    { title: 'Nature and size', dur: 5, text: 'm = −v/u.', ans: 'm = −54/27 = −2: real, inverted, 5.0 cm tall.' },
    { title: 'Candle moved closer', dur: D, text: 'Bring the candle from 27 cm to 25 cm.', ans: 'The image runs out to 64 cm: the screen must move away. Inside 18 cm no real image forms.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, MX, A, P.ink2, 1);
    mirror(ctx, MX, A, 170, 900, true);
    [['F', F], ['C', 2 * F]].forEach(([n, d]) => { vline(ctx, MX - S * d, A - 5, A + 5, P.ink, 2); label(ctx, n, MX - S * d, A + 18, { align: 'center', weight: 800, size: 13 }); });
    const st = ans ? stageAt(stages, t) : -1;
    const u = st === 2 ? 27 - 2 * smooth(clamp((t - stages[2].t0) / (D - 2))) : 27, { v, m } = img(u);
    const ox = MX - S * u, oy = A - 2.5 * VS, ix = MX - S * v, iy = A - m * 2.5 * VS;
    objArrow(ctx, ox, A, 2.5 * VS, P.force); label(ctx, 'candle 2.5 cm', ox, oy - 14, { align: 'center', weight: 700, size: 12 });
    label(ctx, `${u.toFixed(1)} cm`, (ox + MX) / 2, A - 92, { align: 'center', weight: 700, size: 12 }); hline(ctx, ox, MX, A - 80, P.ink2, 1, [3, 3]);
    if (ans) {
      const k = clamp(t / 4);
      ray(ctx, [[ox, oy], [MX, oy], [MX + (ix - MX) * k, oy + (iy - oy) * k]], P.accent);
      const yF = oy + (A - oy) / ((MX - S * F) - ox) * (MX - ox);   // the ray through F meets the mirror here
      ray(ctx, [[ox, oy], [MX, yF], [MX + (ix - MX) * k, yF]], P.vel);
      ray(ctx, [[ox, oy], [MX, A], [MX + (ix - MX) * k, A + (A - oy) * (MX - ix) / (MX - ox) * k]], P.leaf);
      if (k >= 1) { objArrow(ctx, ix, A, m * 2.5 * VS, P.force); ctx.save(); ctx.fillStyle = P.objFill2; ctx.globalAlpha = 0.7; ctx.fillRect(ix - 4, A - 40, 8, 200); ctx.restore(); label(ctx, 'screen', ix, A + 176, { align: 'center', weight: 700, size: 12 }); label(ctx, `v = ${v.toFixed(0)} cm`, ix + 10, A + 196, { align: 'center', weight: 800, size: 13, color: P.accent }); }
      if (st >= 1) label(ctx, `image ${Math.abs(m * 2.5).toFixed(1)} cm, real, inverted`, 300, 500, { align: 'center', weight: 800, size: 14, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['Screen 54 cm in front', 'Real, inverted, 5.0 cm', 'Candle closer → screen farther'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Where to place the screen for a sharp image.', 'The nature and size of the image.', 'How the screen must move if the candle comes closer.']);
    note(ctx, '8 px per cm across; heights × 3; mirror curvature drawn flatter');
  }
  return { qStages, stages, draw };
})();

//@@ q02
const SCENE = (() => {
  const MX = 380, A = 300, S = 10, VS = 20, F = 15, D = 9;   // heights × 2
  const qStages = [
    { title: 'A needle and a convex mirror', dur: 5, text: 'A 4.5 cm needle stands 12 cm in front of a convex mirror of focal length 15 cm.' },
    { title: 'What is asked', dur: 4, text: 'Where is the image, and what is the magnification? What happens as the needle moves away?' },
  ];
  const stages = [
    { title: 'Rays from the tip', dur: 6, text: 'A ray parallel to the axis reflects as if from F behind the mirror; a ray to the pole reflects symmetrically.', ans: '1/v = 1/15 + 1/12, v = 6.7 cm behind the mirror.' },
    { title: 'Magnification', dur: 4, text: 'm = v/u (both magnitudes here).', ans: 'm = 6.7/12 = 0.56: virtual, erect, 2.5 cm.' },
    { title: 'Needle moved away', dur: D, text: 'Move the needle out from 12 cm to 28 cm.', ans: 'The image shrinks and creeps towards F, never passing it.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 590, A, P.ink2, 1);
    mirror(ctx, MX, A, 150, 700, false);
    vline(ctx, MX + S * F, A - 5, A + 5, P.ink, 2); label(ctx, 'F', MX + S * F, A + 18, { align: 'center', weight: 800, size: 13 });
    const st = ans ? stageAt(stages, t) : -1, u = st === 2 ? 12 + 16 * smooth(clamp((t - stages[2].t0) / (D - 2))) : 12;
    const v = 1 / (1 / F + 1 / u), m = v / u, ox = MX - S * u, oy = A - 4.5 * VS, ix = MX + S * v, iy = A - m * 4.5 * VS;
    objArrow(ctx, ox, A, 4.5 * VS, P.force); label(ctx, 'needle 4.5 cm', ox, oy - 14, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const k = clamp(t / 3);
      const dx = MX - (MX + S * F), dy = oy - A, L = Math.hypot(dx, dy);
      ray(ctx, [[ox, oy], [MX, oy], [MX + dx / L * 260 * k, oy + dy / L * 260 * k]], P.accent); ray(ctx, [[MX, oy], [MX + S * F, A]], P.accent, { dash: [5, 4], heads: false });
      const ex = -(MX - ox), ey = A - oy, L2 = Math.hypot(ex, ey);
      ray(ctx, [[ox, oy], [MX, A], [MX + ex / L2 * 220 * k, A + ey / L2 * 220 * k]], P.leaf); ray(ctx, [[MX, A], [ix, iy]], P.leaf, { dash: [5, 4], heads: false });
      if (k >= 1) { objArrow(ctx, ix, A, m * 4.5 * VS, P.force, true); label(ctx, `${v.toFixed(1)} cm, ${(m * 4.5).toFixed(1)} cm tall`, ix + 6, A + 40, { weight: 800, size: 12, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['v = 6.7 cm behind the mirror', 'm = 0.56 (virtual, erect, 2.5 cm)', 'Moving away: image shrinks, nears F'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The location of the image and the magnification.', 'What happens as the needle is moved farther away.']);
    note(ctx, '10 px per cm across; heights × 2; mirror curvature drawn flatter');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const CX = 260, YS = 130, S = 16, H = 12.5, XO = 40;   // 16 px per cm
  const qStages = [
    { title: 'A needle under water', dur: 5, text: 'Water 12.5 cm deep. A microscope focused on a needle at the bottom sees it at an apparent depth of 9.4 cm.' },
    { title: 'What is asked', dur: 5, text: 'The refractive index of water. If a liquid of n = 1.63 replaces it (same height), how far must the microscope move?' },
  ];
  const stages = [
    { title: 'Refractive index', dur: 6, text: 'Rays leaving the water bend away from the normal and seem to come from a higher point.', ans: 'n = 12.5/9.4 ≈ 1.33.' },
    { title: 'Denser liquid', dur: 7, text: 'With n = 1.63 the needle seems 12.5/1.63 ≈ 7.67 cm deep.', ans: 'It seems 1.7 cm higher: move the microscope up ≈ 1.7 cm.' },
  ];
  function rays(ctx, n, col) {
    const yb = YS + S * H, app = H / n;
    [-1, 1].forEach(sg => { const xs = CX + sg * XO, tw = Math.atan(XO / (S * H)), ta = Math.asin(Math.min(1, n * Math.sin(tw)));
      ray(ctx, [[CX, yb], [xs, YS], [xs + sg * 110 * Math.sin(ta), YS - 110 * Math.cos(ta)]], col, { lw: 1.8 });
      ray(ctx, [[xs, YS], [CX, YS + XO / Math.tan(ta)]], col, { dash: [4, 4], heads: false, lw: 1.2 }); });
    ball(ctx, CX, YS + S * app, 5, col);
  }
  function scope(ctx, y) { ctx.save(); ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; ctx.fillRect(CX - 16, y - 90, 32, 70); ctx.strokeRect(CX - 16, y - 90, 32, 70); ctx.fillRect(CX - 10, y - 20, 20, 20); ctx.strokeRect(CX - 10, y - 20, 20, 20); ctx.restore(); label(ctx, 'microscope', CX + 24, y - 60, { weight: 700, size: 12 }); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1, liq = st >= 1, n = liq ? 1.63 : 12.5 / 9.4;
    ctx.save(); ctx.fillStyle = liq ? P.accentSoft : P.water; ctx.globalAlpha = 0.6; ctx.fillRect(80, YS, 360, S * H); ctx.restore();
    wire(ctx, [[80, YS - 40], [80, YS + S * H], [440, YS + S * H], [440, YS - 40]], P.ink, 3);
    hline(ctx, CX - 30, CX + 30, YS + S * H - 3, P.ink, 3); label(ctx, 'needle', CX + 36, YS + S * H - 12, { weight: 700, size: 12 });
    vdim(ctx, 470, YS, YS + S * H, P.ink2); label(ctx, '12.5 cm', 480, YS + S * H / 2, { weight: 700, size: 12 });
    label(ctx, liq ? 'liquid, n = 1.63' : 'water', 100, YS + 20, { weight: 700, size: 13 });
    const app = H / n, yImg = YS + S * app, yScope = ans ? (st === 0 ? yImg : YS + S * 9.4 - S * (9.4 - app) * smooth(clamp((t - stages[1].t0 - 1) / 3))) : YS + S * 9.4;
    scope(ctx, yScope - 60);
    if (ans) {
      rays(ctx, n, P.accent);
      label(ctx, `apparent depth ${app.toFixed(2)} cm`, CX + 46, yImg, { weight: 800, size: 13, color: P.accent });
      if (st >= 1) { hline(ctx, 450, 560, YS + S * 9.4 - 60, P.ink2, 1, [3, 3]); hline(ctx, 450, 560, yScope - 60, P.ink2, 1, [3, 3]); label(ctx, '≈ 1.7 cm up', 560, (YS + S * 9.4 - 60 + yScope - 60) / 2, { align: 'right', weight: 800, size: 13, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['n = 12.5/9.4 ≈ 1.33', 'New apparent depth 7.67 cm: move up ≈ 1.7 cm'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The refractive index of water.', 'How far the microscope must move with a liquid of n = 1.63.']);
    note(ctx, '16 px per cm; rays drawn wide of the vertical for clarity');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const CX = 300, YS = 110, S = 2.5, H = 80, n = 1.33, C = Math.asin(1 / n);   // 2.5 px per cm
  const qStages = [
    { title: 'A bulb under water', dur: 5, text: 'A small bulb lies at the bottom of a tank of water 80 cm deep. n = 1.33.' },
    { title: 'What is asked', dur: 4, text: 'The area of the water surface through which light from the bulb can emerge.' },
  ];
  const stages = [
    { title: 'Critical angle', dur: 8, text: 'Rays reaching the surface at more than the critical angle are totally reflected.', ans: 'sin C = 1/1.33, C ≈ 48.8°.' },
    { title: 'Circle of light', dur: 5, text: 'Light escapes only through a circle of radius r = h tan C.', ans: 'r = 0.80 × 1.14 ≈ 0.91 m; area = πr² ≈ 2.6 m².' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const yb = YS + S * H;
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.6; ctx.fillRect(20, YS, 570, S * H); ctx.restore();
    wire(ctx, [[20, YS - 30], [20, yb], [590, yb], [590, YS - 30]], P.ink, 3);
    ball(ctx, CX, yb - 6, 8, P.ke); label(ctx, 'bulb', CX + 14, yb + 18, { weight: 700, size: 12 });
    vdim(ctx, 50, YS, yb, P.ink2); label(ctx, '80 cm', 58, (YS + yb) / 2, { weight: 700, size: 12 });
    if (ans) {
      const st = stageAt(stages, t), k = clamp(t / 5);
      [-54, -C * 180 / Math.PI, -32, -12, 12, 32, C * 180 / Math.PI, 54].forEach(dg => {
        const th = dg * Math.PI / 180, xs = CX + (yb - 6 - YS) * Math.tan(th), crit = Math.abs(Math.abs(dg) - C * 180 / Math.PI) < 0.01;
        if (Math.abs(th) < C - 1e-6) { const ph = Math.asin(n * Math.sin(th)); ray(ctx, [[CX, yb - 6], [xs, YS], [xs + 80 * Math.sin(ph) * k, YS - 80 * Math.cos(ph) * k]], P.ke, { lw: 1.6 }); }
        else if (crit) ray(ctx, [[CX, yb - 6], [xs, YS], [xs + Math.sign(th) * 70 * k, YS]], P.force, { lw: 2 });
        else { const xw = th > 0 ? 585 : 25, f = Math.min(k, (xw - xs) / (xs - CX)); ray(ctx, [[CX, yb - 6], [xs, YS], [xs + (xs - CX) * f, YS + (yb - 6 - YS) * f]], P.ink2, { lw: 1.4, alpha: 0.8 }); }
      });
      const r = (yb - 6 - YS) * Math.tan(C);
      ctx.save(); ctx.strokeStyle = P.ke; ctx.lineWidth = 6; ctx.globalAlpha = 0.7; seg(ctx, CX - r, YS, CX + r, YS); ctx.restore();
      ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]); seg(ctx, CX, yb - 6, CX, YS); ctx.restore();
      label(ctx, 'C = 48.8°', CX + 40, yb - 70, { weight: 800, size: 13, color: P.force });
      if (st >= 1) { dim(ctx, CX, CX + r, YS - 40, P.ink2); label(ctx, 'r ≈ 0.91 m', CX + r / 2, YS - 56, { align: 'center', weight: 800, size: 14, color: P.accent }); label(ctx, 'area = πr² ≈ 2.6 m²', CX, 440, { align: 'center', weight: 800, size: 17, color: P.accent }); }
      label(ctx, 'totally reflected', 470, yb - 30, { align: 'center', weight: 700, size: 12, color: P.ink2 });
      partsPanel(ctx, 630, 34, 300, 'Working', ['C ≈ 48.8°', 'r = h tan C ≈ 0.91 m; area ≈ 2.6 m²'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The area of the water surface through which light from the bulb can emerge.']);
    note(ctx, ans ? '2.5 px per cm; ray angles computed (red: at the critical angle)' : '2.5 px per cm');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const AP = [300, 110], BL = [180, 318], BR = [420, 318], YR = 240, D = 7;
  const deg = Math.PI / 180;
  const qStages = [
    { title: 'A glass prism', dur: 5, text: 'A prism of refracting angle 60°. A parallel beam at minimum deviation is deviated by 40°.' },
    { title: 'What is asked', dur: 4, text: 'The refractive index of the glass. The new minimum deviation if the prism is placed in water (n = 1.33).' },
  ];
  const stages = [
    { title: 'In air', dur: D, text: 'At minimum deviation the ray passes symmetrically, parallel to the base: i = (A + D)/2 = 50°.', ans: 'n = sin 50°/sin 30° ≈ 1.53.' },
    { title: 'In water', dur: D, text: 'Relative index 1.53/1.33 ≈ 1.15: sin[(60° + D)/2] = 1.15 × 0.5.', ans: 'D ≈ 10°.' },
  ];
  function path(ctx, dev) {
    const s = (YR - AP[1]) / (BL[1] - AP[1]), p1 = [AP[0] + (BL[0] - AP[0]) * s, YR], p2 = [AP[0] + (BR[0] - AP[0]) * s, YR];
    const ai = (30 - (60 + dev) / 2) * deg, ae = -ai;   // incident direction is the inward normal (at 30°) turned by −i
    ray(ctx, [[p1[0] - 200 * Math.cos(ai), p1[1] - 200 * Math.sin(ai)], p1, p2, [p2[0] + 190 * Math.cos(ae), p2[1] + 190 * Math.sin(ae)]], P.force);
    ray(ctx, [p1, [p1[0] + 300 * Math.cos(ai), p1[1] + 300 * Math.sin(ai)]], P.force, { dash: [4, 4], heads: false, lw: 1.2, alpha: 0.7 });
    label(ctx, `deviation ${dev.toFixed(0)}°`, 520, 330, { align: 'center', weight: 800, size: 15, color: P.force });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1;
    if (st === 1) { ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.45; ctx.fillRect(20, 40, 580, 460); ctx.restore(); label(ctx, 'water, n = 1.33', 40, 60, { weight: 700, size: 13 }); }
    ctx.save(); ctx.fillStyle = P.objFill; ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...AP); ctx.lineTo(...BL); ctx.lineTo(...BR); ctx.closePath(); ctx.globalAlpha = 0.8; ctx.fill(); ctx.globalAlpha = 1; ctx.stroke(); ctx.restore();
    label(ctx, '60°', AP[0], AP[1] + 34, { align: 'center', weight: 700, size: 13 });
    if (!ans) { path(ctx, 40); askedPanel(ctx, 630, 34, 300, ['The refractive index of the prism material.', 'The angle of minimum deviation when the prism is in water.']); }
    else { path(ctx, st === 0 ? 40 : 10.3); label(ctx, st === 0 ? 'n = 1.53' : 'D ≈ 10°', 300, 400, { align: 'center', weight: 800, size: 17, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Answers', ['n = sin 50°/sin 30° ≈ 1.53', 'In water: D ≈ 10°'], st, false); }
    note(ctx, 'ray paths computed for minimum deviation; dashed: undeviated direction');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const LX = 150, A = 270, S = 8, D = 7, HS = [-80, -40, 40, 80];
  const PX = LX + 12 * S;
  const qStages = [
    { title: 'A converging beam', dur: 5, text: 'A beam of light converges towards a point P. A lens is to be placed in its path 12 cm before P.' },
    { title: 'What is asked', dur: 5, text: 'Where does the beam now converge if the lens is (a) convex, f = 20 cm, (b) concave, f = 16 cm?' },
  ];
  const stages = [
    { title: '(a) Convex lens, f = 20 cm', dur: D, text: 'P acts as a virtual object at u = +12 cm: 1/v = 1/20 + 1/12.', ans: 'v = 7.5 cm: the beam converges sooner, 7.5 cm from the lens.' },
    { title: '(b) Concave lens, f = 16 cm', dur: D, text: '1/v = −1/16 + 1/12 = 1/48.', ans: 'v = 48 cm: the beam converges farther away, 48 cm from the lens.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 590, A, P.ink2, 1);
    const st = ans ? stageAt(stages, t) : -1;
    if (st >= 0) lens(ctx, LX, A, 110, st === 0); else vline(ctx, LX, A - 110, A + 110, P.ink2, 1, [4, 4]);
    ball(ctx, PX, A, 4, P.ink); label(ctx, 'P', PX, A + 18, { align: 'center', weight: 800, size: 14 });
    dim(ctx, LX, PX, A + 130, P.ink2); label(ctx, '12 cm', (LX + PX) / 2, A + 146, { align: 'center', weight: 700, size: 12 });
    const v = st === 0 ? 7.5 : 48, QX = LX + v * S, k = ans ? clamp((t - (st === 0 ? 0 : stages[1].t0)) / 3) : 1;
    HS.forEach(h => {
      const x0 = 30, y0 = A + h * (PX - x0) / (PX - LX);
      if (!ans) { ray(ctx, [[x0, y0], [PX, A], [PX + 60, A - h * 60 / (PX - LX)]], P.accent, { lw: 1.8 }); return; }
      ray(ctx, [[x0, y0], [LX, A + h]], P.accent, { lw: 1.8 });
      ray(ctx, [[LX, A + h], [PX, A]], P.ink2, { dash: [4, 4], heads: false, lw: 1.2 });
      const xe = Math.min(590, QX + 50), ye = A + h - h * (xe - LX) / (QX - LX);
      ray(ctx, [[LX, A + h], [LX + (xe - LX) * k, A + h + (ye - A - h) * k]], P.force, { lw: 2 });
    });
    if (ans) {
      if (k >= 1) { ball(ctx, QX, A, 5, P.force); label(ctx, `${v} cm`, QX, A - 22, { align: 'center', weight: 800, size: 14, color: P.force }); }
      label(ctx, st === 0 ? '(a) convex, f = 20 cm' : '(b) concave, f = 16 cm', LX, A - 130, { align: 'center', weight: 800, size: 14 });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) 7.5 cm from the lens', '(b) 48 cm from the lens'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Where the beam converges with (a) a convex lens of 20 cm, (b) a concave lens of 16 cm, placed 12 cm before P.']);
    note(ctx, '8 px per cm along the axis; dashed: the path to P without the lens');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const LX = 430, A = 290, S = 12, VS = 30, F = 21, D = 9;   // heights × 2.5
  const qStages = [
    { title: 'An object before a concave lens', dur: 5, text: 'An object 3.0 cm tall is 14 cm in front of a concave lens of focal length 21 cm.' },
    { title: 'What is asked', dur: 4, text: 'Describe the image. What happens as the object moves farther away?' },
  ];
  const stages = [
    { title: 'Rays from the tip', dur: 6, text: 'A ray parallel to the axis leaves as if from F on the object’s side; a ray through the centre goes straight on.', ans: '1/v = −1/21 − 1/14, v = −8.4 cm: on the object’s side.' },
    { title: 'Size', dur: 4, text: 'm = v/u.', ans: 'm = 8.4/14 = 0.6: virtual, erect, 1.8 cm.' },
    { title: 'Object moved away', dur: D, text: 'Move the object out from 14 cm to 30 cm.', ans: 'The image shrinks and moves towards F (21 cm), never beyond it.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 590, A, P.ink2, 1); lens(ctx, LX, A, 140, false);
    vline(ctx, LX - S * F, A - 5, A + 5, P.ink, 2); label(ctx, 'F', LX - S * F, A + 18, { align: 'center', weight: 800, size: 13 });
    const st = ans ? stageAt(stages, t) : -1, u = st === 2 ? 14 + 16 * smooth(clamp((t - stages[2].t0) / (D - 2))) : 14;
    const v = 1 / (1 / F + 1 / u), m = v / u, ox = LX - S * u, oy = A - 3 * VS, ix = LX - S * v, iy = A - m * 3 * VS;
    objArrow(ctx, ox, A, 3 * VS, P.force); label(ctx, 'object 3.0 cm', ox, oy - 14, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const k = clamp(t / 3), fx = LX - S * F;
      const dx = LX - fx, dy = oy - A, L = Math.hypot(dx, dy);
      ray(ctx, [[ox, oy], [LX, oy], [LX + dx / L * 170 * k, oy + dy / L * 170 * k]], P.accent); ray(ctx, [[fx, A], [LX, oy]], P.accent, { dash: [5, 4], heads: false, lw: 1.3 });
      const cx = LX - ox, cy = A - oy, L2 = Math.hypot(cx, cy);
      ray(ctx, [[ox, oy], [LX, A], [LX + cx / L2 * 170 * k, A + cy / L2 * 170 * k]], P.leaf);
      if (k >= 1) { objArrow(ctx, ix, A, m * 3 * VS, P.force, true); label(ctx, `${v.toFixed(1)} cm, ${(m * 3).toFixed(2)} cm`, ix, A + 40, { align: 'center', weight: 800, size: 12, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['v = −8.4 cm (object’s side)', 'm = 0.6: virtual, erect, 1.8 cm', 'Moving away: smaller, towards F'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['A description of the image.', 'What happens as the object is moved farther from the lens.']);
    note(ctx, '12 px per cm across; heights × 2.5');
  }
  return { qStages, stages, draw };
})();

//@@ q17
const SCENE = (() => {
  const X0 = 150, X1 = 590, YT = 200, YB = 340, CL = 30, A = 270, D = 12, N1 = 1.68, N2 = 1.44;
  const deg = Math.PI / 180;
  const qStages = [
    { title: 'A light pipe (Fig. 9.28)', dur: 5, text: 'A glass fibre (n = 1.68) with an outer covering (n = 1.44). Rays enter the end face at an angle i to the axis.' },
    { title: 'What is asked', dur: 4, text: 'The range of i for total internal reflection inside. (b) The range with no covering.' },
  ];
  const stages = [
    { title: 'Sweep the angle', dur: D, text: 'Critical angle at the wall: sin C = 1.44/1.68, C ≈ 59°. The ray meets the wall at 90° − r, where sin i = 1.68 sin r.', ans: 'Trapped while 90° − r ≥ 59°, i.e. r ≤ 31°, i.e. i ≤ 60°.' },
    { title: 'No covering', dur: 5, text: 'With air outside, C ≈ 36.5°; r can be at most 36.5° (for i = 90°), so the wall angle is at least 53.5°.', ans: '(b) Every ray (0 < i < 90°) is totally reflected.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : -1, clad = st !== 1;
    if (clad) { ctx.save(); ctx.fillStyle = P.objFill2; ctx.globalAlpha = 0.6; ctx.fillRect(X0, YT - CL, X1 - X0, CL); ctx.fillRect(X0, YB, X1 - X0, CL); ctx.restore(); label(ctx, 'covering n = 1.44', X1 - 10, YT - CL - 12, { align: 'right', weight: 700, size: 12 }); }
    ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.6; ctx.fillRect(X0, YT, X1 - X0, YB - YT); ctx.restore(); label(ctx, 'glass n = 1.68', X1 - 10, A - 52, { align: 'right', weight: 700, size: 12 });
    hline(ctx, X0 - 120, X1, A, P.ink2, 1, [4, 4]);
    const iDeg = ans ? (st === 0 ? 75 * clamp(t / (D - 2)) : 85) : 40, i = iDeg * deg, r = Math.asin(Math.sin(i) / N1), C = Math.asin((clad ? N2 : 1) / N1);
    ray(ctx, [[X0 - 140 * Math.cos(i), A - 140 * Math.sin(i)], [X0, A]], P.force, { lw: 2 });
    const pts = [[X0, A]]; let x = X0, y = A, dir = 1, ok = (Math.PI / 2 - r) >= C - 1e-9, leak = null;
    for (let k = 0; k < 40 && x < X1; k++) { const yw = dir > 0 ? YB : YT, dx = Math.abs(yw - y) / Math.tan(Math.max(r, 1e-3)); if (x + dx > X1) { pts.push([X1, y + dir * (X1 - x) * Math.tan(r)]); x = X1; break; } x += dx; y = yw; pts.push([x, y]); if (!ok) { leak = [x, y]; break; } dir = -dir; }
    ray(ctx, pts, P.force, { lw: 2 });
    if (leak) { const ph = Math.asin(Math.min(1, N1 * Math.cos(r) / (clad ? N2 : 1))); ray(ctx, [leak, [leak[0] + 60 * Math.sin(ph), leak[1] + 60 * Math.cos(ph)]], P.force, { lw: 2, alpha: 0.6 }); }
    label(ctx, `i = ${iDeg.toFixed(0)}°`, 60, 120, { weight: 800, size: 16 });
    if (ans) {
      label(ctx, ok ? 'trapped (total reflection)' : 'escapes through the wall', 60, 146, { weight: 800, size: 14, color: ok ? P.accent : P.loss });
      label(ctx, st === 0 ? 'C ≈ 59° at the glass–covering wall' : 'no covering: C ≈ 36.5°', 330, 440, { align: 'center', weight: 700, size: 13 });
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) 0 < i < 60°', '(b) all angles 0 < i < 90°'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The range of angles of incidence (with the axis) for total internal reflection inside the pipe.', '(b) The range if there is no outer covering.']);
    note(ctx, 'ray paths computed with Snell’s law; fibre shortened');
  }
  return { qStages, stages, draw };
})();

//@@ q21
const SCENE = (() => {
  const AP = [300, 110], BL = [180, 318], BR = [420, 318], N = 1.524, deg = Math.PI / 180;
  const C = Math.asin(1 / N), R1 = 60 * deg - C, I = Math.asin(N * Math.sin(R1));
  const qStages = [
    { title: 'A 60° prism', dur: 5, text: 'A prism of refracting angle 60°, n = 1.524.' },
    { title: 'What is asked', dur: 4, text: 'At what angle of incidence does the ray just suffer total internal reflection at the second face?' },
  ];
  const stages = [
    { title: 'At the second face', dur: 6, text: 'Just total reflection: the ray meets the second face at the critical angle, sin C = 1/1.524.', ans: 'C ≈ 41.0°, so r₂ = 41.0° and r₁ = 60° − 41.0° = 19.0°.' },
    { title: 'At the first face', dur: 5, text: 'sin i = n sin r₁.', ans: 'sin i = 1.524 × sin 19.0° ≈ 0.496: i ≈ 29.75°.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.objFill; ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...AP); ctx.lineTo(...BL); ctx.lineTo(...BR); ctx.closePath(); ctx.globalAlpha = 0.8; ctx.fill(); ctx.globalAlpha = 1; ctx.stroke(); ctx.restore();
    label(ctx, '60°', AP[0], AP[1] + 34, { align: 'center', weight: 700, size: 13 });
    const s = 0.45, p1 = [AP[0] + (BL[0] - AP[0]) * s, AP[1] + (BL[1] - AP[1]) * s];
    const nIn = 30 * deg, ain = nIn - I, ar = nIn - R1;   // canvas angles: inward normal of the first face at 30°
    const dx = Math.cos(ar), dy = Math.sin(ar), fx = (BR[0] - AP[0]) / 240, fy = (BR[1] - AP[1]) / 240;
    const det = dx * (-fy) - dy * (-fx), tt = ((AP[0] - p1[0]) * (-fy) - (AP[1] - p1[1]) * (-fx)) / det, p2 = [p1[0] + dx * tt, p1[1] + dy * tt];
    const pin = [p1[0] - 220 * Math.cos(ain), p1[1] - 220 * Math.sin(ain)];
    if (!ans) { ray(ctx, [pin, p1], P.force); label(ctx, 'i = ?', p1[0] - 90, p1[1] - 18, { weight: 800, size: 15 }); askedPanel(ctx, 630, 34, 300, ['The angle of incidence for which the ray just suffers total internal reflection at the other face.']); note(ctx, 'ray path computed with Snell’s law'); return; }
    const st = stageAt(stages, t), k = clamp(t / 3);
    ray(ctx, [pin, p1, [p1[0] + (p2[0] - p1[0]) * k, p1[1] + (p2[1] - p1[1]) * k]], P.force);
    if (k >= 1) ray(ctx, [p2, [p2[0] + fx * 150, p2[1] + fy * 150]], P.force);
    const nx = 0.8667, ny = -0.5;   // outward normal of the second face
    ctx.save(); ctx.strokeStyle = P.ink2; ctx.setLineDash([4, 4]); seg(ctx, p2[0] - nx * 60, p2[1] - ny * 60, p2[0] + nx * 60, p2[1] + ny * 60); seg(ctx, p1[0] - 0.8667 * 60, p1[1] - 0.5 * 60, p1[0] + 0.8667 * 60, p1[1] + 0.5 * 60); ctx.restore();
    label(ctx, 'grazes along the face', p2[0] + fx * 150 + 10, p2[1] + fy * 150, { weight: 700, size: 12, color: P.force });
    label(ctx, `C ≈ ${(C / deg).toFixed(1)}°`, p2[0] + 18, p2[1] - 26, { weight: 800, size: 13 });
    if (st >= 1) label(ctx, 'i ≈ 29.75°', p1[0] - 90, p1[1] - 18, { weight: 800, size: 16, color: P.accent });
    partsPanel(ctx, 630, 34, 300, 'Working', ['r₂ = C ≈ 41.0°, r₁ = 19.0°', 'sin i = 1.524 sin 19.0°: i ≈ 29.75°'], st, false);
    note(ctx, 'ray path computed with Snell’s law; dashed: normals');
  }
  return { qStages, stages, draw };
})();

//@@ q30
const SCENE = (() => {
  const SX = 160, MX = 460, A = 300, D = 7, deg = Math.PI / 180;   // 1.5 m = 300 px
  const qStages = [
    { title: 'A galvanometer mirror', dur: 5, text: 'Light falls normally on a small plane mirror on a galvanometer coil and retraces its path to a screen 1.5 m away.' },
    { title: 'What is asked', dur: 4, text: 'The mirror turns through 3.5°. How far does the spot of light move on the screen?' },
  ];
  const stages = [
    { title: 'Mirror turns 3.5°', dur: D, text: 'Turning a mirror by θ turns the reflected ray by 2θ.', ans: 'The reflected ray turns through 7°.' },
    { title: 'Spot displacement', dur: 5, text: 'd = 1.5 m × tan 7°.', ans: 'd ≈ 0.184 m = 18.4 cm.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    vline(ctx, SX, 120, 480, P.ink, 4); label(ctx, 'screen', SX, 104, { align: 'center', weight: 700, size: 13 });
    const th = ans ? 3.5 * smooth(clamp(t / (D - 2))) : 0, a = th * deg;
    ctx.save(); ctx.translate(MX, A); ctx.rotate(-a); ctx.fillStyle = P.ink; ctx.fillRect(-3, -40, 6, 80); ctx.strokeStyle = P.ink2; for (let k = -36; k <= 36; k += 9) seg(ctx, 3, k, 10, k - 6); ctx.restore();
    label(ctx, 'mirror', MX, A + 58, { align: 'center', weight: 700, size: 13 });
    ray(ctx, [[SX + 4, A], [MX - 3, A]], P.force, { lw: 2 });
    const ry = A - (MX - SX) * Math.tan(2 * a);
    if (ans) { ray(ctx, [[MX - 3, A], [SX + 4, ry]], P.accent, { lw: 2 }); ball(ctx, SX, ry, 6, P.accent); if (th > 0.1) { vdim(ctx, SX - 30, ry, A, P.ink2); label(ctx, `${(1.5 * Math.tan(2 * a) * 100).toFixed(1)} cm`, SX - 38, (ry + A) / 2, { align: 'right', weight: 800, size: 14, color: P.accent }); } label(ctx, `mirror turned ${th.toFixed(1)}°, ray turned ${(2 * th).toFixed(1)}°`, 310, 440, { align: 'center', weight: 700, size: 13 }); partsPanel(ctx, 630, 34, 300, 'Working', ['Ray turns 2 × 3.5° = 7°', 'd = 1.5 tan 7° ≈ 18.4 cm'], stageAt(stages, t), false); }
    else askedPanel(ctx, 630, 34, 300, ['The displacement of the reflected spot on the screen 1.5 m away.']);
    dim(ctx, SX, MX, 500, P.ink2); label(ctx, '1.5 m', (SX + MX) / 2, 486, { align: 'center', weight: 700, size: 13 });
    note(ctx, '200 px per m; angles to scale');
  }
  return { qStages, stages, draw };
})();
