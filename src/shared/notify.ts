import { Toast, addToast } from '~/abstract/toast'

/**
 * Вывести toast
 * TODO браться должен из ui где должный быть сужены типы тостов
 */
export function notify(props: Partial<Toast>): void {
  addToast(props)
}
