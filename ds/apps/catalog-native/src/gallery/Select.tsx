import { createStyles, Select, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

const UNITS = [
  { value: 'kg', label: 'Quilogramas' },
  { value: 'lb', label: 'Libras' },
  { value: 'st', label: 'Stones', disabled: true },
  { value: 'side', label: 'Lado do corpo, com um nome bem longo que precisa quebrar linha sem cortar' },
]

function SelectScreen() {
  const s = useStyles()
  const [unit, setUnit] = useState('kg')
  const [empty, setEmpty] = useState('')
  const [off, setOff] = useState('lb')
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Toque no campo para abrir a lista numa gaveta; a opção marcada leva o check e as desabilitadas não respondem.</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>com valor e rótulo (uma opção desabilitada)</Text>
        <Select label="Unidade de peso" value={unit} onChange={setUnit} options={UNITS} />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>vazio, com placeholder</Text>
        <Select value={empty} onChange={setEmpty} options={UNITS} placeholder="Escolha uma unidade" />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>desabilitado</Text>
        <Select label="Unidade de peso" value={off} onChange={setOff} options={UNITS} disabled />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'select', title: 'Select', group: 'composição', Screen: SelectScreen } satisfies GalleryEntry
