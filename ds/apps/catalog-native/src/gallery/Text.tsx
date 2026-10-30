import { createStyles, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const STEPS = ['xs', 'sm', 'base', 'lg', 'xl', 'display'] as const
const COLORS = ['text', 'textMuted', 'textSubtle', 'textDisabled', 'accent', 'onAccent', 'danger', 'warning', 'success', 'info'] as const
const LONG =
  'Um texto longo quebra em várias linhas e, com numberOfLines, termina em reticências quando passa do limite que o componente recebeu. 1.234,56 · 7.890,12 · 0.000,01'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
  onAccent: { backgroundColor: t.color.accent, padding: t.density.space.xs },
}))

function TextScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>12 variantes</Text>
        {STEPS.flatMap((v) => [
          <Text key={v} variant={v}>{v} · Treino de pernas 1.234,56</Text>,
          <Text key={`${v}M`} variant={`${v}Medium`}>{v}Medium · Treino de pernas 1.234,56</Text>,
        ])}
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>10 cores</Text>
        {COLORS.map((c) => (
          <View key={c} style={c === 'onAccent' ? s.onAccent : undefined}>
            <Text color={c}>{c}</Text>
          </View>
        ))}
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>label · mono · tabular</Text>
        <Text variant="sm" label>Rótulo sm</Text>
        <Text mono>const total = 1234.56</Text>
        <Text tabular>1111,11</Text>
        <Text tabular>8888,88</Text>
        <Text tabular={false}>1111,11</Text>
        <Text tabular={false}>8888,88</Text>
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>texto longo</Text>
        <Text>{LONG}</Text>
        <Text numberOfLines={2}>{LONG}</Text>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'text', title: 'Text', group: 'primitivos', Screen: TextScreen } satisfies GalleryEntry
