// Ideia: SuccessBackground do Zenith (SWFitness; fundo estático) mais confete leve em Skia, recriado com partículas determinísticas do ds-core.
import { CONFETTI_ROLES, confettiParticles, confettiPose, useFeedback, type ConfettiParticle } from '@gahmp1/ds-core'
import { Canvas, Group, Rect } from '@shopify/react-native-skia'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming, type SharedValue } from 'react-native-reanimated'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { GlowScene } from '../GlowScene/index.js'

export type CelebrationProps = {
  /** Cada subida de falso para verdadeiro (inclusive montar já verdadeiro) é uma execução: fundo de sucesso, confete e o papel `complete` do feedback. Falso desmonta tudo. */
  active: boolean
  /** Ao fim da execução: depois do confete, ou do fundo com movimento reduzido. */
  onDone?: () => void
}

// Duração do confete em múltiplos de `duration.slow` (o fundo fica enquanto `active`).
const RUN_FACTOR = 6

const PARTICLES = confettiParticles()

function Piece({ p, t, w, h }: { p: ConfettiParticle; t: SharedValue<number>; w: number; h: number }) {
  const { color } = useTheme()
  const pose = useDerivedValue(() => confettiPose(p, t.value, w, h))
  const transform = useDerivedValue(() => [{ translateX: pose.value.x }, { translateY: pose.value.y }, { rotate: pose.value.rotate }])
  const opacity = useDerivedValue(() => pose.value.opacity)
  return (
    <Group transform={transform} opacity={opacity}>
      <Rect x={-p.size / 2} y={-p.size / 4} width={p.size} height={p.size / 2} color={color[CONFETTI_ROLES[p.role]]} />
    </Group>
  )
}

function Confetti({ runMs }: { runMs: number }) {
  const [box, setBox] = useState<{ w: number; h: number } | null>(null)
  const t = useSharedValue(0)
  const ready = box !== null

  useEffect(() => {
    if (!ready) return
    t.value = withTiming(1, { duration: runMs, easing: Easing.linear })
    return () => cancelAnimation(t)
  }, [ready, runMs, t])

  const onLayout = (e: LayoutChangeEvent) => setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
  return (
    <View onLayout={onLayout} style={StyleSheet.absoluteFill}>
      {box && (
        <Canvas style={StyleSheet.absoluteFill}>
          {PARTICLES.map((p, i) => (
            <Piece key={i} p={p} t={t} w={box.w} h={box.h} />
          ))}
        </Canvas>
      )}
    </View>
  )
}

/** O fundo entra com um fade; movimento reduzido encurta o fade e não leva confete. */
function Stage({ confetti, runMs }: { confetti: boolean; runMs: number }) {
  const { duration, easing, reduced } = useThemeMotion()
  const shown = useSharedValue(0)
  useEffect(() => {
    shown.value = withTiming(1, { duration: reduced ? duration.fast : duration.slow, easing: easing.enter })
  }, [shown, reduced, duration.fast, duration.slow, easing.enter])
  const fade = useAnimatedStyle(() => ({ opacity: shown.value }))
  return (
    <>
      <Animated.View style={[StyleSheet.absoluteFill, fade]}>
        <GlowScene preset="success" style={s.fill} />
      </Animated.View>
      {confetti && <Confetti runMs={runMs} />}
    </>
  )
}

const s = StyleSheet.create({ fill: { flex: 1 } })

/**
 * Fundo de sucesso com confete leve. Ocupa o pai e não recebe toque: ponha atrás do conteúdo (primeiro filho).
 * Telas que mostram o resultado e precisam avisar o leitor de tela fazem isso à parte; aqui é só decoração.
 */
export function Celebration({ active, onDone }: CelebrationProps) {
  const { play } = useFeedback()
  const { duration, reduced } = useThemeMotion()
  const [confetti, setConfetti] = useState(false)
  // A execução nasce só na subida de `active`: o que muda no meio (callback, tema, preferências) é lido daqui.
  const runMs = duration.slow * RUN_FACTOR
  const latest = { play, onDone, endMs: reduced ? duration.base : runMs, reduced }
  const live = useRef(latest)
  live.current = latest

  useEffect(() => {
    if (!active) return
    const { play: playFeedback, endMs, reduced: noMotion } = live.current
    playFeedback('complete')
    setConfetti(!noMotion)
    const timer = setTimeout(() => {
      setConfetti(false)
      live.current.onDone?.()
    }, endMs)
    return () => {
      clearTimeout(timer)
      setConfetti(false)
    }
  }, [active])

  if (!active) return null
  return (
    <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={StyleSheet.absoluteFill}>
      <Stage confetti={confetti} runMs={runMs} />
    </View>
  )
}
