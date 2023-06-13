import { Position } from '~/abstract/canvas'

export type BoardEvents = {
  scale: { value: number }
  translate: { value: Position }
  canvasBoardRef: { element: SVGSVGElement }
}
