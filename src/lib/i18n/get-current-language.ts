import { DEFAULT_LANGUAGE } from '~/constants/i18n/default-language'
import { LANGUAGE } from '~/constants/local-storage'

export function getCurrentLanguage(): string {
  return localStorage.getItem(LANGUAGE) || DEFAULT_LANGUAGE
}
