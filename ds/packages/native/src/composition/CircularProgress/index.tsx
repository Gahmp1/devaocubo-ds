// Referência: Zenith CircularProgress (SWFitness), molas e cores agora do tema; arco pela geometria de ds-core.
import { arcPath } from '@gahmp1/ds-core'
import { useEffect, type ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { cancelAnimation, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import type { ProgressBarTone } from '../../primitives/ProgressBar/index.js'

export type CircularProgressProps = {
  /** 0 a 1. */
  value: number
  /** pt. Padrão 56. */
  size?: number
  /** pt. Padrão: o dobro de `shape.borderWidth.thick`, como a `ProgressBar`. */
  thickness?: number
  tone?: ProgressBarTone
  /** Centro do anel. */
  children?: ReactNode
}

const DEFAULT_SIZE = 56 // pt
const THICKNESS_STEPS = 2
const AnimatedPath = Animated.createAnimatedComponent(Path)

const useStyles = createStyles(() => ({
  center: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
}))

export function CircularProgress({ value, size = DEFAULT_SIZE, thickness, tone = 'accent', children }: CircularProgressProps) {
  const { color, shape } = useTheme()
  const s = useStyles()
  const { duration, easing, reduced } = useThemeMotion()
  const stroke = thickness ?? shape.borderWidth.thick * THICKNESS_STEPS
  const target = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0
  const progress = useSharedValue(reduced ? target : 0)

  useEffect(() => {
    progress.value = reduced ? target : withTiming(target, { duration: duration.slow, easing: easing.standard })
    return () => cancelAnimation(progress)
  }, [target, reduced, progress, duration.slow, easing.standard])

  // O círculo inteiro (`arcPath(1)`, do topo no sentido horário) é o trilho; o preenchimento é o mesmo traço com o pontilhado deslocado,
  // porque o `d` não anima no worklet. Padrão [c, 2c] com deslocamento c: valor 0 cai todo no vazio, sem ponto de ponta.
  const circle = arcPath(1, size, stroke)
  const length = Math.PI * Math.max(0, size - stroke)
  const fillProps = useAnimatedProps(() => ({ strokeDashoffset: length * (1 - progress.value) }))

  return (
    <View accessible accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(target * 100) }} style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Path d={circle} fill="none" stroke={color.surface3} strokeWidth={stroke} />
        <AnimatedPath d={circle} fill="none" stroke={color[tone]} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={[length, length * 2]} animatedProps={fillProps} />
      </Svg>
      {children !== undefined && <View style={s.center}>{children}</View>}
    </View>
  )
}
