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
  /**
   * Para o loop sem desmontar (`animation-play-state: paused`). Fora da tela numa lista a virtualização já
   * cobre; telas que seguem montadas mas escondidas (abas, pilha) passam `paused`.
   */
  paused?: boolean
  /** Só layout (flex, margem). */
  style?: Pick<CSSProperties, 'flex' | 'flexGrow' | 'flexShrink' | 'alignSelf' | 'margin' | 'marginInline' | 'marginBlock'>
}

// Largura da última linha de um bloco de texto, em %.
const LAST_LINE = '60%'

function Bar({ width, height, radius, paused }: { width?: number | string; height?: number; radius: RadiusStep; paused?: boolean }) {
  return (
    <Shimmer radius={radius} paused={paused} style={{ width }}>
      <div className="ds-skeleton__bar" style={{ height: height ?? 'var(--ds-space-md)' }} />
    </Shimmer>
  )
}

/** Marcador de conteúdo a carregar; decorativo para leitores de tela (o contêiner anuncia a espera). */
export function Skeleton({ width, height, radius = 'sm', lines, paused, style }: SkeletonProps) {
  return (
    <div aria-hidden className="ds-skeleton" style={{ width, ...style }}>
      {lines === undefined ? (
        <Bar height={height} radius={radius} paused={paused} />
      ) : (
        Array.from({ length: lines }, (_, i) => <Bar key={i} height={height} radius={radius} paused={paused} width={i === lines - 1 && lines > 1 ? LAST_LINE : undefined} />)
      )}
    </div>
  )
}
