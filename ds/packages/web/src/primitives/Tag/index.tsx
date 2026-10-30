// Referência: Zenith Tag (SWFitness), atoms/Tag/Tag.tsx; o rgba literal vira tinte do tom em CSS.
import { useDS, type DSIconName } from '@gahmp1/ds-core'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Text, type TextColor } from '../Text/index.js'

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'

export type TagProps = {
  label: string
  tone?: Tone
  /** Ícone decorativo antes do rótulo. */
  icon?: DSIconName
}

/** `accent` é cheio (o `primary` do Zenith); os tons de estado são um tinte do próprio tom. */
const FG: Record<Tone, TextColor> = { neutral: 'text', accent: 'onAccent', success: 'success', warning: 'warning', danger: 'danger', info: 'info' }

export function Tag({ label, tone = 'neutral', icon }: TagProps) {
  const theme = useTheme()
  const { Icon } = useDS()
  return (
    <span className={cx('ds-tag', `ds-tag--${tone}`)}>
      {icon && <Icon name={icon} size={theme.icon.size.sm} color="currentColor" strokeWidth={theme.icon.strokeWidth} />}
      <Text variant="xs" color={FG[tone]}>{label}</Text>
    </span>
  )
}
