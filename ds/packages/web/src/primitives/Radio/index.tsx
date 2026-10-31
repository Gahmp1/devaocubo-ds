// Referência: Zenith RadioButton (SWFitness); ponto que desliza: beUI Native (MIT), https://github.com/starc007/beui-native
import { useDS, useFeedback } from '@gahmp1/ds-core'
import { motion } from 'motion/react'
import { useId } from 'react'
import { cx } from '../../core/cx.js'
import { useThemeMotion } from '../../core/useTheme.js'
import { Text } from '../Text/index.js'

export type RadioOption = { value: string; label: string; disabled?: boolean }

export type RadioGroupProps = {
  /** Valor escolhido; um valor fora das `options` deixa o grupo sem seleção. */
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  /** Nome do grupo para o leitor de tela. */
  accessibilityLabel?: string
  interactionId?: string
}

/** Opções como `<input type="radio">` nativos de um mesmo `name`: Tab entra no grupo, setas movem a seleção e pulam as desabilitadas. */
export function RadioGroup({ value, onChange, options, accessibilityLabel, interactionId }: RadioGroupProps) {
  const id = useId()
  const { emit } = useDS()
  const { play } = useFeedback()
  const { spring, reduced } = useThemeMotion()
  return (
    <div role="radiogroup" aria-label={accessibilityLabel} className="ds-radio-group">
      {options.map((o) => {
        const selected = o.value === value
        return (
          <label key={o.value} className={cx('ds-radio', o.disabled && 'ds-radio--off')}>
            <input
              type="radio"
              name={id}
              value={o.value}
              className="ds-radio__input"
              checked={selected}
              disabled={o.disabled}
              onChange={() => {
                emit({ component: 'RadioGroup', kind: 'toggle', id: interactionId, label: o.label, value: o.value })
                // o input de rádio só dispara onChange quando a escolha muda
                play('select')
                onChange(o.value)
              }}
            />
            <span className={cx('ds-radio__ring', 'ds-anim', selected && 'ds-radio__ring--on')} aria-hidden>
              {/* Mesmo `layoutId` em todas as opções: o ponto desliza da opção anterior para a escolhida. */}
              {selected && <motion.span layoutId={`${id}-dot`} className="ds-radio__dot" transition={reduced ? { duration: 0 } : { type: 'spring', ...spring }} />}
            </span>
            <Text color={o.disabled ? 'textDisabled' : 'text'}>{o.label}</Text>
          </label>
        )
      })}
    </div>
  )
}
