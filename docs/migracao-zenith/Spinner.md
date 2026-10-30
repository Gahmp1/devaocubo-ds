# Spinner (Zenith `atoms/Spinner`)

Destino: `Spinner` de `@gahmp1/ds-native` (Skia) e `@gahmp1/ds-web` (CSS cônico).

| Zenith | DS |
|---|---|
| `size?: number` (40) | `size="small" \| "medium" \| "large"` (20 / 32 / 48 px) |
| `tone="brand"` (paleta neon `#d8f45b #26705c #0f4a21`) | `tone="accent"` (padrão): cabeça e energia em `accent`, profundidade e cauda dissolvidas em `surface2` e `bg` |
| `tone="dark"` (quase-preto sobre fundo claro) | `tone="onAccent"` (sobre fundo de acento) ou `"text"` (superfícies neutras) |
| `testID`, `useTranslation('components.spinner.loading')` | removidos; rótulo = `accessibilityLabel` ou `strings.loading` |
| `hexToUnit` (hex-only) | `parseColor` + `mixColor`: o tema pode ter `rgb()`/`hsl()` |

Shader SkSL idêntico (`primitives/Spinner/shader.ts`); só as cores viram uniforms do tema. Movimento reduzido: o relógio do
Skia é desmontado e o arco fica parado num quadro inteiro, pulsando em opacidade (nativo e web). Web não usa canvas.
