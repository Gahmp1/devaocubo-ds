# Shimmer (Zenith `molecules/Shimmer`, camada de movimento)

Destino: `Shimmer` de `@gahmp1/ds-native/motion` e `@gahmp1/ds-web/motion`.

O Zenith não tinha um Shimmer separado: o pulso de opacidade morava dentro do componente de esqueleto (ver `Skeleton.md`).
Aqui a varredura é um componente próprio, `active?`, `radius?` e `children`, que o `Skeleton` e o app usam. Referência de
padrão: text-shimmer da beUI (MIT), recriado.

Nativo: faixa de gradiente (`react-native-svg`) movida por `translateX` no Reanimated. Web: `@keyframes` em CSS. A faixa usa
`text` com alfa, então serve sobre bloco e sobre texto. Reduzido ou `active={false}`: sem faixa.
