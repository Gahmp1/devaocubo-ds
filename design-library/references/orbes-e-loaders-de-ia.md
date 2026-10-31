# Orbes e loaders de IA

Verificado em 2026-10-30 pela skill design-research (sessão do design de componentes do devaocubo-ds), lendo os
repositórios no GitHub (raw.githubusercontent.com) e as páginas.

## Border Beam (libraries.dev, Jakub Antalik)
- url: https://libraries.dev (código em https://github.com/Jakubantalik/Libraries.dev, `packages/border-beam`)
- categoria: orbes e loaders de IA
- movimento: forte
- licença: MIT (`packages/border-beam/LICENSE`)
- estado: só link
- o que pegar: borda com brilho que gira por ângulo, mais bloom externo. Web em CSS puro com `@property`; port RN beta (v0.1.0, só iOS verificado, fora do npm) em shader SkSL com `useClock` do Skia e Reanimated. Serve de referência de arquitetura, não de dependência.
- exemplo local: examples/lab-apps, examples/lab-swfitness
- verificado em: 2026-10-30, design-research

## Thinking Orbs (libraries.dev, Jakub Antalik)
- url: https://libraries.dev (`packages/thinking-orbs`); orbs.jakubantalik.com redireciona para lá
- categoria: orbes e loaders de IA
- movimento: forte
- licença: MIT
- estado: só link
- o que pegar: orbe de pontos com 9 estados. A geometria fica em `src/engine` e é compartilhada; no web é desenhada em Canvas 2D, no RN em Skia (lista de círculos num `SkPicture`). Port RN v0.1.0, testado só no simulador iOS (Expo 53), não publicado.
- exemplo local: examples/lab-apps
- verificado em: 2026-10-30, design-research

## Thinking Orbs (thinkingorbs.com, Yogesh)
- url: https://thinkingorbs.com (código em https://github.com/yogesharc/thinking-orbs)
- categoria: orbes e loaders de IA
- movimento: forte
- licença: MIT (`packages/thinkingorbs/LICENSE`)
- estado: só link
- o que pegar: projeto diferente do de libraries.dev. Usa SVG com um `<circle>` por ponto, atualizado por rAF, 3,8 KB, sem dependências; 9 estados, 23 variantes, 5 formas. Tem pacote SwiftUI; RN não achei.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Generative Loaders
- url: https://generativeloaders.com/ (código em https://github.com/kasturikhanke/generative-loaders)
- categoria: orbes e loaders de IA
- movimento: forte
- licença: MIT (© Kasturi Khanke)
- estado: só link
- o que pegar: loaders React para interfaces generativas; tecnologia de render não achei.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Beautiful UI
- url: https://www.beautifului.dev/
- categoria: chat e interfaces de IA
- movimento: leve
- licença: MIT (link `/license` no rodapé)
- estado: só link
- o que pegar: primitivos para IA (texto em stream, rastro de raciocínio, shimmer); sem repositório público achado.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Voz com gradiente (ouvindo / falando)
Verificado em 2026-10-30 pela skill design-research, lendo https://libraries.dev/voice e o README e o código-fonte de
`packages/voice-glow` (MIT, `LICENSE` lido). Pedido do designer do dono: [O] "como a linguagem do SW é com bastante
gradiente, acredito que isso aqui funcionaria bem, usando as cores do SW". Tudo abaixo de "Proposta" é inferência nossa.

### Voice Glow (libraries.dev, Jakub Antalik)
- url: https://libraries.dev/voice (código https://github.com/Jakubantalik/Libraries.dev, `packages/voice-glow`; npm `voice-glow` 0.3.0)
- categoria: orbes e loaders de IA
- movimento: forte
- licença: MIT (`packages/voice-glow/LICENSE`, © 2026 Jakub Antalik); o estado "processing" é do Libraries Pro (preço: a verificar)
- estado: só link
- o que pegar: [F] três camadas (traço na borda, luz interna, bloom desfocado) cuja ALTURA segue o nível de voz 0–1. [F] cadeia de entrada: `sensitivity` (ganho), `threshold` (porta de ruído, ex. 0,03), `attack` (≈0,1 s para subir) e `release` (≈0,5 s para baixar). [F] forma: `reach` (altura em nível cheio), `spread` (largura; lóbulos laterais se afastam), `flow` (px/s com que o espectro de cores desliza de lado, volta a zero quando a voz para), `bend` (a curva superior ganha altura no centro, em px), `idle` (respiração suave em silêncio; `0` apaga). [F] `bands`: lóbulo central segue os graves, vizinhos os médios, externos os agudos, então a voz "espalha" a cor para fora em vez de uma bolha só; com `level` simples as bandas são sintetizadas. [F] paletas: `colorful`, `mono`, `ocean`, `sunset`, `forest`, `candy`, `ice`, `gold` ou `colors` (até 7). [F] iOS: SwiftUI `VoiceGlowKit` (iOS 17+, shader Metal); **React Native: "Coming soon"**.
- exemplo local: examples/feedback-sensorial
- verificado em: 2026-10-30, design-research

