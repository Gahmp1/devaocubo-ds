---
name: design-pdf
description: Gera documentos paginados bonitos (propostas, relatórios, one-pagers) como HTML com CSS de paginação, prontos para imprimir ou salvar em PDF, com capa, cabeçalho e rodapé correntes, numeração, tabelas que não quebram e tema do produto adaptado para impressão. Use quando pedirem um PDF, uma proposta, um relatório ou um documento para enviar. Não é para decks (use html-slide-deck) nem para planilhas.
---

# design-pdf

## Quando usar
O entregável é um documento A4 (ou carta) para ler, imprimir ou anexar.

## Passo a passo
1. Parta de `examples/pdf/pdf.html`. Estrutura: capa, corpo, fecho; cada página é uma `section.page`.
2. `@page { size: A4; margin: ... }` define a página; cabeçalho e rodapé correntes e o número de página usam counters do
   CSS. `break-inside: avoid` em tabelas, figuras e citações; `break-before: page` só onde a página precisa recomeçar.
3. Tema do produto adaptado para impressão: fundo branco, texto escuro, acento do produto só em títulos e filetes.
   Nada de cor chapada de fundo grande (gasta tinta e some em P&B).
4. Na tela, mostre as páginas como folhas com sombra e dê zoom; o botão "Imprimir ou salvar PDF" chama `window.print()`.
5. Geração automática (opcional): imprimir headless com Chromium/Playwright (`page.pdf`) a partir do mesmo HTML.
6. Confira o número de páginas e quebras visualmente (folha a folha) antes de enviar.

## Armadilhas
- `target-counter` (sumário com número de página) não funciona no Chromium: se precisar de sumário paginado, numere à mão
  ou use um paginador.
- Fontes: embuta ou use as do sistema; fonte web que não carregou muda a paginação.
- Texto e números de exemplo precisam estar marcados como exemplo.

## Referências
`examples/pdf`.
