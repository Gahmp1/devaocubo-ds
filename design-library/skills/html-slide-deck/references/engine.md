# O motor por dentro

Leia isto antes de tentar mudar *comportamento* (não conteúdo) — o JS tem estado e timing
que é fácil quebrar sem querer.

## Navegação

- `slides` é lido de `document.querySelectorAll('.slide')` uma vez, na carga da página — a
  ordem no DOM é a ordem de navegação. Não há reordenação por JS.
- `current` é o índice ativo. `render()` aplica `active`/`prev`/`next` em todo slide a cada
  navegação — as transições de opacidade/translateX vêm do CSS (`.slide.prev`/`.slide.next`),
  não de JS animando propriedades diretamente.
- Avançar (`next()`) e voltar (`prev()`) são as únicas duas ações; não há "ir direto pro
  slide N" fora da overview modal.
- `pageTotal` é setado uma vez, calculado de `slides.length` — se você adicionar/remover
  slides depois de gerar o arquivo, o contador já reflete o novo total automaticamente na
  próxima carga da página. Não precisa (e não deve) hardcodar esse número em lugar nenhum.

## Atalhos de teclado

| Tecla | Ação |
|---|---|
| `→` / espaço | avança |
| `←` | volta |
| `f` | tela cheia (toggle) |
| `o` | abre/fecha a visão geral |
| `Esc` | fecha a visão geral (só se estiver aberta) |

Espaço é ignorado se o foco estiver num `<button>` (evita ativar o botão em vez de avançar o
slide — ex: o botão de replay do terminal).

## Touch / mobile

Clique/toque na metade esquerda da tela volta, direita avança — exceto se o clique foi em
algo interativo (`isInteractive()` verifica `button, a, input, textarea, select,
[role="button"]`) ou se há texto selecionado (pra não brigar com o usuário tentando copiar
texto). O rodapé detecta touch (`ontouchstart` / `maxTouchPoints`) e troca a dica de "← → /
espaço" pra "toque nos lados".

## Animação do terminal

`maybePlayTerminal(slide)` roda quando um slide se torna `active` — mas só a primeira vez
(`term.dataset.played` marca isso depois de tocar uma vez). Isso existe pra não re-animar
irritantemente cada vez que alguém navega de volta pra um slide já visto; o botão `↻ replay`
existe exatamente pra quem quiser assistir de novo de propósito.

A animação em si, em `playTerminal()`:
1. Digita `data-cmd` no `.term-cmd`, um caractere por vez, com delay aleatório entre 20-54ms
   (`20 + Math.random()*34`) — isso é o que faz parecer digitação real e não um efeito de
   máquina de escrever perfeitamente uniforme.
2. 360ms depois de terminar de digitar, começa a revelar as `.term-line[data-line]`, uma por
   vez, 240ms de intervalo entre elas.
3. 180ms depois da última linha, mostra a linha de prompt vazia (`[data-next]`).

Se `prefers-reduced-motion: reduce` estiver ativo no sistema do usuário, tudo isso é
pulado — o comando e todas as linhas aparecem instantaneamente. Isso já está tratado no CSS
(`@media (prefers-reduced-motion: reduce)`) e no JS (`reduceMotion` checado no topo de
`playTerminal`) — não precisa fazer nada extra pra suportar isso, só não remova essas duas
checagens se for editar a função.

## Overview modal

Construída dinamicamente no load: um `.ov-card` por slide, lendo `.eyebrow`/`.slide-title` de
cada um pra montar o texto do card. Clicar num card navega direto pro slide (`current = i;
render(); closeOverview();`) — não há paginação nem busca, é uma grade simples. Com mais de
~16 slides a grade fica com scroll vertical (já tratado, `#overview` tem
`overflow-y:auto`), então não há limite prático de slides.

## Barra de progresso

Largura = `current / (total - 1) * 100%` — ou seja, no slide 1 fica em 0%, no último fica em
100%. Com um deck de um slide só (`total === 1`), o código evita divisão por zero e força
100% direto.

## O que NÃO mudar sem entender por quê

- **Não troque `setTimeout` por `requestAnimationFrame`** na animação do terminal — o timing
  é deliberadamente "impreciso" (`Math.random()`) pra parecer digitação humana; RAF pra isso
  seria over-engineering sem ganho perceptível.
- **Não remova o `dataset.played`** — sem ele, o terminal re-anima cada vez que o slide volta
  a ficar ativo, o que é irritante em apresentações reais (alguém volta um slide pra revisar
  um ponto e a animação toda começa de novo).
- **Não adicione um framework de build/bundler.** O ponto inteiro do formato é "um arquivo,
  duplo clique, funciona". Se sentir vontade de adicionar um passo de build, é sinal de que o
  deck cresceu além do que esse formato deveria fazer — nesse caso, o problema é escopo do
  deck, não uma limitação do motor.
