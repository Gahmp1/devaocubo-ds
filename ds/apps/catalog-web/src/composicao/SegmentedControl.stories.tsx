import { SegmentedControl, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/SegmentedControl' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const

const TWO = [
  { value: 'day', label: 'Dia' },
  { value: 'week', label: 'Semana' },
]
const FOUR = [
  { value: 'hyper', label: 'Hipertrofia' },
  { value: 'loss', label: 'Perda de peso' },
  { value: 'endurance', label: 'Resistência' },
  { value: 'strength', label: 'Força' },
]

function Demo({ options, size }: { options: typeof TWO; size?: 'small' | 'normal' }) {
  const [value, setValue] = useState(options[0].value)
  return <SegmentedControl options={options} value={value} onChange={setValue} size={size} />
}

/** 2 e 4 opções; o indicador desliza com a mola do tema. Setas, Home e End trocam de opção. */
export const Opcoes: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Demo options={TWO} />
      <Demo options={FOUR} />
    </Stack>
  ),
}

export const Tamanhos: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Text variant="smMedium" color="textMuted" label>normal</Text>
      <Demo options={TWO} size="normal" />
      <Text variant="smMedium" color="textMuted" label>small</Text>
      <Demo options={TWO} size="small" />
    </Stack>
  ),
}
