// Referência: beUI Native Animated Badge (MIT), https://github.com/starc007/beui-native
import { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Text, type TextColor } from '../Text/index.js'

/** Número que rola ao mudar: o antigo sai e o novo entra (para cima se `value` subiu, para baixo se caiu). Seco com movimento reduzido. */
export function Roll({ label, value, color }: { label: string; value: number; color: TextColor }) {
  const { type } = useTheme()
  const { duration, easing, reduced } = useThemeMotion()
  const line = type.scale.xs.lineHeight
  const [last, setLast] = useState({ label, value })
  const [roll, setRoll] = useState<{ from: string; dir: 1 | -1 } | null>(null)
  // Derivado no render (não em efeito): o quadro com o número novo já nasce com o antigo ainda visível.
  if (last.label !== label) {
    setRoll(reduced ? null : { from: last.label, dir: value >= last.value ? 1 : -1 })
    setLast({ label, value })
  }
  const dir = roll?.dir ?? 1
  const p = useSharedValue(1)
  useLayoutEffect(() => {
    if (!roll) return
    p.value = 0
    p.value = withTiming(1, { duration: duration.fast, easing: easing.standard })
  }, [roll, p, duration.fast, easing.standard])
  const enter = useAnimatedStyle(() => ({ opacity: p.value, transform: [{ translateY: (1 - p.value) * line * dir }] }))
  const exit = useAnimatedStyle(() => ({ opacity: 1 - p.value, transform: [{ translateY: -p.value * line * dir }] }))
  return (
    <View style={{ height: line, overflow: 'hidden', alignItems: 'center' }}>
      <Animated.View style={roll ? enter : undefined}>
        <Text variant="xsMedium" color={color} tabular>{label}</Text>
      </Animated.View>
      {roll && (
        <Animated.View style={[StyleSheet.absoluteFill, { alignItems: 'center' }, exit]} pointerEvents="none">
          <Text variant="xsMedium" color={color} tabular>{roll.from}</Text>
        </Animated.View>
      )}
    </View>
  )
}
