import { useTheme, useThemeMotion } from '@gahmp1/ds-web'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

const meta: Meta = { title: 'Fundação/Provedor' }
export default meta

function Info() {
  const t = useTheme()
  const m = useThemeMotion()
  return (
    <dl style={{ margin: 0, padding: 24, color: 'var(--ds-color-text)', fontFamily: 'inherit' }}>
      <dt>scheme</dt>
      <dd data-testid="scheme">{t.scheme}</dd>
      <dt>reduced</dt>
      <dd>{String(m.reduced)}</dd>
      <dt>duration.base</dt>
      <dd>{m.duration.base}ms</dd>
      <dt>easing.standard</dt>
      <dd>{m.easing.standard}</dd>
    </dl>
  )
}

export const Provedor: StoryObj = { render: () => <Info /> }
