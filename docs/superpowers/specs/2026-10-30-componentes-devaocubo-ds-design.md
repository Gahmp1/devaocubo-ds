# Componentes reutilizáveis no devaocubo-ds (React Native e web)

Data: 2026-10-30. Estado: **aprovado pelo dono em 2026-10-30** (última resposta: "Não vamos usar Rive por enquanto",
dada depois de a aprovação ter sido condicionada a essa decisão). Nada foi construído: nenhum código, scaffolding ou dependência.
Leitura feita sobre `origin/main` de swfitness (1ec0c836), swfitness-admin (a7f0971), trippo (280967f), somma (35dab32),
agent-chat (e5118f6) e devaocubo-ds (33db9d0), exportados para uma pasta temporária; os checkouts locais não foram tocados.

Legenda: **[dono]** decisão do João, com as palavras dele; **[chamada]** decisão minha, revisável; **[inferência]** não lido
na fonte nesta sessão; **[a verificar]** licença ou fato incerto.

---

## 1. Intenção e por quê

Hoje cada produto evolui o próprio design sozinho e há três kits paralelos de componentes (Zenith no SWFitness,
`components/ui` duplicado entre mobile e web no Trippo, `@somma/ui` mais um kit web no Somma). O devaocubo-ds só distribui
tokens, e mesmo isso está fragmentado: os 16 consumidores fixam 5 commits diferentes do pacote, porque a dependência é
`github:` sem versão.

O João quer que o design do SWFitness, pensado pelo designer, vire a **base estrutural** de Trippo e Somma, com
**liberdade real para cada app ter identidade própria**, sempre pelo design system. Quer também que tudo o que o chat usa
venha do devaocubo-ds, para que telas que não são chat usem as mesmas peças (estado de espera, etapas, cartão de
aprovação), e que apps e sites usem os mesmos componentes.

Consequência assumida: o Zenith, o design system interno do SWFitness, **deixa de existir** **[dono]**. O devaocubo-ds passa
a ser o único design system dos produtos, e a regra do `AGENTS.md` que proíbe componentes no repositório é revista de forma
explícita (seção 8), não contornada.

## 2. Decisões do dono (como ele as deu)

| # | Decisão | Palavras do dono |
|---|---|---|
| D1 | Base de Trippo e Somma = estrutura do SWFitness com marca própria, com flexibilidade para identidade única, sempre via DS | "Seria a primeira, mas o que quero complementar seria que a gente tivesse flexibilidade pra tornar, mesmo tendo essa base, possível que cada app fique com a sua identidade única. Quero sua ajuda nisso, sempre trabalhando com design system." |
| D2 | Todo componente usado no chat vem do devaocubo-ds (reverte a decisão de 2026-10-25 de que o desenho dos componentes do chat é do agent-chat) | "Os componentes que são usados no chat todos devem vir do devaocubo-ds agora, para que features que não são de chat mas que querem usar algum componente em comum consigam usar." |
| D3 | Claro e escuro desde a primeira fase | "Claro e escuro desde já" (opção: todo componente nasce com os dois modos; o claro é gerado a partir dos tokens e o designer revisa) |
| D4 | O DS do SWFitness (Zenith) deixa de existir; migrar ou recriar fica aberto, decidido pelo estudo | "O DS do SWFitness deixaria de existir. Inclusive estude a estrutura e arquitetura dele e veja o que faz sentido: migramos ou recriamos. Estou aberto às 2 alternativas." |
| D5 | Ordem: SWFitness primeiro, depois Trippo e Somma | prompt da sessão, passo 5 |
| D10 | Sem Rive por enquanto | "Não vamos usar Rive por enquanto." |
| D9 | Estudar as tecnologias que as referências usam e mudar de rota se houver algo melhor | "Estude não só o Skia mas outras que os sites que temos como ref usam e veja o que seria melhor; se tiver algo melhor, já mudamos a rota." (resultado: seção 9b) |
| D8 | O plano usa as skills de design novas (`design-*`, `html-slide-deck`) | "Quero que nesse plano a gente use nossas skills novas que criamos." |
| D7 | Skia e animação disponíveis em qualquer tela, não só nas de IA | "Skia poderia ser usado sempre que acharmos interessante, não só relacionado a IA. Animação não deve ficar presa a telas de IA." |
| D6 | Validação visual e por uso real, sem testes unitários nos repos devaocubo; código morto apagado no mesmo refactor, sem alias | prompt da sessão; regra permanente |

Decisões anteriores que continuam valendo: SDK de chat provado primeiro no Somma e no Trippo (2026-10-29); áudio, LGPD e
modelos do agent-chat como estão; registro TS do agent-chat no GitHub Packages `@gahmp1`.

## 3. Objetivos

1. Um design system único, em pacotes versionados, com camadas para **React Native** e **web (React)** sobre o mesmo
   contrato de tema e o mesmo comportamento.
2. **Identidade por produto** expressa só por tema e escolhas declaradas (seção 6), sem fork de componente.
3. Componentes **AI-first** de primeira classe (orbe de espera, borda luminosa, etapas, cartão de aprovação, bolha, lista
   de mensagens, composer) usáveis dentro e fora do chat.
4. O agent-chat passa a montar sua UI com esses componentes; `ChatTheme` deixa de existir (seção 9).
5. SWFitness migrado sem perda visual perceptível; depois Trippo e Somma com identidade própria.
6. Claro e escuro em todo componente, acessibilidade AA e movimento reduzido desde a fase 1.

## 4. Fora de escopo

- Redesenhar telas dos produtos. Cada onda de migração troca a base; redesenho de tela é PR/spec à parte.
- Sites em HTML puro (travels-site, saídas da skill `design-site`): continuam com `tokens.css` e receitas. Sites em Next
  usam o pacote web normalmente. **[chamada]**
- Os outros 13 consumidores do pacote de tokens (Aimo, AutoCut, liora*, cookbox etc.): continuam como estão; migrar para
  os pacotes novos é decisão posterior.
