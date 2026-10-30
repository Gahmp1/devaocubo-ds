# Blocos de conteúdo — referência detalhada

Cada bloco é um arquivo standalone em `../assets/blocks/`, pronto pra copiar dentro de
`__SLIDES__` no template. Todo `__texto_assim__` é placeholder — substitua por conteúdo real
antes de entregar (ver regra em SKILL.md).

## hero.html

Sempre o slide 1. `.hero-glow` é um brilho radial decorativo por trás do texto — só funciona
dentro de `.slide--hero` (a classe extra no `<section>`, não esqueça). `.hero-arrow` (⇄) é
opcional — só faz sentido quando o título é literalmente "sistema A ⇄ sistema B"; pra um
título único, remova o span e o segundo `__TÍTULO_2__`. `.hero-meta` é o rodapé com
commit/versão/data — repita o mesmo texto no slide de encerramento pra fechar o círculo.

## principle-cards.html

`grid-4` por padrão; troque pra `grid-3` (e remova um `.card`) se tiver só 3 conceitos —
nunca deixe uma célula vazia. Em telas até 900px de largura o CSS já quebra pra 2 colunas
automaticamente, não precisa de media query própria.

## stat-cards.html

`.stat-num` é `<span>`, não `<div>` — é texto livre, pode ser "8 → 2", "1642", "+430 / −4455",
qualquer string curta que caiba em uma linha. Fonte é `--font-mono` com `tabular-nums`, então
números alinham bem mesmo com larguras de dígito diferentes. Não force um número "redondo" só
pra ficar bonito — número real, mesmo estranho ("46,850" em vez de "~47k"), sempre convence
mais.

## decision-cards.html

Pensado pra roadmap ("o que falta pra X funcionar igual a Y"). As três tags prontas:

- `tag--missing` (vermelho) — não existe ainda, é bloqueador
- `tag--verify` (amarelo) — pode já funcionar, mas não foi confirmado, não assuma
- `tag--done` (verde) — já existe, só reaproveitar

Sem nenhuma dessas classes a tag fica neutra (cor `--accent`) — use quando o item não é bem
"falta/verificar/feito", é só uma categoria (ex: "Decisão técnica"). `grid-3` é o padrão; se
tiver menos de 3 itens, ainda funciona (grid não exige preencher todas as colunas), mas com
6+ itens prefira quebrar em duas seções em vez de espremer tudo num slide só.

## code-block-arrows.html

Pensado pra "quem chama quem" — direção de subprocess/HTTP, pipeline de build, arquitetura de
dois sistemas. `.row` sempre tem três partes visuais: origem (`.dir`, cor de destaque), a
seta (`.via`, cor apagada — customize o texto da seta: `──▶`, `──subprocess──▶`,
`──HTTP──▶`, o que for mais específico), e destino + comentário à direita (`.cmt`, sempre
alinhado à direita da linha via `justify-content:space-between`). `.blank` é só uma linha de
respiro — use entre grupos logicamente diferentes (ex: "chamadas de A pra B" vs "chamadas de B
pra A"). Para um comando isolado sem seta (ex: mostrar a superfície de uma CLI), use
`.cmd-line` + `.cmt-under` em vez de `.row`.

## terminal.html

O bloco com mais comportamento. Pontos que quebram se você não prestar atenção:

- **`data-cmd` é o que o JS digita**, não o texto dentro do `<span class="term-cmd">` — deixe
  esse span vazio no HTML, o JS preenche.
- **Cada `.term-line[data-line]` aparece em sequência**, ~240ms de intervalo, depois que o
  comando termina de "digitar". A ordem no HTML é a ordem de revelação.
- **`[data-next]` é a linha de prompt vazia que aparece no final** — sinaliza "comando
  terminou, aqui teria o próximo prompt". Sempre inclua, mesmo que pareça redundante.
- **O terminal só toca automaticamente na primeira vez que o slide entra em foco**
  (`term.dataset.played` marca isso) — navegar pra frente e voltar não replay automaticamente,
  é pra isso que existe o botão `↻ replay`.
- **Para uma demo de falha** (mostrar o que dá errado sem um fix), use `.warn`/`.err` nas
  linhas de output — isso é uma cena legítima e costuma ser mais convincente que só mostrar o
  caminho feliz. Veja o padrão "epic incompleto — recusado sem criar nada" no deck de
  referência original, ou a cena 4 do `deploycli-showcase.html`.

## site-mock.html

Duas variantes, escolha uma:

1. **Mock 100% HTML/CSS** (o que o arquivo já tem) — `.pw-mock-*` monta uma tela fake com
   nav, títulos, linhas de texto e cards, tudo com `<div>`s cinzas. Leve, sem dependência,
   serve quando o que importa é a *forma* da tela.
2. **Screenshot real** — troque `.pw-mock-body` por
   `<img src="data:image/jpeg;base64,...">` direto dentro de `.product-window`, depois do
   `.pw-titlebar`. Fica pesado (uma screenshot cheia facilmente passa de 100-200KB em base64
   só naquela linha do arquivo) — só compensa quando o pixel real importa.

`.pw-url` é a barra de URL fake — pode ser uma URL real ou uma descrição
("app — banco produção / tela X"), o que comunicar melhor.

## app-mock.html

Frame de celular 100% HTML/CSS (sem imagem) — não existia nenhum exemplo disso antes desta
skill, foi desenhado do zero seguindo a mesma paleta (`--bg-void`, `--bg-card-alt`,
`--border`, `--font-mono`/`--font-display`) pra combinar com o resto do deck. `.phone-notch`
é decorativo (estilo iPhone) — remova a div se quiser um frame mais neutro/genérico.
`.phone-row` é a unidade repetível (linha de lista, tipo configurações ou detalhe de item);
`.phone-btn` é sempre a call-to-action da tela; `.phone-tabbar` marca a aba ativa com a classe
`active` num único `<span>`. Se a tela não tem tab bar (ex: uma tela de onboarding em tela
cheia), remova a div inteira — nada mais depende dela.

## compare.html

Duas colunas, `before` e `after` — cada uma é só um `<ul>`. `.after h4` já vem com cor de
destaque (`--accent`) pra puxar o olho pra "o que ficou melhor". Mantenha o mesmo número de
itens nas duas colunas quando fizer sentido par-a-par (item 1 do antes corresponde ao item 1
do depois) — facilita a leitura em paralelo, mas não é obrigatório se a comparação não for
1-pra-1.
