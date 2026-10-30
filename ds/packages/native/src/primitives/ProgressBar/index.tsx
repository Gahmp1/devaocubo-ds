import { useDS } from '@gahmp1/ds-core'
import { useEffect, useState } from 'react'
import { View, type LayoutChangeEvent } from 'react-native'
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'

export type ProgressBarTone = 'accent' | 'success' | 'danger'

export type ProgressBarProps = {
  /** 0 a 1. Ausente = indeterminada. */
  value?: number
  tone?: ProgressBarTone
  /** Padrão: `strings.loading`. */
  accessibilityLabel?: string
}

// Zenith: atoms/IndeterminateBar/IndeterminateBar.tsx (segmento 35% do track, espessura `thick * 2`).
const SEGMENT = 0.35
const THICKNESS_STEPS = 2
// A varredura da indeterminada leva este múltiplo de `duration.slow`.
const SWEEP_FACTOR = 4
const clamp = (v: number) => Math.min(1, Math.max(0, v))

const useStyles = createStyles(({ color, shape }) => {
  const height = shape.borderWidth.thick * THICKNESS_STEPS
  return {
    track: { alignSelf: 'stretch', height, borderRadius: height / 2, overflow: 'hidden', backgroundColor: color.surface2 },
    fill: { position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: height / 2 },
    accent: { backgroundColor: color.accent },
    success: { backgroundColor: color.success },
    danger: { backgroundColor: color.danger },
  }
})

export function ProgressBar({ value, tone = 'accent', accessibilityLabel }: ProgressBarProps) {
  const s = useStyles()
  const { strings } = useDS()
  const { duration, easing, reduced } = useThemeMotion()
  const [track, setTrack] = useState(0)
  const determinate = value !== undefined
  const target = determinate ? clamp(value) : 0
  // Determinada: fração do track. Indeterminada: fase da varredura (0 a 1).
  const progress = useSharedValue(target)

  useEffect(() => {
    if (!determinate) return
    progress.value = reduced ? target : withTiming(target, { duration: duration.base, easing: easing.standard })
    return () => cancelAnimation(progress)
  }, [determinate, target, reduced, progress, duration.base, easing.standard])

  const running = !determinate && !reduced
  useEffect(() => {
    if (determinate) return
    if (!running) {
      progress.value = 0.5 // parada no meio do track, sem congelar entre quadros
      return
    }
    progress.value = 0
    progress.value = withRepeat(withTiming(1, { duration: duration.slow * SWEEP_FACTOR, easing: easing.standard }), -1, false)
    return () => cancelAnimation(progress)
  }, [determinate, running, progress, duration.slow, easing.standard])

  const seg = track * SEGMENT
  const fillStyle = useAnimatedStyle(() =>
    determinate ? { width: `${progress.value * 100}%` } : { width: seg, transform: [{ translateX: -seg + progress.value * (track + seg) }] },
  )
  const onLayout = (e: LayoutChangeEvent) => setTrack(e.nativeEvent.layout.width)

  return (
    <View
      onLayout={onLayout}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? strings.loading}
      accessibilityValue={determinate ? { min: 0, max: 100, now: Math.round(target * 100) } : undefined}
      style={s.track}
    >
      <Animated.View style={[s.fill, s[tone], fillStyle]} />
    </View>
  )
}
