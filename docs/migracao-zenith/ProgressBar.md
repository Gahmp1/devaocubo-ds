# ProgressBar (Zenith `atoms/IndeterminateBar` + `molecules/HorizontalRevealProgress`)

Destino: `ProgressBar` de `@gahmp1/ds-native` e `@gahmp1/ds-web`.

| Zenith | DS |
|---|---|
| `IndeterminateBar` (sem `value`) | `ProgressBar` sem `value` (segmento de 35% varrendo; espessura `thick * 2`) |
| `HorizontalRevealProgress` (`progress` 0–1, cortina `card` que descobre os filhos) | `value` 0–1 preenche a trilha animando (`duration.base`); a cortina sobre filhos não entra |
| `width`, `height`, `color`, `trackColor` | removidos: `tone="accent" \| "success" \| "danger"`, trilha `surface2` |
| `accessibilityLabel="Carregando"` literal | `accessibilityLabel` ou `strings.loading`; determinada expõe `0–100` |
| `testID` | removido |
