import { useDS } from '@gahmp1/ds-core'
import { useState, type ComponentRef, type Ref } from 'react'
import { Pressable, StyleSheet, type LayoutChangeEvent, type PressableProps, type StyleProp, type View, type ViewStyle } from 'react-native'
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
  /** Evento de telemetria no lugar do `press` padrão (alternadores emitem `toggle` com o novo valor); `null` não emite nada. */
  event?: { kind: 'toggle'; value: string | number | boolean } | null
  /** Para mover o foco do leitor de tela de volta ao botão (`Select`, `Menu`). */
  ref?: Ref<ComponentRef<typeof View>>
}

/**
 * `Pressable` com feedback do tema, alvo de 44 pt (via `hitSlop`) e `emit` de telemetria no toque.
 * Não passe `transform` em `style` (é do feedback de escala) e não use opacidade para o visual de desabilitado
 * (vem das cores do tema); uma `opacity` em `style` é multiplicada pelo feedback de opacidade.
 */
export function Press({ interactionId, component, feedback = true, event, style, hitSlop, onPress, onPressIn, onPressOut, onLayout, disabled, accessibilityLabel, ...rest }: PressProps) {
  const { emit } = useDS()
  const baseOpacity = StyleSheet.flatten(style)?.opacity
  const fb = usePressFeedback({ disabled: disabled ?? false, baseOpacity: typeof baseOpacity === 'number' ? baseOpacity : 1 })
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
        if (event !== null) emit({ component, kind: event?.kind ?? 'press', value: event?.value, id: interactionId, label: accessibilityLabel })
        onPress?.(e)
      }}
    />
  )
}
