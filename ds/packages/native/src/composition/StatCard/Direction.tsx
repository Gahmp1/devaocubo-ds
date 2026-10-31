import { mixColor, withAlpha } from '@gahmp1/ds-core'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../core/DSProvider.js'

export type Direction = 'up' | 'down' | 'flat'

/** Papel do tema de cada direção; `flat` usa `textMuted`. */
const DIRECTION_ROLE = { up: 'success', down: 'danger' } as const
const TINT = 0.15 // mesmo tinte do Tag
/** Parte de `text` na cor do glifo, como no ícone do Tag: o papel puro sobre o tinte não passa de 4.5:1 em todo tema. */
const GLYPH_MIX = 0.6
const PATH = { up: 'M6 2 L11 10 H1 Z', down: 'M6 10 L11 2 H1 Z', flat: 'M2 6 H10' } as const

/** Cor do glifo e fundo tingido da direção. */
export function useDirectionColors(direction: Direction) {
  const { color } = useTheme()
  return direction === 'flat'
    ? { glyph: color.textMuted, tint: color.surface2 }
    : { glyph: mixColor(color[DIRECTION_ROLE[direction]], color.text, GLYPH_MIX), tint: withAlpha(color[DIRECTION_ROLE[direction]], TINT) }
}

/** Seta (ou traço, em `flat`) que mostra a direção sem depender de cor; decorativa. */
export function DirectionGlyph({ direction }: { direction: Direction }) {
  const size = useTheme().icon.size.sm
  const { glyph } = useDirectionColors(direction)
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {direction === 'flat' ? <Path d={PATH.flat} stroke={glyph} strokeWidth={2} strokeLinecap="round" /> : <Path d={PATH[direction]} fill={glyph} />}
    </Svg>
  )
}
