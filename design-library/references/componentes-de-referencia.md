# Componentes de referência (onda 1 do devaocubo-ds)

Data: 2026-10-30. Pesquisa feita com a skill design-research para decidir, componente por componente da onda 1 (spec §11), em qual
site do catálogo (`examples/library/data.js`) nos basear, o que pegar e se o código pode ser aproveitado. Recriamos tudo na
identidade do SWFitness (lima `#B6FB2D` sobre `#0E0E11`, Gilroy/Outfit, pílula, hairline mais brilho, escuro primeiro) em RN
(StyleSheet, Reanimated 4, Skia 2.x só para GPU) e em React web (CSS próprio, Radix nos overlays, `motion` opcional). Pegamos
estrutura, estado, movimento e acabamento, nunca o visual.

Rótulos: **[F]** fato de fonte (página, README, LICENSE ou JSON do próprio projeto, lido nesta sessão; URL na ficha),
**[O]** observação de criador (opinião, com URL), **[I]** inferência nossa. Método: as páginas foram lidas por WebFetch, que
devolve resumo de ferramenta (pode omitir coisas: "não achei" vale como "a página lida não diz"); licenças foram lidas em
`raw.githubusercontent.com/<repo>/<ramo>/LICENSE` ou no campo `license` do npm/GitHub, e a ficha diz qual.

Regras de reaproveitamento: [F] as licenças MIT lidas exigem manter o aviso de copyright em cópias ou partes substanciais;
[I] por isso todo arquivo derivado leva um cabeçalho "Adaptado de <projeto> (MIT, © autor)" e o repositório ganha um
`NOTICE`. [I] Mesmo com MIT, nenhuma biblioteca abaixo é StyleSheet: a beUI Native usa Uniwind (classes Tailwind), as outras
são DOM/Tailwind. "Aproveitável" significa recriar olhando o código, não colar.

## Fichas

## beUI Native
- url: https://beui.dev/react-native (código https://github.com/starc007/beui-native; índice https://beui.dev/native/r)
- categoria: design systems
- movimento: forte
- licença: MIT (`LICENSE` do repositório, © 2026 beUI and Saurabh; npm `beui-native` 0.1.0 também MIT)
- estado: só link
- componentes: Button, IconButton, TextField, Toggle, Checkbox, Radio, Badge, Chip, Spinner, Shimmer, Reveal, NumberTicker, ScrollFade, Card, ListItem, Toast/Alert, Feedback, SegmentedControl, TabBar, Select, Menu, Dialog, WaitingOrb, WaitingState, StepList, StreamingText, MessageBubble, MessageList, Composer, ToolCallChip, ApprovalCard, ClarificationCard, Sources, RecordingBar
- o que pegar: [F] é o único achado em RN com Reanimated + Gesture Handler que cobre primitivos e blocos de IA; 38 componentes, "copie o código para o app", todos respeitam Reduce Motion do sistema. [F] `motion.ts` traz molas de partida: press 500/30/0.6, swap 460/30/0.55, layout 360/32/0.6, glide 700/50/0.5 (rigidez/amortecimento/massa), saída 160 ms e fade 150 ms com bezier (0.16, 1, 0.3, 1). [F] `voice-orb` usa Skia + Reanimated. [I] Riscos: v0.1.0, 10 estrelas e `pushed_at` de 2026-10-28 na API do GitHub (projeto novo); estilos em Uniwind; blocos grandes (approval-card ≈ 2.970 linhas em 18 arquivos) e pedem `react-native-screens`/`svg`/`worklets`: ler antes de adotar a estrutura.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research (README, LICENSE, `native/r`, lista de arquivos e dependências de 15 componentes e o código de `motion.ts`)

