import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'

import RareLayout from './RareLayout.vue'

import './styles/override.css'

export default {
  ...DefaultTheme,
  Layout: RareLayout,
  async enhanceApp({ app, router }) {
    // Register Global Components
  }
} satisfies Theme
