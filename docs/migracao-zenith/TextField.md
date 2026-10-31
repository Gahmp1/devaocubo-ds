# TextField (Zenith `atoms/TextField` + `hooks/useTextFieldAnimation`)

Destino: `TextField` (e o novo `TextArea`) de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API. `useTextFieldAnimation` deixa de
existir como hook público: o rótulo flutuante e o sublinhado vivem dentro do componente, com a duração e a curva do tema.

| Zenith | DS |
|---|---|
| `variant: 'contentA' \| 'contentC' \| 'brandA'` | `variant="underline"` (padrão). A diferença de cor do sublinhado vira estado: foco = `accent`, `error` = `danger`, repouso = `border` |
| `variant: 'selectorCustom'` | `variant="filled"` (fundo `surface2`, raio `md`, contorno `border`; foco e erro pintam o contorno) |
| `errorMessage` | `error` (troca a ajuda, pinta `danger`, treme uma vez; leitor de tela recebe o texto) |
| `onClear` + `trailingIcon="close"` | `clearable` (botão `IconButton` com `strings.clear`, que chama `onChangeText('')` quando há texto); sem `onClear` customizado |
| `trailingIcon?: string` (chave de `DS_ICONS`, era o botão de limpar) | `trailingIcon?: DSIconName`, ícone decorativo à direita |
| `secureTextEntry` | `secure` (botão mostrar/ocultar com `strings.showPassword/hidePassword`; `eye`/`eye-off`) |
| `label`, `placeholder`, `disabled` | iguais; com rótulo o placeholder só aparece com o rótulo já no alto |
| `helper` (não existia) | `helper` (texto de ajuda sob o campo; some quando há `error`) |
| `keyboardType`, `autoCapitalize` (padrão `none`), `returnKeyType`, `onSubmitEditing`, `autoFocus`, `textContentType`, `autoComplete` | iguais. No web viram `inputMode`, `autoCapitalize`, `enterKeyHint`, tecla Enter, `autoFocus`, e `autoComplete` do HTML (`textContentType` não tem efeito) |
| `accessibilityLabel ?? label ?? placeholder` | igual no nativo; no web o `<label htmlFor>` nomeia o campo (`accessibilityLabel` só vale sem `label`) |
| `testID` (padrão `ds-text-field`) | `testID` opcional, sem padrão |
| `ref` (só no ramo `underline`) | `ref` chega ao `TextInput`/`<input>` nas duas variantes |
| cor do foco/erro por `lerpColor` hex (`parseInt`) | interpolação do tema (Reanimated `interpolateColor` sobre `mixColor`; CSS no web): aceita `rgb()`/`hsl()` |
| 200 ms `inOut(ease)` fixos | `duration.base` e `easing.standard` do tema; movimento reduzido muda sem animar e sem tremor |
| texto de `react-i18next` (`components.textField.*`) | `strings.clear/showPassword/hidePassword` do provedor |
| `DynamicImage` | `Icon` do provedor |
| altura 48, `lgMedium` no input | altura mínima `density.control.md`, texto `base`; espaço do rótulo vem da linha do tema |
| opacidade 0,3 no desabilitado | cores do tema: texto `textDisabled`, traço `borderMuted` |

Tremor de erro: beUI Native (MIT), recriado (`[-6, 6, -4, 4, -2, 0]` pt em `duration.slow`), uma vez quando o erro aparece. Fonte
grande no nativo: acima de 1,2x o rótulo deixa de flutuar e fica acima do campo, quebrando linha; o campo passa
`maxFontSizeMultiplier={1.4}`.

## TextArea

Não existe no Zenith (o `ChatInput` usa um `TextInput` cru, `minHeight` 48, `maxHeight` 128). API do `TextField` menos `secure` e
`trailingIcon`, mais `minRows` (padrão 3) e `maxRows` (padrão 8): a altura cresce com o texto entre os dois limites e depois rola.
