// Referência: Zenith BottomSheet (SWFitness), organisms/BottomSheet; o arrastar saiu do PanResponder (thread de JS) para o gesture-handler + Reanimated (thread de UI).
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { usePanGesture } from 'react-native-gesture-handler'
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useThemeMotion } from '../../core/useThemeMotion.js'

const DRAG_SLOP = 8 // pt; abaixo disso o toque continua sendo toque (botão de fechar)
const REFUSAL_CHECK_MS = 120 // ms; tempo para o app aplicar `open={false}` antes de conferir se recusou
const PROJECTION_S = 0.12 // s; a posição de soltura é projetada pela velocidade para decidir o pouso

type Args = {
  open: boolean
  /** Alturas medidas: sem isso a gaveta espera, fora da tela. */
  ready: boolean
  /** Altura da gaveta (a maior altura de `snap`). */
  full: number
  /** Deslocamento de cada altura de `snap` em relação à maior (0 = mais alta). */
  rests: number[]
  dismissible: boolean
  onClose: () => void
}

/** Entrada e saída por mola do tema (sem deslizar em movimento reduzido), alturas de `snap` e arrastar pela alça. */
export function useSheetMotion({ open, ready, full, rests, dismissible, onClose }: Args) {
  const { spring, duration, easing, reduced } = useThemeMotion()
  const { height: windowHeight } = useWindowDimensions()
  // O Modal só sai depois da animação de saída, por isso `mounted` e não `open`.
  const [mounted, setMounted] = useState(open)
  const [index, setIndex] = useState(0)
  const y = useSharedValue(windowHeight)
  const scrim = useSharedValue(0)
  const start = useSharedValue(0)
  const target = useSharedValue(-1)
  const rest = rests[Math.min(index, rests.length - 1)] ?? 0
  const openRef = useRef(open)
  openRef.current = open
  const closedY = full > 0 ? full : windowHeight

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    if (!open || !ready || target.value === rest) return
    target.value = rest
    if (reduced) {
      y.value = rest
      scrim.value = 1
      return
    }
    y.value = withSpring(rest, spring)
    scrim.value = withTiming(1, { duration: duration.base, easing: easing.enter })
  }, [open, ready, rest, reduced, spring, duration, easing, y, scrim, target])

  useEffect(() => {
    if (open || !mounted) return
    target.value = -1
    setIndex(0)
    if (reduced) {
      y.value = closedY
      scrim.value = 0
      setMounted(false)
      return
    }
    scrim.value = withTiming(0, { duration: duration.base, easing: easing.exit })
    y.value = withTiming(closedY, { duration: duration.base, easing: easing.exit }, (done) => {
      'worklet'
      if (done) scheduleOnRN(setMounted, false)
    })
  }, [open, mounted, closedY, reduced, duration, easing, y, scrim, target])

  // O app pode recusar o fechamento (`open` segue true): a gaveta volta à altura de repouso em vez de ficar onde o dedo largou.
  const dismiss = useCallback(() => {
    onClose()
    setTimeout(() => {
      if (openRef.current) y.value = reduced ? target.value : withSpring(target.value, spring)
    }, REFUSAL_CHECK_MS)
  }, [onClose, reduced, spring, target, y])
  const top = Math.min(...rests)
  const landings = dismissible ? [...rests, full] : rests
  const pan = usePanGesture({
    enabled: dismissible,
    activeOffsetY: [-DRAG_SLOP, DRAG_SLOP],
    onBegin: () => {
      'worklet'
      start.value = y.value
    },
    onUpdate: (e) => {
      'worklet'
      y.value = Math.min(full, Math.max(top, start.value + e.translationY))
    },
    onDeactivate: (e) => {
      'worklet'
      const projected = y.value + e.velocityY * PROJECTION_S
      let pick = 0
      for (let i = 1; i < landings.length; i++) {
        if (Math.abs(landings[i] - projected) < Math.abs(landings[pick] - projected)) pick = i
      }
      if (pick === rests.length) {
        // Soltou perto do fundo: o app fecha e a saída continua de onde o dedo largou.
        scheduleOnRN(dismiss)
        return
      }
      target.value = landings[pick]
      y.value = reduced ? landings[pick] : withSpring(landings[pick], { ...spring, velocity: e.velocityY })
      scheduleOnRN(setIndex, pick)
    },
  })

  const panelStyle = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }] }))
  const scrimStyle = useAnimatedStyle(() => ({ opacity: scrim.value }))
  return { mounted, pan, panelStyle, scrimStyle }
}
