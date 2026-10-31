import { createStyles, Stack, Stepper, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
}))

function StepperScreen() {
  const s = useStyles()
  const [min, setMin] = useState(1)
  const [mid, setMid] = useState(4)
  const [max, setMax] = useState(7)
  const [kg, setKg] = useState(72.5)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Com leitor de tela, deslize para cima ou para baixo no valor para aumentar ou diminuir.</Text>
      <Stack gap="xs" align="center">
        <Text variant="xs" color="textMuted" label>no mínimo (1 a 7)</Text>
        <Stepper value={min} onChange={setMin} min={1} max={7} />
      </Stack>
      <Stack gap="xs" align="center">
        <Text variant="xs" color="textMuted" label>no meio</Text>
        <Stepper value={mid} onChange={setMid} min={1} max={7} />
      </Stack>
      <Stack gap="xs" align="center">
        <Text variant="xs" color="textMuted" label>no máximo</Text>
        <Stepper value={max} onChange={setMax} min={1} max={7} />
      </Stack>
      <Stack gap="xs" align="center">
        <Text variant="xs" color="textMuted" label>passo 0,5 com formato</Text>
        <Stepper value={kg} onChange={setKg} min={30} max={200} step={0.5} format={(n) => `${n.toFixed(1).replace('.', ',')} kg`} />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'stepper', title: 'Stepper', group: 'composição', Screen: StepperScreen } satisfies GalleryEntry
