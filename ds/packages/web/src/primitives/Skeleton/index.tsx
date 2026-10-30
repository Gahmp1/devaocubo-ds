import type { RadiusStep } from '@gahmp1/ds-core'
import type { CSSProperties } from 'react'
import { Shimmer } from '../../motion/Shimmer/index.js'

export type SkeletonProps = {
  /** Padrão: largura toda do pai. */
  width?: number | string
  /** Padrão: `space.md` do tema. */
  height?: number
  /** Padrão: `sm`; `full` para avatar. */
  radius?: RadiusStep
  /** Linhas de texto empilhadas (a última mais curta). Sem `lines`, um bloco. */
  lines?: number
  /** Só layout (flex, margem). */
  style?: Pick<CSSProperties, 'flex' | 'flexGrow' | 'flexShrink' | 'alignSelf' | 'margin' | 'marginInline' | 'marginBlock'>
}

// Largura da última linha de um bloco de texto, em %.
const LAST_LINE = '60%'

function Bar({ width, height, radius }: { width?: number | string; height?: number; radius: RadiusStep }) {
  return (
    <Shimmer radius={radius} style={{ width }}>
      <div className="ds-skeleton__bar" style={{ height: height ?? 'var(--ds-space-md)' }} />
    </Shimmer>
  )
}

/** Marcador de conteúdo a carregar; decorativo para leitores de tela (o contêiner anuncia a espera). */
export function Skeleton({ width, height, radius = 'sm', lines, style }: SkeletonProps) {
  return (
    <div aria-hidden className="ds-skeleton" style={{ width, ...style }}>
      {lines === undefined ? (
        <Bar height={height} radius={radius} />
      ) : (
        Array.from({ length: lines }, (_, i) => <Bar key={i} height={height} radius={radius} width={i === lines - 1 && lines > 1 ? LAST_LINE : undefined} />)
      )}
    </div>
  )
}
