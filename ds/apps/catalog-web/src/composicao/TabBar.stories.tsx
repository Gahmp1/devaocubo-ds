import { Stack, TabBar, Text, type TabBarProps } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/TabBar' }
export default meta

const ALL: TabBarProps['items'] = [
  { key: 'home', label: 'Início', icon: 'file' },
  { key: 'search', label: 'Buscar', icon: 'search' },
  { key: 'link', label: 'Links', icon: 'link' },
  { key: 'info', label: 'Sobre', icon: 'info' },
  { key: 'more', label: 'Mais', icon: 'more' },
]
const VARIANTS = ['floating', 'glass', 'solid'] as const

/** Conteúdo colorido atrás da barra, para o `glass` ter o que desfocar. */
function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', maxInlineSize: 420, blockSize: 140, background: 'var(--ds-color-bg)' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', gap: 8, padding: 8 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ inlineSize: 80, blockSize: 40, borderRadius: 'var(--ds-radius-md)', background: i % 2 ? 'var(--ds-color-accent)' : 'var(--ds-color-surface3)' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', insetInline: 0, insetBlockEnd: 0 }}>{children}</div>
    </div>
  )
}

function Demo({ count, variant, badge }: { count: number; variant?: TabBarProps['variant']; badge?: boolean }) {
  const [value, setValue] = useState('home')
  const items = ALL.slice(0, count).map((it, i) => (badge && i === 1 ? { ...it, badge: 3 } : it))
  return <TabBar items={items} value={value} onChange={setValue} variant={variant} />
}

/** 3 a 5 abas em cada variante; a pílula ativa desliza com a mola do tema. */
export const AbasEVariantes: StoryObj = {
  render: () => (
    <Stack gap="lg" style={{ padding: 24 }}>
      {VARIANTS.map((v) => (
        <Stack key={v} gap="xs">
          <Text variant="smMedium" color="textMuted" label>{v}</Text>
          {[3, 4, 5].map((n) => (
            <Backdrop key={n}>
              <Demo count={n} variant={v} />
            </Backdrop>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
}

/** Sem `variant` vale `components.tabBar` do tema. */
export const PadraoDoTema: StoryObj = {
  render: () => (
    <Stack style={{ padding: 24 }}>
      <Backdrop><Demo count={4} /></Backdrop>
    </Stack>
  ),
}

/** Selo numérico na aba (99+ acima de 99). */
export const ComBadge: StoryObj = {
  render: () => (
    <Stack gap="lg" style={{ padding: 24 }}>
      {VARIANTS.map((v) => (
        <Backdrop key={v}>
          <Demo count={4} variant={v} badge />
        </Backdrop>
      ))}
    </Stack>
  ),
}
