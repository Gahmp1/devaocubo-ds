# devaocubo-ds Onda 1 (componentes): plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** entregar os pacotes `@gahmp1/ds-core`, `@gahmp1/ds-native`, `@gahmp1/ds-web` e `ds-mcp` com os
primitivos, a camada de movimento, a composição e os componentes AI-first da spec §11, todos nos dois catálogos, em
claro e escuro e nos quatro temas, prontos para a primeira publicação (0.1.0) e para a onda 2 (SWFitness).

**Architecture:** `ds-native` e `ds-web` dependem de `ds-core`, que depende de `ds-theme`. `ds-core` guarda o que é igual
nas duas plataformas: tema resolvido (`ResolvedTheme`), contexto React, contrato de ícone, textos e telemetria, e toda a
lógica pura (regra de espera, máquina de etapas, revelação de texto, geometria do orbe, da borda luminosa e dos gráficos).
Cada componente existe nas duas plataformas com a mesma API de props; o RN usa StyleSheet montado do tema em tempo de
execução e Reanimated (Skia só onde precisa de GPU); o web usa elementos DOM com classes `ds-*` e um `styles.css` em
`@layer ds` que lê só `var(--ds-*)`, com Radix nos overlays. O Zenith do SWFitness é a especificação de API, medidas e
acessibilidade; os sites de referência dão estrutura, estado e movimento.

**Tech Stack** (versões atuais em 2026-10-30, lidas no npm; o conjunto nativo é o que o Expo SDK 58 fixa em
`expo@58.0.21/bundledNativeModules.json`): npm workspaces em `ds/`, TypeScript ~6.0.3; Expo ~58.0.21, RN 0.88.1,
React 19.3.0, Reanimated 4.7.1, worklets 0.13.0, `@shopify/react-native-skia` 2.14.0, `react-native-svg` 15.16.0,
`react-native-safe-area-context` ~5.10.1, `react-native-gesture-handler` ~3.3.0, `expo-blur` ~58.0.5,
`@shopify/flash-list` 2.3.2; web com React DOM 19.3.0, `radix-ui` ^1.8.1, `motion` ^14.8.0, Storybook ^10.6.5, Vite ^8.3.5, `react-native-web` ~0.21.4; `@changesets/cli` ^3.0.3;
`@modelcontextprotocol/sdk` ^1.32.2 no `ds-mcp`.

**Spec:** `docs/superpowers/specs/2026-10-30-componentes-devaocubo-ds-design.md`. Leia as seções 6, 7, 9, 9b, 10, 11, 13,
14, 15 e 15b antes de começar.

**Insumos desta onda (leia antes da task do componente):**
- `docs/superpowers/plans/2026-10-30-ds-onda-1-zenith-inventario.md`: para cada componente, o arquivo do Zenith de
  origem (em `swfitness` `origin/main` 1ec0c836, lido com `git -C ~/Projects/swfitness show origin/main:<caminho>`, nunca
  por checkout), props, medidas, estados, acessibilidade e o que cortar.
- `design-library/references/componentes-de-referencia.md`: para cada componente, o site de referência, o que pegar e se
  o código pode ser aproveitado (só MIT/Apache/ISC, com atribuição no topo do arquivo).
- `design-library/examples/lab-swfitness` e `lab-apps`: especificação visual do Lab (orbe, etapas, chat, borda).

## Global Constraints

- **Sem testes unitários** (spec §6): nenhum `*.test.*`, `*.spec.*` ou `*_test.*`. A verificação de cada task é: (1)
  a entrada no catálogo escrita antes do componente, que faz o type-check falhar (o "vermelho"); (2) os portões abaixo;
  (3) as autochecagens de dados de `ds-core` (script `check`, mesmo modelo da checagem de contraste da onda 0); (4) a
  conferência visual na task de QA de cada fatia.
- **Portões de toda task** (rodar em `ds/`, ler a saída):
  `npm run build && npm run check` (build gera barris, compila os pacotes, roda as autochecagens e `tsc --noEmit` nos
  catálogos); `npm run build-storybook -w catalog-web -- -o "$TMPDIR/sb"`;
  `cd apps/catalog-native && env -u CI npx expo export --platform ios --output-dir "$TMPDIR/expo" < /dev/null`
  (precisa imprimir `iOS Bundled`). Na raiz do repo: `npm test` verde e `git diff --exit-code tokens.css defaults.json`.
- **Peers de `ds-native`** = o conjunto do Expo SDK 58 (os apps sobem para o SDK 58 nas ondas 2, 4 e 5): `react >=19.3`,
  `react-native >=0.88`, `react-native-reanimated >=4.7`, `react-native-worklets >=0.13`, `react-native-svg >=15.16`,
  `@shopify/react-native-skia >=2.14`, `react-native-safe-area-context >=5.10`, `react-native-gesture-handler >=3.3`,
  `expo-blur >=58`, `@shopify/flash-list >=2.3` (só JS na v2: o pacote 2.3.2 não traz código nativo). Nenhum outro
  módulo nativo.
- **`ds-web`**: React DOM, `radix-ui@^1.8.1` (o Trippo sobe junto na onda 4) só em Sheet, Dialog, Select e Menu; sem Tailwind;
  `motion` ^14.8.0 para molas e layout animado (pílula da `TabBar`, polegar do `Toggle`, `Reveal`, `Sheet`), lendo a mola
  de `useThemeMotion()` do web para casar com o Reanimated do RN; transições simples continuam em CSS. CSS só com `var(--ds-*)`: a
  autochecagem do `ds-web` reprova cor literal (`#`, `rgb(`, `hsl(`) em `src/**/*.css`.
- **Tema em tempo de execução, nunca em módulo**: estilo RN sai de `createStyles((t: ResolvedTheme) => ...)`; nada de
  `StyleSheet.create` com valor de tema no escopo do módulo. Constantes de geometria copiadas do Zenith (ex.: checkbox
  20/14/6) ficam como constante nomeada com comentário `// Zenith: <arquivo>`.
- **Cor em qualquer formato**: interpolação de cor usa `mixColor` de `ds-core` (aceita hex, `rgb(a)` e `hsl(a)` via
  `parseColor` do `ds-theme`); proibido `parseInt` de hex (o bug do Zenith, inventário §1).
- **Movimento reduzido em todo componente animado** (spec §14): RN lê `useThemeMotion().reduced`; web usa
  `:root[data-reduced-motion="true"]` (posto pelo `DSProvider`). Loops param e cancelam; nada fica no meio de um quadro.
- **Acessibilidade** (spec §14): alvo de toque mínimo 44 pt (use `hitSlop` quando a altura visual for menor);
  `accessibilityLabel` obrigatório pelo TypeScript em interativo só com ícone; roles e `accessibilityState` corretos;
  no web, foco visível com `--ds-color-focus`. Rótulos de espera e conclusão de etapa em região viva educada.
- **Textos** vêm de `DSStrings` (padrão pt-BR) ou por prop; o DS não importa i18n. **Telemetria**: prop
  `interactionId?: string` nos interativos e a porta `onInteraction` do provedor; o DS não importa analytics.
- **Ícones**: o DS não traz ícones. Componentes pedem ícones por `DSIconName` ao `Icon` do provedor (obrigatório).
  Os catálogos usam `lucide-react` / `lucide-react-native` (ISC) só como implementação de catálogo.
- **Código de referência**: só MIT, Apache-2.0 ou ISC lido na fonte, recriado (não colado) e com atribuição no topo do
  arquivo: `// Referência: <projeto> (<licença>), <url>`. Nunca React Bits, Rare UI, Canvas UI (Commons Clause) nem
  fontes sem licença lida (Beautiful UI, Bencho, 23rd, Create UI, Invisible Details).
- **Sem alias nem re-export de transição.** Barris gerados (`index.ts`, `motion.ts`, `ai.ts`, registro da galeria
  nativa) não são editados à mão nem commitados (`.gitignore`).
- **Identidade**: nenhum componente decide cor, raio, fonte, sombra ou ritmo por conta própria; tudo vem dos nove eixos.
  Variante nova é mudança no DS. `style`/`className` só para layout.
- Fontes não são distribuídas; catálogos seguem com Outfit no lugar de Gilroy (licença a verificar).
- Nada é publicado sem o OK do João (spec §9: cada release é autorizada pelo dono).
- Worktree `~/Projects/devaocubo-ds-worktrees/ds-onda-1`, branch `feat/ds-onda-1`, a partir de `origin/main` 0e90414.
  Commits terminam com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

