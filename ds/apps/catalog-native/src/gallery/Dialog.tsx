import { Button, createStyles, Dialog, Sheet, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function DialogScreen() {
  const s = useStyles()
  const [normal, setNormal] = useState(false)
  const [destructive, setDestructive] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [over, setOver] = useState(false)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">O voltar do Android e o toque no fundo fecham o diálogo; o leitor de tela lê o título ao abrir.</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>abrir cada diálogo</Text>
        <Button title="Normal" variant="outline" onPress={() => setNormal(true)} />
        <Button title="Destrutivo" variant="outline" onPress={() => setDestructive(true)} />
        <Button title="Sobre uma gaveta" variant="outline" onPress={() => setSheet(true)} />
      </Stack>

      <Dialog
        open={normal}
        onClose={() => setNormal(false)}
        title="Encerrar treino?"
        description="Os exercícios já feitos ficam salvos."
        actions={
          <>
            <Button title="Cancelar" variant="ghost" onPress={() => setNormal(false)} />
            <Button title="Encerrar" onPress={() => setNormal(false)} />
          </>
        }
      />
      <Dialog
        open={destructive}
        onClose={() => setDestructive(false)}
        title="Apagar treino?"
        description="Esta ação não pode ser desfeita."
        destructive
        actions={
          <>
            <Button title="Cancelar" variant="ghost" onPress={() => setDestructive(false)} />
            <Button title="Apagar" variant="danger" onPress={() => setDestructive(false)} />
          </>
        }
      />
      <Sheet open={sheet} onClose={() => setSheet(false)} title="Treino de peito">
        <Stack gap="md">
          <Text>Voltar do Android com o diálogo aberto fecha só o diálogo; a gaveta continua.</Text>
          <Button title="Apagar treino" variant="danger" fullWidth onPress={() => setOver(true)} />
        </Stack>
        <Dialog
          open={over}
          onClose={() => setOver(false)}
          title="Apagar treino?"
          description="A gaveta fica aberta por baixo."
          destructive
          actions={
            <>
              <Button title="Cancelar" variant="ghost" onPress={() => setOver(false)} />
              <Button title="Apagar" variant="danger" onPress={() => { setOver(false); setSheet(false) }} />
            </>
          }
        />
      </Sheet>
    </ScrollView>
  )
}

export default { id: 'dialog', title: 'Dialog', group: 'composição', Screen: DialogScreen } satisfies GalleryEntry