## beUI (web)
- url: https://beui.dev (código https://github.com/starc007/ui-components; llms.txt https://beui.dev/llms.txt)
- categoria: design systems
- movimento: forte
- licença: MIT (`LICENSE`, © 2026 Saurabh Chauhan); [F] a página diz que o "beUI Pro" tem licença paga separada: não usar blocos Pro
- estado: só link
- componentes: Sheet, Dialog, Toast, Menu, Select, SegmentedControl, TabBar, Stepper, Blur, Reveal, NumberTicker, BarChart, LineChart, Table, Checkbox, Toggle
- o que pegar: [F] Bottom Sheet com snap points e inércia, Drawer, Morphing Modal (a altura do painel morfa entre vistas, conteúdo com blur cross-fade), Animated Toast Stack (status morfa, swipe), Expandable Tabs, Adaptive Stepper, gráficos Line/Bar/Sparkline com mola. [F] pilha: Motion + Tailwind 4 + React 19, com reduced-motion em vários componentes.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Beautiful UI
- url: https://www.beautifului.dev/
- categoria: chat e interfaces de IA
- movimento: leve
- licença: MIT declarada na página, texto não exibido e sem repositório: a verificar (não copiar código)
- estado: só link
- componentes: WaitingState, StepList, StreamingText, ToolCallChip, ApprovalCard, ClarificationCard, Composer, Sources, Files, Table/DataList
- o que pegar: [F] lista de 21 blocos de IA com estados: Loading State (grade de pixels com shimmer e tempo decorrido), Thinking (rastro expansível), Streaming Text (fontes em linha, ações, sugestões), Approval Card (paginado "1/3", Skip/Continue), Tool Chips, Task Rows (rodando, falhou, concluída), Prompt Bar (@ fontes, / comandos, seletor de modelo, ditado), Context Cards (PDF, CSV). Sem durações nem easings na página.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research (página; sem repositório)

## Sort UI
- url: https://sortui.dev/ (código https://github.com/sortui/ui)
- categoria: design systems
- movimento: leve
- licença: MIT (`LICENSE` do repositório, © 2026 SortUI); [F] "Pro Access" ($199) é pago: não usar
- estado: só link
- componentes: TextField, TextArea, Skeleton, Spinner, ProgressBar, Divider, Tag, Badge, ListItem, DetailedListItem, Feedback (vazio), Table, Select, Menu, Dialog, Sheet, MessageList, Composer
- o que pegar: [F] 64 componentes sobre shadcn/Base UI, web: `Empty`, `Item`, `Field`, `Input Group`, `Usage Bar`, `Message Scroller`, `AI Chat Composer`, `AI Trace`. Serve de inventário de variantes e de nomes; o comportamento exige abrir o código.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research (página e LICENSE)

## Create UI
- url: https://createui.co/
- categoria: design systems
- movimento: nenhum
- licença: a verificar (a página linka um "License Agreement" não lido; planos pagos de 1 usuário): não copiar código
- estado: só link
- componentes: Tag, Chip, Badge, Stepper, Feedback, Sources, Files, Table, Menu, Select
- o que pegar: [F] inventário de 65+ componentes em React + Radix + Tailwind, com 950+ variáveis e 20+ temas. Grupos úteis como checklist de variantes: Indicators (Chips, Badge, Status Badge, Step Indicator), Feedback (Inline Alert, Toast, Banner), AI (Chat Source, Chat Attachment, Chat Tool, Text Shimmer).
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research (só a página)

## BoardUI
- url: https://www.boardui.com/ (código https://github.com/BoardUI/boardui)
- categoria: design systems
- movimento: leve
- licença: MIT para o repositório gratuito (`LICENSE`, © 2026 Mertcan Dundar Esmergul); planos pagos (€149 a €349) não entram
- estado: só link
- componentes: StatCard, CircularProgress, Table/DataList, Files, Composer, WaitingState
- o que pegar: [F] 103 componentes (19 gráficos) em React 19, Tailwind 4, React Aria, TanStack Table e Recharts: "Activity Rings Card", gráficos Radial/Earnings, Data Table, Composer Attachments, Agent Progress/Thinking. Estrutura de cartão de métrica e de tabela; sem RN.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Arc
- url: https://uiarc.dev/ (código https://github.com/kuratlielia/arc-library)
- categoria: design systems
- movimento: forte
- licença: MIT (`LICENSE`, © 2026 Elia Kuratli); [F] o README diz que os itens "Pro" não estão no repositório; Pro custa $249: não usar
- estado: só link
- componentes: Toast, Select, Menu, Dialog, SegmentedControl, Toggle
- o que pegar: [F] Toast stack que se abre em leque no hover, Morph select (o gatilho cresce até virar a lista, com type-ahead), Tabs com indicador deslizante, Switch tátil, Dropdown menu ancorado; reduced-motion declarado. Web apenas.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Bencho
- url: https://bencho.dev/ (código https://github.com/cabralorenzo/bencho; sons https://bencho.dev/sounds)
- categoria: design systems
- movimento: forte
- licença: MIT para o que está no repositório público (`LICENSE` lido em raw.githubusercontent.com/cabralorenzo/bencho/main/LICENSE, © 2026 Lorenzo Cabra); [F] o mesmo arquivo exclui o nome e a marca "Bencho", as fotos do site e material de terceiros (`THIRD_PARTY.md`: dois sons recriados de cuelume, MIT, © 2026 Daniel Belyi). [F] o README diz "44 blocks and 24 sounds, free" e aponta https://bencho.dev/pricing para o "Pro" (130+ sons a mais, camadas, download em WAV); o site lista ≈150 blocos, então os que não estão em `blocks/` são, pelo que vimos, do Pro: preço e termos do Pro **a verificar** (a página de preços e a de licença do site são SPA e não abriram por WebFetch; a de licença só é citada em https://bencho.dev/llms.txt como "MIT")
- estado: só link
- componentes: Pull to refresh (`blocks/pull`, cartão de saldo), Slide to confirm, Like, Toast stack, Rolling counter, Voice note, Dynamic island; (lista completa do repositório em `blocks/`)
- o que pegar: [F] vocabulário de ≈150 blocos por gesto. [F] `blocks/pull/Balance.tsx` decide o compromisso numa DISTÂNCIA, não ao soltar (cruzar o limiar é o momento do "pegou"), limiar de 80 px reduzido depois no código, mola que acomoda e leitura de `prefers-reduced-motion`; o bloco do repositório não toca som nem vibra. [F] `sounds/sounds.ts`: 24 sons sintetizados em Web Audio, sem arquivo; cada nota é osciladora ou ruído filtrado + passa-baixa + envelope (ataque ≥ 1 ms para não estalar); pico por nota entre ≈0,003 e 0,07; duração típica 20 a 600 ms; `play(nome, {volume, pitch})` cria um `AudioContext` preguiçoso e chama `resume()`. [F] não tem mudo, opt-in nem leitura de preferências: isso é nosso. Detalhes de padrão em `som-e-haptics.md`.
- exemplo local: examples/feedback-sensorial (recriado do zero, sem copiar os sons)
- verificado em: 2026-10-30, design-research

