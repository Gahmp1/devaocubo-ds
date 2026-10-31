# Tipografia

Catálogo de famílias para os temas do `devaocubo-ds` e para testar fontes novas. Verificado em 2026-10-31 pela skill
design-research.

**Nenhum arquivo de fonte é copiado para esta pasta.** Todas as entradas ficam em "só link": o que existe aqui são os
mockups em `examples/`, que carregam as famílias livres pelo Google Fonts. Os campos extras de tipografia (`pesos`,
`papel`, `combina com`, `usada em`) estão descritos em `catalog-schema.md`.

**Fontes das licenças e dos pesos.** Licenças: arquivo `OFL.txt` (ou `LICENSE.txt`) do repositório oficial de cada
família, aberto em 2026-10-31; todos dizem "SIL Open Font License, Version 1.1" (https://openfontlicense.org). Pesos:
metadados públicos do Google Fonts, https://fonts.google.com/metadata/fonts, lidos na mesma data. "Combina com" é
inferência nossa, nunca fato da fonte. "Usada em" é fato lido nos arquivos citados.

## Gilroy
- url: a verificar (arquivos de fonte vivem no app do swfitness; fornecedor e página oficial ainda não conferidos)
- categoria: tipografia
- movimento: nenhum
- licença: proprietária (licença do dono confirmada em 2026-10-31, informação do João; contrato e escopo de uso não lidos aqui)
- estado: só link
- pesos: 400, 500, 600 (os únicos arquivos do app; não há Bold e `themes/swfitness.ts` faz o 700 cair em 600)
- papel: display e body (sans geométrica)
- combina com: IBM Plex Mono nos rótulos e números (inferência nossa; é o par que os mockups do swfitness já usam, com Outfit no lugar)
- usada em: swfitness. `ds/packages/theme/src/themes/swfitness.ts` linha 8 (web `'Gilroy', 'Outfit', system-ui, sans-serif`; nativo `Gilroy-Regular`, `Gilroy-Medium`, `Gilroy-SemiBold`) e `design-library/examples/identidades/themes.css` linha 179
- o que pegar: identidade do swfitness; no web a pilha cai em Outfit quando o arquivo não carrega. Como a licença é do dono, o arquivo não entra em pacote público sem checar o escopo antes
- exemplo local: examples/identidades (aparece como Outfit; Gilroy não é carregada em nenhum mockup)
- verificado em: 2026-10-31, design-research (licença: palavra do João; URL e fornecedor: a verificar)

## Geist
- url: https://github.com/vercel/geist-font (Google Fonts: https://fonts.google.com/specimen/Geist)
- categoria: tipografia
- movimento: nenhum
- licença: SIL OFL 1.1 (https://github.com/vercel/geist-font/blob/main/OFL.txt, "Copyright 2024 The Geist Project Authors")
- estado: só link
- pesos: 100 a 900 variável, com itálico (Google Fonts)
- papel: display e body (sans neutra)
- combina com: Geist Mono (mesma família), Instrument Serif para contraste editorial (inferência nossa)
- usada em: trippo, só no web (`themes/trippo.ts` linhas 5 e 50, `native: {}`, o mobile usa a fonte do sistema); `examples/identidades/index.html` linha 10 e `deck.html` linha 10 a carregam (400/500/600/700)
- o que pegar: sans neutra e legível para produto sóbrio; no Trippo a decisão de fonte do mobile segue em aberto com o João e o designer (comentário em `themes/trippo.ts`)
- exemplo local: examples/identidades
- verificado em: 2026-10-31, design-research

## Geist Mono
- url: https://github.com/vercel/geist-font (Google Fonts: https://fonts.google.com/specimen/Geist+Mono)
- categoria: tipografia
- movimento: nenhum
- licença: SIL OFL 1.1 (mesmo `OFL.txt` do repositório da Geist)
- estado: só link
- pesos: 100 a 900 variável, com itálico (Google Fonts)
- papel: mono (código, números, rótulos)
- combina com: Geist
- usada em: trippo, só no web (`themes/trippo.ts` linha 50). Nenhum mockup a carrega: o link do Google Fonts em `examples/identidades/index.html` pede só Geist, Plex Mono e Outfit, então o mono do Trippo cai no fallback do sistema nos mockups
- o que pegar: o mono de par com a Geist, para rótulos e valores com `tabular-nums`
- exemplo local: nenhum
- verificado em: 2026-10-31, design-research

## IBM Plex Mono
- url: https://github.com/IBM/plex (Google Fonts: https://fonts.google.com/specimen/IBM+Plex+Mono)
- categoria: tipografia
- movimento: nenhum
- licença: SIL OFL 1.1 (https://github.com/IBM/plex/blob/master/LICENSE.txt, "Copyright © 2017 IBM Corp. with Reserved Font Name 'Plex'")
- estado: só link
- pesos: 100 a 700 com itálico, sem 800 e 900 (Google Fonts)
- papel: mono; no Somma faz também display e body
- combina com: Gilroy ou Outfit (rótulos e números); sozinha no Somma
- usada em: somma, em tudo, com 400/600/700 (`themes/somma.ts` linha 7; nativo `IBMPlexMono_400Regular`, `_600SemiBold`, `_700Bold`); swfitness nos mockups, como `--mono` (`examples/lab-swfitness/styles.css` linha 6); `examples/lab-apps`, `library`, `pdf` e `identidades` a carregam pelo Google Fonts
- o que pegar: o tom editorial e técnico do Somma; dinheiro em 700 com `tabular-nums`, rótulos em caixa-alta (ver `identidade-por-produto.md`)
- exemplo local: examples/identidades, examples/lab-swfitness
- verificado em: 2026-10-31, design-research

## Outfit
- url: https://github.com/Outfitio/Outfit-Fonts (Google Fonts: https://fonts.google.com/specimen/Outfit)
- categoria: tipografia
- movimento: nenhum
- licença: SIL OFL 1.1 (https://github.com/Outfitio/Outfit-Fonts/blob/main/OFL.txt, "Copyright 2021 The Outfit Project Authors")
- estado: só link
- pesos: 100 a 900 variável (Google Fonts); sem itálico
- papel: display e body (sans geométrica)
- combina com: IBM Plex Mono
- usada em: fallback web da Gilroy no swfitness (`themes/swfitness.ts` linha 8) e substituta dela nos mockups (`examples/lab-swfitness/styles.css` linha 10, `examples/library`, `examples/pdf`, `examples/lab-apps`, `examples/identidades`)
- o que pegar: a alternativa livre e já testada ao Gilroy; serve de fonte padrão para quem não tem a licença do arquivo
- exemplo local: examples/lab-swfitness, examples/identidades
- verificado em: 2026-10-31, design-research

## JetBrains Mono
- url: https://github.com/JetBrains/JetBrainsMono (Google Fonts: https://fonts.google.com/specimen/JetBrains+Mono)
- categoria: tipografia
- movimento: nenhum
- licença: SIL OFL 1.1 (https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt, "Copyright 2020 The JetBrains Mono Project Authors")
- estado: só link
- pesos: 100 a 800 variável, com itálico (Google Fonts)
- papel: mono (código, terminal)
- combina com: Inter ou Geist (inferência nossa)
- usada em: nenhum produto. Aparece só como nome na pilha de fallback `--font-mono` de `examples/identidades/deck.html` linha 41, sem ser carregada
- o que pegar: mono pensada para código, com altura de x grande e leitura longa; candidata para áreas técnicas ou terminal
- exemplo local: nenhum
- verificado em: 2026-10-31, design-research

## Inter
- url: https://github.com/rsms/inter (Google Fonts: https://fonts.google.com/specimen/Inter)
- categoria: tipografia
- movimento: nenhum
- licença: SIL OFL 1.1 (https://github.com/rsms/inter/blob/master/LICENSE.txt, "Copyright (c) 2016 The Inter Project Authors")
- estado: só link
- pesos: 100 a 900 variável, com itálico e eixo de tamanho óptico (opsz 14 a 32) no Google Fonts
- papel: body e interface (sans neutra de tela)
- combina com: JetBrains Mono, Instrument Serif (inferência nossa)
- usada em: nenhum produto nem mockup
- o que pegar: linha de base neutra para comparar com as outras; boa para texto denso em telas
- exemplo local: nenhum
- verificado em: 2026-10-31, design-research

## Space Grotesk
- url: https://github.com/floriankarsten/space-grotesk (Google Fonts: https://fonts.google.com/specimen/Space+Grotesk)
- categoria: tipografia
- movimento: nenhum
- licença: SIL OFL 1.1 (https://github.com/floriankarsten/space-grotesk/blob/master/OFL.txt, "Copyright 2020 The Space Grotesk Project Authors")
- estado: só link
- pesos: 300 a 700 variável, sem itálico (Google Fonts)
- papel: display (sans com personalidade técnica)
- combina com: IBM Plex Mono, Inter (inferência nossa)
- usada em: nenhum produto nem mockup
- o que pegar: títulos com caráter mais marcado que Geist ou Inter, sem ficar decorativa
- exemplo local: nenhum
- verificado em: 2026-10-31, design-research

## Instrument Serif
- url: https://github.com/Instrument/instrument-serif (Google Fonts: https://fonts.google.com/specimen/Instrument+Serif)
- categoria: tipografia
- movimento: nenhum
- licença: SIL OFL 1.1 (https://github.com/Instrument/instrument-serif/blob/main/OFL.txt, "Copyright 2022 The Instrument Serif Project Authors")
- estado: só link
- pesos: só 400, regular e itálico (Google Fonts)
- papel: display editorial (serifada condensada; para títulos grandes, não para texto corrido)
- combina com: Geist, Inter ou IBM Plex Mono no corpo (inferência nossa)
- usada em: nenhum produto nem mockup
- o que pegar: o contraste editorial, com um título serifado grande sobre sans ou mono; um peso só, então a hierarquia vem do tamanho. Alternativa com eixos e mais pesos: Fraunces (https://github.com/undercasetype/Fraunces, OFL 1.1 em `OFL.txt`, "Copyright 2018 The Fraunces Project Authors"; no Google Fonts 100 a 900 variável com eixos SOFT, WONK e opsz de 9 a 144)
- exemplo local: nenhum
- verificado em: 2026-10-31, design-research

## Como o DS usa
Verificado em 2026-10-31 no código de `ds/packages/fonts`, `ds/packages/theme` e `ds/packages/native`.

- O tema referencia a família por id, em `type.family.{display,body,mono}.id`. Os temas montam a família com `fontFamily('<id>')`
  (de `@gahmp1/ds-fonts`), que devolve a pilha web e os nomes nativos por peso.
- Os arquivos e o registro vêm do pacote `@gahmp1/ds-fonts` (`families.json` é a fonte única: id, nome, papel, licença, pesos).
  - Web: o app importa `@gahmp1/ds-fonts/css/<id>.css` (gerado, com `@font-face`).
  - Nativo: `useThemeFonts(temas, idsExtras?)`, de `@gahmp1/ds-native`, carrega as famílias dos temas; devolve `true` quando prontas.
- Testar uma fonte: `withFont(tema, fontFamily('<id>'))` (de `@gahmp1/ds-theme`). Os dois catálogos têm seletor de fonte
  (Storybook: barra "Fonte"; nativo: linha de chips e `?font=<id>` no deep link).
- Adicionar uma família: colocar os `.ttf` e o `LICENSE.txt` em `ds/packages/fonts/files/<id>/`, uma linha em `families.json`,
  e rodar o build do pacote.
- Fonte proprietária (Gilroy): licença confirmada pelo João em 2026-10-31 para os produtos devaocubo; o pacote é privado
  (GitHub Packages). Não copie esses arquivos para fora dele.
- Em mockup HTML solto da biblioteca, o link do Google Fonts como em `examples/identidades/index.html` continua valendo.
