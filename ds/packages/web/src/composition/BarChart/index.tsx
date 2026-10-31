// Referência: Zenith BarChart (SWFitness), molecules/BarChart/; entrada das barras crescendo da base, ideia do beUI web (recriada com `motion`).
import { barLayout } from '@gahmp1/ds-core'
import { motion } from 'motion/react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { useChartEnter } from '../../internal/chartEnter.js'
import { useWidth } from '../../internal/useWidth.js'

export type BarChartProps = {
  data: { label: string; value: number }[]
  /** Índice da barra em destaque: as outras recuam. */
  highlight?: number
  /** Altura em px, rótulos incluídos. Padrão 160. */
  height?: number
  /** Texto do valor sobre cada barra e na descrição para o leitor de tela. Padrão `String(value)`. */
  formatValue?: (value: number) => string
}

// Atraso de uma barra para a seguinte na entrada, em s.
const STAGGER = 0.04

export function BarChart({ data, highlight, height = 160, formatValue = String }: BarChartProps) {
  const theme = useTheme()
  const { reduced, transition } = useChartEnter()
  const [ref, width] = useWidth<HTMLDivElement>()
  const { space } = theme.density
  const line = theme.type.scale.xs.lineHeight
  // Faixa do valor acima das barras e do rótulo abaixo; o resto é a área das barras.
  const top = line + space.xxs
  const bottom = line + space.xs
  const plot = Math.max(0, height - top - bottom)
  const bars = barLayout(data, { width, height: plot, gap: space.xs })
  const summary = data.map((d) => `${d.label}: ${formatValue(d.value)}`).join(', ')

  return (
    <div ref={ref} className="ds-bar-chart" style={{ blockSize: height }} role={data.length > 0 ? 'img' : undefined} aria-label={data.length > 0 ? summary : undefined}>
      {width > 0 && (
        <svg width={width} height={height} aria-hidden>
          <line className="ds-bar-chart__base" x1={0} x2={width} y1={top + plot} y2={top + plot} />
          {bars.map((b, i) => {
            const active = highlight === undefined || highlight === i
            const mid = b.x + b.width / 2
            return (
              <g key={i}>
                <motion.rect
                  className={cx('ds-bar-chart__bar', 'ds-anim', !active && 'ds-bar-chart__bar--dim')}
                  x={b.x}
                  y={top + b.y}
                  width={b.width}
                  height={b.height}
                  rx={Math.min(theme.shape.radius.sm, b.width / 2, b.height / 2)}
                  style={{ originY: 1 }}
                  initial={reduced ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ ...transition, delay: reduced ? 0 : i * STAGGER }}
                />
                <text className={cx('ds-bar-chart__text', highlight === i && 'ds-bar-chart__text--active')} x={mid} y={top + b.y - space.xxs} textAnchor="middle">
                  {formatValue(data[i].value)}
                </text>
                <text className="ds-bar-chart__text" x={mid} y={height - space.xxs} textAnchor="middle">
                  {data[i].label}
                </text>
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}
