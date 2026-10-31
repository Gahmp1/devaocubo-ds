import { useCallback } from 'react'
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useThemeMotion } from './useThemeMotion.js'

// Referência: Zenith usePressAnimation (SWFitness), recriado sobre o movimento do tema.
// Referência: beUI Native (MIT), https://github.com/starc007/ui-components (mola de pressão); aqui a mola é a do tema.
/**
 * Feedback de pressão do tema: opacidade (tempo) ou escala (mola do tema); `disabled` bloqueia só o press-in; movimento reduzido muda sem animar.
 * `baseOpacity` é a opacidade do estilo do consumidor: no tipo 'opacity' o feedback a multiplica em vez de sobrescrever.
 * O `transform` pertence ao feedback (tipo 'scale'): quem usa não passa `transform`. Visual de desabilitado vem das
 * cores do tema, não de opacidade.
 */
export function usePressFeedback({ disabled = false, baseOpacity = 1 }: { disabled?: boolean; baseOpacity?: number } = {}) {
  const { press, duration, easing, spring, reduced } = useThemeMotion()
  const progress = useSharedValue(1)
  const { kind, value } = press
  const go = useCallback(
    (to: number) => {
      progress.value = reduced ? to : press.kind === 'scale' ? withSpring(to, spring) : withTiming(to, { duration: duration.fast, easing: easing.standard })
    },
    [progress, reduced, press.kind, spring, duration.fast, easing.standard],
  )
  const onPressIn = useCallback(() => {
    if (!disabled) go(value)
  }, [disabled, go, value])
  const onPressOut = useCallback(() => go(1), [go])
  const animatedStyle = useAnimatedStyle(() => (kind === 'scale' ? { transform: [{ scale: progress.value }] } : { opacity: progress.value * baseOpacity }))
  return { animatedStyle, onPressIn, onPressOut }
}
