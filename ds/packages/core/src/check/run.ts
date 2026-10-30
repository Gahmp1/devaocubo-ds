import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export type Check = [name: string, run: () => void]

// Cada `*.check.js` exporta `checks: Check[]`; falha de asserção derruba o processo.
const dir = fileURLToPath(new URL('.', import.meta.url))
let n = 0
for (const file of readdirSync(dir).filter((f) => f.endsWith('.check.js'))) {
  const { checks } = (await import(`./${file}`)) as { checks: Check[] }
  for (const [name, run] of checks) {
    try {
      run()
    } catch (e) {
      console.error(`falhou: ${file} › ${name}`)
      throw e
    }
    n++
  }
}
console.log(`ds-core: ${n} checagens ok`)
