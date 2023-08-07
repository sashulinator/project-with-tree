import { Position } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'
import { Emitter, PositionProp } from '~/lib/emitter'

import { D3Selection } from './d3-selection'
import { D3Zoom } from './d3-zoom'

export type Events = {
  scale: { value: number }
  translate: { value: Position }
  ref: { element: SVGSVGElement }
}

export class State extends Emitter<Events> {
  ref: Prop<'ref', null | SVGSVGElement>

  translate: PositionProp<'translate'>

  scale: Prop<'scale', number>

  d3selection: D3Selection<Events>

  d3zoom: D3Zoom<Events>

  constructor(scale: number, translate: Position) {
    super()

    this.ref = new Prop('ref', null as null | SVGSVGElement, this)

    this.translate = new PositionProp('translate', translate, this)

    this.scale = new Prop('scale', scale, this)

    this.d3selection = new D3Selection(this)

    this.d3zoom = new D3Zoom(this)
  }
}
