import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createStyles } from '../../core/createStyles.js'
import { ToastView, type ToastItem } from './ToastView.js'

export type ToastOptions = {
  title: string
  description?: string
  /** Padrão `neutral`. `success` e `danger` tocam o feedback do tema ao aparecer; `neutral` não toca nada. */
  tone?: 'neutral' | 'success' | 'danger'
  action?: { label: string; onPress: () => void }
  /** Quanto fica na tela, em ms. Padrão: pelo tema (calmo 5000, ágil 4000; ×1,5 com `action`). */
  durationMs?: number
}

type ToastApi = { show: (options: ToastOptions) => void }

const ToastContext = createContext<ToastApi | null>(null)

/** Enfileira um toast no `ToastHost` mais próximo. */
export function useToast(): ToastApi {
  const api = useContext(ToastContext)
  if (!api) throw new Error('useToast fora de ToastHost')
  return api
}

const useStyles = createStyles((t) => ({
  root: { flex: 1 },
  // A camada deixa o toque passar; só o toast recebe.
  layer: { position: 'absolute', left: 0, right: 0, paddingHorizontal: t.density.space.lg },
}))

/**
 * Raiz dos toasts: ponha uma vez no topo do app, dentro do `DSProvider` e do `SafeAreaProvider`, envolvendo as telas.
 * Um toast por vez, na ordem de chegada. Um `Modal` do RN (`Sheet`, `Dialog`) fica por cima do toast.
 */
export function ToastHost({ children }: { children?: ReactNode }) {
  const s = useStyles()
  const insets = useSafeAreaInsets()
  const [queue, setQueue] = useState<ToastItem[]>([])
  const seq = useRef(0)
  const api = useMemo<ToastApi>(() => ({ show: (options) => setQueue((q) => [...q, { ...options, id: ++seq.current }]) }), [])
  const done = useCallback((id: number) => setQueue((q) => q.filter((i) => i.id !== id)), [])
  const current = queue[0]
  return (
    <ToastContext.Provider value={api}>
      <View style={s.root}>
        {children}
        {current && (
          <View pointerEvents="box-none" style={[s.layer, { top: insets.top }]}>
            <ToastView key={current.id} item={current} onDone={done} />
          </View>
        )}
      </View>
    </ToastContext.Provider>
  )
}
