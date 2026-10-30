// Referência: Bencho (MIT), https://github.com/cabralorenzo/bencho
// Padrão: sons de interface sintetizados (oscilador + passa-baixa + envelope exponencial com ataque, sem arquivo).
// Receitas e timbres próprios; nada dos sons do Pro.

export type Timbre = 'soft' | 'crisp'
export type SoundBase = 'click' | 'rise' | 'low'
export type SoundName = `${SoundBase}-${Timbre}`

/** Uma nota: `f` Hz (desliza até `to`), `ms` de duração, `at` ms de atraso, `g` pico (0 a 1, antes do volume). */
export type Note = { wave: 'sine' | 'triangle' | 'square'; f: number; to?: number; ms: number; at?: number; g: number }

/** Passa-baixa e ataque comuns às duas plataformas: nada começa em ganho cheio (isso é um estalo). */
export const SOUND_FILTER_HZ = 3000
export const SOUND_ATTACK_MS = 4

/** soft: sino suave e grave (calm); crisp: clique seco e agudo (snappy). Todas ≤ 300 ms. */
export const SOUND_RECIPES: Record<SoundName, Note[]> = {
  'click-soft': [{ wave: 'sine', f: 1100, to: 900, ms: 80, g: 0.3 }],
  'click-crisp': [{ wave: 'triangle', f: 1900, to: 1500, ms: 60, g: 0.3 }],
  'rise-soft': [
    { wave: 'sine', f: 523, ms: 120, g: 0.3 },
    { wave: 'sine', f: 784, ms: 180, g: 0.3, at: 100 },
  ],
  'rise-crisp': [
    { wave: 'triangle', f: 660, ms: 90, g: 0.3 },
    { wave: 'triangle', f: 990, ms: 150, g: 0.3, at: 80 },
  ],
  'low-soft': [{ wave: 'sine', f: 196, to: 165, ms: 180, g: 0.4 }],
  'low-crisp': [{ wave: 'triangle', f: 220, to: 147, ms: 140, g: 0.4 }],
}

/** Duração total da receita em ms (a maior borda final entre as notas). */
export const soundMs = (n: SoundName) => Math.max(...SOUND_RECIPES[n].map((x) => (x.at ?? 0) + x.ms))
