import { LineChart, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Composição/LineChart' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const

const LOAD = [60, 62.5, 62.5, 65, 67.5, 66, 70, 72.5].map((y, x) => ({ x, y }))

/** A linha se desenha ao entrar; com movimento reduzido aparece pronta. */
export const Linha: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <LineChart data={LOAD} />
    </Stack>
  ),
}

export const Area: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <LineChart data={LOAD} area height={200} />
    </Stack>
  ),
}

/** Sem dados: mostra o `emptyText`. */
export const Vazio: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <LineChart data={[]} emptyText="Registre um treino para ver a evolução" />
    </Stack>
  ),
}

/** Carregando: uma linha de espera que respira (a opacidade pulsa). */
export const Carregando: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <LineChart data={[]} loading />
    </Stack>
  ),
}
