// Referência: Zenith FilterChip (SWFitness); chip removível: beUI Native (MIT), https://github.com/starc007/beui-native
import { useDS, type DSIconName } from '@gahmp1/ds-core'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Text } from '../Text/index.js'

export type ChipProps = {
  label: string
  onPress?: () => void
  /** Mostra o `close` (com o nome `strings.close` + rótulo) como alvo próprio; clicar nele não dispara `onPress`. */
  onRemove?: () => void
  selected?: boolean
  icon?: DSIconName
  disabled?: boolean
  interactionId?: string
}

/** Uso interno de `Chip` e `FilterChip`. */
export type ChipBaseProps = ChipProps & {
  component: string
  /** Telemetria do clique no corpo: `toggle` com o novo valor (FilterChip); omitido = `press`. */
  toggle?: boolean
  /** ✓ que entra antes do rótulo quando selecionado. */
  check?: boolean
}

export function ChipBase({ label, onPress, onRemove, selected, icon, disabled, interactionId, component, toggle, check }: ChipBaseProps) {
  const theme = useTheme()
  const { Icon, strings, emit } = useDS()
  const size = theme.icon.size.sm
  const stroke = theme.icon.strokeWidth
  const content = (
    <span className="ds-chip__inner">
      {check && (
        <span className="ds-chip__check ds-anim" aria-hidden>
          <Icon name="check" size={size} color="currentColor" strokeWidth={stroke} />
        </span>
      )}
      {icon && <Icon name={icon} size={size} color="currentColor" strokeWidth={stroke} />}
      <Text variant="xs">{label}</Text>
    </span>
  )
  const removeLabel = `${strings.close} ${label}`
  return (
    <span className={cx('ds-chip', 'ds-anim', `ds-chip--press-${theme.motion.press.kind}`, selected && 'ds-chip--selected', disabled && 'ds-chip--off', onRemove && 'ds-chip--removable')}>
      {onPress ? (
        <button
          type="button"
          className="ds-chip__body ds-anim"
          aria-pressed={selected}
          disabled={disabled}
          onClick={() => {
            emit({ component, kind: toggle === undefined ? 'press' : 'toggle', id: interactionId, label, value: toggle })
            onPress()
          }}
        >
          {content}
        </button>
      ) : (
        <span className="ds-chip__body" aria-disabled={disabled || undefined}>{content}</span>
      )}
      {onRemove && (
        <button
          type="button"
          className="ds-chip__remove ds-anim"
          aria-label={removeLabel}
          disabled={disabled}
          onClick={() => {
            emit({ component, kind: 'press', id: interactionId ? `${interactionId}.remove` : undefined, label: removeLabel })
            onRemove()
          }}
        >
          <Icon name="close" size={size} color="currentColor" strokeWidth={stroke} />
        </button>
      )}
    </span>
  )
}
