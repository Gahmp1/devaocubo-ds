---
name: design-feedback
description: RASCUNHO, proposta ainda não aprovada pelo dono. Define e implementa feedback sensorial com parcimônia (haptics por papel e som de interface opcional) nos apps e sites do devaocubo-ds: onde tocar, qual padrão, opt-in, modo silencioso e suporte por plataforma. Use quando pedirem som, vibração, "haptic", feedback ao puxar para atualizar, ao confirmar ou concluir algo. Não cobre a animação do gesto (design-screens) nem a voz com gradiente (design-chat).
---

# design-feedback

> Rascunho de 2026-10-30. Base: `references/som-e-haptics.md`. O eixo `feedback` do tema ainda é proposta.

## Quando usar
O designer ou o dono pede que uma ação "se sinta" (vibração, clique, som curto) ou há dúvida de onde NÃO colocar.
A resposta padrão é "menos": haptic em poucos papéis, som desligado até a pessoa ligar.

## Passo a passo
1. **Liste os eventos candidatos** da tela e classifique cada um por papel: seleção, toggle, pull-commit, confirmar,
   concluir, aviso, erro, segurar, voz. O que não cabe em papel (tecla, navegação, rolagem, botão comum) fica mudo.
2. **Escolha o padrão pelo mapa** de `references/som-e-haptics.md` (iOS: seleção, impacto, notificação; Android:
   `performAndroidHapticsAsync`). Nunca use o padrão de sucesso para outra coisa.
3. **Dispare no instante da animação**, não ao soltar: no pull to refresh é ao cruzar o limiar, uma vez por puxada.
4. **Centralize**: um módulo `feedback.play(papel)` que consulta preferência (vibração, som), modo silencioso e
   suporte. Componente nenhum chama `Haptics` ou `AudioContext` direto.
5. **Som** (se aprovado): web sintetizado em Web Audio, pico baixo, ≤ 300 ms, `resume()` no gesto; nativo com
   poucos `.wav` próprios via `expo-audio` com `playsInSilentMode: false`. Timbre segue a `personality` do tema.
6. **Opt-in e fallback**: interruptores separados em Ajustes, som desligado por padrão, tudo funcional sem eles.
7. Mockup primeiro (`examples/feedback-sensorial`), depois o app. Teste em aparelho real: simulador não vibra.

## Armadilhas
- `expo-audio` toca no silencioso por padrão: sem `playsInSilentMode: false` o som fura o interruptor.
- Safari no iOS não tem `navigator.vibrate`; detecte e não faça nada.
- Haptic e som no mesmo evento precisam sair juntos com a animação, senão "incomoda" (guia do Android).
- Microfone ativo: sem som de interface, e haptic só no início e no fim.
- Sons do Bencho Pro e blocos pagos não entram; o repositório MIT do Bencho exige manter o aviso de copyright.

## Referências
`references/som-e-haptics.md`, `references/componentes-de-referencia.md` (Bencho, Pulsar), `references/sources.md`
(HIG, Android, MDN, Expo), `examples/feedback-sensorial`.
