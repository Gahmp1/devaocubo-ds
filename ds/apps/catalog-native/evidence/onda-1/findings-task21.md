# Tasks 21 e 21b: Table (web), DataList (RN), PullToRefresh (web e RN)

iOS: iPhone 17 Pro, iOS 26.5, swfitness escuro, Gilroy. Web (Storybook, devaocubo claro e swfitness escuro) em `ds/apps/catalog-web/evidence/onda-1/composicao/`.

| Caso | Resultado | Evidência |
| --- | --- | --- |
| Table: 5 linhas, ordenado, vazio, 375 px com rolagem própria (sem estourar a página) | PASS | pasta web (`table--*`, `table--375-real`) |
| Table: `aria-sort` e ordenação por Enter no cabeçalho | PASS (DOM) | script Playwright |
| DataList: 3 itens com texto longo quebrando, vazio | PASS | `ios-D-data-list.jpg` |
| PullToRefresh nativo: puxar da lista cruza o limiar, `onRefresh` na hora (estado "atualizando", conteúdo segurado, Spinner) | PASS | `ios-D-pull-to-refresh-atualizando.png` |
| PullToRefresh nativo: "concluído" e rolagem normal da lista depois | PASS | `ios-D-pull-to-refresh-concluido-rolando.png` |
| PullToRefresh web: cruzar com o mouse chama `onRefresh`, `aria-busy`, volta a `idle` | PASS (DOM) | script Playwright, stories Puxando/LimiarCruzado/Atualizando/Concluido |

## Ajuste na integração
- O web chamava `onRefresh` ao soltar; o plano manda o compromisso ao cruzar o limiar. Corrigido (`request()` no cruzamento; soltar só decide se a área fica no limiar).

## Não verificado
- Android; VoiceOver/TalkBack (ação "Atualizar"); haptics/som `pull-commit` reais; movimento reduzido; toque real (touchmove) no web em dispositivo; cancelar puxando abaixo do limiar e soltar; limiar 120 no nativo.
- Contrato diferente: web cria a área rolável, nativo recebe `children` como função e exige o ScrollView do gesture-handler.
- `empty` sem texto padrão (sem chave em `DSStrings`); telemetria do PullToRefresh só no web.
