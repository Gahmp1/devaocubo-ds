// Referência: Zenith Stepper (SWFitness), molecules/Stepper; ações de acessibilidade `adjustable` no lugar de só dois botões.
import { useDS } from '@gahmp1/ds-core'
import { View, type AccessibilityActionEvent } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { IconButton } from '../../primitives/IconButton/index.js'
import { Text } from '../../primitives/Text/index.js'

export type StepperProps = {
  value: number
  onChange: (value: number) => void
  /** Sem `min`/`max` o contador não tem limite. */
  min?: number
  max?: number
  /** Padrão 1. */
  step?: number
  /** Texto do valor (unidade, casas decimais); padrão `String`. */
  format?: (n: number) => string
  /** Nome do controle para o leitor de tela (a que o número se refere). */
  accessibilityLabel?: string
}

const PRECISION = 1e6 // 0,1 + 0,2 não vira 0,30000000000000004

const useStyles = createStyles((t) => ({
  root: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: t.density.space.xl },
  // Zenith: Stepper (largura mínima huge×2 para o número não pular ao mudar)
  value: { minWidth: t.density.space.huge * 2, alignItems: 'center' },
}))

const finite = (n: number) => (Number.isFinite(n) ? n : undefined)

/**
 * Contador com dois botões. Para o leitor de tela é um único controle `adjustable`
 * (deslizar para cima ou para baixo muda o valor); os botões ficam só para o toque.
 */
export function Stepper({ value, onChange, min = -Infinity, max = Infinity, step = 1, format = String, accessibilityLabel }: StepperProps) {
  const { strings } = useDS()
  const s = useStyles()
  const move = (dir: 1 | -1) => {
    const next = Math.min(max, Math.max(min, Math.round((value + dir * step) * PRECISION) / PRECISION))
    if (next !== value) onChange(next)
  }
  const onAction = (e: AccessibilityActionEvent) => {
    if (e.nativeEvent.actionName === 'increment') move(1)
    else if (e.nativeEvent.actionName === 'decrement') move(-1)
  }
  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: finite(min), max: finite(max), now: value, text: format(value) }}
      accessibilityActions={[
        { name: 'increment', label: strings.increment },
        { name: 'decrement', label: strings.decrement },
      ]}
      onAccessibilityAction={onAction}
      style={s.root}
    >
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <IconButton icon="minus" variant="outline" accessibilityLabel={strings.decrement} disabled={value <= min} onPress={() => move(-1)} />
      </View>
      <View style={s.value}>
        <Text variant="display" tabular>{format(value)}</Text>
      </View>
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <IconButton icon="plus" variant="outline" accessibilityLabel={strings.increment} disabled={value >= max} onPress={() => move(1)} />
      </View>
    </View>
  )
}
