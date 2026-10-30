import { Box, Text } from '@gahmp1/ds-web'
import { Blur } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Movimento/Blur' }
export default meta

const rows = Array.from({ length: 24 }, (_, i) => i + 1)

/** Barra com desfoque sobre a lista rolando. */
export const SobreListaRolando: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', height: 420, maxWidth: 360, margin: 24, overflow: 'auto' }}>
      <div style={{ display: 'grid', gap: 8, padding: '72px 0 16px' }}>
        {rows.map((n) => (
          <Box key={n} surface="surface3" padding="md" radius="md">
            <Text>linha {n}</Text>
          </Box>
        ))}
      </div>
      <Blur intensity={60} tint="surface" style={{ position: 'sticky', bottom: 0, height: 56 }}>
        <Box padding="md">
          <Text>Barra com desfoque</Text>
        </Box>
      </Blur>
    </div>
  ),
}

export const TintaBg: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', height: 200, maxWidth: 360, margin: 24, overflow: 'auto' }}>
      <div style={{ display: 'grid', gap: 8 }}>
        {rows.map((n) => (
          <Box key={n} surface="surface3" padding="md" radius="md">
            <Text>linha {n}</Text>
          </Box>
        ))}
      </div>
      <Blur intensity={30} tint="bg" style={{ position: 'sticky', bottom: 0, height: 56 }}>
        <Box padding="md">
          <Text>intensity 30, tint bg</Text>
        </Box>
      </Blur>
    </div>
  ),
}
