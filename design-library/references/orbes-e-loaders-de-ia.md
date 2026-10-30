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
