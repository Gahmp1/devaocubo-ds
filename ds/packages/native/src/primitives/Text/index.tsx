import type { ColorRoles, TypeStep } from '@gahmp1/ds-theme'
import type { ReactNode } from 'react'
import { Text as RNText, type TextStyle } from 'react-native'
import { createStyles } from '../../core/createStyles.js'

export type TextVariant = TypeStep | `${TypeStep}Medium`
export type TextColor = Extract<keyof ColorRoles, 'text' | 'textMuted' | 'textSubtle' | 'textDisabled' | 'accent' | 'onAccent' | 'danger' | 'warning' | 'success' | 'info'>

export type TextProps = {
  variant?: TextVariant
  color?: TextColor
  /** Rótulo: caixa do tema (`labelCase`) e `tracking.wide`. */
  label?: boolean
  /** Família mono do tema. */
  mono?: boolean
  /** Algarismos tabulares; padrão = `type.numeric` do tema. */
  tabular?: boolean
  numberOfLines?: number
  maxFontSizeMultiplier?: number
  children?: ReactNode
}

const useStyles = createStyles((t) => {
  const { type, color } = t
  // Fonte carregada para o peso, se o tema tiver; senão a do sistema com o peso (Android: nome por peso).
  const font = (f: typeof type.family.body, w: keyof typeof type.weight): TextStyle => {
    const weight = type.weight[w]
    return f.native[weight] ? { fontFamily: f.native[weight] } : { fontWeight: String(weight) as TextStyle['fontWeight'] }
  }
  const numeric: TextStyle['fontVariant'] = type.numeric === 'tabular' ? ['tabular-nums'] : []
  const out: Record<string, TextStyle> = {
    tabular: { fontVariant: ['tabular-nums'] },
    proportional: { fontVariant: [] },
    mono: font(type.family.mono, 'regular'),
    monoMedium: font(type.family.mono, 'medium'),
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

export function Text({ variant = 'base', color = 'text', label, mono, tabular, numberOfLines, maxFontSizeMultiplier, children }: TextProps) {
  const s = useStyles()
  const medium = variant.endsWith('Medium')
  const step = medium ? variant.slice(0, -'Medium'.length) : variant
  // `tabular` explícito vence; sem ele vale o `type.numeric` do tema, que já está no estilo da variante.
  const numeric = tabular === undefined ? undefined : tabular ? s.tabular : s.proportional
  return (
    <RNText
      numberOfLines={numberOfLines}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[s[variant], mono && (medium ? s.monoMedium : s.mono), label && s[`label_${step}`], numeric, s[`color_${color}`]]}
    >
      {children}
    </RNText>
  )
}
