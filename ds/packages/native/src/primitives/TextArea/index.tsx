import { useDS } from '@gahmp1/ds-core'
import { IconButton } from '../IconButton/index.js'
import { Field, type FieldProps } from '../TextField/Field.js'

export type TextAreaProps = FieldProps & {
  /** Altura mínima em linhas (padrão 3). */
  minRows?: number
  /** A altura cresce com o texto até esta quantidade de linhas, depois rola (padrão 8). */
  maxRows?: number
}

/** Campo de várias linhas com a mesma linguagem do `TextField`. Não existe no Zenith (o `ChatInput` usa um `TextInput` cru). */
export function TextArea({ minRows = 3, maxRows = 8, ref, clearable, interactionId, ...props }: TextAreaProps) {
  const { strings } = useDS()
  const trailing =
    clearable && props.value.length > 0 && !props.disabled ? (
      <IconButton icon="close" size="small" accessibilityLabel={strings.clear} interactionId={interactionId && `${interactionId}-clear`} onPress={() => props.onChangeText('')} />
    ) : undefined
  return <Field {...props} inputRef={ref} rows={{ min: minRows, max: Math.max(minRows, maxRows) }} trailing={trailing} />
}
