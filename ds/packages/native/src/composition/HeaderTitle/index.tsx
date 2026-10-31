// Referência: Zenith HeaderTitle e TabScreenTitle (SWFitness), molecules; sem `actionIcon/onActionPress` (ações entram por `leading`/`trailing`).
import { useDS } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
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
  /** Esqueleto no lugar dos textos; anuncia a espera. */
  loading?: boolean
}

// Degrau de texto do título e do subtítulo em cada tamanho.
const TITLE = { large: 'xl', compact: 'lg' } as const
const SUBTITLE = { large: 'base', compact: 'sm' } as const
const TITLE_SKELETON = '55%'
const SUBTITLE_SKELETON = '35%'

const useStyles = createStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.density.space.md },
  texts: { flex: 1, gap: t.density.space.xxs },
}))

export function HeaderTitle({ title, subtitle, size, leading, trailing, loading }: HeaderTitleProps) {
  const t = useTheme()
  const { strings } = useDS()
  const s = useStyles()
  const kind = size ?? t.components.header
  return (
    <View style={s.row}>
      {leading}
      {loading ? (
        <View accessible accessibilityLabel={strings.loading} accessibilityLiveRegion="polite" accessibilityState={{ busy: true }} style={s.texts}>
          <Skeleton width={TITLE_SKELETON} height={t.type.scale[TITLE[kind]].size} />
          {subtitle !== undefined && <Skeleton width={SUBTITLE_SKELETON} height={t.type.scale[SUBTITLE[kind]].size} />}
        </View>
      ) : (
        <View style={s.texts}>
          <Text variant={`${TITLE[kind]}Medium`} accessibilityRole="header">{title}</Text>
          {subtitle !== undefined && <Text variant={SUBTITLE[kind]} color="textMuted">{subtitle}</Text>}
        </View>
      )}
      {trailing}
    </View>
  )
}
