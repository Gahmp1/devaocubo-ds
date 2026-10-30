/* Orb de espera: nuvem de pontos em canvas, uma geometria por estado. Implementação própria do padrão "thinking orb". */
(function () {
  const TAU = Math.PI * 2;
  const fib = (n) => { const a = [], g = Math.PI * (3 - Math.sqrt(5)); for (let i = 0; i < n; i++) { const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = g * i; a.push([Math.cos(th) * r, y, Math.sin(th) * r]); } return a; };
  const SPH = fib(200);
  const RING = Array.from({ length: 44 }, (_, i) => (i / 44) * TAU);
  const smooth = (x) => x * x * (3 - 2 * x);
  const cube = (p) => { const m = Math.max(Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2])); return [p[0] / m, p[1] / m, p[2] / m]; };
  const rot = (p, ay, ax) => {
    const cy = Math.cos(ay), sy = Math.sin(ay), x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy;
    const cx = Math.cos(ax), sx = Math.sin(ax);
    return [x, p[1] * cx - z * sx, p[1] * sx + z * cx];
  };

  function geometry(s, t) {
    const out = [];
    if (s === 'working') {
      const r = 1 + 0.04 * Math.sin(t * 3);
      for (const p of SPH) { const q = rot(p, t * 0.9, 0.45); out.push([q[0] * r, q[1] * r, q[2] * r, 0]); }
    } else if (s === 'searching') {
      const band = Math.sin(t * 1.5) * 0.9;
      for (const p of SPH) { const q = rot(p, t * 0.5, 0.35); out.push([q[0], q[1], q[2], Math.max(0, 1 - Math.abs(p[1] - band) / 0.22)]); }
    } else if (s === 'solving') {
      const m = smooth((Math.sin(t * 1.1) + 1) / 2);
      for (const p of SPH) { const c = cube(p); const a = [p[0] + (c[0] * 0.85 - p[0]) * m, p[1] + (c[1] * 0.85 - p[1]) * m, p[2] + (c[2] * 0.85 - p[2]) * m]; const q = rot(a, t * 0.7, 0.5); out.push([q[0], q[1], q[2], m > 0.6 ? 0.35 : 0]); }
    } else if (s === 'listening') {
      const amp = 0.5 + 0.5 * Math.sin(t * 2.3);
      for (const p of SPH) { const lon = Math.atan2(p[2], p[0]), d = 1 + 0.28 * amp * Math.sin(lon * 4 + t * 6) * Math.cos(p[1] * 1.4) + 0.1 * Math.sin(p[1] * 6 - t * 4); const q = rot([p[0] * d, p[1] * d, p[2] * d], t * 0.3, 0.3); out.push([q[0], q[1], q[2], Math.abs(p[1]) < 0.12 ? 0.7 : 0]); }
    } else if (s === 'waiting') {
      const r = 0.78 + 0.14 * Math.sin(t * 1.5);
      for (const p of SPH) { const q = rot(p, t * 0.25, 0.4); out.push([q[0] * r, q[1] * r, q[2] * r, 0]); }
    } else {
      const head = (t * 3) % TAU;
      for (const a of RING) { const d = (((head - a) % TAU) + TAU) % TAU; out.push([Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0, Math.max(0, 1 - d / (Math.PI * 1.4))]); }
    }
    return out;
  }

  const orbs = new Set();
  class Orb {
    constructor(canvas, size, state) {
      this.c = canvas; this.size = size; this.state = state || 'working'; this.speed = 1;
      this.prev = null; this.pos = []; this.sw = -1e9; this.vis = true; this.t0 = performance.now();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * d; canvas.height = size * d; canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
      this.d = d; this.x = canvas.getContext('2d'); this.ink = '#fff'; this.acc = '#0f0'; this.cc = 0;
      this.px = 0; this.py = 0; this.ax = 0; this.ay = 0; this.act = 0; this.tgt = 0; // reação ao ponteiro (acréscimo do site)
      orbs.add(this);
      if ('IntersectionObserver' in window) new IntersectionObserver((e) => { this.vis = e[0].isIntersecting; }).observe(canvas);
    }
    aim(ux, uy) { if (ux == null) { this.tgt = 0; return; } this.tgt = 1; this.ax = Math.max(-1.6, Math.min(1.6, ux)); this.ay = Math.max(-1.6, Math.min(1.6, uy)); }
    destroy() { orbs.delete(this); }
    set(state) { if (state === this.state) return; this.prev = this.pos; this.state = state; this.sw = performance.now(); }
    draw(now) {
      if (now - this.cc > 400) { const cs = getComputedStyle(this.c); this.ink = cs.color; this.acc = cs.getPropertyValue('--accent').trim() || this.ink; this.cc = now; }
      const t = LAB.reduced ? 1.2 : ((now - this.t0) / 1000) * this.speed;
      const raw = geometry(this.state, t), k = Math.min(1, (now - this.sw) / 450), e = smooth(k);
      let pts = raw, fade = 1;
      if (this.prev && k < 1) {
        if (this.prev.length === raw.length) pts = raw.map((p, i) => [this.prev[i][0] + (p[0] - this.prev[i][0]) * e, this.prev[i][1] + (p[1] - this.prev[i][1]) * e, this.prev[i][2] + (p[2] - this.prev[i][2]) * e, p[3]]);
        else fade = e;
      }
      // inclina a esfera na direção do ponteiro, afasta e acende os pontos próximos dele
      this.act += (this.tgt - this.act) * 0.08;
      this.px += ((this.tgt ? this.ax : 0) * 0.45 - this.px) * 0.06;
      this.py += ((this.tgt ? this.ay : 0) * 0.35 - this.py) * 0.06;
      if (Math.abs(this.px) + Math.abs(this.py) > 0.002 || this.act > 0.01) {
        pts = pts.map((p) => {
          const q = rot(p, this.px, -this.py), d = Math.hypot(q[0] - this.ax, q[1] - this.ay);
          if (d < 0.55 && this.act > 0.01) { const f = ((0.55 - d) / 0.55) * 0.35 * this.act / (d || 1); return [q[0] + (q[0] - this.ax) * f, q[1] + (q[1] - this.ay) * f, q[2], Math.max(p[3], (1 - d / 0.55) * this.act)]; }
          return [q[0], q[1], q[2], p[3]];
        });
      }
      this.pos = pts;
      const x = this.x, S = this.size * this.d, R = S * 0.4, base = (this.size / 60 + 0.55) * this.d;
      x.clearRect(0, 0, S, S);
      const order = pts.slice().sort((a, b) => a[2] - b[2]);
      for (const p of order) {
        const depth = Math.min(1, Math.max(0, (p[2] + 1.3) / 2.6)), hl = p[3];
        x.globalAlpha = (0.22 + 0.78 * depth) * (hl > 0.05 ? 1 : 0.95) * fade;
        x.fillStyle = hl > 0.05 ? this.acc : this.ink;
        x.beginPath(); x.arc(S / 2 + p[0] * R, S / 2 + p[1] * R, base * (0.5 + 0.75 * depth) * (1 + hl * 0.7), 0, TAU); x.fill();
      }
      x.globalAlpha = 1;
    }
  }
  let started = false;
  function loop(now) {
    for (const o of orbs) if (o.vis) o.draw(now);
    if (!LAB.reduced) requestAnimationFrame(loop);
  }
  Orb.start = () => { if (started) return; started = true; requestAnimationFrame(loop); if (LAB.reduced) setTimeout(() => orbs.forEach((o) => o.draw(performance.now())), 60); };
  Orb.STATES = ['working', 'searching', 'solving', 'listening', 'waiting', 'retrying'];
  window.Orb = Orb;
})();
