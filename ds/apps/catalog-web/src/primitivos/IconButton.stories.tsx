import { IconButton, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/IconButton' }
export default meta

const SIZES = ['small', 'medium', 'large'] as const
const VARIANTS = ['plain', 'filled', 'outline'] as const
const noop = () => {}

/** Linhas por variante; cada tamanho aparece habilitado e desabilitado. */
export const TamanhosEVariantes: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      {VARIANTS.map((variant) => (
        <Stack key={variant} direction="row" gap="md" align="center">
          <Stack style={{ width: 72 }}><Text variant="xs" color="textMuted" label>{variant}</Text></Stack>
          {SIZES.map((size) => (
            <IconButton key={size} icon="plus" accessibilityLabel="Adicionar" variant={variant} size={size} onPress={noop} />
          ))}
          {SIZES.map((size) => (
            <IconButton key={`d-${size}`} icon="plus" accessibilityLabel="Adicionar" variant={variant} size={size} onPress={noop} disabled />
          ))}
        </Stack>
      ))}
    </Stack>
  ),
}

export const Cores: StoryObj = {
  render: () => (
    <Stack direction="row" gap="md" align="center" style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      {(['text', 'textMuted', 'accent', 'danger'] as const).map((color) => (
        <IconButton key={color} icon="close" accessibilityLabel="Fechar" color={color} onPress={noop} />
      ))}
    </Stack>
  ),
}
