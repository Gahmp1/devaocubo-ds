import { Text } from '../../primitives/Text/index.js'

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * Anel interno do `DetailedListItem`: a Task 20 o troca pelo `CircularProgress`. Decorativo (o percentual
 * visível é o que o leitor de tela lê junto do título); `pathLength` 100 faz o dash valer o percentual.
 */
export function ProgressRing({ value }: { value: number }) {
  const pct = Math.round(clamp(value) * 100)
  return (
    <span className="ds-ring">
      <svg className="ds-ring__svg" viewBox="0 0 40 40" aria-hidden>
        <circle className="ds-ring__track" cx="20" cy="20" r="18" />
        <circle className="ds-ring__bar ds-anim" cx="20" cy="20" r="18" pathLength={100} strokeDasharray={`${pct} 100`} transform="rotate(-90 20 20)" />
      </svg>
      <span className="ds-ring__value">
        <Text variant="xs">{pct}%</Text>
      </span>
    </span>
  )
}
