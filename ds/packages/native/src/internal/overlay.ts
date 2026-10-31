import { useDS } from '@gahmp1/ds-core'
import { useEffect, useRef, type ComponentRef, type RefObject } from 'react'
import { AccessibilityInfo, findNodeHandle, type View } from 'react-native'

export type ViewInstance = ComponentRef<typeof View>

const FOCUS_DELAY = 350 // ms; deixa o Modal terminar de montar (ou de sair) antes de mover o foco do leitor de tela

function focus(ref: RefObject<ViewInstance | null>) {
  const node = findNodeHandle(ref.current)
  if (node) AccessibilityInfo.setAccessibilityFocus(node)
}

/** Telemetria de um overlay: `open` ao abrir e `close` ao fechar (não emite na montagem fechada). */
export function useOverlayEvents(component: string, open: boolean, label?: string) {
  const { emit } = useDS()
  const was = useRef(false)
  useEffect(() => {
    if (was.current === open) return
    was.current = open
    emit({ component, kind: open ? 'open' : 'close', label })
  }, [component, open, label, emit])
}

/** Ao abrir, move o foco do leitor de tela para `ref` (o título), que então é lido. */
export function useFocusOnOpen(active: boolean, ref: RefObject<ViewInstance | null>) {
  useEffect(() => {
    if (!active) return
    const id = setTimeout(() => focus(ref), FOCUS_DELAY)
    return () => clearTimeout(id)
  }, [active, ref])
}

/** Ao fechar, devolve o foco do leitor de tela ao gatilho em `ref`. */
export function useRestoreFocus(open: boolean, ref: RefObject<ViewInstance | null>) {
  const was = useRef(false)
  useEffect(() => {
    const closed = was.current && !open
    was.current = open
    if (!closed) return
    const id = setTimeout(() => focus(ref), FOCUS_DELAY)
    return () => clearTimeout(id)
  }, [open, ref])
}
