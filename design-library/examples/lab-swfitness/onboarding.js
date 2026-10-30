/* Onboarding em 3 passos: entrada escalonada, seleção com tique desenhado, contagem no fim. */
(function () {
  const root = document.getElementById('ob-root'); if (!root) return;
  let step = 0, sel = 0, timers = [];
  const CHECK = '<span class="c"><svg viewBox="0 0 14 14"><path d="M2.5 7.5l3 3 6-6.5"/></svg></span>';
  function view() {
    const o = LAB.c().ob;
    const prog = '<div class="prog">' + [0, 1, 2].map((i) => '<i class="' + (i <= step ? 'f' : '') + '"></i>').join('') + '</div>';
    let b = '';
    if (step === 0) b = '<h3 style="--i:0;font-size:38px">' + LAB.c().head.join(' ') + '<span class="dot">.</span></h3><p class="mut" style="--i:1">' + o.sub + '</p><div style="flex:1"></div><button class="cta" style="--i:2" data-next>Começar</button>';
    else if (step === 1) b = '<h3 style="--i:0">' + o.title + '</h3><p class="mut" style="--i:1">' + o.q + '</p>' + o.opts.map((p, i) => '<button class="opt' + (i === sel ? ' sel' : '') + '" style="--i:' + (i + 2) + '" data-opt="' + i + '"><span class="t"><b>' + p[0] + '</b><span>' + p[1] + '</span></span>' + CHECK + '</button>').join('') + '<div style="flex:1"></div><button class="cta" style="--i:6" data-next>Continuar</button>';
    else b = '<h3 style="--i:0">' + o.plan + '<span class="dot">.</span></h3><div class="plan" style="--i:1">' + o.rows.map((r, i) => '<div><span class="mut">' + r[0] + '</span><b data-n="' + r[1] + '">0</b></div>').join('') + '</div><div style="flex:1"></div><button class="cta" style="--i:3" data-next>Ver meu painel</button><button class="mut" style="--i:4;background:none;border:0;padding:8px" data-back>Voltar ao início</button>';
    root.innerHTML = '<div class="ob">' + prog + '<div class="body in">' + b + '</div></div>';
    root.querySelectorAll('[data-opt]').forEach((e) => e.addEventListener('click', () => { sel = Number(e.dataset.opt); root.querySelectorAll('.opt').forEach((x, i) => x.classList.toggle('sel', i === sel)); }));
    const nx = root.querySelector('[data-next]'); nx && nx.addEventListener('click', () => { step = Math.min(2, step + 1); view(); });
    const bk = root.querySelector('[data-back]'); bk && bk.addEventListener('click', () => { step = 0; view(); });
    root.querySelectorAll('[data-n]').forEach((e, i) => setTimeout(() => LAB.countUp(e, Number(e.dataset.n), 'int', 900), 500 + i * 160));
  }
  function auto() {
    timers.forEach(clearTimeout); timers = []; step = 0; view();
    const go = (ms, fn) => timers.push(setTimeout(fn, ms));
    go(1400, () => { step = 1; view(); });
    go(2900, () => { sel = 1; root.querySelectorAll('.opt').forEach((x, i) => x.classList.toggle('sel', i === 1)); });
    go(4200, () => { step = 2; view(); });
  }
  const b = document.getElementById('ob-auto'); b && b.addEventListener('click', auto);
  document.addEventListener('lab:product', () => { step = 0; sel = 0; view(); });
  view();
})();
