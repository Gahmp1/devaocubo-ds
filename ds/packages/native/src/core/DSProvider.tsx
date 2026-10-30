import { defaultStrings, DSContext, resolveTheme, useDS, type DSContextValue, type DSProviderBaseProps, type InteractionEvent, type ResolvedTheme } from '@gahmp1/ds-core'
import { useCallback, useMemo, useRef } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useReducedMotion } from 'react-native-reanimated'

const fill = StyleSheet.create({ root: { flex: 1 } })

/** Resolve esquema e movimento reduzido (`'system'` = o do aparelho), preenche o contexto e dá a raiz de gestos. */
export function DSProvider({ theme, scheme = 'system', reducedMotion = 'system', strings, Icon, onInteraction, children }: DSProviderBaseProps) {
  const os = useColorScheme()
  const systemReduced = useReducedMotion()
  const resolvedScheme = scheme === 'system' ? (os === 'dark' ? 'dark' : 'light') : scheme
  const reduced = reducedMotion === 'system' ? systemReduced : reducedMotion
  // emit estável: lê o onInteraction mais recente, então prop inline não recria o contexto.
  const onInteractionRef = useRef(onInteraction)
  onInteractionRef.current = onInteraction
  const emit = useCallback((e: InteractionEvent) => onInteractionRef.current?.(e), [])
  // A identidade do tema só muda com tema/esquema/movimento (createStyles memoriza por ela).
  const resolved = useMemo(() => resolveTheme(theme, resolvedScheme, reduced), [theme, resolvedScheme, reduced])
  // `strings` costuma chegar inline: a chave é o JSON do parcial (textos são dados puros).
  const stringsKey = JSON.stringify(strings ?? null)
  const mergedStrings = useMemo(() => ({ ...defaultStrings, ...strings }), [stringsKey])
  const value = useMemo<DSContextValue>(() => ({ theme: resolved, strings: mergedStrings, Icon, emit }), [resolved, mergedStrings, Icon, emit])
  return (
    <DSContext.Provider value={value}>
      <GestureHandlerRootView style={fill.root}>{children}</GestureHandlerRootView>
    </DSContext.Provider>
  )
}

export function useTheme(): ResolvedTheme {
  return useDS().theme
}
