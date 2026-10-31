// Referência: Zenith TipCallout (SWFitness), organisms/TipCallout; bolha invertida com bico, sem i18n.
import { useDS } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { createStyles } from '../../core/createStyles.js'
import { IconButton } from '../../primitives/IconButton/index.js'
import { Text } from '../../primitives/Text/index.js'

export type CalloutProps = {
  title?: string
  children: ReactNode
  /** Mostra o botão de fechar (`strings.close`); o app esconde o aviso. */
  onClose?: () => void
  /** Lado da bolha em que fica o bico, que aponta para o alvo da dica. Padrão `bottom`. */
  placement?: 'top' | 'bottom'
}

const useStyles = createStyles((t) => {
  const { color, shape, density } = t
  const arrow = density.space.sm
  // Triângulo por bordas; a base transparente é o desenho, não uma cor do tema.
  const tip = { width: 0, height: 0, borderLeftWidth: arrow, borderRightWidth: arrow, borderLeftColor: 'transparent', borderRightColor: 'transparent' } as const
  return {
    root: { alignItems: 'center' },
    // Bolha invertida (texto sobre fundo): o contraste vem do par `text`/`bg` do tema.
    bubble: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'flex-start', gap: density.space.md, padding: density.space.lg, borderRadius: shape.radius.md, backgroundColor: color.text },
    body: { flex: 1, gap: density.space.xxs },
    tipBottom: { ...tip, borderTopWidth: arrow, borderTopColor: color.text },
    tipTop: { ...tip, borderBottomWidth: arrow, borderBottomColor: color.text },
  }
})

export function Callout({ title, children, onClose, placement = 'bottom' }: CalloutProps) {
  const { strings } = useDS()
  const s = useStyles()
  return (
    <View style={s.root}>
      {placement === 'top' && <View style={s.tipTop} />}
      <View style={s.bubble}>
        <View style={s.body}>
          {title ? <Text variant="smMedium" color="bg">{title}</Text> : null}
          {typeof children === 'string' ? <Text variant="sm" color="bg">{children}</Text> : children}
        </View>
        {onClose && <IconButton icon="close" size="small" color="bg" accessibilityLabel={strings.close} onPress={onClose} />}
      </View>
      {placement === 'bottom' && <View style={s.tipBottom} />}
    </View>
  )
}
