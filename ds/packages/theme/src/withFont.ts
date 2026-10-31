import type { DSTheme, FontFamily } from './types.js'

/** Cópia do tema com `display` e `body` trocados (a mono fica): para testar uma fonte sem tocar no tema do produto. */
export function withFont(theme: DSTheme, family: FontFamily): DSTheme {
  return { ...theme, type: { ...theme.type, family: { ...theme.type.family, display: family, body: family } } }
}
