// Referência: Zenith StatCard (SWFitness), molecules/StatCard; estrutura de cartão de métrica do BoardUI.
import { useDS, type DSIconName } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Text } from '../../primitives/Text/index.js'
import { Card } from '../Card/index.js'
import { DirectionGlyph, useDirectionColors, type Direction } from './Direction.js'

export type StatCardProps = {
  label: string
  value: string | number
  /** `value` leva o sinal ("+3 dias"): o glifo reforça, não substitui. */
  delta?: { value: string; direction: Direction }
  icon?: DSIconName
  /** Minigráfico abaixo do valor. */
  chart?: ReactNode
}

const useStyles = createStyles((t) => ({
  head: { flexDirection: 'row', alignItems: 'center', gap: t.density.space.sm },
  icon: { width: t.density.control.sm, height: t.density.control.sm, borderRadius: t.shape.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: t.color.surface2 },
  label: { flex: 1 },
  valueRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: t.density.space.xs },
  pill: { flexDirection: 'row', alignItems: 'center', gap: t.density.space.xxs, paddingHorizontal: t.density.space.xs, paddingVertical: t.density.space.xxs, borderRadius: t.shape.radius.full },
}))

function Delta({ value, direction }: NonNullable<StatCardProps['delta']>) {
  const s = useStyles()
  const { tint } = useDirectionColors(direction)
  return (
    <View style={[s.pill, { backgroundColor: tint }]}>
      <DirectionGlyph direction={direction} />
      <Text variant="xs">{value}</Text>
    </View>
  )
}

export function StatCard({ label, value, delta, icon, chart }: StatCardProps) {
  const t = useTheme()
  const { Icon } = useDS()
  const s = useStyles()
  return (
    <Card>
      <View style={s.head}>
        {icon && (
          <View style={s.icon}>
            <Icon name={icon} size={t.icon.size.md} color={t.color.text} strokeWidth={t.icon.strokeWidth} />
          </View>
        )}
        <Text variant="sm" color="textMuted" style={s.label}>{label}</Text>
      </View>
      <View style={s.valueRow}>
        <Text variant="xlMedium" tabular>{String(value)}</Text>
        {delta && <Delta {...delta} />}
      </View>
      {chart}
    </Card>
  )
}
