import { Button, createStyles, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView, View } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const VARIANTS = ['primary', 'outline', 'ghost', 'inverse', 'inverseOutline', 'surface', 'surfaceOutline', 'danger'] as const
const SHAPES = ['pill', 'rounded', 'square', 'circle'] as const
const SIZES = ['small', 'normal', 'large'] as const
const noop = () => {}

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function ButtonScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text variant="xs" color="textMuted">A forma padrão e o toque (opacidade ou escala) vêm do tema; troque o produto no topo do catálogo.</Text>
      {VARIANTS.map((variant) => (
        <Stack key={variant} gap="xs">
          <Text variant="xs" color="textMuted" label>{variant}</Text>
          <Button title="Continuar" variant={variant} onPress={noop} />
          <Button title="Continuar" variant={variant} onPress={noop} disabled />
          <Button title="Continuar" variant={variant} onPress={noop} loading />
        </Stack>
      ))}
      <Text variant="xs" color="textMuted" label>formas</Text>
      <Stack direction="row" gap="md" align="center">
        {SHAPES.map((shape) => (
          <Button key={shape} title={shape} shape={shape} icon={shape === 'circle' ? 'plus' : undefined} onPress={noop} />
        ))}
      </Stack>
      <Text variant="xs" color="textMuted" label>tamanhos</Text>
      <Stack direction="row" gap="md" align="center">
        {SIZES.map((size) => (
          <Button key={size} title={size} size={size} onPress={noop} />
        ))}
      </Stack>
      <Text variant="xs" color="textMuted" label>largura total e ícone</Text>
      <Button title="Salvar treino" fullWidth onPress={noop} />
      <Button title="Adicionar" icon="plus" variant="outline" onPress={noop} />
      <Text variant="xs" color="textMuted" label>título longo</Text>
      <Button title="Começar o treino de pernas com a série de aquecimento" fullWidth onPress={noop} />
      <Text variant="xs" color="textMuted" label>título longo, 160 pt (fonte grande: ajuste no aparelho)</Text>
      <View style={{ width: 160 }}>
        <Button title="Começar o treino de pernas com a série de aquecimento e alongamento completo" fullWidth onPress={noop} />
      </View>
    </ScrollView>
  )
}

export default { id: 'button', title: 'Button', group: 'primitivos', Screen: ButtonScreen } satisfies GalleryEntry
