import { DetailedListItem, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Composição/DetailedListItem' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const

function Cover() {
  return <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden><rect width="64" height="64" fill="var(--ds-color-surface3)" /><circle cx="32" cy="32" r="14" fill="var(--ds-color-accent)" /></svg>
}

/** Mídia, título, subtítulo, descrição, anel de progresso e chevron; pressionável (role button). */
export const Completo: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <DetailedListItem
        media={<Cover />}
        title="Programa de força"
        subtitle="Semana 3 de 8"
        description="Foco em agachamento e supino, três sessões por semana."
        progress={0.375}
        trailing="chevron"
        onPress={() => {}}
        interactionId="detailed.program"
      />
      <DetailedListItem title="Sem mídia nem toque" description="Só texto e anel." progress={1} />
    </Stack>
  ),
}

export const Carregando: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <DetailedListItem title="Carregando" loading />
      <DetailedListItem title="Carregando com mídia" media={<Cover />} loading />
    </Stack>
  ),
}
