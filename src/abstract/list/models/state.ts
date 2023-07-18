import { Emitter } from '~/lib/emitter/emitter'
import { Id } from '~/utils/core'
import { AnyEvent, Prop } from '~/utils/depricated-emitter'

export type Events = {
  selected: { value: Id[] }
  preselected: { value: Id[] }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemStateProps<Item> {
  getItemId: (item: Item) => Id
}

export class State<Item, E extends object = object> extends Emitter<E & Events> {
  selected: Prop<'selected', Id[]>

  preselected: Prop<'preselected', Id[]>

  getItemId: (item: Item) => Id

  constructor(props: ItemStateProps<Item>) {
    super()

    this.selected = new Prop<'selected', Id[]>('selected', [], this)

    this.preselected = new Prop<'preselected', Id[]>('preselected', [], this)

    this.getItemId = props.getItemId
  }
}
