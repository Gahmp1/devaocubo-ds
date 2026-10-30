import type { DSIconName, IconComponent } from '@gahmp1/ds-web'
import { ArrowDown, Check, ChevronDown, ChevronLeft, ChevronRight, CircleAlert, CircleCheck, Ellipsis, Eye, EyeOff, File, Info, Link, Mic, Minus, Paperclip, Plus, Search, Send, Square, TriangleAlert, X, type LucideIcon } from 'lucide-react'

// lucide (ISC) só como implementação do catálogo; o DS pede ícones por nome.
const icons: Record<DSIconName, LucideIcon> = {
  close: X, check: Check, 'chevron-left': ChevronLeft, 'chevron-right': ChevronRight, 'chevron-down': ChevronDown, plus: Plus, minus: Minus, search: Search,
  eye: Eye, 'eye-off': EyeOff, send: Send, stop: Square, mic: Mic, attach: Paperclip, file: File, link: Link, more: Ellipsis,
  info: Info, success: CircleCheck, warning: TriangleAlert, error: CircleAlert, 'arrow-down': ArrowDown,
}

export const CatalogIcon: IconComponent = ({ name, size, color, strokeWidth }) => {
  const Glyph = icons[name]
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} aria-hidden />
}
