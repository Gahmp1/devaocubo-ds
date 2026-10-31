import { useDS, useFeedback } from '@gahmp1/ds-core'
import { motion, type PanInfo } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { useOverlayTransition } from '../../internal/overlay.js'
import { Button } from '../../primitives/Button/index.js'
import { IconButton } from '../../primitives/IconButton/index.js'
import { Text } from '../../primitives/Text/index.js'

export type ToastTone = 'neutral' | 'success' | 'danger'

export type ToastOptions = {
  title: string
  description?: string
  /** Padrão `neutral`. `success` toca `confirm` e `danger` toca `error` ao aparecer; `neutral` não toca nada. */
  tone?: ToastTone
  /** Botão do toast; tocar nele executa `onPress` e dispensa o toast. */
  action?: { label: string; onPress: () => void }
  /** Quanto fica na tela, em ms. Padrão: pelo tema (ver `dwellMs`). */
  durationMs?: number
}

export type ToastEntry = ToastOptions & { id: number }

// O tema não tem eixo de toast: a permanência segue a personalidade de movimento (a calma lê mais devagar).
const DWELL_MS = { calm: 5000, snappy: 4000 } as const
// Com ação a pessoa precisa de tempo para decidir (WCAG 2.2.1).
const ACTION_DWELL_FACTOR = 1.5
const SWIPE_DISTANCE = 80 // px arrastados que dispensam o toast
const SWIPE_VELOCITY = 500 // px/s
const TONE_ICON = { success: 'success', danger: 'error' } as const

/** Conta a permanência e a congela enquanto `paused` (cursor ou foco no toast), guardando o que faltava. */
function useDismissTimer(ms: number, paused: boolean, done: () => void) {
  const left = useRef(ms)
  const last = useRef(done)
  last.current = done
  useEffect(() => {
    if (paused) return
    const t0 = Date.now()
    const id = setTimeout(() => last.current(), left.current)
    return () => {
      clearTimeout(id)
      left.current -= Date.now() - t0
    }
  }, [paused])
}

export function ToastView({ toast, onDismiss }: { toast: ToastEntry; onDismiss: () => void }) {
  const theme = useTheme()
  const { Icon, strings, emit } = useDS()
  const { play } = useFeedback()
  const transition = useOverlayTransition()
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const tone = toast.tone ?? 'neutral'
  const dwell = toast.durationMs ?? DWELL_MS[theme.motion.personality] * (toast.action ? ACTION_DWELL_FACTOR : 1)
  useDismissTimer(dwell, hover || focus, onDismiss)

  useEffect(() => {
    emit({ component: 'Toast', kind: 'open', label: toast.title })
    if (tone === 'success') play('confirm')
    else if (tone === 'danger') play('error')
  }, []) // uma vez por toast: o `ToastHost` remonta o componente a cada `id`

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    if (Math.abs(offset.x) > SWIPE_DISTANCE || Math.abs(velocity.x) > SWIPE_VELOCITY) onDismiss()
  }

  return (
    <motion.div
      className={cx('ds-toast', 'ds-anim', `ds-toast--${tone}`, theme.depth.model === 'shadow' && 'ds-toast--shadow')}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={transition}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={onDragEnd}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocus(false)}
    >
      {tone !== 'neutral' && (
        <span className="ds-toast__icon" aria-hidden>
          <Icon name={TONE_ICON[tone]} size={theme.icon.size.md} color="currentColor" strokeWidth={theme.icon.strokeWidth} />
        </span>
      )}
      <div className="ds-toast__body">
        <Text variant="smMedium">{toast.title}</Text>
        {toast.description && <Text variant="sm" color="textMuted">{toast.description}</Text>}
      </div>
      {toast.action && (
        <Button
          title={toast.action.label}
          variant="ghost"
          size="small"
          onPress={() => {
            toast.action?.onPress()
            onDismiss()
          }}
        />
      )}
      <IconButton icon="close" accessibilityLabel={strings.close} size="small" color="textMuted" onPress={onDismiss} />
    </motion.div>
  )
}
