// Referência: Zenith BlurPress e TabBarItem (SWFitness): luz que acende sob o dedo; aqui é o `Glow` da camada motion, montado só durante o toque.
import { useDS } from '@gahmp1/ds-core'
import { useState } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { useThemeMotion } from '../../core/useThemeMotion.js'
import { Glow } from '../../motion/Glow/index.js'
import { Badge } from '../../primitives/Badge/index.js'
import { Text } from '../../primitives/Text/index.js'
import type { TabBarItem } from './index.js'

const GLOW_SIZE = 56 // pt; o bloom passa disso e o contêiner da barra recorta

const useStyles = createStyles((t) => ({
  item: { flex: 1, minWidth: 0, alignItems: 'center', gap: t.density.space.xxs, paddingVertical: t.density.space.sm, paddingHorizontal: t.density.space.xs },
  // O selo do `Badge` se alinha ao início; a linha centraliza o ícone.
  icon: { alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center' },
  glow: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
}))

export function TabButton({ item, selected, onSelect }: { item: TabBarItem; selected: boolean; onSelect: () => void }) {
  const t = useTheme()
  const { Icon } = useDS()
  const { duration, reduced } = useThemeMotion()
  const s = useStyles()
  const [lit, setLit] = useState(false)
  return (
    <Press
      component="TabBar"
      interactionId={item.key}
      feedback={false}
      accessibilityRole="tab"
      accessibilityLabel={item.badge ? `${item.label}, ${item.badge}` : item.label}
      accessibilityState={{ selected }}
      onPress={onSelect}
      onPressIn={() => setLit(true)}
      onPressOut={() => setLit(false)}
      style={s.item}
    >
      {lit && (
        <Animated.View pointerEvents="none" entering={reduced ? undefined : FadeIn.duration(duration.fast)} exiting={reduced ? undefined : FadeOut.duration(duration.base)} style={s.glow}>
          <Glow color="accent" size={GLOW_SIZE} />
        </Animated.View>
      )}
      <View style={s.icon}>
        <Badge count={item.badge}>
          <Icon name={item.icon} size={t.icon.size.md} color={selected ? t.color.accent : t.color.textMuted} strokeWidth={t.icon.strokeWidth} />
        </Badge>
      </View>
      <Text variant={selected ? 'xsMedium' : 'xs'} color={selected ? 'text' : 'textMuted'} numberOfLines={1}>{item.label}</Text>
    </Press>
  )
}
