import { useDS, type DSIconName } from '@gahmp1/ds-core'
import { useState, type Ref } from 'react'
import { useTheme } from '../../core/useTheme.js'
import { IconButton } from '../IconButton/index.js'
import { Field, type FieldProps } from './Field.js'

export type { FieldVariant } from './Field.js'

export type TextFieldProps = FieldProps & {
  /** Senha: oculta o texto e mostra o botão mostrar/ocultar (`strings.showPassword/hidePassword`). */
  secure?: boolean
  /** Ícone decorativo à direita (a ação de limpar é `clearable`). */
  trailingIcon?: DSIconName
  /** Encaminhado ao `<input>`. */
  ref?: Ref<HTMLInputElement>
}

/** Campo de uma linha com rótulo que flutua. Cobre o `TextField` do Zenith: `contentA/C`/`brandA` = `underline`, `selectorCustom` = `filled`. */
export function TextField({ secure, trailingIcon, ref, autoCapitalize = 'none', ...props }: TextFieldProps) {
  const theme = useTheme()
  const { Icon, strings } = useDS()
  const [revealed, setRevealed] = useState(false)
  const trailing =
    secure || trailingIcon ? (
    <>
      {secure && (
        <IconButton
          icon={revealed ? 'eye-off' : 'eye'}
          size="small"
          accessibilityLabel={revealed ? strings.hidePassword : strings.showPassword}
          interactionId={props.interactionId && `${props.interactionId}-reveal`}
          disabled={props.disabled}
          onPress={() => setRevealed((v) => !v)}
        />
      )}
      {trailingIcon && <Icon name={trailingIcon} size={theme.icon.size.md} color={props.disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-muted)'} strokeWidth={theme.icon.strokeWidth} />}
    </>
    ) : undefined
  return (
    <Field {...props} autoCapitalize={autoCapitalize} trailing={trailing}>
      {(a) => (
        <input
          {...a}
          ref={ref}
          type={secure && !revealed ? 'password' : 'text'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && props.onSubmitEditing) props.onSubmitEditing()
          }}
        />
      )}
    </Field>
  )
}
