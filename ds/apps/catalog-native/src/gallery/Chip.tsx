import { Chip, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

const noop = () => {}

function Selectable({ label, initial }: { label: string; initial: boolean }) {
  const [selected, setSelected] = useState(initial)
  return <Chip label={label} selected={selected} onPress={() => setSelected(!selected)} />
}

function Removable() {
  const [items, setItems] = useState(['Peito', 'Costas', 'Pernas'])
  const [taps, setTaps] = useState(0)
  return (
    <Stack gap="sm">
      <Stack direction="row" gap="xs" wrap>
        {items.map((label) => (
          <Chip key={label} label={label} onPress={() => setTaps(taps + 1)} onRemove={() => setItems(items.filter((i) => i !== label))} />
        ))}
      </Stack>
      <Text variant="xs" color="textMuted">Toques no chip: {taps}. O ✕ remove e não conta como toque no chip.</Text>
    </Stack>
  )
}

function ChipScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>estados</Text>
      <Stack direction="row" gap="xs" wrap>
        <Chip label="Simples" onPress={noop} />
        <Selectable label="Selecionável" initial={false} />
        <Selectable label="Selecionado" initial />
        <Chip label="Com ícone" icon="plus" onPress={noop} />
        <Chip label="Desabilitado" onPress={noop} disabled />
        <Chip label="Desabilitado selecionado" onPress={noop} selected disabled />
      </Stack>
      <Text variant="xs" color="textMuted" label>removível</Text>
      <Removable />
      <Stack direction="row" gap="xs" wrap>
        <Chip label="Selecionado" selected onPress={noop} onRemove={noop} />
        <Chip label="Desabilitado" disabled onPress={noop} onRemove={noop} />
        <Chip label="Só remover" onRemove={noop} />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'chip', title: 'Chip', group: 'primitivos', Screen: ChipScreen } satisfies GalleryEntry
