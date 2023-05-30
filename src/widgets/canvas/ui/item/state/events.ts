import { Position } from '../../../types/position'

export type CanvasItemEvents = {
  setPosition: { value: Position }
  setRef: { value: HTMLElement }
  setWidth: { value: number }
  setHeight: { value: number }
}
