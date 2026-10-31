import { Button, createStyles, Metric, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
}))

function Live({ initial, step, trend, label, unit, format }: { initial: number; step: number; trend: 'up' | 'down' | 'flat'; label: string; unit?: string; format?: (n: number) => string }) {
  const [n, setN] = useState(initial)
  return (
    <Stack gap="sm">
      <Metric label={label} value={n} trend={trend} unit={unit} format={format} />
      <Stack direction="row" gap="sm">
        <Button title="-" variant="surface" onPress={() => setN((v) => v - step)} />
        <Button title="+" variant="surface" onPress={() => setN((v) => v + step)} />
      </Stack>
    </Stack>
  )
}

function MetricScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Os botões mudam o valor para exercitar o NumberTicker. O movimento reduzido troca direto.</Text>
      <Live label="Receita do mês" initial={12480.5} step={730.4} trend="up" format={brl.format} />
      <Live label="Peso corporal" initial={72} step={3} trend="down" unit="kg" />
      <Live label="Estável" initial={50} step={5} trend="flat" unit="%" />
    </ScrollView>
  )
}

export default { id: 'metric', title: 'Metric', group: 'composição', Screen: MetricScreen } satisfies GalleryEntry
