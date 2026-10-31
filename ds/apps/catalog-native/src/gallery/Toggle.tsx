import { createStyles, Stack, Text, Toggle } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function Row({ title, initial, size, disabled }: { title: string; initial: boolean; size?: 'normal' | 'small'; disabled?: boolean }) {
  const [value, setValue] = useState(initial)
  return (
    <Stack direction="row" gap="md" align="center">
      <Toggle value={value} onValueChange={setValue} size={size} disabled={disabled} accessibilityLabel={title} />
      <Text variant="sm" color="textMuted">{title}</Text>
    </Stack>
  )
}

function ToggleScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Toque alterna; o polegar estica enquanto pressionado (sem esticar com movimento reduzido).</Text>
      <Row title="Ligado" initial />
      <Row title="Desligado" initial={false} />
      <Row title="Desabilitado ligado" initial disabled />
      <Row title="Desabilitado desligado" initial={false} disabled />
      <Text variant="xs" color="textMuted" label>tamanhos</Text>
      <Row title="Normal (50x30)" initial size="normal" />
      <Row title="Pequeno (40x20)" initial size="small" />
      <Row title="Pequeno desligado" initial={false} size="small" />
    </ScrollView>
  )
}

export default { id: 'toggle', title: 'Toggle', group: 'primitivos', Screen: ToggleScreen } satisfies GalleryEntry
