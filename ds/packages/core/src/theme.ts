import type { ColorRoles, DSTheme, Scheme } from '@gahmp1/ds-theme'

export type ResolvedTheme = Omit<DSTheme, 'color' | 'depth' | 'provisional'> & {
  scheme: Scheme
  color: ColorRoles
  depth: DSTheme['depth'][Scheme]
  provisional: boolean
  motion: DSTheme['motion'] & { reduced: boolean }
}

/** Escolhe o esquema e achata os eixos por esquema; `reducedMotion` vem do sistema ou do provedor. */
export function resolveTheme(theme: DSTheme, scheme: Scheme, reducedMotion: boolean): ResolvedTheme {
  const { color, depth, provisional, motion, ...rest } = theme
  return {
    ...rest,
    scheme,
    color: color[scheme],
    depth: depth[scheme],
    provisional: provisional[scheme],
    motion: { ...motion, reduced: reducedMotion },
  }
}

/** Degrau de espaçamento do tema (`density.space`). */
export type SpaceStep = keyof DSTheme['density']['space']
/** Degrau de raio do tema (`shape.radius`). */
export type RadiusStep = keyof DSTheme['shape']['radius']
