import { fontFamilies } from '@gahmp1/ds-fonts'
import { nativeFonts } from '@gahmp1/ds-fonts/native'
import type { DSTheme } from '@gahmp1/ds-theme'
import { useFonts } from 'expo-font'
import { useMemo } from 'react'

/** Fontes de cada família (por id) dos temas dados, no formato do `expo-font`; ids fora do registro são ignorados. */
function fontMap(themes: readonly DSTheme[], extraIds: readonly string[]): Record<string, number> {
  const ids = new Set<string>(extraIds)
  for (const t of themes) for (const f of Object.values(t.type.family)) if (f.id) ids.add(f.id)
  const map: Record<string, number> = {}
  for (const f of fontFamilies) if (ids.has(f.id)) Object.assign(map, nativeFonts[f.id])
  return map
}

/**
 * Carrega as fontes declaradas em `type.family.*.id` do(s) tema(s). Devolve `true` quando prontas (ou se falharam: o
 * texto cai na fonte do sistema). Aceite vários temas quando o app troca de tema em execução; o app segura a
 * primeira tela até `true`. `extraIds` carrega famílias além das dos temas (seletor de fonte de um catálogo).
 */
export function useThemeFonts(themes: DSTheme | readonly DSTheme[], extraIds: readonly string[] = []): boolean {
  const list = Array.isArray(themes) ? themes : [themes as DSTheme]
  const key = [...list.map((t) => t.name), ...extraIds].join('|')
  const map = useMemo(() => fontMap(list, extraIds), [key])
  const [loaded, error] = useFonts(map)
  return loaded || error !== null
}
