import { Divider, ListItem, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/ListItem' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const
const noop = () => {}

export const Simples: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <ListItem title="Peito e tríceps" />
      <Divider />
      <ListItem title="Com subtítulo" subtitle="4 exercícios, 45 min" />
    </Stack>
  ),
}

export const ComIcone: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <ListItem title="Buscar exercício" subtitle="Biblioteca" leading={<Text color="accent">★</Text>} onPress={noop} />
    </Stack>
  ),
}

export const Chevron: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <ListItem title="Preferências" trailing="chevron" onPress={noop} interactionId="list.preferences" />
      <Divider />
      <ListItem title="Trailing livre" trailing={<Text variant="sm" color="textMuted">kg</Text>} onPress={noop} />
    </Stack>
  ),
}

/** Cobre o `SheetRow` do Zenith: o espaço do check é reservado quando `selected` existe. */
export const Selecionado: StoryObj = {
  render: function Render() {
    const [value, setValue] = useState('kg')
    return (
      <Stack style={frame}>
        {['kg', 'lb', 'st'].map((unit) => (
          <ListItem key={unit} title={unit} selected={value === unit} onPress={() => setValue(unit)} />
        ))}
      </Stack>
    )
  },
}

export const Carregando: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <ListItem title="Carregando" loading />
    </Stack>
  ),
}

/** O título quebra em várias linhas, nunca é cortado. */
export const TituloLongo: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <ListItem
        title="Levantamento terra romeno com pegada alternada e pausa de dois segundos no ponto mais baixo da amplitude"
        subtitle="Posterior de coxa"
        trailing="chevron"
        onPress={noop}
      />
    </Stack>
  ),
}
