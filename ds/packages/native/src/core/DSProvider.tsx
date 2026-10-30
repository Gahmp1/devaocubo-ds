import { defaultStrings, DSContext, resolveTheme, useDS, type DSContextValue, type DSProviderBaseProps, type InteractionEvent, type ResolvedTheme } from '@gahmp1/ds-core'
import { useCallback, useMemo } from 'react'
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
  const emit = useCallback((e: InteractionEvent) => onInteraction?.(e), [onInteraction])
  const value = useMemo<DSContextValue>(
    () => ({ theme: resolveTheme(theme, resolvedScheme, reduced), strings: { ...defaultStrings, ...strings }, Icon, emit }),
    [theme, resolvedScheme, reduced, strings, Icon, emit],
  )
  return (
    <DSContext.Provider value={value}>
      <GestureHandlerRootView style={fill.root}>{children}</GestureHandlerRootView>
    </DSContext.Provider>
  )
}

export function useTheme(): ResolvedTheme {
  return useDS().theme
}
