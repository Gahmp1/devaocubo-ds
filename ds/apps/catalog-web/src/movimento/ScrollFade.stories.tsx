import { Box, Stack, Text } from '@gahmp1/ds-web'
import { ScrollFade } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Movimento/ScrollFade' }
export default meta

const rows = Array.from({ length: 24 }, (_, i) => i + 1)

function List() {
  return (
    <Stack gap="xs">
      {rows.map((n) => (
        <Box key={n} surface="surface2" padding="md" radius="md">
          <Text>linha {n}</Text>
        </Box>
      ))}
    </Stack>
  )
}

/** Cada borda só esmaece quando ainda há conteúdo daquele lado. */
export const TopoEFim: StoryObj = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <ScrollFade style={{ height: 280 }}>
        <List />
      </ScrollFade>
    </div>
  ),
}

export const SoNoFim: StoryObj = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <ScrollFade edges={['bottom']} size={64} style={{ height: 280 }}>
        <List />
      </ScrollFade>
    </div>
  ),
}
