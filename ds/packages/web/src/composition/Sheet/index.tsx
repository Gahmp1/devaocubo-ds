// Referência: Zenith BottomSheet (SWFitness), organisms/BottomSheet/BottomSheet.tsx (alça 36×4, arrastar para fechar); Radix UI Dialog (MIT), https://github.com/radix-ui/primitives
import { useDS } from '@gahmp1/ds-core'
import { AnimatePresence, motion, useDragControls, type PanInfo } from 'motion/react'
import { Dialog } from 'radix-ui'
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Scrim, useOpenEmit, useOverlayTransition } from '../../internal/overlay.js'
import { IconButton } from '../../primitives/IconButton/index.js'
import { Text } from '../../primitives/Text/index.js'

export type SheetProps = {
  open: boolean
  onClose: () => void
  title?: string
  /** Alturas, da menor para a maior: `'content'` = a do conteúdo; número = px (limitado a 90% da tela). Arrastar a alça troca de altura; padrão `['content']`. */
  snap?: ('content' | number)[]
  /** `false` desliga Esc, clique no fundo, arrastar e o botão fechar: só o app fecha. Padrão `true`. */
  dismissible?: boolean
  /** Fixo embaixo; o `children` rola por cima dele. */
  footer?: ReactNode
  children?: ReactNode
}

const CLOSE_DISTANCE = 96 // px arrastados que contam como gesto (o Zenith usava 100)
const CLOSE_VELOCITY = 600 // px/s

export function Sheet({ open, onClose, title, snap = ['content'], dismissible = true, footer, children }: SheetProps) {
  const theme = useTheme()
  const { strings } = useDS()
  const transition = useOverlayTransition()
  const drag = useDragControls()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (open) setIndex(0)
  }, [open])
  useOpenEmit('Sheet', open, title)

  const size = snap[Math.min(index, snap.length - 1)]
  const style = { '--ds-sheet-height': size === 'content' ? 'auto' : `min(${size}px, 90dvh)` } as CSSProperties

  // Para baixo: altura anterior ou fecha; para cima: próxima altura.
  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    if (offset.y > CLOSE_DISTANCE || velocity.y > CLOSE_VELOCITY) {
      if (index > 0) setIndex(index - 1)
      else onClose()
    } else if ((offset.y < -CLOSE_DISTANCE || velocity.y < -CLOSE_VELOCITY) && index < snap.length - 1) setIndex(index + 1)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Scrim />
            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onEscapeKeyDown={(e) => !dismissible && e.preventDefault()}
              onInteractOutside={(e) => !dismissible && e.preventDefault()}
            >
              <motion.div
                className={cx('ds-sheet', 'ds-anim', theme.depth.model === 'shadow' && 'ds-sheet--shadow')}
                style={style}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={transition}
                drag={dismissible ? 'y' : false}
                dragControls={drag}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: snap.length > 1 ? 0.2 : 0.05, bottom: 0.6 }}
                dragMomentum={false}
                dragSnapToOrigin
                onDragEnd={onDragEnd}
              >
                {/* Zona de arrasto: alça e cabeçalho (o corpo rola sem disputar o gesto). */}
                <div
                  className="ds-sheet__head"
                  onPointerDown={(e) => {
                    if (dismissible && !(e.target as HTMLElement).closest('button')) drag.start(e)
                  }}
                >
                  <span className="ds-sheet__handle" aria-hidden />
                  <div className="ds-sheet__bar">
                    <Dialog.Title asChild>
                      {/* Sem `title` o Radix ainda exige o elemento; vazio e oculto. */}
                      <Text as="h2" variant="lgMedium" style={{ flex: 1 }} {...(title ? {} : { hidden: true })}>{title}</Text>
                    </Dialog.Title>
                    {dismissible && <IconButton icon="close" accessibilityLabel={strings.close} onPress={onClose} />}
                  </div>
                </div>
                <div className="ds-sheet__body">{children}</div>
                {footer && <div className="ds-sheet__footer">{footer}</div>}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
