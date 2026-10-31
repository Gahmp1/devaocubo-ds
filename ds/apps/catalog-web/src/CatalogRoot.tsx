import type { FeedbackPrefs } from '@gahmp1/ds-core'
import type { DSTheme, Scheme } from '@gahmp1/ds-theme'
import { DSProvider } from '@gahmp1/ds-web'
import { createContext, useState, type ReactNode } from 'react'
import { CatalogIcon } from './CatalogIcon'

/** Preferência de feedback da pessoa, guardada pelo catálogo (como um app faria) e passada na prop `feedback` do provedor. */
export const SetFeedbackPrefs = createContext<(p: Partial<FeedbackPrefs>) => void>(() => {})

export function CatalogRoot({ theme, scheme, reducedMotion, children }: { theme: DSTheme; scheme: 'system' | Scheme; reducedMotion: 'system' | boolean; children: ReactNode }) {
  const [prefs, setPrefs] = useState<Partial<FeedbackPrefs>>({})
  return (
    <DSProvider theme={theme} scheme={scheme} reducedMotion={reducedMotion} Icon={CatalogIcon} feedback={prefs}>
      <SetFeedbackPrefs.Provider value={(p) => setPrefs((prev) => ({ ...prev, ...p }))}>{children}</SetFeedbackPrefs.Provider>
    </DSProvider>
  )
}
