# devaocubo-ds Onda 1: inventário do Zenith (fonte de especificação)

Fonte: `Gahmp1/swfitness` em `origin/main` (commit 1ec0c836), pasta `apps/mobile/src/components/zenith/`. Leitura feita por
`git archive`, sem checkout. Caminhos abaixo são relativos a essa pasta, salvo quando começam em `screens/`
(`apps/mobile/src/screens/Conversation/`). Tudo o que está aqui foi lido no código; medidas "(derivado)" são soma de
valores lidos, não constantes do código. Stories e mdx não foram usados.

## 1. Fatos que valem para todos os componentes

- **Tema é estático em tempo de módulo.** Todo componente faz `import tokens from '../../typedTokens'` e consome
  `tokens.colors.*` dentro de `StyleSheet.create` no escopo do módulo (e `DSText` monta `COLOR_MAP` no módulo). Nada lê
  tema por contexto. Recriar com tema em runtime exige trocar todos os `StyleSheet.create` por fábrica de estilo
  dependente de hook.
- **Tokens só dark** (`tokens.json`, `_meta.theme: "dark"`). Chaves de cor usadas: `background, card, overlay, muted,
  foreground, mutedForeground, subtleForeground, faintForeground, foregroundInverse, primary, destructive, warning,
  caution, success, emptyState, border, borderMuted, feedbackIconBg (rgba), colorNone (transparent)`. Espaçamento:
  `none 0, xxs 4, xs 8, sm 12, md 16, lg 20, xl 24, xxl 28, xxxl 32, huge 40, safeArea 64, tabbar 112`. Raio: `sm 8, md 16,
  lg 20, xl 24, xxl 40, full 9999`. Borda: `hairline 0.4, thin 1, thick 2`. Constantes: `disabledOpacity 0.3, tapOpacity
  0.3, buttonSm 44, buttonMd 48, buttonLg 56, touchTargetLg 64, selectorFieldHeight 72`.
- **Tipografia** (Gilroy 400/500; no Android `typedTokens.ts` troca para `Gilroy-Regular`/`Gilroy-Medium` com
  `fontWeight: 'normal'`; peso sem arquivo cai em `Gilroy-SemiBold`): `xs 12/16, sm 14/16, base 16/20, lg 20/24, xl 24/28,
  display 44/56`, cada um com variante `*Medium` (500). Todo `DSText` usa `includeFontPadding: false`.
- **Cor hex-only.** `hexToRgb`/`lerpColor` (Toggle.tsx, hooks/useTextFieldAnimation.ts) e `hexToRgba` (DSButton.tsx,
  BarChart.tsx, LineChart.tsx, ConsistencyDots.tsx) fazem `parseInt` de `#RRGGBB`. Um tema com `rgba()`/`hsl()`/
  `transparent` nessas cores quebra. `interpolateColor` do Reanimated é evitado de propósito porque "não está
  disponível no bundle web" (comentário em Toggle e useTextFieldAnimation).
- **Valores fora de token (hard-coded):** checkbox 20/14/6 e gap 10; radio 20/12; toggle 50x30/26 e 40x20/16; shimmer
  148/88/242x24/52; sombra do thumb `#000` 0.25; `Tag` success/warning/critical em `rgba(...,0.15)` literais;
  hexes do spinner (`#d8f45b #26705c #0f4a21 #333336 #1c1c1f #000000`) e dos presets do GlowScene (`#070E09`, `#05813B`,
  `#26705C`, `#3D6B34`, `#7C9558`, `#0f4a21`, `#08100C`, `#4CA868`, `#7C9B5A`); configs de camada do Blur; chevron
  `fontSize 10`; Feedback `56`, `28`, `fontWeight 600`; BottomSheet `500` (translateY), `64`, `36x4`, `20` (glifo).
- **Telemetria em todo interativo:** `internal/useTrackedPress.ts` + `internal/emitButtonClicked.ts` +
  `internal/trackingProps.ts` (`DSTrackingProps.analyticsId`). Importam
  `../../../services/analytics/useAnalytics`, `../../../services/analytics/resolveElementId` e
  `../templates/Screen/ScreenContext` (`useScreenName`). Componentes que estendem `DSTrackingProps`: DSButton,
  IconButton, FilterChip, Card, ListItem, DetailedListItem, BlurPress, SheetRow, RightNavigationButton, Trackable.
- **i18n:** só 5 chaves no Zenith (`react-i18next`): `components.spinner.loading`, `components.textField.clear`,
  `components.textField.hidePassword`, `components.textField.showPassword`, `components.tipCallout.close`, todas com
  `defaultValue` em PT. Fora isso, textos vêm por prop, mas há strings PT/EN fixas (listadas por componente).
- **Pressed padrão:** `hooks/usePressAnimation.ts` (opacidade 1 -> 0.3 em 200 ms `Easing.inOut(Easing.ease)`, volta em
  200 ms; `disabled` bloqueia só o press-in). Quase todo pressável o aplica.
- **Ícones:** `icons.ts` (`DS_ICONS: Record<string,{path,mode:'stroke'|'fill'}>`, 124 linhas, viewBox 24, stroke 2) e
  `organisms/DynamicImage/DynamicImage.tsx` (83 linhas; `size` small 16 / medium 24 / large 32; `source` que começa com
  `https://` vira `<Image>`; chave desconhecida cai em `DS_ICONS.placeholder`). Muitos componentes dependem deles.
- **Dependências nativas:** `react-native-reanimated`, `react-native-svg`, `@shopify/react-native-skia` (só Spinner),
  `react-native-safe-area-context` (Toast, Feedback, Screen, ContentPageScaffold), assets PNG
  `apps/mobile/assets/images/glow-radial.png` (+@2x/@3x) e `glow-dither.png` (Blur, GlowScene).

## 2. Tabela-resumo

Linhas = linhas do arquivo principal em `origin/main`. "Acoplamentos" = o que impede copiar como está.

