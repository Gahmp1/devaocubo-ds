# Som e haptics

Verificado em 2026-10-30 pela skill design-research (links do designer do dono: bencho.dev, libraries.dev/voice, Pulsar).
Rótulos: **[F]** fato de fonte (URL em `sources.md` e nas fichas de `componentes-de-referencia.md`), **[O]** observação de
criador, **[I]** inferência nossa. Tudo marcado como **proposta** está em aberto: nenhuma decisão foi tomada.

## O que o designer e o dono pediram
- [O] Designer, sobre o Bencho: "cuidar pra nao exagerar, colocar somente em alguns lugares". Dono: usar no pull to refresh.
- [O] Dono, sobre o Pulsar: "acho que é pago, mas dá para se inspirar". [F] A biblioteca é MIT (LICENSE lido); preço do Studio/app: a verificar.

## Princípios de parcimônia
1. **Haptic primeiro, som quase nunca.** [F] A Apple diz que haptic deve complementar o visual e o sonoro e que o melhor costuma ser o que a pessoa nem percebe, mas sente falta. [F] O Android diz "less is more" e prefere nenhum haptic a um haptic "buzzy". [I] Som de interface é o último degrau: desligado por padrão.
2. **Onde sim** (evento raro, discreto e com causa clara): cruzar o limiar do pull to refresh; confirmar ação importante (salvar, enviar, pagar); concluir algo que a pessoa esperava (treino terminado, meta batida); erro que bloqueia. [F] Android: "refreshing a page or submitting a form" merece efeito mais forte que um toggle.
3. **Onde não**: cada tecla, cada toque de botão comum, navegação entre telas, rolagem, mudança de aba, qualquer evento que dispare mais de uma vez por segundo. [F] Android: eventos frequentes devem ser "very subtle"; [F] Apple: o que é bom ocasionalmente cansa quando frequente.
4. **Um evento, no máximo um haptic e um som**, e os dois no mesmo instante da animação (cruzar o limiar, não soltar o dedo). [F] Android: fora de sincronia "can be a bit unsettling". [F] Bencho: o bloco `pull` decide o compromisso na distância.
5. **Consistência causal**: o mesmo padrão sempre para o mesmo papel; nunca reaproveitar o de "sucesso" para outra coisa. [F] HIG.
6. **Nunca é a única pista.** Tudo que o haptic ou o som comunica também aparece em tela (estado, texto, cor). [F] HIG: o app tem de funcionar sem haptics; [I] vale igual para som.

## Opt-in e preferências
- **Padrão proposto [I]:** haptics ligado só para papéis de alto valor (seleção, confirmação, erro, pull); som **desligado** até a pessoa ligar em Ajustes > Feedback. Dois interruptores separados (vibração, som) e um volume relativo do som (0 a 100%).
- **Modo silencioso (iOS) [F]:** a Apple espera que efeitos e "audible feedback" calem no silencioso. `expo-audio` vem com `playsInSilentMode: true` por padrão: para som de interface é preciso chamar `setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' })` (ou usar a categoria Ambient equivalente). Android: não achei regra oficial; [I] respeitar o modo silencioso/vibrar do sistema lendo o estado do toque.
- **Não tocar durante mídia nem microfone [F/I]:** a HIG pede que haptics não atrapalhem câmera, giroscópio ou microfone; [I] com o microfone ativo (chat de voz) nada de som de interface, e haptic só no início e no fim da gravação.
- **Sistema [F]:** no iOS o Taptic não responde com Modo de Pouca Energia, câmera ou ditado ativos (docs do Expo): a chamada é inofensiva, mas a UI não pode depender dela.
- **Reduced motion [I]:** não achei norma que ligue `prefers-reduced-motion` a haptics ou som. Proposta: quando "reduzir movimento" estiver ligado, não disparar sequências (rajadas, crescendo), só um pulso por evento, e manter o som desligado salvo escolha explícita.
- **Web [F]:** áudio só depois de gesto do usuário (Bencho: "Browsers only allow audio after a user gesture"); `navigator.vibrate` exige ativação do usuário e não existe no Safari iOS; sempre detectar suporte e cair para nada.
- Tudo atrás de um único módulo (`feedback.play(papel)`) que consulta preferência, silencioso e suporte; nenhum componente chama `Haptics` ou `AudioContext` direto. [I]

## Mapa papel → haptic → som opcional (proposta)
Haptic: nomes do `expo-haptics` 58 (iOS usa o padrão do sistema; Android usa `performAndroidHapticsAsync` quando houver equivalente [F]). Som: sons curtos sintetizados (≤ 300 ms, pico baixo; ver abaixo); "—" = nunca.

