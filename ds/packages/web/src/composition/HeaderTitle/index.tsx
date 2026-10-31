// Referência: Zenith HeaderTitle e TabScreenTitle (SWFitness), molecules/; `actionIcon/onActionPress` viraram `leading`/`trailing`.
import { useDS } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Skeleton } from '../../primitives/Skeleton/index.js'
import { Text } from '../../primitives/Text/index.js'

export type HeaderTitleSize = 'large' | 'compact'

export type HeaderTitleProps = {
  title: string
  subtitle?: string
  /** Padrão: `components.header` do tema. */
  size?: HeaderTitleSize
  leading?: ReactNode
  trailing?: ReactNode
  /** Esqueleto no lugar do texto (com `role="status"`); `leading` e `trailing` seguem na tela. */
  loading?: boolean
}

// Degrau de tipo do título e do subtítulo por tamanho (Zenith: TabScreenTitle xlMedium, HeaderTitle lgMedium).
const STEP = { large: 'xl', compact: 'lg' } as const
// Largura do esqueleto do título, em %.
const SKELETON_WIDTH = '60%'

export function HeaderTitle({ title, subtitle, size, leading, trailing, loading }: HeaderTitleProps) {
  const theme = useTheme()
  const { strings } = useDS()
  const resolved = size ?? theme.components.header
  const step = STEP[resolved]
  return (
    <header className={cx('ds-header', `ds-header--${resolved}`)}>
      {leading && <div className="ds-header__side">{leading}</div>}
      {loading ? (
        <div className="ds-header__text" role="status" aria-label={strings.loading}>
          <Skeleton width={SKELETON_WIDTH} height={theme.type.scale[step].size} />
          {subtitle && <Skeleton width="40%" height={theme.type.scale.sm.size} />}
        </div>
      ) : (
        <div className="ds-header__text">
          <Text as="h1" variant={`${step}Medium`}>{title}</Text>
          {subtitle && <Text variant="sm" color="textMuted">{subtitle}</Text>}
        </div>
      )}
      {trailing && <div className="ds-header__side">{trailing}</div>}
    </header>
  )
}
