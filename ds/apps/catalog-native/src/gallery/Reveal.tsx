import { Box, Button, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { Reveal } from '@gahmp1/ds-native/motion'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const FROM = ['bottom', 'top', 'left', 'right', 'fade'] as const

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.xl },
}))

function Card({ label }: { label: string }) {
  return (
    <Box surface="surface2" padding="md" radius="md">
      <Text>{label}</Text>
    </Box>
  )
}

function RevealScreen() {
  const s = useStyles()
  const [run, setRun] = useState(0)
  const [show, setShow] = useState(true)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Movimento reduzido: botão no topo do catálogo (só opacidade, sem deslocamento).</Text>
      <Button title="Repetir entrada e cascata" variant="surface" onPress={() => setRun((n) => n + 1)} />
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>entrada</Text>
        {FROM.map((from) => (
          <Reveal key={`${from}-${run}`} from={from}>
            <Card label={from} />
          </Reveal>
        ))}
      </Stack>
      <Stack key={`cascata-${run}`} gap="xs">
        <Text variant="xs" color="textMuted" label>cascata de 5</Text>
        <Reveal stagger={90}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Card key={n} label={`item ${n}`} />
          ))}
        </Reveal>
      </Stack>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>saída</Text>
        <Button title={show ? 'Esconder' : 'Mostrar'} variant="surface" onPress={() => setShow((v) => !v)} />
        <Reveal show={show} from="right">
          <Card label="sai para o lado de onde entrou" />
        </Reveal>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'reveal', title: 'Reveal', group: 'movimento', Screen: RevealScreen } satisfies GalleryEntry
