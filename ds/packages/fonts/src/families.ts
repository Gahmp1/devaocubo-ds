import data from './families.json' with { type: 'json' }

export type FontRole = 'sans' | 'mono' | 'serif'
export type FontWeightKey = 400 | 500 | 600 | 700

export interface FontFamilyInfo {
  id: string
  /** Valor de `font-family` no @font-face. */
  name: string
  role: FontRole
  license: 'OFL-1.1' | 'proprietary'
  /** Arquivo (dentro de files/<id>/) de cada peso disponível. */
  faces: Partial<Record<FontWeightKey, string>>
}

export const fontFamilies = data as FontFamilyInfo[]

/** Pilha de reserva por papel, usada enquanto a fonte carrega e onde ela falta. */
const FALLBACK: Record<FontRole, string> = {
  sans: 'system-ui, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  serif: 'Georgia, serif',
}

export interface ThemeFontFamily {
  id: string
  web: string
  native: Partial<Record<FontWeightKey, string>>
}

/** Família no formato do tema (`type.family.*`): pilha web e nomes nativos por peso, a partir do id. */
export function fontFamily(id: string): ThemeFontFamily {
  const f = fontFamilies.find((x) => x.id === id)
  if (!f) throw new Error(`fonte desconhecida: ${id}`)
  const native: Partial<Record<FontWeightKey, string>> = {}
  for (const [w, file] of Object.entries(f.faces)) native[Number(w) as FontWeightKey] = file.replace(/\.ttf$/, '')
  return { id: f.id, web: `'${f.name}', ${FALLBACK[f.role]}`, native }
}
