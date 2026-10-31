// Referência: agent-chat widgets/table.tsx (MIT, ~/Projects/agent-chat); ordenação por cabeçalho: padrão WAI-ARIA APG "Sortable Table" (aria-sort + botão no cabeçalho).
import { useDS } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Text } from '../../primitives/Text/index.js'

export type TableColumn = {
  key: string
  title: string
  /** Padrão `start`. */
  align?: 'start' | 'end'
  /** Vira botão no cabeçalho quando a tabela recebe `onSortChange`. */
  sortable?: boolean
}

export type TableSort = { key: string; direction: 'asc' | 'desc' }

export type TableProps = {
  columns: TableColumn[]
  /** Cada linha é um mapa `key da coluna -> conteúdo`; chave ausente = célula vazia. */
  rows: Record<string, ReactNode>[]
  /** Coluna e direção marcadas no cabeçalho. A tabela só mostra e avisa: quem usa reordena `rows`. */
  sort?: TableSort
  onSortChange?: (sort: TableSort) => void
  /** Conteúdo do estado sem linhas (ocupa a largura toda). */
  empty?: ReactNode
}

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const

export function Table({ columns, rows, sort, onSortChange, empty }: TableProps) {
  const theme = useTheme()
  const { Icon, emit } = useDS()
  const icon = { size: theme.icon.size.sm, color: 'currentColor', strokeWidth: theme.icon.strokeWidth }

  const toggle = (c: TableColumn) => {
    const direction = sort?.key === c.key && sort.direction === 'asc' ? 'desc' : 'asc'
    emit({ component: 'Table', kind: 'change', id: c.key, label: c.title, value: direction })
    onSortChange?.({ key: c.key, direction })
  }

  return (
    // Rolagem própria: a tabela mantém a largura natural e o recipiente rola na horizontal, sem estourar a página. Focável para rolar por teclado.
    <div className="ds-table-scroll" tabIndex={0}>
      <table className="ds-table">
        <thead>
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key ? sort : undefined
              const sortable = c.sortable && onSortChange
              const title = <Text variant="smMedium" color="textMuted" label>{c.title}</Text>
              return (
                <th key={c.key} scope="col" aria-sort={sortable ? (active ? ARIA_SORT[active.direction] : 'none') : undefined} className={cx('ds-table__cell', `ds-table__cell--${c.align ?? 'start'}`)}>
                  {sortable ? (
                    <button type="button" className={cx('ds-table__sort', 'ds-anim', active && 'ds-table__sort--active')} onClick={() => toggle(c)}>
                      {title}
                      <span className={cx('ds-table__arrow', 'ds-anim', active?.direction === 'asc' && 'ds-table__arrow--asc')} aria-hidden>
                        <Icon name="arrow-down" {...icon} />
                      </span>
                    </button>
                  ) : title}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && empty !== undefined && (
            <tr>
              <td colSpan={columns.length} className="ds-table__empty">{empty}</td>
            </tr>
          )}
          {rows.map((row, i) => (
            // Sem identidade própria nas linhas: o índice é a chave (a ordenação remonta as células, que não guardam estado).
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key} className={cx('ds-table__cell', `ds-table__cell--${c.align ?? 'start'}`)}>{row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
