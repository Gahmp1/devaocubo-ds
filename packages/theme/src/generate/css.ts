import type { ColorRoles, DSTheme, Scheme, Shadow } from '../types.js'

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
const shadow = (s: Shadow) => `${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`

function schemeVars(t: DSTheme, scheme: Scheme): string[] {
  const c = t.color[scheme]
  const d = t.depth[scheme]
  return [
    ...(Object.keys(c) as (keyof ColorRoles)[]).map((k) => `--ds-color-${kebab(k)}: ${c[k]};`),
    `--ds-depth-model: ${d.model};`,
    `--ds-shadow-card: ${shadow(d.card)};`,
    `--ds-shadow-overlay: ${shadow(d.overlay)};`,
  ]
}

function staticVars(t: DSTheme): string[] {
  const { type, shape, density, motion, ai } = t
  const out: string[] = []
  for (const [k, f] of Object.entries(type.family)) out.push(`--ds-font-${k}: ${f.web};`)
  for (const [k, s] of Object.entries(type.scale)) out.push(`--ds-text-${k}-size: ${s.size}px;`, `--ds-text-${k}-line: ${s.lineHeight}px;`)
  for (const [k, w] of Object.entries(type.weight)) out.push(`--ds-weight-${k}: ${w};`)
  for (const [k, v] of Object.entries(type.tracking)) out.push(`--ds-tracking-${k}: ${v}em;`)
  out.push(`--ds-label-case: ${type.labelCase};`, `--ds-numeric: ${type.numeric === 'tabular' ? 'tabular-nums' : 'normal'};`)
  for (const [k, v] of Object.entries(shape.radius)) out.push(`--ds-radius-${k}: ${v}px;`)
  out.push(`--ds-radius-control: ${shape.control === 'pill' ? shape.radius.full : shape.control === 'square' ? 0 : shape.radius.md}px;`)
  for (const [k, v] of Object.entries(shape.borderWidth)) out.push(`--ds-border-${k}: ${v}px;`)
  for (const [k, v] of Object.entries(density.space)) out.push(`--ds-space-${k}: ${v}px;`)
  for (const [k, v] of Object.entries(density.control)) out.push(`--ds-control-${k}: ${v}px;`)
  for (const [k, v] of Object.entries(motion.duration)) out.push(`--ds-duration-${k}: ${v}ms;`)
  for (const [k, v] of Object.entries(motion.easing)) out.push(`--ds-ease-${k}: cubic-bezier(${v.join(', ')});`)
  out.push(`--ds-ai-beam-period: ${ai.beamPeriodMs}ms;`, `--ds-ai-reveal-per-word: ${ai.revealMsPerWord}ms;`)
  return out
}

const block = (sel: string, decls: string[], indent = '') =>
  `${indent}${sel} {\n${decls.map((d) => `${indent}  ${d}`).join('\n')}\n${indent}}`

/**
 * Variáveis --ds-* do tema. `scope` é ':root' (arquivo do tema) ou '[data-product="x"]' (folha combinada).
 * data-theme explícito no mesmo elemento vence o esquema do SO, nos dois sentidos.
 */
export function toCssVars(t: DSTheme, scope = ':root'): string {
  return [
    `/* ${t.name}: gerado por @gahmp1/ds-theme; não editar */`,
    block(scope, [...staticVars(t), ...schemeVars(t, 'light')]),
    block(`${scope}[data-theme="dark"]`, schemeVars(t, 'dark')),
    `@media (prefers-color-scheme: dark) {\n${block(`${scope}:not([data-theme="light"])`, schemeVars(t, 'dark'), '  ')}\n}`,
    '',
  ].join('\n\n')
}

/** Mapeamento @theme inline do Tailwind 4 para as variáveis --ds-*. */
export function toTailwindTheme(t: DSTheme): string {
  const decls = [
    ...Object.keys(t.color.light).map((k) => `--color-${kebab(k)}: var(--ds-color-${kebab(k)});`),
    ...Object.keys(t.shape.radius).map((k) => `--radius-${k}: var(--ds-radius-${k});`),
    ...Object.keys(t.type.family).map((k) => `--font-${k}: var(--ds-font-${k});`),
  ]
  return `/* ${t.name}: gerado por @gahmp1/ds-theme; não editar */\n${block('@theme inline', decls)}\n`
}
