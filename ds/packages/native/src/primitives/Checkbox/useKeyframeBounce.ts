import { useCallback } from 'react'
import { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { useThemeMotion } from '../../core/useThemeMotion.js'

// Referência: Zenith hooks/useKeyframeBounce.ts (CheckBoxStyles.swift): escala 0.9 -> 1.1 -> 1.0, durações 50/150/250 ms.
const KEYS = [{ to: 0.9, ms: 50 }, { to: 1.1, ms: 150 }, { to: 1, ms: 250 }] as const
const EASE = Easing.bezier(0.33, 0, 0.67, 1)

/** Quique de escala a cada `trigger()`; com movimento reduzido não faz nada. */
export function useKeyframeBounce() {
  const { reduced } = useThemeMotion()
  const scale = useSharedValue(1)
  const trigger = useCallback(() => {
    if (!reduced) scale.value = withSequence(...KEYS.map((k) => withTiming(k.to, { duration: k.ms, easing: EASE })))
  }, [reduced, scale])
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }))
  return { animatedStyle, trigger }
}
