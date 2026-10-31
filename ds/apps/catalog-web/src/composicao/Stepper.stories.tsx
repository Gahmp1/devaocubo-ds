import { Stack, Stepper, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/Stepper' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 360 } as const

function Demo({ initial, ...rest }: { initial: number; min?: number; max?: number; step?: number; format?: (n: number) => string; accessibilityLabel: string }) {
  const [value, setValue] = useState(initial)
  return <Stepper value={value} onChange={setValue} {...rest} />
}

/** Mínimo, meio e máximo: o botão do limite fica desabilitado. Teclado: setas, Home/End, PageUp/PageDown no valor. */
export const Limites: StoryObj = {
  render: () => (
    <Stack gap="xl" style={frame}>
      <Demo initial={1} min={1} max={7} accessibilityLabel="Dias por semana" />
      <Demo initial={4} min={1} max={7} accessibilityLabel="Dias por semana" />
      <Demo initial={7} min={1} max={7} accessibilityLabel="Dias por semana" />
    </Stack>
  ),
}

/** `step` e `format`: carga de 2,5 em 2,5 kg, sem erro de ponto flutuante. */
export const PassoEFormato: StoryObj = {
  render: () => (
    <Stack gap="md" style={frame}>
      <Text variant="sm" color="textMuted">Carga</Text>
      <Demo initial={20} min={0} max={200} step={2.5} format={(n) => `${n.toLocaleString('pt-BR')} kg`} accessibilityLabel="Carga em quilos" />
    </Stack>
  ),
}
