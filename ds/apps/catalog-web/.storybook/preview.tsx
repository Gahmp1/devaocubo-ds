/// <reference types="vite/client" />
import { fontFamilies, fontFamily } from '@gahmp1/ds-fonts'
import { themes, withFont } from '@gahmp1/ds-theme'
import type { Preview } from '@storybook/react-native-web-vite'
import devaocubo from '@gahmp1/ds-theme/css/devaocubo.css?inline'
import somma from '@gahmp1/ds-theme/css/somma.css?inline'
import swfitness from '@gahmp1/ds-theme/css/swfitness.css?inline'
import trippo from '@gahmp1/ds-theme/css/trippo.css?inline'
import '@gahmp1/ds-fonts/css/geist-mono.css'
import '@gahmp1/ds-fonts/css/geist.css'
import '@gahmp1/ds-fonts/css/gilroy.css'
import '@gahmp1/ds-fonts/css/ibm-plex-mono.css'
import '@gahmp1/ds-fonts/css/inter.css'
import '@gahmp1/ds-fonts/css/jetbrains-mono.css'
import '@gahmp1/ds-fonts/css/outfit.css'
import '@gahmp1/ds-fonts/css/space-grotesk.css'
import '@gahmp1/ds-web/styles.css'
import { CatalogRoot } from '../src/CatalogRoot'

// Os CSS do pacote têm escopo :root (um produto por app); aqui só o tema escolhido fica na página.
const css: Record<string, string> = { devaocubo, swfitness, somma, trippo }

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Tema', toolbar: { title: 'Tema', icon: 'paintbrush', items: Object.keys(css), dynamicTitle: true } },
    scheme: { description: 'Esquema', toolbar: { title: 'Esquema', icon: 'mirror', items: ['system', 'light', 'dark'], dynamicTitle: true } },
    font: { description: 'Fonte', toolbar: { title: 'Fonte', icon: 'text', items: ['tema', ...fontFamilies.map((f) => f.id)], dynamicTitle: true } },
    reducedMotion: { description: 'Movimento', toolbar: { title: 'Movimento', icon: 'lightning', items: ['system', 'normal', 'reduced'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'swfitness', scheme: 'system', reducedMotion: 'system', font: 'tema' },
  decorators: [
    (Story, { globals }) => {
      document.documentElement.dataset.product = globals.theme
      const tag =
        document.getElementById('ds-theme') ??
        document.head.appendChild(Object.assign(document.createElement('style'), { id: 'ds-theme' }))
      tag.textContent = css[globals.theme]
      const base = themes.find((t) => t.name === globals.theme) ?? themes[0]
      const family = globals.font === 'tema' ? null : fontFamily(globals.font)
      const theme = family ? withFont(base, family) : base
      // As variáveis --ds-font-* vêm do CSS do tema; o seletor as sobrepõe no <html>.
      for (const role of ['display', 'body'] as const) {
        if (family) document.documentElement.style.setProperty(`--ds-font-${role}`, family.web)
        else document.documentElement.style.removeProperty(`--ds-font-${role}`)
      }
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
