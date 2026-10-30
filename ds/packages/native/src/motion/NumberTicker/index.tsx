// Referência: beUI Native number-ticker (MIT), https://github.com/starc007/ui-components — recriada (casa que troca por deslizamento com opacidade), não colada.
// Referência: NumberFlow (MIT), https://github.com/barvian/number-flow — só a ideia (rolagem por dígito, algarismos tabulares).
import { digitsOf, rollDirection, type Trend } from '@gahmp1/ds-core'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Text, type TextColor, type TextVariant } from '../../primitives/Text/index.js'

export type NumberTickerProps = {
  value: number
  /** Texto do número (moeda, casas decimais); padrão `String`. Cada caractere vira uma casa. */
  format?: (n: number) => string
  /** Sentido em que a casa nova entra: sobe, desce ou segue a variação do valor. */
  trend?: Trend
  /** Passam ao `Text`; os algarismos são sempre tabulares. */
  variant?: TextVariant
  color?: TextColor
}

type Look = { variant: TextVariant; color: TextColor }

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignSelf: 'flex-start' },
  slot: { overflow: 'hidden' },
  hidden: { opacity: 0 },
  layer: { position: 'absolute', left: 0, top: 0 },
})

function Roll({ from, to, dir, line, variant, color }: Look & { from: string; to: string; dir: 1 | -1; line: number }) {
  const { duration, easing } = useThemeMotion()
  const progress = useSharedValue(0)
  useEffect(() => {
    progress.value = withTiming(1, { duration: duration.base, easing: easing.standard })
  }, [progress, duration.base, easing.standard])
  const out = useAnimatedStyle(() => ({ opacity: 1 - progress.value, transform: [{ translateY: -dir * progress.value * line }] }))
  const enter = useAnimatedStyle(() => ({ opacity: progress.value, transform: [{ translateY: dir * (1 - progress.value) * line }] }))
  return (
    <View style={s.slot}>
      {/* Mede a casa nova: o slot tem a largura e a altura do que fica. */}
      <View style={s.hidden}>
        <Text variant={variant} color={color} tabular>{to}</Text>
      </View>
      <Animated.View style={[s.layer, out]}>
        <Text variant={variant} color={color} tabular>{from}</Text>
      </Animated.View>
      <Animated.View style={[s.layer, enter]}>
        <Text variant={variant} color={color} tabular>{to}</Text>
      </Animated.View>
    </View>
  )
}

function Slot({ ch, dir, line, variant, color }: Look & { ch: string; dir: 1 | -1; line: number }) {
  const { reduced } = useThemeMotion()
  const [seen, setSeen] = useState({ cur: ch, prev: ch, n: 0 })
  let now = seen
  if (seen.cur !== ch) {
    now = { cur: ch, prev: seen.cur, n: seen.n + 1 }
    setSeen(now)
  }
  // Primeira montagem e movimento reduzido: troca direta. Cada troca monta um `Roll` novo (`key`), que parte do começo.
  if (now.n === 0 || reduced) {
    return <Text variant={variant} color={color} tabular>{ch}</Text>
  }
  return <Roll key={now.n} from={now.prev} to={ch} dir={dir} line={line} variant={variant} color={color} />
}

export function NumberTicker({ value, format, trend = 'auto', variant = 'base', color = 'text' }: NumberTickerProps) {
  const { type } = useTheme()
  const [seen, setSeen] = useState({ value, dir: 1 as 1 | -1 })
  const dir = rollDirection(trend, seen.value, value, seen.dir)
  if (seen.value !== value) setSeen({ value, dir })
  const chars = digitsOf(value, format)
  const line = type.scale[variant.replace(/Medium$/, '') as keyof typeof type.scale].lineHeight
  // Casas contadas do fim: o dígito das unidades mantém a mesma casa quando o número ganha ou perde algarismos.
  return (
    <View accessible accessibilityRole="text" accessibilityLabel={chars.join('')} style={s.row}>
      {chars.map((ch, i) => (
        <Slot key={chars.length - i} ch={ch} dir={dir} line={line} variant={variant} color={color} />
      ))}
    </View>
  )
}
