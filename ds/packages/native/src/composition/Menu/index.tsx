import { type DSIconName } from '@gahmp1/ds-core'
import { useRef, useState, type ReactNode } from 'react'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { Press } from '../../core/Press.js'
import { useRestoreFocus, type ViewInstance } from '../../internal/overlay.js'
import { Divider } from '../../primitives/Divider/index.js'
import { SheetPanel } from '../Sheet/Panel.js'
import { Row } from './Row.js'

export type MenuItem = { key: string; label: string; icon?: DSIconName; destructive?: boolean; onSelect: () => void }

export type MenuProps = {
  /** Conteúdo só visual: o `Menu` o envolve num botão e o toque não chega ao que estiver dentro. */
  trigger: ReactNode
  items: (MenuItem | 'separator')[]
}

const useStyles = createStyles(() => ({
  trigger: { alignSelf: 'flex-start' },
}))

/** Gatilho que abre as ações numa `Sheet`; escolher um item fecha a gaveta e chama o `onSelect` dele. */
export function Menu({ trigger, items }: MenuProps) {
  const s = useStyles()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<ViewInstance>(null)
  useRestoreFocus(open, triggerRef)
  const close = () => setOpen(false)
  return (
    <>
      <Press ref={triggerRef} component="Menu" accessibilityRole="button" accessibilityState={{ expanded: open }} onPress={() => setOpen(true)} style={s.trigger}>
        <View pointerEvents="none">{trigger}</View>
      </Press>
      <SheetPanel component="Menu" open={open} onClose={close} flush>
        <View accessibilityRole="menu">
          {items.map((item, i) =>
            item === 'separator' ? (
              <Divider key={`separator-${i}`} tone="borderMuted" />
            ) : (
              <Row
                key={item.key}
                item={item}
                onPress={() => {
                  close()
                  item.onSelect()
                }}
              />
            ),
          )}
        </View>
      </SheetPanel>
    </>
  )
}
