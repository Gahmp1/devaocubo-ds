import { Stack, Text } from '@gahmp1/ds-web'
import { Shimmer } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/Shimmer' }
export default meta

/** Parado quando `active` é falso ou o movimento está reduzido (barra Movimento). */
export const SobreBloco: StoryObj = {
  render: function Render() {
    const [active, setActive] = useState(true)
    return (
      <Stack gap="md" style={{ padding: 24, maxWidth: 360 }}>
        <button onClick={() => setActive((a) => !a)}>{active ? 'parar' : 'ativar'}</button>
        <Shimmer active={active} radius="md">
          <div style={{ height: 96, background: 'var(--ds-color-surface2)' }} />
        </Shimmer>
      </Stack>
    )
  },
}

export const SobreTexto: StoryObj = {
  render: () => (
    <Stack gap="md" style={{ padding: 24, maxWidth: 360 }}>
      <Shimmer radius="sm">
        <Text variant="lg" color="textMuted">Pensando no seu treino…</Text>
      </Shimmer>
    </Stack>
  ),
}
