import { createStyles, Text } from '@gahmp1/ds-native'
import { GlowScene } from '@gahmp1/ds-native/motion'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const PRESETS = ['focus', 'ambient', 'success'] as const

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
  scene: { height: 260 },
  label: { padding: t.density.space.md },
}))

function GlowSceneScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Troque o tema e o esquema no topo do catálogo para ver os presets nos 4 temas.</Text>
      {PRESETS.map((preset) => (
        <GlowScene key={preset} preset={preset} radius="lg" style={s.scene}>
          <View style={s.label}>
            <Text variant="lg">{preset}</Text>
          </View>
        </GlowScene>
      ))}
    </ScrollView>
  )
}

export default { id: 'glow-scene', title: 'GlowScene', group: 'movimento', Screen: GlowSceneScreen } satisfies GalleryEntry
