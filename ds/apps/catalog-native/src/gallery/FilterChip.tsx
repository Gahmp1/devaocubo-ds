import { createStyles, FilterChip, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const OPTIONS = ['Peito', 'Costas', 'Pernas', 'Ombros', 'Braços']

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function Group() {
  const [on, setOn] = useState(['Costas', 'Ombros'])
  return (
    <Stack gap="sm">
      <Stack direction="row" gap="xs" wrap>
        {OPTIONS.map((label) => (
          <FilterChip key={label} label={label} selected={on.includes(label)} onPress={(next) => setOn(next ? [...on, label] : on.filter((o) => o !== label))} />
        ))}
      </Stack>
      <Text variant="xs" color="textMuted">Selecionados: {on.join(', ') || 'nenhum'}</Text>
    </Stack>
  )
}

function FilterChipScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>grupo de cinco, dois selecionados</Text>
      <Group />
      <Text variant="xs" color="textMuted" label>desabilitado</Text>
      <Stack direction="row" gap="xs">
        <FilterChip label="Desligado" selected={false} onPress={() => {}} disabled />
        <FilterChip label="Ligado" selected onPress={() => {}} disabled />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'filter-chip', title: 'FilterChip', group: 'primitivos', Screen: FilterChipScreen } satisfies GalleryEntry
