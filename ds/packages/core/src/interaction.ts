/** Porta de telemetria: o DS emite, o app decide o que fazer. O DS não importa analytics. */
export type InteractionEvent = {
  component: string
  kind: 'press' | 'toggle' | 'change' | 'submit' | 'open' | 'close'
  id?: string
  label?: string
  value?: string | number | boolean
}
