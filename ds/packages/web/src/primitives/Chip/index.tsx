import { ChipBase, type ChipProps } from './ChipBase.js'

export type { ChipProps } from './ChipBase.js'

/** Pílula de rótulo: simples, selecionável (`selected`) ou removível (`onRemove`). Sem `onPress` não é clicável. */
export function Chip(props: ChipProps) {
  return <ChipBase {...props} component="Chip" />
}
