# FilterChip (Zenith `molecules/FilterChip`)

Destino: `FilterChip` de `@gahmp1/ds-native` e `@gahmp1/ds-web`. É o `Chip` com `selected` obrigatório e o toque alternando; a
tabela de props do Zenith está em `Chip.md`.

| Zenith | DS |
|---|---|
| `active?` | `selected: boolean` (obrigatório) |
| `onPress()` | `onPress(next: boolean)`, com `next = !selected` |
| `tone`, `icon`, `iconRotation` | `icon?`; sem `tone` nem rotação |
| `testID`, `analyticsId` | removidos; `interactionId` |
| (sem `onRemove`) | removível é do `Chip` |

Novo: o ✓ entra antes do rótulo ao selecionar (largura e opacidade animadas; seco com movimento reduzido), para que o estado não
dependa só da cor. Telemetria: um único evento por toque, `{ component: 'FilterChip', kind: 'toggle', id, label, value: <novo selected> }`.

Acessibilidade (a lacuna do Zenith: sem `accessibilityState.selected` e sem rótulo): `role` botão, `accessibilityLabel` = rótulo,
`accessibilityState.selected` (web: `aria-pressed`).
