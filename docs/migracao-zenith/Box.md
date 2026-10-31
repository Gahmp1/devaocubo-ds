# Box (Zenith `atoms/Box`)

Destino: `Box` de `@gahmp1/ds-native` e `@gahmp1/ds-web`.

| Zenith | DS |
|---|---|
| `padding` | `padding` (`SpaceStep`) |
| `paddingHorizontal` | `paddingX` |
| `paddingVertical` | `paddingY` |
| `paddingTop/Bottom/Left/Right` | removidos (use `style` de layout ou aninhe `Box`) |
| `testID` | removido |

Novos: `surface` (`bg`, `surface1..3`) e `radius` (`shape.radius`), que o Zenith pedia via `style` com cor/raio de token.
`style` fica só para layout (flex, tamanho).
