import { RadioGroup, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/Radio' }
export default meta

const OPTIONS = [
  { value: 'a', label: 'Hipertrofia' },
  { value: 'b', label: 'Força' },
  { value: 'c', label: 'Resistência (indisponível)', disabled: true },
]

function Demo({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial)
  return (
    <Stack style={{ padding: 24, background: 'var(--ds-color-bg)' }}>
      <RadioGroup value={value} onChange={setValue} options={OPTIONS} accessibilityLabel="Objetivo" />
    </Stack>
  )
}

/** Três opções, a última desabilitada. Setas movem a seleção; o ponto desliza até a escolhida. */
export const TresOpcoes: StoryObj = { render: () => <Demo initial="a" /> }

/** Sem seleção inicial: o ponto aparece na primeira escolha. */
export const SemSelecao: StoryObj = { render: () => <Demo initial="" /> }
