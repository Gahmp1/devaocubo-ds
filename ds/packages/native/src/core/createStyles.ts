import type { ResolvedTheme } from '@gahmp1/ds-core'
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native'
import { useTheme } from './DSProvider.js'

type Styles = Record<string, ViewStyle | TextStyle | ImageStyle>

/** Estilos por tema em tempo de execução: `StyleSheet.create(factory(t))` memorizado por tema resolvido. */
export function createStyles<T extends Styles>(factory: (t: ResolvedTheme) => T): () => Readonly<T> {
  const cache = new WeakMap<ResolvedTheme, Readonly<T>>()
  return () => {
    const t = useTheme()
    let styles = cache.get(t)
    if (!styles) {
      styles = StyleSheet.create(factory(t))
      cache.set(t, styles)
    }
    return styles
  }
}
