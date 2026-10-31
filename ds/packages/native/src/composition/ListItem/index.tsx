// Referência: Zenith ListItem e SheetRow (SWFitness), molecules/ListItem e molecules/SheetRow.
import type { ReactNode } from 'react'
import { Row } from './Row.js'

export type ListItemProps = {
  /** Quebra linha, sem cortar. */
  title: string
  subtitle?: string
  leading?: ReactNode
  /** `'chevron'` desenha a seta do tema. */
  trailing?: ReactNode | 'chevron'
  /** Mostra o check na cor `accent` (cobre o `SheetRow`); `false` só reserva o espaço dele. */
  selected?: boolean
  /** Com `onPress` a linha vira botão. */
  onPress?: () => void
  /** Troca o conteúdo por esqueleto. */
  loading?: boolean
  interactionId?: string
}

export function ListItem(props: ListItemProps) {
  return <Row {...props} component="ListItem" />
}
