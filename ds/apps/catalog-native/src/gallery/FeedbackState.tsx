import { Feedback, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const SCREEN_HEIGHT = 380

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  frame: { height: SCREEN_HEIGHT, borderRadius: t.shape.radius.lg, borderWidth: t.shape.borderWidth.thin, borderColor: t.color.borderMuted, overflow: 'hidden' },
}))

const KINDS = [
  { kind: 'empty', title: 'Nenhum treino ainda', description: 'Crie o primeiro para ele aparecer aqui.', action: 'Criar treino' },
  { kind: 'success', title: 'Treino salvo', description: 'Ele já está no seu histórico.', action: 'Ver histórico' },
  { kind: 'error', title: 'Algo deu errado ao carregar, com um título longo que quebra linha', description: 'Verifique a conexão e tente de novo.', action: 'Tentar de novo' },
] as const

function FeedbackStateScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Três tipos em dois layouts: o de tela cheia fixa a ação embaixo; o embutido cabe dentro de um cartão ou lista.</Text>
      <Stack gap="md">
        <Text variant="xs" color="textMuted" label>embutido</Text>
        {KINDS.map((k) => (
          <Feedback key={k.kind} layout="inline" kind={k.kind} title={k.title} description={k.description} action={{ label: k.action, onPress: () => undefined }} />
        ))}
        <Feedback layout="inline" kind="empty" title="Sem ação nem descrição" />
      </Stack>
      <Stack gap="md">
        <Text variant="xs" color="textMuted" label>tela cheia (moldura de {SCREEN_HEIGHT} pt)</Text>
        {KINDS.map((k) => (
          <View key={k.kind} style={s.frame}>
            <Feedback layout="screen" kind={k.kind} title={k.title} description={k.description} action={{ label: k.action, onPress: () => undefined }} />
          </View>
        ))}
      </Stack>
    </ScrollView>
  )
}

export default { id: 'feedback-state', title: 'Feedback (estado)', group: 'composição', Screen: FeedbackStateScreen } satisfies GalleryEntry
