import { typeTest } from '~/utils/core'
import { Position } from '~/widgets/canvas'

import { BoardEventNames } from './event-names'

export type BoardEvents = {
  setScale: { value: number }
  setTranslate: { value: Position }
}

typeTest<keyof BoardEvents>('' as BoardEventNames)
typeTest<BoardEventNames>('' as keyof BoardEvents)
