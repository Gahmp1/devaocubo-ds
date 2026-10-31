// Referência: Zenith Card (SWFitness), molecules/Card; sombra só no modelo `shadow` do tema.
import type { SpaceStep } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'

export type CardType = 'fill' | 'outline' | 'elevated' | 'ghost'

export type CardProps = {
  /** Padrão: `components.card.type` do tema. */
  type?: CardType
  /** Com `onPress` o cartão vira botão. */
  onPress?: () => void
  selected?: boolean
  /** Padrão `lg`. */
  padding?: SpaceStep
  interactionId?: string
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

const useStyles = createStyles((t) => {
  const { color, shape, depth, density } = t
  const { card } = depth
  const shadow =
    depth.model === 'shadow'
      ? { shadowColor: card.color, shadowOffset: { width: card.x, height: card.y }, shadowRadius: card.blur, shadowOpacity: 1, elevation: card.elevation }
      : undefined
  return {
    // Borda sempre presente (transparente quando o tipo não tem): selecionar não desloca o conteúdo.
    card: { alignSelf: 'stretch', gap: density.space.sm, borderRadius: shape.radius.lg, borderWidth: shape.borderWidth.thin, borderColor: 'transparent' },
    fill: { backgroundColor: color.surface1, borderColor: depth.model === 'hairline' ? color.borderMuted : 'transparent' },
    outline: { borderColor: color.border },
    elevated: { backgroundColor: color.surface2, ...shadow },
    ghost: {},
    selected: { borderColor: color.accent },
  }
})

export function Card({ type, onPress, selected, padding = 'lg', interactionId, header, footer, children }: CardProps) {
  const t = useTheme()
  const s = useStyles()
  const style = [s.card, s[type ?? t.components.card.type], selected && s.selected, { padding: t.density.space[padding] }]
  const content = (
    <>
      {header}
      {children}
      {footer}
    </>
  )
  return onPress ? (
    <Press component="Card" interactionId={interactionId} accessibilityRole="button" accessibilityState={{ selected: !!selected }} onPress={onPress} style={style}>
      {content}
    </Press>
  ) : (
    <View style={style}>{content}</View>
  )
}
