// Ideia: rise-in da beUI (licença e fonte a verificar), recriada (entrada com deslocamento e opacidade), sem código copiado.
import { motion } from 'motion/react'
import { Children, isValidElement, type ReactNode } from 'react'
import { useTheme } from '../../core/useTheme.js'

export type RevealFrom = 'bottom' | 'top' | 'left' | 'right' | 'fade'

export type RevealProps = {
  /** De onde o conteúdo vem; `fade` só muda a opacidade. */
  from?: RevealFrom
  /** ms antes da entrada. */
  delay?: number
  /** ms a mais por filho, em cascata (cada filho do `Reveal` entra `stagger` depois do anterior). */
  stagger?: number
  /** Falso faz a saída (opacidade e deslocamento voltam); o conteúdo segue montado, inerte e escondido do leitor de tela. */
  show?: boolean
  children?: ReactNode
}

// Distância do deslocamento em px e o lado de onde vem (x, y); `fade` não desloca.
const OFFSET = 24
const SIDE = { bottom: [0, 1], top: [0, -1], left: [-1, 0], right: [1, 0], fade: [0, 0] } as const

function RevealItem({ from, delay, show, children }: Required<Pick<RevealProps, 'from' | 'delay' | 'show'>> & { children: ReactNode }) {
  const { motion: theme } = useTheme()
  const { duration, easing, spring, personality, reduced } = theme
  // Reduzido: só opacidade, sem deslocamento. Fora o reduzido, a personalidade do tema escolhe mola (snappy) ou `easing.enter` (calm).
  const [x, y] = reduced ? [0, 0] : SIDE[from]
  const hidden = { opacity: 0, x: x * OFFSET, y: y * OFFSET }
  const enter = reduced
    ? { duration: duration.fast / 1000, ease: easing.standard }
    : personality === 'snappy'
      ? { type: 'spring' as const, ...spring }
      : { duration: duration.slow / 1000, ease: easing.enter }
  return (
    <motion.div
      className="ds-anim"
      initial={hidden}
      animate={show ? { opacity: 1, x: 0, y: 0 } : hidden}
      transition={show ? { ...enter, delay: delay / 1000 } : { duration: duration.base / 1000, ease: easing.exit }}
      inert={!show}
      aria-hidden={!show || undefined}
    >
      {children}
    </motion.div>
  )
}

export function Reveal({ from = 'bottom', delay = 0, stagger = 0, show = true, children }: RevealProps) {
  return (
    <>
      {Children.toArray(children).map((child, i) => (
        <RevealItem key={isValidElement(child) ? child.key : i} from={from} delay={delay + i * stagger} show={show}>
          {child}
        </RevealItem>
      ))}
    </>
  )
}
