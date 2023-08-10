import { THEME } from '~/constants/local-storage'
import { DEFAULT } from '~/constants/theme'
import { themes } from '~/shared/theme/themes'

export function getCurrentThemeName(): keyof typeof themes {
  const name = localStorage.getItem(THEME) || DEFAULT

  if (themes[name]) {
    return name as keyof typeof themes
  }

  return DEFAULT
}
