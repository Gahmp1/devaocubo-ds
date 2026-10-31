import { Stack, TextArea, type TextAreaProps } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/TextArea' }
export default meta

function Area({ initial = '', ...props }: { initial?: string } & Omit<TextAreaProps, 'value' | 'onChangeText'>) {
  const [value, setValue] = useState(initial)
  return <TextArea {...props} value={value} onChangeText={setValue} />
}

const frame = { padding: 24, maxWidth: 420, background: 'var(--ds-color-bg)' }
const LONG = Array.from({ length: 14 }, (_, i) => `Linha ${i + 1} do texto`).join('\n')

export const Vazio: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Area label="Observações" placeholder="Algo que devemos saber?" helper="Opcional." />
      <Area label="Observações" placeholder="Algo que devemos saber?" variant="filled" />
    </Stack>
  ),
}

/** Digite várias linhas: a altura cresce de `minRows` até `maxRows` e depois rola. */
export const Crescendo: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Area label="Notas (3 a 6 linhas)" initial={LONG} minRows={3} maxRows={6} />
      <Area label="Notas (padrão 3 a 8)" initial={'Uma linha\nDuas linhas'} variant="filled" />
    </Stack>
  ),
}

export const Erro: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Area label="Observações" initial="oi" error="Escreva pelo menos 10 caracteres." />
      <Area label="Observações" initial="oi" error="Escreva pelo menos 10 caracteres." variant="filled" />
      <Area label="Observações" initial="Bloqueado" disabled />
    </Stack>
  ),
}
