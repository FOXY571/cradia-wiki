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

export function switchTheme(themeName) {
  const theme = themes[themeName]
  if (theme) {
    document.documentElement.style.setProperty(
      '--theme-panel-background',
      `url(${theme.panelBackground})`,
    )
    document.documentElement.style.setProperty('--theme-background', `url(${theme.background})`)
  }
}
