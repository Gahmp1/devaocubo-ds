import { useDS, type DSIconName } from '@gahmp1/ds-core'
import type { CSSProperties } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import type { TextColor } from '../Text/index.js'

export type IconButtonSize = 'small' | 'medium' | 'large'
export type IconButtonVariant = 'plain' | 'filled' | 'outline'

export type IconButtonProps = {
  icon: DSIconName
  /** Obrigatório: um botão só com ícone fica mudo sem rótulo (falha do Zenith). */
  accessibilityLabel: string
  onPress: () => void
  /** Ícone `--ds-icon-sm/md/lg` do tema. */
  size?: IconButtonSize
  /** `filled` = círculo preenchido (cobre o `RightNavigationButton`); `outline` = círculo com traço. */
  variant?: IconButtonVariant
  /** Cor do ícone; padrão `text`. Desabilitado usa `textDisabled`. */
  color?: TextColor
  disabled?: boolean
  interactionId?: string
}

const ICON = { small: 'sm', medium: 'md', large: 'lg' } as const
const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

export function IconButton({ icon, accessibilityLabel, onPress, size = 'medium', variant = 'plain', color = 'text', disabled, interactionId }: IconButtonProps) {
  const theme = useTheme()
  const { Icon, emit } = useDS()
  return (
    <button
      type="button"
      className={cx('ds-icon-button', 'ds-anim', `ds-icon-button--${size}`, `ds-icon-button--${variant}`, `ds-icon-button--press-${theme.motion.press.kind}`, disabled && 'ds-icon-button--off')}
      style={disabled ? undefined : ({ '--ds-icon-button-fg': `var(--ds-color-${kebab(color)})` } as CSSProperties)}
      disabled={disabled}
      aria-label={accessibilityLabel}
      onClick={() => {
        emit({ component: 'IconButton', kind: 'press', id: interactionId, label: accessibilityLabel })
        onPress()
      }}
    >
      <Icon name={icon} size={theme.icon.size[ICON[size]]} color="currentColor" strokeWidth={theme.icon.strokeWidth} />
    </button>
  )
}
