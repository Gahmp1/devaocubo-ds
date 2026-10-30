import type { SpaceStep } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { View, type StyleProp, type ViewStyle } from 'react-native'
import { useTheme } from '../../core/DSProvider.js'

export type StackAlign = 'start' | 'center' | 'end' | 'stretch'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around'

export type StackProps = {
  direction?: 'row' | 'column'
  gap?: SpaceStep
  /** Eixo cruzado; padrão `stretch`. */
  align?: StackAlign
  /** Eixo principal; padrão `start`. */
  justify?: StackJustify
  wrap?: boolean
  /** Só layout (flex, tamanho). */
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

const ALIGN: Record<StackAlign, ViewStyle['alignItems']> = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch' }
const JUSTIFY: Record<StackJustify, ViewStyle['justifyContent']> = {
  start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around',
}

export function Stack({ direction = 'column', gap, align = 'stretch', justify = 'start', wrap, style, children }: StackProps) {
  const { density } = useTheme()
  return (
    <View
      style={[
        { flexDirection: direction, alignItems: ALIGN[align], justifyContent: JUSTIFY[justify], flexWrap: wrap ? 'wrap' : 'nowrap' },
        gap && { gap: density.space[gap] },
        style,
      ]}
    >
      {children}
    </View>
  )
}
