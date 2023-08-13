import { Emitter, PositionProp } from '~/lib/emitter'
import { Position } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'
import { Size } from '~/utils/dom/types/size'

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

  highlight: Prop<'highlight', (Position & Size) | null>

  constructor() {
    super()

    this.ref = new Prop('ref', null as null | SVGSVGElement, this)

    this.translate = new PositionProp('translate', { x: 0, y: 0 }, this)

    this.scale = new Prop('scale', 1, this)

    this.d3selection = new D3Selection(this)

    this.d3zoom = new D3Zoom(this)

    this.highlight = new Prop('highlight', null as (Position & Size) | null, this)
  }
}
