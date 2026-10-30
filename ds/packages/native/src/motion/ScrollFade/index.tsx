// Referência: Zenith ScrollFadeOverlay (SWFitness), recriado sobre o próprio ScrollView: no lugar do `ScrollVisibilityContext` do app, a medida vem do scroll deste componente.
import type { ReactNode } from 'react'
import { StyleSheet, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, type SharedValue } from 'react-native-reanimated'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { useTheme } from '../../core/DSProvider.js'

export type ScrollFadeEdge = 'top' | 'bottom'

export type ScrollFadeProps = {
  /** Bordas que esmaecem; cada uma só aparece quando ainda há conteúdo daquele lado. */
  edges?: ScrollFadeEdge[]
  /** Altura do degradê em pt, e a distância de rolagem em que ele acende ou apaga. */
  size?: number
  /** Só layout (flex, tamanho). */
  style?: StyleProp<Pick<ViewStyle, 'flex' | 'flexGrow' | 'flexShrink' | 'flexBasis' | 'alignSelf' | 'width' | 'height' | 'minHeight' | 'maxHeight' | 'margin' | 'marginHorizontal' | 'marginVertical'>>
  /** Conteúdo da rolagem vertical. */
  children?: ReactNode
}

const DEFAULT_SIZE = 48

const s = StyleSheet.create({
  fill: { overflow: 'hidden' },
  top: { position: 'absolute', top: 0, left: 0, right: 0 },
  bottom: { position: 'absolute', bottom: 0, left: 0, right: 0 },
})

type Metrics = { offset: SharedValue<number>; content: SharedValue<number>; viewport: SharedValue<number> }

function Edge({ edge, size, offset, content, viewport }: { edge: ScrollFadeEdge } & Metrics & { size: number }) {
  const { color } = useTheme()
  // Opacidade = quanto falta rolar até a borda, em fração de `size` (Zenith: useEdgeVisibility).
  const style = useAnimatedStyle(() => {
    const remaining = edge === 'top' ? offset.value : content.value - viewport.value - offset.value
    return { opacity: Math.max(0, Math.min(1, remaining / size)) }
  })
  const id = `ds-scrollfade-${edge}`
  const [from, to] = edge === 'top' ? [1, 0] : [0, 1]
  return (
    <Animated.View pointerEvents="none" style={[s[edge], { height: size }, style]}>
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color.bg} stopOpacity={from} />
            <Stop offset="1" stopColor={color.bg} stopOpacity={to} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </Animated.View>
  )
}

export function ScrollFade({ edges = ['top', 'bottom'], size = DEFAULT_SIZE, style, children }: ScrollFadeProps) {
  const offset = useSharedValue(0)
  const content = useSharedValue(0)
  const viewport = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((e) => {
    offset.value = e.contentOffset.y
  })
  const onLayout = (e: LayoutChangeEvent) => {
    viewport.value = e.nativeEvent.layout.height
  }
  return (
    <View style={[s.fill, style]}>
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16} onLayout={onLayout} onContentSizeChange={(_, h) => { content.value = h }}>
        {children}
      </Animated.ScrollView>
      {edges.map((edge) => (
        <Edge key={edge} edge={edge} size={size} offset={offset} content={content} viewport={viewport} />
      ))}
    </View>
  )
}
