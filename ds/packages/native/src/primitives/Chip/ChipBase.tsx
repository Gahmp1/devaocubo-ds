// Referência: Zenith FilterChip (SWFitness); chip removível: beUI Native (MIT), https://github.com/starc007/beui-native
import { mixColor, useDS, type DSIconName } from '@gahmp1/ds-core'
import { useEffect, type ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Text } from '../Text/index.js'
import { Dual } from './Dual.js'

export type ChipProps = {
  label: string
  onPress?: () => void
  /** Mostra o `close` (com o nome `strings.close` + rótulo) como alvo próprio; tocar nele não dispara `onPress`. */
  onRemove?: () => void
  selected?: boolean
  icon?: DSIconName
  disabled?: boolean
  interactionId?: string
}

/** Uso interno de `Chip` e `FilterChip`. */
export type ChipBaseProps = ChipProps & {
  component: string
  /** Telemetria do toque no corpo: `toggle` com o novo valor (FilterChip); omitido = `press`. */
  toggle?: boolean
  /** ✓ que entra antes do rótulo quando selecionado. */
  check?: boolean
}

const useStyles = createStyles((t) => ({
  chip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', minHeight: t.density.control.sm, borderRadius: t.shape.radius.full, borderWidth: t.shape.borderWidth.thin },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: t.shape.radius.full },
  body: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: t.density.space.md },
  bodyRemovable: { paddingRight: t.density.space.xs },
  inner: { flexDirection: 'row', alignItems: 'center', gap: t.density.space.xxs },
  remove: { alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', paddingLeft: t.density.space.xs, paddingRight: t.density.space.sm },
}))

const rgba = (c: string) => mixColor(c, c, 0)

export function ChipBase({ label, onPress, onRemove, selected, icon, disabled, interactionId, component, toggle, check }: ChipBaseProps) {
  const t = useTheme()
  const { Icon, strings } = useDS()
  const s = useStyles()
  const { duration, easing, reduced } = useThemeMotion()
  const c = t.color
  const size = t.icon.size.sm
  const fill = useSharedValue(selected ? 1 : 0)
  useEffect(() => {
    const to = selected ? 1 : 0
    fill.value = reduced ? to : withTiming(to, { duration: duration.base, easing: easing.standard })
  }, [selected, reduced, duration.base, easing.standard, fill])

  // Selecionado = preenchido de accent (hairline quando não); desabilitado vem das cores do tema, não da opacidade.
  const onColor = disabled ? c.textDisabled : c.accent
  const edgeOff = rgba(disabled ? c.borderMuted : c.border)
  const edgeOn = rgba(onColor)
  const edge = useAnimatedStyle(() => ({ borderColor: interpolateColor(fill.value, [0, 1], [edgeOff, edgeOn]) }))
  const fillStyle = useAnimatedStyle(() => ({ opacity: fill.value }))
  // Largura e margem negativa (que cancela o gap do `inner`) crescem juntas: fechado, o slot não deixa vão.
  const gap = t.density.space.xxs
  const slot = useAnimatedStyle(() => ({ width: fill.value * size, marginRight: (fill.value - 1) * gap, opacity: fill.value, overflow: 'hidden' }))

  const content = (fg: 'text' | 'textDisabled' | 'onAccent' | 'bg') => (
    <View style={s.inner}>
      {check && (
        <Animated.View style={slot}>
          <Icon name="check" size={size} color={c[fg]} strokeWidth={t.icon.strokeWidth} />
        </Animated.View>
      )}
      {icon && <Icon name={icon} size={size} color={c[fg]} strokeWidth={t.icon.strokeWidth} />}
      <Text variant="xs" color={fg}>{label}</Text>
    </View>
  )
  const layers = <Dual fill={fill} off={content(disabled ? 'textDisabled' : 'text')} on={content(disabled ? 'bg' : 'onAccent')} />
  const bodyStyle = [s.body, !!onRemove && s.bodyRemovable]
  const toggled = toggle === undefined ? undefined : { kind: 'toggle' as const, value: toggle }

  return (
    <Animated.View style={[s.chip, edge]}>
      <Animated.View pointerEvents="none" style={[s.fill, { backgroundColor: rgba(onColor) }, fillStyle]} />
      {onPress ? (
        <Press
          component={component}
          interactionId={interactionId}
          event={toggled}
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityState={{ selected, disabled: !!disabled }}
          disabled={disabled}
          onPress={onPress}
          style={bodyStyle}
        >
          {layers}
        </Press>
      ) : (
        <View style={bodyStyle} accessible accessibilityLabel={label} accessibilityState={{ selected, disabled: !!disabled }}>
          {layers}
        </View>
      )}
      {onRemove && (
        <Press
          component={component}
          interactionId={interactionId ? `${interactionId}.remove` : undefined}
          accessibilityRole="button"
          accessibilityLabel={`${strings.close} ${label}`}
          disabled={disabled}
          onPress={onRemove}
          style={s.remove}
        >
          <Dual
            fill={fill}
            off={<Icon name="close" size={size} color={c[disabled ? 'textDisabled' : 'text']} strokeWidth={t.icon.strokeWidth} />}
            on={<Icon name="close" size={size} color={c[disabled ? 'bg' : 'onAccent']} strokeWidth={t.icon.strokeWidth} />}
          />
        </Press>
      )}
    </Animated.View>
  )
}
