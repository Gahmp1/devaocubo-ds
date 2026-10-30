import { useDS } from '@gahmp1/ds-core'
import { useState } from 'react'
import { Pressable, type LayoutChangeEvent, type PressableProps, type StyleProp, type ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { usePressFeedback } from './usePressFeedback.js'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const MIN_TARGET = 44 // pt, spec §14

export type PressProps = Omit<PressableProps, 'style'> & {
  /** Estilo só de layout; cor, raio e sombra vêm do tema. */
  style?: StyleProp<ViewStyle>
  interactionId?: string
  /** Nome do componente que usa o Press, para a telemetria. */
  component: string
  /** `false` desliga o feedback de pressão (o componente cuida do seu). */
  feedback?: boolean
}

/** `Pressable` com feedback do tema, alvo de 44 pt (via `hitSlop`) e `emit` de telemetria no toque. */
export function Press({ interactionId, component, feedback = true, style, hitSlop, onPress, onPressIn, onPressOut, onLayout, disabled, accessibilityLabel, ...rest }: PressProps) {
  const { emit } = useDS()
  const fb = usePressFeedback({ disabled: disabled ?? false })
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const slop = hitSlop ?? (size ? { top: Math.max(0, (MIN_TARGET - size.h) / 2), bottom: Math.max(0, (MIN_TARGET - size.h) / 2), left: Math.max(0, (MIN_TARGET - size.w) / 2), right: Math.max(0, (MIN_TARGET - size.w) / 2) } : undefined)
  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      hitSlop={slop}
      style={feedback ? [style, fb.animatedStyle] : style}
      onLayout={(e: LayoutChangeEvent) => {
        setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
        onLayout?.(e)
      }}
      onPressIn={(e) => {
        if (feedback) fb.onPressIn()
        onPressIn?.(e)
      }}
      onPressOut={(e) => {
        if (feedback) fb.onPressOut()
        onPressOut?.(e)
      }}
      onPress={(e) => {
        emit({ component, kind: 'press', id: interactionId, label: accessibilityLabel })
        onPress?.(e)
      }}
    />
  )
}
