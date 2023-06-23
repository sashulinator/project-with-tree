import { LANGUAGE } from '~/constants/local-storage'
import { i18n } from '~/shared/i18n'

export function changeLanguage(lng: string): void {
  i18n
    .changeLanguage(lng)
    .then(() => {
      localStorage.setItem(LANGUAGE, lng)
    })
    .catch(() => {
      console.error('could not change theme')
    })
}
