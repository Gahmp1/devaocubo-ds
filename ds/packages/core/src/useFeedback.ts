import type { DSTheme } from '@gahmp1/ds-theme'
import { useMemo, useRef } from 'react'
import { useDS } from './context.js'
import { resolvePrefs, resolveFeedback, soundVolume, type DSFeedback, type FeedbackPerform, type FeedbackPrefs, type FeedbackResult, type FeedbackRole, type SkipReason, skipReason } from './feedback.js'

/** Uso dos provedores: preferências efetivas + `perform` da plataforma + estado compartilhado do intervalo. */
export function useFeedbackValue(theme: DSTheme, override: Partial<FeedbackPrefs> | undefined, perform: FeedbackPerform): DSFeedback {
  const state = useRef({ last: -Infinity, micActive: false }).current
  const { haptics, sound, volume } = resolvePrefs(theme, override)
  return useMemo(() => ({ prefs: { haptics, sound, volume }, perform, state }), [haptics, sound, volume, perform, state])
}

export type FeedbackOutcome = { played: FeedbackResult } | { skipped: SkipReason }

export type Feedback = {
  /** Toca o papel (consulta tema, preferências, intervalo e microfone) e devolve o que tocou ou por que não tocou. `value: false` em `toggle` = desligou. */
  play: (role: FeedbackRole, value?: boolean) => FeedbackOutcome
  /** Com o microfone ativo, nenhum som toca e só `voice-start`/`voice-stop` vibram. */
  setMicActive: (on: boolean) => void
}

/** Único ponto de feedback sensorial: componente nenhum chama haptics, áudio ou `navigator.vibrate` direto. */
export function useFeedback(): Feedback {
  const { theme, feedback } = useDS()
  return useMemo<Feedback>(
    () => ({
      play(role, value) {
        const now = Date.now()
        const ctx = { now, last: feedback.state.last, micActive: feedback.state.micActive }
        const r = resolveFeedback(theme, feedback.prefs, role, ctx)
        if (!r) return { skipped: skipReason(feedback.prefs, ctx) }
        feedback.state.last = now
        const h = r.haptic
        const out = value === false && h?.android === 'Toggle_On' ? { ...r, haptic: { ...h, android: 'Toggle_Off' as const } } : r
        try {
          feedback.perform(out, { volume: soundVolume(theme, feedback.prefs) })
        } catch {
          // erro do sistema (áudio, haptics) nunca sobe para o componente
        }
        return { played: out }
      },
      setMicActive(on) {
        feedback.state.micActive = on
      },
    }),
    [theme, feedback],
  )
}
