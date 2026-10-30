import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { toLegacyDefaultsJson, toLegacyTokensCss } from '../generate/legacy.js'

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url))

writeFileSync(repoRoot + 'tokens.css', toLegacyTokensCss())
writeFileSync(repoRoot + 'defaults.json', toLegacyDefaultsJson())
console.log('tokens.css e defaults.json gerados')
