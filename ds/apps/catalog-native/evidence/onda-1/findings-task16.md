# QA da Task 16 (Card, ListItem, DetailedListItem, StatCard, Metric), 2026-10-31

Parcial: a QA completa da fatia D (Android, voltar/Esc, leitor de tela) acontece na Task 22.

| Item | Web (Storybook, 375 px) | iOS (iPhone 17 Pro, simulador próprio) |
|---|---|---|
| 5 componentes × swfitness escuro/claro, somma escuro, trippo claro, devaocubo claro | PASS (85 capturas, 0 erros de console) | PASS em swfitness escuro/claro, somma escuro, trippo claro (20 capturas `ios-D-*`) |
| Card pressionável: clique conta, anel de foco por teclado, alvo ≥ 44 px | PASS (76 px, foco visível) | não tocado (sem toque no simulador sem painel) |
| Fonte do sistema no máximo (accessibility XXXL) | n/a | PASS sem sobreposição; título do `DetailedListItem` fica estreito (uma palavra por linha) porque mídia, anel e chevron têm largura fixa |
| Gilroy / Geist / Plex reais nas galerias | PASS | PASS |

## Ajustado na QA
- `Metric` nativo: glifo de tendência e unidade alinhavam pela base da caixa do ticker (soltos); agora centralizados.

## Não verificado
- Android; toque real nos componentes pressionáveis no nativo; VoiceOver/TalkBack; movimento reduzido nesses cinco componentes.
- Skeleton em trippo claro quase não aparece (superfície ≈ fundo); comportamento do `Skeleton` da fatia B, não desta task.
- Direção de `StatCard`/`Metric` não é anunciada por leitor de tela (`DSStrings` não tem rótulo de tendência); o sinal vai em `delta.value`.
