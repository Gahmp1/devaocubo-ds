import { Button, createStyles, DataList, PullToRefresh, SegmentedControl, Stack, Text } from '@gahmp1/ds-native'
import { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import type { GalleryEntry } from '../Gallery'

const REFRESH_MS = 1800

const useStyles = createStyles((t) => ({
  root: { flex: 1, backgroundColor: t.color.bg },
  header: { padding: t.density.space.md, gap: t.density.space.sm },
  content: { padding: t.density.space.md, paddingTop: t.density.space.xs },
}))

const ROWS = Array.from({ length: 12 }, (_, i) => ({
  key: String(i),
  title: `Treino ${i + 1}`,
  values: [
    { label: 'Duração', value: `${40 + i} min` },
    { label: 'Séries', value: String(12 + (i % 5)) },
  ],
}))

type Status = 'parado' | 'atualizando' | 'concluído'

function PullToRefreshScreen() {
  const s = useStyles()
  const [refreshing, setRefreshing] = useState(false)
  const [status, setStatus] = useState<Status>('parado')
  const [count, setCount] = useState(0)
  const [threshold, setThreshold] = useState('72')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const refresh = () => {
    setRefreshing(true)
    setStatus('atualizando')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setRefreshing(false)
      setStatus('concluído')
      setCount((n) => n + 1)
    }, REFRESH_MS)
  }

  return (
    <Stack style={s.root}>
      <Stack style={s.header}>
        <Text variant="xs" color="textMuted">
          Puxe a lista para baixo: o toque forte acontece ao cruzar o limiar, antes de soltar. Movimento reduzido: o indicador aparece e some sem deslizar.
        </Text>
        <Text variant="smMedium">{`Estado: ${status}${count ? ` (${count} atualizações)` : ''}`}</Text>
        <SegmentedControl
          value={threshold}
          onChange={setThreshold}
          options={[
            { value: '72', label: 'Limiar 72' },
            { value: '120', label: 'Limiar 120' },
          ]}
        />
        <Button title="Atualizar por código" variant="outline" onPress={refresh} disabled={refreshing} />
      </Stack>
      <PullToRefresh refreshing={refreshing} onRefresh={refresh} threshold={Number(threshold)}>
        {(scroll) => (
          <ScrollView {...scroll} contentContainerStyle={s.content}>
            <DataList items={ROWS} />
          </ScrollView>
        )}
      </PullToRefresh>
    </Stack>
  )
}

export default { id: 'pull-to-refresh', title: 'PullToRefresh', group: 'composição', Screen: PullToRefreshScreen } satisfies GalleryEntry
