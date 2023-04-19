import { LS_LANGUAGE } from '../constants/ls-language'

import { i18n } from '~/shared/i18n'

export function changeLanguage(lng: string): void {
  i18n.changeLanguage(lng)
  localStorage.setItem(LS_LANGUAGE, lng)
}
