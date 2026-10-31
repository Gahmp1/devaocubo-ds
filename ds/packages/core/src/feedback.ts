import type { DSTheme } from '@gahmp1/ds-theme'
import type { SoundBase, SoundName } from './sound.js'
import type { ResolvedTheme } from './theme.js'

export type FeedbackRole = 'select' | 'toggle' | 'pull-commit' | 'confirm' | 'complete' | 'warn' | 'error' | 'hold' | 'voice-start' | 'voice-stop'

export type FeedbackPrefs = { haptics: boolean; sound: boolean; volume: number }

export type IosHaptic = 'selection' | 'impact-light' | 'impact-medium' | 'impact-rigid' | 'notify-success' | 'notify-warning' | 'notify-error'
/** Nomes de `AndroidHaptics` do `expo-haptics`. */
export type AndroidHaptic = 'Segment_Tick' | 'Toggle_On' | 'Toggle_Off' | 'Confirm' | 'Long_Press' | 'Reject' | 'Clock_Tick'
/** `ms` é o padrão de `navigator.vibrate` (sempre lista: um elemento = um pulso). */
export type HapticSpec = { ios: IosHaptic; android: AndroidHaptic; ms: number[] }

export type FeedbackResult = { haptic?: HapticSpec; sound?: SoundName }

/**
 * Mapa decidido na onda 1 (Task 10b). Estes são os valores de `intensity: 'crisp'`; com `soft` (devaocubo, somma, trippo)
 * `resolveFeedback` abaixa os impactos só no iOS: `pull-commit` vira `impact-light` e `hold` vira `impact-medium`
 * (Android e web não mudam). Quem depende de Medium (ex.: PullToRefresh) não deve esperá-lo em temas `soft`.
 * `useFeedback().play('toggle', false)` troca `Toggle_On` por `Toggle_Off` no Android. */
export const HAPTICS: Record<FeedbackRole, HapticSpec> = {
  select: { ios: 'selection', android: 'Segment_Tick', ms: [8] },
  toggle: { ios: 'selection', android: 'Toggle_On', ms: [8] },
  'pull-commit': { ios: 'impact-medium', android: 'Confirm', ms: [14] },
  confirm: { ios: 'notify-success', android: 'Confirm', ms: [10, 40, 18] },
  complete: { ios: 'notify-success', android: 'Confirm', ms: [10, 40, 18] },
  warn: { ios: 'notify-warning', android: 'Long_Press', ms: [20, 60, 20] },
  error: { ios: 'notify-error', android: 'Reject', ms: [30, 60, 30] },
  hold: { ios: 'impact-rigid', android: 'Long_Press', ms: [20] },
  'voice-start': { ios: 'impact-light', android: 'Clock_Tick', ms: [8] },
  'voice-stop': { ios: 'impact-light', android: 'Clock_Tick', ms: [8] },
}

/** Papéis com som; os demais nunca tocam (o timbre vem do tema). */
const SOUND_BASE: Partial<Record<FeedbackRole, SoundBase>> = { 'pull-commit': 'click', confirm: 'rise', complete: 'rise', error: 'low' }

/** Intervalo mínimo entre dois feedbacks (ms). */
export const FEEDBACK_GAP_MS = 150

const SOFTER: Partial<Record<IosHaptic, IosHaptic>> = { 'impact-rigid': 'impact-medium', 'impact-medium': 'impact-light' }

/**
 * O que tocar para o papel, ou `null` se nada. Pura: `ctx.last` é o instante (ms) do último feedback que tocou.
 * Regras: 150 ms entre eventos; som só se ligado, com papel de som e sem microfone ativo; com o microfone
 * ativo só `voice-start`/`voice-stop` vibram; `soft` abaixa um degrau os impactos; movimento reduzido = um pulso.
 */
export function resolveFeedback(
  theme: ResolvedTheme,
  prefs: FeedbackPrefs,
  role: FeedbackRole,
  ctx: { now: number; last: number; micActive: boolean },
): FeedbackResult | null {
  if (ctx.now - ctx.last < FEEDBACK_GAP_MS) return null
  const out: FeedbackResult = {}
  const voice = role === 'voice-start' || role === 'voice-stop'
  if (prefs.haptics && (!ctx.micActive || voice)) {
    const h = HAPTICS[role]
    const ios = theme.feedback.haptics.intensity === 'soft' ? (SOFTER[h.ios] ?? h.ios) : h.ios
    out.haptic = theme.motion.reduced
      ? { ...h, ios: ios.startsWith('notify') ? 'impact-medium' : ios, ms: [h.ms[0]] }
      : { ...h, ios }
  }
  const base = SOUND_BASE[role]
  if (prefs.sound && base && !ctx.micActive) out.sound = `${base}-${theme.feedback.sound.timbre}`
  return out.haptic || out.sound ? out : null
}

/** Preferências efetivas: o que o app guarda por cima do padrão do tema. */
export function resolvePrefs(theme: DSTheme, override?: Partial<FeedbackPrefs>): FeedbackPrefs {
  return {
    haptics: override?.haptics ?? theme.feedback.haptics.default === 'on',
    sound: override?.sound ?? theme.feedback.sound.default !== 'off',
    volume: override?.volume ?? theme.feedback.sound.volume,
  }
}

/** Volume 0 a 1 do som: nunca acima do que o tema permite. */
export const soundVolume = (theme: ResolvedTheme, prefs: FeedbackPrefs) =>
  Math.max(0, Math.min(prefs.volume, theme.feedback.sound.volume))

export type SkipReason = 'gap' | 'off' | 'mic' | 'no-sound'

/** Por que `resolveFeedback` deu `null` (mesmos `prefs` e `ctx`): intervalo, tudo desligado, microfone ativo ou papel sem som. */
export function skipReason(prefs: FeedbackPrefs, ctx: { now: number; last: number; micActive: boolean }): SkipReason {
  if (ctx.now - ctx.last < FEEDBACK_GAP_MS) return 'gap'
  if (!prefs.haptics && !prefs.sound) return 'off'
  return ctx.micActive ? 'mic' : 'no-sound'
}

/** Implementação de plataforma (haptics e áudio reais), injetada pelo provedor; nunca lança. */
export type FeedbackPerform = (r: FeedbackResult, o: { volume: number }) => void

/** Valor de `DSContextValue.feedback`; `state` é mutável e compartilhado por todos os `useFeedback()`. */
export type DSFeedback = {
  prefs: FeedbackPrefs
  perform: FeedbackPerform
  state: { last: number; micActive: boolean }
}