- swfitness-admin: fora das ondas iniciais (é painel interno com shadcn padrão; ganha o tema SWFitness via tokens numa
  onda tardia). **[chamada]**
- Componentes de domínio (mapa muscular, régua de peso, `Money` do Somma, mapa de viagem) não entram no DS.
- Distribuir fontes. Cada produto carrega a sua.
- AutoCut: nada aqui roda ou é testado no Mac.

## 5. O que seria fracasso mesmo funcionando

- Os três apps parecerem o mesmo app com cores trocadas.
- O DS virar depósito de componentes de domínio, ou um produto voltar a manter cópia local "só desta vez".
- O SWFitness perder fidelidade visual na migração (medidas, peso de fonte, brilho) e ninguém notar até a loja.
- O chat continuar com desenho duplicado entre agent-chat e DS.
- A versão consumida divergir entre produtos como hoje (5 commits fixados diferentes, sem semver).
- O modo claro gerado ir para produção sem revisão do designer.
- Orbe ou borda luminosa travando em Android de entrada, ou ignorando movimento reduzido.

## 6. Restrições

- Sem teste unitário (`*.test.ts`, `*_test.go`, `*Test.kt`) nos repos devaocubo; validação é visual e por uso real
  (seção 13). O `defaults.test.mjs` existente fica como está.
- Sem alias, re-export de transição nem compatibilidade: quem migra apaga o antigo no mesmo PR.
- SWFitness: build e OTA só pelo Makefile (`make fl-ios-prod`, `make fl-android-prod`, `make ota-prod`), nunca `eas` direto.
- O pacote raiz `devaocubo-ds` (`tokens.css`, `defaults.json`) mantém nomes e formato: 16 repositórios e o ProjectsCLI
  (`internal/doctor/designtokens.go:51`) o leem.
- Base técnica comum, que torna a camada RN única viável: RN 0.86, React 19.2, Reanimated 4.5 e Expo 57 nos três apps.
  Estilização diverge (SWFitness: StyleSheet; Trippo: Uniwind/Tailwind 4; Somma: NativeWind/Tailwind 3).
- ADR-001 do Somma: o web não usa react-native-web; telas separadas por plataforma sobre a mesma lógica.
- Mockups novos: artifact privado.

## 7. Estudo do Zenith: migrar ou recriar

**O que o Zenith é** (`apps/mobile/src/components/zenith/`): Atomic Design (18 átomos, ~33 moléculas, ~33 organismos,
4 templates, 2 pages), 12.271 linhas sem stories, usado por 167 arquivos do app. Tokens em `tokens.json`, extraído do app
iOS ZenithCore em 2026-03-16, só escuro, lidos por `typedTokens.ts`. Catálogo com Storybook 10.5 (react-native-web-vite),
Playroom, 92 stories e 89 MDX. `tools/zenith-mcp`: 28 regras ZC-* com baseline que bloqueia violação nova.

**O que decide:**

| Fato | Evidência | Peso |
|---|---|---|
| Tokens são constantes de módulo dentro de `StyleSheet.create` (84 arquivos); não há provedor de tema nem `useColorScheme` | grep no export | Tema por produto e claro/escuro exigem reescrever o estilo de **todo** componente |
| Zero suporte a movimento reduzido | grep `ReduceMotion` = 0 | Reescrita de toda animação de qualquer jeito |
| 27 arquivos acoplados a analytics do app, 16 a i18n, vários a stores, tipos de treino e navegação | `internal/useTrackedPress.ts`, imports `../../../../state`, `types/workout` | Precisam ser cortados para sair do app |
| API de props madura, 154 usos de acessibilidade, medidas conferidas com Figma e designer | `DSButton`, `TextField`, comentários "medido no Figma" | Vale preservar como especificação |
| Catálogo e regras de conformidade funcionando | `.storybook/`, `zenith-mcp` | Vale migrar |

**Veredito [chamada]: recriar os componentes, migrar o resto.**

| Peça | Migrar ou recriar | Como |
|---|---|---|
| Valores dos tokens (cores, escala, raios, espaçamento, tipografia) | **migrar** | Viram o tema `swfitness` escuro, valor por valor |
| Estrutura de tokens | **recriar** | Três camadas mais modos (seção 10) |
| Componentes genéricos | **recriar** usando o Zenith como especificação | API de props, medidas, variantes e rótulos de acessibilidade do Zenith; estilo lido do tema em tempo de execução |
| Hooks de animação (`usePressAnimation`, `useKeyframeBounce`, `useTextFieldAnimation`) | **migrar e adaptar** | Durações e easing passam a vir do tema; respeitam movimento reduzido |
| Lógica sem estilo (gesto do `BottomSheet`, geometria de `BarChart`/`LineChart`, `formatClock`) | **migrar** | Copiar e limpar |
| Telemetria (`useTrackedPress`) | **recriar** como porta do DS | `DSProvider` recebe `onInteraction(evento)`; o SWFitness implementa com o `emitButtonClicked` atual |
| Textos (i18n) | **recriar** | Props e `strings` no provedor; o DS não importa i18n |
| Componentes de domínio (`MuscleEngagementMap`, `WeightRuler`, `ExerciseContent`, badges de dificuldade etc.) | **ficam no SWFitness**, saem da pasta `zenith`, refeitos sobre o DS | Viram componentes do produto |
| Storybook e Playroom | **migrar** para o catálogo do DS | Seção 13 |
| `zenith-mcp` | **migrar e generalizar** para `ds-mcp` no devaocubo-ds | Regras de DS (ZC-A, ZC-B, ZC-E) valem para todos os produtos; regras de app (ZC-C, ZC-D, QA) viram configuração por produto |

Por que não migrar os componentes como estão: o primeiro requisito novo (tema por produto e claro/escuro) já toca cada
`StyleSheet` do Zenith, e o segundo (movimento reduzido) toca cada animação. Migrar seria reescrever no lugar, carregando
os acoplamentos; recriar com a especificação em mãos sai mais limpo pelo mesmo custo.

## 8. Opções de entrega comparadas

