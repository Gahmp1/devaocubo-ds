import { useDS } from '@gahmp1/ds-core'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Press } from '../../core/Press.js'
import { Text } from '../../primitives/Text/index.js'
import type { MenuItem } from './index.js'

const useStyles = createStyles((t) => ({
  // Mesma geometria da linha do `ListItem` (44 pt e recuos).
  row: { flexDirection: 'row', alignItems: 'center', gap: t.density.space.md, minHeight: 44, paddingHorizontal: t.density.space.lg, paddingVertical: t.density.space.md },
  label: { flex: 1 },
}))

export function Row({ item, onPress }: { item: MenuItem; onPress: () => void }) {
  const t = useTheme()
  const { Icon } = useDS()
  const s = useStyles()
  const tone = item.destructive ? 'danger' : 'text'
  return (
    <Press component="Menu" interactionId={item.key} accessibilityRole="menuitem" accessibilityLabel={item.label} onPress={onPress} style={s.row}>
      {item.icon && <Icon name={item.icon} size={t.icon.size.md} color={t.color[tone]} strokeWidth={t.icon.strokeWidth} />}
      <Text variant="lgMedium" color={tone} style={s.label}>{item.label}</Text>
    </Press>
  )
}
