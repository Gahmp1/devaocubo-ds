# Text (Zenith `DSText`)

Origem: `atoms/DSText/DSText.tsx`. Destino: `Text` de `@gahmp1/ds-native` e `@gahmp1/ds-web` (mesma API).

| Zenith | DS |
|---|---|
| `variant` `xs`..`display` e `*Medium` | igual (`variant`); `display` usa `type.family.display`, o resto `body`; `*Medium` = `weight.medium` |
| `color="foreground"` | `color="text"` |
| `mutedForeground` | `textMuted` |
| `subtleForeground` | `textSubtle` |
| `faintForeground` | `textDisabled` |
| `foregroundInverse` | `onAccent` |
| `primary` | `accent` |
| `destructive` | `danger` |
| `warning` | `warning` |
| `caution` | `warning` (sem papel próprio no tema) |
| `success` | `success` |
| `emptyState` | `textMuted` |
| `numberOfLines` | igual |
| `testID`, `style` | removidos (o DS não aceita estilo de texto; use `variant`/`color`) |
| modo markdown (`text`, `defaultStyle`) | removido: era formato de conteúdo do backend iOS; fica no app |

Novos: `label` (caixa do tema + `tracking.wide`), `mono`, `tabular` (padrão = `type.numeric` do tema),
`maxFontSizeMultiplier` (efeito só no native). Android usa o nome da fonte por peso (`family.native[peso]`) e
`includeFontPadding: false`.
