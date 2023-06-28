import { Selection, select } from 'd3-selection'

import { AnyEvent, Emitter, Prop } from '~/utils/emitter'

interface IEmitter<E extends AnyEvent> extends Emitter<E> {
  ref: Prop<string, SVGSVGElement | null>
}

export class D3Prop<E extends AnyEvent> {
  private _emitter: IEmitter<E>

  selection: Selection<SVGSVGElement, unknown, null, undefined> | null

  constructor(emitter: IEmitter<E>) {
    this._emitter = emitter

    this.selection = null

    emitter.on(emitter.ref.eventName, ({ value }: { value: SVGSVGElement | null }) => {
      if (value === null || this.selection) return
      this.selection = select(value)
    })
  }
}
