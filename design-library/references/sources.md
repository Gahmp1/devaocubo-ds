# Fontes verificadas

Só entra aqui o que a pesquisa leu na fonte (as páginas da Meta foram lidas por resumo de ferramenta, não em texto bruto; reconfirme antes de decisão cara). Data: 2026-10-29.

| Fonte | O que vale | Licença / observação |
|---|---|---|
| libraries.dev (beam, orbs) | Borda luminosa ("border beam") e orbes de pontos para estados de espera de IA | Código MIT; só os modelos de ML (Magnet, VoiceDirection) têm licença própria. Há ports para React Native (Skia mais Reanimated) no GitHub |
| thinkingorbs.com | Referência passada pelo dono para orbes de estado de espera de IA | Conteúdo e licença a confirmar na página antes de copiar código |
| beautifului.dev | Referência passada pelo dono (interfaces de IA) | Conteúdo e licença a confirmar na página |
| toolfolio.com/design | Catálogo de ferramentas de design (165 itens no dia da leitura) | Catálogo de terceiros: itens entram como "só link" |
| bencho.dev (2026-10-30) | Blocos de interação e 24 sons de interface sintetizados em Web Audio | Repositório público MIT (© 2026 Lorenzo Cabra, `LICENSE` lido; exclui marca e fotos); Pro pago: preço a verificar. Ver `componentes-de-referencia.md` |
| libraries.dev/voice (voice-glow) | Brilho que sobe com a voz (nível 0–1, envelope attack/release) | MIT (`LICENSE` do pacote lido, npm 0.3.0); React Native "em breve"; estado "processing" é Pro |
| docs.swmansion.com/pulsar | Presets e compositores de haptics (iOS, Android, RN, Web) | MIT (`LICENSE` lido, GitHub e npm `react-native-pulsar` 1.7.0, `pulsar-haptics` 0.2.0); preço do Studio e do app: a verificar |

## Regras de plataforma confirmadas em fonte oficial (Meta)

- **Zona segura de Reels em anúncios:** texto e logo fora de ≈14% do topo, 35% da base e 6% de cada lado.
  Para 1080×1920: topo ≈269 px, base ≈672 px, lados ≈65 px (conta nossa). Não há números oficiais para Reels orgânicos
  que a pesquisa tenha achado: a regra de anúncios é a mais conservadora.
  https://www.facebook.com/business/ads-guide/update/video/instagram-reels
- **Som:** a Meta diz que mais de 75% das views de Reels têm som e recomenda voz, música ou efeitos.
  https://developers.facebook.com/blog/post/2024/11/07/unlock-the-power-of-reel-ads/
- **Originalidade:** repost e marca d'água reduzem recomendação; juntar clipes não é edição significativa (página do Facebook,
  14/07/2025; para o Instagram é pista, não regra).
  https://creators.facebook.com/blog/combating-unoriginal-content
- **Ranking:** o Instagram diz querer mostrar menos Reels mudos, de baixa resolução, com marca d'água ou "majoritariamente texto".
  https://about.instagram.com/blog/announcements/instagram-ranking-explained

Não encontrado (não afirmar): análise confiável do visual de contas de notícias de IA; limiar oficial de retenção.

## Regras de plataforma sobre som e haptics (2026-10-30)

- **Apple HIG, Playing haptics** (https://developer.apple.com/design/human-interface-guidelines/playing-haptics; lido pelo JSON público do site): usar padrões do sistema segundo o significado documentado; consistência (relação causal clara entre haptic e ação); complementar o feedback visual e sonoro e casar intensidade/nitidez com a animação; evitar excesso ("o melhor haptic costuma ser o que a pessoa não percebe, mas sente falta quando desliga"); preferir haptics curtos para eventos discretos; **tornar opcional** ("Let people turn off or mute haptics") e o app ter de funcionar sem; não atrapalhar câmera, giroscópio ou microfone. Tipos: notificação (success, warning, error), impacto (light, medium, heavy, rigid, soft) e seleção.
- **Apple HIG, Playing audio** (https://developer.apple.com/design/human-interface-guidelines/playing-audio): no modo silencioso as pessoas querem silenciar também os sons não essenciais, "such as keyboard clicks, sound effects ... and other audible feedback"; só toca o que a pessoa iniciou (mídia, alarmes, mensagens de áudio). O volume do sistema vale para tudo, inclusive efeitos do app: ajustar níveis relativos, nunca o volume geral. Categorias: Ambient e Solo ambient respeitam o interruptor; Playback não respeita.
- **Android, princípios de haptics** (https://developer.android.com/develop/ui/views/haptics/haptics-principles): "less is more"; eventos frequentes (rolagem) muito sutis; eventos importantes ("refreshing a page or submitting a form") mais fortes que alternar um toggle; preferir `HapticFeedbackConstants` e `VibrationEffect` predefinidos; "Given the choice of buzzy haptics or no haptics ..., choose no haptics"; clique de tecla de 10 a 20 ms; efeitos ricos têm suporte menor, então ter fallback; co-projetar visual, som e haptic (fora de sincronia "can be a bit unsettling"). A página não cobre configurações do usuário. Não achei página equivalente em m3.material.io (a URL tentada deu 404).
- **MDN, Navigator.vibrate()** (https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate): disponibilidade limitada (não é Baseline); exige ativação do usuário; número = ms, array alterna vibra/pausa; alguns aparelhos não vibram em Silencioso/Não perturbe. A tabela de compatibilidade não veio no resumo; o fato de Safari iOS não implementar vem da doc do Pulsar (https://docs.swmansion.com/pulsar/sdk/web/).
- **Expo SDK 58** (https://docs.expo.dev/versions/latest/sdk/haptics/ e /audio/): `expo-haptics` 58.0.7 tem `impactAsync`, `notificationAsync`, `selectionAsync` e `performAndroidHapticsAsync` (Confirm, Reject, Segment_Tick, Toggle_On/Off, Long_Press, Clock_Tick, Keyboard_Press...); no iOS não faz nada com Modo de Pouca Energia, Taptic desligado, câmera ou ditado ativos. `expo-audio` 58.0.10: **`playsInSilentMode` vem `true` por padrão**; `interruptionMode` padrão `mixWithOthers`; gravação com `isMeteringEnabled` expõe `metering` em `RecorderState`, mas sem unidade documentada e com intervalo padrão de 500 ms. Versões conferidas no registro npm em 2026-10-30 (expo-haptics 58.0.7, expo-audio 58.0.10, react-native-pulsar 1.7.0, pulsar-haptics 0.2.0, voice-glow 0.3.0, reanimated 4.7.1, skia 2.14.0; todos MIT).
- Não achei: regra oficial do Android sobre som de interface e silencioso; norma que ligue `prefers-reduced-motion` a haptics ou som (tratado como inferência em `som-e-haptics.md`).
