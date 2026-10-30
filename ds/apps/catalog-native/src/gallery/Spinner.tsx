import { createStyles, Spinner, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const SIZES = ['small', 'medium', 'large'] as const
const TONES = ['accent', 'onAccent', 'text'] as const

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
  onAccent: { backgroundColor: t.color.accent, padding: t.density.space.md, borderRadius: t.shape.radius.md },
}))

function SpinnerScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (pulso lento, sem rotação).</Text>
      {TONES.map((tone) => (
        <View key={tone} style={tone === 'onAccent' && s.onAccent}>
          <Text variant="xs" color={tone === 'onAccent' ? 'onAccent' : 'textMuted'} label>{tone}</Text>
          <Stack direction="row" gap="xl" align="center">
            {SIZES.map((size) => (
              <Spinner key={size} size={size} tone={tone} />
            ))}
          </Stack>
        </View>
      ))}
    </ScrollView>
  )
}

export default { id: 'spinner', title: 'Spinner', group: 'primitivos', Screen: SpinnerScreen } satisfies GalleryEntry
