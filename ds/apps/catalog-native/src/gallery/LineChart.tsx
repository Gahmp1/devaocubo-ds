import { createStyles, LineChart, Press, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  button: { minHeight: t.density.control.md, justifyContent: 'center', alignItems: 'center', borderRadius: t.shape.radius.full, backgroundColor: t.color.surface2 },
}))

const ys = [62, 64, 63, 67, 66, 71, 69, 74, 72, 78]
const series = ys.map((y, x) => ({ x, y }))
const other = ys.map((y, x) => ({ x, y: 90 - y + 40 }))

function LineChartScreen() {
  const s = useStyles()
  const [swap, setSwap] = useState(false)
  const [loading, setLoading] = useState(true)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (linha já desenhada, carregando sem respirar).</Text>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>linha</Text>
        <LineChart data={series} />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>com área</Text>
        <LineChart data={series} area />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>altura menor, dois pontos</Text>
        <LineChart data={series.slice(0, 2)} height={80} />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>vazio, com e sem texto</Text>
        <LineChart data={[]} emptyText="Nenhuma medição ainda" />
        <LineChart data={[]} height={64} />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>carregando</Text>
        <LineChart data={loading ? [] : series} area loading={loading} />
        <Press component="Catalog" interactionId="carregar" accessibilityRole="button" style={s.button} onPress={() => setLoading((x) => !x)}>
          <Text>{loading ? 'chegaram os dados' : 'voltar a carregar'}</Text>
        </Press>
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>mudança de dados</Text>
        <LineChart data={swap ? other : series} area />
        <Press component="Catalog" interactionId="alternar" accessibilityRole="button" style={s.button} onPress={() => setSwap((x) => !x)}>
          <Text>trocar dados</Text>
        </Press>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'line-chart', title: 'LineChart', group: 'composição', Screen: LineChartScreen } satisfies GalleryEntry
