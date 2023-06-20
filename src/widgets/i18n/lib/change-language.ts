import { i18n } from '~/shared/i18n'

import { LS_LANGUAGE } from '../constants/ls-language'

export function changeLanguage(lng: string): void {
  i18n.changeLanguage(lng).catch(() => {
    console.error('could not change theme')
  })
  localStorage.setItem(LS_LANGUAGE, lng)
}
