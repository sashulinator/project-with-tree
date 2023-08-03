import { Position } from '~/utils/core'
import { GestureDragEvent } from '../types/gesture-drag-event'

export function getItemMovement(event: GestureDragEvent): Position | null {
  const x = event.movement[0]
  const y = event.movement[1]

  if (event.movement[0] === 0 && event.movement[1] === 0) {
    return null
  }

  return {
    x,
    y,
  }
}
