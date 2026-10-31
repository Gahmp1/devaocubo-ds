import { Button, Stack, Text, ToastHost, useToast } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Composição/Toast' }
export default meta

const page = { padding: 24, minBlockSize: '100vh', background: 'var(--ds-color-bg)' } as const

/** Um toast por vez, no topo: `neutral` e `success` ficam numa região `status` (educada), `danger` numa `alert`. */
function Tons() {
  const toast = useToast()
  return (
    <Stack gap="md" style={page}>
      <Text color="textMuted">Cada botão mostra um toast; sucesso e erro tocam confirmar/erro (se o feedback estiver ligado).</Text>
      <Stack direction="row" gap="sm" wrap>
        <Button title="Neutro" variant="outline" onPress={() => toast.show({ title: 'Rascunho salvo' })} />
        <Button title="Sucesso" variant="outline" onPress={() => toast.show({ title: 'Treino salvo', description: 'Peito e tríceps, 4 exercícios.', tone: 'success' })} />
        <Button title="Erro" variant="outline" onPress={() => toast.show({ title: 'Não foi possível salvar', description: 'Verifique a conexão e tente de novo.', tone: 'danger' })} />
      </Stack>
    </Stack>
  )
}

export const TresTons: StoryObj = {
  render: () => <ToastHost><Tons /></ToastHost>,
}

/** Com ação (fica mais tempo na tela) e com permanência curta definida pelo app. O cursor ou o foco sobre o toast pausa o tempo. */
function Acao() {
  const toast = useToast()
  const [undone, setUndone] = useState(0)
  return (
    <Stack gap="md" style={page}>
      <Stack direction="row" gap="sm" wrap>
        <Button title="Apagar item" variant="outline" onPress={() => toast.show({ title: 'Item apagado', action: { label: 'Desfazer', onPress: () => setUndone((n) => n + 1) } })} />
        <Button title="Toast de 1,5 s" variant="outline" onPress={() => toast.show({ title: 'Copiado', tone: 'success', durationMs: 1500 })} />
      </Stack>
      <Text variant="sm" color="textMuted">Desfeitos: {undone}</Text>
    </Stack>
  )
}

export const ComAcao: StoryObj = {
  render: () => <ToastHost><Acao /></ToastHost>,
}

/** Três pedidos de uma vez: aparecem um depois do outro. */
function Fila() {
  const toast = useToast()
  return (
    <Stack gap="md" style={page}>
      <div>
        <Button
          title="Enfileirar 3"
          onPress={() => {
            toast.show({ title: 'Primeiro', description: 'Fica visível sozinho.', durationMs: 2000 })
            toast.show({ title: 'Segundo', tone: 'success', durationMs: 2000 })
            toast.show({ title: 'Terceiro', tone: 'danger', durationMs: 2000 })
          }}
        />
      </div>
    </Stack>
  )
}

export const FilaDeTres: StoryObj = {
  render: () => <ToastHost><Fila /></ToastHost>,
}
