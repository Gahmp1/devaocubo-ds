# devaocubo-ds Onda 0 (base de tema e catálogos): plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** transformar o devaocubo-ds num repositório com workspaces, onde `@gahmp1/ds-theme` define o contrato de tema e os
temas de `devaocubo`, `swfitness`, `somma` e `trippo` (claro e escuro), e de onde saem `tokens.css` e `defaults.json`
idênticos aos de hoje. Inclui um catálogo web e um nativo mostrando os temas, e a tela-modelo de identidade para o
designer e o João.

**Architecture:** o pacote raiz `devaocubo-ds` continua com o contrato atual (só `tokens.css`, `defaults.json` e
`README.md`), mas os dois arquivos passam a ser gerados. Os temas são objetos TypeScript tipados (`DSTheme`) em
`packages/theme`. Geradores produzem CSS com variáveis `--ds-*`, o mapeamento `@theme` do Tailwind 4 e os arquivos
legados. Os catálogos consomem o pacote pelo workspace.

**Tech Stack:** npm workspaces, TypeScript ~6.0.3, changesets, Storybook ^10.5.2 com `@storybook/react-native-web-vite`
(Vite ^5.4.21, react-native-web ^0.21.2), Expo ~57.0.15 com RN 0.86.3 e React 19.2.3.

**Spec:** `docs/superpowers/specs/2026-10-30-componentes-devaocubo-ds-design.md` (aprovado em 2026-10-30). Leia as seções
6, 8, 9, 9b, 10, 13, 14 e 15 antes de começar.

## Global Constraints

- Sem testes unitários: nenhum `*.test.ts`, `*.spec.ts` ou `*_test.*` novo. As verificações são comandos (build,
  `git diff --exit-code`, checagem de contraste) e conferência visual. O `defaults.test.mjs` existente fica como está e
  `npm test` precisa continuar verde.
- O pacote raiz mantém `"files": ["tokens.css", "defaults.json", "README.md"]` e
  `"exports": {"./tokens.css": "./tokens.css", "./defaults.json": "./defaults.json"}`. Sem script `prepare` na raiz,
  porque uma git install dos 16 consumidores não pode exigir build.
- `tokens.css` e `defaults.json` gerados precisam sair **byte a byte iguais** aos de `origin/main` 33db9d0.
- Nenhuma fonte é distribuída. Os catálogos usam substitutas: Outfit no lugar de Gilroy (licença a verificar), IBM Plex
  Mono e Geist, todas via Google Fonts no web e `@expo-google-fonts/*` no nativo.
