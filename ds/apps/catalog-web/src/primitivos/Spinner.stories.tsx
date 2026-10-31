import { Spinner, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/Spinner' }
export default meta

const SIZES = ['small', 'medium', 'large'] as const
const TONES = ['accent', 'onAccent', 'text'] as const

/** `onAccent` precisa de fundo de acento; a barra Movimento do Storybook mostra o reduzido (pulso, sem rotação). */
export const TamanhosETons: StoryObj = {
  render: () => (
    <Stack gap="lg" style={{ padding: 24 }}>
      {TONES.map((tone) => (
        <Stack key={tone} direction="row" gap="xl" align="center" style={tone === 'onAccent' ? { background: 'var(--ds-color-accent)', padding: 16, borderRadius: 'var(--ds-radius-md)' } : { padding: 16 }}>
          <Text variant="xs" color={tone === 'onAccent' ? 'onAccent' : 'textMuted'} label>{tone}</Text>
          {SIZES.map((size) => (
            <Spinner key={size} size={size} tone={tone} />
          ))}
        </Stack>
      ))}
    </Stack>
  ),
}
