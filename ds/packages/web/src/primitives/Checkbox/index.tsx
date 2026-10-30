// Referência: Zenith CheckBox (SWFitness); marca desenhada: beUI Native (MIT), https://github.com/starc007/beui-native
import { useDS } from '@gahmp1/ds-core'
import { useEffect, useRef } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Text } from '../Text/index.js'

type Base = {
  checked: boolean | 'mixed'
  /** `mixed` vira `true` ao clicar. */
  onChange: (next: boolean) => void
  disabled?: boolean
  interactionId?: string
}
/** Sem `label` visível, `accessibilityLabel` é obrigatório. */
export type CheckboxProps = Base & ({ label: string; accessibilityLabel?: string } | { label?: undefined; accessibilityLabel: string })

// Zenith: hooks/useKeyframeBounce.ts (CheckBoxStyles.swift): escala 0.9 -> 1.1 -> 1.0, durações 50/150/250 ms (offsets 50/200/450 de 450).
const BOUNCE = { keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(0.9)', offset: 0.11 }, { transform: 'scale(1.1)', offset: 0.44 }, { transform: 'scale(1)' }], options: { duration: 450, easing: 'cubic-bezier(0.33, 0, 0.67, 1)' } }

export function Checkbox({ checked, onChange, label, disabled, accessibilityLabel, interactionId }: CheckboxProps) {
  const theme = useTheme()
  const { emit } = useDS()
  const input = useRef<HTMLInputElement>(null)
  const box = useRef<HTMLSpanElement>(null)
  const next = checked !== true
  useEffect(() => {
    if (input.current) input.current.indeterminate = checked === 'mixed'
  }, [checked])
  return (
    <label className={cx('ds-checkbox', 'ds-anim', checked === true && 'ds-checkbox--checked', checked === 'mixed' && 'ds-checkbox--mixed', disabled && 'ds-checkbox--off')}>
      <input
        ref={input}
        type="checkbox"
        className="ds-checkbox__input"
        checked={checked === true}
        aria-checked={checked}
        aria-label={accessibilityLabel}
        disabled={disabled}
        onChange={() => {
          if (!theme.motion.reduced) box.current?.animate(BOUNCE.keyframes, BOUNCE.options)
          emit({ component: 'Checkbox', kind: 'toggle', id: interactionId, label: accessibilityLabel ?? label, value: next })
          onChange(next)
        }}
      />
      <span ref={box} className="ds-checkbox__box ds-anim" aria-hidden>
        <svg viewBox="0 0 20 20" className="ds-checkbox__mark">
          <path className="ds-checkbox__stroke ds-checkbox__stroke--check ds-anim" d="M5 10.5 L8.5 14 L15 6.5" pathLength="1" />
          <path className="ds-checkbox__stroke ds-checkbox__stroke--dash ds-anim" d="M5.5 10 H14.5" pathLength="1" />
        </svg>
      </span>
      {label !== undefined && <Text color={disabled ? 'textDisabled' : 'text'}>{label}</Text>}
    </label>
  )
}
