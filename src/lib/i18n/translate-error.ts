import { i18n } from '~/shared/i18n'
import { isCodable } from '~/utils/error'

export function translateError(e: Error): string {
  if (isCodable(e)) {
    return i18n.t(e.code, { ns: 'error' })
  }

  return i18n.t(e.message)
}
