# Stack (Zenith `molecules/Stack`)

Destino: `Stack` de `@gahmp1/ds-native` e `@gahmp1/ds-web`.

| Zenith | DS |
|---|---|
| `arrangement="verticalLeading"` | `direction="column" align="start"` |
| `verticalCenter` | `direction="column" align="center"` |
| `horizontalLeading` | `direction="row" align="start"` |
| `horizontalCenter` | `direction="row" align="center"` |
| `spacing` (`SpacingToken`, padrão `xs`) | `gap` (`SpaceStep`, sem padrão: 0) |
| `testID` | removido |

Atenção: o padrão de `align` é `stretch` (o do flexbox), não `flex-start` como no Zenith; passe `align="start"` onde o
filho deve ficar do tamanho do conteúdo. Passos de espaçamento do Zenith que o tema não tem (`none`, `safeArea`,
`tabbar`) saem: use o degrau mais próximo ou `style` de layout. Novos: `justify`, `wrap`, `style` (só layout).
