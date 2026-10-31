import { View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Text } from '../../primitives/Text/index.js'

const SIZE = 44 // pt
const STROKE = 4 // pt
const MAX_FONT_SCALE = 1.2 // o número precisa caber dentro do anel

const useStyles = createStyles(() => ({
  center: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
}))

/** Anel de progresso (0–1) interno do `DetailedListItem`; a Task 20 troca pelo `CircularProgress`. */
export function ProgressRing({ value }: { value: number }) {
  const { color } = useTheme()
  const s = useStyles()
  const p = Math.min(1, Math.max(0, value))
  const r = (SIZE - STROKE) / 2
  const c = 2 * Math.PI * r
  const common = { cx: SIZE / 2, cy: SIZE / 2, r, strokeWidth: STROKE, fill: 'none' }
  return (
    <View accessible accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(p * 100) }} style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE}>
        <Circle {...common} stroke={color.surface3} />
        {p > 0 && <Circle {...common} stroke={color.accent} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p)} rotation={-90} origin={`${SIZE / 2}, ${SIZE / 2}`} />}
      </Svg>
      <View style={s.center}>
        <Text variant="xs" tabular maxFontSizeMultiplier={MAX_FONT_SCALE}>{`${Math.round(p * 100)}%`}</Text>
      </View>
    </View>
  )
}
