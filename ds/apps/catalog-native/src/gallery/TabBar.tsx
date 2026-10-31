import { Box, createStyles, TabBar, Text, type TabBarItem } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const ALL: TabBarItem[] = [
  { key: 'search', label: 'Buscar', icon: 'search' },
  { key: 'files', label: 'Arquivos', icon: 'file' },
  { key: 'new', label: 'Novo', icon: 'plus' },
  { key: 'info', label: 'Sobre', icon: 'info' },
  { key: 'more', label: 'Mais', icon: 'more' },
]
const VARIANTS = ['floating', 'glass', 'solid'] as const
const COUNTS = [3, 4, 5] as const
const rows = Array.from({ length: 16 }, (_, i) => i + 1)

const useStyles = createStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.md, paddingBottom: 120 },
  group: { gap: t.density.space.sm },
  over: { position: 'absolute', left: 0, right: 0, bottom: 0 },
}))

function Demo({ variant, count, badge }: { variant: (typeof VARIANTS)[number]; count: number; badge?: number }) {
  const [value, setValue] = useState('search')
  const items = ALL.slice(0, count).map((it, i) => (badge && i === 1 ? { ...it, badge } : it))
  return <TabBar items={items} value={value} onChange={setValue} variant={variant} />
}

function TabBarScreen() {
  const s = useStyles()
  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        {VARIANTS.map((v) => (
          <View key={v} style={s.group}>
            <Text variant="xs" color="textMuted" label>{v}: 3, 4 e 5 abas</Text>
            {COUNTS.map((n) => (
              <Demo key={n} variant={v} count={n} />
            ))}
          </View>
        ))}
        <Text variant="xs" color="textMuted" label>com badge (aba 2: 4 e 120)</Text>
        <Demo variant="floating" count={4} badge={4} />
        <Demo variant="solid" count={3} badge={120} />
        <Text variant="xs" color="textMuted" label>padrão do tema</Text>
        <TabBarDefault />
        <Text variant="xs" color="textMuted" label>glass sobre lista rolando (desfoque do conteúdo por baixo)</Text>
        {rows.map((n) => (
          <Box key={n} surface="surface3" padding="md" radius="md">
            <Text>linha {n}</Text>
          </Box>
        ))}
      </ScrollView>
      <View style={s.over} pointerEvents="box-none">
        <Demo variant="glass" count={4} />
      </View>
    </View>
  )
}

function TabBarDefault() {
  const [value, setValue] = useState('search')
  return <TabBar items={ALL.slice(0, 4)} value={value} onChange={setValue} />
}

export default { id: 'tab-bar', title: 'TabBar', group: 'composição', Screen: TabBarScreen } satisfies GalleryEntry
