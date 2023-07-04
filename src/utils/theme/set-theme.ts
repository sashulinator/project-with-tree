import { setCSSVars } from '~/utils/dom'
import { BaseError } from '~/utils/error'

import { Themes } from './types/themes'

export function setTheme<T extends Themes>(name: keyof T, fallbackName: keyof T, themes: T, lsName: string): void {
  const theme = themes[name] ? themes[name] : themes[fallbackName]

  if (theme === undefined) {
    throw new BaseError('Theme does not exist', { name })
  }

  localStorage.setItem(lsName, name.toString())
  localStorage.setItem('--bg', theme.bg.toString())
  localStorage.setItem('--color', theme.color.toString())
  localStorage.setItem('--primary', theme.primary.toString())
  ;(document.documentElement as any).removeAttribute('style')
  setCSSVars(theme)
}
