import { Stack, Tag, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/Tag' }
export default meta

const TONES = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] as const

/** Os seis tons; sem ícone e com ícone. */
export const Tons: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      <Text variant="xs" color="textMuted" label>sem ícone</Text>
      <Stack direction="row" gap="xs" wrap>
        {TONES.map((tone) => <Tag key={tone} label={tone} tone={tone} />)}
      </Stack>
      <Text variant="xs" color="textMuted" label>com ícone</Text>
      <Stack direction="row" gap="xs" wrap>
        {TONES.map((tone) => <Tag key={tone} label={tone} tone={tone} icon="info" />)}
      </Stack>
    </Stack>
  ),
}
