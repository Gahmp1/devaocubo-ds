// Referência: agent-chat widgets/table (RN), em formato de lista: cada linha da tabela vira um cartão com os pares rótulo/valor.
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { Text } from '../../primitives/Text/index.js'
import { Card } from '../Card/index.js'

export type DataListItem = { key: string; title: string; values: { label: string; value: string }[] }

export type DataListProps = {
  items: DataListItem[]
  /** Mostrado no lugar da lista quando `items` está vazio. */
  empty?: ReactNode
}

const useStyles = createStyles((t) => ({
  list: { alignSelf: 'stretch', gap: t.density.space.sm },
  pair: { flexDirection: 'row', alignItems: 'flex-start', gap: t.density.space.md },
}))

/** Sem rolagem própria: quem usa põe a lista num `ScrollView`/`FlatList`. Cada item é um só elemento para o leitor de tela. */
export function DataList({ items, empty }: DataListProps) {
  const s = useStyles()
  if (items.length === 0) return <>{empty}</>
  return (
    <View style={s.list}>
      {items.map(({ key, title, values }) => (
        <View key={key} accessible accessibilityLabel={[title, ...values.map((v) => `${v.label}: ${v.value}`)].join(', ')}>
          <Card padding="md">
            <Text variant="lgMedium">{title}</Text>
            {values.map((v, i) => (
              <View key={`${i}-${v.label}`} style={s.pair}>
                <Text variant="sm" color="textMuted" style={{ flex: 1 }}>{v.label}</Text>
                <Text variant="sm" style={{ flex: 1, textAlign: 'right' }}>{v.value}</Text>
              </View>
            ))}
          </Card>
        </View>
      ))}
    </View>
  )
}
