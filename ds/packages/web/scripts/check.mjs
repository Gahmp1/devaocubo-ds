// Reprova cor literal (#, rgb(, hsl(, e as variantes com alfa) em src/**/*.css: cor só vem de var(--ds-*).
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const src = join(fileURLToPath(new URL('..', import.meta.url)), 'src')
const literal = /#|rgba?\(|hsla?\(/i
const bad = []
for (const f of readdirSync(src, { recursive: true }).map(String).filter((f) => f.endsWith('.css'))) {
  readFileSync(join(src, f), 'utf8').split('\n').forEach((line, i) => {
    if (literal.test(line)) bad.push(`src/${f}:${i + 1}: ${line.trim()}`)
  })
}
if (bad.length) {
  console.error(`ds-web: cor literal em css\n${bad.join('\n')}`)
  process.exit(1)
}
console.log('ds-web: css sem cor literal')
