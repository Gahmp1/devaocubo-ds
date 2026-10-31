// Referência: Zenith LineChart (SWFitness); `loading` que respira e `emptyText` vêm do react-native-livechart (MIT), só a ideia, o desenho é SVG próprio.
import { linePath, useDS } from '@gahmp1/ds-core'
import { useEffect, useId, useState } from 'react'
import { View, type LayoutChangeEvent } from 'react-native'
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { useLoopActive } from '../../core/useLoopActive.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Text } from '../../primitives/Text/index.js'

export type LineChartProps = {
  data: { x: number; y: number }[]
  /** Preenche sob a linha. */
  area?: boolean
  /** pt. Padrão 160. */
  height?: number
  /** Troca a linha por uma forma que respira, até os dados chegarem. */
  loading?: boolean
  /** Texto com `data` vazio. */
  emptyText?: string
}

const DEFAULT_HEIGHT = 160 // pt
const AREA_TOP = 0.3 // opacidade do acento no topo da área
// Forma do carregando: pontos fixos, só um traçado que sugere "dados".
const PLACEHOLDER = [3, 5, 4, 7, 6, 9, 8, 10].map((y, x) => ({ x, y }))
// Metade do respiro leva este múltiplo de `duration.slow`; o piso é a opacidade mais baixa.
const BREATH_FACTOR = 3
const BREATH_MIN = 0.4

const useStyles = createStyles(() => ({
  empty: { alignItems: 'center', justifyContent: 'center' },
  clip: { overflow: 'hidden' },
}))

export function LineChart({ data, area, height = DEFAULT_HEIGHT, loading, emptyText }: LineChartProps) {
  const t = useTheme()
  const s = useStyles()
  const { strings } = useDS()
  const { duration, easing, reduced } = useThemeMotion()
  const loopActive = useLoopActive()
  const gradient = useId().replace(/\W/g, '')
  const [width, setWidth] = useState(0)
  const reveal = useSharedValue(reduced ? 1 : 0)
  const breath = useSharedValue(1)
  const signature = data.map((p) => `${p.x}:${p.y}`).join()

  useEffect(() => {
    // A linha se desenha de novo quando os dados mudam.
    reveal.value = reduced ? 1 : 0
    if (!reduced) reveal.value = withTiming(1, { duration: duration.slow, easing: easing.enter })
    return () => cancelAnimation(reveal)
  }, [signature, reduced, reveal, duration.slow, easing.enter])

  const breathing = !!loading && loopActive
  useEffect(() => {
    if (!breathing) {
      breath.value = 1
      return
    }
    breath.value = withRepeat(withTiming(BREATH_MIN, { duration: duration.slow * BREATH_FACTOR, easing: easing.standard }), -1, true)
    return () => cancelAnimation(breath)
  }, [breathing, breath, duration.slow, easing.standard])

  const revealStyle = useAnimatedStyle(() => ({ width: width * reveal.value }))
  const breathStyle = useAnimatedStyle(() => ({ opacity: breath.value }))
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)

  if (!loading && data.length === 0) {
    return <View style={[s.empty, { height }]}>{emptyText !== undefined && <Text variant="sm" color="textMuted">{emptyText}</Text>}</View>
  }

  // A espessura do traço de folga nas bordas, para a linha não ser cortada nos extremos.
  const pad = t.shape.borderWidth.thick
  const box = { width: Math.max(0, width - pad * 2), height: Math.max(0, height - pad * 2) }
  const { line, area: fill } = linePath(loading ? PLACEHOLDER : data, { ...box, smooth: true })
  const color = loading ? t.color.surface3 : t.color.accent
  const svg = (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={AREA_TOP} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <G x={pad} y={pad}>
        {(area || loading) && <Path d={fill} fill={`url(#${gradient})`} />}
        <Path d={line} fill="none" stroke={color} strokeWidth={pad} strokeLinecap="round" strokeLinejoin="round" />
      </G>
    </Svg>
  )

  return (
    <View
      accessible
      accessibilityRole={loading ? undefined : 'image'}
      accessibilityLabel={loading ? strings.loading : data.map((p) => p.y).join(', ')}
      accessibilityState={loading ? { busy: true } : undefined}
      onLayout={onLayout}
      style={{ height }}
    >
      {width > 0 && (loading ? <Animated.View style={breathStyle}>{svg}</Animated.View> : <Animated.View style={[s.clip, { height }, revealStyle]}>{svg}</Animated.View>)}
    </View>
  )
}
