import { useLayoutEffect, useRef, type Ref } from 'react'
import { Field, type FieldProps } from '../TextField/Field.js'

export type TextAreaProps = FieldProps & {
  /** Altura mínima em linhas (padrão 3). */
  minRows?: number
  /** A altura cresce com o texto até esta quantidade de linhas, depois rola (padrão 8). */
  maxRows?: number
  /** Encaminhado ao `<textarea>`. */
  ref?: Ref<HTMLTextAreaElement>
}

/** Campo de várias linhas com a mesma linguagem do `TextField`. Não existe no Zenith (o `ChatInput` usa um `TextInput` cru). */
export function TextArea({ minRows = 3, maxRows = 8, ref, ...props }: TextAreaProps) {
  const local = useRef<HTMLTextAreaElement | null>(null)
  // A altura segue o conteúdo; o CSS limita entre `minRows` e `maxRows` e rola acima disso.
  useLayoutEffect(() => {
    const el = local.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [props.value, minRows, maxRows])
  const setRef = (el: HTMLTextAreaElement | null) => {
    local.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }
  return (
    <Field {...props} rows={{ min: minRows, max: Math.max(minRows, maxRows) }}>
      {(a) => <textarea {...a} ref={setRef} rows={minRows} />}
    </Field>
  )
}
