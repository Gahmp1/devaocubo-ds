import { Feedback, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Composição/Feedback' }
export default meta

const KINDS = [
  { kind: 'empty', title: 'Nenhum treino ainda', description: 'Crie o primeiro para começar a acompanhar a evolução.', label: 'Criar treino' },
  { kind: 'success', title: 'Treino salvo', description: 'Ele já aparece na sua lista.', label: 'Ver treinos' },
  { kind: 'error', title: 'Algo deu errado', description: 'Não conseguimos carregar os dados agora.', label: 'Tentar de novo' },
] as const

/** Os três tipos em tela inteira: o conteúdo centraliza na altura do pai. */
export const Tela: StoryObj = {
  render: () => (
    <Stack direction="row" gap="md" style={{ padding: 24, background: 'var(--ds-color-bg)' }} wrap>
      {KINDS.map((k) => (
        <div key={k.kind} style={{ blockSize: 420, inlineSize: 320, border: '1px dashed var(--ds-color-border-muted)' }}>
          <Feedback kind={k.kind} title={k.title} description={k.description} action={{ label: k.label, onPress: () => {} }} layout="screen" />
        </div>
      ))}
    </Stack>
  ),
}

/** Os três tipos embutidos numa lista, ocupando só a altura do conteúdo; um deles sem ação nem descrição. */
export const Embutido: StoryObj = {
  render: () => (
    <Stack gap="lg" style={{ padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 }}>
      {KINDS.map((k) => (
        <Feedback key={k.kind} kind={k.kind} title={k.title} description={k.description} action={{ label: k.label, onPress: () => {} }} layout="inline" />
      ))}
      <Feedback kind="empty" title="Sem resultados" layout="inline" />
    </Stack>
  ),
}
