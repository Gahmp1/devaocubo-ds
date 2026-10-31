# StatCard (Zenith `molecules/StatCard`)

Destino: `StatCard` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. É um `Card` (tipo do tema) com rótulo, valor, delta e minigráfico.

| Zenith | DS |
|---|---|
| `icon: string` + `iconBg` | `icon?: DSIconName` em círculo `control.sm` com `surface2` (a cor de fundo por prop saiu) |
| `label` | igual (texto `sm`, `textMuted`) |
| `value: string` | `value: string \| number` (texto `xlMedium`) |
| `sublabel` | removido: a variação vai em `delta`, o resto no `label` |
| `type` `fill/outline` | removido: usa o `components.card.type` do tema |
| `testID` | removido (deixa de ser obrigatório) |
| (novo) `delta?: { value, direction }` | `up` = `success`, `down` = `danger`, `flat` = `textMuted`; a direção também é ícone (seta para cima, para baixo ou traço), nunca só cor. Quem chama põe o sinal em `value` ("+12%") |
| (novo) `chart?: ReactNode` | minigráfico abaixo do valor; o DS não traz gráfico, a acessibilidade dele é de quem passa |

Não interativo. A organização (rótulo, valor, delta, minigráfico) segue a descrição da biblioteca de referências (BoardUI, beUI Web); nenhum código dessas fontes foi lido.
