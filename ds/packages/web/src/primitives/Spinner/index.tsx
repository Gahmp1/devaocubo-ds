import { useDS } from '@gahmp1/ds-core'
import { cx } from '../../core/cx.js'

export type SpinnerSize = 'small' | 'medium' | 'large'
export type SpinnerTone = 'accent' | 'onAccent' | 'text'

export type SpinnerProps = {
  size?: SpinnerSize
  /** `onAccent` para usar sobre fundo de acento (botão); `text` sobre superfícies neutras. */
  tone?: SpinnerTone
  /** Padrão: `strings.loading`. */
  accessibilityLabel?: string
}

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

export function Spinner({ size = 'medium', tone = 'accent', accessibilityLabel }: SpinnerProps) {
  const { strings } = useDS()
  return (
    <span role="progressbar" aria-label={accessibilityLabel ?? strings.loading} className={cx('ds-spinner', `ds-spinner--${size}`, `ds-spinner--${kebab(tone)}`)}>
      <span className="ds-spinner__arc" />
    </span>
  )
}
