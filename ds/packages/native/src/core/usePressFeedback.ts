import { useCallback } from 'react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useThemeMotion } from './useThemeMotion.js'

// Referência: Zenith usePressAnimation (SWFitness), recriado sobre o movimento do tema.
/** Feedback de pressão do tema (opacidade ou escala); `disabled` bloqueia só o press-in; movimento reduzido muda sem animar. */
export function usePressFeedback({ disabled = false }: { disabled?: boolean } = {}) {
  const { press, duration, easing, reduced } = useThemeMotion()
  const progress = useSharedValue(1)
  const { kind, value } = press
  const go = useCallback(
    (to: number) => {
      progress.value = reduced ? to : withTiming(to, { duration: duration.fast, easing: easing.standard })
    },
    [progress, reduced, duration.fast, easing.standard],
  )
  const onPressIn = useCallback(() => {
    if (!disabled) go(value)
  }, [disabled, go, value])
  const onPressOut = useCallback(() => go(1), [go])
  const animatedStyle = useAnimatedStyle(() => (kind === 'scale' ? { transform: [{ scale: progress.value }] } : { opacity: progress.value }))
  return { animatedStyle, onPressIn, onPressOut }
}
