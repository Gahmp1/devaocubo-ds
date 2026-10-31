// Referência: Zenith ScrollFadeOverlay (SWFitness), recriado sobre a própria rolagem: no lugar do `ScrollVisibilityContext` do app, a medida vem do scroll deste componente.
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'

export type ScrollFadeEdge = 'top' | 'bottom'

export type ScrollFadeProps = {
  /** Bordas que esmaecem; cada uma só aparece quando ainda há conteúdo daquele lado. */
  edges?: ScrollFadeEdge[]
  /** Altura do degradê em px, e a distância de rolagem em que ele acende ou apaga. */
  size?: number
  /** Só layout (flex, tamanho). */
  style?: Pick<CSSProperties, 'flex' | 'flexGrow' | 'flexShrink' | 'flexBasis' | 'alignSelf' | 'width' | 'height' | 'minHeight' | 'maxHeight' | 'margin' | 'marginInline' | 'marginBlock'>
  /** Conteúdo da rolagem vertical. */
  children?: ReactNode
}

const DEFAULT_SIZE = 48

export function ScrollFade({ edges = ['top', 'bottom'], size = DEFAULT_SIZE, style, children }: ScrollFadeProps) {
  const scroller = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const top = edges.includes('top')
  const bottom = edges.includes('bottom')

  // Altura de cada degradê = quanto falta rolar até a borda, no máximo `size` (Zenith: useEdgeVisibility).
  useLayoutEffect(() => {
    const el = scroller.current!
    const update = () => {
      const left = el.scrollHeight - el.clientHeight - el.scrollTop
      el.style.setProperty('--ds-fade-top', `${top ? Math.max(0, Math.min(size, el.scrollTop)) : 0}px`)
      el.style.setProperty('--ds-fade-bottom', `${bottom ? Math.max(0, Math.min(size, left)) : 0}px`)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const resize = new ResizeObserver(update)
    resize.observe(el)
    resize.observe(content.current!)
    return () => {
      el.removeEventListener('scroll', update)
      resize.disconnect()
    }
  }, [top, bottom, size])

  // `tabIndex` deixa a região rolável acessível ao teclado.
  return (
    <div ref={scroller} className="ds-scrollfade" style={style} tabIndex={0}>
      <div ref={content}>{children}</div>
    </div>
  )
}
