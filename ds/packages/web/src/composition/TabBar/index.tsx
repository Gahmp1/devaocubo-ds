// Referência: Zenith TabBar, TabBarItem e BlurPress (SWFitness), organisms/TabBar/; pílula que desliza: beUI Native Tabs (MIT), https://github.com/starc007/beui-native
import { useDS, useFeedback, type DSIconName } from '@gahmp1/ds-core'
import { motion } from 'motion/react'
import { useId } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme, useThemeMotion } from '../../core/useTheme.js'
import { tabKeyDown } from '../../internal/tabKeys.js'
import { Blur } from '../../motion/Blur/index.js'
import { Badge } from '../../primitives/Badge/index.js'

export type TabBarVariant = 'floating' | 'glass' | 'solid'

export type TabBarItem = { key: string; label: string; icon: DSIconName; badge?: number }

export type TabBarProps = {
  items: TabBarItem[]
  value: string
  onChange: (key: string) => void
  /** Padrão: `components.tabBar` do tema. */
  variant?: TabBarVariant
}

export function TabBar({ items, value, onChange, variant }: TabBarProps) {
  const theme = useTheme()
  const { Icon, emit } = useDS()
  const { play } = useFeedback()
  const { spring, reduced } = useThemeMotion()
  const pill = useId()
  const resolved = variant ?? theme.components.tabBar
  const hasActive = items.some((it) => it.key === value)
  const icon = { size: theme.icon.size.md, color: 'currentColor', strokeWidth: theme.icon.strokeWidth }

  return (
    <div
      role="tablist"
      className={cx('ds-tab-bar', `ds-tab-bar--${resolved}`, resolved === 'floating' && theme.depth.model === 'shadow' && 'ds-tab-bar--shadow')}
      onKeyDown={tabKeyDown}
    >
      {resolved === 'glass' && <Blur tint="bg" style={{ position: 'absolute', insetBlock: 0, insetInline: 0 }} />}
      {items.map((it, i) => {
        const active = it.key === value
        return (
          <button
            key={it.key}
            type="button"
            role="tab"
            aria-selected={active}
            // Um só tab entra na sequência do Tab (as setas cuidam do resto); sem seleção válida, o primeiro.
            tabIndex={active || (!hasActive && i === 0) ? 0 : -1}
            className={cx('ds-tab-bar__tab', 'ds-anim', `ds-tab-bar__tab--press-${theme.motion.press.kind}`, active && 'ds-tab-bar__tab--active')}
            onClick={() => {
              if (active) return
              play('select')
              emit({ component: 'TabBar', kind: 'change', id: it.key, label: it.label, value: it.key })
              onChange(it.key)
            }}
          >
            {active && <motion.span layoutId={pill} className="ds-tab-bar__pill" transition={reduced ? { duration: 0 } : { type: 'spring', ...spring }} />}
            <span className="ds-tab-bar__icon" aria-hidden>
              <Badge count={it.badge}>
                <Icon name={it.icon} {...icon} />
              </Badge>
            </span>
            <span className="ds-tab-bar__label">{it.label}</span>
          </button>
        )
      })}
    </div>
  )
}
