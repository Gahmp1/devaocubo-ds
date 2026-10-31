import { Skeleton, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/Skeleton' }
export default meta

export const Bloco: StoryObj = {
  render: () => (
    <Stack style={{ padding: 24, maxWidth: 360 }}>
      <Skeleton height={96} radius="md" />
    </Stack>
  ),
}

export const TresLinhas: StoryObj = {
  render: () => (
    <Stack style={{ padding: 24, maxWidth: 360 }}>
      <Skeleton lines={3} />
    </Stack>
  ),
}

export const Avatar: StoryObj = {
  render: () => (
    <Stack direction="row" gap="md" align="center" style={{ padding: 24, maxWidth: 360 }}>
      <Skeleton width={48} height={48} radius="full" />
      <Stack style={{ flex: 1 }}>
        <Skeleton lines={2} />
      </Stack>
    </Stack>
  ),
}
