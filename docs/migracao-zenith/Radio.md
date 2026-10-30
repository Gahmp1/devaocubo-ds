# Radio (Zenith `atoms/RadioButton`)

Destino: `RadioGroup` de `@gahmp1/ds-native` e `@gahmp1/ds-web`. O `Radio` solto não é exportado: a escolha única só faz
sentido num grupo, e o Zenith nunca tinha `radiogroup`.

| Zenith | DS |
|---|---|
| `RadioButton { selected, onPress, label }` por opção | `RadioGroup { value, onChange(value), options: { value, label, disabled? }[] }` |
| `accessibilityLabel` | `accessibilityLabel` do grupo (nome do `radiogroup`); cada opção usa o próprio `label` |
| `disabled` (opacidade 0.3) | `options[i].disabled`: cores do tema (`textDisabled`), sem opacidade |
| `testID` | removido |
| `analyticsId` | `interactionId` do grupo; evento `{ component: 'RadioGroup', kind: 'toggle', id, label, value }` com o valor da opção |

Geometria do Zenith: aro 20x20 (`thin` neutro em repouso, `thick` de `accent` escolhido), ponto 12x12, gap `md` (16) entre aro e
rótulo. O `useKeyframeBounce` do Zenith saiu daqui: o ponto único **desliza** de uma opção à outra (beUI Native), com a mola do
tema; a primeira escolha e o movimento reduzido aparecem sem deslizar. No nativo o ponto mede a posição de cada linha; no web é
um `layoutId` do `motion` entre as opções.

Acessibilidade: `radiogroup` / `radio` com `accessibilityState.selected`. No web são `<input type="radio">` nativos do mesmo
`name`: Tab entra no grupo, setas movem a seleção e pulam as desabilitadas, Espaço escolhe.