- Sem alias nem re-export de transição.
- Nomes de pacote: `@gahmp1/ds-theme` (nesta onda). Versão `0.0.0`, sem publicação nesta onda.
- Mockups publicados só como artifact privado.
- Commits com a linha `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Trabalho num worktree do devaocubo-ds,
  branch `feat/ds-onda-0`, a partir de `origin/main`.

**Desvios do spec (chamadas do plano):**
- O spec põe uma pasta `tokens/` na raiz. Aqui ela vira `packages/theme/src/themes/*.ts` (TS tipado), o que a §16
  permite. O type-check substitui um schema JSON.
- O `ds-mcp` sai da onda 0 e vai para o fim da onda 1: as regras do zenith-mcp (~4.700 linhas) consultam componentes que
  ainda não existem.
- O preset do Tailwind 3 fica para a onda 5, a do Somma, único consumidor.

## Review Focus

1. **Git install de um consumidor depois da mudança:** quem roda `npm install github:Gahmp1/devaocubo-ds` recebe só os
   três arquivos, sem build, e `tokens.css` igual ao de hoje. Coberto na Task 1, passo 4.
2. **ProjectsCLI lendo `defaults.json`** (`internal/doctor/designtokens.go:51`): o formato não pode mudar nem na ordem
   das chaves. Coberto na Task 2, pela comparação byte a byte.
3. **Par de contraste com cor translúcida:** a checagem não pode aprovar por engano um `rgba(...)` com alfa < 1. Tem que
   falhar com mensagem clara. Coberto na Task 3, autochecagem.
4. **SO em escuro com `data-theme="light"` explícito (e o inverso):** o atributo explícito vence nos dois sentidos.
   Coberto na Task 4, passo 4, e conferido no catálogo na Task 6.
5. **Movimento reduzido:** a demonstração de movimento do catálogo fica parada com `prefers-reduced-motion: reduce` no web
   e com "Reduzir movimento" no simulador. Coberto nas Tasks 6 e 7.

---

### Task 1: Workspaces sem quebrar o contrato do pacote raiz

**Files:**
- Modify: `package.json`
- Create: `tsconfig.base.json`, `.changeset/config.json`
- Modify: `.gitignore` (acrescentar `dist/`, `storybook-static/`, `.expo/`)

**Interfaces:**
- Produces: workspaces `packages/*` e `apps/*`; `tsconfig.base.json` com `"strict": true`, `"module": "NodeNext"`,
  `"moduleResolution": "NodeNext"`, `"target": "ES2022"`, `"declaration": true`, `"jsx": "react-jsx"`; scripts de raiz
  `build` (`npm run build --workspaces --if-present`) e `check` (`npm run check --workspaces --if-present`).

- [ ] **Step 1: Registrar o estado atual**

Run: `npm pack --dry-run --json | node -e "const p=JSON.parse(require('fs').readFileSync(0));console.log(p[0].files.map(f=>f.path).sort().join(','))"`
Expected: `README.md,defaults.json,package.json,tokens.css`

- [ ] **Step 2: Acrescentar ao `package.json` da raiz** `"workspaces": ["packages/*", "apps/*"]`, os scripts `build` e
  `check` e as devDependencies `typescript@~6.0.3` e `@changesets/cli@^2`. Não mexer em `files`, `exports`, `name`,
  `version` nem no script `test`. Rodar `npx changeset init` para gerar `.changeset/config.json` com `"access": "restricted"`.

- [ ] **Step 3: Rodar a mesma linha do Step 1 e `npm test`**

Expected: a mesma lista `README.md,defaults.json,package.json,tokens.css`, e `npm test` verde.

- [ ] **Step 4: Simular a instalação de um consumidor**

Run: `D=$(mktemp -d) && cd $D && npm init -y >/dev/null && npm install --ignore-scripts "$OLDPWD" && cmp node_modules/devaocubo-ds/tokens.css "$OLDPWD/tokens.css" && ls node_modules/devaocubo-ds`
Expected: `cmp` sem saída; o `ls` lista só `README.md defaults.json package.json tokens.css` (o npm cria link para pasta
local: conferir com `npm pack` mais install do `.tgz` se o link mascarar o resultado).

- [ ] **Step 5: Commit** `chore: workspaces e base TypeScript sem mudar o contrato do pacote raiz`

### Task 2: `@gahmp1/ds-theme`: contrato `DSTheme` e geração dos arquivos legados

**Files:**
- Create: `packages/theme/package.json`, `packages/theme/tsconfig.json`
- Create: `packages/theme/src/types.ts`, `packages/theme/src/legacy/devaocubo.ts`,
  `packages/theme/src/generate/legacy.ts`, `packages/theme/src/index.ts`,
  `packages/theme/src/scripts/build.ts`
- Modify (gerados): `tokens.css`, `defaults.json` (devem ficar sem diff)

**Interfaces:**
- Produces (exportados por `src/index.ts`):

```ts
export type Scheme = 'light' | 'dark'
export type FontWeight = 400 | 500 | 600 | 700
export interface FontFamily { web: string; native: Partial<Record<FontWeight, string>> } // native: nome da fonte carregada por peso; ausente = sistema
export interface ColorRoles {
  bg: string; surface1: string; surface2: string; surface3: string; scrim: string
  text: string; textMuted: string; textSubtle: string; textDisabled: string
  accent: string; onAccent: string; danger: string; onDanger: string; warning: string; onWarning: string
  success: string; onSuccess: string; info: string; onInfo: string
  border: string; borderMuted: string; focus: string
  aiOrb: string; aiGlow: string; aiBeam: string
}
export type TypeStep = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'display'
export interface Shadow { color: string; x: number; y: number; blur: number; spread: number; elevation: number }
export interface DSTheme {
  name: 'devaocubo' | 'swfitness' | 'somma' | 'trippo'
  provisional: Record<Scheme, boolean>
  color: Record<Scheme, ColorRoles>
  type: { family: { display: FontFamily; body: FontFamily; mono: FontFamily }
          scale: Record<TypeStep, { size: number; lineHeight: number }>
          weight: { regular: FontWeight; medium: FontWeight; semibold: FontWeight; bold: FontWeight }
          tracking: { tight: number; normal: number; wide: number } // em
          labelCase: 'none' | 'uppercase'; numeric: 'proportional' | 'tabular' }
  shape: { radius: { sm: number; md: number; lg: number; xl: number; xxl: number; full: number }
           control: 'pill' | 'rounded' | 'square'; borderWidth: { hairline: number; thin: number; thick: number } }
  depth: Record<Scheme, { model: 'flat' | 'hairline' | 'shadow' | 'glow' | 'blur'; card: Shadow; overlay: Shadow }>
  density: { space: { xxs: number; xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; xxxl: number; huge: number }
             control: { sm: number; md: number; lg: number } }
  motion: { duration: { fast: number; base: number; slow: number } // ms
            easing: { standard: [number, number, number, number]; enter: [number, number, number, number]; exit: [number, number, number, number] }
            spring: { damping: number; stiffness: number; mass: number }
            personality: 'calm' | 'snappy'; press: { kind: 'opacity' | 'scale'; value: number } }
  ai: { orb: 'dots' | 'fluid' | 'ring'; beamPeriodMs: number; steps: 'list' | 'timeline'; revealMsPerWord: number }
  components: { button: { shape: 'pill' | 'rounded' | 'square' }; card: { type: 'fill' | 'outline' }
                tabBar: 'floating' | 'glass' | 'solid'; header: 'large' | 'compact' }
}
export function toLegacyTokensCss(): string   // conteúdo exato de tokens.css
export function toLegacyDefaultsJson(): string // conteúdo exato de defaults.json, com \n final
```

- `package.json` do pacote: `"name": "@gahmp1/ds-theme"`, `"version": "0.0.0"`, `"type": "module"`,
  `"exports": {".": "./dist/index.js", "./css/*": "./dist/css/*"}`,
  `"publishConfig": {"registry": "https://npm.pkg.github.com"}`, scripts
  `"build": "tsc -b && node dist/scripts/build.js"` e `"check": "node dist/scripts/check.js"` (o `check.js` vem da Task 3).

- [ ] **Step 1: Copiar os valores atuais para `src/legacy/devaocubo.ts`** como dados, nunca como texto pronto:
  - os triplos HSL de `:root` e `[data-theme="dark"]`, lidos de `tokens.css`;
  - os mapas `light` e `dark`, lidos de `defaults.json`, na mesma ordem de chaves.

- [ ] **Step 2: Implementar `toLegacyTokensCss()` e `toLegacyDefaultsJson()` em `src/generate/legacy.ts`.** Eles montam
  os arquivos a partir desses dados e reproduzem a formatação atual (linha em branco antes de `--success` em `:root`,
  bloco `@media` com recuo de 4 espaços, `@theme inline`, as duas regras finais). O `build.ts` grava os dois em
  `../../tokens.css` e `../../defaults.json`, relativos a `packages/theme`.

- [ ] **Step 3: Verificar**

Run: `npm install && npm run build -w @gahmp1/ds-theme && git diff --exit-code tokens.css defaults.json && npm test`
Expected: nenhum diff; `npm test` verde.

- [ ] **Step 4: Commit** `feat(theme): contrato DSTheme e geração dos tokens legados`

### Task 3: Checagem de contraste

**Files:**
- Create: `packages/theme/src/check/color.ts`, `packages/theme/src/check/contrast.ts`, `packages/theme/src/scripts/check.ts`

**Interfaces:**
- Consumes: `DSTheme`, `Scheme`, `ColorRoles` (Task 2); `themes: DSTheme[]` exportado por `src/index.ts` (preenchido nas Tasks 4 e 5).
- Produces: `parseColor(css: string): { r: number; g: number; b: number; a: number }` (aceita `#rgb`, `#rrggbb`,
  `#rrggbbaa`, `rgb()`, `rgba()`, `hsl()`, `hsla()`); `contrastRatio(fg: string, bg: string): number` (WCAG 2.x;
  lança erro se alguma cor tiver alfa < 1); `checkTheme(t: DSTheme): string[]` (lista de falhas, vazia se ok).

- [ ] **Step 1: Autochecagem no topo de `scripts/check.ts`**, antes de checar os temas:

```ts
assert.equal(contrastRatio('#000000', '#ffffff').toFixed(2), '21.00')
assert.equal(contrastRatio('#777777', '#ffffff').toFixed(2), '4.48')
assert.equal(contrastRatio('hsl(0 0% 100%)', '#000').toFixed(2), '21.00')
assert.throws(() => contrastRatio('rgba(0,0,0,0.5)', '#ffffff'), /alfa/)
```

- [ ] **Step 2: Implementar `checkTheme`** com estes pares, para cada esquema:
  - Mínimo 4.5: `text` sobre `bg`, `surface1`, `surface2` e `surface3`; `textMuted` sobre `bg` e `surface1`;
    `onAccent`/`accent`, `onDanger`/`danger`, `onWarning`/`warning`, `onSuccess`/`success`, `onInfo`/`info`.
  - Mínimo 3: `textSubtle` sobre `bg`; `focus` sobre `bg`; `accent` sobre `bg`.
  - Cada falha vira uma linha: `<tema>/<esquema>: <fg> sobre <bg> = <razão> (mínimo <n>)`.
  - `check.ts` imprime as falhas e sai com código 1 se houver alguma.

- [ ] **Step 3: Verificar** `npm run build -w @gahmp1/ds-theme && npm run check -w @gahmp1/ds-theme`.
  Esperado: a autochecagem passa. Com `themes` ainda vazio, a saída é `0 temas, 0 falhas`.

- [ ] **Step 4: Commit** `feat(theme): checagem de contraste AA por tema e esquema`

### Task 4: Geradores de CSS (`--ds-*`) e Tailwind 4, mais o tema `devaocubo`

**Files:**
- Create: `packages/theme/src/generate/css.ts`, `packages/theme/src/themes/devaocubo.ts`
- Modify: `packages/theme/src/index.ts`, `packages/theme/src/scripts/build.ts`

**Interfaces:**
- Consumes: `DSTheme` (Task 2).
- Produces:
  - `toCssVars(t: DSTheme): string`: variáveis `--ds-color-<papel>` (kebab-case do papel, ex.: `--ds-color-text-muted`),
    `--ds-font-<display|body|mono>`, `--ds-text-<passo>-size` e `-line`, `--ds-radius-<k>` em px,
    `--ds-space-<k>` em px, `--ds-duration-<k>` em ms, `--ds-ease-<k>` como `cubic-bezier(...)`.
  - Seletores: `:root, [data-theme="light"]` com o claro; `[data-theme="dark"]` com o escuro;
    `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }` com o escuro. É o mesmo
    esquema do `tokens.css` atual: o atributo explícito vence.
  - `toTailwindTheme(t: DSTheme): string`: bloco `@theme inline` mapeando `--color-<papel>: var(--ds-color-<papel>)`,
    `--radius-<k>` e `--font-<k>`.
  - `devaocubo: DSTheme`, com as cores de `src/legacy/devaocubo.ts` escritas como `hsl(...)` e `provisional` falso nos
    dois esquemas.
  - Papéis que o legado não tem saem de valores legados equivalentes:
    - `surface1` = card;
    - `surface2` = muted;
    - `surface3` = border;
    - `textSubtle` = muted-foreground;
    - `ai*` = primary;
    - `info` = primary.
    - Os pares `on*` que reprovarem na checagem de contraste são ajustados, com comentário.
  - Escalas:
    - Raio derivado de `--radius: 0.6rem`: lg 9.6, md 7.6, sm 5.6, xl 13.6.
    - Espaço de `defaults.json`: xs 4, sm 8, md 16, lg 24, xl 32.
- O `build.ts` grava `dist/css/<nome>.css` e `dist/css/<nome>.tailwind.css` para cada tema de `themes`. Também grava
  uma cópia concatenada de todos os temas, cada um sob `[data-product="<nome>"]`, em
  `design-library/examples/identidades/themes.css`; esse arquivo é gerado, versionado e marcado no topo como
  "gerado; não editar".

- [ ] **Step 1: Implementar `toCssVars`, `toTailwindTheme` e o tema `devaocubo`, e registrar em `themes`.**
- [ ] **Step 2: Autochecagem no build:** para cada tema e cada papel de `ColorRoles`, o CSS gerado contém
  `--ds-color-<papel>:` exatamente 3 vezes (claro, escuro explícito e escuro do SO). O build falha se não contiver.
- [ ] **Step 3: Verificar** `npm run build -w @gahmp1/ds-theme && npm run check -w @gahmp1/ds-theme && git diff --exit-code tokens.css defaults.json`.
  Esperado: sem falhas e sem diff.
- [ ] **Step 4: Conferir a precedência** num HTML descartável no scratchpad que importa `dist/css/devaocubo.css`. No
  navegador embutido, com `colorScheme: dark` emulado:
  - `<html data-theme="light">` → `getComputedStyle(document.documentElement).getPropertyValue('--ds-color-bg')` é o claro;
  - sem atributo → é o escuro.
  - Repetir com `colorScheme: light` e `data-theme="dark"` → escuro.
- [ ] **Step 5: Commit** `feat(theme): CSS --ds-* e @theme do Tailwind 4; tema devaocubo`

### Task 5: Temas `swfitness`, `somma` e `trippo`

**Files:**
- Create: `packages/theme/src/themes/swfitness.ts`, `packages/theme/src/themes/somma.ts`, `packages/theme/src/themes/trippo.ts`
- Modify: `packages/theme/src/index.ts` (registrar em `themes`)

**Interfaces:**
- Consumes: `DSTheme`, `checkTheme` (Tasks 2 e 3).
- Produces: `swfitness`, `somma` e `trippo`, todos `DSTheme`.

Fontes, todas em `origin/main` dos repositórios (fazer `git fetch` antes; ler com `git show origin/main:<caminho>`):

- [ ] **Step 1: `swfitness` escuro, definitivo (`provisional.dark = false`).** Valores de
  `swfitness:apps/mobile/src/components/zenith/tokens.json`.
  - **Mapeamento de cor:**

    | Papel | Chave em `tokens.json` |
    |---|---|
    | `bg` | background |
    | `surface1` | card |
    | `surface2` | overlay |
    | `surface3` | muted |
    | `text` | foreground |
    | `textMuted` | mutedForeground |
    | `textSubtle` | subtleForeground |
    | `textDisabled` | faintForeground |
    | `accent`, `success`, `focus`, `aiOrb`, `aiGlow`, `aiBeam` | primary |
    | `danger` | destructive |
    | `warning` | warning |
    | `info` | info |
    | `border` | border |
    | `borderMuted` | borderMuted |

  - `scrim`: o valor do fundo do `BottomSheet`, em `zenith/organisms/BottomSheet/BottomSheet.tsx`.
  - Cada `on*` é `#0E0E11` ou `#FFFFFF`, o que tiver maior contraste.
  - **Tipo:**
    - escala de `typography`: xs 12/16, sm 14/16, base 16/20, lg 20/24, xl 24/28, display 44/56;
    - pesos 400, 500, 600 e 600, porque não há arquivo Bold;
    - família `native` `{400: 'Gilroy-Regular', 500: 'Gilroy-Medium', 600: 'Gilroy-SemiBold'}`, `web` `"'Gilroy', 'Outfit', system-ui, sans-serif"`;
    - `labelCase` none, `numeric` proportional.
  - **Forma:** `borderRadius`, `borderWidths` (hairline 0.4); `control` pill.
  - **Profundidade:** `model` glow e sombras zeradas.
  - **Densidade:** espaçamento de `spacing` (xxs 4 … huge 40); controles de `constants` (sm 44, md 48, lg 56).
  - **Movimento:**
    - durações fast 200, base 250, slow 300;
    - easing standard `[0.42,0,0.58,1]`, enter `[0.33,1,0.68,1]`, exit `[0.32,0,0.67,0]`;
    - `spring` com os valores do `withSpring` de `zenith/organisms/TabBar/TabBar.tsx`;
    - `press` opacity com valor 0.3 (`constants.tapOpacity`); `personality` snappy.
  - **IA:**
    - `orb` dots;
    - `beamPeriodMs` = duração da animação da borda em `devaocubo-ds:design-library/examples/lab-swfitness/styles.css`;
    - `steps` list; `revealMsPerWord` 50.
  - **Componentes:** botão pill, cartão fill, tab bar glass, cabeçalho large.
- [ ] **Step 2: `swfitness` claro, provisório (`provisional.light = true`).** Base: bloco `light` de
  `swfitness:design/ds.config.json`, com o mesmo mapeamento por papel equivalente.
  - Onde reprovar na checagem (ex.: `focus` lima sobre fundo claro), ajustar só a luminosidade HSL do primeiro plano até
    passar, mantendo o matiz.
  - Registrar cada ajuste em comentário: `// ajustado: fonte <valor> (razão <x>)`.
- [ ] **Step 3: `somma`, provisório nos dois esquemas.**
  - **Cores** de `somma:packages/tokens/src/index.ts`:
    - superfícies e textos dos esquemas `dark` e `light` (`SurfaceScheme`);
    - `accent` e `success` = `income.main`; `danger` = `expense.main`; `warning` e `info` dos objetos homônimos;
    - no claro, as cores semânticas vêm de `lightSemantic`;
    - `onAccent` = `black`.
  - **Tipo:** família IBM Plex Mono, nomes nativos de `somma:apps/mobile/App.tsx`.
  - **Forma:** raio da escala de `index.ts:261-270`; `control` rounded.
  - **Identidade** (spec §10): `labelCase` uppercase, `numeric` tabular, profundidade flat, `personality` calm com fast 150,
    base 250 e slow 400, `orb` ring.
- [ ] **Step 4: `trippo`, provisório nos dois esquemas.**
  - **Cores** de `lightTokens` e `darkTokens` em `trippo:packages/shared/src/tokens.js`:
    - `surface1` = card; `surface2` = secondary; `surface3` = muted;
    - `accent` = primary, porque ainda não há acento de marca;
    - `border`: a borda translúcida vira cor opaca equivalente sobre `bg`, com comentário.
  - **Tipo:** `web` `"'Geist', system-ui, sans-serif"`; `native` vazio (fonte do sistema).
  - **Forma:** raio sm 8, md 9, lg 10, xl 15, xxl 24; `control` rounded.
  - **Identidade:** profundidade shadow (sombra suave), `orb` dots.
- [ ] **Step 5: Verificar** `npm run build -w @gahmp1/ds-theme && npm run check -w @gahmp1/ds-theme && git diff --exit-code tokens.css defaults.json`.
  Esperado: `4 temas, 0 falhas` e sem diff. Se o `swfitness` escuro reprovar algum par, não altere a fonte (é
  definitivo): pare e registre a falha no PR para o João decidir.
- [ ] **Step 6: Commit** `feat(theme): temas swfitness, somma e trippo (claro e escuro)`

### Task 6: Catálogo web (Storybook)

**Files:**
- Create: `apps/catalog-web/package.json`, `apps/catalog-web/.storybook/main.ts`, `apps/catalog-web/.storybook/preview.tsx`,
  `apps/catalog-web/src/TokensPage.tsx`, `apps/catalog-web/src/Tokens.stories.tsx`

**Interfaces:**
- Consumes: `themes`, `DSTheme`, `contrastRatio` (`@gahmp1/ds-theme`); os arquivos `@gahmp1/ds-theme/css/<nome>.css`.
- Produces: `TokensPage({ theme }: { theme: DSTheme })`.

- [ ] **Step 1: Montar o Storybook.**
  - Framework `@storybook/react-native-web-vite` ^10.5.2, com `@storybook/addon-docs` e `vite` ^5.4.21.
  - Toolbar com dois globals: `theme` (os 4 nomes) e `scheme` (`system | light | dark`).
  - O decorator importa os quatro CSS gerados e, no `<html>`, seta `data-product` e (quando não for `system`)
    `data-theme`.
  - Fontes via Google Fonts: Outfit, IBM Plex Mono e Geist.
- [ ] **Step 2: Implementar a `TokensPage`, usando só `var(--ds-*)`, sem cor literal.** Ela mostra:
  - uma amostra de cada papel de cor, com a razão de contraste contra `bg` impressa;
  - a escala tipográfica com a família `display` e a `body`;
  - raios, espaçamentos e alturas de controle;
  - um quadro animado (entra e sai em loop) com `--ds-duration-base` e `--ds-ease-standard`, parado sob
    `@media (prefers-reduced-motion: reduce)`;
  - um selo "provisório" quando `theme.provisional[scheme]` for verdadeiro.
- [ ] **Step 3: Verificar** `npm run build-storybook -w catalog-web` sem erro. Depois `npm run storybook -w catalog-web` e,
  no navegador embutido:
  - console sem erro nos 4 temas × 3 esquemas;
  - 375 px sem rolagem horizontal;
  - com `prefers-reduced-motion` emulado, o quadro fica parado;
  - SO escuro com `scheme=light` mostra o claro.
  - Salvar capturas dos 4 temas × 2 esquemas em `apps/catalog-web/evidence/onda-0/`.
- [ ] **Step 4: Commit** `feat(catalog-web): página de tokens por tema e esquema`

### Task 7: Catálogo nativo (Expo)

**Files:**
- Create: `apps/catalog-native/package.json`, `apps/catalog-native/app.json`, `apps/catalog-native/App.tsx`,
  `apps/catalog-native/src/TokensScreen.tsx`

**Interfaces:**
- Consumes: `themes`, `DSTheme`, `Scheme` (`@gahmp1/ds-theme`).
- Produces: `TokensScreen({ theme, scheme }: { theme: DSTheme; scheme: Scheme })`.

- [ ] **Step 1: Criar o app Expo.**
  - Versões: `expo` ~57.0.15, `react-native` 0.86.3, `react` 19.2.3, `react-native-reanimated` 4.5.1,
    `react-native-worklets` 0.10.1, `react-native-safe-area-context` ~5.7.0.
  - Fontes: `@expo-google-fonts/outfit`, `@expo-google-fonts/ibm-plex-mono` e `@expo-google-fonts/geist`.
  - Sem Skia nesta onda, para rodar no Expo Go.
  - No topo, seletor de tema e de esquema (`system` usa `useColorScheme`).
- [ ] **Step 2: Implementar a `TokensScreen`.** Mostra o mesmo conteúdo da `TokensPage`, com estilo lido do objeto `theme`
  em tempo de execução (StyleSheet dentro do componente, a partir do tema); nenhum valor literal de cor. O quadro animado
  usa Reanimated com `theme.motion` e fica parado quando `useReducedMotion()` for verdadeiro.
- [ ] **Step 3: Verificar** `npx expo start` no simulador iOS e no emulador Android. Conferir:
  - os 4 temas × 2 esquemas aparecem;
  - "Reduzir movimento" ligado deixa o quadro parado;
  - sem erro no log do Metro.
  - Capturas em `apps/catalog-native/evidence/onda-0/`.
- [ ] **Step 4: Commit** `feat(catalog-native): tela de tokens por tema e esquema`

### Task 8: Identidade por produto (skills de design)

**Files:**
- Create: `design-library/references/identidade-por-produto.md`
- Create: `design-library/examples/identidades/index.html`, `design-library/examples/identidades/identidades.css`,
  `design-library/examples/identidades/identidades.js`
- Create: `design-library/examples/identidades/deck.html`

**Interfaces:**
- Consumes: `design-library/examples/identidades/themes.css` (gerado na Task 4); os mockups
  `design-library/examples/lab-swfitness`.

- [ ] **Step 1: Pesquisar com a skill `design-research`.** Registrar referências que sustentem as identidades de Somma e
  Trippo (eixos da spec §10), no formato de `references/catalog-schema.md`, com licença. Partir de:
  - `somma:design/design-systems/somma/brand/style-notes.md` (referência perssua.com);
  - `trippo:apps/web/BRAND.md`.
- [ ] **Step 2: Desenhar a tela-modelo com a skill `design-screens`.**
  - Conteúdo: lista, detalhe, chat com espera (orbe e etapas, versão HTML do Lab) e cartão de aprovação.
  - Os quatro temas lado a lado, cada um num `[data-product]`, com alternância claro/escuro.
  - Só `var(--ds-*)`; textos marcados como exemplo.
- [ ] **Step 3: Verificar** no navegador embutido:
  - console limpo;
  - 375 px sem rolagem horizontal;
  - movimento reduzido respeitado.
  - Critério da spec §10: dá para dizer qual app é qual sem ver o logo. Registrar a impressão honesta no PR, mesmo que
    seja "ainda não".
- [ ] **Step 4: Montar o deck com a skill `html-slide-deck`** (motor v2).
  - Conteúdo: intenção, os quatro temas, o que é provisório e as duas decisões pendentes do João (acento e fonte do
    Trippo; ligar o claro em produção).
  - Publicar a tela-modelo e o deck como artifacts **privados** e dizer ao João que só ele abre até compartilhar.
- [ ] **Step 5: Commit** `docs(design-library): identidade por produto, tela-modelo e deck`

### Task 9: Contrato do repositório

**Files:**
- Modify: `AGENTS.md`, `README.md`

- [ ] **Step 1: Trocar no `AGENTS.md`** a frase "Do not add component implementations here; copy the established recipes
  from a consumer when a plugin needs a shared component." pela regra da spec §8:
  - o pacote raiz fica só com tokens;
  - componentes vivem em `packages/*` como `@gahmp1/ds-*`;
  - componente de domínio não entra.
  - Acrescentar também:
    - `tokens.css` e `defaults.json` são gerados por `npm run build -w @gahmp1/ds-theme` e não se editam à mão;
    - verificação = `npm run build && npm run check && npm test` mais os catálogos.
- [ ] **Step 2: Atualizar o `README.md`.**
  - O item 4 (copiar componentes do devAoCuboSocials) é apagado.
  - O item 5 passa a apontar para `packages/theme/src/legacy/devaocubo.ts` como lugar de mudar valores.
  - Nova seção curta "Pacotes `@gahmp1/ds-*`": o que existe nesta onda e que a publicação começa na onda 1.
- [ ] **Step 3: Verificar** `npm run build && npm run check && npm test && git diff --exit-code tokens.css defaults.json`.
- [ ] **Step 4: Commit** `docs: contrato do repositório com pacotes de componentes`

### Fechamento da onda

- [ ] **Relatório da onda com a skill `design-pdf`**, em `design-library/examples/identidades/relatorio-onda-0.html`.
  Conteúdo:
  - capturas dos catálogos;
  - resultado da checagem de contraste;
  - ajustes feitos nos temas provisórios;
  - o que não foi verificado.
- [ ] Abrir o PR de `feat/ds-onda-0` no Gahmp1/devaocubo-ds (gh com o `GH_TOKEN` da conta joaoGMPereira). Corpo:
  - capturas;
  - link dos artifacts privados;
  - a lista de desvios do spec;
  - a linha de atribuição.
  Merge só com OK do João.

---

## Próximos planos (um por onda, escritos quando a anterior fechar)

| Onda | Plano | Entrega |
|---|---|---|
| 1 | `ds-onda-1-componentes` | `ds-core`, `ds-native`, `ds-web` em três fatias (primitivos, composição e `motion`, AI-first); `ds-mcp` a partir do zenith-mcp; atualização das skills `design-*` para usar o DS; primeira publicação no GitHub Packages |
| 2 | `swfitness-migracao-ds` | SWFitness no DS por área; apaga Zenith, `tokens.json`, `typedTokens.ts`, zenith-mcp, gerador de tokens; build de loja pelo Makefile |
| 3 | `agent-chat-sobre-ds` | renderers como ligação; apaga `ChatTheme`; 0.4.0 |
| 4 | `trippo-migracao-ds` | identidade aprovada; mobile e web no DS |
| 5 | `somma-migracao-ds` | preset Tailwind 3; mobile e web no DS; apaga `@somma/ui` |
