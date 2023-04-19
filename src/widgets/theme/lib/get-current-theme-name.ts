import { DEFAULT_THEME } from '../constants/default-theme'
import { LS_THEME } from '../constants/ls-theme'
import * as themes from '../model/index'

export function getCurrentThemeName(): string {
  const lsThemeName = localStorage.getItem(LS_THEME) || ''

  if (themes[lsThemeName]) {
    return lsThemeName
  }

  return DEFAULT_THEME
}
