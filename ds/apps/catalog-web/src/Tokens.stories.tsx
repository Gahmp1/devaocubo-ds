import { themes, type Scheme } from '@gahmp1/ds-theme'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { TokensPage } from './TokensPage'

const meta: Meta = { title: 'Fundação/Tokens' }
export default meta

function effectiveScheme(scheme: string): Scheme {
  if (scheme === 'light' || scheme === 'dark') return scheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const Tokens: StoryObj = {
  render: (_, { globals }) => {
    const theme = themes.find((t) => t.name === globals.theme) ?? themes[0]
    return <TokensPage theme={theme} scheme={effectiveScheme(globals.scheme)} />
  },
}
