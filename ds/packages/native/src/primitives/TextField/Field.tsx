import type { Ref, ReactNode } from 'react'
import { useState } from 'react'
import { StyleSheet, TextInput, useWindowDimensions, View, type TextInputInstance, type TextInputProps } from 'react-native'
import Animated from 'react-native-reanimated'
import { createStyles } from '../../core/createStyles.js'
import { useTheme } from '../../core/DSProvider.js'
import { Text, type TextColor } from '../Text/index.js'
import { LABEL_SCALE, useFieldMotion } from './useFieldMotion.js'

export type FieldVariant = 'underline' | 'filled'

/** Props comuns a `TextField` e `TextArea`. */
export type FieldProps = {
  value: string
  onChangeText: (text: string) => void
  label?: string
  placeholder?: string
  helper?: string
  /** Mensagem de erro: troca a ajuda, pinta o campo de `danger` e treme uma vez (sem tremor com movimento reduzido). */
  error?: string
  disabled?: boolean
  variant?: FieldVariant
  /** Mostra um botão que limpa o campo (`onChangeText('')`) quando há texto. */
  clearable?: boolean
  keyboardType?: TextInputProps['keyboardType']
  autoCapitalize?: TextInputProps['autoCapitalize']
  returnKeyType?: TextInputProps['returnKeyType']
  textContentType?: TextInputProps['textContentType']
  autoComplete?: TextInputProps['autoComplete']
  onSubmitEditing?: TextInputProps['onSubmitEditing']
  autoFocus?: boolean
  /** Padrão: `label`, senão `placeholder`. */
  accessibilityLabel?: string
  testID?: string
  interactionId?: string
  /** Encaminhado ao `TextInput`. */
  ref?: Ref<TextInputInstance>
}

type Props = Omit<FieldProps, 'clearable' | 'interactionId' | 'ref'> & {
  inputRef?: Ref<TextInputInstance>
  secure?: boolean
  /** Altura em linhas (`TextArea`); sem isso o campo é de uma linha. */
  rows?: { min: number; max: number }
  /** Botões e ícone à direita. */
  trailing?: ReactNode
}

const MAX_SCALE = 1.4 // limite do `maxFontSizeMultiplier` do campo
const STACK_SCALE = 1.2 // acima disso o rótulo deixa de flutuar e empilha (quebra linha, sem cortar)

const useStyles = createStyles((t) => {
  const { type, density: d, shape, color: c } = t
  return {
    frame: { flexDirection: 'row', alignItems: 'center' },
    filled: { paddingHorizontal: d.space.md, borderRadius: shape.radius.md, backgroundColor: c.surface2 },
    filledOff: { backgroundColor: c.surface1 },
    input: { flex: 1, margin: 0, color: c.text, fontFamily: type.family.body.native[type.weight.regular], fontSize: type.scale.base.size, includeFontPadding: false },
    inputOff: { color: c.textDisabled },
    multiline: { textAlignVertical: 'top', lineHeight: type.scale.base.lineHeight },
    label: { position: 'absolute' },
    underline: { position: 'absolute', left: 0, right: 0, bottom: 0 },
    ring: { ...StyleSheet.absoluteFill, borderRadius: shape.radius.md },
    trailing: { flexDirection: 'row', alignItems: 'center', gap: d.space.xs },
    message: { marginTop: d.space.xxs },
  }
})

/** Casca do campo: rótulo flutuante, traço de foco/erro, mensagem e o `TextInput` (mesma linguagem no `TextField` e no `TextArea`). */
export function Field({ value, onChangeText, label, placeholder, helper, error, disabled, variant = 'underline', inputRef, secure, rows, trailing, accessibilityLabel, testID, ...input }: Props) {
  const t = useTheme()
  const s = useStyles()
  const { fontScale } = useWindowDimensions()
  const [focused, setFocused] = useState(false)
  const filled = variant === 'filled'
  const stacked = !!label && fontScale > STACK_SCALE
  const floating = !!label && !stacked
  const floated = focused || value.length > 0

  // Medidas em pt já com a escala de fonte (limitada a MAX_SCALE).
  const lh = t.type.scale.base.lineHeight * Math.min(fontScale, MAX_SCALE)
  const space = t.density.space
  const padTop = floating ? Math.round(lh * LABEL_SCALE) + space.xxs : space.xs
  const padBottom = space.xs
  const minHeight = rows ? padTop + rows.min * lh + padBottom : Math.max(t.density.control.md, padTop + lh + padBottom)
  const restCenter = rows ? padTop + lh / 2 : padTop + (minHeight - padTop - padBottom) / 2
  const rise = space.xxs + (lh * LABEL_SCALE) / 2 - restCenter

  const c = t.color
  const active = error ? c.danger : c.accent
  const idle = error ? c.danger : disabled ? c.borderMuted : c.border
  const labelColor: TextColor = error ? 'danger' : disabled ? 'textDisabled' : focused ? 'accent' : 'textMuted'
  const m = useFieldMotion({ floated, focused, error, filled, rise, idle, active, widths: [t.shape.borderWidth.thin, t.shape.borderWidth.thick] })
  const hint = error ?? helper

  return (
    <View>
      {stacked && (
        <Text variant="sm" color={labelColor} style={s.message}>
          {label}
        </Text>
      )}
      <Animated.View style={[s.frame, filled && s.filled, filled && disabled && s.filledOff, m.shake]}>
        <TextInput
          {...input}
          ref={inputRef}
          testID={testID}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          secureTextEntry={secure}
          multiline={!!rows}
          // Com rótulo flutuando, o placeholder só aparece quando o rótulo já subiu.
          placeholder={floating && !floated ? undefined : placeholder}
          placeholderTextColor={c.textSubtle}
          selectionColor={c.accent}
          maxFontSizeMultiplier={MAX_SCALE}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
          accessibilityHint={hint}
          accessibilityState={{ disabled: !!disabled }}
          style={[s.input, disabled && s.inputOff, rows && s.multiline, { minHeight, paddingTop: padTop, paddingBottom: padBottom, paddingHorizontal: 0 }, rows && { maxHeight: padTop + rows.max * lh + padBottom }]}
        />
        {trailing ? <View style={s.trailing}>{trailing}</View> : null}
        {floating && (
          <Animated.View style={[s.label, { top: restCenter - lh / 2, left: filled ? space.md : 0, right: filled ? space.md : 0 }, m.label]} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Text variant="base" color={labelColor} numberOfLines={1} maxFontSizeMultiplier={MAX_SCALE}>
              {label}
            </Text>
          </Animated.View>
        )}
        {filled ? <Animated.View style={[s.ring, m.line]} pointerEvents="none" /> : <Animated.View style={[s.underline, m.line]} />}
      </Animated.View>
      {hint ? (
        <Text
          variant="xs"
          color={error ? 'danger' : disabled ? 'textDisabled' : 'textMuted'}
          style={s.message}
          accessibilityRole={error ? 'alert' : undefined}
          accessibilityLiveRegion={error ? 'polite' : undefined}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  )
}
