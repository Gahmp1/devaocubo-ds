import { Box, createStyles, DetailedListItem, Text } from '@gahmp1/ds-native'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
  media: { width: 56, height: 56, borderRadius: t.shape.radius.md, backgroundColor: t.color.surface3 },
}))

function DetailedListItemScreen() {
  const s = useStyles()
  const media = <View style={s.media} />
  const none = () => undefined
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>completo (mídia, descrição, anel, chevron)</Text>
      <Box surface="surface1" radius="lg">
        <DetailedListItem
          title="Treino de peito"
          subtitle="Quarta-feira"
          description="Supino reto, supino inclinado, crucifixo e tríceps na polia."
          media={media}
          progress={0.6}
          trailing="chevron"
          onPress={none}
          interactionId="gallery-detailed"
        />
      </Box>
      <Text variant="xs" color="textMuted" label>sem pressão e com anel em 0 e 1</Text>
      <Box surface="surface1" radius="lg">
        <DetailedListItem title="Não iniciado" description="Ainda sem séries registradas." progress={0} />
        <DetailedListItem title="Concluído" description="Todas as séries feitas." progress={1} selected />
      </Box>
      <Text variant="xs" color="textMuted" label>título longo quebrando</Text>
      <Box surface="surface1" radius="lg">
        <DetailedListItem
          title="Um título bem longo que precisa quebrar em várias linhas sem ser cortado pelo anel de progresso"
          description="Descrição longa que também quebra linha quando passa da largura disponível."
          media={media}
          progress={0.35}
          onPress={none}
        />
      </Box>
      <Text variant="xs" color="textMuted" label>carregando</Text>
      <Box surface="surface1" radius="lg">
        <DetailedListItem title="Carregando" media={media} loading />
        <DetailedListItem title="Carregando sem mídia" loading />
      </Box>
    </ScrollView>
  )
}

export default { id: 'detailed-list-item', title: 'DetailedListItem', group: 'composição', Screen: DetailedListItemScreen } satisfies GalleryEntry
