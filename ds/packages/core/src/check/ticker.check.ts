import assert from 'node:assert/strict'
import { digitsOf, rollDirection } from '../logic/ticker.js'
import type { Check } from './run.js'

// Formatador de moeda manual: não depende dos dados de ICU do Node.
const brl = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`

export const checks: Check[] = [
  ['ticker: digitsOf separa cada caractere formatado', () => assert.deepEqual(digitsOf(1234.5, (n) => n.toFixed(1)), ['1', '2', '3', '4', '.', '5'])],
  ['ticker: digitsOf sem formato usa String', () => assert.deepEqual(digitsOf(42), ['4', '2'])],
  ['ticker: digitsOf guarda símbolo e separadores da moeda', () => assert.deepEqual(digitsOf(9.5, brl), ['R', '$', ' ', '9', ',', '5', '0'])],
  ['ticker: rollDirection força up e down', () => {
    assert.equal(rollDirection('up', 5, 1, -1), 1)
    assert.equal(rollDirection('down', 1, 5, 1), -1)
  }],
  ['ticker: rollDirection auto segue a variação e mantém a última no empate', () => {
    assert.equal(rollDirection('auto', 1, 5, -1), 1)
    assert.equal(rollDirection('auto', 5, 1, 1), -1)
    assert.equal(rollDirection('auto', 3, 3, -1), -1)
    // NaN não compara: sem direção nova, mantém a última.
    assert.equal(rollDirection('auto', 3, NaN, -1), -1)
    assert.equal(rollDirection('auto', NaN, 3, 1), 1)
  }],
]
