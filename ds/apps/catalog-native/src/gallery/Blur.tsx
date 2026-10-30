import { Box, createStyles, Text } from '@gahmp1/ds-native'
import { Blur } from '@gahmp1/ds-native/motion'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const rows = Array.from({ length: 24 }, (_, i) => i + 1)

const useStyles = createStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.color.bg },
  list: { padding: t.density.space.md, gap: t.density.space.xs, paddingBottom: 140 },
  bar: { position: 'absolute', left: 0, right: 0, height: 64, justifyContent: 'center', paddingHorizontal: t.density.space.md },
  top: { top: 0 },
  bottom: { bottom: 0 },
}))

function BlurScreen() {
  const s = useStyles()
  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.list}>
        <Text variant="xs" color="textMuted">Sobre lista rolando: topo = surface (intensity 60), fim = bg (intensity 30).</Text>
        {rows.map((n) => (
          <Box key={n} surface="surface3" padding="md" radius="md">
            <Text>linha {n}</Text>
          </Box>
        ))}
      </ScrollView>
      <Blur intensity={60} tint="surface" style={[s.bar, s.top]}>
        <Text>topo: surface, 60</Text>
      </Blur>
      <Blur intensity={30} tint="bg" style={[s.bar, s.bottom]}>
        <Text>fim: bg, 30</Text>
      </Blur>
    </View>
  )
}

export default { id: 'blur', title: 'Blur', group: 'movimento', Screen: BlurScreen } satisfies GalleryEntry
