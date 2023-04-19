import { getThemeColorMeta } from './get-theme-color-meta'

export function getThemeColor(): string {
  // TODO когда появится темы надо сюда bg подставить по умолчанию
  return getThemeColorMeta().content
}
