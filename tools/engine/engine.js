/* Physics animation engine: drawing kit, two-run player (question / worked solution) and one-screen layout.
   A question page defines `const SCENE = { qStages, stages, draw }` and calls Engine.mount(SCENE).
   Scenes draw on a 960 x 540 canvas: draw(ctx, t, ans), where ans = true in the solution run. */
'use strict';
/* ---------- shared drawing kit ---------- */
const VW = 960, VH = 540;
const FB = '"Atkinson Hyperlegible", "Segoe UI", system-ui, -apple-system, sans-serif';
const FD = '"Archivo", "Arial Narrow", "Segoe UI", system-ui, sans-serif';
const TOK = ['sheet', 'ink', 'ink-2', 'rule', 'grid', 'grid-2', 'accent', 'accent-ink', 'accent-soft', 'vel', 'force', 'drag', 'disp',
  'ke', 'ke-soft', 'pe', 'loss', 'obj', 'obj-fill', 'obj-fill-2', 'wood', 'road', 'acc', 'sand', 'leaf', 'bark', 'water'];
let P = {};
function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  const o = {};
  for (const k of TOK) o[k.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())] = cs.getPropertyValue('--' + k).trim();
  P = o;
}

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ramp = (t, a, b) => clamp((t - a) / (b - a));
const smooth = u => { u = clamp(u); return u * u * (3 - 2 * u); };
// steady motion with a brief speed-up and slow-down at the ends: position (0..1) and speed (0..1 of the steady speed)
const glide = (u, r = 0.1) => {
  u = clamp(u); const vm = 1 / (1 - r);
  if (u < r) return 0.5 * vm * u * u / r;
  if (u > 1 - r) return 1 - 0.5 * vm * (1 - u) * (1 - u) / r;
  return vm * (u - r / 2);
};
const glideRate = (u, r = 0.1) => (u <= 0 || u >= 1 ? 0 : u < r ? u / r : u > 1 - r ? (1 - u) / r : 1);
// split text into lines that fit a width, in the body font
function wrapLines(ctx, str, maxW, size, weight = 400) {
  ctx.save(); ctx.font = `${weight} ${size}px ${FB}`;
  const lines = []; let cur = '';
  for (const w of str.split(' ')) {
    const t = cur ? cur + ' ' + w : w;
    if (cur && ctx.measureText(t).width > maxW) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  ctx.restore(); return lines;
}
// question mode (before Show answers): the panel lists only what the question asks
function askedPanel(ctx, x, y, w, items) {
  label(ctx, 'What is asked', x, y, { weight: 700, size: 16 });
  let yy = y + 32;
  for (const it of items) {
    const lines = wrapLines(ctx, it, w, 14);
    lines.forEach((ln, j) => label(ctx, ln, x, yy + j * 19, { size: 14, halo: false }));
    yy += lines.length * 19 + 12;
  }
}
// question mode: a large prompt when the question gives no situation to draw
function qText(ctx, lines, cx = 255, cy = 270) {
  lines.forEach((ln, i) => label(ctx, ln, cx, cy + (i - (lines.length - 1) / 2) * 34, { align: 'center', weight: 700, size: 22, display: true }));
}

function seg(ctx, x1, y1, x2, y2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
function poly(ctx, pts) {
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
}
function hline(ctx, x1, x2, y, color, lw = 1, dash) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash);
  seg(ctx, x1, y, x2, y); ctx.restore();
}
function vline(ctx, x, y1, y2, color, lw = 1, dash) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash);
  seg(ctx, x, y1, x, y2); ctx.restore();
}
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
}
function arrow(ctx, x1, y1, x2, y2, color, o = {}) {
  const lw = o.lw ?? 4, head = o.head ?? 14, alpha = o.alpha ?? 1;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
  if (len < 1 || alpha <= 0) return;
  const ux = dx / len, uy = dy / len;
  const h = Math.min(head, len * 0.7), w = h * 0.52;
  const bx = x2 - ux * h, by = y2 - uy * h;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'butt';
  seg(ctx, x1, y1, bx + ux, by + uy);
  ctx.beginPath(); ctx.moveTo(x2, y2);
  ctx.lineTo(bx - uy * w, by + ux * w); ctx.lineTo(bx + uy * w, by - ux * w);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}
