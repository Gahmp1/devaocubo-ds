import { Button, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Primitivos/Button' }
export default meta

const VARIANTS = ['primary', 'outline', 'ghost', 'inverse', 'inverseOutline', 'surface', 'surfaceOutline', 'danger'] as const
const SHAPES = ['pill', 'rounded', 'square', 'circle'] as const
const SIZES = ['small', 'normal', 'large'] as const
const noop = () => {}

/** Cada linha é uma variante: habilitado, desabilitado e carregando. A barra Tema troca a forma padrão. */
export const Variantes: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      {VARIANTS.map((variant) => (
        <Stack key={variant} direction="row" gap="md" align="center" wrap>
          <Stack style={{ width: 120 }}><Text variant="xs" color="textMuted" label>{variant}</Text></Stack>
          <Button title="Continuar" variant={variant} onPress={noop} />
          <Button title="Continuar" variant={variant} onPress={noop} disabled />
          <Button title="Continuar" variant={variant} onPress={noop} loading />
        </Stack>
      ))}
    </Stack>
  ),
}

export const Formas: StoryObj = {
  render: () => (
    <Stack direction="row" gap="md" align="center" wrap style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      {SHAPES.map((shape) => (
        <Button key={shape} title={shape} shape={shape} icon={shape === 'circle' ? 'plus' : undefined} onPress={noop} />
      ))}
    </Stack>
  ),
}

export const Tamanhos: StoryObj = {
  render: () => (
    <Stack direction="row" gap="md" align="center" wrap style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      {SIZES.map((size) => (
        <Button key={size} title={size} size={size} onPress={noop} />
      ))}
    </Stack>
  ),
}

export const LarguraTotal: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, background: 'var(--ds-color-bg)', maxWidth: 360 }}>
      <Button title="Salvar treino" fullWidth onPress={noop} />
      <Button title="Cancelar" variant="outline" fullWidth onPress={noop} />
    </Stack>
  ),
}

export const ComIcone: StoryObj = {
  render: () => (
    <Stack direction="row" gap="md" align="center" wrap style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      <Button title="Adicionar" icon="plus" onPress={noop} />
      <Button title="Enviar" icon="send" variant="outline" onPress={noop} />
      <Button title="Adicionar" icon="plus" variant="inverse" disabled onPress={noop} />
    </Stack>
  ),
}

export const TituloLongo: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, background: 'var(--ds-color-bg)', maxWidth: 240 }}>
      <Button title="Começar o treino de pernas com a série de aquecimento" fullWidth onPress={noop} />
      <Button title="Título comprido num botão sem largura total" onPress={noop} />
    </Stack>
  ),
}
