import { Point } from '../../..'
import { NodeController } from '../widgets/canvas'

interface Context {}

export function _createNode(context: Context, point: Point): NodeController {
  const {} = context

  return new NodeController(point)
}
