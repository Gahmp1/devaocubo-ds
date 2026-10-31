# Menu (sem origem no Zenith)

O Zenith não tem menu de ações (as ações secundárias abrem um `BottomSheet`). O `Menu` do DS é novo, em `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. Web: Radix DropdownMenu (`radix-ui`, MIT). Nativo: `Sheet` com lista de `ListItem`.

| Prop | O que faz |
|---|---|
| `trigger: ReactNode` | **conteúdo** do gatilho (texto e/ou ícone, sem controles dentro). O `Menu` o envolve num `<button>` de alvo mínimo 44, que herda o nome acessível do conteúdo. Não passe um `Button`/`IconButton` aqui (botão dentro de botão) |
| `items` | lista de `{ key; label; icon?; destructive?; onSelect() }` ou `'separator'` |

Item: altura 44, ícone opcional por `DSIconName` pelo `Icon` do provedor, `destructive` pinta o item de `danger`, realce `surface3`. Separador: traço `borderMuted`. Popup `surface2`, `radius.lg`, sombra `shadow.overlay` só com `depth.model = 'shadow'`.

Acessibilidade: Radix entrega `menu`/`menuitem`, setas com volta ao fim, busca por digitação, Esc fecha e o foco volta ao gatilho. Gatilho só com ícone fica sem nome: ponha um texto no `trigger` (limitação da API da tabela; um `accessibilityLabel?` resolveria).

Telemetria: `{ component: 'Menu', kind: 'open' | 'close' }` ao abrir e fechar, e `{ kind: 'press', id: key, label }` ao escolher um item.
