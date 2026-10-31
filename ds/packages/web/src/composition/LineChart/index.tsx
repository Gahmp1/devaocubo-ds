// Referência: Zenith LineChart (SWFitness), molecules/LineChart/; `loading` que respira e `emptyText`: react-native-livechart (MIT), só a ideia, desenho em SVG.
import { linePath, useDS } from '@gahmp1/ds-core'
import { motion } from 'motion/react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { useChartEnter } from '../../internal/chartEnter.js'
import { useWidth } from '../../internal/useWidth.js'
import { Text } from '../../primitives/Text/index.js'

export type LineChartProps = {
  data: { x: number; y: number }[]
  /** Preenche o espaço entre a linha e a base. */
  area?: boolean
  /** Altura em px. Padrão 160. */
  height?: number
  /** Mostra uma linha de espera que respira no lugar dos dados. */
  loading?: boolean
  /** Texto no lugar do gráfico quando `data` está vazio. */
  emptyText?: string
}

// Linha de espera do `loading`: forma qualquer, só sugere uma série.
const PLACEHOLDER = [0.3, 0.55, 0.4, 0.7, 0.5, 0.8].map((y, x) => ({ x, y }))

export function LineChart({ data, area, height = 160, loading, emptyText }: LineChartProps) {
  const theme = useTheme()
  const { strings } = useDS()
  const { reduced, transition } = useChartEnter()
  const [ref, width] = useWidth<HTMLDivElement>()
  const empty = data.length === 0 && !loading
  // Folga para o traço não ser cortado nas bordas do SVG.
  const inset = theme.shape.borderWidth.thick
  const plot = { width: Math.max(0, width - inset * 2), height: Math.max(0, height - inset * 2) }
  const { line, area: fill } = linePath(loading ? PLACEHOLDER : data, { ...plot, smooth: true })
  const label = loading ? strings.loading : data.map((p) => p.y).join(', ')

  return (
    <div
      ref={ref}
      className={cx('ds-line-chart', loading && 'ds-line-chart--loading ds-anim')}
      style={{ blockSize: height }}
      role={empty ? undefined : 'img'}
      aria-label={empty ? undefined : label}
      aria-busy={loading || undefined}
    >
      {empty && emptyText && (
        <Text variant="sm" color="textMuted">{emptyText}</Text>
      )}
      {!empty && width > 0 && (
        <svg width={width} height={height} aria-hidden>
          <g transform={`translate(${inset} ${inset})`}>
            {[0, 0.5, 1].map((f) => (
              <line key={f} className="ds-line-chart__grid" x1={0} x2={plot.width} y1={plot.height * f} y2={plot.height * f} />
            ))}
            {area && !loading && (
              <motion.path
                className="ds-line-chart__area"
                d={fill}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={transition}
              />
            )}
            <motion.path
              className="ds-line-chart__line"
              d={line}
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={transition}
            />
          </g>
        </svg>
      )}
    </div>
  )
}
