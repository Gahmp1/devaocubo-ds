import type { ComponentType } from 'react'

export type DSIconName =
  | 'close' | 'check' | 'chevron-left' | 'chevron-right' | 'chevron-down' | 'plus' | 'minus' | 'search'
  | 'eye' | 'eye-off' | 'send' | 'stop' | 'mic' | 'attach' | 'file' | 'link' | 'more'
  | 'info' | 'success' | 'warning' | 'error' | 'arrow-down'

/** O DS não traz ícones: o app entrega um componente que desenha `name` (ex.: lucide). */
export type IconProps = { name: DSIconName; size: number; color: string; strokeWidth: number }
export type IconComponent = ComponentType<IconProps>
