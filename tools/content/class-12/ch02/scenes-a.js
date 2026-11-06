//@@ q01
const SCENE = (() => {
  const G = { x: 40, y: 200, w: 520, h: 290, x0: -4, x1: 56, y0: -2, y1: 2, xt: [10, 16, 40], yt: [-1, 1], xl: 'x (cm)', yl: 'V (kV)' }, YQ = 110, D = 8;
  const V = x => clamp(45 / Math.abs(x) - 27 / Math.abs(x - 16), -2, 2);   // kV, x in cm from q₁
  const qStages = [
    { title: 'Two charges', dur: 5, text: '5 × 10⁻⁸ C and −3 × 10⁻⁸ C are 16 cm apart. The potential at infinity is zero.' },
    { title: 'What is asked', dur: 4, text: 'At what point(s) on the line joining them is the potential zero?' },
  ];
  const stages = [
    { title: 'Potential along the line', dur: D, text: 'V = kq₁/r₁ + kq₂/r₂. It is zero where 5/r₁ = 3/r₂.', ans: 'The graph crosses zero twice, both times on the side of the negative charge.' },
    { title: 'Between the charges', dur: 5, text: '5/x = 3/(16 − x).', ans: 'x = 10 cm from the positive charge.' },
    { title: 'Beyond the negative charge', dur: 5, text: '5/x = 3/(x − 16).', ans: 'x = 40 cm from the positive charge.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const X = v => G.x + (v - G.x0) / (G.x1 - G.x0) * G.w;
    hline(ctx, 30, 580, YQ, P.ink2, 1, [4, 4]);
    ball(ctx, X(0), YQ, 14, P.force); label(ctx, '+', X(0), YQ, { align: 'center', weight: 800, size: 15, color: P.sheet, halo: false }); label(ctx, '5 × 10⁻⁸ C', X(0), YQ - 28, { align: 'center', weight: 700, size: 13 });
    ball(ctx, X(16), YQ, 12, P.vel); label(ctx, '−', X(16), YQ, { align: 'center', weight: 800, size: 15, color: P.sheet, halo: false }); label(ctx, '−3 × 10⁻⁸ C', X(16), YQ - 28, { align: 'center', weight: 700, size: 13 });
    dim(ctx, X(0), X(16), YQ + 30, P.ink2); label(ctx, '16 cm', X(8), YQ + 46, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      const g = axes(ctx, G), u = clamp(t / (D - 1)), xe = G.x0 + (G.x1 - G.x0) * u;
      plot(ctx, g, V, G.x0, Math.min(xe, -0.05), P.accent); plot(ctx, g, V, 0.05, Math.min(xe, 15.95), P.accent); plot(ctx, g, V, 16.05, xe, P.accent);
      const st = stageAt(stages, t);
      [[10, 1], [40, 2]].forEach(([x, k]) => { if (st >= k) { ball(ctx, g.X(x), g.Y(0), 6, P.force); vline(ctx, X(x), YQ + 8, g.Y(0), P.force, 1.5, [3, 3]); ball(ctx, X(x), YQ, 6, P.force); label(ctx, `V = 0 at ${x} cm`, X(x), YQ + 74, { align: 'center', weight: 800, size: 13, color: P.force }); } });
      partsPanel(ctx, 630, 34, 300, 'Working', ['V = 0 where 5/r₁ = 3/r₂', 'Between: x = 10 cm', 'Beyond −q: x = 40 cm'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The point(s) on the line joining the charges where the potential is zero.']);
    note(ctx, ans ? 'graph computed from V = kq₁/r₁ + kq₂/r₂, clipped at ±2 kV' : '');
  }
  return { qStages, stages, draw };
})();

//@@ q03
const SCENE = (() => {
  const CX = 300, CY = 270, A = 90, R0 = 14;
  let lines = null;
  function E(x, y) { const ax = x - (CX - A), ay = y - CY, bx = x - (CX + A), by = y - CY, ra = Math.hypot(ax, ay) ** 3, rb = Math.hypot(bx, by) ** 3; return [ax / ra - bx / rb, ay / ra - by / rb]; }
  function build() {
    lines = [];
    for (let k = 0; k < 14; k++) {
      const a = (k + 0.5) / 14 * 2 * Math.PI; let x = CX - A + R0 * Math.cos(a), y = CY + R0 * Math.sin(a); const pts = [[x, y]];
      for (let i = 0; i < 900; i++) { const [ex, ey] = E(x, y), L = Math.hypot(ex, ey); x += 3 * ex / L; y += 3 * ey / L; pts.push([x, y]); if (Math.hypot(x - CX - A, y - CY) < R0 || x < 10 || x > 595 || y < 30 || y > 505) break; }
      lines.push(pts);
    }
  }
  const qStages = [
    { title: 'Two charges', dur: 5, text: 'Charges 2 μC and −2 μC are placed at A and B, 6 cm apart.' },
    { title: 'What is asked', dur: 4, text: '(a) Identify an equipotential surface. (b) What is the direction of the field at every point on it?' },
  ];
  const stages = [
    { title: 'The field', dur: 6, text: 'Field lines leave the positive charge and end on the negative one.', ans: '' },
    { title: 'Equipotential plane', dur: 5, text: 'Every point of the plane bisecting AB at right angles is equally far from +2 μC and −2 μC.', ans: '(a) On this plane V = kq/r − kq/r = 0: it is an equipotential surface.' },
    { title: 'Field on the plane', dur: 5, text: 'The field is always normal to an equipotential surface.', ans: '(b) Normal to the plane, parallel to AB, pointing from A to B.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    if (!lines) build();
    const st = ans ? stageAt(stages, t) : -1;
    if (ans) { ctx.save(); ctx.strokeStyle = P.ink2; ctx.lineWidth = 1.3; ctx.globalAlpha = 0.7 * clamp(t / 3); lines.forEach(pts => poly(ctx, pts)); ctx.restore(); }
    if (st >= 1) { ctx.save(); ctx.fillStyle = P.accentSoft; ctx.globalAlpha = 0.6; ctx.fillRect(CX - 10, 40, 20, 460); ctx.restore(); vline(ctx, CX, 40, 500, P.accent, 2, [6, 4]); label(ctx, 'V = 0', CX + 16, 56, { weight: 800, size: 15, color: P.accent }); }
    if (st >= 2) [-150, -100, -50, 0, 50, 100, 150].forEach(y => { const L = 80 * (A * A / (A * A + y * y)) ** 1.5; vec(ctx, CX - L / 2, CY + y, L, 0, '', P.force, { lw: 3, head: 10 }); });
    ball(ctx, CX - A, CY, 14, P.force); label(ctx, '+', CX - A, CY, { align: 'center', weight: 800, size: 15, color: P.sheet, halo: false }); label(ctx, 'A: 2 μC', CX - A, CY + 30, { align: 'center', weight: 700, size: 13 });
    ball(ctx, CX + A, CY, 14, P.vel); label(ctx, '−', CX + A, CY, { align: 'center', weight: 800, size: 15, color: P.sheet, halo: false }); label(ctx, 'B: −2 μC', CX + A, CY + 30, { align: 'center', weight: 700, size: 13 });
    if (!ans) { dim(ctx, CX - A, CX + A, CY + 60, P.ink2); label(ctx, '6 cm', CX, CY + 76, { align: 'center', weight: 700, size: 13 }); }
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['Field lines from A to B', '(a) The perpendicular bisector plane of AB: V = 0', '(b) E normal to the plane, from A towards B'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['(a) An equipotential surface of the system.', '(b) The direction of the electric field at every point on that surface.']);
    note(ctx, ans ? 'field lines computed from the two charges; arrows on the plane to scale with each other' : '');
  }
  return { qStages, stages, draw };
})();

//@@ q04
const SCENE = (() => {
  const SX = 150, SY = 230, S = 7, R = 12 * S, G = { x: 330, y: 70, w: 230, h: 300, x0: 0, x1: 30, y0: 0, y1: 1.2, xt: [12, 18, 30], yt: [0.44, 1], xl: 'r (cm)', yl: 'E (10⁵ N/C)' };
  const Ef = r => r < 12 ? 0 : (12 / r) ** 2;   // in units of 10⁵ N/C
  const qStages = [
    { title: 'A charged sphere', dur: 5, text: 'A spherical conductor of radius 12 cm carries 1.6 × 10⁻⁷ C spread uniformly over its surface.' },
    { title: 'What is asked', dur: 4, text: 'What is the field (a) inside, (b) just outside, (c) 18 cm from the centre?' },
  ];
  const stages = [
    { title: 'Inside', dur: 4, text: 'Inside a conductor the electrostatic field is zero.', ans: '(a) E = 0.' },
    { title: 'Just outside', dur: 5, text: 'Outside, the sphere acts as a point charge at its centre: E = kQ/r².', ans: '(b) E = 9 × 10⁹ × 1.6 × 10⁻⁷/0.12² = 10⁵ N/C.' },
    { title: 'At 18 cm', dur: 5, text: 'E falls as 1/r².', ans: '(c) E = 9 × 10⁹ × 1.6 × 10⁻⁷/0.18² ≈ 4.4 × 10⁴ N/C.' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    ctx.save(); ctx.fillStyle = P.objFill; ctx.beginPath(); ctx.arc(SX, SY, R, 0, 2 * Math.PI); ctx.fill(); ctx.strokeStyle = P.obj; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    for (let i = 0; i < 16; i++) { const a = i / 16 * 2 * Math.PI; label(ctx, '+', SX + (R - 9) * Math.cos(a), SY + (R - 9) * Math.sin(a), { align: 'center', weight: 800, size: 12, color: P.force, halo: false }); }
    ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.5; seg(ctx, SX, SY, SX - R * 0.71, SY + R * 0.71); ctx.restore(); label(ctx, '12 cm', SX - 50, SY + 32, { align: 'right', weight: 700, size: 12 });
    const p18 = [SX + 18 * S, SY]; ball(ctx, ...p18, 5, P.ink); vline(ctx, SX, SY + R + 14, SY + R + 30, P.ink2, 1); dim(ctx, SX, p18[0], SY + R + 22, P.ink2); label(ctx, '18 cm', (SX + p18[0]) / 2, SY + R + 38, { align: 'center', weight: 700, size: 12 });
    label(ctx, 'Q = 1.6 × 10⁻⁷ C', SX, SY - R - 22, { align: 'center', weight: 700, size: 13 });
    if (ans) {
      const st = stageAt(stages, t);
      ball(ctx, SX + 30, SY - 30, 5, P.ink); label(ctx, 'E = 0', SX + 30, SY - 48, { align: 'center', weight: 800, size: 13, color: P.accent });
      if (st >= 1) { const a = -Math.PI / 4, x = SX + (R + 4) * Math.cos(a), y = SY + (R + 4) * Math.sin(a); vec(ctx, x, y, 60 * Math.cos(a), 60 * Math.sin(a), '10⁵ N/C', P.force, { side: -1, at: 1, size: 12 }); }
      if (st >= 2) vec(ctx, p18[0], p18[1], 0.44 * 60, 0, '4.4 × 10⁴', P.force, { side: -1, at: 1, size: 12, ax: 14 });
      const g = axes(ctx, G), u = clamp((t - stages[0].t0) / (stages[2].t1 - 2));
      plot(ctx, g, Ef, 0, Math.min(30 * u, 11.99), P.accent); if (30 * u > 12) { vline(ctx, g.X(12), g.Y(0), g.Y(1), P.accent, 1.5, [3, 3]); plot(ctx, g, Ef, 12, 30 * u, P.accent); }
      if (st >= 2) { ball(ctx, g.X(18), g.Y(Ef(18)), 5, P.force); hline(ctx, g.X(0), g.X(18), g.Y(Ef(18)), P.force, 1, [3, 3]); }
      partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) Inside: E = 0', '(b) Just outside: 10⁵ N/C', '(c) At 18 cm: 4.4 × 10⁴ N/C'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The electric field (a) inside the sphere, (b) just outside it, (c) at a point 18 cm from the centre.']);
    note(ctx, ans ? 'sphere 7 px per cm; field arrows to scale with each other' : 'sphere 7 px per cm');
  }
  return { qStages, stages, draw };
})();

//@@ q06
const SCENE = (() => {
  const XL = 90, XR = 510, YT = 160, YB = 380, CXS = [190, 300, 410];
  const qStages = [
    { title: 'Three capacitors in series', dur: 5, text: 'Three 9 pF capacitors are connected in series.' },
    { title: 'What is asked', dur: 4, text: '(a) The total capacitance. (b) The potential difference across each when connected to 120 V.' },
  ];
  const stages = [
    { title: 'Series combination', dur: 5, text: '1/C = 1/C₁ + 1/C₂ + 1/C₃.', ans: '(a) 1/C = 3/9, so C = 3 pF.' },
    { title: 'Same charge on each', dur: 5, text: 'In series every capacitor carries the same charge Q = CV.', ans: 'Q = 3 pF × 120 V = 360 pC on each.' },
    { title: 'Voltage across each', dur: 5, text: 'V = Q/C for each one.', ans: '(b) 360 pC / 9 pF = 40 V across each (40 + 40 + 40 = 120 V).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const pts = [XL, ...CXS.flatMap(x => [x - 30, x + 30]), XR];
    for (let i = 0; i < pts.length; i += 2) wire(ctx, [[pts[i], YT], [pts[i + 1], YT]]);
    CXS.forEach(x => { capacitor(ctx, x - 30, YT, x + 30, YT, P.ink, 12, 26); label(ctx, '9 pF', x, YT - 44, { align: 'center', weight: 700, size: 14 }); });
    wire(ctx, [[XL, YT], [XL, YB], [260, YB]]); wire(ctx, [[340, YB], [XR, YB], [XR, YT]]); cell(ctx, 260, YB, 340, YB);
    label(ctx, '+', 290, YB - 26, { align: 'center', weight: 800, size: 15, color: P.force }); label(ctx, '120 V', 300, YB + 34, { align: 'center', weight: 700, size: 14 });
    if (ans) {
      const st = stageAt(stages, t);
      if (st >= 0) label(ctx, 'C = 3 pF', 300, 260, { align: 'center', weight: 800, size: 18, color: P.accent });
      if (st >= 1) CXS.forEach(x => { label(ctx, '+Q', x - 18, YT + 40, { align: 'center', weight: 800, size: 13, color: P.force }); label(ctx, '−Q', x + 18, YT + 40, { align: 'center', weight: 800, size: 13, color: P.vel }); });
      if (st >= 1) label(ctx, 'Q = 360 pC on each', 300, 290, { align: 'center', weight: 700, size: 14 });
      if (st >= 2) CXS.forEach(x => label(ctx, '40 V', x, YT - 70, { align: 'center', weight: 800, size: 15, color: P.accent }));
      partsPanel(ctx, 630, 34, 300, 'Working', ['(a) 1/C = 3/9 → C = 3 pF', 'Q = 3 pF × 120 V = 360 pC', '(b) V = 360/9 = 40 V each'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['(a) The total capacitance.', '(b) The potential difference across each capacitor on a 120 V supply.']);
  }
  return { qStages, stages, draw };
})();

//@@ q07
const SCENE = (() => {
  const XL = 100, YT = 120, YB = 360, CS = [[220, 2], [340, 3], [460, 4]];
  const qStages = [
    { title: 'Three capacitors in parallel', dur: 5, text: 'Capacitors of 2 pF, 3 pF and 4 pF are connected in parallel.' },
    { title: 'What is asked', dur: 4, text: '(a) The total capacitance. (b) The charge on each when connected to 100 V.' },
  ];
  const stages = [
    { title: 'Parallel combination', dur: 5, text: 'In parallel the capacitances add.', ans: '(a) C = 2 + 3 + 4 = 9 pF.' },
    { title: 'Charge on each', dur: 6, text: 'Each capacitor has the full 100 V across it: Q = CV.', ans: '(b) 200 pC, 300 pC and 400 pC (2, 3 and 4 × 10⁻¹⁰ C).' },
  ];
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    wire(ctx, [[XL, 200], [XL, YT], [460, YT]]); wire(ctx, [[XL, 280], [XL, YB], [460, YB]]); cell(ctx, XL, 200, XL, 280);
    label(ctx, '+', XL + 24, 214, { weight: 800, size: 15, color: P.force }); label(ctx, '100 V', XL - 20, 240, { align: 'right', weight: 700, size: 14 });
    const st = ans ? stageAt(stages, t) : -1;
    CS.forEach(([x, c]) => {
      capacitor(ctx, x, YT, x, YB, P.ink, 14, 34); label(ctx, `${c} pF`, x + 44, (YT + YB) / 2, { weight: 700, size: 14 });
      if (st >= 1) { const n = c, f = clamp((t - stages[1].t0) / 2); for (let i = 0; i < n; i++) { const xx = x - (n - 1) * 8 + i * 16; label(ctx, '+', xx, (YT + YB) / 2 - 22, { align: 'center', weight: 800, size: 14, color: P.force, alpha: f }); label(ctx, '−', xx, (YT + YB) / 2 + 24, { align: 'center', weight: 800, size: 14, color: P.vel, alpha: f }); }
        label(ctx, `${c * 100} pC`, x, YB + 28, { align: 'center', weight: 800, size: 14, color: P.accent }); }
    });
    if (st >= 0) label(ctx, 'C = 9 pF', 340, 430, { align: 'center', weight: 800, size: 18, color: P.accent });
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['(a) C = 9 pF', '(b) Q = CV: 200, 300, 400 pC'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['(a) The total capacitance.', '(b) The charge on each capacitor on a 100 V supply.']);
    if (ans) note(ctx, '+ signs in proportion to the charge');
  }
  return { qStages, stages, draw };
})();

//@@ q09
const SCENE = (() => {
  const D = 7;
  const qStages = [
    { title: 'The capacitor of Ex. 2.8', dur: 5, text: '17.7 pF (A = 6 × 10⁻³ m², d = 3 mm, air), charged on a 100 V supply.' },
    { title: 'Insert mica', dur: D, text: 'A 3 mm mica sheet (K = 6) is slid in: (a) with the supply still connected, (b) after the supply is disconnected.' },
    { title: 'What is asked', dur: 4, text: 'Explain what happens in each case.' },
  ];
  const stages = [
    { title: 'Capacitance rises', dur: D, text: 'The sheet fills the gap: C = KC₀ = 6 × 17.7 pF ≈ 106 pF in both cases.', ans: 'C: 17.7 pF → 106 pF.' },
    { title: '(a) Supply connected', dur: 5, text: 'The supply keeps V = 100 V, so more charge flows on.', ans: 'Q = 106 pF × 100 V ≈ 1.06 × 10⁻⁸ C (six times).' },
    { title: '(b) Supply disconnected', dur: 5, text: 'The charge has nowhere to go: Q stays 1.77 × 10⁻⁹ C.', ans: 'V = Q/C = 100/6 ≈ 16.7 V; the field falls six times too.' },
  ];
  function panel(ctx, x0, which, ins, ans, st) {
    const PX = x0 + 90, GAP = 70, Y0 = 110, H = 150, conn = which === 'a';
    label(ctx, which === 'a' ? '(a) supply connected' : '(b) supply disconnected', x0 + 135, 54, { align: 'center', weight: 800, size: 14 });
    ctx.save(); ctx.fillStyle = P.wood; ctx.globalAlpha = 0.8; ctx.fillRect(PX + 4, Y0 + H * (1 - ins), GAP - 8, H * ins); ctx.restore();
    ctx.fillStyle = P.obj; ctx.fillRect(PX - 6, Y0, 6, H); ctx.fillRect(PX + GAP, Y0, 6, H);
    if (ins > 0.3) label(ctx, 'mica', PX + GAP / 2, Y0 + H - 16, { align: 'center', weight: 700, size: 12 });
    if (conn) { wire(ctx, [[PX - 6, Y0 + H / 2], [PX - 40, Y0 + H / 2], [PX - 40, Y0 + H + 50], [PX + GAP / 2 - 6, Y0 + H + 50]]); wire(ctx, [[PX + GAP / 2 + 6, Y0 + H + 50], [PX + GAP + 46, Y0 + H + 50], [PX + GAP + 46, Y0 + H / 2], [PX + GAP + 6, Y0 + H / 2]]); cell(ctx, PX + GAP / 2 - 6, Y0 + H + 50, PX + GAP / 2 + 6, Y0 + H + 50); label(ctx, '100 V', PX + GAP / 2, Y0 + H + 80, { align: 'center', weight: 700, size: 13 }); }
    else { wire(ctx, [[PX - 6, Y0 + H / 2], [PX - 30, Y0 + H / 2]]); wire(ctx, [[PX + GAP + 6, Y0 + H / 2], [PX + GAP + 30, Y0 + H / 2]]); label(ctx, 'open', PX + GAP / 2, Y0 + H + 50, { align: 'center', size: 12, color: P.ink2 }); }
    if (!ans) return;
    const C = 17.7 * (1 + 5 * ins), Q = conn ? C * 100 : 1770, V = Q / C;   // pF, pC, V
    const rows = [['C', C / 106.2, `${C.toFixed(1)} pF`, P.accent], ['Q', Q / 10620, Q >= 9999 ? `${(Q / 1000).toFixed(1)} nC` : `${(Q / 1000).toFixed(2)} nC`, P.force], ['V', V / 100, `${V.toFixed(1)} V`, P.vel]];
    rows.forEach(([n, f, s, col], i) => { const y = 380 + i * 34; label(ctx, n, x0 + 20, y + 8, { weight: 800, size: 14, italic: true }); ctx.fillStyle = col; ctx.fillRect(x0 + 40, y, 150 * f, 16); label(ctx, s, x0 + 48 + 150 * f, y + 8, { weight: 700, size: 12 }); });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1); vline(ctx, 305, 40, 500, P.rule, 1);
    const ins = ans ? clamp(t / (D - 1)) : clamp((t - qStages[0].dur) / (D - 1));
    const st = ans ? stageAt(stages, t) : -1;
    panel(ctx, 10, 'a', ins, ans && st >= 0, st); panel(ctx, 310, 'b', ins, ans && st >= 0, st);
    if (ans) partsPanel(ctx, 630, 34, 300, 'Answers', ['C rises 6 times: 106 pF', '(a) V = 100 V, Q → 1.06 × 10⁻⁸ C', '(b) Q = 1.77 × 10⁻⁹ C, V → 16.7 V'], st, false);
    else askedPanel(ctx, 630, 34, 300, ['What happens when the mica sheet is inserted (a) with the supply connected, (b) after it is disconnected.']);
    if (ans) note(ctx, 'bars in proportion within each quantity; each panel starts at 17.7 pF, 1.77 nC, 100 V');
  }
  return { qStages, stages, draw };
})();

//@@ q11
const SCENE = (() => {
  const Y0 = 130, H = 140, P1 = 150, P2 = 410, GAP = 50, D = 6;
  const qStages = [
    { title: 'A charged capacitor', dur: 5, text: 'A 600 pF capacitor is charged by a 200 V supply, then disconnected.' },
    { title: 'Join an empty one', dur: 5, text: 'It is connected to another uncharged 600 pF capacitor.' },
    { title: 'What is asked', dur: 4, text: 'How much electrostatic energy is lost?' },
  ];
  const stages = [
    { title: 'Before', dur: 5, text: 'Q = CV = 1.2 × 10⁻⁷ C.', ans: 'U₁ = ½CV² = ½ × 600 × 10⁻¹² × 200² = 1.2 × 10⁻⁵ J.' },
    { title: 'Charge shared', dur: D, text: 'Charge flows until both are at the same voltage: V = Q/(C₁ + C₂).', ans: 'V = 1.2 × 10⁻⁷/1200 × 10⁻¹² = 100 V.' },
    { title: 'After', dur: 5, text: 'U₂ = ½(C₁ + C₂)V².', ans: 'U₂ = ½ × 1200 × 10⁻¹² × 100² = 6 × 10⁻⁶ J. Lost: 6 × 10⁻⁶ J.' },
  ];
  function cap(ctx, x, n, name) {
    ctx.fillStyle = P.obj; ctx.fillRect(x - 4, Y0, 8, H); ctx.fillRect(x + GAP - 4, Y0, 8, H);
    for (let i = 0; i < n; i++) { const y = Y0 + 14 + i * (H - 28) / 5; label(ctx, '+', x - 14, y, { align: 'center', weight: 800, size: 13, color: P.force }); label(ctx, '−', x + GAP + 14, y, { align: 'center', weight: 800, size: 13, color: P.vel }); }
    label(ctx, name, x + GAP / 2, Y0 + H + 20, { align: 'center', weight: 700, size: 13 });
  }
  function draw(ctx, t, ans) {
    bg(ctx); vline(ctx, 610, 16, 524, P.rule, 1);
    const join = ans ? clamp((t - stages[1].t0) / 1.2) : clamp((t - qStages[0].dur) / 1.2), flow = ans ? clamp((t - stages[1].t0 - 1) / (D - 2)) : 0;
    const n1 = Math.round(6 - 3 * flow), n2 = Math.round(3 * flow);
    cap(ctx, P1, n1, '600 pF'); cap(ctx, P2, n2, '600 pF');
    const yw1 = Y0 - 40, yw2 = Y0 + H + 40;
    wire(ctx, [[P1 - 4, Y0], [P1 - 4, yw1], [P1 - 4 + (P2 - P1) * join, yw1]]); wire(ctx, [[P1 + GAP + 4, Y0 + H], [P1 + GAP + 4, yw2], [P1 + GAP + 4 + (P2 - P1) * join, yw2]]);
    if (join >= 1) { wire(ctx, [[P2 - 4, yw1], [P2 - 4, Y0]]); wire(ctx, [[P2 + GAP + 4, yw2], [P2 + GAP + 4, Y0 + H]]); }
    if (!ans && t < qStages[0].dur) label(ctx, '200 V', P1 + GAP / 2, Y0 + H / 2, { align: 'center', weight: 800, size: 14, color: P.accent });
    if (ans) {
      const st = stageAt(stages, t), V1 = 200 - 100 * flow, V2 = 100 * flow;   // V = q/C, linear in the charge moved
      label(ctx, `${V1.toFixed(0)} V`, P1 + GAP / 2, Y0 + H / 2, { align: 'center', weight: 800, size: 14, color: P.accent }); label(ctx, `${V2.toFixed(0)} V`, P2 + GAP / 2, Y0 + H / 2, { align: 'center', weight: 800, size: 14, color: P.accent });
      const BX = 120, BY = 400, f = flow / 2, U = 12 * ((1 - f) ** 2 + f * f);   // μJ: U = (Q − q)²/2C + q²/2C
      label(ctx, 'stored energy', 24, BY - 20, { weight: 700, size: 13 });
      ctx.fillStyle = P.pe; ctx.fillRect(BX, BY, 30 * U, 22); label(ctx, `${U.toFixed(1)} μJ`, BX + 368, BY + 11, { weight: 700, size: 13 });
      if (st >= 2) { ctx.save(); ctx.fillStyle = P.loss; ctx.globalAlpha = 0.5; ctx.fillRect(BX + 180, BY, 180, 22); ctx.restore(); label(ctx, 'lost 6 μJ', BX + 270, BY + 40, { align: 'center', weight: 800, size: 14, color: P.loss }); }
      partsPanel(ctx, 630, 34, 300, 'Working', ['U₁ = ½CV² = 1.2 × 10⁻⁵ J', 'Common V = 100 V', 'U₂ = 6 × 10⁻⁶ J; lost 6 × 10⁻⁶ J'], st, false);
    } else askedPanel(ctx, 630, 34, 300, ['The electrostatic energy lost when the charged 600 pF capacitor is joined to the uncharged one.']);
    if (ans) note(ctx, '+ signs in proportion to the charge; energy bar 30 px per μJ');
  }
  return { qStages, stages, draw };
})();
