import { BarChart, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Composição/BarChart' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const

const WEEK = [
  { label: 'Seg', value: 42 },
  { label: 'Ter', value: 0 },
  { label: 'Qua', value: 55 },
  { label: 'Qui', value: 38 },
  { label: 'Sex', value: 61 },
  { label: 'Sáb', value: 27 },
  { label: 'Dom', value: 12 },
]

/** Sete barras na proporção do maior valor; o rótulo de cada uma usa `formatValue`. */
export const Semana: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <BarChart data={WEEK} formatValue={(n) => `${n} min`} />
    </Stack>
  ),
}

/** A barra de destaque fica em acento e as outras recuam. */
export const ComDestaque: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <BarChart data={WEEK} highlight={4} height={220} formatValue={(n) => `${n} min`} />
    </Stack>
  ),
}

/** Sem dados: só a linha de base. */
export const Vazio: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <BarChart data={[]} />
    </Stack>
  ),
}
