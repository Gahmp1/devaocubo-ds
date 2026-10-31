// Referência: Zenith SegmentedControl (SWFitness), organisms; indicador deslizante: beUI Native (MIT), https://github.com/starc007/beui-native
import { useFeedback } from '@gahmp1/ds-core'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { useSlider } from '../../internal/useSlider.js'
import { Text } from '../../primitives/Text/index.js'

export type SegmentedControlSize = 'small' | 'normal'

export type SegmentedControlProps = {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  size?: SegmentedControlSize
}

const CONTROL = { small: 'sm', normal: 'md' } as const
const LABEL = { small: 'sm', normal: 'base' } as const
// Zenith: rótulos longos em 4 segmentos iguais encolhem até caber em vez de truncar.
const MIN_FONT_SCALE = 0.7

const useStyles = createStyles((t) => {
  const radius = t.shape.control === 'pill' ? t.shape.radius.full : t.shape.control === 'rounded' ? t.shape.radius.md : 0
  return {
    track: { alignSelf: 'stretch', padding: t.density.space.xxs, backgroundColor: t.color.surface2, borderRadius: radius },
    row: { flexDirection: 'row' },
    indicator: { position: 'absolute', top: 0, bottom: 0, left: 0, backgroundColor: t.color.accent, borderRadius: radius },
    segment: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: t.density.space.xs },
  }
})

export function SegmentedControl({ options, value, onChange, size = 'normal' }: SegmentedControlProps) {
  const t = useTheme()
  const s = useStyles()
  const { play } = useFeedback()
  const active = options.findIndex((o) => o.value === value)
  const { slot, style, onLayout } = useSlider(Math.max(0, active), options.length)
  const step = LABEL[size]
  return (
    <View accessibilityRole="tablist" style={s.track}>
      <View style={s.row} onLayout={onLayout}>
        {active >= 0 && <Animated.View pointerEvents="none" style={[s.indicator, { width: slot }, style]} />}
        {options.map((o) => {
          const selected = o.value === value
          return (
            <Press
              key={o.value}
              component="SegmentedControl"
              interactionId={o.value}
              accessibilityRole="tab"
              accessibilityLabel={o.label}
              accessibilityState={{ selected }}
              style={[s.segment, { minHeight: t.density.control[CONTROL[size]] }]}
              onPress={() => {
                if (selected) return
                play('select')
                onChange(o.value)
              }}
            >
              <Text variant={selected ? `${step}Medium` : step} color={selected ? 'onAccent' : 'textMuted'} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={MIN_FONT_SCALE}>
                {o.label}
              </Text>
            </Press>
          )
        })}
      </View>
    </View>
  )
}
