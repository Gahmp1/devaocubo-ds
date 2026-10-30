import type { ColorRoles, TypeStep } from '@gahmp1/ds-theme'
import type { CSSProperties, HTMLAttributes, LabelHTMLAttributes } from 'react'
import { cx } from '../../core/cx.js'

export type TextVariant = TypeStep | `${TypeStep}Medium`
export type TextColor = Extract<keyof ColorRoles, 'text' | 'textMuted' | 'textSubtle' | 'textDisabled' | 'accent' | 'onAccent' | 'danger' | 'warning' | 'success' | 'info'>
export type TextElement = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'strong' | 'em'

type OwnProps = {
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
  /** Elemento HTML (semântica); padrão `span`. */
  as?: TextElement
}

// `htmlFor` só existe com `as="label"`; `style` fica só para layout.
type Base = Omit<HTMLAttributes<HTMLElement>, 'style' | 'className' | 'color'> & { style?: Pick<CSSProperties, 'flex' | 'flexGrow' | 'flexShrink' | 'alignSelf' | 'margin' | 'marginInline' | 'marginBlock' | 'textAlign'> }
export type TextProps = OwnProps & Base & Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

export function Text({ as: Tag = 'span', variant = 'base', color = 'text', label, mono, tabular, numberOfLines, maxFontSizeMultiplier: _ignored, htmlFor, style, children, ...rest }: TextProps) {
  const medium = variant.endsWith('Medium')
  const step = medium ? variant.slice(0, -'Medium'.length) : variant
  return (
    <Tag
      {...rest}
      {...(Tag === 'label' && { htmlFor })}
      className={cx(
        'ds-text', `ds-text--${step}`, medium && 'ds-text--medium', `ds-text--color-${kebab(color)}`,
        label && 'ds-text--label', mono && 'ds-text--mono',
        tabular === true && 'ds-text--tabular', tabular === false && 'ds-text--proportional',
        numberOfLines !== undefined && 'ds-text--clamp',
      )}
      style={numberOfLines === undefined ? style : ({ ...style, '--ds-text-lines': numberOfLines } as CSSProperties)}
    >
      {children}
    </Tag>
  )
}
