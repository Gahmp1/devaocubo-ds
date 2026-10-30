/* Landing do mockup: troca de produto, hero cinético com orbe, telas do app em loop, preços, FAQ e painel de slots. */
(function () {
  const L = window.LAB, S = L.site, RM = L.reduced, root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ICON = {
    chart: '<path d="M4 20V11M10 20V5M16 20v-6M2 20h20"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    nodes: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/>'
  };
  const brl = (v) => L.fmt(v, 'brl');
  let prod = 'somma', annual = false, orb, mini, cur = 0, last = -1, loop = null, phoneVis = false, timers = [];
  const sectionsOn = Object.fromEntries(S.sections.map(([k]) => [k, true]));

  /* revelação ao rolar, escalonada por --i */
  const rvIO = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); rvIO.unobserve(e.target);
    $$('.amt[data-m]', e.target).forEach((el) => setAmt(el, priceOf(el), 0));
  }), { threshold: 0.15 }) : null;
  const reveal = (scope) => $$('.rv', scope).forEach((el) => (rvIO ? rvIO.observe(el) : el.classList.add('in')));

  /* ---------- renderização por produto ---------- */
  function kin(lines) {
    let n = 0;
    return lines.map((l) => `<span class="ln">${l.split(' ').map((w) => `<span class="w"><span style="--i:${n++}">${w}</span></span>`).join(' ')}</span>`).join('');
  }
  function renderHero(d) {
    $('#tag').textContent = d.tag;
    $('#h1').innerHTML = kin(d.head);
    const sub = $('#sub'); sub.textContent = d.sub; sub.style.animation = 'none'; void sub.offsetWidth; sub.style.animation = '';
    $('#cta .bb').textContent = d.cta; $('#cta2').textContent = d.cta2;
    $('#pills').innerHTML = d.pills.map((p) => `<span class="pill">${p}</span>`).join('');
    const half = d.marquee.map((w) => `<span>${w}</span><span>✦</span>`).join('');
    $('#mq').innerHTML = half + half;
  }
  function renderBenefits(d) {
    $('#cards').innerHTML = d.benefits.map((b, i) => `<article class="bc rv" style="--i:${i}"><div class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[b.ic]}</svg></div><h3>${b.t}</h3><p>${b.d}</p></article>`).join('');
    reveal($('#cards'));
  }
  function renderPlans(d) {
    $('#plans').innerHTML = d.plans.map((p, i) => `<div class="beam${i === 1 ? ' on' : ''} rv" style="--i:${i}"><article class="pc">${i === 1 ? '<span class="badge">Mais escolhido</span>' : ''}<h3>${p.n}</h3><p class="mut">${p.d}</p>
      <div class="price">${p.m ? `<span class="amt" data-m="${p.m}"></span><small>/mês</small>` : '<span class="amt">Grátis</span>'}</div><p class="bn" data-m="${p.m}"></p>
      <ul class="rules">${p.f.map((f) => `<li>${f}</li>`).join('')}</ul><a class="btn${i === 1 ? ' pri' : ''}" href="#s-cta">Escolher ${p.n}</a></article></div>`).join('');
    $$('#plans .amt[data-m]').forEach((el) => { el.dataset.cur = priceOf(el); el.textContent = brl(priceOf(el)); });
    notes(); reveal($('#plans'));
  }
  function renderFaq(d) {
    $('#faq').innerHTML = d.faq.map((q, i) => `<div class="qa${i === 0 ? ' open' : ''}"><h3><button type="button" aria-expanded="${i === 0}" aria-controls="a${i}">${q[0]}<span class="pm" aria-hidden="true"></span></button></h3><div class="ans" id="a${i}" role="region"><div><p>${q[1]}</p></div></div></div>`).join('');
  }
  function renderFoot(d) {
    $('#fh').textContent = d.foot[0]; $('#fp').textContent = d.foot[1]; $('#fc .bb').textContent = d.cta;
  }
  function renderTitles() {
    for (const k of Object.keys(S.titles)) { $('#' + k + '-e').textContent = S.titles[k][0]; $('#' + k + '-h').textContent = S.titles[k][1]; }
  }

  /* ---------- preços ---------- */
  const priceOf = (el) => (annual ? +el.dataset.m * 0.8 : +el.dataset.m);
  function setAmt(el, to, from) {
    el.dataset.cur = to;
    if (RM) { el.textContent = brl(to); return; }
    L.countUp(el, to, 'brl', 700, from);
  }
  function notes() {
    $$('#plans .bn').forEach((n) => { const m = +n.dataset.m; n.textContent = !m ? 'Sem cartão de crédito' : annual ? `${brl(m * 0.8 * 12)} cobrados por ano` : 'Cobrado todo mês'; });
  }
  function setBilling(v) {
    annual = v; const sw = $('#billSw');
    sw.setAttribute('aria-checked', String(v)); $('#lm').classList.toggle('on', !v); $('#la').classList.toggle('on', v);
    $$('#plans .amt[data-m]').forEach((el) => setAmt(el, priceOf(el), +el.dataset.cur || 0));
    notes();
  }

  /* ---------- telas do app ---------- */
  const ck = '<svg viewBox="0 0 12 12"><path d="M2.5 6.3 5 8.8l4.5-5"/></svg>';
  function scenes(p, d) {
    const c = L.copy[p], o = c.ob, ch = c.chat, s = c.screens;
    return [
      `<div class="ob"><div class="prog"><i class="f"></i><i></i><i></i></div><div class="body rise"><h3 style="--i:0">${o.title}</h3><p class="mut" style="--i:1">${o.sub}</p>${o.opts.map((x, i) => `<div class="opt" style="--i:${i + 2}"><span class="t"><b>${x[0]}</b><span>${x[1]}</span></span><span class="c">${ck}</span></div>`).join('')}<div class="cta" style="--i:5;text-align:center">Continuar</div></div></div>`,
      `<div class="pt"><div class="chat-head"><span>${ch.title}</span></div><div class="chat-log rise"><div class="bubble u" style="--i:0">${ch.user}</div>
        <div class="think" style="--i:1"><div class="row"><canvas class="orb" aria-hidden="true"></canvas><div class="lab"><b>${ch.labels[0]}</b><span>${ch.sub[0]}</span></div></div><ul class="steps">${ch.steps.map((t) => `<li><i></i>${t}</li>`).join('')}</ul></div>
        <div class="bubble a late">${ch.answer}</div><div class="chips late">${ch.chips.map((t) => `<span class="chip">${t}</span>`).join('')}</div></div></div>`,
      `<div class="pt"><div class="app-head"><h3>${s.title}</h3><span class="chip">${s.chip}</span></div><div class="app-body rise"><div class="card hero-card" style="--i:0"><span class="l">${s.hero.l}</span><span class="v">${L.fmt(s.hero.v, s.hero.f)}</span></div>${s.rows.map((r, i) => `<div class="row-i" style="--i:${i + 1}"><div><b>${r[0]}</b><span>${r[1]}</span></div><em>${r[2]}</em></div>`).join('')}</div></div>`
    ];
  }
  function renderApp(p, d) {
    const c = L.copy[p];
    $('#stage').innerHTML = `<div class="phone" aria-hidden="true">${scenes(p, d).map((h, i) => `<div class="scr" data-i="${i}">${h}</div>`).join('')}
      <div class="tabbar"><span class="pl"></span>${c.screens.tabs.map((t) => `<button type="button" tabindex="-1">${t}</button>`).join('')}</div></div>
      <div class="dots">${d.steps.map((s, i) => `<button type="button" data-i="${i}" aria-label="Tela ${i + 1}: ${s[0]}"></button>`).join('')}</div>`;
    $('#stp').innerHTML = d.steps.map((s, i) => `<li><button type="button" data-i="${i}"><span class="n">0${i + 1}</span><span><b>${s[0]}</b><span class="d">${s[1]}</span></span><span class="bar"></span></button></li>`).join('');
    if (mini) mini.destroy();
    mini = new Orb($('.phone canvas.orb'), 44, 'working');
    phoneIO.disconnect(); phoneIO.observe($('.phone'));
    last = -1; show(0);
  }
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  function sceneRun(i) {
    const c = L.copy[prod];
    if (i === 1) {
      const lis = $$('.phone .steps li'), lab = $('.phone .think .lab'), late = $$('.phone .late');
      lis.forEach((li) => li.classList.remove('on', 'done')); late.forEach((e) => e.classList.remove('show'));
      const st = ['searching', 'solving', 'working'];
      lis.forEach((li, k) => {
        at(500 + k * 750, () => { if (k) lis[k - 1].classList.replace('on', 'done'); li.classList.add('on'); $('b', lab).textContent = c.chat.labels[k]; $('span', lab).textContent = c.chat.sub[k]; mini.set(st[k]); });
      });
      at(500 + 3 * 750, () => { lis[2].classList.replace('on', 'done'); late[0].classList.add('show'); });
      at(500 + 3 * 750 + 300, () => late[1].classList.add('show'));
    } else if (i === 0) {
      const opts = $$('.phone .opt'); opts.forEach((o) => o.classList.remove('sel'));
      at(1500, () => opts[1].classList.add('sel'));
    } else {
      const v = $('.phone .hero-card .v'), h = c.screens.hero;
      if (RM) v.textContent = L.fmt(h.v, h.f); else L.countUp(v, h.v, h.f, 1100, 0);
    }
  }
  function show(i) {
    clearTimers(); cur = i;
    $$('.phone .scr').forEach((s, k) => { s.classList.toggle('active', k === i); s.classList.toggle('prev', k === last && k !== i); });
    $('.phone .pl').style.transform = `translateX(${i * 100}%)`;
    $$('.phone .tabbar button').forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    $$('#stp button,.dots button').forEach((b) => b.setAttribute('aria-current', String(+b.dataset.i === i)));
    $$('#stp .bar').forEach((b) => { b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; });
    last = i; sceneRun(i); arm();
  }
  function arm() {
    clearInterval(loop); loop = null;
    if (!RM && phoneVis) loop = setInterval(() => show((cur + 1) % 3), 5200);
  }
  const phoneIO = 'IntersectionObserver' in window ? new IntersectionObserver((e) => { phoneVis = e[0].isIntersecting; arm(); }, { threshold: 0.3 }) : { observe() { phoneVis = true; arm(); }, disconnect() {} };

  /* ---------- painel de slots ---------- */
  const cssv = (n) => getComputedStyle(root).getPropertyValue(n).trim();
  function renderPanel() {
    const d = S.p[prod];
    $('#slProd').textContent = `produto = "${prod}"   (${Object.keys(S.p).length} opções)`;
    $('#slTk').innerHTML = ['--bg', '--fg', '--card', '--line', '--accent'].map((v) => `<i title="${v}" style="background:var(${v})"></i>`).join('');
    const font = cssv('--font').split(',')[0].replace(/"/g, '');
    $('#slTv').innerHTML = [['--font', font], ['--radius', cssv('--radius')], ['--accent', cssv('--accent')], ['--bg', cssv('--bg')], ['--dw', cssv('--dw')]].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    const copy = [['hero.title', d.head.join(' ')], ['hero.sub', d.sub], ['cta.label', d.cta], ...d.benefits.map((b, i) => [`benefits[${i}]`, b.t]), ...d.plans.map((p, i) => [`plans[${i}]`, `${p.n} · ${p.m ? brl(p.m) : 'R$ 0'}`]), ['faq[0].q', d.faq[0][0]], ['footer.title', d.foot[0]]];
    $('#slCopy').innerHTML = copy.map(([k, v]) => `<dt>${k}</dt><dd title="${v}">${v}</dd>`).join('');
    const on = Object.keys(sectionsOn).filter((k) => sectionsOn[k]);
    $('#slJson').textContent = JSON.stringify({ produto: prod, secoes: on }, null, 1).replace(/\n\s*/g, ' ');
  }
  function buildPanel() {
    $('#slSec').innerHTML = S.sections.map(([k, n]) => `<label><input type="checkbox" data-k="${k}" checked> ${n}</label>`).join('');
    $('#slSec').addEventListener('change', (e) => setSection(e.target.dataset.k, e.target.checked));
    const open = (v, focus) => {
      $('#slots').classList.toggle('open', v); $('#slotsBtn').setAttribute('aria-expanded', String(v)); document.body.classList.toggle('panel-open', v);
      if (v && focus) $('#slotsClose').focus({ preventScroll: true });
    };
    $('#slotsBtn').onclick = () => open(true, true);
    $('#slotsClose').onclick = () => { open(false); $('#slotsBtn').focus({ preventScroll: true }); };
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('#slots').classList.contains('open') && innerWidth < 1180) $('#slotsClose').click(); });
    if (innerWidth >= 1180) open(true); // painel já aberto em tela larga
  }
  function setSection(k, on) {
    sectionsOn[k] = on;
    const el = $('#s-' + k); if (el) el.hidden = !on;
    $$(`.nav a[data-sec="${k}"]`).forEach((a) => (a.hidden = !on));
    const cb = $(`#slSec input[data-k="${k}"]`); if (cb) cb.checked = on;
    renderPanel();
  }

  /* ---------- troca de produto ---------- */
  function setProduct(p) {
    prod = p; root.dataset.product = p; const d = S.p[p];
    $$('.switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.p === p)));
    $('#brand').textContent = L.names[p];
    renderHero(d); renderBenefits(d); renderApp(p, d); renderPlans(d); renderFaq(d); renderFoot(d); renderPanel();
    orb.set(S.orb[p]);
    try { history.replaceState(null, '', '?p=' + p); } catch (e) { /* file:// */ }
  }

  /* ---------- init ---------- */
  document.documentElement.classList.add('js');
  orb = new Orb($('#orb'), 560, 'working'); Orb.start();
  if (!RM) {
    const cv = $('#orb');
    addEventListener('pointermove', (e) => {
      const r = cv.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return orb.aim(null);
      const k = r.width * 0.4; orb.aim((e.clientX - r.left - r.width / 2) / k, (e.clientY - r.top - r.height / 2) / k);
    }, { passive: true });
    root.addEventListener('pointerleave', () => orb.aim(null));
  }
  renderTitles();
  $('.switch').addEventListener('click', (e) => { const b = e.target.closest('button[data-p]'); if (b && b.dataset.p !== prod) setProduct(b.dataset.p); });
  $('#billSw').addEventListener('click', () => setBilling(!annual));
  $('#lm').addEventListener('click', () => setBilling(false)); $('#la').addEventListener('click', () => setBilling(true));
  $('#faq').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const q = b.closest('.qa'), v = !q.classList.contains('open'); q.classList.toggle('open', v); b.setAttribute('aria-expanded', String(v));
  });
  document.addEventListener('click', (e) => { const b = e.target.closest('#stp button,.dots button'); if (b) show(+b.dataset.i); });
  buildPanel();
  const q = new URLSearchParams(location.search).get('p');
  setProduct(S.p[q] ? q : 'somma');
  window.SITE_DEBUG = { orb, setProduct, setSection, setBilling, show, get state() { return { prod, annual, cur, sectionsOn }; } };
})();
