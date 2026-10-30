// Referência: Zenith Toggle (SWFitness): trilho vazado, cor no polegar. Polegar que estica: beUI Native (MIT), https://github.com/starc007/beui-native
import { mixColor } from '@gahmp1/ds-core'
import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'

export type ToggleSize = 'normal' | 'small'

export type ToggleProps = {
  value: boolean
  onValueChange: (value: boolean) => void
  size?: ToggleSize
  disabled?: boolean
  accessibilityLabel: string
  interactionId?: string
}

// Zenith: atoms/Toggle/Toggle.tsx (trilho x altura, polegar)
const SIZES = { normal: { w: 50, h: 30, thumb: 26 }, small: { w: 40, h: 20, thumb: 16 } } as const
// Quanto o polegar cresce com o dedo em cima (fração do diâmetro).
const STRETCH = 0.3

// `rgba()` canônico: o Reanimated interpola qualquer formato do tema depois de passar por `mixColor`.
const rgba = (c: string) => mixColor(c, c, 0)

const useStyles = createStyles(() => ({
  thumb: { position: 'absolute' },
}))

export function Toggle({ value, onValueChange, size = 'normal', disabled, accessibilityLabel, interactionId }: ToggleProps) {
  const t = useTheme()
  const s = useStyles()
  const { spring, reduced } = useThemeMotion()
  const { w, h, thumb } = SIZES[size]
  const border = t.shape.borderWidth.thin
  const gap = (h - 2 * border - thumb) / 2
  const travel = w - 2 * border - thumb - 2 * gap
  const stretch = thumb * STRETCH
  const progress = useSharedValue(value ? 1 : 0)
  const press = useSharedValue(0)

  useEffect(() => {
    const to = value ? 1 : 0
    progress.value = reduced ? to : withSpring(to, spring)
  }, [value, reduced, spring, progress])

  const c = t.color
  const from = rgba(c.surface3)
  const to = rgba(disabled ? c.textDisabled : c.accent)
  const thumbStyle = useAnimatedStyle(() => {
    const grow = press.value * stretch
    // Ao esticar ligado, a borda direita fica no lugar: o polegar cresce para a esquerda.
    return { width: thumb + grow, transform: [{ translateX: progress.value * (travel - grow) }], backgroundColor: interpolateColor(progress.value, [0, 1], [from, to]) }
  })
  const setPress = (to: number) => {
    if (!reduced) press.value = withSpring(to, spring)
  }

  return (
    <Press
      component="Toggle"
      interactionId={interactionId}
      event={{ kind: 'toggle', value: !value }}
      feedback={false}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      onPressIn={() => setPress(1)}
      onPressOut={() => setPress(0)}
      style={{ width: w, height: h }}
    >
      <View style={{ width: w, height: h, borderRadius: h / 2, borderWidth: border, borderColor: disabled ? c.textDisabled : c.text }}>
        <Animated.View style={[s.thumb, { top: gap, left: gap, height: thumb, borderRadius: thumb / 2 }, thumbStyle]} />
      </View>
    </Press>
  )
}
