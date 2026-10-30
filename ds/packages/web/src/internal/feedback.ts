// Referência: Bencho (MIT), https://github.com/cabralorenzo/bencho (Web Audio sintetizado, um AudioContext, resume() no gesto)
import { SOUND_ATTACK_MS, SOUND_FILTER_HZ, SOUND_RECIPES, type FeedbackPerform, type Note } from '@gahmp1/ds-core'

const FLOOR = 0.0001 // o "zero" do envelope exponencial
let ctx: AudioContext | undefined

function tone(c: AudioContext, n: Note, volume: number) {
  const t0 = c.currentTime + 0.005 + (n.at ?? 0) / 1000
  const t1 = t0 + n.ms / 1000
  const peak = Math.max(FLOOR * 2, n.g * volume)
  const osc = c.createOscillator()
  const lowpass = c.createBiquadFilter()
  const gain = c.createGain()
  osc.type = n.wave
  osc.frequency.setValueAtTime(n.f, t0)
  if (n.to) osc.frequency.exponentialRampToValueAtTime(n.to, t1)
  lowpass.type = 'lowpass'
  lowpass.frequency.value = SOUND_FILTER_HZ
  // nada começa em ganho cheio: isso é um estalo
  gain.gain.setValueAtTime(FLOOR, t0)
  gain.gain.exponentialRampToValueAtTime(peak, t0 + SOUND_ATTACK_MS / 1000)
  gain.gain.exponentialRampToValueAtTime(FLOOR, t1)
  osc.connect(lowpass).connect(gain).connect(c.destination)
  osc.start(t0)
  osc.stop(t1 + 0.02)
}

/** Vibra com `navigator.vibrate` quando existe (não existe no Safari do iPhone) e toca a receita com Web Audio. */
export const performFeedback: FeedbackPerform = (r, { volume }) => {
  if (r.haptic && typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(r.haptic.ms)
  if (!r.sound || typeof AudioContext === 'undefined') return
  // criado no primeiro som, que deveria vir de um gesto; suspenso (sem gesto) não agenda nada, senão as notas estouram juntas depois
  ctx ??= new AudioContext()
  if (ctx.state !== 'running') {
    void ctx.resume()
    return
  }
  for (const n of SOUND_RECIPES[r.sound]) tone(ctx, n, volume)
}
