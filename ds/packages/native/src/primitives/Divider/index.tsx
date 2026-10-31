import type { SpaceStep } from '@gahmp1/ds-core'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical'
  /** Recuo nas pontas da linha (margem ao longo do eixo). */
  inset?: SpaceStep
  tone?: 'border' | 'borderMuted'
}

const useStyles = createStyles(({ color, shape }) => ({
  horizontal: { height: shape.borderWidth.thin, alignSelf: 'stretch' },
  vertical: { width: shape.borderWidth.thin, alignSelf: 'stretch' },
  border: { backgroundColor: color.border },
  borderMuted: { backgroundColor: color.borderMuted },
}))

export function Divider({ orientation = 'horizontal', inset, tone = 'border' }: DividerProps) {
  const s = useStyles()
  const space = useTheme().density.space
  return <View style={[s[orientation], s[tone], inset && (orientation === 'horizontal' ? { marginHorizontal: space[inset] } : { marginVertical: space[inset] })]} />
}
