import { BarChart, createStyles, Press, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  button: { minHeight: t.density.control.md, justifyContent: 'center', alignItems: 'center', borderRadius: t.shape.radius.full, backgroundColor: t.color.surface2 },
}))

const week = [
  { label: 'Seg', value: 40 },
  { label: 'Ter', value: 65 },
  { label: 'Qua', value: 30 },
  { label: 'Qui', value: 80 },
  { label: 'Sex', value: 55 },
  { label: 'Sáb', value: 95 },
  { label: 'Dom', value: 20 },
]
const other = week.map((d, i) => ({ ...d, value: week[(i + 3) % week.length].value }))

function BarChartScreen() {
  const s = useStyles()
  const [swap, setSwap] = useState(false)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (barras já na altura final).</Text>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>7 barras</Text>
        <BarChart data={week} />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>destaque e valor formatado</Text>
        <BarChart data={week} highlight={5} formatValue={(n) => `${n} min`} />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>altura menor</Text>
        <BarChart data={week.slice(0, 4)} height={96} />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>vazio</Text>
        <BarChart data={[]} />
      </Stack>
      <Stack gap="sm">
        <Text variant="xs" color="textMuted" label>mudança de dados</Text>
        <BarChart data={swap ? other : week} highlight={swap ? 2 : 5} />
        <Press component="Catalog" interactionId="alternar" accessibilityRole="button" style={s.button} onPress={() => setSwap((x) => !x)}>
          <Text>trocar dados</Text>
        </Press>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'bar-chart', title: 'BarChart', group: 'composição', Screen: BarChartScreen } satisfies GalleryEntry
