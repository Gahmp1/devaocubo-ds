import { useDS } from '@gahmp1/ds-core'
import { useRef, useState } from 'react'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { useRestoreFocus, type ViewInstance } from '../../internal/overlay.js'
import { Text } from '../../primitives/Text/index.js'
import { SheetPanel } from '../Sheet/Panel.js'
import { Option } from './Option.js'

export type SelectOption = { value: string; label: string; disabled?: boolean }

export type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  /** Aparece quando `value` não casa com nenhuma opção. */
  placeholder?: string
  /** Texto acima do campo; também o título da gaveta de opções. */
  label?: string
  disabled?: boolean
}

const useStyles = createStyles((t) => {
  const { color, shape, density } = t
  return {
    field: { gap: density.space.xxs },
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: density.space.sm,
      minHeight: density.control.md,
      paddingHorizontal: density.space.lg,
      paddingVertical: density.space.xs,
      borderWidth: shape.borderWidth.thin,
      borderColor: color.border,
      backgroundColor: color.surface2,
    },
    off: { borderColor: color.borderMuted, backgroundColor: color.surface1 },
    value: { flex: 1 },
  }
})

/** Gatilho em pílula (raio de `shape.control`) que abre as opções numa `Sheet` com `ListItem selected`. */
export function Select({ value, onChange, options, placeholder, label, disabled }: SelectProps) {
  const t = useTheme()
  const { Icon, emit } = useDS()
  const s = useStyles()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<ViewInstance>(null)
  useRestoreFocus(open, triggerRef)
  const current = options.find((o) => o.value === value)
  const radius = { pill: t.shape.radius.full, rounded: t.shape.radius.md, square: 0 }[t.shape.control]
  const close = () => setOpen(false)
  const title = label ?? placeholder

  return (
    <View style={s.field}>
      {label ? (
        <Text variant="sm" color={disabled ? 'textDisabled' : 'textMuted'} accessibilityElementsHidden importantForAccessibility="no">{label}</Text>
      ) : null}
      <Press
        ref={triggerRef}
        component="Select"
        accessibilityRole="combobox"
        accessibilityLabel={title}
        accessibilityValue={{ text: current?.label }}
        accessibilityState={{ expanded: open, disabled: !!disabled }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={[s.trigger, { borderRadius: radius }, disabled && s.off]}
      >
        <Text color={disabled ? 'textDisabled' : current ? 'text' : 'textSubtle'} style={s.value}>{current?.label ?? placeholder ?? ''}</Text>
        <Icon name="chevron-down" size={t.icon.size.md} color={t.color[disabled ? 'textDisabled' : 'textMuted']} strokeWidth={t.icon.strokeWidth} />
      </Press>
      <SheetPanel component="Select" open={open} onClose={close} title={title} flush>
        {options.map((o) => (
          <Option
            key={o.value}
            label={o.label}
            selected={o.value === value}
            disabled={o.disabled}
            onPress={() => {
              emit({ component: 'Select', kind: 'change', value: o.value, label: o.label })
              onChange(o.value)
              close()
            }}
          />
        ))}
      </SheetPanel>
    </View>
  )
}
