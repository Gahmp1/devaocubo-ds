import { createStyles, Stack, Tag, Text } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const TONES = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] as const

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function TagScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>sem ícone</Text>
      <Stack direction="row" gap="xs" wrap>
        {TONES.map((tone) => <Tag key={tone} label={tone} tone={tone} />)}
      </Stack>
      <Text variant="xs" color="textMuted" label>com ícone</Text>
      <Stack direction="row" gap="xs" wrap>
        {TONES.map((tone) => <Tag key={tone} label={tone} tone={tone} icon="info" />)}
      </Stack>
    </ScrollView>
  )
}

export default { id: 'tag', title: 'Tag', group: 'primitivos', Screen: TagScreen } satisfies GalleryEntry
