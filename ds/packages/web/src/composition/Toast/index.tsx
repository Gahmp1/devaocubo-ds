// Referência: Sonner (MIT), https://github.com/emilkowalski/sonner (fila de um por vez, pausa ao pairar, arrastar para dispensar); Radix Toast (MIT), https://github.com/radix-ui/primitives (anúncio em região viva à parte); Zenith Toast (SWFitness), organisms/Toast/Toast.tsx (a fila é nova).
import { AnimatePresence } from 'motion/react'
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastView, type ToastEntry, type ToastOptions } from './ToastView.js'

export type { ToastOptions, ToastTone } from './ToastView.js'

type ToastApi = {
  /** Põe o toast na fila; só um aparece por vez, na ordem de chegada. */
  show: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastApi | null>(null)

export function useToast(): ToastApi {
  const api = useContext(ToastContext)
  if (!api) throw new Error('useToast fora de ToastHost')
  return api
}

/**
 * Provedor e palco dos toasts: envolva o app (dentro do `DSProvider`) e chame `useToast().show(...)` de qualquer ponto.
 * Fixo no topo, sem roubar o foco; o leitor de tela ouve o texto em regiões vivas (`status`; `alert` no tom `danger`).
 */
export function ToastHost({ children }: { children?: ReactNode }) {
  const [queue, setQueue] = useState<ToastEntry[]>([])
  const nextId = useRef(0)
  const show = useCallback((options: ToastOptions) => setQueue((q) => [...q, { ...options, id: nextId.current++ }]), [])
  const api = useMemo(() => ({ show }), [show])
  const current = queue[0]
  // Por id: o toast que sai ainda está montado durante a animação e pode pedir de novo (timer, fechar, arrastar).
  const dismiss = (id: number) => setQueue((q) => q.filter((t) => t.id !== id))
  const announcement = current && (current.description ? `${current.title}. ${current.description}` : current.title)

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="ds-toast-viewport">
        <AnimatePresence mode="wait">{current && <ToastView key={current.id} toast={current} onDismiss={() => dismiss(current.id)} />}</AnimatePresence>
        {/* Regiões vivas sempre montadas (uma inserida junto do texto pode não ser anunciada); o toast visível não é live. */}
        <div role="status" className="ds-toast__announce">{current?.tone !== 'danger' && announcement}</div>
        <div role="alert" className="ds-toast__announce">{current?.tone === 'danger' && announcement}</div>
      </div>
    </ToastContext.Provider>
  )
}
