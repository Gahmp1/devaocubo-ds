// Referência: Zenith Toast (SWFitness), organisms/Toast; sonner-native (MIT), https://github.com/gunnartorfis/sonner-native (arrastar para dispensar, ícone de status), recriados.
import { useDS, useFeedback } from '@gahmp1/ds-core'
import { useCallback, useEffect, useRef } from 'react'
import { AccessibilityInfo, Platform, View } from 'react-native'
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Button } from '../../primitives/Button/index.js'
import { Text } from '../../primitives/Text/index.js'
import type { ToastOptions } from './index.js'

export type ToastItem = ToastOptions & { id: number }

const OFFSET = 24 // pt; de quanto acima o toast entra e sai
const MAX_WIDTH = 480 // pt; em tela larga o toast não estica
const SWIPE = 32 // pt arrastados para cima que dispensam
const FLING = 600 // pt/s para cima que dispensam
// O tema não tem eixo de toast: a permanência segue a personalidade de movimento (a calma lê mais devagar).
const DWELL_MS = { calm: 5000, snappy: 4000 } as const
// Com ação a pessoa precisa de tempo para decidir (WCAG 2.2.1).
const ACTION_DWELL_FACTOR = 1.5

const ICON = { neutral: 'info', success: 'success', danger: 'error' } as const
const ICON_COLOR = { neutral: 'textMuted', success: 'success', danger: 'danger' } as const

const useStyles = createStyles((t) => {
  const { color, shape, depth, density } = t
  const shadow =
    depth.model === 'shadow'
      ? { shadowColor: depth.overlay.color, shadowOffset: { width: depth.overlay.x, height: depth.overlay.y }, shadowRadius: depth.overlay.blur, shadowOpacity: 1, elevation: depth.overlay.elevation }
      : undefined
  return {
    toast: {
      alignSelf: 'center',
      width: '100%',
      maxWidth: MAX_WIDTH,
      flexDirection: 'row',
      alignItems: 'center',
      gap: density.space.md,
      paddingVertical: density.space.md,
      paddingLeft: density.space.lg,
      paddingRight: density.space.md,
      marginTop: density.space.sm,
      borderRadius: shape.radius.lg,
      borderWidth: shape.borderWidth.thin,
      borderColor: depth.model === 'hairline' ? color.borderMuted : 'transparent',
      backgroundColor: color.surface2,
      ...shadow,
    },
    text: { flex: 1, gap: density.space.xxs },
  }
})

/** Um toast: entra pela personalidade do tema, sai sozinho, ao arrastar para cima ou ao tocar na ação; `onDone` só depois da saída. */
export function ToastView({ item, onDone }: { item: ToastItem; onDone: (id: number) => void }) {
  const t = useTheme()
  const { Icon } = useDS()
  const { play } = useFeedback()
  const { duration, easing, spring, reduced } = useThemeMotion()
  const s = useStyles()
  const { id, title, description, tone = 'neutral', action, durationMs = DWELL_MS[t.motion.personality] * (action ? ACTION_DWELL_FACTOR : 1) } = item
  const p = useSharedValue(0)
  const drag = useSharedValue(0)
  const leaving = useRef(false)

  const leave = useCallback(() => {
    if (leaving.current) return
    leaving.current = true
    if (reduced) return onDone(id)
    p.value = withTiming(0, { duration: duration.base, easing: easing.exit }, (finished) => {
      'worklet'
      if (finished) scheduleOnRN(onDone, id)
    })
  }, [reduced, duration, easing, p, onDone, id])
  // O timer e a entrada rodam uma vez por toast; `leave` mais recente vive no ref.
  const leaveRef = useRef(leave)
  leaveRef.current = leave

  useEffect(() => {
    // Sem roubar o foco: iOS anuncia por aqui, Android pela região viva do contêiner.
    if (Platform.OS === 'ios') AccessibilityInfo.announceForAccessibility(description ? `${title}. ${description}` : title)
    if (tone !== 'neutral') play(tone === 'success' ? 'confirm' : 'error')
    p.value = reduced ? withTiming(1, { duration: duration.fast, easing: easing.standard }) : withSpring(1, spring)
    const timer = setTimeout(() => leaveRef.current(), durationMs)
    return () => clearTimeout(timer)
  }, [])

  const pan = usePanGesture({
    activeOffsetY: [-8, 8],
    onUpdate: (e) => {
      'worklet'
      drag.value = Math.min(0, e.translationY)
    },
    onDeactivate: (e) => {
      'worklet'
      if (drag.value < -SWIPE || e.velocityY < -FLING) scheduleOnRN(leave)
      else drag.value = reduced ? 0 : withSpring(0, spring)
    },
  })

  const shift = reduced ? 0 : OFFSET
  const style = useAnimatedStyle(() => ({ opacity: Math.min(p.value, 1), transform: [{ translateY: (p.value - 1) * shift + drag.value }] }))

  return (
    <GestureDetector gesture={pan}>
      <Animated.View collapsable={false} accessibilityLiveRegion={tone === 'danger' ? 'assertive' : 'polite'} style={[s.toast, style]}>
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Icon name={ICON[tone]} size={t.icon.size.md} color={t.color[ICON_COLOR[tone]]} strokeWidth={t.icon.strokeWidth} />
        </View>
        <View style={s.text}>
          <Text variant="smMedium">{title}</Text>
          {description ? <Text variant="sm" color="textMuted">{description}</Text> : null}
        </View>
        {action && (
          <Button
            title={action.label}
            variant="ghost"
            size="small"
            onPress={() => {
              action.onPress()
              leave()
            }}
          />
        )}
      </Animated.View>
    </GestureDetector>
  )
}
