import { legacyCss } from '../legacy/devaocubo.js'
import type { ColorRoles, DSTheme } from '../types.js'

// Tema neutro: as cores são as do tokens.css legado, lidas dos mesmos dados.
function roles(entries: readonly (readonly [string, string])[], aiGradient: ColorRoles['aiGradient']): ColorRoles {
  const v = Object.fromEntries(entries.map(([k, x]) => [k, `hsl(${x})`]))
  return {
    bg: v.background, surface1: v.card, surface2: v.muted, surface3: v.border, scrim: 'rgba(0, 0, 0, 0.6)',
    text: v.foreground, textMuted: v['muted-foreground'], textSubtle: v['muted-foreground'], textDisabled: v.border,
    accent: v.primary, onAccent: v['primary-foreground'], danger: v.destructive, onDanger: v['destructive-foreground'],
    warning: v.warning, onWarning: v['warning-foreground'], success: v.success, onSuccess: v['success-foreground'],
    info: v.primary, onInfo: v['primary-foreground'],
    border: v.border, borderMuted: v.input, focus: v.ring,
    aiOrb: v.primary, aiGlow: v.primary, aiBeam: v.primary,
    aiGradient,
  }
}

const noShadow = { color: 'rgba(0, 0, 0, 0)', x: 0, y: 0, blur: 0, spread: 0, elevation: 0 }
const sans = { web: 'ui-sans-serif, system-ui, -apple-system, sans-serif', native: {} }

export const devaocubo: DSTheme = {
  name: 'devaocubo',
  provisional: { light: false, dark: false },
  color: {
    // provisório: acento, mistura com info 55% e com texto 45%; aguarda designer
    light: roles([...legacyCss.light, ...legacyCss.lightStatus], ['#161618', '#161618', '#101012']),
    dark: roles([...legacyCss.dark, ...legacyCss.darkStatus], ['#F4F4F6', '#F4F4F6', '#F4F4F6']),
  },
  type: {
    family: { display: sans, body: sans, mono: { web: 'ui-monospace, SFMono-Regular, Menlo, monospace', native: {} } },
    scale: {
      xs: { size: 12, lineHeight: 16 }, sm: { size: 14, lineHeight: 20 }, base: { size: 16, lineHeight: 24 },
      lg: { size: 18, lineHeight: 28 }, xl: { size: 24, lineHeight: 32 }, display: { size: 40, lineHeight: 48 },
    },
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    tracking: { tight: -0.02, normal: 0, wide: 0.04 },
    labelCase: 'none',
    numeric: 'proportional',
  },
  // --radius: 0.6rem = 9.6px; sm/md/xl seguem as fórmulas do @theme legado.
  shape: { radius: { sm: 5.6, md: 7.6, lg: 9.6, xl: 13.6, xxl: 24, full: 9999 }, control: 'rounded', borderWidth: { hairline: 1, thin: 1, thick: 2 } },
  depth: {
    light: { model: 'hairline', card: noShadow, overlay: { color: 'rgba(0, 0, 0, 0.12)', x: 0, y: 8, blur: 24, spread: 0, elevation: 8 } },
    dark: { model: 'hairline', card: noShadow, overlay: { color: 'rgba(0, 0, 0, 0.5)', x: 0, y: 8, blur: 24, spread: 0, elevation: 8 } },
  },
  // xs..xl de defaults.json (--spacing-*).
  density: { space: { xxs: 2, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 40, xxxl: 48, huge: 64 }, control: { sm: 36, md: 40, lg: 48 } },
  icon: { strokeWidth: 1.5, size: { sm: 16, md: 20, lg: 24 } }, // sem fonte: inferência
  motion: {
    duration: { fast: 150, base: 200, slow: 300 },
    easing: { standard: [0.4, 0, 0.2, 1], enter: [0, 0, 0.2, 1], exit: [0.4, 0, 1, 1] },
    spring: { damping: 20, stiffness: 200, mass: 1 },
    personality: 'calm',
    press: { kind: 'scale', value: 0.98 },
  },
  ai: { orb: 'dots', beamPeriodMs: 3000, steps: 'list', revealMsPerWord: 50 },
  // som desligado até a pessoa ligar (som-e-haptics.md); timbre acompanha a personalidade do movimento
  feedback: { haptics: { default: 'on', intensity: 'soft' }, sound: { default: 'off', timbre: 'soft', volume: 0.4 } },
  components: { button: { shape: 'rounded' }, card: { type: 'outline' }, tabBar: 'solid', header: 'compact' },
}
