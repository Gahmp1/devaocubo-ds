// Ideia: Blur do Zenith (SWFitness; lá era só um glow de PNG), recriado com o desfoque nativo do expo-blur e a tinta do tema por cima.
import { BLUR_TINT_ALPHA, withAlpha } from '@gahmp1/ds-core'
import { BlurView } from 'expo-blur'
import type { ReactNode } from 'react'
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { useTheme } from '../../core/DSProvider.js'

export type BlurTint = 'surface' | 'bg'

export type BlurProps = {
  /** 1–100 (a escala do `expo-blur`): quanto do que está atrás é desfocado. */
  intensity?: number
  /** Cor do tema por cima do desfoque: `surface` (cartões) ou `bg` (fundo da tela). */
  tint?: BlurTint
  /** Só layout (posição, tamanho). */
  style?: StyleProp<Pick<ViewStyle, 'position' | 'top' | 'bottom' | 'left' | 'right' | 'flex' | 'flexGrow' | 'flexShrink' | 'alignSelf' | 'width' | 'height' | 'minHeight' | 'maxHeight' | 'margin' | 'marginHorizontal' | 'marginVertical'>>
  /** Fica por cima do desfoque e da tinta. */
  children?: ReactNode
}

const DEFAULT_INTENSITY = 50

/** Desfoca o que está atrás (conteúdo rolando, imagem) dentro do próprio contorno. No Android o desfoque real pede um `BlurTargetView` do `expo-blur`; sem ele só a tinta aparece. */
export function Blur({ intensity = DEFAULT_INTENSITY, tint = 'surface', style, children }: BlurProps) {
  const { color, scheme } = useTheme()
  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <BlurView intensity={intensity} tint={scheme} style={StyleSheet.absoluteFill} />
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: withAlpha(tint === 'bg' ? color.bg : color.surface1, BLUR_TINT_ALPHA) }]} />
      {children}
    </View>
  )
}
