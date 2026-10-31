// Referência: Zenith Feedback (SWFitness), organisms/Feedback/Feedback.tsx (ícone em círculo, título, subtítulo, botões); o layout `inline` é novo.
import { useDS } from '@gahmp1/ds-core'
import { cx } from '../../core/cx.js'
import { useTheme } from '../../core/useTheme.js'
import { Button } from '../../primitives/Button/index.js'
import { Text } from '../../primitives/Text/index.js'

export type FeedbackKind = 'empty' | 'success' | 'error'
export type FeedbackLayout = 'screen' | 'inline'

export type FeedbackProps = {
  kind: FeedbackKind
  title: string
  description?: string
  /** Botão abaixo do texto. */
  action?: { label: string; onPress: () => void }
  /** `screen` ocupa a altura do pai e centraliza; `inline` ocupa só o conteúdo, para dentro de listas e cards. Padrão `screen`. */
  layout?: FeedbackLayout
}

const ICON = { empty: 'file', success: 'success', error: 'error' } as const
// `error` avisa na hora (alert), `success` educadamente (status); o vazio é só conteúdo.
const ROLE = { empty: undefined, success: 'status', error: 'alert' } as const

export function Feedback({ kind, title, description, action, layout = 'screen' }: FeedbackProps) {
  const theme = useTheme()
  const { Icon } = useDS()
  const screen = layout === 'screen'
  return (
    <div className={cx('ds-feedback', `ds-feedback--${layout}`, `ds-feedback--${kind}`)} role={ROLE[kind]}>
      <span className="ds-feedback__icon" aria-hidden>
        <Icon name={ICON[kind]} size={theme.icon.size.lg} color="currentColor" strokeWidth={theme.icon.strokeWidth} />
      </span>
      <Text as={screen ? 'h2' : 'p'} variant={screen ? 'xlMedium' : 'baseMedium'}>{title}</Text>
      {description && <Text as="p" variant={screen ? 'base' : 'sm'} color="textMuted">{description}</Text>}
      {action && <Button title={action.label} onPress={action.onPress} variant={screen ? 'primary' : 'outline'} />}
    </div>
  )
}
