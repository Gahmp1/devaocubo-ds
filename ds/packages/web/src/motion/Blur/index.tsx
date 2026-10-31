// Ideia: Blur do Zenith (SWFitness; lá era só um glow de PNG), recriado com `backdrop-filter` e a tinta do tema por cima.
import { blurPx, BLUR_TINT_ALPHA } from '@gahmp1/ds-core'
import type { CSSProperties, ReactNode } from 'react'

export type BlurTint = 'surface' | 'bg'

export type BlurProps = {
  /** 0–100 (a escala do `expo-blur`, igual ao nativo): quanto do que está atrás é desfocado. */
  intensity?: number
  /** Cor do tema por cima do desfoque: `surface` (cartões) ou `bg` (fundo da tela). */
  tint?: BlurTint
  /** Só layout (posição, tamanho). */
  style?: Pick<CSSProperties, 'position' | 'top' | 'bottom' | 'left' | 'right' | 'insetBlock' | 'insetInline' | 'flex' | 'flexGrow' | 'flexShrink' | 'alignSelf' | 'width' | 'height' | 'minHeight' | 'maxHeight' | 'margin' | 'marginInline' | 'marginBlock'>
  /** Fica por cima do desfoque e da tinta. */
  children?: ReactNode
}

const DEFAULT_INTENSITY = 50

/** Desfoca o que está atrás (conteúdo rolando, imagem) dentro do próprio contorno. */
export function Blur({ intensity = DEFAULT_INTENSITY, tint = 'surface', style, children }: BlurProps) {
  const vars = {
    '--ds-blur-px': `${blurPx(intensity)}px`,
    '--ds-blur-tint': tint === 'bg' ? 'var(--ds-color-bg)' : 'var(--ds-color-surface1)',
    '--ds-blur-alpha': `${BLUR_TINT_ALPHA * 100}%`,
    ...style,
  } as CSSProperties
  return (
    <div className="ds-blur" style={vars}>
      {children}
    </div>
  )
}
