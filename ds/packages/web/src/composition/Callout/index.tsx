// Referência: Zenith TipCallout (SWFitness), organisms/TipCallout/TipCallout.tsx (balão invertido com bico e botão fechar); sem i18n e sem ícone próprio.
import { useDS } from '@gahmp1/ds-core'
import type { ReactNode } from 'react'
import { cx } from '../../core/cx.js'
import { IconButton } from '../../primitives/IconButton/index.js'
import { Text } from '../../primitives/Text/index.js'

export type CalloutPlacement = 'top' | 'bottom'

export type CalloutProps = {
  title?: string
  children: ReactNode
  /** Mostra o botão fechar (`strings.close`). */
  onClose?: () => void
  /** Lado do bico: `bottom` (padrão) aponta para um alvo abaixo do balão, `top` para um acima. */
  placement?: CalloutPlacement
}

export function Callout({ title, children, onClose, placement = 'bottom' }: CalloutProps) {
  const { strings } = useDS()
  return (
    <div role="note" className={cx('ds-callout', `ds-callout--${placement}`)}>
      <div className="ds-callout__bubble">
        <div className="ds-callout__body">
          {title && <Text variant="smMedium" color="bg">{title}</Text>}
          <Text as="p" variant="sm" color="bg">{children}</Text>
        </div>
        {onClose && <IconButton icon="close" accessibilityLabel={strings.close} size="small" color="bg" onPress={onClose} />}
      </div>
      <span className="ds-callout__tip" aria-hidden />
    </div>
  )
}
