// Referência: Zenith ListItem, DetailedListItem e SheetRow (SWFitness), molecules/; o anel de progresso é o `CircularProgress` do Zenith, simplificado.
import { useDS } from '@gahmp1/ds-core'
import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Skeleton } from '../../primitives/Skeleton/index.js'
import { Text } from '../../primitives/Text/index.js'
import { ProgressRing } from './ProgressRing.js'

export type ListItemProps = {
  title: string
  subtitle?: string
  leading?: ReactNode
  /** `'chevron'` desenha o `chevron-right` do provedor. */
  trailing?: ReactNode | 'chevron'
  /** Mostra o check de acento (cobre o `SheetRow`); com a prop presente, o espaço do check é reservado mesmo desmarcado. */
  selected?: boolean
  /** Vira um `<button>` com foco visível e o toque do tema. */
  onPress?: () => void
  /** Esqueleto no lugar do conteúdo. */
  loading?: boolean
  interactionId?: string
}

export type DetailedListItemProps = ListItemProps & {
  description?: string
  media?: ReactNode
  /** 0 a 1, em anel antes do `trailing`. */
  progress?: number
}

/** Uso interno de `ListItem` e `DetailedListItem`. */
type ListRowProps = DetailedListItemProps & { component: 'ListItem' | 'DetailedListItem' }

// Lado da mídia do detalhado, em px (é o mesmo do esqueleto).
const MEDIA = 56

export function ListRow({ component, title, subtitle, description, leading, media, trailing, progress, selected, onPress, loading, interactionId }: ListRowProps) {
  const theme = useTheme()
  const { Icon, strings, emit } = useDS()
  const detailed = component === 'DetailedListItem'
  const mediaSize: CSSProperties = { inlineSize: MEDIA, blockSize: MEDIA }
  const icon = { size: theme.icon.size.md, color: 'currentColor', strokeWidth: theme.icon.strokeWidth }

  if (loading) {
    return (
      <div className="ds-list-item" role="status" aria-label={strings.loading}>
        {detailed && media && <Skeleton width={MEDIA} height={MEDIA} radius="md" style={{ flexShrink: 0 }} />}
        <div className="ds-list-item__body">
          <Skeleton lines={detailed ? 3 : 2} />
        </div>
      </div>
    )
  }

  const content = (
    <>
      {media && <span className="ds-list-item__media" style={mediaSize}>{media}</span>}
      {leading && <span className="ds-list-item__leading">{leading}</span>}
      <span className="ds-list-item__body">
        <Text variant="lgMedium">{title}</Text>
        {subtitle && <Text variant="sm" color="textMuted">{subtitle}</Text>}
        {description && <Text variant="sm" color="textMuted">{description}</Text>}
      </span>
      {progress !== undefined && <ProgressRing value={progress} />}
      {trailing && <span className="ds-list-item__trailing">{trailing === 'chevron' ? <Icon name="chevron-right" {...icon} /> : trailing}</span>}
      {selected !== undefined && (
        <span className={cx('ds-list-item__check', !selected && 'ds-list-item__check--off')} aria-hidden>
          <Icon name="check" {...icon} />
        </span>
      )}
    </>
  )
  if (!onPress) return <div className="ds-list-item">{content}</div>
  return (
    <button
      type="button"
      className={cx('ds-list-item', 'ds-list-item--pressable', 'ds-anim', `ds-list-item--press-${theme.motion.press.kind}`)}
      aria-pressed={selected}
      onClick={() => {
        emit({ component, kind: 'press', id: interactionId, label: title })
        onPress()
      }}
    >
      {content}
    </button>
  )
}
