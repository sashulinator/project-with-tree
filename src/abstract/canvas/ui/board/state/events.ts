import { Position } from '~/abstract/canvas'
import { typeTest } from '~/utils/core'

import { BoardEventNames } from './event-names'

export type BoardEvents = {
  setScale: { value: number }
  setTranslate: { value: Position }
}

typeTest<keyof BoardEvents>('' as BoardEventNames)
typeTest<BoardEventNames>('' as keyof BoardEvents)
