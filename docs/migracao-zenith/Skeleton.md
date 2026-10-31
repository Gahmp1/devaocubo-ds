# Skeleton (Zenith `molecules/Shimmer`)

Destino: `Skeleton` de `@gahmp1/ds-native` e `@gahmp1/ds-web` (a varredura vem de `Shimmer`, em `./motion`).

| Zenith | DS |
|---|---|
| pulso de opacidade (`overlay` + camada `mutedForeground`) | bloco `surface2` com a faixa do `Shimmer` por cima |
| `preset` (`detailedListItem`, `listItem`, `header`, `addItem`, `circleButton`) | removidos: são placeholders de telas do SWFitness; o app usa `width`/`height`/`radius` |
| `width`, `height`, `borderRadius` (px) | `width`, `height`, `radius` (`RadiusStep`; `full` para avatar) |
| (não existia) | `lines`: texto em N linhas, a última com 60% |
| `testID`, `style` | `style` só de layout; o conjunto é decorativo (`aria-hidden`) |
