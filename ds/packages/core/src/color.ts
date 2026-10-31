import { parseColor } from '@gahmp1/ds-theme'

const rgba = (r: number, g: number, b: number, a: number) =>
  `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${Math.round(a * 1000) / 1000})`

/** Interpola de `a` (t=0) para `b` (t=1) em RGB, alfa incluído. Aceita hex, rgb(a) e hsl(a). */
export function mixColor(a: string, b: string, t: number): string {
  const x = parseColor(a)
  const y = parseColor(b)
  const m = (p: number, q: number) => p + (q - p) * t
  return rgba(m(x.r, y.r), m(x.g, y.g), m(x.b, y.b), m(x.a, y.a))
}

/** Troca o alfa da cor (substitui, não multiplica). */
export function withAlpha(color: string, alpha: number): string {
  const { r, g, b } = parseColor(color)
  return rgba(r, g, b, alpha)
}
