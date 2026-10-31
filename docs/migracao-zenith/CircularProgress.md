# CircularProgress (Zenith `molecules/CircularProgress`)

Destino: `CircularProgress` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. No web é SVG inline; o arco vem de `arcPath` (`ds-core/logic/charts`) e preenche pelo `pathLength` do `motion`; no nativo é `react-native-svg` com Reanimated no lugar do `Animated` do RN.

| Zenith | DS |
|---|---|
| `progress` | `value`, de 0 a 1 (fora disso é limitado; NaN vira 0) |
| `size` (54) | `size?`: padrão 56 |
| `strokeWidth` (trilha 1, arco 2) | `thickness?`: um valor só para trilha e arco; padrão `borderWidth.thick` × 2 |
| `variant` `contentA/contentB/brandA` | `tone?: 'accent' \| 'success' \| 'danger'` (padrão `accent`), o mesmo do `ProgressBar`; a trilha é sempre `borderMuted` |
| `showText` + o percentual embutido | `children?` no centro (quem chama põe o texto, o ícone ou nada) |
| `animated` | removido: o arco preenche ao entrar e acompanha cada mudança de `value` com a mola (tema `snappy`) ou a duração `slow` com a curva `enter` (tema `calm`); movimento reduzido troca direto |
| `strokeLinecap="round"` | removido: ponta reta, como o anel antigo do `DetailedListItem` |
| `testID` | removido |

A11y: `role="progressbar"` com `aria-valuenow` (0 a 100), `aria-valuemin` e `aria-valuemax`; o nome é `strings.loading` (a API não tem rótulo próprio, como a tabela da task manda). Os filhos do centro são apresentacionais para o leitor de tela: o valor já está no `aria-valuenow`.

O `ListItem`/`DetailedListItem` usam este componente no lugar do anel interno que tinham (`ProgressRing`, apagado).
