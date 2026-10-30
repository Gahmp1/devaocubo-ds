// Referência: beUI Native (MIT), https://github.com/starc007/beui-native (hooks/use-shake.ts e components/input): tremor
// horizontal de erro, recriado sobre a duração e o movimento reduzido do tema. Rótulo e sublinhado: Zenith useTextFieldAnimation.
import { mixColor } from '@gahmp1/ds-core'
import { useEffect } from 'react'
import { AccessibilityInfo, Platform } from 'react-native'
import { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { useThemeMotion } from '../../core/useThemeMotion.js'

export const LABEL_SCALE = 0.75 // Zenith: useTextFieldAnimation (scale 1 -> 0.75)
const SHAKE = [-6, 6, -4, 4, -2, 0] // pt, beUI Native: input.tsx

// `rgba()` canônico: o Reanimated interpola qualquer formato do tema depois de passar por `mixColor`.
const rgba = (c: string) => mixColor(c, c, 0)

type Params = {
  floated: boolean
  focused: boolean
  error?: string
  /** `filled` anima o contorno; `underline` anima o sublinhado. */
  filled: boolean
  /** Deslocamento vertical do rótulo ao flutuar (negativo). */
  rise: number
  idle: string
  active: string
  widths: [number, number]
}

/** Valores animados do campo: rótulo flutuante, traço de foco/erro e tremor de erro. Movimento reduzido: muda sem animar, sem tremor. */
export function useFieldMotion({ floated, focused, error, filled, rise, idle, active, widths }: Params) {
  const { duration, easing, reduced } = useThemeMotion()
  const float = useSharedValue(floated ? 1 : 0)
  const focus = useSharedValue(focused ? 1 : 0)
  const offset = useSharedValue(0)

  useEffect(() => {
    const v = floated ? 1 : 0
    float.value = reduced ? v : withTiming(v, { duration: duration.base, easing: easing.standard })
  }, [floated, reduced, duration.base, easing.standard, float])
  useEffect(() => {
    const v = focused ? 1 : 0
    focus.value = reduced ? v : withTiming(v, { duration: duration.base, easing: easing.standard })
  }, [focused, reduced, duration.base, easing.standard, focus])

  const hasError = !!error
  useEffect(() => {
    if (!hasError || reduced) return
    offset.value = withSequence(...SHAKE.map((x) => withTiming(x, { duration: duration.slow / SHAKE.length })))
  }, [hasError, reduced, duration.slow, offset])
  // No iOS o leitor de tela não lê sozinho um texto novo; no Android a região viva do texto de erro cuida.
  useEffect(() => {
    if (error && Platform.OS === 'ios') AccessibilityInfo.announceForAccessibility(error)
  }, [error])

  const from = rgba(idle)
  const toColor = rgba(active)
  const label = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(float.value, [0, 1], [0, rise]) }, { scale: interpolate(float.value, [0, 1], [1, LABEL_SCALE]) }],
    transformOrigin: 'left',
  }))
  const line = useAnimatedStyle(() => {
    const size = interpolate(focus.value, [0, 1], widths)
    const color = interpolateColor(focus.value, [0, 1], [from, toColor])
    return filled ? { borderWidth: size, borderColor: color } : { height: size, backgroundColor: color }
  })
  const shake = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }))
  return { label, line, shake }
}
