import { useDS, type DSIconName } from '@gahmp1/ds-core'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import type { TextColor } from '../Text/index.js'

export type IconButtonSize = 'small' | 'medium' | 'large'
export type IconButtonVariant = 'plain' | 'filled' | 'outline'

export type IconButtonProps = {
  icon: DSIconName
  /** Obrigatório: um botão só com ícone fica mudo sem rótulo (falha do Zenith). */
  accessibilityLabel: string
  onPress: () => void
  /** Ícone `icon.sm/md/lg` do tema. */
  size?: IconButtonSize
  /** `filled` = círculo preenchido (cobre o `RightNavigationButton`); `outline` = círculo com traço. */
  variant?: IconButtonVariant
  /** Cor do ícone; padrão `text`. Desabilitado usa `textDisabled`. */
  color?: TextColor
  disabled?: boolean
  interactionId?: string
}

const ICON = { small: 'sm', medium: 'md', large: 'lg' } as const
const CONTROL = { small: 'sm', medium: 'md', large: 'lg' } as const

const useStyles = createStyles((t) => ({
  base: { alignItems: 'center', justifyContent: 'center', borderWidth: t.shape.borderWidth.thin, borderColor: 'transparent' },
  plain: { padding: t.density.space.xs },
  filled: { backgroundColor: t.color.surface2 },
  outline: { borderColor: t.color.border },
  outlineOff: { borderColor: t.color.borderMuted },
}))

export function IconButton({ icon, accessibilityLabel, onPress, size = 'medium', variant = 'plain', color = 'text', disabled, interactionId }: IconButtonProps) {
  const t = useTheme()
  const { Icon } = useDS()
  const s = useStyles()
  const box = t.density.control[CONTROL[size]]
  const round = variant !== 'plain'
  return (
    <Press
      component="IconButton"
      interactionId={interactionId}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[s.base, s[variant], variant === 'outline' && disabled && s.outlineOff, round && { width: box, height: box, borderRadius: t.shape.radius.full }]}
    >
      <Icon name={icon} size={t.icon.size[ICON[size]]} color={t.color[disabled ? 'textDisabled' : color]} strokeWidth={t.icon.strokeWidth} />
    </Press>
  )
}
