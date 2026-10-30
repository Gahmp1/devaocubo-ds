import { Box, Button, Stack, Text } from '@gahmp1/ds-web'
import { Reveal } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Movimento/Reveal' }
export default meta

const FROM = ['bottom', 'top', 'left', 'right', 'fade'] as const

function Card({ label }: { label: string }) {
  return (
    <Box surface="surface2" padding="md" radius="md">
      <Text>{label}</Text>
    </Box>
  )
}

/** "Repetir" remonta o grupo; movimento reduzido (barra Movimento) vira só opacidade. */
export const Entrada: StoryObj = {
  render: function Render() {
    const [run, setRun] = useState(0)
    return (
      <Stack gap="md" style={{ padding: 24, maxWidth: 360 }}>
        <Button title="Repetir" variant="surface" onPress={() => setRun((n) => n + 1)} />
        {FROM.map((from) => (
          <Reveal key={`${from}-${run}`} from={from}>
            <Card label={from} />
          </Reveal>
        ))}
      </Stack>
    )
  },
}

export const Cascata: StoryObj = {
  render: function Render() {
    const [run, setRun] = useState(0)
    return (
      <Stack gap="md" style={{ padding: 24, maxWidth: 360 }}>
        <Button title="Repetir" variant="surface" onPress={() => setRun((n) => n + 1)} />
        <Stack key={run} gap="sm">
          <Reveal stagger={90}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Card key={n} label={`item ${n}`} />
            ))}
          </Reveal>
        </Stack>
      </Stack>
    )
  },
}

export const Saida: StoryObj = {
  render: function Render() {
    const [show, setShow] = useState(true)
    return (
      <Stack gap="md" style={{ padding: 24, maxWidth: 360 }}>
        <Button title={show ? 'Esconder' : 'Mostrar'} variant="surface" onPress={() => setShow((s) => !s)} />
        <Reveal show={show} from="right">
          <Card label="sai para o lado de onde entrou" />
        </Reveal>
      </Stack>
    )
  },
}
