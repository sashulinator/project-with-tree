import { themes } from '~/shared/theme/themes'
import { setCSSVars } from '~/utils/dom'
import { Themes } from '~/utils/theme/types/themes'

import { getCurrentThemeName } from './get-current-theme-name'

export function onThemesAdd(newThemes: Themes): void {
  const themeNames = Object.keys(newThemes)

  setCSSVars(newThemes[getCurrentThemeName()])

  themeNames.forEach((themeName) => {
    themes[themeName] = { ...themes[themeName], ...newThemes[themeName] }
  })
}
