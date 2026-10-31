# design-library

Biblioteca local de design do ecossistema devaocubo: skills pequenas, referências curadas e mockups que servem de
exemplo. Vive neste repositório para que uma melhoria aqui valha para todos os produtos que já consomem `devaocubo-ds`.

**Fora do pacote.** `package.json` lista `files` de forma explícita (`tokens.css`, `defaults.json`, `README.md`), então nada
desta pasta chega aos consumidores. É material de referência para agentes e pessoas, não código importado por app.

## Layout

| Pasta | Conteúdo |
|---|---|
| `skills/` | Uma skill por frente, cada uma pequena e com uma responsabilidade. Instale por link simbólico (abaixo). |
| `references/` | Esquema do catálogo, categorias e fontes já verificadas. Só texto. Inclui `tipografia.md` (famílias de fonte por tema, licença e uso nos produtos). |
| `examples/` | Mockups em HTML puro (estados de espera do chat, telas, onboarding, site, deck, PDF, biblioteca). Servem de referência visual e de código para copiar. Só texto, sem imagem. |

## Skills

| Skill | Responde a | Mockup de referência |
|---|---|---|
| `design-chat` | Estados de espera da IA (pensando, buscando, resolvendo), orbes, borda luminosa, etapas | `examples/lab-apps`, `examples/lab-swfitness` |
| `design-feedback` (rascunho) | Haptics por papel e som de interface opcional, com parcimônia | `examples/feedback-sensorial` |
| `design-onboarding` | Fluxos de entrada com passos, escolhas e plano final | `examples/lab-apps` |
| `design-screens` | Estrutura de telas, barra de abas, esqueletos, microinterações | `examples/lab-apps` |
| `design-site` | Sites estáticos e landing pages por produto | `examples/site` |
| `design-pdf` | Documentos paginados para imprimir ou salvar em PDF | `examples/pdf` |
| `html-slide-deck` | Decks em um arquivo HTML (migrada de `~/.claude/skills`) | `examples/deck` |
| `design-research` | Única que sai para a web: busca, tria e extrai padrões | `examples/library` |
| `design-library` | Consulta a biblioteca local, sem rede | `examples/library` |

Reels não entram aqui: o estudo é do AutoCut e vive em `docs/design-lab/reels-autocut` do ProjectsStation.

## Instalar as skills no Claude Code

```bash
for s in skills/*/; do ln -sfn "$PWD/$s" ~/.claude/skills/"$(basename "$s")"; done
```

`html-slide-deck` já existe em `~/.claude/skills`: remova a cópia antiga antes, para o link apontar para esta pasta.

## Regras comuns a todas as skills

1. **A identidade vem do produto, nunca inventada.** Leia `design/ds.config.json`, `DESIGN.md` ou o `tokens.css` do repo
   do produto. Fonte, cor, raio e tom são os do app.
2. **Movimento é função do tempo.** Linhas do tempo determinísticas (estado = f(t)), para poder arrastar o tempo e para
   renderizar quadro a quadro depois. `prefers-reduced-motion` sempre respeitado.
3. **Espera de IA:** menos de 2 s, nada; a partir de 2 s, orbe com rótulo; acima de 3 s, orbe com rótulo e borda luminosa.
4. **Nada de número ou métrica inventada.** Texto de exemplo é marcado como exemplo.
5. **Licença antes de copiar.** Código do libraries.dev (beam, orbs) é MIT, exceto os modelos de ML (Magnet, VoiceDirection).
   Em dúvida, registre "a verificar" no catálogo.
6. **Verifique no navegador** antes de entregar: sem erro de console, 375 px sem rolagem horizontal, estados principais.
7. **Sem testes unitários** nos repos devaocubo.
