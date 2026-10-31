# GlowScene (Zenith `molecules/GlowScene`, camada de movimento)

Destino: `GlowScene` de `@gahmp1/ds-native/motion` (Skia) e `@gahmp1/ds-web/motion` (CSS).

| Zenith | DS |
|---|---|
| `config: GlowSceneConfig` (`baseColor` + `blobs` com `color`, `cx`, `cy`, `fwhmX`, `fwhmY`, `opacity`; frações do contêiner) | `preset?: 'focus' \| 'ambient' \| 'success'`; os dados das manchas ficam em `SCENE_PRESETS` (`ds-core/logic/glow.ts`), no mesmo formato (frações, `fwhm`) |
| `GLOW_SCENE_PRESETS` (`topDualGreenTealGlow`, `bottomLeftOliveGlow`, `topRightGreenYellowGlow`, com hex literais do SWFitness) | fora: os três presets do DS usam só `aiGlow` e `accent` do tema sobre o `bg`; as cores do SWFitness voltam pelo tema `swfitness` |
| `baseColor` | `color.bg` do tema |
| texturas `glow-radial.png` e `glow-dither.png` (`ASSET_FWHM = 0.406`, ruído de 5% contra banding) | gradientes gaussianos (`glowFalloff`: `exp(-(2,5·t)²)`, raio = 1,5 × a largura à meia altura); sem PNG e **sem ruído**: o banding em gradiente largo fica para a conferência visual |
| preenche o pai (`absoluteFill`) | `GlowScene` é o contêiner (`children` por cima, `style` de layout, `radius`); quem quer fundo de tela passa `style={{ flex: 1 }}` |
| `testID?` | fora |

Novo no DS: `depth.model` escala as manchas (`bloomScale`): `flat` não desenha nenhuma, `glow` desenha inteiras, os demais metade.
`preset` `success` é o antigo `topDualGreenTealGlow` sem a cor da marca (`accent` à esquerda, `aiGlow` à direita).
