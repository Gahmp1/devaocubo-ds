import { fontFamily } from '@gahmp1/ds-fonts'
import type { DSTheme } from '../types.js'

// Provisório nos dois esquemas: trippo:packages/shared/src/tokens.js (lightTokens/darkTokens). Sem acento de marca
// ainda: accent = primary (tinta). Acento e fonte do mobile ficam para a onda do Trippo, com o João e o designer.
const geist = fontFamily('geist')

export const trippo: DSTheme = {
  name: 'trippo',
  provisional: { light: true, dark: true },
  color: {
    light: {
      bg: '#f7f6f2', surface1: '#ffffff', surface2: '#f4f4f5', surface3: '#f4f4f5',
      // sem fonte: inferência
      scrim: 'rgba(0, 0, 0, 0.5)',
      text: '#1c1c1b', textMuted: '#65656d', textSubtle: '#65656d',
      // sem fonte: inferência, mutedForeground do escuro
      textDisabled: '#a1a1aa',
      accent: '#18181b', onAccent: '#ffffff', danger: '#dc2626', onDanger: '#ffffff',
      // ajustado: fonte warningForeground #ffffff (razão 3.19); tinta do tema, maior contraste
      warning: '#d97706', onWarning: '#1c1c1b',
      // ajustado: fonte success #059669 (razão 3.77 com #ffffff); verde escurecido, mesmo matiz
      success: 'hsl(161 94% 25%)', onSuccess: '#ffffff',
      info: '#2563eb', onInfo: '#ffffff',
      // rgba(0,0,0,0.15) e accent rgba(0,0,0,0.05) compostos sobre o bg
      border: '#d2d1ce', borderMuted: '#ebeae6', focus: '#71717a',
      // apps/web/BRAND.md: Ash #B8B6AE é o brilho e os pontos de rota (decorativo, fora da checagem de texto)
      aiOrb: '#18181b', aiGlow: '#B8B6AE', aiBeam: '#B8B6AE',
      // provisório: acento, mistura com info 55% e com texto 45%; aguarda designer
      aiGradient: ['#18181B', '#1F418D', '#1A1A1B'],
    },
    dark: {
      bg: '#0a0a09', surface1: '#18181b', surface2: '#27272a', surface3: '#27272a',
      scrim: 'rgba(0, 0, 0, 0.6)',
      text: '#f7f6f2', textMuted: '#a1a1aa', textSubtle: '#a1a1aa',
      // sem fonte: inferência
      textDisabled: '#52525b',
      accent: '#ffffff', onAccent: '#18181b', danger: '#dc2626', onDanger: '#ffffff',
      warning: '#d97706', onWarning: '#1c1c1b',
      // fonte #059669; no escuro a tinta por cima passa (4.53) e o verde lê melhor como texto sobre o Night
      success: '#059669', onSuccess: '#1c1c1b',
      info: '#2563eb', onInfo: '#ffffff',
      // rgba(255,255,255,0.15) e accent rgba(255,255,255,0.10) compostos sobre o bg
      border: '#2f2f2e', borderMuted: '#232322', focus: '#71717a',
      aiOrb: '#f7f6f2', aiGlow: '#B8B6AE', aiBeam: '#B8B6AE',
      // provisório: acento, mistura com info 55% e com texto 45%; aguarda designer
      aiGradient: ['#FFFFFF', '#87A9F4', '#FBFBF9'],
    },
  },
  type: {
    family: { display: geist, body: geist, mono: fontFamily('geist-mono') },
    scale: {
      xs: { size: 12, lineHeight: 16 }, sm: { size: 14, lineHeight: 20 }, base: { size: 16, lineHeight: 24 },
      lg: { size: 18, lineHeight: 28 }, xl: { size: 24, lineHeight: 32 }, display: { size: 36, lineHeight: 40 },
    },
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    tracking: { tight: -0.02, normal: 0, wide: 0.02 },
    labelCase: 'none',
    numeric: 'proportional',
  },
  shape: { radius: { sm: 8, md: 9, lg: 10, xl: 15, xxl: 24, full: 9999 }, control: 'rounded', borderWidth: { hairline: 1, thin: 1, thick: 2 } },
  depth: {
    light: {
      model: 'shadow',
      card: { color: 'rgba(0, 0, 0, 0.06)', x: 0, y: 1, blur: 3, spread: 0, elevation: 1 },
      overlay: { color: 'rgba(0, 0, 0, 0.12)', x: 0, y: 8, blur: 24, spread: 0, elevation: 8 },
    },
    dark: {
      model: 'shadow',
      card: { color: 'rgba(0, 0, 0, 0.4)', x: 0, y: 1, blur: 3, spread: 0, elevation: 1 },
      overlay: { color: 'rgba(0, 0, 0, 0.6)', x: 0, y: 8, blur: 24, spread: 0, elevation: 8 },
    },
  },
  density: { space: { xxs: 2, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 40, xxxl: 48, huge: 64 }, control: { sm: 36, md: 44, lg: 52 } },
  icon: { strokeWidth: 1.5, size: { sm: 16, md: 20, lg: 24 } }, // sem fonte: inferência
  motion: {
    duration: { fast: 150, base: 200, slow: 300 },
    easing: { standard: [0.4, 0, 0.2, 1], enter: [0, 0, 0.2, 1], exit: [0.4, 0, 1, 1] },
    spring: { damping: 18, stiffness: 220, mass: 1 },
    personality: 'calm',
    press: { kind: 'scale', value: 0.97 },
  },
  ai: { orb: 'dots', beamPeriodMs: 3000, steps: 'list', revealMsPerWord: 50 },
  // som desligado até a pessoa ligar (som-e-haptics.md); timbre acompanha a personalidade do movimento
  feedback: { haptics: { default: 'on', intensity: 'soft' }, sound: { default: 'off', timbre: 'soft', volume: 0.4 } },
  components: { button: { shape: 'rounded' }, card: { type: 'fill' }, tabBar: 'floating', header: 'large' },
}
