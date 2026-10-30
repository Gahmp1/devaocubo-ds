import { Checkbox, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/Checkbox' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)' } as const

function Item({ label, initial, disabled }: { label: string; initial: boolean | 'mixed'; disabled?: boolean }) {
  const [checked, setChecked] = useState(initial)
  return <Checkbox checked={checked} onChange={setChecked} label={label} disabled={disabled} />
}

/** Toque (ou Espaço) alterna; "misto" vira marcado ao tocar. */
export const Estados: StoryObj = {
  render: () => (
    <Stack gap="xs" style={frame}>
      <Item label="Vazio" initial={false} />
      <Item label="Marcado" initial />
      <Item label="Misto" initial="mixed" />
      <Item label="Desabilitado vazio" initial={false} disabled />
      <Item label="Desabilitado marcado" initial disabled />
      <Item label="Desabilitado misto" initial="mixed" disabled />
    </Stack>
  ),
}

function All() {
  const [items, setItems] = useState([true, false, true])
  const all = items.every(Boolean) ? true : items.some(Boolean) ? 'mixed' : false
  return (
    <Stack gap="xs" style={frame}>
      <Checkbox checked={all} onChange={(next) => setItems(items.map(() => next))} label="Todos os exercícios" />
      {items.map((on, i) => (
        <Checkbox key={i} checked={on} onChange={(next) => setItems(items.map((v, j) => (j === i ? next : v)))} label={`Exercício ${i + 1}`} />
      ))}
    </Stack>
  )
}

/** O pai fica "misto" quando só parte dos filhos está marcada. */
export const PaiMisto: StoryObj = { render: () => <All /> }

function Bare() {
  const [checked, setChecked] = useState(false)
  return (
    <Stack style={frame}>
      <Checkbox checked={checked} onChange={setChecked} accessibilityLabel="Aceito os termos" />
    </Stack>
  )
}

/** Sem texto visível: o nome acessível é obrigatório. */
export const SemRotulo: StoryObj = { render: () => <Bare /> }
