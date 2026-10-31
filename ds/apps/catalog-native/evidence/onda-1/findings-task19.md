# Task 19: Toast, Feedback, Callout, Stepper (iOS, iPhone 17 Pro, iOS 26.5, swfitness escuro)

Web (Storybook, devaocubo claro e swfitness escuro) em `ds/apps/catalog-web/evidence/onda-1/composicao/`.

| Caso | Resultado | Evidência |
| --- | --- | --- |
| Toast sucesso, perigo, com ação (título longo quebra linha), "Desfazer" executa e dispensa | PASS | `ios-D-toast-sucesso.png`, `-perigo`, `-acao`, `-acao-tocada` |
| Toast dispensado por arrasto para cima | PASS | `ios-D-toast-dispensado-swipe.png` |
| Fila de três: um visível por vez, avança sozinho | PASS | `ios-D-toast-fila-1.png` |
| Toast web: `status` para neutro/sucesso, `alert` para erro, sem roubar foco, fila, ação | PASS (DOM + capturas) | pasta web |
| Feedback (empty, success, error; inline e tela) | PASS | `ios-D-feedback.jpg` |
| Callout com bico embaixo/em cima, fechar | PASS | `ios-D-callout.jpg` |
| Stepper: limites, passo 0,5 com formato, sem erro de ponto flutuante, fonte Geist Mono | PASS | `ios-D-stepper*.{jpg,png}` |

## Ajustes feitos na integração
- Permanência do Toast alinhada: `calm` 5000 ms, `snappy` 4000 ms, ×1,5 com ação (antes o nativo usava 4000/8000).
- `Stepper` nativo ganhou `accessibilityLabel?` (o web já tinha); `Feedback` vazio usa `file` nas duas plataformas.

## Não verificado
- Android; VoiceOver/TalkBack (anúncio do toast, `adjustable` do Stepper, regiões vivas web com leitor real); haptics; movimento reduzido.
- Toast com `Sheet`/`Dialog` aberto no nativo: fica atrás do `Modal` (limite do RN; tratar na Task 22 ou documentar).
- Esc no Toast web não é tratado (por desenho); timer do toast nativo não pausa no arrasto.
