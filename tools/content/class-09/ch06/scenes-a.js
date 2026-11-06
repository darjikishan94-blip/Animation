//@@ q01
const SCENE = (() => {
  const Y = 330, D = 8;
  function table(ctx, x) { ctx.fillStyle = P.wood; ctx.fillRect(x - 70, Y - 70, 140, 14); ctx.fillRect(x - 64, Y - 56, 10, 56); ctx.fillRect(x + 54, Y - 56, 10, 56); }
  const qStages = [
    { title: 'Pushing a table', dur: D, text: 'A horizontal force F moves a table across the floor at constant velocity.' },
    { title: 'What is asked', dur: 4, text: 'How much is the frictional force from the floor?' },
  ];
  const stages = [
    { title: 'Constant velocity', dur: D, text: 'Velocity not changing → acceleration zero → net force zero.', ans: 'Friction = F, opposite to the motion.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 20, Y, 570, 24, P.ink2, P.sand);
    const x = 220 + (30 * t) % 300; table(ctx, x);
    vec(ctx, x - 150, Y - 60, 80, 0, 'F', P.force, { side: -1, at: 0.5, italic: true });
    if (ans) { vec(ctx, x + 20, Y + 4, -100, 0, 'friction = F', P.vel, { side: 1, at: 0.5 }); label(ctx, 'v constant → net force = 0', 300, 140, { align: 'center', weight: 800, size: 16, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Answer', ['Friction = F, opposite to the motion'], 0, false); }
    else askedPanel(ctx, 630, 34, 300, ['The frictional force exerted by the floor on the table.']);
    vec(ctx, 40, 90, 60, 0, 'v (constant)', P.ink2, { side: -1, at: 0.5, lw: 2, head: 9 });
    note(ctx, 'force arrows equal in length');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const D = 8;
  const qStages = [
    { title: 'Fig. 6.36', dur: D, text: '(a) Block P: 5 N one way and 4 N the other. (b) Block Q moves with constant velocity. Smooth surface.' },
    { title: 'What is asked', dur: 4, text: 'Which block experiences a net force?' },
  ];
  const stages = [
    { title: 'Block P', dur: D, text: 'Net force = 5 − 4 = 1 N towards the 5 N side: P speeds up that way.', ans: 'P has a net force.' },
    { title: 'Block Q', dur: 5, text: 'Constant velocity: no acceleration.', ans: 'Q has no net force. Answer (i).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 20, 220, 570, 18, P.ink2, P.sand); hatchRect(ctx, 20, 440, 570, 18, P.ink2, P.sand);
    const tp = ans ? t : 0, xp = Math.max(170, 300 - 3 * tp * tp), xq = 120 + 25 * (ans ? t : t % 10);
    block(ctx, xp - 35, 160, 70, 60, 'P', P.objFill2); vec(ctx, xp - 35, 190, -100, 0, '5 N', P.force, { side: -1, at: 0.6 }); vec(ctx, xp + 35, 190, 80, 0, '4 N', P.vel, { side: -1, at: 0.6 });
    block(ctx, xq - 35, 380, 70, 60, 'Q', P.objFill2); vec(ctx, xq + 50, 400, 50, 0, 'v constant', P.ink2, { side: -1, at: 0.5, lw: 2, head: 9 });
    label(ctx, '(a)', 30, 120, { weight: 800, size: 15 }); label(ctx, '(b)', 30, 340, { weight: 800, size: 15 });
    if (ans) { const st = stageAt(stages, t); label(ctx, 'net 1 N ←', xp, 260, { align: 'center', weight: 800, size: 14, color: P.force }); if (st >= 1) label(ctx, 'net force 0', xq, 480, { align: 'center', weight: 800, size: 14, color: P.accent }); partsPanel(ctx, 630, 34, 300, 'Answer', ['P: net 1 N → accelerates', 'Q: none → (i)'], st, false); }
    else askedPanel(ctx, 630, 34, 300, ['Which statement about net forces on P and Q is correct.']);
    note(ctx, 'force arrows to scale (20 px per N); P’s mass not given, motion illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const Y = 260, D = 8;
  const qStages = [
    { title: 'A snake boat', dur: 5, text: '100 oarsmen, 200 N each: 95 push the boat forward, 5 by mistake push it backward.' },
    { title: 'What is asked', dur: 4, text: 'The net force on the boat.' },
  ];
  const stages = [
    { title: 'Add the forces', dur: D, text: 'Forward 95 × 200 = 19 000 N; backward 5 × 200 = 1000 N.', ans: 'Net = 18 000 N forward.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.water; ctx.fillRect(20, Y + 20, 570, 160);
    ctx.save(); ctx.fillStyle = P.wood; ctx.beginPath(); ctx.moveTo(40, Y); ctx.lineTo(560, Y - 30); ctx.lineTo(520, Y + 24); ctx.lineTo(70, Y + 24); ctx.closePath(); ctx.fill(); ctx.restore();
    for (let i = 0; i < 20; i++) { const x = 90 + i * 22, wrong = i === 6 || i === 13, sw = Math.sin(2 * t + (wrong ? Math.PI : 0)); ball(ctx, x, Y - 8, 5, wrong ? P.force : P.vel); ctx.save(); ctx.strokeStyle = wrong ? P.force : P.vel; ctx.lineWidth = 2; seg(ctx, x, Y - 4, x - 12 * sw, Y + 40); ctx.restore(); }
    label(ctx, 'each figure = 5 oarsmen; red: rowing the wrong way', 40, Y + 200, { size: 12 });
    vec(ctx, 300, 120, 190, 0, '19 000 N (95 oarsmen)', P.vel, { side: -1, at: 0.5 }); vec(ctx, 300, 160, -10, 0, '', P.force, { lw: 4 }); label(ctx, '1000 N (5)', 284, 160, { align: 'right', weight: 700, size: 13, color: P.force });
    if (ans) { vec(ctx, 300, 70, 180, 0, 'net 18 000 N', P.accent, { side: -1, at: 0.5, lw: 5 }); partsPanel(ctx, 630, 34, 300, 'Answer', ['19 000 − 1000 = 18 000 N forward'], 0, false); }
    else askedPanel(ctx, 630, 34, 300, ['The net force on the snake boat.']);
    note(ctx, 'force arrows to scale (1 px per 100 N)');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const OBJ = [['A', s => 0.8 * s, 'steady'], ['B', s => 0.6, 'at rest'], ['C', s => 0.9 * s * s, 'speeding up'], ['D', s => 0.9 - 0.8 * s, 'steady, backwards']], D = 8;
  const qStages = [
    { title: 'Fig. 6.37', dur: D, text: 'Position–time graphs of four objects A, B, C and D moving along a straight line.' },
    { title: 'What is asked', dur: 4, text: 'On which object does a net force act?' },
  ];
  const stages = [
    { title: 'Read the slopes', dur: D, text: 'Slope = velocity. A, D: straight lines (constant velocity). B: flat (at rest). C: getting steeper (accelerating).', ans: 'Only C accelerates: (iii) Object C.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const s = clamp(t / (D - 1));
    OBJ.forEach(([n, f, d], i) => {
      const gx = 30 + i * 145, g = axes(ctx, { x: gx + 10, y: 70, w: 105, h: 150, x0: 0, x1: 1, y0: 0, y1: 1, xt: [], yt: [], xl: '', yl: '' });
      plot(ctx, g, f, 0, 1, P.vel, 2.5); ball(ctx, g.X(s), g.Y(f(s)), 5, P.force); label(ctx, n, gx + 60, 250, { align: 'center', weight: 800, size: 15 });
      hline(ctx, gx + 10, gx + 125, 330, P.ink2, 1); ball(ctx, gx + 10 + 115 * f(s), 330, 8, n === 'C' && ans ? P.force : P.vel);
      if (ans) label(ctx, d, gx + 60, 360, { align: 'center', size: 12, color: n === 'C' ? P.force : P.ink2, weight: n === 'C' ? 800 : 400 });
    });
    label(ctx, 'position', 20, 50, { size: 12, color: P.ink2 }); label(ctx, 'each object on its track', 30, 300, { size: 12, color: P.ink2 });
    if (ans) { label(ctx, 'net force only on C', 300, 430, { align: 'center', weight: 800, size: 17, color: P.force }); partsPanel(ctx, 630, 34, 300, 'Answer', ['(iii) Object C: its velocity changes'], 0, false); }
    else askedPanel(ctx, 630, 34, 300, ['Which object has a net force acting on it.']);
    note(ctx, 'graphs follow the shapes in Fig. 6.37; time axes left to right');
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const W = 300, D = 8;
  const qStages = [
    { title: 'Fig. 6.38', dur: 5, text: 'A sailor jumps from a small boat to the shore.' },
    { title: 'What is asked', dur: 4, text: 'Does the boat move? Which way, and why?' },
  ];
  const stages = [
    { title: 'Action and reaction', dur: D, text: 'To jump forward, the sailor pushes the boat backward; the boat pushes him forward with an equal force.', ans: 'The boat moves backward, away from the shore.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.water; ctx.fillRect(160, W + 20, 430, 200); ctx.fillStyle = P.sand; ctx.fillRect(20, W - 20, 150, 240); label(ctx, 'shore', 40, W - 34, { weight: 700, size: 13 });
    const k = ans ? smooth(clamp((t - 1) / 3)) : 0, bx = 330 + 120 * k;
    ctx.save(); ctx.fillStyle = P.wood; ctx.beginPath(); ctx.moveTo(bx - 90, W); ctx.lineTo(bx + 90, W); ctx.lineTo(bx + 60, W + 34); ctx.lineTo(bx - 60, W + 34); ctx.closePath(); ctx.fill(); ctx.restore();
    const px = 300 - 190 * k, py = W - 120 * Math.sin(Math.PI * k) * 0.6 + (k >= 1 ? -20 : 0); person(ctx, px, k >= 1 ? W - 20 : py, 0.9, P.vel);
    if (ans && t > 1 && t < 4) { vec(ctx, px - 10, py - 40, -60, 0, 'on sailor', P.vel, { side: -1, at: 0.5, size: 12 }); vec(ctx, bx - 40, W + 10, 60, 0, 'on boat', P.force, { side: 1, at: 0.5, size: 12 }); }
    if (ans && k >= 1) { vec(ctx, bx - 30, W - 40, 60, 0, 'boat moves back', P.force, { side: -1, at: 0.5, size: 13 }); partsPanel(ctx, 630, 34, 300, 'Answer', ['Yes: the boat moves backward (Newton’s third law)'], 0, false); }
    else if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['Equal and opposite forces between sailor and boat'], 0, false);
    else askedPanel(ctx, 630, 34, 300, ['Whether the boat moves, in which direction, and why.']);
    note(ctx, 'masses and speeds illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q08
const SCENE = (() => {
  const G = { x: 330, y: 110, w: 240, h: 300, x0: 0, x1: 0.6, y0: 0, y1: 10, xt: [0.1, 0.5], yt: [], xl: 't', yl: 'force' }, D = 9;
  const hard = s => s < 0.1 ? 9 * Math.sin(Math.PI * s / 0.1) : 0, soft = s => s < 0.5 ? 1.8 * Math.sin(Math.PI * s / 0.5) : 0;   // equal areas
  const qStages = [
    { title: 'Fig. 6.39', dur: 5, text: 'After a high jump the athlete falls onto a landing mat (or sand bed).' },
    { title: 'What is asked', dur: 4, text: 'Explain why the mat is used.' },
  ];
  const stages = [
    { title: 'Same momentum to lose', dur: 5, text: 'Whatever the surface, the athlete arrives with the same momentum and must be brought to rest.', ans: '' },
    { title: 'Longer stop, smaller force', dur: D, text: 'Force = change in momentum ÷ time. The mat makes the stopping time much longer.', ans: 'The force on the body is much smaller: no injury.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 20, 440, 130, 30, P.ink2, P.sand); label(ctx, 'hard ground', 85, 488, { align: 'center', size: 12 });
    ctx.fillStyle = P.leaf; ctx.globalAlpha = 0.5; ctx.fillRect(170, 400, 130, 70); ctx.globalAlpha = 1; label(ctx, 'mat', 235, 488, { align: 'center', size: 12 });
    const k = ans ? clamp(t / 3) : clamp((t % 5) / 3), y1 = 120 + 300 * Math.min(1, k * 1.0), y2 = 120 + 280 * Math.min(1, k) + (k >= 1 ? 20 * clamp((t - 3) / 2) : 0);
    ball(ctx, 85, Math.min(y1, 425), 14, P.vel); ball(ctx, 235, Math.min(y2, 410), 14, P.vel);
    if (ans) {
      const st = stageAt(stages, t), g = axes(ctx, G);
      if (st >= 1) { const u = 0.6 * clamp((t - stages[1].t0) / 4); plot(ctx, g, hard, 0, u, P.force); plot(ctx, g, soft, 0, u, P.leaf); label(ctx, 'ground: short, big force', g.X(0.12), g.Y(8.5), { weight: 700, size: 12, color: P.force }); label(ctx, 'mat: long, small force', g.X(0.25), g.Y(2.6), { weight: 700, size: 12, color: P.leaf }); label(ctx, 'equal areas = equal momentum change', 450, 450, { align: 'center', size: 12 }); }
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Same change in momentum', 'Longer time → smaller force'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['Why a landing mat or sand bed is used.']);
    note(ctx, 'force–time shapes illustrative; the two areas are equal');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const Y = 300, D = 8;
  function cart(ctx, x, loaded) { block(ctx, x - 50, Y - 50, 100, 40, loaded ? 'loaded' : 'empty', loaded ? P.leaf : P.objFill2); if (loaded) for (let i = 0; i < 6; i++) ball(ctx, x - 38 + i * 15, Y - 56, 8, i % 2 ? P.force : P.ke); ball(ctx, x - 30, Y - 4, 9, P.ink); ball(ctx, x + 30, Y - 4, 9, P.ink); }
  const qStages = [
    { title: 'Two carts collide', dur: D, text: 'A cart loaded with vegetables runs into an identical empty cart.' },
    { title: 'What is asked', dur: 4, text: 'Compare the forces they exert on each other during the collision.' },
  ];
  const stages = [
    { title: 'During the collision', dur: D, text: 'Newton’s third law: the forces are equal and opposite, whatever the masses.', ans: '(iv) Equal in magnitude. (The lighter empty cart changes velocity more.)' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 20, Y + 6, 570, 18, P.ink2, P.sand);
    const tc = 3, tt = ans ? t : t % D, xl = tt < tc ? 100 + 50 * tt : 250 + 25 * (tt - tc), xe = tt < tc ? 360 : 360 + 70 * (tt - tc);   // illustrative after-collision speeds
    cart(ctx, Math.min(xl, 470), true); cart(ctx, Math.min(xe, 560), false);
    if (ans && Math.abs(tt - tc) < 0.8) { vec(ctx, 310, Y - 90, 50, 0, 'F', P.force, { side: -1, at: 0.6, italic: true }); vec(ctx, 300, Y - 90, -50, 0, 'F', P.vel, { side: -1, at: 0.6, italic: true }); label(ctx, 'equal and opposite', 305, Y - 130, { align: 'center', weight: 800, size: 14, color: P.accent }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['(iv) The forces are equal in magnitude'], 0, false);
    else askedPanel(ctx, 630, 34, 300, ['Which statement about the forces during the collision is correct.']);
    note(ctx, 'speeds illustrative');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const G = { x: 70, y: 80, w: 460, h: 380, x0: 0, x1: 9, y0: 0, y1: 34, xt: [4, 8], yt: [10, 20, 30], xl: 't (s)', yl: 'v (m/s)' };
  const qStages = [
    { title: 'Fig. 6.41', dur: 5, text: 'Velocity–time graph of a 10 kg object: 10 m/s at 0 s, rising in a straight line to 30 m/s at 8 s.' },
    { title: 'What is asked', dur: 4, text: 'The force on the object.' },
  ];
  const stages = [
    { title: 'Acceleration = slope', dur: 6, text: 'Rise 30 − 10 = 20 m/s over 8 s.', ans: 'a = 20/8 = 2.5 m/s².' },
    { title: 'Force', dur: 5, text: 'F = ma.', ans: 'F = 10 × 2.5 = 25 N.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const g = axes(ctx, G); plot(ctx, g, x => 10 + 2.5 * x, 0, 8, P.vel);
    if (ans) { const st = stageAt(stages, t); hline(ctx, g.X(0), g.X(8), g.Y(10), P.accent, 1.5, [4, 3]); vline(ctx, g.X(8), g.Y(10), g.Y(30), P.accent, 1.5, [4, 3]); label(ctx, 'Δt = 8 s', g.X(4), g.Y(10) + 16, { align: 'center', weight: 700, size: 13, color: P.accent }); label(ctx, 'Δv = 20 m/s', g.X(8) + 8, g.Y(20), { weight: 700, size: 13, color: P.accent });
      label(ctx, 'a = 2.5 m/s²', g.X(1), g.Y(28), { weight: 800, size: 16, color: P.accent }); if (st >= 1) label(ctx, 'F = 10 × 2.5 = 25 N', g.X(1), g.Y(24), { weight: 800, size: 16, color: P.force });
      partsPanel(ctx, 630, 34, 300, 'Working', ['a = slope = 2.5 m/s²', 'F = ma = 25 N'], st, false); }
    else askedPanel(ctx, 630, 34, 300, ['The force acting on the object.']);
    note(ctx, 'graph drawn from Fig. 6.41');
  }
  return { qStages, stages, draw };
})();

//@@ q12
const SCENE = (() => {
  const BX = 300, Y = 260, S = 500, D = 8;   // block face at BX; 500 px per m inside the block
  const qStages = [
    { title: 'A bullet into wood', dur: 5, text: 'A 50 g bullet at 100 m/s enters a heavy wooden block and stops after 50 cm.' },
    { title: 'What is asked', dur: 4, text: 'Estimate the stopping force (constant acceleration).' },
  ];
  const stages = [
    { title: 'Deceleration', dur: D, text: 'v² = u² + 2as with v = 0, s = 0.50 m.', ans: 'a = −100²/(2 × 0.50) = −10 000 m/s².' },
    { title: 'Force', dur: 5, text: 'F = ma.', ans: 'F = 0.050 × 10 000 = 500 N (against the motion).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.wood; ctx.fillRect(BX, Y - 90, 280, 180); label(ctx, 'wooden block', BX + 140, Y - 104, { align: 'center', weight: 700, size: 13 });
    const k = ans ? clamp(t / 4) : clamp((t % 5) / 4), pre = Math.min(1, k * 2), inn = clamp(k * 2 - 1), d = 0.5 * (1 - (1 - inn) ** 2);   // inside: uniform deceleration
    const x = k < 0.5 ? 40 + (BX - 40) * pre : BX + S * d;
    ctx.fillStyle = P.ink; ctx.fillRect(x - 28, Y - 5, 28, 10); ctx.beginPath(); ctx.arc(x, Y, 5, -Math.PI / 2, Math.PI / 2); ctx.fill();
    dim(ctx, BX, BX + S * 0.5, Y + 60, P.ink2); label(ctx, '50 cm', BX + S * 0.25, Y + 76, { align: 'center', weight: 700, size: 13 });
    if (ans) { const st = stageAt(stages, t); if (k >= 0.5) vec(ctx, x + 10, Y - 30, -60, 0, 'F', P.force, { side: -1, at: 0.6, italic: true }); label(ctx, 'a = −10 000 m/s²', 40, 420, { weight: 800, size: 16, color: P.accent }); if (st >= 1) label(ctx, 'F = 500 N', 40, 452, { weight: 800, size: 18, color: P.force }); partsPanel(ctx, 630, 34, 300, 'Working', ['a = −u²/2s = −10 000 m/s²', 'F = ma = 500 N'], st, false); }
    else askedPanel(ctx, 630, 34, 300, ['The stopping force on the bullet.']);
    note(ctx, 'penetration to scale (500 px per m); time slowed enormously');
  }
  return { qStages, stages, draw };
})();

//@@ q14
const SCENE = (() => {
  const X0 = 150, Y = 300, S = 40, D = 7;   // rough patch starts at X0; 40 px per m
  const qStages = [
    { title: 'A rough patch', dur: 5, text: 'A 2 kg object at 10 m/s enters a rough patch: friction 7 N, and an extra 3 N also opposes the motion.' },
    { title: 'What is asked', dur: 4, text: 'How far does it go before stopping?' },
  ];
  const stages = [
    { title: 'Deceleration', dur: 4, text: 'Net opposing force 7 + 3 = 10 N.', ans: 'a = −10/2 = −5 m/s².' },
    { title: 'Stopping distance', dur: 5, text: 's = u²/2|a|.', ans: 's = 100/10 = 10 m (in 2 s).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.fillStyle = P.road; ctx.fillRect(20, Y, X0 - 20, 14); hatchRect(ctx, X0, Y, 440, 14, P.ink2, P.sand); label(ctx, 'rough patch', X0 + 10, Y + 34, { weight: 700, size: 12 });
    const tt = ans ? Math.min(2, t * 0.6) : 0, s = 10 * tt - 2.5 * tt * tt, x = X0 + S * s, v = 10 - 5 * tt;
    block(ctx, x - 30, Y - 50, 60, 50, '2 kg', P.objFill2);
    if (ans) { const st = stageAt(stages, t); if (v > 0.05) { vec(ctx, x - 32, Y - 14, -70, 0, '7 N', P.force, { side: 1, at: 0.6, size: 12 }); vec(ctx, x - 32, Y - 38, -30, 0, '3 N', P.vel, { side: -1, at: 0.6, size: 12 }); }
      label(ctx, `v = ${v.toFixed(1)} m/s   s = ${s.toFixed(1)} m`, 40, 120, { weight: 800, size: 15 });
      if (st >= 1 && tt >= 2) { dim(ctx, X0, X0 + S * 10, Y + 60, P.ink2); label(ctx, '10 m', X0 + S * 5, Y + 76, { align: 'center', weight: 800, size: 14, color: P.accent }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['a = −(7 + 3)/2 = −5 m/s²', 's = 10²/(2 × 5) = 10 m'], st, false); }
    else { vec(ctx, X0 - 40, Y - 70, 40, 0, '10 m/s', P.ink2, { side: -1, at: 0.5, lw: 2, head: 9 }); askedPanel(ctx, 630, 34, 300, ['The distance travelled before coming to rest.']); }
    note(ctx, 'road 40 px per m; time slowed (×0.6); force arrows 10 px per N');
  }
  return { qStages, stages, draw };
})();
