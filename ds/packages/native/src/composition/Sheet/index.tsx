import type { ReactNode } from 'react'
import { SheetPanel } from './Panel.js'

export type SheetProps = {
  open: boolean
  /** Voltar do Android, toque no fundo, arrastar para baixo e o botão de fechar; o app põe `open` em `false`. */
  onClose: () => void
  title?: string
  /** Alturas em que a gaveta pousa: `'content'` (o conteúdo, até caber na tela) ou pontos; abre na primeira, arrastar a alça troca de altura. Padrão `['content']`. */
  snap?: ('content' | number)[]
  /** Padrão `true`; `false` desliga voltar, toque no fundo, arrastar e o botão de fechar (só o app fecha). */
  dismissible?: boolean
  children: ReactNode
  /** Fixo embaixo; o conteúdo acima é que rola. */
  footer?: ReactNode
}

export function Sheet(props: SheetProps) {
  return <SheetPanel {...props} component="Sheet" />
}
