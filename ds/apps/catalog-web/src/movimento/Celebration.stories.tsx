import { Button, Stack, Text } from '@gahmp1/ds-web'
import { Celebration } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Movimento/Celebration' }
export default meta

/** "Celebrar" liga `active`: fundo de sucesso, confete uma vez e o som/haptic `complete`. Movimento reduzido: só o fundo. */
export const UmaExecucao: StoryObj = {
  render: function Render() {
    const [active, setActive] = useState(false)
    const [done, setDone] = useState(0)
    return (
      <div style={{ position: 'relative', height: 420, margin: 16, overflow: 'hidden', borderRadius: 16 }}>
        <Celebration active={active} onDone={() => setDone((n) => n + 1)} />
        <Stack gap="md" align="center" justify="center" style={{ position: 'relative', height: '100%' }}>
          <Text variant="lg">onDone: {done}</Text>
          <Button title={active ? 'Reiniciar' : 'Celebrar'} variant="surface" onPress={() => setActive((a) => !a)} />
        </Stack>
      </div>
    )
  },
}
