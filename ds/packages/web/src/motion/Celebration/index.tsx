// Ideia: SuccessBackground do Zenith (SWFitness; fundo estático) mais confete leve em canvas, recriado com partículas determinísticas do ds-core.
import { CONFETTI_ROLES, confettiParticles, confettiPose, useFeedback } from '@gahmp1/ds-core'
import { useEffect, useRef, useState } from 'react'
import { useTheme, useThemeMotion } from '../../core/useTheme.js'
import { GlowScene } from '../GlowScene/index.js'

export type CelebrationProps = {
  /** Cada subida de falso para verdadeiro (inclusive montar já verdadeiro) é uma execução: fundo de sucesso, confete e o papel `complete` do feedback. Falso desmonta tudo. */
  active: boolean
  /** Ao fim da execução: depois do confete, ou do fundo com movimento reduzido. */
  onDone?: () => void
}

// Duração do confete em múltiplos de `duration.slow` (o fundo fica enquanto `active`).
const RUN_FACTOR = 6
const PARTICLES = confettiParticles()

function Confetti({ runMs }: { runMs: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { color } = useTheme()

  useEffect(() => {
    const el = canvas.current!
    const ctx = el.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const { width, height } = el.getBoundingClientRect()
    el.width = width * dpr
    el.height = height * dpr
    ctx.scale(dpr, dpr)
    const start = performance.now()
    let frame = 0
    const draw = (now: number) => {
      const t = Math.min((now - start) / runMs, 1)
      ctx.clearRect(0, 0, width, height)
      for (const p of PARTICLES) {
        const pose = confettiPose(p, t, width, height)
        ctx.save()
        ctx.globalAlpha = pose.opacity
        ctx.translate(pose.x, pose.y)
        ctx.rotate(pose.rotate)
        ctx.fillStyle = color[CONFETTI_ROLES[p.role]]
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        ctx.restore()
      }
      if (t < 1) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [runMs, color])

  return <canvas ref={canvas} className="ds-celebration__confetti" />
}

/**
 * Fundo de sucesso com confete leve. Ocupa o pai (que precisa ser `position: relative`) e não recebe clique:
 * ponha atrás do conteúdo (primeiro filho). Telas que mostram o resultado e precisam avisar o leitor de tela
 * fazem isso à parte; aqui é só decoração.
 */
export function Celebration({ active, onDone }: CelebrationProps) {
  const { play } = useFeedback()
  const { duration, reduced } = useThemeMotion()
  const [confetti, setConfetti] = useState(false)
  // A execução nasce só na subida de `active`: o que muda no meio (callback, tema, preferências) é lido daqui.
  const runMs = duration.slow * RUN_FACTOR
  const latest = { play, onDone, endMs: reduced ? duration.base : runMs, reduced }
  const live = useRef(latest)
  live.current = latest

  useEffect(() => {
    if (!active) return
    const { play: playFeedback, endMs, reduced: noMotion } = live.current
    playFeedback('complete')
    setConfetti(!noMotion)
    const timer = setTimeout(() => {
      setConfetti(false)
      live.current.onDone?.()
    }, endMs)
    return () => {
      clearTimeout(timer)
      setConfetti(false)
    }
  }, [active])

  if (!active) return null
  return (
    <div aria-hidden className="ds-celebration">
      <div className="ds-celebration__scene ds-anim">
        <GlowScene preset="success" style={{ height: '100%' }} />
      </div>
      {confetti && <Confetti runMs={runMs} />}
    </div>
  )
}
