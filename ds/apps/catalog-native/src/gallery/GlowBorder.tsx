import { createStyles, Stack, Text, TextField } from '@gahmp1/ds-native'
import { GlowBorder } from '@gahmp1/ds-native/motion'
import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.xxxl, gap: t.density.space.huge },
  box: { padding: t.density.space.xl, borderRadius: t.shape.radius.lg, backgroundColor: t.color.surface1, alignItems: 'center' },
}))

function GlowBorderScreen() {
  const s = useStyles()
  const [on, setOn] = useState(false)
  const [value, setValue] = useState('')
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Gira em ai.beamPeriodMs do tema. Movimento reduzido (botão no topo): borda estática.</Text>
      <Stack gap="md">
        <Text variant="xs" color="textMuted" label>ativo e inativo</Text>
        <GlowBorder active>
          <View style={s.box}><Text>ativo</Text></View>
        </GlowBorder>
        <GlowBorder active={false}>
          <View style={s.box}><Text>inativo</Text></View>
        </GlowBorder>
      </Stack>
      <Stack gap="md">
        <Text variant="xs" color="textMuted" label>entrando e saindo</Text>
        <GlowBorder active={on}>
          <Pressable accessibilityRole="button" accessibilityLabel={on ? 'Desligar' : 'Ligar'} onPress={() => setOn((v) => !v)} style={s.box}>
            <Text>{on ? 'Desligar' : 'Ligar'}</Text>
          </Pressable>
        </GlowBorder>
      </Stack>
      <Stack gap="md">
        <Text variant="xs" color="textMuted" label>sobre TextField (ativo enquanto tem texto)</Text>
        <GlowBorder active={value.length > 0} radius="xl">
          <TextField label="Pergunte à IA" value={value} onChangeText={setValue} />
        </GlowBorder>
      </Stack>
      <Stack gap="md">
        <Text variant="xs" color="textMuted" label>período 1500 ms</Text>
        <GlowBorder active periodMs={1500}>
          <View style={s.box}><Text variant="xs" color="textMuted">1500 ms</Text></View>
        </GlowBorder>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'glow-border', title: 'GlowBorder', group: 'movimento', Screen: GlowBorderScreen } satisfies GalleryEntry
