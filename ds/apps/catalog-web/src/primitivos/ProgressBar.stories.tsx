import { ProgressBar, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/ProgressBar' }
export default meta

export const Indeterminada: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, maxWidth: 360 }}>
      <ProgressBar />
      <ProgressBar tone="success" />
      <ProgressBar tone="danger" />
    </Stack>
  ),
}

export const Valores: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, maxWidth: 360 }}>
      {[0, 0.4, 1].map((v) => (
        <Stack key={v} gap="xs">
          <Text variant="xs" color="textMuted" label>{v}</Text>
          <ProgressBar value={v} />
        </Stack>
      ))}
      <ProgressBar value={0.4} tone="success" />
      <ProgressBar value={0.4} tone="danger" />
    </Stack>
  ),
}

export const MudancaAnimada: StoryObj = {
  render: function Render() {
    const [v, setV] = useState(0.2)
    return (
      <Stack gap="md" style={{ padding: 24, maxWidth: 360 }}>
        <ProgressBar value={v} />
        <button onClick={() => setV((x) => (x >= 1 ? 0 : Math.min(1, x + 0.25)))}>avançar ({Math.round(v * 100)}%)</button>
      </Stack>
    )
  },
}
