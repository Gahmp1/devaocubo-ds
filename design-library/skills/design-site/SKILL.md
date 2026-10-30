---
name: design-site
description: Monta sites estáticos e landing pages bonitos e leves para um produto (hero com título cinético, marquee, cartões com revelação ao rolar, frame de app animado, preços, FAQ), parametrizados pelos tokens do produto. Use quando pedirem um site, uma landing, uma página de produto ou um template de site com tema injetável. Não é para aplicações web com estado nem para dashboards.
---

# design-site

## Quando usar
Precisa de uma página pública estática de um produto (ou de um template reaproveitável) com a identidade do app.

## Slots (o que a skill parametriza)
| Slot | Fonte |
|---|---|
| Produto e tokens | `ds.config.json` / `DESIGN.md` / `tokens.css` do repo |
| Copy | texto do produto; exemplos marcados como exemplo |
| Seções | hero, faixa, benefícios, app, preços, FAQ, rodapé: cada uma liga e desliga |
| Orbe e movimento | opcional; some em `prefers-reduced-motion` |

## Passo a passo
1. Parta de `examples/site/site.html` e do seu `site.css`; troque o bloco de tokens `:root` pelo do produto.
2. Hero: título com entrada por palavra, uma única ação principal, fundo de pontos que reage ao ponteiro só em telas com
   ponteiro fino.
3. Revelação ao rolar com `IntersectionObserver`, escalonada e uma vez só.
4. Preços: alternância mensal/anual com o número contando; FAQ em acordeão com altura animada.
5. Fontes por Google Fonts; nenhum script de CDN; um CSS e um JS locais.
6. Verifique: sem erro de console, 375 px sem rolagem horizontal, contraste legível, Lighthouse sem regressão visível.

## Armadilhas
- Não prometa funcionalidade, preço ou número que o produto não tem.
- Animação de rolagem não pode esconder conteúdo se o JS falhar: o estado sem JS é o conteúdo visível.

## Referências
`examples/site`. Inspiração por categoria: `design-library` (landing pages, tipografia e movimento).
