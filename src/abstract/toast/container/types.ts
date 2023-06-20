import { Emitter } from 'mitt'

import { Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

import { Toast } from '../toast/types'

export interface Container {
  id: Id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitter: Emitter<Dictionary<any>>
  toastIds: Id[]
  max: number
  defaultToast: Omit<Toast<undefined>, 'id' | 'emitter'>
}
