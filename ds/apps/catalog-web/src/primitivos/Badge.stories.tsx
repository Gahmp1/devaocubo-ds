import { Badge, IconButton, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/Badge' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)' } as const
const TONES = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] as const
const noop = () => {}

/** Número, 99+, ponto e os seis tons (sem âncora, em linha). */
export const Variacoes: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <Stack direction="row" gap="md" align="center">
        <Badge count={3} /><Badge count={42} /><Badge count={99} /><Badge count={100} /><Badge count={1200} /><Badge dot />
      </Stack>
      <Stack direction="row" gap="md" align="center">
        {TONES.map((tone) => <Badge key={tone} count={7} tone={tone} />)}
      </Stack>
      <Stack direction="row" gap="md" align="center">
        {TONES.map((tone) => <Badge key={tone} dot tone={tone} />)}
      </Stack>
    </Stack>
  ),
}

function Anchored() {
  const [count, setCount] = useState(8)
  return (
    <Stack gap="md" style={frame}>
      <Stack direction="row" gap="xl" align="center">
        <Badge count={count}><IconButton icon="info" accessibilityLabel="Avisos" variant="outline" onPress={noop} /></Badge>
        <Badge dot><IconButton icon="send" accessibilityLabel="Mensagens" variant="outline" onPress={noop} /></Badge>
        <Badge count={0}><IconButton icon="file" accessibilityLabel="Sem avisos" variant="outline" onPress={noop} /></Badge>
      </Stack>
      <Stack direction="row" gap="xs">
        <IconButton icon="minus" accessibilityLabel="Diminuir" variant="filled" onPress={() => setCount(Math.max(0, count - 1))} />
        <IconButton icon="plus" accessibilityLabel="Aumentar" variant="filled" onPress={() => setCount(count + 1)} />
        <IconButton icon="arrow-down" accessibilityLabel="Ir para 99" variant="filled" onPress={() => setCount(99)} />
      </Stack>
      <Text variant="xs" color="textMuted">A troca de número rola (seca com movimento reduzido); zero some; acima de 99 vira 99+.</Text>
    </Stack>
  )
}

/** Sobre ícone, com contagem que troca. */
export const SobreIcone: StoryObj = { render: () => <Anchored /> }
