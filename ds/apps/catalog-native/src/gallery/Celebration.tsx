import { Button, createStyles, Text } from '@gahmp1/ds-native'
import { Celebration } from '@gahmp1/ds-native/motion'
import { useState } from 'react'
import { View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const useStyles = createStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.color.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: t.density.space.md },
}))

function CelebrationScreen() {
  const s = useStyles()
  const [active, setActive] = useState(false)
  const [done, setDone] = useState(0)
  return (
    <View style={s.screen}>
      <Celebration active={active} onDone={() => setDone((n) => n + 1)} />
      <View style={s.center}>
        <Text variant="lg">onDone: {done}</Text>
        <Text variant="xs" color="textMuted">Uma execução por ativação. Movimento reduzido: só o fundo.</Text>
        <Button title={active ? 'Reiniciar' : 'Celebrar'} variant="surface" onPress={() => setActive((a) => !a)} />
      </View>
    </View>
  )
}

export default { id: 'celebration', title: 'Celebration', group: 'movimento', Screen: CelebrationScreen } satisfies GalleryEntry
