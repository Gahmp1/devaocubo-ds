# Card (Zenith `molecules/Card`)

Destino: `Card` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. O `BasicCard` do Zenith também vira `Card`.

| Zenith | DS |
|---|---|
| `type` `fill/outline/borderedContentC/dashed` (padrão `fill`) | `type` `fill/outline/elevated/ghost`; padrão `components.card.type` do tema (`fill` ou `outline`). `borderedContentC` e `dashed` saíram: eram variações de uma tela, não do sistema |
| `alignment` `center/leading/trailing` | removido: o alinhamento do conteúdo é de quem compõe (`Stack align`) |
| `fullWidth` | removido: o card sempre ocupa a largura do pai |
| `style` | removido (identidade só pelos eixos do tema) |
| `onPress` | igual; sem `onPress` o card não é interativo |
| `onLongPress` | removido (ação secundária fica fora do DS) |
| `testID` | removido |
| `analyticsId` | `interactionId`; evento `{ component: 'Card', kind: 'press', id }` na porta `onInteraction` (sem `label`: o card não tem título) |
| `accessibilityLabel` | removido: o nome do botão vem do conteúdo |
| (novo) `selected` | traço de `accent` mais grosso (`border.thick`); com `onPress` marca `aria-pressed` / `accessibilityState.selected` |
| (novo) `padding?: SpaceStep` | padrão `lg` (era `spacing.lg`) |
| (novo) `header?`, `footer?` | slots acima e abaixo do `children`, com respiro `sm` |

## Tipos

| Tipo | Fundo | Traço | Sombra |
|---|---|---|---|
| `fill` | `surface1` | nenhum (o `fill` do Zenith tinha traço hairline `border`) | não |
| `outline` | transparente | `border` | não |
| `elevated` | `surface2` | `borderMuted` | `shadow.card` só quando `depth.model = 'shadow'`; nos outros modelos fica o traço |
| `ghost` | transparente | nenhum | não |

Raio `radius.lg` (igual ao Zenith). O Zenith fazia o `outline` com traço branco (`foreground`); aqui é `border`, o papel de traço do tema.

Toque: opacidade ou escala conforme `motion.press` (no web a escala usa duração `base` e curva `enter`); alvo mínimo de 44 pt. No web o card pressionável é um `<button>` com foco visível (`--ds-color-focus`); o conteúdo não deve ter outros controles.
