# Table (sem origem no Zenith; agent-chat `widgets/table.tsx`)

Destino: `Table` de `@gahmp1/ds-web`, só web (o nativo usa `DataList`, mesma ideia em lista). O Zenith não tem tabela. Origem: o widget `table` do agent-chat (`packages/agent-chat-react/src/widgets/table.tsx`, MIT): `<table>` semântica com `<th scope="col">` e alinhamento por coluna; a ordenação segue o padrão WAI-ARIA APG "Sortable Table" (`aria-sort` + botão no cabeçalho), sem copiar código de terceiros.

| agent-chat | DS |
|---|---|
| `title` (`<caption>`) | removido: o título é de quem compõe (`Text` acima da tabela) |
| `columns[].label` | `columns[].title` |
| `columns[].align` | igual (`start` / `end`), aplicado ao cabeçalho e às células |
| `rows[].cells[key]` (string ou valor formatado) | `rows[]` é `Record<string, ReactNode>`: a célula é qualquer nó, já formatado por quem usa |
| texto de vazio via `strings.widgets.empty` | `empty?: ReactNode` (sem texto padrão: o `DSStrings` não tem chave para isso) |
| (novo) `columns[].sortable` | cabeçalho vira botão, só quando a tabela recebe `onSortChange` |
| (novo) `sort?: { key; direction: 'asc' \| 'desc' }`, `onSortChange?` | ordenação controlada; tipo exportado como `TableSort` |

`TableColumn`, `TableSort` e `TableProps` são exportados.

## Ordenação

A tabela **não reordena** as linhas: marca a coluna e a direção em `sort`, e ao clique chama `onSortChange({ key, direction })` (primeiro clique `asc`, clique na coluna ativa alterna). Quem usa ordena `rows` (no cliente ou no servidor). A célula é um nó qualquer, então a tabela não tem como comparar valores.

Cabeçalho: `aria-sort="ascending" | "descending"` na coluna ativa, `"none"` nas demais ordenáveis. A seta (`arrow-down` do provedor, girada na ordem crescente) fica esmaecida nas colunas ordenáveis e plena na ativa. Cada botão tem alvo mínimo de 44 px e foco visível (`--ds-color-focus`).

## Layout

Recipiente com borda `border-muted`, raio `radius.lg` e fundo `surface1`; cabeçalho em `surface2` com `Text smMedium textMuted label` (caixa do tema). A tabela tem `min-inline-size: max-content` dentro de um recipiente `overflow-x: auto`: em 375 px as colunas não se espremem, o recipiente rola na horizontal e a página não ganha barra. O recipiente é focável (`tabindex="0"`) para rolar por teclado.

Telemetria: `{ component: 'Table', kind: 'change', id: <key da coluna>, label: <título>, value: 'asc' | 'desc' }`.
