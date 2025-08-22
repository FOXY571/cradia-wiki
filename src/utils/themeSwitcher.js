import { ref } from 'vue'
import cookies from 'vue-cookies'

import backgrounds from '../assets/images/backgrounds'
import panelBackgrounds from '../assets/images/panel-backgrounds'

export const themes = {
  ikarye: {
    name: 'Ikarye',
    background: backgrounds.ikarye,
    panelBackground: panelBackgrounds.ikarye,
  },
  canavar: {
    name: 'Canavar',
    background: backgrounds.canavar,
    panelBackground: panelBackgrounds.canavar,
  },
  chaos: {
    name: 'Chaos',
    background: backgrounds.chaos,
    panelBackground: panelBackgrounds.chaos,
  },
  sanctuary: {
    name: 'Sanctuary',
    background: backgrounds.sanctuary,
    panelBackground: panelBackgrounds.sanctuary,
  },
}

export let currentTheme = ref(cookies.get('theme') || 'ikarye')

/**
 * Switch the theme to the specified theme name. If the theme does not exist, the theme will not switch.
 *
 * @param {string} themeName - The name of the theme to switch to.
 */
export function switchTheme(themeName) {
  const theme = themes[themeName]
  if (theme) {
    document.documentElement.style.setProperty(
      '--theme-panel-background',
      `url(${theme.panelBackground})`,
    )
    document.documentElement.style.setProperty('--theme-background', `url(${theme.background})`)

    currentTheme.value = themeName
    cookies.set('theme', themeName, Infinity)
  }
}
