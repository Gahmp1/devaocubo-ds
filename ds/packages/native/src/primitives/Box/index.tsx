import type { RadiusStep, SpaceStep } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { View, type StyleProp, type ViewStyle } from 'react-native'
import { useTheme } from '../../core/DSProvider.js'

export type BoxSurface = 'bg' | 'surface1' | 'surface2' | 'surface3'

export type BoxProps = {
  padding?: SpaceStep
  paddingX?: SpaceStep
  paddingY?: SpaceStep
  surface?: BoxSurface
  radius?: RadiusStep
  /** Só layout (flex, tamanho). */
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export function Box({ padding, paddingX, paddingY, surface, radius, style, children }: BoxProps) {
  const { density, color, shape } = useTheme()
  return (
    <View
      style={[
        padding && { padding: density.space[padding] },
        paddingX && { paddingHorizontal: density.space[paddingX] },
        paddingY && { paddingVertical: density.space[paddingY] },
        surface && { backgroundColor: color[surface] },
        radius && { borderRadius: shape.radius[radius] },
        style,
      ]}
    >
      {children}
    </View>
  )
}
