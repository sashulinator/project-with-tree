import { THEME } from '~/constants/local-storage'
import { DEFAULT_THEME } from '~/constants/theme'
import { themes } from '~/shared/theme/depricated-themes'

export function getCurrentThemeName(): keyof typeof themes {
  const name = localStorage.getItem(THEME) || DEFAULT_THEME

  if (themes[name]) {
    return name as keyof typeof themes
  }

  return DEFAULT_THEME
}