| Papel | Haptic (iOS / Android) | Som opcional | Observação |
|---|---|---|---|
| Seleção em picker, segmented, aba | `selectionAsync` / `Segment_Tick` | — | uma vez por mudança de valor |
| Toggle ligar/desligar | `selectionAsync` / `Toggle_On`, `Toggle_Off` | — | |
| Botão comum | — | — | [F] SWFitness já tem press por opacidade; haptic aqui seria excesso |
| Pull to refresh: cruzar o limiar | `impactAsync(Medium)` / `Long_Press` ou `Confirm` | clique curto agudo (≈80 ms) | dispara ao cruzar, não ao soltar; só uma vez por puxada |
| Pull to refresh: dados chegaram | — | — | o conteúdo que muda já é o aviso |
| Confirmar ação importante (salvar, enviar, pagar) | `notificationAsync(Success)` / `Confirm` | duas notas ascendentes (≈200 ms) | após o resultado real, não ao tocar |
| Concluir (treino, meta) | `notificationAsync(Success)` / `Confirm` | arpejo curto (≤ 400 ms) | uma vez por conquista [I] |
| Aviso (ação destrutiva a confirmar) | `notificationAsync(Warning)` | — | |
| Erro que bloqueia | `notificationAsync(Error)` / `Reject` | nota grave curta, só se a pessoa ligou som | |
| Segurar para abrir menu / aprovar | `impactAsync(Rigid)` / `Long_Press` | — | ao completar o segurar |
| Voz: começar/parar de gravar | `impactAsync(Light)` | tom curto de início (opcional) | nada durante a gravação |
| Envio de mensagem, digitação, navegação, rolagem | — | — | [F] Android: legado `createOneShot` e "buzzy" são desencorajados |

## Som: como soar [F no Bencho, resto I]
- [F] O repositório MIT do Bencho sintetiza 24 sons com Web Audio, sem arquivo: nota = oscilador (sine/triangle/square) ou ruído filtrado, passa-baixa, envelope exponencial com ataque ≥ 1 ms ("nothing starts at full gain: that is a click"), pico por nota entre ≈0,003 e 0,07, notas de 20 a 600 ms. `play(nome, {volume, pitch})`; um `AudioContext` único e `resume()` no gesto.
- [I] Para nós: mesma abordagem no web (sem arquivo, sem licença de áudio). No nativo não há Web Audio: gerar 4 a 6 arquivos `.wav` curtos (≤ 40 KB cada) próprios, tocar com `expo-audio` (`player.seekTo(0); player.play()`), volume do player ≤ 0,5 por padrão, `playsInSilentMode: false`. Não usar os sons do Bencho Pro nem copiar as receitas de `sounds.ts` sem manter o aviso de copyright (MIT exige).
- [I] Família sonora por produto, não por tela: o timbre acompanha a personalidade do tema (`snappy` do SWFitness: clique seco e agudo; `calm` de Somma, Trippo e devaocubo: sino suave e grave). Mesma regra dos tokens de movimento.
- [I] Limites: no máximo um som por 150 ms; cortar o som anterior ao iniciar outro; nunca loop.

## Equivalentes livres no nosso stack
| Necessidade | Opção | Versão (npm, 2026-10-30) | Licença |
|---|---|---|---|
| Haptics nativo | `expo-haptics` | 58.0.7 | MIT |
| Som nativo | `expo-audio` | 58.0.10 | MIT |
| Haptics web | `navigator.vibrate` (Android/Chromium; não existe no Safari iOS) | — | padrão web |
| Som web | Web Audio API (`AudioContext`, osciladores) | — | padrão web |
| Haptics customizado e realtime (opcional, depois) | `react-native-pulsar` / `pulsar-haptics` | 1.7.0 / 0.2.0 | MIT |
| Animação do gesto | Reanimated + Gesture Handler (já no DS) | 4.7.1 | MIT |
Pulsar exige Nova Arquitetura e `react-native-worklets` e, no Expo, prebuild [F]; `expo-haptics` não precisa de nada disso. [I] Começar com `expo-haptics` + `expo-audio` e só avaliar Pulsar se o designer quiser padrões próprios (ex.: "heartbeat" na conclusão do treino) ou haptic que acompanhe a voz em tempo real (`useRealtimeComposer`).

## Proposta: eixo `feedback` no tema (sem decidir)
Hoje `DSTheme` tem `motion` (duração, easing, mola, `personality`, press) e `ai` (orbe, feixe, etapas). [I] Feedback sensorial seria mais um eixo por produto, lido pelo mesmo módulo `feedback.play(papel)`:

```ts
feedback: {
  haptics: { default: 'on' | 'off'; intensity: 'soft' | 'standard' | 'crisp'; roles: Partial<Record<FeedbackRole, HapticPattern>> }
  sound: { default: 'off' | 'on'; timbre: 'soft' | 'crisp'; volume: number; roles: Partial<Record<FeedbackRole, SoundName>> }
}
// FeedbackRole: 'select' | 'toggle' | 'pull-commit' | 'confirm' | 'complete' | 'warn' | 'error' | 'hold' | 'voice-start' | 'voice-stop'
```
Perguntas em aberto para o João e o designer: (1) som existe só no pull to refresh ou também em confirmar/concluir? (2) o padrão do SWFitness (`snappy`) pede `crisp` e os outros `soft`? (3) o eixo vive em `@gahmp1/ds-theme` ou só em `ds/packages/native` e `web`? (4) quem desenha os sons (arquivos próprios, ou sintetizados como no Bencho)? (5) o web faz vibrar ou só som, já que o iOS Safari ignora a vibração?
