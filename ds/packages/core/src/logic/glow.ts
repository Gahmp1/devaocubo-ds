// Ideia: voice-glow da libraries.dev (três camadas: traço, luz interna, bloom) e GlowScene/Blur/SuccessBackground do Zenith (SWFitness); recriadas sem PNG nem hex, sem código copiado. Licença do voice-glow: a verificar.
import type { ColorRoles } from '@gahmp1/ds-theme'
import type { ResolvedTheme } from '../theme.js'

export type DepthModel = ResolvedTheme['depth']['model']
/** Papéis de cor que um brilho aceita. */
export type GlowColor = Extract<keyof ColorRoles, 'aiGlow' | 'accent'>

const clamp01 = (n: number) => (n > 0 ? Math.min(n, 1) : 0)

/** Quanto do bloom o modelo de profundidade deixa aparecer: `flat` desliga, `glow` liga inteiro, os demais ficam no meio. */
export function bloomScale(model: DepthModel): number {
  return model === 'flat' ? 0 : model === 'glow' ? 1 : 0.5
}

export type GlowAlphas = { trace: number; inner: number; bloom: number }

/** Alfa de cada camada do `Glow` para uma força de 0 a 1 (fora disso é limitada) no modelo de profundidade do tema. */
export function glowAlphas(strength: number, model: DepthModel): GlowAlphas {
  const s = clamp01(strength)
  return { trace: 0.25 + 0.6 * s, inner: 0.1 + 0.4 * s, bloom: (0.15 + 0.55 * s) * bloomScale(model) }
}

// Gaussiana exp(-(t·K)²): K = 2,5 chega a ~0 em t = 1 e passa por 0,5 em t = 1/3, então o raio total vale 1,5 × a largura à meia altura.
const FALLOFF_K = 2.5
export const FALLOFF_RADIUS_PER_FWHM = 1.5

/** Paradas de um gradiente radial gaussiano: posição 0–1 do centro à borda e o alfa relativo (1 → ~0). */
export function glowFalloff(steps = 7): { positions: number[]; alphas: number[] } {
  const positions = Array.from({ length: steps }, (_, i) => i / (steps - 1))
  return { positions, alphas: positions.map((t) => Math.exp(-((t * FALLOFF_K) ** 2))) }
}

export type ScenePreset = 'focus' | 'ambient' | 'success'
/** Mancha elíptica da cena; tudo em fração do contêiner (largura/altura), `fwhm` = largura à meia altura. */
export type SceneBlob = { color: GlowColor; cx: number; cy: number; fwhmX: number; fwhmY: number; opacity: number }

export const SCENE_PRESETS: Record<ScenePreset, SceneBlob[]> = {
  focus: [{ color: 'aiGlow', cx: 0.5, cy: 0, fwhmX: 0.9, fwhmY: 0.5, opacity: 0.55 }],
  ambient: [
    { color: 'aiGlow', cx: 0.1, cy: 0.1, fwhmX: 0.7, fwhmY: 0.45, opacity: 0.3 },
    { color: 'accent', cx: 0.95, cy: 0.95, fwhmX: 0.8, fwhmY: 0.5, opacity: 0.25 },
  ],
  success: [
    { color: 'accent', cx: 0.3, cy: 0, fwhmX: 0.8, fwhmY: 0.45, opacity: 0.5 },
    { color: 'aiGlow', cx: 0.7, cy: 0.05, fwhmX: 0.8, fwhmY: 0.45, opacity: 0.5 },
  ],
}

/** Alfa da cor do tema (`surface` ou `bg`) por cima do desfoque do `Blur`, igual nas duas plataformas. */
export const BLUR_TINT_ALPHA = 0.55

// Raio do desfoque em px quando a intensidade (0–100, a escala do `expo-blur`) é máxima.
const BLUR_MAX_PX = 40

/** Raio do `backdrop-filter` da web para a intensidade 0–100 do `Blur` (fora disso é limitada). */
export function blurPx(intensity: number): number {
  return clamp01(intensity / 100) * BLUR_MAX_PX
}

/** Papéis de cor do confete, na ordem do `role` de cada partícula. */
export const CONFETTI_ROLES = ['accent', 'aiGlow', 'success', 'warning'] as const satisfies readonly (keyof ColorRoles)[]
export const CONFETTI_COUNT = 28

export type ConfettiParticle = {
  /** Deslocamento horizontal da origem (fração da largura, em torno do centro). */
  x0: number
  /** Velocidade inicial (frações da largura e da altura por execução); `vy` negativo sobe. */
  vx: number
  vy: number
  /** Giro total em radianos. */
  spin: number
  /** Lado maior do retângulo, em pt/px. */
  size: number
  /** Índice em `CONFETTI_ROLES`. */
  role: number
  /** Fração inicial da execução em que a partícula ainda não saiu. */
  delay: number
}

/** Partículas determinísticas (mulberry32): a mesma semente dá o mesmo confete nas duas plataformas. */
export function confettiParticles(count = CONFETTI_COUNT, seed = 1): ConfettiParticle[] {
  let a = seed >>> 0
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const between = (lo: number, hi: number) => lo + (hi - lo) * rand()
  return Array.from({ length: count }, () => ({
    x0: between(-0.1, 0.1),
    vx: between(-0.6, 0.6),
    vy: between(-0.7, -0.25),
    spin: between(-12, 12),
    size: between(6, 10),
    role: Math.floor(rand() * CONFETTI_ROLES.length),
    delay: between(0, 0.15),
  }))
}

export type ConfettiPose = { x: number; y: number; rotate: number; opacity: number }

// Gravidade em alturas por execução ao quadrado, altura da origem (fração) e fração final em que a partícula esmaece.
const GRAVITY = 2.2
const ORIGIN_Y = 0.12
const FADE_FROM = 0.7

/** Posição, giro e opacidade da partícula em `t` (0–1 da execução) num quadro de `width` × `height`. Roda na thread de UI do Reanimated. */
export function confettiPose(p: ConfettiParticle, t: number, width: number, height: number): ConfettiPose {
  'worklet'
  const local = Math.min(Math.max((t - p.delay) / (1 - p.delay), 0), 1)
  return {
    x: width * (0.5 + p.x0 + p.vx * local),
    y: height * (ORIGIN_Y + p.vy * local + 0.5 * GRAVITY * local * local),
    rotate: p.spin * local,
    opacity: t < p.delay ? 0 : local < FADE_FROM ? 1 : (1 - local) / (1 - FADE_FROM),
  }
}
