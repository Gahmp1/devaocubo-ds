import { devaocubo } from './themes/devaocubo.js'
import type { DSTheme } from './types.js'

export type * from './types.js'
export { toLegacyDefaultsJson, toLegacyTokensCss } from './generate/legacy.js'
export { toCssVars, toTailwindTheme } from './generate/css.js'
export { contrastRatio, parseColor } from './check/color.js'
export { checkTheme } from './check/contrast.js'
export { devaocubo }

export const themes: DSTheme[] = [devaocubo]
