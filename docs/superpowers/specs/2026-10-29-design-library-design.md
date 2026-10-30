# Biblioteca de design do ecossistema devaocubo

Data: 2026-10-29. Estado: rascunho para aprovação do dono. Nada aqui foi aplicado aos repositórios dos produtos.

## Intenção

Hoje cada produto evolui o próprio design sozinho. A ideia é uma biblioteca local, que qualquer repositório e qualquer agente
possa consultar, alimentada por referências externas (toolfolio.com/design e sites passados pelo dono) e por mockups que
mostram cada ideia aplicada à identidade real dos apps. O caso que originou o pedido: o designer do SWFitness propôs
evoluir o chat com estados de espera animados (orbes, borda luminosa) em vez de várias mensagens soltas, e o Trippo é o app
que o dono mais quer melhorar em design e estrutura de telas.

## Objetivos

1. Skills pequenas, cada uma com uma responsabilidade, que geram ou melhoram: chat (estados de espera), onboarding, telas,
   sites estáticos, PDF e decks.
2. Uma skill que pesquisa na web (a única) e outra que só consulta o que está salvo, sem rede.
3. Uma biblioteca local com categorias de referências, esquema fixo e licença sempre registrada.
4. Mockups navegáveis por estilo, que servem de exemplo e de código para copiar.
5. A melhoria feita aqui vale para todos os produtos que já consomem `devaocubo-ds`.

## Fora de escopo e anti-objetivos

- Não é um pacote de componentes: o contrato do `devaocubo-ds` (tokens e `defaults.json`) não muda, e componentes continuam
  sendo copiados dos consumidores.
- Não aplica nada em app real. Mockup primeiro, aplicação em PR separado por produto.
- Reels não entram: o estudo é do AutoCut (páginas de IA viral), vive à parte e tem público e regras próprios.
- Falha seria: uma biblioteca grande e desatualizada que ninguém consulta, ou skills que inventam identidade em vez de ler a do
  produto.

## Decisões do dono (e o que ficou aberto)

| Decisão | Origem |
|---|---|
| A biblioteca fica dentro do repositório do design system (`devaocubo-ds`) | dono, 2026-10-29 |
| `html-slide-deck` migra para cá e é melhorada | dono |
| Reels: estudo separado, base no que já existe de vídeo; fica no radar | dono |
| Mockups por estilo vão para artifact, para validação visual | dono |
| Praxis como camada de conhecimento: fase 2, depois que o formato estabilizar | dono (ideia) |
| Quando migrar, quando ligar o Praxis | em aberto |

## Restrições encontradas na auditoria (2026-10-29)

- `devaocubo-ds` expõe só `tokens.css` e `defaults.json`; `AGENTS.md` proíbe implementações de componente. Por isso a biblioteca
  vive em `design-library/`, fora da lista `files` do pacote, só texto.
- 15 de 19 repositórios dependem do pacote por git (`github:Gahmp1/devaocubo-ds`), vários com gerador de tokens a partir
  de `ds.config.json`. Ficam de fora: **Trippo** (declara o provedor em `.projects/standard.json`, mas não tem a dependência nem a
  pasta `design/`), **swfitness-admin** (usa os tokens cinza padrão do shadcn) e **travels-site** (sem referência). Não foi
  verificado se cada repositório usa os tokens nas telas, só se a ligação existe.
- AutoCut só roda no Windows; nada aqui executa o AutoCut.

## Estrutura

```
design-library/
  README.md        o que é, layout, instalação das skills, regras comuns
  skills/          design-chat, design-onboarding, design-screens, design-site, design-pdf,
                   html-slide-deck (migrada), design-research, design-library
  references/      catalog-schema.md, sources.md (fontes verificadas) e, depois, uma página por categoria
  examples/        mockups em HTML puro, só texto
```

As skills são instaladas por link simbólico em `~/.claude/skills`. A biblioteca é texto: o custo de manter é baixo e uma git
install dos consumidores não carrega nada dela.

## Mockups (frentes validadas)

Todos usam a identidade real dos apps (Somma, SWFitness, Trippo, SystemDesign), trocável por produto, e respeitam
`prefers-reduced-motion`. A fonte do SWFitness (Gilroy) aparece como Outfit nos mockups.

| Frente | Mockup | Estado |
|---|---|---|
| chat, telas, onboarding, gestos, marca | Lab de Design (`examples/lab-apps`, versão só SWFitness em `examples/lab-swfitness`) | publicado como artifact privado |
| site estático | `examples/site` | conferido no navegador (console limpo, 4 produtos, 375 px); animações vistas por DOM, não em vídeo |
| deck | `examples/deck` (motor v2 de `html-slide-deck`, em `assets/base-deck-v2.html`) | idem; PDF de 10 páginas gerado pelo Chrome headless |
| PDF | `examples/pdf` | idem; impressão testada só no Chrome headless |
| pesquisa e consulta | `examples/library` (76 itens, 75 do toolfolio; licença "a verificar" em quase todos) | idem |

## O que fica para quem for construir

- Ligar os consumidores: Trippo e swfitness-admin ao `devaocubo-ds`, depois aplicar os padrões do Lab produto a produto, um PR
  por produto, começando pelo chat do SWFitness (depende do SDK de chat, hoje bloqueado por decisões do dono).
- Escrever uma página de catálogo por categoria a partir do toolfolio, abrindo e classificando cada item (licença, movimento).
- `html-slide-deck`: o motor v2 já está em `assets/base-deck-v2.html`; falta conferir cada bloco de `assets/blocks/` nele,
  atualizar `blocks.md` e `engine.md` e então apagar o `base-deck.html` antigo e a cópia em `~/.claude/skills`.
- Domínio no Praxis (fase 2): só por ferramentas MCP, nunca editando banco; o formato do catálogo é o contrato.

## Chamadas minhas (para você conferir)

- A biblioteca inclui os mockups no próprio repositório, só texto; os mockups com imagens reais (Reels do AutoCut) ficam no
  ProjectsStation (`docs/design-lab/reels-autocut`).
- Nomes das skills: `design-*`, mantendo `html-slide-deck` com o nome atual para não quebrar quem já a usa.
- Sem testes unitários, conforme a regra dos repositórios devaocubo.
