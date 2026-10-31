---
name: design-chat
description: Desenha e implementa os estados de espera e a apresentação de respostas de um chat com IA (pensando, buscando, resolvendo, ouvindo, esperando, tentando de novo), com orbes de pontos, borda luminosa, etapas que aparecem em sequência e cartão de aprovação. Use quando o pedido for evoluir o chat de um app, trocar várias mensagenzinhas por um estado de carregamento bonito, adotar thinking orbs ou border beam, ou mostrar o que a IA está fazendo. Não é para a lógica do chat (SDK, streaming, persistência), só para a camada visual.
---

# design-chat

## Quando usar
Um app tem (ou vai ter) chat com IA e a espera hoje é ruim: texto solto, spinner genérico ou várias mensagens
intermediárias. A skill propõe e monta a camada visual; o SDK de chat do projeto continua dono do fluxo.

## Regras de tempo de espera
| Duração | O que mostrar |
|---|---|
| < 2 s | nada |
| ≥ 2 s | orbe de pontos + rótulo curto ("Montando seu treino") |
| > 3 s | orbe + rótulo + borda luminosa no campo de texto; etapas em sequência abaixo |

## Passo a passo
1. Leia a identidade do produto (tokens do repo). Reaproveite a fonte e o acento; o orbe usa o acento.
2. Mapeie os estados reais do SDK para os visuais: `working`, `searching`, `solving`, `listening`, `waiting`, `retrying`.
   Rótulo em verbo no gerúndio, específico do produto, nunca "Carregando".
3. Copie de `examples/lab-apps/orbs.js` (orbe em canvas, 200 pontos de Fibonacci mais anel, mistura de 450 ms entre estados)
   e de `chat.js` (linha do tempo determinística). No React Native, o equivalente é o port de Skia mais Reanimated.
4. Etapas: aparecem uma a uma (pensamento → ação → resposta), a resposta entra por palavra (≈0,05 s por palavra) e termina
   num cartão de aprovação quando a IA propõe uma ação.
5. Respeite `prefers-reduced-motion`: troque o movimento por troca de texto e opacidade.

## Voz (ouvindo / falando) — rascunho
Para microfone e resposta falada: brilho cuja altura segue o nível de voz 0–1 (envelope attack ≈100 ms, release ≈500 ms),
gradiente nas cores do produto que desliza enquanto há voz, `idle` respirando no silêncio. Padrão, mapeamento amplitude →
forma/cor e as duas saídas de tokens (derivar do acento ou criar `ai.gradient`) estão em `references/orbes-e-loaders-de-ia.md`
("Voz com gradiente"). No nativo é Skia + Reanimated; no web, CSS com `--lvl`. Sem som de interface com o microfone ativo.

## Armadilhas
- Visibilidade: pause o canvas fora da tela (IntersectionObserver).
- Estado vem do SDK, não de timers: o mockup usa tempo só para demonstrar.
- Borda luminosa usa `@property --ang` (CSS Houdini); tenha um fallback estático.

## Referências
`examples/lab-apps` (seção "Espera"), `examples/lab-swfitness`, `examples/feedback-sensorial` (voz). Fontes: libraries.dev (beam, orbs; código MIT),
thinkingorbs.com. Veja `references/sources.md`.
