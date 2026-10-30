import type { ColorRoles, DSTheme, Scheme } from '../types.js'
import { contrastRatio } from './color.js'

type Pair = [fg: keyof ColorRoles, bg: keyof ColorRoles, min: number]

const PAIRS: Pair[] = [
  ['text', 'bg', 4.5], ['text', 'surface1', 4.5], ['text', 'surface2', 4.5], ['text', 'surface3', 4.5],
  ['textMuted', 'bg', 4.5], ['textMuted', 'surface1', 4.5],
  ['onAccent', 'accent', 4.5], ['onDanger', 'danger', 4.5], ['onWarning', 'warning', 4.5],
  ['onSuccess', 'success', 4.5], ['onInfo', 'info', 4.5],
  ['textSubtle', 'bg', 3], ['focus', 'bg', 3], ['accent', 'bg', 3],
  // sucesso e perigo também viram texto e ícone direto sobre o fundo (ex.: variação positiva, erro de campo)
  ['success', 'bg', 3], ['danger', 'bg', 3],
]

/** Lista de falhas AA do tema; vazia se ok. */
export function checkTheme(t: DSTheme): string[] {
  const fails: string[] = []
  for (const scheme of ['light', 'dark'] as Scheme[]) {
    const c = t.color[scheme]
    for (const [fg, bg, min] of PAIRS) {
      let ratio: number
      try {
        ratio = contrastRatio(c[fg], c[bg])
      } catch (e) {
        fails.push(`${t.name}/${scheme}: ${fg} sobre ${bg}: ${(e as Error).message}`)
        continue
      }
      if (ratio < min) fails.push(`${t.name}/${scheme}: ${fg} sobre ${bg} = ${ratio.toFixed(2)} (mínimo ${min})`)
    }
  }
  return fails
}
