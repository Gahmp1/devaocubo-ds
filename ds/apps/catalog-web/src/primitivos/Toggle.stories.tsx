import { Stack, Text, Toggle } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/Toggle' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)' } as const

function Row({ title, initial, size, disabled }: { title: string; initial: boolean; size?: 'normal' | 'small'; disabled?: boolean }) {
  const [value, setValue] = useState(initial)
  return (
    <Stack direction="row" gap="md" align="center">
      <Toggle value={value} onValueChange={setValue} size={size} disabled={disabled} accessibilityLabel={title} />
      <Text variant="sm" color="textMuted">{title}</Text>
    </Stack>
  )
}

/** Toque (ou Espaço) liga e desliga; o polegar estica enquanto pressionado. */
export const Estados: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <Row title="Ligado" initial />
      <Row title="Desligado" initial={false} />
      <Row title="Desabilitado ligado" initial disabled />
      <Row title="Desabilitado desligado" initial={false} disabled />
    </Stack>
  ),
}

export const Tamanhos: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <Row title="Normal (50x30)" initial size="normal" />
      <Row title="Pequeno (40x20)" initial size="small" />
      <Row title="Pequeno desligado" initial={false} size="small" />
    </Stack>
  ),
}
