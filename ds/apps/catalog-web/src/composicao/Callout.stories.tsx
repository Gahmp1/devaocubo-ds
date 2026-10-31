import { Callout, Stack } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/Callout' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 360 } as const

/** Sem fechar: dica fixa, com e sem título. */
export const SemFechar: StoryObj = {
  render: () => (
    <Stack gap="xl" style={frame}>
      <Callout>Toque no relógio para ajustar o descanso entre as séries.</Callout>
      <Callout title="Descanso">Toque no relógio para ajustar o descanso entre as séries.</Callout>
    </Stack>
  ),
}

/** Com `onClose`: o botão fecha a dica (aqui ela some e há um botão para voltar). */
export const ComFechar: StoryObj = {
  render: function Render() {
    const [open, setOpen] = useState(true)
    return (
      <Stack gap="xl" style={frame}>
        {open ? (
          <Callout title="Dica" onClose={() => setOpen(false)}>Arraste a carga para cima ou para baixo para ajustar rápido.</Callout>
        ) : (
          <button type="button" onClick={() => setOpen(true)}>Mostrar de novo</button>
        )}
      </Stack>
    )
  },
}

/** `placement` é o lado do bico: `bottom` (padrão) aponta para um alvo abaixo, `top` para um acima. */
export const Bico: StoryObj = {
  render: () => (
    <Stack gap="xl" style={frame}>
      <Callout placement="top" title="Bico em cima">Aponta para o alvo acima do balão.</Callout>
      <Callout placement="bottom" title="Bico embaixo" onClose={() => {}}>Aponta para o alvo abaixo do balão, com um texto mais longo para quebrar linha.</Callout>
    </Stack>
  ),
}
