/* Marca: campo de pontos reativo ao ponteiro, títulos cinéticos, shimmer e marquee. */
(function () {
  const cv = document.getElementById('field');
  if (cv) {
    const x = cv.getContext('2d'); let W = 0, H = 0, d = 1, mx = -999, my = -999, vis = true, cc = '', ink = '#fff', acc = '#0f0', ct = 0;
    const GAP = 24;
    function size() { const r = cv.getBoundingClientRect(); d = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; }
    size(); addEventListener('resize', size);
    cv.parentElement.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    cv.parentElement.addEventListener('pointerleave', () => { mx = my = -999; });
    new IntersectionObserver((e) => { vis = e[0].isIntersecting; }).observe(cv);
    const frame = (now) => {
      if (vis) {
        if (now - ct > 500) { const cs = getComputedStyle(document.documentElement); ink = cs.getPropertyValue('--mut').trim(); acc = cs.getPropertyValue('--accent').trim(); ct = now; }
        const t = now / 1000; x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, W, H);
        for (let gx = GAP / 2; gx < W; gx += GAP) for (let gy = GAP / 2; gy < H; gy += GAP) {
          const dx = gx - mx, dy = gy - my, dist = Math.sqrt(dx * dx + dy * dy), k = Math.max(0, 1 - dist / 150);
          const wave = 0.5 + 0.5 * Math.sin(gx * 0.018 + gy * 0.012 - t * 0.9);
          const px = gx + (dx / (dist || 1)) * k * 14, py = gy + (dy / (dist || 1)) * k * 14;
          x.globalAlpha = 0.14 + wave * 0.16 + k * 0.7; x.fillStyle = k > 0.05 ? acc : ink;
          x.beginPath(); x.arc(px, py, 1.2 + k * 2.4, 0, 6.2832); x.fill();
        }
        x.globalAlpha = 1;
      }
      if (!LAB.reduced) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  /* títulos cinéticos */
  const kin = document.getElementById('kin'); if (!kin) return;
  let variant = 'rise', tmr = 0;
  const GL = '▮▯▰▱#%&*+=/<>';
  function text() { return LAB.c().head.join(' '); }
  function split() {
    const raw = text(), m = raw.match(/[.,!?]+$/), tail = m ? m[0] : '', core = raw.replace(/[.,!?]+$/, '');
    return { core, tail: tail || '.' };
  }
  function play() {
    clearInterval(tmr); const { core, tail } = split();
    const dot = '<span class="dot">' + tail + '</span>';
    if (variant === 'scramble') {
      kin.innerHTML = ''; const total = core.length; let n = 0;
      if (LAB.reduced) { kin.innerHTML = core + dot; return; }
      tmr = setInterval(() => {
        n += 1; const done = Math.floor((n / 22) * total);
        kin.textContent = core.split('').map((ch, i) => (ch === ' ' || i < done ? ch : GL[Math.floor(Math.random() * GL.length)])).join('');
        if (done >= total) { clearInterval(tmr); kin.innerHTML = core + dot; }
      }, 40);
      return;
    }
    if (variant === 'rise') {
      const nw = core.split(' ').length;
      kin.innerHTML = core.split(' ').map((w, i) => '<span class="w"' + (i === nw - 1 ? ' style="margin-right:0"' : '') + '><span style="transform:translateY(110%);transition:transform .7s cubic-bezier(.2,.8,.2,1) ' + i * 90 + 'ms">' + w + '</span></span>').join('') + dot;
      requestAnimationFrame(() => requestAnimationFrame(() => kin.querySelectorAll('.w>span').forEach((s) => { s.style.transform = 'none'; })));
      return;
    }
    kin.innerHTML = core.split('').map((ch, i) => ch === ' ' ? ' ' : '<span class="ch" style="transform:translateY(.5em) rotate(8deg);transition:opacity .5s ' + i * 26 + 'ms,transform .6s cubic-bezier(.2,.8,.2,1) ' + i * 26 + 'ms">' + ch + '</span>').join('') + dot;
    requestAnimationFrame(() => requestAnimationFrame(() => kin.querySelectorAll('.ch').forEach((s) => { s.style.opacity = 1; s.style.transform = 'none'; })));
  }
  document.querySelectorAll('#kin-pills button').forEach((b) => b.addEventListener('click', () => {
    variant = b.dataset.v; document.querySelectorAll('#kin-pills button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); play();
  }));
  const rp = document.getElementById('kin-replay'); rp && rp.addEventListener('click', play);
  document.addEventListener('lab:product', () => { play(); fill(); });
  function fill() {
    const n = LAB.names[LAB.cur()], sh = document.getElementById('shim'); if (sh) sh.textContent = n.toLowerCase();
    const mq = document.getElementById('marq-in');
    if (mq) { const w = LAB.c().head.concat([n]); const unit = w.map((s) => '<span>' + s + '</span>').join('').repeat(2); mq.innerHTML = '<div>' + unit + unit + '</div>'; }
  }
  play(); fill();
})();
