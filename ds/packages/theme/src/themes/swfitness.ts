import type { DSTheme, Shadow } from '../types.js'

// Escuro definitivo: valores do Zenith (swfitness:apps/mobile/src/components/zenith/tokens.json).
// Claro provisório: bloco light de swfitness:design/ds.config.json, até revisão do designer.
const ink = '#0E0E11'
const lime = '#B6FB2D'
const none: Shadow = { color: 'rgba(0, 0, 0, 0)', x: 0, y: 0, blur: 0, spread: 0, elevation: 0 }
const gilroy = { web: "'Gilroy', 'Outfit', system-ui, sans-serif", native: { 400: 'Gilroy-Regular', 500: 'Gilroy-Medium', 600: 'Gilroy-SemiBold' } }

export const swfitness: DSTheme = {
  name: 'swfitness',
  provisional: { light: true, dark: false },
  color: {
    dark: {
      bg: ink, surface1: '#17171A', surface2: '#313134', surface3: '#39393C',
      // fundo do BottomSheet: colors.background com overlayOpacity 0.84
      scrim: 'rgba(14, 14, 17, 0.84)',
      text: '#FFFFFF', textMuted: '#BCBCBC', textSubtle: '#6E6E70', textDisabled: '#47484E',
      accent: lime, onAccent: ink, danger: '#FF4040', onDanger: ink, warning: '#FDBC30', onWarning: ink,
      success: lime, onSuccess: ink, info: '#007AFF', onInfo: ink,
      border: '#646161', borderMuted: '#454649', focus: lime,
      aiOrb: lime, aiGlow: lime, aiBeam: lime,
      // provisório: acento, mistura com info 55% e com texto 45%; aguarda designer
      aiGradient: ['#B6FB2D', '#52B4A1', '#D7FD8C'],
    },
    light: {
      bg: 'hsl(0 0% 98%)', surface1: '#FFFFFF', surface2: 'hsl(240 5% 95%)', surface3: 'hsl(240 5% 95%)',
      scrim: 'rgba(14, 14, 17, 0.84)',
      text: ink, textMuted: '#6E6E70', textSubtle: '#6E6E70',
      // sem fonte no claro: inferência, cinza do mesmo matiz das superfícies
      textDisabled: 'hsl(240 5% 65%)',
      // ajustado: fonte #B6FB2D (razão 1.19 sobre o fundo); lima escurecida até 3:1, mesmo matiz
      accent: 'hsl(80 96% 31%)', onAccent: ink,
      // ajustado: fonte destructive-foreground #FFFFFF (razão 3.47); regra do escuro, maior contraste
      danger: '#FF4040', onDanger: ink,
      // sem warning/info no bloco light: valores do escuro
      warning: '#FDBC30', onWarning: ink,
      success: 'hsl(80 96% 31%)', onSuccess: ink, info: '#007AFF', onInfo: ink,
      border: 'hsl(240 5% 90%)', borderMuted: 'hsl(240 5% 90%)',
      focus: 'hsl(80 96% 31%)',
      aiOrb: 'hsl(80 96% 31%)', aiGlow: lime, aiBeam: 'hsl(80 96% 31%)',
      // provisório: acento, mistura com info 55% e com texto 45%; aguarda designer
      aiGradient: ['#689B03', '#2F898E', '#405C09'],
    },
  },
  type: {
    family: { display: gilroy, body: gilroy, mono: { web: 'ui-monospace, SFMono-Regular, Menlo, monospace', native: {} } },
    scale: {
      xs: { size: 12, lineHeight: 16 }, sm: { size: 14, lineHeight: 16 }, base: { size: 16, lineHeight: 20 },
      lg: { size: 20, lineHeight: 24 }, xl: { size: 24, lineHeight: 28 }, display: { size: 44, lineHeight: 56 },
    },
    // não há arquivo Gilroy Bold: bold cai em 600
    weight: { regular: 400, medium: 500, semibold: 600, bold: 600 },
    tracking: { tight: -0.01, normal: 0, wide: 0.02 },
    labelCase: 'none',
    numeric: 'proportional',
  },
  shape: { radius: { sm: 8, md: 16, lg: 20, xl: 24, xxl: 40, full: 9999 }, control: 'pill', borderWidth: { hairline: 0.4, thin: 1, thick: 2 } },
  depth: { light: { model: 'glow', card: none, overlay: none }, dark: { model: 'glow', card: none, overlay: none } },
  density: { space: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 20, xl: 24, xxl: 28, xxxl: 32, huge: 40 }, control: { sm: 40, md: 44, lg: 56 } }, // alturas reais do DSButton (Zenith): small 40, normal 44, large 56
  // Zenith: icons.ts (stroke 2) e DynamicImage (16/24/32)
  icon: { strokeWidth: 2, size: { sm: 16, md: 24, lg: 32 } },
  motion: {
    duration: { fast: 200, base: 250, slow: 300 },
    easing: { standard: [0.42, 0, 0.58, 1], enter: [0.33, 1, 0.68, 1], exit: [0.32, 0, 0.67, 0] },
    // TabBar trocou o withSpring (damping 12, com bounce) por timing sem bounce: mola criticamente amortecida
    spring: { damping: 35, stiffness: 300, mass: 1 },
    personality: 'snappy',
    press: { kind: 'opacity', value: 0.3 },
  },
  // beam: animation 3s em design-library/examples/lab-swfitness/styles.css
  ai: { orb: 'dots', beamPeriodMs: 3000, steps: 'list', revealMsPerWord: 50 },
  // som desligado até a pessoa ligar (som-e-haptics.md); timbre acompanha a personalidade do movimento
  feedback: { haptics: { default: 'on', intensity: 'crisp' }, sound: { default: 'off', timbre: 'crisp', volume: 0.5 } },
  components: { button: { shape: 'pill' }, card: { type: 'fill' }, tabBar: 'glass', header: 'large' },
}
