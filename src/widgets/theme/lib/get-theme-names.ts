import * as themes from '../model/index'

export function getThemeNames(): string[] {
  return Object.keys(themes)
}
