import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import { FEEDBACK_GAP_MS, resolveFeedback, useDS, useFeedback, type FeedbackResult, type FeedbackRole } from '@gahmp1/ds-core'
import { Button, createStyles, Stack, Text, Toggle } from '@gahmp1/ds-native'
import { useContext, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { SetFeedbackPrefs } from '../CatalogPrefs'
import type { GalleryEntry } from '../Gallery'

const ROLES: [FeedbackRole, string][] = [
  ['select', 'Seleção'], ['toggle', 'Alternar'], ['pull-commit', 'Pull: cruzou o limiar'], ['confirm', 'Confirmar'], ['complete', 'Concluir'],
  ['warn', 'Aviso'], ['error', 'Erro'], ['hold', 'Segurar'], ['voice-start', 'Voz: começar'], ['voice-stop', 'Voz: parar'],
]

const STRIP = 40

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
  strip: { height: STRIP, borderRadius: t.shape.radius.md, overflow: 'hidden' },
  swatch: { width: 64, height: 32, borderRadius: t.shape.radius.sm, borderWidth: 1, borderColor: t.color.borderMuted },
}))

function describe(role: FeedbackRole, r: FeedbackResult | null, why: string) {
  if (!r) return `${role}: não tocou (${why})`
  const h = r.haptic ? `vibra ${r.haptic.ios} · ${r.haptic.android} · ${r.haptic.ms.join('-')} ms` : 'sem vibração'
  return `${role}: ${h} · ${r.sound ? `som ${r.sound}` : 'sem som'}`
}

function FeedbackScreen() {
  const s = useStyles()
  const { theme, feedback } = useDS()
  const { play, setMicActive } = useFeedback()
  const setPrefs = useContext(SetFeedbackPrefs)
  const [mic, setMic] = useState(false)
  const [log, setLog] = useState('Toque num papel.')
  const [width, setWidth] = useState(0)
  const last = useRef(-Infinity)
  const { prefs } = feedback
  const g = theme.color.aiGradient

  const fire = (role: FeedbackRole) => {
    const now = Date.now()
    const r = resolveFeedback(theme, prefs, role, { now, last: last.current, micActive: mic })
    const why = now - last.current < FEEDBACK_GAP_MS ? `menos de ${FEEDBACK_GAP_MS} ms desde o último` : mic ? 'microfone ativo' : !prefs.haptics && !prefs.sound ? 'vibração e som desligados' : 'só o som estava ligado e este papel não tem som'
    if (r) last.current = now
    setLog(describe(role, r, why))
    play(role)
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">O simulador não vibra; o log mostra o que tocaria. O som começa desligado; ligue para ouvir (no silencioso do iPhone ele cala).</Text>

      <Stack gap="sm">
        <Stack direction="row" gap="md" align="center">
          <Toggle value={prefs.haptics} onValueChange={(haptics) => setPrefs({ haptics })} accessibilityLabel="Vibração" />
          <Text variant="sm">Vibração</Text>
        </Stack>
        <Stack direction="row" gap="md" align="center">
          <Toggle value={prefs.sound} onValueChange={(sound) => setPrefs({ sound })} accessibilityLabel="Som" />
          <Text variant="sm">Som (volume {Math.round(Math.min(prefs.volume, theme.feedback.sound.volume) * 100)}%, timbre {theme.feedback.sound.timbre})</Text>
        </Stack>
        <Stack direction="row" gap="md" align="center">
          <Toggle value={mic} onValueChange={(on) => { setMic(on); setMicActive(on) }} accessibilityLabel="Microfone ativo" />
          <Text variant="sm">Microfone ativo (sem som; só voz vibra)</Text>
        </Stack>
      </Stack>

      <Stack direction="row" gap="sm" wrap>
        {ROLES.map(([role, label]) => <Button key={role} title={label} variant="surfaceOutline" size="small" onPress={() => fire(role)} />)}
      </Stack>

      <Text variant="sm" mono accessibilityLiveRegion="polite">{log}</Text>

      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>aiGradient · {theme.provisional ? 'provisório' : 'definitivo'}</Text>
        <View style={s.strip} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          <Canvas style={{ width, height: STRIP }}>
            <Rect x={0} y={0} width={width} height={STRIP}>
              <LinearGradient start={vec(0, 0)} end={vec(width, 0)} colors={g} />
            </Rect>
          </Canvas>
        </View>
        <Stack direction="row" gap="sm">
          {g.map((c, i) => (
            <Stack key={i} gap="xxs">
              <View style={[s.swatch, { backgroundColor: c }]} />
              <Text variant="xs" color="textMuted" mono>{c}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </ScrollView>
  )
}

export default { id: 'feedback', title: 'Feedback', group: 'fundação', Screen: FeedbackScreen } satisfies GalleryEntry
