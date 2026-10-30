---
name: design-screens
description: Propõe e implementa a estrutura de telas de um app (hierarquia, barra de abas, cabeçalho, cartão de destaque, listas) e as microinterações que a sustentam (pílula que desliza, esqueleto de carregamento, botão com pressão, interruptor, toast, números que contam). Use quando o pedido for reestruturar a navegação de um app, melhorar um design existente ou criar o esqueleto de um app novo. Não cobre lógica de navegação nem dados.
---

# design-screens

## Quando usar
Um app existe e a estrutura de telas ou a sensação de uso precisam evoluir (caso do Trippo), ou um app novo precisa de
um esqueleto coerente com a família.

## Passo a passo
1. **Audite primeiro.** Liste o que se repete nos produtos da família: cabeçalho, cartão de destaque com número grande,
   lista de linhas, barra de abas flutuante. Preserve o que é assinatura do produto (fonte, acento, raio).
2. **Proponha por tela**: o que é o destaque, o que é secundário, qual é a ação principal. No máximo 4 abas.
3. **Barra de abas**: pílula ativa que desliza (`cubic-bezier(.34,1.45,.64,1)`); o conteúdo entra pelo lado da aba escolhida.
4. **Carregamento**: esqueleto com brilho que varre, depois conteúdo com entrada direcional; números do destaque contam.
5. **Microinteração por papel**: pressão encolhe e solta onda na cor do produto; interruptor com mola; toast sobe e some;
   lista entra escalonada.
6. Entregue como mockup navegável (um por produto, trocando tokens) antes de tocar no app real.

## Armadilhas
- Movimento só em `transform` e `opacity`.
- Esqueleto deve ter a mesma altura do conteúdo final (sem salto).
- Em produto claro (Trippo), o acento é neutro: não force cor.

## Referências
`examples/lab-apps` (seções "Telas" e "Gestos"), `examples/lab-swfitness`.
