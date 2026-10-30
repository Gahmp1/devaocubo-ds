// Referência: beUI Native rise-in (MIT), https://github.com/starc007/ui-components — recriada (entrada com deslocamento e opacidade), não colada.
import { Children, isValidElement, useEffect, type ReactNode } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'

export type RevealFrom = 'bottom' | 'top' | 'left' | 'right' | 'fade'

export type RevealProps = {
  /** De onde o conteúdo vem; `fade` só muda a opacidade. */
  from?: RevealFrom
  /** ms antes da entrada. */
  delay?: number
  /** ms a mais por filho, em cascata (cada filho do `Reveal` entra `stagger` depois do anterior). */
  stagger?: number
  /** Falso faz a saída (opacidade e deslocamento voltam); o conteúdo segue montado, sem toque nem leitor de tela. */
  show?: boolean
  children?: ReactNode
}

// Distância do deslocamento em pontos e o lado de onde vem (x, y); `fade` não desloca.
const OFFSET = 24
const SIDE = { bottom: [0, 1], top: [0, -1], left: [-1, 0], right: [1, 0], fade: [0, 0] } as const

function RevealItem({ from, delay, show, children }: Required<Pick<RevealProps, 'from' | 'delay' | 'show'>> & { children: ReactNode }) {
  const { motion } = useTheme()
  const { duration, easing, spring, reduced } = useThemeMotion()
  const progress = useSharedValue(0)
  // Reduzido: só opacidade, sem deslocamento. Fora o reduzido, a personalidade do tema escolhe mola (snappy) ou `easing.enter` (calm).
  const [x, y] = reduced ? [0, 0] : SIDE[from]

  useEffect(() => {
    progress.value = !show
      ? withTiming(0, { duration: duration.base, easing: easing.exit })
      : withDelay(
          delay,
          reduced
            ? withTiming(1, { duration: duration.fast, easing: easing.standard })
            : motion.personality === 'snappy'
              ? withSpring(1, spring)
              : withTiming(1, { duration: duration.slow, easing: easing.enter }),
        )
  }, [progress, show, delay, reduced, motion.personality, duration, easing, spring])

  const style = useAnimatedStyle(() => ({
    opacity: Math.min(progress.value, 1),
    transform: [{ translateX: (1 - progress.value) * OFFSET * x }, { translateY: (1 - progress.value) * OFFSET * y }],
  }))

  return (
    <Animated.View style={style} pointerEvents={show ? 'auto' : 'none'} accessibilityElementsHidden={!show} importantForAccessibility={show ? 'auto' : 'no-hide-descendants'}>
      {children}
    </Animated.View>
  )
}

export function Reveal({ from = 'bottom', delay = 0, stagger = 0, show = true, children }: RevealProps) {
  return (
    <>
      {Children.toArray(children).map((child, i) => (
        <RevealItem key={isValidElement(child) ? child.key : i} from={from} delay={delay + i * stagger} show={show}>
          {child}
        </RevealItem>
      ))}
    </>
  )
}
