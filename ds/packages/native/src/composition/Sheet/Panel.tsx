// Referência: Zenith BottomSheet (SWFitness), organisms/BottomSheet; alça 36×4 e botão de fechar como no Zenith.
import { useDS } from '@gahmp1/ds-core'
import { useRef, useState } from 'react'
import { Modal, Pressable, ScrollView, useWindowDimensions, View, type LayoutChangeEvent } from 'react-native'
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { useFocusOnOpen, useOverlayEvents, type ViewInstance } from '../../internal/overlay.js'
import { IconButton } from '../../primitives/IconButton/index.js'
import { Text } from '../../primitives/Text/index.js'
import type { SheetProps } from './index.js'
import { useSheetMotion } from './useSheetMotion.js'

const HANDLE_W = 36 // Zenith: BottomSheet (alça 36×4)
const HANDLE_H = 4
const noop = () => undefined

const useStyles = createStyles((t) => {
  const { color, shape, depth, density } = t
  const shadow =
    depth.model === 'shadow'
      ? { shadowColor: depth.overlay.color, shadowOffset: { width: depth.overlay.x, height: depth.overlay.y }, shadowRadius: depth.overlay.blur, shadowOpacity: 1, elevation: depth.overlay.elevation }
      : undefined
  return {
    fill: { flex: 1 },
    scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: color.scrim },
    panel: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: color.surface2,
      borderTopLeftRadius: shape.radius.xl,
      borderTopRightRadius: shape.radius.xl,
      borderTopWidth: shape.borderWidth.thin,
      borderColor: depth.model === 'hairline' ? color.borderMuted : 'transparent',
      ...shadow,
    },
    header: { paddingHorizontal: density.space.lg, paddingTop: density.space.sm, paddingBottom: density.space.xs, gap: density.space.sm },
    handle: { alignSelf: 'center', width: HANDLE_W, height: HANDLE_H, borderRadius: HANDLE_H / 2, backgroundColor: color.textSubtle },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: density.space.md },
    title: { flex: 1 },
    body: { flexShrink: 1 },
    bodyPad: { paddingHorizontal: density.space.lg, paddingTop: density.space.xs, paddingBottom: density.space.md },
    footer: { paddingHorizontal: density.space.lg, paddingTop: density.space.sm, paddingBottom: density.space.md, borderTopWidth: shape.borderWidth.thin, borderColor: color.borderMuted },
  }
})

type Props = SheetProps & {
  /** Telemetria: `Sheet`, `Select` ou `Menu`. */
  component: string
  /** Corpo sem recuo lateral, para listas cujas linhas já têm o seu (`ListItem`). */
  flush?: boolean
}

/** Gaveta de baixo: `Sheet` e a base de `Select` e `Menu`. O `Modal` do RN abre numa janela nativa à parte, por isso a raiz de gestos própria. */
export function SheetPanel({ component, open, onClose, title, snap, dismissible = true, children, footer, flush }: Props) {
  const t = useTheme()
  const { strings } = useDS()
  const s = useStyles()
  const insets = useSafeAreaInsets()
  const { height: windowHeight } = useWindowDimensions()
  const [size, setSize] = useState({ header: -1, body: -1, footer: -1 })
  const titleRef = useRef<ViewInstance>(null)
  const measure = (key: keyof typeof size) => (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height
    setSize((prev) => (prev[key] === h ? prev : { ...prev, [key]: h }))
  }

  // Alturas em pt: 'content' = cabeçalho + corpo + rodapé + área segura de baixo, até caber na tela.
  const points = snap?.length ? snap : (['content'] as const)
  const maxHeight = Math.max(0, windowHeight - insets.top - t.density.space.xxl)
  const content = size.header + size.body + (footer ? size.footer : 0) + insets.bottom
  const heights = points.map((p) => Math.min(p === 'content' ? content : p, maxHeight))
  const full = Math.max(...heights)
  const measured = size.header >= 0 && size.body >= 0 && (!footer || size.footer >= 0)
  const ready = measured || points.every((p) => p !== 'content')

  const motion = useSheetMotion({ open, ready, full, rests: heights.map((h) => full - h), dismissible, onClose })
  useOverlayEvents(component, open, title)
  useFocusOnOpen(open && ready && !!title, titleRef)

  return (
    <Modal visible={motion.mounted} transparent animationType="none" statusBarTranslucent navigationBarTranslucent onRequestClose={dismissible ? onClose : noop}>
      <GestureHandlerRootView style={s.fill}>
        <Animated.View pointerEvents="none" style={[s.scrim, motion.scrimStyle]} />
        {/* O botão de fechar já serve ao leitor de tela; o fundo só recebe o toque. */}
        <Pressable accessible={false} importantForAccessibility="no" style={s.fill} onPress={dismissible ? onClose : undefined} />
        <Animated.View accessibilityViewIsModal style={[s.panel, { paddingBottom: insets.bottom }, ready && { height: full }, motion.panelStyle]}>
          <GestureDetector gesture={motion.pan}>
            <View collapsable={false} style={s.header} onLayout={measure('header')}>
              {dismissible && <View style={s.handle} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />}
              {(title || dismissible) && (
                <View style={s.titleRow}>
                  <View ref={titleRef} accessible={!!title} accessibilityRole="header" style={s.title}>
                    {title ? <Text variant="lgMedium">{title}</Text> : null}
                  </View>
                  {dismissible && <IconButton icon="close" variant="filled" size="small" accessibilityLabel={strings.close} onPress={onClose} />}
                </View>
              )}
            </View>
          </GestureDetector>
          <ScrollView style={s.body} keyboardShouldPersistTaps="handled">
            <View style={flush ? undefined : s.bodyPad} onLayout={measure('body')}>
              {children}
            </View>
          </ScrollView>
          {footer ? (
            <View style={s.footer} onLayout={measure('footer')}>
              {footer}
            </View>
          ) : null}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  )
}
