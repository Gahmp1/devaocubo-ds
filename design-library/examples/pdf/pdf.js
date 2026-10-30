(() => {
  const NAMES = { somma: 'Somma', swfitness: 'SWFitness', trippo: 'Trippo', systemdesign: 'SystemDesign' };
  const COPY = {
    somma: { title: 'Painel de metas e importação guiada', sub: 'Proposta de design para ajudar quem usa o Somma a importar extratos e acompanhar metas por categoria.', client: 'Equipe de Produto Somma (exemplo)',
      lead: 'Propomos redesenhar a importação de extratos e criar um painel de metas que mostre, num olhar, quanto sobrou do mês.',
      goals: ['Importar PDF, CSV e OFX em no máximo três toques', 'Criar metas mensais por categoria', 'Mostrar saldo e comparativo do mês no início', 'Revisar textos e acessibilidade de todas as telas'],
      quote: 'Eu só quero abrir o app e saber quanto sobrou do mês.', cite: 'Pessoa usuária fictícia · EXEMPLO',
      deliv: ['Mapa de problemas da importação', 'Telas do painel e das metas', 'Protótipo navegável de importar e conferir', 'Arquivos finais e tokens'] },
    swfitness: { title: 'Treino por conversa e histórico de séries', sub: 'Proposta de design para o SWFitness montar o treino do dia numa conversa e guardar o histórico por exercício.', client: 'Equipe de Produto SWFitness (exemplo)',
      lead: 'Propomos uma conversa que monta o treino do dia e um registro de séries que conte o descanso sozinho.',
      goals: ['Montar o treino do dia em uma conversa curta', 'Registrar séries com descanso automático', 'Mostrar o histórico por exercício', 'Revisar textos e acessibilidade de todas as telas'],
      quote: 'Quero dizer o que treinar e já ter a lista pronta na academia.', cite: 'Pessoa usuária fictícia · EXEMPLO',
      deliv: ['Mapa de problemas do treino atual', 'Telas da conversa e do registro', 'Protótipo navegável do treino do dia', 'Arquivos finais e tokens'] },
    trippo: { title: 'Roteiro de viagem que funciona sem internet', sub: 'Proposta de design para o Trippo guardar roteiros por dia, com mapa, e abri-los mesmo sem sinal.', client: 'Equipe de Produto Trippo (exemplo)',
      lead: 'Propomos um roteiro por dia com mapa que continue disponível offline e possa ser compartilhado com a turma.',
      goals: ['Mostrar o roteiro por dia com mapa', 'Abrir roteiros salvos sem internet', 'Compartilhar o roteiro com a turma', 'Revisar textos e acessibilidade de todas as telas'],
      quote: 'Na estrada o sinal some; o roteiro tem que continuar ali.', cite: 'Pessoa usuária fictícia · EXEMPLO',
      deliv: ['Mapa de problemas do roteiro atual', 'Telas do dia e do mapa', 'Protótipo navegável do modo offline', 'Arquivos finais e tokens'] },
    systemdesign: { title: 'Painel de decisões de arquitetura', sub: 'Proposta de design para o SystemDesign registrar decisões com contexto e consequências e compará-las por evolução.', client: 'Equipe de Produto SystemDesign (exemplo)',
      lead: 'Propomos um painel que registre cada decisão com contexto e consequências e permita comparar alternativas lado a lado.',
      goals: ['Registrar decisões com contexto e consequências', 'Ver as decisões por evolução', 'Comparar alternativas lado a lado', 'Revisar textos e acessibilidade de todas as telas'],
      quote: 'Quero ver por que decidimos isso, sem caçar em três documentos.', cite: 'Pessoa usuária fictícia · EXEMPLO',
      deliv: ['Mapa de problemas do registro atual', 'Telas do painel e da comparação', 'Protótipo navegável das alternativas', 'Arquivos finais e tokens'] }
  };
  const PH = [['Descoberta', 1, 24], ['Design', 3, 72], ['Protótipo', 2, 48], ['Entrega', 1, 24]];
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement, stage = $('#stage');
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const PX_PER_MM = 96 / 25.4, SHEET_W = 210 * PX_PER_MM;

  // troca de produto
  const prodBox = $('#prod');
  Object.entries(NAMES).forEach(([k, n]) => {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.p = k; b.textContent = n; b.setAttribute('aria-pressed', 'false'); prodBox.append(b);
  });
  function setProduct(p) {
    if (!COPY[p]) p = 'somma';
    root.dataset.product = p; store.set('pdf.product', p);
    $$('button', prodBox).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.p === p)));
    const c = COPY[p];
    $$('[data-k]').forEach(el => { const k = el.dataset.k; el.textContent = k === 'name' ? NAMES[p] : c[k]; });
    $('#goals').innerHTML = c.goals.map(g => `<li>${g}</li>`).join('');
    $('#phases').innerHTML = PH.map((f, i) => `<tr><td>${f[0]}</td><td>${c.deliv[i]}</td><td class="n">${f[1]}</td><td class="n">${f[2]}</td></tr>`).join('');
    document.title = `design-pdf · ${NAMES[p]} · proposta A4`;
  }
  prodBox.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setProduct(b.dataset.p); });

  // zoom e modo
  const zr = $('#zr'), zv = $('#zv'), modeBox = $('#mode');
  function setZoom(pct) {
    pct = Math.max(40, Math.min(150, Math.round(pct / 5) * 5));
    zr.value = pct; zv.textContent = pct + '%'; stage.style.setProperty('--z', pct / 100); store.set('pdf.zoom', pct);
  }
  const fitPct = () => Math.min(150, Math.floor(((stage.clientWidth - 32) / SHEET_W) * 100));
  function setMode(m) {
    const flow = m === 'flow';
    stage.classList.toggle('flow', flow); store.set('pdf.mode', m);
    $$('button', modeBox).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.m === m)));
    $('#zoomBox').querySelectorAll('button,input').forEach(el => { el.disabled = flow; });
    $('#hint').textContent = flow ? 'Rolagem contínua: o texto reflui na largura da tela. Para ver as folhas A4, volte para "Folhas".' : 'Pré-visualização das folhas A4. Na impressão, o navegador usa as margens e o cabeçalho/rodapé correntes do @page.';
  }
  modeBox.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setMode(b.dataset.m); });
  zr.addEventListener('input', () => setZoom(+zr.value));
  $('#zin').onclick = () => setZoom(+zr.value + 10);
  $('#zout').onclick = () => setZoom(+zr.value - 10);
  $('#zfit').onclick = () => setZoom(fitPct());
  $('#print').onclick = () => window.print();

  // número total de páginas para o contador do CSS
  root.style.setProperty('--total', `"${$$('.page').length}"`);

  const narrow = root.clientWidth < 700;
  setProduct(new URLSearchParams(location.search).get('p') || store.get('pdf.product') || 'somma');
  setMode(store.get('pdf.mode') || (narrow ? 'flow' : 'sheets'));
  setZoom(store.get('pdf.zoom') ? +store.get('pdf.zoom') : Math.min(100, fitPct()));
  if (!narrow && !store.get('pdf.zoom')) setZoom(Math.min(100, fitPct()));
})();
