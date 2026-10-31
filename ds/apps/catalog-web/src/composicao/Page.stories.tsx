import { HeaderTitle, ListItem, Page, Stack, TabBar, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/Page' }
export default meta

// A página ocupa a altura do pai (100%); aqui o pai é uma moldura de celular.
const frame = { blockSize: 560, maxInlineSize: 390, border: '1px solid var(--ds-color-border)', overflow: 'hidden' } as const
const rows = Array.from({ length: 24 }, (_, i) => `Exercício ${i + 1}`)

/** Cabeçalho fixo e conteúdo sem rolagem. */
export const ComCabecalho: StoryObj = {
  render: () => (
    <div style={frame}>
      <Page header={<HeaderTitle title="Treinos" subtitle="Segunda-feira" />}>
        <Stack style={{ padding: 24 }}>
          <Text color="textMuted">Conteúdo da página.</Text>
        </Stack>
      </Page>
    </div>
  ),
}

/** `scroll`: só a área central rola; o cabeçalho fica no lugar. `onScroll` entrega a posição. */
export const Rolando: StoryObj = {
  render: function Render() {
    const [y, setY] = useState(0)
    return (
      <div style={frame}>
        <Page
          scroll
          header={<HeaderTitle size="compact" title="Exercícios" subtitle={`Rolagem: ${Math.round(y)} px`} />}
          onScroll={(e) => setY(e.currentTarget.scrollTop)}
        >
          {rows.map((r) => (
            <ListItem key={r} title={r} subtitle="3 séries de 10" />
          ))}
        </Page>
      </div>
    )
  },
}

/** Rodapé fixo (barra de abas) abaixo da área que rola. */
export const ComRodape: StoryObj = {
  render: function Render() {
    const [tab, setTab] = useState('home')
    return (
      <div style={frame}>
        <Page
          scroll
          edges={['top', 'bottom']}
          header={<HeaderTitle title="Início" />}
          footer={
            <TabBar
              value={tab}
              onChange={setTab}
              items={[
                { key: 'home', label: 'Início', icon: 'file' },
                { key: 'search', label: 'Buscar', icon: 'search' },
                { key: 'more', label: 'Mais', icon: 'more' },
              ]}
            />
          }
        >
          {rows.map((r) => (
            <ListItem key={r} title={r} />
          ))}
        </Page>
      </div>
    )
  },
}
