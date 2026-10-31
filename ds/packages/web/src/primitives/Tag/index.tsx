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

/** `accent` é cheio (o `primary` do Zenith); os tons de estado são um tinte do próprio tom, com o rótulo em `text` (contraste: ver `tag.css`). */
const FG: Record<Tone, TextColor> = { neutral: 'text', accent: 'onAccent', success: 'text', warning: 'text', danger: 'text', info: 'text' }

export function Tag({ label, tone = 'neutral', icon }: TagProps) {
  const theme = useTheme()
  const { Icon } = useDS()
  return (
    <span className={cx('ds-tag', `ds-tag--${tone}`)}>
      {icon && (
        <span className="ds-tag__icon">
          <Icon name={icon} size={theme.icon.size.sm} color="currentColor" strokeWidth={theme.icon.strokeWidth} />
        </span>
      )}
      <Text variant="xs" color={FG[tone]}>{label}</Text>
    </span>
  )
}
