import { Button, Metric, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/Metric' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function Stepper({ trend, step }: { trend: 'up' | 'down'; step: number }) {
  const [n, setN] = useState(1280)
  return (
    <Stack gap="md" style={frame}>
      <Metric label="Receita do mês" value={n} format={brl.format} trend={trend} />
      <Metric label="Peso" value={n / 20} unit="kg" trend={trend} />
      <Stack direction="row" gap="sm">
        <Button title="-" variant="surface" onPress={() => setN((v) => v - step)} />
        <Button title="+" variant="surface" onPress={() => setN((v) => v + step)} />
      </Stack>
    </Stack>
  )
}

/** Tendência de alta: ícone para cima e o número rola por baixo. */
export const Subindo: StoryObj = { render: () => <Stepper trend="up" step={137} /> }

/** Tendência de queda. */
export const Descendo: StoryObj = { render: () => <Stepper trend="down" step={137} /> }
