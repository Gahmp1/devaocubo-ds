# Motion: tecnologias e bibliotecas

Verificado em 2026-10-30 pela skill design-research, para decidir a pilha de animação do devaocubo-ds (RN e web).
Fatos com URL oficial; o que não tem fonte está marcado como inferência.

## Achado geral
Os sites de referência animam quase sempre com CSS, SVG ou Canvas 2D, sem biblioteca. Quando há biblioteca, é a `motion`
(rareui, uiarc, evilbuttons, beui, audiocn); GSAP só no react-bits. Nenhum usa Rive ou Lottie como animação principal.
Os ports RN que existem (border-beam, thinking-orbs, react-native-livechart) usam Skia mais Reanimated.

## react-native-skia
- url: https://shopify.github.io/react-native-skia/ (v3: https://wcandillon.github.io/react-native-skia/)
- categoria: motion e vídeo
- movimento: forte
- licença: MIT
- estado: só link
- o que pegar: efeitos de GPU no RN (orbe, borda luminosa, blur, brilho, shader de fluido, gráficos). O Expo SDK 57 fixa `@shopify/react-native-skia` 2.6.2 (https://raw.githubusercontent.com/expo/expo/sdk-57/packages/expo/bundledNativeModules.json). A v3 é outro pacote (`react-native-skia`, Graphite): exige dev build, Android minSdk 26 e Vulkan; o canvas fica em branco em Android sem Vulkan. No web exige CanvasKit (2,9 MB gz de wasm, https://wcandillon.github.io/react-native-skia/docs/getting-started/web).
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Reanimated 4
- url: https://docs.swmansion.com/react-native-reanimated/
- categoria: motion e vídeo
- movimento: forte
- licença: a verificar (inferência: MIT)
- estado: só link
- o que pegar: base do movimento no RN (mola, entrada e saída, layout, animações CSS, `useReducedMotion`). O Expo 57 fixa a 4.5.1; a última é a 4.7.1, com suporte a RN 0.86–0.88. Shared element é experimental e só nativo.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## motion (ex-framer-motion)
- url: https://motion.dev
- categoria: motion e vídeo
- movimento: forte
- licença: MIT (https://github.com/motiondivision/motion)
- estado: só link
- o que pegar: mola, layout e gesto no web; `m` mais LazyMotion fica em ~5 KB (https://motion.dev/docs/react-reduce-bundle-size). É a biblioteca mais usada pelas referências.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Rive
- url: https://rive.app (runtime RN: https://github.com/rive-app/rive-nitro-react-native)
- categoria: motion e vídeo
- movimento: forte
- licença: runtime MIT; editor pago (Free com splash, planos por assento em https://rive.app/pricing)
- estado: só link
- o que pegar: o mesmo arquivo `.riv`, com máquina de estados e data binding, roda no RN (RN 0.78+, Expo 53+) e no web. Runtime web de 222–648 KB brotli e ~1,7–2,4 MB no app (https://rive.app/docs/runtimes/runtime-sizes.md). Só faz sentido se o designer produzir no editor Rive.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Lottie e dotLottie
- url: https://github.com/lottie-react-native/lottie-react-native e https://github.com/LottieFiles/dotlottie-web
- categoria: motion e vídeo
- movimento: leve
- licença: lottie-react-native Apache-2.0; dotlottie-web MIT
- estado: só link
- o que pegar: animação linear e decorativa vinda do After Effects; pouca interatividade. O Expo 57 fixa a ~7.3.8.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## ogl
- url: https://github.com/oframe/ogl
- categoria: motion e vídeo
- movimento: forte
- licença: Unlicense
- estado: só link
- o que pegar: WebGL mínimo (29 KB) para shader no web, quando CSS e Canvas 2D não bastarem.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## GSAP
- url: https://gsap.com/standard-license/
- categoria: motion e vídeo
- movimento: forte
- licença: própria, gratuita para uso comercial desde 30/04/2025; proíbe uso em construtores visuais que concorram com o Webflow
- estado: só link
- o que pegar: timelines complexas no web; não é necessário para o DS.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Descartados para o DS
- react-native-webgpu e three/r3f: sem declaração de maturidade (https://wcandillon.github.io/react-native-webgpu/).
- Moti: a documentação ainda fala em Reanimated 3 (https://github.com/nandorojo/moti).
- Código de react-bits, rareui e canvasui: licença MIT mais Commons Clause, que proíbe redistribuir ou portar para vender. Não copiar para o DS.

## Componentes com port RN da comunidade (referência)
- Sonner → `sonner-native` (Reanimated, Gesture Handler, SVG).
- NumberFlow (MIT) → `rn-number-flow` (Reanimated; pouco uso).
- Liveline (MIT, Canvas) → `react-native-livechart` (MIT; Skia mais Reanimated mais Gesture Handler).