| Opção | Custo | Risco | Como o consumidor customiza | Como evolui |
|---|---|---|---|---|
| **A. Pacotes por plataforma no mesmo repo**, sobre um tema e um núcleo comuns, com semver | O maior: recriar ~40 componentes genéricos e AI-first em duas plataformas, pipeline de tokens, catálogo | Trabalho longo; a primeira migração (SWFitness, 167 arquivos) é grande | Tema por produto, variantes fechadas, padrões por componente, slots nos compostos | Semver em lockstep; cada app sobe quando quiser |
| B. Um código só via react-native-web | Médio | Contraria a ADR-001 do Somma; peso e SEO no Next; não serve a sites | Igual à A | Igual à A |
| C. Copiáveis estilo shadcn (registro mais CLI) | Baixo para começar | É o modelo de hoje, que produziu três kits paralelos | Total, por cópia | Melhoria não propaga; cada cópia diverge |
| D. Só receitas nas skills | Quase zero; já existe | O agente reimplementa a cada vez | Total | Nenhuma |

**Recomendada: A** **[chamada]**. É a única que entrega "os mesmos componentes" em apps e sites e mantém a evolução
centralizada. Atende à ADR do Somma (web em pacote próprio) e roda nos três apps porque a camada RN usa StyleSheet com tema
por contexto, sem depender de NativeWind ou Uniwind. **Custo:** o maior dos quatro, porque a camada web não existe hoje,
a RN precisa ser recriada e as três migrações são grandes. Não estimo prazo: não há base medida para isso.

**Nova regra do repositório** (substitui "do not add component implementations here"):
> O pacote raiz `devaocubo-ds` continua só com `tokens.css`, `defaults.json` e `README.md`. Componentes vivem em
> `ds/packages/*`, publicados como `@gahmp1/ds-*`. Componente de domínio de um produto não entra aqui.

## 9. Arquitetura da opção A

```
devaocubo-ds/
  package.json            pacote raiz "devaocubo-ds" (contrato atual intacto, sem workspaces nem script build:
                          com eles o npm prepara o monorepo inteiro em toda instalação via git)
  tokens.css, defaults.json  passam a ser GERADOS por ds/packages/theme (mesmos nomes e formato)
  ds/
   package.json           raiz dos workspaces (privada)
   packages/
     theme/   @gahmp1/ds-theme   contrato de tema (tipos), temas dos produtos, geradores (CSS vars, objeto RN,
                                @theme do Tailwind 4, preset do Tailwind 3), checagem de contraste
     core/    @gahmp1/ds-core    comportamento sem UI: regra de espera, máquina de etapas, revelação de texto
                                por palavra, linhas do tempo f(t), estados de dados, hooks React sem DOM e sem RN
     native/  @gahmp1/ds-native  componentes React Native
     web/     @gahmp1/ds-web     componentes React para web, com um CSS próprio (variáveis --ds-*, @layer ds)
     mcp/     ds-mcp             servidor de conformidade (ex-zenith-mcp), regras do DS mais configuração por produto
   apps/
     catalog-native/  app Expo com todos os componentes, temas e modos (simulador e emulador)
     catalog-web/     Storybook web (componentes web e, via react-native-web só no catálogo, os nativos)
  design-library/    como está
```

Chamadas de arquitetura **[chamada]**:
- Nomes `@gahmp1/ds-theme`, `ds-core`, `ds-native`, `ds-web`; versão em lockstep, gerida por changesets; publicação no
  GitHub Packages, como o agent-chat. Pré-1.0, minor pode quebrar; cada quebra sai junto com os PRs dos consumidores na
  mesma onda.
- Direção de dependência: `ds-native` e `ds-web` → `ds-core` → `ds-theme`. O DS nunca depende do agent-chat nem de produto.
- Peers de `ds-native`: `react >=19`, `react-native >=0.86`, `react-native-reanimated >=4.5`, `react-native-svg >=15`
  e `@shopify/react-native-skia` na linha 2.x fixada pelo Expo do consumidor (seção 9b). **[dono]** Skia pode ser usado em qualquer componente ou animação em que fizer
  sentido, não só nos de IA: "animação não deve ficar presa a telas de IA". Todo app que adota o DS instala Skia.
- Movimento é uma camada própria (`ds-native/motion` e `ds-web/motion`), não um detalhe dos componentes de IA:
  primitivos de animação reutilizáveis em qualquer tela (brilho, borda luminosa, fundo de cena, shimmer, transições de
  entrada e saída, celebração de sucesso, revelação de número). Eles leem o eixo de movimento do tema e respeitam
  movimento reduzido. Os componentes AI-first são consumidores dessa camada, como qualquer outro. A tecnologia de cada
  camada está na seção 9b.

## 9b. Pilha de movimento (pesquisa de 2026-10-30)

**[dono]** "Estude não só o Skia mas outras que os sites que temos como ref usam e veja o que seria melhor; se tiver algo
melhor, já mudamos a rota." A pesquisa (skill `design-research`; entradas em
`design-library/references/motion-e-video.md` e `orbes-e-loaders-de-ia.md`) leu os 25 sites de código do catálogo e as
fontes oficiais de Skia, Reanimated, Rive, Lottie, react-native-webgpu, Moti, motion, GSAP e ogl.

**O que as referências usam:** quase sempre CSS, SVG ou Canvas 2D, sem biblioteca. Onde há biblioteca é a `motion`; GSAP
só no react-bits. Nenhuma usa Rive ou Lottie como animação principal. O autor do border-beam e do thinking-orbs
(libraries.dev, MIT) portou os dois para RN com Skia mais Reanimated, e o `react-native-livechart` fez o mesmo com o
Liveline. O padrão dele separa a **geometria compartilhada** (`src/engine`) do **desenho por plataforma** (Canvas 2D no
web, Skia no RN).

**Veredito [chamada]: a rota continua com Skia no RN, mas Skia deixa de ser o motor universal.** A pilha fica em camadas:

