# Tag (Zenith `atoms/Tag`)

Destino: `Tag` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| Zenith | DS |
|---|---|
| `label` | igual |
| `color` `neutral/primary/success/warning/critical` | `tone` `neutral/accent/success/warning/danger/info`: `primary` virou `accent`, `critical` virou `danger`, `info` é novo |
| `size` `small/medium` | removido: um tamanho (o `small` do Zenith: padding `xs`x`xxs`, texto `xs`); o `medium` não tinha uso fora dos wrappers de domínio |
| `testID` | removido |
| (novo) `icon?: DSIconName` | ícone decorativo `icon.size.sm` antes do rótulo, na cor do tom |

Cores: `neutral` = `surface2` com `text`; `accent` é cheio (`accent` com `onAccent`, o `primary` do Zenith); `success`, `warning`,
`danger` e `info` são o tinte do próprio papel a 15% (`withAlpha(<tom>, 0.15)` no nativo, `color-mix(... 15%, transparent)` no web).
O rótulo desses quatro fica em `text` e só o ícone leva o tom (40% do tom, 60% de `text`): o papel do tom sobre o tinte ficava abaixo
de 4.5:1 em vários temas (ex.: `info` #007AFF no SWFitness escuro, 4.17; `warning` no SWFitness claro, 1.50). Os `rgba` literais do
Zenith saíram. `DifficultyBadge`, `MechanicsBadge`, `LateralityBadge`, `MuscleTag` e `EquipmentChip` seguem no app como wrappers de `Tag`.

Acessibilidade: não interativa, o texto é o nome. Não tem `role`.
