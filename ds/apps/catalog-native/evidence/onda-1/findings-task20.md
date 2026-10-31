# Task 20: CircularProgress, BarChart, LineChart (iOS, iPhone 17 Pro, iOS 26.5, swfitness escuro, Gilroy)

Web (Storybook, devaocubo claro e swfitness escuro) em `ds/apps/catalog-web/evidence/onda-1/composicao/`.

| Caso | Resultado | Evidência |
| --- | --- | --- |
| CircularProgress 0, 0,6, 1; com texto; tons; tamanho e espessura | PASS | `ios-D-circular-progress.jpg` |
| BarChart 7 barras, destaque com valor formatado, altura menor | PASS | `ios-D-bar-chart.jpg` |
| LineChart linha, área, dois pontos, carregando, troca de dados | PASS (após correção do gradiente) | `ios-D-line-chart.jpg`, `ios-D-line-chart-carregando.png` |
| ListItem/DetailedListItem com o anel trocado pelo CircularProgress | PASS | `ios-D-*-pos-circular.jpg` |
| Web: três componentes, dois temas, anel de lista | PASS | pasta web |

## Defeitos achados e corrigidos na integração
- Web: `bar-chart.css` não existia (barras pretas no escuro); criado.
- Nativo: área do LineChart saía opaca (`stopColor` com alfa é ignorado); passou a `stopOpacity`.
- Defaults alinhados: CircularProgress 56 / espessura `thick × 2`, gráficos com altura 160; anel de lista com 44/4 nas duas plataformas.

## Diferenças conhecidas web × nativo
- Área do LineChart: web com preenchimento chapado a 16%, nativo com gradiente de 30% a 0.
- Arco/linha: web anima `pathLength`; nativo anima `strokeDashoffset` e a linha por máscara.

## Não verificado
- Android; VoiceOver/TalkBack; movimento reduzido nestes componentes (só lido no código); BarChart com muitas barras ou rótulos longos (sem truncamento); LineChart com um ponto.
- O anel do DetailedListItem agora é `progressbar` chamado "Carregando" (nome de `strings.loading`); falta prop `accessibilityLabel` no CircularProgress.
- `DSStrings` sem "sem dados": BarChart vazio mostra só a linha de base.
