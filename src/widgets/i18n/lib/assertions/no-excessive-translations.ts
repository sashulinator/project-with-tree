import { Any } from '~/utils/core'
import { Dictionary, isObject, walk } from '~/utils/dictionary'
import { getPath } from '~/utils/dictionary/get-path'
import { BaseError } from '~/utils/error'

export function assertNoExcessiveTranslation(
  dictionary: Dictionary<Any>,
  currentTranslations: undefined | Dictionary<Any>
) {
  if (currentTranslations === undefined) {
    return
  }

  walk(currentTranslations, ({ value, path }) => {
    if (!isObject(value)) {
      const value = getPath(dictionary, path)
      if (value === undefined) {
        throw new BaseError('Received excessive Translation from backend, it does not exist on your front', {
          code: 'assertClientHasNoExcessiveTranslation',
          path,
        })
      }
    }
  })
  walk(dictionary, ({ value, path }) => {
    if (!isObject(value)) {
      const value = getPath(currentTranslations, path)
      if (value === undefined) {
        throw new BaseError('You have excessive Translation on your front, it does not exist on backend', {
          code: 'assertServerHasNoExcessiveTranslation',
          path,
        })
      }
    }
  })
  //
}
