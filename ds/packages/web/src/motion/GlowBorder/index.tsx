// Ideia: border-beam da libraries.dev (brilho viajante por ângulo mais bloom; licença a verificar), recriada em CSS (`@property` + `conic-gradient`) sobre os papéis do tema, sem código copiado.
import { glowAlphas, type RadiusStep } from '@gahmp1/ds-core'
import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'

export type GlowBorderProps = {
  /** Liga o brilho viajante; entra e sai com fade (`duration.base`). */
  active: boolean
  /** Raio do contorno; combine com o raio do filho. */
  radius?: RadiusStep
  /** Ciclo completo em ms; padrão `ai.beamPeriodMs` do tema. */
  periodMs?: number
  /** Para o giro sem desmontar (`animation-play-state: paused`), p.ex. em abas escondidas. */
  paused?: boolean
  /** Só layout (flex, tamanho). */
  style?: Pick<CSSProperties, 'flex' | 'flexGrow' | 'flexShrink' | 'alignSelf' | 'width' | 'margin' | 'marginInline' | 'marginBlock'>
  /** O brilho contorna este conteúdo. */
  children: ReactNode
}

export function GlowBorder({ active, radius = 'lg', periodMs, paused, style, children }: GlowBorderProps) {
  const { depth } = useTheme()
  const vars = {
    '--ds-beam-radius': `var(--ds-radius-${radius})`,
    '--ds-beam-bloom': glowAlphas(1, depth.model).bloom,
    ...(periodMs !== undefined && { '--ds-beam-period': `${periodMs}ms` }),
    ...style,
  } as CSSProperties
  return (
    <div className={cx('ds-glow-border', active && 'ds-glow-border--active', paused && 'ds-glow-border--paused')} style={vars}>
      {children}
      <span aria-hidden className="ds-glow-border__beam ds-glow-border__bloom ds-anim" />
      <span aria-hidden className="ds-glow-border__beam ds-glow-border__trace ds-anim" />
    </div>
  )
}
