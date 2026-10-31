import { createStyles, Skeleton, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  grow: { flex: 1 },
}))

function SkeletonScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (blocos parados).</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>bloco</Text>
        <Skeleton height={96} radius="md" />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>3 linhas</Text>
        <Skeleton lines={3} />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>avatar</Text>
        <Stack direction="row" gap="md" align="center">
          <Skeleton width={48} height={48} radius="full" />
          <Stack style={s.grow}>
            <Skeleton lines={2} />
          </Stack>
        </Stack>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'skeleton', title: 'Skeleton', group: 'primitivos', Screen: SkeletonScreen } satisfies GalleryEntry
