# Mudanças no motor (deck.html em relação a assets/base-deck.html)

Contrato mantido: um arquivo HTML, zero dependências externas, fontes do sistema, motor copiado e estendido. Barra de progresso, tap zones, animação do terminal (`data-cmd`, `dataset.played`, `setTimeout` com atraso aleatório), `f` e `o` seguem como no base.

## CSS

| Item | Mudança | Motivo |
|---|---|---|
| Temas por produto | Blocos `:root[data-product="swfitness\|systemdesign\|trippo"]` redefinem as mesmas variáveis; `:root` puro = somma. Cores do deck só saem de variáveis. | Reskin em tempo de execução sem tocar nos blocos. |
| Variáveis novas | `--track`, `--glow`, `--overlay`, `--shadow`, `--phone-a`, `--phone-b`, `--ease`. | No base eram cores soltas (`rgba(255,255,255,.06)`, `#2a2a2e`, `rgba(6,9,15,.94)`, sombras) que quebravam o tema claro. |
| Medidas em variáveis | `--pad-t/--pad-x/--pad-b`, `--phone-h` no lugar de `8vh 8vw 9vh` e `70vh`. | Miniaturas e impressão fixam o palco em 1280x720 px só redefinindo variáveis. |
| Tags semânticas | `color-mix()` sobre `--danger/--warning/--success` no lugar de `rgba` fixo. | Seguem o tema. |
| Transições | `#deck[data-tr="zoom\|fade"]` sobrescreve `.slide.prev/.next`; padrão continua lateral; `filter` entra na transição. | `data-transition` por slide (lateral, zoom, fade com desfoque). O tipo vem do slide de destino, então entrada e saída combinam. |
| Movimento reduzido | `@media (prefers-reduced-motion)` agora também zera `filter/transform` dos slides, transições dos fragmentos, pontos do mock. | Respeitar a preferência nas três transições e nos fragmentos. |
| Fragmentos | `[data-step]` oculto; `.on` revela. | Revelação por passo. |
| Container queries | `.slide` ganha `container-type:inline-size`; as `@media (max-width:900px)` de grids e compare viram `@container`. Grid 1 coluna abaixo de 420 px. | A miniatura renderiza o slide a 1280 px e sai com o layout de desktop mesmo em tela estreita. |
| Overview | `.ov-thumb`/`.ov-stage` (palco 1280x720 escalado por `--s`), `.ov-card.current`, seletor `.ov-themes`. | Grade com miniaturas reais e troca de tema na visão geral. |
| Apresentador/aviso | `#presenter`, `#toast`. | Cronômetro, contadores e confirmação do tema. |
| Folha de impressão | `@page{size:1280px 720px;margin:0}` e `@media print`: um slide por página, sem animação, fragmentos e linhas do terminal visíveis, `.term-cmd:empty::before{content:attr(data-cmd)}`, esconde UI, `print-color-adjust:exact`. | Ctrl+P vira PDF; o comando do terminal aparece mesmo sem JS. |
| Rodapé | Dica com reticências e `min-width:0`; padding menor abaixo de 640 px. | A dica longa nova não pode estourar em 375 px. |
| `.hero-glow` | `width:min(640px,100%)`, `height:min(640px,84%)`. | No base o brilho gerava 21 px de rolagem vertical em 1280x720 e 133 px horizontal em 375 px. |
| Componentes novos | `.split` (texto + celular), `.card--compact`, `.wait` (pontos pulsando), `.stat-label{display:block}`. | Adaptações dos blocos para este conteúdo. |
| Removido | CSS de `.product-window`/`.pw-*` (bloco site-mock, não usado). | O deck não usa; o bloco continua na skill. |

## JS

| Item | Mudança | Motivo |
|---|---|---|
| Estado de passo | `step` + `maxSteps[]`. `next()` revela o próximo `data-step` e só então passa de slide; `prev()` desfaz o passo e, ao voltar de slide, cai no estado final. Também vale para tap zones. | Fragmentos com → / espaço e ←. |
| `render()` | Define `#deck[data-tr]`, aplica `.on` nos fragmentos (slides anteriores totalmente revelados), chama `updateUI()`, terminal e contadores. | Transição por slide e estado coerente. |
| Temas | `THEMES`, `setTheme()`, `cycleTheme()` (tecla T, também com a visão geral aberta), botões `aria-pressed` na visão geral, aviso (toast). | Troca ao vivo por teclado e por seletor. |
| Contadores | `data-count` (+ `data-decimals`, `data-prefix`, `data-suffix`), `toLocaleString('pt-BR')`, animação por tempo (`Date.now` + `setTimeout`, ease-out, 1,1 s) na primeira entrada do slide. O HTML já traz o valor final formatado; movimento reduzido pula a animação. | Números que contam; sem JS ou ao imprimir aparece o valor certo. |
| Overview | Cards ganham miniatura: clone inerte do slide no palco 1280x720 (botões viram `span`, terminal e contadores no estado final, fragmentos visíveis), recriado a cada abertura; setas movem o foco; card do slide atual destacado; recalcula escala no resize. | Miniaturas reais, clicáveis. |
| Apresentador | Tecla P: cronômetro (clique pausa/retoma, R zera), "Slide n/N", "Passo k/m", título do próximo. | Modo apresentador simples. |
| Deep link | `history.replaceState('#n')` a cada navegação, leitura no load e em `hashchange` (valor fora da faixa é limitado). | `#3` restaura o slide. |
| Terminal | Token `_tok` por terminal (replay ou impressão invalidam timers antigos); `showTerminalFull()` reaproveitado no movimento reduzido e no `beforeprint`. | Evita que a digitação em andamento sobrescreva o estado final. |
| Teclado | Ignora combinações com Ctrl/Meta/Alt. | Ctrl+P e atalhos do navegador não disparam o motor. |
| Primeira renderização | Classe `no-anim` no `<html>` por dois quadros. | Abrir direto em `#7` não anima a partir do slide errado. |

## Conteúdo do deck

10 slides: hero, principle-cards, 8 skills (decision-cards compactos), stat-cards com contadores, terminal (`ls` real do devaocubo-ds), fluxo (code-block), app-mock em `.split`, compare, decision-cards de estado do plano, encerramento. Fontes dos fatos: AGENTS.md/README do devaocubo-ds, `docs/design-lab/README.md` e a memória do plano de 29/10/2026. Os números são só os reais (8 skills, 165 ferramentas do toolfolio, 3 artifacts, 4 apps do Lab, folha de 1280 x 720 px). As cores de somma e trippo são aproximações minhas das descrições (menta sobre preto; claro quente com preto de acento), não tokens lidos dos produtos; swfitness e systemdesign usam os hex informados.
