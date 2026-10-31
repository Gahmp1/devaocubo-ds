import { Box, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/Box' }
export default meta

const SURFACES = ['bg', 'surface1', 'surface2', 'surface3'] as const

export const Superficies: StoryObj = {
  render: () => (
    <Stack direction="row" wrap gap="md" style={{ padding: 24 }}>
      {SURFACES.flatMap((s) =>
        (['sm', 'xl'] as const).map((r) => (
          <Box key={`${s}${r}`} surface={s} radius={r} padding="md" style={{ minWidth: 120 }}>
            <Text variant="sm">{s} · {r}</Text>
          </Box>
        )),
      )}
    </Stack>
  ),
}

export const Espacamento: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24 }}>
      <Box surface="surface2" padding="xs"><Text variant="sm">padding xs</Text></Box>
      <Box surface="surface2" paddingX="xl" paddingY="xxs"><Text variant="sm">paddingX xl · paddingY xxs</Text></Box>
    </Stack>
  ),
}
