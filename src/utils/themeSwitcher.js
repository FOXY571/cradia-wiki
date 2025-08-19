import cookies from 'vue-cookies'

import backgrounds from '../assets/images/backgrounds'
import panelBackgrounds from '../assets/images/panel-backgrounds'

const themes = {
  ikarye: {
    background: backgrounds.ikarye,
    panelBackground: panelBackgrounds.ikarye,
  },
  canavar: {
    background: backgrounds.canavar,
    panelBackground: panelBackgrounds.canavar,
  },
  chaos: {
    background: backgrounds.chaos,
    panelBackground: panelBackgrounds.chaos,
  },
}

/**
 * Get the current theme from cookies.
 *
 * @returns {string} The name of the current theme or 'ikarye' if there is none.
 */
export function getCurrentTheme() {
  return cookies.get('theme') || 'ikarye'
}

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

    cookies.set('theme', themeName, Infinity)
  }
}
