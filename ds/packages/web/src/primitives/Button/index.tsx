import { useDS, type DSIconName } from '@gahmp1/ds-core'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Spinner } from '../Spinner/index.js'
import { Text } from '../Text/index.js'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'inverse' | 'inverseOutline' | 'surface' | 'surfaceOutline' | 'danger'
export type ButtonShape = 'pill' | 'rounded' | 'square' | 'circle'
export type ButtonSize = 'small' | 'normal' | 'large'

export type ButtonProps = {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  /** Padrão: `components.button.shape` do tema. `circle` = quadrado `control` com raio total; com `icon` mostra só o ícone (o título vira o rótulo). */
  shape?: ButtonShape
  /** Altura mínima `--ds-control-sm/md/lg` do tema. */
  size?: ButtonSize
  fullWidth?: boolean
  icon?: DSIconName
  disabled?: boolean
  /** Troca o conteúdo por um `Spinner` (sem mudar a largura), desativa o clique e marca `aria-busy`. */
  loading?: boolean
  interactionId?: string
  /** Padrão: o texto de `title`. */
  accessibilityLabel?: string
}

// Ícone do botão: sm no pequeno, md nos demais.
const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
const ICON = { small: 'sm', normal: 'md', large: 'md' } as const

export function Button({ title, onPress, variant = 'primary', shape, size = 'normal', fullWidth, icon, disabled, loading, interactionId, accessibilityLabel }: ButtonProps) {
  const theme = useTheme()
  const { Icon, emit } = useDS()
  const resolved = shape ?? theme.components.button.shape
  const iconOnly = resolved === 'circle' && !!icon
  return (
    <button
      type="button"
      className={cx(
        'ds-button', 'ds-anim', `ds-button--${kebab(variant)}`, `ds-button--${size}`, `ds-button--${resolved}`, `ds-button--press-${theme.motion.press.kind}`,
        fullWidth && 'ds-button--full', disabled && 'ds-button--off', loading && 'ds-button--loading',
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={accessibilityLabel ?? (iconOnly || loading ? title : undefined)}
      onClick={() => {
        emit({ component: 'Button', kind: 'press', id: interactionId, label: accessibilityLabel ?? title })
        onPress()
      }}
    >
      <span className="ds-button__content" aria-hidden={loading || undefined}>
        {icon && <Icon name={icon} size={theme.icon.size[ICON[size]]} color="currentColor" strokeWidth={theme.icon.strokeWidth} />}
        {!iconOnly && <Text variant="baseMedium">{title}</Text>}
      </span>
      {loading && (
        <span className="ds-button__spinner" aria-hidden>
          <Spinner size="small" tone="text" />
        </span>
      )}
    </button>
  )
}
