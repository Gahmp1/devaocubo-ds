// Referência: Zenith CircularProgress (SWFitness), molecules/CircularProgress/; o arco vem de `arcPath` do core e preenche pelo `pathLength` do `motion`.
import { arcPath, useDS } from '@gahmp1/ds-core'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { useChartEnter } from '../../internal/chartEnter.js'
import type { ProgressBarTone } from '../../primitives/ProgressBar/index.js'

export type CircularProgressProps = {
  /** 0 a 1. */
  value: number
  /** Lado em px. Padrão 56. */
  size?: number
  /** Espessura do traço em px. Padrão: `borderWidth.thick` × 2 do tema. */
  thickness?: number
  /** Cor do arco. Padrão `accent`. */
  tone?: ProgressBarTone
  /** Conteúdo no centro (percentual, ícone). */
  children?: ReactNode
}

const DEFAULT_SIZE = 56 // px
const THICKNESS_STEPS = 2
const clamp = (v: number) => Math.min(1, Math.max(0, Number.isFinite(v) ? v : 0))

export function CircularProgress({ value, size, thickness, tone = 'accent', children }: CircularProgressProps) {
  const theme = useTheme()
  const { strings } = useDS()
  const { reduced, transition } = useChartEnter()
  const side = size ?? DEFAULT_SIZE
  const stroke = thickness ?? theme.shape.borderWidth.thick * THICKNESS_STEPS
  const v = clamp(value)
  // O mesmo círculo serve de trilha e de arco: o arco é o círculo cheio desenhado até `pathLength = v`.
  const d = arcPath(1, side, stroke)
  return (
    <div
      role="progressbar"
      aria-label={strings.loading}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      className={cx('ds-circular-progress', `ds-circular-progress--${tone}`)}
      style={{ inlineSize: side, blockSize: side }}
    >
      <svg className="ds-circular-progress__svg" width={side} height={side} viewBox={`0 0 ${side} ${side}`} aria-hidden>
        <path className="ds-circular-progress__track" d={d} strokeWidth={stroke} />
        <motion.path
          className="ds-circular-progress__bar"
          d={d}
          strokeWidth={stroke}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: v }}
          transition={transition}
        />
      </svg>
      {children && <span className="ds-circular-progress__center">{children}</span>}
    </div>
  )
}
