//@@ q06
const SCENE = (() => {
  const A = 270, EX = 470, ER = 70, RET = EX + 2 * ER - 20, LX = 400, FP = 70, D = 7;   // eye lens at EX, retina at RET; far point FP (not to scale)
  const qStages = [
    { title: 'A short-sighted eye', dur: 5, text: 'This person’s far point is 80 cm: farther objects look blurred.' },
    { title: 'What is asked', dur: 4, text: 'The nature and power of the lens that corrects it.' },
  ];
  const stages = [
    { title: 'The defect', dur: D, text: 'Parallel rays from a distant object meet in front of the retina.', ans: '' },
    { title: 'The correction', dur: D, text: 'A concave lens spreads parallel rays out as if they came from the far point, 80 cm away; the eye can focus those on the retina.', ans: 'f = −80 cm: P = 1/(−0.80) = −1.25 D.' },
  ];
  function eye(ctx) {
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(EX + ER - 10, A, ER, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = P.water; ctx.strokeStyle = P.vel; ctx.beginPath(); ctx.ellipse(EX, A, 9, 34, 0, 0, 2 * Math.PI); ctx.globalAlpha = 0.7; ctx.fill(); ctx.globalAlpha = 1; ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(EX + ER - 10, A, ER, -0.5, 0.5); ctx.stroke(); ctx.restore(); label(ctx, 'retina', RET + 16, A - 50, { weight: 700, size: 12, color: P.force });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); hline(ctx, 20, 590, A, P.grid, 1);
    eye(ctx);
    const st = ans ? stageAt(stages, t) : 0, k = ans ? clamp((t - (st ? stages[1].t0 : 0)) / 3) : 1, HS = [-26, -13, 13, 26];
    if (st === 0) { HS.forEach(h => { const xf = EX + 50, yr = A + h - (h / 50) * (RET - EX); ray(ctx, [[30, A + h], [EX, A + h], [EX + (RET - EX) * k, A + h + (yr - A - h) * k]], P.accent, { lw: 1.6 }); }); if (k >= 1) { ball(ctx, EX + 50, A, 4, P.loss); label(ctx, 'focus in front of the retina', EX - 10, A + 90, { align: 'center', weight: 700, size: 12, color: P.loss }); } }
    else {
      lens(ctx, LX, A, 50, false); label(ctx, 'concave lens', LX, A - 64, { align: 'center', weight: 700, size: 12 });
      vline(ctx, FP, A - 6, A + 6, P.ink, 2); label(ctx, 'far point (80 cm)', FP, A + 22, { align: 'center', weight: 700, size: 12 });
      HS.forEach(h => { const y2 = A + h * (EX - FP) / (LX - FP); ray(ctx, [[30, A + h], [LX, A + h], [EX, y2], [EX + (RET - EX) * k, y2 + (A - y2) * k]], P.accent, { lw: 1.6 }); ray(ctx, [[FP, A], [LX, A + h]], P.accent, { dash: [4, 4], heads: false, lw: 1, alpha: 0.7 }); });
      if (k >= 1) { ball(ctx, RET, A, 4, P.accent); label(ctx, 'P = −1.25 D', 240, 460, { align: 'center', weight: 800, size: 18, color: P.accent }); }
    }
    label(ctx, 'from a distant object', 40, A - 50, { weight: 700, size: 12 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['Myopia: focus in front of the retina', 'Concave lens, f = −80 cm, P = −1.25 D'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['The nature and power of the correcting lens.']);
    note(ctx, 'schematic: eye enlarged, distances not to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const A = 270, EX = 470, ER = 70, RET = EX + 2 * ER - 20, LX = 410, NX = 330, NPX = 60, D = 7;   // object at 25 cm (NX), near point 1 m (NPX): not to scale
  const qStages = [
    { title: 'A long-sighted eye', dur: 5, text: 'This person’s near point is 1 m. A normal near point is 25 cm.' },
    { title: 'What is asked', dur: 4, text: 'A diagram of the correction, and the power of the lens.' },
  ];
  const stages = [
    { title: 'The defect', dur: D, text: 'Rays from an object at 25 cm would meet behind the retina: the image is blurred.', ans: '' },
    { title: 'The correction', dur: D, text: 'A convex lens bends the rays so they seem to come from 1 m, the eye’s near point; the eye focuses those on the retina.', ans: 'u = −25 cm, v = −100 cm: f = +33.3 cm, P = +3.0 D.' },
  ];
  function eye(ctx) {
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(EX + ER - 10, A, ER, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = P.water; ctx.strokeStyle = P.vel; ctx.beginPath(); ctx.ellipse(EX, A, 9, 34, 0, 0, 2 * Math.PI); ctx.globalAlpha = 0.7; ctx.fill(); ctx.globalAlpha = 1; ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(EX + ER - 10, A, ER, -0.5, 0.5); ctx.stroke(); ctx.restore(); label(ctx, 'retina', RET + 16, A - 50, { weight: 700, size: 12, color: P.force });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); hline(ctx, 20, 590, A, P.grid, 1);
    eye(ctx); ball(ctx, NX, A, 5, P.vel); label(ctx, 'object at 25 cm', NX, A + 22, { align: 'center', weight: 700, size: 12 });
    const st = ans ? stageAt(stages, t) : 0, k = ans ? clamp((t - (st ? stages[1].t0 : 0)) / 3) : 1, HS = [-26, -13, 13, 26];
    if (st === 0) { HS.forEach(h => { const xb = RET + 40, yr = A + h - h * (RET - EX) / (xb - EX); ray(ctx, [[NX, A], [EX, A + h], [EX + (RET - EX) * k, A + h + (yr - A - h) * k]], P.accent, { lw: 1.6 }); }); if (k >= 1) label(ctx, 'would meet behind the retina', EX, A + 100, { align: 'center', weight: 700, size: 12, color: P.loss }); }
    else {
      lens(ctx, LX, A, 45, true); label(ctx, 'convex lens', LX, A - 60, { align: 'center', weight: 700, size: 12 });
      vline(ctx, NPX, A - 6, A + 6, P.ink, 2); label(ctx, 'near point (1 m)', NPX, A + 22, { align: 'center', weight: 700, size: 12 });
      HS.forEach(h => { const hl = h * (LX - NX) / (EX - NX) * 1.6, y2 = A + hl * (EX - NPX) / (LX - NPX); ray(ctx, [[NX, A], [LX, A + hl], [EX, y2], [EX + (RET - EX) * k, y2 + (A - y2) * k]], P.accent, { lw: 1.6 }); ray(ctx, [[NPX, A], [LX, A + hl]], P.accent, { dash: [4, 4], heads: false, lw: 1, alpha: 0.7 }); });
      if (k >= 1) { ball(ctx, RET, A, 4, P.accent); label(ctx, 'P = +3.0 D', 240, 460, { align: 'center', weight: 800, size: 18, color: P.accent }); }
    }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['Hypermetropia: focus behind the retina', 'Convex lens, f = +33.3 cm, P = +3.0 D'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['A diagram showing the correction.', 'The power of the lens needed.']);
    note(ctx, 'schematic: eye enlarged, distances not to scale');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const A = 270, EX = 470, ER = 70, RET = EX + 2 * ER - 20, D = 10;
  const qStages = [
    { title: 'An object moves away', dur: 5, text: 'An object is moved farther and farther from the eye.' },
    { title: 'What is asked', dur: 4, text: 'What happens to the image distance in the eye?' },
  ];
  const stages = [
    { title: 'Moving away', dur: D, text: 'The image must stay on the retina. The ciliary muscles relax and the lens gets thinner: its focal length increases.', ans: 'Image distance (lens to retina) stays the same.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); hline(ctx, 20, 590, A, P.grid, 1);
    const s = ans ? smooth(clamp(t / (D - 2))) : smooth(clamp(t / 4)), ox = 360 - 320 * s, oh = 40, thick = 16 - 9 * s;
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(EX + ER - 10, A, ER, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = P.water; ctx.strokeStyle = P.vel; ctx.beginPath(); ctx.ellipse(EX, A, thick, 34, 0, 0, 2 * Math.PI); ctx.globalAlpha = 0.7; ctx.fill(); ctx.globalAlpha = 1; ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(EX + ER - 10, A, ER, -0.5, 0.5); ctx.stroke(); ctx.restore();
    objArrow(ctx, ox, A, oh, P.vel);
    const ih = oh * (RET - EX) / (EX - ox);
    ray(ctx, [[ox, A - oh], [EX, A], [RET, A + ih]], P.accent, { lw: 1.6 });
    ray(ctx, [[ox, A - oh], [EX, A - oh * 0.6], [RET, A + ih]], P.leaf, { lw: 1.6 });
    objArrow(ctx, RET - 3, A, -ih, P.force);
    dim(ctx, EX, RET, A + 110, P.ink2); label(ctx, 'image distance: fixed', (EX + RET) / 2, A + 126, { align: 'center', weight: 800, size: 13, color: P.accent });
    label(ctx, 'lens thickness: ' + (s < 0.5 ? 'thicker (near object)' : 'thinner (far object)'), EX - 10, A - 70, { align: 'center', weight: 700, size: 12 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['Image distance stays the same; the focal length of the eye lens increases'], 0, false);
    else askedPanel(ctx, 630, 34, 300, ['What happens to the image distance in the eye as the object moves away.']);
    note(ctx, 'schematic; lens thickness shows the change of focal length');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const SX = 300, SY = 50, EYE = [300, 480], NL = 6, D = 12;
  const qStages = [
    { title: 'A star at night', dur: 6, text: 'Light from a distant star passes through the earth’s atmosphere to the eye.' },
    { title: 'What is asked', dur: 4, text: 'Why do stars twinkle?' },
  ];
  const stages = [
    { title: 'Changing refraction', dur: D, text: 'Layers of air keep changing their temperature and density, so their refractive index changes; the light path bends by slightly different amounts from moment to moment.', ans: 'The star’s apparent position shifts and the light reaching the eye varies: it twinkles.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let i = 0; i < NL; i++) { const y = 140 + i * 50; ctx.save(); ctx.fillStyle = P.water; ctx.globalAlpha = 0.12 + 0.05 * i + 0.05 * Math.sin(1.7 * t + i * 1.3); ctx.fillRect(20, y, 570, 50); ctx.restore(); }
    label(ctx, 'atmosphere (layers keep changing)', 30, 130, { weight: 700, size: 12, color: P.ink2 });
    label(ctx, '★', SX, SY, { align: 'center', size: 26, color: P.ke });
    const pts = [[SX, SY + 14]]; let x = SX;
    for (let i = 0; i <= NL; i++) { x += (ans ? 10 : 4) * Math.sin(2.3 * t + i * 1.9) * (i ? 1 : 0); pts.push([x, 140 + i * 50]); }
    pts.push(EYE);
    ray(ctx, pts, P.ke, { lw: 2 });
    ctx.save(); ctx.fillStyle = P.ink; ctx.beginPath(); ctx.ellipse(EYE[0], EYE[1] + 10, 18, 9, 0, 0, 2 * Math.PI); ctx.fill(); ctx.restore(); label(ctx, 'eye', EYE[0] + 26, EYE[1] + 10, { weight: 700, size: 12 });
    if (ans) {
      const [p1, p2] = [pts[pts.length - 2], EYE], dx = p1[0] - p2[0], dy = p1[1] - p2[1], s = (SY - p2[1]) / dy, ax = p2[0] + dx * s;
      ray(ctx, [p1, [ax, SY + 12]], P.ke, { dash: [4, 4], heads: false, lw: 1, alpha: 0.6 });
      const b = 0.55 + 0.45 * Math.sin(5.1 * t) * Math.sin(3.3 * t + 1);
      label(ctx, '★', ax, SY, { align: 'center', size: 26, color: P.force, alpha: b }); label(ctx, 'apparent position', ax + 20, SY + 4, { size: 12, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Changing atmospheric refraction of light from a point-like star: its apparent position and brightness flicker'], 0, false);
    } else askedPanel(ctx, 630, 34, 300, ['Why stars twinkle.']);
    note(ctx, 'bending greatly exaggerated');
  }
  return { qStages, stages, draw };
})();
