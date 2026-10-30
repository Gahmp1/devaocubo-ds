/// <reference types="vite/client" />
import type { Preview } from '@storybook/react-native-web-vite'
import devaocubo from '@gahmp1/ds-theme/css/devaocubo.css?inline'
import somma from '@gahmp1/ds-theme/css/somma.css?inline'
import swfitness from '@gahmp1/ds-theme/css/swfitness.css?inline'
import trippo from '@gahmp1/ds-theme/css/trippo.css?inline'

// Os CSS do pacote têm escopo :root (um produto por app); aqui só o tema escolhido fica na página.
const css: Record<string, string> = { devaocubo, swfitness, somma, trippo }

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Tema', toolbar: { title: 'Tema', icon: 'paintbrush', items: Object.keys(css), dynamicTitle: true } },
    scheme: { description: 'Esquema', toolbar: { title: 'Esquema', icon: 'mirror', items: ['system', 'light', 'dark'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'swfitness', scheme: 'system' },
  decorators: [
    (Story, { globals }) => {
      const html = document.documentElement
      html.dataset.product = globals.theme
      if (globals.scheme === 'system') delete html.dataset.theme
      else html.dataset.theme = globals.scheme
      const tag =
        document.getElementById('ds-theme') ??
        document.head.appendChild(Object.assign(document.createElement('style'), { id: 'ds-theme' }))
      tag.textContent = css[globals.theme]
      return <Story />
    },
  ],
  parameters: { layout: 'fullscreen' },
}

export default preview
