import { useEffect, useRef, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useThemeMotion } from '../core/useThemeMotion.js'

/**
 * Indicador que desliza entre `count` casas iguais, com a mola do tema (movimento reduzido: troca sem deslizar).
 * `onLayout` vai no contêiner das casas; `style` (translateX) vai no indicador, que tem `slot` de largura.
 * Usado por `TabBar` e `SegmentedControl`.
 */
export function useSlider(index: number, count: number) {
  const { spring, reduced } = useThemeMotion()
  const [width, setWidth] = useState(0)
  const x = useSharedValue(0)
  const placed = useRef(false)
  const slot = width / count

  useEffect(() => {
    if (!width) return
    const to = index * slot
    // A primeira posição (e a de movimento reduzido) é direta; só mudanças depois da primeira medida deslizam.
    x.value = reduced || !placed.current ? to : withSpring(to, spring)
    placed.current = true
  }, [index, slot, width, reduced, spring, x])

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }))
  return { slot, style, onLayout: (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width) }
}