| Componente (DS) | Arquivo | Linhas | Acoplamentos | Observação |
|---|---|---|---|---|
| Text | atoms/DSText/DSText.tsx | 236 | tokens estáticos; modo markdown legado iOS | 12 variantes x 11 cores; modo `text=` é formato de conteúdo do backend |
| Button | atoms/DSButton/DSButton.tsx (+types.ts) | 251 | useTrackedPress, Spinner (Skia), DSText | 11 variantes; label PT = `title` |
| IconButton | atoms/IconButton/IconButton.tsx | 100 | useTrackedPress, DynamicImage, DS_ICONS | sem fallback de `accessibilityLabel` |
| TextField | atoms/TextField/TextField.tsx (+hooks/useTextFieldAnimation.ts) | 356 + 86 | react-i18next, DynamicImage | 2 layouts (underline, selectorCustom); sem multiline |
| TextArea | não existe | - | - | só `TextInput multiline` cru em molecules/ChatInput |
| Toggle | atoms/Toggle/Toggle.tsx | 170 | nenhum além de tokens | lerp de cor hex duplicado |
| Checkbox | atoms/CheckBox/CheckBox.tsx (+hooks/useKeyframeBounce.ts) | 104 + 30 | nenhum | geometria toda fixa |
| Radio | atoms/RadioButton/RadioButton.tsx | 111 | nenhum | mesmo bounce do checkbox |
| Tag | atoms/Tag/Tag.tsx | 95 | nenhum | 3 cores com rgba literal |
| Chip / FilterChip | molecules/FilterChip/FilterChip.tsx | 110 | useTrackedPress, DS_ICONS, DSText | sem removível, sem `accessibilityState` |
| Badge | não existe genérico | - | - | Difficulty/Mechanics/Laterality/MuscleTag são wrappers de Tag (domínio) |
| Divider | atoms/Divider/Divider.tsx | 36 | nenhum | só horizontal |
| Stack / Box | molecules/Stack/Stack.tsx, atoms/Box/Box.tsx | 58 / 49 | nenhum | props tipadas por `SpacingToken` |
| Spinner | atoms/Spinner/Spinner.tsx + fluidSpinnerShader.ts | 104 + 88 | react-i18next, Skia | shader SkSL; paleta hex fixa |
| Skeleton (Shimmer) | molecules/Shimmer/Shimmer.tsx | 112 | nenhum | pulso de opacidade, não varredura; presets de domínio |
| ProgressBar (IndeterminateBar) | atoms/IndeterminateBar/IndeterminateBar.tsx | 103 | nenhum | só indeterminada; label PT fixa |
| Glow (Blur) | molecules/Blur/Blur.tsx | 230 | PNG `glow-radial.png` (require relativo) | web usa CSS blur, nativo usa textura |
| GlowScene | molecules/GlowScene/GlowScene.tsx | 161 | PNGs glow-radial e glow-dither | 3 presets com hex literal |
| GlowBorder | não existe | - | - | - |
| Shimmer (movimento) | = Shimmer acima | - | - | ver Skeleton |
| Reveal | não existe | - | - | `HorizontalRevealProgress` é cortina de timer, outra coisa |
| Celebration (SuccessBackground) | molecules/SuccessBackground/SuccessBackground.tsx | 15 | GlowScene | só fundo estático; sem confete nem animação |
| NumberTicker | não existe | - | - | - |
| ScrollFade | molecules/ScrollFadeOverlay/ScrollFadeOverlay.tsx | 153 | ScrollVisibilityContext (do DSScrollView) | 24 fatias de View; `useFooterHeight` junto |
| Card | molecules/Card/Card.tsx | 158 | useTrackedPress | 4 tipos |
| ListItem | molecules/ListItem/ListItem.tsx | 159 | useTrackedPress, Shimmer, CircularProgress, DynamicImage | |
| DetailedListItem | molecules/DetailedListItem/DetailedListItem.tsx | 146 | useTrackedPress, Shimmer, CircularProgress | sem role no Pressable |
| Sheet (BottomSheet) | organisms/BottomSheet/BottomSheet.tsx | 258 | DS_ICONS | PanResponder, Modal |
| Dialog | não existe | - | - | confirmações são BottomSheet no app |
| Toast | organisms/Toast/Toast.tsx | 139 | safe-area-context, StatusBar | 1 toast, sem fila |
| Feedback | organisms/Feedback/Feedback.tsx | 221 | DSButton, safe-area-context | tela inteira, não inline |
| Screen / Page | templates/Screen/Screen.tsx (+DSScrollView, DSFlatList, 3 contextos) | 116 (+244) | analytics (3 arquivos), safe-area-context | scroll_depth e view_viewed embutidos |
| HeaderTitle | molecules/HeaderTitle/HeaderTitle.tsx | 107 | Shimmer, usePressAnimation | props legadas `actionIcon/onActionPress` |
| SegmentedControl | organisms/SegmentedControl/SegmentedControl.tsx | 117 | nenhum | `variant` ignorado |
| Stepper | molecules/Stepper/Stepper.tsx | 143 | nenhum | labels a11y EN fixas |
| StatCard | molecules/StatCard/StatCard.tsx | 76 | Card, DynamicImage | `testID` obrigatório |
| TabBar | organisms/TabBar/TabBar.tsx + TabBarItem.tsx | 115 + 65 | useTabStore, TAB_ROUTES, Blur, BlurPress | acoplada a store e rotas do app |
| CircularProgress | molecules/CircularProgress/CircularProgress.tsx | 110 | nenhum | usa `Animated` do RN, não Reanimated |
| BarChart | molecules/BarChart/BarChart.tsx | 186 | nenhum | geometria misturada com render |
| LineChart | molecules/LineChart/LineChart.tsx | 186 | nenhum | idem |
| DataList | não existe | - | - | - |
| Metric | não existe | - | - | `StatCard` é o mais próximo |
| Select | organisms/OptionSelector/OptionSelector.tsx (roda) + molecules/SheetRow | 299 + 56 | usePressAnimation | não é dropdown |
| Menu | não existe | - | - | - |
| WaitingOrb / WaitingState | não existem | - | - | `Spinner` e `LoadingScreen` são os vizinhos |
| StepList (ProgressiveStatusLoader) | organisms/ProgressiveStatusLoader/*.tsx | 130 + 36 + 36 | IndeterminateBar | puro; texto vem pronto |
| StreamingText | não existe | - | - | - |
| MessageBubble (ChatBubble) | molecules/ChatBubble/ChatBubble.tsx + formatClock.ts | 67 + 7 | DynamicImage 'mic' | |
| MessageList | não existe no Zenith | - | - | `screens/Conversation/ConversationScreen.tsx` usa DSFlatList invertida |
| Composer (ChatInput) | molecules/ChatInput/ChatInput.tsx | 87 | IconButton, `analyticsId` fixos `chat.*` | |
| ToolCallChip | não existe | - | - | - |
| ApprovalCard | não existe como genérico | - | WorkoutDiff, ConversationChange | `screens/Conversation/DiffCard.tsx` (71) e `EditReviewSheet.tsx` (74) são de domínio |
| ClarificationCard | organisms/ClarificationCard/ClarificationCard.tsx | 41 | FilterChip, `analyticsId` fixo | |
| Sources / Files | não existem | - | - | - |
| RecordingBar | molecules/RecordingBar/RecordingBar.tsx | 88 | IconButton, formatClock, `analyticsId` fixos | |

### Componentes do Zenith que NÃO estão na lista da onda 1

**Genéricos que faltaram na spec** (sem acoplamento de domínio, ou só de infraestrutura):
- `molecules/BlurPress` (131): pressável com glow que segue o dedo; usado como item da TabBar. Depende de Blur e useTrackedPress.
- `molecules/SheetRow` (56): linha de opção selecionável dentro de Sheet (check `primary`).
- `organisms/TipCallout` (139 + types): bolha branca com bico e fechar; usa `react-i18next`.
- `organisms/CoachMark` (CoachMark 142, SpotlightOverlay 79, TooltipBubble 68, ArrowIndicator 59, types 42): tour com spotlight.
- `organisms/OptionSelector` (299), `organisms/ValueSelector` (395 + 174 estilos + 80 matemática + 67 partes), `organisms/IndicatorSelector`
  (263, régua horizontal), `organisms/WeightRuler` (230), `organisms/MultipleSelector` (296; lista/grade de checkboxes com
  `renderAd`), `organisms/NumericKeyboardSheet` (247 + 277 lógica + 74 teclado + 70 estilos): seletores/rodas/teclado numérico.
- `molecules/HorizontalRevealProgress` (107): cortina de progresso linear animada.
- `molecules/ConsistencyDots` (64): 5 pontos 6x6 de taxa.
- `atoms/Trackable` (60) e `internal/useItemVisibility.ts` (61): só telemetria; não entram no DS.
- `templates/LoadingScreen` (94): spinner 96 + mensagem (tem logo SW fixo, ver domínio).
- `templates/StepsTemplate` (180): stepper de passos com setas.
- `templates/ContentPage/ContentPageScaffold` (76): cabeçalho com voltar; depende de `useNavigation`.
- `molecules/TabScreenTitle` (42) e `molecules/BasicCard` (146), `molecules/lists/toLines.ts` (10), `molecules/InstructionsList`
  (43) / `TipsList` (48) / `CommonMistakesList` (45): listas de texto em linhas.
- `molecules/SerieValue` (81), `SerieIndicator` (71), `organisms/SerieGrid` (192): grade de séries (nome genérico, uso de treino).
- `organisms/RightNavigationButton` (105): botão circular com seta; `react-i18next`, useTrackedPress.
- `molecules/AdBanner` (136): banner de anúncio com `react-native-google-mobile-ads`.

**De domínio SWFitness (ficam no app):**
`atoms/DifficultyBadge, MechanicsBadge, LateralityBadge, MuscleTag, EquipmentChip`; `molecules/ExerciseMetaRow`,
`CustomTrainingField` (nome de treino), `PostWorkoutProgressCard` (97; unit conversion, analytics, `ProgressEvolution`);
`organisms/AIWorkoutPreview` (123), `ChangesCard` (44), `UnmatchedCard` (56), `WorkoutDraftCard` (+`DraftExerciseRow`,
`exerciseLabel`), `ExerciseAnimation` (117), `ExerciseContent` (260), `ExerciseDetailCard` (116), `ExerciseVideoPlayer` (65),
`MuscleEngagementMap` (230 + paths do corpo + LICENSE/PROVENANCE) e `MuscleGroupSelector` (168), `RecoveryHeatmap` (108),
`SwapExerciseSheet` (276), `JobResultBanner` (126; store de jobs + navigationRef), `UpdateAvailableBanner` (75; feature flags e
loja), `OfflineSyncHost` (128; store e sync de treinos). `LoadingScreen` tem monograma "SW" e
"FITNESS" e `accessibilityLabel="Logo SWFitness"` fixos.

## 3. Primitivos

### Text (DSText)
- zenith: `atoms/DSText/DSText.tsx` (236); `atoms/DSText/DSText.stories.meta.ts` (63, só metadados de story).
- props: `variant?: 'xs'|'xsMedium'|'sm'|'smMedium'|'base'|'baseMedium'|'lg'|'lgMedium'|'xl'|'xlMedium'|'display'|'displayMedium'`
  (padrão `base`); `color?: 'foreground'|'mutedForeground'|'subtleForeground'|'faintForeground'|'foregroundInverse'|'primary'|
  'destructive'|'warning'|'success'|'caution'|'emptyState'` (padrão `foreground`); `children`; `style?: TextStyle`;
  `numberOfLines?`; `testID?` (padrão `ds-text`); modo markdown `text?: string` + `defaultStyle?: string`.
- medidas: tamanhos/linhas da seção 1; `includeFontPadding: false`. Cor resolvida por `tokens.colors[color]`.
- estados: nenhum. Sem animação.
- a11y: nenhuma prop de a11y; repassa só `testID`.
- cortar: o modo markdown inteiro (`SIZE_MAP` tiny/small/medium/large/huge/xHuge, `COLOR_MAP` contentA..E/brandA/state*,
  regex `\[styleCase\](texto)`, prefixo `{defaultStyle:X}` "vindo direto do DB"): é formato do conteúdo do backend iOS.
  `COLOR_MAP` e `styles` calculados no módulo.
- domínio?: não, exceto o modo markdown.

### Button (DSButton)
- zenith: `atoms/DSButton/DSButton.tsx` (251) + `types.ts` (`ButtonSize`, `BUTTON_SIZE_MAP`).
- props: `title: string; onPress: () => void; variant?: 'primary'|'secondary'|'tertiary'|'brandA'|'contentA'|'contentAOutline'|
  'primaryDisabled'|'contentADisabled'|'backgroundD'|'cardAppearance'|'critical'` (padrão `primary`);
  `shape?: 'pill'|'rounded'|'circle'` (padrão `pill`); `size?: 'small'|'normal'|'large'|'maxWidth'` (padrão `normal`);
  `disabled?` `loading?` `icon?: ReactNode`; `testID?` (`ds-button`); `accessibilityLabel?`; `analyticsId?`.
- medidas: altura small 40 (`spacing.huge`, comentado "coincidência numérica"), normal 44 (`buttonSm`), large 56
  (`buttonLg`), maxWidth 44 + `width:'100%'` (mudou de 56 para 44 em 2026-07-23, "decisão de produto"). `paddingHorizontal`
  `spacing.xl` 24. Raio `full` (pill/circle) ou `lg` 20 (rounded). Label `baseMedium`. Linha ícone+label gap `xs` 8. Spinner
  fixo 20. `secondary`/`contentAOutline`/`cardAppearance`: borda `thin` (cores `border`/`foreground`/`border`).
  `circle` só muda o raio: não fixa largura. `buttonMd` (48) não é usado.
- estados: pressed via usePressAnimation (só quando habilitado); `disabled` genérico = opacidade 0.3; `disabled` em
  `primary`/`brandA` vira `primaryDisabled` (bg = `hexToRgba(primary, 0.3)`, label `foregroundInverse`);
  `contentADisabled` = bg `faintForeground`; `loading` desabilita e troca o conteúdo por `Spinner size 20` (tom `dark` se a
  cor do label é `foregroundInverse`, senão `brand`).
- a11y: `accessibilityRole="button"`, `accessible`, `accessibilityLabel ?? title`; sem `accessibilityState`/hint.
- cortar: `useTrackedPress` + `DSTrackingProps` (`../../internal/useTrackedPress`, `../../internal/trackingProps`);
  `Spinner` (Skia); `hexToRgba` hex-only.
- domínio?: não. Nomes de variante `brandA/contentA/backgroundD` são vocabulário iOS (candidatos a renomear).

### IconButton
- zenith: `atoms/IconButton/IconButton.tsx` (100).
- props: `source: string; onPress; size?: 'small'|'medium'|'large'` (padrão `medium`); `color?` (padrão `foreground`);
  `disabled?; hitSlop?: number; pressAnimation?: boolean` (padrão false); `accessibilityLabel?; testID?` (`ds-icon-button`);
  `style?: StyleProp<ViewStyle>; analyticsId?`.
- medidas: ícone 16/24/32 (mapa `ICON_SIZE_PX` copiado do DynamicImage). `hitSlop` padrão `round((touchTargetLg 64 - ícone)/2)` =
  24/20/16 (derivado). Fundo/forma só via `style` (sem fundo por padrão).
- estados: disabled = opacidade 0.3; pressed só se `pressAnimation` (o hook roda sempre, a saída só vale com a prop).
- a11y: role `button`, `accessible`; `accessibilityLabel` opcional e SEM fallback (um ícone sem label fica mudo).
- cortar: `useTrackedPress`, `DynamicImage` (`../../organisms/DynamicImage`), `DS_ICONS` por nome.
- domínio?: não.

### TextField
- zenith: `atoms/TextField/TextField.tsx` (356), `hooks/useTextFieldAnimation.ts` (86).
- props: `value; onChangeText; placeholder?; disabled?; label?; errorMessage?; variant?: 'contentA'|'contentC'|'brandA'|
  'selectorCustom'` (padrão `contentA`); `testID?` (`ds-text-field`); `accessibilityLabel?; secureTextEntry?; keyboardType?`
  (`default`); `autoCapitalize?` (`none`); `returnKeyType?` (`done`); `onSubmitEditing?; trailingIcon?: string; onClear?;
  autoFocus?; textContentType?; autoComplete?`. É `forwardRef<TextInput>`, mas o `ref` só chega ao `TextInput` do layout
  underline (o ramo `selectorCustom` não o repassa).
- medidas (underline): altura do campo 48 (`FIELD_HEIGHT`); container gap `xxs`; input `lgMedium` (20/24), `paddingTop` 14,
  `paddingBottom` `xxs`; label flutuante `base` (16/20) a `bottom: 6`, sobe `translateY -24` e `scale 0.75` (origem `left`);
  sublinhado `thin` 1 (cor `faintForeground`) -> `thick` 2 no foco; erro `xs` em `destructive`; ícone à direita
  `DynamicImage medium` (24) com `hitSlop xs`; com ícone, `paddingRight huge` 40. Cor do foco por variante: `contentA`/`brandA`
  `primary`, `contentC` `subtleForeground`, `selectorCustom` `borderMuted`. Cor do label por variante: `primary` (3 primeiras),
  `subtleForeground` (selector).
- medidas (selectorCustom): altura 72 (`selectorFieldHeight`), `paddingHorizontal md`, fundo `overlay`, raio `sm` 8, borda
  `thin` `border`, rótulo externo `sm` `mutedForeground`, chevron `'▼'` fontSize 10 em `right md`, `paddingRight huge`.
- estados: foco (`isFocused`), erro (cor `destructive` no sublinhado/borda), disabled (`editable=false` + opacidade 0.3),
  senha revelável (`eye`/`eyeOff`, estado local `isRevealed`). Animações: 200 ms `Easing.inOut(Easing.ease)` no label e na
  cor/altura do sublinhado (lerp RGB manual).
- a11y: `accessibilityLabel ?? label ?? placeholder`, `accessible`; erro com `accessibilityRole="alert"` e
  `accessibilityLiveRegion="polite"`; botões de ícone com role `button` e label i18n.
- cortar: `import { useTranslation } from 'react-i18next'` (3 labels: Limpar, Ocultar senha, Mostrar senha);
  `DynamicImage` (`../../organisms/DynamicImage`); `textContentType 'oneTimeCode'` é caso de login do app (a prop genérica fica);
  comentários de "CustomTrainingView iOS". `selectorCustom` existe para o seletor de nome de treino.
- domínio?: a variante `selectorCustom` e o ícone de X do CustomTrainingView são do app; o layout underline é genérico.

### TextArea
- zenith: não existe no Zenith. O mais próximo é o `TextInput` cru multilinha de `molecules/ChatInput/ChatInput.tsx`
  (comentário no código: "TextField do DS não tem multiline"). Medidas ali: `minHeight buttonMd` 48, `maxHeight
  touchTargetLg*2` 128, fonte `base` (só `fontSize` e `fontFamily`), `paddingVertical xs`, cor `foreground`.

### Toggle
- zenith: `atoms/Toggle/Toggle.tsx` (170).
- props: `value: boolean; onValueChange: (value: boolean) => void; label?; disabled?; size?: 'small'|'default'` (padrão
  `default`); `thumbOnColor?` (padrão `primary`); `testID?` (`ds-toggle`); `accessibilityLabel?`.
- medidas: `default` trilho 50x30, polegar 26, padding 2; `small` 40x20, polegar 16, padding 2. Trilho sempre pílula vazada:
  fundo transparente, borda `thin` `foreground`, raio altura/2. Polegar OFF = `overlay`, ON = `primary` (comentário: espelha
  `BaseToggle` iOS, "a cor de estado vive no thumb"). Sombra do polegar: `#000`, opacidade 0.25, raio 1, offset (0,1), elevation 1.
  Com `label`: linha `space-between`, texto `base` `foreground`, `marginRight xs`.
- estados: disabled = opacidade 0.3 e ignora toque. Animação: `withSpring({ damping: 15, stiffness: 150 })` no deslocamento e
  na cor (lerp RGB manual).
- a11y: role `switch`, `accessibilityState {checked, disabled}`, `accessibilityValue {text: String(value)}` (vira "true"/"false"),
  `accessibilityLabel ?? label`.
- cortar: nada de app. Duplicação de `hexToRgb`/`lerpColor` com o hook do TextField.
- domínio?: não.

### Checkbox (CheckBox)
- zenith: `atoms/CheckBox/CheckBox.tsx` (104), `hooks/useKeyframeBounce.ts` (30).
- props: `checked: boolean; onPress: (checked: boolean) => void` (recebe `!checked`); `label?; disabled?; testID?`
  (`ds-checkbox`); `accessibilityLabel?`.
- medidas: caixa 20x20, raio `sm` 8, borda 6 (`primary` marcado, `overlay` desmarcado); marcado desenha um retângulo interno
  14x14 raio 4 em `subtleForeground` (a soma 14 > área útil 8 da caixa; conferir no visual ao recriar). Gap linha 10 ("iOS HStack
  spacing 10"). Rótulo `base` `foreground`.
- estados: disabled = opacidade 0.3 no container. Animação: `useKeyframeBounce` = escala 0.9 (50 ms) -> 1.1 (150 ms) -> 1.0
  (250 ms), `Easing.bezier(0.33, 0, 0.67, 1)`, disparada a cada toque habilitado.
- a11y: role `checkbox`, `accessibilityState {checked, disabled}`, `accessibilityLabel ?? label`.
- cortar: nada. Comentário cita `CheckBoxStyles.swift`.
- domínio?: não.

### Radio (RadioButton)
- zenith: `atoms/RadioButton/RadioButton.tsx` (111), `hooks/useKeyframeBounce.ts`.
- props: `selected: boolean; onPress: () => void; label?; disabled?; testID?` (`ds-radio-button`); `accessibilityLabel?`.
- medidas: círculo 20x20 (raio `full`); selecionado: borda `thick` 2 `primary` + ponto 12x12 `primary`; não selecionado: borda
  `thin` 1 `overlay`. Gap `md` 16 (o checkbox usa 10). Rótulo `base`.
- estados: disabled = opacidade 0.3; mesmo bounce do checkbox.
- a11y: role `radio`, `accessibilityState {selected, disabled}`, label `accessibilityLabel ?? label`. Sem grupo (`radiogroup`).
- cortar: nada. domínio?: não.

### Tag
- zenith: `atoms/Tag/Tag.tsx` (95).
- props: `label: string; size?: 'small'|'medium'` (padrão `small`); `color?: 'neutral'|'primary'|'success'|'warning'|'critical'`
  (padrão `neutral`); `testID?` (`ds-tag`).
- medidas: raio `full`; small padding `xs`x`xxs` (8x4) com `xs` 12/16; medium `md`x`xs` (16x8) com `xsMedium`. Cores:
  neutral fundo `muted`/texto `foreground`; primary `primary`/`foregroundInverse`; success `rgba(182,251,45,0.15)`/`primary`;
  warning `rgba(253,188,48,0.15)`/`warning`; critical `rgba(255,64,64,0.15)`/`destructive`.
- estados: nenhum (não interativa). a11y: nenhuma.
- cortar: os rgba literais (derivar do token com alfa). domínio?: não; os wrappers `DifficultyBadge` (mapeia "iniciante/
  beginner/easy/facil" etc. para cores), `MechanicsBadge`, `LateralityBadge`, `MuscleTag` e `EquipmentChip` são de domínio.

### Chip / FilterChip
- zenith: `molecules/FilterChip/FilterChip.tsx` (110). (`EquipmentChip` é rótulo fixo de domínio, não interativo.)
- props: `label: string; onPress; active?: boolean; tone?: 'default'|'primary'; icon?: string; iconRotation?: number` (padrão 0);
  `testID?` (`ds-filter-chip`); `analyticsId?`.
- medidas: altura 44 (`buttonSm`), `paddingHorizontal md`, raio `full`, borda `thin` `foreground`, gap `xxs`, texto `xs` 12;
  ativo: fundo `foreground`, texto `foregroundInverse`; `tone='primary'` inativo: texto/ícone `primary`. Ícone opcional 12x12
  (viewBox 24, stroke 2) lido de `DS_ICONS`, rotacionável.
- estados: `active` e `tone`; sem disabled, sem press animation (Pressable plano).
- a11y: role `button`, `accessible`; sem `accessibilityState.selected` e sem label (depende do texto filho).
- cortar: `useTrackedPress`/`DSTrackingProps`; `DS_ICONS` + `react-native-svg` direto.
- domínio?: não. Lido como "Chip de filtro da Biblioteca"; não existe chip removível nem de seleção múltipla.

### Divider
- zenith: `atoms/Divider/Divider.tsx` (36).
- props: `variant?: 'contentA'|'contentC'|'brandA'` (padrão `contentC`; cores `foreground`/`subtleForeground`/`primary`);
  `style?; testID?` (`ds-divider`). Medidas: altura `thin` 1, largura 100%. Sem vertical. a11y: nenhuma. cortar: nada. domínio?: não.

### Stack / Box
- zenith: `molecules/Stack/Stack.tsx` (58), `atoms/Box/Box.tsx` (49), tipo `SpacingToken` em `typedTokens.ts`.
- props Stack: `arrangement?: 'verticalCenter'|'verticalLeading'|'horizontalCenter'|'horizontalLeading'` (padrão
  `verticalLeading`; define `flexDirection` e `alignItems`); `spacing?: SpacingToken` (padrão `xs` = gap 8); `children`;
  `testID?` (`ds-stack`). Box: `padding/paddingHorizontal/paddingVertical/paddingTop/Bottom/Left/Right?: SpacingToken`, `style`,
  `children`, `testID?` (`ds-box`). `SpacingToken` = chaves de `tokens.spacing` (12). a11y: nenhuma. cortar: nada
  (ambos têm `zenith-allow ZC-E6` no topo: regra de lint do Zenith). domínio?: não.

### Spinner
- zenith: `atoms/Spinner/Spinner.tsx` (104), `atoms/Spinner/fluidSpinnerShader.ts` (88; fonte SkSL `FLUID_SPINNER_SOURCE`).
- props: `size?: number` (padrão 40); `testID?` (`spinner`); `tone?: 'brand'|'dark'` (padrão `brand`).
- medidas: parâmetros `SPEED 1.35`, `THICKNESS 0.7`, `SOFTNESS 0.7`, `OPACITY 0.94`, `CYCLE_MS 2580`; `NUM_FIELDS = 20` fixo no
  shader. Paleta brand: head `#d8f45b`, energy = `tokens.colors.primary`, depth `#26705c`, tail `#0f4a21`; dark: head `#333336`,
  energy `#1c1c1f`, depth = `foregroundInverse`, tail `#000000`.
- estados: animação contínua por `useClock()` do Skia (GPU, sem teto de fps). Sem estado parado.
- a11y: `accessibilityRole="progressbar"`, `accessibilityLabel` i18n "Carregando".
- cortar: `import { useTranslation } from 'react-i18next'`; `import { Canvas, Fill, Shader, Skia, useClock } from
  '@shopify/react-native-skia'` (dependência pesada; decidir se o DS a adota ou faz outro spinner); `hexToUnit` hex-only.
- domínio?: não (paleta é da marca, vira tema).

### Skeleton (Shimmer)
- zenith: `molecules/Shimmer/Shimmer.tsx` (112).
- props: `preset?: 'detailedListItem'|'listItem'|'header'|'addItem'|'circleButton'`; `width?: DimensionValue; height?: number;
  borderRadius?: number; style?; testID?` (`ds-shimmer`).
- medidas dos presets: detailedListItem 100% x 148 raio `lg`; listItem 100% x 88 raio `lg`; header 242 x 24 raio `sm`; addItem
  100% x 44 (`buttonSm`) raio `lg`; circleButton 52 x 52 raio `full`. Fundo `overlay`, camada `mutedForeground`.
- estados: animação `withRepeat(withTiming(1,{duration:1500, easing: inOut(ease)}), -1, reverse=true)`; opacidade da camada
  interpolada `[0,0.5,1] -> [0,0.5,0]` (pulso, não varredura). a11y: nenhuma. cortar: presets (viram `width/height` do
  consumidor, são placeholders de telas do app). domínio?: os presets sim.

### ProgressBar (IndeterminateBar)
- zenith: `atoms/IndeterminateBar/IndeterminateBar.tsx` (103). Não existe barra determinada.
- props: `width?: DimensionValue` (padrão `alignSelf:'stretch'`); `height?: number` (padrão `thick*2` = 4); `color?` (`primary`);
  `trackColor?` (`overlay`); `testID?` (`ds-indeterminate-bar`).
- medidas: segmento = 35% do track, raio `height/2`. Animação: `withRepeat(withTiming(1,{1100 ms, inOut(ease)}), -1, false)`,
  `translateX` de `-seg` a `trackWidth`; cancelada ao desmontar.
- a11y: role `progressbar`, `accessibilityLabel="Carregando"` literal PT (não passa por i18n). cortar: essa string.
  domínio?: não.

## 4. Movimento

### Glow (Blur)
- zenith: `molecules/Blur/Blur.tsx` (230); asset `apps/mobile/assets/images/glow-radial.png` via
  `require('../../../../../assets/images/glow-radial.png')`.
- props: `color?` (padrão `primary`); `preset?: 'standard'|'small'|'intense'|'cardCorner'|'restTimer'` (padrão `standard`);
  `config?: BlurConfig` (container + 3 camadas `{width,height,offsetX,offsetY,blurRadius,opacity}`);
  `maskShape?: 'roundedRectangle'|'circle'|'capsule'|'none'` (padrão `none`; raios `lg`/`full`/`xxl`); `testID?` (`ds-blur`).
  Exporta `getBlurContainerSize`.
- medidas: standard container 200x200 (camadas 60/100/140, opacidades 0.5/0.35/0.2); small 100x100; intense 250x250; cardCorner
  220x180 ancorado no topo-direito; restTimer 393x200. Nativo: tamanho da imagem = `layer.width*1.3 + blurRadius*1.2`
  (`GLOW_CORE_SCALE`, `GLOW_SPREAD`). Web: círculos com `filter: blur(Npx)`.
- estados: estático (a animação de aparecer fica em `BlurPress`/`TabBar`). a11y: `pointerEvents="none"`.
- cortar: o `require` do PNG (o DS precisa do próprio asset ou de Skia); comentários de `BlurConfig` iOS; `Platform.OS === 'web'`
  fica (é lógica de plataforma). domínio?: os presets `cardCorner` e `restTimer` são de telas do app.

### GlowScene
- zenith: `molecules/GlowScene/GlowScene.tsx` (161); assets `glow-radial.png` e `glow-dither.png`.
- props: `config: GlowSceneConfig` (`{baseColor, blobs: {color,cx,cy,fwhmX,fwhmY,opacity?}[]}`, coordenadas em fração do
  container); `testID?` (`ds-glow-scene`). Exporta `GLOW_SCENE_PRESETS` (`topDualGreenTealGlow`, `bottomLeftOliveGlow`,
  `topRightGreenYellowGlow`).
- medidas: `ASSET_FWHM = 0.406`; tamanho da imagem = `fwhm * container / 0.406`; ruído `glow-dither.png` com `resizeMode repeat`
  e `DITHER_OPACITY 0.05` contra banding. Preenche o pai (`absoluteFill`).
- estados: estático. a11y: `pointerEvents="none"`. cortar: os 3 presets (hex literais do SWFitness) e o `require` dos PNGs.
  domínio?: os presets são da marca.

### GlowBorder
- zenith: não existe.

### Blur (efeito de desfoque)
- zenith: não existe desfoque real. `Blur` acima é glow; `ScrollFadeOverlay` diz em comentário que "blur de verdade" está
  "indisponível neste app".

### Shimmer
- zenith: ver "Skeleton (Shimmer)" na seção 3.

### Reveal
- zenith: não existe componente de entrada. Entradas aparecem inline: `FadeInDown.duration(280)`, `FadeOut.duration(220)` e
  `LinearTransition.duration(280)` em `ProgressiveStatusLoader`; Toast `translateY -60 -> 0` em 300 ms. O nome mais próximo,
  `molecules/HorizontalRevealProgress/HorizontalRevealProgress.tsx` (107), é a cortina do cronômetro de descanso: `progress`
  0..1, `duration?`, `color?` (`card`), `children`; largura da cortina `100% * (1 - progress)` ancorada à direita; `withTiming`
  linear ~1 s. É progresso, não reveal.

### Celebration (SuccessBackground)
- zenith: `molecules/SuccessBackground/SuccessBackground.tsx` (15).
- props: `testID?` (`ds-success-background`). Renderiza `GlowScene` com `GLOW_SCENE_PRESETS.topDualGreenTealGlow`. Estático: sem
  confete, partículas ou animação. cortar: o preset. domínio?: o fundo é da marca.

### NumberTicker
- zenith: não existe. O número de `CircularProgress` interpola de `displayProgress` a `progress` com `Animated.timing`
  400 ms `Easing.out(Easing.cubic)` (`useNativeDriver: false`, `setState` por frame) e mostra `Math.round(x*100)%`; é a única
  contagem animada.

### ScrollFade (ScrollFadeOverlay)
- zenith: `molecules/ScrollFadeOverlay/ScrollFadeOverlay.tsx` (153) (+ `useFooterHeight(fallback = 80)` no mesmo arquivo).
- props: `edge: 'top'|'bottom'; height?: number` (48); `steps?: number` (24); `maxOpacity?: number` (1); `testID?`
  (`scroll-fade-overlay-<edge>`).
- medidas: 24 `View`s de `flex:1` com `backgroundColor: background` e opacidade `smoothstep(i/(steps-1))`, `position:absolute`,
  `zIndex: 10`. O fade só aparece quando há conteúdo a esconder (multiplicador = `restante/height`, via
  `useScrollVisibilityContext`); sem contexto, multiplicador 1.
- estados: reativo ao scroll; sem animação própria. a11y: `pointerEvents="none"`.
- cortar: `useScrollVisibilityContext` de `../../templates/Screen/ScrollVisibilityContext` (o contexto sai com o scroll do DSScrollView;
  se o DS não tiver scroll próprio, vira prop `edgeVisibility`); comentários de QA 2026-08-01 sobre glow. domínio?: não.

## 5. Composição

### Card
- zenith: `molecules/Card/Card.tsx` (158).
- props: `type?: 'fill'|'outline'|'borderedContentC'|'dashed'` (padrão `fill`); `alignment?: 'center'|'leading'|'trailing'`
  (`leading`); `fullWidth?; children; style?; onPress?; onLongPress?; testID?` (`ds-card`); `accessibilityLabel?; analyticsId?`.
- medidas: raio `lg` 20 em todos; padding `lg` 20 (dashed: vertical `xl` 24, horizontal `md` 16). `fill`: fundo `card`, borda
  `hairline` 0.4 `border`. `outline`: transparente, borda `hairline` `foreground`. `borderedContentC`: fundo `background`,
  borda `thin` `subtleForeground`. `dashed`: transparente, `borderStyle: 'dashed'`, `thin` `border`.
- estados: pressable só com `onPress` (usePressAnimation, opacidade 0.3); `onLongPress` sem animação; sem disabled.
- a11y: com `onPress`: role `button` + `accessibilityLabel`; sem `onPress`: só `accessibilityLabel`.
- cortar: `useTrackedPress` (`elementType: 'card'`, `variant: type`). domínio?: não (comentários citam o botão "criar treino" da Home
  no tipo `dashed`).

### ListItem
- zenith: `molecules/ListItem/ListItem.tsx` (159); `molecules/SheetRow/SheetRow.tsx` (56) o compõe.
- props: `title: string; description?; onPress?; testID?` (`ds-list-item`); `rightElement?: ReactNode; leftImage?: ReactNode;
  circularProgress?: {progress, size?, variant?, showText?}; isShimmering?; fullWidth?; chevronTestID?; analyticsId?`.
- medidas: padding vertical `xl` 24, esquerdo `lg` 20, direito `xl` 24 (ajustes de QA em comentários); título `lgMedium`
  (20/24) `foreground`; descrição `sm` (14/16) `mutedForeground`, `marginTop xs`; `leftImage` com `marginRight xs`; elemento
  direito com `marginLeft md`. Chevron padrão: `chevronRight` `small` (16) `mutedForeground` (ou `foreground` quando há
  `chevronTestID`). `isShimmering` troca por `Shimmer preset listItem` (88).
- estados: pressed (usePressAnimation) só com `onPress`; shimmering. a11y: com `onPress`: role `button`, label `title`; sem
  `onPress` nada.
- cortar: `useTrackedPress` (`elementType: 'list_item'`), `Shimmer` preset, `CircularProgress`, `DynamicImage`. domínio?: não.

### DetailedListItem
- zenith: `molecules/DetailedListItem/DetailedListItem.tsx` (146).
- props: `title; description?; leftInfo?: {title, description}; rightInfo?: {title, description}; onPress?; progress?: number;
  animated?; isShimmering?; testID?` (`ds-detailed-list-item`); `analyticsId?`.
- medidas: padding `lg` 20 nos 4 lados; título `lgMedium`, linha título+`CircularProgress` (54) com gap `md`; descrição `sm`
  `mutedForeground`, `marginTop xxs`; linha de info `marginTop xs`, rótulos `smMedium` (`mutedForeground`/`foreground`), bloco
  direito alinhado ao fim. Shimmer preset 148.
- estados: pressed e shimmering. a11y: o `Pressable` não tem role nem label; o `testID` fica no `Animated.View`.
- cortar: `useTrackedPress` (`list_item`). domínio?: o desenho (título + progresso + 2 colunas) é da Home de treinos; a API é genérica.

### Sheet (BottomSheet)
- zenith: `organisms/BottomSheet/BottomSheet.tsx` (258).
- props: `visible; onDismiss; children; backgroundColor?` (`card`); `hasClose?` (true); `dismissOnBackdrop?` (true);
  `dismissOnRequestClose?` (true); `closeVariant?: 'bare'|'chip'` (`bare`); `hasDragIndicator?` (false); `dragToDismiss?` (true);
  `overlayOpacity?` (0.84); `fullHeight?` (false); `testID?` (`bottom-sheet`).
- medidas: raio superior `xl` 24, borda superior `thin` `border`, `paddingTop lg`, `overflow: hidden`. Overlay = cor `background`
  com opacidade até `overlayOpacity`. Botão fechar: caixa 32x32 (`xxxl`) em `top/right xl` 24, glifo 20 (`DS_ICONS.close`, stroke
  `foreground`), `hitSlop 8`, variante `chip` com fundo `overlay` e raio `full`. Indicador de arraste 36x4 raio 2
  `subtleForeground`. `fullHeight`: `flex:1` + `marginTop 64` ("limpa o maior notch (59pt)"; não usa `useSafeAreaInsets` de
  propósito).
- estados/animação: entrada `translateY 500 -> 0` em 300 ms `Easing.out(cubic)`, saída `Easing.in(cubic)`, overlay em 300 ms;
  `handleDismiss` anima e chama `onDismiss` via `setTimeout(300)` (sem limpeza). Gesto: `PanResponder` com início se `dy > 10` e
  dismiss se `dy > 100` ao soltar; a folha NÃO acompanha o dedo (não há `translateY` durante o arraste). `Modal` transparente,
  `statusBarTranslucent`, `KeyboardAvoidingView` (`padding` no iOS, `height` no Android).
- a11y: o botão fechar é `Pressable` sem role nem label; sem `accessibilityViewIsModal`, sem foco inicial.
- cortar: nada de app (usa `DS_ICONS`); `500` e `64` viram medidas do tema/medição de layout.
- domínio?: não. Lógica sem estilo a migrar: gesto de arraste (limiar 10/100) e curva de entrada/saída.

### Dialog
- zenith: não existe. Confirmações usam `BottomSheet` (ex.: `screens/Conversation/ResetConversationSheet.tsx`).

### Toast
- zenith: `organisms/Toast/Toast.tsx` (139).
- props: `message: string; variant: 'success'|'error'|'info'; visible: boolean; onHide: () => void; duration?: number` (3000);
  `testID?` (`ds-toast`).
- medidas: `position: absolute`, `top = max(insets.top, StatusBar.currentHeight no Android)`, largura total, `zIndex 9999`,
  padding `lg` x `md` (20x16), texto `sm` centralizado em `foregroundInverse`. Fundo: success `primary`, error `destructive`,
  info `foreground`. Altura ~48 (derivado: 16+16+16 de linha).
- estados/animação: `translateY -60 -> 0` e opacidade 0 -> 1, 300 ms `Easing.out(quad)`; auto-dismiss por `setTimeout(duration)`
  chamando `onHide`; oculto = `pointerEvents: none`. Sem fila nem ação.
- a11y: `AccessibilityInfo.announceForAccessibility(message)` ao aparecer; `accessibilityRole="alert"` só em `error`;
  `accessibilityElementsHidden`/`importantForAccessibility="no-hide-descendants"` quando oculto.
- cortar: `useSafeAreaInsets` de `react-native-safe-area-context` (decidir dependência); `StatusBar` Android. domínio?: não.

### Feedback (vazio, sucesso, erro)
- zenith: `organisms/Feedback/Feedback.tsx` (221). Não há "empty state" separado; `EmptyState` do chat está em
  `screens/Conversation/EmptyState.tsx` (83, domínio).
- props: `type: 'success'|'error'|'critical'|'warning'|'caution'|'brandA'` (`critical` é alias de `error`); `title; subtitle?;
  icon?: ReactNode; primaryButton: {title,onPress,variant?,analyticsId?,testID?}; secondaryButton?; testID?` (`ds-feedback`);
  `transparent?` (false); `spacing?: 'default'|'relaxed'`.
- medidas: ocupa a tela (`flex:1`, `space-between`); `paddingHorizontal xl`, `paddingTop safeArea` 64, `paddingBottom xxxl +
  insets.bottom`. Círculo do ícone 56x56 fundo `feedbackIconBg`, glifo 28 peso 600 (✓ ✕ !, cor por tipo). Título `xlMedium`
  `marginTop xl` (relaxed `xxxl`); subtítulo `base` `mutedForeground` `marginTop xs` (relaxed `sm`); botões gap `xs`.
- estados: só `type`/`spacing`/`transparent`. Sem animação. a11y: nenhuma (sem role, sem região viva).
- cortar: `DSButton` (+ `analyticsId`), `useSafeAreaInsets`. domínio?: não, mas é layout de tela cheia; para um vazio inline o
  Zenith não tem componente.

### Screen / Page
- zenith: `templates/Screen/Screen.tsx` (116), `DSScrollView.tsx` (123), `DSFlatList.tsx` (63), `ScreenContext.tsx` (21),
  `OffsetContext.tsx` (16), `ScrollVisibilityContext.tsx` (21); `internal/useItemVisibility.ts` (61).
- props Screen: `name: string; scroll?; edges?: readonly Edge[]` (`['top']`); `children; header?; overlays?; background?;
  refreshControl?; scrollEnabled?; showsVerticalScrollIndicator?; style?; scrollStyle?; contentContainerStyle?; testID?`.
- medidas: `SafeAreaView` com fundo `background` (transparente quando há `background`); `background` renderiza atrás da safe
  area para cobrir a status bar.
- cortar: `import { useAnalytics } from '../../../../services/analytics/useAnalytics'` em `DSScrollView.tsx` (emite `scroll_depth`
  ao desmontar), `DSFlatList.tsx` (emite `view_viewed`, `itemAnalyticsId` obrigatório, viewability 50%/800 ms) e
  `ScreenContext.tsx` (`useScreenName` cai em `analytics.getCurrentScreen`). `Screen` em si só exige `ScreenProvider`.
  `ContentPageScaffold.tsx` usa `useNavigation` (`@react-navigation/native`) e é do app.
- domínio?: não, mas toda a camada de telemetria é do app.

### HeaderTitle
- zenith: `molecules/HeaderTitle/HeaderTitle.tsx` (107). `TabScreenTitle` (42) é separado.
- props: `title; variant?: 'contentA'|'contentB'|'contentC'|'brandA'` (cores `foreground`/`mutedForeground`/`subtleForeground`/
  `primary`); `actions?: {icon: ReactNode, onPress}[]; isShimmering?; testID?` (`ds-header-title`); legadas
  `actionIcon?`/`onActionPress?` (`@deprecated`).
- medidas: linha `space-between`, título `lgMedium` (flex 1), ações com gap `xs`; shimmer `header` 242x24.
- estados: ação pressed (usePressAnimation). a11y: ação sem role nem label.
- cortar: as props `@deprecated`. domínio?: não.

### SegmentedControl
- zenith: `organisms/SegmentedControl/SegmentedControl.tsx` (117).
- props: `options: string[]; selectedIndex; onSelect: (index) => void; variant?: 'default'|'brandA'` (declarada e ignorada: o
  parâmetro se chama `_variant`); `testID?` (`ds-segmented-control`).
- medidas: contêiner fundo `muted`, raio `full`, padding `xxs` 4; cada aba `flex:1`, `paddingVertical xs`, `paddingHorizontal
  xxs`, raio `full`; selecionada fundo `primary`, texto `baseMedium` `foregroundInverse`; não selecionada `base`
  `subtleForeground`. Altura total ~44 (derivado: 8+8+20+4+4). `adjustsFontSizeToFit`, `minimumFontScale 0.7`, 1 linha.
- estados: selecionado; pressed (opacidade por aba). a11y: cada aba role `tab`, `accessibilityState {selected}`, label = texto;
  o contêiner não tem role `tablist`. `testID` das abas fixo `ds-segmented-option-${index}`.
- cortar: nada. domínio?: não.

### Stepper
- zenith: `molecules/Stepper/Stepper.tsx` (143).
- props: `value; min; max; onChange: (value) => void; unitLabel?; testID?` (`ds-stepper`).
- medidas: controles circulares 48x48 (`buttonMd`), fundo `card`, borda `thin` `border`; símbolo "−"/"+" em `xl`; valor `display`
  (44/56) numa coluna `minWidth 80` com `unitLabel` em `sm` `mutedForeground`; gap `xl`.
- estados: botões desabilitam nos limites (borda `borderMuted`, opacidade 0.3, texto `faintForeground`). Pressed por botão.
- a11y: contêiner `accessibilityRole="adjustable"` com `accessibilityValue {min,max,now}` mas sem `onAccessibilityAction`;
  botões role `button`, `accessibilityLabel` literal "decrement"/"increment" (EN, sem i18n).
- cortar: os dois labels fixos (passam a props). domínio?: não.

### StatCard
- zenith: `molecules/StatCard/StatCard.tsx` (76).
- props: `icon: string; iconBg: string; label; value; sublabel; type: 'fill'|'outline'; testID: string` (todas obrigatórias).
- medidas: `Card fullWidth` com padding `lg`; círculo do ícone 44 (`buttonSm`) raio `full`, ícone `medium` `foreground`; rótulo `sm`
  `mutedForeground`; valor `xlMedium` + sublabel `sm` `subtleForeground` em linha `baseline` com gap `xs`; gap interno `md`/`xs`.
- estados: nenhum (Card sem onPress). a11y: nenhuma própria. cortar: `Card`, `DynamicImage`. domínio?: não (veio de StatisticsScreen).

### TabBar
- zenith: `organisms/TabBar/TabBar.tsx` (115), `TabBarItem.tsx` (65), usa `molecules/Blur` e `molecules/BlurPress`.
- props: `TabBar()` sem props. Item: `routeKey: TabRouteKey; icon: string`.
- medidas: cápsula fundo `card`, raio `full`, `overflow hidden`, `paddingHorizontal xs`; wrapper `paddingBottom xs`; item 64x64
  (`spacing.safeArea`), flexível com `minWidth 48` (`buttonMd`) se houver mais de 4 abas; ícone `medium` 24, `primary` ativo /
  `mutedForeground` inativo; indicador = `Blur` com config 64x64 (3 camadas 20/56/96x64, opacidades 0.2/0.25/0.15).
- animação: indicador desliza com `withTiming(280 ms, out(cubic))` ("sem bounce"); mostrar/ocultar `withTiming(250 ms,
  inOut(ease))` com `translateY 80` e opacidade; glow do toque 200 ms entra / 300 ms sai (BlurPress).
- a11y: `TabBarItem` não passa role/label/estado ao `BlurPress` (que aceita essas props); só `testID` `tab_<key>`.
- cortar: `useTabStore` (`../../../../state/tabStore`), `TAB_ROUTES`/`TabRouteKey` (`../../../../navigation/tabRoutes`); recriar
  controlada: `items`, `selectedKey`, `onSelect`, `visible`. domínio?: a lógica de rotas é do app; o visual é genérico.

### CircularProgress
- zenith: `molecules/CircularProgress/CircularProgress.tsx` (110).
- props: `progress: number` (0..1); `size?` (54); `strokeWidth?; showText?` (true); `animated?` (false);
  `variant?: 'contentA'|'contentB'|'brandA'` (`brandA`); `testID?`.
- medidas: trilho `overlay` com traço 1; arco com traço 2 (se `strokeWidth` for passado vale para os dois); raio
  `(size - max(traços))/2`; `strokeLinecap round`; rotação -90°; texto `sm` na cor da variante. Cores: `foreground`/
  `mutedForeground`/`primary`.
- estados: `animated` interpola 400 ms `Easing.out(cubic)` com `Animated` do RN (`useNativeDriver: false`). a11y: nenhuma.
- cortar: nada de app; trocar `Animated` do RN por Reanimated. domínio?: não.

### BarChart
- zenith: `molecules/BarChart/BarChart.tsx` (186).
- props: `bars: {label, value, color?}[]; gradient?` (false); `height?` (250); `yLabelSuffix?` (`''`); `testID?` (`bar-chart`).
- medidas: altura 250; eixo Y 36 de largura, 4 intervalos (5 linhas de grade); grade `border` com alfa 0.2, traço `thin`;
  barra = 60% do slot, centrada, raio 4; cor por barra (`primary` por padrão) ou gradiente vertical `primary` -> `primary@0.7`;
  rótulos `xs` `mutedForeground`, arredondados com `Math.round`. Domínio do eixo começa em 0; sem dados usa `domainMax = 1`.
- estados: sem interação, sem animação. a11y: `accessibilityRole="image"`, sem label.
- cortar: nada de app. Lógica sem estilo a extrair: layout de slots/barras e ticks (`slotWidth`, `barInset`, `yTicks`).
  domínio?: não (comentários citam telas iOS de frequência/volume).

### LineChart
- zenith: `molecules/LineChart/LineChart.tsx` (186).
- props: `points: {label, value}[]; height?` (250); `testID?` (`line-chart`).
- medidas: mesma grade/eixo do BarChart; linha `primary` traço 2; ponto raio 3; inset horizontal 8; domínio de `min(values,0)` a
  `max`. Curva suave: Catmull-Rom -> Bézier (`buildSmoothPath`, controle = `(p2 - p0) / 6`). Rótulos X com largura = passo.
- estados: sem interação. a11y: `role image`, sem label. cortar: nada. Lógica a extrair: `buildSmoothPath`, escala Y, ticks.
  domínio?: não.

### DataList
- zenith: não existe. (`organisms/SerieGrid/SerieGrid.tsx`, 192, é uma grade de séries de treino com cabeçalhos e indicadores;
  `ColumnConfig {key, header?}`; uso de domínio.)

### Metric
- zenith: não existe isolado. `StatCard` (acima) e os blocos `infoTitle/infoDescription` do `DetailedListItem` fazem o papel.

### Select
- zenith: não existe dropdown. Opções: `organisms/OptionSelector/OptionSelector.tsx` (299) e `ValueSelector` são rodas de
  seleção por toque/scroll; `molecules/SheetRow` + `BottomSheet` formam o seletor de listas das Settings.
- OptionSelector props: `options: string[]; selectedIndex; onSelect: (index) => void; testID?`. Medidas: viewport 300, item 56
  (`buttonLg`), banda central 72 (`selectorFieldHeight`), fade 114, `Divider` verde nas bordas da banda. Pressed por item.
- SheetRow props: `label; selected?; onPress; testID?` (`ds-sheet-row`); `analyticsId?`; medidas = ListItem + check `medium`
  (24) `primary` quando selecionado (senão `<View />` vazio). a11y: herdada do ListItem (role `button`, label = texto; sem
  `accessibilityState.selected`).
- cortar: `useTrackedPress` via ListItem. domínio?: nenhuma das duas.

### Menu
- zenith: não existe.

## 6. AI-first

### WaitingOrb / WaitingState
- zenith: não existem. Vizinhos: `atoms/Spinner` (shader Skia), `templates/LoadingScreen/LoadingScreen.tsx` (94; props `showLogo?`
  (true), `message?`, `testID?`; spinner de 96 com monograma "SW" `fontSize 22` peso 800 e "FITNESS" `fontSize 9`, texto `smMedium`,
  `marginTop xl`) e o balão de progresso do chat `screens/Conversation/PendingBubble.tsx` (40: `ChatBubble role assistant` +
  `ProgressiveStatusLoader`, com `useJobStepsCatalog`, `phaseIndex`, `CONVERSATION_JOB_KIND` do app). O monograma é de domínio.

### StepList (ProgressiveStatusLoader)
- zenith: `organisms/ProgressiveStatusLoader/ProgressiveStatusLoader.tsx` (130), `useTimedSteps.ts` (36), `usePhaseRotatingSteps.ts` (36).
- props: `steps: string[]` (já traduzidas); `stepIntervalMs?` (6000); `windowSize?` (3); `title?; activeIndex?` (controla a
  etapa e desliga o timer); `style?; testID?` (`ds-progressive-status-loader`).
- medidas: cartão `card` raio `lg` padding `lg` gap `md`; pilha gap `xs`; etapa ativa `baseMedium` `foreground`, concluídas `base`
  `mutedForeground` com sufixo literal "  ✓" e opacidade `max(0.4, 1 - distância*0.22)`; divisor `hairline` `overlay`; `IndeterminateBar` embaixo.
- animação: entrada `FadeInDown` 280 ms, saída `FadeOut` 220 ms, `LinearTransition` 280 ms ("<=500ms, sem bounce").
  `useTimedSteps` avança por `setInterval` e para na última; `usePhaseRotatingSteps(phaseIndex, pools, 3000)` gira dentro do pool
  da fase real.
- a11y: `accessibilityRole="progressbar"`, `accessibilityLabel = steps[active]`; o "✓" textual entra na leitura.
- cortar: nada de app no componente; o consumidor injeta `pools`/`phaseIndex`. domínio?: não (o catálogo de frases é do app).

### StreamingText
- zenith: não existe. O streaming de jobs está em `services/jobs/jobStream.ts` e `streamConnection.ts` (rede, fora do Zenith).

### MessageBubble (ChatBubble)
- zenith: `molecules/ChatBubble/ChatBubble.tsx` (67), `molecules/ChatBubble/formatClock.ts` (7).
- props: `role: 'user'|'assistant'; text?; voiceDurationSec?; children?; testID?` (`ds-chat-bubble`).
- medidas: `maxWidth: '88%'`; padding `md` x `sm` (16x12); raio `lg` 20 com o canto inferior do lado do autor em `sm` 8; gap `xs`.
  Usuário: fundo `primary`, texto `base` `foregroundInverse`, à direita. Assistente: fundo `card`, texto `foreground`, à esquerda.
  Mensagem ditada: ícone `mic` `small` + `formatClock` em `xsMedium` `foregroundInverse`.
- estados: nenhum (não interativo, sem telemetria). a11y: nenhuma (sem label nem role).
- cortar: `DynamicImage` `mic`. `formatClock(totalSec)` (mm:ss, `floor`, mínimo 0) é lógica pura a migrar. domínio?: não;
  `voiceDurationSec` é o caso "ditado" do chat de treino.

### MessageList
- zenith: não existe. `screens/Conversation/ConversationScreen.tsx` monta `DSFlatList inverted` + `ItemSeparatorComponent` +
  `ListHeaderComponent` (progresso/transcrição) + `KeyboardAvoidingView` (`padding` no iOS) + `Composer`. É tela do app.

### Composer (ChatInput)
- zenith: `molecules/ChatInput/ChatInput.tsx` (87); composição de rodapé em `screens/Conversation/Composer.tsx` (75; alterna
  `ChatInput`/`RecordingBar`/`VoicePanel` por estado do gravador, domínio).
- props: `value; onChangeText; placeholder; onSend; onMic; sendDisabled?; micDisabled?; editable?` (true); `maxLength?;
  sendLabel; micLabel; testID?` (`ds-chat-input`). `forwardRef<TextInput>`.
- medidas: contêiner `card`, raio `xl` 24, padding `md` x `xs`, gap `xs`, `alignItems: flex-end`; campo `flex:1`, `minHeight 48`,
  `maxHeight 128`, `paddingVertical xs`, `fontSize`/`fontFamily` de `base`; botões `IconButton` `mic` (cor padrão) e `send` (`primary`).
- estados: `sendDisabled`, `micDisabled`, `editable`. a11y: `accessibilityLabel = placeholder` no campo; botões com label por prop.
- cortar: `analyticsId` fixos `"chat.mic"` e `"chat.send"`; `IconButton` (traz `useTrackedPress`). domínio?: não.

### ToolCallChip
- zenith: não existe.

### ApprovalCard (EditReviewSheet, DiffCard)
- zenith: não existe no `zenith/`. Vive em `screens/Conversation/DiffCard.tsx` (71) e `screens/Conversation/EditReviewSheet.tsx` (74);
  `organisms/ChangesCard/ChangesCard.tsx` (44) e `UnmatchedCard.tsx` (56) mostram mudanças/ambiguidades.
- DiffCard props: `diff: WorkoutDiff; base/draft: WorkoutResponse; changes?: ConversationChange[]; accepted: ReadonlySet<string>;
  onToggle?(id, accept); messageId`. Cada operação: texto `base` (`mutedForeground` se recusada), `why` em `xs`, e dois
  `FilterChip` "Aceitar"/"Recusar" (`active` = aceito/recusado) quando há `onToggle`. EditReviewSheet: `BottomSheet` + título
  `lgMedium` + lista rolável + `DSButton` "Aplicar selecionadas" (desabilitado com 0 aceitas ou `busy`) + `DSButton secondary`
  "Salvar como novo"; padding `md`, gap `sm`.
- cortar (tudo): `../../types/conversation`, `../../types/workout`, `../../utils/workoutDiff`, `../../utils/workoutDiffLabels`,
  `../../components/zenith/organisms/WorkoutDraftCard/exerciseLabel`, `react-i18next`, `ImpactSummary`, `ScreenProvider` com chave
  `conversation.edit_review_sheet`, `analyticsId` `chat.diff_*`/`chat.edit_*`.
- domínio?: sim. Só o padrão (lista de itens com aceitar/recusar + rodapé de ações em Sheet) é reaproveitável; o DS cria o
  `ApprovalCard` do zero.

### ClarificationCard
- zenith: `organisms/ClarificationCard/ClarificationCard.tsx` (41).
- props: `question: string; options: string[]; onSelect?: (option) => void; testID?` (`clarification-card`).
- medidas: coluna gap `xs`; pergunta `baseMedium` `foreground`; opções como `FilterChip` em linha com wrap e gap `xs`. Sem `onSelect`,
  as opções não aparecem.
- a11y: herda do FilterChip (role `button`). cortar: `analyticsId="chat.clarification_option"`, `FilterChip` (traz telemetria).
  domínio?: não.

### Sources / Files
- zenith: não existem.

### RecordingBar
- zenith: `molecules/RecordingBar/RecordingBar.tsx` (88).
- props: `elapsedSec; maxSec; level` (0..1); `onStop; onCancel; stopLabel; cancelLabel; stopping?` (false); `testID?`
  (`ds-recording-bar`).
- medidas: contêiner `card` raio `xl` padding `md` x `xs` gap `xs`; relógio `smMedium` `foreground` `"m:ss / m:ss"`; trilha de nível
  altura `xxs` 4 fundo `muted` raio `full`, preenchimento `primary`; botões `IconButton` `close` e `stop` (`destructive`).
- animação: largura do preenchimento `withTiming(level, {duration: 120})` ("sem bounce"). Estados: `stopping` desabilita os dois botões.
- a11y: labels vêm por prop (`stopLabel`, `cancelLabel`); o nível não tem `accessibilityValue`.
- cortar: `analyticsId` fixos `"chat.record_cancel"`, `"chat.record_stop"`; `formatClock` importado de `../ChatBubble/formatClock`.
  domínio?: não (a gravação em si vem de `useConversationVoice`, fora do Zenith).

## 7. Hooks e lógica sem estilo

- `hooks/usePressAnimation.ts` (50): `usePressAnimation(disabled = false)` devolve `{pressableProps: {onPressIn, onPressOut},
  animatedStyle: {opacity}}`; usa `tokens.constants.tapOpacity` (0.3), 200 ms, `Easing.inOut(Easing.ease)`. Único acoplamento: o token.
- `hooks/useKeyframeBounce.ts` (30): `{animatedStyle, trigger}`; escala 0.9 -> 1.1 -> 1.0 em 50/150/250 ms com `Easing.bezier(0.33,0,0.67,1)`.
- `hooks/useTextFieldAnimation.ts` (86): `(shouldFloat, isFocused, focusColor, unfocusedColor) => {animatedLabelStyle,
  animatedUnderlineStyle}`; 200 ms `inOut(ease)`; label `translateY 0 -> -24`, `scale 1 -> 0.75`, `transformOrigin: 'left'`; sublinhado altura
  `thin -> thick` e cor por `lerpColor` hex. Lê `tokens.borderWidths` no módulo.
- Gesto do BottomSheet: limiares 10 (início) e 100 (dismiss), 300 ms, translateY 500 (seção 5).
- Geometria de BarChart/LineChart: `slotWidth`, `barInset`, ticks `domainMax * (1 - i/4)`, `buildSmoothPath` (seção 5).
- `molecules/ChatBubble/formatClock.ts` (7): `Math.max(0, Math.floor(totalSec))`, `mm:ss`.
- `organisms/ProgressiveStatusLoader/useTimedSteps.ts` e `usePhaseRotatingSteps.ts`: temporização de etapas (6000 ms / 3000 ms).
- `internal/useItemVisibility.ts` (61) e `ScrollVisibilityContext`: visibilidade de item em scroll; só existem para telemetria
  (e para o fade do `ScrollFadeOverlay`).
- `organisms/NumericKeyboardSheet/numericKeyboardLogic.ts` (277) e `ValueSelector/valueSelectorMath.ts` (80): lógica pura de teclado
  numérico e roda (fora da onda 1).
