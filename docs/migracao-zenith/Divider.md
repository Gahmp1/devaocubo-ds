# Divider (Zenith `atoms/Divider`)

Destino: `Divider` de `@gahmp1/ds-native` e `@gahmp1/ds-web`.

| Zenith | DS |
|---|---|
| `variant="contentC"` (padrão, `subtleForeground`) | `tone="border"` (padrão) |
| `contentA` (`foreground`) / `brandA` (`primary`) | removidos: divisor não carrega cor de texto nem de marca; use `tone="border"` ou `"borderMuted"` |
| altura `thin` | `shape.borderWidth.thin` |
| `style`, `testID` | removidos |

Novos: `orientation="vertical"`, `inset` (recuo nas pontas, `SpaceStep`) e `tone="borderMuted"`. No web é
`role="separator"` com `aria-orientation`.
