import { devaocubo } from './themes/devaocubo.js'
import { somma } from './themes/somma.js'
import { swfitness } from './themes/swfitness.js'
import { trippo } from './themes/trippo.js'
import type { DSTheme } from './types.js'

export type * from './types.js'
export { toLegacyDefaultsJson, toLegacyTokensCss } from './generate/legacy.js'
export { colorRoles, toCssVars, toTailwindTheme } from './generate/css.js'
export { contrastRatio, parseColor } from './check/color.js'
export { checkTheme } from './check/contrast.js'
export { withFont } from './withFont.js'
export { devaocubo, somma, swfitness, trippo }

export const themes: DSTheme[] = [devaocubo, swfitness, somma, trippo]
