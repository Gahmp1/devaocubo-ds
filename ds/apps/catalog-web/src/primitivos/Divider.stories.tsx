import { Divider, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/Divider' }
export default meta

export const Horizontal: StoryObj = {
  render: () => (
    <Stack gap="sm" style={{ padding: 24 }}>
      <Text>border</Text>
      <Divider />
      <Text>borderMuted</Text>
      <Divider tone="borderMuted" />
      <Text>fim</Text>
    </Stack>
  ),
}

export const Vertical: StoryObj = {
  render: () => (
    <Stack direction="row" gap="sm" style={{ padding: 24, height: 48 }}>
      <Text>um</Text>
      <Divider orientation="vertical" />
      <Text>dois</Text>
      <Divider orientation="vertical" tone="borderMuted" />
      <Text>três</Text>
    </Stack>
  ),
}

export const Recuo: StoryObj = {
  render: () => (
    <Stack gap="sm" style={{ padding: 24 }}>
      <Text>inset lg</Text>
      <Divider inset="lg" />
      <Text>fim</Text>
    </Stack>
  ),
}
