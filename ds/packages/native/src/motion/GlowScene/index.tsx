// Ideia: GlowScene do Zenith (SWFitness: manchas elípticas sobre uma cor base), recriada em Skia com gradientes gaussianos no lugar dos PNGs e papéis do tema no lugar dos hex.
import { bloomScale, FALLOFF_RADIUS_PER_FWHM, glowFalloff, SCENE_PRESETS, withAlpha, type RadiusStep, type ScenePreset } from '@gahmp1/ds-core'
import { Canvas, Circle, Group, RadialGradient, vec } from '@shopify/react-native-skia'
import { useState, type ReactNode } from 'react'
import { StyleSheet, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native'
import { useTheme } from '../../core/DSProvider.js'

export type GlowSceneProps = {
  /** `focus`: luz no topo; `ambient`: duas luzes suaves nos cantos; `success`: duas luzes no topo, mais fortes. */
  preset?: ScenePreset
  /** Raio do recorte; combine com o raio do pai. */
  radius?: RadiusStep
  /** Só layout (flex, tamanho). */
  style?: StyleProp<Pick<ViewStyle, 'flex' | 'flexGrow' | 'flexShrink' | 'flexBasis' | 'alignSelf' | 'width' | 'height' | 'minHeight' | 'maxHeight' | 'margin' | 'marginHorizontal' | 'marginVertical'>>
  /** Fica por cima das luzes. */
  children?: ReactNode
}

const ORIGIN = vec(0, 0)

/** Fundo `bg` do tema com as manchas do preset; o `depth.model` do tema escala o brilho (`flat` apaga as manchas). */
export function GlowScene({ preset = 'focus', radius, style, children }: GlowSceneProps) {
  const { color, depth, shape } = useTheme()
  const [box, setBox] = useState<{ w: number; h: number } | null>(null)
  const onLayout = (e: LayoutChangeEvent) => setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  const scale = bloomScale(depth.model)
  const { positions, alphas } = glowFalloff()

  return (
    <View onLayout={onLayout} style={[{ overflow: 'hidden', backgroundColor: color.bg }, radius && { borderRadius: shape.radius[radius] }, style]}>
      {box && scale > 0 && (
        <Canvas pointerEvents="none" style={StyleSheet.absoluteFill}>
          {SCENE_PRESETS[preset].map((b, i) => (
            // Círculo unitário com gradiente, esticado em elipse e levado ao centro da mancha.
            <Group
              key={i}
              transform={[
                { translateX: b.cx * box.w },
                { translateY: b.cy * box.h },
                { scaleX: b.fwhmX * box.w * FALLOFF_RADIUS_PER_FWHM },
                { scaleY: b.fwhmY * box.h * FALLOFF_RADIUS_PER_FWHM },
              ]}
            >
              <Circle c={ORIGIN} r={1}>
                <RadialGradient c={ORIGIN} r={1} positions={positions} colors={alphas.map((x) => withAlpha(color[b.color], b.opacity * scale * x))} />
              </Circle>
            </Group>
          ))}
        </Canvas>
      )}
      {children}
    </View>
  )
}