| Camada | React Native | Web | Para quê |
|---|---|---|---|
| 1. Base (a maior parte) | Reanimated 4 (mola, entrada e saída, layout, animações CSS, `useReducedMotion`) | CSS (transições, `@property`, View Transitions) mais `motion` (`m` mais LazyMotion, ~5 KB) | entradas, tabs, pressão, números, sheets, toasts, skeleton simples |
| 2. Gráfica | Skia 2.x, no pin do Expo (2.6.2 no SDK 57) | Canvas 2D; borda luminosa em CSS `@property`; ogl (29 KB) só se um shader for indispensável | orbe, borda luminosa, fundos com brilho e blur, shader de fluido, shimmer rico, gráficos |

Regras da pilha **[chamada]**:
- **Geometria e linha do tempo em `ds-core`.** São funções puras de `t` e do estado, sem DOM e sem RN, desenhadas por
  Skia no RN e por Canvas 2D ou CSS no web. É o padrão do libraries.dev, e garante o mesmo orbe nas duas plataformas sem
  carregar o CanvasKit (2,9 MB gz) no web.
- **Skia é só para o que precisa de GPU.** Entrada, tab, pressão e número ficam no Reanimated: é mais leve e já respeita
  movimento reduzido.
- **Skia fica na linha 2.x que o Expo fixa.** A v3 é outro pacote (`react-native-skia`, Graphite): exige dev build,
  Android minSdk 26 e Vulkan, e o canvas fica em branco em Android sem Vulkan. Migrar para a v3 é decisão separada, quando
  o Expo a fixar.
- **Os ports RN do libraries.dev são referência de arquitetura, não dependência.** Estão em beta, só iOS foi verificado e
  não estão no npm. Os componentes são recriados no DS a partir deles (MIT, com atribuição).
- **Nunca copiar código com Commons Clause** (react-bits, rareui, canvasui) para o DS.
- **Fora:** react-native-webgpu e three/r3f (sem maturidade declarada), Moti (documentação ainda em Reanimated 3), GSAP
  (desnecessário), CanvasKit no web, Lottie (só se o designer já entregar After Effects).
- **Rive fica fora por enquanto [dono]:** "Não vamos usar Rive por enquanto." Se voltar, entra como camada autoral para
  animações do designer idênticas nas duas plataformas. Pesa ~1,7–2,4 MB no app e 222–648 KB no web, e o editor é pago
  por assento (catálogo em `design-library/references/motion-e-video.md`).
- `ds-web` não exige Tailwind: entrega `ds-web/styles.css`. Overlays acessíveis (Dialog, Sheet, Popover, Select, Menu)
  sobre Radix, que o Trippo já usa.
- Ícones: o DS não traz conjunto de ícones; o tema declara o componente de ícone do produto e a espessura de traço.
- Os temas dos três produtos-carro-chefe vivem em `tokens/themes/` do DS, para o catálogo mostrar lado a lado e a
  identidade ser trabalhada aqui. Custo aceito: mudar o tema de um produto exige uma versão do DS.
- Há um quarto tema, `devaocubo` (neutro), com os valores exatos de hoje. É dele que saem o `tokens.css` e o
  `defaults.json` do pacote raiz, que continuam com os mesmos nomes de variável. Papéis novos (superfícies 1–3, papéis de
  IA, eixos 2 a 9) existem só nos pacotes `@gahmp1/ds-*` e não são emitidos nos arquivos antigos.
- Publicação: mesmo processo de release do agent-chat (`estado-execucao.md:129`, `:444`): tag anotada, GitHub Release e
  publicação no GitHub Packages rodada localmente com o token do gh; não há CI. Cada release é autorizada pelo dono, como
  o "deploy" do pacote. Changesets só gera versões e changelog. O consumidor precisa de `.npmrc` com `read:packages` antes
  da onda dele: SWFitness na onda 2.
- O tema chega em tempo de execução: `DSProvider theme={swfitness} scheme="system|light|dark"` no RN (contexto) e no web
  (variáveis CSS no elemento raiz mais `data-theme`). Telas de produto feitas com Tailwind usam o mesmo tema pelo `@theme`
  gerado (Trippo, Uniwind) ou pelo preset do Tailwind 3 (Somma, até o NativeWind 5).

## 10. Contrato de customização: identidade por produto (D1)

A identidade de um produto é um **tema**, composto de nove eixos. Todo componente lê só esses eixos.

| Eixo | O que controla | Exemplo de diferença entre apps |
|---|---|---|
| 1. Cor | primitivos; papéis semânticos em claro e escuro (fundo, superfícies 1–3, texto 1–3, acento, sobre-acento, perigo, aviso, sucesso, info, borda, foco); papéis de IA (brilho, orbe, borda luminosa) | lima sobre quase-preto × verde único editorial × tinta sobre papel |
| 2. Tipo | famílias (display, corpo, mono), escala, pesos, espaçamento entre letras, caixa dos rótulos, números tabulares | Gilroy 400/500 × Plex Mono caixa-alta × Geist |
| 3. Forma | escala de raio, forma padrão de controle (pílula, arredondado, reto), espessura de borda | pílula com hairline × quase reto |
| 4. Profundidade | modelo de elevação (plano, hairline, sombra, brilho, blur) e sombras | brilho e blur × plano × sombra suave |
| 5. Densidade | escala de espaçamento e altura de controles (compacto, regular, confortável) | — |
| 6. Movimento | durações, easing, mola, personalidade (calmo, ágil), retorno de toque (opacidade ou escala) | 200 ms ease × calmo |
| 7. Expressão de IA | forma do orbe (pontos, fluido, anel), cor e velocidade da borda luminosa, estilo das etapas, ritmo da revelação de texto, tom dos rótulos de espera | orbe de pontos × anel mínimo |
| 8. Padrões por componente | variante padrão de cada componente (botão pílula ou retangular, cartão preenchido ou contorno, tab bar flutuante, vidro ou sólida, título grande ou compacto) | — |
| 9. Iconografia | componente de ícone do produto e espessura de traço | — |

