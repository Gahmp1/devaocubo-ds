import { useDS, type DSIconName } from '@gahmp1/ds-core'
import { useState } from 'react'
import { useTheme } from '../../core/DSProvider.js'
import { IconButton } from '../IconButton/index.js'
import { Field, type FieldProps } from './Field.js'

export type { FieldVariant } from './Field.js'

export type TextFieldProps = FieldProps & {
  /** Senha: oculta o texto e mostra o botão mostrar/ocultar (`strings.showPassword/hidePassword`). */
  secure?: boolean
  /** Ícone decorativo à direita (a ação de limpar é `clearable`). */
  trailingIcon?: DSIconName
}

/** Campo de uma linha com rótulo que flutua. Cobre o `TextField` do Zenith: `contentA/C`/`brandA` = `underline`, `selectorCustom` = `filled`. */
export function TextField({ secure, clearable, trailingIcon, ref, interactionId, autoCapitalize = 'none', ...props }: TextFieldProps) {
  const t = useTheme()
  const { Icon, strings } = useDS()
  const [revealed, setRevealed] = useState(false)
  const off = props.disabled
  const trailing = (
    <>
      {clearable && props.value.length > 0 && !off && (
        <IconButton icon="close" size="small" accessibilityLabel={strings.clear} interactionId={interactionId && `${interactionId}-clear`} onPress={() => props.onChangeText('')} />
      )}
      {secure && (
        <IconButton
          icon={revealed ? 'eye-off' : 'eye'}
          size="small"
          accessibilityLabel={revealed ? strings.hidePassword : strings.showPassword}
          interactionId={interactionId && `${interactionId}-reveal`}
          disabled={off}
          onPress={() => setRevealed((v) => !v)}
        />
      )}
      {trailingIcon && <Icon name={trailingIcon} size={t.icon.size.md} color={t.color[off ? 'textDisabled' : 'textMuted']} strokeWidth={t.icon.strokeWidth} />}
    </>
  )
  return <Field {...props} inputRef={ref} autoCapitalize={autoCapitalize} secure={secure && !revealed} trailing={trailing} />
}
