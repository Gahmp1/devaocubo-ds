// Referência: Zenith Stepper (SWFitness), molecules/Stepper/Stepper.tsx; WAI-ARIA APG, padrão Spinbutton (o `adjustable` do RN).
import { useDS } from '@gahmp1/ds-core'
import type { KeyboardEvent } from 'react'
import { IconButton } from '../../primitives/IconButton/index.js'
import { Text } from '../../primitives/Text/index.js'

export type StepperProps = {
  value: number
  onChange: (value: number) => void
  /** Padrão: sem limite. */
  min?: number
  max?: number
  /** Padrão 1. */
  step?: number
  /** Texto do valor (unidade, casas decimais); padrão `String(value)`. */
  format?: (value: number) => string
  /** Nome do controle para o leitor de tela (o que está sendo ajustado). */
  accessibilityLabel?: string
}

const PAGE_STEPS = 10 // PageUp/PageDown
const places = (n: number) => (String(n).split('.')[1] ?? '').length

export function Stepper({ value, onChange, min = -Infinity, max = Infinity, step = 1, format, accessibilityLabel }: StepperProps) {
  const { strings, emit } = useDS()
  const set = (next: number) => {
    // Arredonda nas casas do passo e do valor: 0,1 + 0,2 não vira 0,30000000000000004.
    const n = Math.min(max, Math.max(min, Number(next.toFixed(Math.max(places(step), places(value))))))
    if (n === value) return
    emit({ component: 'Stepper', kind: 'change', value: n })
    onChange(n)
  }
  const onKeyDown = (e: KeyboardEvent) => {
    const next = {
      ArrowUp: value + step, ArrowRight: value + step, ArrowDown: value - step, ArrowLeft: value - step,
      PageUp: value + step * PAGE_STEPS, PageDown: value - step * PAGE_STEPS, Home: min, End: max,
    }[e.key]
    if (next === undefined || !Number.isFinite(next)) return
    e.preventDefault()
    set(next)
  }
  const text = format ? format(value) : String(value)

  return (
    <div className="ds-stepper">
      <IconButton icon="minus" variant="outline" size="large" accessibilityLabel={strings.decrement} disabled={value <= min} onPress={() => set(value - step)} />
      {/* Região viva: quem usa os botões ouve o valor novo. */}
      <div className="ds-stepper__value" aria-live="polite">
        <Text
          variant="display"
          role="spinbutton"
          tabIndex={0}
          aria-label={accessibilityLabel}
          aria-valuenow={value}
          aria-valuemin={Number.isFinite(min) ? min : undefined}
          aria-valuemax={Number.isFinite(max) ? max : undefined}
          aria-valuetext={text}
          onKeyDown={onKeyDown}
        >
          {text}
        </Text>
      </div>
      <IconButton icon="plus" variant="outline" size="large" accessibilityLabel={strings.increment} disabled={value >= max} onPress={() => set(value + step)} />
    </div>
  )
}
