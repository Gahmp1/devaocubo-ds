# Callout (Zenith `organisms/TipCallout`)

Destino: `Callout` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. Recria o `TipCallout`, que espelhava o `ZenithTipStyle` do TipKit do iOS.

| Zenith | DS |
|---|---|
| `message: string` | `children: ReactNode` |
| (não existia) | `title?: string` acima do texto |
| `icon?: string` (24×24) | removido: a tabela da task não traz ícone; o balão é título, texto e fechar |
| `arrowDirection` `down/up` (padrão `down`) | `placement` `bottom/top` (padrão `bottom`), o **lado do bico**: `bottom` aponta para um alvo abaixo do balão (o `down` do Zenith), `top` para um acima |
| `onDismiss` | `onClose`; o botão só aparece com ele |
| `t('components.tipCallout.close', 'Fechar dica')` (i18n próprio) | `strings.close` |
| `testID` | removido |
| bolha `foreground` (branca) com texto `foregroundInverse`; bico por bordas | bolha `text` com texto `bg` (invertida em qualquer tema); bico por `clip-path`, na mesma cor |

Raio `radius.lg`; respiro `md`/`lg`; botão fechar é o `IconButton` pequeno (alvo de 44 px) em `bg`. No web, `role="note"`; o bico é decorativo. O `Callout` não se posiciona sozinho (não mede o alvo): o app o coloca onde quer, acima ou abaixo do alvo, e escolhe o `placement` do bico.
