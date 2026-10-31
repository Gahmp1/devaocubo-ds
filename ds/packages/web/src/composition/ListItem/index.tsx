import { ListRow, type ListItemProps } from './ListRow.js'

export type { ListItemProps } from './ListRow.js'

/** Linha de lista: título (quebra linha, nunca corta), subtítulo, `leading`, `trailing` e check de `selected`. Sem `onPress` não é clicável. */
export function ListItem(props: ListItemProps) {
  return <ListRow {...props} component="ListItem" />
}
