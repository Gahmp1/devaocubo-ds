import { glowFalloff, type GlowColor } from '@gahmp1/ds-core'

export const GLOW_VAR: Record<GlowColor, string> = { aiGlow: 'var(--ds-color-ai-glow)', accent: 'var(--ds-color-accent)' }

/** `radial-gradient` gaussiano de `color` (cor CSS) que enche o elemento até a borda mais próxima, de alfa 1 no centro a ~0. */
export function glowGradient(color: string): string {
  const { positions, alphas } = glowFalloff()
  const stops = positions.map((t, i) => `color-mix(in srgb, ${color} ${Math.round(alphas[i] * 1000) / 10}%, transparent) ${Math.round(t * 1000) / 10}%`)
  return `radial-gradient(closest-side, ${stops.join(', ')})`
}
