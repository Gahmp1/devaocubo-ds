// Referência: Zenith TabBar, TabBarItem e BlurPress (SWFitness); pílula ativa que desliza: beUI Native Tabs (MIT), https://github.com/starc007/beui-native
import { useFeedback, type DSIconName } from '@gahmp1/ds-core'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { useSlider } from '../../internal/useSlider.js'
import { Blur } from '../../motion/Blur/index.js'
import { TabButton } from './TabButton.js'

export type TabBarItem = { key: string; label: string; icon: DSIconName; badge?: number }
export type TabBarVariant = 'floating' | 'glass' | 'solid'

export type TabBarProps = {
  items: TabBarItem[]
  value: string
  /** Só quando a aba muda; tocar a aba ativa não chama. */
  onChange: (key: string) => void
  /** Padrão: `components.tabBar` do tema. */
  variant?: TabBarVariant
}

const FILL = { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } as const

const useStyles = createStyles((t) => {
  const { color, shape, depth, density } = t
  const shadow =
    depth.model === 'shadow'
      ? { shadowColor: depth.card.color, shadowOffset: { width: depth.card.x, height: depth.card.y }, shadowRadius: depth.card.blur, shadowOpacity: 1, elevation: depth.card.elevation }
      : undefined
  const capsule = { alignSelf: 'stretch', marginHorizontal: density.space.lg, marginBottom: density.space.sm, borderRadius: shape.radius.full, borderWidth: shape.borderWidth.thin } as const
  return {
    // Borda sempre presente (transparente quando o modelo de profundidade não a usa): a barra não muda de tamanho entre temas.
    floating: { ...capsule, backgroundColor: color.surface2, borderColor: depth.model === 'hairline' ? color.borderMuted : 'transparent', ...shadow },
    glass: { ...capsule, borderColor: color.borderMuted },
    solid: { alignSelf: 'stretch', backgroundColor: color.surface1, borderTopWidth: shape.borderWidth.thin, borderColor: color.border },
    // Recorta o bloom do `Glow` e o desfoque no contorno da barra.
    clip: { overflow: 'hidden', padding: density.space.xs },
    clipRound: { borderRadius: shape.radius.full },
    row: { flexDirection: 'row' },
    pill: { position: 'absolute', top: 0, bottom: 0, left: density.space.xxs, borderRadius: shape.radius.full, backgroundColor: color.surface3 },
  }
})

export function TabBar({ items, value, onChange, variant }: TabBarProps) {
  const t = useTheme()
  const s = useStyles()
  const { play } = useFeedback()
  const kind = variant ?? t.components.tabBar
  const active = items.findIndex((i) => i.key === value)
  const { slot, style, onLayout } = useSlider(Math.max(0, active), items.length)
  const inset = t.density.space.xxs

  const body = (
    <View style={[s.clip, kind !== 'solid' && s.clipRound]}>
      {kind === 'glass' && <Blur style={FILL} />}
      <View accessibilityRole="tablist" style={s.row} onLayout={onLayout}>
        {active >= 0 && <Animated.View pointerEvents="none" style={[s.pill, { width: slot - 2 * inset }, style]} />}
        {items.map((item) => (
          <TabButton
            key={item.key}
            item={item}
            selected={item.key === value}
            onSelect={() => {
              if (item.key === value) return
              play('select')
              onChange(item.key)
            }}
          />
        ))}
      </View>
    </View>
  )
  // `solid` ocupa a largura toda e estende o fundo sob a área segura de baixo.
  return kind === 'solid' ? (
    <SafeAreaView edges={['bottom']} style={s.solid}>
      {body}
    </SafeAreaView>
  ) : (
    <View style={s[kind]}>{body}</View>
  )
}
