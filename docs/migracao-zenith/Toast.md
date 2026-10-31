# Toast (Zenith `organisms/Toast`)

Destino: `Toast` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API, em três peças: `ToastHost` (provedor e palco), `useToast()` (`show`) e o componente interno `Toast` (não exportado: o app nunca monta um toast à mão). Base de interação: Sonner (MIT) e Radix Toast (MIT), recriados.

| Zenith | DS |
|---|---|
| `<Toast message variant visible onHide duration />` montado em cada tela | `<ToastHost>` uma vez, dentro do `DSProvider`; em qualquer ponto, `useToast().show({ title, ... })`. Acabaram o `visible`, o `onHide` e o estado local por tela |
| `message` | `title` (obrigatório) + `description?` |
| `variant` `success/error/info` | `tone` `success/danger/neutral` (padrão `neutral`). O Zenith pintava o fundo inteiro (verde, vermelho, branco); aqui o fundo é `surface2` e o tom aparece no ícone (`success`/`error`) e no anúncio do leitor de tela, nunca só na cor |
| `duration` (padrão 3000) | `durationMs?`; padrão pelo tema (abaixo) |
| (não existia) | `action?: { label, onPress }`: botão `ghost` pequeno; tocar executa e dispensa |
| (não existia) | fila: vários `show` seguidos aparecem um depois do outro, nunca empilhados |
| `testID` | removido |
| `StatusBar.currentHeight` / `insets.top` à mão | `env(safe-area-inset-top)` no web |

## Comportamento

- **Permanência**: o tema não tem eixo de toast, então o padrão segue `motion.personality`: `calm` 5 s, `snappy` 4 s; com `action`, 1,5 vez isso (WCAG 2.2.1). `durationMs` do app vence.
- **Pausa**: cursor sobre o toast ou foco dentro dele congela a contagem; ao sair, continua de onde parou.
- **Dispensar**: botão fechar (`strings.close`) e arrastar para o lado (80 px ou 500 px/s). Não rouba o foco; Esc não é tratado (o Radix Dialog escuta Esc no documento e fecharia os dois).
- **Movimento**: entrada e saída pela mola do tema (`useOverlayTransition`); com movimento reduzido, sem deslocamento.
- **Posição**: topo, centrado, até 420 px, acima dos overlays (`z-index` 1100) e clicável mesmo com um modal aberto.
- **Feedback sensorial**: `success` toca `confirm` e `danger` toca `error` ao aparecer; `neutral` não toca nada.
- **Telemetria**: `{ component: 'Toast', kind: 'open', label: title }` ao aparecer (a ação passa pelo `Button`, que emite o seu `press`).

## Acessibilidade

Duas regiões vivas sempre montadas e escondidas visualmente, `role="status"` (neutro e sucesso) e `role="alert"` (erro), recebem `título. descrição` quando o toast aparece e esvaziam quando sai; o toast visível em si não é região viva (uma região inserida junto com o texto pode não ser anunciada, e assim o botão da ação continua alcançável). Limite conhecido: o toast fica no fim do documento, então quem navega só por teclado chega a ele com Tab depois do resto da página; e um modal do Radix aberto antes do primeiro `show` aplica `aria-hidden` às regiões já montadas.

Limites conhecidos (revisão da fatia D): no nativo o toast fica na árvore do app, então um `Modal` aberto (Dialog, Sheet, Select) o cobre; é uma limitação do RN, não do DS. No web um modal do Radix aberto deixa as regiões vivas inertes. O tom `danger` anuncia como assertivo nas duas plataformas; os demais, como educado.
