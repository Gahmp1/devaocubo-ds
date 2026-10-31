import { Box, createStyles, ListItem, Text } from '@gahmp1/ds-native'
import { useDS } from '@gahmp1/ds-core'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

const OPTIONS = ['Quilogramas', 'Libras', 'Lado do corpo'] as const
const LONG = 'Um título bem longo que precisa quebrar em várias linhas sem ser cortado nem empurrar o elemento à direita'

function ListItemScreen() {
  const s = useStyles()
  const { Icon, theme } = useDS()
  const [picked, setPicked] = useState<string>(OPTIONS[0])
  const icon = <Icon name="info" size={theme.icon.size.md} color={theme.color.textMuted} strokeWidth={theme.icon.strokeWidth} />
  const none = () => undefined
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>simples e com subtítulo</Text>
      <Box surface="surface1" radius="lg">
        <ListItem title="Título simples" />
        <ListItem title="Com subtítulo" subtitle="Texto de apoio em tom discreto" />
      </Box>
      <Text variant="xs" color="textMuted" label>com ícone e chevron (pressionável)</Text>
      <Box surface="surface1" radius="lg">
        <ListItem title="Notificações" subtitle="Avisos do treino" leading={icon} trailing="chevron" onPress={none} interactionId="gallery-list-item" />
        <ListItem title="Só o chevron" trailing="chevron" onPress={none} />
        <ListItem title="Trailing próprio" trailing={<Text variant="sm" color="textMuted">42 kg</Text>} />
      </Box>
      <Text variant="xs" color="textMuted" label>selecionado (cobre o SheetRow)</Text>
      <Box surface="surface1" radius="lg">
        {OPTIONS.map((o) => (
          <ListItem key={o} title={o} selected={picked === o} onPress={() => setPicked(o)} />
        ))}
      </Box>
      <Text variant="xs" color="textMuted" label>carregando</Text>
      <Box surface="surface1" radius="lg">
        <ListItem title="Carregando" loading />
        <ListItem title="Carregando com ícone" leading={icon} loading />
      </Box>
      <Text variant="xs" color="textMuted" label>título longo quebrando</Text>
      <Box surface="surface1" radius="lg">
        <ListItem title={LONG} subtitle="Subtítulo também quebra quando passa da largura disponível na linha" leading={icon} trailing="chevron" onPress={none} />
      </Box>
    </ScrollView>
  )
}

export default { id: 'list-item', title: 'ListItem', group: 'composição', Screen: ListItemScreen } satisfies GalleryEntry
