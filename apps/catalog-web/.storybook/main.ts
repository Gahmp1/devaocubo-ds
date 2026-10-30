import type { StorybookConfig } from '@storybook/react-native-web-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/react-native-web-vite', options: {} },
}

export default config
