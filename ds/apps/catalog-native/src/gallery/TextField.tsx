import { createStyles, Stack, Text, TextField, type TextFieldProps } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const VARIANTS = ['underline', 'filled'] as const

/** Campo controlado: cada estado do catálogo digita de verdade. */
function Field({ initial = '', ...props }: { initial?: string } & Omit<TextFieldProps, 'value' | 'onChangeText'>) {
  const [value, setValue] = useState(initial)
  return <TextField {...props} value={value} onChangeText={setValue} />
}

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  narrow: { width: 240 },
  content: { padding: t.density.space.md, gap: t.density.space.xl, paddingBottom: t.density.space.huge * 4 },
}))

function TextFieldScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      {VARIANTS.map((variant) => (
        <Stack key={variant} gap="lg">
          <Text variant="xs" color="textMuted" label>{variant}</Text>
          <Field variant={variant} label="E-mail" placeholder="voce@exemplo.com" helper="Toque para focar; o rótulo sobe." keyboardType="email-address" />
          <Field variant={variant} label="E-mail" initial="ana@exemplo.com" />
          <Field variant={variant} label="E-mail" initial="ana@exemplo" error="Informe um e-mail válido." />
          <Field variant={variant} label="E-mail" initial="ana@exemplo.com" disabled />
        </Stack>
      ))}
      <Stack gap="lg">
        <Text variant="xs" color="textMuted" label>senha e limpável</Text>
        <Field label="Senha" initial="segredo123" secure autoComplete="current-password" />
        <Field label="Buscar" initial="supino" clearable trailingIcon="search" variant="filled" />
        <Field label="Buscar" placeholder="Digite para buscar" clearable trailingIcon="search" />
      </Stack>
      <Stack gap="lg">
        <Text variant="xs" color="textMuted" label>sem rótulo</Text>
        <Field placeholder="Buscar exercício" />
        <Field placeholder="Buscar exercício" variant="filled" />
      </Stack>
      <Stack gap="lg" style={s.narrow}>
        <Text variant="xs" color="textMuted" label>rótulo longo (largura estreita: empilha)</Text>
        <Field label="Como você prefere que a equipe entre em contato com você?" placeholder="E-mail ou telefone" helper="Responda como achar melhor." />
        <Field label="Como você prefere que a equipe entre em contato com você?" initial="ana@exemplo.com" variant="filled" error="Informe um contato válido." />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'text-field', title: 'TextField', group: 'primitivos', Screen: TextFieldScreen } satisfies GalleryEntry
