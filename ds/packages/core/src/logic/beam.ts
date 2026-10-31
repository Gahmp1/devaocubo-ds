// Ideia: border-beam da libraries.dev (brilho viajante por ângulo mais bloom; licença a verificar), recriada sem código copiado.

/** Ângulo do brilho em graus (0–360) para o instante `tMs` num ciclo de `periodMs`; período inválido deixa parado em 0. Roda na thread de UI do Reanimated. */
export function beamAngle(tMs: number, periodMs: number): number {
  'worklet'
  if (!(periodMs > 0) || !(tMs > 0)) return 0
  return ((tMs % periodMs) / periodMs) * 360
}

/** Fração do contorno que o feixe cobre (cabeça mais cauda), igual nas duas plataformas. */
export const BEAM_ARC = 0.3

/** Paradas do gradiente cônico do feixe, de 0 a 1 no sentido horário a partir do ângulo do brilho: cauda transparente, cabeça na cor cheia, resto transparente. */
export const BEAM_STOPS = { positions: [0, 1 - BEAM_ARC, 1 - BEAM_ARC / 6, 1], alphas: [0, 0, 1, 0] } as const
