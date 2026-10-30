// Referência: beUI Native Animated Badge (MIT), https://github.com/starc007/beui-native
import { useDS } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { View, type ViewStyle } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import type { TextColor } from '../Text/index.js'
import type { Tone } from '../Tag/index.js'
import { Roll } from './Roll.js'

export type BadgeProps = {
  /** Número; acima de 99 mostra `99+`; zero (ou ausente, sem `dot`) esconde o selo. */
  count?: number
  /** Ponto sem texto ("novo"), em vez do número. */
  dot?: boolean
  /** Padrão `danger`. */
  tone?: Tone
  /** Âncora: o selo fica sobre o canto superior direito dela; sem ela o selo é o próprio elemento. */
  children?: ReactNode
}

const MAX = 99
const DOT = 8 // pt
const MIN = 18 // pt, altura e largura mínimas do selo com número
const TONES: Tone[] = ['neutral', 'accent', 'success', 'warning', 'danger', 'info']
const FG: Record<Tone, TextColor> = { neutral: 'text', accent: 'onAccent', success: 'onSuccess', warning: 'onWarning', danger: 'onDanger', info: 'onInfo' }

const useStyles = createStyles((t) => {
  const out: Record<string, ViewStyle> = {
    pill: { alignItems: 'center', justifyContent: 'center', borderRadius: t.shape.radius.full },
    dot: { width: DOT, height: DOT },
    count: { minWidth: MIN, minHeight: MIN, paddingHorizontal: t.density.space.xs },
    ring: { borderWidth: t.shape.borderWidth.thick, borderColor: t.color.bg },
    wrap: { alignSelf: 'flex-start' },
    corner: { position: 'absolute', top: t.density.space.xxs, right: t.density.space.xxs, transform: [{ translateX: '50%' }, { translateY: '-50%' }] },
  }
  for (const tone of TONES) out[tone] = { backgroundColor: tone === 'neutral' ? t.color.surface3 : t.color[tone] }
  return out
})

export function Badge({ count = 0, dot, tone = 'danger', children }: BadgeProps) {
  const { strings } = useDS()
  const s = useStyles()
  if (!dot && count <= 0) return children ? <View style={s.wrap}>{children}</View> : null
  const label = dot ? strings.new : count > MAX ? `${MAX}+` : String(count)
  const pill = (
    <View accessible accessibilityRole="text" accessibilityLabel={label} style={[s.pill, dot ? s.dot : s.count, s[tone], !!children && s.ring]}>
      {!dot && <Roll label={label} value={count} color={FG[tone]} />}
    </View>
  )
  if (!children) return pill
  return (
    <View style={s.wrap}>
      {children}
      <View pointerEvents="none" style={s.corner}>{pill}</View>
    </View>
  )
}
