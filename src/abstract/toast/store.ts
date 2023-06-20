import { Dictionary } from '~/utils/dictionary'

import { Container } from './container/types'
import { Toast } from './toast/types'

export interface Store {
  containers: Dictionary<Container>
  toasts: Dictionary<Toast<unknown>>
  containerSequenceId: number
  toastSequenceId: number
}

export const store: Store = {
  containers: {},
  toasts: {},
  containerSequenceId: 0,
  toastSequenceId: 0,
}
