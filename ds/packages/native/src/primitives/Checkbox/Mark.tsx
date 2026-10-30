// Referência: beUI Native (MIT), https://github.com/starc007/beui-native (marca que se desenha sozinha), recriada sobre a duração do tema.
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { useThemeMotion } from '../../core/useThemeMotion.js'

const AnimatedPath = Animated.createAnimatedComponent(Path)

// Comprimentos dos traços no viewBox 20x20.
const CHECK = { d: 'M5 10.5 L8.5 14 L15 6.5', length: 15 }
const DASH = { d: 'M5.5 10 H14.5', length: 9 }
const STROKE = 2

function Stroke({ d, length, on, color }: { d: string; length: number; on: boolean; color: string }) {
  const { duration, easing, reduced } = useThemeMotion()
  const p = useSharedValue(on ? 1 : 0)
  useEffect(() => {
    p.value = reduced ? (on ? 1 : 0) : withTiming(on ? 1 : 0, { duration: duration.base, easing: easing.standard })
  }, [on, reduced, duration.base, easing.standard, p])
  const props = useAnimatedProps(() => ({ strokeDashoffset: length * (1 - p.value), strokeOpacity: p.value > 0 ? 1 : 0 }))
  return <AnimatedPath d={d} animatedProps={props} stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={length} fill="none" />
}

/** Marca de "marcado" (visto) ou "misto" (traço), desenhada por `strokeDashoffset`. */
export function Mark({ checked, color }: { checked: boolean | 'mixed'; color: string }) {
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox="0 0 20 20">
      <Stroke {...CHECK} on={checked === true} color={color} />
      <Stroke {...DASH} on={checked === 'mixed'} color={color} />
    </Svg>
  )
}
