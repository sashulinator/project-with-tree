import { Selection, select } from 'd3-selection'

import { PositionProp } from '~/lib/emitter'
import { AnyEvent, Emitter, Prop } from '~/utils/depricated-emitter'

interface IEmitter<E extends AnyEvent> extends Emitter<E> {
  ref: Prop<string, SVGSVGElement | null>
  scale: Prop<string, number>
  translate: PositionProp<string>
}

export class D3Selection<E extends AnyEvent> {
  value: Selection<SVGSVGElement, unknown, null, undefined> | null

  emitters: ((s: Selection<SVGSVGElement, unknown, null, undefined> | null) => void)[]

  constructor(emitter: IEmitter<E>) {
    this.value = null

    this.emitters = []

    emitter.on(emitter.ref.eventName, ({ value }: { value: SVGSVGElement | null }) => {
      if (value === null || this.value) return
      this.value = select(value)
      this.emitters.forEach((emit) => emit(this.value))
    })
  }
}
