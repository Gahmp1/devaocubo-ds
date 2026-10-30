import type { ColorRoles, TypeStep } from '@gahmp1/ds-theme'
import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../core/cx.js'

export type TextVariant = TypeStep | `${TypeStep}Medium`
export type TextColor = Extract<keyof ColorRoles, 'text' | 'textMuted' | 'textSubtle' | 'textDisabled' | 'accent' | 'onAccent' | 'danger' | 'warning' | 'success' | 'info'>

export type TextProps = {
  variant?: TextVariant
  color?: TextColor
  /** Rótulo: caixa do tema (`labelCase`) e `tracking.wide`. */
  label?: boolean
  /** Família mono do tema. */
  mono?: boolean
  /** Algarismos tabulares; padrão = `type.numeric` do tema. */
  tabular?: boolean
  numberOfLines?: number
  /** Sem efeito no web (o navegador escala pela fonte do usuário); existe para a API ser a mesma do native. */
  maxFontSizeMultiplier?: number
  children?: ReactNode
}

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

export function Text({ variant = 'base', color = 'text', label, mono, tabular, numberOfLines, children }: TextProps) {
  const medium = variant.endsWith('Medium')
  const step = medium ? variant.slice(0, -'Medium'.length) : variant
  return (
    <span
      className={cx(
        'ds-text', `ds-text--${step}`, medium && 'ds-text--medium', `ds-text--color-${kebab(color)}`,
        label && 'ds-text--label', mono && 'ds-text--mono',
        tabular === true && 'ds-text--tabular', tabular === false && 'ds-text--proportional',
        numberOfLines !== undefined && 'ds-text--clamp',
      )}
      style={numberOfLines === undefined ? undefined : ({ '--ds-text-lines': numberOfLines } as CSSProperties)}
    >
      {children}
    </span>
  )
}
