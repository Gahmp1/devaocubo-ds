# Select (Zenith `molecules/SheetRow` em sheets de seleção)

Destino: `Select` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. O Zenith não tem um seletor de lista: as telas de Settings (unidade, início da semana, séries, reps) montavam um `BottomSheet` com `SheetRow`. Web: Radix Select (`radix-ui`, MIT) com gatilho em pílula e popup rolável. Nativo: gatilho + `Sheet` com `ListItem selected`. A roda (`OptionSelector`) não entra nesta onda.

| Prop | O que faz |
|---|---|
| `value`, `onChange(value)` | controlado; `value=''` = nada escolhido (mostra o `placeholder`); nenhuma opção pode ter `value` vazio |
| `options: { value; label; disabled? }[]` | opção desabilitada aparece esmaecida e não é escolhida |
| `placeholder?` | texto em `textMuted` quando não há valor |
| `label?` | rótulo `smMedium` acima do gatilho, ligado por `<label htmlFor>` |
| `disabled?` | gatilho esmaecido e sem foco |

Gatilho: raio `--ds-radius-control` (pílula, arredondado ou quadrado conforme o tema), traço `border` (vira `accent` aberto), altura mínima `max(44, control.md)`. Popup: `surface2`, `radius.lg`, itens de 44 de altura com realce `surface3`, check `accent` no escolhido, rola quando passa de 320 px ou do espaço disponível. A sombra `shadow.overlay` só aparece com `depth.model = 'shadow'`.

Acessibilidade: o Radix entrega `combobox`/`listbox`/`option` com `aria-selected`, busca por digitação e setas; o foco volta ao gatilho ao fechar. Foco visível com `--ds-color-focus`.

Telemetria: `{ component: 'Select', kind: 'open' | 'close', label }` (rótulo ou placeholder) e `{ kind: 'change', label: <rótulo da opção>, value }`.
