//@@ q01
const SCENE = (() => {
  const CX = 300, CY = 300, SQ = 0.32, D = 8;   // card seen in perspective: ellipses squashed vertically by SQ
  const qStages = [
    { title: 'A long straight wire', dur: 5, text: 'A current flows up a long straight vertical wire passing through a horizontal card.' },
    { title: 'What is asked', dur: 4, text: 'Which describes its magnetic field: straight lines, radial lines, or concentric circles?' },
  ];
  const stages = [
    { title: 'Field lines', dur: D, text: 'Small compasses on the card line up along circles centred on the wire. Right-hand thumb rule: current up → anticlockwise seen from above.', ans: '(d) Concentric circles centred on the wire.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.objFill; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.moveTo(60, CY + 40); ctx.lineTo(160, CY - 80); ctx.lineTo(560, CY - 80); ctx.lineTo(460, CY + 40); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 5; seg(ctx, CX, CY + 160, CX, CY); ctx.restore();
    const k = ans ? clamp(t / 4) : 0;
    if (ans) [50, 90, 130].forEach(r => { ctx.save(); ctx.strokeStyle = P.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(CX, CY - 20, r, r * SQ, 0, Math.PI / 2, Math.PI / 2 - 2 * Math.PI * k, true); ctx.stroke(); ctx.restore(); if (k >= 1) arrow(ctx, CX - 6, CY - 20 + r * SQ, CX + 4, CY - 20 + r * SQ, P.accent, { lw: 2, head: 10 }); });
    [[90, 0], [90, 1.6], [90, 3.2], [90, 4.7], [130, 0.8], [130, 2.4], [130, 4]].forEach(([r, a]) => { const x = CX + r * Math.cos(a), y = CY - 20 + r * SQ * Math.sin(a), tx = -Math.sin(a), ty = Math.cos(a) * SQ, L = Math.hypot(tx, ty), ang = ans ? Math.atan2(-ty, -tx) : -Math.PI / 2 + 0.3 * Math.sin(a * 3);
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = P.force; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(-2, -3); ctx.lineTo(-2, 3); ctx.closePath(); ctx.fill(); ctx.fillStyle = P.ink2; ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(-2, -3); ctx.lineTo(-2, 3); ctx.closePath(); ctx.fill(); ctx.restore(); });
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 5; seg(ctx, CX, CY - 20, CX, 60); ctx.restore();
    vec(ctx, CX + 18, 200, 0, -70, 'I', P.force, { side: -1, at: 0.5, italic: true, lw: 3 });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answer', ['(d) Concentric circles centred on the wire'], 0, false);
    else askedPanel(ctx, 630, 34, 300, ['Which option correctly describes the field near a long straight wire.']);
    note(ctx, 'card in perspective; red tip of each compass points along the field');
  }
  return { qStages, stages, draw };
})();

//@@ q05
const SCENE = (() => {
  const CX = 180, CY = 270, L = 120, G = { x: 360, y: 120, w: 200, h: 220, x0: 0, x1: 180, y0: 0, y1: 1.15, xt: [90, 180], yt: [1], xl: 'θ (°)', yl: 'F/F_max' }, D = 10;
  const qStages = [
    { title: 'A wire in a magnetic field', dur: 5, text: 'A straight wire carrying a current lies in a uniform magnetic field.' },
    { title: 'What is asked', dur: 4, text: 'When is the force on it largest?' },
  ];
  const stages = [
    { title: 'Turn the wire', dur: D, text: 'F = BIL sin θ, with θ the angle between the current and the field. Here the force points into the page.', ans: 'Zero along the field; largest at 90°.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    for (let y = 100; y <= 440; y += 48) arrow(ctx, 30, y, 330, y, P.grid, { lw: 1.5, head: 9 }); label(ctx, 'B', 330, 84, { weight: 800, size: 14, color: P.ink2, italic: true });
    const th = ans ? 180 * clamp(t / (D - 1)) : 30, a = -th * Math.PI / 180;
    ctx.save(); ctx.strokeStyle = P.obj; ctx.lineWidth = 6; seg(ctx, CX - L * Math.cos(a), CY - L * Math.sin(a), CX + L * Math.cos(a), CY + L * Math.sin(a)); ctx.restore();
    vec(ctx, CX + 0.4 * L * Math.cos(a), CY + 0.4 * L * Math.sin(a), 0.5 * L * Math.cos(a), 0.5 * L * Math.sin(a), 'I', P.force, { side: -1, at: 1, italic: true, lw: 3 });
    label(ctx, `θ = ${th.toFixed(0)}°`, CX, 470, { align: 'center', weight: 800, size: 15 });
    if (ans) {
      const f = Math.sin(th * Math.PI / 180); if (f > 0.02) fieldSym(ctx, CX - 60, CY + 70, false, 4 + 14 * f, P.accent); label(ctx, 'F (into page)', CX - 34, CY + 70, { weight: 700, size: 12, color: P.accent, alpha: f > 0.02 ? 1 : 0 });
      const g = axes(ctx, G); plot(ctx, g, x => Math.sin(x * Math.PI / 180), 0, th, P.accent); ball(ctx, g.X(th), g.Y(f), 5, P.accent);
      if (th >= 90) label(ctx, 'largest at 90°', g.X(90), g.Y(1) - 16, { align: 'center', weight: 800, size: 13, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['F = BIL sin θ: largest when the current is perpendicular to the field'], 0, false);
    } else askedPanel(ctx, 630, 34, 300, ['When the force on the conductor is largest.']);
    note(ctx, ans ? 'graph F/F_max = sin θ; symbol size shows the force' : 'schematic');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const X0 = 300, YB = 470, YF = 60, D = 8;   // top view: back wall at the bottom (YB), front wall at the top (YF)
  const qStages = [
    { title: 'An electron beam', dur: 6, text: 'You sit with your back to one wall. An electron beam moves from the back wall towards the front wall and is deflected to your right.' },
    { title: 'What is asked', dur: 4, text: 'What is the direction of the magnetic field?' },
  ];
  const stages = [
    { title: 'Current direction', dur: 5, text: 'Electrons are negative: the conventional current points from the front wall towards the back wall.', ans: '' },
    { title: 'Left-hand rule', dur: D, text: 'Thumb (force) to the right, middle finger (current) towards the back wall: the forefinger (field) points vertically down.', ans: 'B is vertically downward (into the page in this view from above).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hline(ctx, 60, 540, YB + 10, P.ink, 4); hline(ctx, 60, 540, YF - 10, P.ink, 4); label(ctx, 'back wall', 550, YB + 10, { weight: 700, size: 12 }); label(ctx, 'front wall', 550, YF - 10, { weight: 700, size: 12 });
    person(ctx, X0, YB + 4, 0.55); label(ctx, 'you (seen from above)', X0 + 30, YB - 20, { size: 12 });
    const st = ans ? stageAt(stages, t) : 1;
    if (ans && st >= 1) for (let x = 90; x <= 520; x += 60) for (let y = 110; y <= 420; y += 60) fieldSym(ctx, x, y, false, 7, P.accent);
    const s = (t * 0.25) % 1, R = 520, pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40 * 0.62; pts.push([X0 - 0 + R * (1 - Math.cos(u)), YB - 60 - R * Math.sin(u)]); }
    ray(ctx, pts, P.vel, { lw: 2 });
    const p = pts[Math.floor(s * 40)]; ball(ctx, p[0], p[1], 6, P.vel); label(ctx, 'e⁻', p[0] + 10, p[1], { weight: 800, size: 12, color: P.vel });
    vec(ctx, X0 - 40, 300, 0, -60, 'electrons', P.vel, { side: 1, at: 0.5, lw: 3, align: 'right', off: 10 });
    vec(ctx, X0 + 210, 250, 50, 0, 'force (to your right)', P.force, { side: -1, at: 0.5, lw: 3 });
    if (ans) {
      vec(ctx, X0 - 170, 240, 0, 60, 'current', P.force, { side: -1, at: 0.5, lw: 3, align: 'right', off: 10 });
      if (st >= 1) label(ctx, 'B: vertically downward (⊗)', 300, 30, { align: 'center', weight: 800, size: 15, color: P.accent });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Current: front wall → back wall', 'Left-hand rule: B vertically downward'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The direction of the magnetic field.']);
    note(ctx, 'view from above; ⊗ = into the page = vertically downward');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const BX = 300, BY = 150, D = 8;
  const qStages = [
    { title: 'A metal appliance', dur: 5, text: 'An appliance with a metal body is plugged in. Through a fault, the live wire touches its metal body.' },
    { title: 'What is asked', dur: 4, text: 'What is the function of an earth wire? Why must metal appliances be earthed?' },
  ];
  const stages = [
    { title: 'Without earthing', dur: D, text: 'The metal body is now at a high voltage. Touch it and the leakage current flows through you to the ground.', ans: 'A dangerous shock.' },
    { title: 'With earthing', dur: D, text: 'The earth wire gives the leak a low-resistance path to the ground. A large current flows, the fuse blows, and the body stays at earth potential.', ans: 'The person is safe.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    hatchRect(ctx, 20, 470, 570, 30, P.ink2, P.sand); label(ctx, 'ground', 40, 460, { weight: 700, size: 12 });
    ctx.save(); ctx.fillStyle = P.objFill2; ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.fillRect(BX - 80, BY, 160, 110); ctx.strokeRect(BX - 80, BY, 160, 110); ctx.restore(); label(ctx, 'metal body', BX, BY + 55, { align: 'center', weight: 800, size: 13 });
    wire(ctx, [[30, 80], [BX - 40, 80], [BX - 40, BY]], P.force, 3); label(ctx, 'live', 40, 66, { weight: 700, size: 12, color: P.force });
    wire(ctx, [[30, 110], [BX, 110], [BX, BY]], P.ink, 3); label(ctx, 'neutral', 40, 100, { weight: 700, size: 12 });
    ctx.save(); ctx.strokeStyle = P.force; ctx.lineWidth = 2; ctx.setLineDash([3, 3]); seg(ctx, BX - 40, BY + 4, BX - 70, BY + 30); ctx.restore(); label(ctx, 'fault', BX - 96, BY + 30, { align: 'right', size: 12, color: P.force });
    person(ctx, 470, 470, 1.1); wire(ctx, [[BX + 80, BY + 60], [455, BY + 120]], P.obj, 6);
    const st = ans ? stageAt(stages, t) : 0, earthed = st === 1;
    ctx.fillStyle = earthed && t > stages[1].t0 + 3 ? P.loss : P.ke; ctx.fillRect(100, 72, 30, 16); label(ctx, earthed && t > stages[1].t0 + 3 ? 'fuse blown' : 'fuse', 115, 62, { align: 'center', size: 11 });
    if (earthed) { wire(ctx, [[BX + 40, BY + 110], [BX + 40, 470]], P.leaf, 3); label(ctx, 'earth wire', BX + 48, 400, { weight: 700, size: 12, color: P.leaf }); }
    if (ans) {
      if (!earthed) { flow(ctx, [[BX - 40, BY], [BX + 80, BY + 60], [455, BY + 120], [470, 400], [470, 470]], t * 40, P.force, 20, 3.5); label(ctx, 'shock!', 520, 260, { weight: 800, size: 16, color: P.force }); }
      else if (t < stages[1].t0 + 3) flow(ctx, [[BX - 40, BY], [BX + 40, BY + 110], [BX + 40, 470]], t * 80, P.force, 16, 3.5);
      if (earthed) label(ctx, 'safe', 520, 260, { weight: 800, size: 16, color: P.leaf });
      partsPanel(ctx, 630, 34, 300, 'Answer', ['Unearthed: the leak passes through the person', 'Earthed: a low-resistance path to ground; fuse blows; user safe'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The function of an earth wire.', 'Why metallic appliances must be earthed.']);
    note(ctx, 'schematic');
  }
  return { qStages, stages, draw };
})();
