// Referência: beUI Native text-shimmer (MIT), https://github.com/starc007/ui-components — recriada (varredura de uma faixa de gradiente), não colada.
import type { RadiusStep } from '@gahmp1/ds-core'
import { useEffect, useState, type ReactNode } from 'react'
import { StyleSheet, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native'
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { useTheme } from '../../core/DSProvider.js'
import { useLoopActive } from '../../core/useLoopActive.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'

export type ShimmerProps = {
  /** Falso (ou movimento reduzido) deixa o conteúdo parado, sem faixa. */
  active?: boolean
  /** Raio do recorte da faixa; combine com o raio do conteúdo. */
  radius?: RadiusStep
  /**
   * Para o loop sem desmontar. Fora da tela numa lista a virtualização já cobre; telas que seguem montadas
   * mas escondidas (abas, pilha) passam `paused`. O loop também para com o app em segundo plano.
   */
  paused?: boolean
  /** Só layout (flex, tamanho). */
  style?: StyleProp<ViewStyle>
  /** A faixa passa por cima do conteúdo, recortada pelo contorno do Shimmer. */
  children?: ReactNode
}

// Largura da faixa em fração do conteúdo, alfa de pico da faixa e duração da varredura em múltiplos de `duration.slow`.
const BAND = 0.6
const PEAK_ALPHA = 0.18
const SWEEP_FACTOR = 5

export function Shimmer({ active = true, radius, paused, style, children }: ShimmerProps) {
  const { color, shape } = useTheme()
  const { duration, easing } = useThemeMotion()
  const loopActive = useLoopActive({ paused })
  const [width, setWidth] = useState(0)
  const progress = useSharedValue(0)
  const running = active && loopActive && width > 0
  const band = width * BAND

  useEffect(() => {
    if (!running) return
    progress.value = 0
    progress.value = withRepeat(withTiming(1, { duration: duration.slow * SWEEP_FACTOR, easing: easing.standard }), -1, false)
    return () => {
      cancelAnimation(progress)
      progress.value = 0
    }
  }, [running, progress, duration.slow, easing.standard])

  const bandStyle = useAnimatedStyle(() => ({ transform: [{ translateX: -band + progress.value * (width + band) }] }))
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)

  return (
    <View onLayout={onLayout} style={[{ overflow: 'hidden' }, radius && { borderRadius: shape.radius[radius] }, style]}>
      {children}
      {running && (
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { width: band }, bandStyle]}>
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id="ds-shimmer" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor={color.text} stopOpacity={0} />
                <Stop offset="0.5" stopColor={color.text} stopOpacity={PEAK_ALPHA} />
                <Stop offset="1" stopColor={color.text} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#ds-shimmer)" />
          </Svg>
        </Animated.View>
      )}
    </View>
  )
}
