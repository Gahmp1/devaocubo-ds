// Referência: widget metric do agent-chat (rótulo, valor, unidade); rolagem dos dígitos pelo NumberTicker do DS.
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { NumberTicker } from '../../motion/NumberTicker/index.js'
import { Text } from '../../primitives/Text/index.js'
import { DirectionGlyph, type Direction } from '../StatCard/Direction.js'

export type MetricProps = {
  label: string
  value: number
  /** Texto do número (moeda, casas decimais); padrão `String`. */
  format?: (n: number) => string
  unit?: string
  /** Mostra a direção ao lado do valor e fixa o sentido da rolagem dos dígitos; sem ele (ou `flat`) a rolagem segue a variação. */
  trend?: Direction
}

const useStyles = createStyles((t) => ({
  root: { gap: t.density.space.xxs },
  valueRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: t.density.space.xs },
}))

export function Metric({ label, value, format, unit, trend }: MetricProps) {
  const s = useStyles()
  return (
    <View style={s.root}>
      <Text variant="sm" color="textMuted">{label}</Text>
      <View style={s.valueRow}>
        <NumberTicker value={value} format={format} trend={trend === 'up' || trend === 'down' ? trend : 'auto'} variant="xlMedium" />
        {unit && <Text variant="sm" color="textMuted">{unit}</Text>}
        {trend && <DirectionGlyph direction={trend} />}
      </View>
    </View>
  )
}
