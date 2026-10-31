// Referência: agent-chat widgets/metric.tsx (rótulo acima, valor grande, delta); a rolagem por dígito é o `NumberTicker`.
import { NumberTicker } from '../../motion/NumberTicker/index.js'
import { TrendMark, type TrendDirection } from '../../internal/TrendMark.js'
import { Stack } from '../../primitives/Stack/index.js'
import { Text } from '../../primitives/Text/index.js'

export type MetricProps = {
  label: string
  value: number
  /** Texto do número (moeda, casas decimais); o mesmo do `NumberTicker`. */
  format?: (n: number) => string
  unit?: string
  /** Ícone da direção e sentido em que as casas rolam; `flat` ou ausente: o sentido segue a variação do valor. */
  trend?: TrendDirection
}

export function Metric({ label, value, format, unit, trend }: MetricProps) {
  return (
    <Stack gap="xxs">
      <Text variant="sm" color="textMuted">{label}</Text>
      <Stack direction="row" gap="xs" align="center" wrap>
        <NumberTicker value={value} format={format} variant="xlMedium" trend={trend === 'up' || trend === 'down' ? trend : 'auto'} />
        {unit && <Text variant="sm" color="textMuted">{unit}</Text>}
        {trend && <TrendMark direction={trend} />}
      </Stack>
    </Stack>
  )
}
