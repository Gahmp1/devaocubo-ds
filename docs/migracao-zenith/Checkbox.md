# Checkbox (Zenith `atoms/CheckBox` + `hooks/useKeyframeBounce`)

Destino: `Checkbox` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| Zenith | DS |
|---|---|
| `checked: boolean` | `checked: boolean \| 'mixed'` (novo estado misto: traço no lugar do visto) |
| `onPress(checked)` (recebia `!checked`) | `onChange(next: boolean)`; `mixed` vira `true` |
| `label` | igual; o texto usa `Text` do DS |
| `accessibilityLabel` (opcional) | obrigatório (TypeScript) quando não há `label` |
| `disabled` (opacidade 0.3) | `disabled`: cores do tema (`textDisabled`), sem opacidade |
| `testID` | removido |
| `analyticsId` | `interactionId`; evento `{ component: 'Checkbox', kind: 'toggle', id, label, value }` com o novo valor |

Geometria: caixa 20x20 e gap 10 do Zenith, mantidos como constantes nomeadas. O retângulo interno 14x14 com borda 6 (que somava
mais que a área útil da caixa) foi trocado por borda `thick`, preenchimento `accent` e marca desenhada (beUI Native): o visto
e o traço se desenham por `strokeDashoffset` (`react-native-svg` no nativo, `pathLength` + CSS no web). O raio é `radius.sm` do tema.

`useKeyframeBounce` fica no `Checkbox` (escala 0.9 -> 1.1 -> 1.0 em 50/150/250 ms, mesma curva), disparado a cada toque
habilitado; no web é uma animação por Web Animations com os mesmos tempos. Movimento reduzido: sem quique, marca sem desenho.

Acessibilidade: `role="checkbox"`, `accessibilityState.checked` com `'mixed'`; no web é um `<input type="checkbox">` nativo
(`indeterminate` + `aria-checked="mixed"`), a linha inteira é o alvo e o anel de foco do tema fica na caixa.
