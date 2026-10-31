// Referência: Zenith SegmentedControl (SWFitness), organisms/SegmentedControl/; indicador que desliza: beUI Native Tabs (MIT), https://github.com/starc007/beui-native
import { useDS, useFeedback } from '@gahmp1/ds-core'
import { motion } from 'motion/react'
import { useId, type CSSProperties } from 'react'
import { cx } from '../../core/cx.js'
import { useThemeMotion } from '../../core/useTheme.js'
import { tabKeyDown } from '../../internal/tabKeys.js'

export type SegmentedControlSize = 'small' | 'normal'

export type SegmentedControlProps = {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  /** Padrão `normal`. */
  size?: SegmentedControlSize
}

export function SegmentedControl({ options, value, onChange, size = 'normal' }: SegmentedControlProps) {
  const { emit } = useDS()
  const { play } = useFeedback()
  const { spring, reduced } = useThemeMotion()
  const pill = useId()
  const hasActive = options.some((o) => o.value === value)
  // O rótulo encolhe até 0,7 do tamanho para caber sem quebrar palavra (como no nativo); o CSS lê estas duas contagens.
  const fit = { '--ds-seg-count': options.length, '--ds-seg-chars': Math.max(...options.map((o) => o.label.length)) } as CSSProperties

  return (
    <div role="tablist" className={cx('ds-segmented', `ds-segmented--${size}`)} style={fit} onKeyDown={tabKeyDown}>
      {options.map((o, i) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            // Um só tab entra na sequência do Tab (as setas cuidam do resto); sem seleção válida, o primeiro.
            tabIndex={active || (!hasActive && i === 0) ? 0 : -1}
            className={cx('ds-segmented__option', 'ds-anim', active && 'ds-segmented__option--active')}
            onClick={() => {
              if (active) return
              play('select')
              emit({ component: 'SegmentedControl', kind: 'change', id: o.value, label: o.label, value: o.value })
              onChange(o.value)
            }}
          >
            {active && <motion.span layoutId={pill} className="ds-segmented__pill" transition={reduced ? { duration: 0 } : { type: 'spring', ...spring }} />}
            <span className="ds-segmented__label">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}
