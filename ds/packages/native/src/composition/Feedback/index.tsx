// Referência: Zenith Feedback (SWFitness), organisms/Feedback; círculo de ícone 56 e ação fixa embaixo, agora também embutido.
import { useDS, withAlpha, type DSIconName } from '@gahmp1/ds-core'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Button } from '../../primitives/Button/index.js'
import { Text, type TextColor } from '../../primitives/Text/index.js'

export type FeedbackKind = 'empty' | 'success' | 'error'

export type FeedbackProps = {
  kind: FeedbackKind
  title: string
  description?: string
  action?: { label: string; onPress: () => void }
  /** `screen` ocupa o espaço do pai e fixa a ação embaixo (o `Screen` já cuida da área segura); `inline` cabe dentro de um cartão ou lista. Padrão `screen`. */
  layout?: 'screen' | 'inline'
}

const BADGE = 56 // Zenith: Feedback (círculo do ícone 56×56)
const TINT = 0.16 // opacidade do fundo do círculo sobre a cor do tipo

// `empty` não tem ícone próprio em `DSIconName`: `file` faz as vezes de "nada aqui".
const ICON: Record<FeedbackKind, DSIconName> = { empty: 'file', success: 'success', error: 'error' }
const TONE: Record<FeedbackKind, Extract<TextColor, 'textMuted' | 'success' | 'danger'>> = { empty: 'textMuted', success: 'success', error: 'danger' }

const useStyles = createStyles((t) => {
  const { color, density } = t
  const badge = (tone: string) => ({ width: BADGE, height: BADGE, borderRadius: t.shape.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(tone, TINT) }) as const
  return {
    screen: { flex: 1, justifyContent: 'space-between', gap: density.space.xxl, padding: density.space.xl },
    inline: { alignItems: 'center', gap: density.space.lg, padding: density.space.xl },
    content: { gap: density.space.xs },
    contentInline: { alignItems: 'center' },
    centered: { textAlign: 'center' },
    badge_empty: badge(color.textMuted),
    badge_success: badge(color.success),
    badge_error: badge(color.danger),
    badgeGap: { marginBottom: density.space.md },
  }
})

export function Feedback({ kind, title, description, action, layout = 'screen' }: FeedbackProps) {
  const t = useTheme()
  const { Icon } = useDS()
  const s = useStyles()
  const inline = layout === 'inline'
  const button = action && <Button title={action.label} variant={inline ? 'outline' : 'primary'} fullWidth={!inline} onPress={action.onPress} />
  const content = (
    <View style={[s.content, inline && s.contentInline]}>
      <View style={[s[`badge_${kind}`], s.badgeGap]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Icon name={ICON[kind]} size={t.icon.size.lg} color={t.color[TONE[kind]]} strokeWidth={t.icon.strokeWidth} />
      </View>
      <Text variant="xlMedium" accessibilityRole="header" style={inline ? s.centered : undefined}>{title}</Text>
      {description ? <Text color="textMuted" style={inline ? s.centered : undefined}>{description}</Text> : null}
    </View>
  )
  return inline ? (
    <View style={s.inline}>
      {content}
      {button}
    </View>
  ) : (
    <View style={s.screen}>
      {content}
      {button}
    </View>
  )
}
