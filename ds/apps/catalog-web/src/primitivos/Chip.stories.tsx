import { Chip, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/Chip' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)' } as const
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

/** Simples, selecionável, com ícone e desabilitado. */
export const Estados: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <Stack direction="row" gap="xs" wrap>
        <Chip label="Simples" onPress={noop} />
        <Selectable label="Selecionável" initial={false} />
        <Selectable label="Selecionado" initial />
        <Chip label="Com ícone" icon="plus" onPress={noop} />
        <Chip label="Desabilitado" onPress={noop} disabled />
        <Chip label="Desabilitado selecionado" onPress={noop} selected disabled />
      </Stack>
    </Stack>
  ),
}

/** O ✕ é um alvo próprio, com nome "Fechar <rótulo>". */
export const Removivel: StoryObj = { render: () => <div style={frame}><Removable /></div> }

/** Removível desabilitado e selecionado. */
export const RemovivelEstados: StoryObj = {
  render: () => (
    <Stack direction="row" gap="xs" wrap style={frame}>
      <Chip label="Selecionado" selected onPress={noop} onRemove={noop} />
      <Chip label="Desabilitado" disabled onPress={noop} onRemove={noop} />
      <Chip label="Só remover" onRemove={noop} />
    </Stack>
  ),
}
