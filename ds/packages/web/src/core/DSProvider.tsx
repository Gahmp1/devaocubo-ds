import { defaultStrings, DSContext, resolveTheme, type DSContextValue, type DSProviderBaseProps, type InteractionEvent } from '@gahmp1/ds-core'
import { useCallback, useLayoutEffect, useMemo, useRef, useSyncExternalStore } from 'react'

function useMedia(query: string): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    [query],
  )
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}

/**
 * Resolve esquema e movimento reduzido (`'system'` = o do navegador) e preenche o contexto.
 * Escreve `data-theme` (só com esquema explícito) e `data-reduced-motion` no `<html>`;
 * o CSS do tema o app importa uma vez.
 */
export function DSProvider({ theme, scheme = 'system', reducedMotion = 'system', strings, Icon, onInteraction, children }: DSProviderBaseProps) {
  const osDark = useMedia('(prefers-color-scheme: dark)')
  const osReduced = useMedia('(prefers-reduced-motion: reduce)')
  const resolvedScheme = scheme === 'system' ? (osDark ? 'dark' : 'light') : scheme
  const reduced = reducedMotion === 'system' ? osReduced : reducedMotion
  // emit estável: lê o onInteraction mais recente, então prop inline não recria o contexto.
  const onInteractionRef = useRef(onInteraction)
  onInteractionRef.current = onInteraction
  const emit = useCallback((e: InteractionEvent) => onInteractionRef.current?.(e), [])
  // A identidade do tema só muda com tema/esquema/movimento.
  const resolved = useMemo(() => resolveTheme(theme, resolvedScheme, reduced), [theme, resolvedScheme, reduced])
  // `strings` costuma chegar inline: a chave é o JSON do parcial (textos são dados puros).
  const stringsKey = JSON.stringify(strings ?? null)
  const mergedStrings = useMemo(() => ({ ...defaultStrings, ...strings }), [stringsKey])
  const value = useMemo<DSContextValue>(() => ({ theme: resolved, strings: mergedStrings, Icon, emit }), [resolved, mergedStrings, Icon, emit])

  useLayoutEffect(() => {
    const html = document.documentElement
    if (scheme === 'system') delete html.dataset.theme
    else html.dataset.theme = scheme
    html.dataset.reducedMotion = String(reduced)
    return () => {
      delete html.dataset.theme
      delete html.dataset.reducedMotion
    }
  }, [scheme, reduced])

  return <DSContext.Provider value={value}>{children}</DSContext.Provider>
}
