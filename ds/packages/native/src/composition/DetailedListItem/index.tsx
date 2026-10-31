// Referência: Zenith DetailedListItem (SWFitness), molecules/DetailedListItem.
import type { ReactNode } from 'react'
import { Row } from '../ListItem/Row.js'
import type { ListItemProps } from '../ListItem/index.js'

export type DetailedListItemProps = ListItemProps & {
  description?: string
  /** Miniatura ou imagem, depois do `leading`. */
  media?: ReactNode
  /** Anel de progresso, de 0 a 1, antes do `trailing`. */
  progress?: number
}

export function DetailedListItem(props: DetailedListItemProps) {
  return <Row {...props} component="DetailedListItem" />
}
