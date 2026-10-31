# PullToRefresh (sem origem no Zenith; bloco `pull` do Bencho)

Destino: `PullToRefresh` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. O Zenith usa o `RefreshControl` do RN nas listas; ele não avisa quando o limiar é cruzado, então não serve. A ideia vem do bloco `pull` do Bencho (MIT, recriado): o compromisso acontece ao **cruzar** o limiar, não ao soltar. O gesto web segue `design-library/examples/feedback-sensorial`.

| Prop | O que faz |
|---|---|
| `refreshing` | controlado pelo pai: liga em `onRefresh`, desliga quando os dados chegam |
| `onRefresh()` | chamado no instante em que o limiar é cruzado (uma vez por puxada), ou pelo botão "Atualizar" |
| `threshold?` | distância em px que a área desce até armar; padrão 72 |
| `refreshLabel?` | nome do botão acessível; padrão "Atualizar" (sem chave nova em `DSStrings`) |
| `children` | web: o conteúdo da área rolável (o componente ocupa 100% da altura do pai e rola por dentro) |

## Gesto (web)

- Só puxa quando a área está rolada ao topo (`scrollTop = 0` no início); um puxão que começa no meio da lista é rolagem normal.
- Resistência elástica: a área desce `0,55` do movimento do dedo, até 1,5x o limiar. A mola de retorno é a do tema (`motion.spring`, a mesma do `motion`).
- Ao cruzar o limiar toca `pull-commit` (`useFeedback`), **uma vez por puxada**; voltar abaixo e cruzar de novo não repete. Soltar abaixo do limiar cancela e a área volta. "Dados chegaram" (`refreshing` indo a `false`) não toca nada.
- Toque usa `touchmove` não passivo (só ele deixa segurar a rolagem nativa; o ponteiro de toque seria cancelado pelo navegador), com `overscroll-behavior-y: contain` para calar o puxar-para-atualizar do navegador. Mouse e caneta usam eventos de ponteiro, com captura só quando o gesto vira puxada (o clique nos itens continua chegando a eles).
- O indicador é o `Spinner` do DS em uma pastilha `surface2`: parado enquanto puxa, girando enquanto `refreshing`; o traço da pastilha vira `accent` ao armar.

## Movimento reduzido

Nada desliza e não há elástico: o indicador surge no topo, por cima da lista, e some com um fade (`:root[data-reduced-motion="true"]` / `motion.reduced`). O limiar e o feedback funcionam igual.

## Acessibilidade

- Botão "Atualizar" (`refreshLabel`) invisível até receber foco do teclado; aparece no canto superior com alvo de 44 px. Disparar por ele toca `pull-commit` e chama `onRefresh`. Durante a atualização fica `aria-disabled` (sem perder o foco).
- `aria-busy` no recipiente enquanto `refreshing`; o indicador só é exposto ao leitor de tela nessa fase (`Spinner` tem `role="progressbar"` e o rótulo `strings.loading`).

Telemetria: `{ component: 'PullToRefresh', kind: 'change', value: 'refresh' }` ao pedir a atualização (gesto ou botão).

## Limites conhecidos (revisão da fatia D)

- Com mouse o gesto só puxa a partir do topo da área rolável; arrastar a barra de rolagem ou selecionar texto não conta.
- Nativo: o indicador só aparece quando o conteúdo realmente desce (no topo), e um gesto horizontal (`failOffsetX`) não vira puxada, para não brigar com linha deslizável ou carrossel.
- Pendente de API: o `InteractionEvent` não distingue gesto de botão (`kind` de refresh).
