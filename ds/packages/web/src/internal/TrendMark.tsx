import { useDS } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { useTheme } from '../core/useTheme.js'

export type TrendDirection = 'up' | 'down' | 'flat'

// Só existe `arrow-down` entre os ícones do DS: a seta para cima é a mesma girada (ver `trend.css`).
const ICON = { up: 'arrow-down', down: 'arrow-down', flat: 'minus' } as const

/** Ícone da direção (up=success, down=danger, flat=textMuted) com o texto ao lado: a direção não depende só da cor. */
export function TrendMark({ direction, children }: { direction: TrendDirection; children?: ReactNode }) {
  const theme = useTheme()
  const { Icon } = useDS()
  return (
    <span className={`ds-trend ds-trend--${direction}`}>
      <span className="ds-trend__icon" aria-hidden>
        <Icon name={ICON[direction]} size={theme.icon.size.sm} color="currentColor" strokeWidth={theme.icon.strokeWidth} />
      </span>
      {children}
    </span>
  )
}
