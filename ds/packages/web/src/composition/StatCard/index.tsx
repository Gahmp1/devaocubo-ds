// Referência: Zenith StatCard (SWFitness), molecules/StatCard/StatCard.tsx; o `iconBg`, o `sublabel` e o `testID` saíram.
import { useDS, type DSIconName } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { useTheme } from '../../core/useTheme.js'
import { TrendMark, type TrendDirection } from '../../internal/TrendMark.js'
import { Stack } from '../../primitives/Stack/index.js'
import { Text } from '../../primitives/Text/index.js'
import { Card } from '../Card/index.js'

export type StatCardProps = {
  label: string
  value: string | number
  /** `value` leva o sinal ("+12%"); a direção também aparece no ícone, nunca só na cor. */
  delta?: { value: string; direction: TrendDirection }
  /** Ícone decorativo no círculo antes do rótulo. */
  icon?: DSIconName
  /** Minigráfico abaixo do valor; o chamador cuida da acessibilidade dele. */
  chart?: ReactNode
}

export function StatCard({ label, value, delta, icon, chart }: StatCardProps) {
  const theme = useTheme()
  const { Icon } = useDS()
  return (
    <Card>
      <Stack gap="sm">
        <Stack direction="row" gap="sm" align="center">
          {icon && (
            <span className="ds-stat-card__icon" aria-hidden>
              <Icon name={icon} size={theme.icon.size.md} color="currentColor" strokeWidth={theme.icon.strokeWidth} />
            </span>
          )}
          <Text variant="sm" color="textMuted">{label}</Text>
        </Stack>
        <Stack direction="row" gap="sm" align="center" wrap>
          <Text variant="xlMedium">{value}</Text>
          {delta && (
            <TrendMark direction={delta.direction}>
              <Text variant="sm">{delta.value}</Text>
            </TrendMark>
          )}
        </Stack>
        {chart}
      </Stack>
    </Card>
  )
}
