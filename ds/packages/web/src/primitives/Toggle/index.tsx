// Referência: Zenith Toggle (SWFitness): trilho vazado, cor no polegar. Polegar que estica: beUI Native (MIT), https://github.com/starc007/beui-native
import { useDS } from '@gahmp1/ds-core'
import { motion } from 'motion/react'
import { useState, type CSSProperties } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme, useThemeMotion } from '../../core/useTheme.js'

export type ToggleSize = 'normal' | 'small'

export type ToggleProps = {
  value: boolean
  onValueChange: (value: boolean) => void
  size?: ToggleSize
  disabled?: boolean
  accessibilityLabel: string
  interactionId?: string
}

// Zenith: atoms/Toggle/Toggle.tsx (trilho x altura, polegar)
const SIZES = { normal: { w: 50, h: 30, thumb: 26 }, small: { w: 40, h: 20, thumb: 16 } } as const
// Quanto o polegar cresce com o dedo em cima (fração do diâmetro).
const STRETCH = 0.3

export function Toggle({ value, onValueChange, size = 'normal', disabled, accessibilityLabel, interactionId }: ToggleProps) {
  const theme = useTheme()
  const { emit } = useDS()
  const { spring, reduced } = useThemeMotion()
  const [pressed, setPressed] = useState(false)
  const { w, h, thumb } = SIZES[size]
  const border = theme.shape.borderWidth.thin
  const gap = (h - 2 * border - thumb) / 2
  const travel = w - 2 * border - thumb - 2 * gap
  const grow = pressed && !reduced ? thumb * STRETCH : 0
  const release = () => setPressed(false)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={accessibilityLabel}
      disabled={disabled}
      className={cx('ds-toggle', 'ds-anim', value && 'ds-toggle--on', disabled && 'ds-toggle--off')}
      style={{ '--ds-toggle-w': `${w}px`, '--ds-toggle-h': `${h}px`, '--ds-toggle-thumb': `${thumb}px`, '--ds-toggle-gap': `${gap}px` } as CSSProperties}
      onPointerDown={() => !disabled && setPressed(true)}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      onClick={() => {
        emit({ component: 'Toggle', kind: 'toggle', id: interactionId, label: accessibilityLabel, value: !value })
        onValueChange(!value)
      }}
    >
      {/* Ao esticar ligado, a borda direita fica no lugar: o polegar cresce para a esquerda. */}
      <motion.span
        className="ds-toggle__thumb ds-anim"
        initial={false}
        animate={{ x: value ? travel - grow : 0, width: thumb + grow }}
        transition={reduced ? { duration: 0 } : { type: 'spring', ...spring }}
      />
    </button>
  )
}
