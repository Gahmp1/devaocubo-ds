import assert from 'node:assert/strict'
import { arcPath, barLayout, linePath } from '../logic/charts.js'
import type { Check } from './run.js'

export const checks: Check[] = [
  ['charts: barLayout [1,2], largura 100, gap 10 dá larguras 45 e alturas proporcionais', () => {
    const [a, b] = barLayout([{ value: 1 }, { value: 2 }], { width: 100, height: 40, gap: 10 })
    assert.equal(a.width, 45)
    assert.equal(b.width, 45)
    assert.equal(b.x, 55)
    assert.equal(a.height, 20)
    assert.equal(b.height, 40)
    assert.equal(a.y, 20)
  }],
  ['charts: barLayout vazio e tudo zero não geram NaN', () => {
    assert.deepEqual(barLayout([], { width: 100, height: 40, gap: 4 }), [])
    assert.equal(barLayout([{ value: 0 }, { value: Number.NaN }], { width: 100, height: 40, gap: 4 })[1].height, 0)
  }],
  ['charts: arcPath 0 e 1 não geram NaN e 0 é vazio', () => {
    assert.equal(arcPath(0, 48, 6), '')
    assert.ok(!arcPath(1, 48, 6).includes('NaN'))
    assert.ok(!arcPath(Number.NaN, 48, 6).includes('NaN'))
    assert.equal(arcPath(1.7, 48, 6), arcPath(1, 48, 6))
  }],
  ['charts: arcPath 0,5 termina embaixo e usa o arco curto', () => {
    assert.equal(arcPath(0.5, 48, 6), 'M 24 3 A 21 21 0 0 1 24 45')
    assert.ok(arcPath(0.6, 48, 6).includes('A 21 21 0 1 1'))
  }],
  ['charts: linePath mapeia mínimo à base e máximo ao topo, e a área fecha na base', () => {
    const { line, area } = linePath([{ x: 0, y: 0 }, { x: 10, y: 10 }], { width: 100, height: 50 })
    assert.equal(line, 'M 0 50 L 100 0')
    assert.equal(area, 'M 0 50 L 100 0 L 100 50 L 0 50 Z')
  }],
  ['charts: linePath vazio, ponto único e série constante não geram NaN', () => {
    assert.deepEqual(linePath([], { width: 10, height: 10 }), { line: '', area: '' })
    assert.ok(!linePath([{ x: 1, y: 1 }], { width: 10, height: 10 }).line.includes('NaN'))
    assert.ok(!linePath([{ x: 0, y: 3 }, { x: 5, y: 3 }], { width: 10, height: 10, smooth: true }).line.includes('NaN'))
  }],
]
