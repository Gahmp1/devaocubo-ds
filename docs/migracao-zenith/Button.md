# Button (Zenith `atoms/DSButton`)

Destino: `Button` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

## Variantes

| Zenith `variant` | DS | Fundo / traço / texto |
|---|---|---|
| `primary`, `brandA` | `primary` | `accent` / sem traço / `onAccent` |
| `secondary` | `outline` | transparente / `border` / `text` |
| `tertiary` | `ghost` | transparente / sem traço / `text` |
| `contentA` | `inverse` | `text` / sem traço / `bg` |
| `contentAOutline` | `inverseOutline` | transparente / `text` / `text` |
| `backgroundD` | `surface` | `surface1` / sem traço / `text` |
| `cardAppearance` | `surfaceOutline` | `surface1` / `border` / `text` |
| `critical` | `danger` | `danger` / sem traço / `onDanger` |
| `primaryDisabled`, `contentADisabled` | `disabled` | ver abaixo |

Desabilitado vem das cores do tema, nunca de opacidade (o `Press` multiplica a opacidade pelo feedback de toque):
`primary` e `danger` viram o fundo a 30% de alfa com o texto cheio (era o `primaryDisabled`); `inverse` vira fundo
`textDisabled` (era o `contentADisabled`); as variantes só de traço, `ghost` e `surface*` apagam texto e traço
(`textDisabled`, `borderMuted`).

## Props

| Zenith | DS |
|---|---|
| `size="maxWidth"` | `size="normal" fullWidth` |
| `size` `small/normal/large` | igual; altura mínima `density.control.sm/md/lg` (antes `spacing.huge`, `buttonSm`, `buttonLg`) |
| `shape` `pill/rounded/circle` (padrão `pill`) | `pill/rounded/square/circle`; padrão `components.button.shape` do tema. `rounded` usa `radius.md`; `circle` é quadrado de lado `control` com raio total, mostra só o ícone quando há `icon` |
| `icon?: ReactNode` | `icon?: DSIconName` (ícone do provedor, tamanho `icon.size`, traço `icon.strokeWidth`) |
| `loading` | `loading`: `Spinner` pequeno no lugar do conteúdo (a largura não muda), toque desativado, `accessibilityState.busy` / `aria-busy` |
| `testID` | removido |
| `analyticsId` | `interactionId`; evento `{ component: 'Button', kind: 'press', id, label }` na porta `onInteraction` |
| `accessibilityLabel` | igual; padrão `title` |
| `accessibilityState` | `disabled` sempre; `busy` enquanto carrega |

Título longo: o botão cresce em altura (até 2 linhas, depois reticências); o texto tem `maxFontSizeMultiplier` 1,4 no nativo.
Toque: opacidade ou escala conforme `motion.press` do tema; alvo mínimo de 44 pt.
