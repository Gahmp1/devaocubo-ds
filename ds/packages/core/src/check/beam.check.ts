import assert from 'node:assert/strict'
import { beamAngle, BEAM_ARC, BEAM_STOPS } from '../logic/beam.js'
import type { Check } from './run.js'

export const checks: Check[] = [
  ['beam: ângulo anda de 0 a 360 no período e recomeça', () => {
    assert.equal(beamAngle(0, 3000), 0)
    assert.equal(beamAngle(750, 3000), 90)
    assert.equal(beamAngle(1500, 3000), 180)
    assert.equal(beamAngle(3000, 3000), 0)
    assert.equal(beamAngle(3750, 3000), 90)
  }],
  ['beam: tempo ou período inválido deixa parado em 0', () => {
    for (const [t, p] of [[-5, 3000], [NaN, 3000], [100, 0], [100, -1], [100, NaN]] as const) assert.equal(beamAngle(t, p), 0, `${t}/${p}`)
  }],
  ['beam: gradiente do feixe tem paradas crescentes, pico no fim do arco e pontas transparentes', () => {
    const { positions, alphas } = BEAM_STOPS
    assert.equal(positions.length, alphas.length)
    for (let i = 1; i < positions.length; i++) assert.ok(positions[i] > positions[i - 1])
    assert.equal(positions[0], 0)
    assert.equal(positions[positions.length - 1], 1)
    assert.equal(alphas[0], 0)
    assert.equal(alphas[alphas.length - 1], 0)
    assert.equal(Math.max(...alphas), 1)
    assert.ok(Math.abs(1 - positions[1] - BEAM_ARC) < 1e-9)
  }],
]
