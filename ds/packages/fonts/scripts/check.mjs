// Cada face do registro tem arquivo, o css gerado a cita e a licença da família está junto.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const families = JSON.parse(readFileSync(join(root, 'src', 'families.json'), 'utf8'))
const bad = []
for (const f of families) {
  if (!existsSync(join(root, 'files', f.id, 'LICENSE.txt'))) bad.push(`${f.id}: sem LICENSE.txt`)
  const css = existsSync(join(root, 'css', `${f.id}.css`)) ? readFileSync(join(root, 'css', `${f.id}.css`), 'utf8') : ''
  for (const file of Object.values(f.faces)) {
    if (!existsSync(join(root, 'files', f.id, file))) bad.push(`${f.id}: falta ${file}`)
    if (!css.includes(file)) bad.push(`${f.id}: css não cita ${file}`)
  }
}
if (bad.length) { console.error(bad.join('\n')); process.exit(1) }
console.log(`ds-fonts: ${families.length} famílias ok`)
