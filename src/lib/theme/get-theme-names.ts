import { themes } from '~/shared/theme/themes'

export function getThemeNames(): string[] {
  return Object.keys(themes)
}
