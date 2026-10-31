import { Button, Dialog, ListItem, Sheet, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/Dialog' }
export default meta

const page = { padding: 24, minBlockSize: '100vh', background: 'var(--ds-color-bg)' } as const

export const Normal: StoryObj = {
  render: function Render() {
    const [open, setOpen] = useState(true)
    const close = () => setOpen(false)
    return (
      <Stack gap="md" style={page}>
        <div><Button title="Abrir diálogo" onPress={() => setOpen(true)} /></div>
        <Dialog
          open={open}
          onClose={close}
          title="Encerrar treino?"
          description="Os exercícios já feitos ficam salvos."
          actions={<><Button title="Cancelar" variant="ghost" onPress={close} /><Button title="Encerrar" onPress={close} /></>}
        />
      </Stack>
    )
  },
}

/** `destructive` muda o tom do título (e leva um ícone: a cor não é o único sinal); a ação principal usa o `Button` `danger`. */
export const Destrutivo: StoryObj = {
  render: function Render() {
    const [open, setOpen] = useState(true)
    const close = () => setOpen(false)
    return (
      <Stack gap="md" style={page}>
        <div><Button title="Abrir diálogo" onPress={() => setOpen(true)} /></div>
        <Dialog
          open={open}
          onClose={close}
          title="Apagar treino?"
          description="Esta ação não pode ser desfeita."
          destructive
          actions={<><Button title="Cancelar" variant="ghost" onPress={close} /><Button title="Apagar" variant="danger" onPress={close} /></>}
        />
      </Stack>
    )
  },
}

/** Review Focus 5: Esc fecha só o `Dialog` (o de cima) e o foco volta ao botão que o abriu, dentro da gaveta. */
export const SobreSheet: StoryObj = {
  render: function Render() {
    const [sheet, setSheet] = useState(true)
    const [dialog, setDialog] = useState(true)
    return (
      <Stack gap="md" style={page}>
        <div><Button title="Abrir gaveta" onPress={() => setSheet(true)} /></div>
        <Sheet open={sheet} onClose={() => setSheet(false)} title="Treino de peito">
          <ListItem title="Peito e tríceps" subtitle="4 exercícios" />
          <Button title="Apagar treino" variant="danger" onPress={() => setDialog(true)} fullWidth />
        </Sheet>
        <Dialog
          open={dialog}
          onClose={() => setDialog(false)}
          title="Apagar treino?"
          description="Esc fecha só este diálogo; a gaveta continua aberta."
          destructive
          actions={<><Button title="Cancelar" variant="ghost" onPress={() => setDialog(false)} /><Button title="Apagar" variant="danger" onPress={() => { setDialog(false); setSheet(false) }} /></>}
        />
        <Text color="textMuted">Fundo</Text>
      </Stack>
    )
  },
}
