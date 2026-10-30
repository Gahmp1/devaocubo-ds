import { Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/Text' }
export default meta

const STEPS = ['xs', 'sm', 'base', 'lg', 'xl', 'display'] as const
const COLORS = ['text', 'textMuted', 'textSubtle', 'textDisabled', 'accent', 'onAccent', 'danger', 'warning', 'success', 'info'] as const
const LONG =
  'Um texto longo quebra em várias linhas e, com numberOfLines, termina em reticências quando passa do limite que o componente recebeu. 1.234,56 · 7.890,12 · 0.000,01'

export const Variantes: StoryObj = {
  render: () => (
    <Stack gap="sm" style={{ padding: 24 }}>
      {STEPS.flatMap((s) => [
        <Text key={s} variant={s}>{s} · Treino de pernas 1.234,56</Text>,
        <Text key={`${s}M`} variant={`${s}Medium`}>{s}Medium · Treino de pernas 1.234,56</Text>,
      ])}
    </Stack>
  ),
}

export const Cores: StoryObj = {
  render: () => (
    <Stack gap="sm" style={{ padding: 24 }}>
      {COLORS.map((c) => (
        <div key={c} style={c === 'onAccent' ? { background: 'var(--ds-color-accent)', padding: 8 } : undefined}>
          <Text color={c}>{c}</Text>
        </div>
      ))}
    </Stack>
  ),
}

export const Rotulo: StoryObj = {
  render: () => (
    <Stack gap="sm" style={{ padding: 24 }}>
      <Text variant="xs" color="textMuted" label>Rótulo pequeno</Text>
      <Text variant="sm" label>Rótulo sm</Text>
    </Stack>
  ),
}

export const Mono: StoryObj = {
  render: () => (
    <Stack gap="sm" style={{ padding: 24 }}>
      <Text mono>const total = 1234.56</Text>
      <Text mono variant="smMedium">0.000,01 · 9.999,99</Text>
    </Stack>
  ),
}

export const Tabular: StoryObj = {
  render: () => (
    <Stack gap="xxs" style={{ padding: 24 }}>
      <Text tabular>1111,11</Text>
      <Text tabular>8888,88</Text>
      <Text tabular={false}>1111,11</Text>
      <Text tabular={false}>8888,88</Text>
    </Stack>
  ),
}

export const TextoLongo: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, maxWidth: 320 }}>
      <Text>{LONG}</Text>
      <Text numberOfLines={2}>{LONG}</Text>
    </Stack>
  ),
}
