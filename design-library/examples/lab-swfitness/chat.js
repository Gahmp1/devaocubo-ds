/* Chat: a linha do tempo é uma função pura de t, então dá para tocar, pausar e arrastar. */
(function () {
  const log = document.getElementById('chat-log'), head = document.getElementById('chat-title');
  if (!log) return;
  const range = document.getElementById('chat-range'), play = document.getElementById('chat-play'), cur = document.getElementById('chat-cur');
  const states = document.getElementById('chat-states'), comp = document.getElementById('composer'), compW = document.getElementById('composer-w');
  const T = { user: 0.2, think: 0.9, s2: 3.0, s3: 5.2, end: 7.6, ans: 7.9 };
  const PER_WORD = 0.05, HOLD = 2.5;
  let c, words, dur, el = {}, orb, t = 0, playing = true, last = 0, forced = null, cache = {};
  const NAMES = { working: 'Trabalhando', searching: 'Buscando', solving: 'Resolvendo', listening: 'Ouvindo', waiting: 'Esperando', retrying: 'Tentando de novo' };

  function build() {
    c = LAB.c().chat; words = c.answer.split(' ');
    dur = T.ans + words.length * PER_WORD + 2.2;
    head.textContent = c.title; log.textContent = '';
    const mk = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; e.hidden = true; log.appendChild(e); return e; };
    el.ub = mk('div', 'bubble u', c.user);
    el.th = mk('div', 'think', '<div class="row"><canvas class="orb" id="chat-orb"></canvas><div class="lab"><b></b><span></span></div><span class="tm"></span></div><ul class="steps">' + c.steps.map((s) => '<li><i></i>' + s + '</li>').join('') + '</ul>');
    el.pe = mk('div', '', '<span class="chip">Pensou por <b class="mono">7 s</b></span>');
    el.an = mk('div', 'bubble a', '');
    el.ch = mk('div', 'chips', c.chips.map((s) => '<span class="chip">' + s + '</span>').join(''));
    el.ap = mk('div', 'approve', '<span>' + c.ask + '</span><div class="acts"><button>Ajustar</button><button class="y">Sim</button></div>');
    el.lb = el.th.querySelector('b'); el.sb = el.th.querySelector('.lab span'); el.tm = el.th.querySelector('.tm'); el.li = [...el.th.querySelectorAll('li')];
    orb = new Orb(el.th.querySelector('canvas'), 46, 'working'); Orb.start(); cache = {};
    range.max = String(Math.round(dur * 100));
  }
  const show = (k, on) => {
    const e = el[k]; if (cache[k] === on) return; cache[k] = on;
    if (on) { e.hidden = false; e.style.animation = 'pop .45s cubic-bezier(.2,.8,.2,1)'; } else e.hidden = true;
  };
  const set = (k, v, fn) => { if (cache[k] !== v) { cache[k] = v; fn(v); } };

  function render() {
    const f = forced;
    const tt = f ? 4 : t;
    show('ub', tt >= T.user);
    const thinking = f ? true : tt >= T.think && tt < T.end;
    show('th', thinking);
    show('pe', !f && tt >= T.end);
    const stage = tt < T.s2 ? 0 : tt < T.s3 ? 1 : 2;
    const st = f ? f : ['working', 'searching', 'solving'][stage];
    set('orb', st, (v) => orb.set(v));
    set('lab', (f ? 'f' : stage) + st, () => {
      el.lb.style.opacity = 0;
      setTimeout(() => { el.lb.textContent = f ? NAMES[st] : c.labels[stage]; el.sb.textContent = f ? 'estado forçado' : c.sub[stage]; el.lb.style.opacity = 1; }, 120);
    });
    set('steps', f ? 'x' : stage + '|' + (tt >= T.end), () => el.li.forEach((li, i) => { const done = !f && (i < stage || tt >= T.end), on = !f && i === stage && tt < T.end; li.className = done ? 'done' : on ? 'on' : ''; }));
    set('tm', Math.round(Math.max(0, Math.min(tt - T.think, T.end - T.think))), (v) => { el.tm.textContent = v + ' s'; });
    const n = f ? 0 : Math.max(0, Math.min(words.length, Math.floor((tt - T.ans) / PER_WORD)));
    show('an', n > 0);
    set('words', n, (v) => { el.an.textContent = words.slice(0, v).join(' '); });
    const ae = T.ans + words.length * PER_WORD;
    show('ch', !f && tt >= ae + 0.2);
    show('ap', !f && tt >= ae + 0.7);
    const busy = thinking;
    set('busy', busy, (v) => { comp.classList.toggle('busy', v); compW.classList.toggle('on', v); });
    cur.textContent = f ? 'estado forçado: ' + st : 't = ' + tt.toFixed(1) + ' s';
    if (!f) range.value = String(Math.round(tt * 100));
  }

  function tick(now) {
    if (playing && !forced) {
      t += Math.min(0.1, (now - last) / 1000);
      if (t > dur) t = 0;
    }
    last = now; render(); requestAnimationFrame(tick);
  }

  function setPlaying(p) { playing = p; play.textContent = p ? 'Pausar' : 'Tocar'; }
  play.addEventListener('click', () => { if (forced) clearForced(); setPlaying(!playing); });
  range.addEventListener('input', () => { clearForced(); setPlaying(false); t = Number(range.value) / 100; });
  function clearForced() { forced = null; [...states.children].forEach((b) => b.setAttribute('aria-pressed', 'false')); states.firstChild.setAttribute('aria-pressed', 'true'); cache = {}; }
  function mkStates() {
    states.textContent = '';
    const b0 = document.createElement('button'); b0.className = 'pill'; b0.textContent = 'Linha do tempo'; b0.setAttribute('aria-pressed', 'true');
    b0.onclick = () => { clearForced(); setPlaying(true); }; states.appendChild(b0);
    Orb.STATES.forEach((s) => {
      const b = document.createElement('button'); b.className = 'pill'; b.textContent = NAMES[s]; b.setAttribute('aria-pressed', 'false');
      b.onclick = () => { forced = s; cache = {}; [...states.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b))); };
      states.appendChild(b);
    });
  }
  mkStates(); build(); setPlaying(true); t = dur - 1; render();
  document.addEventListener('lab:product', () => { build(); forced = null; mkStates(); render(); });
  // começa do zero quando entra na tela
  new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { t = 0; last = performance.now(); requestAnimationFrame(tick); o.disconnect(); } }).observe(log);
})();
