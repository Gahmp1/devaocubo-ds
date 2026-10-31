import { withAlpha, type ResolvedTheme } from '@gahmp1/ds-core'
import type { SpinnerTone } from '../Spinner/index.js'
import type { TextColor } from '../Text/index.js'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'inverse' | 'inverseOutline' | 'surface' | 'surfaceOutline' | 'danger'

export type Look = { bg: string; border: string; fg: TextColor; spinner: SpinnerTone }

// Zenith: atoms/DSButton/DSButton.tsx (PRIMARY_DISABLED_BG = primary @ disabledOpacity 0.3)
const DISABLED_TINT = 0.3
const CLEAR = 'transparent'

/**
 * Cores do botão por variante e estado. Desabilitado vem das cores do tema, nunca de opacidade
 * (o `Press` multiplica a opacidade pelo feedback de toque): preenchidos de acento/perigo viram
 * tinta a 30% com o texto cheio, o inverso vira cinza `textDisabled`, e os demais apagam texto e traço.
 */
export function buttonLook(t: ResolvedTheme, variant: ButtonVariant, off: boolean): Look {
  const c = t.color
  switch (variant) {
    case 'primary':
      return { bg: off ? withAlpha(c.accent, DISABLED_TINT) : c.accent, border: CLEAR, fg: 'onAccent', spinner: 'onAccent' }
    case 'danger':
      return { bg: off ? withAlpha(c.danger, DISABLED_TINT) : c.danger, border: CLEAR, fg: 'onDanger', spinner: 'onDanger' }
    case 'inverse':
      return { bg: off ? c.textDisabled : c.text, border: CLEAR, fg: 'bg', spinner: 'bg' }
    case 'outline':
      return { bg: CLEAR, border: off ? c.borderMuted : c.border, fg: off ? 'textDisabled' : 'text', spinner: 'text' }
    case 'ghost':
      return { bg: CLEAR, border: CLEAR, fg: off ? 'textDisabled' : 'text', spinner: 'text' }
    case 'inverseOutline':
      return { bg: CLEAR, border: off ? c.textDisabled : c.text, fg: off ? 'textDisabled' : 'text', spinner: 'text' }
    case 'surface':
      return { bg: c.surface1, border: CLEAR, fg: off ? 'textDisabled' : 'text', spinner: 'text' }
    case 'surfaceOutline':
      return { bg: c.surface1, border: off ? c.borderMuted : c.border, fg: off ? 'textDisabled' : 'text', spinner: 'text' }
  }
}
