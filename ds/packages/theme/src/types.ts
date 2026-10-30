export type Scheme = 'light' | 'dark'
export type FontWeight = 400 | 500 | 600 | 700
/** native: nome da fonte carregada por peso (ex.: 'Gilroy-Medium'); ausente = fonte do sistema. */
export interface FontFamily { web: string; native: Partial<Record<FontWeight, string>> }

export interface ColorRoles {
  bg: string; surface1: string; surface2: string; surface3: string; scrim: string
  text: string; textMuted: string; textSubtle: string; textDisabled: string
  accent: string; onAccent: string; danger: string; onDanger: string; warning: string; onWarning: string
  success: string; onSuccess: string; info: string; onInfo: string
  border: string; borderMuted: string; focus: string
  aiOrb: string; aiGlow: string; aiBeam: string
}

export type TypeStep = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'display'
export type Bezier = [number, number, number, number]
export interface Shadow { color: string; x: number; y: number; blur: number; spread: number; elevation: number }

export interface DSTheme {
  name: 'devaocubo' | 'swfitness' | 'somma' | 'trippo'
  provisional: Record<Scheme, boolean>
  color: Record<Scheme, ColorRoles>
  type: {
    family: { display: FontFamily; body: FontFamily; mono: FontFamily }
    scale: Record<TypeStep, { size: number; lineHeight: number }>
    weight: { regular: FontWeight; medium: FontWeight; semibold: FontWeight; bold: FontWeight }
    /** em */
    tracking: { tight: number; normal: number; wide: number }
    labelCase: 'none' | 'uppercase'
    numeric: 'proportional' | 'tabular'
  }
  shape: {
    radius: { sm: number; md: number; lg: number; xl: number; xxl: number; full: number }
    control: 'pill' | 'rounded' | 'square'
    borderWidth: { hairline: number; thin: number; thick: number }
  }
  depth: Record<Scheme, { model: 'flat' | 'hairline' | 'shadow' | 'glow' | 'blur'; card: Shadow; overlay: Shadow }>
  density: {
    space: { xxs: number; xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; xxxl: number; huge: number }
    control: { sm: number; md: number; lg: number }
  }
  motion: {
    /** ms */
    duration: { fast: number; base: number; slow: number }
    easing: { standard: Bezier; enter: Bezier; exit: Bezier }
    spring: { damping: number; stiffness: number; mass: number }
    personality: 'calm' | 'snappy'
    press: { kind: 'opacity' | 'scale'; value: number }
  }
  icon: { strokeWidth: number; size: { sm: number; md: number; lg: number } }
  ai: { orb: 'dots' | 'fluid' | 'ring'; beamPeriodMs: number; steps: 'list' | 'timeline'; revealMsPerWord: number }
  components: {
    button: { shape: 'pill' | 'rounded' | 'square' }
    card: { type: 'fill' | 'outline' }
    tabBar: 'floating' | 'glass' | 'solid'
    header: 'large' | 'compact'
  }
}
