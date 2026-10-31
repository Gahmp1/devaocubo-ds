# Metric (agent-chat `widgets/metric.tsx`)

Sem origem no Zenith. Base: o widget `Metric` do agent-chat (`packages/agent-chat-react-native/src/widgets/metric.tsx`); destino: `Metric` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| agent-chat (`MetricV1`) | DS |
|---|---|
| `label` + `period` ("rótulo · período") | `label` (o período entra no texto) |
| `value: { amount, ... }` + `formatValue(value, locale)` | `value: number` + `format?: (n: number) => string`, o mesmo do `NumberTicker` |
| (unidade dentro do valor formatado) | `unit?: string`, texto `sm` em `textMuted` depois do número |
| `delta` (valor formatado e sinal) | `trend?: 'up' \| 'down' \| 'flat'`: só a direção, em ícone na cor do papel (`success`, `danger`, `textMuted`); o valor da variação, se houver, é o `StatCard` |
| `context` | removido |
| `testID`s | removidos |

O número usa o `NumberTicker` (texto `xlMedium`): as casas que mudam rolam, com movimento reduzido trocam direto. `up` e `down` fixam o sentido da rolagem; `flat` e ausente seguem a variação do valor. O ícone é decorativo e `trend` não tem texto próprio para leitor de tela (o `DSStrings` não tem rótulo de tendência).
