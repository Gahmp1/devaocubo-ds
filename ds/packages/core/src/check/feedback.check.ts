import assert from 'node:assert/strict'
import { devaocubo, parseColor, somma, swfitness, themes, trippo } from '@gahmp1/ds-theme'
import { HAPTICS, resolveFeedback, resolvePrefs, soundVolume, type FeedbackPrefs, type FeedbackRole } from '../feedback.js'
import { SOUND_ATTACK_MS, SOUND_RECIPES, soundMs, type SoundName } from '../sound.js'
import { resolveTheme } from '../theme.js'
import type { Check } from './run.js'

const dark = resolveTheme(swfitness, 'dark', false)
const reduced = resolveTheme(swfitness, 'dark', true)
const all: FeedbackPrefs = { haptics: true, sound: true, volume: 0.5 }
const free = { now: 1000, last: 0, micActive: false }
const ROLES = Object.keys(HAPTICS) as FeedbackRole[]

export const checks: Check[] = [
  ['feedback: dois play a 100 ms, o segundo dá null', () => assert.equal(resolveFeedback(dark, all, 'confirm', { now: 100, last: 0, micActive: false }), null)],
  ['feedback: a 150 ms já toca', () => assert.ok(resolveFeedback(dark, all, 'confirm', { now: 150, last: 0, micActive: false })?.haptic)],
  ['feedback: select nunca tem som', () => assert.equal(resolveFeedback(dark, all, 'select', free)?.sound, undefined)],
  ['feedback: só pull-commit, confirm, complete e error têm som', () => {
    const withSound = ROLES.filter((r) => resolveFeedback(dark, all, r, free)?.sound)
    assert.deepEqual(withSound, ['pull-commit', 'confirm', 'complete', 'error'])
  }],
  ['feedback: pull-commit com sound:false não tem som', () => {
    const r = resolveFeedback(dark, { ...all, sound: false }, 'pull-commit', free)
    assert.equal(r?.sound, undefined)
    assert.ok(r?.haptic)
  }],
  ['feedback: sem haptics e sem som dá null', () => assert.equal(resolveFeedback(dark, { ...all, haptics: false, sound: false }, 'confirm', free), null)],
  ['feedback: microfone ativo, nenhum papel tem som', () => {
    for (const r of ROLES) assert.equal(resolveFeedback(dark, all, r, { ...free, micActive: true })?.sound, undefined, r)
  }],
  ['feedback: microfone ativo, só voice-start e voice-stop vibram', () => {
    const buzz = ROLES.filter((r) => resolveFeedback(dark, all, r, { ...free, micActive: true })?.haptic)
    assert.deepEqual(buzz, ['voice-start', 'voice-stop'])
  }],
  ['feedback: reduzido dá um pulso só no web', () => {
    for (const r of ROLES) assert.equal(resolveFeedback(reduced, all, r, free)?.haptic?.ms.length, 1, r)
    assert.ok((HAPTICS.confirm.ms.length) > 1)
  }],
  ['feedback: reduzido troca notificação do iOS por um impacto', () => {
    for (const r of ROLES) assert.ok(!resolveFeedback(reduced, all, r, free)?.haptic?.ios.startsWith('notify'), r)
  }],
  ['feedback: intensity soft abaixa um degrau, crisp mantém', () => {
    assert.equal(resolveFeedback(resolveTheme(somma, 'dark', false), all, 'pull-commit', free)?.haptic?.ios, 'impact-light')
    assert.equal(resolveFeedback(dark, all, 'pull-commit', free)?.haptic?.ios, 'impact-medium')
  }],
  ['feedback: o timbre do tema escolhe o som', () => {
    assert.equal(resolveFeedback(dark, all, 'confirm', free)?.sound, 'rise-crisp')
    assert.equal(resolveFeedback(resolveTheme(trippo, 'light', false), all, 'error', free)?.sound, 'low-soft')
  }],
  ['feedback: prefs padrão do tema (som desligado, volume do tema)', () => {
    for (const t of themes) assert.deepEqual(resolvePrefs(t, undefined), { haptics: true, sound: false, volume: t.feedback.sound.volume }, t.name)
    assert.equal(resolvePrefs(devaocubo, { sound: true }).sound, true)
  }],
  ['feedback: volume nunca passa do teto do tema', () => {
    assert.equal(soundVolume(dark, { ...all, volume: 1 }), 0.5)
    assert.equal(soundVolume(dark, { ...all, volume: 0.2 }), 0.2)
    assert.equal(soundVolume(dark, { ...all, volume: -1 }), 0)
  }],
  ['sons: receitas válidas, ≤ 300 ms, ataque cabe na nota', () => {
    for (const [name, notes] of Object.entries(SOUND_RECIPES)) {
      assert.ok(soundMs(name as SoundName) <= 300, name)
      for (const n of notes) {
        assert.ok(n.f > 20 && n.g > 0 && n.g <= 0.5 && n.ms >= SOUND_ATTACK_MS * 2, name)
      }
    }
    assert.equal(Object.keys(SOUND_RECIPES).length, 6)
  }],
  ['aiGradient: 3 cores legíveis nos 4 temas e 2 esquemas', () => {
    for (const t of themes) {
      for (const s of ['light', 'dark'] as const) {
        assert.equal(t.color[s].aiGradient.length, 3, `${t.name}/${s}`)
        for (const g of t.color[s].aiGradient) assert.equal(parseColor(g).a, 1, `${t.name}/${s}: ${g}`)
      }
    }
  }],
]
