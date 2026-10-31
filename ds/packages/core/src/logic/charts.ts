// Geometria dos gráficos em SVG puro, igual no RN (react-native-svg) e no web; nenhuma dependência de plataforma.

const finite = (n: number, fallback = 0) => (Number.isFinite(n) ? n : fallback)
const r2 = (n: number) => Math.round(n * 100) / 100

/**
 * Traço do arco de progresso: começa no topo e segue no sentido horário; use com `fill="none"` e `strokeWidth={thickness}`.
 * `value` fica entre 0 e 1 (NaN vira 0); 0 não desenha nada (caminho vazio). O círculo cheio sai em duas meias-voltas, porque um arco SVG de 360° some.
 */
export function arcPath(value: number, size: number, thickness: number): string {
  const v = Math.min(1, Math.max(0, finite(value)))
  const r = Math.max(0, (size - thickness) / 2)
  if (v === 0 || r === 0) return ''
  const c = size / 2
  if (v === 1) return `M ${c} ${r2(c - r)} A ${r} ${r} 0 1 1 ${c} ${r2(c + r)} A ${r} ${r} 0 1 1 ${c} ${r2(c - r)}`
  const a = v * 2 * Math.PI
  return `M ${c} ${r2(c - r)} A ${r} ${r} 0 ${v > 0.5 ? 1 : 0} 1 ${r2(c + r * Math.sin(a))} ${r2(c - r * Math.cos(a))}`
}

export type BarRect = { x: number; y: number; width: number; height: number; value: number }

/** Retângulos das barras, da esquerda para a direita, apoiadas na base; a maior ocupa `height` e as outras seguem proporcionais (negativo e NaN contam como 0). */
export function barLayout(data: { value: number }[], { width, height, gap }: { width: number; height: number; gap: number }): BarRect[] {
  const values = data.map((d) => Math.max(0, finite(d.value)))
  if (values.length === 0) return []
  const barWidth = Math.max(0, (width - gap * (values.length - 1)) / values.length)
  const max = Math.max(...values)
  return values.map((value, i) => {
    const h = max > 0 ? (value / max) * height : 0
    return { x: r2(i * (barWidth + gap)), y: r2(height - h), width: r2(barWidth), height: r2(h), value }
  })
}

/**
 * `line` e `area` (a linha fechada até a base) para os pontos, na ordem dada. Os eixos vão do mínimo ao máximo dos dados
 * (série constante fica no meio). `smooth` curva com tangentes horizontais nos pontos, que nunca passa dos valores vizinhos.
 */
export function linePath(points: { x: number; y: number }[], { width, height, smooth = false }: { width: number; height: number; smooth?: boolean }): { line: string; area: string } {
  const pts = points.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
  if (pts.length === 0) return { line: '', area: '' }
  const xs = pts.map((p) => p.x)
  const ys = pts.map((p) => p.y)
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
  const sx = (x: number) => r2(x1 === x0 ? width / 2 : ((x - x0) / (x1 - x0)) * width)
  const sy = (y: number) => r2(y1 === y0 ? height / 2 : height - ((y - y0) / (y1 - y0)) * height)
  const xy = pts.map((p) => [sx(p.x), sy(p.y)] as const)
  const line = xy
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`
      const [px, py] = xy[i - 1]
      if (!smooth) return `L ${x} ${y}`
      const mx = r2((px + x) / 2)
      return `C ${mx} ${py} ${mx} ${y} ${x} ${y}`
    })
    .join(' ')
  const [lx] = xy[xy.length - 1]
  return { line, area: `${line} L ${lx} ${height} L ${xy[0][0]} ${height} Z` }
}
