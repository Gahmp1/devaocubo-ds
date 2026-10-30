// Referência: beUI Native Animated Badge (MIT), https://github.com/starc007/beui-native
import { useDS } from '@gahmp1/ds-core'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme, useThemeMotion } from '../../core/useTheme.js'
import type { Tone } from '../Tag/index.js'
import { Text, type TextColor } from '../Text/index.js'

export type BadgeProps = {
  /** Número; acima de 99 mostra `99+`; zero (ou ausente, sem `dot`) esconde o selo. */
  count?: number
  /** Ponto sem texto ("novo"), em vez do número. */
  dot?: boolean
  /** Padrão `danger`. */
  tone?: Tone
  /** Âncora: o selo fica sobre o canto superior direito dela; sem ela o selo é o próprio elemento. */
  children?: ReactNode
}

const MAX = 99
const FG: Record<Tone, TextColor> = { neutral: 'text', accent: 'onAccent', success: 'onSuccess', warning: 'onWarning', danger: 'onDanger', info: 'onInfo' }
// O número entra por baixo e o antigo sai por cima quando sobe (ao contrário quando desce).
const ROLL = {
  enter: (dir: number) => ({ y: `${dir * 100}%`, opacity: 0 }),
  center: { y: '0%', opacity: 1 },
  exit: (dir: number) => ({ y: `${dir * -100}%`, opacity: 0 }),
}

export function Badge({ count = 0, dot, tone = 'danger', children }: BadgeProps) {
  const theme = useTheme()
  const { strings } = useDS()
  const { duration, reduced } = useThemeMotion()
  const last = useRef(count)
  const dir = count >= last.current ? 1 : -1
  useEffect(() => {
    last.current = count
  }, [count])

  const show = dot || count > 0
  const label = dot ? strings.new : count > MAX ? `${MAX}+` : String(count)
  const pill = show ? (
    <span role="img" aria-label={label} className={cx('ds-badge', `ds-badge--${tone}`, dot ? 'ds-badge--dot' : 'ds-badge--count', !!children && 'ds-badge--ring')}>
      {!dot && (
        <span className="ds-badge__roll" aria-hidden>
          {reduced ? (
            <Text variant="xsMedium" color={FG[tone]} tabular>{label}</Text>
          ) : (
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.span
                key={label}
                custom={dir}
                variants={ROLL}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: duration.fast / 1000, ease: theme.motion.easing.standard }}
                className="ds-badge__num ds-anim"
              >
                <Text variant="xsMedium" color={FG[tone]} tabular>{label}</Text>
              </motion.span>
            </AnimatePresence>
          )}
        </span>
      )}
    </span>
  ) : null
  if (!children) return pill
  return (
    <span className="ds-badge-anchor">
      {children}
      {pill && <span className="ds-badge__corner">{pill}</span>}
    </span>
  )
}
