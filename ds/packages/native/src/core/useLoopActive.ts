import { useEffect, useState } from 'react'
import { AppState } from 'react-native'
import { useThemeMotion } from './useThemeMotion.js'

/** Verdadeiro enquanto o app está em primeiro plano (`AppState` = 'active'). */
export function useAppActive(): boolean {
  const [active, setActive] = useState(AppState.currentState === 'active')
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => setActive(s === 'active'))
    return () => sub.remove()
  }, [])
  return active
}

/**
 * Pode um loop (giro, varredura, pulso) rodar agora? Falso com movimento reduzido, app fora de primeiro plano
 * ou `paused`. Fora da tela dentro de uma lista, a virtualização já desmonta o componente; telas que continuam
 * montadas mas escondidas (abas, pilha) passam `paused`.
 */
export function useLoopActive({ paused = false }: { paused?: boolean } = {}): boolean {
  const { reduced } = useThemeMotion()
  const appActive = useAppActive()
  return !reduced && appActive && !paused
}
