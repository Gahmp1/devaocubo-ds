# ScrollFade (Zenith `molecules/ScrollFadeOverlay`, camada de movimento)

Destino: `ScrollFade` de `@gahmp1/ds-native/motion` e `@gahmp1/ds-web/motion`.

| Zenith | DS |
|---|---|
| `ScrollFadeOverlay edge="top" \| "bottom"`, um por borda, irmão absoluto do `ScrollView` | `ScrollFade edges={['top', 'bottom']}` envolve a rolagem: o componente é o `ScrollView` (nativo) ou o `div` rolável (web) |
| `height` (48) | `size` (48): altura do degradê e distância de rolagem em que ele acende ou apaga |
| `steps` e `maxOpacity` | fora: o degradê é contínuo (nativo: `LinearGradient` do `react-native-svg`; web: `mask-image`), sem fatias |
| `ScrollVisibilityContext` do `DSScrollView` do app | fora: o `ScrollFade` mede a própria rolagem (nativo: `useAnimatedScrollHandler` do Reanimated, opacidade na thread de UI; web: `scrollTop` e `ResizeObserver`) |
| cor `tokens.colors.background` | nativo: `color.bg` do tema; web: máscara de alfa, sem cor |

Mantido do Zenith: cada borda só aparece quando ainda há conteúdo daquele lado, e some em `size` de rolagem restante
(lista curta ou já rolada até o fim não mostra a borda).

A atenção do Zenith ao `<Svg>` branco no iOS (comentário do arquivo original) fica para a conferência visual da fatia C: a
`Shimmer` já usa `react-native-svg` sobre fundo transparente, e o `ScrollFade` segue o mesmo molde (sem `backgroundColor` no
`Svg`). Se o iOS pintar branco, a troca é por `View` com `opacity` em fatias, como no Zenith.

Fica fora: rolagem horizontal, e fade sobre um fundo que não seja `bg` (o Zenith também avisa: scrim opaco sobre `backgroundGlow`
cria borda visível). Nesse caso a borda precisa da cor do fundo real.
