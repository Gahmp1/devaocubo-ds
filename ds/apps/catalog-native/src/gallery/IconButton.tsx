import { createStyles, IconButton, Stack, Text } from '@gahmp1/ds-native'
import { ScrollView } from 'react-native'
import type { GalleryEntry } from '../Gallery'

const SIZES = ['small', 'medium', 'large'] as const
const VARIANTS = ['plain', 'filled', 'outline'] as const
const noop = () => {}

const useStyles = createStyles((t) => ({
  scroll: { backgroundColor: t.color.bg },
  content: { padding: t.density.space.md, gap: t.density.space.lg },
}))

function IconButtonScreen() {
  const s = useStyles()
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      {VARIANTS.map((variant) => (
        <Stack key={variant} gap="xs">
          <Text variant="xs" color="textMuted" label>{variant}</Text>
          <Stack direction="row" gap="md" align="center">
            {SIZES.map((size) => (
              <IconButton key={size} icon="plus" accessibilityLabel="Adicionar" variant={variant} size={size} onPress={noop} />
            ))}
          </Stack>
          <Stack direction="row" gap="md" align="center">
            {SIZES.map((size) => (
              <IconButton key={size} icon="plus" accessibilityLabel="Adicionar" variant={variant} size={size} onPress={noop} disabled />
            ))}
          </Stack>
        </Stack>
      ))}
      <Text variant="xs" color="textMuted" label>cores</Text>
      <Stack direction="row" gap="md" align="center">
        {(['text', 'textMuted', 'accent', 'danger'] as const).map((color) => (
          <IconButton key={color} icon="close" accessibilityLabel="Fechar" color={color} onPress={noop} />
        ))}
      </Stack>
    </ScrollView>
  )
}

export default { id: 'icon-button', title: 'IconButton', group: 'primitivos', Screen: IconButtonScreen } satisfies GalleryEntry
