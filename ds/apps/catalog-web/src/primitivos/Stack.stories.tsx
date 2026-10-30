import { Box, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/Stack' }
export default meta

const Cell = ({ n, tall }: { n: number; tall?: boolean }) => (
  <Box surface="surface2" radius="sm" padding="sm" style={tall ? { paddingBlock: 28 } : undefined}>
    <Text variant="sm">{n}</Text>
  </Box>
)

export const Coluna: StoryObj = {
  render: () => (
    <Stack gap="sm" style={{ padding: 24 }}>
      <Cell n={1} /><Cell n={2} /><Cell n={3} />
    </Stack>
  ),
}

export const Linha: StoryObj = {
  render: () => (
    <Stack direction="row" gap="sm" align="center" justify="between" style={{ padding: 24 }}>
      <Cell n={1} /><Cell n={2} tall /><Cell n={3} />
    </Stack>
  ),
}

export const Quebra: StoryObj = {
  render: () => (
    <Stack direction="row" wrap gap="xs" style={{ padding: 24, maxWidth: 200 }}>
      {Array.from({ length: 10 }, (_, i) => <Cell key={i} n={i + 1} />)}
    </Stack>
  ),
}
