import type { DSTheme, Shadow } from '../types.js'

// Provisório nos dois esquemas: somma:packages/tokens/src/index.ts (dark/light, income/expense/warning/info, lightSemantic).
const black = '#050505'
const paper = '#F7F7F2'
const none: Shadow = { color: 'rgba(0, 0, 0, 0)', x: 0, y: 0, blur: 0, spread: 0, elevation: 0 }
const plex = { web: "'IBM Plex Mono', ui-monospace, monospace", native: { 400: 'IBMPlexMono_400Regular', 600: 'IBMPlexMono_600SemiBold', 700: 'IBMPlexMono_700Bold' } }

export const somma: DSTheme = {
  name: 'somma',
  provisional: { light: true, dark: true },
  color: {
    dark: {
      bg: black, surface1: '#1B1B1B', surface2: '#313130', surface3: '#474746',
      // sem fonte: inferência, preto do tema a 70%
      scrim: 'rgba(5, 5, 5, 0.7)',
      text: paper, textMuted: '#9F9F9C', textSubtle: '#9A9A97', textDisabled: '#737371',
      accent: '#34D399', onAccent: black, danger: '#FF5A4F', onDanger: black, warning: '#FBBF24', onWarning: black,
      success: '#34D399', onSuccess: black,
      // ajustado: fonte info.onMain #F7F7F2 (razão 2.91); preto do tema, maior contraste
      info: '#2196F3', onInfo: black,
      border: '#5D5D5B', borderMuted: '#313130', focus: '#34D399',
      aiOrb: '#34D399', aiGlow: '#34D399', aiBeam: '#34D399',
    },
    light: {
      bg: '#E1E1DC', surface1: paper, surface2: paper, surface3: paper,
      scrim: 'rgba(5, 5, 5, 0.5)',
      text: '#1B1B1B', textMuted: '#474746', textSubtle: '#5D5D5B', textDisabled: '#9F9F9C',
      // lightSemantic: mesma matiz escurecida para fundo claro, texto por cima claro (onMain)
      accent: '#0E6D66', onAccent: paper, danger: '#AB3027', onDanger: paper, warning: '#845709', onWarning: paper,
      success: '#0E6D66', onSuccess: paper, info: '#145DA0', onInfo: paper,
      border: '#B5B5B1', borderMuted: '#CBCBC7', focus: '#0E6D66',
      aiOrb: '#0E6D66', aiGlow: '#34D399', aiBeam: '#0E6D66',
    },
  },
  type: {
    family: { display: plex, body: plex, mono: plex },
    // bodySmall, bodyMedium, bodyLarge, headlineSmall, displaySmall, displayLarge de typography
    scale: {
      xs: { size: 12, lineHeight: 16 }, sm: { size: 13, lineHeight: 18 }, base: { size: 14, lineHeight: 20 },
      lg: { size: 18, lineHeight: 24 }, xl: { size: 24, lineHeight: 32 }, display: { size: 32, lineHeight: 40 },
    },
    // o app carrega Plex 400/600/700: medium cai em 600
    weight: { regular: 400, medium: 600, semibold: 600, bold: 700 },
    // displayLarge -0.5px/32px; labelMedium 0.5px/11px
    tracking: { tight: -0.015, normal: 0, wide: 0.045 },
    labelCase: 'uppercase',
    numeric: 'tabular',
  },
  shape: { radius: { sm: 6, md: 8, lg: 12, xl: 16, xxl: 24, full: 9999 }, control: 'rounded', borderWidth: { hairline: 1, thin: 1, thick: 2 } },
  depth: { light: { model: 'flat', card: none, overlay: none }, dark: { model: 'flat', card: none, overlay: none } },
  density: { space: { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 40, huge: 48 }, control: { sm: 36, md: 44, lg: 52 } },
  motion: {
    duration: { fast: 150, base: 250, slow: 400 },
    easing: { standard: [0.4, 0, 0.2, 1], enter: [0, 0, 0.2, 1], exit: [0.4, 0, 1, 1] },
    spring: { damping: 20, stiffness: 180, mass: 1 },
    personality: 'calm',
    press: { kind: 'opacity', value: 0.6 },
  },
  ai: { orb: 'ring', beamPeriodMs: 4000, steps: 'timeline', revealMsPerWord: 60 },
  components: { button: { shape: 'rounded' }, card: { type: 'outline' }, tabBar: 'solid', header: 'compact' },
}
