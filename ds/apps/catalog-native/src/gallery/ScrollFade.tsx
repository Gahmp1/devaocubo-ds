import { Box, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { ScrollFade } from '@gahmp1/ds-native/motion'
import { View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const rows = Array.from({ length: 24 }, (_, i) => i + 1)

const useStyles = createStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.color.bg, padding: t.density.space.md, gap: t.density.space.sm },
  fade: { flex: 1 },
}))

function List() {
  return (
    <Stack gap="xs">
      {rows.map((n) => (
        <Box key={n} surface="surface2" padding="md" radius="md">
          <Text>linha {n}</Text>
        </Box>
      ))}
    </Stack>
  )
}

function ScrollFadeScreen() {
  const s = useStyles()
  return (
    <View style={s.screen}>
      <Text variant="xs" color="textMuted">Cada borda só esmaece quando ainda há conteúdo daquele lado.</Text>
      <Text variant="xs" color="textMuted" label>topo e fim</Text>
      <ScrollFade style={s.fade}>
        <List />
      </ScrollFade>
      <Text variant="xs" color="textMuted" label>só no fim, 64</Text>
      <ScrollFade edges={['bottom']} size={64} style={s.fade}>
        <List />
      </ScrollFade>
    </View>
  )
}

export default { id: 'scroll-fade', title: 'ScrollFade', group: 'movimento', Screen: ScrollFadeScreen } satisfies GalleryEntry
