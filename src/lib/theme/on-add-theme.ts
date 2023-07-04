import { themes } from '~/shared/theme/themes'
import { setCSSVars } from '~/utils/dom'
import { Themes } from '~/utils/theme/types/themes'

export function onAddTheme(newThemes: Themes): void {
  const themeNames = Object.keys(newThemes)

  themeNames.forEach((themeName) => {
    setCSSVars(newThemes[themeName])
    themes[themeName] = { ...themes[themeName], ...newThemes[themeName] }
  })
}
