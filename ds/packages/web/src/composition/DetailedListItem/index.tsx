import { ListRow, type DetailedListItemProps } from '../ListItem/ListRow.js'

export type { DetailedListItemProps } from '../ListItem/ListRow.js'

/** `ListItem` com descrição, mídia e anel de progresso. Sem `onPress` não é clicável. */
export function DetailedListItem(props: DetailedListItemProps) {
  return <ListRow {...props} component="DetailedListItem" />
}
