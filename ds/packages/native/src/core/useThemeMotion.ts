import { useMemo } from 'react'
import { Easing, type EasingFunction, type WithSpringConfig } from 'react-native-reanimated'
import { useTheme } from './DSProvider.js'

export type ThemeMotion = {
  /** ms */
  duration: { fast: number; base: number; slow: number }
  easing: { standard: EasingFunction; enter: EasingFunction; exit: EasingFunction }
  spring: WithSpringConfig
  press: { kind: 'opacity' | 'scale'; value: number }
  reduced: boolean
}

/** Movimento do tema pronto para o Reanimated (curvas já viram `EasingFunction`). */
export function useThemeMotion(): ThemeMotion {
  const { duration, easing, spring, press, reduced } = useTheme().motion
  return useMemo(
    () => ({
      duration,
      easing: {
        standard: Easing.bezier(...easing.standard).factory(),
        enter: Easing.bezier(...easing.enter).factory(),
        exit: Easing.bezier(...easing.exit).factory(),
      },
      spring,
      press,
      reduced,
    }),
    [duration, easing, spring, press, reduced],
  )
}
