# Esquema do catálogo

Cada referência é um bloco curto, em arquivo por categoria (`references/<categoria>.md`), neste formato:

```markdown
## Nome
- url: https://...
- categoria: orbes e loaders de IA
- movimento: nenhum | leve | forte
- licença: MIT | proprietária | a verificar
- estado: cópia local | só link | a pesquisar
- o que pegar: uma frase
- exemplo local: examples/lab-apps (ou "nenhum")
- verificado em: AAAA-MM-DD, por quem
```

Regras: `licença` e `estado` nunca ficam vazios; sem fonte, escreva "a verificar". Itens vindos de catálogo de terceiros
(toolfolio.com/design) entram como "só link" até alguém abrir e classificar.

## Campos extras da categoria tipografia
Entradas de `references/tipografia.md` seguem o bloco acima e acrescentam, depois de `estado`: `pesos` (os que existem
na fonte oficial), `papel` (display | body | mono), `combina com` (inferência nossa, sempre rotulada) e `usada em`
(produto e arquivo onde a família está realmente declarada, ou "nenhum produto"). `licença` cita a URL do arquivo de
licença do repositório oficial. Arquivo de fonte nunca é copiado para a biblioteca: `estado` é "só link".

## Categorias iniciais
orbes e loaders de IA · chat e interfaces de IA · tipografia · tipografia e movimento · landing pages · decks e apresentações ·
motion e vídeo · dataviz · design systems.
