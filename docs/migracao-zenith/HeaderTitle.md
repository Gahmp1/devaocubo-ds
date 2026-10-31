# HeaderTitle (Zenith `molecules/HeaderTitle` e `molecules/TabScreenTitle`)

Destino: `HeaderTitle` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. O `TabScreenTitle` do Zenith vira `size="large"`.

| Zenith | DS |
|---|---|
| `title` | igual; texto `xlMedium` no grande e `lgMedium` no compacto, quebra em várias linhas e nunca é cortado |
| (novo) `subtitle` | texto `sm` em `textMuted` abaixo do título |
| (novo) `size` `'large' \| 'compact'` | padrão `components.header` do tema. `large` = o `TabScreenTitle` (`xlMedium`, respiro `lg` acima e abaixo); `compact` = o `HeaderTitle` (`lgMedium`, respiro `sm`) |
| `variant` `contentA/contentB/contentC/brandA` | removido: o título é sempre `text`. Cor por tela era variação de uma tela, não do sistema |
| `actions: { icon, onPress }[]` | `trailing?: ReactNode`: o app põe `IconButton`s (que já têm toque do tema e rótulo obrigatório) |
| `actionIcon`, `onActionPress` (já `@deprecated`) | removidos |
| (novo) `leading?: ReactNode` | antes do título (voltar, avatar); cobre o cabeçalho do `ContentPageScaffold` |
| `isShimmering` | `loading`: `Skeleton` no lugar do título (e do subtítulo, se houver), com `role="status"` e o nome `strings.loading`; `leading` e `trailing` continuam |
| `testID` | removido |
| `TAB_SCREEN_TITLE_TOP_OFFSET` (folga fixa de 56 sob o fade do topo) | removido: quem usa um `ScrollFade` no topo compõe a folga |

Semântica: no web é um `<header>` com o título em `<h1>` (o DS não tem prop de nível; tela com mais de um título compõe o seu); no nativo, `accessibilityRole="header"` no título.
