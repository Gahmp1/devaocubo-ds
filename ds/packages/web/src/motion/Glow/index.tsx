// Ideia: voice-glow da libraries.dev (traço, luz interna e bloom; licença a verificar), recriada em CSS sobre os papéis do tema, sem código copiado.
import { glowAlphas, type GlowColor } from '@gahmp1/ds-core'
import type { CSSProperties } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { GLOW_VAR, glowGradient } from '../../internal/glow.js'

export type GlowProps = {
  /** 0–1: acende as três camadas. O bloom ainda depende do `depth.model` do tema (some em `flat`). */
  strength?: number
  color?: GlowColor
  /** Diâmetro do círculo em px; o bloom passa dele (até meio diâmetro para fora). */
  size?: number
  /** Luz interna e bloom respiram em loop; movimento reduzido deixa parado. */
  pulse?: boolean
  /** Para o pulso sem desmontar (`animation-play-state: paused`), p.ex. em abas escondidas. */
  paused?: boolean
}

const DEFAULT_STRENGTH = 0.6
const DEFAULT_SIZE = 96

export function Glow({ strength = DEFAULT_STRENGTH, color = 'aiGlow', size = DEFAULT_SIZE, pulse = false, paused }: GlowProps) {
  const { depth } = useTheme()
  const a = glowAlphas(strength, depth.model)
  const vars = {
    '--ds-glow-size': `${size}px`,
    '--ds-glow-trace': a.trace,
    '--ds-glow-inner': a.inner,
    '--ds-glow-bloom': a.bloom,
    '--ds-glow-color': GLOW_VAR[color],
    '--ds-glow-falloff': glowGradient(GLOW_VAR[color]),
  } as CSSProperties
  return (
    <div aria-hidden className={cx('ds-glow', pulse && 'ds-glow--pulse', paused && 'ds-glow--paused')} style={vars}>
      <span className="ds-glow__breath ds-anim">
        <span className="ds-glow__bloom ds-anim" />
        <span className="ds-glow__inner" />
      </span>
      <span className="ds-glow__trace" />
    </div>
  )
}
