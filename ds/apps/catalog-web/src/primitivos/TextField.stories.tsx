import { Stack, Text, TextField, type TextFieldProps } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Primitivos/TextField' }
export default meta

/** Campo controlado: cada estado do catálogo digita de verdade. */
function Field({ initial = '', ...props }: { initial?: string } & Omit<TextFieldProps, 'value' | 'onChangeText'>) {
  const [value, setValue] = useState(initial)
  return <TextField {...props} value={value} onChangeText={setValue} />
}

const frame = { padding: 24, maxWidth: 420, background: 'var(--ds-color-bg)' }
const VARIANTS = ['underline', 'filled'] as const

/** Linhas por variante: vazio, rótulo flutuando (preenchido), foco (clique), erro e desabilitado. */
export const Estados: StoryObj = {
  render: () => (
    <Stack gap="xl" style={frame}>
      {VARIANTS.map((variant) => (
        <Stack key={variant} gap="lg">
          <Text variant="xs" color="textMuted" label>{variant}</Text>
          <Field variant={variant} label="E-mail" placeholder="voce@exemplo.com" helper="Usamos só para entrar." />
          <Field variant={variant} label="E-mail" initial="ana@exemplo.com" />
          <Field variant={variant} label="E-mail" initial="ana@exemplo" error="Informe um e-mail válido." />
          <Field variant={variant} label="E-mail" initial="ana@exemplo.com" disabled />
        </Stack>
      ))}
    </Stack>
  ),
}

export const Foco: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Field label="Nome" placeholder="Como você se chama?" autoFocus />
    </Stack>
  ),
}

export const SenhaELimpavel: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Field label="Senha" initial="segredo123" secure autoComplete="current-password" />
      <Field label="Buscar" initial="supino" clearable trailingIcon="search" variant="filled" />
      <Field label="Buscar" placeholder="Digite para buscar" clearable trailingIcon="search" />
    </Stack>
  ),
}

/** Sem rótulo: o placeholder fica sempre visível. */
export const SemRotulo: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Field placeholder="Buscar exercício" />
      <Field placeholder="Buscar exercício" variant="filled" />
    </Stack>
  ),
}
