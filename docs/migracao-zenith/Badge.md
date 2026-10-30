# Badge (sem origem genérica no Zenith)

O Zenith não tem `Badge`: só os wrappers de domínio de `Tag`. O padrão vem do Animated Badge da beUI Native (MIT). Destino: `Badge` de
`@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| Prop | Efeito |
|---|---|
| `count?: number` | número; acima de 99 mostra `99+`; zero (ou ausente, sem `dot`) não desenha o selo |
| `dot?: boolean` | ponto de 8 sem texto ("novo") |
| `tone?: Tone` | os seis tons do `Tag`; padrão `danger`. Cheio, com o `on*` do papel como texto; `neutral` = `surface3` com `text` |
| `children?` | âncora: o selo fica sobre o canto superior direito, com um anel da cor `bg` |

Movimento: a troca de número rola em `duration.fast` (o antigo sai e o novo entra; para cima se subiu, para baixo se caiu); com movimento
reduzido, troca seca. Nativo: Reanimated, `Roll.tsx`; web: `AnimatePresence` do `motion`.

Acessibilidade: o selo tem nome com a contagem (`99+` acima de 99) e o ponto usa `strings.new` ("Novo", string nova no `ds-core`);
nativo: `accessibilityRole="text"`; web: `role="img"` com `aria-label` e o texto visível escondido. A âncora mantém o próprio nome.
`Text` ganhou as cores `onSuccess`, `onWarning` e `onInfo` (o selo precisa do texto sobre cada tom).
