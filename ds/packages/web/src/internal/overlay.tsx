// Referência: Radix UI Dialog (MIT), https://github.com/radix-ui/primitives (Overlay com `forceMount` + saída animada pelo `motion`)
import { useDS } from '@gahmp1/ds-core'
import { motion } from 'motion/react'
import { Dialog } from 'radix-ui'
import { useEffect, useRef } from 'react'
import { useThemeMotion } from '../core/useTheme.js'

/** Fundo do overlay: a cor `scrim` do tema, com fade pela duração `base`. */
export function Scrim() {
  const { duration, reduced } = useThemeMotion()
  return (
    <Dialog.Overlay asChild forceMount>
      <motion.div
        className="ds-scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : duration.base / 1000 }}
      />
    </Dialog.Overlay>
  )
}

/** Transição de entrada e saída do conteúdo: a mola do tema, ou nenhuma com movimento reduzido. */
export function useOverlayTransition() {
  const { spring, reduced } = useThemeMotion()
  return reduced ? ({ duration: 0 } as const) : ({ type: 'spring', ...spring } as const)
}

/** Telemetria de abrir e fechar de um overlay controlado (`open`): um evento por mudança, inclusive abrir já aberto. */
export function useOpenEmit(component: string, open: boolean, label?: string) {
  const { emit } = useDS()
  const was = useRef(false)
  useEffect(() => {
    if (open === was.current) return
    was.current = open
    emit({ component, kind: open ? 'open' : 'close', label })
  }, [open, emit, component, label])
}
