# TabBar (Zenith `organisms/TabBar`: `TabBar`, `TabBarItem`; `molecules/BlurPress`)

Destino: `TabBar` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. O `BlurPress` do Zenith não é componente do DS: o toque com glow de cada aba virou a pílula ativa e o toque do tema (`motion.press`).

| Zenith | DS |
|---|---|
| `useTabStore` (aba selecionada, `setSelectedTab`) | `value: string` e `onChange(key)`: o componente é controlado e não conhece a navegação |
| `TAB_ROUTES` (`key`, `icon`) | `items: { key; label; icon: DSIconName; badge? }[]`; o ícone é por `DSIconName` pelo `Icon` do provedor (era `DynamicImage` com PNG) |
| (sem rótulo; só ícone) | `label` obrigatório: aparece sob o ícone e dá o nome acessível da aba |
| (novo) `badge` | selo numérico (`Badge`, `99+` acima de 99) sobre o ícone |
| `tabBarVisible` e a animação de esconder (opacidade + `translateY`) | removidos: esconder a barra é não renderizar o `footer` da tela |
| indicador `Blur` de três camadas que desliza (`withTiming` 280 ms) | pílula `surface3` que desliza com a mola do tema (`motion` `layoutId` no web; Reanimated no nativo); com movimento reduzido troca sem deslizar |
| cápsula `card` (um só visual) | `variant` `'floating' \| 'glass' \| 'solid'`, padrão `components.tabBar` do tema. `floating`: cápsula flutuante centrada, traço `borderMuted` e sombra só com `depth.model = 'shadow'`; `glass`: largura toda sobre o `Blur`; `solid`: largura toda em `surface1` |
| cores `primary` (ativo) e `mutedForeground` | ativo: pílula `surface3` com o rótulo em `text` e o ícone em `accent`; inativo: `textMuted` |
| `testID="tab_<key>"` | removido |
| `analyticsId` e a telemetria por toque | evento `{ component: 'TabBar', kind: 'change', id: key, label, value: key }` ao trocar de aba; não há `interactionId`, o `key` da aba é o id |

Troca de aba toca o papel `select` do `useFeedback()` (só quando o valor muda; tocar na aba ativa não chama `onChange`).

Acessibilidade: `role="tablist"` com `role="tab"` e `aria-selected` (`accessibilityRole="tab"` e `accessibilityState.selected` no nativo). No web só a aba ativa entra na sequência do Tab; setas esquerda/direita (invertidas em RTL), Home e End movem o foco e ativam a aba. Alvo mínimo 44, foco visível com `--ds-color-focus`.
