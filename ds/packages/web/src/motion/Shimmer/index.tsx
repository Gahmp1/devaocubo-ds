// Referência: beUI web text-shimmer (MIT), https://github.com/starc007/ui-components — recriada (faixa de gradiente varrendo o conteúdo), não colada.
import type { RadiusStep } from '@gahmp1/ds-core'
import type { CSSProperties, ReactNode } from 'react'

export type ShimmerProps = {
  /** Falso (ou movimento reduzido) deixa o conteúdo parado, sem faixa. */
  active?: boolean
  /** Raio do recorte da faixa; combine com o raio do conteúdo. */
  radius?: RadiusStep
  /** Só layout (flex, tamanho). */
  style?: Pick<CSSProperties, 'flex' | 'flexGrow' | 'flexShrink' | 'alignSelf' | 'width' | 'margin' | 'marginInline' | 'marginBlock'>
  /** A faixa passa por cima do conteúdo, recortada pelo contorno do Shimmer. */
  children?: ReactNode
}

export function Shimmer({ active = true, radius, style, children }: ShimmerProps) {
  return (
    <div className="ds-shimmer" style={{ ...(radius && { borderRadius: `var(--ds-radius-${radius})` }), ...style }}>
      {children}
      {active && <span aria-hidden className="ds-shimmer__band ds-anim" />}
    </div>
  )
}
