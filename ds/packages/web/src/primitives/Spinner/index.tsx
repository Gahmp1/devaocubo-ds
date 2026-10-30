import { useDS } from '@gahmp1/ds-core'
import { cx } from '../../core/cx.js'

export type SpinnerSize = 'small' | 'medium' | 'large'
export type SpinnerTone = 'accent' | 'onAccent' | 'onDanger' | 'bg' | 'text'

export type SpinnerProps = {
  size?: SpinnerSize
  /** `onAccent`/`onDanger` sobre fundo de acento/perigo (botão); `bg` sobre fundo `text` (botão inverso); `text` sobre superfícies neutras. */
  tone?: SpinnerTone
  /** Padrão: `strings.loading`. */
  accessibilityLabel?: string
  /**
   * Para o loop sem desmontar (`animation-play-state: paused`). Fora da tela numa lista a virtualização já
   * cobre; telas que seguem montadas mas escondidas (abas, pilha) passam `paused`.
   */
  paused?: boolean
}

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

export function Spinner({ size = 'medium', tone = 'accent', accessibilityLabel, paused }: SpinnerProps) {
  const { strings } = useDS()
  return (
    <span role="progressbar" aria-label={accessibilityLabel ?? strings.loading} className={cx('ds-spinner', `ds-spinner--${size}`, `ds-spinner--${kebab(tone)}`, paused && 'ds-spinner--paused')}>
      <span className="ds-spinner__arc" />
    </span>
  )
}
