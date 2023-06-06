import { Emitter } from 'mitt'

import { Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface Toast<D = unknown> {
  id: Id
  containerId: Id
  data: D
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitter: Emitter<Dictionary<any>>
  isEntering: boolean
  isShowing: boolean
  isExiting: boolean
  maxShowingTransition: number
  maxEnteringTransition: number
  maxExitingTransition: number
  showingTransition: number
  enteringTransition: number
  exitingTransition: number
  isEnteringTransitionStopped: boolean
  isShowingTransitionStopped: boolean
  isExitingTransitionStopped: boolean
  type: string
}
