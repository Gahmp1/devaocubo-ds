// Ideia: number-ticker da beUI (licença e fonte a verificar) e NumberFlow (rolagem por dígito, algarismos tabulares); recriada sobre `motion`, sem código copiado.
import { digitsOf, rollDirection, type Trend } from '@gahmp1/ds-core'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTheme } from '../../core/useTheme.js'
import { Text, type TextColor, type TextVariant } from '../../primitives/Text/index.js'

export type NumberTickerProps = {
  value: number
  /** Texto do número (moeda, casas decimais); padrão `String`. Cada caractere vira uma casa. */
  format?: (n: number) => string
  /** Sentido em que a casa nova entra: sobe, desce ou segue a variação do valor. */
  trend?: Trend
  /** Passam ao `Text`; os algarismos são sempre tabulares. */
  variant?: TextVariant
  color?: TextColor
}

// A casa nova entra do lado `dir` (1 = por baixo) e a antiga sai para o lado oposto.
const VARIANTS = {
  enter: (dir: 1 | -1) => ({ y: `${dir * 100}%`, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: 1 | -1) => ({ y: `${-dir * 100}%`, opacity: 0 }),
}

export function NumberTicker({ value, format, trend = 'auto', variant = 'base', color = 'text' }: NumberTickerProps) {
  const { duration, easing, reduced } = useTheme().motion
  const [seen, setSeen] = useState({ value, dir: 1 as 1 | -1 })
  const dir = rollDirection(trend, seen.value, value, seen.dir)
  if (!Object.is(seen.value, value)) setSeen({ value, dir })
  const chars = digitsOf(value, format)
  const transition = { duration: reduced ? 0 : duration.base / 1000, ease: easing.standard }
  // Casas contadas do fim: o dígito das unidades mantém a mesma casa quando o número ganha ou perde algarismos.
  return (
    <Text variant={variant} color={color} tabular role="img" aria-label={chars.join('')}>
      {chars.map((ch, i) => (
        <span key={chars.length - i} className="ds-ticker__slot" aria-hidden>
          <AnimatePresence initial={false} mode="popLayout" custom={dir}>
            <motion.span key={ch} className="ds-ticker__char ds-anim" custom={dir} variants={VARIANTS} initial="enter" animate="center" exit="exit" transition={transition}>
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </Text>
  )
}
