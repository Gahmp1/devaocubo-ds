import { useEffect, useState } from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { usePanGesture } from 'react-native-gesture-handler'
import { useSharedValue, withSpring } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useThemeMotion } from '../../core/useThemeMotion.js'

const SLOP = 10 // pt; abaixo disso o dedo ainda é toque ou rolagem
const RESISTANCE = 0.6 // o conteúdo desce 60% do que o dedo desce
const OVERSHOOT = 1.6 // o conteúdo nunca passa de 1,6 × o limiar

type Args = {
  refreshing: boolean
  threshold: number
  /** Chamado uma vez por puxada, no instante em que o conteúdo cruza o limiar. */
  onCommit: () => void
}

/**
 * Puxada do topo: `y` é quanto o conteúdo desceu (mola do tema ao soltar; sem resistência elástica em movimento reduzido).
 * O pan roda junto da rolagem do filho e só puxa com `scrollY <= 0`; se a lista chega ao topo no meio do gesto, a puxada começa dali.
 */
export function usePullMotion({ refreshing, threshold, onCommit }: Args) {
  const { spring, reduced } = useThemeMotion()
  const [visible, setVisible] = useState(refreshing)
  const y = useSharedValue(refreshing ? threshold : 0)
  const scrollY = useSharedValue(0)
  const base = useSharedValue(0)
  const committed = useSharedValue(false)
  const dragging = useSharedValue(false)
  const ignore = useSharedValue(false) // puxada que começou durante uma atualização
  const busy = useSharedValue(refreshing)

  const settle = (to: number) => {
    'worklet'
    const hide = () => {
      'worklet'
      if (to === 0) scheduleOnRN(setVisible, false)
    }
    if (reduced) {
      y.value = to
      hide()
      return
    }
    y.value = withSpring(to, spring, (done) => {
      'worklet'
      if (done) hide()
    })
  }

  // `refreshing` é a fonte da verdade: mantém o conteúdo no limiar enquanto atualiza e devolve ao topo quando termina.
  useEffect(() => {
    busy.value = refreshing
    if (refreshing) setVisible(true)
    if (!dragging.value) settle(refreshing ? threshold : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing, threshold, reduced, spring])

  const pan = usePanGesture({
    activeOffsetY: SLOP,
    failOffsetY: -SLOP,
    onBegin: () => {
      'worklet'
      committed.value = false
      base.value = 0
      ignore.value = busy.value
    },
    onActivate: () => {
      'worklet'
      if (ignore.value) return
      dragging.value = true
      scheduleOnRN(setVisible, true)
    },
    onUpdate: (e) => {
      'worklet'
      if (ignore.value) return
      if (scrollY.value > 0) {
        base.value = e.translationY
        y.value = 0
        return
      }
      const raw = Math.max(0, e.translationY - base.value)
      const pulled = reduced ? raw : Math.min(raw * RESISTANCE, threshold * OVERSHOOT)
      y.value = pulled
      if (!committed.value && pulled >= threshold) {
        committed.value = true
        scheduleOnRN(onCommit)
      }
    },
    onDeactivate: () => {
      'worklet'
      if (ignore.value) return
      dragging.value = false
      settle(busy.value ? threshold : 0)
    },
  })

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = e.nativeEvent.contentOffset.y
  }
  return { pan, onScroll, y, visible: visible || refreshing }
}
