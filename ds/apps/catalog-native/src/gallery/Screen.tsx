import { Box, Button, HeaderTitle, Screen, SegmentedControl, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import type { GalleryEntry } from '../Gallery'

const MODES = [
  { value: 'header', label: 'Cabeçalho' },
  { value: 'scroll', label: 'Rolando' },
  { value: 'footer', label: 'Rodapé' },
]
const rows = Array.from({ length: 30 }, (_, i) => i + 1)

function ScreenScreen() {
  const [mode, setMode] = useState('header')
  const [offset, setOffset] = useState(0)
  const scroll = mode !== 'header'
  return (
    <Screen
      edges={['bottom']}
      scroll={scroll}
      onScroll={(e) => setOffset(Math.round(e.nativeEvent.contentOffset.y))}
      header={
        <Stack gap="sm">
          <HeaderTitle title="Treinos" subtitle={scroll ? `Rolagem: ${offset} pt` : 'Cabeçalho fixo acima do conteúdo'} />
          <SegmentedControl options={MODES} value={mode} onChange={setMode} />
        </Stack>
      }
      footer={mode === 'footer' ? <Button title="Concluir treino" fullWidth onPress={() => undefined} /> : undefined}
    >
      <Stack gap="sm">
        {(scroll ? rows : rows.slice(0, 3)).map((n) => (
          <Box key={n} surface="surface1" padding="md" radius="md">
            <Text>Linha {n}</Text>
          </Box>
        ))}
      </Stack>
    </Screen>
  )
}

export default { id: 'screen', title: 'Screen', group: 'composição', Screen: ScreenScreen } satisfies GalleryEntry