### Padrão: amplitude vira forma, banda vira cor
1. **Nível**: 0–1, já suavizado. Web: `AnalyserNode.getByteTimeDomainData` (RMS) ou `getByteFrequencyData` para as 3 bandas. Nativo: `expo-audio` com `isMeteringEnabled` entrega `metering` em `RecorderState`, [F] sem unidade documentada e com `interval` padrão de 500 ms (usar 50 a 80 ms); normalizar por conta própria (dB para 0–1) e testar no aparelho.
2. **Envelope** (nosso, no UI thread): `v += (alvo − v) · (alvo > v ? 1 − e^(−dt/attack) : 1 − e^(−dt/release))`, com porta `alvo = max(0, (nível − threshold) / (1 − threshold))`. Ataque ≈100 ms, soltura ≈500 ms: é o que faz a luz parecer viva sem tremer.
3. **Forma**: altura = `idle + (reach − idle) · v`; largura = `spread · (0,6 + 0,4 · v)`; bloom (raio do blur e opacidade) = `v²`, para o silêncio ficar limpo. A voz é um evento contínuo, então nada de `spring` com overshoot: seguir o envelope.
4. **Cor**: 3 a 4 paradas de gradiente deslizando com `flow` (posição = `(t · flow · v) mod 1`); o brilho central usa o acento; as paradas laterais vêm de outros tokens do tema. Em silêncio o gradiente congela e o `idle` respira com período do tema (`ai.beamPeriodMs`).
5. **Estados**: ouvindo (segue o nível), pensando (feixe único varrendo; usa a primitiva do border beam, `design-chat`), falando (o nível vem do áudio da resposta, não do microfone), parado (sem desenho, para economizar GPU).

### Proposta: gradiente nos tokens de cada produto (sem decidir)
[I] Os temas têm HOJE um único acento por produto e as três cores de IA (`aiOrb`, `aiGlow`, `aiBeam`) são iguais ao acento (conferido em `ds/packages/theme/src/themes/*.ts`); **não existe token de gradiente**. A "linguagem de gradiente" do SW que o designer descreve não está nos tokens do tema: a única fonte vista aqui é `lab-swfitness/styles.css` (feixe cônico acento→branco e shimmer acento→branco). Duas saídas, a decidir com o designer:
- **A (sem token novo)**: derivar as paradas dos tokens que já existem, com `color-mix`: `acento`, `mix(acento, info 55%)`, `mix(acento, texto 45%)`, `acento` de novo (laço). No SWFitness: lima → verde-água → quase branco; em Somma: esmeralda `#34D399` → verde-água → branco; em Trippo (monocromático): tinta → Ash → papel, sem cor; devaocubo: neutros. Vantagem: nenhum eixo novo e cada app fica reconhecível. Risco [I]: em Trippo e devaocubo o resultado é cinza sobre cinza (vira só brilho, não gradiente).
- **B (token novo)**: `ai.gradient: [cor, cor, cor]` por produto e esquema (claro/escuro), desenhado pelo designer; entra ao lado de `aiGlow`. Aceita gradientes de verdade (ex. SW: lima → amarelo `#FDBC30`), custa um campo em `DSTheme` e nas saídas CSS/TS/Skia.
Regra comum [I]: contraste não é exigido do glow (é decoração), mas o rótulo de estado ("Ouvindo...") continua em texto e a cor sozinha nunca informa o estado.

### Como fazer
- **Nativo (Skia + Reanimated, sem Rive)**: um `Canvas` de altura fixa na base; `level` é um `SharedValue` atualizado a cada leitura do microfone e suavizado no worklet (envelope do passo 2). Três camadas: `RoundedRect` com `LinearGradient` e `Blur` pequeno (traço); `Rect` com `RadialGradient` centrado na base e altura = `reach · v` (luz); mesmo `RadialGradient` com `Blur` grande e opacidade `v²` (bloom). `useDerivedValue` entrega os pontos `{x, y, r}` e o deslocamento do gradiente; `flow` entra como `t` do `useClock`/`useFrameCallback`. [F] O port de border-beam do libraries.dev já usa Skia com `useClock` e Reanimated: mesma arquitetura. Reduzir movimento: parar o `flow` e manter só a altura.
- **Web (CSS + canvas)**: duas opções. CSS puro: elemento com `background: linear-gradient(90deg, var(--g1), var(--g2), var(--g3), var(--g1)); background-size: 200% 100%`, `transform: scaleY(var(--lvl))` com `transform-origin: bottom`, `filter: blur()` e `opacity` ligados à variável `--lvl` (0–1) atualizada por `requestAnimationFrame`; `flow` anima `background-position`. Canvas 2D: um `createRadialGradient`/`createLinearGradient` por lóbulo com `globalCompositeOperation = 'lighter'`. Em ambos, `@media (prefers-reduced-motion: reduce)` congela o deslocamento. Só `transform` e `opacity` mudam por quadro (regra de `design-screens`).
- Mockup: `examples/feedback-sensorial/index.html` (voz simulada, 4 temas, só `var(--ds-*)`).
