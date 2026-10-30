// Gera os barris dos pacotes (src/index.ts, src/motion.ts, src/ai.ts) e o registro da galeria nativa.
// Os arquivos gerados estão no .gitignore; pacotes e pastas que ainda não existem são pulados.
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const HEADER = '// Gerado por scripts/barrels.mjs; não edite.\n'

const ls = (dir) => (existsSync(dir) ? readdirSync(dir).sort() : [])
const isDir = (p) => existsSync(p) && statSync(p).isDirectory()
const stem = (f) => f.replace(/\.tsx?$/, '')
const isModule = (f) => /\.tsx?$/.test(f) && !f.endsWith('.d.ts')

/** Arquivos .ts/.tsx de `dir`, menos `skip`, como especificadores `./<rel>/<nome>.js`. */
const files = (src, rel, skip = []) =>
  ls(join(src, rel)).filter((f) => isModule(f) && !skip.includes(f)).map((f) => `./${rel ? `${rel}/` : ''}${stem(f)}.js`)
/** `<rel>/<pasta>/index.tsx` de cada subpasta. */
const folders = (src, rel) =>
  ls(join(src, rel)).filter((d) => isDir(join(src, rel, d)) && existsSync(join(src, rel, d, 'index.tsx'))).map((d) => `./${rel}/${d}/index.js`)

const write = (file, specs, mk = (s) => `export * from '${s}'`) => {
  writeFileSync(file, HEADER + specs.map(mk).join('\n') + '\n')
  console.log(`barril: ${file.slice(root.length)} (${specs.length})`)
}

for (const pkg of ['core', 'native', 'web']) {
  const src = join(root, 'packages', pkg, 'src')
  if (!isDir(src)) continue
  const index =
    pkg === 'core'
      ? // módulos soltos de src/ (tema, contexto, textos...) mais src/logic/*
        [...files(src, '', ['index.ts']), ...files(src, 'logic')]
      : [...files(src, 'core'), ...folders(src, 'core'), ...folders(src, 'primitives'), ...folders(src, 'composition')]
  write(join(src, 'index.ts'), index)
  if (pkg === 'core') continue
  const motion = folders(src, 'motion')
  if (motion.length) write(join(src, 'motion.ts'), motion)
  const ai = folders(src, 'ai')
  if (ai.length) write(join(src, 'ai.ts'), ai)
}

// Galeria do catálogo nativo: um módulo por arquivo de src/gallery/, sem extensão (Metro resolve).
const gallery = join(root, 'apps/catalog-native/src/gallery')
const entries = ls(gallery).filter((f) => f.endsWith('.tsx')).map(stem)
if (entries.length) {
  writeFileSync(
    join(root, 'apps/catalog-native/src/gallery/registry.ts'),
    HEADER +
      entries.map((e, i) => `import * as g${i} from './${e}'`).join('\n') +
      `\n\nexport const registry = { ${entries.map((e, i) => `${JSON.stringify(e)}: g${i}`).join(', ')} }\n`,
  )
  console.log(`barril: gallery/registry.ts (${entries.length})`)
}
