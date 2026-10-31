// Referência: Zenith Card (SWFitness), molecules/Card/Card.tsx; os tipos `borderedContentC` e `dashed` e o alinhamento saíram.
import { useDS, type SpaceStep } from '@gahmp1/ds-core'
import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'

export type CardType = 'fill' | 'outline' | 'elevated' | 'ghost'

export type CardProps = {
  /** Padrão: `components.card.type` do tema. */
  type?: CardType
  /** Vira um `<button>` com foco visível e o toque do tema. */
  onPress?: () => void
  selected?: boolean
  /** Padrão: `lg`. */
  padding?: SpaceStep
  interactionId?: string
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

export function Card({ type, onPress, selected, padding = 'lg', interactionId, header, footer, children }: CardProps) {
  const theme = useTheme()
  const { emit } = useDS()
  const resolved = type ?? theme.components.card.type
  const className = cx(
    'ds-card', `ds-card--${resolved}`,
    // Sombra só no modelo `shadow`; nos demais o `elevated` se destaca por superfície e traço (ver `card.css`).
    resolved === 'elevated' && theme.depth.model === 'shadow' && 'ds-card--shadow',
    selected && 'ds-card--selected',
  )
  const style = { '--ds-card-padding': `var(--ds-space-${padding})` } as CSSProperties
  const content = (
    <>
      {header}
      <div className="ds-card__body">{children}</div>
      {footer}
    </>
  )
  if (!onPress) return <div className={className} style={style}>{content}</div>
  return (
    <button
      type="button"
      className={cx(className, 'ds-card--pressable', 'ds-anim', `ds-card--press-${theme.motion.press.kind}`)}
      style={style}
      aria-pressed={selected}
      onClick={() => {
        emit({ component: 'Card', kind: 'press', id: interactionId })
        onPress()
      }}
    >
      {content}
    </button>
  )
}
