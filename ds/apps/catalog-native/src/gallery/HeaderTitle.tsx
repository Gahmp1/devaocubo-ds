import { Button, createStyles, HeaderTitle, IconButton, Text } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function HeaderTitleScreen() {
  const s = useStyles()
  const none = () => undefined
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>grande (large)</Text>
      <HeaderTitle title="Treinos" subtitle="Sua semana em um lugar" size="large" />
      <Text variant="xs" color="textMuted" label>compacto (compact)</Text>
      <HeaderTitle title="Treinos" subtitle="Sua semana em um lugar" size="compact" />
      <Text variant="xs" color="textMuted" label>padrão do tema, sem subtítulo</Text>
      <HeaderTitle title="Padrão do tema" />
      <Text variant="xs" color="textMuted" label>com ações</Text>
      <HeaderTitle
        title="Configurações"
        leading={<IconButton icon="chevron-left" accessibilityLabel="Voltar" onPress={none} />}
        trailing={<Button title="Salvar" size="small" onPress={none} />}
      />
      <HeaderTitle title="Título muito longo que precisa quebrar em várias linhas sem empurrar as ações" subtitle="Subtítulo longo também quebra de linha quando falta largura" trailing={<IconButton icon="more" accessibilityLabel="Mais" onPress={none} />} />
      <Text variant="xs" color="textMuted" label>carregando</Text>
      <HeaderTitle title="Carregando" subtitle="Carregando" loading />
      <HeaderTitle title="Carregando compacto" size="compact" loading />
    </ScrollView>
  )
}

export default { id: 'header-title', title: 'HeaderTitle', group: 'composição', Screen: HeaderTitleScreen } satisfies GalleryEntry
