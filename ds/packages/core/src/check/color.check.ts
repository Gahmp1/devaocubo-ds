import assert from 'node:assert/strict'
import { swfitness } from '@gahmp1/ds-theme'
import { mixColor, withAlpha } from '../color.js'
import { resolveTheme } from '../theme.js'
import type { Check } from './run.js'

export const checks: Check[] = [
  ['mixColor preto+branco a 0.5', () => assert.equal(mixColor('#000000', '#ffffff', 0.5), 'rgba(128, 128, 128, 1)')],
  [
    'mixColor t=0 devolve a primeira (hsl) em rgba',
    () => {
      const out = mixColor('hsl(80 96% 31%)', 'rgba(14, 14, 17, 0.84)', 0)
      assert.match(out, /^rgba\(\d+, \d+, \d+, 1\)$/)
      assert.equal(out, mixColor('hsl(80 96% 31%)', '#ffffff', 0))
    },
  ],
  ['withAlpha', () => assert.equal(withAlpha('#B6FB2D', 0.3), 'rgba(182, 251, 45, 0.3)')],
  ['resolveTheme: movimento reduzido', () => assert.equal(resolveTheme(swfitness, 'dark', true).motion.reduced, true)],
  ['resolveTheme: papel accent', () => assert.equal(resolveTheme(swfitness, 'dark', true).color.accent, '#B6FB2D')],
]
