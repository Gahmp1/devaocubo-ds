# Blur (Zenith: não existia desfoque real; camada de movimento)

Destino: `Blur` de `@gahmp1/ds-native/motion` (`BlurView` do `expo-blur`) e `@gahmp1/ds-web/motion` (`backdrop-filter`).

O Zenith não tinha desfoque do que fica atrás: o componente `molecules/Blur` era um glow de PNG (agora `Glow`, ver `Glow.md`) e o
`ScrollFadeOverlay` diz em comentário que "blur de verdade" está indisponível. O `BackdropBlur` do Skia só desfoca o que é
desenhado no próprio canvas, então o nativo usa o `BlurView` (desvio da spec registrado em `global-constraints`).

| DS | Como |
|---|---|
| `intensity?: number` (1–100, padrão 50) | nativo: `intensity` do `BlurView`; web: `blur(Npx)` com `blurPx` (0–100 → 0–40 px) |
| `tint?: 'surface' \| 'bg'` | cor do tema (`surface1` ou `bg`) com alfa `BLUR_TINT_ALPHA` (0,55) por cima do desfoque, via `withAlpha` (nativo) e `color-mix` (web); o `tint` do `BlurView` segue o esquema (`light`/`dark`) |
| `children` | por cima do desfoque e da tinta |

Limite conhecido: no Android o `BlurView` só desfoca com um `BlurTargetView` e `blurMethod` (expo-blur 58); sem isso aparece só a
tinta. Decidir na conferência da fatia ou na onda 2 se o DS expõe esse alvo.
