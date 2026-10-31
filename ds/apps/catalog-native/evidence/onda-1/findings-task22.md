# Task 22: QA da fatia D (Android e fechamento)

Android: emulador `DS_Onda1_QA_20261031_013856` (API 36, arm64), APK debug do próprio worktree, Metro porta 8187 com `adb reverse`, tema swfitness escuro, Gilroy. iOS e web: `findings-task18.md` a `findings-task21.md` e `ds/apps/catalog-web/evidence/onda-1/composicao/`.

| Caso | Android | Evidência |
| --- | --- | --- |
| Voltar fecha o Sheet; Sheet não dispensável ignora Voltar | PASS | `android-D-sheet-*` |
| **Voltar com Dialog sobre Sheet:** 1º Voltar fecha só o Dialog, 2º fecha o Sheet (Review Focus 5) | PASS | `android-D-dialog-voltar-*` |
| Select (check, desabilitada, rótulo longo) e Menu (`onSelect`) | PASS | `android-D-select-*`, `-menu-*` |
| Toast sucesso e com ação ("Desfazer") | PASS | `android-D-toast-*` |
| CircularProgress, BarChart, LineChart (gradiente), Feedback, Callout, Stepper, DataList | PASS | `android-D-*.png` |
| PullToRefresh: cruza o limiar, "atualizando", "concluído", rolagem normal depois | PASS | `android-D-pull-to-refresh-*` |
| Ação acessível "Atualizar" presente na árvore de acessibilidade (`content-desc`, clicável) | PASS | `uiautomator dump` |
| Movimento reduzido: gráfico já na altura final, Sheet e Toast aparecem sem deslizar, Pull mostra o indicador parado | PASS | `android-D-reduzido-*` |

## Não verificado (limites desta rodada)
- **Leitores de tela reais** (VoiceOver, TalkBack): anúncio educado do Toast (região viva / `announceForAccessibility`), `adjustable` do Stepper, foco ao abrir Dialog. Só conferi atributos no DOM e na árvore do Android.
- Haptics e sons reais (`pull-commit`, `confirm`, `error`); desfoque glass do TabBar no Android; fonte no tamanho máximo no Android; tablet/paisagem; teclado físico no Android.
- Esc com Dialog sobre Sheet no web (Radix): comportamento esperado do Radix, não exercitado em navegador.
- Toast com `Sheet`/`Dialog` aberto no nativo fica atrás do `Modal` (limite do RN).
- Em movimento reduzido o indicador do PullToRefresh aparece sobre a primeira linha (por desenho).

## Pendências de API conhecidas (registradas, não bloqueiam)
`accessibilityLabel` em CircularProgress; chave `strings.empty`; `kind` de refresh em `InteractionEvent`; ícone `inbox`; `interactionId` ausente na maioria dos compostos.
