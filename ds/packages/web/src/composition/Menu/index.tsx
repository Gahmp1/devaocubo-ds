// Referência: Radix UI DropdownMenu (MIT), https://github.com/radix-ui/primitives; o Zenith não tem menu.
import { useDS, type DSIconName } from '@gahmp1/ds-core'
import { DropdownMenu } from 'radix-ui'
import type { ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'

export type MenuItem = { key: string; label: string; icon?: DSIconName; destructive?: boolean; onSelect: () => void } | 'separator'

export type MenuProps = {
  /** Conteúdo do gatilho (texto e/ou ícone, sem controles dentro): o `Menu` o envolve num `<button>`, que ganha o nome acessível dele. */
  trigger: ReactNode
  items: MenuItem[]
}

export function Menu({ trigger, items }: MenuProps) {
  const theme = useTheme()
  const { Icon, emit } = useDS()
  const icon = { size: theme.icon.size.md, color: 'currentColor', strokeWidth: theme.icon.strokeWidth }

  return (
    <DropdownMenu.Root onOpenChange={(open) => emit({ component: 'Menu', kind: open ? 'open' : 'close' })}>
      <DropdownMenu.Trigger className="ds-menu__trigger ds-anim">{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start" sideOffset={6} loop className={cx('ds-popup', 'ds-anim', 'ds-menu__content', theme.depth.model === 'shadow' && 'ds-popup--shadow')}>
          {items.map((it, i) =>
            it === 'separator' ? (
              <DropdownMenu.Separator key={`separator-${i}`} className="ds-popup__sep" />
            ) : (
              <DropdownMenu.Item
                key={it.key}
                className={cx('ds-popup__item', it.destructive && 'ds-popup__item--destructive')}
                onSelect={() => {
                  emit({ component: 'Menu', kind: 'press', id: it.key, label: it.label })
                  it.onSelect()
                }}
              >
                {it.icon && <Icon name={it.icon} {...icon} />}
                {it.label}
              </DropdownMenu.Item>
            ),
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
