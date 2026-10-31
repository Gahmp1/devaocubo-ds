import type { SpaceStep } from '@gahmp1/ds-core'
import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../core/cx.js'

export type StackAlign = 'start' | 'center' | 'end' | 'stretch'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around'

export type StackProps = {
  direction?: 'row' | 'column'
  gap?: SpaceStep
  /** Eixo cruzado; padrão `stretch`. */
  align?: StackAlign
  /** Eixo principal; padrão `start`. */
  justify?: StackJustify
  wrap?: boolean
  /** Só layout (flex, tamanho). */
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

const ALIGN: Record<StackAlign, string> = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch' }
const JUSTIFY: Record<StackJustify, string> = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around' }

export function Stack({ direction = 'column', gap, align = 'stretch', justify = 'start', wrap, style, className, children }: StackProps) {
  return (
    <div
      className={cx('ds-stack', `ds-stack--${direction}`, wrap && 'ds-stack--wrap', className)}
      style={{ alignItems: ALIGN[align], justifyContent: JUSTIFY[justify], ...(gap && { gap: `var(--ds-space-${gap})` }), ...style }}
    >
      {children}
    </div>
  )
}
