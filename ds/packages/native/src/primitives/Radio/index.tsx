// Referência: Zenith RadioButton (SWFitness); ponto que desliza: beUI Native (MIT), https://github.com/starc007/beui-native
import { useFeedback } from '@gahmp1/ds-core'
import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Text } from '../Text/index.js'
import { RING, Ring } from './Ring.js'

export type RadioOption = { value: string; label: string; disabled?: boolean }

export type RadioGroupProps = {
  /** Valor escolhido; um valor fora das `options` deixa o grupo sem seleção. */
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  /** Nome do grupo para o leitor de tela. */
  accessibilityLabel?: string
  interactionId?: string
}

const DOT = 12 // Zenith: RadioButton.tsx (ponto 12x12)
const GAP = 16 // Zenith: RadioButton.tsx (gap md entre aro e rótulo)

const useStyles = createStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: GAP, minHeight: t.density.control.sm },
  label: { flexShrink: 1 },
  dot: { position: 'absolute', left: (RING - DOT) / 2, top: 0, width: DOT, height: DOT, borderRadius: DOT / 2 },
}))

type Rect = { y: number; h: number }

export function RadioGroup({ value, onChange, options, accessibilityLabel, interactionId }: RadioGroupProps) {
  const t = useTheme()
  const s = useStyles()
  const { play } = useFeedback()
  const { duration, easing, spring, reduced } = useThemeMotion()
  const [rows, setRows] = useState<Record<string, Rect>>({})
  const rect = rows[value]
  const y = useSharedValue(0)
  const shown = useSharedValue(0)
  const placed = useRef(false)

  // O ponto desliza entre opções; o primeiro posicionamento e o movimento reduzido saltam sem animar.
  useEffect(() => {
    if (!rect) {
      placed.current = false
      shown.value = reduced ? 0 : withTiming(0, { duration: duration.fast, easing: easing.exit })
      return
    }
    const to = rect.y + (rect.h - DOT) / 2
    y.value = placed.current && !reduced ? withSpring(to, spring) : to
    placed.current = true
    shown.value = reduced ? 1 : withTiming(1, { duration: duration.fast, easing: easing.enter })
  }, [rect?.y, rect?.h, reduced, spring, duration.fast, easing.enter, easing.exit, y, shown, rect])
  const dotStyle = useAnimatedStyle(() => ({ opacity: shown.value, transform: [{ translateY: y.value }, { scale: shown.value }] }))
  const dotColor = options.find((o) => o.value === value)?.disabled ? t.color.textDisabled : t.color.accent

  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={accessibilityLabel}>
      {options.map((o) => (
        <Press
          key={o.value}
          component="RadioGroup"
          interactionId={interactionId}
          event={o.value === value ? null : { kind: 'toggle', value: o.value }}
          accessibilityRole="radio"
          accessibilityLabel={o.label}
          accessibilityState={{ selected: o.value === value, disabled: !!o.disabled }}
          disabled={o.disabled}
          onPress={() => {
            // tocar na opção já escolhida não muda nada: nem feedback
            if (o.value === value) return
            play('select')
            onChange(o.value)
          }}
          onLayout={(e) => {
            const { y: top, height } = e.nativeEvent.layout
            setRows((r) => (r[o.value]?.y === top && r[o.value]?.h === height ? r : { ...r, [o.value]: { y: top, h: height } }))
          }}
          style={s.row}
        >
          <Ring selected={o.value === value} disabled={!!o.disabled} />
          <Text color={o.disabled ? 'textDisabled' : 'text'} style={s.label}>
            {o.label}
          </Text>
        </Press>
      ))}
      <Animated.View pointerEvents="none" style={[s.dot, { backgroundColor: dotColor }, dotStyle]} />
    </View>
  )
}
