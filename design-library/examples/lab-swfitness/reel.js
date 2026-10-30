/* Estúdio de reels: cada template é uma função de t (segundos). Mesmo desenho pode virar Remotion depois. */
(function () {
  const stage = document.getElementById('rstage'); if (!stage) return;
  const $ = (id) => document.getElementById(id);
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const eo = (x) => 1 - Math.pow(1 - x, 3);
  const eb = (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const lerp = (a, b, k) => a + (b - a) * k;
  function E(css, html, parent) { const e = document.createElement('div'); e.style.cssText = 'position:absolute;' + (css || ''); if (html != null) e.innerHTML = html; (parent || stage).appendChild(e); return e; }
  function caps(text, a, b) {
    const w = text.split(' '), g = []; for (let i = 0; i < w.length; i += 3) g.push(w.slice(i, i + 3));
    const d = (b - a) / g.length; return g.map((x, i) => ({ a: a + i * d, b: a + (i + 1) * d, w: x }));
  }
  const fit = (lines, W) => Math.min(46, Math.floor(W / (Math.max(...lines.map((l) => l.length)) * 0.62)));

  const TPL = {
    story(c) {
      const sz = fit(c.hook, 312), lh = Math.round(sz * 1.3);
      const hook = c.hook.map((l, i) => { const w = E('left:24px;right:24px;top:' + (170 + i * lh) + 'px;height:' + lh + 'px;overflow:hidden'); const s = E('left:0;top:0;white-space:nowrap;font-weight:800;font-size:' + sz + 'px;line-height:' + lh + 'px;letter-spacing:-.03em;' + (i === 2 ? 'color:var(--accent)' : ''), l, w); return { w, s }; });
      const ph = E('left:62px;top:120px;width:236px;height:370px;border:1px solid var(--line);border-radius:30px;background:var(--card);padding:22px 16px;display:flex;flex-direction:column;gap:12px');
      const card = E('position:relative;display:flex;align-items:center;gap:10px;border:1px solid var(--line);border-radius:16px;padding:12px;background:var(--card2)', '<canvas class="orb"></canvas><b style="font-size:13px;font-weight:700;white-space:nowrap"></b>', ph); card.style.position = 'relative';
      const lab = card.querySelector('b'); const orb = new Orb(card.querySelector('canvas'), 40, 'working'); Orb.start();
      const cp = [0, 1, 2].map((i) => E('position:relative;border:1px solid var(--line);border-radius:12px;padding:10px 12px;font-size:12px;color:var(--mut);display:flex;gap:8px;align-items:center', '<span style="width:8px;height:8px;border-radius:50%;background:var(--accent)"></span>' + LAB.c().chat.steps[i], ph));
      cp.forEach((e) => { e.style.position = 'relative'; });
      const num = E('left:0;right:0;top:190px;text-align:center;font-weight:800;font-size:160px;line-height:1;letter-spacing:-.05em;color:var(--accent);font-variant-numeric:tabular-nums');
      const sl = E('left:30px;right:30px;top:370px;text-align:center;font-weight:700;font-size:20px;line-height:1.25', c.stat[1]);
      const bar = E('left:30px;top:350px;height:4px;background:var(--fg);width:0');
      const fl = E('inset:0;background:var(--accent);color:var(--accent-fg)');
      const brand = E('left:0;right:0;top:190px;text-align:center;font-weight:800;font-size:40px;letter-spacing:-.03em', LAB.names[LAB.cur()].toLowerCase() + '<span style="opacity:.6">.</span>', fl);
      const tag = E('left:30px;right:30px;top:260px;text-align:center;font-weight:700;font-size:20px;line-height:1.2', c.hook.slice(0, 2).join(' ') + '.', fl);
      const btn = E('left:50%;top:340px;transform:translateX(-50%);background:var(--accent-fg);color:var(--accent);border-radius:999px;padding:14px 26px;font-weight:700;font-size:15px;white-space:nowrap', c.cta, fl);
      const hd = E('left:0;right:0;top:405px;text-align:center;font-family:var(--mono);font-size:13px;opacity:.75', c.handle, fl);
      const wipes = [3.0, 8.0].map(() => E('inset:0;background:var(--accent);z-index:7'));
      return {
        dur: 15, caps: caps(c.cap, 3.2, 14),
        upd(t) {
          hook.forEach((h, i) => { h.s.style.transform = 'translateY(' + (1 - eo(seg(t, 0.15 + i * 0.25, 0.85 + i * 0.25))) * 110 + '%)'; });
          const ho = 1 - seg(t, 2.7, 3.2); hook.forEach((h) => { h.w.style.opacity = ho; });
          ph.style.transform = 'translateY(' + ((1 - eo(seg(t, 3.1, 3.8))) * 520 - eo(seg(t, 7.7, 8.2)) * 60) + 'px)'; ph.style.opacity = 1 - seg(t, 7.8, 8.2);
          const full = c.demo, n = Math.floor(seg(t, 3.9, 5.5) * full.length); lab.textContent = full.slice(0, n);
          orb.set(t < 4.8 ? 'working' : t < 6.4 ? 'searching' : 'solving');
          cp.forEach((e, i) => { const k = eb(seg(t, 5.7 + i * 0.5, 6.1 + i * 0.5)); e.style.opacity = clamp(k); e.style.transform = 'scale(' + (0.8 + 0.2 * k) + ')'; });
          const k = eo(seg(t, 8.3, 9.3)); num.textContent = Math.round(c.stat[0] * k); num.style.opacity = seg(t, 8.1, 8.4) * (1 - seg(t, 11.0, 11.5));
          sl.style.opacity = seg(t, 9.2, 9.7) * (1 - seg(t, 11.0, 11.5)); bar.style.width = eo(seg(t, 9.3, 10)) * 120 + 'px'; bar.style.opacity = 1 - seg(t, 11.0, 11.5);
          fl.style.clipPath = 'circle(' + eo(seg(t, 11.5, 12.3)) * 150 + '% at 50% 100%)';
          btn.style.transform = 'translateX(-50%) scale(' + (1 + 0.05 * Math.sin(t * 6) * seg(t, 12.6, 12.8)) + ')';
          wipes.forEach((w, i) => { const cut = [3.0, 8.0][i], p = seg(t, cut - 0.25, cut + 0.25); w.style.opacity = p > 0 && p < 1 ? 1 : 0; w.style.transform = 'translateX(' + (-100 + 200 * eio(p)) + '%)'; });
        }
      };
    },
    ba(c) {
      const left = E('inset:0;background:var(--bg)');
      E('left:24px;top:104px;font-family:var(--mono);font-size:12px;letter-spacing:.14em;color:#ff7a7a', 'ANTES', left);
      const msgs = ['Estou analisando…', 'Quase lá!', 'Só mais um instante…', 'Estamos finalizando…', 'Preparando!'];
      msgs.forEach((m, i) => E('left:' + (24 + (i % 2) * 40) + 'px;top:' + (150 + i * 52) + 'px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:9px 13px;font-size:13px;color:var(--mut)', m, left));
      const right = E('inset:0;background:var(--bg)');
      E('left:24px;top:104px;font-family:var(--mono);font-size:12px;letter-spacing:.14em;color:var(--accent)', 'DEPOIS', right);
      const cd = E('left:24px;right:24px;top:210px;border:1px solid var(--line);border-radius:var(--radius);background:var(--card);padding:18px;display:flex;gap:14px;align-items:center', '<canvas class="orb"></canvas><div style="display:flex;flex-direction:column;gap:2px"><b style="font-size:16px">' + c.demo + '</b><span style="font-size:12px;color:var(--mut)">' + LAB.c().chat.sub[0] + '</span></div>', right);
      cd.style.display = 'flex'; const orb = new Orb(cd.querySelector('canvas'), 52, 'working'); Orb.start();
      const line = E('top:0;bottom:0;width:2px;background:var(--accent);z-index:6');
      const hnd = E('top:300px;width:26px;height:26px;margin-left:-12px;border-radius:50%;background:var(--accent);z-index:6');
      const cta = E('left:50%;top:470px;transform:translateX(-50%);background:var(--accent);color:var(--accent-fg);border-radius:999px;padding:12px 24px;font-weight:700;font-size:14px;white-space:nowrap;z-index:6', c.cta);
      return {
        dur: 10, caps: caps(c.cap, 3.2, 9),
        upd(t) {
          const p = eio(seg(t, 3, 6)); right.style.clipPath = 'inset(0 ' + (1 - p) * 100 + '% 0 0)';
          line.style.left = p * 360 + 'px'; hnd.style.left = p * 360 + 'px'; line.style.opacity = hnd.style.opacity = p > 0 && p < 1 ? 1 : 0;
          orb.set(t < 6.5 ? 'working' : 'searching');
          const k = eb(seg(t, 7.6, 8.2)); cta.style.opacity = clamp(k); cta.style.transform = 'translateX(-50%) scale(' + (0.8 + 0.2 * k) + ')';
          left.style.opacity = 0.4 + 0.6 * (1 - p);
        }
      };
    },
    list(c) {
      const hd = E('left:24px;right:24px;top:104px;font-weight:800;font-size:22px;letter-spacing:-.02em;line-height:1.1', '3 coisas para largar<span class="dot">.</span>');
      const starts = [1.2, 4.2, 7.2];
      const it = c.list.map((l, i) => ({ n: E('left:24px;top:170px;font-weight:800;font-size:150px;line-height:1;letter-spacing:-.05em;color:var(--accent)', String(i + 1)), x: E('left:24px;right:24px;top:340px;font-weight:800;font-size:34px;line-height:1.08;letter-spacing:-.03em', l) }));
      const fin = E('left:24px;right:24px;top:230px;font-weight:800;font-size:34px;line-height:1.1;letter-spacing:-.03em', 'Faça diferente.');
      const cta = E('left:24px;top:330px;background:var(--accent);color:var(--accent-fg);border-radius:999px;padding:13px 24px;font-weight:700;font-size:15px;white-space:nowrap', c.cta);
      return {
        dur: 12, caps: caps(c.list.join('. ') + '. ' + c.cta, 1.4, 11),
        upd(t) {
          hd.style.opacity = eo(seg(t, 0, 0.6));
          it.forEach((o, i) => {
            const s = starts[i], inn = eb(seg(t, s, s + 0.55)), out = seg(t, s + 2.6, s + 3.0);
            o.n.style.opacity = clamp(inn) * (1 - out); o.n.style.transform = 'scale(' + (1.6 - 0.6 * inn) + ') translateX(' + -out * 30 + 'px)'; o.n.style.transformOrigin = 'left center';
            o.x.style.opacity = eo(seg(t, s + 0.2, s + 0.6)) * (1 - out); o.x.style.transform = 'translateY(' + (1 - eo(seg(t, s + 0.2, s + 0.7))) * 30 + 'px) translateX(' + -out * 30 + 'px)';
          });
          const f = eo(seg(t, 10.2, 10.8)); fin.style.opacity = f; fin.style.transform = 'translateY(' + (1 - f) * 20 + 'px)';
          const k = eb(seg(t, 10.7, 11.3)); cta.style.opacity = clamp(k); cta.style.transform = 'scale(' + (0.8 + 0.2 * k) + ')'; cta.style.transformOrigin = 'left center';
        }
      };
    },
    zoom(c) {
      const s = LAB.c().screens, world = E('left:0;top:0;width:360px;height:640px;transform-origin:0 0');
      E('left:24px;top:100px;font-weight:800;font-size:26px;letter-spacing:-.02em', s.title, world);
      const hc = E('left:24px;top:150px;width:312px;height:120px;border:1px solid var(--line);border-radius:var(--radius);background:var(--card);padding:16px', '<span style="font-size:12px;color:var(--mut)">' + s.hero.l + '</span><div style="font-weight:800;font-size:32px;color:var(--accent);margin-top:6px;letter-spacing:-.03em">' + LAB.fmt(s.hero.v, s.hero.f) + '</div>', world);
      s.rows.forEach((r, i) => E('left:24px;top:' + (292 + i * 54) + 'px;width:312px;height:46px;border:1px solid var(--line);border-radius:12px;background:var(--card);padding:0 14px;display:flex;align-items:center;justify-content:space-between;font-size:13px', '<b>' + r[0] + '</b><span style="color:var(--mut)">' + r[2] + '</span>', world));
      E('left:24px;top:460px;width:174px;height:44px;border-radius:999px;background:var(--fg);color:var(--bg);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px', 'Confirmar', world);
      const rA = E('left:210px;top:178px;width:86px;height:56px;border:2px solid var(--accent);border-radius:14px', '', world), rB = E('left:20px;top:456px;width:182px;height:52px;border:2px solid var(--accent);border-radius:26px', '', world);
      const lA = E('left:150px;top:244px;background:var(--accent);color:var(--accent-fg);border-radius:8px;padding:5px 9px;font-size:11px;font-weight:700;white-space:nowrap', 'Tudo num olhar', world), lB = E('left:204px;top:470px;background:var(--accent);color:var(--accent-fg);border-radius:8px;padding:5px 9px;font-size:11px;font-weight:700;white-space:nowrap', 'Um toque', world);
      const K = [[0, 1, 180, 320], [1.6, 1, 180, 320], [3.4, 2.4, 253, 206], [6, 2.4, 253, 206], [7.6, 1, 180, 320], [9, 2.4, 110, 482], [11, 2.4, 110, 482], [12, 1, 180, 320]];
      return {
        dur: 12, caps: caps(c.cap, 0.4, 11),
        upd(t) {
          let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
          const a = K[i], b = K[i + 1], k = eio(seg(t, a[0], b[0])), sc = lerp(a[1], b[1], k), fx = lerp(a[2], b[2], k), fy = lerp(a[3], b[3], k);
          world.style.transform = 'translate(' + (180 - fx * sc) + 'px,' + (320 - fy * sc) + 'px) scale(' + sc + ')';
          const pulse = 1 + 0.06 * Math.sin(t * 7);
          [[rA, lA, 3.2, 6.4], [rB, lB, 8.8, 11.4]].forEach((o) => { const v = seg(t, o[2], o[2] + 0.3) * (1 - seg(t, o[3] - 0.3, o[3])); o[0].style.opacity = v; o[1].style.opacity = v; o[0].style.transform = 'scale(' + pulse + ')'; });
        }
      };
    },
    count(c) {
      const R = 100, C = 2 * Math.PI * R;
      E('left:0;right:0;top:104px;text-align:center;font-family:var(--mono);font-size:12px;letter-spacing:.14em;color:var(--mut)', LAB.names[LAB.cur()].toUpperCase());
      const ring = E('left:60px;top:160px;width:240px;height:240px', '<svg width="240" height="240" viewBox="0 0 240 240"><circle cx="120" cy="120" r="' + R + '" fill="none" stroke="var(--line)" stroke-width="10"/><circle id="rc" cx="120" cy="120" r="' + R + '" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '" transform="rotate(-90 120 120)"/></svg>');
      const arc = ring.querySelector('#rc');
      const num = E('left:0;right:0;top:220px;text-align:center;font-weight:800;font-size:110px;line-height:1;letter-spacing:-.05em;font-variant-numeric:tabular-nums');
      const lab = E('left:30px;right:30px;top:420px;text-align:center;font-weight:700;font-size:20px;line-height:1.25', c.stat[1]);
      return {
        dur: 8, caps: caps(c.cap, 1, 7),
        upd(t) {
          const p = eo(seg(t, 0.4, 3.2)); arc.setAttribute('stroke-dashoffset', C * (1 - p));
          num.textContent = Math.round(c.stat[0] * p);
          lab.style.opacity = eo(seg(t, 2.8, 3.5)); lab.style.transform = 'translateY(' + (1 - eo(seg(t, 2.8, 3.5))) * 16 + 'px)';
        }
      };
    }
  };

  let id = 'story', T = null, t = 0, playing = true, speed = 1, last = performance.now(), vis = true, beat = false, capsOn = true, over = {};
  const rng = $('r-range'), tmEl = $('r-time'), capEl = $('rcap'), playB = $('r-play');
  function copy() { return Object.assign({}, LAB.c().reel, over); }
  function build() {
    [...stage.children].forEach((e) => { if (e !== capEl && !e.classList.contains('safe')) e.remove(); });
    T = TPL[id](copy()); rng.max = String(Math.round(T.dur * 100)); t = 0;
  }
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (vis && T) {
      if (playing) { t += dt * speed; if (t > T.dur + 1) t = 0; }
      const tt = Math.min(t, T.dur); T.upd(tt);
      const cp = capsOn ? T.caps.find((x) => tt >= x.a && tt < x.b) : null;
      if (!cp) capEl.textContent = ''; else { const n = Math.floor(((tt - cp.a) / (cp.b - cp.a)) * cp.w.length); capEl.innerHTML = cp.w.map((w, i) => '<span class="' + (i === n ? 'on' : '') + '">' + w + '</span>').join(' '); }
      stage.style.boxShadow = beat ? 'inset 0 0 0 ' + 4 * Math.exp(-(tt % 0.5) * 9) + 'px var(--accent)' : '';
      rng.value = String(Math.round(tt * 100)); tmEl.textContent = tt.toFixed(1) + ' / ' + T.dur + ' s';
    }
    requestAnimationFrame(frame);
  }
  function pills() {
    const names = { story: 'Gancho · Demo · Prova · CTA', ba: 'Antes e depois', list: 'Lista cinética', zoom: 'UI em zoom', count: 'Número que conta' };
    const box = $('r-tpl'); box.textContent = '';
    Object.keys(names).forEach((k) => { const b = document.createElement('button'); b.className = 'pill'; b.textContent = names[k]; b.setAttribute('aria-pressed', String(k === id)); b.onclick = () => { id = k; pills(); build(); }; box.appendChild(b); });
  }
  function fields() { $('r-cta').value = LAB.c().reel.cta; $('r-cap').value = LAB.c().reel.cap; }
  $('r-cta').addEventListener('input', (e) => { over.cta = e.target.value; build(); });
  $('r-cap').addEventListener('input', (e) => { over.cap = e.target.value; build(); });
  const setP = (p) => { playing = p; playB.textContent = p ? 'Pausar' : 'Tocar'; };
  playB.addEventListener('click', () => setP(!playing));
  rng.addEventListener('input', () => { setP(false); t = Number(rng.value) / 100; });
  $('r-speed').addEventListener('change', (e) => { speed = Number(e.target.value); });
  const tog = (bid, fn) => { const b = $(bid); b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); fn(on); }); };
  tog('r-safe', (on) => stage.classList.toggle('showsafe', on)); tog('r-beat', (on) => { beat = on; }); tog('r-caps', (on) => { capsOn = on; });
  $('r-restart').addEventListener('click', () => { t = 0; setP(true); });
  new IntersectionObserver((e) => { vis = e[0].isIntersecting; last = performance.now(); }).observe(stage);
  document.addEventListener('lab:product', () => { over = {}; fields(); build(); });
  pills(); fields(); build(); requestAnimationFrame(frame);
})();
