# Feedback (Zenith `organisms/Feedback`)

Destino: `Feedback` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| Zenith | DS |
|---|---|
| `type` `success/error/critical/warning/caution/brandA` | `kind` `empty/success/error`. `critical` já era alias de `error`; `warning`, `caution` e `brandA` saíram (eram variações de cor de ícone: o estado é o que importa) e ganhou-se `empty`, que o Zenith resolvia com tela própria |
| `title`, `subtitle` | `title`, `description?` |
| `icon?: ReactNode` | removido: o ícone vem de `DSIconName` pelo provedor (`empty` → `file`, `success` → `success`, `error` → `error`) |
| `primaryButton` + `secondaryButton` (com `variant`, `analyticsId`, `testID`) | `action?: { label, onPress }`, um só botão; a ação secundária fica com o app (um `Button` ao lado, se precisar). `analyticsId` some: o `Button` emite o próprio `press` com o rótulo |
| `transparent`, `spacing: 'relaxed'` | removidos (fundo e ritmo vêm do tema; o app põe o `Feedback` sobre o fundo que quiser) |
| `useSafeAreaInsets` somado ao respiro de baixo | removido: a área segura é da `Page`/`Screen` que contém o `Feedback` |
| (não existia) | `layout?: 'screen' \| 'inline'` (padrão `screen`) |

## Layouts

- `screen`: ocupa a altura do pai e centraliza o bloco (o pai precisa ter altura); título `xlMedium` em `h2`, botão `primary`. O Zenith alinhava à esquerda com os botões presos à base; aqui o bloco é centrado e o botão fica logo abaixo do texto.
- `inline`: só a altura do conteúdo, para dentro de listas e cards; título `baseMedium` em `p` (não cria nível de título dentro de uma lista), descrição `sm`, botão `outline`.

Círculo do ícone `surface2` (56 em `screen`, 40 em `inline`; o Zenith usava 56 num escuro translúcido fixo), ícone em `textMuted` / `success` / `danger`.

## Acessibilidade

`error` é `role="alert"` (anunciado ao montar), `success` é `role="status"`, `empty` é só conteúdo. O ícone é decorativo: o tipo vem do título e da descrição.
