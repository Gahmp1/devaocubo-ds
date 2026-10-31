# Toggle (Zenith `atoms/Toggle`)

Destino: `Toggle` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| Zenith | DS |
|---|---|
| `value`, `onValueChange` | igual |
| `size` `default/small` | `size` `normal/small`; trilho 50x30 / 40x20 e polegar 26 / 16, como no Zenith |
| `label` | removido: o rótulo visível é do chamador (`Stack` + `Text`); o nome acessível vai em `accessibilityLabel` |
| `accessibilityLabel` (opcional) | **obrigatório** (TypeScript) |
| `thumbOnColor` | removido: o polegar ligado é `accent` |
| `disabled` (opacidade 0.3) | `disabled`: cores do tema (`textDisabled` no traço e no polegar ligado), sem opacidade |
| `testID` | removido |
| `analyticsId` | `interactionId`; evento `{ component: 'Toggle', kind: 'toggle', id, label, value }` com o **novo** valor |

Visual: trilho vazado com traço `thin` de `text` (como no Zenith); a cor de estado vive no polegar (`surface3` desligado, `accent`
ligado, interpolada com `mixColor`, sem `hexToRgb`). Mola do polegar: a do tema (antes `damping 15 / stiffness 150` fixos);
no web vem do `motion`. Novo: o polegar estica 30% do diâmetro enquanto pressionado (beUI Native); com movimento reduzido
pula de lado sem mola nem estiramento. A sombra do polegar (`#000`, 0.25) saiu: cor literal fora do tema.

Acessibilidade: `role="switch"` (`<button role="switch" aria-checked>` no web, Espaço/Enter alternam), `accessibilityState.checked`.
O `accessibilityValue: "true"/"false"` do Zenith saiu (o estado `checked` já é lido como ligado/desligado). Alvo de 44 pt.
