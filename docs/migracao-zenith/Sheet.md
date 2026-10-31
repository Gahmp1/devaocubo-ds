# Sheet (Zenith `organisms/BottomSheet` e `molecules/SheetRow`)

Destino: `Sheet` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. No web é o Radix Dialog (`radix-ui`) como gaveta inferior, com a entrada e a saída pela mola do tema (`motion`). O `SheetRow` deixa de existir: as linhas de opção são `ListItem` com `selected` (ver `ListItem.md`).

| Zenith `BottomSheet` | DS |
|---|---|
| `visible` | `open` |
| `onDismiss` | `onClose` (o Zenith esperava os 300 ms da animação antes de chamar; aqui é chamado na hora e o app só desmonta o conteúdo ao fechar) |
| `children` | `children`; o corpo rola quando não cabe |
| `backgroundColor`, `overlayOpacity`, `closeVariant` | removidos: fundo `surface1`, scrim da cor `scrim` do tema, botão fechar `IconButton` (identidade só pelos eixos do tema) |
| `hasClose` | o botão fechar (`strings.close`) aparece quando `dismissible` |
| `dismissOnBackdrop`, `dismissOnRequestClose`, `dragToDismiss` | uma só prop, `dismissible` (padrão `true`): `false` desliga Esc, clique no fundo, arrastar e o botão fechar; o app fecha por conta própria (ex.: ação no `footer`) |
| `hasDragIndicator` | a alça 36×4 sempre aparece (cor `textSubtle`) |
| `fullHeight` | `snap={[numero]}` (limitado a 90% da tela) |
| `PanResponder` (thread de JS) | `motion` (`drag="y"`) no web; só a alça e o cabeçalho arrastam, para o corpo rolar sem disputar o gesto. Passando de 96 px ou 600 px/s para baixo: altura anterior, ou fecha na primeira; para cima: próxima altura |
| `testID` | removido |
| (novo) `title?` | título `lgMedium` no cabeçalho, ligado ao diálogo (`aria-labelledby`) |
| (novo) `snap?: ('content' \| number)[]` | alturas da menor para a maior; `'content'` = altura do conteúdo, número = px. Padrão `['content']`. Trocar entre dois números anima; de ou para `'content'` troca sem animar |
| (novo) `footer?` | rodapé fixo, com `safe-area-inset-bottom`, separado do corpo por um traço `borderMuted` |

Raio `radius.xl` só no topo, traço `borderMuted` e sombra `shadow.overlay` somente com `depth.model = 'shadow'`. Largura máxima de 560 px, centralizada.

Movimento reduzido (`data-reduced-motion`): sem deslize nem fade, a gaveta entra e sai na hora.

Acessibilidade: `role="dialog"` modal (Radix), foco preso e devolvido a quem abriu, `aria-hidden` no resto, Esc fecha só o overlay de cima (um `Dialog` aberto sobre um `Sheet` fecha sozinho). Sem `title` o diálogo fica sem nome acessível: o Radix exige o elemento e ele é renderizado vazio e oculto.

Telemetria: `{ component: 'Sheet', kind: 'open' | 'close', label: title }` quando `open` muda.
