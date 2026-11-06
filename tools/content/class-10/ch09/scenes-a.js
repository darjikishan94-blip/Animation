//@@ q07
const SCENE = (() => {
  const M = 330, A = 300, S = 7, F = 15, H = 32, D = 8;   // 7 px per cm
  const qStages = [
    { title: 'A concave mirror', dur: 5, text: 'A concave mirror of focal length 15 cm. We want an erect image of an object.' },
    { title: 'What is asked', dur: 5, text: 'The range of object distance; the nature and size of the image; a ray diagram.' },
  ];
  const stages = [
    { title: 'Object inside F', dur: D, text: 'Put the object between P and F (here 10 cm). A ray parallel to the axis reflects through F; a ray to the pole reflects symmetrically.', ans: 'The reflected rays spread out; traced back they meet behind the mirror.' },
    { title: 'Anywhere inside F', dur: D, text: 'Move the object anywhere between P and F.', ans: 'The image is always virtual, erect and larger. Range: 0 to 15 cm.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 600, A, P.ink2, 1); mirror(ctx, M, A, 150, 800, true);
    [['F', F], ['C', 2 * F]].forEach(([n, d]) => { vline(ctx, M - S * d, A - 5, A + 5, P.ink, 2); label(ctx, n, M - S * d, A + 18, { align: 'center', weight: 800, size: 13 }); });
    label(ctx, 'P', M + 10, A + 18, { weight: 800, size: 13 });
    const st = ans ? stageAt(stages, t) : -1, u = st === 1 ? 7.5 + 3 * Math.sin((t - stages[1].t0) * 0.9) : 10, ox = M - S * u;
    objArrow(ctx, ox, A, H, P.vel); label(ctx, 'object', ox, A - H - 14, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const r = mirrorRays(ctx, M, A, S * F, ox, H, clamp(t / 3));
      label(ctx, `object ${u.toFixed(1)} cm → image ${(-r.v / S).toFixed(1)} cm behind, ${r.m.toFixed(1)}× size`, 300, 480, { align: 'center', weight: 800, size: 14, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Ray diagram with the object inside F', 'Range 0–15 cm: virtual, erect, enlarged'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The range of object distance for an erect image.', 'The nature of the image, and whether it is larger or smaller.', 'A ray diagram.']);
    note(ctx, '7 px per cm; object height illustrative; mirror curvature drawn flatter');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const D = 6;
  const qStages = [
    { title: 'Three uses of mirrors', dur: 5, text: '(a) Headlights of a car. (b) Side/rear-view mirror of a vehicle. (c) Solar furnace.' },
    { title: 'What is asked', dur: 4, text: 'Name the type of mirror in each, with a reason.' },
  ];
  const stages = [
    { title: '(a) Headlight', dur: D, text: 'A bulb at the focus of a concave mirror: the reflected rays come out parallel.', ans: 'Concave: a strong parallel beam.' },
    { title: '(b) Rear-view mirror', dur: D, text: 'A convex mirror spreads reflected rays out: it shows a wide area, with small erect images.', ans: 'Convex: erect images and a wide field of view.' },
    { title: '(c) Solar furnace', dur: D, text: 'Parallel sunlight on a large concave mirror converges at its focus.', ans: 'Concave: concentrates sunlight, giving high temperature.' },
  ];
  function row(ctx, y, lab) { label(ctx, lab, 24, y - 58, { weight: 800, size: 13 }); }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const st = ans ? stageAt(stages, t) : 3, k = s => ans ? (st > s ? 1 : st === s ? clamp((t - stages[s].t0) / 3) : 0) : 0;
    // (a) headlight: concave mirror facing left at x = 300, bulb at F
    { const y = 105, M = 300, f = 70; row(ctx, y, '(a) car headlight'); hline(ctx, 40, M, y, P.grid, 1); mirror(ctx, M, y, 55, 400, true); ball(ctx, M - f, y, 7, P.ke); label(ctx, 'bulb at F', M - f, y + 22, { align: 'center', size: 11 });
      [-45, -25, 25, 45].forEach(h => { const kk = k(0); if (kk > 0) ray(ctx, [[M - f, y], [M, y + h], [M - (M - 60) * kk, y + h]], P.ke, { lw: 1.6 }); }); }
    // (b) convex rear-view mirror at x = 300
    { const y = 270, M = 300; row(ctx, y, '(b) rear-view mirror'); hline(ctx, 40, M, y, P.grid, 1); mirror(ctx, M, y, 55, 300, false);
      [[90, 30], [170, 26], [240, 20]].forEach(([x, h]) => { objArrow(ctx, x, y + 40, h, P.vel); const kk = k(1); if (kk >= 1) { const u = M - x, f = -110, v = 1 / (1 / f - 1 / u); objArrow(ctx, M - v, y + 40, h * (-v / u), P.force, true); } });
      [-40, -15, 15, 40].forEach(h => { const kk = k(1); if (kk > 0) { const sl = h / 110; ray(ctx, [[60, y + h], [M, y + h], [M - 220 * kk, y + h - 220 * sl * kk]], P.accent, { lw: 1.4 }); } });
      if (k(1) >= 1) label(ctx, 'small erect images', 420, y + 40, { weight: 700, size: 12, color: P.force }); }
    // (c) solar furnace: concave mirror at x = 560 facing left, focus at 400
    { const y = 435, M = 560, f = 150; row(ctx, y, '(c) solar furnace'); hline(ctx, 40, M, y, P.grid, 1); mirror(ctx, M, y, 60, 700, true); label(ctx, '☀ sunlight', 40, y - 40, { weight: 700, size: 12, color: P.ke });
      [-50, -25, 0, 25, 50].forEach(h => { const kk = k(2); if (kk > 0) ray(ctx, [[80, y + h], [M, y + h], [M - f * kk, y + h - h * kk]], P.ke, { lw: 1.6 }); else ray(ctx, [[80, y + h], [M, y + h]], P.ke, { lw: 1.2, alpha: 0.5 }); });
      ctx.save(); ctx.fillStyle = P.force; ctx.globalAlpha = 0.6 * k(2); ctx.beginPath(); ctx.arc(M - f, y, 16, 0, 2 * Math.PI); ctx.fill(); ctx.restore(); label(ctx, 'F: very hot', M - f, y + 32, { align: 'center', weight: 700, size: 12, color: P.force, alpha: k(2) }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) Concave: parallel beam', '(b) Convex: erect images, wide view', '(c) Concave: concentrates sunlight'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['The type of mirror used in (a) car headlights, (b) a rear-view mirror, (c) a solar furnace, with reasons.']);
    note(ctx, 'schematic; sizes illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const L = 330, A = 280, F = 100, OX = 80, H = 60, D = 7;
  const u = L - OX, v = 1 / (1 / F - 1 / u), IX = L + v, IY = A + H * v / u;
  const qStages = [
    { title: 'A half-covered lens', dur: 5, text: 'The upper half of a convex lens is covered with black paper. An object stands in front of it.' },
    { title: 'What is asked', dur: 4, text: 'Will the lens still form a complete image? Explain.' },
  ];
  const stages = [
    { title: 'Uncovered lens', dur: D, text: 'Light from the tip of the object passes through every part of the lens and meets at one image point.', ans: '' },
    { title: 'Half covered', dur: D, text: 'The paper blocks the rays through the top half; those through the bottom half still meet at the same point.', ans: 'A complete image forms, but dimmer (about half the light).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 600, A, P.ink2, 1); lens(ctx, L, A, 130, true);
    [['F', L - F], ['F', L + F], ['2F', L - 2 * F], ['2F', L + 2 * F]].forEach(([n, x]) => { vline(ctx, x, A - 5, A + 5, P.ink, 2); label(ctx, n, x, A + 18, { align: 'center', weight: 800, size: 12 }); });
    objArrow(ctx, OX, A, H, P.vel); label(ctx, 'object', OX, A - H - 14, { align: 'center', weight: 700, size: 12 });
    const st = ans ? stageAt(stages, t) : 1, cover = st >= 1;
    if (cover) { ctx.fillStyle = P.ink; ctx.fillRect(L - 10, A - 132, 20, 130); label(ctx, 'black paper', L + 16, A - 120, { weight: 700, size: 12 }); }
    if (ans) {
      const k = clamp((t - (st === 0 ? 0 : stages[1].t0)) / 3);
      [-110, -70, -30, 10, 50, 90, 120].forEach(yl => { const yy = A + yl, blocked = cover && yy < A; ray(ctx, [[OX, A - H], [L, yy]], P.accent, { lw: 1.5, alpha: blocked ? 0.35 : 1 }); if (!blocked) ray(ctx, [[L, yy], [L + (IX - L) * k, yy + (IY - yy) * k]], P.accent, { lw: 1.5 }); });
      if (k >= 1) { ctx.save(); ctx.globalAlpha = cover ? 0.5 : 1; objArrow(ctx, IX, A, A - IY, P.force); ctx.restore(); label(ctx, cover ? 'complete image, dimmer' : 'image', IX, A + 26, { align: 'center', weight: 800, size: 13, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Every part of the lens forms the whole image', 'Yes: complete, but less bright'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Whether the half-covered lens forms a complete image, with an explanation.']);
    note(ctx, 'distances illustrative (object beyond 2F)');
  }
  return { qStages, stages, draw };
})();

//@@ q10
const SCENE = (() => {
  const L = 320, A = 260, S = 10, F = 10, U = 25, H = 5;   // 10 px per cm
  const qStages = [
    { title: 'An object and a convex lens', dur: 5, text: 'An object 5 cm tall is 25 cm from a converging lens of focal length 10 cm.' },
    { title: 'What is asked', dur: 4, text: 'Draw the ray diagram. Find the position, size and nature of the image.' },
  ];
  const stages = [
    { title: 'Ray diagram', dur: 6, text: 'A ray parallel to the axis refracts through F₂; a ray through the optical centre goes straight on.', ans: 'They meet beyond F₂ on the other side.' },
    { title: 'Lens formula', dur: 6, text: '1/v − 1/u = 1/f with u = −25 cm, f = +10 cm.', ans: 'v = +16.7 cm; m = v/u = −0.67; h′ = −3.3 cm: real, inverted, diminished.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 600, A, P.ink2, 1); lens(ctx, L, A, 120, true);
    [['F₁', -F], ['F₂', F], ['2F₁', -2 * F], ['2F₂', 2 * F]].forEach(([n, d]) => { vline(ctx, L + S * d, A - 5, A + 5, P.ink, 2); label(ctx, n, L + S * d, A + 18, { align: 'center', weight: 800, size: 12 }); });
    const ox = L - S * U; objArrow(ctx, ox, A, S * H, P.vel); label(ctx, '5 cm', ox - 8, A - S * H / 2, { align: 'right', weight: 700, size: 12 });
    dim(ctx, ox, L, A + 60, P.ink2); label(ctx, '25 cm', (ox + L) / 2, A + 76, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const r = lensRays(ctx, L, A, S * F, ox, S * H, clamp(t / 3)), st = stageAt(stages, t);
      if (st >= 1) { dim(ctx, L, r.ix, A + 100, P.ink2); label(ctx, '16.7 cm', (L + r.ix) / 2, A + 116, { align: 'center', weight: 800, size: 13, color: P.force }); label(ctx, '3.3 cm, inverted', r.ix + 10, r.iy + 10, { weight: 800, size: 12, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Ray diagram: rays meet beyond F₂', 'v = 16.7 cm; h′ = 3.3 cm; real, inverted, diminished'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The ray diagram.', 'The position, size and nature of the image.']);
    note(ctx, '10 px per cm in both directions');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const L = 420, A = 280, S = 9, F = 15, H = 60;   // 9 px per cm
  const qStages = [
    { title: 'A concave lens', dur: 5, text: 'A concave lens of focal length 15 cm forms an image 10 cm from the lens.' },
    { title: 'What is asked', dur: 4, text: 'How far from the lens is the object? Draw the ray diagram.' },
  ];
  const stages = [
    { title: 'Lens formula', dur: 5, text: 'A concave lens forms a virtual image on the object’s side: v = −10 cm, f = −15 cm.', ans: '1/u = 1/v − 1/f = −1/10 + 1/15 = −1/30: u = −30 cm.' },
    { title: 'Ray diagram', dur: 6, text: 'A ray parallel to the axis leaves as if from F₁; a ray through the centre goes straight on.', ans: 'Traced back, they meet 10 cm from the lens: virtual, erect, 1/3 the size.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 600, A, P.ink2, 1); lens(ctx, L, A, 120, false);
    [['F₁', -F], ['F₂', F]].forEach(([n, d]) => { vline(ctx, L + S * d, A - 5, A + 5, P.ink, 2); label(ctx, n, L + S * d, A + 18, { align: 'center', weight: 800, size: 12 }); });
    const st = ans ? stageAt(stages, t) : -1;
    if (!ans) { objArrow(ctx, L - S * 10, A, H / 3, P.force, true); label(ctx, 'image, 10 cm', L - S * 10, A + 34, { align: 'center', weight: 700, size: 12, color: P.force }); label(ctx, 'object: where?', 140, A - 80, { align: 'center', weight: 800, size: 14 }); askedPanel(ctx, 630, 34, 300, ['The distance of the object from the lens.', 'The ray diagram.']); note(ctx, '9 px per cm'); return; }
    const ox = L - S * 30; objArrow(ctx, ox, A, H, P.vel); label(ctx, 'object', ox, A - H - 14, { align: 'center', weight: 700, size: 12 });
    dim(ctx, ox, L, A + 70, P.ink2); label(ctx, '30 cm', (ox + L) / 2, A + 86, { align: 'center', weight: 800, size: 13, color: P.accent });
    if (st >= 1) { const r = lensRays(ctx, L, A, -S * F, ox, H, clamp((t - stages[1].t0) / 3)); label(ctx, '10 cm', (r.ix + L) / 2, A + 40, { align: 'center', weight: 700, size: 12, color: P.force }); }
    partsPanel(ctx, 630, 34, 300, 'Answer', ['u = −30 cm: the object is 30 cm from the lens', 'Rays traced back meet at 10 cm'], st, false);
    note(ctx, '9 px per cm; object height illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const M = 380, A = 290, S = 12, F = 15, U = 10, H = 60;   // 12 px per cm
  const qStages = [
    { title: 'A convex mirror', dur: 5, text: 'An object is 10 cm in front of a convex mirror of focal length 15 cm.' },
    { title: 'What is asked', dur: 4, text: 'The position and nature of the image.' },
  ];
  const stages = [
    { title: 'Ray diagram', dur: 6, text: 'A ray parallel to the axis reflects as if from F behind the mirror; a ray to the pole reflects symmetrically.', ans: 'Traced back, they meet behind the mirror.' },
    { title: 'Mirror formula', dur: 5, text: '1/v + 1/u = 1/f with u = −10 cm, f = +15 cm.', ans: 'v = +6 cm: 6 cm behind; m = 0.6: virtual, erect, diminished.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 600, A, P.ink2, 1); mirror(ctx, M, A, 150, 800, false);
    vline(ctx, M + S * F, A - 5, A + 5, P.ink, 2); label(ctx, 'F', M + S * F, A + 18, { align: 'center', weight: 800, size: 12 });
    const ox = M - S * U; objArrow(ctx, ox, A, H, P.vel); label(ctx, 'object', ox, A - H - 14, { align: 'center', weight: 700, size: 12 });
    dim(ctx, ox, M, A + 70, P.ink2); label(ctx, '10 cm', (ox + M) / 2, A + 86, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const r = mirrorRays(ctx, M, A, -S * F, ox, H, clamp(t / 3)), st = stageAt(stages, t);
      if (st >= 1) { dim(ctx, M, r.ix, A + 110, P.ink2); label(ctx, '6 cm', (M + r.ix) / 2, A + 126, { align: 'center', weight: 800, size: 13, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Rays traced back meet behind the mirror', 'v = 6 cm behind; virtual, erect, diminished'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The position and nature of the image.']);
    note(ctx, '12 px per cm; object height illustrative; mirror curvature drawn flatter');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const M = 380, A = 290, S = 10, F = 15, U = 20, H = 5;   // 10 px per cm
  const qStages = [
    { title: 'A convex mirror', dur: 5, text: 'An object 5.0 cm tall is 20 cm in front of a convex mirror of radius of curvature 30 cm (f = 15 cm).' },
    { title: 'What is asked', dur: 4, text: 'The position, nature and size of the image.' },
  ];
  const stages = [
    { title: 'Ray diagram', dur: 6, text: 'A ray parallel to the axis reflects as if from F; a ray to the pole reflects symmetrically.', ans: 'Traced back, they meet behind the mirror.' },
    { title: 'Mirror formula', dur: 5, text: '1/v = 1/f − 1/u = 1/15 + 1/20.', ans: 'v = +8.6 cm (behind); m = 0.43; h′ = 2.1 cm: virtual, erect, diminished.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 600, A, P.ink2, 1); mirror(ctx, M, A, 150, 800, false);
    [['F', F], ['C', 2 * F]].forEach(([n, d]) => { if (M + S * d < 600) { vline(ctx, M + S * d, A - 5, A + 5, P.ink, 2); label(ctx, n, M + S * d, A + 18, { align: 'center', weight: 800, size: 12 }); } });
    const ox = M - S * U; objArrow(ctx, ox, A, S * H, P.vel); label(ctx, '5.0 cm', ox - 8, A - S * H / 2, { align: 'right', weight: 700, size: 12 });
    dim(ctx, ox, M, A + 70, P.ink2); label(ctx, '20 cm', (ox + M) / 2, A + 86, { align: 'center', weight: 700, size: 12 });
    if (ans) {
      const r = mirrorRays(ctx, M, A, -S * F, ox, S * H, clamp(t / 3)), st = stageAt(stages, t);
      if (st >= 1) { dim(ctx, M, r.ix, A + 110, P.ink2); label(ctx, '8.6 cm', (M + r.ix) / 2, A + 126, { align: 'center', weight: 800, size: 13, color: P.force }); label(ctx, '2.1 cm', r.ix + 10, r.iy - 6, { weight: 800, size: 12, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Rays traced back meet behind the mirror', 'v = 8.6 cm behind; 2.1 cm; virtual, erect'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The position of the image, its nature and size.']);
    note(ctx, '10 px per cm in both directions; mirror curvature drawn flatter');
  }
  return { qStages, stages, draw };
})();

//@@ q15
const SCENE = (() => {
  const M = 560, A = 230, S = 6, VS = 8, F = 18, U = 27, H = 7;   // 6 px per cm across, 8 px per cm up
  const qStages = [
    { title: 'A concave mirror', dur: 5, text: 'An object 7.0 cm tall is 27 cm in front of a concave mirror of focal length 18 cm.' },
    { title: 'What is asked', dur: 5, text: 'Where should a screen be placed for a sharp image? The size and nature of the image.' },
  ];
  const stages = [
    { title: 'Ray diagram', dur: 6, text: 'A ray parallel to the axis reflects through F; a ray to the pole reflects symmetrically.', ans: 'They meet beyond C.' },
    { title: 'Mirror formula', dur: 6, text: '1/v = 1/f − 1/u = −1/18 + 1/27 = −1/54.', ans: 'v = −54 cm: screen 54 cm in front; m = −2, h′ = −14 cm: real, inverted, enlarged.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 20, 600, A, P.ink2, 1); mirror(ctx, M, A, 150, 900, true);
    [['F', F], ['C', 2 * F]].forEach(([n, d]) => { vline(ctx, M - S * d, A - 5, A + 5, P.ink, 2); label(ctx, n, M - S * d, A - 16, { align: 'center', weight: 800, size: 12 }); });
    const ox = M - S * U; objArrow(ctx, ox, A, VS * H, P.vel); label(ctx, '7.0 cm', ox + 8, A - VS * H - 10, { weight: 700, size: 12 });
    if (ans) {
      const r = mirrorRays(ctx, M, A, S * F, ox, VS * H, clamp(t / 3)), st = stageAt(stages, t);
      if (t > 3) { ctx.save(); ctx.fillStyle = P.objFill2; ctx.globalAlpha = 0.7; ctx.fillRect(r.ix - 4, A - 30, 8, 160); ctx.restore(); label(ctx, 'screen', r.ix, A - 40, { align: 'center', weight: 700, size: 12 }); }
      if (st >= 1) { dim(ctx, r.ix, M, A + 160, P.ink2); label(ctx, '54 cm', (r.ix + M) / 2, A + 176, { align: 'center', weight: 800, size: 13, color: P.force }); label(ctx, '14 cm, inverted', r.ix + 12, r.iy + 4, { weight: 800, size: 12, color: P.force }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Rays meet beyond C', 'Screen 54 cm in front; 14 cm; real, inverted, enlarged'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Where to place the screen for a sharp image.', 'The size and nature of the image.']);
    note(ctx, 'distances 6 px per cm, heights 8 px per cm; mirror curvature drawn flatter');
  }
  return { qStages, stages, draw };
})();
