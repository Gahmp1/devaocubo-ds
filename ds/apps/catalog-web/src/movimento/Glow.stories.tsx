import { Stack, Text } from '@gahmp1/ds-web'
import { Glow } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Movimento/Glow' }
export default meta

const pad = { padding: 72 } as const

/** O bloom (camada de fora) depende do modelo de profundidade do tema: some em `flat`, entra inteiro em `glow`. */
export const Parado: StoryObj = {
  render: () => (
    <div style={pad}>
      <Glow />
    </div>
  ),
}

/** Movimento reduzido (barra Movimento) deixa o brilho parado. */
export const Pulsando: StoryObj = {
  render: () => (
    <div style={pad}>
      <Glow pulse />
    </div>
  ),
}

export const TresForcas: StoryObj = {
  render: () => (
    <Stack direction="row" gap="xxxl" style={pad}>
      {[0.2, 0.6, 1].map((strength) => (
        <Stack key={strength} gap="md" align="center">
          <Glow strength={strength} />
          <Text variant="xs" color="textMuted">{strength}</Text>
        </Stack>
      ))}
    </Stack>
  ),
}

export const Cores: StoryObj = {
  render: () => (
    <Stack direction="row" gap="xxxl" style={pad}>
      {(['aiGlow', 'accent'] as const).map((color) => (
        <Stack key={color} gap="md" align="center">
          <Glow color={color} size={72} />
          <Text variant="xs" color="textMuted">{color}</Text>
        </Stack>
      ))}
    </Stack>
  ),
}
