// Referência: Zenith CheckBox (SWFitness); marca desenhada: beUI Native (MIT), https://github.com/starc007/beui-native
import { mixColor, useFeedback, withAlpha } from '@gahmp1/ds-core'
import { useEffect } from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Text } from '../Text/index.js'
import { Mark } from './Mark.js'
import { useKeyframeBounce } from './useKeyframeBounce.js'

type Base = {
  checked: boolean | 'mixed'
  /** `mixed` vira `true` ao tocar. */
  onChange: (next: boolean) => void
  disabled?: boolean
  interactionId?: string
}
/** Sem `label` visível, `accessibilityLabel` é obrigatório. */
export type CheckboxProps = Base & ({ label: string; accessibilityLabel?: string } | { label?: undefined; accessibilityLabel: string })

const BOX = 20 // Zenith: atoms/CheckBox/CheckBox.tsx (caixa 20x20)
const GAP = 10 // Zenith: CheckBox.tsx (iOS HStack spacing 10)

const rgba = (c: string) => mixColor(c, c, 0)

const useStyles = createStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: GAP },
  box: { width: BOX, height: BOX, borderRadius: t.shape.radius.sm, borderWidth: t.shape.borderWidth.thick },
  label: { flexShrink: 1 },
}))

export function Checkbox({ checked, onChange, label, disabled, accessibilityLabel, interactionId }: CheckboxProps) {
  const t = useTheme()
  const s = useStyles()
  const { play } = useFeedback()
  const { duration, easing, reduced } = useThemeMotion()
  const bounce = useKeyframeBounce()
  const next = checked !== true
  const fill = useSharedValue(checked ? 1 : 0)
  useEffect(() => {
    const to = checked ? 1 : 0
    fill.value = reduced ? to : withTiming(to, { duration: duration.base, easing: easing.standard })
  }, [checked, reduced, duration.base, easing.standard, fill])

  const c = t.color
  const edgeOff = rgba(disabled ? c.textDisabled : c.textMuted)
  const edgeOn = rgba(disabled ? c.textDisabled : c.accent)
  const bgOff = withAlpha(edgeOn, 0)
  const boxStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(fill.value, [0, 1], [edgeOff, edgeOn]),
    backgroundColor: interpolateColor(fill.value, [0, 1], [bgOff, edgeOn]),
  }))

  return (
    <Press
      component="Checkbox"
      interactionId={interactionId}
      event={{ kind: 'toggle', value: next }}
      feedback={false}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => {
        bounce.trigger()
        play('toggle', next)
        onChange(next)
      }}
      style={s.row}
    >
      <Animated.View style={[s.box, boxStyle, bounce.animatedStyle]}>
        <Mark checked={checked} color={disabled ? c.bg : c.onAccent} />
      </Animated.View>
      {label !== undefined && (
        <Text color={disabled ? 'textDisabled' : 'text'} style={s.label}>
          {label}
        </Text>
      )}
    </Press>
  )
}
