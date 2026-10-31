import { Button, ListItem, Sheet, Stack, Text } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState, type ReactNode } from 'react'

const meta: Meta = { title: 'Composição/Sheet' }
export default meta

/** Página de fundo com o botão que abre a gaveta; começa aberta para a conferência visual. */
function Demo({ children }: { children: (open: boolean, close: () => void) => ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <Stack gap="md" style={{ padding: 24, minBlockSize: '100vh', background: 'var(--ds-color-bg)' }}>
      <Text variant="lgMedium">Treino de hoje</Text>
      <Text color="textMuted">Fundo da tela: o scrim do tema cobre tudo isto.</Text>
      <div><Button title="Abrir gaveta" onPress={() => setOpen(true)} /></div>
      {children(open, () => setOpen(false))}
    </Stack>
  )
}

export const Aberto: StoryObj = {
  render: () => (
    <Demo>
      {(open, close) => (
        <Sheet open={open} onClose={close} title="Unidade de peso">
          <Text>Escolha como as cargas aparecem no treino.</Text>
        </Sheet>
      )}
    </Demo>
  ),
}

export const ComRodape: StoryObj = {
  render: () => (
    <Demo>
      {(open, close) => (
        <Sheet open={open} onClose={close} title="Descanso entre séries" footer={<Button title="Salvar" onPress={close} fullWidth />}>
          <Text>O rodapé fica fixo; o conteúdo acima rola se não couber.</Text>
        </Sheet>
      )}
    </Demo>
  ),
}

/** Lista longa: só o corpo rola, o título e o rodapé ficam. */
export const ConteudoAltoRolando: StoryObj = {
  render: () => (
    <Demo>
      {(open, close) => (
        <Sheet open={open} onClose={close} title="Exercícios" footer={<Button title="Concluir" onPress={close} fullWidth />}>
          {Array.from({ length: 30 }, (_, i) => (
            <ListItem key={i} title={`Exercício ${i + 1}`} subtitle="3 séries de 10" />
          ))}
        </Sheet>
      )}
    </Demo>
  ),
}

/** Duas alturas: arraste a alça para cima para expandir e para baixo para voltar ou fechar. */
export const AlturasFixas: StoryObj = {
  render: () => (
    <Demo>
      {(open, close) => (
        <Sheet open={open} onClose={close} title="Duas alturas" snap={[280, 560]}>
          {Array.from({ length: 12 }, (_, i) => (
            <ListItem key={i} title={`Linha ${i + 1}`} />
          ))}
        </Sheet>
      )}
    </Demo>
  ),
}

/** Sem Esc, sem clique no fundo, sem arrastar e sem botão fechar: só o app fecha. */
export const NaoDispensavel: StoryObj = {
  render: () => (
    <Demo>
      {(open, close) => (
        <Sheet open={open} onClose={close} title="Termos de uso" dismissible={false} footer={<Button title="Aceitar" onPress={close} fullWidth />}>
          <Text>Para continuar, aceite os termos.</Text>
        </Sheet>
      )}
    </Demo>
  ),
}

export const SemTitulo: StoryObj = {
  render: () => (
    <Demo>
      {(open, close) => (
        <Sheet open={open} onClose={close}>
          <Text>Gaveta só com alça e conteúdo.</Text>
        </Sheet>
      )}
    </Demo>
  ),
}
