import { createStyles, RadioGroup, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const OPTIONS = [
  { value: 'a', label: 'Hipertrofia' },
  { value: 'b', label: 'Força' },
  { value: 'c', label: 'Resistência (indisponível)', disabled: true },
]

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function Demo({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial)
  return <RadioGroup value={value} onChange={setValue} options={OPTIONS} accessibilityLabel="Objetivo" />
}

function RadioScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Três opções, a última desabilitada; o ponto desliza até a escolhida (sem deslizar com movimento reduzido).</Text>
      <Demo initial="a" />
      <Text variant="xs" color="textMuted" label>sem seleção inicial</Text>
      <Demo initial="" />
    </ScrollView>
  )
}

export default { id: 'radio', title: 'Radio', group: 'primitivos', Screen: RadioScreen } satisfies GalleryEntry
