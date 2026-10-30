import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { toCssVars, toTailwindTheme } from '../generate/css.js'
import { toLegacyDefaultsJson, toLegacyTokensCss } from '../generate/legacy.js'
import { themes } from '../index.js'

const repoRoot = fileURLToPath(new URL('../../../../../', import.meta.url))
const cssDir = fileURLToPath(new URL('../css/', import.meta.url))

writeFileSync(repoRoot + 'tokens.css', toLegacyTokensCss())
writeFileSync(repoRoot + 'defaults.json', toLegacyDefaultsJson())

mkdirSync(cssDir, { recursive: true })
for (const t of themes) {
  const css = toCssVars(t)
  // Autochecagem: cada papel aparece no claro, no escuro explícito e no escuro do SO.
  for (const role of Object.keys(t.color.light)) {
    const n = css.split(`--ds-color-${role.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}:`).length - 1
    if (n !== 3) throw new Error(`${t.name}: papel ${role} aparece ${n} vezes no CSS (esperado 3)`)
  }
  writeFileSync(`${cssDir}${t.name}.css`, css)
  writeFileSync(`${cssDir}${t.name}.tailwind.css`, toTailwindTheme(t))
}

const identidades = repoRoot + 'design-library/examples/identidades/'
mkdirSync(identidades, { recursive: true })
writeFileSync(
  identidades + 'themes.css',
  '/* gerado por @gahmp1/ds-theme (npm run build); não editar */\n\n' +
    themes.map((t) => toCssVars(t, `[data-product="${t.name}"]`)).join('\n'),
)
console.log(`tokens legados e ${themes.length} temas gerados`)
