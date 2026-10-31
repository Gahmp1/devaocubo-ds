import { useTheme } from '../core/useTheme.js'

/**
 * Movimento de entrada dos gráficos: mola no tema `snappy`, duração `slow` com a curva `enter` no `calm`
 * (a mesma escolha do `Reveal`). Reduzido: `reduced` pede para montar já no estado final e o resto não anima.
 */
export function useChartEnter() {
  const { duration, easing, spring, personality, reduced } = useTheme().motion
  const transition = reduced
    ? { duration: 0 }
    : personality === 'snappy'
      ? { type: 'spring' as const, ...spring }
      : { duration: duration.slow / 1000, ease: easing.enter }
  return { reduced, transition }
}
