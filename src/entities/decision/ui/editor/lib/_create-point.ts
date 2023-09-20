import { generateId } from '~/utils/core'
import { Required } from '~/utils/types/object'

import { CanvasController } from '..'
import { Point } from '../../..'

interface Context {
  canvas: CanvasController
}

export function _createPoint(context: Context, point: Required<Partial<Point>, 'level'>): Point {
  const { canvas } = context

  const position = canvas.getPointPosition('bc')

  const newPoint: Point = {
    name: 'new',
    xy: [position.x, position.y],
    ...point,
    id: point?.id ?? generateId(),
  }

  return newPoint
}
