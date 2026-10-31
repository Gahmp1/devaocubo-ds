import { Select, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'
import { userEvent, waitFor, within } from 'storybook/test'

const meta: Meta = { title: 'Composição/Select' }
export default meta

const OPTIONS = [
  { value: 'kg', label: 'Quilogramas' },
  { value: 'lb', label: 'Libras' },
  { value: 'st', label: 'Stone', disabled: true },
  { value: 'g', label: 'Gramas' },
]
const frame = { padding: 24, maxInlineSize: 360, minBlockSize: 320, background: 'var(--ds-color-bg)' } as const

function Demo({ initial = '', ...rest }: { initial?: string; disabled?: boolean; placeholder?: string; label?: string }) {
  const [value, setValue] = useState(initial)
  return <Select value={value} onChange={setValue} options={OPTIONS} {...rest} />
}

export const Fechado: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Demo label="Unidade" placeholder="Escolha a unidade" />
      <Demo label="Com valor" initial="lb" />
      <Demo placeholder="Sem rótulo" />
    </Stack>
  ),
}

/** Abre sozinho para a conferência; a opção "Stone" está desabilitada. */
export const Aberto: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <Demo label="Unidade" placeholder="Escolha a unidade" initial="kg" />
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('combobox'))
    await waitFor(() => within(document.body).getByRole('listbox'))
  },
}

export const Desabilitado: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <Demo label="Unidade" initial="kg" disabled />
    </Stack>
  ),
}
