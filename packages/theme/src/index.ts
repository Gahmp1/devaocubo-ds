import type { DSTheme } from './types.js'

export type * from './types.js'
export { toLegacyDefaultsJson, toLegacyTokensCss } from './generate/legacy.js'
export { contrastRatio, parseColor } from './check/color.js'
export { checkTheme } from './check/contrast.js'

export const themes: DSTheme[] = []
