// Concatena src/core/base.css e os demais src/**/*.css (ordem alfabética por caminho) em dist/styles.css, dentro de @layer ds.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const pkg = fileURLToPath(new URL('..', import.meta.url))
const src = join(pkg, 'src')
const base = join('core', 'base.css')
const all = readdirSync(src, { recursive: true }).map(String).filter((f) => f.endsWith('.css')).sort()
const ordered = [base, ...all.filter((f) => f !== base)]
const body = ordered.map((f) => readFileSync(join(src, f), 'utf8').trim()).join('\n\n')
mkdirSync(join(pkg, 'dist'), { recursive: true })
writeFileSync(join(pkg, 'dist', 'styles.css'), `@layer ds {\n${body}\n}\n`)
console.log(`ds-web: styles.css (${ordered.length} arquivos)`)
