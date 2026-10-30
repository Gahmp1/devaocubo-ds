import { Button, Stack, Text } from '@gahmp1/ds-web'
import { NumberTicker } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useEffect, useState } from 'react'

const meta: Meta = { title: 'Movimento/NumberTicker' }
export default meta

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/** Só as casas que mudam rolam; movimento reduzido (barra Movimento) troca direto. */
export const Contando: StoryObj = {
  render: function Render() {
    const [n, setN] = useState(0)
    useEffect(() => {
      const id = setInterval(() => setN((v) => v + 7), 800)
      return () => clearInterval(id)
    }, [])
    return (
      <Stack gap="sm" style={{ padding: 24 }}>
        <NumberTicker value={n} variant="display" />
      </Stack>
    )
  },
}

function Stepper({ trend, step }: { trend: 'up' | 'down' | 'auto'; step: number }) {
  const [n, setN] = useState(120)
  return (
    <Stack gap="md" style={{ padding: 24 }}>
      <Text variant="xs" color="textMuted" label>trend {trend}</Text>
      <NumberTicker value={n} trend={trend} variant="display" />
      <Stack direction="row" gap="sm">
        <Button title="-" variant="surface" onPress={() => setN((v) => v - step)} />
        <Button title="+" variant="surface" onPress={() => setN((v) => v + step)} />
      </Stack>
    </Stack>
  )
}

export const Subindo: StoryObj = { render: () => <Stepper trend="up" step={37} /> }

export const Descendo: StoryObj = { render: () => <Stepper trend="down" step={37} /> }

export const FormatoMoeda: StoryObj = {
  render: function Render() {
    const [n, setN] = useState(1234.5)
    return (
      <Stack gap="md" style={{ padding: 24 }}>
        <NumberTicker value={n} format={brl.format} variant="display" />
        <Stack direction="row" gap="sm">
          <Button title="-" variant="surface" onPress={() => setN((v) => v - 249.9)} />
          <Button title="+" variant="surface" onPress={() => setN((v) => v + 249.9)} />
        </Stack>
      </Stack>
    )
  },
}
