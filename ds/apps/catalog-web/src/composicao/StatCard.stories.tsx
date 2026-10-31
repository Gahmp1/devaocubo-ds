import { Stack, StatCard } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Composição/StatCard' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const

/** Minigráfico simples em SVG; a cor vem do tema. */
function Spark() {
  return (
    <svg viewBox="0 0 100 32" width="100%" height="32" preserveAspectRatio="none" aria-hidden>
      <polyline points="0,26 14,22 28,24 42,14 56,17 70,8 84,10 100,2" fill="none" stroke="var(--ds-color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** As três direções: a direção aparece no ícone, não só na cor. */
export const ComDelta: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <StatCard label="Sessões" value={24} icon="success" delta={{ value: '+12%', direction: 'up' }} />
      <StatCard label="Carga média" value="82 kg" icon="info" delta={{ value: '-3%', direction: 'down' }} />
      <StatCard label="Sequência" value="6 dias" icon="warning" delta={{ value: '0%', direction: 'flat' }} />
    </Stack>
  ),
}

export const SemDelta: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <StatCard label="Treinos no mês" value={18} />
      <StatCard label="Com ícone" value="1.240 kcal" icon="info" />
    </Stack>
  ),
}

export const ComMinigrafico: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <StatCard label="Volume semanal" value="12,4 t" icon="info" delta={{ value: '+8%', direction: 'up' }} chart={<Spark />} />
    </Stack>
  ),
}
