# Screen (Zenith `templates/Screen`, `DSScrollView` e `ContentPage/ContentPageScaffold`)

Destino: `Screen` em `@gahmp1/ds-native` e `Page` em `@gahmp1/ds-web`. Mesmas props; o nome muda porque "screen" é conceito de navegação nativa e no web a unidade é a página. O `ContentPageScaffold` deixa de existir: é um `Screen`/`Page` com `header={<HeaderTitle leading={<IconButton icon="chevron-left" .../> } .../>}`.

| Zenith `Screen` | DS |
|---|---|
| `name` (chave da tela para telemetria) | removido. O `ScreenProvider` e o `scroll_depth` automáticos saem do DS; o app mede a rolagem por `onScroll` e sabe o nome da tela |
| `scroll` | igual; com `scroll` só a área central rola, `header` e `footer` ficam fixos. O `DSScrollView` instrumentado (`scroll_depth`) vira rolagem simples |
| `edges` (`readonly Edge[]`, padrão `['top']`) | `edges?: ('top' \| 'bottom')[]`, padrão `['top']`; `left` e `right` saíram. No web vira `padding` com `env(safe-area-inset-top/bottom)` |
| `header` | igual: fixo acima da área central |
| (novo) `footer` | fixo abaixo da área central (barra de abas, botão de ação) |
| `children` | igual |
| `overlays` | removido: um filho posicionado cobre o caso (o `ScrollFadeOverlay` é o `ScrollFade` do DS, composto pelo app) |
| `background` (fundo full-bleed atrás da área segura) | removido: o fundo é sempre o `bg` do tema; cena de fundo é o `GlowScene` composto dentro da tela |
| `refreshControl` | removido: puxar para atualizar é o `PullToRefresh` (Task 21b) |
| `scrollEnabled`, `showsVerticalScrollIndicator` | removidos |
| `style`, `scrollStyle`, `contentContainerStyle` | removidos (identidade pelos eixos do tema; o respiro interno é de quem compõe, com `Stack`/`Box`) |
| `testID` | removido |
| (novo) `onScroll` | o evento de rolagem da plataforma (`UIEvent` do `div` no web, o do `ScrollView` no nativo), só com `scroll`. É o que o app usa para o `scroll_depth` |

Fundo `bg` do tema na tela inteira, inclusive sob a área segura. No web a página ocupa `100%` da altura do pai (`block-size: 100%`), então o pai (o `#root`, uma moldura) precisa ter altura; a área central rola com `overflow-y: auto` e `overscroll-behavior: contain`, e ganha `tabindex=0` para quem rola só com o teclado.
