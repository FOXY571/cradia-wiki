import { ref } from 'vue'
import cookies from 'vue-cookies'
import config from '../config'

import backgrounds from '../assets/images/backgrounds'
import panelBackgrounds from '../assets/images/panel-backgrounds'

export const themes = Object.fromEntries(
  Object.entries(config.themes).map(([key, theme]) => [
    key,
    {
      name: theme.name,
      background: backgrounds[theme.background],
      panelBackground: panelBackgrounds[theme.panelBackground],
    },
  ]),
)

export let currentTheme = ref(cookies.get('theme') || config.defaultTheme)

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
