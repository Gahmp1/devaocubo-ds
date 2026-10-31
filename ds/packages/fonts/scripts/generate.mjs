// Gera css/<id>.css (@font-face) e src/native.ts (um import de ttf por face) a partir de families.json.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const families = JSON.parse(readFileSync(join(root, 'src', 'families.json'), 'utf8'))
const nativeName = (file) => file.replace(/\.ttf$/, '')

mkdirSync(join(root, 'css'), { recursive: true })
const imports = []
const entries = []
for (const f of families) {
  const faces = Object.entries(f.faces)
  const css = faces.map(([weight, file]) => {
    if (!existsSync(join(root, 'files', f.id, file))) throw new Error(`falta files/${f.id}/${file}`)
    return `@font-face {\n  font-family: '${f.name}';\n  font-weight: ${weight};\n  font-style: normal;\n  font-display: swap;\n  src: url('../files/${f.id}/${file}') format('truetype');\n}\n`
  })
  writeFileSync(join(root, 'css', `${f.id}.css`), `/* ${f.name}: gerado por @gahmp1/ds-fonts; não editar */\n${css.join('\n')}`)
  const id = f.id.replace(/-/g, '_')
  const rows = faces.map(([, file]) => {
    imports.push(`import ${id}_${nativeName(file).replace(/\W/g, '_')} from '../files/${f.id}/${file}'`)
    return `    '${nativeName(file)}': ${id}_${nativeName(file).replace(/\W/g, '_')},`
  })
  entries.push(`  '${f.id}': {\n${rows.join('\n')}\n  },`)
}
writeFileSync(
  join(root, 'src', 'native.ts'),
  `// Gerado por scripts/generate.mjs; não editar.\n${imports.join('\n')}\n\n/** Arquivos por família, chaveados pelo nome registrado no expo-font (o mesmo de \`FontFamily.native\`). */\nexport const nativeFonts: Record<string, Record<string, number>> = {\n${entries.join('\n')}\n}\n`,
)
