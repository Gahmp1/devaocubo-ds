import { Button, CircularProgress, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/CircularProgress' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const

/** Vazio, parcial e cheio; o percentual no centro vem do `children`. */
export const Valores: StoryObj = {
  render: () => (
    <Stack direction="row" gap="lg" style={frame} wrap>
      {[0, 0.6, 1].map((v) => (
        <CircularProgress key={v} value={v}>
          <Text variant="xs">{Math.round(v * 100)}%</Text>
        </CircularProgress>
      ))}
    </Stack>
  ),
}

/** Tamanho e espessura próprios, e os três tons. */
export const TonsETamanhos: StoryObj = {
  render: () => (
    <Stack direction="row" gap="lg" align="center" style={frame} wrap>
      <CircularProgress value={0.4} size={32} thickness={3} />
      <CircularProgress value={0.4} size={72} thickness={8} tone="success" />
      <CircularProgress value={0.75} size={96} thickness={6} tone="danger">
        <Text variant="lgMedium">75%</Text>
      </CircularProgress>
    </Stack>
  ),
}

/** O arco preenche ao entrar e acompanha cada mudança do valor; com movimento reduzido troca direto. */
export const Animando: StoryObj = {
  render: () => {
    const [v, setV] = useState(0.2)
    return (
      <Stack gap="md" align="center" style={frame}>
        <CircularProgress value={v} size={96} thickness={8}>
          <Text variant="lgMedium">{Math.round(v * 100)}%</Text>
        </CircularProgress>
        <Stack direction="row" gap="sm">
          <Button title="-25%" variant="surface" onPress={() => setV((n) => Math.max(0, n - 0.25))} />
          <Button title="+25%" variant="surface" onPress={() => setV((n) => Math.min(1, n + 0.25))} />
        </Stack>
      </Stack>
    )
  },
}