Limites: nenhum CSS ou estilo arbitrário por componente via tema. Variante nova é mudança no DS. Primitivos aceitam
`style` e `className` para layout (margem, flex), não para cor ou tipo; o `ds-mcp` acusa o abuso. Componentes compostos
têm **slots** (título, conteúdo, ações, ícone) para o produto colocar conteúdo próprio sem copiar o componente.

**Proposta inicial de identidade** **[chamada]**; validar em mockup (artifact privado) antes de cada onda:
- **SWFitness:** o Zenith como está no escuro (lima `#B6FB2D`, `#0E0E11`, Gilroy, pílula, hairline mais brilho). O claro é
  gerado e fica atrás de revisão do designer; o app segue só escuro até essa revisão.
- **Somma:** editorial, a partir de `packages/tokens` e `design/design-systems/somma` (Plex Mono, preto e branco, verde
  único `#34D399`, raio pequeno, plano, números tabulares, rótulos em caixa-alta, movimento calmo, orbe em anel).
- **Trippo:** hoje é neutro (papel `#f7f6f2`, tinta `#18181b`, Geist no web, fonte do sistema no mobile, sem acento de
  marca). Proposta: partir de `apps/web/BRAND.md` (Ink, Paper, Ash, Night), sombra suave, arredondado; acento e fonte do
  mobile definidos com o João e o designer antes da onda do Trippo.

**Como a identidade é verificada:** no catálogo, a mesma tela-modelo (lista, detalhe, chat com espera, cartão de
aprovação) aparece com os três temas lado a lado, em claro e escuro. Critério: dá para dizer qual app é qual sem ver o logo.

## 11. Componentes iniciais, por camada

Todos em `ds-native` e `ds-web`, com a mesma API, salvo indicação. Origem: Z = especificação do Zenith; AC = do agent-chat;
L = mockups do Lab (`design-library/examples/lab-swfitness`).

**Primitivos:** Text (Z), Button (Z), IconButton (Z), TextField e TextArea (Z), Toggle (Z), Checkbox (Z), Radio (Z),
Tag e Chip/FilterChip (Z), Badge, Divider (Z), Stack/Box (Z), Spinner (Z, shader de fluido em Skia),
Skeleton (Shimmer do Z), ProgressBar (IndeterminateBar do Z).

**Movimento** (subpath `motion`, usável em qualquer tela): `Glow` e `GlowScene` (fundo de cena do Z, hoje com hex soltos,
passa a ler o tema), `GlowBorder` (borda luminosa, também usada pelo composer), `Blur` (Z), `Shimmer`, `Reveal` (entrada e
saída com mola ou easing do tema), `Celebration` (fundo de sucesso; `SuccessBackground` do Z), `NumberTicker` (revelação
de número), `ScrollFade` (Z). Primitivos de baixo nível para quem precisar compor: `useThemeMotion()` (durações, easing e
mola do tema, já com movimento reduzido aplicado) e uma tela Skia tematizada.

**Composição:** Card (Z), ListItem e DetailedListItem (Z), Sheet (BottomSheet do Z no RN; drawer/dialog no web), Dialog,
Toast (Z), Feedback para vazio, sucesso e erro (Z), Screen e Page (scaffold com safe area no RN; layout no web),
HeaderTitle (Z), SegmentedControl (Z), Stepper (Z), StatCard (Z), TabBar desacoplada (props, sem store), CircularProgress,
BarChart e LineChart (Z), Table (web) e DataList (RN), Metric (AC), Select e Menu (web; RN via Sheet).

**AI-first** (subpath `ai`):

| Componente | O que faz | Origem |
|---|---|---|
| `WaitingOrb` | Orbe de espera; forma vem do eixo 7; estados `working`, `searching`, `solving`, `listening`, `waiting`, `retrying`, com mistura entre estados | L (`orbs.js`, Skia mais Reanimated no RN, canvas no web) |
| `WaitingState` | Aplica a regra de espera: até 2 s nada; a partir de 2 s orbe mais rótulo; acima de 3 s mais borda luminosa e etapas. Recebe o estado; não cria timers de negócio | regra de `design-library/README.md` |
| `StepList` | Etapas `pending`, `active`, `done`, `error`, entrando uma a uma | Z (`ProgressiveStatusLoader`) mais L |
| `StreamingText` | Revelação por palavra; no movimento reduzido mostra direto e anuncia por frase | L, AC |
| `MessageBubble` | Usuário, assistente e sistema; slot de conteúdo (cartões, widgets); metadado de voz | Z (`ChatBubble`), AC |
| `MessageList` | Lista virtualizada com rolagem automática, banner de reconexão, anúncio de acessibilidade | AC, Z |
| `Composer` | Texto, envio, microfone, anexo por slots; liga `GlowBorder` (da camada `motion`) quando ocupado | Z (`ChatInput`), AC |
| `ToolCallChip` | Status de ferramenta (`running`, `ok`, `error`, `rejected`, `deferred`, `cancelled`) | AC |
| `ApprovalCard` | Cartão de aprovação com slots de título, resumo, prévia e ações; variante destrutiva exige confirmação em dois passos; foco ao aparecer | AC (`ConfirmationCard`), Z (`EditReviewSheet`, `DiffCard`) |
| `ClarificationCard` | Pergunta com opções | Z |
| `Sources` e `Files` | Citações e anexos | AC |
| `RecordingBar` | Gravação de voz | Z |

Os widgets de UI gerada do agent-chat (`ui-tree`, 10 primitivos) passam a mapear para primitivos do DS.

## 12. Como agent-chat, apps e sites consomem

**agent-chat (D2):**
- `@gahmp1/agent-chat-react` e `-react-native` passam a ser **ligação**: estado do `agent-chat-core` → componentes do DS.
  Bolha, lista, composer, chip de ferramenta, cartão de confirmação e widgets embutidos internos são apagados.
- `ChatTheme`, `defaultTheme`, `theme-css.ts`, `theme-context.tsx` e o `toChatTheme` planejado deixam de existir; o chat
  usa o `DSProvider` do app **[chamada]**, consequência de D2 mais a regra de não manter compatibilidade. O design doc do
  agent-chat (§7.1, R-22) e o `ADOPTING.md` são corrigidos no mesmo PR.
