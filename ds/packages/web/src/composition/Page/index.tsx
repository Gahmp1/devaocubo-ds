// Referência: Zenith Screen e DSScrollView (SWFitness), templates/Screen/; `ContentPageScaffold` virou o slot `header`.
import { cx } from '../../core/cx.js'
import type { ReactNode, UIEventHandler } from 'react'

export type PageProps = {
  /** Fixo acima da área central. */
  header?: ReactNode
  /** Fixo abaixo da área central. */
  footer?: ReactNode
  /** A área central rola; `header` e `footer` ficam no lugar. */
  scroll?: boolean
  /** Lados que respeitam a área segura (`env(safe-area-inset-*)`); padrão `['top']`. */
  edges?: ('top' | 'bottom')[]
  /** Só com `scroll`. O `scroll_depth` do Zenith fica a cargo do app, a partir daqui. */
  onScroll?: UIEventHandler<HTMLDivElement>
  children?: ReactNode
}

/** Página inteira com o fundo do tema: ocupa a altura do pai (`block-size: 100%`), então o pai precisa ter altura. */
export function Page({ header, footer, scroll, edges = ['top'], onScroll, children }: PageProps) {
  return (
    <div className={cx('ds-page', edges.includes('top') && 'ds-page--top', edges.includes('bottom') && 'ds-page--bottom')}>
      {header && <div className="ds-page__header">{header}</div>}
      {/* tabIndex: quem usa só o teclado precisa focar a área para rolá-la. */}
      <div className={cx('ds-page__main', scroll && 'ds-page__main--scroll')} tabIndex={scroll ? 0 : undefined} onScroll={scroll ? onScroll : undefined}>
        {children}
      </div>
      {footer && <div className="ds-page__footer">{footer}</div>}
    </div>
  )
}
