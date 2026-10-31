# Chip (Zenith `molecules/FilterChip`, mais o removível da beUI Native)

Destino: `Chip` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. `FilterChip` (arquivo próprio) é o `Chip` de filtro.

| Zenith (`FilterChip`) | DS (`Chip`) |
|---|---|
| `label` | igual |
| `onPress` | `onPress?` (sem ele o chip não é tocável) |
| `active` | `selected?` |
| `tone` `default/primary` | removido: o selecionado é `accent`, o resto é hairline |
| `icon: string` + `iconRotation` | `icon?: DSIconName` pelo `Icon` do provedor; sem rotação |
| `testID`, `analyticsId` | removidos; `interactionId` |
| (novo) `onRemove?` | botão `close` como alvo próprio, nome `strings.close` + rótulo; tocar nele não dispara `onPress` |
| (novo) `disabled?` | cores do tema (`textDisabled`, `borderMuted`), sem opacidade |

Medidas: altura mínima `density.control.sm` (o `buttonSm` 44 do Zenith no tema SWFitness vira 40; o alvo de toque segue 44), `md` de
padding horizontal, raio `full`, borda `thin`, gap `xxs`, texto `xs`, ícone `icon.size.sm`. Selecionado: fundo e borda `accent`, texto
`onAccent` (o Zenith preenchia com `foreground`; a biblioteca de referência pede lima cheio quando selecionado). Desabilitado
selecionado: fundo `textDisabled`, texto `bg` (igual ao `Checkbox`).

Movimento: fundo, borda e cor fazem a transição em `duration.base`/`easing.standard` (nativo: duas camadas de conteúdo com as cores de
antes e de depois trocando por opacidade, porque o `Text` do DS não anima cor; web: transição CSS com `.ds-anim`). Movimento reduzido:
troca seca. Pressão: a do tema (`opacity`/`scale`), no corpo e no remover.

Acessibilidade: o corpo é `button` com `accessibilityState.selected` e `disabled` (web: `aria-pressed`, que é o atributo válido para
botão; `aria-selected` não existe em `button`). O remover tem alvo próprio de 44 pt nas duas dimensões (nativo: `hitSlop` do `Press`;
web: `::after` com inset). Telemetria: `{ component: 'Chip', kind: 'press', id, label }` no corpo; o remover emite `press` com
`id` = `<interactionId>.remove` e label `Fechar <rótulo>`.