- O E2E `tema-injetado` passa a comparar o tema do DS (Playwright no web, Maestro no RN), e passa a cobrir bolha, lista e
  espera, não só botão e cartão.
- Registro de widgets por `kind@version` continua (é contrato do protocolo); widgets de domínio do produto são feitos com
  componentes do DS.
- PRs de adoção abertos (Trippo #206, Somma #230) seguem na 0.3.0 e migram na onda de cada produto. **[chamada]**

**Apps:** `DSProvider` na raiz; telas usam componentes do DS; layout local com o Tailwind de cada app lendo o mesmo tema.
Componentes de domínio ficam no produto e são feitos só com primitivos e tokens do DS. O `ds-mcp` roda no app para impedir
cor, número de layout ou tipografia soltos e componentes interativos crus em tela.

**Sites:** sites em Next usam `ds-web` mais o tema. Sites em HTML puro usam `tokens.css` e as receitas da design-library.

## 13. Validação sem testes unitários

- **Catálogo web** (`ds/apps/catalog-web`): seletor de tema × modo × movimento reduzido; cada componente com estados
  principais. Gate de entrega: console limpo, 375 px sem rolagem horizontal, navegação por teclado, foco visível,
  `prefers-reduced-motion` emulado. Conferido no navegador embutido, com capturas.
- **Catálogo nativo** (`ds/apps/catalog-native`, Expo): os mesmos componentes no simulador iOS e no emulador Android, incluindo
  um Android de entrada para orbe e borda luminosa; VoiceOver e TalkBack em amostra.
- **Tela-modelo de identidade** (seção 10) com os três temas lado a lado.
- **Checagem de contraste** gerada no build do `ds-theme`: falha se algum par texto/fundo de qualquer tema e modo ficar
  abaixo de AA. É uma checagem de dados, não teste unitário.
- **`ds-mcp validate_diff`** nos consumidores, com baseline por produto, como o Zenith faz hoje.
- **Migração do SWFitness:** capturas antes e depois das telas principais no simulador (build pelo Makefile), comparadas
  lado a lado. Diferença perceptível só passa com OK do designer ou do João.
- **Uso real:** cada onda termina com o app rodando no simulador e um fluxo completo, incluindo um chat com espera longa e
  uma aprovação.

## 14. Acessibilidade e movimento

- Alvo mínimo de toque de 44 pt; `accessibilityRole` e `accessibilityLabel` obrigatórios em interativo só com ícone (o
  TypeScript exige).
- Movimento reduzido (`useReducedMotion` do Reanimated; `prefers-reduced-motion` no web) em **todo** componente animado:
  orbe vira pontos estáticos com troca de rótulo; borda luminosa vira borda estática; etapas entram sem deslocamento;
  texto aparece inteiro.
- Rótulo de espera e conclusão de etapa anunciados em região viva educada, sem anunciar cada palavra do stream.
- `ApprovalCard` recebe o foco ao aparecer; ação destrutiva em dois passos.
- Contraste AA para todos os temas e modos (checagem da seção 13).
- Canvas e Skia pausam fora da tela.

## 15. Migração

| Onda | Entrega | Apaga |
|---|---|---|
| 0 | Repositório em workspaces; `tokens/` como fonte; `tokens.css` e `defaults.json` gerados com o mesmo conteúdo; `ds-theme` com os três temas em claro e escuro; catálogos vazios; `ds-mcp` migrado do zenith-mcp; `AGENTS.md` e README com a regra nova; mockup da tela-modelo de identidade para o designer | — |
| 1 | Primitivos, composição e AI-first em `ds-native` e `ds-web`, no catálogo | — |
| 2 | **SWFitness**: `DSProvider` com o tema `swfitness`; os 167 arquivos importam do DS; componentes de domínio movidos para fora da pasta `zenith` e refeitos sobre o DS; o chat próprio (`screens/Conversation`) usa os componentes AI-first; web do SWFitness em `ds-web` | `components/zenith/` inteiro, `tokens.json`, `typedTokens.ts`, `tools/zenith-mcp`, `design/ds.config.json`, `design/generate-tokens.mjs`, `packages/i18n/tokens.css`, Storybook e Playroom locais |
| 3 | **agent-chat** sobre o DS (seção 12); versão 0.4.0 | renderers próprios, `ChatTheme` e afins |
| 4 | **Trippo**: identidade aprovada; mobile e web no DS; chat do PR #206 rebaseado para a 0.4.0 | `apps/mobile/components/ui`, `apps/web/components/ui`, `packages/shared/src/tokens.js`, valores repetidos em `global.css` e `globals.css` |
| 5 | **Somma**: identidade editorial; mobile e web no DS; chat via agent-chat 0.4.0 | `packages/ui`, kit web `apps/web/src/components/ui`, gerador de `packages/tokens` substituído pelo `ds-theme` |
| depois | swfitness-admin no tema SWFitness; avaliar os outros 13 consumidores e o padrão do ProjectsCLI apontando para `@gahmp1/ds-*` | — |

Cada onda é um PR (ou uma pilha) por repositório, aberto pelo fluxo do station/projects, com capturas antes e depois.

Detalhes da execução **[chamada]**:
- **Fatias verticais.** A onda 1 sai em três fatias (primitivos, composição, AI-first), e a onda 2 começa assim que a
  primeira fatia estiver no catálogo. O SWFitness migra por área (auth, home, criação de treino, execução, estatísticas,
  conversa, ajustes), uma área por PR.
- **API do Zenith preservada onde não conflita.** Componentes mudam de nome (`DSButton` → `Button`, `DSText` → `Text`)
  e mantêm props, variantes e valores. Mudam só as props que nascem do desacoplamento: telemetria vira `interactionId` mais
  a porta do provedor, e textos padrão vêm do provedor. A troca é por codemod (imports e nomes) mais edição manual onde
  telemetria e textos mudam.
- **Sem dependência nativa nova no SWFitness.** Ele já tem Skia 2.6.2, `react-native-svg` 15.15.4 e Reanimated 4.5.1, e
  o DS é só JavaScript. A onda 2 poderia sair por OTA, mas pela extensão da mudança sai em build de loja pelo Makefile
  (`make fl-ios-prod`, `make fl-android-prod`), conferido no TestFlight e no teste fechado antes.
- **"Web do SWFitness"** é `apps/web` do mesmo repositório: landing, privacidade, termos, exclusão de conta e
  reset-password, com 6 componentes shadcn.
- **Chat do SWFitness** continua próprio (adoção do agent-chat adiada em 2026-10-29), mas montado com os componentes
  AI-first do DS. Se e quando adotar o agent-chat, não há troca visual.
- **PRs de chat abertos.** Trippo #206 e Somma #230 podem entrar na 0.3.0 quando o dono destravar; na onda do produto
  sobem para a 0.4.0, apagando o tema próprio do chat.
- **Temas na onda 0.** `swfitness` escuro e `devaocubo` são definitivos. `swfitness` claro, `somma` e `trippo` entram
  marcados como provisórios no catálogo, também obrigados a passar na checagem de contraste.
- **Designer.** A revisão dele não bloqueia a construção. Bloqueia duas coisas: ligar o modo claro em produção em
  qualquer app, e a identidade final do Trippo antes da onda 4. Quem é e como acioná-lo fica com o João.

Decisões que ficam com o João durante a construção (portões, não bloqueiam as ondas 0 a 3):
- acento e fonte do mobile do Trippo, antes da onda 4;
- OK para ligar o modo claro em produção, por app, depois da revisão do designer.

## 15b. As skills de design no processo

**[dono]** "Quero que nesse plano a gente use nossas skills novas que criamos." As oito skills de `design-library/skills`
(instaladas em `~/.claude/skills`) são o jeito de trabalhar em todas as ondas, e evoluem junto com os pacotes.

**Em que onda cada skill entra:**

| Skill | Onde entra | Para quê |
|---|---|---|
| `design-library` | Antes de cada componente, tema ou tela, em todas as ondas | Consultar o que já existe (mockups do Lab, catálogo, licenças) antes de criar algo; nunca recriar um padrão que já está lá |
| `design-research` | Onda 0, nas identidades de Somma e Trippo; depois, sempre que faltar referência | Buscar e registrar no catálogo as referências da identidade de cada produto (eixos da seção 10), com licença; validar regras de plataforma (alvo de toque, movimento reduzido, zona segura) |
| `design-chat` | Onda 1 (fatia AI-first), onda 2 (conversa do SWFitness) e onda 3 (agent-chat) | Especificar e conferir `WaitingOrb`, `WaitingState`, `StepList`, `StreamingText`, `ApprovalCard` e a regra de espera de 2 s e 3 s, a partir do Lab |
| `design-screens` | Onda 0 (tela-modelo de identidade), onda 1 (composição e camada `motion`) e ondas 2, 4 e 5 (telas de cada app) | Estrutura de telas, tab bar, cabeçalho, esqueletos e microinterações; mockup por produto trocando só o tema antes de tocar no app |
| `design-onboarding` | Ondas 2, 4 e 5, nos fluxos de entrada de cada app | Onboarding com `Reveal`, `Celebration` e `NumberTicker` da camada `motion`, no tom de cada produto |
| `design-site` | Onda 2 (`apps/web` do SWFitness) e sites Next de cada produto | Landing e páginas com `ds-web` e o tema; sites em HTML puro continuam com `tokens.css` e receitas |
| `html-slide-deck` | Fim da onda 0 e antes das ondas 4 e 5 | Apresentar ao designer e ao João as propostas de identidade (tela-modelo com os três temas, claro e escuro) para decisão |
| `design-pdf` | Ao fechar cada onda | Relatório da onda com capturas antes e depois, para revisão do designer e registro |

**O que muda nas skills** (no mesmo PR em que o componente correspondente fica pronto, apagando a instrução antiga, sem
alias) **[chamada]**:
- **Regra comum nova no `design-library/README.md`:** se o produto consome `@gahmp1/ds-*`, a skill usa os componentes e o
  tema do DS. Ela não copia código dos mockups nem cria componente local. Se falta um componente, a saída da skill é
  uma proposta de componente para o DS, não uma cópia no app. Os mockups continuam como especificação visual e como
  exemplo para quem ainda não adotou.
- **`design-chat`:** o passo "copie de `orbs.js` e `chat.js`" vira "use `ds-native/ai` ou `ds-web/ai`". O mapeamento de
  estados do SDK passa a apontar para as props de `WaitingState`.
- **`design-screens` e `design-onboarding`:** as microinterações (pílula que desliza, esqueleto, número que conta,
  entrada escalonada) passam a apontar para a camada `motion` e para os eixos de movimento e padrões por componente do tema.
- **`design-site`:** dois caminhos, Next com `ds-web` e HTML puro com `tokens.css`.
- **`design-research` e `design-library`:** nova categoria no catálogo, "identidade por produto", com as referências
  que sustentam cada tema.
- **Todas:** a regra "a identidade vem do produto" passa a significar "o tema do produto no DS" para quem já adotou.
- Não criar skill nova para o DS em si. O passo a passo para adicionar componente ou mudar tema fica no `AGENTS.md` do
  devaocubo-ds, e o `ds-mcp` é a interface de consulta e validação.

**Como a skill é conferida:** cada onda termina com um uso real da skill sobre o pacote. Por exemplo, `design-chat` pedindo
a espera de um chat do Somma tem que produzir código que só importa do DS, e o `ds-mcp validate_diff` tem que ficar limpo.

## 16. O que fica para quem constrói

- Ferramenta de geração de tokens (Style Dictionary ou script próprio) e formato exato de `tokens/`, desde que gere o
  `tokens.css` e o `defaults.json` atuais com os mesmos nomes.
- Storybook ou outro catálogo web; Storybook on-device ou galeria própria no catálogo nativo.
- Implementação do orbe no RN (Skia mais Reanimated é o caminho indicado pela skill `design-chat`; o port de thinking-orbs
  ainda não está no npm).
- Divisão interna de arquivos, API exata de cada componente dentro dos limites da seção 10, ordem dos componentes na onda 1.
- Como o `ds-mcp` lê a configuração por produto.

## 17. Chamadas minhas (para conferir)

1. Recriar os componentes com o Zenith como especificação, migrar valores, hooks, lógica sem estilo, catálogo e MCP (seção 7).
2. Opção A, com pacotes `@gahmp1/ds-*` no GitHub Packages, semver em lockstep e changesets.
3. Pacote raiz `devaocubo-ds` intacto; `tokens.css` e `defaults.json` passam a ser gerados.
4. `ChatTheme` e `toChatTheme` deixam de existir; o agent-chat usa o tema do DS.
5. Temas dos três produtos dentro do DS.
6. O DS não distribui fontes nem ícones. (Skia agora é decisão do dono: peer normal, para qualquer animação.)
7. Web em `ds-web` com CSS próprio e Radix nos overlays; react-native-web só no catálogo.
8. SWFitness segue só escuro no app até o designer revisar o claro gerado.
9. Propostas iniciais de identidade para Somma e Trippo (seção 10), sujeitas a mockup.
10. Sites em HTML puro e swfitness-admin fora das ondas iniciais.
11. PRs de chat abertos (Trippo #206, Somma #230) não são bloqueados; migram na onda do produto.
12. Quarto tema `devaocubo` (neutro de hoje) gera os arquivos do pacote raiz; papéis novos só nos pacotes novos.
13. Fatias verticais; API do Zenith preservada onde não conflita, com novos nomes sem prefixo `DS`, por codemod.
14. Onda 2 do SWFitness em build de loja pelo Makefile, mesmo podendo sair por OTA.
15. O designer não bloqueia a construção; bloqueia só o claro em produção e a identidade do Trippo.
16. Publicação local pelo processo de release do agent-chat (sem CI), com cada release autorizada pelo dono.
18. Pilha de movimento em duas camadas (seção 9b):
    - Reanimated e CSS/`motion` como base.
    - Skia 2.x só para efeitos de GPU no RN; o web desenha com Canvas 2D e CSS, sem CanvasKit.
    - Geometria e linha do tempo compartilhadas em `ds-core`.
    - Ficam fora: Skia v3, WebGPU, Moti, GSAP e Lottie (Rive fora por decisão do dono, D10).
17. Mapa de skills por onda (seção 15b). As skills passam a usar o DS no mesmo PR do componente, sem skill nova para o
    DS. Deck para apresentar identidade e PDF para o relatório de cada onda.

## 18. Riscos

| Risco | Efeito | Mitigação |
|---|---|---|
| Licença da Gilroy **[a verificar]** | Sem licença para os arquivos no repo (só um MIT do mapa muscular); uso em outros apps ou no catálogo pode não ser permitido | O DS não distribui fonte; catálogo usa Outfit no lugar, como o Lab; confirmar a licença antes de qualquer outro app usar Gilroy |
| Origem do design **[inferência]** | Não há link nem arquivo de Figma no repositório; parte do Zenith pode ser decisão de código, não do designer | Pedir ao designer o Figma e uma revisão do catálogo antes da onda 2 |
| Token do GitHub Packages | Todo consumidor, EAS e Vercel precisam de `.npmrc` com `read:packages`; o PR #230 do Somma já está travado por isso | Resolver o token uma vez por produto na onda 0 dele |
| Tamanho da migração do SWFitness | 167 arquivos; app em produção com OTA | Por áreas, capturas antes e depois, OTA pelo Makefile |
| Skia em Trippo e Somma | Binário maior e build nativo novo (não é OTA) na entrada de cada um no DS | Medir o tamanho do app antes e depois na onda de cada produto; a primeira entrega do DS nesses apps sai por build de loja pelo fluxo de cada um |
| Skia v3 vira o pin de um Expo futuro | Pacote novo, minSdk 26, Vulkan e dev build obrigatórios | Avaliar na atualização de SDK do Expo; a geometria em `ds-core` não muda, só o desenho do RN |
| Ports RN de referência imaturos | Orbe e borda do libraries.dev só foram vistos no iOS | Recriar no DS e conferir no Android de entrada no catálogo nativo antes da onda 2 |
| Animação demais | Com movimento liberado em qualquer tela, o app pode ficar carregado e lento em Android de entrada | O eixo de movimento do tema define a intensidade; o catálogo nativo roda num Android de entrada; movimento reduzido sempre respeitado |
| NativeWind 3 no Somma | Preset do Tailwind 3 é um alvo a mais de geração | Gerar o preset até o Somma ir para o NativeWind 5 |
| Claro gerado ruim | Contraste ok, mas feio | Revisão do designer antes de ligar em produção |
| Lockstep pré-1.0 | Quebra em minor obriga PR em todos os consumidores da onda | Changesets e PRs de consumidor na mesma onda |
| Mudança de contrato no agent-chat | Consumidores na 0.3.0 precisam migrar | 0.4.0 anunciada no `ADOPTING.md` com o passo a passo |

## 19. O que não foi verificado

- Nada foi renderizado: Storybook do Zenith, apps e mockups não foram abertos nesta sessão.
- As 41 specs de tela do SWFitness (`docs/screens-spec`) e as specs do Somma em `docs/superpowers` não foram lidas.
- A licença da Gilroy e a autoria do Figma; licenças de IBM Plex e Geist não foram lidas na fonte **[a verificar]**.
- Os repositórios fora de swfitness, swfitness-admin, trippo, somma, agent-chat e devaocubo-ds foram auditados sem
  `git fetch` (o `origin/main` local pode estar velho). Números: 16 declaram a dependência, 5 importam `tokens.css`,
  11 usam o gerador sobre `defaults.json`, 5 commits fixados diferentes.
- Se o tamanho do Skia é aceitável para Trippo e Somma.
- Se os pacotes 0.3.0 do agent-chat estão de fato publicados no GitHub Packages.
- Contagens de hex e de acoplamento foram feitas por grep.
