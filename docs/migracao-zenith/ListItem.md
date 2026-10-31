# ListItem (Zenith `molecules/ListItem` e `molecules/SheetRow`)

Destino: `ListItem` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. O `SheetRow` do Zenith deixa de existir: é um `ListItem` com `selected`.

## ListItem

| Zenith | DS |
|---|---|
| `title` | igual; texto `lgMedium`, quebra em várias linhas e nunca é cortado |
| `description` | `subtitle` (texto `sm` em `textMuted`); `description` agora é do `DetailedListItem` |
| `leftImage` | `leading?: ReactNode` |
| `rightElement` | `trailing?: ReactNode \| 'chevron'` |
| `chevronTestID` e o chevron padrão | `trailing="chevron"` (`chevron-right` do provedor, na cor `textMuted`). O Zenith mostrava o chevron mesmo sem `rightElement`; agora é explícito |
| `circularProgress` | movido para o `DetailedListItem` (`progress`) |
| `isShimmering` | `loading`: `Skeleton` de duas linhas no lugar do conteúdo, com `role="status"` e o nome `strings.loading` |
| `fullWidth` | removido: a linha sempre ocupa a largura do pai |
| `onPress` | igual; sem `onPress` a linha não é interativa |
| `testID` | removido |
| `analyticsId` | `interactionId`; evento `{ component: 'ListItem', kind: 'press', id, label: title }` |
| (novo) `selected` | ver `SheetRow` |

Padding: `md` na vertical e `lg` na horizontal, simétrico (o Zenith tinha 24 em cima/baixo, 20 à esquerda e 24 à direita); altura mínima `max(44, control.md)`.

## SheetRow

| Zenith `SheetRow` | DS |
|---|---|
| `label` | `title` |
| `selected` | `selected`: check `check` na cor `accent` (era `primary`) à direita, depois do `trailing` |
| espaçador vazio quando desmarcado | com a prop `selected` presente (mesmo `false`) o espaço do check é reservado, então a linha não pula ao marcar |
| `onPress`, `analyticsId`, `testID` | `onPress`, `interactionId`, removido |

Linha pressionável é botão (`role=button`); com `selected` definido ela marca `aria-pressed` / `accessibilityState.selected`. O check é decorativo: o estado vai por `aria-pressed`, não só pelo ícone.
