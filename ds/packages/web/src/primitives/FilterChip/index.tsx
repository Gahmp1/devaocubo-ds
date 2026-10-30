import { ChipBase, type ChipProps } from '../Chip/ChipBase.js'

export type FilterChipProps = Omit<ChipProps, 'selected' | 'onPress' | 'onRemove'> & {
  selected: boolean
  /** Recebe o novo valor (`!selected`); o clique emite um `toggle` com ele. */
  onPress: (next: boolean) => void
}

/** `Chip` de filtro: `selected` obrigatório (`aria-pressed`), o clique alterna e o ✓ entra quando selecionado. */
export function FilterChip({ selected, onPress, ...rest }: FilterChipProps) {
  return <ChipBase {...rest} component="FilterChip" selected={selected} toggle={!selected} check onPress={() => onPress(!selected)} />
}
