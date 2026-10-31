import { createStyles, Press, useTheme } from '@gahmp1/ds-native'
import type { ComponentType } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { registry } from './gallery/registry'

export type GalleryGroup = 'fundação' | 'primitivos' | 'movimento' | 'composição' | 'ai'
/** Cada arquivo de src/gallery/ exporta um destes como default; o registro é gerado por scripts/barrels.mjs. */
export type GalleryEntry = { id: string; title: string; group: GalleryGroup; Screen: ComponentType }

const GROUPS: GalleryGroup[] = ['fundação', 'primitivos', 'movimento', 'composição', 'ai']
const entries: GalleryEntry[] = Object.values(registry).map((m) => m.default)
export const findEntry = (id: string | null) => entries.find((e) => e.id === id)

const useStyles = createStyles((t) => {
  const { type, density: d, shape, color: c } = t
  const font = { fontFamily: type.family.body.native[type.weight.regular] }
  return {
    list: { backgroundColor: c.bg },
    listContent: { padding: d.space.md, gap: d.space.lg },
    group: { gap: d.space.xs },
    groupTitle: { ...font, color: c.textMuted, fontSize: type.scale.xs.size, lineHeight: type.scale.xs.lineHeight, textTransform: 'uppercase' },
    item: {
      minHeight: d.control.md, justifyContent: 'center', paddingHorizontal: d.space.md,
      backgroundColor: c.surface1, borderRadius: shape.radius.md, borderWidth: shape.borderWidth.thin, borderColor: c.borderMuted,
    },
    itemText: { ...font, color: c.text, fontSize: type.scale.base.size, lineHeight: type.scale.base.lineHeight },
    screen: { flex: 1, backgroundColor: c.bg },
    back: { minHeight: d.control.sm, justifyContent: 'center', paddingHorizontal: d.space.md },
    backText: { ...font, color: c.accent, fontSize: type.scale.sm.size, lineHeight: type.scale.sm.lineHeight },
  }
})

export function Gallery({ screenId, onSelect }: { screenId: string | null; onSelect: (id: string | null) => void }) {
  const s = useStyles()
  const entry = findEntry(screenId)
  if (entry) {
    return (
      <View style={s.screen}>
        <Press component="Gallery" interactionId="back" accessibilityRole="button" accessibilityLabel="Voltar à galeria" style={s.back} onPress={() => onSelect(null)}>
          <Text style={s.backText}>‹ Galeria · {entry.title}</Text>
        </Press>
        <entry.Screen />
      </View>
    )
  }
  return (
    <ScrollView style={s.list} contentContainerStyle={s.listContent}>
      {GROUPS.map((g) => {
        const items = entries.filter((e) => e.group === g)
        if (!items.length) return null
        return (
          <View key={g} style={s.group}>
            <Text style={s.groupTitle}>{g}</Text>
            {items.map((e) => (
              <Press key={e.id} component="Gallery" interactionId={e.id} accessibilityRole="button" accessibilityLabel={e.title} style={s.item} onPress={() => onSelect(e.id)}>
                <Text style={s.itemText}>{e.title}</Text>
              </Press>
            ))}
          </View>
        )
      })}
    </ScrollView>
  )
}
