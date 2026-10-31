import { createStyles, SegmentedControl, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

const TWO = [
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mês' },
]
const FOUR = [
  { value: 'hyper', label: 'Hipertrofia' },
  { value: 'loss', label: 'Perda de peso' },
  { value: 'endurance', label: 'Resistência' },
  { value: 'strength', label: 'Força' },
]

function SegmentedControlScreen() {
  const s = useStyles()
  const [two, setTwo] = useState('week')
  const [four, setFour] = useState('hyper')
  const [small, setSmall] = useState('month')
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>2 opções</Text>
      <SegmentedControl options={TWO} value={two} onChange={setTwo} />
      <Text variant="xs" color="textMuted" label>4 opções (rótulos longos encolhem)</Text>
      <SegmentedControl options={FOUR} value={four} onChange={setFour} />
      <Text variant="xs" color="textMuted" label>small</Text>
      <SegmentedControl options={TWO} value={small} onChange={setSmall} size="small" />
      <Text variant="sm" color="textMuted">Valor atual: {two} / {four} / {small}</Text>
    </ScrollView>
  )
}

export default { id: 'segmented-control', title: 'SegmentedControl', group: 'composição', Screen: SegmentedControlScreen } satisfies GalleryEntry
