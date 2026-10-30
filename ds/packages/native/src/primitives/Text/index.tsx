import type { ColorRoles, TypeStep } from '@gahmp1/ds-theme'
import { Platform, Text as RNText, type StyleProp, type TextProps as RNTextProps, type TextStyle } from 'react-native'
import { createStyles } from '../../core/createStyles.js'

export type TextVariant = TypeStep | `${TypeStep}Medium`
export type TextColor = Extract<keyof ColorRoles, 'text' | 'textMuted' | 'textSubtle' | 'textDisabled' | 'bg' | 'accent' | 'onAccent' | 'danger' | 'onDanger' | 'warning' | 'success' | 'info'>

/** Só layout: cor, fonte, tamanho e caixa vêm do tema. */
export type TextLayoutStyle = Pick<TextStyle, 'flex' | 'flexGrow' | 'flexShrink' | 'flexBasis' | 'alignSelf' | 'margin' | 'marginHorizontal' | 'marginVertical' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'textAlign'>

/** Props do `Text` do RN (acessibilidade, `testID`, `onPress`, `selectable`...) passam adiante. */
export type TextProps = Omit<RNTextProps, 'style' | 'children'> & {
  variant?: TextVariant
  color?: TextColor
  /** Rótulo: caixa do tema (`labelCase`) e `tracking.wide`. */
  label?: boolean
  /** Família mono do tema. */
  mono?: boolean
  /** Algarismos tabulares; padrão = `type.numeric` do tema. */
  tabular?: boolean
  style?: StyleProp<TextLayoutStyle>
  children?: RNTextProps['children']
}

const useStyles = createStyles((t) => {
  const { type, color } = t
  // Fonte carregada para o peso, se o tema tiver (Android: nome por peso); senão a do sistema com o peso,
  // e para mono a monoespaçada da plataforma (família mono sem arquivo no tema).
  const system = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' })
  const font = (f: typeof type.family.body, w: keyof typeof type.weight, isMono = false): TextStyle => {
    const weight = type.weight[w]
    if (f.native[weight]) return { fontFamily: f.native[weight] }
    return isMono ? { fontFamily: system, fontWeight: String(weight) as TextStyle['fontWeight'] } : { fontWeight: String(weight) as TextStyle['fontWeight'] }
  }
  const numeric: TextStyle['fontVariant'] = type.numeric === 'tabular' ? ['tabular-nums'] : []
  const out: Record<string, TextStyle> = {
    tabular: { fontVariant: ['tabular-nums'] },
    proportional: { fontVariant: [] },
    mono: font(type.family.mono, 'regular', true),
    monoMedium: font(type.family.mono, 'medium', true),
  }
  for (const [step, { size, lineHeight }] of Object.entries(type.scale)) {
    const family = step === 'display' ? type.family.display : type.family.body
    const base = { fontSize: size, lineHeight, letterSpacing: type.tracking.normal * size, includeFontPadding: false, fontVariant: numeric }
    out[step] = { ...base, ...font(family, 'regular') }
    out[`${step}Medium`] = { ...base, ...font(family, 'medium') }
    out[`label_${step}`] = { textTransform: type.labelCase, letterSpacing: type.tracking.wide * size }
  }
  for (const [role, value] of Object.entries(color)) out[`color_${role}`] = { color: value }
  return out
})

export function Text({ variant = 'base', color = 'text', label, mono, tabular, style, children, ...rest }: TextProps) {
  const s = useStyles()
  const medium = variant.endsWith('Medium')
  const step = medium ? variant.slice(0, -'Medium'.length) : variant
  // `tabular` explícito vence; sem ele vale o `type.numeric` do tema, que já está no estilo da variante.
  const numeric = tabular === undefined ? undefined : tabular ? s.tabular : s.proportional
  return (
    <RNText
      {...rest}
      style={[s[variant], mono && (medium ? s.monoMedium : s.mono), label && s[`label_${step}`], numeric, s[`color_${color}`], style]}
    >
      {children}
    </RNText>
  )
}
