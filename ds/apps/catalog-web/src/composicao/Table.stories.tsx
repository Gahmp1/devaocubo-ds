import { Stack, Table, Text, type TableColumn, type TableSort } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/Table' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 640 } as const

const COLUMNS: TableColumn[] = [
  { key: 'exercise', title: 'Exercício', sortable: true },
  { key: 'sets', title: 'Séries', align: 'end', sortable: true },
  { key: 'load', title: 'Carga (kg)', align: 'end', sortable: true },
  { key: 'note', title: 'Observação' },
]

const ROWS = [
  { exercise: 'Agachamento livre', sets: 4, load: 100, note: 'Descer até 90 graus' },
  { exercise: 'Supino reto', sets: 4, load: 80, note: <Text variant="sm" color="success">Evolução</Text> },
  { exercise: 'Remada curvada', sets: 3, load: 60, note: 'Costas retas' },
  { exercise: 'Desenvolvimento militar', sets: 3, load: 40, note: 'Sem impulso das pernas' },
  { exercise: 'Levantamento terra', sets: 5, load: 120, note: <Text variant="sm" color="warning">Atenção à lombar</Text> },
]

const sortRows = (sort: TableSort | undefined) => {
  if (!sort) return ROWS
  const sign = sort.direction === 'asc' ? 1 : -1
  return [...ROWS].sort((a, b) => {
    const x = a[sort.key as keyof (typeof ROWS)[number]]
    const y = b[sort.key as keyof (typeof ROWS)[number]]
    return typeof x === 'number' && typeof y === 'number' ? (x - y) * sign : String(x).localeCompare(String(y)) * sign
  })
}

/** Cinco linhas, sem ordenação: colunas numéricas alinhadas ao fim e uma célula com `Text` colorido. */
export const CincoLinhas: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <Table columns={COLUMNS} rows={ROWS} />
    </Stack>
  ),
}

/** Ordenável de verdade: o clique no cabeçalho alterna asc/desc e quem usa a tabela reordena as linhas. */
export const Ordenado: StoryObj = {
  render: function Render() {
    const [sort, setSort] = useState<TableSort | undefined>({ key: 'load', direction: 'desc' })
    return (
      <Stack gap="md" style={frame}>
        <Table columns={COLUMNS} rows={sortRows(sort)} sort={sort} onSortChange={setSort} />
        <Text variant="xs" color="textMuted">Ordem: {sort ? `${sort.key} ${sort.direction}` : 'original'}</Text>
      </Stack>
    )
  },
}

/** Sem linhas: sem `empty` só o cabeçalho aparece; com `empty`, o nó ocupa a largura toda. */
export const Vazio: StoryObj = {
  render: () => (
    <Stack gap="lg" style={frame}>
      <Table columns={COLUMNS} rows={[]} />
      <Table columns={COLUMNS} rows={[]} empty={<Text variant="sm" color="textMuted">Nenhum treino registrado esta semana.</Text>} />
    </Stack>
  ),
}

/** Em 375 px a tabela rola na horizontal dentro do próprio recipiente; a página não ganha barra. */
export const Largura375: StoryObj = {
  render: function Render() {
    const [sort, setSort] = useState<TableSort | undefined>({ key: 'exercise', direction: 'asc' })
    return (
      <div style={{ ...frame, inlineSize: 375, boxSizing: 'border-box', padding: 16, border: '1px dashed var(--ds-color-border-muted)', overflow: 'hidden' }}>
        <Table columns={COLUMNS} rows={sortRows(sort)} sort={sort} onSortChange={setSort} />
      </div>
    )
  },
}
