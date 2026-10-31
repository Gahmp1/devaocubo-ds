import { Menu, Stack, Text, type MenuProps } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { userEvent, waitFor, within } from 'storybook/test'

const meta: Meta = { title: 'Composição/Menu' }
export default meta

const noop = () => {}
const ITEMS: MenuProps['items'] = [
  { key: 'edit', label: 'Editar', icon: 'file', onSelect: noop },
  { key: 'share', label: 'Compartilhar', icon: 'link', onSelect: noop },
  'separator',
  { key: 'delete', label: 'Apagar', icon: 'close', destructive: true, onSelect: noop },
]
const frame = { padding: 24, minBlockSize: 320, background: 'var(--ds-color-bg)' } as const

const Trigger = () => <Text variant="baseMedium">Opções</Text>

export const Fechado: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <div><Menu trigger={<Trigger />} items={ITEMS} /></div>
    </Stack>
  ),
}

/** Abre sozinho: com separador e uma ação destrutiva. */
export const Aberto: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <div><Menu trigger={<Trigger />} items={ITEMS} /></div>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Opções' }))
    await waitFor(() => within(document.body).getByRole('menu'))
  },
}
