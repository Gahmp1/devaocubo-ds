import { Button, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { NumberTicker } from '@gahmp1/ds-native/motion'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
}))

function Counting() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 7), 800)
    return () => clearInterval(id)
  }, [])
  return <NumberTicker value={n} variant="display" />
}

function Stepper({ initial, step, trend, format }: { initial: number; step: number; trend?: 'up' | 'down'; format?: (n: number) => string }) {
  const [n, setN] = useState(initial)
  return (
    <Stack gap="sm">
      <NumberTicker value={n} trend={trend} format={format} variant="display" />
      <Stack direction="row" gap="sm">
        <Button title="-" variant="surface" onPress={() => setN((v) => v - step)} />
        <Button title="+" variant="surface" onPress={() => setN((v) => v + step)} />
      </Stack>
    </Stack>
  )
}

function NumberTickerScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (troca direta). Só as casas que mudam rolam.</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>contando</Text>
        <Counting />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>subindo (trend up)</Text>
        <Stepper initial={120} step={37} trend="up" />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>descendo (trend down)</Text>
        <Stepper initial={120} step={37} trend="down" />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>formato de moeda (auto)</Text>
        <Stepper initial={1234.5} step={249.9} format={brl.format} />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'number-ticker', title: 'NumberTicker', group: 'movimento', Screen: NumberTickerScreen } satisfies GalleryEntry
