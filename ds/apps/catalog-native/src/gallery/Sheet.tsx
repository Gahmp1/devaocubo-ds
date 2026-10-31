import { Box, Button, createStyles, ListItem, Sheet, Stack, Text } from '@gahmp1/ds-native'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

type Kind = 'basico' | 'rodape' | 'alto' | 'alturas' | 'fixo'

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

const ROWS = Array.from({ length: 30 }, (_, i) => i + 1)

function SheetScreen() {
  const s = useStyles()
  const [open, setOpen] = useState<Kind | null>(null)
  const close = () => setOpen(null)
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">Voltar do Android e toque no fundo fecham a gaveta; arrastar a alça para baixo também. Em movimento reduzido ela aparece e some sem deslizar.</Text>
      <Stack gap="xs">
        <Text variant="xs" color="textMuted" label>abrir cada gaveta</Text>
        <Button title="Aberto (altura do conteúdo)" variant="outline" onPress={() => setOpen('basico')} />
        <Button title="Com rodapé fixo" variant="outline" onPress={() => setOpen('rodape')} />
        <Button title="Conteúdo alto rolando" variant="outline" onPress={() => setOpen('alto')} />
        <Button title="Duas alturas (280 e 560)" variant="outline" onPress={() => setOpen('alturas')} />
        <Button title="Não dispensável" variant="outline" onPress={() => setOpen('fixo')} />
      </Stack>
      <Box surface="surface1" radius="lg" padding="md">
        <Text variant="sm" color="textMuted">Fundo da tela: o scrim do tema cobre tudo isto quando a gaveta abre.</Text>
      </Box>

      <Sheet open={open === 'basico'} onClose={close} title="Unidade de peso">
        <Text>Escolha como as cargas aparecem no treino.</Text>
      </Sheet>
      <Sheet open={open === 'rodape'} onClose={close} title="Descanso entre séries" footer={<Button title="Salvar" fullWidth onPress={close} />}>
        <Text>O rodapé fica fixo; o conteúdo acima rola se não couber.</Text>
      </Sheet>
      <Sheet open={open === 'alto'} onClose={close} title="Exercícios" footer={<Button title="Concluir" fullWidth onPress={close} />}>
        {ROWS.map((n) => (
          <ListItem key={n} title={`Exercício ${n}`} subtitle="3 séries de 10" />
        ))}
      </Sheet>
      <Sheet open={open === 'alturas'} onClose={close} title="Duas alturas" snap={[280, 560]}>
        {ROWS.slice(0, 12).map((n) => (
          <ListItem key={n} title={`Linha ${n}`} />
        ))}
      </Sheet>
      <Sheet open={open === 'fixo'} onClose={close} title="Termos de uso" dismissible={false} footer={<Button title="Aceitar" fullWidth onPress={close} />}>
        <Text>Sem voltar, sem toque no fundo, sem arrastar e sem botão de fechar: só o app fecha.</Text>
      </Sheet>
    </ScrollView>
  )
}

export default { id: 'sheet', title: 'Sheet', group: 'composição', Screen: SheetScreen } satisfies GalleryEntry
