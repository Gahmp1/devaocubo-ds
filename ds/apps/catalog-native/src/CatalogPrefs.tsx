import type { FeedbackPrefs } from '@gahmp1/ds-core'
import { createContext } from 'react'

/** Preferência de feedback da pessoa, guardada pelo catálogo (como um app faria) e passada na prop `feedback` do provedor. */
export const SetFeedbackPrefs = createContext<(p: Partial<FeedbackPrefs>) => void>(() => {})
