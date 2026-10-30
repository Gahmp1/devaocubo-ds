import { FEEDBACK_GAP_MS, resolveFeedback, useDS, useFeedback, type FeedbackResult, type FeedbackRole } from '@gahmp1/ds-core'
import { Button, Stack, Text, Toggle } from '@gahmp1/ds-web'
import { useContext, useRef, useState } from 'react'
import { SetFeedbackPrefs } from '../CatalogRoot'

const ROLES: [FeedbackRole, string][] = [
  ['select', 'Seleção'], ['toggle', 'Alternar'], ['pull-commit', 'Pull: cruzou o limiar'], ['confirm', 'Confirmar'], ['complete', 'Concluir'],
  ['warn', 'Aviso'], ['error', 'Erro'], ['hold', 'Segurar'], ['voice-start', 'Voz: começar'], ['voice-stop', 'Voz: parar'],
]

function describe(role: FeedbackRole, r: FeedbackResult | null, why: string) {
  if (!r) return `${role}: não tocou (${why})`
  const h = r.haptic ? `vibra ${r.haptic.ios} · ${r.haptic.android} · ${r.haptic.ms.join('-')} ms` : 'sem vibração'
  return `${role}: ${h} · ${r.sound ? `som ${r.sound}` : 'sem som'}`
}

export function FeedbackPage() {
  const { theme, feedback } = useDS()
  const { play, setMicActive } = useFeedback()
  const setPrefs = useContext(SetFeedbackPrefs)
  const [mic, setMic] = useState(false)
  const [log, setLog] = useState('Toque num papel.')
  const last = useRef(-Infinity)
  const { prefs } = feedback
  const g = theme.color.aiGradient

  const fire = (role: FeedbackRole) => {
    const now = Date.now()
    const ctx = { now, last: last.current, micActive: mic }
    const r = resolveFeedback(theme, prefs, role, ctx)
    const why = now - last.current < FEEDBACK_GAP_MS ? `menos de ${FEEDBACK_GAP_MS} ms desde o último` : mic ? 'microfone ativo' : !prefs.haptics && !prefs.sound ? 'vibração e som desligados' : 'só o som estava ligado e este papel não tem som'
    if (r) last.current = now
    setLog(describe(role, r, why))
    play(role)
  }

  return (
    <Stack gap="lg" style={{ padding: 24, background: 'var(--ds-color-bg)', minHeight: '100vh' }}>
      <Text variant="xl" as="h1">Feedback</Text>
      <Text variant="sm" color="textMuted">
        {'vibrate' in navigator ? 'Este navegador tem navigator.vibrate.' : 'Sem navigator.vibrate aqui: o log mostra o que vibraria.'} O som começa desligado; ligue para ouvir.
      </Text>

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

      <Text variant="sm" mono aria-live="polite" data-testid="feedback-log">{log}</Text>

      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>aiGradient · {theme.provisional ? 'provisório' : 'definitivo'}</Text>
        <div data-testid="gradient-strip" style={{ height: 40, borderRadius: 'var(--ds-radius-md)', background: 'linear-gradient(90deg, var(--ds-ai-gradient-1), var(--ds-ai-gradient-2), var(--ds-ai-gradient-3))' }} />
        <Stack direction="row" gap="sm">
          {g.map((c, i) => (
            <Stack key={i} gap="xxs">
              <div style={{ width: 64, height: 32, borderRadius: 'var(--ds-radius-sm)', background: `var(--ds-ai-gradient-${i + 1})`, border: '1px solid var(--ds-color-border-muted)' }} />
              <Text variant="xs" color="textMuted" mono>{c}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