function label(ctx, str, x, y, o = {}) {
  const size = o.size ?? 16, weight = o.weight ?? 400, alpha = o.alpha ?? 1;
  ctx.save();
  ctx.font = `${o.italic ? 'italic ' : ''}${weight} ${size}px ${o.display ? FD : FB}`;
  const w = ctx.measureText(str).width;
  if (alpha > 0 && str) {
    ctx.globalAlpha *= alpha;
    ctx.textAlign = o.align ?? 'left';
    ctx.textBaseline = 'middle';
    if (o.halo !== false) {
      ctx.lineJoin = 'round'; ctx.lineWidth = o.haloW ?? 5; ctx.strokeStyle = o.haloColor ?? P.sheet;
      ctx.strokeText(str, x, y);
    }
    ctx.fillStyle = o.color ?? P.ink;
    ctx.fillText(str, x, y);
  }
  ctx.restore();
  return w;
}
function labelSub(ctx, main, sub, x, y, o = {}) {
  const size = o.size ?? 16, small = Math.round(size * 0.7);
  ctx.save();
  ctx.font = `700 ${size}px ${FB}`; const w1 = ctx.measureText(main).width;
  ctx.font = `700 ${small}px ${FB}`; const w2 = ctx.measureText(sub).width;
  ctx.restore();
  const x0 = o.align === 'center' ? x - (w1 + w2 + 1) / 2 : o.align === 'right' ? x - (w1 + w2 + 1) : x;
  label(ctx, main, x0, y, { ...o, weight: 700, align: 'left', italic: true });
  label(ctx, sub, x0 + w1 + 1, y + size * 0.3, { ...o, weight: 700, size: small, align: 'left' });
}
function dim(ctx, x1, x2, y, color, alpha = 1) {
  if (alpha <= 0 || Math.abs(x2 - x1) < 2) return;
  const dir = Math.sign(x2 - x1), h = 9;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5;
  seg(ctx, x1, y, x2, y);
  seg(ctx, x1, y - 8, x1, y + 8); seg(ctx, x2, y - 8, x2, y + 8);
  ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1 + dir * h, y - 4.5); ctx.lineTo(x1 + dir * h, y + 4.5); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x2, y); ctx.lineTo(x2 - dir * h, y - 4.5); ctx.lineTo(x2 - dir * h, y + 4.5); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function hatchRect(ctx, x, y, w, h, color, bg) {
  if (h <= 0.2) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.fillStyle = bg; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = color; ctx.lineWidth = 2;
  for (let k = -h; k < w + h; k += 8) seg(ctx, x + k, y + h, x + k + h, y);
  ctx.restore();
}
function rotArrow(ctx, x, y, r, cw, color, alpha = 1, lw = 2) {
  if (alpha <= 0) return;
  const a0 = cw ? -0.85 * Math.PI : -0.15 * Math.PI, a1 = cw ? -0.15 * Math.PI : -0.85 * Math.PI;
  const dir = cw ? 1 : -1;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.arc(x, y, r, a0, a1, !cw); ctx.stroke();
  const ex = x + r * Math.cos(a1), ey = y + r * Math.sin(a1);
  const tx = -Math.sin(a1) * dir, ty = Math.cos(a1) * dir;
  const h = Math.min(14, Math.max(6, r * 0.42)), w = h * 0.6;
  ctx.beginPath();
  ctx.moveTo(ex + tx * h, ey + ty * h);
  ctx.lineTo(ex - ty * w, ey + tx * w);
  ctx.lineTo(ex + ty * w, ey - tx * w);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}
function bg(ctx) { ctx.fillStyle = P.sheet; ctx.fillRect(0, 0, VW, VH); }

