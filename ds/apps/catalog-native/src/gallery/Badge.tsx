import { Badge, createStyles, IconButton, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const TONES = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] as const
const noop = () => {}

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function Anchored() {
  const [count, setCount] = useState(8)
  return (
    <Stack gap="md">
      <Stack direction="row" gap="xl" align="center">
        <Badge count={count}><IconButton icon="info" accessibilityLabel="Avisos" variant="outline" onPress={noop} /></Badge>
        <Badge dot><IconButton icon="send" accessibilityLabel="Mensagens" variant="outline" onPress={noop} /></Badge>
        <Badge count={0}><IconButton icon="file" accessibilityLabel="Sem avisos" variant="outline" onPress={noop} /></Badge>
      </Stack>
      <Stack direction="row" gap="xs">
        <IconButton icon="minus" accessibilityLabel="Diminuir" variant="filled" onPress={() => setCount(Math.max(0, count - 1))} />
        <IconButton icon="plus" accessibilityLabel="Aumentar" variant="filled" onPress={() => setCount(count + 1)} />
        <IconButton icon="arrow-down" accessibilityLabel="Ir para 99" variant="filled" onPress={() => setCount(99)} />
      </Stack>
      <Text variant="xs" color="textMuted">A troca de número rola (seca com movimento reduzido); zero some; acima de 99 vira 99+.</Text>
    </Stack>
  )
}

function BadgeScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted" label>número, 99+ e ponto</Text>
      <Stack direction="row" gap="md" align="center">
        <Badge count={3} /><Badge count={42} /><Badge count={99} /><Badge count={100} /><Badge count={1200} /><Badge dot />
      </Stack>
      <Text variant="xs" color="textMuted" label>tons</Text>
      <Stack direction="row" gap="md" align="center">
        {TONES.map((tone) => <Badge key={tone} count={7} tone={tone} />)}
      </Stack>
      <Stack direction="row" gap="md" align="center">
        {TONES.map((tone) => <Badge key={tone} dot tone={tone} />)}
      </Stack>
      <Text variant="xs" color="textMuted" label>sobre ícone</Text>
      <Anchored />
    </ScrollView>
  )
}

export default { id: 'badge', title: 'Badge', group: 'primitivos', Screen: BadgeScreen } satisfies GalleryEntry
