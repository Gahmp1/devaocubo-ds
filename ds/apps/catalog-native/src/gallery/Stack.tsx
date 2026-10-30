import { Box, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  tall: { paddingVertical: 28 },
  narrow: { maxWidth: 200 },
}))

function Cell({ n, tall }: { n: number; tall?: boolean }) {
  const s = useStyles()
  return (
    <Box surface="surface2" radius="sm" padding="sm" style={tall ? s.tall : undefined}>
      <Text variant="sm">{n}</Text>
    </Box>
  )
}

function StackScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>coluna</Text>
      <Stack gap="sm">
        <Cell n={1} /><Cell n={2} /><Cell n={3} />
      </Stack>
      <Text variant="xs" color="textMuted" label>linha · center · between</Text>
      <Stack direction="row" gap="sm" align="center" justify="between">
        <Cell n={1} /><Cell n={2} tall /><Cell n={3} />
      </Stack>
      <Text variant="xs" color="textMuted" label>quebra</Text>
      <Stack direction="row" wrap gap="xs" style={s.narrow}>
        {Array.from({ length: 10 }, (_, i) => <Cell key={i} n={i + 1} />)}
      </Stack>
    </ScrollView>
  )
}

export default { id: 'stack', title: 'Stack', group: 'primitivos', Screen: StackScreen } satisfies GalleryEntry
