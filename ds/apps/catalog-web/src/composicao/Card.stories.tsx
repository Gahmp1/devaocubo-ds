import { Card, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/Card' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const

function Body({ title }: { title: string }) {
  return (
    <Stack gap="xs">
      <Text variant="baseMedium">{title}</Text>
      <Text variant="sm" color="textMuted">Treino de pernas, 45 min</Text>
    </Stack>
  )
}

/** Os quatro tipos; `elevated` só ganha sombra quando o tema usa `depth.model = shadow`. */
export const Tipos: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <Card type="fill"><Body title="fill" /></Card>
      <Card type="outline"><Body title="outline" /></Card>
      <Card type="elevated"><Body title="elevated" /></Card>
      <Card type="ghost"><Body title="ghost" /></Card>
    </Stack>
  ),
}

/** Com cabeçalho e rodapé, e sem `type` (usa `components.card.type` do tema). */
export const Slots: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <Card header={<Text variant="smMedium" color="textMuted" label>Hoje</Text>} footer={<Text variant="xs" color="textSubtle">Atualizado agora</Text>}>
        <Body title="Tipo do tema" />
      </Card>
    </Stack>
  ),
}

/** Pressionável: vira botão, com foco visível e toque do tema. */
export const Pressionavel: StoryObj = {
  render: function Render() {
    const [taps, setTaps] = useState(0)
    return (
      <Stack gap="md" style={frame}>
        <Card onPress={() => setTaps(taps + 1)} interactionId="card.demo">
          <Body title="Toque aqui" />
        </Card>
        <Text variant="xs" color="textMuted">Toques: {taps}</Text>
      </Stack>
    )
  },
}

/** Selecionado, pressionável e não. */
export const Selecionado: StoryObj = {
  render: function Render() {
    const [on, setOn] = useState(true)
    return (
      <Stack gap="md" style={frame}>
        <Card selected={on} onPress={() => setOn(!on)}><Body title="Alterna ao tocar" /></Card>
        <Card type="outline" selected><Body title="Outline selecionado" /></Card>
        <Card type="elevated" selected padding="xl"><Body title="Elevated, padding xl" /></Card>
      </Stack>
    )
  },
}
