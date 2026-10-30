import { FilterChip, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/FilterChip' }
export default meta

const OPTIONS = ['Peito', 'Costas', 'Pernas', 'Ombros', 'Braços']

function Group() {
  const [on, setOn] = useState(['Costas', 'Ombros'])
  return (
    <Stack gap="sm" style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      <Stack direction="row" gap="xs" wrap>
        {OPTIONS.map((label) => (
          <FilterChip key={label} label={label} selected={on.includes(label)} onPress={(next) => setOn(next ? [...on, label] : on.filter((o) => o !== label))} />
        ))}
      </Stack>
      <Text variant="xs" color="textMuted">Selecionados: {on.join(', ') || 'nenhum'}</Text>
    </Stack>
  )
}

/** Grupo de cinco com dois selecionados; cada toque alterna (o ✓ entra e sai). */
export const Grupo: StoryObj = { render: () => <Group /> }

/** Desabilitado, nos dois estados. */
export const Desabilitado: StoryObj = {
  render: () => (
    <Stack direction="row" gap="xs" style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      <FilterChip label="Desligado" selected={false} onPress={() => {}} disabled />
      <FilterChip label="Ligado" selected onPress={() => {}} disabled />
    </Stack>
  ),
}
