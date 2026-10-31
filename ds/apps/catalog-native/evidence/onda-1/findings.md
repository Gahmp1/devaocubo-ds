# QA nativa das fatias B e C (2026-10-31)

Catálogo `catalog-native` em `feat/ds-onda-1`, Expo SDK 58, build de desenvolvimento (Skia exige build, não roda no Expo Go). Um Metro (porta 8187) serviu os dois sistemas.

| Item | iOS (iPhone 17 Pro, iOS 26.5, simulador novo) | Android (Pixel 5, API 35, AVD novo, 2 GB, 2 núcleos) |
|---|---|---|
| 29 telas × swfitness escuro/claro, somma escuro, trippo claro | PASS (`ios-*--*.jpg`) | PASS (`android-*--*.jpg`) |
| Erros/avisos no Metro e no logcat após a correção | PASS (0 erros, 0 avisos) | PASS (0 erros) |
| Movimento reduzido (spinner, shimmer, glow-border, progress-bar) | PASS (`ios-reduzido-*`) | não repetido |
| Fonte do sistema no tamanho máximo (button, chip, filter-chip, text-field, badge) | PASS (`ios-fonte-max-*`) | não repetido |
| `GlowBorder` + `Glow` por 29 s com rolagem | não medido | PASS: GlowBorder 3,1% de quadros perdidos (p99 22 ms); Glow 0,08% (p99 22 ms); PSS total 609 MB |

## Defeitos achados e corrigidos
1. **`ChipBase`: `mixColor` chamado dentro de `useAnimatedStyle`** → `Tried to synchronously call a Remote Function. Called "rgba" on the UI Runtime`. O erro deixava o runtime de UI num estado em que `Reveal` e `FilterChip` renderizavam errado (em branco, palavra quebrada). Correção: calcular a cor fora do worklet.
2. **`GlowBorder` nativo cortava o bloom** na borda do Canvas, contra a doc do componente. Correção: Canvas com margem.
3. **`Spinner` nativo** passava array de dependências a `useDerivedValue` (aviso do Reanimated). Removido.
4. **Story `Glow/TresForcas`** estourava 375 px (web). Ajustada.

## Não verificado (limitações)
- Vibração real (haptics) e som no aparelho: simulador e emulador não vibram. Fica para o João num aparelho físico.
- Android com movimento reduzido e fonte máxima; iOS sem medição de quadros.
- Emulador não é aparelho real; os números de quadros valem só como comparação.
- Sem leitor de tela (VoiceOver/TalkBack) nesta rodada.
- O `Spinner` com movimento reduzido para o giro mas pulsa a opacidade (decisão do Zenith, documentada); se o João preferir parado total, é mudança de uma linha.
- `GlowScene` fica invisível no somma escuro porque `depth.model = flat` zera o bloom: coerente com a spec, mas confirmar com o designer.
- Cor de `aiGlow`/`aiBeam` do trippo (`#B8B6AE`) deixa o brilho quase cinza no claro; valores de IA seguem provisórios.
