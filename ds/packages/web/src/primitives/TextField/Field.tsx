import { useDS } from '@gahmp1/ds-core'
import { useId, useLayoutEffect, useRef, useState, type ChangeEvent, type CSSProperties, type ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { IconButton } from '../IconButton/index.js'
import { Text, type TextColor } from '../Text/index.js'

export type FieldVariant = 'underline' | 'filled'

/** Props comuns a `TextField` e `TextArea` (mesmos nomes do nativo; `keyboardType` vira `inputMode`, `returnKeyType` vira `enterKeyHint`). */
export type FieldProps = {
  value: string
  onChangeText: (text: string) => void
  label?: string
  placeholder?: string
  helper?: string
  /** Mensagem de erro: troca a ajuda, pinta o campo de `danger`, treme uma vez (sem tremor com movimento reduzido) e marca `aria-invalid`. */
  error?: string
  disabled?: boolean
  variant?: FieldVariant
  /** Mostra um botão que limpa o campo (`onChangeText('')`) quando há texto. */
  clearable?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'number-pad' | 'decimal-pad' | 'phone-pad' | 'url' | 'web-search'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'
  /** Só iOS no nativo; sem efeito no web (use `autoComplete`). */
  textContentType?: string
  /** Valor do atributo HTML `autoComplete` (ex.: `email`, `current-password`, `one-time-code`). */
  autoComplete?: string
  onSubmitEditing?: () => void
  autoFocus?: boolean
  /** Padrão: o `label` associado por `htmlFor`. */
  accessibilityLabel?: string
  testID?: string
  interactionId?: string
}

const INPUT_MODE = { 'email-address': 'email', numeric: 'numeric', 'number-pad': 'numeric', 'decimal-pad': 'decimal', 'phone-pad': 'tel', url: 'url', 'web-search': 'search' } as const

/** Atributos que o `Field` entrega ao `<input>`/`<textarea>` do componente. */
export type ControlAttrs = {
  id: string
  className: string
  value: string
  disabled?: boolean
  placeholder?: string
  autoFocus?: boolean
  autoCapitalize?: string
  autoComplete?: string
  inputMode?: (typeof INPUT_MODE)[keyof typeof INPUT_MODE]
  enterKeyHint?: FieldProps['returnKeyType']
  'aria-invalid': boolean
  'aria-describedby'?: string
  'aria-label'?: string
  'data-testid'?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

type Props = FieldProps & {
  /** Altura em linhas (`TextArea`); sem isso o campo é de uma linha. */
  rows?: { min: number; max: number }
  trailing?: ReactNode
  children: (attrs: ControlAttrs) => ReactNode
}

/** Casca do campo: rótulo `<label htmlFor>` flutuante, traço de foco/erro, mensagem e botão de limpar. O elemento de entrada vem de `children`. */
export function Field({ value, onChangeText, label, placeholder, helper, error, disabled, variant = 'underline', clearable, keyboardType, autoCapitalize, returnKeyType, autoComplete, autoFocus, accessibilityLabel, testID, interactionId, rows, trailing, children }: Props) {
  const { strings } = useDS()
  const id = useId()
  const hint = error ?? helper
  // Rótulo que não cabe numa linha: sai do campo e fica acima dele, quebrando linha (medido numa cópia invisível).
  const measure = useRef<HTMLDivElement>(null)
  const [stacked, setStacked] = useState(false)
  useLayoutEffect(() => {
    const el = measure.current
    if (!el) return
    const check = () => setStacked(el.scrollHeight > parseFloat(getComputedStyle(el.firstElementChild ?? el).lineHeight) * 1.5)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [label])
  const floating = !!label && !stacked
  const labelColor: TextColor = error ? 'danger' : disabled ? 'textDisabled' : 'textMuted'
  const attrs: ControlAttrs = {
    id,
    className: 'ds-field__input',
    value,
    disabled,
    // Com rótulo, o placeholder só aparece com o rótulo já no alto (regra no CSS).
    placeholder,
    autoFocus,
    autoCapitalize,
    autoComplete,
    inputMode: keyboardType && keyboardType !== 'default' ? INPUT_MODE[keyboardType] : undefined,
    enterKeyHint: returnKeyType,
    'aria-invalid': !!error,
    'aria-describedby': hint ? `${id}-hint` : undefined,
    'aria-label': label ? undefined : accessibilityLabel,
    'data-testid': testID,
    onChange: (e) => onChangeText(e.target.value),
  }
  return (
    <div
      className={cx('ds-field', `ds-field--${variant}`, floating && 'ds-field--label', value.length > 0 && 'ds-field--value', error && 'ds-field--error', disabled && 'ds-field--off', rows && 'ds-field--multi')}
      style={rows ? ({ '--ds-field-rows-min': rows.min, '--ds-field-rows-max': rows.max } as CSSProperties) : undefined}
    >
      {label && stacked && (
        <div className="ds-field__stack-label">
          <Text as="label" htmlFor={id} variant="sm" color={labelColor}>
            {label}
          </Text>
        </div>
      )}
      <div className="ds-field__frame ds-anim">
        <div className="ds-field__control">
          {children(attrs)}
          {label && (
            <div ref={measure} className="ds-field__measure" aria-hidden>
              <Text variant="base">{label}</Text>
            </div>
          )}
          {floating && (
            <div className="ds-field__label ds-anim">
              <Text as="label" htmlFor={id} variant="base" color={labelColor}>
                {label}
              </Text>
            </div>
          )}
        </div>
        {(trailing || clearable) && (
          <div className="ds-field__trailing">
            {clearable && value.length > 0 && !disabled && (
              <IconButton
                icon="close"
                size="small"
                accessibilityLabel={strings.clear}
                interactionId={interactionId && `${interactionId}-clear`}
                onPress={() => {
                  onChangeText('')
                  document.getElementById(id)?.focus()
                }}
              />
            )}
            {trailing}
          </div>
        )}
        <span className="ds-field__line ds-anim" aria-hidden />
      </div>
      <div id={`${id}-hint`} className="ds-field__hint" aria-live="polite">
        {hint && (
          <Text variant="xs" color={error ? 'danger' : disabled ? 'textDisabled' : 'textMuted'}>
            {hint}
          </Text>
        )}
      </div>
    </div>
  )
}
