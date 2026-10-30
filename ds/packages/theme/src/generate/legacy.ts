import { legacyCss, legacyDefaults, type Entry } from '../legacy/devaocubo.js'

const decls = (entries: readonly Entry[], indent: string) =>
  entries.map(([k, v]) => `${indent}--${k}: ${v};`).join('\n')

/** Reproduz byte a byte o tokens.css do pacote raiz. */
export function toLegacyTokensCss(): string {
  const { light, lightStatus, dark, darkStatus } = legacyCss
  const colors = [...light.filter(([k]) => k !== 'radius'), ...lightStatus].map(([k]) => k)
  return [
    ':root {',
    decls(light, '  '),
    '',
    decls(lightStatus, '  '),
    '}',
    '',
    '[data-theme="dark"] {',
    decls(dark, '  '),
    '',
    decls(darkStatus, '  '),
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  :root:not([data-theme="light"]) {',
    decls([...dark, ...darkStatus], '    '),
    '  }',
    '}',
    '',
    '@theme inline {',
    colors.map((k) => `  --color-${k}: hsl(var(--${k}));`).join('\n'),
    '',
    '  --radius-sm: calc(var(--radius) - 4px);',
    '  --radius-md: calc(var(--radius) - 2px);',
    '  --radius-lg: var(--radius);',
    '  --radius-xl: calc(var(--radius) + 4px);',
    '}',
    '',
    '* { border-color: hsl(var(--border)); }',
    'body { background: hsl(var(--background)); color: hsl(var(--foreground)); }',
    '',
  ].join('\n')
}

/** Reproduz byte a byte o defaults.json do pacote raiz (lido pelo ProjectsCLI). */
export function toLegacyDefaultsJson(): string {
  return JSON.stringify(legacyDefaults, null, 2) + '\n'
}
