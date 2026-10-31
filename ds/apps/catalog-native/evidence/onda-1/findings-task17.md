# QA da Task 17 (Screen/Page, HeaderTitle, TabBar, SegmentedControl), 2026-10-31

Parcial: Android, leitor de tela e toque nativo ficam para a Task 22.

| Item | Web (Storybook, 375 px) | iOS (simulador próprio) |
|---|---|---|
| 4 componentes em swfitness escuro/claro, somma escuro, trippo claro, devaocubo claro | PASS (55 capturas, 0 erros de console) | PASS em swfitness escuro, trippo claro, somma escuro (12 capturas `ios-D-*`) |
| TabBar: setas movem e ativam, clique, `aria-selected`/`tabindex`, pílula sob a aba ativa | PASS | não tocado |
| SegmentedControl com 4 rótulos longos | PASS depois do ajuste | PASS (rótulos encolhem) |

## Ajustado na QA
- `SegmentedControl` web quebrava palavra no meio ("Hipertr/ofia") com 4 opções em 375 px. Agora o rótulo encolhe até 0,7 do tamanho (como no nativo) e só quebra em espaços.
- `TabBar` web usava pílula `accent` com ícone `onAccent`; o nativo (e o Zenith) usa pílula `surface3` com ícone `accent`. Web alinhado ao nativo.
- `Screen` nativo: `edges` padrão passou de `['top','bottom']` para `['top']`, igual ao `Page` web e ao Zenith.

## Não verificado
- Pílula deslizando e `Glow` da aba no nativo (sem toque no simulador); medição do canvas Skia a cada toque; desfoque `glass` no Android.
- Rótulo da aba nativa trunca com fonte muito ampliada (sem `maxFontSizeMultiplier`, por decisão do agente).
- `TabBar`/`SegmentedControl` não têm `interactionId` (a tabela do plano não pede); a telemetria usa `key`/`value`.
- Ícones de aba do Zenith (home, usuário, gráfico) não existem em `DSIconName`; as galerias usam outros.
