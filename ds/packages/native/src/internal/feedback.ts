// Referência: Bencho (MIT), https://github.com/cabralorenzo/bencho (som de interface curto, uma voz por vez, nunca em loop)
import type { FeedbackPerform, HapticSpec, IosHaptic, SoundName, Timbre } from '@gahmp1/ds-core'
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio'
import * as Haptics from 'expo-haptics'
import { Platform } from 'react-native'

declare const require: (path: string) => number

// Gerados por scripts/sounds.mjs a partir das receitas do ds-core (assets/sounds está no .gitignore e no `files` do pacote).
const FILES: Record<SoundName, number> = {
  'click-soft': require('../../assets/sounds/click-soft.wav'),
  'click-crisp': require('../../assets/sounds/click-crisp.wav'),
  'rise-soft': require('../../assets/sounds/rise-soft.wav'),
  'rise-crisp': require('../../assets/sounds/rise-crisp.wav'),
  'low-soft': require('../../assets/sounds/low-soft.wav'),
  'low-crisp': require('../../assets/sounds/low-crisp.wav'),
}

const IMPACT = { light: Haptics.ImpactFeedbackStyle.Light, medium: Haptics.ImpactFeedbackStyle.Medium, rigid: Haptics.ImpactFeedbackStyle.Rigid }
const NOTIFY = { success: Haptics.NotificationFeedbackType.Success, warning: Haptics.NotificationFeedbackType.Warning, error: Haptics.NotificationFeedbackType.Error }

function ios(h: IosHaptic) {
  if (h === 'selection') return Haptics.selectionAsync()
  const [kind, style] = h.split('-') as ['impact' | 'notify', string]
  return kind === 'impact' ? Haptics.impactAsync(IMPACT[style as keyof typeof IMPACT]) : Haptics.notificationAsync(NOTIFY[style as keyof typeof NOTIFY])
}

function haptic(h: HapticSpec) {
  const run = Platform.OS === 'android' ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics[h.android]) : ios(h.ios)
  run.catch(() => {})
}

const players = new Map<SoundName, AudioPlayer>()
// Quantos provedores usam cada timbre: os players saem quando o último vai embora.
const users = new Map<Timbre, number>()
let current: AudioPlayer | null = null
let modeSet = false

/**
 * Cria os players do timbre no primeiro usuário e devolve a função que o libera; o último a sair solta os players.
 * Chamado quando o som é ligado, não antes.
 */
export function acquireSounds(timbre: Timbre): () => void {
  if (!modeSet) {
    modeSet = true
    // som de interface cala no silencioso do iOS e convive com a música da pessoa
    setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' }).catch(() => {})
  }
  const n = users.get(timbre) ?? 0
  users.set(timbre, n + 1)
  if (n === 0) for (const name of names(timbre)) players.set(name, createAudioPlayer(FILES[name]))
  let done = false
  return () => {
    if (done) return
    done = true
    const left = (users.get(timbre) ?? 1) - 1
    users.set(timbre, left)
    if (left > 0) return
    for (const name of names(timbre)) {
      const p = players.get(name)
      if (!p) continue
      if (current === p) current = null
      players.delete(name)
      p.remove()
    }
  }
}

const names = (timbre: Timbre) => (Object.keys(FILES) as SoundName[]).filter((n) => n.endsWith(`-${timbre}`))

function sound(name: SoundName, volume: number) {
  const p = players.get(name)
  if (!p) return
  // um som por vez: corta o anterior
  if (current && current !== p) current.pause()
  current = p
  p.volume = volume
  p.seekTo(0).catch(() => {})
  p.play()
}

export const performFeedback: FeedbackPerform = (r, { volume }) => {
  if (r.haptic) haptic(r.haptic)
  if (r.sound) sound(r.sound, volume)
}
