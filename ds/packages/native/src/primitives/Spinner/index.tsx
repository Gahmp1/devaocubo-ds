import { mixColor, useDS, type ResolvedTheme } from '@gahmp1/ds-core'
import { parseColor } from '@gahmp1/ds-theme'
import { Canvas, Fill, Shader, Skia, useClock } from '@shopify/react-native-skia'
import { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import Animated, { cancelAnimation, useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../core/DSProvider.js'
import { useAppActive, useLoopActive } from '../../core/useLoopActive.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { FLUID_SPINNER_SOURCE } from './shader.js'

export type SpinnerSize = 'small' | 'medium' | 'large'
export type SpinnerTone = 'accent' | 'onAccent' | 'text'

export type SpinnerProps = {
  size?: SpinnerSize
  /** `onAccent` para usar sobre fundo de acento (botão); `text` sobre superfícies neutras. */
  tone?: SpinnerTone
  /** Padrão: `strings.loading`. */
  accessibilityLabel?: string
  /**
   * Para o loop sem desmontar. Fora da tela numa lista a virtualização já cobre; telas que seguem montadas
   * mas escondidas (abas, pilha) passam `paused`. O loop também para com o app em segundo plano.
   */
  paused?: boolean
}

const SIZE: Record<SpinnerSize, number> = { small: 20, medium: 32, large: 48 }
// Zenith: atoms/Spinner/Spinner.tsx (parâmetros do handoff "SW Fluid Spinner")
const SPEED = 1.35
const THICKNESS = 0.7
const SOFTNESS = 0.7
const OPACITY = 0.94
const CYCLE_MS = 2580
// Instante do ciclo em que o arco está inteiro (`life` = 1): quadro estático do movimento reduzido.
const STATIC_TIME = 0.58
// Pulso do movimento reduzido: múltiplo da duração `slow` do tema e piso de opacidade.
const PULSE_FACTOR = 5
const PULSE_MIN = 0.4

const unit = (color: string): [number, number, number] => {
  const { r, g, b } = parseColor(color)
  return [r / 255, g / 255, b / 255]
}

/** Cabeça e energia na cor do tom; a cauda se dissolve em `surface2` e `bg` (o tema decide o resto). */
function palette(t: ResolvedTheme, tone: SpinnerTone) {
  const { color } = t
  const c = color[tone]
  return { head: unit(c), energy: unit(c), depth: unit(mixColor(c, color.surface2, 0.5)), tail: unit(mixColor(c, color.bg, 0.75)) }
}

type Colors = ReturnType<typeof palette>
type Layer = { px: number; colors: Colors }
type PulseLayer = Layer & { pulse: boolean }

function Rotating({ px, colors }: Layer) {
  const source = useMemo(() => Skia.RuntimeEffect.Make(FLUID_SPINNER_SOURCE), [])
  // O relógio do Skia só existe enquanto este componente está montado: reduzido desmonta e ele para.
  const clock = useClock()
  const uniforms = useDerivedValue(() => ({
    resolution: [px, px], time: (clock.value / CYCLE_MS) * SPEED, thickness: THICKNESS, softness: SOFTNESS, opacity: OPACITY,
    headColor: colors.head, energyColor: colors.energy, depthColor: colors.depth, tailColor: colors.tail,
  }), [clock, px, colors])
  return source && (
    <Canvas style={{ width: px, height: px }}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  )
}

/** Quadro parado do arco (relógio do Skia desmontado). Com `pulse` (movimento reduzido), pulsa em opacidade, devagar. */
function Pulsing({ px, colors, pulse }: PulseLayer) {
  const source = useMemo(() => Skia.RuntimeEffect.Make(FLUID_SPINNER_SOURCE), [])
  const { duration } = useThemeMotion()
  const opacity = useSharedValue(1)
  useEffect(() => {
    if (!pulse) return
    opacity.value = withRepeat(withTiming(PULSE_MIN, { duration: duration.slow * PULSE_FACTOR }), -1, true)
    return () => {
      cancelAnimation(opacity)
      opacity.value = 1
    }
  }, [opacity, duration.slow, pulse])
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }))
  const uniforms = {
    resolution: [px, px], time: STATIC_TIME, thickness: THICKNESS, softness: SOFTNESS, opacity: OPACITY,
    headColor: colors.head, energyColor: colors.energy, depthColor: colors.depth, tailColor: colors.tail,
  }
  return source && (
    <Animated.View style={style}>
      <Canvas style={{ width: px, height: px }}>
        <Fill>
          <Shader source={source} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </Animated.View>
  )
}

export function Spinner({ size = 'medium', tone = 'accent', accessibilityLabel, paused }: SpinnerProps) {
  const theme = useTheme()
  const { strings } = useDS()
  const px = SIZE[size]
  const colors = useMemo(() => palette(theme, tone), [theme, tone])
  const active = useLoopActive({ paused })
  const appActive = useAppActive()
  return (
    <View accessibilityRole="progressbar" accessibilityLabel={accessibilityLabel ?? strings.loading} style={{ width: px, height: px }}>
      {active ? <Rotating px={px} colors={colors} /> : <Pulsing px={px} colors={colors} pulse={theme.motion.reduced && appActive && !paused} />}
    </View>
  )
}
