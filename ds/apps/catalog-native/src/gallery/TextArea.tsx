import { createStyles, Stack, Text, TextArea, type TextAreaProps } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

function Area({ initial = '', ...props }: { initial?: string } & Omit<TextAreaProps, 'value' | 'onChangeText'>) {
  const [value, setValue] = useState(initial)
  return <TextArea {...props} value={value} onChangeText={setValue} />
}

const LONG = Array.from({ length: 14 }, (_, i) => `Linha ${i + 1} do texto`).join('\n')

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl, paddingBottom: t.density.space.huge * 4 },
}))

function TextAreaScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <Stack gap="lg">
        <Text variant="xs" color="textMuted" label>vazio</Text>
        <Area label="Observações" placeholder="Algo que devemos saber?" helper="Opcional." />
        <Area label="Observações" placeholder="Algo que devemos saber?" variant="filled" />
      </Stack>
      <Stack gap="lg">
        <Text variant="xs" color="textMuted" label>crescendo (digite várias linhas)</Text>
        <Area label="Notas (3 a 6 linhas)" initial={LONG} minRows={3} maxRows={6} />
        <Area label="Notas (padrão 3 a 8)" initial={'Uma linha\nDuas linhas'} variant="filled" />
      </Stack>
      <Stack gap="lg">
        <Text variant="xs" color="textMuted" label>erro e desabilitado</Text>
        <Area label="Observações" initial="oi" error="Escreva pelo menos 10 caracteres." />
        <Area label="Observações" initial="oi" error="Escreva pelo menos 10 caracteres." variant="filled" />
        <Area label="Observações" initial="Bloqueado" disabled />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'text-area', title: 'TextArea', group: 'primitivos', Screen: TextAreaScreen } satisfies GalleryEntry