## Pulsar (Software Mansion)
- url: https://docs.swmansion.com/pulsar/ (código https://github.com/software-mansion/pulsar)
- categoria: design systems
- movimento: nenhum (haptics)
- licença: MIT (`LICENSE` do repositório lido, © 2025 Krzysztof Piaskowy; API do GitHub: `mit`; npm `react-native-pulsar` 1.7.0 e `pulsar-haptics` 0.2.0, ambos `MIT` no registro; README: "Pulsar library is licensed under The MIT License"). [F] preço de Pulsar Studio, do app para celular e do plugin do Figma: **a verificar** (as páginas lidas não dizem). A suposição do dono ("deve ser pago") não se confirma para a biblioteca.
- estado: só link
- componentes: nenhum visual; presets e compositores de haptics
- o que pegar: [F] presets nomeados e chamáveis: nativo `Presets.System.impactMedium()`, `notificationSuccess`, `selection`, mais padrões próprios (`hammer`, `dogBark`, `buzz`, `pulse`, `Fanfare`, `Heartbeat`); web (`pulsar-haptics`): 45 visíveis (alarm, alert, bounce, doubleTap, heartbeat, longPress, reject, ripple, softTap, tap, tripleTap, timeout, trill...) e 37 escondidos. [F] três modos: `Presets`, `usePatternComposer` (segmentos `continuous`/`pulse`/`line`) e `useRealtimeComposer` (`set(amplitude, frequency)` em tempo real, bom para gesto e voz). [F] `useAdaptiveHaptics` escolhe config por plataforma; `Settings` tem `enableHaptics`, `enableSound`, `getHapticsSupportLevel`. [F] RN exige Nova Arquitetura, RN 0.71+ e `react-native-worklets` (Reanimated 4 já depende dele: [I]); no Expo, `npx expo install react-native-pulsar` mais prebuild (não roda no Expo Go: [I]). [F] web usa `navigator.vibrate` e simula intensidade por PWM; no iOS/iPadOS Safari não vibra ("Apple does not implement the Web Vibration API in Safari"). [I] não adotar agora: `expo-haptics` cobre impacto, notificação e seleção; Pulsar vale se quisermos padrões próprios ou háptico realtime ligado à voz. Guia: https://docs.swmansion.com/pulsar/sdk/react-native/ e /sdk/web/.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Sonner e sonner-native
- url: https://sonner.emilkowal.ski/ (https://github.com/emilkowalski/sonner; RN: https://github.com/gunnartorfis/sonner-native)
- categoria: design systems
- movimento: leve
- licença: MIT (`LICENSE.md` do Sonner, © 2023 Emil Kowalski; sonner-native: `LICENSE` © 2025 Gunnar Torfi Steinarsson e campo npm `MIT`)
- estado: só link
- componentes: Toast
- o que pegar: [F] tipos (default, success, info, warning, error, action, promise, custom), 6 posições (direção do swipe muda com a posição), `visibleToasts`, `expand`, modo headless. [F] a página não descreve empilhamento, duração nem animação: ler o código. [F] sonner-native 0.27.0 declara peers Reanimated ^4.1.1, Gesture Handler, SVG, screens e safe-area-context.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## NumberFlow
- url: https://number-flow.barvian.me/ (https://github.com/barvian/number-flow)
- categoria: tipografia e movimento
- movimento: leve
- licença: MIT (`LICENSE.md`, © 2024 Maxwell Barvian)
- estado: só link
- componentes: NumberTicker, Metric
- o que pegar: [F] `trend` (dígitos sobem/descem conforme variam), `spinTiming`/`transformTiming`/`opacityTiming` separados, `format` por `Intl.NumberFormat`, `tabular-nums`, `respectMotionPreference` ligado por padrão. [F] só web (React); a página não cita RN. [F] porte `rn-number-flow` 0.1.6 (MIT) tem última atualização em 2024-11 no npm: não usar.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Liveline e react-native-livechart
- url: https://benji.org/liveline (npm `liveline`); RN: https://github.com/brandtnewlabs/react-native-livechart
- categoria: dataviz
- movimento: forte
- licença: `liveline` MIT só pelo campo do npm (0.0.7; LICENSE do repositório não lido, e o Toolfolio o lista como "Pago"): a verificar; `react-native-livechart` 4.30.0 MIT (npm e selo do README)
- estado: só link
- componentes: LineChart, Metric
- o que pegar: [F] gráfico ao vivo em um `<canvas>`: interpolação entre pontos, momentum na ponta, crosshair com tooltip (`scrub`), valor grande tingido pela direção, estado `loading` (linha que "respira"), `paused`, `emptyText`, janelas de tempo. [F] o porte RN usa Skia ≥2.6.0 + Reanimated ≥4 + Gesture Handler, com dados em SharedValues: casa com a nossa pilha.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## audiocn
- url: https://www.audiocn.dev/ (código https://github.com/audiocn/ui)
- categoria: design systems
- movimento: leve
- licença: MIT (`license.md`, © 2026 OrcDev; há `THIRD_PARTY_NOTICES.md` de um componente adaptado)
- estado: só link
- componentes: RecordingBar
- o que pegar: [F] 25 componentes de áudio em React/shadcn: Live waveform, Bar visualizer, Level meters, Spectrum, Audio player. Estrutura da barra de gravação (forma de onda ao vivo + medidor), web apenas.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## libraries.dev (border-beam, thinking-orbs, voice-glow, voice-ring)
- url: https://libraries.dev (código https://github.com/Jakubantalik/Libraries.dev, `packages/*`)
- categoria: orbes e loaders de IA
- movimento: forte
- licença: MIT (`LICENSE` de `border-beam`, `thinking-orbs`, `voice-glow` e `voice-ring`, © 2026 Jakub Antalik, lidos um a um); os modelos de ML (Magnet, VoiceDirection) não foram lidos
- estado: só link
- componentes: Glow, GlowBorder, GlowScene, WaitingOrb, RecordingBar
- o que pegar: [F] `border-beam`: tipos `rotate` (md/sm/line) e `pulse` (inner/outside), `strength` 0–1, `theme`, `active` com fade de entrada e saída, detecta o `border-radius` do filho; `pulse-outside` exige filho opaco e usa o próprio hairline de 1 px. [F] `voice-glow`: três camadas (traço da borda, luz interna, bloom desfocado) cuja altura segue a voz; é o "irmão" do tipo `line`. [F] `border-beam/ports` tem `ios` e `react-native`; arquitetura RN já descrita em `orbes-e-loaders-de-ia.md`. [F] `voice-glow` 0.3.0 (npm, MIT, atualizado em 2026-10-05; página https://libraries.dev/voice): React 18+ sem dependências, SwiftUI (`VoiceGlowKit`, iOS 17+), **React Native "Coming soon"**; nível 0–1 por `stream` (MediaStream) ou `level` (número ou getter por quadro); ganho `sensitivity`, porta `threshold`, envelope `attack`/`release`; forma `reach`, `spread`, `flow`, `bend`, `bands`; oito paletas e `colors` (até 7 lóbulos). O estado "processing" (feixe varrendo) é do **Libraries Pro** e o preço não consta na página: a verificar. Detalhes em `orbes-e-loaders-de-ia.md`.
- exemplo local: examples/lab-apps, examples/lab-swfitness
- verificado em: 2026-10-30, design-research

## Thinking Orbs (thinkingorbs.com)
- url: https://thinkingorbs.com (código https://github.com/yogesharc/thinking-orbs)
- categoria: orbes e loaders de IA
- movimento: forte
- licença: MIT (`LICENSE`, © 2026 Yogesh)
- estado: só link
- componentes: WaitingOrb, WaitingState
- o que pegar: [F] vocabulário de estados: idle, reasoning, searching, working, background tasks, retrying, compacting, waiting, browser/computer use; props `label` (leitor de tela) e `paused`; 3,8 KB gzip, sem dependências. A página não cita reduced-motion e não há RN.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Generative Loaders
- url: https://generativeloaders.com/ (código https://github.com/kasturikhanke/generative-loaders)
- categoria: chat e interfaces de IA
- movimento: forte
- licença: MIT (`LICENSE`, © 2026 Kasturi Khanke and Generative Loaders contributors)
- estado: só link
- componentes: StreamingText, Skeleton
- o que pegar: [F] 16 loaders de texto (Decode, Typewriter, Skeleton, Cascade, Wipe, Redact, Line by line, Terminal...), React/DOM. Vocabulário de entrada de texto; a página não descreve duração nem tecnologia.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Colorion Text Effects
- url: https://text-effects.colorion.co/
- categoria: tipografia e movimento
- movimento: leve
- licença: MIT declarada na página; repositório não achado, texto não lido: a verificar
- estado: só link
- componentes: Shimmer (web)
- o que pegar: [F] efeitos só em CSS, sem JavaScript, com `prefers-reduced-motion`; há "Ghostwrite Shimmer" (rótulo THINKING) e "Soft Blur Glow". [I] copiar só a ideia (gradiente de máscara animado), escrever o CSS nosso.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Invisible Details
- url: https://invisibledetails.com/
- categoria: design systems
- movimento: nenhum
- licença: proprietária (curso pago, $145 pagamento único; autor Dmytro): só leitura, nada de código
- estado: só link
- componentes: Stepper, Toast, Button, Dialog (como roteiro de acabamento)
- o que pegar: [O] curso do criador (opinião): notas sobre estados, entrada tolerante, "o peso de um clique", teclado, alinhamento óptico (margens de 6 a 12 px comparadas) e dissecações de Stepper, Tree, modal de ação, gráficos e date picker. Não traz números que possamos citar.
- exemplo local: nenhum
- verificado em: 2026-10-30, design-research

## Componente → referência

Legenda da coluna de código: **sim** = sim com atribuição (MIT/Apache lido), recriar e citar; **não**; **a verificar**. "beUI N" = beUI Native; "beUI W" = beUI web. Cada "o que pegar" é [F] da ficha, salvo marca [I].

| Componente | Site(s) base | O que pegar | Código? | Muda na identidade SWFitness |
|---|---|---|---|---|
| Text | nenhuma; Zenith é a base | tipografia é do tema (Gilroy/Outfit) | não | n/a |
| Button | beUI N, beUI W | mola de press 500/30/0.6 e variante com estado (carregando/sucesso) | sim | pílula lima, texto escuro; sem ripple [I] |
| IconButton | beUI N | mesmo Button com ícone; alvo de toque ≥44 pt [I] | sim | círculo em hairline; lima só no estado ativo |
| TextField | beUI N (Input), Sort UI (Field, Input Group) | erro com shake, anel de foco, check desenhado no sucesso; rótulo e ajuda como grupo | sim | anel de foco = hairline brilhante lima, fundo `#0E0E11` elevado |
| TextArea | beUI N (Input), Sort UI | mesmo estado do TextField com altura que cresce [I] | sim | igual ao TextField, raio menor que a pílula |
| Toggle | beUI N (Switch), Arc (Switch) | polegar com peso que achata e estica; press com mola | sim | trilho lima ligado, hairline desligado |
| Checkbox | beUI N (Checkbox) | marca que se desenha sozinha (traço animado) | sim | caixa arredondada, marca escura sobre lima |
| Radio | beUI N (Radio) | um único ponto desliza até a opção escolhida | sim | ponto lima, aro hairline |
| Tag | Create UI, Sort UI (só variantes) | inventário de variantes de status | não (Create UI a verificar) | pílula pequena, contorno hairline |
| Chip/FilterChip | beUI N (Expandable Control, Multi Select), Beautiful UI (filtro ao vivo) | chip que abre para mostrar mais; opções viram chips removíveis; chip filtra a lista na hora | sim (beUI N); Beautiful UI a verificar | selecionado = preenchido lima, não selecionado = hairline |
| Badge | beUI N (Animated Badge) | pílula de status cujo ícone e rótulo "rolam" ao trocar | sim | lima só para "ativo/ok"; erro/aviso com tons do tema |
| Divider | nenhuma; Zenith é a base | hairline é identidade nossa | não | hairline com brilho opcional |
| Stack/Box | nenhuma; Zenith é a base | layout é do tema | não | n/a |
| Spinner | beUI N (Loader), Bencho (só nomes) | 17 indicadores de uma prop `size`; no web, reduced-motion troca transformação por pulso de opacidade | sim (beUI N) | um ou dois indicadores em lima; resto descartado |
| Skeleton | nenhuma; Zenith é a base | shimmer vem do Shimmer abaixo; Bencho "Skeleton morph" só como ideia | não (Bencho a verificar) | bloco em cinza do tema + varredura lima fraca |
| ProgressBar | nenhuma; Zenith é a base | Sort UI "Usage Bar" só como nome de variante | não | trilho hairline, preenchimento lima |
| Glow | libraries.dev (border-beam `pulse-outside`, voice-glow) | halo em três camadas (traço, luz interna, bloom) e `strength` 0–1 | sim | lima monocromático; as paletas coloridas da fonte não entram |
| GlowScene | nenhuma; Zenith é a base | cena de brilho de fundo: usar a mesma receita de 3 camadas do Glow [I] | não | um único foco lima, baixa opacidade |
| GlowBorder | libraries.dev (border-beam `rotate`/`pulse`) | brilho viajante por ângulo mais bloom; `active` com fade; herda o raio do filho | sim (porte RN é beta v0.1.0, só iOS verificado) | lima, `mono`; para quando a lista rola |
| Blur | beUI W (Action Swap, Morphing Modal) | cross-fade com blur na troca de conteúdo | sim (só web) | blur curto, no máximo em overlays |
| Shimmer | beUI N (text-shimmer, thinking-shimmer), Colorion | varredura sobre texto/bloco; no RN já em Reanimated | sim (beUI N); Colorion a verificar | varredura lima com baixa opacidade |
| Reveal | beUI N (text-animation, rise-in) | revelação, varredura, cascata de texto; linhas que "sobem" do canto | sim | uma só entrada padrão (subida curta), sem scramble |
| Celebration | nenhuma; Zenith é a base | Bencho lista "Confetti", sem descrição nem licença | não | confete só em lima/branco, uma vez por conquista [I] |
| NumberTicker | beUI N (number-ticker, Reanimated puro), NumberFlow (web) | dígitos que rolam com `trend`; `tabular-nums`; respeitar movimento reduzido | sim (beUI N e NumberFlow, MIT) | Gilroy tabular, cor do texto, lima só em recorde |
| ScrollFade | beUI N (`fade-edge.tsx` no message-scroller) | máscara de esmaecimento na borda da rolagem [I: li só o nome do arquivo] | sim, após ler | gradiente de `#0E0E11`, nunca branco |
| Card | beUI N (Card) | superfície composável, selecionável, com press | sim | hairline + brilho, raio grande, sem sombra |
| ListItem | Sort UI (`Item`), beUI N (Swipeable List) | linha com swipe para revelar ações | sim (Sort UI, beUI N) | linha com hairline entre itens |
| DetailedListItem | Sort UI (`Item`), Create UI (só nomes) | linha com título, descrição, mídia e ação [I] | sim (Sort UI) | trailing em pílula |
| Sheet | beUI W (Bottom Sheet, Drawer) | snap points, arrasto com inércia, trava de rolagem, Esc | sim (só web); RN: nenhuma; Zenith é a base | alça fina, fundo elevado com hairline superior |
| Dialog | beUI N (Morphing Modal), Arc (Dialog) | cartão que muda de tamanho entre vistas com mola | sim | Radix no web; raio grande, botões em pílula |
| Toast | Sonner, sonner-native, Arc, beUI W (Toast Stack) | tipos, posições, swipe, leque no hover, status que morfa | sim (Sonner, sonner-native, Arc, beUI W) | pílula escura com hairline; lima só no sucesso |
| Feedback (vazio, sucesso, erro) | beUI N (Alert, Input check), Sort UI (`Empty`) | alerta que entra suave e dobra; check desenhado; estado vazio como componente | sim | ilustração mínima em hairline + lima |
| Screen/Page | nenhuma; Zenith é a base | estrutura é nossa | não | fundo `#0E0E11`, escuro primeiro |
| HeaderTitle | nenhuma; Zenith é a base | título grande que colapsa no scroll é do nosso kit | não | Gilroy pesado, caixa alta curta |
| SegmentedControl | beUI N (Tabs), Arc (Tabs) | pílula/segmento com indicador deslizante (mola layout 360/32/0.6) | sim | pílula lima deslizante sob texto escuro |
| Stepper | beUI W (Adaptive Stepper), Create UI (Step Indicator, Input Stepper), Invisible Details (aula) | [I] o pedido não diz se é de passos ou numérico: passos = indicador; numérico = botões +/− com NumberTicker | sim (beUI W); Create UI a verificar | pílulas pequenas; número em tabular |
| StatCard | BoardUI (Activity Rings Card), beUI W (Sparkline) | cartão com métrica, delta e minigráfico | sim (BoardUI, beUI W, só estrutura) | valor grande, delta em lima ou tom de erro |
| TabBar | beUI N (Tabs), beUI W (Expandable Tabs, Dock), Bencho (só nome) | aba ativa vira pílula com rótulo; indicador desliza | sim | pílula lima ativa, demais só ícone |
| CircularProgress | BoardUI (Radial, Activity Rings) | anéis e radial como estrutura; RN desenhado em Skia/SVG [I] | sim (só estrutura) | anel lima sobre trilho hairline |
| BarChart | beUI W (Bar Chart), BoardUI | barras que animam com mola e morfam entre dados; RN: nenhuma; Zenith é a base | sim (só web) | barras lima, eixo hairline, sem grade pesada |
| LineChart | react-native-livechart, Liveline, beUI W (Line Chart) | ao vivo: interpolação, crosshair, valor tingido, linha que respira em `loading`, `emptyText` | sim (livechart MIT); Liveline a verificar | linha lima, área com gradiente fraco |
| Table/DataList | BoardUI (Data Table, TanStack), Sort UI, Beautiful UI (Records/Filter Table), beUI W (Table) | ordenação, filtro por chips, colunas; DataList RN: nenhuma; Zenith é a base | sim (BoardUI, Sort UI, beUI W) | cabeçalho hairline, linhas sem zebra |
| Metric | NumberFlow, Liveline (`showValue`) | número grande tabular que anima; tingir pela direção | sim (NumberFlow); Liveline a verificar | Gilroy extrabold, lima só em melhora |
| Select | beUI N (Select, Multi Select), Arc (Morph select) | painel que se desdobra do próprio gatilho; busca e chips; type-ahead no web | sim | Radix Select no web; gatilho em pílula |
| Menu | beUI N (Menu), beUI W (Bloom Menu), Arc (Dropdown) | menu "pull-down" com submenus por arrasto; itens em cascata | sim | itens com hairline, ícone lima no ativo |
| WaitingOrb | libraries.dev (thinking-orbs, Skia), thinkingorbs.com, beUI N (voice-orb) | orbe de pontos com 9 estados; esfera líquida com Skia; `label` e `paused` | sim (todos MIT) | lima sobre o escuro; sem paleta multicolor |
| WaitingState | beUI N (loading-states), Beautiful UI (Loading State), thinkingorbs.com | shimmer, texto de raciocínio que alterna, tempo decorrido; nomes de estado | sim (beUI N); Beautiful UI a verificar | rótulos em português do SWFitness |
| StepList | beUI N (agent-activity, todo-list), Beautiful UI (Task Rows, Thinking) | log vivo de passos/buscas/ferramentas; marca que morfa ao concluir; rodando/falhou/concluída | sim (beUI N) | ícones de passo em hairline, concluído em lima |
| StreamingText | beUI N (streaming-response, code-block), Beautiful UI (Streaming Text), Generative Loaders | resposta que entra em fluxo e "assenta" com ações; fontes em linha | sim (beUI N, Generative Loaders) | sem cursor piscante forte; fonte do corpo |
| MessageBubble | beUI N (message-bubble, message) | seis superfícies que "saem" do canto, "ver mais", avatar e pontos de digitando | sim | balão do usuário em lima, do assistente em hairline |
| MessageList | beUI N (message-scroller), Sort UI (Message Scroller) | segue a saída nova e solta quando o usuário rola para cima | sim (beUI N) | botão "ir ao fim" em pílula |
| Composer | beUI N (prompt-input), Beautiful UI (Prompt Bar), Sort UI, BoardUI | anexos, voz, parar; @ fontes, / comandos, seletor de modelo | sim (beUI N); Beautiful UI a verificar | campo em pílula, enviar em lima |
| ToolCallChip | beUI N (agent-activity, tool-result), Beautiful UI (Tool Chips) | chip compacto que expande para o resultado em fluxo | sim (beUI N) | chip hairline com ponto lima ao rodar |
| ApprovalCard | beUI N (approval-card, tool-approval), Beautiful UI (Approval Card) | revisar/aprovar; "segurar para permitir" executar ferramenta | sim (beUI N) | segurar preenche em lima |
| ClarificationCard | beUI N (approval-card em modo perguntas), Beautiful UI (paginado 1/3) | perguntas deslizáveis com Skip/Continue | sim (beUI N) | opções em pílula |
| Sources | beUI N (citations), Beautiful UI (Context Cards), Create UI (Chat Source) | toque no número e a fonte "salta"; cartões com arquivo de origem | sim (beUI N) | números em pílula hairline |
| Files | Create UI (Chat Attachment), BoardUI (Composer Attachments), Beautiful UI (Context Cards PDF/CSV) | chip de arquivo com tipo, tamanho e remover; só nomes de bloco, sem código lido | não (Create UI e Beautiful UI a verificar; BoardUI só estrutura) | ícone de tipo em hairline |
| RecordingBar | audiocn (Live waveform, Level meters), libraries.dev (voice-glow, voice-ring), beUI N (voice-orb, prompt-input) | barra com forma de onda ao vivo e medidor; brilho que sobe com a voz | sim (audiocn só web; voice-glow; beUI N) | onda e brilho em lima, botão parar em pílula |

## Não usar

- **React Bits** (https://reactbits.dev/): [F] `LICENSE.md` do repositório é "MIT + Commons Clause" e proíbe vender, sublicenciar ou redistribuir os componentes, "sozinhos, em pacote ou portados". Um DS que recria e distribui é exatamente o caso proibido. Não copiar, nem portar.
- **Rare UI** (https://www.rareui.com/): [F] o `LICENSE` de swamimalode07/rare-ui abre com "MIT + Commons Clause License Condition v1.0 + Attribution". Mesma restrição. (A API do GitHub apresentou "MIT" para outro repositório de nome parecido; ignorar.)
- **Canvas UI** (https://canvasui.dev/): [F] a FAQ da própria página diz "MIT + Commons Clause"; além disso depende de HTML-in-Canvas experimental, atrás de flag no Chrome. Fora por licença e maturidade.
- **Create UI** e **Invisible Details**: licenças pagas ou não lidas; ficam como inventário e como leitura, sem código.
- **Beautiful UI** e **23rd** (https://23rd.dev/): sem texto de licença lido (23rd: nem `LICENSE` nem campo no GitHub; a página só mostra shaders e "Live Orb WebGL"). Só vocabulário, nenhum código.
- **Bencho Pro** (blocos e sons fora do repositório público) e **Libraries Pro** (estado "processing" do voice-glow): licença e preço a verificar; Bencho free (repositório MIT) saiu desta lista em 2026-10-30.
- **Evil Buttons** (https://www.evilbuttons.com/): [F] Apache-2.0 (`LICENSE` lido), mas a página só lista botões de efeito (Ash Burst, Minecraft) sem descrever comportamento: qualidade baixa para um DS sóbrio.
- **Toolcraft** (https://toolcraft.sh/): [F] MIT (`LICENSE.md`), mas é kit de apps de design com IA (sliders, camadas, timeline); fora da lista da onda 1.
- **Input OTP** (https://input-otp.rodz.dev/): [F] MIT, ótimo padrão (um input real sob slots, `autocomplete="one-time-code"`), mas OTP não é componente da onda 1.
- **rn-number-flow**: [F] MIT, porém 0.1.6 sem atualização desde 2024-11 no npm: usar o ticker do beUI N.
- **Originkit** e **Stylokit**: Originkit abriu só com o título (sem componentes, licença nem repositório); Stylokit vende templates Framer. Descartados.

## O que não foi aberto
`orbs.jakubantalik.com` e `beam.jakubantalik.com` (esta só diz que a biblioteca mudou para `libraries.dev/beam`; foi lido o README no repositório). Docs de Skia, Reanimated e Radix não foram reabertos aqui: valem os registros de `motion-e-video.md`.
`bencho.dev/pricing` e `bencho.dev/license` (SPA, o WebFetch devolveu só a navegação); páginas de preço do Libraries Pro e do Pulsar Studio; HIG do Apple "Playing haptics" e "Playing audio" foram lidas pelo JSON público do site de documentação, não pelo HTML.
