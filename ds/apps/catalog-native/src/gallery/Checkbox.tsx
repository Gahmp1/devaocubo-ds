import { Checkbox, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function Item({ label, initial, disabled }: { label: string; initial: boolean | 'mixed'; disabled?: boolean }) {
  const [checked, setChecked] = useState(initial)
  return <Checkbox checked={checked} onChange={setChecked} label={label} disabled={disabled} />
}

function Parent() {
  const [items, setItems] = useState([true, false, true])
  const all = items.every(Boolean) ? true : items.some(Boolean) ? 'mixed' : false
  return (
    <Stack gap="xs">
      <Checkbox checked={all} onChange={(next) => setItems(items.map(() => next))} label="Todos os exercícios" />
      {items.map((on, i) => (
        <Checkbox key={i} checked={on} onChange={(next) => setItems(items.map((v, j) => (j === i ? next : v)))} label={`Exercício ${i + 1}`} />
      ))}
    </Stack>
  )
}

function Bare() {
  const [checked, setChecked] = useState(false)
  return <Checkbox checked={checked} onChange={setChecked} accessibilityLabel="Aceito os termos" />
}

function CheckboxScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Toque alterna e a caixa dá um quique (sem quique com movimento reduzido); "misto" vira marcado.</Text>
      <Stack gap="xs">
        <Item label="Vazio" initial={false} />
        <Item label="Marcado" initial />
        <Item label="Misto" initial="mixed" />
        <Item label="Desabilitado vazio" initial={false} disabled />
        <Item label="Desabilitado marcado" initial disabled />
        <Item label="Desabilitado misto" initial="mixed" disabled />
      </Stack>
      <Text variant="xs" color="textMuted" label>pai misto</Text>
      <Parent />
      <Text variant="xs" color="textMuted" label>sem rótulo visível</Text>
      <Bare />
    </ScrollView>
  )
}

export default { id: 'checkbox', title: 'Checkbox', group: 'primitivos', Screen: CheckboxScreen } satisfies GalleryEntry
