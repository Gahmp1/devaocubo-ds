# Task 18: Sheet, Dialog, Select, Menu (iOS, iPhone 17 Pro, iOS 26.5, tema swfitness escuro)

Verificado no simulador com Maestro; Android fica para a Task 22.

| Caso | Resultado | Evidência |
| --- | --- | --- |
| Sheet de altura do conteúdo abre e fecha por toque no fundo | PASS | `ios-D-sheet-basico.png`, `ios-D-sheet-fechou-scrim.png` |
| Sheet com rodapé fixo | PASS | `ios-D-sheet-rodape.png` |
| Sheet de conteúdo alto: lista rola, rodapé fixo | PASS | `ios-D-sheet-alto.png` |
| Arrasto da alça fecha a gaveta alta | PASS | `ios-D-sheet-alto-fechou-alca.png` |
| Duas alturas: 280, arrasta para 560, volta para 280, arrasta e fecha | PASS | `ios-D-sheet-alturas-*.png` |
| Gaveta não dispensável ignora toque no fundo e arrasto | PASS | `ios-D-sheet-nao-dispensavel.png` |
| Dialog normal e destrutivo (ícone e botão em `danger`) | PASS | `ios-D-dialog-normal.png`, `ios-D-dialog-destrutivo.png` |
| Dialog fecha por toque no fundo | PASS | `ios-D-dialog-lista.png` (antes), flow `dlg2` |
| Dialog sobre gaveta: fechar o diálogo mantém a gaveta | PASS | `ios-D-dialog-sobre-gaveta.png`, `ios-D-dialog-gaveta-continua.png` |
| Select: lista com check, opção desabilitada, rótulo longo quebra linha | PASS | `ios-D-select-aberto.png` |
| Select: escolher fecha a gaveta e atualiza o valor | PASS | `ios-D-select-libras.png` |
| Menu: separador, item destrutivo, `onSelect` + fechar | PASS | `ios-D-menu-aberto.png`, `ios-D-menu-escolhido.png` ("Última ação: compartilhar") |

## Não verificado
- Android inteiro (botão Voltar com Dialog sobre Sheet incluso): Task 22.
- VoiceOver/TalkBack, anúncio do título ao abrir Dialog, haptics reais.
- Movimento reduzido nestes componentes.
- Fonte no tamanho máximo.

## Observações
- Toque a 5% da altura cai na área da barra de status e não chega ao scrim; testes usaram 8-15%.
- Sheet sem título não tem nome acessível; Select não aceita valor vazio; Dialog não tem botão de fechar (por desenho, fecha por fundo/Voltar).
