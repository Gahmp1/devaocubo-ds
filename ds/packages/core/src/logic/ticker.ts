// Ideia (rolagem por dígito, algarismos tabulares): NumberFlow, recriada, sem código copiado (licença e fonte a verificar).

/** Sentido em que o dígito novo entra: `up` sobe (entra por baixo), `down` desce (entra por cima), `auto` segue a variação do valor. */
export type Trend = 'up' | 'down' | 'auto'

/** Um item por caractere do número já formatado; cada um vira uma casa que rola sozinha. */
export function digitsOf(value: number, format: (n: number) => string = String): string[] {
  return [...format(value)]
}

/** Sentido (1 sobe, -1 desce) da troca de `from` para `to`. No `auto`, valor igual (ou NaN, que não compara) mantém o sentido `latest`. */
export function rollDirection(trend: Trend, from: number, to: number, latest: 1 | -1): 1 | -1 {
  if (trend === 'up') return 1
  if (trend === 'down') return -1
  return to > from ? 1 : to < from ? -1 : latest
}
