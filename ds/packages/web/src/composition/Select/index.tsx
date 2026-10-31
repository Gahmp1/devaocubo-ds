// Referência: Radix UI Select (MIT), https://github.com/radix-ui/primitives; o Zenith não tem Select (só `SheetRow` em sheets).
import { useDS } from '@gahmp1/ds-core'
import { Select as Root } from 'radix-ui'
import { useId } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Text } from '../../primitives/Text/index.js'

export type SelectOption = { value: string; label: string; disabled?: boolean }

export type SelectProps = {
  /** `''` = nada escolhido (mostra o `placeholder`). Nenhuma opção pode ter `value` vazio. */
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  disabled?: boolean
}

export function Select({ value, onChange, options, placeholder, label, disabled }: SelectProps) {
  const theme = useTheme()
  const { Icon, emit } = useDS()
  const id = useId()
  const icon = { size: theme.icon.size.md, color: 'currentColor', strokeWidth: theme.icon.strokeWidth }
  const name = label ?? placeholder

  return (
    <div className="ds-select">
      {label && <Text as="label" htmlFor={id} variant="smMedium" color="textMuted">{label}</Text>}
      <Root.Root
        value={value}
        disabled={disabled}
        onValueChange={(next) => {
          emit({ component: 'Select', kind: 'change', label: options.find((o) => o.value === next)?.label, value: next })
          onChange(next)
        }}
        onOpenChange={(open) => emit({ component: 'Select', kind: open ? 'open' : 'close', label: name })}
      >
        <Root.Trigger id={id} className="ds-select__trigger ds-anim">
          <Root.Value placeholder={placeholder} />
          <Root.Icon className="ds-select__chevron"><Icon name="chevron-down" {...icon} /></Root.Icon>
        </Root.Trigger>
        <Root.Portal>
          <Root.Content position="popper" sideOffset={6} className={cx('ds-popup', 'ds-anim', 'ds-select__content', theme.depth.model === 'shadow' && 'ds-popup--shadow')}>
            <Root.Viewport>
              {options.map((o) => (
                <Root.Item key={o.value} value={o.value} disabled={o.disabled} className="ds-popup__item">
                  <Root.ItemText>{o.label}</Root.ItemText>
                  <Root.ItemIndicator className="ds-select__check"><Icon name="check" {...icon} /></Root.ItemIndicator>
                </Root.Item>
              ))}
            </Root.Viewport>
          </Root.Content>
        </Root.Portal>
      </Root.Root>
    </div>
  )
}
