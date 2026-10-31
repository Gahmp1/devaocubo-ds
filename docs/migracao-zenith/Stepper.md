# Stepper (Zenith `molecules/Stepper`)

Destino: `Stepper` de `@gahmp1/ds-native` e `@gahmp1/ds-web`, mesma API.

| Zenith | DS |
|---|---|
| `value`, `onChange` | iguais; `onChange` só dispara quando o valor muda de fato (nunca fora de `min`/`max`) |
| `min`, `max` (obrigatórios) | opcionais; sem eles, sem limite |
| (passo fixo de 1) | `step?` (padrão 1); o resultado é arredondado nas casas do passo (`0,1 + 0,2` dá `0,3`) |
| `unitLabel?` sob o número | `format?: (value) => string` (o texto do valor, com unidade se quiser); o rótulo sob o número saiu |
| `testID` | removido |
| botões `−`/`+` como texto, rótulos fixos `"decrement"`/`"increment"` | `IconButton` `outline` com ícones `minus`/`plus` e rótulos `strings.decrement`/`strings.increment`; desabilitados nos limites |
| `accessibilityRole="adjustable"` com `accessibilityValue` | web: `role="spinbutton"` no valor (`aria-valuenow/min/max`, `aria-valuetext` = texto formatado); nativo: `adjustable` com `accessibilityActions` `increment`/`decrement` |

Valor em `display`, com largura mínima de 80 px para não pular ao mudar; botões `large` (`control.lg`; o Zenith usava 48) e intervalo `xl` entre as peças (o mesmo do Zenith).

## Acessibilidade (web)

O valor é focável (`tabIndex 0`) e responde a setas (±`step`), PageUp/PageDown (±10 passos), Home e End (`min`/`max`, só se finitos), como no padrão Spinbutton do WAI-ARIA. Está dentro de uma região `aria-live="polite"`: quem usa só os botões ouve o valor novo. Os botões continuam na sequência do Tab (o `IconButton` não tem como sair dela), então o teclado passa por até três paradas.

## Desvio

`accessibilityLabel?: string` (nome do que está sendo ajustado, ex.: "Dias por semana") não está na tabela da task; um `spinbutton`/`adjustable` sem nome é falha de acessibilidade, então o web o aceita. O nativo precisa do mesmo para o `adjustable`.
