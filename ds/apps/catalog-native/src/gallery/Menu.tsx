import { Button, createStyles, Menu, Stack, Text, type MenuItem } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function MenuScreen() {
  const s = useStyles()
  const [last, setLast] = useState('nenhuma')
  const pick = (key: string) => () => setLast(key)
  const items: (MenuItem | 'separator')[] = [
    { key: 'edit', label: 'Editar treino', icon: 'file', onSelect: pick('editar') },
    { key: 'share', label: 'Compartilhar', icon: 'link', onSelect: pick('compartilhar') },
    'separator',
    { key: 'delete', label: 'Apagar treino', icon: 'close', destructive: true, onSelect: pick('apagar') },
  ]
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">O gatilho é só visual: o Menu o envolve num botão. Escolher um item fecha a gaveta e chama o onSelect.</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>com separador e item destrutivo</Text>
        <Menu trigger={<Button title="Opções do treino" variant="outline" icon="more" onPress={() => undefined} />} items={items} />
        <Text variant="sm" color="textMuted">Última ação: {last}</Text>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'menu', title: 'Menu', group: 'composição', Screen: MenuScreen } satisfies GalleryEntry
