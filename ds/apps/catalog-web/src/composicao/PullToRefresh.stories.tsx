import { ListItem, PullToRefresh, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useEffect, useRef, useState } from 'react'
import { fireEvent } from 'storybook/test'

const meta: Meta = { title: 'Composição/PullToRefresh' }
export default meta

const frame = { padding: 24, background: 'var(--ds-color-bg)', maxWidth: 420 } as const
const area = { blockSize: 360, border: '1px dashed var(--ds-color-border-muted)' } as const

function Rows({ stamp }: { stamp: string }) {
  return (
    <Stack>
      {Array.from({ length: 12 }, (_, i) => (
        <ListItem key={i} title={`Treino ${i + 1}`} subtitle={`Atualizado ${stamp}`} />
      ))}
    </Stack>
  )
}

/** Arraste a lista para baixo (mouse ou toque): a vibração e o som tocam ao cruzar o limiar, não ao soltar. */
export const Interativo: StoryObj = {
  render: function Render() {
    const [refreshing, setRefreshing] = useState(false)
    const [stamp, setStamp] = useState('na carga')
    const timer = useRef<number>(0)
    useEffect(() => () => window.clearTimeout(timer.current), [])
    return (
      <Stack gap="md" style={frame}>
        <div style={area}>
          <PullToRefresh
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)
              timer.current = window.setTimeout(() => {
                setStamp(new Date().toLocaleTimeString('pt-BR'))
                setRefreshing(false)
              }, 1200)
            }}
          >
            <Rows stamp={stamp} />
          </PullToRefresh>
        </div>
      </Stack>
    )
  },
}

/** Puxando, abaixo do limiar: o indicador aparece e acompanha o dedo; soltar aqui não atualiza. */
export const Puxando: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <div style={area}><PullToRefresh refreshing={false} onRefresh={() => {}}><Rows stamp="agora" /></PullToRefresh></div>
    </Stack>
  ),
  play: ({ canvasElement }) => drag(canvasElement, 60),
}

/** Limiar cruzado (padrão 72): o indicador fica armado e `onRefresh` já foi chamado; soltar mantém a área no limiar. */
export const LimiarCruzado: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <div style={area}><PullToRefresh refreshing={false} onRefresh={() => {}}><Rows stamp="agora" /></PullToRefresh></div>
    </Stack>
  ),
  play: ({ canvasElement }) => drag(canvasElement, 160),
}

/** Atualizando: o indicador fica fixo no topo com o `Spinner` girando e a área marca `aria-busy`. */
export const Atualizando: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <div style={area}><PullToRefresh refreshing onRefresh={() => {}}><Rows stamp="agora" /></PullToRefresh></div>
    </Stack>
  ),
}

/** Concluído: dados novos e o indicador recolhido; nada toca (o conteúdo novo já avisa). */
export const Concluido: StoryObj = {
  render: () => (
    <Stack gap="sm" style={frame}>
      <Text variant="xs" color="textMuted">Atualizado há instantes</Text>
      <div style={area}><PullToRefresh refreshing={false} onRefresh={() => {}}><Rows stamp="há instantes" /></PullToRefresh></div>
    </Stack>
  ),
}

/** Limiar menor (40) e foco no botão "Atualizar", que só aparece para quem navega por teclado. */
export const LimiarMenor: StoryObj = {
  render: () => (
    <Stack style={frame}>
      <div style={area}><PullToRefresh refreshing={false} onRefresh={() => {}} threshold={40} refreshLabel="Recarregar treinos"><Rows stamp="agora" /></PullToRefresh></div>
    </Stack>
  ),
}

/** Segura o ponteiro apertado: `distance` px de arrasto bruto (a resistência elástica reduz o que o dedo move). */
function drag(root: HTMLElement, distance: number) {
  const target = root.querySelector('.ds-ptr__scroll')
  if (!target) throw new Error('área rolável não encontrada')
  fireEvent.pointerDown(target, { clientY: 100, pointerId: 1, button: 0 })
  fireEvent.pointerMove(target, { clientY: 100 + distance, pointerId: 1 })
}
