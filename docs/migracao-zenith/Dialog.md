# Dialog (sem origem no Zenith)

O Zenith não tem diálogo centrado: as confirmações do SWFitness usam hoje um `BottomSheet` com botões (há um único `Alert.alert` do React Native, em `OnboardingFlow/ensureProfileSaved.ts`). O `Dialog` do DS é novo, em `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. Origem: Radix Dialog (`radix-ui`, MIT) no web, com a entrada e a saída pela mola do tema (`motion`); `Modal` centrado no nativo.

| Prop | O que faz |
|---|---|
| `open`, `onClose` | controlado; `onClose` vem de Esc, clique no fundo ou do app |
| `title` | obrigatório; é o nome acessível do diálogo |
| `description?` | texto `base` em `textMuted`; vira a descrição acessível |
| `actions?: ReactNode` | linha de botões alinhada ao fim, quebrando linha se faltar espaço; o app monta com `Button` (ex.: `ghost` + `primary`) |
| `destructive?` | título em `danger` com ícone `warning`; a cor não é o único sinal. A ação principal destrutiva continua sendo um `Button variant="danger"` escolhido pelo app, porque `actions` é livre |

Superfície `surface2`, raio `radius.xl`, traço `borderMuted`, sombra `shadow.overlay` só com `depth.model = 'shadow'`; fundo é o `scrim` do tema. Largura até 420 px com 24 px de respiro nas bordas.

Acessibilidade: `role="dialog"` modal com `aria-labelledby` e `aria-describedby` (omitido sem `description`); foco preso e devolvido a quem abriu; Esc fecha só o overlay de cima. Não há botão fechar: quem precisa de uma saída explícita põe um "Cancelar" nas `actions`.

Telemetria: `{ component: 'Dialog', kind: 'open' | 'close', label: title }` quando `open` muda.
