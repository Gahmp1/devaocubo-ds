import type { RadiusStep, SpaceStep } from '@gahmp1/ds-core'
import type { CSSProperties, ReactNode } from 'react'

export type BoxSurface = 'bg' | 'surface1' | 'surface2' | 'surface3'

export type BoxProps = {
  padding?: SpaceStep
  paddingX?: SpaceStep
  paddingY?: SpaceStep
  surface?: BoxSurface
  radius?: RadiusStep
  /** Só layout (flex, tamanho). */
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

const space = (s: SpaceStep) => `var(--ds-space-${s})`

export function Box({ padding, paddingX, paddingY, surface, radius, style, className, children }: BoxProps) {
  return (
    <div
      className={className ? `ds-box ${className}` : 'ds-box'}
      style={{
        ...(padding && { padding: space(padding) }),
        ...(paddingX && { paddingInline: space(paddingX) }),
        ...(paddingY && { paddingBlock: space(paddingY) }),
        ...(surface && { backgroundColor: `var(--ds-color-${surface})` }),
        ...(radius && { borderRadius: `var(--ds-radius-${radius})` }),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
