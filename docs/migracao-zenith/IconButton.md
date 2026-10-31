# IconButton (Zenith `atoms/IconButton`)

Destino: `IconButton` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| Zenith | DS |
|---|---|
| `source: string` (chave de `DS_ICONS` ou URL) | `icon: DSIconName` (ícone do provedor; URL de imagem não existe) |
| `accessibilityLabel?` (sem fallback: ícone mudo) | `accessibilityLabel: string` **obrigatório** (erro de TypeScript sem ele) |
| `size` `small/medium/large` (16/24/32 px) | igual; ícone `icon.size.sm/md/lg` do tema |
| `color` (padrão `foreground`) | `color?: Text['color']` (papel do tema, padrão `text`); desabilitado usa `textDisabled` |
| `style` com círculo de fundo (ex.: botão de ajustes) | `variant="plain"` (padrão), `"filled"` (círculo `surface2`, cobre o `RightNavigationButton`) ou `"outline"` (círculo com traço `border`) |
| `hitSlop` (64 pt derivado) | removido; o alvo é 44 pt, garantido pelo componente |
| `pressAnimation` | removido; o toque segue `motion.press` do tema |
| `disabled` (opacidade 0,3) | `disabled`: ícone `textDisabled` e traço `borderMuted`, sem opacidade |
| `testID` | removido |
| `analyticsId` | `interactionId`; evento `{ component: 'IconButton', kind: 'press', id, label }` |

As variantes `filled` e `outline` têm diâmetro `density.control.sm/md/lg` conforme o tamanho; `plain` tem o tamanho do ícone mais `space.xs`.
