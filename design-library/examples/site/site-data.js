/* Copy da landing por produto (EXEMPLO). Estende o LAB de data.js, que já traz chat, telas e onboarding de cada app. */
LAB.site = {
  sections: [
    ['hero', 'Hero com orbe e CTA'], ['marquee', 'Faixa marquee'], ['benef', 'Cards de benefício'],
    ['app', 'Bloco “o app”'], ['preco', 'Preços'], ['faq', 'FAQ'], ['cta', 'Rodapé com CTA']
  ],
  titles: {
    benef: ['Benefícios', 'O que muda no seu dia'],
    app: ['O app', 'Três telas, um fluxo'],
    preco: ['Preços', 'Escolha o seu plano'],
    faq: ['Perguntas frequentes', 'Dúvidas comuns']
  },
  orb: { somma: 'searching', swfitness: 'working', trippo: 'waiting', systemdesign: 'solving' },
  p: {
    somma: {
      tag: 'Finanças pessoais',
      head: ['Seu dinheiro,', 'num olhar'],
      sub: 'Importe o extrato, veja para onde foi cada real e pergunte ao chat o que quiser saber sobre as suas contas.',
      cta: 'Começar grátis', cta2: 'Ver o app',
      pills: ['Importa PDF, CSV e OFX', 'Categorias automáticas', 'Chat sobre seus gastos'],
      marquee: ['Saldo', 'Extrato', 'Metas', 'Importar', 'Categorias', 'Chat'],
      benefits: [
        { ic: 'chart', t: 'Saldo sem planilha', d: 'Tudo o que entra e sai do mês, num painel só, atualizado a cada importação.' },
        { ic: 'layers', t: 'Importe em um toque', d: 'Traga o extrato do banco em PDF, CSV ou OFX e deixe as categorias por conta do app.' },
        { ic: 'chat', t: 'Pergunte em português', d: 'Quanto gastei com lazer em julho? A resposta vem do seu extrato, com os números na tela.' }
      ],
      steps: [['Escolha como começar', 'Importe um extrato ou lance à mão.'], ['Pergunte ao chat', 'Peça um total, um limite ou uma comparação.'], ['Veja o painel', 'Saldo, categorias e metas em uma tela.']],
      plans: [
        { n: 'Grátis', d: 'Para começar', m: 0, f: ['1 conta importada', 'Painel e categorias', '10 perguntas ao chat por mês'] },
        { n: 'Pro', d: 'Para o dia a dia', m: 19.9, f: ['Contas ilimitadas', 'Metas e limites mensais', 'Chat sem limite de perguntas'] },
        { n: 'Plus', d: 'Para a família', m: 39.9, f: ['Tudo do Pro', 'Até 4 pessoas', 'Exportação dos dados'] }
      ],
      faq: [
        ['Preciso conectar meu banco?', 'Não. Você importa o extrato em PDF, CSV ou OFX e o app lê os lançamentos. Nenhuma senha do banco entra no processo.'],
        ['Posso corrigir uma categoria?', 'Pode. Ajuste um lançamento e a regra vale para os próximos do mesmo estabelecimento.'],
        ['O que o chat consegue responder?', 'Totais, comparações entre meses e entre categorias, sempre a partir dos lançamentos que você já importou.'],
        ['Posso cancelar quando quiser?', 'Sim. O cancelamento é feito no próprio app e vale até o fim do período já pago.']
      ],
      foot: ['Comece pelo saldo do mês.', 'Importe um extrato e veja o painel em minutos.']
    },
    swfitness: {
      tag: 'Treino',
      head: ['Treino pensado', 'para você'],
      sub: 'Diga o foco e o tempo que você tem. O app monta o treino, ordena as séries e guarda a sua evolução.',
      cta: 'Montar meu plano', cta2: 'Ver o app',
      pills: ['Treino em 45 minutos', 'Biblioteca de exercícios', 'Histórico de cargas'],
      marquee: ['Peito', 'Costas', 'Pernas', 'Ombros', 'Cardio', 'Descanso'],
      benefits: [
        { ic: 'bolt', t: 'Plano em minutos', d: 'Responda três perguntas e receba a semana de treino pronta, com dias e descansos.' },
        { ic: 'trend', t: 'Cargas que progridem', d: 'Cada série registrada alimenta a sugestão da próxima carga, sem conta de cabeça.' },
        { ic: 'chat', t: 'Treino por conversa', d: 'Peça “peito e tríceps, 45 min” e o treino aparece pronto para salvar como o de hoje.' }
      ],
      steps: [['Escolha o foco', 'Ganhar massa, perder gordura ou ficar mais forte.'], ['Peça o treino', 'Diga o grupo muscular e o tempo disponível.'], ['Acompanhe a semana', 'Sequência, treinos e descansos em uma tela.']],
      plans: [
        { n: 'Grátis', d: 'Para começar', m: 0, f: ['3 treinos salvos', 'Biblioteca de exercícios', 'Histórico dos últimos 30 dias'] },
        { n: 'Pro', d: 'Para treinar toda semana', m: 24.9, f: ['Treinos ilimitados', 'Treino por conversa', 'Histórico completo'] },
        { n: 'Plus', d: 'Para planos longos', m: 44.9, f: ['Tudo do Pro', 'Planos de várias semanas', 'Exportação dos dados'] }
      ],
      faq: [
        ['Preciso de equipamento?', 'Não. Você informa o que tem à mão e o plano usa só isso.'],
        ['Posso trocar um exercício?', 'Pode. A série segue com a carga que você já usa no exercício novo.'],
        ['O app substitui um profissional?', 'Não. Ele organiza o treino; em caso de lesão ou dúvida, procure um profissional de educação física ou um médico.'],
        ['Posso cancelar quando quiser?', 'Sim. O cancelamento é feito no próprio app e vale até o fim do período já pago.']
      ],
      foot: ['Monte o treino de hoje.', 'Responda três perguntas e comece a semana com plano.']
    },
    trippo: {
      tag: 'Viagens',
      head: ['Sua viagem,', 'dia a dia'],
      sub: 'Conte o destino e o ritmo. O app sugere lugares, ordena o trajeto e deixa o roteiro de cada dia à mão.',
      cta: 'Planejar minha viagem', cta2: 'Ver o app',
      pills: ['Roteiro por dia', 'Mapa dos lugares', 'A pé ou de metrô'],
      marquee: ['Roteiro', 'Mapa', 'Lugares', 'Dias', 'Reservas', 'Trajeto'],
      benefits: [
        { ic: 'route', t: 'Um dia por vez', d: 'Cada dia ganha uma lista ordenada de lugares, com horário e endereço.' },
        { ic: 'pin', t: 'Mapa junto do plano', d: 'Veja a distância entre os lugares antes de decidir o que entra no dia.' },
        { ic: 'chat', t: 'Roteiro por conversa', d: 'Peça “o dia 3 em Lisboa, sem carro” e aceite ou troque cada sugestão.' }
      ],
      steps: [['Diga para onde vai', 'Destino, número de dias e o ritmo da viagem.'], ['Converse sobre o dia', 'Peça sugestões e aceite os lugares que combinam.'], ['Siga o roteiro', 'Linha do tempo, mapa e viagens em um só lugar.']],
      plans: [
        { n: 'Grátis', d: 'Para uma viagem', m: 0, f: ['1 viagem ativa', 'Roteiro por dia', 'Mapa dos lugares'] },
        { n: 'Pro', d: 'Para quem viaja sempre', m: 17.9, f: ['Viagens ilimitadas', 'Roteiro por conversa', 'Roteiros salvos no aparelho'] },
        { n: 'Plus', d: 'Para viajar em grupo', m: 34.9, f: ['Tudo do Pro', 'Edição em grupo', 'Exportação do roteiro'] }
      ],
      faq: [
        ['Funciona sem internet?', 'No Pro, o roteiro fica salvo no aparelho e você consulta os dias e os endereços offline.'],
        ['Posso planejar com amigos?', 'No Plus, o grupo edita o mesmo roteiro e vê as mudanças de cada pessoa.'],
        ['De onde vêm as sugestões?', 'De lugares e avaliações públicas. Você sempre confirma o que entra no dia.'],
        ['Posso cancelar quando quiser?', 'Sim. O cancelamento é feito no próprio app e vale até o fim do período já pago.']
      ],
      foot: ['Comece pelo dia 1.', 'Conte o destino e receba o primeiro roteiro.']
    },
    systemdesign: {
      tag: 'Arquitetura de software',
      head: ['Arquitetura', 'que se desenha'],
      sub: 'Descreva o sistema em uma frase e veja serviços, filas e bancos aparecerem no canvas, prontos para editar.',
      cta: 'Abrir o canvas', cta2: 'Ver o app',
      pills: ['Canvas editável', 'Padrões de arquitetura', 'Exporta o diagrama'],
      marquee: ['Serviços', 'Filas', 'Bancos', 'Fluxos', 'Padrões', 'Canvas'],
      benefits: [
        { ic: 'nodes', t: 'Do texto ao diagrama', d: 'Descreva o sistema e receba os nós e as ligações já posicionados no canvas.' },
        { ic: 'layers', t: 'Padrões à mão', d: 'Fila, cache, gateway: escolha um padrão e ele entra no desenho com as dependências.' },
        { ic: 'route', t: 'Fluxos que se explicam', d: 'Siga uma requisição pelo canvas e veja cada serviço que ela atravessa.' }
      ],
      steps: [['Escolha o ponto de partida', 'App mobile, plataforma web ou pipeline de dados.'], ['Descreva o sistema', 'Uma frase basta para o primeiro desenho.'], ['Refine no canvas', 'Mova nós, ligue serviços e salve o fluxo.']],
      plans: [
        { n: 'Grátis', d: 'Para experimentar', m: 0, f: ['3 diagramas', 'Canvas editável', 'Padrões básicos'] },
        { n: 'Pro', d: 'Para o dia a dia', m: 29.9, f: ['Diagramas ilimitados', 'Desenho por conversa', 'Exporta em SVG e PNG'] },
        { n: 'Plus', d: 'Para a equipe', m: 59.9, f: ['Tudo do Pro', 'Comentários no canvas', 'Histórico de versões'] }
      ],
      faq: [
        ['Posso editar o que a IA desenhou?', 'Pode. Tudo vira nós e ligações comuns no canvas, que você move, apaga ou refaz.'],
        ['Que tipo de sistema dá para desenhar?', 'Apps mobile, plataformas web e pipelines de dados são os pontos de partida; o resto você monta por cima.'],
        ['Dá para exportar o diagrama?', 'Sim. No Pro você exporta em SVG e PNG para colar em documentos e apresentações.'],
        ['Posso cancelar quando quiser?', 'Sim. O cancelamento é feito no próprio app e vale até o fim do período já pago.']
      ],
      foot: ['Desenhe o primeiro sistema.', 'Uma frase, um canvas, um diagrama editável.']
    }
  }
};
