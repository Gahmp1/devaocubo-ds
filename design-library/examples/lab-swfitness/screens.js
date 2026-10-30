/* Telas: barra de abas com pílula que desliza + transições. Microinterações: oito demos vivas. */
(function () {
  const ICONS = [
    '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
    '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
    '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'
  ];
  const body = document.getElementById('app-body'); if (!body) return;
  const bar = document.getElementById('tabbar'), title = document.getElementById('app-title'), chip = document.getElementById('app-chip');
  let idx = 0, tm = 0;

  function mkBar() {
    const s = LAB.c().screens;
    bar.innerHTML = '<span class="pl"></span>' + s.tabs.map((n, i) => '<button role="tab" aria-label="' + n + '" aria-selected="' + (i === idx) + '" data-i="' + i + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[i] + '</svg></button>').join('');
    bar.querySelector('.pl').style.transform = 'translateX(' + idx * 100 + '%)';
    bar.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.i))));
  }
  function content(i) {
    const s = LAB.c().screens;
    if (i === 0) return '<div class="card hero-card"><span class="l">' + s.hero.l + '</span><span class="v" id="hero-v">' + LAB.fmt(0, s.hero.f) + '</span></div>' + s.rows.map(row).join('');
    const rows = s.rows.slice().reverse();
    return '<div class="card"><b>' + s.tabs[i] + '</b><div class="mut" style="font-size:13px;margin-top:4px">' + rows.length + ' itens recentes</div></div>' + rows.map(row).join('');
  }
  const row = (r) => '<div class="row-i"><div><b>' + r[0] + '</b><span>' + r[1] + '</span></div><em>' + r[2] + '</em></div>';
  function go(i, instant) {
    const dir = i >= idx ? 'inR' : 'inL'; const s = LAB.c().screens;
    idx = i; clearTimeout(tm);
    bar.querySelector('.pl').style.transform = 'translateX(' + i * 100 + '%)';
    bar.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    title.textContent = i === 0 ? s.title : s.tabs[i]; chip.textContent = s.chip;
    body.className = 'app-body';
    body.innerHTML = '<div class="sk" style="height:96px"></div><div class="sk" style="height:56px"></div><div class="sk" style="height:56px"></div><div class="sk" style="height:56px"></div>';
    tm = setTimeout(() => {
      body.innerHTML = content(i); body.className = 'app-body ' + dir;
      if (i === 0) LAB.countUp(document.getElementById('hero-v'), s.hero.v, s.hero.f, 900);
    }, instant ? 0 : 520);
  }
  document.addEventListener('lab:product', () => { idx = 0; mkBar(); go(0, true); });
  mkBar(); go(0, true);
  const demo = document.getElementById('app-auto');
  demo && demo.addEventListener('click', () => { [1, 2, 3, 0].forEach((k, n) => setTimeout(() => go(k), n * 1500)); });

  /* microinterações */
  const $ = (id) => document.getElementById(id);
  const press = $('m-press'); press && press.addEventListener('click', (e) => {
    const r = press.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement('span');
    s.className = 'rip'; s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
    press.appendChild(s); setTimeout(() => s.remove(), 650);
  });
  const sw = $('m-sw'); sw && sw.addEventListener('click', () => sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true')));
  document.querySelectorAll('#m-chips .chip').forEach((c) => c.addEventListener('click', () => c.classList.toggle('sel')));
  const skb = $('m-sk'), skr = $('m-sk-btn');
  function skLoad() { skb.innerHTML = '<div class="sk" style="height:18px;width:100%;margin-bottom:8px"></div><div class="sk" style="height:18px;width:70%"></div>'; setTimeout(() => { skb.innerHTML = '<div style="width:100%"><b>Treino de hoje</b><div class="mut" style="font-size:13px">5 exercícios · 45 min</div></div>'; }, 1400); }
  skr && skr.addEventListener('click', skLoad); skb && skLoad();
  const sr = $('m-swipe'); if (sr) {
    let x0 = null, dx = 0; const W = 110;
    sr.addEventListener('pointerdown', (e) => { x0 = e.clientX - dx; sr.setPointerCapture(e.pointerId); sr.style.transition = 'none'; });
    sr.addEventListener('pointermove', (e) => { if (x0 === null) return; dx = Math.max(-W, Math.min(0, e.clientX - x0)); sr.style.transform = 'translateX(' + dx + 'px)'; });
    const end = () => { if (x0 === null) return; x0 = null; sr.style.transition = ''; dx = dx < -W / 2 ? -W : 0; sr.style.transform = 'translateX(' + dx + 'px)'; };
    sr.addEventListener('pointerup', end); sr.addEventListener('pointercancel', end);
  }
  const to = $('m-toast'), tb = $('m-toast-btn'); let tt;
  tb && tb.addEventListener('click', () => { to.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => to.classList.remove('show'), 2600); });
  to && to.querySelector('button').addEventListener('click', () => to.classList.remove('show'));
  const nb = $('m-num-btn'), nv = $('m-num');
  nb && nb.addEventListener('click', () => LAB.countUp(nv, 1000 + Math.round(Math.random() * 8000), 'brl', 900, 0));
  const sb = $('m-stag-btn'), st = $('m-stag');
  function stag() { st.classList.remove('go'); void st.offsetWidth; st.classList.add('go'); }
  sb && (sb.addEventListener('click', stag), stag());
})();
