import { Button, createStyles, Stack, Text, useToast } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function ToastScreen() {
  const s = useStyles()
  const { show } = useToast()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">O toast aparece no topo, um por vez; arraste para cima para dispensar. Sucesso e perigo tocam o feedback do tema; o leitor de tela anuncia sem tirar o foco.</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>três tons</Text>
        <Button title="Neutro" variant="outline" onPress={() => show({ title: 'Rascunho salvo' })} />
        <Button title="Sucesso" variant="outline" onPress={() => show({ title: 'Treino salvo', description: 'Ele já aparece no seu histórico.', tone: 'success' })} />
        <Button title="Perigo" variant="outline" onPress={() => show({ title: 'Não foi possível salvar', description: 'Verifique a conexão e tente de novo.', tone: 'danger' })} />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>com ação e título longo</Text>
        <Button
          title="Com ação"
          variant="outline"
          onPress={() =>
            show({
              title: 'Série removida, com um título comprido o bastante para precisar quebrar linha sem cortar',
              tone: 'neutral',
              action: { label: 'Desfazer', onPress: () => show({ title: 'Série restaurada', tone: 'success', durationMs: 2000 }) },
            })
          }
        />
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>fila de três (um visível por vez)</Text>
        <Button
          title="Enfileirar três"
          variant="outline"
          onPress={() => {
            show({ title: 'Primeiro', description: 'Aparece agora.', durationMs: 2500 })
            show({ title: 'Segundo', tone: 'success', durationMs: 2500 })
            show({ title: 'Terceiro', tone: 'danger', durationMs: 2500 })
          }}
        />
      </Stack>
    </ScrollView>
  )
}

export default { id: 'toast', title: 'Toast', group: 'composição', Screen: ToastScreen } satisfies GalleryEntry
