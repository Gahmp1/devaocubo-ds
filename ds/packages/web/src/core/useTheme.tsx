import { useDS, type ResolvedTheme } from '@gahmp1/ds-core'
import { useMemo } from 'react'

export type ThemeMotion = {
  /** ms */
  duration: { fast: number; base: number; slow: number }
  /** `cubic-bezier(...)` pronto para CSS e para o `motion`. */
  easing: { standard: string; enter: string; exit: string }
  /** Mesmo formato de mola do `motion` (e os mesmos números do Reanimated no nativo). */
  spring: { stiffness: number; damping: number; mass: number }
  reduced: boolean
}

export function useTheme(): ResolvedTheme {
  return useDS().theme
}

const bezier = (b: number[]) => `cubic-bezier(${b.join(', ')})`

/** Movimento do tema para CSS e `motion`; os números são os mesmos do `useThemeMotion` nativo. */
export function useThemeMotion(): ThemeMotion {
  const { duration, easing, spring, reduced } = useTheme().motion
  return useMemo(
    () => ({
      duration,
      easing: { standard: bezier(easing.standard), enter: bezier(easing.enter), exit: bezier(easing.exit) },
      spring: { stiffness: spring.stiffness, damping: spring.damping, mass: spring.mass },
      reduced,
    }),
    [duration, easing, spring, reduced],
  )
}
