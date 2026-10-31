// Referência: bloco `pull` do Bencho (MIT), recriado: o compromisso (feedback) acontece ao cruzar o limiar, não ao soltar; o gesto segue design-library/examples/feedback-sensorial.
import { useDS, useFeedback } from '@gahmp1/ds-core'
import { animate, motion, useMotionValue } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useThemeMotion } from '../../core/useTheme.js'
import { Spinner } from '../../primitives/Spinner/index.js'

export type PullToRefreshProps = {
  /** O pai liga isto em `onRefresh` e desliga quando os dados chegam. */
  refreshing: boolean
  onRefresh: () => void
  /** Distância (px) que a área desce até armar a atualização. Padrão 72. */
  threshold?: number
  /** Nome do botão que só aparece com o foco, para quem não puxa com ponteiro. Padrão "Atualizar". */
  refreshLabel?: string
  /** O conteúdo da área rolável; a altura vem do pai (o componente ocupa 100% dele e rola por dentro). */
  children: ReactNode
}

type Phase = 'idle' | 'pulling' | 'armed'
type Pull = { y0: number; active: boolean; armed: boolean; committed: boolean }

// O dedo move mais que a área: a resistência dá o peso do elástico, e o teto evita arrastar a lista para fora da tela.
const RESISTANCE = 0.55
const MAX_PULL = 1.5

export function PullToRefresh({ refreshing, onRefresh, threshold = 72, refreshLabel = 'Atualizar', children }: PullToRefreshProps) {
  const { emit } = useDS()
  const { play } = useFeedback()
  const { spring, reduced } = useThemeMotion()
  const y = useMotionValue(0)
  const scroll = useRef<HTMLDivElement>(null)
  const pull = useRef<Pull | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const state = refreshing ? 'refreshing' : phase

  // Reduzido: a área nunca desliza (y fica em 0); só o indicador aparece e some.
  const settle = (to: number) => {
    if (!reduced) animate(y, to, { type: 'spring', ...spring })
  }
  const request = () => {
    emit({ component: 'PullToRefresh', kind: 'change', value: 'refresh' })
    onRefresh()
  }
  // Só a área rolada ao topo puxa; um puxão que começa no meio da lista é rolagem normal.
  const begin = (clientY: number) => {
    if (refreshing || !scroll.current || scroll.current.scrollTop > 0) return
    pull.current = { y0: clientY, active: false, armed: false, committed: false }
  }
  /** Devolve `true` quando o gesto é nosso (puxando para baixo no topo): quem chama segura a rolagem. */
  const move = (clientY: number) => {
    const p = pull.current
    if (!p) return false
    const dy = clientY - p.y0
    if (!p.active) {
      if (dy <= 0) return false
      if (scroll.current && scroll.current.scrollTop > 0) {
        pull.current = null
        return false
      }
      p.active = true
      y.stop()
    }
    const distance = Math.max(0, Math.min(dy * RESISTANCE, threshold * MAX_PULL))
    if (!reduced) y.set(distance)
    const armed = distance >= threshold
    if (armed !== p.armed) {
      p.armed = armed
      // Uma vez por puxada: voltar abaixo do limiar e cruzar de novo não repete o toque.
      if (armed && !p.committed) {
        p.committed = true
        play('pull-commit')
        request() // o compromisso é cruzar o limiar, não soltar
      }
    }
    setPhase(armed ? 'armed' : 'pulling')
    return true
  }
  const end = (release: boolean) => {
    const p = pull.current
    pull.current = null
    if (!p?.active) return
    setPhase('idle')
    // Soltar só decide se a área fica segurada no limiar (armado ou já atualizando) ou volta ao repouso.
    settle(release && (p.armed || refreshing) ? threshold : 0)
  }

  // Dados chegaram (ou a atualização começou por fora): a área vai para a posição de repouso, sem som.
  useEffect(() => {
    if (pull.current?.active) return // o dedo manda; ao soltar `end` assenta
    settle(refreshing ? threshold : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing])

  // Toque: `touchmove` não passivo, porque só ele deixa segurar a rolagem nativa do navegador (o ponteiro de toque seria cancelado).
  const touch = useRef({ begin, move, end })
  touch.current = { begin, move, end }
  useEffect(() => {
    const el = scroll.current
    if (!el) return
    const onStart = (e: TouchEvent) => touch.current.begin(e.touches[0]!.clientY)
    const onMove = (e: TouchEvent) => {
      if (touch.current.move(e.touches[0]!.clientY) && e.cancelable) e.preventDefault()
    }
    const onEnd = () => touch.current.end(true)
    const onCancel = () => touch.current.end(false)
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd)
    el.addEventListener('touchcancel', onCancel)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onCancel)
    }
  }, [])

  // Mouse e caneta: ponteiro. Só captura quando o gesto vira puxada, para o clique nos itens continuar chegando a eles.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'touch' && e.button === 0) begin(e.clientY)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    // Soltou fora da área (sem captura): o botão não está mais apertado, então o gesto acabou.
    if (e.buttons === 0) return end(false)
    const was = pull.current?.active
    if (move(e.clientY) && !was) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // ponteiro já encerrado: o gesto acaba no próximo pointerup
      }
    }
  }

  return (
    <div className={cx('ds-ptr', reduced && 'ds-ptr--reduced')} data-state={state} aria-busy={refreshing} style={{ '--ds-ptr-height': `${threshold}px` } as CSSProperties}>
      <button
        type="button"
        className="ds-ptr__action"
        aria-disabled={refreshing}
        onClick={() => {
          if (refreshing) return
          play('pull-commit')
          request()
        }}
      >
        {refreshLabel}
      </button>
      <motion.div className="ds-ptr__track" style={{ y }}>
        <div className="ds-ptr__indicator ds-anim" aria-hidden={!refreshing}>
          <span className="ds-ptr__badge">
            <Spinner size="small" paused={!refreshing} />
          </span>
        </div>
        <div
          ref={scroll}
          className="ds-ptr__scroll"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => e.pointerType !== 'touch' && end(true)}
          onPointerCancel={(e) => e.pointerType !== 'touch' && end(false)}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}
