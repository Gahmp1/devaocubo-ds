# SegmentedControl (Zenith `organisms/SegmentedControl`)

Destino: `SegmentedControl` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| Zenith | DS |
|---|---|
| `options: string[]` | `options: { value: string; label: string }[]`: o valor é estável, o rótulo é só texto |
| `selectedIndex`, `onSelect(index)` | `value: string`, `onChange(value)` |
| `variant` `default/brandA` (o `brandA` nem era usado) | removido |
| (novo) `size` `'small' \| 'normal'` | padrão `normal`; `small` tem o visual menor (`control.sm`) e mantém o alvo de 44 |
| aba selecionada com fundo `primary` e texto `foregroundInverse`, trocando de uma vez | indicador `accent` que desliza com a mola do tema (`motion` `layoutId` no web; Reanimated no nativo); rótulo selecionado `onAccent`; com movimento reduzido troca sem deslizar |
| trilho `muted` com raio `full` | trilho `surface2` com o raio de controle do tema (`pill`, `rounded` ou `square`) |
| rótulo em uma linha que encolhe até 70 % (`adjustsFontSizeToFit`) | o rótulo fica em uma linha e encolhe até 70 % para caber, sem quebrar palavra (web: `clamp` pela contagem de opções e de caracteres; nativo: `adjustsFontSizeToFit`); a opção selecionada usa o peso `medium` |
| `usePressAnimation` por aba | removido (o indicador é o retorno do toque) |
| `testID` e `ds-segmented-option-<n>` | removidos |
| telemetria | evento `{ component: 'SegmentedControl', kind: 'change', id: value, label, value }` ao trocar; não há `interactionId`, o `value` da opção é o id |

Trocar de opção toca o papel `select` do `useFeedback()` (só quando o valor muda). Acessibilidade: `role="tablist"` com `role="tab"` e `aria-selected` (`accessibilityRole="tab"` e `accessibilityState.selected` no nativo); no web, só a opção selecionada entra na sequência do Tab e setas, Home e End trocam de opção.
