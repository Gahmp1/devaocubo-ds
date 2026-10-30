/* Textos de exemplo por produto. Valores de interface vêm das capturas reais; o resto é ilustrativo. */
window.LAB = {
  order: ['somma', 'swfitness', 'trippo', 'systemdesign'],
  names: { somma: 'Somma', swfitness: 'SWFitness', trippo: 'Trippo', systemdesign: 'SystemDesign' },
  cur() { return document.documentElement.dataset.product || 'somma'; },
  c() { return this.copy[this.cur()]; },
  copy: {
    somma: {
      head: ['Seu dinheiro,', 'num olhar'],
      chat: {
        title: 'Pergunte ao Somma', user: 'Quanto gastei com lazer em julho?',
        labels: ['Lendo seus lançamentos', 'Buscando transações', 'Calculando o total'],
        sub: ['dados autorizados', 'categoria: lazer', 'julho de 2026'],
        steps: ['Entendi: lazer em julho', 'Somando as transações', 'Comparando com as saídas'],
        answer: 'Você gastou R$ 39,90 com lazer em julho. É menos de 1% das suas saídas do mês.',
        chips: ['Transações', 'Categorias'], ask: 'Criar um limite mensal para lazer?'
      },
      screens: {
        tabs: ['Início', 'Extrato', 'Importar', 'Metas'], title: 'Dashboard', chip: 'julho de 2026',
        hero: { l: 'Saldo', v: 4328.74, f: 'brl' },
        rows: [['Contas e Serviços', 'categoria', '-R$ 1.800,00'], ['Lazer', 'categoria', '-R$ 39,90'], ['Entradas', 'mês', 'R$ 9.175,86']]
      },
      ob: {
        title: 'Conecte seu dinheiro', sub: 'Escolha como trazer seus lançamentos.', q: 'Como você quer começar?',
        opts: [['Importar extrato', 'PDF, CSV ou OFX'], ['Lançar à mão', 'Entradas e saídas'], ['Perguntar ao chat', 'Em linguagem natural']],
        plan: 'Seu painel está pronto', rows: [['Categorias', 8], ['Metas ativas', 3], ['Lançamentos', 212]]
      },
      reel: { hook: ['Seu dinheiro,', 'num olhar', 'sem planilha.'], demo: 'Lendo seus lançamentos', stat: [3, 'toques até o saldo do mês'], cta: 'Abrir o Somma', list: ['Planilha esquecida', 'Gasto sem categoria', 'Meta sem prazo'], handle: '@somma', cap: 'Pergunte ao Somma e veja o saldo do mês num olhar' }
    },
    swfitness: {
      head: ['Treino pensado', 'para você'],
      chat: {
        title: 'Treino com IA', user: 'Monta meu treino de peito e tríceps, 45 min',
        labels: ['Montando seu treino', 'Buscando exercícios', 'Ordenando séries'],
        sub: ['peito e tríceps', 'sua biblioteca', 'descansos de 60 s'],
        steps: ['Entendi: 45 min, peito e tríceps', 'Escolhendo exercícios', 'Ordenando séries e descansos'],
        answer: 'Treino pronto: supino reto 4×8, supino inclinado 3×10, crucifixo 3×12, tríceps corda 4×12 e mergulho 3×falha.',
        chips: ['Biblioteca', 'Histórico'], ask: 'Salvar como treino de hoje?'
      },
      screens: {
        tabs: ['Hoje', 'Treinos', 'Plano', 'Perfil'], title: 'Hoje', chip: 'semana 3',
        hero: { l: 'Sequência', v: 12, f: 'dias' },
        rows: [['Peito e tríceps', '45 min', '5 exercícios'], ['Costas e bíceps', '50 min', '6 exercícios'], ['Pernas', '55 min', '6 exercícios']]
      },
      ob: {
        title: 'Qual é o seu foco?', sub: 'Dá para mudar depois.', q: 'Escolha um objetivo',
        opts: [['Ganhar massa', '4 a 5 dias por semana'], ['Perder gordura', 'Treino curto e constante'], ['Ficar mais forte', 'Cargas progressivas']],
        plan: 'Sua semana está pronta', rows: [['Dias por semana', 4], ['Minutos por treino', 45], ['Exercícios', 18]]
      },
      reel: { hook: ['Treine com', 'plano.', 'Não com palpite.'], demo: 'Montando seu treino', stat: [3, 'perguntas e o plano está pronto'], cta: 'Montar meu plano', list: ['Treino sem plano', 'Carga que não progride', 'Descanso ignorado'], handle: '@swfitness', cap: 'Três perguntas e seu plano de treino está pronto' }
    },
    trippo: {
      head: ['Sua viagem,', 'dia a dia'],
      chat: {
        title: 'Roteiro com IA', user: 'Monta o dia 3 em Lisboa, sem carro',
        labels: ['Montando seu dia', 'Pesquisando lugares', 'Ordenando o trajeto'],
        sub: ['Lisboa, dia 3', 'melhor avaliados', 'a pé ou de metrô'],
        steps: ['Entendi: Lisboa, dia 3', 'Pesquisando lugares', 'Ordenando o trajeto'],
        answer: 'Dia 3: LX Factory às 10h, almoço por lá e Elevador de Santa Justa às 14h. Tudo a pé ou de metrô.',
        chips: ['Mapa', 'Avaliações'], ask: 'Adicionar ao roteiro?'
      },
      screens: {
        tabs: ['Linha', 'Roteiro', 'Mapa', 'Viagens'], title: 'Roteiro', chip: 'Lisboa · 3 dias',
        hero: { l: 'Lugares aceitos', v: 8, f: 'int' },
        rows: [['LX Factory', 'R. Rodrigues de Faria 103', 'Aceito'], ['Elevador de Santa Justa', 'R. do Ouro', 'Aceito'], ['Livraria Ler Devagar', '10:30', 'Aceito']]
      },
      ob: {
        title: 'Para onde vamos?', sub: 'Conte o destino e o ritmo.', q: 'Qual é o ritmo da viagem?',
        opts: [['Tranquilo', '2 lugares por dia'], ['Equilibrado', '3 a 4 lugares por dia'], ['Aproveitar tudo', '5 ou mais por dia']],
        plan: 'Seu roteiro está pronto', rows: [['Dias', 3], ['Lugares', 8], ['Cidades', 1]]
      },
      reel: { hook: ['Sua viagem,', 'dia a dia', 'sem abas abertas.'], demo: 'Montando seu dia', stat: [3, 'dias de Lisboa, num roteiro'], cta: 'Planejar minha viagem', list: ['Dez abas abertas', 'Reserva esquecida', 'Dia sem plano'], handle: '@trippo', cap: 'Monte o roteiro da viagem em minutos' }
    },
    systemdesign: {
      head: ['Arquitetura', 'que se desenha'],
      chat: {
        title: 'Desenhar com IA', user: 'Desenha a arquitetura de um app de entregas',
        labels: ['Desenhando o sistema', 'Buscando padrões', 'Ligando os serviços'],
        sub: ['app de entregas', 'filas e serviços', 'um banco por serviço'],
        steps: ['Entendi: app de entregas', 'Escolhendo serviços', 'Ligando as dependências'],
        answer: 'Cinco serviços: pedidos, entregadores, pagamentos, notificações e catálogo, com uma fila entre pedidos e entregadores.',
        chips: ['Canvas', 'Padrões'], ask: 'Colocar no canvas?'
      },
      screens: {
        tabs: ['Canvas', 'Nós', 'Fluxos', 'Conta'], title: 'Canvas', chip: 'rascunho',
        hero: { l: 'Serviços no canvas', v: 5, f: 'int' },
        rows: [['pedidos', 'serviço', '3 ligações'], ['entregadores', 'serviço', '2 ligações'], ['fila', 'dados', '2 ligações']]
      },
      ob: {
        title: 'O que vamos desenhar?', sub: 'Comece pelo tipo de sistema.', q: 'Escolha um ponto de partida',
        opts: [['App mobile', 'API e banco'], ['Plataforma web', 'Front e serviços'], ['Pipeline de dados', 'Filas e jobs']],
        plan: 'Seu canvas está pronto', rows: [['Serviços', 5], ['Ligações', 7], ['Bancos', 3]]
      },
      reel: { hook: ['Arquitetura', 'que se desenha', 'sozinha.'], demo: 'Desenhando o sistema', stat: [5, 'serviços ligados em segundos'], cta: 'Abrir o canvas', list: ['Diagrama desatualizado', 'Dependência escondida', 'Fila sem dono'], handle: '@systemdesign', cap: 'Descreva o sistema e veja o diagrama aparecer' }
    }
  },
  fmt(v, f) {
    if (f === 'brl') return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (f === 'dias') return Math.round(v) + ' dias';
    return String(Math.round(v));
  },
  countUp(el, to, f, ms, from) {
    const t0 = performance.now(); const a = from || 0;
    const step = (n) => {
      const k = Math.min(1, (n - t0) / ms); const e = 1 - Math.pow(1 - k, 3);
      el.textContent = LAB.fmt(a + (to - a) * e, f);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },
  reduced: window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
};
