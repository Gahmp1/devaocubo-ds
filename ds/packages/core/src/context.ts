import { createContext, useContext, type ReactNode } from 'react'
import type { DSTheme, Scheme } from '@gahmp1/ds-theme'
import type { DSFeedback, FeedbackPrefs } from './feedback.js'
import type { IconComponent } from './icons.js'
import type { InteractionEvent } from './interaction.js'
import type { DSStrings } from './strings.js'
import type { ResolvedTheme } from './theme.js'

export type DSContextValue = {
  theme: ResolvedTheme
  strings: DSStrings
  Icon: IconComponent
  emit: (e: InteractionEvent) => void
  feedback: DSFeedback
}

/** Props comuns dos provedores de `ds-native` e `ds-web`; cada um resolve 'system' à sua maneira. */
export type DSProviderBaseProps = {
  theme: DSTheme
  scheme?: 'system' | Scheme
  reducedMotion?: 'system' | boolean
  strings?: Partial<DSStrings>
  Icon: IconComponent
  onInteraction?: (e: InteractionEvent) => void
  /** Preferência da pessoa (o app a guarda); ausente = padrão do tema. */
  feedback?: Partial<FeedbackPrefs>
  children: ReactNode
}

export const DSContext = createContext<DSContextValue | null>(null)

export function useDS(): DSContextValue {
  const ctx = useContext(DSContext)
  if (!ctx) throw new Error('useDS fora de DSProvider')
  return ctx
}
