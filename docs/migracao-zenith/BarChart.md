# BarChart (Zenith `molecules/BarChart`)

Destino: `BarChart` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. SVG inline medido na largura do pai; as barras vêm de `barLayout` (`ds-core/logic/charts`).

| Zenith | DS |
|---|---|
| `bars: { label, value, color? }[]` | `data: { label, value }[]`: a cor por barra saiu, vem do tema |
| `gradient` | removido: barras em `accent` (as que não são o destaque recuam em opacidade) |
| (novo) | `highlight?: number`: índice da barra em destaque; o valor dela sobe para `text` |
| `height` (250) | `height?`: padrão 160, rótulos incluídos |
| `yLabelSuffix` + eixo Y com 5 rótulos e grade | `formatValue?: (n) => string` (padrão `String`): o valor sai sobre cada barra; eixo Y e grade saíram, ficou só a linha de base |
| barra com 60% do espaço do slot | barras preenchem a largura, com `space.xs` entre elas; raio `radius.sm` do tema |
| `testID` | removido |

Entrada: cada barra cresce da base (`scaleY`), em cascata de 40 ms, com a mola (tema `snappy`) ou a duração `slow` e a curva `enter` (tema `calm`). Movimento reduzido monta pronto. Animação de entrada: ideia do beUI web, recriada com `motion`.

Vazio (`data=[]`): só a linha de base, sem texto (a tabela da task não traz `emptyText` para o `BarChart`).

A11y: o contêiner é `role="img"` com `aria-label` "rótulo: valor, ..." usando `formatValue`; o SVG fica escondido do leitor de tela para não ler duas vezes.
