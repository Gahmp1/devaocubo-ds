import { createStyles, Divider, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  row: { height: 48 },
}))

function DividerScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>horizontal · border e borderMuted</Text>
        <Divider />
        <Divider tone="borderMuted" />
      </Stack>
      <Stack direction="row" gap="sm" style={s.row}>
        <Text>um</Text>
        <Divider orientation="vertical" />
        <Text>dois</Text>
        <Divider orientation="vertical" tone="borderMuted" />
        <Text>três</Text>
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>recuo lg</Text>
        <Divider inset="lg" />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'divider', title: 'Divider', group: 'primitivos', Screen: DividerScreen } satisfies GalleryEntry
