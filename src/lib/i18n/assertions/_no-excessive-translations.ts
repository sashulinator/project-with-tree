import { Any, isObject } from '~/utils/core'
import { Dictionary, getPath, walk } from '~/utils/dictionary'
import { BaseError } from '~/utils/error'

export function assertNoExcessiveTranslation(
  dictionary: Dictionary<Any>,
  currentTranslations: undefined | Dictionary<Any>
): void {
  if (currentTranslations === undefined) {
    return
  }

  walk(currentTranslations, ({ value, path }) => {
    if (!isObject(value)) {
      const value = getPath(dictionary, path) as undefined
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
      const value = getPath(currentTranslations, path) as undefined
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
