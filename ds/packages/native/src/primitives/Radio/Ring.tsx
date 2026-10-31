import { mixColor } from '@gahmp1/ds-core'
import { useEffect } from 'react'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'

export const RING = 20 // Zenith: atoms/RadioButton/RadioButton.tsx (círculo 20x20)

const rgba = (c: string) => mixColor(c, c, 0)

/** Aro da opção: fino e neutro em repouso, grosso e de acento quando escolhida. */
export function Ring({ selected, disabled }: { selected: boolean; disabled: boolean }) {
  const t = useTheme()
  const { duration, easing, reduced } = useThemeMotion()
  const p = useSharedValue(selected ? 1 : 0)
  useEffect(() => {
    const to = selected ? 1 : 0
    p.value = reduced ? to : withTiming(to, { duration: duration.base, easing: easing.standard })
  }, [selected, reduced, duration.base, easing.standard, p])
  const { thin, thick } = t.shape.borderWidth
  const from = rgba(disabled ? t.color.textDisabled : t.color.textMuted)
  const to = rgba(disabled ? t.color.textDisabled : t.color.accent)
  const style = useAnimatedStyle(() => ({ borderColor: interpolateColor(p.value, [0, 1], [from, to]), borderWidth: interpolate(p.value, [0, 1], [thin, thick]) }))
  return <Animated.View style={[{ width: RING, height: RING, borderRadius: t.shape.radius.full }, style]} />
}
