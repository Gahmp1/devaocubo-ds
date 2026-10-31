import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated'

/**
 * Duas camadas empilhadas, com as cores de antes e de depois, que trocam por opacidade com `fill` (0..1).
 * O Reanimated não anima a cor de um `Text` do DS, e uma troca seca deixaria o texto sumir por um instante
 * (escuro sobre escuro) enquanto o fundo ainda faz a transição. A camada `on` é só visual.
 */
export function Dual({ fill, off, on }: { fill: SharedValue<number>; off: ReactNode; on: ReactNode }) {
  const offStyle = useAnimatedStyle(() => ({ opacity: 1 - fill.value }))
  const onStyle = useAnimatedStyle(() => ({ opacity: fill.value }))
  return (
    <View>
      <Animated.View style={[layer.row, offStyle]}>{off}</Animated.View>
      <Animated.View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[StyleSheet.absoluteFill, layer.row, onStyle]}
      >
        {on}
      </Animated.View>
    </View>
  )
}

const layer = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' } })
