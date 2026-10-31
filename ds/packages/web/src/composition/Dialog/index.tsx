// Referência: Radix UI Dialog (MIT), https://github.com/radix-ui/primitives; não existe no Zenith.
import { useDS } from '@gahmp1/ds-core'
import { AnimatePresence, motion } from 'motion/react'
import { Dialog as Root } from 'radix-ui'
import type { ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Scrim, useOpenEmit, useOverlayTransition } from '../../internal/overlay.js'
import { Text } from '../../primitives/Text/index.js'

export type DialogProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  /** Botões do rodapé, da esquerda para a direita (o app escolhe as variantes do `Button`). */
  actions?: ReactNode
  /** Título em `danger` com ícone de aviso: a cor não é o único sinal. */
  destructive?: boolean
}

export function Dialog({ open, onClose, title, description, actions, destructive }: DialogProps) {
  const theme = useTheme()
  const { Icon } = useDS()
  const transition = useOverlayTransition()
  useOpenEmit('Dialog', open, title)

  return (
    <Root.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <AnimatePresence>
        {open && (
          <Root.Portal forceMount>
            <Scrim />
            <Root.Content asChild forceMount {...(description ? {} : { 'aria-describedby': undefined })}>
              <motion.div
                className={cx('ds-dialog', 'ds-anim', theme.depth.model === 'shadow' && 'ds-dialog--shadow')}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={transition}
              >
                <div className={cx('ds-dialog__title', destructive && 'ds-dialog__title--destructive')}>
                  {destructive && <Icon name="warning" size={theme.icon.size.md} color="currentColor" strokeWidth={theme.icon.strokeWidth} />}
                  <Root.Title asChild>
                    <Text as="h2" variant="lgMedium" color={destructive ? 'danger' : 'text'}>{title}</Text>
                  </Root.Title>
                </div>
                {description && (
                  <Root.Description asChild>
                    <Text as="p" color="textMuted">{description}</Text>
                  </Root.Description>
                )}
                {actions && <div className="ds-dialog__actions">{actions}</div>}
              </motion.div>
            </Root.Content>
          </Root.Portal>
        )}
      </AnimatePresence>
    </Root.Root>
  )
}
