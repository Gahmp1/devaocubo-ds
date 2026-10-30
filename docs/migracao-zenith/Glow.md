# Glow (Zenith `molecules/Blur`, camada de movimento)

Destino: `Glow` de `@gahmp1/ds-native/motion` (Skia) e `@gahmp1/ds-web/motion` (CSS). O `Blur` do Zenith é, apesar do nome, um
glow de PNG; o desfoque de verdade do DS é o componente `Blur` (ver `Blur.md`).

| Zenith | DS |
|---|---|
| `color?` (padrão `primary`) | `color?: 'aiGlow' \| 'accent'` (padrão `aiGlow`) |
| `preset?: 'standard' \| 'small' \| 'intense' \| 'cardCorner' \| 'restTimer'` e `config?: BlurConfig` (3 camadas com `width/height/offset/blurRadius/opacity`) | `strength?: number` (0–1) e `size?: number`; as três camadas viram traço, luz interna e bloom (a ideia do voice-glow da libraries.dev, licença a verificar) |
| `maskShape` | fora: o `Glow` é sempre um círculo; outras formas (cartão, cápsula) entram quando uma tela do app pedir |
| `cardCorner`, `restTimer` | fora: presets de telas do SWFitness (domínio), refeitos na onda 2 sobre `Glow`/`GlowScene` |
| textura `glow-radial.png` (`require` relativo) | nativo: `RadialGradient` do Skia; web: `radial-gradient` + `color-mix`; nenhum asset |
| estático (a animação ficava em `BlurPress`/`TabBar`) | `pulse?: boolean` (loop de respiração; para com movimento reduzido, app em segundo plano ou `paused`) |

Novo no DS: `depth.model` do tema decide o brilho (`flat` apaga o bloom, `glow` liga as três camadas, `hairline`/`shadow`/`blur`
mostram metade), por `bloomScale` e `glowAlphas` em `ds-core/logic/glow.ts`.

Mantido do Zenith: `pointerEvents="none"` e o brilho como camada decorativa (escondida do leitor de tela).
