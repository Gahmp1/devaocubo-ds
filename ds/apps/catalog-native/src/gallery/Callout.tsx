import { Callout, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
}))

function CalloutScreen() {
  const s = useStyles()
  const [open, setOpen] = useState(true)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">O bico aponta para o alvo da dica; o fechar só aparece quando o app passa onClose.</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>sem fechar, bico embaixo (padrão)</Text>
        <Callout>Toque duas vezes na série para editar o peso.</Callout>
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>com título e fechar, bico em cima</Text>
        {open ? (
          <Callout placement="top" title="Dica" onClose={() => setOpen(false)}>
            Arraste o cartão para o lado para pular o exercício, ou segure para reordenar a lista inteira do treino.
          </Callout>
        ) : (
          <Text variant="sm" color="textMuted" onPress={() => setOpen(true)}>Dica fechada. Toque para mostrar de novo.</Text>
        )}
      </Stack>
    </ScrollView>
  )
}

export default { id: 'callout', title: 'Callout', group: 'composição', Screen: CalloutScreen } satisfies GalleryEntry
