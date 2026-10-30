---
name: html-slide-deck
description: Gera apresentações em um único arquivo HTML autocontido (sem build, sem CDN, sem dependência externa) no estilo "showcase de arquitetura" — dark, monocromático, navegação por teclado/toque/swipe, barra de progresso, terminal com animação de digitação real, mock de site (browser fake) e mock de app mobile (frame de celular), tudo em HTML/CSS puro. Use esta skill sempre que o usuário pedir uma apresentação, slide deck, showcase, deck de arquitetura, "algo pra mostrar pro time", demo animada de terminal, ou qualquer variação de "gera um HTML pra apresentar X" — mesmo que não peça um "slide deck" literalmente. Não é para relatórios estáticos de uma página só (isso é markdown/HTML simples) nem para dashboards de dados (isso é a skill dataviz) — é especificamente para uma sequência narrativa de telas navegáveis.
---

# html-slide-deck

Gera decks de apresentação como o artefato de referência "práxis ⇄ ProjectsStation": um
único arquivo HTML, zero dependências externas, motor de slides dark/monocromático já
testado e funcionando. Você não reescreve o motor — você monta o conteúdo em cima dele.

## Por que existe

O motor (CSS + JS) já foi escrito, testado e validado duas vezes neste projeto. Reescrever
do zero a cada deck é desperdício e risco de regressão (barra de progresso, navegação por
teclado, animação de terminal — tudo isso tem estado e timing que é fácil quebrar
"melhorando"). A skill existe pra você **copiar o motor intacto** e gastar seu esforço só no
que muda: o conteúdo.

## Passo a passo

0. **Motor novo (v2).** `assets/base-deck-v2.html` é o mesmo motor estendido: temas por produto
   (tecla T, `data-product` no `<html>`), fragmentos por passo (`data-step`), transição por slide
   (`data-transition` = slide, zoom ou fade), contador (`data-count`), visão geral com miniaturas (O),
   modo apresentador (P), hash `#n` e folha de impressão (Ctrl+P gera 1 slide por página). Mesmos
   placeholders. Exemplo completo montado nele: `design-library/examples/deck`. O que mudou e por quê:
   [references/changes-v2.md](references/changes-v2.md). Os blocos de `assets/blocks/` ainda não foram
   conferidos um a um no v2 (o bloco `site-mock` perdeu o CSS); até isso ser feito, o `base-deck.html`
   original continua aqui. Para um deck novo sem esses blocos, prefira o v2.

1. **Copie o template-base.** `assets/base-deck.html` tem o motor completo (CSS + JS) com
   dois placeholders: `__DECK_TITLE__` (no `<title>`) e `__SLIDES__` (onde os slides entram).
   Copie o arquivo inteiro para o destino final antes de editar — não recrie o CSS/JS do
   zero, mesmo que pareça mais rápido escrever menos.

2. **Escolha os blocos de conteúdo.** Cada arquivo em `assets/blocks/` é um
   `<section class="slide">...</section>` completo e comentado, pronto pra copiar dentro de
   `__SLIDES__`. Veja [references/blocks.md](references/blocks.md) para a tabela completa de
   quando usar cada um. Resumo rápido:

   | Bloco | Quando usar |
   |---|---|
   | `hero.html` | Sempre o slide 1 |
   | `principle-cards.html` | "O que é X" — 3-4 conceitos sem hierarquia entre eles |
   | `stat-cards.html` | Números grandes soltos ("os números da prova") |
   | `decision-cards.html` | Roadmap / "o que falta" — tag falta·verificar·já existe |
   | `code-block-arrows.html` | Direção de chamada, pipeline, fluxo entre sistemas |
   | `terminal.html` | Demonstrar um comando real rodando, com output |
   | `site-mock.html` | Mockar uma tela de produto web sem precisar de screenshot |
   | `app-mock.html` | Mockar uma tela de app mobile (frame de celular) |
   | `compare.html` | Antes/depois de um fix ou decisão |

3. **Preencha com conteúdo real, não placeholder genérico.** Todo `__texto_assim__` nos
   blocos é pra ser substituído por conteúdo verdadeiro — número real, comando real, nome de
   arquivo real, commit real. Se o usuário acabou de fazer algo nesta conversa (um fix, um
   deploy, uma investigação), **esse é o conteúdo do deck** — puxe números e comandos do que
   de fato aconteceu, não invente exemplos abstratos. Um deck com "Lorem ipsum" ou "exemplo
   genérico aqui" falhou o propósito: o valor inteiro do formato é mostrar prova real.

4. **Monte a narrativa como uma sequência, não uma lista.** O padrão de referência segue
   sempre a mesma forma: abertura (hero) → conceito(s) → demonstração(ões) real(is) →
   antes/depois ou números → encerramento (ecoa a hero-meta da abertura). Um deck de 8-14
   slides costuma ser o ponto certo — curto demais não prova nada, longo demais perde quem
   está assistindo. Se o usuário não especificou quantos slides, prefira o menor número que
   ainda conta a história completa.

5. **Feche o `<title>` e o `<div id="deck">`, salve, abra no navegador.** O contador de
   páginas no rodapé (`pageTotal`) é calculado sozinho pelo JS a partir de quantos
   `.slide` existem — não precisa contar manualmente. Depois de salvar, abra o arquivo
   (`open <arquivo>.html` no macOS) e navegue por ele mentalmente antes de entregar: confirme
   que o terminal anima, que as setas funcionam, que nada ficou com `__placeholder__` sem
   substituir.

## Regras que não são negociáveis

- **Um arquivo, zero dependências.** Sem CDN, sem `<script src="https://...">`, sem
  build step. A pessoa que recebe o deck só precisa dar duplo-clique. Isso é o que torna o
  formato compartilhável — não abra mão disso por conveniência.
- **Sem imagem real a menos que ela realmente importe.** Um screenshot em base64 facilmente
  passa de 100-200KB só naquela linha. Se o ponto do slide é "a forma da tela" (fluxo,
  hierarquia, estados), use a variante 100% HTML/CSS de `site-mock.html`/`app-mock.html`.
  Só embuta uma screenshot real quando o produto real — pixels, marca, dados — for
  literalmente o que está sendo mostrado.
- **Todas as variáveis de cor vêm de `:root`.** Se precisar reskinar (outra marca, modo
  claro), troque só as variáveis no topo do `<style>` — nunca uma cor hardcoded solta no meio
  do HTML dos blocos.
- **Terminal: `data-cmd` é o comando, não o texto visível.** O JS lê o atributo
  `data-cmd`, não o `textContent` do `<span class="term-cmd">` — ele começa vazio e o JS
  digita o conteúdo do atributo caractere a caractere. Esqueceu isso, o comando nunca aparece.
- **Não invente números.** Se você não tem o número real (linhas de diff, contagem de
  tentativas, IDs de commit), pergunte ou omita o stat-card — não arredonde/estime pra
  preencher espaço. Isso destrói a credibilidade do deck com quem sabe os números reais.

## Referências

- [references/blocks.md](references/blocks.md) — cada bloco em detalhe: classes CSS
  envolvidas, variações, armadilhas específicas.
- [references/engine.md](references/engine.md) — como o motor funciona por dentro (barra de
  progresso, animação do terminal, overview modal, atalhos de teclado) — leia antes de
  tentar customizar o comportamento, não só o conteúdo.
