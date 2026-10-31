import { Text } from '@gahmp1/ds-web'
import { GlowScene } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Movimento/GlowScene' }
export default meta

const PRESETS = ['focus', 'ambient', 'success'] as const

/** Os 4 temas e os dois esquemas saem da barra do Storybook; o `bg` do tema é a base. */
export const Presets: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 16 }}>
      {PRESETS.map((preset) => (
        <GlowScene key={preset} preset={preset} radius="lg" style={{ width: 240, height: 360 }}>
          <div style={{ padding: 16 }}>
            <Text variant="lg">{preset}</Text>
          </div>
        </GlowScene>
      ))}
    </div>
  ),
}
