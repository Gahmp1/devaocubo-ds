import { Button, Card, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const TYPES = ['fill', 'outline', 'elevated', 'ghost'] as const

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function Body({ title }: { title: string }) {
  return (
    <Stack gap="xxs">
      <Text variant="baseMedium">{title}</Text>
      <Text variant="sm" color="textMuted">Conteúdo do cartão, com texto que quebra linha quando falta espaço na largura.</Text>
    </Stack>
  )
}

function CardScreen() {
  const s = useStyles()
  const [presses, setPresses] = useState(0)
  const [picked, setPicked] = useState(true)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>tipos</Text>
      {TYPES.map((type) => (
        <Card key={type} type={type}>
          <Body title={type} />
        </Card>
      ))}
      <Text variant="xs" color="textMuted" label>padrão do tema (sem type)</Text>
      <Card>
        <Body title="type do tema" />
      </Card>
      <Text variant="xs" color="textMuted" label>pressionável</Text>
      <Card onPress={() => setPresses((n) => n + 1)} interactionId="gallery-card">
        <Body title={`Toques: ${presses}`} />
      </Card>
      <Text variant="xs" color="textMuted" label>selecionado (toque alterna)</Text>
      <Stack gap="sm">
        {TYPES.map((type) => (
          <Card key={type} type={type} selected={picked} onPress={() => setPicked((v) => !v)}>
            <Body title={`${type} selecionável`} />
          </Card>
        ))}
      </Stack>
      <Text variant="xs" color="textMuted" label>cabeçalho, rodapé e padding sm</Text>
      <Card
        type="elevated"
        padding="sm"
        header={<Text variant="smMedium" color="textMuted" label>Treino de hoje</Text>}
        footer={<Button title="Começar" variant="primary" onPress={() => undefined} />}
      >
        <Body title="Peito e tríceps" />
      </Card>
    </ScrollView>
  )
}

export default { id: 'card', title: 'Card', group: 'composição', Screen: CardScreen } satisfies GalleryEntry
