# Celebration (Zenith `molecules/SuccessBackground`, camada de movimento)

Destino: `Celebration` de `@gahmp1/ds-native/motion` (Skia) e `@gahmp1/ds-web/motion` (canvas 2D).

| Zenith | DS |
|---|---|
| `SuccessBackground` = `GlowScene` com `topDualGreenTealGlow`, estático (sem confete, partículas ou animação) | `GlowScene preset="success"` (ver `GlowScene.md`) entra com fade, mais confete leve |
| `testID?` | fora |
| sem estado | `active: boolean` e `onDone?`: cada subida de `active` (inclusive montar já ativo) é uma execução: toca `complete` (`useFeedback`), roda o confete uma vez e chama `onDone` ao fim |

Confete novo (o Zenith não tinha): 28 partículas determinísticas (`confettiParticles`, mulberry32) lançadas do topo, com gravidade
(`confettiPose`, a mesma conta nas duas plataformas; no nativo roda na thread de UI como worklet) nas cores `accent`, `aiGlow`,
`success` e `warning`. A execução dura 6 × `duration.slow`. Movimento reduzido: só o fundo, sem confete; `onDone` sai após `duration.base`.

`depth.model: flat` apaga as manchas do fundo (regra do `GlowScene`); o confete segue.