/* ---------- common shapes ---------- */
function ground(ctx, x1, x2, y) {                 // a hatched floor line
  hline(ctx, x1, x2, y, P.obj, 2);
  ctx.save(); ctx.strokeStyle = P.ink2; ctx.globalAlpha = 0.45; ctx.lineWidth = 1;
  for (let x = x1 + 6; x < x2; x += 16) seg(ctx, x, y + 1, x - 9, y + 10);
  ctx.restore();
}
function vdim(ctx, x, y1, y2, color, alpha = 1) {  // vertical dimension line with arrowheads
  if (alpha <= 0 || Math.abs(y2 - y1) < 2) return;
  const d = Math.sign(y2 - y1);
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5;
  seg(ctx, x, y1, x, y2); seg(ctx, x - 7, y1, x + 7, y1); seg(ctx, x - 7, y2, x + 7, y2);
  ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x - 4.5, y1 + d * 9); ctx.lineTo(x + 4.5, y1 + d * 9); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x, y2); ctx.lineTo(x - 4.5, y2 - d * 9); ctx.lineTo(x + 4.5, y2 - d * 9); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function ball(ctx, x, y, r, fill) {               // a shaded ball
  ctx.fillStyle = fill || P.obj; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.globalAlpha = 0.4; ctx.fillStyle = P.sheet;
  ctx.beginPath(); ctx.arc(x - r * 0.33, y - r * 0.33, r * 0.32, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function block(ctx, x, y, w, h, text, fill) {     // a crate with an optional centred label; (x, y) = top-left
  ctx.fillStyle = fill || P.wood; ctx.strokeStyle = P.obj; ctx.lineWidth = 2;
  ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h);
  if (text) label(ctx, text, x + w / 2, y + h / 2, { align: 'center', weight: 700, size: 14, haloColor: fill || P.wood });
}
function spring(ctx, x1, y1, x2, y2, coils = 10, amp = 8, color) {   // a zig-zag spring between two points
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  ctx.save(); ctx.strokeStyle = color || P.obj; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.beginPath();
  const lead = Math.min(10, L * 0.1); ctx.moveTo(x1, y1); ctx.lineTo(x1 + ux * lead, y1 + uy * lead);
  const n = coils * 2;
  for (let i = 1; i < n; i++) { const f = lead + (L - 2 * lead) * i / n, s = i % 2 ? amp : -amp; ctx.lineTo(x1 + ux * f + nx * s, y1 + uy * f + ny * s); }
  ctx.lineTo(x2 - ux * lead, y2 - uy * lead); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
}
function person(ctx, x, yf, k = 1, color) {       // a standing stick figure, feet at (x, yf)
  const p = (dx, dy) => [x + dx * k, yf + dy * k];
  ctx.save(); ctx.strokeStyle = color || P.obj; ctx.fillStyle = color || P.obj; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.lineWidth = 7 * k; poly(ctx, [p(-7, 0), p(0, -34), p(7, 0)]);
  ctx.lineWidth = 10 * k; poly(ctx, [p(0, -34), p(0, -70)]);
  ctx.lineWidth = 6 * k; poly(ctx, [p(-12, -40), p(0, -64), p(12, -40)]);
  const h = p(0, -84); ctx.beginPath(); ctx.arc(h[0], h[1], 11 * k, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
function trail(ctx, pts, color, alpha = 0.35) {   // a faint path through a list of [x, y] points
  if (pts.length < 2) return;
  ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color || P.ink2; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); poly(ctx, pts); ctx.restore();
}
/* ---------- graphs, parts, forces ---------- */
// axes for a graph inside the box (x, y, w, h); returns {X, Y} mapping data values to pixels
function axes(ctx, o) {
  const { x, y, w, h, x0 = 0, x1, y0 = 0, y1 } = o;
  const X = v => x + (v - x0) / (x1 - x0) * w, Y = v => y + h - (v - y0) / (y1 - y0) * h;
  const zx = clamp(X(0), x, x + w), zy = clamp(Y(0), y, y + h);
  arrow(ctx, x, zy, x + w + 14, zy, P.ink2, { lw: 1.5, head: 8 });
  arrow(ctx, zx, y + h, zx, y - 14, P.ink2, { lw: 1.5, head: 8 });
  for (const v of o.xt || []) { vline(ctx, X(v), zy, zy + 5, P.ink2, 1.2); label(ctx, String(v), X(v), zy + 15, { align: 'center', size: 12, color: P.ink2 }); }
  for (const v of o.yt || []) { hline(ctx, zx - 5, zx, Y(v), P.ink2, 1.2); label(ctx, String(v), zx - 8, Y(v), { align: 'right', size: 12, color: P.ink2 }); }
  if (o.xl) label(ctx, o.xl, x + w + 18, zy, { size: 12, color: P.ink2 });
  if (o.yl) label(ctx, o.yl, zx, y - 24, { align: 'center', size: 12, color: P.ink2 });
  return { X, Y };
}
// a labelled force (or any vector) arrow from (x, y) by (dx, dy)
function vec(ctx, x, y, dx, dy, text, color, o = {}) {
  arrow(ctx, x, y, x + dx, y + dy, color, { lw: o.lw ?? 4, head: o.head ?? 12, alpha: o.alpha ?? 1 });
  if (text) {
    const L = Math.hypot(dx, dy) || 1, px = -dy / L, py = dx / L, off = o.off ?? 14;
    label(ctx, text, x + dx * (o.at ?? 1) + (o.side ?? 1) * px * off + (o.ax ?? 0), y + dy * (o.at ?? 1) + (o.side ?? 1) * py * off + (o.ay ?? 0),
      { align: o.align ?? 'center', color, weight: 700, size: o.size ?? 14, italic: o.italic, alpha: o.alpha ?? 1 });
  }
}
// plot y = f(x) on axes g (from axes()) for x in [a, b]
function plot(ctx, g, f, a, b, color, lw = 3, n = 240) {
  if (b <= a) return;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, y = f(x); if (i) ctx.lineTo(g.X(x), g.Y(y)); else ctx.moveTo(g.X(x), g.Y(y)); }
  ctx.stroke(); ctx.restore();
}
// a smooth curve through [x, y, slope] points (cubic Hermite); straight lines beyond the ends
function hermite(pts) {
  return x => {
    if (x <= pts[0][0]) return pts[0][1] + pts[0][2] * (x - pts[0][0]);
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0, m0] = pts[i], [x1, y1, m1] = pts[i + 1];
      if (x <= x1) { const h = x1 - x0, s = (x - x0) / h, s2 = s * s, s3 = s2 * s; return (2 * s3 - 3 * s2 + 1) * y0 + (s3 - 2 * s2 + s) * h * m0 + (-2 * s3 + 3 * s2) * y1 + (s3 - s2) * h * m1; }
    }
    const L = pts[pts.length - 1]; return L[1] + L[2] * (x - L[0]);
  };
}
// index of the stage that time t falls in (the last one after the end)
/* ---------- circuit symbols ---------- */
// a wire through a list of points
function wire(ctx, pts, color, lw = 2) { ctx.save(); ctx.strokeStyle = color || P.ink; ctx.lineWidth = lw; ctx.lineJoin = 'round'; poly(ctx, pts); ctx.restore(); }
// an element between (x1, y1) and (x2, y2): its symbol sits at the middle, wires fill the rest
function circEl(ctx, x1, y1, x2, y2, half, body, color) {
  const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L, mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  wire(ctx, [[x1, y1], [mx - ux * half, my - uy * half]], color); wire(ctx, [[mx + ux * half, my + uy * half], [x2, y2]], color);
  ctx.save(); ctx.translate(mx, my); ctx.rotate(Math.atan2(uy, ux)); ctx.strokeStyle = color || P.ink; ctx.fillStyle = color || P.ink; ctx.lineCap = 'butt'; body(); ctx.restore();
}
function resistor(ctx, x1, y1, x2, y2, color) {
  circEl(ctx, x1, y1, x2, y2, 24, () => { ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-24, 0); for (let i = 0; i < 6; i++) ctx.lineTo(-20 + i * 8, i % 2 ? 8 : -8); ctx.lineTo(24, 0); ctx.stroke(); }, color);
}
function capacitor(ctx, x1, y1, x2, y2, color, gap = 10, ph = 20) {
  circEl(ctx, x1, y1, x2, y2, gap / 2, () => { ctx.lineWidth = 4; seg(ctx, -gap / 2, -ph, -gap / 2, ph); seg(ctx, gap / 2, -ph, gap / 2, ph); }, color);
}
// a cell: the long thin plate (+) is on the (x1, y1) side
function cell(ctx, x1, y1, x2, y2, color) {
  circEl(ctx, x1, y1, x2, y2, 4, () => { ctx.lineWidth = 2; seg(ctx, -4, -16, -4, 16); ctx.lineWidth = 5; seg(ctx, 4, -8, 4, 8); }, color);
}
// dots `gap` px apart moving along the polyline pts; s = distance moved so far (px); use it to show current or charge flow
function flow(ctx, pts, s, color, gap = 26, r = 3) {
  const L = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  if (tot <= 0) return;
  ctx.save(); ctx.fillStyle = color || P.vel;
  for (let d = ((s % gap) + gap) % gap; d < tot; d += gap) {
    let k = 0, e = d; while (k < L.length - 1 && e > L[k]) { e -= L[k]; k++; }
    const f = L[k] ? e / L[k] : 0, x = pts[k][0] + (pts[k + 1][0] - pts[k][0]) * f, y = pts[k][1] + (pts[k + 1][1] - pts[k][1]) * f;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill();
  }
  ctx.restore();
}
// a field (or current) direction symbol: out of the page ⊙ (out = true) or into it ⊗
function fieldSym(ctx, x, y, out, r = 7, color) {
  ctx.save(); ctx.strokeStyle = color || P.ink; ctx.fillStyle = color || P.ink; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.stroke();
  if (out) { ctx.beginPath(); ctx.arc(x, y, Math.max(1.6, r * 0.25), 0, 2 * Math.PI); ctx.fill(); }
  else { const d = r * 0.62; seg(ctx, x - d, y - d, x + d, y + d); seg(ctx, x - d, y + d, x + d, y - d); }
  ctx.restore();
}
function stageAt(stages, t) { const i = stages.findIndex(s => t < s.t1); return i < 0 ? stages.length - 1 : i; }
// a stopwatch-style time readout
function clock(ctx, x, y, t, text) {
  ctx.save(); ctx.strokeStyle = P.ink2; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.stroke();
  const a = -Math.PI / 2 + (t % 60) / 60 * Math.PI * 2; seg(ctx, x, y, x + 10 * Math.cos(a), y + 10 * Math.sin(a)); ctx.restore();
  label(ctx, text ?? `t = ${t.toFixed(1)} s`, x + 22, y, { weight: 700, size: 15 });
}
// right-hand list of a question's parts: the current one highlighted; with answers, each reached part shows its answer
function partsPanel(ctx, x, y, w, title, parts, k, ans, answers) {
  label(ctx, title, x, y, { weight: 700, size: 16 });
  let yy = y + 30;
  parts.forEach((pt, i) => {
    const lines = wrapLines(ctx, pt, w - 12, 14), al = ans && answers && i <= k ? wrapLines(ctx, answers[i], w - 12, 13, 700) : [];
    const h = lines.length * 18 + al.length * 17 + 10;
    if (i === k) { ctx.fillStyle = P.accentSoft; rrect(ctx, x - 8, yy - 10, w + 8, h, 6); ctx.fill(); }
    lines.forEach((ln, j) => label(ctx, ln, x, yy + 2 + j * 18, { size: 14, color: i === k ? P.ink : P.ink2, halo: false }));
    al.forEach((ln, j) => label(ctx, ln, x, yy + 4 + lines.length * 18 + j * 17, { size: 13, weight: 700, color: P.accent, halo: false }));
    yy += h + 8;
  });
}
// stage list helper for questions made of separate parts: one stage per part, same duration
function partStages(titles, texts, dur, anss) {
  return titles.map((title, i) => ({ title, dur, text: texts[i], ...(anss ? { ans: anss[i] } : {}) }));
}
function note(ctx, str, y = 528) { label(ctx, str, 24, y, { size: 12, color: P.ink2 }); }   // a footnote line at the bottom left

