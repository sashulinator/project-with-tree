import { GestureDragEvent, getItemMovement } from '~/ui/canvas'
import { Position } from '~/utils/core'

export function getMovement(event: GestureDragEvent, scale: number): Position | null {
  const position = getItemMovement(event)

  if (position === null) {
    return null
  }

  return {
    x: position.x / scale,
    y: position.y / scale,
  }
}
