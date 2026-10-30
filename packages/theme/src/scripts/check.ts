import assert from 'node:assert/strict'
import { contrastRatio } from '../check/color.js'
import { checkTheme } from '../check/contrast.js'
import { themes } from '../index.js'

// Autochecagem: valores de referência WCAG antes de confiar no resultado.
assert.equal(contrastRatio('#000000', '#ffffff').toFixed(2), '21.00')
assert.equal(contrastRatio('#777777', '#ffffff').toFixed(2), '4.48')
assert.equal(contrastRatio('hsl(0 0% 100%)', '#000').toFixed(2), '21.00')
assert.throws(() => contrastRatio('rgba(0,0,0,0.5)', '#ffffff'), /alfa/)

const fails = themes.flatMap(checkTheme)
for (const f of fails) console.error(f)
console.log(`${themes.length} temas, ${fails.length} falhas`)
if (fails.length) process.exit(1)
