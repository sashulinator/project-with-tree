import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { addToast } from '~/abstract/toast'
import { i18n } from '~/shared/i18n'
import { Any } from '~/utils/core'
import { isDev } from '~/utils/core/is/dev'
import { Dictionary } from '~/utils/dictionary'
import { tryCatch } from '~/utils/error/try-catch'

import { assertNoExcessiveTranslation } from './assertions/_no-excessive-translations'
import { generateSchema } from './generate-schema'
import { translateError } from './translate-error'
import { ReplaceValuesByGetter } from './types/_replace-values-by-getter'

export function useT<T extends Dictionary<Any>>(dictionary: T, ns: string): ReplaceValuesByGetter<T> {
  useTranslation([ns], { i18n })
  const currentTranslations = i18n.store.data[i18n.language]?.[ns] as Dictionary<Any>

  useEffect(() => {
    if (!isDev()) return

    tryCatch(
      () => assertNoExcessiveTranslation(dictionary, currentTranslations),
      (e) => {
        addToast({ type: 'warning', data: translateError(e) })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log((e as Any).path)
      }
    )
  }, [currentTranslations])

  return useMemo(() => generateSchema(dictionary, ns), [i18n.language, currentTranslations])
}
