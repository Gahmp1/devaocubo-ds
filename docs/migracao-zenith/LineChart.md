# LineChart (Zenith `molecules/LineChart`)

Destino: `LineChart` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. SVG inline medido na largura do pai; a curva vem de `linePath` (`ds-core/logic/charts`), sempre suavizada. `loading` e `emptyText`: ideia do react-native-livechart (MIT), recriada.

| Zenith | DS |
|---|---|
| `points: { label, value }[]` | `data: { x, y }[]`: eixos numéricos, do mínimo ao máximo dos dados (o Zenith ia de min(0) ao máximo); os rótulos do eixo X saíram |
| Catmull-Rom e um círculo por ponto | curva com tangentes horizontais nos pontos (nunca passa dos valores vizinhos); sem círculos |
| eixo Y com 5 rótulos e grade | três linhas de grade `borderMuted` e nenhum rótulo (sem `format`, a tabela da task não prevê eixo) |
| (novo) `area?` | preenche até a base em `accent` com 16% de opacidade |
| `height` (250) | `height?`: padrão 160 |
| (novo) `loading?` | no lugar dos dados, uma linha de espera cuja opacidade pulsa (ritmo `slow` × 4); movimento reduzido a deixa parada; `aria-busy` e nome `strings.loading` |
| (novo) `emptyText?` | texto `sm` `textMuted` centralizado quando `data` está vazio; sem o texto fica o espaço vazio |
| `testID` | removido |

Entrada: a linha se desenha (`pathLength`) e a área surge em fade, com a mola (tema `snappy`) ou a duração `slow` com a curva `enter` (tema `calm`); movimento reduzido monta pronto.

A11y: `role="img"` com `aria-label` com os valores de `y` em ordem ("60, 62.5, ..."); sem `format` na API não há como dar unidade. Vazio não expõe `role`.

Limite: com um único ponto só se desenha o marcador (sem linha nem área); com `height` o nativo e o web medem a área do desenho, sem os rótulos de eixo.
