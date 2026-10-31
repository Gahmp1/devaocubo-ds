// Referência: bloco `pull` do Bencho (MIT), https://github.com/cabralorenzo/bencho; recriado: o compromisso acontece ao cruzar o limiar, não ao soltar.
//
// Contrato com a lista: o nativo não cria a área rolável. `children` é uma função que recebe `scroll` (a rolagem para o
// pan saber se está no topo) e devolve o `ScrollView`/`FlatList` DO react-native-gesture-handler (não o do react-native),
// com `{...scroll}` espalhado nele:
//
//   <PullToRefresh refreshing={r} onRefresh={load}>{(scroll) => <ScrollView {...scroll}>...</ScrollView>}</PullToRefresh>
//
// No web o componente cria a área rolável sozinho e `children` é o conteúdo; aqui a diferença é a função.
import { useDS, useFeedback } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { type NativeScrollEvent, type NativeSyntheticEvent, View } from 'react-native'
import { GestureDetector, type PanGesture } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Spinner } from '../../primitives/Spinner/index.js'
import { usePullMotion } from './usePullMotion.js'

/** Props para espalhar no `ScrollView`/`FlatList` do react-native-gesture-handler. */
export type PullToRefreshScroll = {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  scrollEventThrottle: 16
  /** O elástico do iOS brigaria com o do componente. */
  bounces: false
  overScrollMode: 'never'
  /** A rolagem e a puxada reconhecem o mesmo toque. */
  simultaneousWith: PanGesture
}

export type PullToRefreshProps = {
  refreshing: boolean
  /** Chamado ao cruzar o limiar (não ao soltar), uma vez por puxada, e pela ação acessível. O app põe `refreshing` em `true`. */
  onRefresh: () => void
  /** pt que o conteúdo precisa descer para comprometer. Padrão 72. */
  threshold?: number
  /** Nome da ação acessível. Padrão "Atualizar". */
  refreshLabel?: string
  children: (scroll: PullToRefreshScroll) => ReactNode
}

const DEFAULT_THRESHOLD = 72 // pt
const BADGE = 48 // pt, disco do indicador

const useStyles = createStyles((t) => ({
  root: { flex: 1, overflow: 'hidden' },
  content: { flex: 1 },
  a11y: { position: 'absolute', top: 0, left: 0, right: 0 },
  indicator: { position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  badge: { width: BADGE, height: BADGE, borderRadius: t.shape.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: t.color.surface2 },
}))

export function PullToRefresh({ refreshing, onRefresh, threshold = DEFAULT_THRESHOLD, refreshLabel = 'Atualizar', children }: PullToRefreshProps) {
  const t = useTheme()
  const { strings } = useDS()
  const { play } = useFeedback()
  const { reduced } = useThemeMotion()
  const s = useStyles()
  const { pan, onScroll, y, visible } = usePullMotion({
    refreshing,
    threshold,
    onCommit: () => {
      play('pull-commit')
      onRefresh()
    },
  })

  const contentStyle = useAnimatedStyle(() => ({ transform: [{ translateY: reduced ? 0 : y.value }] }))
  const progress = (v: number) => {
    'worklet'
    return Math.min(1, v / threshold)
  }
  // Movimento reduzido: o indicador fica parado no topo e só aparece ao cruzar o limiar.
  const indicatorStyle = useAnimatedStyle(() => ({
    height: threshold,
    opacity: reduced ? (progress(y.value) >= 1 ? 1 : 0) : progress(y.value),
    transform: [{ translateY: reduced ? 0 : y.value - threshold }],
  }))

  return (
    <View style={s.root}>
      <View
        accessible
        accessibilityRole="button"
        accessibilityLabel={refreshLabel}
        accessibilityState={{ busy: refreshing }}
        accessibilityActions={[{ name: 'activate', label: refreshLabel }]}
        onAccessibilityAction={() => {
          if (!refreshing) onRefresh()
        }}
        pointerEvents="none"
        style={[s.a11y, { height: t.density.control.md }]}
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={[s.content, contentStyle]}>
          {children({ onScroll, scrollEventThrottle: 16, bounces: false, overScrollMode: 'never', simultaneousWith: pan })}
        </Animated.View>
      </GestureDetector>
      <Animated.View pointerEvents="none" style={[s.indicator, indicatorStyle]}>
        <View style={s.badge}>{visible && <Spinner size="medium" accessibilityLabel={strings.loading} />}</View>
      </Animated.View>
    </View>
  )
}
