import { useDS } from '@gahmp1/ds-core'
import { cx } from '../../core/cx.js'

export type ProgressBarTone = 'accent' | 'success' | 'danger'

export type ProgressBarProps = {
  /** 0 a 1. Ausente = indeterminada. */
  value?: number
  tone?: ProgressBarTone
  /** Padrão: `strings.loading`. */
  accessibilityLabel?: string
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))

export function ProgressBar({ value, tone = 'accent', accessibilityLabel }: ProgressBarProps) {
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
      className={cx('ds-progress', `ds-progress--${tone}`, !determinate && 'ds-progress--indeterminate')}
    >
      <div className="ds-progress__fill ds-anim" style={determinate ? { width: `${clamp(value) * 100}%` } : undefined} />
    </div>
  )
}
