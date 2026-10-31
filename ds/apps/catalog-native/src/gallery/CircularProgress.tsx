import { CircularProgress, createStyles, Press, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: t.density.space.xl },
  button: { minHeight: t.density.control.md, justifyContent: 'center', alignItems: 'center', borderRadius: t.shape.radius.full, backgroundColor: t.color.surface2 },
}))

const pct = (v: number) => `${Math.round(v * 100)}%`

function CircularProgressScreen() {
  const s = useStyles()
  const [v, setV] = useState(0.25)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (o arco aparece já no valor, sem preencher).</Text>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>0 · 0,6 · 1</Text>
        <View style={s.row}>
          <CircularProgress value={0} />
          <CircularProgress value={0.6} />
          <CircularProgress value={1} />
        </View>
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>com texto no centro</Text>
        <View style={s.row}>
          <CircularProgress value={0} size={72}><Text variant="lgMedium" tabular>{pct(0)}</Text></CircularProgress>
          <CircularProgress value={0.6} size={72}><Text variant="lgMedium" tabular>{pct(0.6)}</Text></CircularProgress>
          <CircularProgress value={1} size={72}><Text variant="lgMedium" tabular>{pct(1)}</Text></CircularProgress>
        </View>
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>tons</Text>
        <View style={s.row}>
          <CircularProgress value={0.6} />
          <CircularProgress value={0.6} tone="success" />
          <CircularProgress value={0.6} tone="danger" />
        </View>
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>tamanho e espessura</Text>
        <View style={s.row}>
          <CircularProgress value={0.6} size={32} thickness={3} />
          <CircularProgress value={0.6} size={96} thickness={12}><Text variant="xs" color="textMuted">meta</Text></CircularProgress>
        </View>
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>animando</Text>
        <View style={s.row}>
          <CircularProgress value={v} size={96}><Text variant="lgMedium" tabular>{pct(v)}</Text></CircularProgress>
        </View>
        <Press component="Catalog" interactionId="avancar" accessibilityRole="button" style={s.button} onPress={() => setV((x) => (x >= 1 ? 0 : Math.min(1, x + 0.25)))}>
          <Text>avançar ({pct(v)})</Text>
        </Press>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'circular-progress', title: 'CircularProgress', group: 'composição', Screen: CircularProgressScreen } satisfies GalleryEntry
