import { createStyles, Press, ProgressBar, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  button: { minHeight: t.density.control.md, justifyContent: 'center', alignItems: 'center', borderRadius: t.shape.radius.full, backgroundColor: t.color.surface2 },
}))

function ProgressBarScreen() {
  const s = useStyles()
  const [v, setV] = useState(0.2)
  const [swap, setSwap] = useState<number | undefined>(undefined)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (segmento parado, valor sem transição).</Text>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>indeterminada</Text>
        <ProgressBar />
        <ProgressBar tone="success" />
        <ProgressBar tone="danger" />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>0 · 0,4 · 1</Text>
        <ProgressBar value={0} />
        <ProgressBar value={0.4} />
        <ProgressBar value={1} />
        <ProgressBar value={0.4} tone="success" />
        <ProgressBar value={0.4} tone="danger" />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>indeterminada para valor</Text>
        <ProgressBar value={swap} />
        <Press component="Catalog" interactionId="alternar" accessibilityRole="button" style={s.button} onPress={() => setSwap((x) => (x === undefined ? 0.6 : undefined))}>
          <Text>{swap === undefined ? 'definir valor 0,6' : 'voltar a indeterminada'}</Text>
        </Press>
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>mudança animada</Text>
        <ProgressBar value={v} />
        <Press component="Catalog" interactionId="avancar" accessibilityRole="button" style={s.button} onPress={() => setV((x) => (x >= 1 ? 0 : Math.min(1, x + 0.25)))}>
          <Text>avançar ({Math.round(v * 100)}%)</Text>
        </Press>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'progress-bar', title: 'ProgressBar', group: 'primitivos', Screen: ProgressBarScreen } satisfies GalleryEntry
