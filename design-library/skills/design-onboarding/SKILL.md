---
name: design-onboarding
description: Desenha fluxos de onboarding de apps e sites (passos, escolhas, plano final) com entrada escalonada, seleção com tique desenhado e números que contam. Use quando o pedido for criar ou melhorar a primeira experiência de um produto, escolher quantos passos o onboarding deve ter, ou animar a transição entre passos. Não cobre autenticação nem permissões do sistema.
---

# design-onboarding

## Quando usar
Um produto precisa levar a pessoa da tela de boas-vindas ao primeiro valor. A skill define a estrutura (quantos passos,
o que cada um pergunta) e o movimento; o app continua dono dos dados e das regras.

## Passo a passo
1. **Um objetivo por tela.** No máximo 3 passos antes do primeiro valor: contexto (o que você quer), escolha (como), prova
   (o plano/painel já pronto). Cada passo tem título curto, uma frase de apoio e 3 opções no máximo.
2. **Escolhas em cartões**: título + detalhe de uma linha, seleção com tique desenhado (SVG com `stroke-dashoffset`),
   avanço automático opcional depois de 500 ms.
3. **Entrada escalonada**: cada elemento entra com atraso `--i` (60 a 90 ms), vindo de baixo; sem movimento em
   `prefers-reduced-motion`.
4. **Plano final**: números do resultado contam de 0 ao valor (ease-out cúbico, ≈0,9 s). Os números vêm do que a pessoa
   escolheu, não de exemplo.
5. **Voltar sempre possível**; pular só se o produto funcionar sem a resposta.
6. Texto do produto: use o tom e o vocabulário do app (ex.: Trippo pergunta "Qual é o ritmo da viagem?").

## Armadilhas
- Não peça dado que o produto não usa logo em seguida.
- Contagem de números: formate em pt-BR (`toLocaleString('pt-BR')`) e termine exatamente no valor final.
- Teste com teclado e leitor de tela: opções são botões com `aria-pressed`.

## Referências
`examples/lab-apps` (seção "Onboarding"). Copiar de `onboarding.js` e do bloco de CSS `.opt`.
