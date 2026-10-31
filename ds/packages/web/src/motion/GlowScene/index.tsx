// Ideia: GlowScene do Zenith (SWFitness: manchas elípticas sobre uma cor base), recriada em CSS com gradientes gaussianos no lugar dos PNGs e papéis do tema no lugar dos hex.
import { bloomScale, FALLOFF_RADIUS_PER_FWHM, SCENE_PRESETS, type RadiusStep, type ScenePreset } from '@gahmp1/ds-core'
import type { CSSProperties, ReactNode } from 'react'
import { useTheme } from '../../core/useTheme.js'
import { GLOW_VAR, glowGradient } from '../../internal/glow.js'

export type GlowSceneProps = {
  /** `focus`: luz no topo; `ambient`: duas luzes suaves nos cantos; `success`: duas luzes no topo, mais fortes. */
  preset?: ScenePreset
  /** Raio do recorte; combine com o raio do pai. */
  radius?: RadiusStep
  /** Só layout (flex, tamanho). */
  style?: Pick<CSSProperties, 'flex' | 'flexGrow' | 'flexShrink' | 'flexBasis' | 'alignSelf' | 'width' | 'height' | 'minHeight' | 'maxHeight' | 'margin' | 'marginInline' | 'marginBlock'>
  /** Fica por cima das luzes. */
  children?: ReactNode
}

const pct = (n: number) => `${Math.round(n * 1000) / 10}%`

/** Fundo `bg` do tema com as manchas do preset; o `depth.model` do tema escala o brilho (`flat` apaga as manchas). */
export function GlowScene({ preset = 'focus', radius, style, children }: GlowSceneProps) {
  const { depth } = useTheme()
  const scale = bloomScale(depth.model)
  return (
    <div className="ds-glow-scene" style={{ ...(radius && { borderRadius: `var(--ds-radius-${radius})` }), ...style }}>
      <div aria-hidden className="ds-glow-scene__lights">
        {scale > 0 &&
          SCENE_PRESETS[preset].map((b, i) => (
            <span
              key={i}
              className="ds-glow-scene__blob"
              style={{
                left: pct(b.cx),
                top: pct(b.cy),
                width: pct(2 * b.fwhmX * FALLOFF_RADIUS_PER_FWHM),
                height: pct(2 * b.fwhmY * FALLOFF_RADIUS_PER_FWHM),
                background: glowGradient(GLOW_VAR[b.color]),
                opacity: b.opacity * scale,
              }}
            />
          ))}
      </div>
      <div className="ds-glow-scene__content">{children}</div>
    </div>
  )
}
