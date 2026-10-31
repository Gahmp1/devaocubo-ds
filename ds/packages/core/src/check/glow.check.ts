import assert from 'node:assert/strict'
import { blurPx, bloomScale, confettiParticles, confettiPose, glowAlphas, glowFalloff, CONFETTI_COUNT, CONFETTI_ROLES, SCENE_PRESETS } from '../logic/glow.js'
import type { Check } from './run.js'

const W = 400
const H = 800
const MODELS = ['flat', 'hairline', 'shadow', 'blur', 'glow'] as const

export const checks: Check[] = [
  ['glow: flat desliga o bloom, glow liga inteiro, os demais ficam no meio', () => {
    assert.equal(bloomScale('flat'), 0)
    assert.equal(bloomScale('glow'), 1)
    for (const m of ['hairline', 'shadow', 'blur'] as const) assert.ok(bloomScale(m) > 0 && bloomScale(m) < 1, m)
  }],
  ['glow: alfas crescem com a força; flat zera só o bloom', () => {
    for (const m of MODELS) {
      const [lo, mid, hi] = [0, 0.5, 1].map((s) => glowAlphas(s, m))
      assert.ok(lo.trace < mid.trace && mid.trace < hi.trace, `${m} trace`)
      assert.ok(lo.inner < mid.inner && mid.inner < hi.inner, `${m} inner`)
      for (const a of [lo, mid, hi]) assert.ok(a.trace <= 1 && a.inner <= 1 && a.bloom <= 1 && a.trace > 0 && a.inner > 0, m)
    }
    assert.equal(glowAlphas(1, 'flat').bloom, 0)
    assert.ok(glowAlphas(0, 'glow').bloom > 0)
    assert.ok(glowAlphas(1, 'shadow').bloom < glowAlphas(1, 'glow').bloom)
  }],
  ['glow: força fora de 0–1 ou NaN é limitada', () => {
    assert.deepEqual(glowAlphas(7, 'glow'), glowAlphas(1, 'glow'))
    assert.deepEqual(glowAlphas(-3, 'glow'), glowAlphas(0, 'glow'))
    assert.deepEqual(glowAlphas(NaN, 'glow'), glowAlphas(0, 'glow'))
  }],
  ['glow: queda gaussiana vai de 1 no centro a ~0 na borda e passa por 0,5 em 1/3 do raio', () => {
    const { positions, alphas } = glowFalloff(7)
    assert.equal(positions.length, 7)
    assert.equal(positions[0], 0)
    assert.equal(positions[6], 1)
    assert.equal(alphas[0], 1)
    assert.ok(alphas[6] < 0.01)
    for (let i = 1; i < alphas.length; i++) assert.ok(alphas[i] < alphas[i - 1])
    assert.ok(Math.abs(alphas[2] - 0.5) < 0.01)
  }],
  ['glow: presets de cena usam só aiGlow/accent e frações de 0 a 1', () => {
    assert.deepEqual(Object.keys(SCENE_PRESETS).sort(), ['ambient', 'focus', 'success'])
    for (const blobs of Object.values(SCENE_PRESETS)) {
      assert.ok(blobs.length > 0)
      for (const b of blobs) {
        assert.ok(b.color === 'aiGlow' || b.color === 'accent')
        for (const v of [b.cx, b.cy, b.fwhmX, b.fwhmY, b.opacity]) assert.ok(v >= 0 && v <= 1)
        assert.ok(b.fwhmX > 0 && b.fwhmY > 0 && b.opacity > 0)
      }
    }
  }],
  ['glow: blurPx vai de 0 a um teto e limita a intensidade a 0–100', () => {
    assert.equal(blurPx(0), 0)
    assert.ok(blurPx(50) > 0 && blurPx(50) < blurPx(100))
    assert.equal(blurPx(250), blurPx(100))
    assert.equal(blurPx(-5), 0)
    assert.equal(blurPx(NaN), 0)
  }],
  ['confete: mesma semente, mesmas partículas; contagem e faixas', () => {
    const a = confettiParticles()
    assert.equal(a.length, CONFETTI_COUNT)
    assert.deepEqual(a, confettiParticles())
    assert.notDeepEqual(a, confettiParticles(CONFETTI_COUNT, 2))
    assert.equal(confettiParticles(5).length, 5)
    for (const p of a) {
      assert.ok(p.role >= 0 && p.role < CONFETTI_ROLES.length && Number.isInteger(p.role))
      assert.ok(p.delay >= 0 && p.delay < 0.5 && p.size > 0 && p.vy < 0)
    }
    assert.ok(new Set(a.map((p) => p.role)).size > 1)
  }],
  ['confete: antes do atraso fica invisível na origem; no fim some', () => {
    const [p] = confettiParticles(1).map((q) => ({ ...q, delay: 0.2 }))
    const start = confettiPose(p, 0, W, H)
    assert.equal(start.opacity, 0)
    assert.equal(start.x, W * (0.5 + p.x0))
    assert.equal(start.y, H * 0.12)
    assert.equal(confettiPose(p, 0.2, W, H).opacity, 1)
    assert.equal(confettiPose(p, 1, W, H).opacity, 0)
    assert.deepEqual(confettiPose(p, 3, W, H), confettiPose(p, 1, W, H))
  }],
  ['confete: sobe e depois cai sob a gravidade', () => {
    const [p] = confettiParticles(1).map((q) => ({ ...q, delay: 0 }))
    const ys = [0, 0.25, 0.5, 0.75, 1].map((t) => confettiPose(p, t, W, H).y)
    assert.ok(ys[1] < ys[0], 'sobe no início')
    assert.ok(ys[4] > ys[3] && ys[3] > ys[2], 'cai no fim')
  }],
]
