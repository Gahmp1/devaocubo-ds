// Referência: Zenith BarChart (SWFitness) sem eixos fixos; geometria pelo `barLayout` de ds-core.
import { barLayout, type BarRect } from '@gahmp1/ds-core'
import { useEffect, useState } from 'react'
import { View, type LayoutChangeEvent } from 'react-native'
import Animated, { cancelAnimation, useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming, type SharedValue } from 'react-native-reanimated'
import Svg, { G, Rect } from 'react-native-svg'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Text } from '../../primitives/Text/index.js'

export type BarChartProps = {
  data: { label: string; value: number }[]
  /** Índice da barra em acento; as outras ficam neutras. Sem ele, todas em acento. */
  highlight?: number
  /** pt, com o espaço do valor acima das barras. Padrão 160. */
  height?: number
  /** Texto do valor da barra em destaque e do resumo falado; padrão `String`. */
  formatValue?: (n: number) => string
}

const DEFAULT_HEIGHT = 160 // pt
const VALUE_WIDTH = 72 // pt, largura da caixa do valor acima da barra em destaque
const AnimatedRect = Animated.createAnimatedComponent(Rect)

const useStyles = createStyles((t) => ({
  labels: { flexDirection: 'row', gap: t.density.space.sm, marginTop: t.density.space.xs },
  label: { flex: 1, textAlign: 'center' },
  value: { position: 'absolute', width: VALUE_WIDTH, alignItems: 'center' },
  baseline: { height: t.shape.borderWidth.hairline, backgroundColor: t.color.border },
  empty: { justifyContent: 'flex-end' },
}))

function Bar({ rect, base, grow, fill, radius }: { rect: BarRect; base: number; grow: SharedValue<number>; fill: string; radius: number }) {
  const props = useAnimatedProps(() => {
    const h = rect.height * grow.value
    return { y: base - h, height: h }
  })
  return <AnimatedRect x={rect.x} width={rect.width} rx={radius} ry={radius} fill={fill} animatedProps={props} />
}

export function BarChart({ data, highlight, height = DEFAULT_HEIGHT, formatValue = String }: BarChartProps) {
  const t = useTheme()
  const s = useStyles()
  const { duration, easing, reduced } = useThemeMotion()
  const [width, setWidth] = useState(0)
  const grow = useSharedValue(reduced ? 1 : 0)
  const signature = data.map((d) => d.value).join()

  useEffect(() => {
    // Barras nascem de novo quando os valores mudam.
    grow.value = reduced ? 1 : 0
    if (!reduced) grow.value = withTiming(1, { duration: duration.slow, easing: easing.enter })
    return () => cancelAnimation(grow)
  }, [signature, reduced, grow, duration.slow, easing.enter])

  const valueStyle = useAnimatedStyle(() => ({ opacity: grow.value }))
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)

  if (data.length === 0) {
    return (
      <View style={[s.empty, { height }]}>
        <View style={s.baseline} />
      </View>
    )
  }

  const room = t.type.scale.xs.lineHeight // acima das barras, para o valor em destaque
  const plot = Math.max(0, height - room)
  const rects = width > 0 ? barLayout(data, { width, height: plot, gap: t.density.space.sm }) : []
  const marked = highlight === undefined ? undefined : rects[highlight]
  const summary = data.map((d) => `${d.label}: ${formatValue(d.value)}`).join(', ')

  return (
    <View accessible accessibilityRole="image" accessibilityLabel={summary} onLayout={onLayout}>
      <View style={{ height }}>
        <Svg width={width} height={height}>
          <G y={room}>
            {rects.map((r, i) => (
              <Bar key={i} rect={r} base={plot} grow={grow} radius={Math.min(t.shape.radius.sm, r.width / 2)} fill={highlight === undefined || highlight === i ? t.color.accent : t.color.surface3} />
            ))}
          </G>
        </Svg>
        {marked && (
          <Animated.View style={[s.value, { top: marked.y, left: Math.min(Math.max(0, marked.x + marked.width / 2 - VALUE_WIDTH / 2), Math.max(0, width - VALUE_WIDTH)) }, valueStyle]}>
            <Text variant="xsMedium" tabular numberOfLines={1}>{formatValue(marked.value)}</Text>
          </Animated.View>
        )}
      </View>
      <View style={s.labels}>
        {data.map((d, i) => (
          <Text key={i} variant="xs" color={highlight === i ? 'text' : 'textMuted'} numberOfLines={1} style={s.label}>{d.label}</Text>
        ))}
      </View>
    </View>
  )
}
