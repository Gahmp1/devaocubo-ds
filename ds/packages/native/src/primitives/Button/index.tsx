import { useDS, type DSIconName } from '@gahmp1/ds-core'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { Spinner } from '../Spinner/index.js'
import { Text } from '../Text/index.js'
import { buttonLook, type ButtonVariant } from './look.js'

export type { ButtonVariant }
export type ButtonShape = 'pill' | 'rounded' | 'square' | 'circle'
export type ButtonSize = 'small' | 'normal' | 'large'

export type ButtonProps = {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  /** Padrão: `components.button.shape` do tema. `circle` = quadrado `control` com raio total; com `icon` mostra só o ícone (o título vira o rótulo). */
  shape?: ButtonShape
  /** Altura mínima `control.sm/md/lg` do tema. */
  size?: ButtonSize
  fullWidth?: boolean
  icon?: DSIconName
  disabled?: boolean
  /** Troca o conteúdo por um `Spinner` (sem mudar a largura), desativa o toque e marca `busy`. */
  loading?: boolean
  interactionId?: string
  /** Padrão: `title`. */
  accessibilityLabel?: string
}

const CONTROL = { small: 'sm', normal: 'md', large: 'lg' } as const
// Ícone do botão: sm no pequeno, md nos demais.
const ICON = { small: 'sm', normal: 'md', large: 'md' } as const
const MAX_FONT_SCALE = 1.4

const useStyles = createStyles((t) => ({
  // Zenith: DSButton (padding horizontal xl); título longo quebra sem limite de linhas, então a altura é mínima e há respiro vertical.
  base: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: t.density.space.xl, paddingVertical: t.density.space.xs, borderWidth: t.shape.borderWidth.thin },
  full: { width: '100%' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: t.density.space.xs },
  hidden: { opacity: 0 },
  spinner: { position: 'absolute' },
  title: { flexShrink: 1, textAlign: 'center' },
}))

export function Button({ title, onPress, variant = 'primary', shape, size = 'normal', fullWidth, icon, disabled, loading, interactionId, accessibilityLabel }: ButtonProps) {
  const t = useTheme()
  const { Icon } = useDS()
  const s = useStyles()
  const resolved = shape ?? t.components.button.shape
  const look = buttonLook(t, variant, !!disabled)
  const height = t.density.control[CONTROL[size]]
  const circle = resolved === 'circle'
  const radius = resolved === 'pill' || circle ? t.shape.radius.full : resolved === 'rounded' ? t.shape.radius.md : 0
  const iconOnly = circle && !!icon
  return (
    <Press
      component="Button"
      interactionId={interactionId}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: !!disabled || !!loading, busy: !!loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        s.base,
        { minHeight: height, borderRadius: radius, backgroundColor: look.bg, borderColor: look.border },
        circle && { width: height, paddingHorizontal: 0 },
        fullWidth && s.full,
      ]}
    >
      <View style={[s.row, loading && s.hidden]} accessibilityElementsHidden={!!loading} importantForAccessibility={loading ? 'no-hide-descendants' : 'auto'}>
        {icon && <Icon name={icon} size={t.icon.size[ICON[size]]} color={t.color[look.fg]} strokeWidth={t.icon.strokeWidth} />}
        {!iconOnly && (
          <Text variant="baseMedium" color={look.fg} maxFontSizeMultiplier={MAX_FONT_SCALE} style={s.title}>
            {title}
          </Text>
        )}
      </View>
      {loading && (
        <View style={s.spinner} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Spinner size="small" tone={look.spinner} />
        </View>
      )}
    </Press>
  )
}
