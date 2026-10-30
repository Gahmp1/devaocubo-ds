import { createStyles, Stack, Text } from '@gahmp1/ds-native'
import { Glow } from '@gahmp1/ds-native/motion'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.xxxl, gap: t.density.space.huge },
}))

function GlowScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">O bloom depende do modelo de profundidade do tema (some em flat). Movimento reduzido: botão no topo do catálogo.</Text>
      <Stack gap="md" align="center">
        <Text variant="xs" color="textMuted" label>parado</Text>
        <Glow />
      </Stack>
      <Stack gap="md" align="center">
        <Text variant="xs" color="textMuted" label>pulsando</Text>
        <Glow pulse />
      </Stack>
      <Stack gap="md" align="center">
        <Text variant="xs" color="textMuted" label>3 forças: 0.2, 0.6, 1</Text>
        <Stack direction="row" gap="xxxl">
          {[0.2, 0.6, 1].map((strength) => (
            <Glow key={strength} strength={strength} size={64} />
          ))}
        </Stack>
      </Stack>
      <Stack gap="md" align="center">
        <Text variant="xs" color="textMuted" label>accent</Text>
        <Glow color="accent" size={72} />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'glow', title: 'Glow', group: 'movimento', Screen: GlowScreen } satisfies GalleryEntry
