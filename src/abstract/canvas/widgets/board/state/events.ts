import { Position } from '~/utils/core'

export type BoardEvents = {
  scale: { value: number }
  translate: { value: Position }
  ref: { element: SVGSVGElement }
}
