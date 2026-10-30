// Ideia: voice-glow da libraries.dev (traço, luz interna e bloom; licença a verificar), recriada em Skia sobre os papéis do tema, sem código copiado.
import { glowAlphas, glowFalloff, withAlpha, type GlowColor } from '@gahmp1/ds-core'
import { Canvas, Circle, Group, RadialGradient, vec } from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { View } from 'react-native'
import { cancelAnimation, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../core/DSProvider.js'
import { useLoopActive } from '../../core/useLoopActive.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'

export type GlowProps = {
  /** 0–1: acende as três camadas. O bloom ainda depende do `depth.model` do tema (some em `flat`). */
  strength?: number
  color?: GlowColor
  /** Diâmetro do círculo em pt; o bloom passa dele (até meio diâmetro para fora). */
  size?: number
  /** Luz interna e bloom respiram em loop; movimento reduzido deixa parado. */
  pulse?: boolean
  /** Para o pulso sem desmontar (telas escondidas, mas montadas); o pulso também para com o app em segundo plano. */
  paused?: boolean
}

const DEFAULT_STRENGTH = 0.6
const DEFAULT_SIZE = 96
// Pulso: quanto a opacidade cai e o bloom cresce no pico, e a duração de um ciclo em múltiplos de `duration.slow`.
const PULSE_DIP = 0.45
const PULSE_GROW = 0.08
const PULSE_FACTOR = 6

export function Glow({ strength = DEFAULT_STRENGTH, color = 'aiGlow', size = DEFAULT_SIZE, pulse = false, paused }: GlowProps) {
  const theme = useTheme()
  const { duration, easing } = useThemeMotion()
  const loopActive = useLoopActive({ paused })
  const running = pulse && loopActive
  const p = useSharedValue(0)

  useEffect(() => {
    if (!running) return
    p.value = withRepeat(withTiming(1, { duration: duration.slow * PULSE_FACTOR, easing: easing.standard }), -1, true)
    return () => {
      cancelAnimation(p)
      p.value = 0
    }
  }, [running, p, duration.slow, easing.standard])

  const breath = useDerivedValue(() => 1 - PULSE_DIP * p.value)
  const grow = useDerivedValue(() => [{ scale: 1 + PULSE_GROW * p.value }])

  const base = theme.color[color]
  const a = glowAlphas(strength, theme.depth.model)
  const { positions, alphas } = glowFalloff()
  const stroke = theme.shape.borderWidth.thick
  // Canvas de 2 × size centrado no círculo: o bloom chega a `size` do centro, meio diâmetro além da borda.
  const c = vec(size, size)
  const half = size / 2

  return (
    <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{ width: size, height: size }}>
      <Canvas style={{ position: 'absolute', left: -half, top: -half, width: size * 2, height: size * 2 }}>
        <Group opacity={breath}>
          <Group transform={grow} origin={c}>
            <Circle c={c} r={size}>
              <RadialGradient c={c} r={size} positions={positions} colors={alphas.map((x) => withAlpha(base, a.bloom * x))} />
            </Circle>
          </Group>
          <Circle c={c} r={half}>
            <RadialGradient c={c} r={half} positions={[0, 0.5, 1]} colors={[withAlpha(base, 0), withAlpha(base, 0), withAlpha(base, a.inner)]} />
          </Circle>
        </Group>
        <Circle c={c} r={half - stroke / 2} style="stroke" strokeWidth={stroke} color={withAlpha(base, a.trace)} />
      </Canvas>
    </View>
  )
}
