// Referência: Zenith Screen + DSScrollView (SWFitness), templates/Screen; `ContentPageScaffold` vira o slot `header`. Sem telemetria: `scroll_depth` fica no `onScroll` do app.
import type { ReactNode } from 'react'
import { ScrollView, View, type ScrollViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStyles } from '../../core/createStyles.js'

export type ScreenProps = {
  /** Fixo acima da área de conteúdo. */
  header?: ReactNode
  /** Fixo abaixo da área de conteúdo; só fica acima da área segura de baixo se `edges` incluir `'bottom'`. */
  footer?: ReactNode
  /** O conteúdo rola num `ScrollView`; sem isso ele ocupa o espaço entre cabeçalho e rodapé. */
  scroll?: boolean
  /** Bordas que respeitam a área segura (padrão: só `'top'`). */
  edges?: ('top' | 'bottom')[]
  onScroll?: ScrollViewProps['onScroll']
  children?: ReactNode
}

const DEFAULT_EDGES: ('top' | 'bottom')[] = ['top']
const SCROLL_THROTTLE = 16 // ms, um quadro a 60 Hz

const useStyles = createStyles((t) => ({
  safe: { flex: 1, backgroundColor: t.color.bg },
  flex: { flex: 1 },
  bar: { paddingHorizontal: t.density.space.lg, paddingVertical: t.density.space.sm },
  content: { paddingHorizontal: t.density.space.lg, paddingVertical: t.density.space.md },
}))

export function Screen({ header, footer, scroll, edges = DEFAULT_EDGES, onScroll, children }: ScreenProps) {
  const s = useStyles()
  return (
    <SafeAreaView edges={edges} style={s.safe}>
      {header && <View style={s.bar}>{header}</View>}
      {scroll ? (
        <ScrollView style={s.flex} contentContainerStyle={s.content} onScroll={onScroll} scrollEventThrottle={SCROLL_THROTTLE}>
          {children}
        </ScrollView>
      ) : (
        <View style={[s.flex, s.content]}>{children}</View>
      )}
      {footer && <View style={s.bar}>{footer}</View>}
    </SafeAreaView>
  )
}
