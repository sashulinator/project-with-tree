import { DEFAULT_LANGUAGE } from '../constants/default-language'
import { LS_LANGUAGE } from '../constants/ls-language'

export function getCurrentLanguage(): string {
  return localStorage.getItem(LS_LANGUAGE) || DEFAULT_LANGUAGE
}
