# DetailedListItem (Zenith `molecules/DetailedListItem`)

Destino: `DetailedListItem` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API: tudo do `ListItem` (ver `ListItem.md`) mais `description`, `media` e `progress`.

| Zenith | DS |
|---|---|
| `title` | igual (texto `lgMedium`, quebra linha) |
| `description` | igual (texto `sm`, `textMuted`), depois do `subtitle` |
| `leftInfo`, `rightInfo` (blocos título + descrição em duas colunas) | removidos: eram específicos de treino; quem precisa compõe com `Stack` e `Text` em `description` ou no `trailing` |
| `progress` | igual, de 0 a 1 (fora disso é limitado), em anel antes do `trailing` com o percentual no centro |
| `animated` | removido: o anel sempre transiciona o traço (sem animação com movimento reduzido) |
| `isShimmering` | `loading`: `Skeleton` de três linhas, mais o quadrado de mídia quando há `media` |
| `onPress` | igual; ganha `role=button` quando pressionável (o Zenith não tinha) |
| `testID` | removido |
| `analyticsId` | `interactionId`; evento `{ component: 'DetailedListItem', kind: 'press', id, label: title }` |
| (novo) `media?: ReactNode` | quadrado de 56 com `radius.md` e corte, antes do `leading` |
| (novo) `subtitle`, `leading`, `trailing`, `selected` | os do `ListItem` |

Anel: o `CircularProgress` (ver `CircularProgress.md`) no tamanho e na espessura padrão, com o percentual `xs` no centro. Para leitor de tela vira um `progressbar` com o valor de 0 a 100; o nome é `strings.loading`, pois o `CircularProgress` não tem rótulo próprio. Trilha `borderMuted`, progresso `accent`.
