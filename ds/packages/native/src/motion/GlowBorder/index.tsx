// Ideia: border-beam da libraries.dev (brilho viajante por ângulo mais bloom; licença a verificar), recriada em Skia sobre os papéis do tema, sem código copiado.
import { BEAM_STOPS, beamAngle, glowAlphas, withAlpha, type RadiusStep } from '@gahmp1/ds-core'
import { BlurMask, Canvas, Group, RoundedRect, SweepGradient, vec } from '@shopify/react-native-skia'
import { useEffect, useState, type ReactNode } from 'react'
import { StyleSheet, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native'
import { useDerivedValue, useFrameCallback, useSharedValue, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../core/DSProvider.js'
import { useLoopActive } from '../../core/useLoopActive.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'

export type GlowBorderProps = {
  /** Liga o brilho viajante; entra e sai com fade (`duration.base`). */
  active: boolean
  /** Raio do contorno; combine com o raio do filho. */
  radius?: RadiusStep
  /** Ciclo completo em ms; padrão `ai.beamPeriodMs` do tema. */
  periodMs?: number
  /** Para o giro sem desmontar (telas escondidas, mas montadas); o giro também para com o app em segundo plano. */
  paused?: boolean
  /** Só layout (flex, tamanho). */
  style?: StyleProp<ViewStyle>
  /** O brilho contorna este conteúdo, por fora e por dentro da borda. */
  children: ReactNode
}

// Opacidade do contorno estático (movimento reduzido), alfa do bloom e quanto o bloom desfoca, em múltiplos da borda grossa.
const STATIC_ALPHA = 0.7
const BLOOM_BLUR = 3
// Margem do Canvas além do contêiner, para o bloom (traço duplo + desfoque) não ser cortado.
const BLOOM_MARGIN = 3

export function GlowBorder({ active, radius = 'lg', periodMs, paused, style, children }: GlowBorderProps) {
  const t = useTheme()
  const { duration, easing, reduced } = useThemeMotion()
  const loopActive = useLoopActive({ paused })
  const [size, setSize] = useState({ width: 0, height: 0 })
  const fade = useSharedValue(0)
  const angle = useSharedValue(0)
  const period = periodMs ?? t.ai.beamPeriodMs
  const running = active && loopActive && size.width > 0

  useEffect(() => {
    fade.value = withTiming(active ? 1 : 0, { duration: reduced ? 0 : duration.base, easing: easing.standard })
  }, [active, reduced, duration.base, easing.standard, fade])

  const frame = useFrameCallback((f) => {
    angle.value = beamAngle(f.timeSinceFirstFrame, period)
  }, false)
  useEffect(() => {
    frame.setActive(running)
  }, [running, frame])

  const rotate = useDerivedValue(() => [{ rotate: (angle.value * Math.PI) / 180 }])
  const onLayout = (e: LayoutChangeEvent) => setSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })

  const r = t.shape.radius[radius]
  const w = t.shape.borderWidth.thick
  const beam = t.color.aiBeam
  const bloom = glowAlphas(1, t.depth.model).bloom
  const m = w * BLOOM_MARGIN
  const center = vec(m + size.width / 2, m + size.height / 2)
  // Bloom e traço compartilham o contorno; o traço fica dentro do retângulo, o bloom vaza pela margem do Canvas.
  const rect = { x: m + w / 2, y: m + w / 2, width: Math.max(size.width - w, 0), height: Math.max(size.height - w, 0) }
  const colors = BEAM_STOPS.alphas.map((a) => withAlpha(beam, a))

  return (
    <View onLayout={onLayout} style={style}>
      {children}
      <View pointerEvents="none" style={StyleSheet.absoluteFill} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {size.width > 0 && (
          <Canvas style={{ position: 'absolute', left: -m, top: -m, width: size.width + 2 * m, height: size.height + 2 * m }}>
            <Group opacity={fade}>
              {reduced ? (
                <RoundedRect {...rect} r={r} style="stroke" strokeWidth={w} color={withAlpha(beam, STATIC_ALPHA)} />
              ) : (
                <>
                  {bloom > 0 && (
                    <RoundedRect {...rect} r={r} style="stroke" strokeWidth={w * 2} opacity={bloom}>
                      <SweepGradient c={center} colors={colors} positions={[...BEAM_STOPS.positions]} transform={rotate} origin={center} />
                      <BlurMask blur={w * BLOOM_BLUR} style="normal" />
                    </RoundedRect>
                  )}
                  <RoundedRect {...rect} r={r} style="stroke" strokeWidth={w}>
                    <SweepGradient c={center} colors={colors} positions={[...BEAM_STOPS.positions]} transform={rotate} origin={center} />
                  </RoundedRect>
                </>
              )}
            </Group>
          </Canvas>
        )}
      </View>
    </View>
  )
}
