import { useDS } from '@gahmp1/ds-core'
import { cx } from '../../core/cx.js'

export type ProgressBarTone = 'accent' | 'success' | 'danger'

export type ProgressBarProps = {
  /** 0 a 1. Ausente = indeterminada. */
  value?: number
  tone?: ProgressBarTone
  /** Padrão: `strings.loading`. */
  accessibilityLabel?: string
  /**
   * Para o loop sem desmontar (`animation-play-state: paused`). Fora da tela numa lista a virtualização já
   * cobre; telas que seguem montadas mas escondidas (abas, pilha) passam `paused`.
   */
  paused?: boolean
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))

export function ProgressBar({ value, tone = 'accent', accessibilityLabel, paused }: ProgressBarProps) {
  const { strings } = useDS()
  const determinate = value !== undefined
  const pct = determinate ? Math.round(clamp(value) * 100) : undefined
  return (
    <div
      role="progressbar"
      aria-label={accessibilityLabel ?? strings.loading}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cx('ds-progress', `ds-progress--${tone}`, !determinate && 'ds-progress--indeterminate', paused && 'ds-progress--paused')}
    >
      <div className="ds-progress__fill ds-anim" style={determinate ? { width: `${clamp(value) * 100}%` } : undefined} />
    </div>
  )
}
