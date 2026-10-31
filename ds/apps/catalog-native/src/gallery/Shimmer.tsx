import { createStyles, Stack, Text } from '@gahmp1/ds-native'
import { Shimmer } from '@gahmp1/ds-native/motion'
import { useState } from 'react'
import { ScrollView, Switch, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  block: { height: 96, backgroundColor: t.color.surface2 },
}))

function ShimmerScreen() {
  const s = useStyles()
  const [active, setActive] = useState(true)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Stack direction="row" gap="sm" align="center">
        <Switch value={active} onValueChange={setActive} accessibilityLabel="active" />
        <Text>active</Text>
      </Stack>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (varredura parada).</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>sobre bloco</Text>
        <Shimmer active={active} radius="md">
          <View style={s.block} />
        </Shimmer>
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>sobre texto</Text>
        <Shimmer active={active} radius="sm">
          <Text variant="lg" color="textMuted">Pensando no seu treino…</Text>
        </Shimmer>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'shimmer', title: 'Shimmer', group: 'primitivos', Screen: ShimmerScreen } satisfies GalleryEntry
