import { HeaderTitle, IconButton, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Composição/HeaderTitle' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const
const noop = () => {}

/** Grande e compacto; sem `size` vale `components.header` do tema. */
export const Tamanhos: StoryObj = {
  render: () => (
    <Stack gap="xl" style={frame}>
      <HeaderTitle size="large" title="Treinos" subtitle="Segunda-feira" />
      <HeaderTitle size="compact" title="Treinos" subtitle="Segunda-feira" />
      <HeaderTitle title="Tamanho do tema" />
    </Stack>
  ),
}

/** `leading` e `trailing` aceitam qualquer nó; o título longo quebra linha. */
export const ComAcoes: StoryObj = {
  render: () => (
    <Stack gap="xl" style={frame}>
      <HeaderTitle
        title="Detalhes do exercício"
        leading={<IconButton icon="chevron-left" accessibilityLabel="Voltar" onPress={noop} />}
        trailing={<IconButton icon="more" accessibilityLabel="Mais ações" onPress={noop} />}
      />
      <HeaderTitle size="compact" title="Um título bem longo que precisa quebrar em mais de uma linha" subtitle="Subtítulo" trailing={<IconButton icon="plus" accessibilityLabel="Adicionar" onPress={noop} />} />
    </Stack>
  ),
}

export const Carregando: StoryObj = {
  render: () => (
    <Stack gap="xl" style={frame}>
      <HeaderTitle size="large" title="Treinos" loading />
      <HeaderTitle size="compact" title="Treinos" subtitle="Segunda-feira" loading />
    </Stack>
  ),
}
