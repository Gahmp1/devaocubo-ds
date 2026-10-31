import type { SpaceStep } from '@gahmp1/ds-core'
import type { CSSProperties } from 'react'
import { cx } from '../../core/cx.js'

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical'
  /** Recuo nas pontas da linha (margem ao longo do eixo). */
  inset?: SpaceStep
  tone?: 'border' | 'borderMuted'
}

export function Divider({ orientation = 'horizontal', inset, tone = 'border' }: DividerProps) {
  const margin = inset && `var(--ds-space-${inset})`
  const style: CSSProperties | undefined = margin ? (orientation === 'horizontal' ? { marginInline: margin } : { marginBlock: margin }) : undefined
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx('ds-divider', `ds-divider--${orientation}`, tone === 'borderMuted' && 'ds-divider--muted')}
      style={style}
    />
  )
}
