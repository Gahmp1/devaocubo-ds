import type { KeyboardEvent } from 'react'

/** Setas, Home e End movem o foco entre os `[role="tab"]` do contêiner e ativam o destino (ativação automática do padrão WAI-ARIA). */
export function tabKeyDown(e: KeyboardEvent<HTMLElement>) {
  if (e.altKey || e.ctrlKey || e.metaKey) return // Alt/Cmd+Seta é "voltar" do navegador
  const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'))
  const at = tabs.indexOf(document.activeElement as HTMLElement)
  if (at < 0) return
  const rtl = getComputedStyle(e.currentTarget).direction === 'rtl'
  const step = e.key === 'ArrowRight' ? (rtl ? -1 : 1) : e.key === 'ArrowLeft' ? (rtl ? 1 : -1) : 0
  const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : step ? (at + step + tabs.length) % tabs.length : -1
  if (next < 0) return
  e.preventDefault()
  tabs[next].focus()
  tabs[next].click()
}
