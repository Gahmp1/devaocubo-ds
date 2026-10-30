(() => {
  const { cats, items } = window.LIB;
  const NAMES = { somma: 'Somma', swfitness: 'SWFitness', trippo: 'Trippo', systemdesign: 'SystemDesign' };
  const MOV = ['Nenhum', 'Leve', 'Forte'];
  const ST = { local: 'Cópia local', link: 'Só link', pesq: 'A pesquisar' };
  const STEPS = [
    ['Brief', 'design-research', 'Recebe o pedido e fecha o brief: produto, tela, restrições e nível de movimento aceito.', 'Entrada: pedido solto', 'Saída: brief de uma página'],
    ['Buscar', 'design-research', 'Procura no catálogo local e, se faltar, em fontes externas, anotando só nome e link de cada achado.', 'Entrada: brief', 'Saída: lista de candidatos'],
    ['Triar', 'design-research', 'Descarta o que foge do produto ou do nível de movimento e marca a licença como “a verificar” quando não souber.', 'Entrada: candidatos', 'Saída: poucas referências'],
    ['Extrair padrão', 'design-research', 'Anota o padrão (estrutura, ritmo, tokens) e não o código nem a captura inteira.', 'Entrada: referências', 'Saída: padrão em texto'],
    ['Salvar na biblioteca', 'design-library', 'Guarda o padrão com origem, licença e estado (cópia local, só link ou a pesquisar).', 'Entrada: padrão', 'Saída: item na biblioteca'],
    ['Gerar mockup', 'design-library', 'Monta o mockup HTML com os tokens do produto e as receitas guardadas, respeitando prefers-reduced-motion.', 'Entrada: receitas + tokens', 'Saída: mockup HTML']
  ];
  const $ = (s, r = document) => r.querySelector(s);
  const root = document.documentElement;
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const catById = Object.fromEntries(cats.map(c => [c.id, c]));
  const stateOf = i => store.get('lib.st.' + i.id) || i.s;

  /* produto */
  const prodBox = $('#prod');
  Object.entries(NAMES).forEach(([k, n]) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.p = k; b.textContent = n; b.setAttribute('aria-pressed', 'false'); prodBox.append(b); });
  function setProduct(p) {
    if (!NAMES[p]) p = 'somma';
    root.dataset.product = p; store.set('lib.product', p);
    prodBox.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.p === p)));
  }
  prodBox.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setProduct(b.dataset.p); });

  const real = items.filter(i => i.src === 'toolfolio').length;
  $('#disc').textContent = `${items.length} itens: ${real} lidos da página toolfolio.com/design (nome e link como a página dá) e ${items.length - real} do briefing. Licença “a verificar” quando a página não informa. Os estados abaixo são de demonstração: clique no item para mudar (fica só neste navegador).`;

  /* filtros */
  const F = { q: '', cat: 'all', mov: 'all', st: 'all' };
  function chipRow(box, list, key) {
    box.innerHTML = list.map(([v, l, n]) => `<button type="button" class="chip" data-v="${v}" aria-pressed="${F[key] === v}">${esc(l)}${n !== undefined ? ` <small>${n}</small>` : ''}</button>`).join('');
    box.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; F[key] = b.dataset.v; render(); };
  }
  function buildFilters() {
    chipRow($('#fcat'), [['all', 'Todas', items.length], ...cats.map(c => [c.id, c.n, items.filter(i => i.c === c.id).length])], 'cat');
    chipRow($('#fmov'), [['all', 'Todos'], ['0', 'Nenhum'], ['1', 'Leve'], ['2', 'Forte']], 'mov');
    chipRow($('#fst'), [['all', 'Todos'], ['local', ST.local], ['link', ST.link], ['pesq', ST.pesq]], 'st');
  }
  function match(i) {
    if (F.cat !== 'all' && i.c !== F.cat) return false;
    if (F.mov !== 'all' && String(i.m) !== F.mov) return false;
    if (F.st !== 'all' && stateOf(i) !== F.st) return false;
    if (!F.q) return true;
    const hay = norm([i.n, i.d, catById[i.c].n, i.en, MOV[i.m], ST[stateOf(i)]].join(' '));
    return norm(F.q).split(/\s+/).every(t => hay.includes(t));
  }
  const grid = $('#grid');
  function card(i, n) {
    const s = stateOf(i);
    return `<button type="button" class="card" data-id="${i.id}" style="--i:${Math.min(n, 24)}" aria-label="${esc(i.n)}, ${esc(catById[i.c].n)}. Abrir detalhe">
      <span class="top2"><span>${esc(catById[i.c].n)}</span><span class="stt" data-s="${s}">${ST[s]}</span></span>
      <h3>${esc(i.n)}</h3><p>${esc(i.d)}</p>
      <span class="ft"><span><span class="mv" data-m="${i.m}" aria-hidden="true"><i></i><i></i><i></i></span>Movimento: ${MOV[i.m].toLowerCase()}</span><span>${esc(i.pr)}</span></span></button>`;
  }
  function render() {
    buildFilters();
    const list = items.filter(match);
    grid.innerHTML = list.length ? list.map(card).join('') : `<div class="empty"><p>Nenhuma referência com esses filtros.</p><button class="btn pri" type="button" id="clear">Limpar filtros</button></div>`;
    $('#count').textContent = `${list.length} de ${items.length} referências`;
    const c = $('#clear'); if (c) c.onclick = () => { Object.assign(F, { q: '', cat: 'all', mov: 'all', st: 'all' }); q.value = ''; render(); };
  }
  const q = $('#q');
  q.addEventListener('input', () => { F.q = q.value.trim(); render(); });
  addEventListener('keydown', e => { if (e.key === '/' && document.activeElement !== q && !panel.classList.contains('on')) { e.preventDefault(); q.focus(); } });

  /* painel de detalhe */
  const panel = $('#panel'), scrim = $('#scrim');
  let lastFocus = null, openId = null;
  function openPanel(id) {
    const i = items.find(x => x.id === id); if (!i) return;
    openId = id; lastFocus = document.activeElement;
    const c = catById[i.c], s = stateOf(i);
    panel.innerHTML = `<div class="ph"><div><p class="eyebrow">${esc(c.n)}</p><h2 id="pn" style="margin-top:6px">${esc(i.n)}</h2></div><button class="x" type="button" id="pclose" aria-label="Fechar detalhe"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 2l10 10M12 2L2 12"/></svg></button></div>
      <div class="pb">
        <div class="kv"><span>Movimento: ${MOV[i.m].toLowerCase()}</span><span>Preço no Toolfolio: ${esc(i.pr)}</span><span>Origem: ${i.src === 'briefing' ? 'briefing' : 'toolfolio.com/design'}</span></div>
        <div class="sec"><h4>Resumo</h4><p>${esc(i.d)}</p>${i.x ? `<p class="note">${esc(i.x)}</p>` : ''}</div>
        <div class="sec"><h4>O que pegar</h4><p>O padrão, não o código: ${esc(c.d.charAt(0).toLowerCase() + c.d.slice(1))} Registre estrutura, ritmo e parâmetros, com a fonte.</p></div>
        <div class="sec"><h4>Licença</h4><p>${esc(i.lic)}</p>${i.lic.startsWith('a verificar') ? '<p class="note">Antes de copiar código ou imagem, confira a licença no site da ferramenta.</p>' : ''}</div>
        <div class="sec"><h4>Como entra na skill</h4><p>${esc(c.skill)}</p></div>
        <div class="sec"><h4>Estado (demonstração)</h4><div class="seg" role="group" aria-label="Estado do item">${Object.entries(ST).map(([k, l]) => `<button type="button" data-st="${k}" aria-pressed="${k === s}">${l}</button>`).join('')}</div></div>
      </div>
      <div class="foot"><a class="btn pri" href="${esc(i.u)}" target="_blank" rel="noopener noreferrer" style="text-decoration:none">Abrir o site ↗</a><span class="mut" style="font-size:12px;align-self:center;overflow-wrap:anywhere">${esc(i.u.replace(/^https?:\/\//, ''))}</span></div>`;
    panel.classList.add('on'); scrim.classList.add('on'); panel.setAttribute('aria-hidden', 'false');
    $('#pclose').focus();
  }
  function closePanel() {
    if (!openId) return; openId = null;
    panel.classList.remove('on'); scrim.classList.remove('on'); panel.setAttribute('aria-hidden', 'true');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  grid.addEventListener('click', e => { const c = e.target.closest('.card'); if (c) openPanel(c.dataset.id); });
  scrim.addEventListener('click', closePanel);
  panel.addEventListener('click', e => {
    if (e.target.closest('#pclose')) return closePanel();
    const b = e.target.closest('[data-st]'); if (!b || !openId) return;
    store.set('lib.st.' + openId, b.dataset.st);
    panel.querySelectorAll('[data-st]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const el = grid.querySelector(`.card[data-id="${openId}"] .stt`); if (el) { el.dataset.s = b.dataset.st; el.textContent = ST[b.dataset.st]; }
    $('#count').textContent = $('#count').textContent; // contagem só muda ao refiltrar
  });
  addEventListener('keydown', e => {
    if (!openId) return;
    if (e.key === 'Escape') return closePanel();
    if (e.key === 'Tab') { // prende o foco no painel
      const f = [...panel.querySelectorAll('button,a[href]')]; if (!f.length) return;
      const a = document.activeElement, first = f[0], last = f[f.length - 1];
      if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); } else if (!panel.contains(a)) { e.preventDefault(); first.focus(); }
    }
  });

  /* stepper: loop automático + manual */
  const DUR = 2800;
  let cur = 0, playing = !reduce, timer = null;
  const flow = $('#flow'), ftxt = $('#ftxt'), fbar = $('#fbar'), fplay = $('#fplay');
  flow.innerHTML = '<span class="fill" aria-hidden="true"></span>' + STEPS.map((s, i) => `<li style="list-style:none"><button type="button" class="st" data-i="${i}" style="width:100%"><i>${i + 1}</i><span>${s[0]}</span></button></li>`).join('');
  flow.style.display = 'grid';
  // as <li> são os itens da grade; o trilho usa posição absoluta
  function showStep(n, fromUser) {
    cur = (n + STEPS.length) % STEPS.length;
    const s = STEPS[cur];
    flow.querySelectorAll('.st').forEach((b, i) => { b.classList.toggle('on', i === cur); b.classList.toggle('done', i < cur); if (i === cur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
    flow.style.setProperty('--p', cur / (STEPS.length - 1));
    ftxt.style.animation = 'none'; void ftxt.offsetWidth; ftxt.style.animation = '';
    ftxt.innerHTML = `<span class="who">Passo ${cur + 1} de ${STEPS.length} · ${s[1]}</span><h3>${s[0]}</h3><p>${s[2]}</p><div class="io"><span><b>${s[3].split(':')[0]}:</b>${s[3].split(':')[1]}</span><span><b>${s[4].split(':')[0]}:</b>${s[4].split(':')[1]}</span></div>`;
    restartBar();
  }
  function restartBar() {
    clearTimeout(timer);
    fbar.classList.remove('run'); void fbar.offsetWidth;
    if (playing) { fbar.classList.add('run'); timer = setTimeout(() => showStep(cur + 1), DUR); }
  }
  function setPlaying(p) {
    playing = p; fplay.setAttribute('aria-pressed', String(p)); fplay.textContent = p ? 'Pausar' : 'Reproduzir'; restartBar();
  }
  flow.addEventListener('click', e => { const b = e.target.closest('.st'); if (b) { setPlaying(false); showStep(+b.dataset.i, true); } });
  $('#fnext').onclick = () => { setPlaying(false); showStep(cur + 1, true); };
  $('#fprev').onclick = () => { setPlaying(false); showStep(cur - 1, true); };
  fplay.onclick = () => setPlaying(!playing);
  fbar.style.setProperty('--dur', DUR + 'ms');
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimeout(timer); else restartBar(); });
  if (reduce) { fplay.setAttribute('aria-pressed', 'false'); fplay.textContent = 'Reproduzir'; }

  setProduct(store.get('lib.product') || 'somma');
  render();
  showStep(0);
})();
