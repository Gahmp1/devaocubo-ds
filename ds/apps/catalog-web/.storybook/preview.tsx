/// <reference types="vite/client" />
import { themes } from '@gahmp1/ds-theme'
import type { Preview } from '@storybook/react-native-web-vite'
import devaocubo from '@gahmp1/ds-theme/css/devaocubo.css?inline'
import somma from '@gahmp1/ds-theme/css/somma.css?inline'
import swfitness from '@gahmp1/ds-theme/css/swfitness.css?inline'
import trippo from '@gahmp1/ds-theme/css/trippo.css?inline'
import '@gahmp1/ds-web/styles.css'
import { CatalogRoot } from '../src/CatalogRoot'

// Os CSS do pacote têm escopo :root (um produto por app); aqui só o tema escolhido fica na página.
const css: Record<string, string> = { devaocubo, swfitness, somma, trippo }

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Tema', toolbar: { title: 'Tema', icon: 'paintbrush', items: Object.keys(css), dynamicTitle: true } },
    scheme: { description: 'Esquema', toolbar: { title: 'Esquema', icon: 'mirror', items: ['system', 'light', 'dark'], dynamicTitle: true } },
    reducedMotion: { description: 'Movimento', toolbar: { title: 'Movimento', icon: 'lightning', items: ['system', 'normal', 'reduced'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'swfitness', scheme: 'system', reducedMotion: 'system' },
  decorators: [
    (Story, { globals }) => {
      document.documentElement.dataset.product = globals.theme
      const tag =
        document.getElementById('ds-theme') ??
        document.head.appendChild(Object.assign(document.createElement('style'), { id: 'ds-theme' }))
      tag.textContent = css[globals.theme]
      const theme = themes.find((t) => t.name === globals.theme) ?? themes[0]
      const reducedMotion = globals.reducedMotion === 'system' ? 'system' : globals.reducedMotion === 'reduced'
      return (
        <CatalogRoot theme={theme} scheme={globals.scheme} reducedMotion={reducedMotion}>
          <Story />
        </CatalogRoot>
      )
    },
  ],
  parameters: { layout: 'fullscreen' },
}

export default preview
