export interface Rgba { r: number; g: number; b: number; a: number }

const num = (s: string) => (s.endsWith('%') ? (parseFloat(s) / 100) * 255 : parseFloat(s))
const alpha = (s: string | undefined) => (s === undefined ? 1 : s.endsWith('%') ? parseFloat(s) / 100 : parseFloat(s))

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [f(0) * 255, f(8) * 255, f(4) * 255]
}

/** Aceita #rgb, #rrggbb, #rrggbbaa, rgb(), rgba(), hsl(), hsla() (sintaxe com vírgula ou espaço). */
export function parseColor(css: string): Rgba {
  const rgba = parse(css)
  // sem isto, uma cor malformada vira NaN e NaN < mínimo é falso: o par passaria na checagem
  if (![rgba.r, rgba.g, rgba.b, rgba.a].every(Number.isFinite) || rgba.a < 0 || rgba.a > 1) throw new Error(`cor inválida: ${css}`)
  return rgba
}

function parse(css: string): Rgba {
  const c = css.trim().toLowerCase()
  if (c.startsWith('#')) {
    let h = c.slice(1)
    if (h.length === 3) h = [...h].map((x) => x + x).join('')
    if ((h.length !== 6 && h.length !== 8) || !/^[0-9a-f]+$/.test(h)) throw new Error(`cor inválida: ${css}`)
    const v = (i: number) => parseInt(h.slice(i, i + 2), 16)
    return { r: v(0), g: v(2), b: v(4), a: h.length === 8 ? v(6) / 255 : 1 }
  }
  const m = c.match(/^(rgba?|hsla?)\((.*)\)$/)
  const parts = m ? m[2].split(/[\s,/]+/).filter(Boolean) : []
  if (!m || parts.length < 3 || parts.length > 4) throw new Error(`cor inválida: ${css}`)
  if (m[1].startsWith('rgb')) return { r: num(parts[0]), g: num(parts[1]), b: num(parts[2]), a: alpha(parts[3]) }
  const [r, g, b] = hslToRgb(parseFloat(parts[0]), parseFloat(parts[1]) / 100, parseFloat(parts[2]) / 100)
  return { r, g, b, a: alpha(parts[3]) }
}

function luminance({ r, g, b }: Rgba): number {
  const lin = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

/** Razão de contraste WCAG 2.x. Cores translúcidas não têm contraste definido sem o fundo: erro. */
export function contrastRatio(fg: string, bg: string): number {
  const a = parseColor(fg)
  const b = parseColor(bg)
  if (a.a < 1 || b.a < 1) throw new Error(`cor com alfa < 1 num par de contraste: ${fg} sobre ${bg}`)
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
