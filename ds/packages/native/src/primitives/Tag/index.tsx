// Referência: Zenith Tag (SWFitness), atoms/Tag/Tag.tsx; o rgba literal vira withAlpha do tom.
import { useDS, withAlpha, type DSIconName } from '@gahmp1/ds-core'
import { View, type ViewStyle } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Text, type TextColor } from '../Text/index.js'

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'

export type TagProps = {
  label: string
  tone?: Tone
  /** Ícone decorativo antes do rótulo. */
  icon?: DSIconName
}

const TINT = 0.15 // Zenith: Tag (rgba(<tom>, 0.15))
const TONES: Tone[] = ['neutral', 'accent', 'success', 'warning', 'danger', 'info']
/** `accent` é cheio (o `primary` do Zenith); os tons de estado são um tinte do próprio tom. */
const FG: Record<Tone, TextColor> = { neutral: 'text', accent: 'onAccent', success: 'success', warning: 'warning', danger: 'danger', info: 'info' }

const useStyles = createStyles((t) => {
  const out: Record<string, ViewStyle> = {
    tag: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: t.density.space.xxs, paddingHorizontal: t.density.space.xs, paddingVertical: t.density.space.xxs, borderRadius: t.shape.radius.full },
  }
  for (const tone of TONES) {
    out[tone] = { backgroundColor: tone === 'neutral' ? t.color.surface2 : tone === 'accent' ? t.color.accent : withAlpha(t.color[tone], TINT) }
  }
  return out
})

export function Tag({ label, tone = 'neutral', icon }: TagProps) {
  const t = useTheme()
  const { Icon } = useDS()
  const s = useStyles()
  const fg = FG[tone]
  return (
    <View style={[s.tag, s[tone]]}>
      {icon && <Icon name={icon} size={t.icon.size.sm} color={t.color[fg]} strokeWidth={t.icon.strokeWidth} />}
      <Text variant="xs" color={fg}>{label}</Text>
    </View>
  )
}