/* ---------- player: a pure function of time, so stepping and scrubbing are exact ---------- */
const ICON = {
  play: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9.5-5.5z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" fill="currentColor"/></svg>',
  prev: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2.5h2v11H3zM14 2.5v11L6 8z" fill="currentColor"/></svg>',
  next: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M11 2.5h2v11h-2zM2 2.5v11L10 8z" fill="currentColor"/></svg>',
  restart: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.2V0L4.6 3 8 6V3.8a4.2 4.2 0 1 1-4.2 4.2H2.2A5.8 5.8 0 1 0 8 2.2z" fill="currentColor"/></svg>',
  eye: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M8 3C4.6 3 1.8 5.2.5 8c1.3 2.8 4.1 5 7.5 5s6.2-2.2 7.5-5C14.2 5.2 11.4 3 8 3zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm0 1.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4z" fill="currentColor"/></svg>',
};
// control bar directly under the picture: everything a teacher presses while presenting
function transportHTML(id) {
  return `
    <div class="transport">
      <button type="button" class="btn icon" data-act="restart" aria-label="Restart" title="Restart">${ICON.restart}</button>
      <button type="button" class="btn icon" data-act="prev" aria-label="Previous step" title="Previous step">${ICON.prev}</button>
      <button type="button" class="btn primary" data-act="play" aria-label="Play">${ICON.play}<span>Play</span></button>
      <button type="button" class="btn icon" data-act="next" aria-label="Next step" title="Next step">${ICON.next}</button>
      <ol class="steps" aria-label="Steps"></ol>
      <input type="range" class="scrub" id="scrub-${id}" min="0" max="1000" step="1" value="0" aria-label="Animation position">
      <button type="button" class="btn reveal" data-act="answers" aria-pressed="false">${ICON.eye}<span>Show answers</span></button>
    </div>`;
}
// text column beside the picture: step caption, answer line and the less-used options
function sideHTML(id) {
  return `
    <div class="cap" aria-live="polite">
      <p class="cap-step">Step <span data-k="n">1</span> of <span data-k="of"></span></p>
      <h2 class="cap-title" data-k="title"></h2>
      <p class="cap-text" data-k="text"></p>
      <p class="cap-ans" data-k="ansbox" hidden><span class="tag">Answer</span><span data-k="ans"></span></p>
    </div>
    <div class="opts">
      <label class="opt" for="speed-${id}">Speed
        <select id="speed-${id}"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option></select>
      </label>
      <label class="opt" for="stop-${id}"><input type="checkbox" id="stop-${id}">Pause after each step</label>
      <button type="button" class="linkish" data-act="worked" hidden>Full worked answer ↓</button>
    </div>`;
}
function makePlayer(panel, scene) {
  panel.querySelector('.ctl').outerHTML = transportHTML(panel.id);
  panel.querySelector('.side').insertAdjacentHTML('beforeend', sideHTML(panel.id));
  const q = s => panel.querySelector(s);
  const canvas = q('canvas'), ctx = canvas.getContext('2d');
  const ui = {
    play: q('[data-act="play"]'), prev: q('[data-act="prev"]'), next: q('[data-act="next"]'), restart: q('[data-act="restart"]'),
    scrub: q('.scrub'), speed: q('select'), stop: q('input[type="checkbox"]'),
    n: q('[data-k="n"]'), of: q('[data-k="of"]'), title: q('[data-k="title"]'), text: q('[data-k="text"]'), steps: q('.steps'),
    answers: q('[data-act="answers"]'), ansBox: q('[data-k="ansbox"]'), ansText: q('[data-k="ans"]'), sheet: q('.answer'),
    worked: q('[data-act="worked"]'),
  };
  // two timelines: the question as given (qStages, first run) and the worked solution (stages, after Show answers)
  let st = [], total = 0, chips = [];
  let t = 0, playing = false, last = 0, raf = 0, cur = -1, ans = false;   // answers always start hidden
  function useStages(list) {
    st = list;
    let acc = 0;
    for (const s of st) { s.t0 = acc; acc += s.dur; s.t1 = acc; }
    total = acc;
    ui.of.textContent = st.length;
    ui.steps.classList.toggle('many', st.length > 6);
    ui.steps.textContent = '';
    chips = st.map((s, k) => {
      const li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.textContent = String(k + 1);
      b.title = s.title; b.setAttribute('aria-label', `Step ${k + 1}: ${s.title}`);
      b.addEventListener('click', () => seek(s.t0));
      li.appendChild(b); ui.steps.appendChild(li);
      return b;
    });
    cur = -1;
  }
  useStages(scene.qStages || scene.stages);
  const stageAt = x => { for (let i = 0; i < st.length; i++) if (x < st[i].t1) return i; return st.length - 1; };
  function fit() {
    const w = canvas.clientWidth;
    if (!w) return false;
    const dpr = Math.min(2.5, window.devicePixelRatio || 1);
    const W = Math.round(w * dpr), H = Math.round(w * dpr * VH / VW);
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    return true;
  }
  function render() {
    if (!fit()) return;
    const sc = canvas.width / VW;
    ctx.setTransform(sc, 0, 0, sc, 0, 0);
    scene.draw(ctx, t, ans);
    const i = stageAt(t);
    if (i !== cur) {
      cur = i;
      ui.n.textContent = i + 1; ui.title.textContent = st[i].title; ui.text.textContent = st[i].text;
      ui.ansText.textContent = st[i].ans || '';
      ui.ansBox.hidden = !(ans && st[i].ans);
      chips.forEach((b, k) => { if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
    }
    ui.scrub.value = Math.round(t / total * 1000);
  }
  function setPlayUI() {
    const word = playing ? 'Pause' : t >= total - 1e-6 ? 'Replay' : 'Play';
    ui.play.innerHTML = (playing ? ICON.pause : ICON.play) + `<span>${word}</span>`;
    ui.play.setAttribute('aria-label', word);
  }
  function loop(now) {
    if (!playing) return;
    const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
    last = now;
    const nt = t + dt * parseFloat(ui.speed.value);
    const i = stageAt(t);
    if (ui.stop.checked && i < st.length - 1 && nt >= st[i].t1) { t = st[i].t1 - 1e-4; pause(); render(); return; }
    if (nt >= total) { t = total; pause(); render(); return; }
    t = nt; render();
    raf = requestAnimationFrame(loop);
  }
  function play() {
    if (playing) return;
    if (t >= total - 1e-6) t = 0;
    const i = stageAt(t);
    if (i < st.length - 1 && st[i].t1 - t < 2e-4) t = st[i].t1;   // resume after a step pause
    playing = true; last = performance.now(); setPlayUI();
    raf = requestAnimationFrame(loop);
  }
  function pause() { playing = false; cancelAnimationFrame(raf); setPlayUI(); }
  function setAnswers(on) {
    ans = on;
    ui.answers.setAttribute('aria-pressed', String(on));
    ui.answers.querySelector('span').textContent = on ? 'Hide answers' : 'Show answers';
    if (ui.sheet) ui.sheet.hidden = !on;
    ui.worked.hidden = !(on && ui.sheet);
    if (scene.qStages) { pause(); useStages(on ? scene.stages : scene.qStages); t = 0; setPlayUI(); }   // each run starts from the beginning
    cur = -1; render();
  }
  function toggle() { playing ? pause() : play(); }
  function seek(x) { t = clamp(x, 0, total); render(); setPlayUI(); }
  function next() { const i = stageAt(t); seek(i < st.length - 1 ? st[i + 1].t0 : total); }
  function prev() { const i = stageAt(t); seek(t - st[i].t0 > 0.6 || i === 0 ? st[i].t0 : st[i - 1].t0); }
  ui.play.addEventListener('click', toggle);
  ui.next.addEventListener('click', next);
  ui.prev.addEventListener('click', prev);
  ui.restart.addEventListener('click', () => { seek(0); play(); });
  ui.answers.addEventListener('click', () => setAnswers(!ans));
  ui.worked.addEventListener('click', () => ui.sheet.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  ui.scrub.addEventListener('input', () => { pause(); seek(ui.scrub.value / 1000 * total); });
  const stage = q('.stage');
  stage.addEventListener('click', toggle);
  stage.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  });
  if ('ResizeObserver' in window) new ResizeObserver(() => render()).observe(canvas);
  else window.addEventListener('resize', render);
  setPlayUI();
  return { render, pause, toggle, next, prev };
}

/* ---------- page wiring (one question per page) ---------- */
const Engine = {
  mount(scene) {
    readPalette();
    const panel = document.getElementById('q');
    const player = makePlayer(panel, scene);
    function fitBench() {                        // fit the picture and its control bar inside the window
      const stage = panel.querySelector('.stage'), bar = panel.querySelector('.transport');
      const root = document.documentElement.style;
      for (let pass = 0; pass < 2; pass++) {
        const top = stage.getBoundingClientRect().top + window.scrollY;
        root.setProperty('--chrome', Math.round(top + bar.offsetHeight + 38) + 'px');
        root.setProperty('--bar', Math.round(bar.offsetHeight + 30) + 'px');
      }
    }
    let fitRaf = 0;
    window.addEventListener('resize', () => { cancelAnimationFrame(fitRaf); fitRaf = requestAnimationFrame(fitBench); });
    document.addEventListener('keydown', e => {
      if (e.target !== document.body) return;
      if (e.key === ' ') { e.preventDefault(); player.toggle(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); player.next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); player.prev(); }
    });
    const refresh = () => { readPalette(); fitBench(); player.render(); };
    const mq = matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', refresh); else if (mq.addListener) mq.addListener(refresh);
    new MutationObserver(refresh).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
    fitBench(); player.render();
    if (document.fonts) {
      Promise.all([document.fonts.load(`400 16px ${FB}`), document.fonts.load(`700 16px ${FB}`), document.fonts.load(`800 16px ${FD}`)]).catch(() => {}).then(refresh);
      document.fonts.ready.then(refresh);
    }
  },
};
