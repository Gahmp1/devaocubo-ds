import { createStyles, DataList, Text } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

const ITEMS = [
  {
    key: 'a',
    title: 'Treino de peito',
    values: [
      { label: 'Duração', value: '52 min' },
      { label: 'Volume', value: '7.420 kg' },
      { label: 'Séries', value: '18' },
    ],
  },
  {
    key: 'b',
    title: 'Treino de costas e bíceps com uma descrição bem longa para quebrar linha',
    values: [
      { label: 'Observação do treinador sobre a execução', value: 'Manter a escápula retraída durante toda a remada, sem balançar o tronco' },
      { label: 'Duração', value: '1 h 04 min' },
    ],
  },
  { key: 'c', title: 'Descanso ativo', values: [{ label: 'Caminhada', value: '30 min' }] },
]

function DataListScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>3 itens (um com texto longo quebrando)</Text>
      <DataList items={ITEMS} />
      <Text variant="xs" color="textMuted" label>vazio</Text>
      <DataList items={[]} empty={<Text color="textMuted">Nenhum treino registrado.</Text>} />
    </ScrollView>
  )
}

export default { id: 'data-list', title: 'DataList', group: 'composição', Screen: DataListScreen } satisfies GalleryEntry
