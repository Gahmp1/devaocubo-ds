/** Junta nomes de classe, ignorando `false`/`undefined`. */
export function cx(...names: (string | false | undefined)[]): string {
  return names.filter(Boolean).join(' ')
}
