import { useDS } from '@gahmp1/ds-core'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Text } from '../../primitives/Text/index.js'
import { ListItem } from '../ListItem/index.js'

const useStyles = createStyles((t) => ({
  // Mesma geometria da linha do `ListItem` (44 pt, recuos e check reservado), que não tem estado desabilitado.
  off: { flexDirection: 'row', alignItems: 'center', gap: t.density.space.md, minHeight: 44, paddingHorizontal: t.density.space.lg, paddingVertical: t.density.space.md },
  label: { flex: 1 },
  check: { width: t.icon.size.md },
}))

/** Opção da lista: `ListItem selected` quando dá para escolher; desabilitada vira linha apagada, sem toque. */
export function Option({ label, selected, disabled, onPress }: { label: string; selected: boolean; disabled?: boolean; onPress: () => void }) {
  const s = useStyles()
  const t = useTheme()
  const { Icon } = useDS()
  if (!disabled) return <ListItem title={label} selected={selected} onPress={onPress} />
  return (
    <View accessible accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled: true, selected }} style={s.off}>
      <Text variant="lgMedium" color="textDisabled" style={s.label}>{label}</Text>
      <View style={s.check}>{selected && <Icon name="check" size={t.icon.size.md} color={t.color.textDisabled} strokeWidth={t.icon.strokeWidth} />}</View>
    </View>
  )
}
