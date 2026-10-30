import { Box, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const SURFACES = ['bg', 'surface1', 'surface2', 'surface3'] as const

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  cell: { minWidth: 120 },
}))

function BoxScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>4 superfícies × 2 raios</Text>
      <Stack direction="row" wrap gap="md">
        {SURFACES.flatMap((surface) =>
          (['sm', 'xl'] as const).map((r) => (
            <Box key={`${surface}${r}`} surface={surface} radius={r} padding="md" style={s.cell}>
              <Text variant="sm">{surface} · {r}</Text>
            </Box>
          )),
        )}
      </Stack>
      <Text variant="xs" color="textMuted" label>espaçamento</Text>
      <Stack gap="md">
        <Box surface="surface2" padding="xs"><Text variant="sm">padding xs</Text></Box>
        <Box surface="surface2" paddingX="xl" paddingY="xxs"><Text variant="sm">paddingX xl · paddingY xxs</Text></Box>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'box', title: 'Box', group: 'primitivos', Screen: BoxScreen } satisfies GalleryEntry
