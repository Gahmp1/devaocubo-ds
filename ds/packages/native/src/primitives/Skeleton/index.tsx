import type { RadiusStep } from '@gahmp1/ds-core'
import { View, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Shimmer } from '../../motion/Shimmer/index.js'

export type SkeletonProps = {
  /** Padrão: largura toda do pai. */
  width?: DimensionValue
  /** Padrão: `space.md` do tema. */
  height?: number
  /** Padrão: `sm`; `full` para avatar. */
  radius?: RadiusStep
  /** Linhas de texto empilhadas (a última mais curta). Sem `lines`, um bloco. */
  lines?: number
  /**
   * Para o loop sem desmontar. Fora da tela numa lista a virtualização já cobre; telas que seguem montadas
   * mas escondidas (abas, pilha) passam `paused`. O loop também para com o app em segundo plano.
   */
  paused?: boolean
  /** Só layout (flex, margem). */
  style?: StyleProp<ViewStyle>
}

// Largura da última linha de um bloco de texto, em fração.
const LAST_LINE = 0.6

const useStyles = createStyles((t) => ({
  fill: { alignSelf: 'stretch', backgroundColor: t.color.surface2 },
}))

function Bar({ width, height, radius, paused }: { width?: DimensionValue; height: number; radius: RadiusStep; paused?: boolean }) {
  const s = useStyles()
  const r = useTheme().shape.radius[radius]
  return (
    <Shimmer radius={radius} paused={paused} style={{ width }}>
      <View style={[s.fill, { height, borderRadius: r }]} />
    </Shimmer>
  )
}

/** Marcador de conteúdo a carregar; decorativo para leitores de tela (o contêiner anuncia a espera). */
export function Skeleton({ width, height, radius = 'sm', lines, paused, style }: SkeletonProps) {
  const { density } = useTheme()
  const h = height ?? density.space.md
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[{ gap: density.space.xs }, width !== undefined && { width }, style]}>
      {lines === undefined ? (
        <Bar height={h} radius={radius} paused={paused} />
      ) : (
        Array.from({ length: lines }, (_, i) => <Bar key={i} height={h} radius={radius} paused={paused} width={i === lines - 1 && lines > 1 ? `${LAST_LINE * 100}%` : undefined} />)
      )}
    </View>
  )
}