**Desvios da spec (chamadas do plano):**
- **Ferramentas na versão atual** (pedido do João em 2026-10-30, "vamos atualizar os apps"): o DS mira o Expo SDK 58 e
  não o SDK 57 do SWFitness de hoje. Consequência para a onda 2: o SWFitness sobe para o SDK 58 antes de consumir o
  `ds-native`, o que pede build nativa nova pelo Makefile (`make fl-ios-prod` / `make fl-android-prod`), não OTA; o
  mesmo vale para Somma e Trippo nas ondas 5 e 4.
- **`react-native-gesture-handler` entra como peer** (a spec §15 dizia "sem dependência nativa nova"): como a subida de
  SDK já exige build nativa, o custo extra é zero, e o gesto do `Sheet` e o deslizar do `Toast` rodam na thread de UI
  com Reanimated, em vez do `PanResponder` do Zenith (thread de JS). Confirmado pelo João em 2026-10-30 ("se é melhor, o
  momento é agora").
- **`expo-blur` no lugar do desfoque em Skia**: o `BackdropBlur` do Skia só desfoca o que é desenhado no próprio
  canvas, não as views do RN que estão atrás; a `TabBar` `glass` e o `Blur` precisam desfocar o conteúdo rolando por
  baixo, que é o que o `BlurView` nativo faz. Web segue com `backdrop-filter`.
- **FlashList v2 na `MessageList`** em vez de `FlatList` invertida: reciclagem de células, ancoragem no fim
  (`maintainVisibleContentPosition`) sem inverter a lista; a v2 é só JS.
- **TypeScript fica em ~6.0.3**, não no 7.0.2: o pacote `typescript@7` exporta só a versão (a API do compilador ficou em
  `typescript/unstable/*`) e o template do Expo SDK 58 ainda usa ~6.0.3.
- **`motion` no web** (a spec deixava em aberto): uma mola única por tema nas duas plataformas, em vez de aproximar
  mola com `cubic-bezier`.
- `catalog-web` mostra só os componentes `ds-web`. Renderizar `ds-native` por react-native-web exigiria Skia no web
  (CanvasKit, 2,9 MB) e Reanimated web; os nativos são conferidos no catálogo nativo.
- `Select` nativo é uma lista de opções dentro do `Sheet` (cobre o `SheetRow` do Zenith); a roda (`OptionSelector`) não
  entra nesta onda (ver "Genéricos fora da spec").
- `caution` (#ECFD30) do Zenith não tem papel no tema: vira `warning`. A comparação antes/depois da onda 2 mostra se o
  designer precisa de um papel próprio.
- `Celebration` ganha confete leve em Skia/CSS (o Zenith só tinha o fundo estático), com uma execução por montagem.

**Genéricos do Zenith fora da spec §11** (inventário §2): absorvidos aqui ou adiados para o PR da área do SWFitness
que os usa na onda 2, sempre recriados no DS (nunca cópia local no app):

| Zenith | Destino |
|---|---|
| `SheetRow` | `ListItem` com `selected` (Task 16) e opções do `Select` nativo (Task 18) |
| `TipCallout` | novo `Callout` (Task 19) |
| `BlurPress` | item da `TabBar` (Task 17), com o `Glow` da camada motion |
| `BasicCard`, `TabScreenTitle`, `ContentPageScaffold`, `RightNavigationButton` | `Card`, `HeaderTitle`, `Screen` com slot de cabeçalho, `IconButton` variante `filled` |
| `HorizontalRevealProgress` | `ProgressBar` com `value` animado (Task 10) |
| `CoachMark`, `OptionSelector`, `ValueSelector`, `IndicatorSelector`, `MultipleSelector`, `NumericKeyboardSheet`, `StepsTemplate` | onda 2, no PR da área que usa (onboarding, criação de treino) |
| `ConsistencyDots`, `SerieGrid`/`SerieValue`/`SerieIndicator`, listas de texto, `LoadingScreen`, `WeightRuler`, `AdBanner` | ficam no app (domínio), refeitos sobre primitivos do DS na onda 2 |

## Review Focus

1. **Tema com cor `rgba()`/`hsl()` em componente que interpola cor** (Toggle, TextField, Button desabilitado, gráficos):
   o Zenith quebrava com `parseInt` de hex. Esperado: sem erro e com a cor certa nos quatro temas (swfitness claro e
   trippo usam `hsl`/`rgba`). Coberto pela autochecagem de `mixColor` (Task 2) e pela QA em todos os temas (Tasks 11, 22).
2. **Troca de esquema com o componente montado** (o sistema muda de escuro para claro, ou o catálogo troca o tema):
   esperado que todo estilo acompanhe sem recarregar. Coberto pelo `createStyles` memorizado por tema (Task 3) e pela
   troca ao vivo na QA (Task 11, passo de troca sem reload).
3. **Movimento reduzido ligado no meio de uma animação em loop** (orbe, borda luminosa, shimmer, spinner): esperado que
   o loop pare e o componente vá ao estado estático, sem ficar congelado num quadro. Coberto nas Tasks 10, 14 e 23 e
   conferido nas QAs.
4. **Fonte do sistema grande (200%) e textos longos em português**: esperado que botões, chips, abas e itens de lista
   não cortem nem sobreponham texto. Controles passam `maxFontSizeMultiplier={1.4}`; textos de lista quebram linha.
   Coberto nas Tasks 5, 6 e 16 e conferido na QA nativa com tamanho de fonte máximo.
5. **Botão voltar do Android e tecla Esc com overlay aberto** (Sheet, Dialog, Select, Menu, Toast com ação): esperado
   que feche o overlay de cima e devolva o foco a quem abriu. Coberto na Task 18 (`onRequestClose`, Radix) e na QA da
   fatia D.

## Execução por subagentes

- Fatias em ordem: **A base → B primitivos → C movimento → D composição → E AI-first → F fechamento**. A onda 2 pode
  começar quando a fatia B estiver no catálogo (spec §15).
- Dentro de uma fatia, as tasks marcadas **∥** não compartilham arquivos (barris são gerados) e podem rodar em paralelo,
  cada subagente no seu worktree (`isolation: "worktree"`), com merge pelo controlador. No máximo três em paralelo.
- Implementador: `sonnet`. Revisor por task: `sonnet`. Tasks de QA: sessão principal (precisam do navegador, do
  simulador e do emulador, que não podem ser disputados). Revisão final da branch: `opus`.
- Cada implementador lê, antes de codar: a task, as seções do inventário e da referência do seu componente, e o arquivo
  do Zenith (`git -C ~/Projects/swfitness show origin/main:apps/mobile/src/components/zenith/<caminho>`) ou do
  agent-chat (`git -C ~/Projects/agent-chat show origin/main:packages/agent-chat-react-native/src/<arquivo>`).
- Para cada componente com origem no Zenith, o implementador escreve `docs/migracao-zenith/<Componente>.md`: tabela
  prop/variante Zenith → DS e o que muda, insumo do codemod da onda 2.

---

## Fatia A: base

### Task 0: Ferramentas na versão atual

**Files:**
- Modify: `ds/package.json`, `ds/apps/catalog-native/package.json` (+ `app.json` se o `expo install --fix` pedir),
  `ds/apps/catalog-web/package.json`, `ds/packages/theme/package.json`, `ds/package-lock.json`

**Interfaces:**
- Produces: workspace no Expo SDK 58 (`expo ~58.0.21`, `react 19.3.0`, `react-native 0.88.1`), Storybook `^10.6.5`
  (`storybook`, `@storybook/react-native-web-vite`), `vite ^8.3.5`, `react-native-web ~0.21.4`, `react-dom 19.3.0`,
  `@changesets/cli ^3.0.3`; TypeScript segue `~6.0.3` (ver Desvios).

- [ ] **Step 1:** em `ds/apps/catalog-native`: `npx expo install expo@^58.0.21 --fix`. Em `ds/`: subir Storybook, Vite, `react-dom`, `react-native-web` e changesets para as
  versões acima com `npm i -D -w <ws> <pkg>@<versão>`; `npm ls react react-native --all` sem duplicata de React.
- [ ] **Step 2:** `npx expo-doctor` no catálogo nativo. Expected: sem falha de versão (avisos de rede valem como
  "não verificado").
- [ ] **Step 3:** portões. Expected: verdes; `iOS Bundled`; `tokens.css`/`defaults.json` sem diferença.
- [ ] **Step 4:** se o changesets 3 mudar o formato de `.changeset/config.json`, ajustar no mesmo commit (a mudança de
  pasta fica na Task 2). Commit `chore(ds): Expo SDK 58, Storybook 10.6, Vite 8 e changesets 3`.

### Task 1: Eixo de iconografia e alturas de controle do SWFitness

**Files:**
- Modify: `ds/packages/theme/src/types.ts`, `ds/packages/theme/src/themes/{devaocubo,swfitness,somma,trippo}.ts`,
  `ds/packages/theme/src/generate/css.ts`

**Interfaces:**
- Produces: `DSTheme.icon: { strokeWidth: number; size: { sm: number; md: number; lg: number } }`; CSS
  `--ds-icon-stroke`, `--ds-icon-sm`, `--ds-icon-md`, `--ds-icon-lg`.

- [ ] **Step 1:** acrescentar `icon` a `DSTheme` e rodar `npm run build -w @gahmp1/ds-theme` em `ds/`.
  Expected: FAIL de tipo nos quatro temas ("Property 'icon' is missing").
- [ ] **Step 2:** valores. swfitness `{ strokeWidth: 2, size: { sm: 16, md: 24, lg: 32 } }` (Zenith: `icons.ts` stroke
  2, `DynamicImage` 16/24/32); devaocubo e trippo `{ 1.5, 16/20/24 }`; somma `{ 1.5, 16/20/24 }` (estes três
  inferência, comentar `// sem fonte: inferência`). Mudar `swfitness.density.control` para `{ sm: 40, md: 44, lg: 56 }`
  (alturas reais do `DSButton`: small 40, normal 44, large 56; inventário §3 Button). Emitir as quatro variáveis de
  ícone em `toCssVars`.
- [ ] **Step 3:** portões. Expected: `4 temas, 0 falhas`; `tokens.css`/`defaults.json` sem diferença.
- [ ] **Step 4:** commit `feat(ds-theme): eixo de iconografia e alturas de controle do swfitness`.

### Task 2: `@gahmp1/ds-core`

**Files:**
- Create: `ds/packages/core/{package.json,tsconfig.json}`, `ds/packages/core/src/{theme,context,strings,icons,interaction,color}.ts`,
  `ds/packages/core/src/check/run.ts`, `ds/packages/core/src/check/color.check.ts`
- Create: `ds/scripts/barrels.mjs`; Modify: `ds/package.json` (script `prebuild`), `.gitignore`
- Move: `.changeset/` → `ds/.changeset/` (a raiz dos workspaces é `ds/`)

**Interfaces:**
- Consumes: `DSTheme`, `Scheme`, `ColorRoles`, `parseColor` de `@gahmp1/ds-theme`.
- Produces (todos exportados de `@gahmp1/ds-core`):
  - `type ResolvedTheme = Omit<DSTheme, 'color' | 'depth' | 'provisional'> & { scheme: Scheme; color: ColorRoles; depth: DSTheme['depth'][Scheme]; provisional: boolean; motion: DSTheme['motion'] & { reduced: boolean } }`
  - `resolveTheme(theme: DSTheme, scheme: Scheme, reducedMotion: boolean): ResolvedTheme`
  - `type DSIconName = 'close' | 'check' | 'chevron-left' | 'chevron-right' | 'chevron-down' | 'plus' | 'minus' | 'search' | 'eye' | 'eye-off' | 'send' | 'stop' | 'mic' | 'attach' | 'file' | 'link' | 'more' | 'info' | 'success' | 'warning' | 'error' | 'arrow-down'`
  - `type IconProps = { name: DSIconName; size: number; color: string; strokeWidth: number }`; `type IconComponent = ComponentType<IconProps>`
  - `type InteractionEvent = { component: string; kind: 'press' | 'toggle' | 'change' | 'submit' | 'open' | 'close'; id?: string; label?: string; value?: string | number | boolean }`
  - `type DSStrings` e `defaultStrings` (pt-BR), com exatamente estas chaves: `loading` "Carregando", `clear`
    "Limpar", `showPassword` "Mostrar senha", `hidePassword` "Ocultar senha", `close` "Fechar", `increment`
    "Aumentar", `decrement` "Diminuir", `send` "Enviar", `stop` "Parar", `record` "Gravar áudio", `attach` "Anexar",
    `approve` "Aprovar", `reject` "Recusar", `confirm` "Confirmar", `cancel` "Cancelar", `confirmDestructive`
    "Toque de novo para confirmar", `retry` "Tentar de novo", `scrollToBottom` "Ir para o fim", `reconnecting`
    "Reconectando…", `showMore` "Ver mais", `showLess` "Ver menos", `sources` "Fontes", `files` "Arquivos",
    `waiting: { working: 'Pensando', searching: 'Buscando', solving: 'Resolvendo', listening: 'Ouvindo', waiting: 'Aguardando', retrying: 'Tentando de novo' }`,
    `step: { pending: 'Pendente', active: 'Em andamento', done: 'Concluída', error: 'Falhou' }`,
    `tool: { running: 'Executando', ok: 'Concluída', error: 'Falhou', rejected: 'Recusada', deferred: 'Adiada', cancelled: 'Cancelada' }`.
    Nenhuma task posterior acrescenta chave; texto específico vem por prop.
  - `type DSContextValue = { theme: ResolvedTheme; strings: DSStrings; Icon: IconComponent; emit: (e: InteractionEvent) => void }`;
    `DSContext`; `useDS(): DSContextValue` (lança `Error('useDS fora de DSProvider')` sem provedor).
  - `type DSProviderBaseProps = { theme: DSTheme; scheme?: 'system' | Scheme; reducedMotion?: 'system' | boolean; strings?: Partial<DSStrings>; Icon: IconComponent; onInteraction?: (e: InteractionEvent) => void; children: ReactNode }`
  - `mixColor(a: string, b: string, t: number): string` (saída `rgba(r, g, b, a)`), `withAlpha(color: string, alpha: number): string`.
- `ds/scripts/barrels.mjs`: para cada pacote em `ds/packages/{core,native,web}`, gera `src/index.ts` exportando
  `src/logic/*.ts` (core), `src/core/*` mais `src/{primitives,composition}/*/index.tsx` (native e web),
  `src/motion.ts` de `src/motion/*/index.tsx` e `src/ai.ts` de `src/ai/*/index.tsx`; e
  `ds/apps/catalog-native/src/gallery/registry.ts` de `src/gallery/*.tsx`. Arquivos gerados no `.gitignore`.

- [ ] **Step 1:** escrever `src/check/color.check.ts` com asserções (`node:assert`): `mixColor('#000000', '#ffffff', 0.5)`
  dá `rgba(128, 128, 128, 1)` (arredondado); `mixColor('hsl(80 96% 31%)', 'rgba(14, 14, 17, 0.84)', 0)` devolve a
  primeira em `rgba(...)`; `withAlpha('#B6FB2D', 0.3)` dá `rgba(182, 251, 45, 0.3)`; `resolveTheme(swfitness, 'dark', true).motion.reduced === true`
  e `.color.accent === '#B6FB2D'`. `src/check/run.ts` importa todo `dist/check/*.check.js` e imprime
  `ds-core: N checagens ok`. Script `check` do pacote: `node dist/check/run.js`.
- [ ] **Step 2:** `npm run build && npm run check` em `ds/`. Expected: FAIL (módulos inexistentes).
- [ ] **Step 3:** implementar os arquivos acima e o `barrels.mjs` (o `prebuild` de `ds/package.json` roda
  `node scripts/barrels.mjs`). `package.json` de `@gahmp1/ds-core`: `"type": "module"`, `exports` `.` → `dist/index.js`,
  peer `react >=19`, dependência `@gahmp1/ds-theme`, `publishConfig` igual ao do `ds-theme`.
- [ ] **Step 4:** portões. Expected: `ds-core: 5 checagens ok`; resto verde.
- [ ] **Step 5:** commit `feat(ds-core): tema resolvido, contexto, textos, ícones e cor`.

### Task 3 ∥: `@gahmp1/ds-native` e galeria do catálogo nativo

**Files:**
- Create: `ds/packages/native/{package.json,tsconfig.json}`, `ds/packages/native/src/core/{DSProvider,createStyles,useThemeMotion,usePressFeedback,Press}.tsx`
- Modify: `ds/apps/catalog-native/{package.json,App.tsx}`; Create: `ds/apps/catalog-native/src/{CatalogIcon,Gallery}.tsx`,
  `ds/apps/catalog-native/src/gallery/Tokens.tsx` (move a `TokensScreen` atual para a galeria); script `check`
  (`tsc --noEmit`) no `catalog-native`

**Interfaces:**
- Consumes: tudo de `ds-core` (Task 2).
- Produces (`@gahmp1/ds-native`, `exports`: `.`, `./motion`, `./ai`):
  - `DSProvider(props: DSProviderBaseProps)`: esquema por `useColorScheme()` quando `scheme='system'`; movimento por
    `useReducedMotion()` do Reanimated quando `reducedMotion='system'`; `emit` chama `onInteraction` se houver;
    envolve os filhos em `GestureHandlerRootView` (o app não precisa pôr outro).
  - `useTheme(): ResolvedTheme`; `createStyles<T>(factory: (t: ResolvedTheme) => T): () => T` (memoriza por
    `theme` resolvido; o hook devolvido roda `StyleSheet.create(factory(t))`).
  - `useThemeMotion(): { duration; easing: { standard; enter; exit } /* EasingFunction do Reanimated via Easing.bezier */; spring: WithSpringConfig; press; reduced: boolean }`
  - `usePressFeedback(opts: { disabled?: boolean }): { animatedStyle; onPressIn; onPressOut }`: migrado de
    `hooks/usePressAnimation.ts` (opacidade ou escala do `theme.motion.press`, duração `duration.fast`; `disabled`
    bloqueia só o press-in; com movimento reduzido, muda sem animar).
  - `Press(props: PressableProps & { interactionId?: string; component: string; feedback?: boolean })`: `Pressable`
    animado com `usePressFeedback`, `hitSlop` que completa 44 pt e `emit({ component, kind: 'press', id, label })`.
- Catálogo: `App.tsx` com o seletor de tema × esquema × movimento reduzido no topo e a lista da galeria; cada tela de
  galeria é `export default { id: string, title: string, group: 'fundação' | 'primitivos' | 'movimento' | 'composição' | 'ai', Screen: ComponentType }`;
  deep link `?theme=&scheme=&reduced=&screen=<id>` (estende o da onda 0).
- Dependências do catálogo por `npx expo install @shopify/react-native-skia react-native-svg react-native-gesture-handler react-native-safe-area-context expo-blur @shopify/flash-list`
  (o SDK 58 fixa 2.14.0, 15.16.0, ~3.3.0, ~5.10.1, ~58.0.5 e 2.3.2) e `npm i lucide-react-native -w catalog-native`.

- [ ] **Step 1:** escrever `Gallery.tsx` e `gallery/Tokens.tsx` importando `DSProvider`, `useTheme` de `@gahmp1/ds-native`.
  Rodar os portões. Expected: FAIL ("Cannot find module '@gahmp1/ds-native'").
- [ ] **Step 2:** implementar o pacote e o catálogo. `CatalogIcon` mapeia cada `DSIconName` para um ícone do lucide.
- [ ] **Step 3:** portões. Expected: verdes; `iOS Bundled`.
- [ ] **Step 4:** commit `feat(ds-native): provedor, estilos por tema, pressão e galeria do catálogo`.

### Task 4 ∥: `@gahmp1/ds-web` e catálogo web

**Files:**
- Create: `ds/packages/web/{package.json,tsconfig.json}`, `ds/packages/web/src/core/{DSProvider,useTheme,cx}.tsx`,
  `ds/packages/web/src/core/base.css`, `ds/packages/web/scripts/{css,check}.mjs`
- Modify: `ds/apps/catalog-web/.storybook/preview.tsx` (decorator com `DSProvider` do `ds-web`, global `reducedMotion`),
  `ds/apps/catalog-web/package.json` (script `check` com `tsc --noEmit`, dependência `lucide-react`);
  Create: `ds/apps/catalog-web/src/CatalogIcon.tsx`

**Interfaces:**
- Consumes: `ds-core` (Task 2); CSS de tema `@gahmp1/ds-theme/css/<tema>.css`.
- Produces (`@gahmp1/ds-web`, `exports`: `.`, `./motion`, `./ai`, `./styles.css`):
  - `DSProvider(props: DSProviderBaseProps)`: resolve esquema e movimento por `matchMedia`; escreve no
    `document.documentElement` `data-theme` (só quando o esquema é explícito) e `data-reduced-motion="true|false"`;
    não injeta CSS de tema (o app importa o CSS do tema uma vez).
  - `useTheme(): ResolvedTheme`; `cx(...names: (string | false | undefined)[]): string`.
  - `useThemeMotion(): { duration; easing: { standard; enter; exit } /* strings cubic-bezier */; spring: { stiffness: number; damping: number; mass: number } /* formato do `motion` */; reduced: boolean }`
    (mesmos números do `useThemeMotion` nativo; o `motion` entra como dependência do `ds-web`).
  - Convenção: componente `Nome` renderiza a classe raiz `ds-nome` (kebab) e modificadores `ds-nome--variante`;
    CSS em `src/<grupo>/<Nome>/<nome>.css`.
  - `scripts/css.mjs` concatena `src/core/base.css` e `src/**/*.css` (ordem alfabética por caminho) dentro de
    `@layer ds { … }` em `dist/styles.css`. `scripts/check.mjs` reprova `#`, `rgb(`, `hsl(` em `src/**/*.css` e imprime
    `ds-web: css sem cor literal`.
- `base.css`: `:root[data-reduced-motion="true"] .ds-anim { animation: none !important; transition: none !important }`
  e o anel de foco `:focus-visible { outline: 2px solid var(--ds-color-focus); outline-offset: 2px }` dentro de `.ds-*`.

- [ ] **Step 1:** decorator do Storybook usando `DSProvider` de `@gahmp1/ds-web` e um story `Fundação/Provedor` que
  mostra `useTheme().scheme`. Portões. Expected: FAIL ("Cannot find module '@gahmp1/ds-web'").
- [ ] **Step 2:** implementar pacote, scripts e decorator (o seletor de tema troca o CSS como na onda 0; o de esquema
  vai para a prop `scheme`; o novo global `reducedMotion` vai para a prop `reducedMotion`).
- [ ] **Step 3:** portões. Expected: verdes; `ds-web: css sem cor literal`.
- [ ] **Step 4:** commit `feat(ds-web): provedor, CSS em camada e catálogo web`.

---

## Fatia B: primitivos

Ordem: Tasks 5 e 10 primeiro (em paralelo; os outros primitivos usam `Text` e `Spinner`), depois 6, 7, 8 e 9 em
paralelo (até três por vez).

Cada task desta fatia segue os mesmos passos; o que muda está na tabela da task.
- **Passo 1 (vermelho):** escrever as entradas de catálogo de cada componente da task: story
  `ds/apps/catalog-web/src/primitivos/<Nome>.stories.tsx` (um story por estado listado) e tela
  `ds/apps/catalog-native/src/gallery/<Nome>.tsx` (todos os estados numa rolagem). Rodar os portões.
  Expected: FAIL ("has no exported member '<Nome>'").
- **Passo 2:** implementar em `ds/packages/native/src/primitives/<Nome>/index.tsx` e
  `ds/packages/web/src/primitives/<Nome>/{index.tsx,<nome>.css}`, com a API da tabela, idêntica nas duas plataformas
  salvo indicação.
- **Passo 3:** `docs/migracao-zenith/<Nome>.md` quando houver origem no Zenith.
- **Passo 4:** portões verdes. **Passo 5:** commit `feat(ds): <nomes>`.

### Task 5: Text, Stack, Box, Divider

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Text` | `variant?: TypeStep \| \`${TypeStep}Medium\`` (padrão `base`; nomes do `DSText`); `color?: 'text' \| 'textMuted' \| 'textSubtle' \| 'textDisabled' \| 'accent' \| 'onAccent' \| 'danger' \| 'warning' \| 'success' \| 'info'` (padrão `text`); `label?: boolean` (aplica `labelCase` e `tracking.wide`); `mono?: boolean`; `tabular?: boolean` (padrão: `type.numeric` do tema); `numberOfLines?`; `maxFontSizeMultiplier?`; `children` | as 12 variantes; as 10 cores; `label`; `mono`; texto longo com quebra | Zenith `DSText` sem o modo markdown (inventário §3) |
| `Stack` | `direction?: 'row' \| 'column'`; `gap?: SpaceStep`; `align?`; `justify?`; `wrap?: boolean`; `children` | linha, coluna, quebra | Zenith `Stack` |
| `Box` | `padding?`, `paddingX?`, `paddingY?: SpaceStep`; `surface?: 'bg' \| 'surface1' \| 'surface2' \| 'surface3'`; `radius?: keyof radius`; `children` | 4 superfícies × 2 raios | Zenith `Box` |
| `Divider` | `orientation?: 'horizontal' \| 'vertical'`; `inset?: SpaceStep`; `tone?: 'border' \| 'borderMuted'` | horizontal, vertical, recuo | Zenith `Divider` (ganha vertical) |

`SpaceStep = keyof DSTheme['density']['space']`. Mapeamento de cor do `DSText` → DS vai para o `.md` de migração
(`foreground→text`, `mutedForeground→textMuted`, `subtleForeground→textSubtle`, `faintForeground→textDisabled`,
`foregroundInverse→onAccent`, `primary→accent`, `destructive→danger`, `caution→warning`, `emptyState→textMuted`).
Família: `display` usa `type.family.display`, o resto `body`; peso `*Medium` = `weight.medium`. Android usa o nome da
fonte por peso (`family.native[peso]`) e `includeFontPadding: false`.

### Task 6 ∥: Button, IconButton

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Button` | `title: string`; `onPress`; `variant?: 'primary' \| 'outline' \| 'ghost' \| 'inverse' \| 'inverseOutline' \| 'surface' \| 'surfaceOutline' \| 'danger'` (padrão `primary`); `shape?: 'pill' \| 'rounded' \| 'square' \| 'circle'` (padrão `components.button.shape`); `size?: 'small' \| 'normal' \| 'large'` (alturas `control.sm/md/lg`); `fullWidth?`; `icon?: DSIconName`; `disabled?`; `loading?`; `interactionId?`; `accessibilityLabel?` | 8 variantes × habilitado/desabilitado/carregando; 4 formas; 3 tamanhos; largura total; com ícone; título longo | Zenith `DSButton`; mola de pressão da beUI Native só onde `press.kind = 'scale'` |
| `IconButton` | `icon: DSIconName`; `accessibilityLabel: string` (obrigatório); `onPress`; `size?: 'small' \| 'medium' \| 'large'` (ícone `icon.sm/md/lg`); `variant?: 'plain' \| 'filled' \| 'outline'` (padrão `plain`; `filled` cobre o `RightNavigationButton`); `color?: Text['color']`; `disabled?`; `interactionId?` | 3 tamanhos × 3 variantes × desabilitado | Zenith `IconButton` (label obrigatório corrige a falha de a11y) |

Mapa de variantes do `DSButton` (vai para o `.md`): `primary`/`brandA` → `primary`; `secondary` → `outline`; `tertiary`
→ `ghost`; `contentA` → `inverse`; `contentAOutline` → `inverseOutline`; `backgroundD` → `surface`; `cardAppearance`
→ `surfaceOutline`; `critical` → `danger`; `primaryDisabled`/`contentADisabled` → `disabled` (primário desabilitado =
fundo `withAlpha(accent, 0.3)` com texto `onAccent`; inverso desabilitado = fundo e texto `textDisabled`); `maxWidth` →
`size="normal" fullWidth`. Carregando: `Spinner` pequeno (Task 10) no lugar do conteúdo, `accessibilityState.busy`.
`accessibilityState.disabled` sempre. Telemetria: `emit({ component: 'Button', kind: 'press', id: interactionId, label: title })`.

### Task 7 ∥: TextField, TextArea

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `TextField` | `value`; `onChangeText`; `label?`; `placeholder?`; `helper?`; `error?: string`; `disabled?`; `variant?: 'underline' \| 'filled'` (padrão `underline`); `secure?: boolean` (alterna mostrar/ocultar com `strings.showPassword/hidePassword`); `clearable?` (`strings.clear`); `trailingIcon?: DSIconName`; props de teclado do RN (`keyboardType`, `autoCapitalize`, `returnKeyType`, `textContentType`, `autoComplete`, `onSubmitEditing`, `autoFocus`); `ref` encaminhado nas duas variantes | vazio, com rótulo flutuando, foco, preenchido, erro, desabilitado, senha, limpável | Zenith `TextField` + `useTextFieldAnimation` (cor com `mixColor`); erro com tremor curto da beUI Native, sem tremor com movimento reduzido |
| `TextArea` | as do `TextField` menos `secure`/`trailingIcon`, mais `minRows?` (padrão 3), `maxRows?` (padrão 8) com altura que cresce | vazio, crescendo até `maxRows`, erro | não existe no Zenith; mesma linguagem do `TextField` |

Mapa do `TextField` (`.md`): `contentA`/`contentC`/`brandA` → `underline` (diferença de cor do sublinhado vira
`error`/foco); `selectorCustom` → `filled`; `errorMessage` → `error`; `onClear` → `clearable` + `onChangeText('')`.
No web, `<label>` associado e `aria-invalid`/`aria-describedby`.

### Task 8 ∥: Toggle, Checkbox, Radio

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Toggle` | `value: boolean`; `onValueChange`; `size?: 'normal' \| 'small'` (50×30/26 e 40×20/16, Zenith); `disabled?`; `accessibilityLabel: string`; `interactionId?` | ligado, desligado, desabilitado, 2 tamanhos | Zenith `Toggle` (cor com `mixColor`), polegar que estica da beUI Native |
| `Checkbox` | `checked: boolean \| 'mixed'`; `onChange(next: boolean)`; `label?`; `disabled?`; `accessibilityLabel?` (obrigatório sem `label`) | vazio, marcado, misto, desabilitado | Zenith `CheckBox` + `useKeyframeBounce`; marca desenhada (beUI Native) |
| `Radio` / `RadioGroup` | `RadioGroup({ value, onChange, options: { value: string; label: string; disabled?: boolean }[] })`; `Radio` só interno | 3 opções, uma desabilitada | Zenith `RadioButton`; ponto que desliza (beUI Native) |

Roles: `switch`, `checkbox` (com `mixed`), `radiogroup`/`radio`. `emit({ kind: 'toggle', value })`.

### Task 9 ∥: Tag, Chip, FilterChip, Badge

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Tag` | `label`; `tone?: 'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'`; `icon?: DSIconName` | 6 tons | Zenith `Tag` (rgba literal vira `withAlpha(<tom>, 0.15)`) |
| `Chip` | `label`; `onPress?`; `onRemove?` (mostra `close` com `strings.close`); `selected?`; `icon?`; `disabled?`; `interactionId?` | simples, selecionado, removível, desabilitado | Zenith `FilterChip`; removível da beUI Native |
| `FilterChip` | `Chip` com `selected` obrigatório e `onPress` alternando; `accessibilityState.selected` | grupo de 5 com 2 selecionados | Zenith `FilterChip` (ganha `selected` na a11y) |
| `Badge` | `count?: number` (`99+` acima de 99) ou `dot?: boolean`; `tone?` (como `Tag`); `children` (âncora) | número, ponto, sobre ícone | beUI Native Animated Badge (troca com rolagem curta; estática com movimento reduzido) |

### Task 10: Spinner, Skeleton, Shimmer, ProgressBar

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Spinner` | `size?: 'small' \| 'medium' \| 'large'` (20/32/48); `tone?: 'accent' \| 'onAccent' \| 'text'`; `accessibilityLabel?` (padrão `strings.loading`) | 3 tamanhos × 3 tons; movimento reduzido | Zenith `Spinner` (shader SkSL de `fluidSpinnerShader.ts`, paleta hex trocada por cores do tema: `accent`, `surface2`, `bg`); web em Canvas 2D ou CSS cônico. Reduzido: pulso de opacidade lento, sem rotação |
| `Shimmer` (motion) | `active?: boolean`; `children` (máscara) | sobre bloco, sobre texto | varredura da beUI Native (text-shimmer) em Reanimated; web `@keyframes` com gradiente de `var(--ds-color-surface2)` |
| `Skeleton` | `width?`; `height`; `radius?`; `lines?: number` (texto) | bloco, 3 linhas, avatar | Zenith `Shimmer` (presets de domínio ficam no app); usa `Shimmer` |
| `ProgressBar` | `value?: number` (0–1; ausente = indeterminada); `tone?: 'accent' \| 'success' \| 'danger'`; `accessibilityLabel?` | indeterminada, 0, 0,4, 1, mudança animada | Zenith `IndeterminateBar` + `HorizontalRevealProgress` (valor animado) |

`Shimmer` vai em `src/motion/Shimmer` (exportado por `./motion`); os outros em `src/primitives`. Todos param o loop e
cancelam a animação ao desmontar e quando `reduced` vira verdadeiro (Review Focus 3).

### Task 11: QA da fatia B (sessão principal)

- [ ] Web: Storybook em background (`npm run storybook -w catalog-web`), navegador embutido a 375 px e 1280 px. Para
  cada componente da fatia: swfitness escuro e claro, somma escuro, trippo claro; navegação por teclado com foco
  visível; `prefers-reduced-motion` emulado; console limpo. Trocar o esquema pelo seletor **sem recarregar** e conferir
  que tudo acompanha (Review Focus 2).
- [ ] Nativo (skill `mobile-simulator-coordination`): simulador iOS e emulador Android temporários, Metro com porta
  dinâmica; galeria por deep link em swfitness escuro e claro e trippo claro; "Reduzir movimento" ligado com spinner e
  shimmer rodando (param sem congelar, Review Focus 3); tamanho de fonte máximo nos dois (Review Focus 4).
- [ ] Capturas em `ds/apps/catalog-web/evidence/onda-1/b-*.png` e `ds/apps/catalog-native/evidence/onda-1/b-*.png`.
  Defeito encontrado volta como correção na task de origem, antes de abrir a fatia seguinte.
- [ ] Commit `docs(ds): evidência da fatia B`.

---

## Fatia C: movimento

Mesmos passos da fatia B, com entradas em `src/movimento/` no catálogo web e grupo `movimento` na galeria; código em
`ds/packages/{native,web}/src/motion/<Nome>/`. Lógica pura em `ds/packages/core/src/logic/<nome>.ts` com autochecagem
em `ds/packages/core/src/check/<nome>.check.ts` escrita antes (o vermelho da lógica).

### Task 12 ∥: Reveal, NumberTicker, ScrollFade

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Reveal` | `from?: 'bottom' \| 'top' \| 'left' \| 'right' \| 'fade'` (padrão `bottom`); `delay?: number`; `stagger?: number` (filhos em cascata); `show?: boolean` (saída quando falso); `children` | entrada, cascata de 5, saída | beUI Native rise-in; mola ou `easing.enter` do tema conforme `personality`; reduzido: só opacidade, sem deslocamento |
| `NumberTicker` | `value: number`; `format?: (n: number) => string`; `trend?: 'up' \| 'down' \| 'auto'` | contando, subindo, descendo, formato de moeda | beUI Native number-ticker (RN) e NumberFlow (web, MIT); dígitos tabulares; reduzido: troca direta |
| `ScrollFade` | `edges?: ('top' \| 'bottom')[]`; `size?: number`; `children` (rolagem) | topo e fim esmaecendo | Zenith `ScrollFadeOverlay` (sem o `ScrollVisibilityContext` do app); gradiente de `bg` para transparente (SVG `LinearGradient` no RN, `mask-image` no web) |

Lógica: `ds-core/logic/ticker.ts` com `digitsOf(value, format)` (autochecagem: `digitsOf(1234.5, n => n.toFixed(1))`
→ `['1','2','3','4','.','5']`).

### Task 13 ∥: Glow, GlowScene, Blur, Celebration

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Glow` | `strength?: number` (0–1); `color?: 'aiGlow' \| 'accent'`; `size?: number`; `pulse?: boolean` | parado, pulsando, 3 forças | libraries.dev voice-glow (MIT): três camadas (traço, luz interna, bloom); RN em Skia (`RadialGradient` + `Blur`), web em `radial-gradient` + `filter: blur` |
| `GlowScene` | `preset?: 'focus' \| 'ambient' \| 'success'`; `children` | 3 presets × 4 temas | Zenith `GlowScene` sem PNG e sem hex: presets em cima de `aiGlow`, `accent`, `bg` |
| `Blur` | `intensity?: number`; `tint?: 'surface' \| 'bg'`; `children` | sobre lista rolando | Zenith `Blur` sem PNG: `BlurView` do `expo-blur` no RN (tinta do tema por cima, `withAlpha`), `backdrop-filter` no web |
| `Celebration` | `active: boolean`; `onDone?` | uma execução | Zenith `SuccessBackground` (`GlowScene success`) + confete leve (Skia/Canvas), uma vez por ativação; reduzido: só o fundo |

`depth.model` decide quanto brilho aparece (`flat` desliga o bloom, `glow` liga as três camadas). Skia e canvas
pausam fora da tela (spec §14).

### Task 14 ∥: GlowBorder

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `GlowBorder` | `active: boolean`; `radius?: keyof radius` (padrão: herda do filho por prop); `periodMs?` (padrão `ai.beamPeriodMs`); `children` | ativo, inativo, entrando/saindo, sobre `TextField` | libraries.dev border-beam (MIT): brilho viajante por ângulo mais bloom; RN em Skia (`SweepGradient` num `RoundedRect` com traço), web em CSS `@property --ds-beam-angle` com `conic-gradient` |

Lógica: `ds-core/logic/beam.ts` com `beamAngle(tMs, periodMs)` (graus 0–360; autochecagem `beamAngle(750, 3000) === 90`).
Reduzido: borda estática na cor `aiBeam`. Para quando sai da tela.

### Task 15: QA da fatia C (sessão principal)

Mesmo roteiro da Task 11, mais: um Android de entrada (AVD temporário com 2 GB de RAM e 2 núcleos) rodando `GlowBorder`
e `Glow` por 30 s sem travar a rolagem da galeria; registrar o resultado e a limitação (emulador não é device real).
Commit `docs(ds): evidência da fatia C`.

---

## Fatia D: composição

Mesmos passos, entradas em `src/composicao/`, código em `src/composition/<Nome>/`. Ordem: Task 16 primeiro (o `Select`
nativo usa `ListItem`), depois 17 a 21 em paralelo (até três por vez).

### Task 16: Card, ListItem, DetailedListItem, StatCard, Metric

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Card` | `type?: 'fill' \| 'outline' \| 'elevated' \| 'ghost'` (padrão `components.card.type`); `onPress?`; `selected?`; `padding?: SpaceStep`; `interactionId?`; slots `header?`, `footer?`, `children` | 4 tipos, pressionável, selecionado | Zenith `Card` (4 tipos); sombra só quando `depth.model = 'shadow'` |
| `ListItem` | `title`; `subtitle?`; `leading?: ReactNode`; `trailing?: ReactNode \| 'chevron'`; `selected?` (check `accent`, cobre `SheetRow`); `onPress?`; `loading?` (esqueleto); `interactionId?` | simples, com ícone, chevron, selecionado, carregando, título longo quebrando | Zenith `ListItem` + `SheetRow` |
| `DetailedListItem` | as do `ListItem` mais `description?`, `media?: ReactNode`, `progress?: number` (anel) | completo, carregando | Zenith `DetailedListItem` (ganha `role=button` quando pressionável) |
| `StatCard` | `label`; `value: string \| number`; `delta?: { value: string; direction: 'up' \| 'down' \| 'flat' }`; `icon?: DSIconName`; `chart?: ReactNode` | com delta, sem delta, com minigráfico | Zenith `StatCard` (`testID` deixa de ser obrigatório); estrutura do BoardUI |
| `Metric` | `label`; `value: number`; `format?`; `unit?`; `trend?` (usa `NumberTicker`) | subindo, descendo | agent-chat `widgets/metric.tsx`; NumberFlow |

### Task 17 ∥: Screen, Page, HeaderTitle, TabBar, SegmentedControl

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Screen` (RN) / `Page` (web) | `header?: ReactNode`; `footer?: ReactNode`; `scroll?: boolean`; `edges?: ('top' \| 'bottom')[]`; `onScroll?`; `children`. Sem analytics (o `scroll_depth` do Zenith vira `onScroll` do app) | com cabeçalho, rolando, com rodapé fixo | Zenith `Screen` + `DSScrollView`; `ContentPageScaffold` vira `header` |
| `HeaderTitle` | `title`; `subtitle?`; `size?: 'large' \| 'compact'` (padrão `components.header`); `leading?`, `trailing?: ReactNode`; `loading?` | grande, compacto, com ações, carregando | Zenith `HeaderTitle` (sem `actionIcon/onActionPress`) + `TabScreenTitle` |
| `TabBar` | `items: { key: string; label: string; icon: DSIconName; badge?: number }[]`; `value: string`; `onChange(key)`; `variant?: 'floating' \| 'glass' \| 'solid'` (padrão `components.tabBar`) | 3 a 5 abas × 3 variantes; com badge | Zenith `TabBar`+`TabBarItem`+`BlurPress` sem `useTabStore`/`TAB_ROUTES`; pílula ativa que desliza (beUI Native Tabs, mola do tema); `glass` usa `Blur` |
| `SegmentedControl` | `options: { value: string; label: string }[]`; `value`; `onChange`; `size?: 'small' \| 'normal'` | 2 e 4 opções | Zenith `SegmentedControl`; indicador deslizante (beUI Native/Arc) |

A11y: `tablist`/`tab` com `selected`; `HeaderTitle` como `header`.

### Task 18 ∥: Sheet, Dialog, Select, Menu

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Sheet` | `open: boolean`; `onClose`; `title?`; `snap?: ('content' \| number)[]`; `dismissible?` (padrão true); slots `children`, `footer?` | aberto, com rodapé, conteúdo alto rolando | RN: Zenith `BottomSheet` (`Modal`, alça 36×4; arrastar com `Gesture.Pan()` do gesture-handler e Reanimated no lugar do `PanResponder`, fechar com `accessibilityRole="button"` e `strings.close`); web: Radix Dialog como gaveta inferior, snap e Esc (beUI web Drawer) |
| `Dialog` | `open`; `onClose`; `title`; `description?`; `actions?: ReactNode`; `destructive?` | normal, destrutivo | não existe no Zenith; Radix Dialog no web; RN `Modal` centrado |
| `Select` | `value`; `onChange`; `options: { value: string; label: string; disabled?: boolean }[]`; `placeholder?`; `label?`; `disabled?` | fechado, aberto, com desabilitada | web: Radix Select com gatilho em pílula; RN: gatilho + `Sheet` com `ListItem selected` |
| `Menu` | `trigger: ReactNode`; `items: ({ key: string; label: string; icon?: DSIconName; destructive?: boolean; onSelect(): void } \| 'separator')[]` | aberto, com separador e destrutivo | web: Radix DropdownMenu; RN: `Sheet` com lista |

Review Focus 5: no RN, `Modal onRequestClose` fecha o overlay de cima com o voltar do Android; no web, Esc pelo Radix;
o foco volta ao gatilho nos dois. Catálogo tem um caso de `Dialog` aberto por cima de `Sheet`.

### Task 19 ∥: Toast, Feedback, Callout, Stepper

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Toast` + `ToastHost` + `useToast()` | `useToast().show({ title: string; description?: string; tone?: 'neutral' \| 'success' \| 'danger'; action?: { label: string; onPress(): void }; durationMs?: number })`; fila com uma visível por vez | 3 tons, com ação, fila de 3 | Zenith `Toast` (fila nova); Sonner/sonner-native (MIT) para swipe e status |
| `Feedback` | `kind: 'empty' \| 'success' \| 'error'`; `title`; `description?`; `action?: { label; onPress }`; `layout?: 'screen' \| 'inline'` | 3 tipos × 2 layouts | Zenith `Feedback` (só tela inteira hoje; ganha `inline`) |
| `Callout` | `title?`; `children`; `onClose?` (`strings.close`); `placement?: 'top' \| 'bottom'` (bico) | com e sem fechar | Zenith `TipCallout` sem i18n |
| `Stepper` | `value: number`; `onChange`; `min?`; `max?`; `step?`; `format?` | no mínimo, no meio, no máximo | Zenith `Stepper` (numérico); `accessibilityRole="adjustable"` com `accessibilityActions` increment/decrement de verdade e `strings.increment/decrement` |

### Task 20 ∥: CircularProgress, BarChart, LineChart

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `CircularProgress` | `value: number` (0–1); `size?: number`; `thickness?: number`; `tone?`; `children?` (centro) | 0, 0,6, 1, animando | Zenith `CircularProgress` (troca `Animated` do RN por Reanimated) |
| `BarChart` | `data: { label: string; value: number }[]`; `highlight?: number`; `height?`; `formatValue?` | 7 barras, destaque, vazio | Zenith `BarChart`; animação de entrada do beUI web |
| `LineChart` | `data: { x: number; y: number }[]`; `area?: boolean`; `height?`; `loading?`; `emptyText?` | linha, área, vazio, carregando | Zenith `LineChart`; `loading` que respira e `emptyText` do react-native-livechart (MIT, só ideia; desenho em SVG) |

Lógica em `ds-core/logic/charts.ts`: `arcPath(value, size, thickness)`, `barLayout(data, { width, height, gap })`,
`linePath(points, { width, height, smooth })` → `{ line: string; area: string }`. Autochecagem: `barLayout` com
`[{v:1},{v:2}]`, largura 100, gap 10 dá larguras 45 e alturas proporcionais; `arcPath(0, …)` e `arcPath(1, …)` não
geram `NaN`. Desenho em `react-native-svg` no RN e SVG inline no web; cores com `withAlpha`.

### Task 21 ∥: Table (web), DataList (RN)

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Table` (só web) | `columns: { key: string; title: string; align?: 'start' \| 'end'; sortable?: boolean }[]`; `rows: Record<string, ReactNode>[]`; `sort?`; `onSortChange?`; `empty?: ReactNode` | 5 linhas, ordenado, vazio, 375 px com rolagem própria | agent-chat `widgets/table.tsx`; BoardUI/Sort UI (MIT) para ordenação |
| `DataList` (só RN) | `items: { key: string; title: string; values: { label: string; value: string }[] }[]`; `empty?` | 3 itens, vazio | agent-chat RN `widgets/table.tsx` em formato de lista |

### Task 22: QA da fatia D (sessão principal)

Roteiro da Task 11, mais: voltar do Android e Esc com `Dialog` sobre `Sheet` (Review Focus 5); `Toast` com leitor de
tela (anúncio educado). Commit `docs(ds): evidência da fatia D`.

---

## Fatia E: AI-first (skill `design-chat` para especificar e conferir)

Mesmos passos; entradas em `src/ai/` no catálogo e grupo `ai` na galeria; código em `ds/packages/{native,web}/src/ai/<Nome>/`
(exportado por `./ai`). Lógica pura em `ds-core/logic/` com autochecagem escrita antes. Os estados de exemplo do
catálogo usam um relógio falso controlado por botões (sem rede).

### Task 23 ∥: WaitingOrb, WaitingState, StepList

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `WaitingOrb` | `state: OrbState`; `size?: number` (padrão 48); `label?: string` (padrão `strings.waiting[state]`); `paused?: boolean` | os 6 estados, transição entre estados, reduzido, 3 temas (forma vem de `ai.orb`: `dots`, `fluid`, `ring`) | Lab `design-library/examples/lab-apps/orbs.js` (200 pontos de Fibonacci mais anel, mistura de 450 ms) e thinking-orbs (MIT); RN em Skia com relógio do Reanimated, web em Canvas 2D com rAF |
| `StepList` | `steps: Step[]`; `variant?: 'list' \| 'timeline'` (padrão `ai.steps`) | etapas entrando uma a uma, erro, todas concluídas | Zenith `ProgressiveStatusLoader` + Lab; log vivo da beUI Native agent-activity (MIT) |
| `WaitingState` | `active: boolean`; `startedAt: number` (ms); `state?: OrbState` (padrão `working`); `label?`; `steps?: Step[]`; `children?` (conteúdo extra na fase completa) | 0–2 s nada, 2–3 s orbe e rótulo, >3 s com `GlowBorder` e etapas | regra de espera do `design-library/README.md` (spec §11) |

`type OrbState = 'working' | 'searching' | 'solving' | 'listening' | 'waiting' | 'retrying'` e
`type Step = { id: string; label: string; status: 'pending' | 'active' | 'done' | 'error'; detail?: string }` (exportados
de `ds-core`). Conclusão de etapa anunciada em região viva; reduzido: etapas sem deslocamento. Lógica em
`ds-core/logic/waiting.ts`: `waitingPhase(elapsedMs: number): 'hidden' | 'compact' | 'full'` (limiares 2000 e 3000) e
`orbFrame(tMs: number, state: OrbState, shape: 'dots' | 'fluid' | 'ring', from?: OrbState, blend?: number): { x: number; y: number; r: number; alpha: number }[]`
(coordenadas normalizadas −1…1). Autochecagem: `waitingPhase(1999) === 'hidden'`, `waitingPhase(2000) === 'compact'`,
`waitingPhase(3000) === 'full'`; `orbFrame(0,'working','dots')` tem 200 pontos e nenhum `NaN`; com `blend` 0 e 1 iguala
os quadros dos estados de origem e destino. O `WaitingState` só usa um relógio de UI (intervalo de 250 ms enquanto
`active`), nunca timer de negócio. Reduzido: pontos estáticos e troca de rótulo, sem borda animada. Rótulo em região viva
educada. Pausa fora da tela e ao desmontar.

### Task 24 ∥: StreamingText, ToolCallChip

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `StreamingText` | `text: string` (cresce durante o stream); `streaming: boolean`; `msPerWord?` (padrão `ai.revealMsPerWord`) | stream em andamento, concluído, reduzido | Lab e agent-chat; beUI Native streaming-response; sem cursor piscante |
| `ToolCallChip` | `name: string`; `status: 'running' \| 'ok' \| 'error' \| 'rejected' \| 'deferred' \| 'cancelled'`; `detail?: ReactNode` (expande) | os 6 status, expandido | agent-chat; beUI Native tool-result |

Lógica:
`ds-core/logic/stream.ts` com `splitWords(text): string[]` (mantém espaços e pontuação colados) e
`sentencesToAnnounce(prev: string, next: string): string[]` (só frases completas novas). Autochecagem com
`'Olá, mundo. Tudo'` → `sentencesToAnnounce('', …)` dá `['Olá, mundo.']`. O stream nunca anuncia palavra por palavra.
Reduzido: texto inteiro de uma vez.

### Task 25 ∥: MessageBubble, MessageList

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `MessageBubble` | `role: 'user' \| 'assistant' \| 'system'`; `children` (slot de conteúdo: texto, cartões, widgets); `time?: Date`; `voice?: { durationMs: number }`; `status?: 'sending' \| 'sent' \| 'error'`; `onRetry?` | 3 papéis, voz, erro com tentar de novo, conteúdo longo com "ver mais" | Zenith `ChatBubble` + `formatClock` (migrado para `ds-core/logic/clock.ts`); beUI Native message-bubble |
| `MessageList` | `messages: { id: string; node: ReactNode }[]`; `connection?: 'online' \| 'reconnecting'`; `onEndReached?`; `footer?: ReactNode` (espera, composer) | 30 mensagens, seguindo o fim, usuário rolou para cima (botão `strings.scrollToBottom`), reconectando | agent-chat `message-list.tsx` (banner de reconexão, anúncio); beUI Native message-scroller (segue a saída e solta ao rolar); RN com `FlashList` v2 (`maintainVisibleContentPosition` com `startRenderingFromBottom` e `autoscrollToBottomThreshold`) |

Autochecagem de `formatClock(65000) === '1:05'`.

### Task 26 ∥: Composer, RecordingBar

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `Composer` | `value`; `onChangeText`; `onSend`; `busy?: boolean` (liga `GlowBorder` e troca enviar por parar); `onStop?`; `placeholder?`; slots `leading?`, `trailing?` (anexo, microfone); `disabled?`; `maxRows?` (padrão 6) | vazio, digitando, ocupado com borda, desabilitado, com anexo e microfone | Zenith `ChatInput` (sem `analyticsId` fixos); agent-chat `composer.tsx`; beUI Native prompt-input |
| `RecordingBar` | `recording: boolean`; `elapsedMs: number`; `level?: number` (0–1); `onStop`; `onCancel` | gravando com nível variando, parado | Zenith `RecordingBar`; brilho que sobe com a voz do libraries.dev voice-glow; forma de onda do audiocn (MIT, web) |

`emit({ component: 'Composer', kind: 'submit' })` no envio; nunca envia o texto na telemetria.

### Task 27 ∥: ApprovalCard, ClarificationCard, Sources, Files

| Componente | API (props) | Estados no catálogo | Base |
|---|---|---|---|
| `ApprovalCard` | `title`; `summary?`; `preview?: ReactNode`; `onApprove`; `onReject`; `approveLabel?`/`rejectLabel?` (padrão `strings.approve/reject`); `destructive?` (dois passos: primeiro toque mostra `strings.confirmDestructive`); `state?: 'pending' \| 'approved' \| 'rejected'` | pendente, destrutivo nos dois passos, aprovado, recusado | agent-chat `confirmation-card.tsx` (`ConfirmationCard`); Zenith `EditReviewSheet` e `DiffCard` (a prévia vira o slot `preview`; o diff de treino fica no app); beUI Native approval-card (MIT); recebe o foco ao aparecer (web `focus()`, RN `AccessibilityInfo.setAccessibilityFocus`) |
| `ClarificationCard` | `question`; `options: { value: string; label: string }[]`; `multiple?`; `onSubmit(values: string[])`; `onSkip?` | única, múltipla, com pular | Zenith `ClarificationCard` (sem `analyticsId` fixo), opções com `FilterChip` |
| `Sources` | `items: { id: string; title: string; url?: string; snippet?: string }[]`; `onOpen?(id)` | 3 fontes, número em linha que abre a fonte | agent-chat `widgets/sources.tsx`; beUI Native citations |
| `Files` | `items: { id: string; name: string; sizeBytes?: number; kind?: string; status?: 'uploading' \| 'ready' \| 'error' }[]`; `onRemove?(id)`; `onOpen?(id)` | 3 arquivos, enviando, erro | agent-chat `widgets/files.tsx` |

### Task 28: QA da fatia E (sessão principal)

Roteiro da Task 11, mais: uma conversa montada no catálogo (`MessageList` + `WaitingState` com espera longa >3 s +
`ApprovalCard` destrutivo + `Composer` ocupado) nos quatro temas; Android de entrada com o orbe e a borda por 30 s;
amostra de leitor de tela (Accessibility Inspector no iOS; TalkBack no emulador se a imagem tiver, senão registrar como
não verificado). Commit `docs(ds): evidência da fatia E`.

---

## Fatia F: fechamento

### Task 29: `ds-mcp`

**Files:** Create `ds/packages/mcp/` (`@gahmp1/ds-mcp`, bin `ds-mcp`, servidor stdio com `@modelcontextprotocol/sdk`).

**Interfaces:**
- Origem: `swfitness` `apps/mobile/tools/zenith-mcp/` (ler por `git show`); regras em `src/rules/zenith-rules.json`.
- Tools: `list_components` (nome, pacote, subpath, props lidas dos `.d.ts` de `ds-native`/`ds-web`),
  `get_component(name)` (props, variantes, exemplo do catálogo), `validate_diff({ diff: string, product: string })`.
- Regras de DS valem para todo produto (as famílias ZC-A, ZC-B e ZC-E do Zenith, generalizadas: cor/número de layout/
  tipografia literal em tela, componente interativo cru do RN ou do DOM em tela, import de componente fora de
  `@gahmp1/ds-*`); regras de app (ZC-C, ZC-D, QA) viram configuração do produto em `ds-mcp.config.json` na raiz do app:
  `{ product, screensGlob, allow: string[], baseline: string /* caminho */, extraRules?: string[] }`.
- Baseline: violação já existente não bloqueia; violação nova bloqueia (comportamento do zenith-mcp).

- [ ] Passo 1 (vermelho): `ds/packages/mcp/fixtures/` com um diff que tem `color: '#fff'` numa tela e um `Pressable` cru;
  script `check` do pacote roda `validate_diff` nele e espera 2 violações. Rodar. Expected: FAIL (pacote vazio).
- [ ] Passo 2: implementar. Passo 3: `npm run check -w @gahmp1/ds-mcp` → `ds-mcp: 2 violações esperadas encontradas`.
- [ ] Passo 4: smoke do servidor: `node dist/smoke.js` lista as 3 tools. Passo 5: commit `feat(ds-mcp): regras do DS e configuração por produto`.

### Task 30: Skills de design usando o DS (spec §15b)

**Files:** Modify `design-library/README.md` (regra comum: produto que consome `@gahmp1/ds-*` usa os componentes e o
tema do DS; falta de componente vira proposta para o DS), `design-library/skills/{design-chat,design-screens,design-onboarding,design-site,design-research,design-library}/SKILL.md`.

- [ ] Trocar as instruções de cópia (`orbs.js`, `chat.js`, microinterações) por "use `@gahmp1/ds-native/ai`,
  `@gahmp1/ds-web/ai`, `./motion`", apontando para as props de `WaitingState`, `GlowBorder`, `Reveal`, `NumberTicker`;
  apagar a instrução antiga (sem alias). `design-site` com os dois caminhos (Next com `ds-web`, HTML com `tokens.css`).
- [ ] Conferência por uso real: pedir à `design-chat` a espera de um chat de exemplo; o código produzido só importa do
  DS e o `validate_diff` do `ds-mcp` fica limpo. Registrar a saída no ledger.
- [ ] Commit `docs(design-library): skills usam o devaocubo-ds`.

### Task 31: Tela-modelo com componentes reais, relatório e release 0.1.0 (sessão principal)

- [ ] Tela-modelo de identidade (spec §10) refeita com componentes reais: story `Identidade/Tela-modelo` no catálogo web
  (quatro temas lado a lado) e tela `identidade` na galeria nativa (tema trocado pelo seletor). Critério: dá para dizer
  qual app é qual sem ver o nome; registrar a impressão honesta.
- [ ] `AGENTS.md` (passo a passo de "adicionar componente" e "mudar tema"; `data-theme` só no elemento raiz) e README
  (seção dos pacotes com os quatro pacotes novos).
- [ ] Relatório da onda com a skill `design-pdf` em `design-library/examples/identidades/relatorio-onda-1.html`
  (capturas das QAs, componentes entregues, desvios, o que não foi verificado).
- [ ] `npx changeset` com `minor` para os cinco pacotes (grupo `fixed`), `npx changeset version` → `0.1.0`;
  `npm pack --dry-run` de cada pacote lista só `dist` e `package.json`. **Parar antes de `npm publish`** e pedir o OK do
  João para a publicação no GitHub Packages (spec §9).
- [ ] Commit `chore(ds): versão 0.1.0 dos pacotes`. Revisão final da branch (opus), PR, merge só com o OK do João.
