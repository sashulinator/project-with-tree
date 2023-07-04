import { themes } from '~/shared/theme/depricated-themes'

export function getThemeNames(): string[] {
  return Object.keys(themes)
}
