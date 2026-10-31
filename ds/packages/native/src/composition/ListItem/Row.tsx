import { useDS } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { Skeleton } from '../../primitives/Skeleton/index.js'
import { Text } from '../../primitives/Text/index.js'
import { CircularProgress } from '../CircularProgress/index.js'

/** Linha comum de `ListItem` e `DetailedListItem`; cada um expõe só as props da sua API. */
export type RowProps = {
  component: 'ListItem' | 'DetailedListItem'
  title: string
  subtitle?: string
  description?: string
  leading?: ReactNode
  media?: ReactNode
  progress?: number
  trailing?: ReactNode | 'chevron'
  /** Definido (mesmo `false`) reserva o espaço do check, para a linha não pular ao selecionar. */
  selected?: boolean
  onPress?: () => void
  loading?: boolean
  interactionId?: string
}

const MIN_HEIGHT = 44 // pt, spec §14
const RING = 44 // pt, anel de progresso
const RING_THICKNESS = 4 // pt
const RING_MAX_FONT_SCALE = 1.2 // o número precisa caber dentro do anel

const useStyles = createStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.density.space.md, minHeight: MIN_HEIGHT, paddingHorizontal: t.density.space.lg, paddingVertical: t.density.space.md },
  texts: { flex: 1, gap: t.density.space.xxs },
  check: { width: t.icon.size.md, alignItems: 'center' },
}))

export function Row({ component, title, subtitle, description, leading, media, progress, trailing, selected, onPress, loading, interactionId }: RowProps) {
  const t = useTheme()
  const { Icon, strings } = useDS()
  const s = useStyles()
  const icon = t.icon.size.md

  if (loading) {
    return (
      <View accessible accessibilityLabel={strings.loading} accessibilityState={{ busy: true }} style={s.row}>
        {(leading || media) && <Skeleton width={t.density.control.md} height={t.density.control.md} radius="md" />}
        <View style={s.texts}>
          <Skeleton lines={description ? 3 : subtitle ? 2 : 1} />
        </View>
      </View>
    )
  }

  const content = (
    <>
      {leading}
      {media}
      <View style={s.texts}>
        <Text variant="lgMedium">{title}</Text>
        {subtitle && <Text variant="sm" color="textMuted">{subtitle}</Text>}
        {description && <Text variant="sm" color="textMuted">{description}</Text>}
      </View>
      {progress !== undefined && (
        <CircularProgress value={progress} size={RING} thickness={RING_THICKNESS}>
          <Text variant="xs" tabular maxFontSizeMultiplier={RING_MAX_FONT_SCALE}>{`${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%`}</Text>
        </CircularProgress>
      )}
      {trailing === 'chevron' ? <Icon name="chevron-right" size={icon} color={t.color.textMuted} strokeWidth={t.icon.strokeWidth} /> : trailing}
      {selected !== undefined && (
        <View style={s.check}>{selected && <Icon name="check" size={icon} color={t.color.accent} strokeWidth={t.icon.strokeWidth} />}</View>
      )}
    </>
  )
  return onPress ? (
    <Press
      component={component}
      interactionId={interactionId}
      accessibilityRole="button"
      accessibilityLabel={[title, subtitle, description].filter(Boolean).join(', ')}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={s.row}
    >
      {content}
    </Press>
  ) : (
    <View style={s.row}>{content}</View>
  )
}
