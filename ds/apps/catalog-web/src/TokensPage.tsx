import { colorRoles, contrastRatio, type ColorRoles, type DSTheme, type Scheme, type TypeStep } from '@gahmp1/ds-theme'

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
const v = (name: string) => `var(--ds-${name})`

// Cada movimento dura --ds-duration-base; o resto do ciclo é pausa, para o quadro não piscar.
const motionCss = `
@keyframes ds-tokens-slide { 0% { transform: translateX(0) } 16.67%, 50% { transform: translateX(120px) } 66.67%, 100% { transform: translateX(0) } }
.ds-tokens-box { animation: ds-tokens-slide calc(var(--ds-duration-base) * 6) var(--ds-ease-standard) infinite; }
@media (prefers-reduced-motion: reduce) { .ds-tokens-box { animation: none; } }
`

function ratio(c: ColorRoles, role: ReturnType<typeof colorRoles>[number]): string {
  try {
    return contrastRatio(c[role], c.bg).toFixed(2)
  } catch {
    return 'alfa'
  }
}

const section = { display: 'grid', gap: v('space-sm'), marginBottom: v('space-xl') } as const
const heading = { fontFamily: v('font-display'), fontSize: v('text-lg-size'), lineHeight: v('text-lg-line'), margin: 0 } as const
const label = { fontSize: v('text-xs-size'), lineHeight: v('text-xs-line'), color: v('color-text-muted'), textTransform: v('label-case'), fontVariantNumeric: v('numeric') } as const

export function TokensPage({ theme, scheme }: { theme: DSTheme; scheme: Scheme }) {
  const c = theme.color[scheme]
  const steps = Object.keys(theme.type.scale) as TypeStep[]
  return (
    <main style={{ padding: v('space-md'), fontFamily: v('font-body'), color: v('color-text'), background: v('color-bg'), minHeight: '100vh', boxSizing: 'border-box' }}>
      <style>{motionCss}</style>
      <header style={{ display: 'flex', alignItems: 'center', gap: v('space-sm'), flexWrap: 'wrap', marginBottom: v('space-xl') }}>
        <h1 style={{ ...heading, fontSize: v('text-xl-size'), lineHeight: v('text-xl-line') }}>{theme.name} · {scheme === 'dark' ? 'escuro' : 'claro'}</h1>
        {theme.provisional[scheme] && (
          <span style={{ ...label, color: v('color-on-warning'), background: v('color-warning'), padding: `2px ${v('space-xs')}`, borderRadius: v('radius-full') }}>provisório</span>
        )}
      </header>

      <section style={section}>
        <h2 style={heading}>Cor (razão contra bg)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: v('space-sm') }}>
          {colorRoles(c).map((role) => (
            <div key={role} style={{ display: 'grid', gap: v('space-xxs') }}>
              <div style={{ height: 48, background: v(`color-${kebab(role)}`), borderRadius: v('radius-sm'), border: `1px solid ${v('color-border-muted')}` }} />
              <span style={{ fontSize: v('text-sm-size'), lineHeight: v('text-sm-line') }}>{role}</span>
              <span style={label}>{ratio(c, role)}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2 style={heading}>Tipo</h2>
        {steps.map((s) => (
          <div key={s} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: v('space-sm'), alignItems: 'baseline', overflowWrap: 'anywhere' }}>
            <span style={label}>{s} {theme.type.scale[s].size}/{theme.type.scale[s].lineHeight}</span>
            <div>
              <div style={{ fontFamily: v('font-display'), fontSize: v(`text-${s}-size`), lineHeight: v(`text-${s}-line`), fontWeight: v('weight-semibold') }}>Display 1.234,56</div>
              <div style={{ fontFamily: v('font-body'), fontSize: v(`text-${s}-size`), lineHeight: v(`text-${s}-line`) }}>Corpo do texto</div>
            </div>
          </div>
        ))}
      </section>

      <section style={section}>
        <h2 style={heading}>Raio, espaço e controle</h2>
        <div style={{ display: 'flex', gap: v('space-sm'), flexWrap: 'wrap' }}>
          {Object.keys(theme.shape.radius).map((k) => (
            <div key={k} style={{ display: 'grid', gap: v('space-xxs'), justifyItems: 'center' }}>
              <div style={{ width: 56, height: 56, background: v('color-surface2'), border: `${v('border-thin')} solid ${v('color-border')}`, borderRadius: v(`radius-${k}`) }} />
              <span style={label}>{k}</span>
            </div>
          ))}
        </div>
        {Object.keys(theme.density.space).map((k) => (
          <div key={k} style={{ display: 'flex', gap: v('space-sm'), alignItems: 'center' }}>
            <span style={{ ...label, width: 40 }}>{k}</span>
            <div style={{ width: v(`space-${k}`), height: 12, background: v('color-accent'), borderRadius: 2 }} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: v('space-sm'), flexWrap: 'wrap', alignItems: 'center' }}>
          {Object.keys(theme.density.control).map((k) => (
            <button key={k} type="button" style={{ height: v(`control-${k}`), padding: `0 ${v('space-md')}`, border: 0, borderRadius: v('radius-control'), background: v('color-accent'), color: v('color-on-accent'), fontFamily: v('font-body'), fontSize: v('text-sm-size'), fontWeight: v('weight-medium'), textTransform: v('label-case') }}>
              controle {k}
            </button>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2 style={heading}>Movimento</h2>
        <div style={{ height: 56, padding: v('space-xs'), background: v('color-surface1'), borderRadius: v('radius-md'), overflow: 'hidden', maxWidth: 240 }}>
          <div className="ds-tokens-box" data-testid="motion-box" style={{ width: 40, height: 40, borderRadius: v('radius-sm'), background: v('color-ai-orb') }} />
        </div>
        <span style={label}>{theme.motion.duration.base} ms · {theme.motion.personality} · reduz movimento: parado</span>
      </section>
    </main>
  )
}
