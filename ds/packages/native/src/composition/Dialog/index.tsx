import { useDS } from '@gahmp1/ds-core'
import { useRef, type ReactNode } from 'react'
import { Modal, Pressable, ScrollView, useWindowDimensions, View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { ORIENTATIONS, useFocusOnOpen, useOverlayEvents, type ViewInstance } from '../../internal/overlay.js'
import { Text } from '../../primitives/Text/index.js'

export type DialogProps = {
  open: boolean
  /** Voltar do Android e toque no fundo; o app põe `open` em `false`. */
  onClose: () => void
  title: string
  description?: string
  /** Botões do rodapé, alinhados ao fim (o app escolhe as variantes de `Button`). */
  actions?: ReactNode
  /** Título em `danger`, com um ícone: a cor não é o único sinal. */
  destructive?: boolean
}

const MAX_WIDTH = 420 // pt; em tela larga o diálogo não estica

const useStyles = createStyles((t) => {
  const { color, shape, depth, density } = t
  const shadow =
    depth.model === 'shadow'
      ? { shadowColor: depth.overlay.color, shadowOffset: { width: depth.overlay.x, height: depth.overlay.y }, shadowRadius: depth.overlay.blur, shadowOpacity: 1, elevation: depth.overlay.elevation }
      : undefined
  return {
    root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: density.space.xl },
    scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: color.scrim },
    card: {
      alignSelf: 'stretch',
      maxWidth: MAX_WIDTH,
      gap: density.space.md,
      padding: density.space.xl,
      borderRadius: shape.radius.xl,
      borderWidth: shape.borderWidth.thin,
      borderColor: depth.model === 'hairline' ? color.borderMuted : 'transparent',
      backgroundColor: color.surface2,
      ...shadow,
    },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: density.space.sm },
    title: { flex: 1 },
    body: { flexGrow: 0, flexShrink: 1 },
    actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: density.space.sm, paddingTop: density.space.xs },
  }
})

/** Diálogo centrado no `Modal` do RN: o voltar do Android fecha só o de cima (um `Dialog` sobre um `Sheet` deixa a gaveta). */
export function Dialog({ open, onClose, title, description, actions, destructive }: DialogProps) {
  const t = useTheme()
  const { Icon } = useDS()
  const { reduced } = useThemeMotion()
  const s = useStyles()
  const { height } = useWindowDimensions()
  const titleRef = useRef<ViewInstance>(null)
  useOverlayEvents('Dialog', open, title)
  useFocusOnOpen(open, titleRef)
  return (
    <Modal visible={open} transparent animationType={reduced ? 'none' : 'fade'} supportedOrientations={[...ORIENTATIONS]} statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={s.root}>
        <Pressable accessible={false} importantForAccessibility="no" style={s.scrim} onPress={onClose} />
        <View accessibilityViewIsModal onAccessibilityEscape={onClose} style={[s.card, { maxHeight: height - 2 * t.density.space.xl }]}>
          <View ref={titleRef} accessible accessibilityRole="header" style={s.titleRow}>
            {destructive && <Icon name="warning" size={t.icon.size.md} color={t.color.danger} strokeWidth={t.icon.strokeWidth} />}
            <Text variant="lgMedium" color={destructive ? 'danger' : 'text'} style={s.title}>{title}</Text>
          </View>
          {/* Descrição longa ou fonte grande rolam; o título e as ações ficam à vista. */}
          {description ? <ScrollView style={s.body} bounces={false}><Text color="textMuted">{description}</Text></ScrollView> : null}
          {actions ? <View style={s.actions}>{actions}</View> : null}
        </View>
      </View>
    </Modal>
  )
}
